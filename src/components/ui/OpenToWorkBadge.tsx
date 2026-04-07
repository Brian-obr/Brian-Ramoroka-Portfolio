"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function OpenToWorkBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
      bg-bg-card backdrop-blur-[16px] border border-border-subtle">
      <motion.span
        className="w-2 h-2 rounded-full bg-accent-green flex-shrink-0"
        animate={prefersReducedMotion ? {} : {
          opacity: [1, 0.4, 1],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-sm font-medium text-text-primary">Open to work</span>
    </div>
  );
}
