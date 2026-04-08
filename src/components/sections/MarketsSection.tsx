"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { markets } from "@/lib/constants";

export default function MarketsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="04 — International Reach" />
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          Where I work.
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {markets.map((market, i) => (
            <motion.div
              key={market.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.05 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <span className="text-3xl block mb-2">{market.flag}</span>
              <h3 className="text-text-primary font-semibold text-sm">{market.name}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Link href="/about#markets" className="deep-link text-base">
            Learn more about my international work →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
