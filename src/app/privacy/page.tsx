import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/schema";
import { CookieSettingsButton } from "@/components/consent/Consent";
import { CONTACT, MAILTO } from "@/lib/site";

const description =
  "How brianramoroka.co.za handles personal information under POPIA and GDPR: contact form data, analytics cookies (only with consent) and your rights.";

export const metadata: Metadata = pageMetadata({ title: "Privacy & cookies | Brian Ramoroka", description, path: "/privacy" });

const cookies = [
  { name: "consent (local storage)", who: "This site", why: "Remembers whether you accepted or rejected analytics", kept: "Until you clear it" },
  { name: "lead_pending (session storage)", who: "This site", why: "Counts a sent contact form once on the thank-you page", kept: "Removed on the thank-you page" },
  { name: "consent_reloaded (session storage)", who: "This site", why: "Makes sure the page reloads only once after you withdraw consent", kept: "Until you close the tab" },
  { name: "None", who: "Google Tag Manager (only after you accept)", why: "Loads the Google Analytics tag", kept: "Sets no cookies of its own" },
  { name: "_ga, _ga_<ID>", who: "Google Analytics 4 (only after you accept)", why: "Counts visits and which pages are used", kept: "Up to 2 years" },
  { name: "None (cookieless)", who: "Vercel Web Analytics", why: "Counts visits and page views; no personal data", kept: "Aggregated only" },
  { name: "None (cookieless)", who: "Vercel Speed Insights", why: "Anonymous page-speed measurements; no personal data", kept: "Aggregated only" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={personLd} />
      <section className="pt-12 md:pt-20 pb-20">
        <div className="mx-auto max-w-[760px] px-5 md:px-10 space-y-6 text-text-body leading-relaxed">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-display leading-[1.1] text-text-primary">Privacy &amp; cookies</h1>
          <p>Last updated: 11/2026</p>

          <h2 className="text-2xl font-semibold text-text-primary pt-4">Who is responsible</h2>
          <p>
            Brian Ramoroka, Cape Town, South Africa, is the responsible party and Information Officer for this site under
            the Protection of Personal Information Act (POPIA), and the controller under the GDPR for visitors in the EU
            and UK. Contact: <a href={MAILTO} className="deep-link">{CONTACT.email}</a>.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary pt-4">What I collect and why</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-text-primary">Contact form:</strong> your name, email address, company and role
              (both optional) and message, used only to reply to you. The form is delivered through Formspree (USA), so it is transferred
              outside South Africa under Formspree&apos;s data-protection terms. I keep enquiries for up to 24 months, then
              delete them. To limit spam, the server counts messages per IP address for up to one hour and keeps
              nothing after that.
            </li>
            <li>
              <strong className="text-text-primary">Analytics:</strong> only if you click Accept, Google Tag Manager loads
              Google Analytics 4, which records pages viewed, approximate location, device type, clicks on email, phone, WhatsApp and CV links, clicks on
              links to other websites (including the link address), and whether the contact form was sent. Both are Google
              services, so this data is processed outside South Africa under Google&apos;s data-protection terms. If you
              reject, neither loads; if you later withdraw consent, the analytics cookies are deleted and the page reloads
              without them.
            </li>
            <li>
              <strong className="text-text-primary">Visit counts:</strong> Vercel Web Analytics counts page views, the
              referring site, country, browser and device type without cookies. Visitors are told apart only by a code that
              resets every day, and no IP address is stored, so it runs without asking.
            </li>
            <li>
              <strong className="text-text-primary">Hosting:</strong> Vercel serves this site and keeps short-lived server
              logs (including IP addresses) for security and reliability.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary pt-4">Cookies and similar storage</h2>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Cookies table">
            <table className="w-full text-left text-sm">
              <thead className="text-text-primary">
                <tr>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Set by</th>
                  <th className="py-2 pr-4">Purpose</th>
                  <th className="py-2">Kept</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
                  <tr key={c.who} className="border-t border-border-subtle align-top">
                    <td className="py-2 pr-4">{c.name}</td>
                    <td className="py-2 pr-4">{c.who}</td>
                    <td className="py-2 pr-4">{c.why}</td>
                    <td className="py-2">{c.kept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            You can change your choice at any time: <CookieSettingsButton className="deep-link" />.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary pt-4">Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal information I hold about you, or object to its use, by
            emailing me. I reply within 30 days. If you are not satisfied, you can complain to the{" "}
            <a href="https://inforegulator.org.za" className="deep-link" target="_blank" rel="noopener noreferrer">
              Information Regulator (South Africa)
            </a>{" "}
            or, in the EU/UK, to your local data-protection authority.
          </p>
        </div>
      </section>
    </>
  );
}
