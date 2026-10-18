import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import { ogImage } from "@/lib/metadata";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
  description:
    "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
  openGraph: {
    title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
    description:
      "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
    url: "https://www.brianramoroka.co.za/skills",
    type: "website",
    locale: "en_ZA",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
    description:
      "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
    images: [ogImage.url],
  },
  alternates: {
    canonical: "https://www.brianramoroka.co.za/skills",
  },
};


export default function SkillsPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/skills", name: "Skills and tools", description: metadata.description as string, breadcrumb: [{ name: "Skills", path: "/skills" }] })} />
      <SkillsPageClient />
    </>
  );
}
