import { test, expect } from "@playwright/test";

// Wherever a section has two or more columns, the columns are the same height,
// and so are the images in them. Checked on every grid with 2+ tracks inside <main>, per visual row.
const PAGES = ["/", "/about", "/portfolio", "/contact", "/experience", "/skills", "/privacy", "/thank-you"];

const TOLERANCE = 2; // px

for (const width of [1440, 1024]) {
  for (const path of PAGES) {
    test(`equal-height columns and images @${width}: ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(() => localStorage.setItem("consent", "denied"));
      await page.goto(path);
      await page.evaluate(async () => {
        // Load every lazy image so heights are final.
        document.querySelectorAll("img[loading=lazy]").forEach((i) => ((i as HTMLImageElement).loading = "eager"));
        await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
      });

      const problems = await page.evaluate((tol) => {
        const out: string[] = [];
        const label = (el: Element) =>
          `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 4).join(".")} "${(el.textContent ?? "").trim().slice(0, 30)}"`;
        const h = (el: Element) => el.getBoundingClientRect().height;

        for (const grid of document.querySelectorAll("main *")) {
          // The home page's two-column layouts are centred vertically instead.
          if (grid.closest(".p1")) continue;
          const cs = getComputedStyle(grid);
          // Same rule elsewhere: a two-column layout set to align-items:center is centred on purpose.
          if (cs.alignItems === "center") continue;
          if (!cs.display.includes("grid")) continue;
          if (cs.gridTemplateColumns.split(" ").filter(Boolean).length < 2) continue;
          const cells = [...grid.children].filter((c) => {
            const r = c.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && getComputedStyle(c).position !== "absolute";
          });
          // 1. Columns are the same height. A column = cells sharing a left edge; its extent runs from
          //    its first cell's top to its last cell's bottom (handles cells that span rows).
          const cols = new Map<number, Element[]>();
          for (const c of cells) {
            const key = Math.round(c.getBoundingClientRect().left / 4);
            cols.set(key, [...(cols.get(key) ?? []), c]);
          }
          const counts = new Set([...cols.values()].map((cs) => cs.length));
          // A cell spanning rows (e.g. case-card screenshots beside title + text) makes this a
          // column layout: compare whole columns. Uneven lists without spans (e.g. 5 items in
          // 2 columns) are normal flow and are compared row by row below.
          const spans = cells.some((c) => getComputedStyle(c).gridRowEnd.includes("span"));
          const byColumn = spans || counts.size === 1;
          if (cols.size >= 2 && byColumn) {
            const ext = [...cols.values()].map((cs) => {
              const rs = cs.map((c) => c.getBoundingClientRect());
              return Math.max(...rs.map((r) => r.bottom)) - Math.min(...rs.map((r) => r.top));
            });
            if (Math.max(...ext) - Math.min(...ext) > tol)
              out.push(`columns differ (${ext.map(Math.round).join(" vs ")}): ${[...cols.values()].map((cs) => label(cs[0])).join(" | ")}`);
          }
          // Per visual row: cards and images fill their cells.
          const rows = new Map<number, Element[]>();
          for (const c of cells) {
            const key = Math.round(c.getBoundingClientRect().top / 4);
            rows.set(key, [...(rows.get(key) ?? []), c]);
          }
          for (const row of rows.values()) {
            if (row.length < 2) continue;
            if (!byColumn) {
              const hs = row.map(h);
              if (Math.max(...hs) - Math.min(...hs) > tol)
                out.push(`row items differ (${hs.map(Math.round).join(" vs ")}): ${row.map(label).join(" | ")}`);
            }
            for (const cell of row) {
              const cellH = h(cell);
              // 2. A card that is a column's only element fills the column.
              const only = cell.children.length === 1 ? cell.children[0] : null;
              if (only && only.classList.contains("glass") && Math.abs(h(only) - cellH) > tol)
                out.push(`card shorter than its column (${Math.round(h(only))} vs ${Math.round(cellH)}): ${label(only)}`);
              // 3. A column's main image (not a small overlay) fills the column.
              for (const img of cell.querySelectorAll("img")) {
                const r = img.getBoundingClientRect();
                if (r.width < cell.getBoundingClientRect().width * 0.6) continue; // overlay / thumbnail
                if (img.closest("[data-ignore-equal-height]")) continue;
                if (Math.abs(r.height - cellH) > tol)
                  out.push(`image shorter than its column (${Math.round(r.height)} vs ${Math.round(cellH)}): ${img.getAttribute("alt")?.slice(0, 40)}`);
              }
            }
          }
        }
        return out;
      }, TOLERANCE);

      expect(problems).toEqual([]);
    });
  }
}
