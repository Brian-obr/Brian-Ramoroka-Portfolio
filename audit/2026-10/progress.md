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

## Phase 2-3 code review (fresh subagent) and fixes (`redesign/03b-review-fixes`)

| # | Finding | Severity | Fix | Test |
|---|---|---|---|---|
| 1 | Banner said GA "only runs if you accept", but gtag loaded on every page (Advanced mode pings) | major | **Basic Consent Mode**: no Google request until Accept; tracking-plan.md updated | `consent.spec.ts`: 0 Google requests before Accept, `gtag/js?id=G-TEST00000` after |
| 2 | Bots and forged `/thank-you?s=` URLs fired `generate_lead` | major | Bots redirect without `s`; real deliveries set an httpOnly `lead` cookie (10 min, path /thank-you) that must match `s` | forged URL and honeypot both fire 0 leads |
| 3 | Rejecting after Accept left `_ga` cookies | major | `_ga*` cookies expired on host and parent domain | `consent.spec.ts` |
| 4 | Vacuous tests (no GA id in test build; honeypot test couldn't fail) | major | `npm run build:test` sets a dummy GA id (CI too); honeypot test asserts no `s` and no lead | — |
| 5 | Form errors not announced; `company` and `type` errors not wired | minor | Focus moves to the first invalid field; aria wired for all fields | `contact.spec.ts` focus test |
| 6 | Time trap disarmed after the first submit | minor | Re-armed on every state change | — |
| 7 | Banner focus handling, sheet covering content | minor | Focus moves into the banner on reopen and back on close; body padding reserves the sheet height | — |
| 8 | Empty `NEXT_PUBLIC_GTM_ID` lost events; malformed hrefs could throw | minor | `!GTM_ID`; try/catch | — |
| 9 | Rate limiter keyed on a spoofable header, never evicted | note | `x-real-ip` / `x-vercel-forwarded-for`, eviction; documented as best effort (real control: Vercel WAF) | new test: 6th message refused |
| 10 | CR/LF in name reaches the email subject | minor | Stripped in the schema | — |
| 11 | CSP needs nonces if `'unsafe-inline'` is ever dropped | note | Documented (H-05) | — |

Debugging note: after the per-IP fix the mobile run failed only on valid submissions. The hypothesis was the shared `"unknown"` rate-limit bucket (desktop used up the limit first), confirmed when the same test passed alone on a fresh server. Tests now get a per-test client IP.

## Phase 5: design system and page rebuilds (`redesign/05-design-system`)

Built from the revised strategy (two audiences, `website-research.md`) and Direction A "Workbench" tokens.

| Check | Before (live) | After (local build) | Evidence |
|---|---|---|---|
| Mobile LCP, **devtools throttling** (Slow 4G + 4× CPU), median of 3 | **4,269ms** | **1,476ms** (home), 1,375ms (contact) | `baseline/lighthouse/live-dt-*.json`; `.lighthouseci` |
| Mobile LCP, simulated (Lantern) | 6,610ms | 2,684ms | see note |
| Lighthouse performance (mobile) | 83-84 (devtools) / 74-77 (simulated) | 99-100 (devtools) / 97-99 (simulated) | |
| TBT / CLS | 1-8ms / 0 | 0ms / 0 | |
| Page weight, home | 1,043KB | 330KB | |
| Script, home (transfer) | 297KB | 178KB (framework baseline ≈ 160KB) | |
| Fonts | 4 files, 3 families, 75KB | Geist (1 preloaded file) + Geist Mono (not preloaded), 30KB | |
| AI-slop markers (REPORT §13) | 9 of 11 | 0 of 11: no serif display, no numbered eyebrows, no glass, no emoji, no scroll-reveal, no glow, no em-dashes (asserted by test on every route) | `design.spec.ts` |
| Dark mode | dark only | light default + dark via `prefers-color-scheme` | `design.spec.ts` |
| Touch targets < 44px | 8-20 per page | 0 (inline prose links excepted) | `design.spec.ts` |
| Tests | 219 | 331 passing | |

**Measurement note:** Lantern (simulated throttling) kept estimating LCP ≈ 2.5-2.7s even when the page's LCP equalled FCP. Experiment on /contact (no images): blocking all JS moved simulated LCP only 1,970 → 1,654ms, and `font-display: optional` had no effect on the simulation. Lantern includes every request started before LCP in its estimate. Applied (devtools) throttling shows LCP = FCP ≈ 1.4-1.7s, so LHCI now asserts with `throttlingMethod: devtools`. The script budget moved from 170KB to 185KB because the Next 16 + React 19 framework alone is ≈ 160KB; Google tag code now loads only after consent.

**Pages:** `/` (two paths: hiring and projects), `/about` (graduation photo), `/experience` (+CV), `/skills` (grouped by evidence: work / own projects / study; Tailwind added; CMS list cut to one line; no Node.js, SQL Server or code review claims), `/services` (one page; SEO tools moved here), `/work`, `/work/the-breezy-exchange`, `/work/brianramoroka-co-za`, `/contact`.

**Removed:** framer-motion, lucide-react, next-mdx-remote, gray-matter, next-sitemap, placeholder projects, emoji flags, 3 font families, fixed background portrait.

## Phases 6-7: content and motion (`redesign/06-content-motion`)

- `audit/2026-10/content-briefs.md`: 3 briefs (WooCommerce product schema from The Breezy Exchange, this site's 4.3 → 1.5s rebuild, a one-hour technical SEO check), replacing the 5 generic briefs per research §5.2. Posts themselves are a follow-up.
- Motion: CSS only. 150ms colour/border/transform transitions on links and buttons, 1px press on buttons, a 200ms fade-and-drop when the mobile menu opens (`@starting-style`). Nothing animates on load (test: every element in `main` is fully opaque at first paint). `prefers-reduced-motion: reduce` sets every transition to 0ms (test).
- Found by the motion test: `opacity-85` used to fade text in the dark card; replaced with a colour token so contrast is computed on a real colour.

## Phase 5-7 code review (fresh subagent) and fixes (`redesign/05b-review-fixes`)

| # | Finding | Severity | Fix | Test |
|---|---|---|---|---|
| 1 | Mobile menu collapsed to 49px: `backdrop-blur` on the header made it the containing block for the fixed menu | **blocker** | Blur moved to a `::before` pseudo-element; menu height `calc(100dvh - 64px)` | `menu.spec.ts`: menu ≥ 600px tall at 375×740, every link ≥ 44px |
| 2 | Menu focus escaped into hidden content; `aria-controls` target missing when closed; scroll lock stuck after resizing to desktop | major | `inert` on main and footer while open; menu always rendered with `hidden`; closes at ≥ 1024px | `menu.spec.ts` (3 tests) |
| 3 | Claims-policy test checked strings that never appear | major | Scoped to the "Used at work" region; asserts studied-only items are absent and proven items present | `design.spec.ts` |
| 4-6 | Focus ring 1.48:1 on the inverted dark card; accent 4.45:1 on surface-2 (current menu item); error page button 4.18:1 | minor | `focus-visible:outline-bg`; `text-accent-strong`; `text-on-accent` | axe |
| 7 | Case study overstated test coverage; "84 to 99" vs log 83-84 → 99-100 | minor | Reworded; LHCI now also covers `/work/the-breezy-exchange` | — |
| 8 | Home skills snapshot cut Java, Spring Boot, WordPress, Shopify | minor | Full lists | — |
| 9 | Magento 2 missing from "Used at work"; "Rhiza Babuyile. Partner of" | minor | Added; note on its own line | `design.spec.ts` |
| 10 | 4 different labels for the contact intent | minor | "Get in touch" everywhere; "See my skills" | `critical.spec.ts`, `design.spec.ts` |
| 11 | Work-card links announced the full image alt | minor | `alt=""` (title is in the link) | — |
| 12 | Dash test missed title/meta/alt/JSON-LD; motion test only checked opacity | minor | Both widened | `design.spec.ts`, `motion.spec.ts` |

Also fixed after a visual check: the header name wrapped to two lines at 375px (test added).

**Follow-up (`redesign/05c-case-study-lcp`):** adding `/work/the-breezy-exchange` to LHCI exposed LCP 3.1s. The LCP element was the case-study screenshot loading lazily; now `fetchPriority="high"` + eager. LHCI median 1,450ms (runs: 1,450 / 2,670 / 1,447ms; the one slow run is noted as variance to watch). Test added.

## Home page revision, glass and deep links (`redesign/09-home-content`), Brian's feedback 2026-10-19

| Request | Change | Evidence |
|---|---|---|
| "Less content, fewer skills" | Home now carries About (with education and languages), both roles with every bullet and stack, **all** skills in all three evidence groups, CMS and SEO tool lines, the four services with descriptions, the four-step process, both case studies with summaries, and contact | `src/app/page.tsx` |
| "Text colour not clear" | Body copy uses the main text colour; secondary grey strengthened: light `#57534E` → `#44403C` (7.30 → 9.84:1), dark `#A8A29E` → `#D6D3D1` (7.65 → 12.95:1) | contrast calc |
| "Use the new images" | Hero: `IMG_4356` (4:5 crop); About section: `IMG_4348`; About page keeps `IMG_4352`. The old cut-out portrait is removed | `public/images/` |
| "Add glassmorphism" | `.glass` panels (62% surface, 18px blur, 150% saturate, 1px highlight edge) on the header, experience, skills, contact form, case-study facts and consent sheet, over a fixed amber and blue wash. Solid fallback for `prefers-reduced-transparency` and browsers without backdrop-filter; the consent sheet is near-opaque (`.glass-strong`) because it floats over light and dark sections | `links.spec.ts` (translucency emulated) |
| "Deep link styling missing" | `.text-link` / `.deep-link`: accent colour, 600 weight, 2px underline, underline clears on hover (the original site's behaviour). 9 deep links added to home body copy | `links.spec.ts` |

**Found while checking:** Brian's Mac has *Reduce transparency* switched on (`defaults read com.apple.universalaccess reduceTransparency` → 1), so on that machine every browser correctly shows the solid fallback. Glass was verified with the preference emulated off through Chrome DevTools.

**Performance regression found and fixed:** the new hero photo made home LCP 2.67s in 2 of 3 runs. Hypothesis: Geist Mono (used only for the process step numbers) arrived at ~2.47s and its swap delayed the LCP paint. Confirmed: with the numbers set in Geist, the page loads one font file and LCP is 1.60-1.71s on every run. Glass (backdrop-filter) added no measurable cost: TBT 0ms, CLS 0.

**CI failure email (run `c1465ab`):** all 345 Playwright tests passed; the Lighthouse step failed because the case study page was newly added to the budget and measured 3.1s (lazy lead image). Fixed in `6a2c107` (green).
