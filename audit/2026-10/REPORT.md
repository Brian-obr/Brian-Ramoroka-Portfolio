# brianramoroka.co.za: Evidence-led SEO, performance and redesign audit

> **Revision 2026-10-19:** Brian supplied `website-research.md` (40 SA job ads + freelance SERPs). It changes the positioning to two audiences (employers first) and drops the separate service pages. See `PLAN.md` → "Revision 2026-10-19". Findings and evidence below are unchanged; recommendations in §5, §14.4 and §15 that conflict with the revision are superseded.

Audit date: 2026-10-19 · Branch: `audit/2026-10` · Commit audited: `f26e6f4` (main, last deploy 2026-04-16)
Raw evidence lives in `baseline/`. Every finding cites a file in that folder or a `file:line` in the repo.

---

## 1. Executive summary: top 10 causes, ranked by ICE

The site does not rank because **it targets nothing anyone searches for**. In the 3 months of Search Console data, only 2 of 9 clicks are attributed to a query, and both are brand (`ramoroka`); the other 7 are anonymised. Every attributed query is brand or noise. No page targets a commercial query, and Google treats the head term you assumed ("web developer Cape Town") as a job-seeker search. The local pack, the main lever for "… Cape Town" services, needs a Google Business Profile, and you don't have one. Performance and the broken CTA hurt conversion once people arrive, but they are not why nobody arrives.

| # | ID | Cause | Evidence | I | C | E | ICE |
|---|---|---|---|---|---|---|---|
| 1 | F-03 | Wrong head term: "web developer Cape Town" is a jobs query | Same SERP file: Indeed is first, and job results dominate the page (LinkedIn Jobs, Google Jobs box, CareerJunction, Pnet). "People also search" lists salary and junior-role queries | 9 | 9 | 9 | 729 |
| 2 | F-06 | "Download CV", the only CTA in the nav, goes nowhere | `src/components/layout/Navbar.tsx:53`, `:123` → `href="#"`. Live HTML confirms it on all 6 pages | 6 | 10 | 10 | 600 |
| 3 | F-02 | No Google Business Profile, while the local pack appears on 4 of 4 target searches | `baseline/serp/serp-2026-10-19.md`: local packs for every query. A solo freelancer (Menelisi Mvinjelwa, 11 reviews) holds 2 of them | 10 | 8 | 7 | 560 |
| 4 | F-05 | Mobile LCP 6.6s (lab), gated on hydration | `baseline/lighthouse/SUMMARY.txt`: FCP 0.92s, LCP 6.61s, TTI 6.63s. The LCP element is the hero `<p>`, server-rendered at `opacity:0` (`src/components/sections/Hero.tsx:17-19`, `src/components/layout/PageTransition.tsx:15`) | 7 | 10 | 8 | 560 |
| 5 | F-01 | No page targets a commercial query. The site is built like a CV (About / Skills / Experience) | `baseline/gsc/Queries.csv`: the top query is `ramoroka` (35 imp, 2 clicks); all 5 listed queries are brand or noise; 7 of 9 clicks anonymised. 326 impressions and 9 clicks in 3 months | 10 | 9 | 6 | 540 |
| 6 | F-08 | Hero image is a 3992×6000px, 535KB WebP, `loading="lazy"`, plain `<img>` | `src/components/BackgroundImage.tsx:46-52`; Lighthouse `uses-responsive-images` estimates 499KB of savings; on desktop that image is the LCP element | 6 | 10 | 9 | 540 |
| 7 | F-04 | `/services`, the only commercial page, gets no search visibility | Not returned by `site:` (5 of 6 sitemap URLs shown) and absent from `gsc/Pages.csv` (0 impressions). Index state unconfirmed (H-01) | 8 | 8 | 7 | 448 |
| 8 | F-09 | No measurable conversion path: no tracked events, no thank-you page, GA4 fires before consent | `src/app/layout.tsx:82-84` loads `GoogleAnalytics` in production with no consent check; `grep generate_lead` finds 0 hits; `/thank-you` returns 404 | 7 | 10 | 6 | 420 |
| 9 | F-10 | OG and Twitter image is a 3992×6000 portrait declared as 1200×630 | `src/app/layout.tsx:41-46`, `src/app/page.tsx:24`; `sips` measures 3992×6000 | 4 | 10 | 10 | 400 |
| 10 | F-07 | No proof: portfolio returns 404, 4 placeholder projects, no testimonials or case studies | `status.txt`: `/portfolio 404`; `content/projects/project-*.mdx`; `src/app/robots.ts:8` Disallow `/portfolio`. The top-ranking freelancer evan.co.za has a 48-review GBP (`serp/serp-2026-10-19.md`) and FAQPage schema (`competitors/SUMMARY.txt`) | 8 | 8 | 5 | 320 |

ICE = Impact × Confidence × Ease (each 1-10). Each score is justified in its finding below.

**What this means in practice:** fixing F-05, F-06, F-08 and F-10 makes the site better but won't bring visitors. Visitors come from F-01, F-02, F-03 and F-07 together: a GBP with reviews, service and location pages built around the queries that are actually commercial, and real proof.

**External checks for strategic findings:** F-01/F-03: GSC impressions > 0 on every PRIMARY query in `keyword-intent-map.csv` by L+8 weeks. F-02: GBP live and verified, pack presence on the grid tracker. F-07: `/work` and `/work/the-breezy-exchange` return 200 and show "URL is on Google" in URL Inspection. F-09: GA4 DebugView shows one `generate_lead` per submission.

---

## 2. Assumptions, missing inputs and the confidence they cost

| Input | Status | What I used instead | Confidence cost |
|---|---|---|---|
| Search Console | **Partial**: a 3-month Performance export (2026-07-17 → 10-16). No Page-indexing report, no crawl stats, no 16-month history | `site:` query, live status codes | Medium. I can't see *why* `/services` isn't indexed (Crawled vs Discovered vs Duplicate) |
| GA4 | Not provided (property `G-DJ0D77C38N` exists in the live HTML) | None; the conversion baseline starts at relaunch | High for conversion. The baseline = 0 tracked conversions |
| GBP | Not ticked → assumed **none**. A brand search showed no knowledge panel | Public SERP check | Low |
| Vercel logs | Not provided | `x-vercel-id: cpt1::` shows the Cape Town edge serves the site | Medium for crawl frequency |
| DataForSEO | Not provided | Live Google.co.za SERPs (gl=za, pws=0), autocomplete "People also search for", competitor HTML | **High for volumes. Every volume in `keyword-intent-map.csv` is marked `not verified`** |
| CrUX field data | PSI API daily quota exhausted (keyless) | Local Lighthouse 12.8.2, 3 runs per form factor, median | Medium. With 9 search clicks in 90 days the origin is very likely below the CrUX threshold (H-07); lab stands in, labelled as lab |
| WebPageTest (Cape Town, Android, 4G) | Needs an API key/login | Lighthouse with simulated Moto G Power / Slow 4G | Medium |
| Local grid rank | Needs Local Falcon/BrightLocal | 4 SERP snapshots from one location | High; there's no GBP to grid anyway |
| CV PDF | **Not in `Attachments/`** (only 4 JPGs and the GSC zip) | Planned: the CV button renders only when `public/cv/brian-ramoroka-cv.pdf` exists | None, but **you need to supply it** |
| Real photos | 4 graduation photos (`IMG_4348/52/54/56.jpg`, 2375-2777 × 3562-4166px) + the existing cut-out portrait | Used for About / hire-me | None |
| Case studies | Employers (Rhiza Babuyile, Grizzly New Marketing) and The Breezy Exchange demo approved for naming | The Breezy Exchange as case study 1; other slots marked `PLACEHOLDER` | Medium; one demo is thin proof |
| Voice of customer | None supplied | 10-question interview in §18; copy written from verifiable facts only | High for copy |

**Strategy assumptions (from your answers):** services in order: Local SEO for SA SMEs → WordPress builds → Next.js custom builds → white-label for EU agencies. The site is split into freelance paths plus a separate `/hire-me` recruiter page.

---

## 3. Skills used

| Skill | Drove |
|---|---|
| `using-superpowers`, `using-git-worktrees` | Process; the `audit/2026-10` worktree at `.worktrees/audit` (kept out of git via `.git/info/exclude`, so nothing is committed to main) |
| `systematic-debugging` approach | The blank-screenshot investigation (§11), separating the capture artifact from real behaviour |
| `design-taste-frontend` | §13 teardown (AI-tell scoring), §14 design read, dials and pre-flight rules |
| `seo-*` (applied manually from their intent: technical, local, schema, geo, sitemap) | §6-§10. Their DataForSEO and Google API back-ends weren't usable without credentials |
| `webapp-testing` (Playwright venv) | Screenshots, axe-core 4.10.3 scans, the scroll-reveal test |

Installed but not run, with the reason: `seo-dataforseo` and `seo-google` (no credentials), `seo-drift` (I captured an equivalent JSON snapshot by hand at `baseline/seo-drift-snapshot.json`, since the skill's storage needs its own setup). Missing: `frontend-design` and `review-animations`; their intent is covered by `design-taste-frontend` and the motion plan in §14.6.

---

## 4. Baseline scorecard (2026-10-19)

| Area | Metric | Value | Source |
|---|---|---|---|
| Search | Clicks / impressions (3 months) | **9 / 326**, CTR 2.8% | `gsc/Chart.csv` |
| Search | Clicks attributed to a query | 2 of 9, both brand (7 anonymised); non-brand clicks unknown, see H-08 | `gsc/Queries.csv` |
| Search | Avg position, mobile / desktop | 5.3 / 29.4 | `gsc/Devices.csv` |
| Search | Impressions from SA | 277 (85%) | `gsc/Countries.csv` |
| Index | Sitemap URLs shown by `site:` (indicative only) | 5 / 6 (`/services` missing) | `serp/serp-2026-10-19.md` |
| Lab mobile | Perf score / LCP / TBT / CLS | 74-77 / **6.61s** / 200ms / 0 | `lighthouse/SUMMARY.txt` |
| Lab desktop | Perf / LCP / TBT / CLS | 99 / 0.94s / 11ms / 0 | same |
| Lab | Page weight (home) | 1,043KB mobile, of which hero image 535KB and gtag 180KB | same |
| Field | CrUX p75 | **No data** (traffic below the CrUX threshold; PSI quota blocked the confirmation) | Hypothesis H-07 |
| A11y | axe-core violations (6 pages × 2 widths) | **0** | `baseline/axe-before.json` |
| A11y | Targets under 44×44px at 375px | 8-20 per page | `baseline/axe-before.json` |
| Lighthouse | A11y / BP / SEO | 100 / 100 / 100 | `lighthouse/` |
| Security | Headers | HSTS preload, CSP (with `unsafe-eval`), XFO, nosniff, Referrer, Permissions present | `headers-home.txt` |
| Conversion | Tracked conversions | **0** (no events defined) | repo grep |
| Local | GBP / reviews | None / 0 | SERP check |

---

## 5. Demand and intent (4.1)

Evidence: `baseline/serp/serp-2026-10-19.md` (Google.co.za, `gl=za&hl=en&pws=0`, searched from the Cape Town area). Volumes are **not verified** (no DataForSEO). Demand signals come from SERP features, autocomplete and ad presence.

| Query | Dominant intent | What ranks | Local pack | Winnable for a solo freelancer? |
|---|---|---|---|---|
| web developer cape town | **Jobs** | Indeed first; LinkedIn Jobs, Google Jobs box, CareerJunction and Pnet among the agencies | Yes (designers with 27-94 reviews) | **Drop as a primary target.** Mention it on `/hire-me` only |
| freelance web developer cape town | Hire a freelancer | evan.co.za #1, Upwork, francoadams, steventhomas, c-e-marx | Yes: Menelisi (11 reviews), iSimon (27), Evan Ross (48) | **Yes. Primary target** (home + `/web-design-cape-town`) |
| wordpress developer cape town | Hire (mixed with jobs) | New Perspective, Indeed, Savit52, Codeable, peterrobinson.co.za | Yes: Menelisi (11), LightSpeed (2), Woww (105) | **Yes. Primary** (`/wordpress-developer-cape-town`) |
| seo cape town | Hire an agency | Agencies only (SEO Studio, Clutch, Weblab listicle) | Yes (43-60 reviews) | **Hard.** Target the long tail: "seo for small business cape town", "local seo cape town", "technical seo audit south africa" |
| web design cape town / website designer cape town | Hire (assumed; SERP **not checked**) | not checked; listed in People-also-search on "freelance web developer cape town" | not checked | Secondary, through the same page as "freelance web developer" |

**Main finding:** two pack holders are one-person businesses with fewer than 50 reviews and 3+ years of trading (Menelisi Mvinjelwa 11, Evan Ross 48). Organic results include 486-word sites (peterrobinson.co.za). The bar is a GBP with 15-25 genuine reviews plus 3-4 focused pages, not domain authority.

Remote and EU markets (NL/BE/DE/UK): no SERP was checked (no geolocated access). White-label agency buyers don't search Google for this; they find people through LinkedIn and referrals. **Recommendation:** one `/white-label-for-agencies` page for credibility when a contact is shared. Don't spend SEO effort here until SA is working.

Topical map → `keyword-intent-map.csv`. Clusters:
1. **Local web design** (money): `/web-design-cape-town` ← home, blog posts on cost and how to choose
2. **WordPress** (money): `/wordpress-developer-cape-town` ← Breezy Exchange case study, maintenance post
3. **Local SEO for SMEs** (money): `/seo-cape-town` (title targets "SEO for small businesses in Cape Town") ← GBP guide, audit checklist
4. **Next.js / performance** (differentiator): `/nextjs-developer` ← CWV case study (this site itself)
5. **White label** (B2B): `/white-label-for-agencies`
6. **Recruiters**: `/hire-me` (CV, experience, skills merged)

---

## 6. Authority and local (4.2)

- **Backlinks:** not measured (no DataForSEO/Ahrefs). Known referring sources: LinkedIn and GitHub profiles. Treated as **~0 referring domains (not verified)**.
- **GBP:** none (F-02). Competitor pack holders: Menelisi Mvinjelwa 11 reviews, iSimon 27, Evan Ross 48, Woww 105, Click Africa 43, Ruby Digital 60.
- **NAP:** phone `+27 81 379 8635` (display) / `+27813798635` (schema) is consistent across all pages. There is no street address. As a home-based freelancer, use a **service-area business** GBP (address hidden) covering the City of Cape Town plus the Western Cape.

**Plan (owner: you, timeline in PLAN.md phase 4):**
1. Create the GBP. Primary category "Website designer", secondary "Internet marketing service" and "Software company". List services, set the service area, add 10 photos (the real ones), and a description written from §12.
2. Reviews: ask every past client you can name for one. Target 15 in 12 weeks, then 2 a month after that. Use the GBP short review link in the thank-you email and on `/thank-you`.
3. Citations (10): Bing Places, Apple Business Connect, LinkedIn company page, Clutch, GoodFirms, Codeable (apply), Brabys, Cylex SA, Hotfrog ZA, SAYellow. Use the same name, phone and URL everywhere.
4. Links: WordCamp Cape Town attendee/speaker page, the CPUT alumni feature, a Grizzly New Marketing partner page (ask), guest posts on SA SME blogs (2), GitHub README → site.

---

## 7. Crawl, render and index (4.3)

| ID | Finding | Evidence | Fix | Effort | ICE | External check |
|---|---|---|---|---|---|---|
| F-04 | `/services` not seen in search | `site:` 5/6; GSC 0 impressions for `/services` | Confirmed symptom; index state and cause unconfirmed (H-01). Run URL Inspection → Request indexing. Rebuild as `/services` hub + service pages with unique 800+ word content and strong internal links | M | 8·8·7 | GSC URL Inspection: "URL is on Google" |
| F-11 | Apex → www uses **307** (temporary) | `baseline/special-files.txt`, `baseline/url-inventory.csv:10` | Vercel → Domains → apex → "Redirect to www" with **308** | S | 3·10·10 | `curl -I https://brianramoroka.co.za` → 308 |
| F-12 | Main content renders without JS but at `opacity:0` | `seo-drift-snapshot.json` `opacity0_nodes`: home 46, skills 50, about 30 | Server-render visible; motion on hover/state only (F-05 fix) | M | 5·7·8 | `curl` HTML has no `opacity:0` on text nodes |
| F-13 | Sitemap `lastModified = new Date()` at build | `src/app/sitemap.ts:5`; live lastmod 2026-04-16 for every URL | Use per-page content dates | S | 3·9·10 | Sitemap shows distinct real dates |
| F-14 | No portfolio: `/portfolio` calls `notFound()` and robots disallows it | `src/app/portfolio/page.tsx:34`, `src/app/portfolio/[slug]/page.tsx:21` (`notFound()`); `robots.ts:8`; `status.txt` 404 | Build `/work` with real case studies; 308 `/portfolio` → `/work` | M | 6·8·6 | `curl` `/portfolio` → 308 → `/work` 200 |
| F-15 | Homepage canonical has no trailing slash, but metadata sets one | `seo-drift-snapshot.json` canonical `https://www.brianramoroka.co.za` vs `src/app/page.tsx:32` | One `metadataBase` + `alternates.canonical: "/"` | S | 2·9·10 | View source |
| F-16 | 30MB of unused PNGs deployed publicly | `public/images/Brian Ramoroka/*.png` (8-12MB each); 0 references in `src/` | Delete; keep originals out of `public/` | S | 2·10·10 | `curl` → 404 |

Crawl frequency: unknown without logs or GSC crawl stats (H-03).

---

## 8. Core Web Vitals: causes (4.4)

**F-05 Mobile LCP 6.61s (lab).** Confirmed root cause:
- LCP element: `section.min-h-screen p.text-text-body` (the hero paragraph), from `lighthouse/home-mobile-2.json`.
- Breakdown: TTFB about 6ms (Vercel cpt1 cache HIT) → FCP 920ms → LCP 6,610ms. **Render delay ≈ 5.7s.** LCP lands within 20ms of TTI (6,628ms), the signature of an element revealed by JS after hydration.
- Mechanism: `Hero.tsx:17-19` gives every hero element `initial={{opacity:0,y:20}}`, wrapped in `PageTransition.tsx:14` (another opacity:0). Chrome ignores opacity:0 elements as LCP candidates, so LCP waits until framer-motion hydrates and animates. Hydration waits on about 350KB of JS (gtag 180KB, framer-motion chunk ~72KB, plus React).
- Fix: Hero becomes a Server Component with no entry animation; remove `PageTransition`; make the first paint the final paint. Expected lab LCP ≈ FCP (< 1.5s).
- Proof: Lighthouse CI mobile LCP ≤ 2.0s; the `largest-contentful-paint-element` is unchanged but LCP ≈ FCP.

**F-08 Hero image** (desktop LCP element): `BackgroundImage.tsx:46` → plain `<img loading="lazy">`, intrinsic 3992×6000, 535KB, displayed at 736×940. Fix: `next/image` with `priority`, `sizes="(min-width:768px) 55vw, 100vw"`, a source resized to 1600px, AVIF ≤ 120KB. Proof: the network panel shows an AVIF ≤ 120KB with `fetchpriority=high`.

**F-17 Scroll listener causes a re-render every frame.** `BackgroundImage.tsx:19-29`: `setBlur` runs on every scroll event, so the whole background subtree re-renders and a CSS `filter: blur()` repaints a full-viewport image each frame. That's an INP and jank risk on low-end Android. Fix: remove it, or use a CSS scroll-driven animation. Proof: a Performance trace with no long tasks during scroll.

**F-18 Third-party gtag (180KB) loads before consent** and competes with hydration. Fix: Consent Mode v2 default-denied + GTM loaded `afterInteractive`. (Advanced mode is cheaper; see `tracking-plan.md`.)

**F-19 JS:** 21 of 42 `.tsx` files are `"use client"`, framer-motion is on every page, and Lighthouse estimates 125KB of unused JS. Budget: ≤ 170KB script transfer on first load per route (see the budgets below).

**Fonts:** 4 woff2 preloads (DM Sans, Space Mono ×2, Instrument Serif) = ~75KB. Redesign target: 2 families, ≤ 3 files.

**Budgets (enforced by `lighthouserc.json`, see PLAN):** LCP ≤ 2000ms mobile lab, TBT ≤ 200ms (INP proxy), CLS ≤ 0.05, script ≤ 170KB transfer, image ≤ 200KB on home, hero ≤ 120KB, total ≤ 600KB on home.

---

## 9. On-page, schema and AI visibility (4.5)

| Page | Title (live) | H1 | Words (raw) | Intent match |
|---|---|---|---|---|
| / | Brian Ramoroka \| SEO Web Developer & Software Engineer \| Cape Town | "Brian Ramoroka" | 547 | Brand only. The H1 has no service term |
| /about | About Brian Ramoroka \| … | "About Me…" | 520 | OK (brand) |
| /services | Services \| Brian Ramoroka \| Web Development, SEO & Software Engineering | "Services…" | 669 | One page covers 6 services, no location, not indexed |
| /experience | Work Experience \| … | "Work Experience" | 323 | Recruiter |
| /skills | Skills & Tools \| … | "Skills & Tools" | 197 | Thin, recruiter |
| /contact | Contact Brian Ramoroka \| … | "Let us Work Together" | 144 | Thin |

Findings:
- **F-20 Schema:** Person + WebSite on home; BreadcrumbList on inner pages; a `Service` on /services. Missing: `ProfessionalService` (areaServed Cape Town), `WebPage`, `@id` linking across pages, `Organization`/`Person` `image`, `CreativeWork` for case studies. Fix: one `@graph` per `schema.json`. Proof: Rich Results Test and validator.schema.org with 0 errors.
- **F-21 Claims with no evidence on the site** (check: a grep for `150+` and `90%` in the rendered HTML returns 0 unless you confirm them): "150+ client websites", "90%+ good KPI ratings", "8+ international markets". You were at Rhiza Babuyile for about 7 months; these are team or company figures. Keep them only if phrased as "contributed to 150+ client sites at Rhiza Babuyile" (you must confirm, see §18).
- **F-22 Entity clarity** (check: the same one-sentence description appears in the home meta description, `ProfessionalService.description`, the GBP and LinkedIn): the hero says "SEO web developer and software engineer… also open to joining development teams". That's three identities in one line. AI and search engines can't tell what you sell. Fix: one sentence everywhere: *"Brian Ramoroka is a Cape Town web developer who builds and optimises websites for small businesses."*
- **F-23 No `llms.txt`**, no `security.txt`, no `manifest.webmanifest` (all 404, `baseline/special-files.txt`). Check after the fix: each returns 200. AI crawlers: allow GPTBot, ClaudeBot, PerplexityBot and Google-Extended. You want to be cited, and nothing on the site is proprietary.

---

## 10. Missing-elements table (4.6)

| Item | Status | Evidence | Implementation | External check |
|---|---|---|---|---|
| Consent Mode v2 + banner | **Missing** | `layout.tsx:82-84` GA loads with no consent gate | Default-denied `gtag('consent','default',…)` inline before GTM; own banner (no paid CMP needed), equal Accept/Reject buttons, re-open link in the footer | Tag Assistant: only `gcs=G100` (denied) hits and no `_ga` cookie before Accept |
| GTM via `@next/third-parties` | **Partial** | Uses `GoogleAnalytics`, not GTM | `<GoogleTagManager gtmId>` gated by env | GTM Preview |
| GA4 key events | **Missing** | 0 events | `generate_lead`, `cv_download`, `click_email`, `click_phone`, `click_whatsapp`, `click_booking`, `outbound_click` via `dataLayer.push` | GA4 DebugView |
| Vercel Speed Insights | **Missing** | not in package.json | `@vercel/speed-insights` | Vercel dashboard RUM |
| GSC verification | **Present** (HTML meta) | `layout.tsx:58` | Recommend adding a DNS domain property (you do this) | GSC |
| Bing + IndexNow | **Missing** | none | Bing WMT import from GSC; IndexNow key file | Bing WMT |
| Contact form | **Partial** | `/api/contact` → Formspree; `FORMSPREE_URL` set? **unverified** (H-04) | Server Action + Resend, honeypot + time-trap; Turnstile optional | Submit a test → inbox |
| `/thank-you` | **Missing** (404) | `status.txt` | noindex, not in sitemap, fires `generate_lead` once per submission id | Playwright test + DebugView |
| Booking link | **Missing** | none | Cal.com link (you create the account) | Click → booking page |
| CV download | **Broken** | `Navbar.tsx:53` | `/hire-me` + `/cv/brian-ramoroka-cv.pdf` (you supply it); event `cv_download` | `curl -I` 200 `application/pdf` |
| WhatsApp | **Missing** | none | `https://wa.me/27813798635` | Click |
| Privacy policy (POPIA + GDPR) | **Missing** | 404 | `/privacy`, Information Officer = you | Page live |
| Cookie policy | **Missing** | none | `/cookies` listing GA4, GTM, Clarity | Page live |
| Engagement terms | **Missing** | none | `/terms` (placeholder draft, you review) | Page live |
| Testimonials / logos | **Missing** | none | Slots marked PLACEHOLDER until confirmed | — |
| robots / sitemap | **Present** | `robots.ts`, `sitemap.ts` | Update routes, real dates | — |
| `not-found` true 404 | **Present** | `baseline/special-files.txt`: `/nope 404` | Keep | `curl` 404 |
| `error.tsx` | **Missing** | none | Add | — |
| OG 1200×630 per page | **Broken** | F-10 | `opengraph-image.tsx` with `ImageResponse` | opengraph.xyz |
| favicon / apple-icon / manifest / theme-color | **Partial** (favicon only) | `src/app/favicon.ico` | `icon.svg`, `apple-icon.png`, `manifest.ts`, `viewport.themeColor` | DevTools → Application → Manifest panel |
| `lang="en-ZA"` | **Present** | `layout.tsx:73` | Keep | — |
| hreflang | **Not needed** | no translated pages planned | Skip until NL/DE pages exist | — |
| Breadcrumbs | **Partial** (schema only) | inner pages | Visible breadcrumb on service pages | RRT |
| Security headers | **Partial** | `headers-home.txt`; CSP has `'unsafe-eval'` and `'unsafe-inline'` scripts | Nonce-free tightening: drop `unsafe-eval`; add GTM domains, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'` | securityheaders.com A; Observatory B+ or better (A needs nonces; see H-05) |
| security.txt | **Missing** | 404 | `public/.well-known/security.txt` | `curl` |
| Skip link | **Missing** | none | `<a href="#main">` | Keyboard test |
| Service pages / location / FAQ / process / case studies / blog | **Missing** | inventory | See PLAN phases 3 and 6 | GSC impressions per page |

---

## 11. Accessibility (4.7)

- axe-core 4.10.3 (WCAG 2.0/2.1/2.2 A+AA + best practice): **0 violations** on 6 pages at 375 and 1280px (`baseline/axe-before.json`).
- **F-24 Tap targets under 44×44px** (the brief's standard; WCAG 2.2 AA minimum is 24px): mobile nav "CV" 63×32, "Open menu" 44×32, footer LinkedIn/GitHub 24×24, contact-list links ~18-20px tall. Fix: `min-h-[44px]` on all interactive controls.
- **Contrast:** body text is `#FFFFFF` on `#0a0a0c` = 19.78:1. The accent `#FFB800` on `#0a0a0c` = 11.41:1. Black on the accent button = 12.11:1. All pass.
- **Motion:** `useReducedMotion` respected in Hero and PageTransition. The scroll blur (`BackgroundImage.tsx:19-29`) **ignores reduced motion** (F-25). Check: under `prefers-reduced-motion: reduce`, the computed `filter` of the hero wrapper stays `none` after scrolling (Playwright).
- **Investigation note:** the first full-page screenshots showed 5 home sections blank. A systematic check (`baseline/reveal.py`, output `baseline/reveal-test.txt`) showed 39 of 46 nodes hidden at load, all revealed by a real scroll. The blank capture was an artifact of my fast scrolling, not a user-facing bug. It still shows the content depends on IntersectionObserver to become visible (F-12).
- VoiceOver manual pass: **not done** in this audit (needs a person on macOS with VO on). Listed in the usability test plan.

---

## 12. Voice of customer and copy (4.8)

No enquiries or testimonials were supplied, so there's no voice-of-customer source yet. Copy below uses only verifiable facts. Each line notes where it came from.

| Location | Before | After | Source |
|---|---|---|---|
| Hero H1 | Brian Ramoroka | Websites for Cape Town businesses that need to be found on Google | GBP/SERP intent (§5); service order from your answers |
| Hero sub | SEO web developer and software engineer based in Cape Town. I have built and maintained over 150 client websites across 8+ international markets. I am also open to joining development teams… | I'm Brian Ramoroka. I build WordPress and Next.js sites and do the SEO work that gets them into local search. | Your service list; drops the job-seeking clause (moved to /hire-me) |
| Primary CTA | Download CV (`href="#"`) | Get a quote | Conversion goal |
| Secondary CTA | — | See the work | Proof (F-07) |
| Proof line | 150+ Client Websites · Full-Stack · 8+ International Markets | SEO web developer at Rhiza Babuyile since March 2025, working on client sites for Grizzly New Marketing (NL) | Experience data, named with your permission; the 150+ claim needs your confirmation (F-21) |
| Services intro | From code to clicks. | What I can do for your business | Removes a slogan that says nothing |
| CTA section | Let us build something that actually works. | Tell me about your website. I reply within one working day. | Sets a reply-time expectation (you confirm the SLA) |
| Footer | © 2026 Brian Ramoroka. All rights reserved. | Brian Ramoroka · Web developer in Cape Town · +27 81 379 8635 · Privacy · Cookies | NAP consistency |

AI-slop phrasing in the current copy: "Let us build something that actually works", "I build websites that pull their weight", "From code to clicks", "Where I have been putting in the work", "The short version.", plus **61 em-dashes** across 23 source files (`grep -c "—"`).

---

## 13. Design teardown and competitor table (4.9)

**Current tokens** (`src/app/globals.css:3-23`, `src/app/layout.tsx:7-26`):
- Palette: bg `#0a0a0c`, card `rgba(25,25,25,.75)`, text `#FFFFFF` (primary, body, secondary and muted all identical), accent `#FFB800`, hover `#E6A600`, green `#4ADE80`, error `#EF4444`. Dark mode only.
- Type: DM Sans (variable), Space Mono 400/700, Instrument Serif 400 italic for display. Hero H1 40px → 72px. Section H2 italic serif.
- Radius: full-pill buttons, 12px cards. Container 1200px, padding 20/40/80px.
- Images: 3 WebP portraits at 3992×6000 (535-623KB), 3 unused PNGs (8-12MB), 8 placeholder SVGs, 13 tool SVGs.
- Motion: framer-motion 12 on 21 components: fade-up 20px / 300-500ms on load and on scroll, `whileInView` everywhere, plus a JS scroll blur.

**AI-slop markers (scored present/absent):** Instrument Serif italic display ✔ · numbered eyebrows ("01 — ABOUT" … "07 — GET IN TOUCH") ✔ · glassmorphism `.glass` ✔ · emoji flags ✔ · identical 3-card grids ✔ (services, about facts) · blanket scroll-reveal ✔ · amber glow orb ✔ · "Open to work" pulsing dot badge ✔ · em-dashes ✔ · stock imagery ✘ (the photo is real, good) · purple gradient ✘. **9 of 11 present.**

**Nielsen heuristics (1 = poor, 5 = good):** visibility of status 3 (no form feedback beyond inline) · match with the real world 2 (CV jargon, not client language) · user control 4 · consistency 4 · error prevention 3 · recognition 4 · flexibility 3 · aesthetic and minimalist 2 (8 home sections, 2 with real substance) · error recovery 3 · help 1 (no FAQ, no process, no prices).

**Competitors** (`baseline/competitors/SUMMARY.txt`):

| Site | Title focus | H1 | Words | Schema | Proof | Stack |
|---|---|---|---|---|---|---|
| evan.co.za (#1 freelance) | Web Design Cape Town \| Freelance Web Designer & SEO | Web Designer & SEO Specialist in Cape Town for SMEs | 1,471 | Person, Organization, FAQPage, Article | GBP 48 reviews, portfolio | WordPress |
| simonbarnett.co.za (iSimon) | Web Designer Cape Town | Web designer Cape Town, South Africa | 2,165 | Person, WebPage | GBP 27 reviews, "25+ years in business" (SERP) | WordPress |
| savit52.co.za | Website Design Cape Town \| WordPress | Website Design Cape Town… | 1,622 | ProfessionalService, Service, OfferCatalog, FAQ, BreadcrumbList | "Codeable-certified" (own SERP snippet, not verified) | WordPress |
| francoadams.co.za | Freelance Web Developer and Designer Based in Cape Town | (none) | 2,362 | none | portfolio | custom |
| steventhomas.co.za | Affordable Web Design \| Freelance Web Developer in Cape Town | (none) | 550 | none | — | custom |
| peterrobinson.co.za | Full Stack Developer | I build modern websites & web applications. | 486 | none | — | custom |
| **brianramoroka.co.za** | SEO Web Developer & Software Engineer | Brian Ramoroka | 547 | Person, WebSite | none | Next.js |

**They have, I don't** (6 sites measured; c-e-marx blocked with 403): service + city in the title (5/6) and city in the H1 (3/6) · a GBP with reviews (2/6 seen in a pack: evan.co.za, iSimon) · a portfolio · an FAQ (2/6) · prices or "from R…" (ads) · a WhatsApp number (c-e-marx) · ProfessionalService schema (savit52).
**I have, they don't:** sub-second desktop and Cape Town edge TTFB · Next.js skills · international agency experience · a real photo.

---

## 14. Redesign proposal

**Design read:** a developer/service portfolio for Cape Town SME owners and EU agency contacts, trust-first and practical, built on Tailwind 4 + native CSS. Dials: **VARIANCE 6 · MOTION 4 · DENSITY 4** (the Developer preset; trust-first audience).

### 14.1 Directions

| Direction | Idea | Rationale (evidence) | Mood |
|---|---|---|---|
| **A. "Workbench" (recommended)** | Light off-white default with a full dark mode. Geist + Geist Mono. Amber kept as the single accent (brand continuity) but deepened to `#B45309` for AA on light. Real photo, real screenshots of work, plain section headers, no eyebrows | SME owners are trust-first (§5); competitors that rank are plain and clear; keeping amber keeps recognition | Precise, warm, workmanlike |
| B. "Dark Signal" | Evolve the current dark theme; remove the slop tells; Geist; amber | Lowest change risk | Technical, night-mode |
| C. "Table Mountain" | Cobalt `#1D4ED8` + cream, local photography of Cape Town | Strong local signal | Local, editorial |

A is recommended: it fixes the trust gap and still feels like the same person (same accent, same photo).

### 14.2 Tokens
See `design-tokens.css` (Tailwind 4 `@theme` + light/dark, every contrast ratio annotated). Fonts: **Geist** (sans, 400/500/600) and **Geist Mono** (400). Both OFL, via `next/font/google`: 2 families, 4 weights.

Type scale (px), mobile → desktop: display 36→56 · h2 28→36 · h3 20→24 · body 16→18 · small 14 · mono 13. Line heights 1.1 / 1.2 / 1.6. Spacing (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Container 1200px; gutter 16px (<640), 24px (≥640), 32px (≥1024). Breakpoints 640/768/1024/1280. Radius: buttons 8px, cards 12px, inputs 8px. Shadows: `0 1px 2px rgb(28 25 23 / .06)`, `0 8px 24px rgb(28 25 23 / .08)`.

### 14.3 Component specs (states: default / hover / active / focus-visible / disabled)
- **Button primary:** bg accent, text `--color-on-accent`, 44px min height, padding 12px × 20px, 16px/600. Hover: bg accent-strong. Active: translateY(1px). Focus: 2px outline accent, offset 2px. Disabled: 50% opacity, `cursor:not-allowed`.
- **Button secondary:** 1px border `--color-border-strong`, text ink, transparent. Hover: bg surface-2.
- **Ghost:** text only plus a hover underline. **Link:** underline offset 3px, accent colour.
- **Nav:** 64px desktop, logo left, 5 links + "Get a quote" button right, on one line at 1024px. Mobile: menu button 44×44 → full-height sheet; focus trap; Escape closes.
- **Case-study tile:** 16:10 screenshot (next/image), title, client type, one result line, "Read case study" link.
- **Form field:** label above, 44px input, 1px border, error text below in `--color-danger` with `aria-describedby`.
- **Consent banner:** fixed bottom sheet, max-width 560px, not a modal; Accept and Reject the same size and weight; "Settings" link opens category toggles; it overlays the page, so no CLS.
- **Footer:** NAP, services links, legal links, "Cookie settings" button.

### 14.4 Page layouts
```
HOME (/)
[Nav]
[Hero: split. Left: H1 (service+Cape Town), 1 sentence, [Get a quote] [See the work]. Right: photo (priority, 4:5)]
[Proof strip: "Currently: SEO web developer at Rhiza Babuyile for Grizzly New Marketing (NL)" + Breezy Exchange thumbnail]
[Services: 2-col asymmetric list. Local SEO / WordPress sites / Next.js builds / Agencies → each links to its page]
[Case study feature: The Breezy Exchange, big screenshot, 3 facts, link]
[How I work: 4 verbs (Call, Plan, Build, Grow) inline, not cards]
[FAQ: 5 real questions (price, timeline, hosting, who owns the site, SEO results)]
[CTA: short form (name, email, what you need) + WhatsApp + booking link]
[Footer]
```
New pages: `/web-design-cape-town`, `/wordpress-developer-cape-town`, `/seo-cape-town`, `/nextjs-developer`, `/white-label-for-agencies`, `/work`, `/work/the-breezy-exchange`, `/hire-me`, `/contact`, `/thank-you`, `/privacy`, `/cookies`, `/terms`. Each service page: H1 with the query → who it's for → what you get → process → case study → prices "from" (H-06; you set them) → FAQ → CTA.

### 14.5 Imagery plan
Hero portrait: crop of the existing cut-out at 1200×1500 source, AVIF ≈ 60-90KB at 600px wide. About / hire-me: `IMG_4352.jpg` graduation portrait (crop 4:5, 1200×1500, AVIF ≤ 100KB). Case studies: desktop and mobile screenshots of The Breezy Exchange at 1600×1000 (AVIF ≤ 120KB). **To shoot:** 1 working photo at a laptop with a Cape Town background (landscape 2400×1600), 1 head-and-shoulders on a plain background (for GBP and LinkedIn).

### 14.6 Motion plan
- **Remove:** PageTransition, every load-time fade-up, every `whileInView`, the scroll blur, the glow orb, the pulsing dot. (Removes framer-motion completely, about 72KB.)
- **Keep or add (CSS only):** button hover/active 150ms `cubic-bezier(.2,0,0,1)`; the mobile menu sheet slides 200ms ease-out; form success state crossfades 200ms; link underline 150ms.
- `@media (prefers-reduced-motion: reduce)` sets all transitions to 0ms. Nothing animates before first paint, so there's no effect on LCP or INP.

### 14.7 Migration safety → §15 and `redirect-map.csv`.

### 14.8 Usability test → `usability-test-plan.md`.

---

## 15. Migration plan

- Redirects (`redirect-map.csv`, applied in `next.config.ts` `redirects()` as `permanent: true` = 308): `/services` stays (becomes a hub), `/skills` → `/hire-me`, `/experience` → `/hire-me`, `/about` stays, `/portfolio` → `/work`, `/portfolio/:slug` → `/work`. Apex → www **308** (Vercel setting).
- Staging: Vercel preview deployments get `X-Robots-Tag: noindex` automatically on `*.vercel.app`; also check that `VERCEL_ENV !== "production"` sets `robots: noindex` in metadata.
- Pre-launch checklist: in PLAN.md phase 8.
- Post-launch: `POST-LAUNCH.md` (written at the end of implementation). GSC coverage weekly, 404 watch, drift diff, for 8 weeks.

---

## 16. Quick wins (≤ 1 hour each)

1. Apex redirect 307 → 308 in Vercel Domains (you, 2 min).
2. GSC URL Inspection → Request indexing for `/services` (you, 2 min).
3. Remove the 30MB of unused PNGs (F-16).
4. Fix the CV link (route to `/hire-me`; render the PDF button only if the file exists).
5. `priority` + `sizes` + a resized hero image (F-08).
6. Replace the OG image (F-10).
7. Create the GBP (you, 30 min; verification can take days).

---

## 17. Hypotheses not yet confirmed

| ID | Hypothesis | Test to confirm |
|---|---|---|
| H-01 | `/services` is not indexed (`site:` is unreliable), and if so it is "Crawled/Discovered, currently not indexed" because of low site quality signals and overlap with home | GSC URL Inspection on `/services` |
| H-03 | Googlebot crawls fewer than 5 URLs a day | GSC Crawl stats |
| H-04 | `FORMSPREE_URL` is unset in production, so every contact submission returns 500 | One genuine test submission from you, or check Vercel env vars |
| H-05 | Mozilla Observatory grade A isn't reachable with GTM unless CSP nonces are used (dynamic rendering). Static + no nonce caps the score | Run Observatory on the preview after phase 2 |
| H-06 | Showing "from" prices increases enquiry rate for SA SMEs (ads in the SERP lead with "From R6,500") | A/B or before/after in GA4 |
| H-08 | Some of the 7 anonymised clicks are non-brand queries | GSC regex filter excluding `ramoroka`; at this volume Google withholds them, so no confirmation until volume grows |
| H-07 | Origin has no CrUX data | CrUX API with a key, or PSI tomorrow when the quota resets |

---

## 18. What I need from you

1. **CV PDF** → `public/cv/brian-ramoroka-cv.pdf` (or tell me to drop the CV button entirely).
2. **Confirm or reword the claims:** "150+ client websites", "90%+ KPI", "8 markets". Are these yours or the team's?
3. **Prices** to show as "from R…" per service (or "no prices").
4. **Accounts:** create a GTM container + GA4 key events; Resend (domain DNS records); Cal.com; GBP; Bing WMT. I'll prepare exact values and steps.
5. **Vercel env vars** (once the accounts exist): `NEXT_PUBLIC_GTM_ID`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_CAL_URL`.
6. **GSC:** URL Inspection on `/services`; export the Page indexing report.
7. **Interview (10 questions, short answers are fine):** (1) Last 3 clients: what did they ask for, in their words? (2) Why did they pick you? (3) What almost stopped them? (4) Typical budget? (5) How did they find you? (6) What result did they see? (7) Which project are you proudest of, and can it be named? (8) What do you never want to do again? (9) What reply time can you promise? (10) Who are your ideal 2027 clients?
