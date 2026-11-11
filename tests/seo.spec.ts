import { test, expect } from "@playwright/test";
import { PAGES, SITE } from "./pages";

for (const path of PAGES) {
  test(`metadata and schema: ${path}`, async ({ request }) => {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html).toMatch(/<title>[^<]{10,70}<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{50,170}"/);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical?.startsWith(SITE)).toBe(true);
    expect(html.match(/<h1[\s>]/g)?.length).toBe(1);

    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    expect(blocks.length).toBe(1);
    // Person only (SEO rewrite, qa/person-jsonld.json): no WebSite, WebPage or Organization blocks.
    // /about wraps the same Person in ProfilePage plus a BreadcrumbList.
    let person = blocks[0];
    if (path === "/about") {
      const graph = blocks[0]["@graph"];
      expect(graph.map((n: { "@type": string }) => n["@type"])).toEqual(["ProfilePage", "BreadcrumbList"]);
      expect(graph[0].url).toBe(`${SITE}/about`);
      expect(graph[1].itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "About"]);
      person = graph[0].mainEntity;
    }
    // /skills keeps the flat Person and adds a Home > Skills breadcrumb.
    if (path === "/skills") {
      const graph = blocks[0]["@graph"];
      expect(graph.map((n: { "@type": string }) => n["@type"])).toEqual(["Person", "BreadcrumbList"]);
      expect(graph[1].itemListElement.map((i: { name: string }) => i.name)).toEqual(["Home", "Skills"]);
      person = graph[0];
    }
    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe(`${SITE}/#person`);
    expect(person.jobTitle).toBe("SEO Web Developer");
  });

  test(`og image is 1200x630: ${path}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    expect(og).toBeTruthy();
    expect(html).toContain('<meta property="og:image:width" content="1200"');
    expect(html).toContain('<meta property="og:image:height" content="630"');
    const img = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(img.status()).toBe(200);
    const buf = await img.body();
    // PNG IHDR: width at byte 16, height at byte 20
    expect(buf.subarray(1, 4).toString()).toBe("PNG");
    expect(buf.readUInt32BE(16)).toBe(1200);
    expect(buf.readUInt32BE(20)).toBe(630);
  });
}

test("proof stats are attributed to agency work", async ({ request }) => {
  for (const path of ["/", "/about"]) {
    const html = await (await request.get(path)).text();
    expect(html).not.toContain("I have built and maintained over 150");
    expect(html).not.toMatch(/90%\+/);
  }
});
