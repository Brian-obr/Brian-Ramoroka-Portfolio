import { test, expect } from "@playwright/test";

test("with reduced motion, transitions are instant", async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("/");
  const d = await page.getByRole("link", { name: "See my experience" }).evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(d.split(",").every((v) => parseFloat(v) === 0)).toBe(true);
  await page.close();
});

test("nothing animates on load: every element is fully opaque without waiting", async ({ page }) => {
  await page.goto("/", { waitUntil: "commit" });
  await page.waitForSelector("h1");
  const transparent = await page.$$eval("main *", (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
  expect(transparent).toBe(0);
});
