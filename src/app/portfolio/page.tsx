import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Brian Ramoroka's portfolio of web development, SEO, and AI integration projects showcasing modern, performant solutions.",
  openGraph: {
    title: "Portfolio — Brian Ramoroka",
    description:
      "Explore Brian Ramoroka's portfolio of web development, SEO, and AI integration projects.",
  },
  alternates: {
    canonical: "https://brianramoroka.co.za/portfolio",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://brianramoroka.co.za/portfolio" },
  ],
};

export default function PortfolioPage() {
  const projects = getAllProjects();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Sitting.png" lighter />
      <PageTransition>
      <section className="pt-16 md:pt-[120px] pb-14 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <h1 className="text-[2rem] md:text-[3rem] font-bold text-text-primary mb-4">Portfolio</h1>
          <p className="text-white mb-12">A selection of recent projects showcasing web development, SEO strategy, and AI integration work.</p>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white text-lg mb-6">
                Projects coming soon.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-accent text-bg-deep font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
    </>
  );
}
