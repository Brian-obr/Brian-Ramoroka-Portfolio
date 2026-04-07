"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Search,
  LayoutDashboard,
  Bot,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Search,
  LayoutDashboard,
  Bot,
  Lightbulb,
  Target,
  Rocket,
};

export default function ServiceCard({
  iconName,
  title,
  description,
}: {
  iconName: string;
  title: string;
  description: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = iconMap[iconName];

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="bg-bg-elevated rounded-lg p-6 border-l-[3px] border-transparent hover:border-accent transition-colors group"
    >
      {Icon && <Icon className="text-accent mb-4" size={24} />}
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
