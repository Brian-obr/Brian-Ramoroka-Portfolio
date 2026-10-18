"use client";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { markets } from "@/lib/constants";

export default function MarketsSection() {

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="04 — International Reach" />
        <h2
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          Where I work.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {markets.map((market) => (
            <div
              key={market.name}
              className="glass rounded-2xl p-5 text-center"
            >
              <span className="text-3xl block mb-2">{market.flag}</span>
              <h3 className="text-text-primary font-semibold text-sm">{market.name}</h3>
            </div>
          ))}
        </div>

        <div
          className="mt-8"
        >
          <Link href="/about#markets" className="deep-link text-base">
            Learn more about my international work →
          </Link>
        </div>
      </div>
    </section>
  );
}
