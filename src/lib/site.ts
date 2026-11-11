/** Site-wide constants: the canonical origin, contact details and the one primary action. */
export const SITE_URL = "https://brianramoroka.co.za";

/** The day each page's content last changed (sitemap lastmod, ProfilePage dateModified). Update it with the content. */
export const LAST_MODIFIED = {
  "/": "2026-11-11",
  "/about": "2026-11-11",
  "/experience": "2026-11-11",
  "/skills": "2026-11-11",
  "/contact": "2026-11-11",
  "/portfolio": "2026-11-11",
  "/privacy": "2026-11-11",
};

export const CONTACT = {
  email: "ramorokaob@gmail.com",
  phoneDisplay: "+27 81 379 8635",
  phoneHref: "tel:+27813798635",
  whatsapp: "https://wa.me/27813798635",
  linkedin: "https://www.linkedin.com/in/brian-obr",
  github: "https://github.com/Brian-obr",
  repo: "https://github.com/Brian-obr/Brian-Ramoroka-Portfolio",
};

export const MAILTO = `mailto:${CONTACT.email}`;

/** The one primary action. */
export const PRIMARY_CTA = { label: "Email me about a role", href: `${MAILTO}?subject=Role%20for%20Brian%20Ramoroka` };
