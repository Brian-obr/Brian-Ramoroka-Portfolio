# Progress log: redesign/2026-10

Measurements: local `next build && next start` (Lighthouse 12.8.2 via LHCI, mobile, simulated throttling, median of 3) unless marked "preview" (Vercel preview URL) or "live".

## Phase 0: tooling (`redesign/00-tooling`)
- Added Playwright 1.56.1 (desktop 1280×900 + Pixel 7), @axe-core/playwright 4.10.2, LHCI 0.15.1 with budgets, bundle analyzer, GitHub Actions CI.
- Fixed lint error `react-hooks/set-state-in-effect` (Navbar) and an unused import. `npm run lint`: 0 errors (2 warnings, both `<img>`, removed in phase 1).
- **Baseline test run (before any site change):** 22 passed, 2 failed: axe `color-contrast` on mobile `/services` and `/experience` (amber `.deep-link` and mono labels over the fixed photo background). The live Python axe run at 375px missed these; the Pixel 7 emulation (412px, DPR 2.625) catches them. Expected to clear when the photo background is removed (phase 1.3).

## Phase 1: critical fixes (`redesign/01-critical-fixes`)

| Check | Before | After | Evidence |
|---|---|---|---|
| F-06 dead `href="#"` links | 2 per page (nav CV) | 0; nav CTA "Get a quote" → /contact; CV button on /experience renders only if `public/cv/brian-ramoroka-cv.pdf` exists (else "CV available on request") | `tests/critical.spec.ts` |
| F-05 `opacity:0` in SSR HTML | home 46, skills 50, about 30 | 0 on all routes | `critical.spec.ts` F-05 |
| F-05 mobile LCP (LHCI simulated, median of 3) | 6,610ms (live) | **2,912ms** (local) | `.lighthouseci` |
| Mobile LCP observed (unthrottled trace) | ≈ TTI | 72ms (= FCP) | LHCI `observedLargestContentfulPaint` |
| F-08 hero image | 535KB WebP 3992×6000, `loading=lazy` | 38KB at w=750 (next/image), `fetchPriority=high`, sized | `critical.spec.ts` |
| F-10 OG image | 3992×6000 WebP declared 1200×630 | `/opengraph-image` PNG 1200×630 on every route | `critical.spec.ts` reads PNG IHDR |
| F-16 unused PNGs | 30MB | removed | `git rm` |
| F-13 sitemap dates | build time for every URL | per-route content dates | `src/app/sitemap.ts` |
| F-17 / F-25 scroll blur listener | setState every scroll event | removed | code |
| framer-motion | 21 components | removed from the project | `package.json` |
| JS (home, transfer) | 297KB | 255KB | LHCI resource-summary |
| Tests | 22/24 | 90/90 | `npm run test:e2e` |

**Retracted:** F-15 (homepage canonical without trailing slash). `https://host` and `https://host/` are the same resource (RFC 3986 §6.2.3); not a defect.

**Debugging note (systematic-debugging):** after removing the hydration gate, simulated LCP stayed ≈ 3.0s with observed LCP at 72ms. Hypothesis 1, preloaded fonts drive Lantern's LCP estimate: **refuted** (un-preloading Space Mono changed nothing). Hypothesis 2, JS requested before LCP is included in Lantern's LCP graph: partly supported (removing framer-motion took LCP 3,061 → 2,912ms with 42KB less JS). The remaining gap is JS and fonts; phase 5 swaps 3 font families for Geist and rebuilds the client components as server components.

**Still failing LHCI budgets (expected, scheduled):** home LCP 2.9s > 2.0s, script 255KB > 170KB (phase 5); /contact script 688KB, almost all of it the Google Maps iframe (removed in phase 5.8).
