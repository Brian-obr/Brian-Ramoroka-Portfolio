/** The site's JSON-LD: one Person (wrapped in ProfilePage plus BreadcrumbList on /about). */
import { CONTACT, SITE_URL } from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#person`;

type Node = Record<string, unknown>;

const person: Node = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Brian Ramoroka",
  jobTitle: "SEO Web Developer",
  worksFor: { "@type": "Organization", name: "Rhiza Babuyile" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cape Peninsula University of Technology" },
  address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressRegion: "Western Cape", addressCountry: "ZA" },
  knowsAbout: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "WordPress", "WooCommerce", "Shopify", "Technical SEO", "Java", "Spring Boot"],
  sameAs: [CONTACT.linkedin, CONTACT.github],
  url: `${SITE_URL}/`,
};

const graph = (...nodes: Node[]) => ({ "@context": "https://schema.org", "@graph": nodes });

/** The flat Person, for pages without a breadcrumb. */
export const personLd = { "@context": "https://schema.org", ...person };

/** Person plus a Home > page breadcrumb (used on /skills). */
export const personWithBreadcrumb = (path: string, name: string) => graph(person, breadcrumb(path, name));

/** ProfilePage with the Person as mainEntity, plus a Home > page breadcrumb. */
export function profilePageGraph({ path, name, dateModified }: { path: string; name: string; dateModified: string }) {
  const url = `${SITE_URL}${path}`;
  return graph({ "@type": "ProfilePage", "@id": `${url}#profilepage`, url, dateModified, mainEntity: person }, breadcrumb(path, name));
}

function breadcrumb(path: string, name: string): Node {
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
}
