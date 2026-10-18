"use client";
import { Mail, Phone } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactCTA() {

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 text-center flex flex-col items-center">
        <SectionLabel label="07 — Get in Touch" />
        <h2
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-4"
        >
          Let us build something<br />that actually works.
        </h2>

        <p
          className="text-text-body text-base max-w-xl mb-8 leading-relaxed"
        >
          Whether you need a website, SEO strategy, or are looking to add a developer to your team — I am here for it.
        </p>

        <div
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="mailto:ramorokaob@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-colors"
          >
            <Mail size={16} />
            ramorokaob@gmail.com
          </a>
          <a
            href="tel:+27813798635"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-text-primary font-semibold text-sm hover:border-accent transition-colors"
          >
            <Phone size={16} />
            +27 81 379 8635
          </a>
        </div>
      </div>
    </section>
  );
}
