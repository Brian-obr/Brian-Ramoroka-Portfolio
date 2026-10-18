import { test as base } from "@playwright/test";

/** Each test submits from its own client IP, so the contact form's per-IP rate limit doesn't leak between tests. */
export const test = base.extend({
  page: async ({ page }, provide) => {
    const ip = `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    await page.setExtraHTTPHeaders({ "x-real-ip": ip });
    await provide(page);
  },
});
export { expect } from "@playwright/test";
