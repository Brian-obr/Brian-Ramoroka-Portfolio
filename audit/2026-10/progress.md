# Progress log: redesign/2026-10

Measurements: local `next build && next start` (Lighthouse 12.8.2 via LHCI, mobile, simulated throttling, median of 3) unless marked "preview" (Vercel preview URL) or "live".

## Phase 0: tooling (`redesign/00-tooling`)
- Added Playwright 1.56.1 (desktop 1280×900 + Pixel 7), @axe-core/playwright 4.10.2, LHCI 0.15.1 with budgets, bundle analyzer, GitHub Actions CI.
- Fixed lint error `react-hooks/set-state-in-effect` (Navbar) and an unused import. `npm run lint`: 0 errors (2 warnings, both `<img>`, removed in phase 1).
- **Baseline test run (before any site change):** 22 passed, 2 failed: axe `color-contrast` on mobile `/services` and `/experience` (amber `.deep-link` and mono labels over the fixed photo background). The live Python axe run at 375px missed these; the Pixel 7 emulation (412px, DPR 2.625) catches them. Expected to clear when the photo background is removed (phase 1.3).
