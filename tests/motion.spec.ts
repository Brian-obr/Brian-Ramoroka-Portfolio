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
  const moving = await page.$$eval("main *", (els) =>
    els
      .filter((e) => {
        const cs = getComputedStyle(e);
        return cs.opacity !== "1" || cs.animationName !== "none" || (cs.transform !== "none" && !e.matches(":hover"));
      })
      .map((e) => e.tagName),
  );
  expect(moving).toEqual([]);
});
