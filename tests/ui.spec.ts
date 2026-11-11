import { test, expect } from "@playwright/test";

// Button lift + shadow on hover, an SVG icon on every button, no italic text,
// the canvas's retracting underline, the canvas case-study card, a new contact band and footer.

test("every button has an SVG icon and an accessible name", async ({ page }) => {
  for (const p of ["/", "/portfolio", "/contact"]) {
    await page.goto(p);
    const btns = page.locator("[data-btn]");
    expect(await btns.count(), p).toBeGreaterThan(0);
    for (const b of await btns.all()) {
      await expect(b.locator("svg").first(), p).toBeAttached();
      expect(((await b.textContent()) ?? "").trim().length, p).toBeGreaterThan(1);
    }
  }
});

test("buttons lift with a deeper shadow on hover", async ({ page }) => {
  await page.goto("/");
  const btn = page.locator("main [data-btn]").first();
  const before = await btn.evaluate((el) => getComputedStyle(el).boxShadow);
  await btn.hover();
  await page.waitForTimeout(400);
  const after = await btn.evaluate((el) => ({ t: getComputedStyle(el).transform, s: getComputedStyle(el).boxShadow }));
  const ty = after.t === "none" ? 0 : Number(after.t.replace(/matrix\(|\)/g, "").split(",")[5]);
  expect(ty).toBeLessThan(0);
  expect(after.s).not.toBe(before);
});

test("with reduced motion, hover changes the shadow but does not move the button", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  const btn = page.locator("main [data-btn]").first();
  await btn.hover();
  await page.waitForTimeout(400);
  expect(await btn.evaluate((el) => getComputedStyle(el).transform)).toBe("none");
  await ctx.close();
});

test("no italic text and no web display font", async ({ page }) => {
  for (const p of ["/", "/portfolio", "/about"]) {
    await page.goto(p);
    const italic = await page.$$eval("h1, h2, h3, p, a, li, span", (els) =>
      els.filter((e) => getComputedStyle(e).fontStyle === "italic").map((e) => e.textContent?.slice(0, 40)),
    );
    expect(italic, p).toEqual([]);
    const h1 = await page.locator("h1").evaluate((e) => ({ f: getComputedStyle(e).fontFamily, w: Number(getComputedStyle(e).fontWeight) }));
    expect(h1.f).not.toMatch(/Instrument/i);
    expect(h1.w).toBeGreaterThanOrEqual(600);
  }
});

test("in-text links use the retracting underline", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("main .deep-link").first();
  expect(await link.evaluate((el) => getComputedStyle(el).backgroundSize)).toBe("100% 3px");
  await link.hover();
  await page.waitForTimeout(500);
  expect(await link.evaluate((el) => getComputedStyle(el).backgroundSize)).toMatch(/^0(%|px) 3px$/);
});

// Projects sit in one browser window; each tab swaps the screenshot and the details.
test("home projects: browser tabs swap the project, arrow keys move between tabs", async ({ page }) => {
  await page.goto("/");
  const tabs = page.locator("#projects [role=tab]");
  await expect(tabs).toHaveCount(2);
  await expect(page.locator("#projects .pinfo h3")).toContainText("The Breezy Exchange");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#projects .pinfo h3")).toHaveText("brianramoroka.co.za");
  await expect(page.locator("#projects [role=tabpanel]:visible")).toHaveCount(1);
});

test("home tabs fit phones without scrolling sideways", async ({ page }) => {
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const bar = page.locator("#projects .win-tabs");
    expect(await bar.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
});

test("contact band: heading, primary action, contact rows", async ({ page }) => {
  await page.goto("/");
  const band = page.locator("#contact");
  await expect(band.locator("h2")).toBeVisible();
  await expect(band.locator("[data-btn]").first()).toBeVisible();
  await expect(band.locator('dl a[href^="mailto:"]')).toBeVisible();
  await expect(band.locator('dl a[href^="tel:+27813798635"]')).toBeVisible();
  await expect(band.locator("form")).toBeVisible();
});

test("footer: navigate, contact and elsewhere columns, back to top", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.getByRole("navigation", { name: /footer/i })).toBeVisible();
  await expect(footer.locator('a[href^="mailto:"]').last()).toBeVisible();
  await expect(footer.locator('a[href*="linkedin.com"]')).toBeVisible();
  await expect(footer.locator('a[href*="github.com"]')).toBeVisible();
  await expect(footer.getByRole("link", { name: /back to top/i })).toHaveAttribute("href", "#top");
  await expect(page.locator("#top")).toHaveCount(1);
});

test("about hero: named H1, actions, profile card beside it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/about");
  const hero = page.locator("main section").first();
  await expect(hero.locator("h1")).toHaveText("About Brian Ramoroka");
  expect(await hero.locator("[data-btn]").count()).toBeGreaterThanOrEqual(2);
  const [imgBox, h1Box] = [await hero.locator("img").boundingBox(), await hero.locator("h1").boundingBox()];
  expect(imgBox!.x).toBeGreaterThan(h1Box!.x + 300); // beside the text, not under it
});

test("about hero on a phone: profile card spans the column, CV button above the fold", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const hero = page.locator("main section").first();
  const card = await hero.locator("aside").boundingBox();
  expect(card!.width).toBeGreaterThanOrEqual(340);
  const cv = await hero.locator("[data-cv-open]").boundingBox();
  expect(cv!.y + cv!.height).toBeLessThanOrEqual(844);
});

test("about page follows the SEO copy: its headings, named markets, no KPIs or counts", async ({ page, request }) => {
  await page.goto("/about");
  const html = await (await request.get("/about")).text();
  expect(html).not.toMatch(/🇿🇦|🇳🇱|🇬🇧/);
  const h2s = (await page.locator("main h2").allTextContents()).map((t) => t.trim());
  expect(h2s).toEqual([
    "This page, checked",
    "How I check a page before it goes live",
    "What I do now",
    "How I got here",
    "What I want next",
    "Where I can work",
    "Markets I work in",
    "Languages",
    "Get my CV",
  ]);
  await expect(page.locator("#markets")).toContainText("Netherlands");
  expect(html).not.toMatch(/150\+|over 80%|8 markets|seven more/i);
});

test("skills page: ledger layout, every field as an H2, CV in the hero, jump links work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/skills");
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toHaveText(/Home\s*\/\s*Skills/);
  const h2s = (await page.locator("main h2").allTextContents()).map((t) => t.trim());
  expect(h2s).toEqual([
    "Front-end",
    "CMS and e-commerce",
    "Back-end and languages",
    "Databases",
    "APIs and integrations",
    "Testing",
    "Cloud, hosting and DevOps",
    "SEO",
    "Content and design",
    "Ways of working and tools",
    "AI tools",
    "Basic exposure",
    "Education",
  ]);
  // CV button above the fold on a phone, then two more further down (mid prompt and end).
  const cv = page.locator("main [data-cv-open]");
  await expect(cv).toHaveCount(3);
  const first = await cv.first().boundingBox();
  expect(first!.y + first!.height).toBeLessThanOrEqual(844);
  // Skills are plain list items, not links or buttons, and no counts appear.
  expect(await page.locator("#front-end li a, #front-end li button").count()).toBe(0);
  await expect(page.locator("#cms")).toContainText("Bricks Builder");
  await expect(page.locator("main")).not.toContainText(/\b\d+ skills\b/i);
  // Jump link lands on its field.
  await page.getByRole("navigation", { name: "Jump to a field" }).getByRole("link", { name: "SEO" }).click();
  await expect(page).toHaveURL(/#seo$/);
  await expect(page.locator("#seo h2")).toBeInViewport();
});

test("home contact form: every field has its label (the H1 no longer shares the Name input's id)", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("[id='name']").count()).toBe(1);
  const form = page.locator("#contact form");
  for (const name of [/^Name/, /^Email/, /^Message/]) await expect(form.getByRole("textbox", { name })).toHaveCount(1);
  await expect(page.locator("section.hero")).toHaveAttribute("aria-labelledby", "hero-name");
  await expect(page.locator("#hero-name")).toHaveText(/Brian\s*Ramoroka/);
});
