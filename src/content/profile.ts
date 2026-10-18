/**
 * Career facts. Claims follow the policy in audit/2026-10/PLAN.md (revision 2026-10-19): only work-proven
 * skills are listed as work; study is labelled as study; nothing without evidence is claimed.
 */

export type Role = {
  title: string;
  company: string;
  companyNote?: string;
  start: string;
  end: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    title: "SEO Web Developer",
    company: "Rhiza Babuyile",
    companyNote: "Partner of Grizzly New Marketing (Netherlands)",
    start: "March 2025",
    end: "Present",
    summary:
      "I build and maintain websites for the agency's clients in the Netherlands, Belgium, Germany, France, Spain, the UK and the US, and run their technical SEO.",
    points: [
      "Technical SEO audits: crawling, indexing and site-speed fixes",
      "SEO campaigns at local, national and international level",
      "Reporting from Google Analytics and Search Console",
      "Responsive builds and ongoing maintenance on WordPress, Shopify, Magento and custom CMSs",
    ],
    stack: ["WordPress", "Shopify", "Magento 2", "HTML", "CSS", "JavaScript", "GA4", "Search Console"],
  },
  {
    title: "Software Developer Intern",
    company: "Business Innovation and Incubation (BiiC)",
    start: "July 2024",
    end: "December 2024",
    summary: "I worked across the full development lifecycle of Java and Spring Boot applications backed by PostgreSQL.",
    points: [
      "Built features and fixed bugs in an Agile team",
      "Integrated PostgreSQL databases and kept data consistent",
      "Used Azure cloud services and Git day to day",
      "Backend and database design work",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Azure", "Git", "REST APIs", "Agile"],
  },
];

export const education = [
  { credential: "Advanced Diploma in ICT: Application Development", institution: "Cape Peninsula University of Technology", date: "2025" },
  { credential: "Diploma in ICT: Application Development", institution: "Cape Peninsula University of Technology", date: "2021 to 2024" },
];

export const spokenLanguages = [
  { name: "English", level: "Fluent" },
  { name: "Sepedi", level: "Fluent" },
  { name: "Sesotho", level: "Proficient" },
  { name: "Setswana", level: "Proficient" },
  { name: "isiZulu", level: "Conversational" },
  { name: "isiXhosa", level: "Basic" },
  { name: "Xitsonga", level: "Basic" },
  { name: "Tshivenda", level: "Basic" },
];

/** Grouped by evidence level, ordered by how often SA job ads ask for each (website-research.md §2). */
export const skillGroups = [
  {
    heading: "Used at work",
    note: "At Rhiza Babuyile or BiiC.",
    skills: ["Git", "JavaScript", "REST APIs", "HTML", "CSS", "Azure", "Agile", "SQL", "PostgreSQL", "Java", "Spring Boot", "WordPress", "Shopify", "Magento 2", "Technical SEO", "GA4 and Search Console"],
  },
  {
    heading: "Used in my own projects",
    note: "On this site and The Breezy Exchange.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "WooCommerce", "Schema markup", "Core Web Vitals"],
  },
  {
    heading: "Studied",
    note: "CPUT coursework and course projects.",
    skills: ["C#", ".NET", "Angular", "CI/CD", "Unit testing (JUnit, Mockito)", "Docker", "AWS", "Python"],
  },
];

export const cmsLine = "WordPress, WooCommerce, Shopify, Magento 2 and other CMSs";
