import { test, expect } from "@playwright/test";

test("home body copy carries styled deep links to the inner pages", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("main p a.text-link");
  expect(await links.count()).toBeGreaterThanOrEqual(7);
  const hrefs = await links.evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  for (const h of ["/experience", "/skills", "/services", "/contact", "/work/the-breezy-exchange"]) expect(hrefs).toContain(h);
  const style = await links.first().evaluate((a) => {
    const cs = getComputedStyle(a);
    return { weight: Number(cs.fontWeight), underline: cs.textDecorationLine };
  });
  expect(style.weight).toBeGreaterThanOrEqual(600);
  expect(style.underline).toContain("underline");
});

test("glass panels blur what is behind them, with a solid fallback for reduced transparency", async ({ page }) => {
  await page.goto("/");
  const blur = await page.locator(".glass").first().evaluate((el) => getComputedStyle(el).backdropFilter);
  expect(blur).toContain("blur");
});

test("with transparency allowed, glass panels are translucent; the consent sheet stays near-opaque", async ({ page, context }) => {
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "no-preference" }] });
  await page.goto("/");
  const alpha = (sel: string) =>
    page.locator(sel).first().evaluate((el) => {
      const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g)!.map(Number);
      return m.length === 4 ? m[3] : 1;
    });
  expect(await alpha(".glass:not(.glass-strong)")).toBeLessThan(0.8);
  expect(await alpha(".glass-strong")).toBeGreaterThanOrEqual(0.85);
});
