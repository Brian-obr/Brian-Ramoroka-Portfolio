import { test, expect } from "@playwright/test";
import { indexableRoutes } from "./routes";

const SITE = "https://www.brianramoroka.co.za";

for (const route of indexableRoutes) {
  test(`F-06 ${route} has no dead "#" links`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  });

  test(`F-05 ${route} server HTML renders text visible (no opacity:0)`, async ({ request }) => {
    const html = await (await request.get(route)).text();
    expect(html).not.toMatch(/style="[^"]*opacity:\s*0[;"]/);
  });

  test(`F-08 ${route} every img has intrinsic width and height`, async ({ page }) => {
    await page.goto(route);
    const unsized = await page.$$eval("img", (imgs) =>
      imgs.filter((i) => !i.getAttribute("width") || !i.getAttribute("height")).map((i) => i.src),
    );
    expect(unsized).toEqual([]);
  });

  test(`F-15 ${route} canonical equals its own URL`, async ({ page }) => {
    await page.goto(route);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    // For the root, "https://host" and "https://host/" are the same resource (RFC 3986 §6.2.3).
    if (route === "/") expect([SITE, `${SITE}/`]).toContain(canonical);
    else expect(canonical).toBe(`${SITE}${route}`);
  });

  test(`F-10 ${route} og:image is a 1200x630 PNG`, async ({ page, request }) => {
    await page.goto(route);
    const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(og).toBeTruthy();
    expect(await page.locator('meta[property="og:image:width"]').first().getAttribute("content")).toBe("1200");
    expect(await page.locator('meta[property="og:image:height"]').first().getAttribute("content")).toBe("630");
    const res = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
    const buf = await res.body();
    // PNG IHDR: width at byte 16, height at byte 20 (big-endian)
    expect([buf.readUInt32BE(16), buf.readUInt32BE(20)]).toEqual([1200, 630]);
  });
}

test("F-08 home hero image is prioritised and small", async ({ page }) => {
  const sizes: number[] = [];
  page.on("response", async (r) => {
    if (r.request().resourceType() === "image" && r.url().includes("portrait")) sizes.push((await r.body()).length);
  });
  await page.goto("/");
  const hero = page.locator("img[fetchpriority=high]").first();
  await expect(hero).toHaveAttribute("alt", /Brian Ramoroka/);
  await page.waitForLoadState("networkidle");
  expect(sizes.length).toBeGreaterThan(0);
  expect(Math.max(...sizes)).toBeLessThanOrEqual(120 * 1024);
});

test("F-06 primary nav CTA leads to contact", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner").getByRole("link", { name: "Contact", exact: true }).first()).toHaveAttribute("href", "/contact");
});

test("F-06 CV link on /experience is a real PDF when present, absent otherwise", async ({ page, request }) => {
  const res = await page.goto("/experience");
  expect(res?.status()).toBe(200);
  const cv = page.locator('a[data-track="cv_download"]');
  if ((await cv.count()) > 0) {
    const href = (await cv.first().getAttribute("href"))!;
    const pdf = await request.get(href);
    expect(pdf.status()).toBe(200);
    expect(pdf.headers()["content-type"]).toContain("application/pdf");
  } else {
    await expect(page.getByText(/CV available on request/i)).toBeVisible();
  }
});
