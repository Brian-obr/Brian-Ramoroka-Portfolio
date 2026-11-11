import { test, expect } from "@playwright/test";

const FREELANCE_PAGES = ["/freelance-web-developer-cape-town", "/website-health-check"];

test("nav is a static top bar, first after the skip link", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  await expect(header).toBeVisible();
  const box = await header.boundingBox();
  expect(box!.y).toBeLessThan(8);
  expect(await header.evaluate((h) => getComputedStyle(h).position)).not.toBe("fixed");
  await expect(header.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "/portfolio");
});

// Based in Cape Town, open to the Gauteng cities and remote.
test("home H1 names the role, and the location line gives the agreed wording", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Ramoroka");
  await expect(page.locator(".hero .role")).toContainText("Front-end Developer");
  await expect(page.locator(".hero .loc")).toHaveText("Based in Cape Town. Open to roles in Midrand, Johannesburg, Pretoria and remote.");
});

test("no full-bleed photo behind text (fixed background images)", async ({ page }) => {
  for (const p of ["/", "/about", "/experience", "/contact"]) {
    await page.goto(p);
    const fixedImgs = await page.$$eval("img", (imgs) =>
      imgs.filter((i) => {
        for (let e: HTMLElement | null = i; e; e = e.parentElement) if (getComputedStyle(e).position === "fixed") return true;
        return false;
      }).length,
    );
    expect(fixedImgs, p).toBe(0);
  }
});

test("at most two font families are loaded", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const families = await page.evaluate(() =>
    [...new Set([...document.fonts].map((f) => f.family.replace(/["']/g, "").replace(/\s*Fallback.*$/i, "").trim()))],
  );
  expect(families.length, families.join(", ")).toBeLessThanOrEqual(2);
});

test("/portfolio is the case-study page; old placeholder project URLs and /work 301 to it", async ({ request }) => {
  const page = await request.get("/portfolio", { maxRedirects: 0 });
  expect(page.status()).toBe(200);
  for (const p of ["/portfolio/project-alpha", "/work"]) {
    const res = await request.get(p, { maxRedirects: 0 });
    expect(res.status(), p).toBe(301);
    expect(res.headers()["location"]).toMatch(/\/portfolio$/);
  }
  expect(await (await request.get("/robots.txt")).text()).not.toContain("Disallow: /portfolio");
});

test("/services 301s to /experience, and llms.txt carries no old claims", async ({ request }) => {
  const res = await request.get("/services", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toMatch(/\/experience$/);
  const llms = await (await request.get("/llms.txt")).text();
  expect(llms).not.toMatch(/150\+|8 markets|\/services|Breezy"/);
  expect(llms).toContain("Rhiza Babuyile");
});

test("home has no emoji flag grid", async ({ request }) => {
  const html = await (await request.get("/")).text();
  expect(html).not.toMatch(/🇿🇦|🇳🇱/);
});

// The freelance offer and its two pages were removed. The old URLs must stay 404
// and out of the sitemap, and no page may carry freelance wording.
for (const p of FREELANCE_PAGES) {
  test(`${p} is gone`, async ({ request }) => {
    expect((await request.get(p)).status()).toBe(404);
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain(p);
  });
}

test("the primary action is the job email, and no page mentions freelance", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /email me about a role/i }).first()).toBeVisible();
  for (const p of ["/", "/contact", "/about", "/portfolio", "/experience", "/skills"]) {
    expect(await (await request.get(p)).text(), p).not.toMatch(/freelance/i);
  }
});

test("hero uses the real portrait photo", async ({ page }) => {
  await page.goto("/");
  const img = page.locator("main section").first().locator("img");
  await expect(img).toHaveAttribute("alt", /Brian Ramoroka/);
  expect(await img.evaluate((i: HTMLImageElement) => i.currentSrc)).toContain("brian-ramoroka-hero");
});

test("/about shows the graduation photo", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator('main img[src*="graduation"]')).toHaveAttribute("alt", "Brian Ramoroka");
});

test("/portfolio has two projects with real screenshots", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator("article")).toHaveCount(2);
  for (const id of ["brianramoroka-co-za", "the-breezy-exchange"]) {
    const imgs = page.locator(`article#${id} img`);
    expect(await imgs.count(), id).toBeGreaterThan(0);
    for (const alt of await imgs.evaluateAll((els) => els.map((e) => (e as HTMLImageElement).alt))) expect(alt.length, id).toBeGreaterThan(10);
  }
  const breezy = page.locator("article#the-breezy-exchange");
  await expect(breezy).toContainText("In progress");
  await expect(breezy).toContainText(/it's a demo/i);
  await expect(breezy.getByRole("link", { name: "Visit the demo store" })).toHaveAttribute("href", /pantheonsite\.io/);
});
