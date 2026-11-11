import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * One place for per-page metadata. A page-level `openGraph` object replaces the inherited
 * one entirely, so the generated 1200x630 image is always set explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle = title,
  ogDescription = description,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const image = { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Brian Ramoroka, Front-end Developer in Cape Town" };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: ogTitle, description: ogDescription, url, type: "website", locale: "en_ZA", siteName: "Brian Ramoroka", images: [image] },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image.url] },
  };
}
