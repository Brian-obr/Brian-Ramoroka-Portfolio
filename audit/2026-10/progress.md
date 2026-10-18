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

## Phase 2: tracking, consent, contact, legal (`redesign/02-tracking-consent`)

| Check | Before | After | Evidence |
|---|---|---|---|
| Consent Mode v2 | none; GA4 loaded with no consent | default `denied` (ad_storage, ad_user_data, ad_personalization, analytics_storage) set inline in `<head>` before any tag; stored choice re-applied | `tests/consent.spec.ts` |
| Consent banner | none | Reject and "Accept analytics" equal size (±2px), fixed overlay (CLS ≤ 0.05 asserted), footer "Cookie settings" re-opens it; links to cookie and privacy policies | `consent.spec.ts`, `legal.spec.ts` |
| `_ga` cookie before choice | n/a | none | `consent.spec.ts` |
| Tag loading | `GoogleAnalytics` unconditionally in prod | GTM when `NEXT_PUBLIC_GTM_ID` is set, else GA4 (`NEXT_PUBLIC_GA_ID`) as a fallback so measurement doesn't stop before the container exists | `src/components/analytics/Analytics.tsx` |
| Events | none | `generate_lead` (+`lead_type`), `form_submit_hiring`, `form_submit_project`, `cv_download`, `click_email`, `click_phone`, `click_whatsapp`, `click_booking`, `outbound_click`; no PII in params (asserted) | `tracking.spec.ts`, `thank-you.spec.ts` |
| Contact form | client fetch → `/api/contact` → Formspree; needs JS | Server Action; hiring/project choice; zod validation with `aria-invalid` + `aria-describedby`; honeypot + 3s time trap (JS only) + rate limit; Resend → Formspree → error (never silent success in prod); **works without JavaScript** | `contact.spec.ts`, server log `[contact] would send: Hiring enquiry from Sipho Dlamini` |
| `/thank-you` | 404 | noindex, not in sitemap, fires `generate_lead` once per submission id (reload fires nothing) | `thank-you.spec.ts` |
| Privacy / cookie policy | 404 | `/privacy` (POPIA + GDPR, Information Officer), `/cookies` (table of every cookie) | `legal.spec.ts` |
| Google Maps iframe on /contact | ~430KB of third-party JS | removed | — |
| Vercel Speed Insights | none | added (no cookies) | `layout.tsx` |
| Tests | 90 | 127 passing | `npm run test:e2e` |

**Bugs found by the tests and fixed:** (1) the bot time trap ran before validation, so fast typos were silently dropped as spam; (2) without JavaScript, every submission looked like a bot (no timestamp) and was dropped; (3) the consent banner covered the footer's legal links, so a privacy link was added to the banner.

**Needs Brian (accounts, §10.6):** GTM container → `NEXT_PUBLIC_GTM_ID`; Resend account + DNS for `brianramoroka.co.za` → `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`; until then the form uses the existing `FORMSPREE_URL` if it is set in Vercel (H-04 unverified). External check pending: GTM Preview / Tag Assistant on the preview URL.
