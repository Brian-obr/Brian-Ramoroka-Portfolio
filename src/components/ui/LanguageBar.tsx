"use client";
import { motion, useReducedMotion } from "framer-motion";

interface LanguageBarProps {
  language: string;
  proficiency: string;
  barWidth: number;
}

export default function LanguageBar({ language, proficiency, barWidth }: LanguageBarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="sm:w-40 flex-shrink-0">
        <span className="text-base font-medium text-text-primary">{language}</span>
        <span className="text-sm text-text-muted ml-2">{proficiency}</span>
      </div>
      <div className="flex-1 h-2 rounded-full bg-bg-subtle overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${barWidth}%` }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
