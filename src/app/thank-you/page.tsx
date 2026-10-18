import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import ThankYouTracker from "./ThankYouTracker";

export const metadata: Metadata = {
  title: "Thanks for your message | Brian Ramoroka",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ type?: string; s?: string }> }) {
  const { type, s } = await searchParams;
  const kind = type === "hiring" ? "hiring" : "project";
  // Only a submission that went through the Server Action carries a matching httpOnly cookie.
  const lead = (await cookies()).get("lead")?.value;
  const id = s && lead === s ? s : null;

  return (
    <section className="mx-auto max-w-[760px] px-4 sm:px-6 pt-12 md:pt-20 pb-10">
      {id && <ThankYouTracker type={kind} id={id} />}
      <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-primary mb-6">Thanks, your message is in.</h1>
      <p className="text-text-body text-lg leading-relaxed mb-8">
        I reply within one working day (South African time). If it&apos;s urgent, call or WhatsApp me on{" "}
        <a className="deep-link" href="tel:+27813798635">
          +27 81 379 8635
        </a>
        .
      </p>
      <ul className="flex flex-wrap gap-6 text-text-body">
        {kind === "hiring" ? (
          <>
            <li><Link className="deep-link" href="/experience">Read my experience</Link></li>
            <li><Link className="deep-link" href="/skills">See my skills</Link></li>
          </>
        ) : (
          <>
            <li><Link className="deep-link" href="/services">See what I offer</Link></li>
            <li><Link className="deep-link" href="/about">More about me</Link></li>
          </>
        )}
      </ul>
    </section>
  );
}
