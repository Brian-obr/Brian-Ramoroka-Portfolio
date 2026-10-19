import { absoluteUrl, site } from "@/lib/site";

type Node = Record<string, unknown>;
export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  service: `${site.url}/#service`,
};

export const personNode = (): Node => ({
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  alternateName: "Breezy",
  jobTitle: site.jobTitle,
  description: site.tagline,
  url: absoluteUrl("/"),
  image: `${site.url}/images/brian-ramoroka-hero.webp`,
  email: `mailto:${site.email}`,
  telephone: site.phoneE164,
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cape Peninsula University of Technology", url: "https://www.cput.ac.za/" },
  knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Java", "Spring Boot", "PostgreSQL", "WordPress", "Shopify", "Technical SEO", "Core Web Vitals", "Schema markup"],
  sameAs: [...site.sameAs],
});

export const websiteNode = (): Node => ({
  "@type": "WebSite",
  "@id": ids.website,
  url: absoluteUrl("/"),
  name: site.name,
  inLanguage: "en-ZA",
  publisher: { "@id": ids.person },
});

/** Freelance side: one service entity, no separate service pages (website-research.md §5.2). */
export const serviceNode = (): Node => ({
  "@type": "ProfessionalService",
  "@id": ids.service,
  name: `${site.name}, web development and SEO`,
  url: absoluteUrl("/services"),
  description: "Website builds, WordPress and Shopify work, fixes and maintenance, and technical SEO.",
  founder: { "@id": ids.person },
  telephone: site.phoneE164,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country },
  areaServed: [{ "@type": "Country", name: "South Africa" }, { "@type": "Place", name: "Worldwide (remote)" }],
});

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "ProfilePage" | "CollectionPage";

export function pageGraph(opts: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  breadcrumb?: { name: string; path: string }[];
  about?: string;
  extra?: Node[];
}): Node {
  const url = absoluteUrl(opts.path);
  const nodes: Node[] = [];
  const page: Node = {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-ZA",
    isPartOf: { "@id": ids.website },
    about: { "@id": opts.about ?? ids.person },
  };
  if (opts.breadcrumb) {
    page.breadcrumb = { "@id": `${url}#breadcrumb` };
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "Home", path: "/" }, ...opts.breadcrumb].map((c, i, all) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        ...(i < all.length - 1 ? { item: absoluteUrl(c.path) } : {}),
      })),
    });
  }
  // Person and WebSite are on every page so every @id reference resolves locally.
  const base = [personNode(), websiteNode()];
  if (opts.about === ids.service) base.push(serviceNode());
  return { "@context": "https://schema.org", "@graph": [...base, page, ...nodes, ...(opts.extra ?? [])] };
}
