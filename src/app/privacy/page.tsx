import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy | Brian Ramoroka",
  description: "How Brian Ramoroka collects, uses and protects personal information under POPIA and the GDPR.",
  alternates: { canonical: "/privacy" },
};

const updated = "19 October 2026";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[760px] px-4 sm:px-6 pt-12 md:pt-20 pb-10 text-text-body leading-relaxed space-y-6">
      <JsonLd data={pageGraph({ path: "/privacy", name: "Privacy policy", description: metadata.description as string, breadcrumb: [{ name: "Privacy policy", path: "/privacy" }] })} />
      <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-primary">Privacy policy</h1>
      <p>Last updated: {updated}</p>

      <h2 className="text-2xl font-semibold text-text-primary pt-4">Who I am</h2>
      <p>
        This site belongs to Brian Ramoroka, a web developer based in Cape Town, South Africa. I am the responsible
        party under the Protection of Personal Information Act, 2013 (POPIA), and the controller under the EU and UK
        GDPR for visitors from those regions.
      </p>
      <p>
        <strong>Information Officer:</strong> Brian Ramoroka,{" "}
        <a className="deep-link" href="mailto:ramorokaob@gmail.com">ramorokaob@gmail.com</a>, +27 81 379 8635.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary pt-4">What I collect and why</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Contact form:</strong> your name, email, company (optional) and message, used only to reply to your
          enquiry. Legal basis: your consent and the steps you ask me to take before an agreement.
        </li>
        <li>
          <strong>Analytics (only if you accept):</strong> Google Analytics 4 records pages viewed, device type and an
          approximate location. IP addresses are not stored by GA4. Legal basis: consent, which you can withdraw at any
          time with &quot;Cookie settings&quot; in the footer.
        </li>
        <li>
          <strong>Performance:</strong> Vercel Speed Insights measures page speed without cookies or identifiers.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-text-primary pt-4">Who processes it</h2>
      <p>
        Vercel (hosting), Google (analytics, if accepted) and my email provider. Some of these process data outside South
        Africa under contractual safeguards. I don&apos;t sell personal information or use it for advertising.
      </p>

      <h2 className="text-2xl font-semibold text-text-primary pt-4">How long I keep it</h2>
      <p>Enquiries: up to 24 months, then deleted. Analytics: 14 months (the GA4 retention setting).</p>

      <h2 className="text-2xl font-semibold text-text-primary pt-4">Your rights</h2>
      <p>
        You can ask to see, correct or delete your information, object to its use, or withdraw consent. Email me and
        I&apos;ll respond within 30 days. You can also complain to the Information Regulator (South Africa) at{" "}
        <a className="deep-link" href="https://inforegulator.org.za/">inforegulator.org.za</a>, or to your local data
        protection authority in the EU or UK.
      </p>

      <p>
        Cookies are explained in the <Link className="deep-link" href="/cookies">cookie policy</Link>.
      </p>
    </article>
  );
}
