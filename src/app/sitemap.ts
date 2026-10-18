import type { MetadataRoute } from "next";

const baseUrl = "https://www.brianramoroka.co.za";

/** Date each page's content last changed. Update the entry when you edit that page (audit F-13). */
const routes: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-10-19", priority: 1 },
  { path: "/about", lastModified: "2026-04-16", priority: 0.9 },
  { path: "/services", lastModified: "2026-04-16", priority: 0.9 },
  { path: "/contact", lastModified: "2026-04-16", priority: 0.7 },
  { path: "/experience", lastModified: "2026-04-16", priority: 0.5 },
  { path: "/skills", lastModified: "2026-04-16", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
