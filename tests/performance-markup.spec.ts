import { test, expect } from "@playwright/test";
import { PAGES } from "./pages";

for (const path of PAGES) {
  test(`no content hidden until hydration: ${path}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html).not.toMatch(/style="[^"]*opacity:\s*0[;"]/);
  });

  test(`images are sized and the first-viewport image is not lazy: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    const imgs = await page.$$eval("img", (els) =>
      els.map((i) => ({
        src: i.currentSrc || i.src,
        w: i.getAttribute("width"),
        h: i.getAttribute("height"),
        fill: i.getAttribute("data-nimg") === "fill",
        lazy: i.loading === "lazy",
        top: i.getBoundingClientRect().top,
        shown: i.getBoundingClientRect().width > 0, // images in a hidden project tab report top 0
      })),
    );
    for (const i of imgs) {
      expect(i.fill || (i.w && i.h), `unsized image ${i.src}`).toBeTruthy();
      if (i.shown && i.top < 812) expect(i.lazy, `first-viewport image is lazy: ${i.src}`).toBe(false);
    }
  });
}

test("hero image stays within 120 KB", async ({ page }) => {
  const sizes: number[] = [];
  page.on("response", async (r) => {
    if (r.request().resourceType() === "image" && /brian-ramoroka/.test(r.url())) sizes.push((await r.body()).length);
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(sizes.length).toBeGreaterThan(0);
  for (const s of sizes) expect(s).toBeLessThanOrEqual(120 * 1024);
});
