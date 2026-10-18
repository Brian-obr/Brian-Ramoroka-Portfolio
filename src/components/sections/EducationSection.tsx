"use client";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { education } from "@/lib/constants";

export default function EducationSection() {

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="06 — Education" />
        <h2
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          The foundation.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {education.map((entry) => (
            <div
              key={entry.credential}
              className="glass rounded-2xl p-6"
            >
              <p className="text-accent font-mono text-sm mb-2">{entry.date}</p>
              <h3 className="text-text-primary font-semibold mb-1">{entry.credential}</h3>
              <p className="text-text-muted text-sm">{entry.institution}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-8"
        >
          <Link href="/skills" className="deep-link text-base">
            View skills &amp; education →
          </Link>
        </div>
      </div>
    </section>
  );
}
