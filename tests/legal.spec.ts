import { test, expect } from "@playwright/test";

for (const [path, heading] of [["/privacy", /privacy/i], ["/cookies", /cookie/i]] as const) {
  test(`${path} exists and is linked from the footer`, async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await page.getByRole("region", { name: "Cookie consent" }).getByRole("button", { name: "Reject" }).click();
    await page.getByRole("contentinfo").getByRole("link", { name: heading }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  });
}

test("privacy policy names an Information Officer and POPIA", async ({ page }) => {
  await page.goto("/privacy");
  await expect(page.getByText(/Information Officer/)).toBeVisible();
  await expect(page.getByText(/POPIA|Protection of Personal Information Act/).first()).toBeVisible();
});

test("the consent banner links to the privacy policy while it covers the footer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("region", { name: "Cookie consent" }).getByRole("link", { name: "Privacy policy" }).click();
  await expect(page).toHaveURL(/\/privacy$/);
});
