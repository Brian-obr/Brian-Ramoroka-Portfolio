import { test, expect, type Page } from "@playwright/test";

// Case-study cards at tablet width:
// - when a block gets too narrow for image + text side by side, it stacks; the image then covers the
//   block's width and shows the whole screenshot, at full quality (hero sections excluded)
// - a mobile screenshot for each case study
// - button groups: equal widths when stacked; fit on one row when there is room
// - hover shadow visible on the dark theme too; nav sticks to the top

const ready = async (page: Page) => {
  await page.addInitScript(() => localStorage.setItem("consent", "denied"));
};
const loadImages = (page: Page) =>
  page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((i) => ((i as HTMLImageElement).loading = "eager"));
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
  });

// The website image must fit its block with nothing cut from the sides, and
// (follow-up) without blank space. Both screenshots fill their frame edge to edge, always show the
// page's full width, top-anchored (the long page continues past the frame's bottom), and the phone
// screenshot sits beside the website one, never on top of it. Side by side only from 1280 px.
for (const width of [390, 768, 1024, 1220, 1280, 1440]) {
  for (const path of ["/", "/portfolio"]) {
    test(`case screenshots fill their frame, full width, nothing covered @${width}: ${path}`, async ({ page }) => {
      await ready(page);
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await loadImages(page);
      for (const card of await page.locator("[data-case-card]").all()) {
        const info = [];
        for (const img of [card.locator("[data-case-main]"), card.locator("[data-case-phone]")]) {
          info.push(
            await img.evaluate((i: HTMLImageElement) => {
              const r = i.getBoundingClientRect();
              const cs = getComputedStyle(i);
              return { x: r.x, y: r.y, w: r.width, h: r.height, fit: cs.objectFit, pos: cs.objectPosition, nat: i.naturalWidth / i.naturalHeight };
            }),
          );
        }
        for (const s of info) {
          expect(s.fit, `${width}px fit`).toBe("cover"); // fills its frame: no blank space
          expect(s.pos.split(" ")[1], `${width}px position`).toBe("0%"); // anchored at the top
          // The frame is never narrower than the picture, so the page's full width always shows.
          expect(s.w / s.h, `${width}px side crop`).toBeGreaterThanOrEqual(s.nat - 0.01);
        }
        const [d, ph] = info;
        expect(Math.abs(d.h - ph.h), `${width}px phone as tall as the website shot`).toBeLessThanOrEqual(2);
        expect(ph.x, `${width}px phone beside, not on top`).toBeGreaterThanOrEqual(d.x + d.w - 1);
        const hb = (await card.locator("h2, h3").first().boundingBox())!;
        const sb = (await card.locator("[data-case-summary]").boundingBox())!;
        if (width < 1280) {
          // Title first, then the screenshots, then the text.
          expect(hb.y + hb.height, "stacked: title above the screenshots").toBeLessThanOrEqual(d.y);
          expect(sb.y, "stacked: summary below the screenshots").toBeGreaterThanOrEqual(d.y + d.h);
        } else expect(hb.x, "side by side from 1280 px").toBeGreaterThan(d.x + d.w);
      }
    });
  }
}

test("case studies each have a mobile screenshot", async ({ page }) => {
  await ready(page);
  for (const path of ["/", "/portfolio"]) {
    await page.goto(path);
    for (const card of await page.locator("[data-case-card]").all()) {
      await expect(card.locator("[data-case-phone]"), path).toHaveCount(1);
      await expect(card.locator("[data-case-phone]")).toHaveAttribute("alt", /phone/i);
    }
  }
});

// Stacked buttons are full width; on small screens every button is full width
// (all buttons, heroes included). Where there is room, a group keeps one row at natural widths.
for (const width of [390, 900, 1440]) {
  test(`button groups: full width when stacked, one row when they fit @${width}`, async ({ page }) => {
    await ready(page);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const group of await page.locator("[data-btn-group]").all()) {
      const bs = (await Promise.all((await group.locator("[data-btn]").all()).map((b) => b.boundingBox()))).filter(Boolean) as {
        x: number; y: number; width: number; height: number;
      }[];
      const rows = new Set(bs.map((b) => Math.round(b.y))).size;
      expect([1, bs.length], "one row or fully stacked").toContain(rows);
      const gw = await group.evaluate((g) => g.getBoundingClientRect().width);
      if (rows === bs.length && bs.length > 1) for (const b of bs) expect(Math.abs(b.width - gw), "stacked = full width").toBeLessThanOrEqual(1);
      const fits = await group.evaluate((g) => {
        const btns = [...g.querySelectorAll<HTMLElement>("[data-btn]")];
        const gap = parseFloat(getComputedStyle(g).columnGap) || 0;
        return btns.reduce((sum, b) => sum + b.scrollWidth, 0) + gap * (btns.length - 1) <= g.clientWidth;
      });
      if (fits && width >= 640) expect(rows, "one row when it fits").toBe(1);
    }
  });
}

test("on small screens every button is full width (all pages, heroes included)", async ({ page }) => {
  await ready(page);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/about", "/portfolio", "/contact", "/experience"]) {
    await page.goto(path);
    const narrow = await page.$$eval("main [data-btn], footer [data-btn]", (els) =>
      els
        .filter((b) => (b as HTMLElement).offsetParent !== null)
        .map((b) => ({ t: (b.textContent ?? "").trim(), w: b.getBoundingClientRect().width, pw: b.parentElement!.getBoundingClientRect().width }))
        .filter((x) => Math.abs(x.w - x.pw) > 1),
    );
    expect(narrow.map((n) => `${n.t}: ${Math.round(n.w)} of ${Math.round(n.pw)}`), path).toEqual([]);
  }
});

test("hover shadow is visible on the dark theme", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await ready(page);
  await page.goto("/");
  for (const sel of ["main .btn-primary", "main .btn-secondary"]) {
    const btn = page.locator(sel).first();
    await btn.hover();
    await page.waitForTimeout(300);
    const shadow = await btn.evaluate((el) => getComputedStyle(el).boxShadow);
    // A light or amber glow layer, not only near-black layers that vanish on a dark page.
    expect(shadow, sel).toMatch(/rgba\(255, (184|255|247), \d+, 0\.\d+\)|rgba\(243, 241, 234, 0\.\d+\)/);
  }
  await ctx.close();
});

test("nav sticks to the top while scrolling", async ({ page }) => {
  await ready(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.mouse.wheel(0, 2500);
  await page.waitForTimeout(300);
  const box = await page.locator("header").first().boundingBox();
  expect(Math.abs(box!.y)).toBeLessThanOrEqual(1);
  await expect(page.locator("header").getByRole("link", { name: /projects/i })).toBeInViewport();
});

for (const width of [390, 768]) {
  test(`no page scrolls sideways @${width}`, async ({ page }) => {
    await ready(page);
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/about", "/portfolio", "/contact", "/experience", "/skills", "/privacy"]) {
      await page.goto(path);
      await page.waitForTimeout(200);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

// The shadow must be visible but not heavy.
// The lift shadow (last box-shadow layer) on hover: alpha 0.15-0.35, blur 12-24px, in both themes.
for (const scheme of ["light", "dark"] as const) {
  test(`hover shadow is visible but moderate (${scheme})`, async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await ready(page);
    await page.goto("/");
    for (const sel of ["main .btn-primary", "main .btn-secondary"]) {
      const btn = page.locator(sel).first();
      const rest = await btn.evaluate((el) => getComputedStyle(el).boxShadow);
      await btn.hover();
      await page.waitForTimeout(300);
      const hover = await btn.evaluate((el) => getComputedStyle(el).boxShadow);
      expect(hover, `${sel} changes on hover`).not.toBe(rest);
      // Computed form: "rgba(r, g, b, a) Xpx Ypx BLURpx SPREADpx" per layer; take the last layer.
      const last = hover.split(/,(?![^(]*\))/).pop()!.trim();
      const alpha = Number(last.match(/rgba\([^)]*,\s*([\d.]+)\)/)?.[1] ?? 1);
      const blur = Number(last.match(/\)\s+-?[\d.]+px\s+-?[\d.]+px\s+([\d.]+)px/)?.[1] ?? 0);
      expect(alpha, `${sel} alpha`).toBeGreaterThanOrEqual(0.15);
      expect(alpha, `${sel} alpha`).toBeLessThanOrEqual(0.35);
      expect(blur, `${sel} blur`).toBeGreaterThanOrEqual(12);
      expect(blur, `${sel} blur`).toBeLessThanOrEqual(24);
    }
    await ctx.close();
  });
}

// On the light background the hover shadow must still be visible.
// Measured in pixels, not CSS: the band just below the button must visibly change on hover
// (mean luminance shift of 8-60 levels out of 255), in both themes.
async function bandLuminance(page: Page, box: { x: number; y: number; width: number; height: number }) {
  const clip = { x: box.x + box.width * 0.15, y: box.y + box.height + 3, width: box.width * 0.7, height: 10 };
  const png = await page.screenshot({ clip });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    let sum = 0;
    for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    return sum / (d.length / 4);
  }, png.toString("base64"));
}

for (const scheme of ["light", "dark"] as const) {
  test(`hover shadow is visibly different from rest, in pixels (${scheme})`, async ({ browser }) => {
    const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await ready(page);
    await page.goto("/");
    for (const sel of ["main section:first-of-type .btn-primary", "main section:first-of-type .btn-secondary"]) {
      const btn = page.locator(sel).first();
      await page.mouse.move(0, 0);
      await page.waitForTimeout(300);
      const box = (await btn.boundingBox())!;
      const rest = await bandLuminance(page, box);
      await btn.hover();
      await page.waitForTimeout(400);
      const hover = await bandLuminance(page, box);
      const delta = Math.abs(rest - hover);
      expect(delta, `${sel}: rest ${rest.toFixed(1)} vs hover ${hover.toFixed(1)}`).toBeGreaterThanOrEqual(8);
      expect(delta, `${sel}: too strong`).toBeLessThanOrEqual(60);
    }
    await ctx.close();
  });
}

test("case card reading order: title, screenshots, then text (DOM order, for screen readers)", async ({ page }) => {
  await ready(page);
  await page.goto("/portfolio");
  for (const card of await page.locator("[data-case-card]").all()) {
    const order = await card.evaluate((c) => {
      const all = [...c.querySelectorAll("h2, h3, [data-case-main], [data-case-summary]")];
      return all.map((e) => (e.matches("h2, h3") ? "title" : e.hasAttribute("data-case-main") ? "media" : "summary"));
    });
    expect(order).toEqual(["title", "media", "summary"]);
  }
});
