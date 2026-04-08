import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    robots: { index: false, follow: false },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  notFound();
}
