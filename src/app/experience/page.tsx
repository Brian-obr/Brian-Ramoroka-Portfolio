import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";
import ExperienceEntry from "@/components/ui/ExperienceEntry";
import { experiences } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Work Experience | Brian Ramoroka | SEO Web Developer & Software Engineer",
  description:
    "Brian Ramoroka work experience. SEO web development across 150+ international client websites and Java/Spring Boot software development.",
  openGraph: {
    title: "Work Experience | Brian Ramoroka | SEO Web Developer & Software Engineer",
    description:
      "Brian Ramoroka work experience. SEO web development across 150+ international client websites and Java/Spring Boot software development.",
    url: "https://www.brianramoroka.co.za/experience",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience | Brian Ramoroka | SEO Web Developer & Software Engineer",
    description:
      "Brian Ramoroka work experience. SEO web development across 150+ international client websites and Java/Spring Boot software development.",
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/experience" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "Experience", item: "https://www.brianramoroka.co.za/experience" },
  ],
};

export default function ExperiencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BackgroundImage imageSrc="/images/brian-ramoroka-developer-cape-town.webp" />
      <PageTransition>
        <section className="relative z-10 pt-20 md:pt-[120px] pb-16">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <div className="mb-12">
              <h1 className="text-[2rem] md:text-[3rem] font-bold text-text-primary mb-2">
                Work Experience
              </h1>
              <p className="text-text-body max-w-xl">
                My professional journey in{" "}
                <Link href="/services" className="deep-link">SEO and web development</Link>. Built with a foundation of{" "}
                <Link href="/skills" className="deep-link">technical skills</Link> and a focus on measurable growth.
                Want to work together? <Link href="/contact" className="deep-link">Connect with me</Link>.
              </p>
            </div>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <ExperienceEntry
                  key={index}
                  experience={experience}
                  index={index}
                  linkedProjects={[]}
                />
              ))}
            </div>

            <div className="mt-16 rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6">
              <p className="text-text-body leading-relaxed">
                See the full list of technologies I work with on my{" "}
                <Link href="/skills" className="deep-link">skills page</Link>, explore my{" "}
                <Link href="/services" className="deep-link">services</Link>, or{" "}
                <Link href="/contact" className="deep-link">get in touch</Link> to discuss working together.
              </p>
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
