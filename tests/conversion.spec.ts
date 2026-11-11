import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PAGES } from "./pages";

const CV_PATH = "/cv/brian-ramoroka-cv.pdf";
const cvExists = fs.existsSync(path.join(process.cwd(), "public", CV_PATH));

const dataLayerEvents = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [])
      // Site events are GTM custom events ({ event, ...params }); GTM's own gtm.* events are left out.
      .map((e) => (typeof e === "object" && e !== null && "event" in e ? String((e as { event: unknown }).event) : ""))
      .filter((name) => name !== "" && !name.startsWith("gtm.")),
  );

test("no dead links anywhere", async ({ request }) => {
  for (const p of PAGES) {
    const html = await (await request.get(p)).text();
    expect(html, p).not.toContain('href="#"');
  }
});

test("CV download works and is tracked when the CV exists", async ({ page, request }) => {
  test.skip(!cvExists, "CV PDF not supplied yet; buttons are hidden instead of dead");
  const res = await request.get(CV_PATH);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/pdf");
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("consent", "granted"));
  await page.reload();
  await page.locator(`a[href="${CV_PATH}"]`).first().click({ modifiers: ["Alt"] });
  expect(await dataLayerEvents(page)).toContain("cv_download");
});

// "Download CV" opens a chooser with both CVs; focus returns on close.
test("CV chooser lists both CVs and returns focus", async ({ page }) => {
  await page.goto("/");
  const opener = page.locator(".hero [data-cv-open]");
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Download my CV" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator(".cv-card h3")).toHaveText(["Front-end Developer", "Software Developer"]);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

const grantConsent = (page: Page) => page.addInitScript(() => localStorage.setItem("consent", "granted"));
const stubGoogle = (page: Page) => page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.fulfill({ status: 204, body: "" }));

test("no events are queued before consent", async ({ page }) => {
  await page.goto("/contact");
  await page.locator('a[href^="mailto:"]').first().evaluate((a: HTMLAnchorElement) => a.addEventListener("click", (e) => e.preventDefault()));
  await page.locator('a[href^="mailto:"]').first().click();
  expect(await dataLayerEvents(page)).toEqual([]);
});

test("honeypot submissions do not count as leads", async ({ page }) => {
  await grantConsent(page);
  await stubGoogle(page);
  await page.route("**/api/contact", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' }));
  await page.goto("/contact");
  await page.fill("#name", "Bot");
  await page.fill("#email", "bot@example.com");
  await page.fill("#message", "Spam spam spam spam spam spam spam.");
  await page.locator("#website").evaluate((el: HTMLInputElement) => (el.value = "http://spam.example"));
  await page.click('button[type="submit"]');
  await page.waitForURL("**/thank-you");
  expect((await dataLayerEvents(page)).filter((e) => e === "generate_lead")).toHaveLength(0);
});

test("successful enquiry lands on /thank-you and fires generate_lead once", async ({ page }) => {
  await grantConsent(page);
  await stubGoogle(page);
  await page.route("**/api/contact", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' }));
  await page.goto("/contact");
  await page.fill("#name", "Test Person");
  await page.fill("#email", "test@example.com");
  await page.fill("#message", "I need a new website for my guesthouse in Observatory.");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/thank-you");
  await expect(page.locator("h1")).toBeVisible();
  expect((await dataLayerEvents(page)).filter((e) => e === "generate_lead")).toHaveLength(1);
  await page.reload();
  expect((await dataLayerEvents(page)).filter((e) => e === "generate_lead")).toHaveLength(0);
  const html = await (await page.request.get("/thank-you")).text();
  expect(html).toMatch(/<meta name="robots" content="noindex/);
});

test("email, phone and WhatsApp clicks are tracked", async ({ page }) => {
  await grantConsent(page);
  await stubGoogle(page);
  await page.goto("/contact");
  for (const [sel, evt] of [
    ['a[href^="mailto:"]', "click_email"],
    ['a[href^="tel:"]', "click_phone"],
    ['a[href^="https://wa.me/"]', "click_whatsapp"],
  ] as const) {
    await page.locator(sel).first().evaluate((a: HTMLAnchorElement) => a.addEventListener("click", (e) => e.preventDefault()));
    await page.locator(sel).first().click();
    expect(await dataLayerEvents(page), evt).toContain(evt);
  }
});

test("client validation shows field errors without sending", async ({ page }) => {
  let posted = false;
  await page.route("**/api/contact", (r) => { posted = true; return r.fulfill({ status: 200, body: "{}" }); });
  await page.goto("/contact");
  await page.fill("#name", "B");
  await page.fill("#email", "not-an-email");
  await page.fill("#message", "short");
  await page.click('button[type="submit"]');
  await expect(page.getByText("Please enter your name")).toBeVisible();
  await expect(page.getByText("Please enter a valid email")).toBeVisible();
  await expect(page.getByText("Message must be at least 10 characters")).toBeVisible();
  expect(posted).toBe(false);
});
