import { test, expect, type Page } from "@playwright/test";

type DL = unknown[];
const dataLayer = (page: Page) => page.evaluate(() => JSON.parse(JSON.stringify((window as unknown as { dataLayer: DL }).dataLayer ?? [])) as DL);
const consentCalls = (dl: DL, kind: "default" | "update") =>
  dl.filter((e) => Array.isArray(e) || (typeof e === "object" && e !== null && "0" in (e as object)))
    .map((e) => Object.values(e as object))
    .filter((a) => a[0] === "consent" && a[1] === kind)
    .map((a) => a[2] as Record<string, string>);

// The test build sets NEXT_PUBLIC_GA_ID=G-TEST00000 (npm run build:test), so the tag would load if allowed.
let googleRequests: string[] = [];
test.beforeEach(async ({ page }) => {
  googleRequests = [];
  await page.route(/googletagmanager\.com|google-analytics\.com/, (r) => {
    googleRequests.push(r.request().url());
    return r.abort();
  });
});

test("no Google tag is requested before consent; accepting loads it", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(googleRequests).toEqual([]);
  await page.getByRole("region", { name: "Cookie consent" }).getByRole("button", { name: "Accept analytics" }).click();
  await expect.poll(() => googleRequests.some((u) => u.includes("gtag/js?id=G-TEST00000"))).toBe(true);
});

test("rejecting after accepting removes _ga cookies", async ({ page, context }) => {
  await page.goto("/");
  await context.addCookies([{ name: "_ga", value: "GA1.1.1.1", domain: "localhost", path: "/" }]);
  await page.getByRole("region", { name: "Cookie consent" }).getByRole("button", { name: "Reject" }).click();
  expect((await context.cookies()).filter((c) => c.name.startsWith("_ga"))).toHaveLength(0);
});

test("consent defaults to denied before any choice and no _ga cookie is set", async ({ page, context }) => {
  await page.goto("/");
  const defaults = consentCalls(await dataLayer(page), "default");
  expect(defaults[0]).toMatchObject({ analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  expect(consentCalls(await dataLayer(page), "update")).toHaveLength(0);
  expect((await context.cookies()).filter((c) => c.name.startsWith("_ga"))).toHaveLength(0);
});

test("banner offers Accept and Reject with equal size, and Accept grants analytics", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Cookie consent" });
  const accept = banner.getByRole("button", { name: "Accept analytics" });
  const reject = banner.getByRole("button", { name: "Reject" });
  const [a, r] = [await accept.boundingBox(), await reject.boundingBox()];
  expect(Math.abs(a!.width - r!.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(a!.height - r!.height)).toBeLessThanOrEqual(2);
  await accept.click();
  await expect(banner).toBeHidden();
  expect(consentCalls(await dataLayer(page), "update").at(-1)).toMatchObject({ analytics_storage: "granted" });
  await page.reload();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toBeHidden();
  expect(consentCalls(await dataLayer(page), "update").at(-1)).toMatchObject({ analytics_storage: "granted" });
});

test("Reject keeps analytics denied and the footer re-opens the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("region", { name: "Cookie consent" }).getByRole("button", { name: "Reject" }).click();
  expect(consentCalls(await dataLayer(page), "update").at(-1)).toMatchObject({ analytics_storage: "denied" });
  await page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" }).click();
  await expect(page.getByRole("region", { name: "Cookie consent" })).toBeVisible();
});

test("banner does not shift layout", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(500);
  const cls = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((l) => {
          for (const e of l.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) if (!e.hadRecentInput) total += e.value;
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(total), 300);
      }),
  );
  expect(cls).toBeLessThanOrEqual(0.05);
});
