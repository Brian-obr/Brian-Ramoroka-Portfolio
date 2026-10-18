"use server";

import { randomUUID } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { contactFormSchema } from "@/lib/validation";

export type ContactState = {
  status: "idle" | "error";
  message?: string;
  errors?: Partial<Record<"type" | "name" | "email" | "company" | "message", string>>;
  values?: Record<string, string>;
};

/** Submissions faster than this are treated as bots (time trap, alongside the honeypot). */
const MIN_FILL_MS = 3000;
const attempts = new Map<string, { count: number; resetAt: number }>();

/**
 * Best effort only: memory is per serverless instance. Vercel's WAF rate limiting is the real control (PLAN phase 8).
 */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, e] of attempts) if (now > e.resetAt) attempts.delete(key);
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

async function deliver(subject: string, text: string, replyTo: string): Promise<boolean> {
  const to = process.env.CONTACT_TO_EMAIL ?? "ramorokaob@gmail.com";

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Website <hello@brianramoroka.co.za>",
        to: [to],
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text());
    return res.ok;
  }

  // Existing production transport until Resend is configured.
  if (process.env.FORMSPREE_URL) {
    const res = await fetch(process.env.FORMSPREE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, email: replyTo, message: text }),
    });
    if (!res.ok) console.error("Formspree error", res.status, await res.text());
    return res.ok;
  }

  // Test and local runs only: never silently succeed in production without a transport.
  if (process.env.CONTACT_TRANSPORT === "log") {
    console.info("[contact] would send:", subject);
    return true;
  }

  console.error("Contact form has no transport: set RESEND_API_KEY or FORMSPREE_URL");
  return false;
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(
    ["type", "name", "email", "company", "message"].map((k) => [k, String(formData.get(k) ?? "")]),
  );
  const kind = values.type === "hiring" ? "hiring" : "project";
  const id = randomUUID().slice(0, 8);

  // Validate first so a quick human with a typo sees their errors instead of being treated as a bot.
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      errors[field] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  // Bots: honeypot filled or form submitted implausibly fast. Show the normal success page, send nothing.
  // The time trap needs the client-side timestamp; without JavaScript it is absent, so only the honeypot applies.
  const startedAt = Number(formData.get("startedAt") || 0);
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  // Bots get the same page without a submission id, so no conversion fires for them.
  if (String(formData.get("website") ?? "") !== "" || tooFast) redirect(`/thank-you?type=${kind}`);

  const h = await headers();
  // Vercel sets x-real-ip / x-vercel-forwarded-for from the connection; the first x-forwarded-for hop is client-controlled.
  const ip = h.get("x-real-ip") ?? h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return { status: "error", message: "Too many messages from this connection. Please email me instead.", values };

  const d = parsed.data;
  const subject = d.type === "hiring" ? `Hiring enquiry from ${d.name}` : `Project enquiry from ${d.name}`;
  const text = [`Type: ${d.type}`, `Name: ${d.name}`, `Email: ${d.email}`, `Company: ${d.company || "-"}`, "", d.message].join("\n");

  const sent = await deliver(subject, text, d.email);
  if (!sent) return { status: "error", message: "Your message couldn't be sent. Please email me directly.", values };

  // Proof for /thank-you that this id came from a real delivery: forged or bot URLs fire no conversion.
  (await cookies()).set("lead", id, { httpOnly: true, sameSite: "lax", secure: true, maxAge: 600, path: "/thank-you" });
  redirect(`/thank-you?type=${kind}&s=${id}`);
}
