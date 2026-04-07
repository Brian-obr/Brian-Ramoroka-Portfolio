import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block rounded-[20px] overflow-hidden bg-bg-card backdrop-blur-[16px] border border-border-subtle
        hover:border-border-hover hover:scale-[1.01] transition-all duration-200"
    >
      <div className="relative aspect-video bg-[#1E1E22]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0
            bg-accent/15 text-accent">
            {project.category}
          </span>
        </div>
        <p className="text-sm text-text-secondary">{project.year}</p>
      </div>
    </Link>
  );
}
