import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

const LIMIT_PER_WINDOW = 5;
const WINDOW_MS = 3_600_000;
// Entries are swept once the map reaches this size; past it, the oldest key is dropped.
const MAX_TRACKED_KEYS = 5_000;
// Longest IPv6 text form is 45 characters; anything longer is not an address.
const MAX_KEY_LENGTH = 64;
// The largest valid submission is well under this, even in 4-byte UTF-8.
const MAX_BODY_BYTES = 16_384;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function makeRoom(now: number) {
  if (rateLimit.size < MAX_TRACKED_KEYS) return;
  for (const [key, entry] of rateLimit) {
    if (now > entry.resetAt) rateLimit.delete(key);
  }
  if (rateLimit.size >= MAX_TRACKED_KEYS) {
    // Map keeps insertion order, so the first key is the oldest window.
    const oldest = rateLimit.keys().next().value;
    if (oldest !== undefined) rateLimit.delete(oldest);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetAt) {
    if (entry) rateLimit.delete(key);
    else makeRoom(now);
    rateLimit.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= LIMIT_PER_WINDOW) return true;

  entry.count++;
  return false;
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
  return key.slice(0, MAX_KEY_LENGTH);
}

/** A browser on another site may not post here; requests with no Origin (non-browser) pass. */
function isCrossOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

function fail(error: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ error, ...extra }, { status });
}

export async function POST(request: NextRequest) {
  // Cheap header checks run before the limiter, so another site cannot spend a visitor's budget.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return fail("Unsupported content type.", 415);
  }
  if (isCrossOrigin(request)) {
    return fail("Forbidden.", 403);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return fail("Request body too large.", 413);
  }

  if (isRateLimited(clientKey(request))) {
    return fail("Too many requests. Please try again later.", 429);
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
    return fail("Request body too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    console.error("Contact form: request body is not valid JSON");
    return fail("Invalid request body.", 400);
  }

  // Honeypot check: silent 200, nothing forwarded.
  // Must run before safeParse so the Zod schema never rejects it.
  if (
    body !== null &&
    typeof body === "object" &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fields[field] ??= issue.message;
    }
    return fail("Validation failed.", 400, { fields });
  }

  const data = result.data;

  const formspreeUrl = process.env.FORMSPREE_URL;
  if (!formspreeUrl) {
    console.error("Contact form: FORMSPREE_URL is not configured");
    return fail("Contact form is not configured. Please try again later.", 500);
  }

  try {
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company || "Not specified",
        role: data.role || "Not specified",
        message: data.message,
      }),
    });

    if (!response.ok) {
      console.error("Contact form: Formspree responded with status", response.status);
      return fail("Failed to send message. Please try again later.", 500);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Contact form: forwarding to Formspree failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return fail("Failed to send message. Please try again later.", 500);
  }
}
