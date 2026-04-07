import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProjectCard from "@/components/ui/ProjectCard";
import PageTransition from "@/components/layout/PageTransition";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `Case study: ${project.title} — ${project.category} project by Brian Ramoroka.`,
    openGraph: {
      title: `${project.title} — Brian Ramoroka`,
      description: `Case study: ${project.title} — ${project.category} project.`,
    },
    alternates: { canonical: `https://brianramoroka.com/portfolio/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const moreProjects = getAllProjects().filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <PageTransition>
      <article className="pt-20 md:pt-[120px] pb-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 text-base"
          >
            <ArrowLeft size={16} />
            Back to Home Page
          </Link>

          {/* Title + category */}
          <h1 className="text-[2rem] md:text-[3rem] font-bold text-text-primary mb-2">
            {project.title}
          </h1>
          <p className="text-base text-text-secondary mb-12">{project.category}</p>

          {/* MDX content */}
          <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-strong:text-accent max-w-none mb-12">
            <MDXRemote source={project.content} />
          </div>

          {/* Live project button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
                border border-accent text-accent hover:bg-accent hover:text-white transition-colors mb-16"
            >
              <ExternalLink size={16} />
              Live Project
            </a>
          )}

          {/* More Projects */}
          {moreProjects.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-8">More Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {moreProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageTransition>
  );
}
