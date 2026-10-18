import { test, expect } from "@playwright/test";
import { indexableRoutes } from "./routes";

test.beforeEach(async ({ page }) => {
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => r.abort());
  // Pretend a choice was made so the consent sheet doesn't sit over the layout under test.
  await page.addInitScript(() => localStorage.setItem("consent.v1", JSON.stringify({ analytics: false, ts: "x" })));
});

for (const route of indexableRoutes) {
  test(`${route} renders no em or en dashes`, async ({ page }) => {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    expect(text.match(/[—–]/g) ?? []).toEqual([]);
  });

  test(`${route} interactive controls are at least 44x44 (inline text links excepted)`, async ({ page }) => {
    await page.goto(route);
    const small = await page.$$eval("a, button, input, select, textarea, summary", (els) =>
      els
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          if (el.closest(".sr-only, [aria-hidden='true']") || el.getAttribute("tabindex") === "-1") return false;
          const inline = el.tagName === "A" && getComputedStyle(el).display === "inline" && el.closest("p, li, td, dd");
          if (inline) return false;
          if ((el as HTMLInputElement).type === "radio" || (el as HTMLInputElement).type === "hidden") return false;
          return r.width < 44 || r.height < 44;
        })
        .map((el) => `${el.tagName} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`),
    );
    expect(small).toEqual([]);
  });
}

test("body text uses Geist", async ({ page }) => {
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toMatch(/Geist/i);
});

test("dark mode follows the system setting", async ({ browser }) => {
  const light = await browser.newPage({ colorScheme: "light" });
  const dark = await browser.newPage({ colorScheme: "dark" });
  await light.goto("/");
  await dark.goto("/");
  const bg = (p: typeof light) => p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await bg(light)).toBe("rgb(250, 250, 249)");
  expect(await bg(dark)).toBe("rgb(15, 14, 13)");
  await light.close();
  await dark.close();
});

test("home hero states the role and both calls to action are visible without scrolling on a phone", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page.addInitScript(() => localStorage.setItem("consent.v1", JSON.stringify({ analytics: false, ts: "x" })));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Web Developer");
  for (const name of ["See my experience", "Start a project"]) {
    const box = await page.getByRole("main").getByRole("link", { name }).first().boundingBox();
    expect(box, name).not.toBeNull();
    expect(box!.y + box!.height, name).toBeLessThanOrEqual(667);
  }
  await page.close();
});

test("desktop nav fits on one line at 1024px and is at most 80px tall", async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1024, height: 800 } });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const box = await nav.boundingBox();
  expect(box!.height).toBeLessThanOrEqual(80);
  const tops = await nav.locator("a").evaluateAll((as) => [...new Set(as.map((a) => Math.round(a.getBoundingClientRect().top)))]);
  expect(tops.length).toBe(1);
  await page.close();
});

test("work index links to both case studies", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("link", { name: /The Breezy Exchange/ }).first()).toHaveAttribute("href", "/work/the-breezy-exchange");
  await expect(page.getByRole("link", { name: /brianramoroka\.co\.za/ }).first()).toHaveAttribute("href", "/work/brianramoroka-co-za");
});

test("/portfolio ends on the work page", async ({ page }) => {
  const res = await page.goto("/portfolio");
  expect(res?.status()).toBe(200);
  await expect(page).toHaveURL(/\/work$/);
});

test("skills are grouped by evidence and claim nothing unproven", async ({ page }) => {
  await page.goto("/skills");
  for (const h of ["Used at work", "Used in my own projects", "Studied"]) await expect(page.getByRole("heading", { name: h })).toBeVisible();
  const text = await page.locator("main").innerText();
  for (const unproven of ["Node.js", "SQL Server", "Kubernetes", "SvelteKit", "code review"]) expect(text).not.toContain(unproven);
  await expect(page.getByText("Tailwind CSS").first()).toBeVisible();
});
