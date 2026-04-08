"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Search, Layout, Database, Wrench } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { skillGroups } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "Languages & Frameworks": Code2,
  "SEO & Analytics": Search,
  "CMS Platforms": Layout,
  "Databases": Database,
  "Tools & Platforms": Wrench,
};

const previewCounts: Record<string, number> = {
  "Languages & Frameworks": 3,
  "SEO & Analytics": 3,
  "CMS Platforms": 3,
  "Databases": 2,
  "Tools & Platforms": 3,
};

export default function SkillsPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="03 — Technical Skills" />
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          What I work with.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, gi) => {
            const Icon = iconMap[group.name];
            const count = previewCounts[group.name] || 3;
            const previewSkills = group.skills.slice(0, count);

            return (
              <motion.div
                key={group.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : gi * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {Icon && <Icon size={16} className="text-accent" />}
                  <h3 className="text-text-primary font-semibold text-sm font-mono tracking-wide uppercase">
                    {group.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {previewSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-bg-subtle text-text-body border border-border-subtle hover:border-accent hover:text-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                  {group.skills.length > count && (
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium text-text-muted">
                      +{group.skills.length - count} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <Link href="/skills" className="deep-link text-base">
            View all skills →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
