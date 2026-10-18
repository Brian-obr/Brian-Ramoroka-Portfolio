import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
});

const leadEvents = (page: import("@playwright/test").Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer ?? []).filter(
      (e) => e && typeof e === "object" && (e.event === "generate_lead" || String(e.event).startsWith("form_submit_")),
    ),
  );

test("/thank-you fires generate_lead and form_submit_project once per submission, not on reload", async ({ page }) => {
  await page.goto("/thank-you?type=project&s=abc123");
  let ev = await leadEvents(page);
  expect(ev.map((e) => e.event).sort()).toEqual(["form_submit_project", "generate_lead"]);
  expect(ev.find((e) => e.event === "generate_lead")).toMatchObject({ lead_type: "project", submission_id: "abc123" });
  await page.reload();
  ev = await leadEvents(page);
  expect(ev).toHaveLength(0);
});

test("/thank-you fires form_submit_hiring for hiring enquiries", async ({ page }) => {
  await page.goto("/thank-you?type=hiring&s=def456");
  expect((await leadEvents(page)).map((e) => e.event)).toContain("form_submit_hiring");
});

test("/thank-you is noindex and not in the sitemap", async ({ page, request }) => {
  await page.goto("/thank-you?type=project&s=x");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("thank-you");
});

test("/thank-you without a submission id fires nothing", async ({ page }) => {
  await page.goto("/thank-you");
  expect(await leadEvents(page)).toHaveLength(0);
});
