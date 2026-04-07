import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";
import ExperienceEntry from "@/components/ui/ExperienceEntry";
import { experiences } from "@/lib/constants";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Experience",
  description: "Brian Ramoroka work experience — web development, SEO strategy, and software engineering across agencies and startups.",
  openGraph: {
    title: "Experience — Brian Ramoroka",
    description: "Work history and selected projects by Brian Ramoroka.",
  },
  alternates: { canonical: "https://brianramoroka.com/experience" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brianramoroka.com" },
    { "@type": "ListItem", position: 2, name: "Experience", item: "https://brianramoroka.com/experience" },
  ],
};

export default function ExperiencePage() {
  const allProjects = getAllProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Sitting-down.png" />
      <PageTransition>
        <section className="relative z-10 pt-20 md:pt-[120px] pb-16">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            {/* Page header */}
            <div className="mb-12">
              <h1 className="text-[2rem] md:text-[3rem] font-bold text-text-primary mb-2">
                Work Experience
              </h1>
              <p className="text-text-body max-w-xl">
                My professional journey in web development and{" "}
                <Link href="/about#services" className="deep-link">SEO</Link>. Built with a foundation of{" "}
                <Link href="/skills" className="deep-link">technical skills</Link> and a focus on measurable growth.
                Want to work together? <Link href="/contact" className="deep-link">Contact me</Link>.
              </p>
            </div>

            <div className="space-y-8">
              {experiences.map((experience, index) => {
                const linkedProjects = experience.projects
                  ? allProjects.filter((p) => experience.projects!.includes(p.slug))
                  : [];
                return (
                  <ExperienceEntry
                    key={index}
                    experience={experience}
                    index={index}
                    linkedProjects={linkedProjects}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
