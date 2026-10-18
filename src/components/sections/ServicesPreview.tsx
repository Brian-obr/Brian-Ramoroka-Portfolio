"use client";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const previewServices = [
  { number: "01", title: "Web Development", description: "Custom websites, responsive builds, modern frameworks, CMS platforms — built to perform and rank." },
  { number: "02", title: "SEO Strategy & Campaigns", description: "Technical audits, on-page optimisation, keyword research, link building, and full campaign management." },
  { number: "03", title: "Maintenance & Support", description: "Ongoing website maintenance, performance monitoring, security updates, and CMS management." },
];

export default function ServicesPreview() {

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <SectionLabel label="02 — Services" />
        <h2
          className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-12"
        >
          From code to clicks.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {previewServices.map((service) => (
            <div
              key={service.number}
              className="glass rounded-2xl p-6 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="text-accent font-mono text-sm mb-3 block">{service.number}</span>
              <h3 className="text-text-primary font-semibold text-lg mb-2">
                {service.number === "01" ? (
                  <Link href="/services" className="hover:text-accent transition-colors">{service.title}</Link>
                ) : service.number === "03" ? (
                  <Link href="/services" className="hover:text-accent transition-colors">{service.title}</Link>
                ) : (
                  service.title
                )}
              </h3>
              <p className="text-text-body text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-8"
        >
          <Link href="/services" className="deep-link text-base">
            See all services →
          </Link>
        </div>
      </div>
    </section>
  );
}
