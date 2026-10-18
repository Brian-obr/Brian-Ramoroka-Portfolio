import { test, expect } from "@playwright/test";

const events = (page: import("@playwright/test").Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer ?? []).filter((e) => e && typeof e === "object" && "event" in e),
  );

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
});

for (const [selector, event] of [
  ['a[href^="tel:"]', "click_phone"],
  ['a[href^="mailto:"]', "click_email"],
] as const) {
  test(`${event} is pushed with a link_location`, async ({ page }) => {
    await page.goto("/contact");
    const link = page.locator(selector).first();
    await link.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
    await link.click();
    const pushed = (await events(page)).filter((e) => e.event === event);
    expect(pushed).toHaveLength(1);
    expect(pushed[0].link_location).toBeTruthy();
  });
}

test("no event parameter carries an email address or phone number", async ({ page }) => {
  await page.goto("/contact");
  for (const sel of ['a[href^="tel:"]', 'a[href^="mailto:"]']) {
    const link = page.locator(sel).first();
    await link.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
    await link.click();
  }
  const json = JSON.stringify(await events(page));
  expect(json).not.toMatch(/@|\+27|813798635/);
});
