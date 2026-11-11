import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES } from "./pages";

for (const path of PAGES) {
  for (const width of [375, 1440]) {
    test(`axe has no serious/critical violations: ${path} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]["page"] })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }

  test(`tap targets are at least 44x44 px on mobile: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    // Inline text links inside paragraphs are exempt under WCAG 2.5.8.
    const small = await page.$$eval("nav a, nav button, header a, header button, [data-cta]", (els) =>
      els
        .filter((e) => (e as HTMLElement).offsetParent !== null)
        .map((e) => ({ t: (e.textContent || e.getAttribute("aria-label") || "").trim(), r: e.getBoundingClientRect() }))
        .filter(({ r }) => r.width < 44 || r.height < 44)
        .map(({ t, r }) => `${t} ${Math.round(r.width)}x${Math.round(r.height)}`),
    );
    expect(small).toEqual([]);
  });
}

test("skip link is the first focusable element and targets main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => ({ text: document.activeElement?.textContent, href: document.activeElement?.getAttribute("href") }));
  expect(focused.text).toMatch(/skip to content/i);
  expect(focused.href).toBe("#main");
  await expect(page.locator("main#main")).toHaveCount(1);
});

test("unknown URL returns a true 404", async ({ request }) => {
  expect((await request.get("/no-such-page-xyz")).status()).toBe(404);
});

test("sitemap lists indexable pages with fixed lastmod and excludes thank-you", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("thank-you");
  expect(xml).not.toContain("/services");
  for (const p of ["/about", "/contact", "/privacy", "/portfolio"]) expect(xml).toContain(`https://brianramoroka.co.za${p}<`);
  const lastmods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  expect(lastmods.length).toBeGreaterThan(0);
  for (const d of lastmods) expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test("well-known files exist", async ({ request }) => {
  for (const p of ["/manifest.webmanifest", "/.well-known/security.txt", "/llms.txt", "/robots.txt", "/apple-icon.png"]) {
    expect((await request.get(p)).status(), p).toBe(200);
  }
});

test("security headers", async ({ request }) => {
  const h = (await request.get("/")).headers();
  const csp = h["content-security-policy"];
  expect(csp).not.toContain("unsafe-eval");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain("base-uri 'self'");
  expect(csp).toContain("form-action 'self'");
  for (const k of ["strict-transport-security", "x-content-type-options", "referrer-policy", "permissions-policy"]) expect(h[k], k).toBeTruthy();
});

test("mobile menu closes on back/forward navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/about");
  await page.goto("/skills");
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
  await page.goBack();
  await page.waitForURL("**/about");
  await expect(page.getByRole("button", { name: /close menu/i })).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("mobile menu is a real dialog: focus moves in, Escape closes, focus returns, sits above the banner", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu/i });
  await menuButton.click();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeFocused();
  await expect(page.locator("main")).toHaveJSProperty("inert", true);
  // The menu's bottom CTA is clickable even though the cookie banner is showing.
  const cta = page.getByRole("dialog").locator("[data-cta]").first();
  expect(await cta.evaluate((el) => { const r = el.getBoundingClientRect(); return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2) === el || el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});

test("focus ring is visible inside the contact band", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("#contact [data-btn]").first();
  await link.focus();
  const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle + " " + getComputedStyle(el).outlineWidth);
  expect(outline).not.toMatch(/^none|0px/);
});

test("form fields have a 3:1 visible boundary", async ({ page }) => {
  await page.goto("/contact");
  const border = await page.locator("#email").evaluate((el) => getComputedStyle(el).borderTopColor);
  expect(border).toBe("rgb(133, 127, 114)");
});
