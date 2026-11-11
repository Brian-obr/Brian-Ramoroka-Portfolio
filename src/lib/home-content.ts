// Home page copy and data. The skills live in src/lib/skills.ts.

export const EDUCATION = [
  {
    "credential": "Advanced Diploma in ICT: Application Development (NQF level 7)",
    "school": "Cape Peninsula University of Technology (CPUT)",
    "years": "2025"
  },
  {
    "credential": "Diploma in ICT: Application Development",
    "school": "Cape Peninsula University of Technology (CPUT)",
    "years": "2021 - 2024"
  },
  {
    "credential": "National Senior Certificate (Matric)",
    "school": "Ivory Park Secondary School",
    "years": "2019"
  }
];

export const ABOUT = [
  "Most of my week goes into client websites. I write HTML, CSS and JavaScript, mostly on WordPress and WooCommerce, and I work on Shopify themes in Liquid when a client runs Shopify.",
  "The SEO side of the job means I check my work the way Google sees it: Core Web Vitals, crawlability, indexing and JSON-LD structured data. I also check pages for accessibility against WCAG. That includes alt text and colour contrast.",
  "Java was my main language at CPUT. I then used it with Spring Boot and PostgreSQL during my internship at BIIC. I built this website with Next.js, React, TypeScript and Tailwind CSS.",
  "Next, I want a full-time role where I write more code and work on the same product over time."
];

export const HERO = {
  name: "Brian Ramoroka",
  title: "Front-end Developer",
  hook: "I'm a front-end developer in Cape Town. I work as an SEO Web Developer at Rhiza Babuyile, where I build and fix client websites in WordPress, WooCommerce and Shopify. I check every page for speed and search before it goes live.",
  location: "Based in Cape Town. Open to roles in Midrand, Johannesburg, Pretoria and remote.",
  notice: "Looking for a full-time role. Notice period: 1 month.",
};

export const EXPERIENCE = [
  {
    dates: "03/2025 - Present",
    company: "Rhiza Babuyile",
    role: "SEO Web Developer",
    summary:
      "Rhiza Babuyile is a South African company that partners with Grizzly New Marketing in the Netherlands.",
    duties: [
      "Develop and maintain SEO-optimised client websites, mostly in WordPress and WooCommerce",
      "Fix and improve front-ends in HTML, CSS and JavaScript",
      "Run technical SEO audits on crawlability, indexing, site speed and Core Web Vitals, then fix what they find",
    ],
  },
  {
    dates: "07/2024 - 12/2024",
    company: "Business Innovation & Incubation Centre (BIIC)",
    role: "Software Developer Intern",
    summary: "A six-month internship in Cape Town.",
    duties: [
      "Built features and fixed bugs in Java and Spring Boot applications backed by PostgreSQL",
      "Worked with REST APIs and OAuth in an Agile team",
    ],
  },
];

export const REACH_INTRO =
  "Rhiza Babuyile partners with Grizzly New Marketing in the Netherlands. With their team I work on client websites for businesses in the Netherlands, Belgium, Germany, France, Spain, the UK and the US. I also work on .com sites.";

/** Market cards: the live site's markets with country domains; flags are drawn as SVG (no emoji). */
export const MARKETS = [
  { code: "nl", name: "Netherlands", tld: ".nl" },
  { code: "be", name: "Belgium", tld: ".be" },
  { code: "de", name: "Germany", tld: ".de" },
  { code: "fr", name: "France", tld: ".fr" },
  { code: "es", name: "Spain", tld: ".es" },
  { code: "uk", name: "United Kingdom", tld: ".uk" },
  { code: "us", name: "United States", tld: ".us" },
  { code: "com", name: "Global", tld: ".com" },
] as const;

export const PROJECTS_INTRO = "Client work is confidential, so these are projects I built myself.";

export const CONTACT_LEDE = "Hiring for a front-end, web or software developer role? Send me a message, or download my CV.";

/** The CV chooser: both CVs. The PDFs go in public/cv/. */
export const CVS = [
  {
    title: "Front-end Developer",
    body: "For front-end, web, WordPress and Shopify roles.",
    href: "/cv/Brian-Ramoroka-CV-Front-end-Developer.pdf",
  },
  {
    title: "Software Developer",
    body: "For Java, full stack and software roles.",
    href: "/cv/Brian-Ramoroka-CV-Software-Developer.pdf",
  },
];
