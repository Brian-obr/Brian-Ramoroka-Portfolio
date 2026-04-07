"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function Summary() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-[800px] px-5 md:px-10 lg:px-20">
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-text-primary mb-8"
        >
          Summary
        </motion.h2>
        
        {[0, 1, 2].map((i) => (
          <motion.p
            key={i}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1 }}
            className="text-base text-text-primary leading-relaxed mb-6"
          >
            {i === 0 && "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
            {i === 1 && "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."}
            {i === 2 && "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
