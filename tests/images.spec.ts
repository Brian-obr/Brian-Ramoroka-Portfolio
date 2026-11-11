import { test, expect } from "@playwright/test";

// Image quality: every visible image must be delivered with enough
// pixels for how it is actually drawn (including object-fit: cover scaling) at retina densities,
// and at a quality setting of at least 75.
const CASES = [
  { width: 1440, height: 900, dpr: 2 },
  { width: 390, height: 844, dpr: 3 },
];
const PAGES = ["/", "/about", "/portfolio"];
const MAX_UPSCALE = 1.1; // allow 10% before it visibly softens
const MIN_QUALITY = 75;

for (const c of CASES) {
  for (const path of PAGES) {
    test(`images are sharp @${c.width}px x${c.dpr}: ${path}`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: c.dpr });
      const page = await ctx.newPage();
      await page.addInitScript(() => localStorage.setItem("consent", "denied"));
      await page.goto(path);
      await page.evaluate(async () => {
        document.querySelectorAll("img[loading=lazy]").forEach((i) => ((i as HTMLImageElement).loading = "eager"));
        await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
      });
      const report = await page.evaluate(
        ({ maxUp, minQ }) =>
          [...document.images]
            .filter((i) => i.getBoundingClientRect().width > 0 && i.naturalWidth > 0)
            .map((i) => {
              const r = i.getBoundingClientRect();
              const fit = getComputedStyle(i).objectFit;
              const url = new URL(i.currentSrc, location.href);
              // naturalWidth is density-corrected for w-descriptor srcsets, so read the real
              // delivered pixel width from next/image's w= parameter (fallback: naturalWidth).
              const pxW = Number(url.searchParams.get("w")) || i.naturalWidth;
              const pxH = pxW * (i.naturalHeight / i.naturalWidth);
              // Scale the browser applies to the delivered bitmap to draw it in this box.
              const sx = (r.width * devicePixelRatio) / pxW;
              const sy = (r.height * devicePixelRatio) / pxH;
              const upscale = fit === "cover" ? Math.max(sx, sy) : Math.min(sx, sy);
              const q = Number(url.searchParams.get("q") ?? 100);
              return { alt: (i.alt || i.currentSrc).slice(0, 40), upscale: Math.round(upscale * 100) / 100, q, delivered: `${pxW}x${Math.round(pxH)}`, box: `${Math.round(r.width)}x${Math.round(r.height)}` };
            })
            .filter((x) => x.upscale > maxUp || x.q < minQ),
        { maxUp: MAX_UPSCALE, minQ: MIN_QUALITY },
      );
      expect(report).toEqual([]);
      await ctx.close();
    });
  }
}
