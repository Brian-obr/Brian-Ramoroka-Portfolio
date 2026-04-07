"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import BackgroundImage from "@/components/BackgroundImage";
import { services, markets, education } from "@/lib/constants";

const highlights = [
  { title: "Cross-Market Experience", description: "Serving clients across 8+ international markets — NL, DE, FR, ES, UK, USA, and ZA." },
  { title: "Dev + SEO Hybrid", description: "Combining full-stack development skills with deep SEO expertise for truly optimised web products." },
  { title: "Growth Focused", description: "Every line of code and every campaign is measured against real business growth metrics." },
];

export default function AboutPageClient() {
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 },
  };

  return (
    <>
      {/* Fixed full-page background — Sitting.png with lighter overlay */}
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Sitting.png" lighter />

      {/* Page header (no hero section, just text over background) */}
      <section className="relative z-10 pt-28 md:pt-[140px] pb-12">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <motion.h1
            {...fadeIn}
            className="text-[2.5rem] md:text-[4rem] font-display leading-[1.1] text-text-primary mb-4"
          >
            About Me
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="text-text-body text-lg max-w-2xl leading-relaxed"
          >
            SEO web developer and software engineer — building websites that perform in search results and drive real business growth.
          </motion.p>
        </div>
      </section>

      {/* Education */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <SectionLabel label="Education" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {education.map((entry, i) => (
              <motion.div
                key={entry.credential}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1 }}
                className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6"
              >
                <p className="text-accent font-mono text-sm mb-2">{entry.date}</p>
                <h3 className="text-text-primary font-semibold mb-1">{entry.credential}</h3>
                <p className="text-text-body text-sm">{entry.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Summary */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <SectionLabel label="01 — About" />
          <motion.h2
            {...fadeIn}
            className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
          >
            Developer precision.<br />Marketer&apos;s mindset.
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-5">
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                I&apos;m Brian Ramoroka — an SEO web developer and software engineer based in Cape Town, South Africa.
                I work at the intersection of web development and search engine optimisation, building websites that
                don&apos;t just look good but actually perform in search results. My{" "}
                <Link href="/skills" className="deep-link">technical skills</Link> span the full stack, and my{" "}
                <Link href="/experience" className="deep-link">work experience</Link> covers both development and SEO strategy.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                Currently at Rhiza Babuyile, a Dutch-based company, I develop and maintain SEO-optimised websites
                for clients across the Netherlands, Germany, France, Spain, the UK, and the USA. My work spans
                technical SEO audits, full SEO campaign execution, and ongoing web development.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                My technical foundation is in Java and Spring Boot, built through my diploma and internship at
                Pillar 5 Group, where I contributed to the full development lifecycle using PostgreSQL and Azure
                cloud services. I&apos;ve since expanded into the JavaScript ecosystem — React, Next.js, SvelteKit,
                and Node.js. You can see the full range in my{" "}
                <Link href="/portfolio" className="deep-link">portfolio</Link>.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                I believe the best websites are built by people who understand both the code and the strategy.
                That&apos;s what I bring — developer precision with a marketer&apos;s mindset. If you&apos;d like to work together,{" "}
                <Link href="/contact" className="deep-link">get in touch</Link>.
              </motion.p>
            </div>

            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1 }}
                  className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6"
                >
                  <h3 className="text-text-primary font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-body text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <SectionLabel label="02 — What I Do" />
          <motion.h2
            {...fadeIn}
            className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
          >
            End-to-end web development<br />&amp; SEO strategy.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.05 }}
                className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="text-accent font-mono text-sm mb-3 block">{service.number}</span>
                <h3 className="text-text-primary font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-text-body text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section id="markets" className="relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <SectionLabel label="03 — International Reach" />
          <motion.h2
            {...fadeIn}
            className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
          >
            Markets I work across.
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {markets.map((market, i) => (
              <motion.div
                key={market.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.05 }}
                className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-5 text-center"
              >
                <span className="text-3xl block mb-2">{market.flag}</span>
                <h3 className="text-text-primary font-semibold text-sm">{market.name}</h3>
                <p className="text-text-muted text-xs mt-1">{market.scope}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
