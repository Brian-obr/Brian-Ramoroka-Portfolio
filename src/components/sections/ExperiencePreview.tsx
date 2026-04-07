"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { experiences } from "@/lib/constants";

export default function ExperiencePreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="05 — Experience" />
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          Where I&apos;ve been building.
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
              className="relative grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-4 md:gap-0"
            >
              {/* Left: date + company (desktop) */}
              <div className="hidden md:flex flex-col items-start text-left pt-1 pr-6">
                <span className="font-mono text-sm text-accent">{exp.dates}</span>
                <span className="text-sm text-white font-bold mt-1">{exp.company}</span>
              </div>

              {/* Timeline line + dot (desktop) */}
              <div className="hidden md:flex flex-col items-center w-6">
                <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent shadow-[0_0_8px_rgba(255,184,0,0.4)] flex-shrink-0 mt-1.5" />
                <div className="flex-1 w-px bg-border-subtle" />
              </div>

              {/* Mobile: date + company on top */}
              <div className="md:hidden flex items-center gap-3 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 shadow-[0_0_6px_rgba(255,184,0,0.4)]" />
                <span className="font-mono text-sm text-accent">{exp.dates}</span>
                <span className="text-sm text-white font-bold">· {exp.company}</span>
              </div>

              {/* Right: content */}
              <div className="md:ml-6 rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-5 md:p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">{exp.title}</h3>
                <p className="text-base text-text-body leading-relaxed mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.bullets.slice(0, 3).map((bullet, bi) => (
                    <li key={bi} className="text-base text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
          <Link href="/experience" className="deep-link text-base">
            See full experience →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
