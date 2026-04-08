import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/portfolio",
    },
    sitemap: "https://www.brianramoroka.co.za/sitemap.xml",
  };
}
