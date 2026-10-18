import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie policy | Brian Ramoroka",
  description: "The cookies and similar technologies used on brianramoroka.co.za, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

const rows = [
  ["consent.v1 (local storage)", "This site", "Remembers your cookie choice", "Until you clear it", "Necessary"],
  ["_ga, _ga_<id>", "Google Analytics 4", "Counts visits and pages viewed", "Up to 2 years", "Analytics (only if accepted)"],
  ["Speed Insights", "Vercel", "Measures page speed; no cookies or identifiers", "None stored", "Necessary"],
];

export default function CookiesPage() {
  return (
    <article className="relative z-10 mx-auto max-w-[760px] px-5 md:px-10 pt-32 pb-24 text-text-body leading-relaxed space-y-6">
      <JsonLd data={pageGraph({ path: "/cookies", name: "Cookie policy", description: metadata.description as string, breadcrumb: [{ name: "Cookie policy", path: "/cookies" }] })} />
      <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] text-text-primary">Cookie policy</h1>
      <p>
        Analytics cookies are only set after you choose &quot;Accept analytics&quot;. Until then, Google Analytics runs in
        consent mode and sets no cookies.
      </p>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Cookies used on this site">
        <table className="w-full text-left text-sm">
          <thead className="text-text-primary">
            <tr>
              {["Name", "Set by", "Purpose", "Duration", "Category"].map((h) => (
                <th key={h} className="py-2 pr-4 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-border-subtle align-top">
                {r.map((c) => (
                  <td key={c} className="py-2 pr-4">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>You can change your choice at any time:</p>
      <CookieSettingsButton className="min-h-[44px] rounded-lg border border-border-subtle px-4 text-text-primary hover:border-accent" />
    </article>
  );
}
