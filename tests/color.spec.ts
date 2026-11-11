import { test, expect, type Page } from "@playwright/test";

// No greyed-out text; colours must be clear. Deep links use amber wherever the
// result stays readable: amber underline under ink text on the light theme, amber text on the dark theme.
const PAGES = ["/", "/about", "/portfolio", "/contact", "/experience", "/skills", "/privacy"];
const INK_LIGHT = "rgb(20, 19, 15)";
const INK_DARK = "rgb(243, 241, 234)";
const AMBER = "rgb(255, 184, 0)";
const ERROR = new Set(["rgb(180, 35, 24)", "rgb(249, 112, 102)"]);

async function textColours(page: Page) {
  return page.evaluate(() => {
    const out: { color: string; text: string; link: boolean }[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement!;
      const text = (node.textContent ?? "").trim();
      if (!text || el.closest("script,style,noscript,[aria-hidden=true],.sr-only")) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (el.closest("[data-btn], .btn, section[aria-label='Cookie consent']")) continue; // buttons checked separately
      if (el.closest(".bg-amber, .ribbon, .badge")) continue; // ink on an amber fill (home skills strip, "In progress" badge) is correct on both themes
      if (el.closest(".ed, .view.code")) continue; // the code editor panels are dark in both themes, with light text
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || Number(cs.opacity) < 1) out.push({ color: "opacity:" + cs.opacity, text, link: false });
      out.push({ color: cs.color, text: text.slice(0, 40), link: !!el.closest(".deep-link") });
    }
    return out;
  });
}

for (const scheme of ["light", "dark"] as const) {
  for (const path of PAGES) {
    test(`no grey text and amber deep links (${scheme}): ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ colorScheme: scheme });
      const page = await ctx.newPage();
      await page.addInitScript(() => localStorage.setItem("consent", "denied"));
      await page.goto(path);
      const ink = scheme === "light" ? INK_LIGHT : INK_DARK;
      const bad = (await textColours(page)).filter((t) => {
        if (ERROR.has(t.color)) return false;
        if (t.link) return t.color !== (scheme === "light" ? INK_LIGHT : AMBER);
        // On the dark theme amber text is clear (about 10:1), so it is allowed as an accent there.
        if (scheme === "dark" && t.color === AMBER) return false;
        return t.color !== ink;
      });
      expect(bad.map((b) => `${b.color} "${b.text}"`)).toEqual([]);

      for (const link of await page.locator("main .deep-link").all()) {
        expect(await link.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain(AMBER);
      }
      await ctx.close();
    });
  }
}

test("form fields have no greyed placeholder text", async ({ page }) => {
  await page.goto("/contact");
  expect(await page.locator("input[placeholder], textarea[placeholder]").count()).toBe(0);
});
