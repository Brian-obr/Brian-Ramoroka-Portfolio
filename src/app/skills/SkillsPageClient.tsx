"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Search, Database, Wrench } from "lucide-react";
import SkillChip from "@/components/ui/SkillChip";
import LanguageBar from "@/components/ui/LanguageBar";
import EducationEntry from "@/components/ui/EducationEntry";
import BackgroundImage from "@/components/BackgroundImage";
import { skillGroups, languages, education } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "Languages & Frameworks": Code2,
  "SEO & Analytics": Search,
  "Databases": Database,
  "Tools & Platforms": Wrench,
};

export default function SkillsPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Sitting-down.png" />
      <section className="relative z-10 pt-20 md:pt-[120px] pb-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 space-y-20">

          {/* Page header — no hero image, just text over fixed background */}
          <div>
            <h1 className="text-[2rem] md:text-[3rem] font-display text-text-primary mb-2">
              Skills &amp; Tools
            </h1>
            <p className="text-text-body max-w-xl">
              The technologies and tools I use to build high-performance websites. See how I apply these in{" "}
              <Link href="/experience" className="deep-link">my work</Link>, or check out{" "}
              <Link href="/portfolio" className="deep-link">my projects</Link>.
            </p>
          </div>

          {/* Skills & Tools - Grouped */}
          <div>
            <div className="space-y-12">
              {skillGroups.map((group, gi) => {
                const Icon = iconMap[group.name];
                return (
                  <motion.div
                    key={group.name}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : gi * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {Icon && <Icon size={18} className="text-accent" />}
                      <h2 className="text-lg font-semibold text-text-primary font-mono tracking-wide">
                        {group.name}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {group.skills.map((skill, i) => (
                        <SkillChip key={skill} name={skill} index={i} />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">Languages</h2>
            <div className="space-y-4 max-w-xl">
              {languages.map((lang) => (
                <LanguageBar
                  key={lang.name}
                  language={lang.name}
                  proficiency={lang.proficiency}
                  barWidth={lang.barWidth}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((entry) => (
                <EducationEntry
                  key={entry.credential}
                  institution={entry.institution}
                  credential={entry.credential}
                  date={entry.date}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
