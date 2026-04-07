import type { NavLink, SocialLink, Experience, Language, Education, SkillGroup, Service, Market } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Skills", href: "/skills" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://za.linkedin.com/in/brian-obr", icon: "Linkedin" },
  { label: "GitHub", href: "https://github.com/placeholder", icon: "Github" },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages & Frameworks",
    skills: ["Java", "JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3", "Spring Boot", "React", "Node.js", "Next.js", "SvelteKit", "Tailwind CSS"],
  },
  {
    name: "SEO & Analytics",
    skills: ["Technical SEO", "On-Page Optimisation", "Keyword Research", "Link Building", "Google Analytics", "Google Search Console", "Ahrefs", "Core Web Vitals", "Schema Markup", "Site Speed Optimization", "Mobile-First", "Responsive Design"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQLite", "Supabase"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "Azure", "Vercel", "Linux", "Docker", "CI/CD", "REST APIs", "Figma", "Responsive Design", "MS Office", "Agile / Scrum"],
  },
];

export const skills: string[] = skillGroups.flatMap((g) => g.skills);

export const languages: Language[] = [
  { name: "English", proficiency: "Fluent", barWidth: 100 },
  { name: "Sepedi", proficiency: "Fluent", barWidth: 100 },
  { name: "Sesotho", proficiency: "Proficient", barWidth: 80 },
  { name: "Setswana", proficiency: "Proficient", barWidth: 80 },
  { name: "isiZulu", proficiency: "Conversational", barWidth: 70 },
  { name: "isiXhosa", proficiency: "Elementary", barWidth: 50 },
  { name: "Xitsonga", proficiency: "Elementary", barWidth: 40 },
  { name: "Tshivenḓa", proficiency: "Elementary", barWidth: 40 },
];

export const education: Education[] = [
  { institution: "Cape Peninsula University of Technology", credential: "Advanced Diploma in ICT: Application Development", date: "2025" },
  { institution: "Cape Peninsula University of Technology", credential: "Diploma in ICT: Application Development", date: "2021 — 2024" },
];

export const experiences: Experience[] = [
  {
    title: "SEO Web Developer",
    company: "Rhiza Babuyile",
    dates: "Mar 2025 — Present",
    description: "Develop and maintain SEO-optimised websites for a Dutch-based company, serving clients across NL, DE, FR, ES, UK, and USA.",
    bullets: [
      "Perform comprehensive technical SEO audits — resolving crawlability, indexing, and site-speed issues",
      "Execute end-to-end SEO campaigns at local, provincial, national, and international scale",
      "Monitor performance through Google Analytics and Search Console, translating data into growth strategies",
      "Ensure all websites are fully responsive, mobile-friendly, and optimised for user experience",
      "Handle ongoing website maintenance, development, and performance optimisation across CMS platforms",
    ],
    projects: [],
  },
  {
    title: "Software Developer Intern",
    company: "Pillar 5 Group",
    dates: "Jul 2024 — Dec 2024",
    description: "Contributed to the full development lifecycle of Java/Spring Boot applications with PostgreSQL.",
    bullets: [
      "Contributed to the full development lifecycle of Java/Spring Boot applications, integrating PostgreSQL databases and ensuring data integrity",
      "Collaborated in an Agile team to implement features, fix bugs, and enhance system functionality, maintaining high standards of data accuracy",
      "Gained experience with Azure cloud services and Git for version control, and assisted in database management and backend development tasks",
    ],
    projects: [],
  },
];

export const services: Service[] = [
  { number: "01", title: "Technical SEO Audits", description: "Comprehensive technical scans covering crawlability, indexation, site speed, Core Web Vitals, mobile usability, structured data, and internal linking architecture." },
  { number: "02", title: "Web Development & Maintenance", description: "Building and maintaining responsive, high-performance websites using modern frameworks — React, Next.js, SvelteKit, Tailwind CSS. Mobile-first, fast-loading, clean code." },
  { number: "03", title: "On-Page Optimisation", description: "Strategic keyword integration, meta tag optimisation, heading structure, content hierarchy, image optimisation, and schema markup aligned with search intent." },
  { number: "04", title: "Keyword Research & Tracking", description: "In-depth keyword research using Ahrefs and Google Search Console. Continuous tracking and reporting to measure progress and adapt strategy." },
  { number: "05", title: "Link Building", description: "Developing link building strategies that strengthen domain authority and competitive positioning. Quality over quantity — relevant, high-authority backlinks." },
  { number: "06", title: "Campaign Management", description: "Local, provincial, national, and international SEO campaigns. From single-city businesses to multi-country brands — strategy tailored to scope." },
];

export const markets: Market[] = [
  { flag: "🇿🇦", name: "South Africa", scope: "Home base" },
  { flag: "🇳🇱", name: "Netherlands", scope: "Dutch market" },
  { flag: "🇧🇪", name: "Belgium", scope: "Belgian market" },
  { flag: "🇩🇪", name: "Germany", scope: "German market" },
  { flag: "🇺🇸", name: "United States", scope: "US market" },
  { flag: "🇫🇷", name: "France", scope: "French market" },
  { flag: "🇪🇸", name: "Spain", scope: "Spanish market" },
  { flag: "🇬🇧", name: "United Kingdom", scope: "UK market" },
];
