import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
});

test("invalid email shows an inline error linked to the field", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Thandi Mokoena");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("Message").fill("We need a new website for our practice.");
  await page.getByRole("button", { name: "Send message" }).click();
  const email = page.getByLabel("Email");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  const describedBy = await email.getAttribute("aria-describedby");
  await expect(page.locator(`#${describedBy}`)).toContainText(/valid email/i);
});

test("a valid project enquiry lands on /thank-you with no personal data in the URL", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("radio", { name: "I have a project" }).check();
  await page.getByLabel("Name").fill("Thandi Mokoena");
  await page.getByLabel("Email").fill("thandi@example.co.za");
  await page.getByLabel("Message").fill("We need a new website for our practice.");
  await page.waitForTimeout(3100); // minimum fill time guard
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page).toHaveURL(/\/thank-you\?type=project&s=[a-z0-9-]+$/);
  expect(page.url()).not.toMatch(/thandi|example|Mokoena/i);
});

test("honeypot submissions are dropped silently", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Bot");
  await page.getByLabel("Email").fill("bot@example.com");
  await page.getByLabel("Message").fill("Buy cheap backlinks now please");
  await page.locator('input[name="website"]').evaluate((el: HTMLInputElement) => (el.value = "spam.example"));
  await page.waitForTimeout(3100);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page).toHaveURL(/\/thank-you/);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the form still submits and reaches /thank-you", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Sipho Dlamini");
    await page.getByLabel("Email").fill("sipho@example.co.za");
    await page.getByLabel("Message").fill("Looking for a front-end developer for a 3-month contract.");
    await page.getByRole("radio", { name: "I'm hiring" }).check();
    await page.getByRole("button", { name: "Send message" }).click();
    // No JS means no startedAt timestamp; the action must skip the time trap and deliver (logged in test).
    await expect(page).toHaveURL(/\/thank-you\?type=hiring/);
  });
});
