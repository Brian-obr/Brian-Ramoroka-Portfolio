import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

function parseProject(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    category: data.category as string,
    year: data.year as string,
    tech: data.tech as string[],
    liveUrl: data.liveUrl as string,
    thumbnail: data.thumbnail as string,
    order: data.order as number,
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => parseProject(name.replace(/\.mdx$/, "")))
    .filter((p): p is Project => p !== null);

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  return parseProject(slug);
}
