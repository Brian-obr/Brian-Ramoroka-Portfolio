"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const levelWidth: Record<string, number> = {
  proficient: 100,
  experienced: 75,
  familiar: 50,
};

export default function SkillBar({
  name,
  level,
}: {
  name: string;
  level: "proficient" | "experienced" | "familiar";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const width = levelWidth[level];
  const truncated = name.length > 25;

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-base font-medium text-text-primary ${
            truncated ? "truncate max-w-[200px]" : ""
          }`}
          title={truncated ? name : undefined}
        >
          {name}
        </span>
        <span className="text-xs text-text-muted capitalize">{level}</span>
      </div>
      <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: prefersReducedMotion ? `${width}%` : 0 }}
          animate={inView ? { width: `${width}%` } : {}}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
}
