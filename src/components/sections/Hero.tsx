"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import OpenToWorkBadge from "@/components/ui/OpenToWorkBadge";
import ContactInfoRow from "@/components/ui/ContactInfoRow";

const stats = [
  { value: "8+", label: "International Markets" },
  { value: "Full-Stack", label: "Development" },
  { value: "SEO", label: "Driven Growth" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  return (
    <section className="min-h-screen flex items-center">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 w-full py-20">
        <motion.div {...fadeUp(0)} className="mb-6">
          <OpenToWorkBadge />
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="text-accent text-xl font-medium mb-3 font-mono tracking-wide uppercase text-sm">
          SEO Web Developer
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="text-[2.5rem] md:text-[4.5rem] font-display leading-[1.1] text-text-primary mb-6"
        >
          Brian Ramoroka
        </motion.h1>

        <motion.p {...fadeUp(0.25)} className="text-text-body text-base md:text-lg max-w-xl mb-8 leading-relaxed">
          SEO web developer and software engineer based in Cape Town. I combine{" "}
          <Link href="/skills" className="deep-link">technical development</Link> with{" "}
          <Link href="/about#services" className="deep-link">search engine performance</Link> to build
          high-performance websites that rank across international markets.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mb-12">
          <ContactInfoRow layout="horizontal" />
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
              <p className="text-text-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
