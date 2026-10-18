import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 740 } });
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("consent.v1", JSON.stringify({ analytics: false, ts: "x" })));
  await page.goto("/");
});

test("the mobile menu fills the screen below the header", async ({ page }) => {
  await page.getByRole("button", { name: "Menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile" });
  await expect(menu).toBeVisible();
  const box = (await menu.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(600);
  for (const l of ["Work", "Experience", "Skills", "Services", "About", "Contact"]) {
    const link = menu.getByRole("link", { name: l, exact: true });
    await expect(link).toBeVisible();
    const lb = (await link.boundingBox())!;
    expect(lb.height, l).toBeGreaterThanOrEqual(44);
  }
});

test("aria-controls always points at an element", async ({ page }) => {
  const id = await page.getByRole("button", { name: "Menu" }).getAttribute("aria-controls");
  expect(await page.locator(`#${id}`).count()).toBe(1);
});

test("focus stays inside the open menu and Escape returns it to the button", async ({ page }) => {
  await page.getByRole("button", { name: "Menu" }).click();
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  const inside = await page.evaluate(() => {
    const a = document.activeElement;
    return !!a && (a.closest("#mobile-menu") !== null || a.closest("header") !== null);
  });
  expect(inside).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("widening to desktop closes the menu and restores scrolling", async ({ page }) => {
  await page.getByRole("button", { name: "Menu" }).click();
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("the header fits on one line at 375px", async ({ page }) => {
  const header = (await page.getByRole("banner").boundingBox())!;
  expect(header.height).toBeLessThanOrEqual(65);
  const name = (await page.getByRole("banner").getByRole("link", { name: "Brian Ramoroka" }).boundingBox())!;
  expect(name.height).toBeLessThanOrEqual(44);
});
