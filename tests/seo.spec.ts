import { test, expect } from "@playwright/test";
import { indexableRoutes } from "./routes";

const SITE = "https://www.brianramoroka.co.za";
type Node = Record<string, unknown> & { "@type": string | string[]; "@id"?: string };

async function graph(page: import("@playwright/test").Page): Promise<Node[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((b) => {
    const json = JSON.parse(b);
    return (json["@graph"] ?? [json]) as Node[];
  });
}
const ofType = (nodes: Node[], t: string) => nodes.filter((n) => [n["@type"]].flat().includes(t));

for (const route of indexableRoutes) {
  test(`${route} JSON-LD has one WebPage whose url is the canonical, linked to the site and person`, async ({ page }) => {
    await page.goto(route);
    const nodes = await graph(page);
    const pages = ofType(nodes, "WebPage").concat(ofType(nodes, "AboutPage"), ofType(nodes, "ContactPage"), ofType(nodes, "ProfilePage"), ofType(nodes, "CollectionPage"));
    expect(pages).toHaveLength(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect([canonical, `${canonical}/`]).toContain(pages[0].url);
    expect(pages[0].isPartOf).toEqual({ "@id": `${SITE}/#website` });
    // Every @id reference must resolve to a node on the page.
    const ids = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
    const refs = JSON.stringify(nodes).match(/\{"@id":"[^"]+"\}/g) ?? [];
    for (const r of refs) expect(ids, `unresolved ${r}`).toContain(JSON.parse(r)["@id"]);
  });

  test(`${route} inner pages carry a BreadcrumbList`, async ({ page }) => {
    test.skip(route === "/", "home has no breadcrumb");
    await page.goto(route);
    const crumbs = ofType(await graph(page), "BreadcrumbList");
    expect(crumbs).toHaveLength(1);
  });
}

test("home declares Person and WebSite with sameAs profiles", async ({ page }) => {
  await page.goto("/");
  const nodes = await graph(page);
  const person = ofType(nodes, "Person")[0];
  expect(person["@id"]).toBe(`${SITE}/#person`);
  expect(person.sameAs).toEqual(expect.arrayContaining(["https://github.com/Brian-obr"]));
  expect(ofType(nodes, "WebSite")).toHaveLength(1);
});

test("robots.txt allows crawling (incl. AI crawlers) and points to the sitemap", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).not.toMatch(/Disallow: \/\s*$/m);
  expect(txt).not.toContain("Disallow: /portfolio");
  expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("sitemap lists only 200 pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
  expect(urls.length).toBeGreaterThan(3);
  for (const u of urls) expect((await request.get(u)).status(), u).toBe(200);
});

for (const [path, type] of [
  ["/llms.txt", "text/plain"],
  ["/.well-known/security.txt", "text/plain"],
  ["/manifest.webmanifest", "application/manifest+json"],
  ["/icon.svg", "image/svg+xml"],
  ["/apple-icon", "image/png"],
] as const) {
  test(`${path} is served as ${type}`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain(type);
  });
}

test("security.txt has a contact and a future expiry", async ({ request }) => {
  const txt = await (await request.get("/.well-known/security.txt")).text();
  expect(txt).toMatch(/^Contact: mailto:/m);
  const exp = txt.match(/^Expires: (.+)$/m)?.[1];
  expect(new Date(exp!).getTime()).toBeGreaterThan(Date.now());
});

test("unknown URLs return a real 404 with links home", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("main").getByRole("link", { name: /home/i })).toBeVisible();
});

test("/portfolio redirects permanently to /work", async ({ request }) => {
  for (const from of ["/portfolio", "/portfolio/project-alpha"]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"]).toBe("/work");
  }
});

test("security headers are strict and CSP has no unsafe-eval", async ({ request }) => {
  const h = (await request.get("/")).headers();
  const csp = h["content-security-policy"];
  expect(csp).not.toContain("unsafe-eval");
  for (const d of ["frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'"]) expect(csp).toContain(d);
  expect(h["strict-transport-security"]).toContain("max-age=63072000");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
});

test("first Tab focuses a skip link that moves to main content", async ({ page }) => {
  test.skip(test.info().project.name === "mobile", "keyboard test on desktop only");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
