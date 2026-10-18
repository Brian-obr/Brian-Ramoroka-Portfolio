import { test, expect } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
});

const leadEvents = (page: import("@playwright/test").Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer ?? []).filter(
      (e) => e && typeof e === "object" && (e.event === "generate_lead" || String(e.event).startsWith("form_submit_")),
    ),
  );

async function submit(page: import("@playwright/test").Page, type: "project" | "hiring") {
  await page.goto("/contact");
  await page.getByRole("radio", { name: type === "hiring" ? "I'm hiring" : "I have a project" }).check();
  await page.getByLabel("Name").fill("Lerato Khumalo");
  await page.getByLabel("Email").fill("lerato@example.co.za");
  await page.getByLabel("Message").fill("Please quote for a WooCommerce product schema fix.");
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page).toHaveURL(new RegExp(`/thank-you\\?type=${type}&s=`));
}

test("a real submission fires generate_lead and form_submit_project once; reload fires nothing", async ({ page }) => {
  await submit(page, "project");
  let ev = await leadEvents(page);
  expect(ev.map((e) => e.event).sort()).toEqual(["form_submit_project", "generate_lead"]);
  expect(ev.find((e) => e.event === "generate_lead")).toMatchObject({ lead_type: "project" });
  await page.reload();
  ev = await leadEvents(page);
  expect(ev).toHaveLength(0);
});

test("hiring submissions fire form_submit_hiring", async ({ page }) => {
  await submit(page, "hiring");
  expect((await leadEvents(page)).map((e) => e.event)).toContain("form_submit_hiring");
});

test("a forged /thank-you URL fires no conversion", async ({ page }) => {
  await page.goto("/thank-you?type=project&s=abc123");
  expect(await leadEvents(page)).toHaveLength(0);
});

test("/thank-you is noindex and not in the sitemap", async ({ page, request }) => {
  await page.goto("/thank-you?type=project&s=x");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("thank-you");
});
