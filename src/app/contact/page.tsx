import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import ContactForm from "@/components/sections/ContactForm";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Brian Ramoroka for web development, SEO strategy, or software engineering projects. Based in Cape Town, South Africa.",
  openGraph: {
    title: "Contact — Brian Ramoroka",
    description:
      "Get in touch with Brian Ramoroka for web development, SEO strategy, or software engineering projects.",
  },
  alternates: {
    canonical: "https://brianramoroka.co.za/contact",
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ramorokaob@gmail.com",
    href: "mailto:ramorokaob@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+27 81 379 8635",
    href: "tel:+27813798635",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cape Town, South Africa",
    href: undefined,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/brian-obr",
    href: "https://za.linkedin.com/in/brian-obr",
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Brian-obr",
    href: "https://github.com/Brian-obr",
    external: true,
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://brianramoroka.co.za/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Standing.png" />
      <PageTransition>
      <section className="pt-16 md:pt-[120px] pb-14 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <h1 className="text-[2rem] md:text-[3rem] font-display leading-[1.2] text-text-primary mb-3">
            Let&apos;s Work Together
          </h1>
          <p className="text-text-body text-base mb-8 md:mb-12 max-w-xl">
            Have a project in mind or want to discuss how I can help? Take a look at{" "}
            <Link href="/experience" className="deep-link">my experience</Link> and{" "}
            <Link href="/skills" className="deep-link">my skills</Link>, then fill out the
            form below or reach out directly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Form */}
            <div className="md:col-span-3 relative">
              <ContactForm />
              <noscript>
                <div className="bg-bg-card-solid rounded-[20px] p-6 text-center">
                  <p className="text-text-secondary">
                    JavaScript is required for the contact form. Please email me
                    directly at{" "}
                    <a
                      href="mailto:ramorokaob@gmail.com"
                      className="text-accent hover:text-accent-hover"
                    >
                      ramorokaob@gmail.com
                    </a>
                  </p>
                </div>
              </noscript>
            </div>

            {/* Contact info */}
            <div className="md:col-span-2">
              <div className="bg-bg-card-solid rounded-[20px] p-6 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon
                      className="text-accent mt-0.5 shrink-0"
                      size={20}
                    />
                    <div>
                      <span className="text-text-muted text-xs uppercase tracking-wider block mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...("external" in item && item.external
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="deep-link text-sm"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-text-primary text-sm">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
    </>
  );
}
