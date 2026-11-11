import type { Metadata } from "next";
import Link from "next/link";
import LeadEvent from "./LeadEvent";
import { personLd } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { CONTACT, MAILTO, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Message received | Brian Ramoroka",
  description: "Thanks for your message. Brian Ramoroka will reply by email.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}/thank-you` },
};

export default function ThankYouPage() {
  return (
    <>
      <JsonLd data={personLd} />
      <LeadEvent />
      <section className="pt-12 md:pt-20 pb-20">
        <div className="mx-auto max-w-[720px] px-5 md:px-10">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-display leading-[1.1] text-text-primary mb-6">
            Thanks. Your message is on its way.
          </h1>
          <p className="text-text-body text-lg leading-relaxed mb-4">
            I&apos;ll reply by email. If you don&apos;t see a reply, check your spam folder or email me at{" "}
            <a href={MAILTO} className="deep-link">
              {CONTACT.email}
            </a>
            .
          </p>
          <p className="text-text-body leading-relaxed mb-10">While you wait, you might find these useful:</p>
          <ul className="space-y-3">
            <li>
              <Link href="/experience" className="deep-link">
                See what I&apos;ve worked on
              </Link>
            </li>
            <li>
              <a href={CONTACT.linkedin} className="deep-link" target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
