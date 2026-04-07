"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const highlights = [
  { title: "Cross-Market Experience", description: "Serving clients across 8+ international markets — NL, DE, FR, ES, UK, USA, and ZA." },
  { title: "Dev + SEO Hybrid", description: "Combining full-stack development skills with deep SEO expertise for truly optimised web products." },
  { title: "Growth Focused", description: "Every line of code and every campaign is measured against real business growth metrics." },
];

export default function AboutSummary() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 },
  };

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="01 — About" />
        <motion.h2
          {...fadeIn}
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          Developer precision.<br />Marketer&apos;s mindset.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: About text (shortened for homepage) */}
          <div className="space-y-5">
            <motion.p {...fadeIn} className="text-text-body leading-relaxed">
              I&apos;m Brian Ramoroka — an SEO web developer and{" "}
              <Link href="/experience" className="deep-link">software engineer</Link> based in Cape Town, South Africa.
              I work at the intersection of web development and search engine optimisation, building websites that
              don&apos;t just look good but actually perform in search results.
            </motion.p>
            <motion.p {...fadeIn} className="text-text-body leading-relaxed">
              Currently at Rhiza Babuyile, I develop SEO-optimised websites for clients across the Netherlands, Germany, France, Spain, the UK, and the USA. My work spans{" "}
              <Link href="/about#services" className="deep-link">SEO campaigns</Link>, technical audits, and ongoing web development.
            </motion.p>
            <motion.div {...fadeIn}>
              <Link href="/about" className="deep-link text-base">
                Read more about me →
              </Link>
            </motion.div>
          </div>

          {/* Right: Highlight cards */}
          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-text-primary font-semibold mb-2">{item.title}</h3>
                <p className="text-text-body text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
