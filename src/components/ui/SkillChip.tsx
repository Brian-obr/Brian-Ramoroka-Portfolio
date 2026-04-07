"use client";
import { motion, useReducedMotion } from "framer-motion";

interface SkillChipProps {
  name: string;
  index?: number;
}

export default function SkillChip({ name, index = 0 }: SkillChipProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : index * 0.05 }}
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        bg-bg-subtle backdrop-blur-[8px] border border-border-subtle text-text-body
        hover:border-border-hover hover:text-accent transition-colors cursor-default"
    >
      {name}
    </motion.span>
  );
}
