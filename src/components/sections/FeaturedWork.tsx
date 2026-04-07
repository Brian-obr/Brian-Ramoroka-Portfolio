import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/types";

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const featured = projects.slice(0, 3);

  return (
    <section className="py-14 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <SectionHeading title="Selected Work" />
          <Link
            href="/portfolio"
            className="hidden sm:flex items-center gap-1 text-accent hover:text-accent-hover transition-colors font-medium text-sm"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-accent hover:text-accent-hover transition-colors font-medium"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
