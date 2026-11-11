import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE_URL } from "@/lib/site";

// Real per-page content dates (was `new Date()` on every build, which tells Google nothing).
const PRIORITY: Record<keyof typeof LAST_MODIFIED, number> = {
  "/": 1,
  "/about": 0.9,
  "/experience": 0.8,
  "/skills": 0.6,
  "/contact": 0.7,
  "/portfolio": 0.9,
  "/privacy": 0.2,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(LAST_MODIFIED).map(([path, lastModified]) => ({
    url: SITE_URL + path,
    lastModified,
    changeFrequency: "monthly",
    priority: PRIORITY[path as keyof typeof LAST_MODIFIED],
  }));
}
