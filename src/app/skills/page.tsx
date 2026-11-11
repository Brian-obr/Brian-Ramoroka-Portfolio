import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personWithBreadcrumb } from "@/lib/schema";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Skills | Brian Ramoroka: WordPress, Shopify, React, Java",
  description:
    "Front-end developer skills: HTML, CSS, JavaScript, TypeScript, React, WordPress and Shopify, technical SEO, and Java, Spring Boot and PostgreSQL.",
  path: "/skills",
  ogTitle: "Skills: Brian Ramoroka, Front-end Developer",
  ogDescription: "The tools Brian Ramoroka uses, grouped by field, from front-end and WordPress to technical SEO and Java.",
});


export default function SkillsPage() {
  return (
    <>
      <JsonLd data={personWithBreadcrumb("/skills", "Skills")} />
      <SkillsPageClient />
    </>
  );
}
