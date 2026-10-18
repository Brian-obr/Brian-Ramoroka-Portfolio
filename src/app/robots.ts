import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Everything public is crawlable, including AI crawlers: being cited by AI search helps and nothing here is
 * proprietary (audit F-23). /thank-you stays crawlable so Google can see its noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
