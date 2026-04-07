"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Experience, Project } from "@/types";

interface ExperienceEntryProps {
  experience: Experience;
  index: number;
  linkedProjects: Project[];
}

export default function ExperienceEntry({ experience, index, linkedProjects }: ExperienceEntryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      className="relative grid grid-cols-1 md:grid-cols-[200px_auto_1fr] gap-4 md:gap-0"
    >
      {/* Left: date + company (desktop) */}
      <div className="hidden md:flex flex-col items-start text-left pt-1 pr-6">
        <span className="font-mono text-sm text-accent">{experience.dates}</span>
        <span className="text-sm text-white font-bold mt-1">{experience.company}</span>
      </div>

      {/* Timeline line + dot (desktop) */}
      <div className="hidden md:flex flex-col items-center w-6">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-accent shadow-[0_0_8px_rgba(255,184,0,0.4)] flex-shrink-0 mt-1.5" />
        <div className="flex-1 w-px bg-border-subtle" />
      </div>

      {/* Mobile: date + company on top */}
      <div className="md:hidden flex items-center gap-3 mb-1">
        <div className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 shadow-[0_0_6px_rgba(255,184,0,0.4)]" />
        <span className="font-mono text-sm text-accent">{experience.dates}</span>
        <span className="text-sm text-white font-bold">· {experience.company}</span>
      </div>

      {/* Right: content */}
      <div className="md:ml-6 rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-5 md:p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">{experience.title}</h2>
        <p className="text-base text-text-body leading-relaxed mb-4">{experience.description}</p>

        {linkedProjects.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-text-muted mb-3">Selected Projects:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="block p-4 rounded-xl backdrop-blur-[12px] bg-bg-card border border-border-subtle
                    hover:border-border-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                  <p className="font-semibold text-text-primary text-sm">{project.title}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{project.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <ul className="space-y-2">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="text-base text-text-body flex gap-2">
              <span className="text-accent flex-shrink-0">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
