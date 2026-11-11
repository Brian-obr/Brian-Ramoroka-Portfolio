import { test, expect } from "@playwright/test";

const TAG_HOSTS = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/;

test.describe("consent", () => {
  test("no analytics request before consent; banner has equal-weight choices", async ({ page }) => {
    const tagRequests: string[] = [];
    page.on("request", (r) => TAG_HOSTS.test(r.url()) && tagRequests.push(r.url()));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(tagRequests).toEqual([]);

    const banner = page.getByRole("region", { name: /cookie/i });
    await expect(banner).toBeVisible();
    const accept = banner.getByRole("button", { name: /accept/i });
    const reject = banner.getByRole("button", { name: /reject/i });
    const [a, r] = [await accept.boundingBox(), await reject.boundingBox()];
    expect(Math.abs(a!.width - r!.width)).toBeLessThan(2);
    expect(Math.abs(a!.height - r!.height)).toBeLessThan(2);
  });

  test("accept loads analytics with consent granted", async ({ page }) => {
    const tagRequests: string[] = [];
    await page.route(TAG_HOSTS, (r) => { tagRequests.push(r.request().url()); return r.fulfill({ status: 204, body: "" }); });
    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();
    await expect.poll(() => tagRequests.length).toBeGreaterThan(0);
    const consentCalls = await page.evaluate(() =>
      ((window as unknown as { dataLayer: ArrayLike<unknown>[] }).dataLayer ?? [])
        .map((e) => Array.from(e as ArrayLike<unknown>))
        .filter((e) => e[0] === "consent"),
    );
    expect(consentCalls[0]?.[1]).toBe("default");
    expect((consentCalls[0]?.[2] as Record<string, string>).analytics_storage).toBe("denied");
    expect(consentCalls.at(-1)?.[1]).toBe("update");
    expect((consentCalls.at(-1)?.[2] as Record<string, string>).analytics_storage).toBe("granted");
  });

  test("reject persists across reloads and loads nothing; footer reopens the banner", async ({ page }) => {
    const tagRequests: string[] = [];
    page.on("request", (r) => TAG_HOSTS.test(r.url()) && tagRequests.push(r.url()));
    await page.goto("/");
    await page.getByRole("button", { name: /reject/i }).click();
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("region", { name: /cookie/i })).toHaveCount(0);
    expect(tagRequests).toEqual([]);
    await page.getByRole("button", { name: /cookie settings/i }).click();
    await expect(page.getByRole("region", { name: /cookie/i })).toBeVisible();
  });

  test("every withdrawal in one tab deletes analytics cookies and reloads", async ({ page, context }) => {
    await page.route(TAG_HOSTS, (r) => r.fulfill({ status: 204, body: "" }));
    const setAnalyticsCookies = () =>
      context.addCookies(
        ["_ga", "_clck", "_clsk"].map((name) => ({ name, value: "1", domain: "localhost", path: "/" })),
      );
    const hasAnalyticsCookie = async () => (await context.cookies()).some((c) => /^_(ga|clck|clsk)/.test(c.name));
    const withdraw = async () => {
      await page.evaluate(() => ((window as unknown as { __before: boolean }).__before = true));
      await page.getByRole("button", { name: /cookie settings/i }).click();
      await page.getByRole("button", { name: /reject/i }).click();
      // A reload replaces window, so the marker disappears.
      await expect.poll(() => page.evaluate(() => (window as unknown as { __before?: boolean }).__before ?? false)).toBe(false);
    };

    await page.goto("/");
    await page.getByRole("button", { name: /accept/i }).click();
    await setAnalyticsCookies(); // stands in for gtag.js, which the route stub doesn't run
    await withdraw();
    expect(await hasAnalyticsCookie()).toBe(false);

    await page.getByRole("button", { name: /cookie settings/i }).click();
    await page.getByRole("button", { name: /accept/i }).click();
    await setAnalyticsCookies();
    await withdraw();
    expect(await hasAnalyticsCookie()).toBe(false);
  });

  test("a choice made in another tab is applied in open tabs", async ({ context }) => {
    await context.route(TAG_HOSTS, (r) => r.fulfill({ status: 204, body: "" }));
    const a = await context.newPage();
    const b = await context.newPage();
    await a.goto("/");
    await b.goto("/");
    await a.getByRole("button", { name: /accept/i }).click();
    await expect
      .poll(() =>
        b.evaluate(() =>
          ((window as unknown as { dataLayer: ArrayLike<unknown>[] }).dataLayer ?? [])
            .map((e) => Array.from(e as ArrayLike<unknown>))
            .filter((e) => e[0] === "consent" && e[1] === "update")
            .map((e) => (e[2] as Record<string, string>).analytics_storage),
        ),
      )
      .toContain("granted");
  });
});
