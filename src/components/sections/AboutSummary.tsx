"use client";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const highlights = [
  {
    title: "Cross-Market Reach",
    description: "South Africa, Netherlands, Belgium, Germany, France, Spain, UK, and USA.",
  },
  {
    title: "Developer + SEO Specialist",
    description: (
      <>
        Full-stack development combined with deep SEO expertise.{" "}
        <Link href="/services" className="deep-link text-sm">See services</Link>
      </>
    ),
  },
  {
    title: "Results That Count",
    description: "90%+ good KPI ratings across 150+ client websites.",
  },
];

export default function AboutSummary() {

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="01 — About" />
        <h2
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          The short version.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-5">
            <p className="text-text-body leading-relaxed">
              I work at Rhiza Babuyile, a South African company partnering with Grizzly New Marketing in the
              Netherlands. Together we manage over 150 client websites across international markets, with 90%+ good
              KPI ratings. If that sounds like what you need,{" "}
              <Link href="/contact" className="deep-link">let us talk</Link>.
            </p>
            <div>
              <Link href="/about" className="deep-link text-base">
                More about me →
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-text-primary font-semibold mb-2">{item.title}</h3>
                <p className="text-text-body text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
