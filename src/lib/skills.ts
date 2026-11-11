// Every skill, by field.
// /skills renders the fields; the home page derives its ticker and its short preview from them.
// Skills are plain text everywhere: no counts, levels or evidence labels.

/** A skill, or a skill with the tools that belong under it (WordPress and its page builders). */
type Skill = string | { name: string; under: string[] };
type SkillField = { id: string; field: string; skills: Skill[]; note?: string };

export const skillName = (s: Skill) => (typeof s === "string" ? s : s.name);

export const SKILL_FIELDS: SkillField[] = [
  {
    id: "front-end",
    field: "Front-end",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js (App Router)", "Angular", "SvelteKit", "Tailwind CSS", "Shopify Liquid", "Responsive design", "Mobile-first design", "Web accessibility (WCAG)"],
  },
  {
    id: "cms",
    field: "CMS and e-commerce",
    skills: [
      { name: "WordPress", under: ["Classic Editor", "Gutenberg", "Elementor", "Divi", "Bricks Builder", "WPBakery", "Beaver Builder", "SiteOrigin Page Builder", "Avada", "Bold Builder", "Blocksy", "ShopEngine"] },
      "WooCommerce", "Shopify", "Magento 2", "PrestaShop", "OpenCart", "Lightspeed eCom", "Odoo", "Joomla", "Drupal", "Wix", "Webflow", "Weebly", "JouwWeb", "custom CMSs",
    ],
  },
  {
    id: "back-end",
    field: "Back-end and languages",
    skills: ["Java", "Spring Boot", "PHP", "Node.js", "Python", "C#", ".NET", "Hibernate", "Maven", "Object-oriented programming (OOP)", "Design Patterns", "Microservices"],
  },
  { id: "databases", field: "Databases", skills: ["PostgreSQL", "MySQL", "Supabase", "SQLite"] },
  { id: "apis", field: "APIs and integrations", skills: ["REST APIs", "OAuth", "Zapier", "Contact Form 7", "Gravity Forms", "Google reCAPTCHA"] },
  { id: "testing", field: "Testing", skills: ["Unit testing", "JUnit", "Mockito", "Test-Driven Development (TDD)"] },
  { id: "cloud", field: "Cloud, hosting and DevOps", skills: ["Azure", "AWS", "Git", "Docker", "CI/CD", "Linux", "Vercel", "Pantheon"] },
  {
    id: "seo",
    field: "SEO",
    skills: ["Technical SEO", "On-page optimisation", "Keyword research", "Link building", "Schema markup / structured data (JSON-LD)", "Core Web Vitals", "Site speed optimisation", "XML sitemaps", "Indexing", "Landing pages", "Google Search Console", "Google Analytics 4 (GA4)", "Google Tag Manager (GTM)", "Microsoft Clarity", "Google Ads", "Rank Math", "Yoast SEO", "Screaming Frog", "Ahrefs", "Semrush", "AWR (Advanced Web Ranking)", "WP Rocket"],
  },
  { id: "content", field: "Content and design", skills: ["Content writing", "Technical documentation", "Figma", "Canva"] },
  { id: "ways", field: "Ways of working and tools", skills: ["Agile / Scrum", "Jira", "IntelliJ IDEA", "Salesforce Lightning", "MS Office"] },
  { id: "ai", field: "AI tools", skills: ["Claude", "ChatGPT", "GitHub Copilot", "Cursor", "Gemini", "Grok"], note: "I write my own Claude skills to run repeat tasks." },
  { id: "basic", field: "Basic exposure", skills: ["C++", "RabbitMQ", "Matlab"] },
];

/** Every skill as one flat list, for the home page ticker. */
export const ALL_SKILLS = SKILL_FIELDS.flatMap((f) => f.skills.flatMap((s) => (typeof s === "string" ? [s] : [s.name, ...s.under])));

/** A few named skills from one field. Fails the build if a name is not in that field. */
function pick(id: string, names: string[]) {
  const f = SKILL_FIELDS.find((x) => x.id === id);
  const missing = names.filter((n) => !f?.skills.some((s) => skillName(s) === n));
  if (!f || missing.length) throw new Error(`skills.ts: "${id}" has no ${missing.join(", ") || "such field"}`);
  return { field: f.field, skills: names };
}

/** The few skills per field shown in the home page's skills.ts editor. */
export const SKILLS_PREVIEW = [
  pick("front-end", ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React", "Next.js (App Router)"]),
  pick("cms", ["WordPress", "WooCommerce", "Shopify", "Magento 2"]),
  pick("seo", ["Technical SEO", "Core Web Vitals", "Schema markup / structured data (JSON-LD)", "Google Search Console"]),
  pick("back-end", ["Java", "Spring Boot", "Node.js", "PHP"]),
];
