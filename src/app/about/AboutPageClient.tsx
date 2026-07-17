"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import BackgroundImage from "@/components/BackgroundImage";
import { markets, education } from "@/lib/constants";

const highlights = [
  {
    title: "Cross-Market Reach",
    description: "150+ clients across South Africa, Netherlands, Belgium, Germany, France, Spain, UK, and USA.",
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
    title: "Results-Driven",
    description: "90%+ good KPI ratings. Open to joining development teams.",
  },
];

const whatIDo = [
  { number: "01", title: "Technical SEO Audits", description: "Comprehensive scans covering crawlability, indexation, site speed, Core Web Vitals, and structured data." },
  { number: "02", title: "Web Development & Maintenance", description: "Building and maintaining responsive, high-performance websites using modern frameworks and CMS platforms." },
  { number: "03", title: "On-Page Optimisation", description: "Strategic keyword integration, meta tags, heading structure, content hierarchy, and schema markup." },
  { number: "04", title: "Keyword Research & Tracking", description: "In-depth research using Ahrefs and Google Search Console. Continuous tracking and reporting." },
  { number: "05", title: "Link Building", description: "Strategies that strengthen domain authority. Quality over quantity — relevant, high-authority backlinks." },
  { number: "06", title: "Campaign Management", description: "Local, provincial, national, and international SEO campaigns — strategy tailored to scope." },
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
      <BackgroundImage imageSrc="/images/brian-ramoroka-software-engineer-cape-town.webp" lighter />

      {/* Hero */}
      <section className="relative z-10 pt-28 md:pt-[140px] pb-12">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
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
                I build websites that pull their weight in search results. That is what I do. SEO web development
                and software engineering. One person, both sides.
              </motion.p>
            </div>

            {/* Education sidebar */}
            <motion.div {...fadeIn} className="space-y-3 lg:text-right">
              {education.map((entry) => (
                <div key={entry.credential}>
                  <p className="text-accent font-mono text-sm">{entry.date}</p>
                  <p className="text-text-primary text-sm font-semibold">{entry.credential}</p>
                  <p className="text-text-muted text-xs">{entry.institution}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 01 — About */}
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
                I am Brian Ramoroka — an SEO web developer and software engineer based in Cape Town, South Africa.
                I work at the intersection of web development and search engine optimisation, building websites that
                do not just look good but actually perform in search results.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                I work at Rhiza Babuyile, a South African company partnering with Grizzly New Marketing in the
                Netherlands. Together we manage over 150 client websites across the Netherlands, Belgium, Germany,
                France, Spain, the UK, and the USA. My work spans technical SEO audits, full SEO campaign execution,
                and ongoing web development.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                Performance is measured using a KPI system with four tiers: Good, Sufficient, Not Sufficient, and
                Not Good. Over 90% of the websites I work on are rated Good. Over 80% are rated Good on their own,
                and over 90% achieve a combined Good and Sufficient rating. This covers both web development and{" "}
                <Link href="/services" className="deep-link">SEO services</Link>.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                I started with Java and Spring Boot at CPUT and during my internship at{" "}
                <Link href="/experience" className="deep-link">Business Innovation and Incubation (BiiC)</Link>.
                Since then I have expanded into JavaScript, React, Next.js, SvelteKit, Node.js, and CMS platforms
                including WordPress, Shopify, Wix, Magento, Webflow, and custom builds.
              </motion.p>
              <motion.p {...fadeIn} className="text-text-body leading-relaxed">
                I believe the best websites are built by people who understand both the code and the strategy.
                I am also keen to join development teams — whether full-time, contract, or project-based. If you
                would like to connect,{" "}
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

      {/* 02 — What I Do */}
      <section id="services" className="relative z-10 py-20 md:py-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <SectionLabel label="02 — What I Do" />
          <motion.h2
            {...fadeIn}
            className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-4"
          >
            What I bring to the table.
          </motion.h2>
          <motion.p {...fadeIn} className="text-text-body mb-12 max-w-2xl">
            A full breakdown is on my{" "}
            <Link href="/services" className="deep-link">services page</Link>.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {whatIDo.map((service, i) => (
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
                <h3 className="text-text-primary font-semibold text-lg mb-2">
                  {service.number === "06" ? (
                    <Link href="/contact" className="hover:text-accent transition-colors">{service.title}</Link>
                  ) : (
                    service.title
                  )}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — International Reach */}
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
