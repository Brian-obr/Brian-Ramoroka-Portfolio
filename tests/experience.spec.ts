import { test, expect } from "@playwright/test";

// Mobile timeline: date and company must stack, not sit side
// by side and wrap. Date on one line, company on the line below; no "·" separator.
for (const width of [390, 600]) {
  for (const path of ["/", "/experience"]) {
    test(`timeline date and company stack on phones @${width}: ${path}`, async ({ page }) => {
      await page.addInitScript(() => localStorage.setItem("consent", "denied"));
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const metas = page.locator("[data-exp-meta]:visible");
      expect(await metas.count()).toBeGreaterThan(0);
      for (const meta of await metas.all()) {
        const date = meta.locator("[data-exp-date]");
        const company = meta.locator("[data-exp-company]");
        const [db, cb] = [(await date.boundingBox())!, (await company.boundingBox())!];
        expect(cb.y, "company below the date").toBeGreaterThanOrEqual(db.y + db.height - 1);
        expect(Math.abs(cb.x - db.x), "left-aligned").toBeLessThanOrEqual(1);
        const lh = await date.evaluate((e) => parseFloat(getComputedStyle(e).lineHeight));
        expect(db.height, "date on one line").toBeLessThanOrEqual(lh * 1.2);
        expect(await meta.textContent()).not.toContain("·");
      }
    });
  }
}
