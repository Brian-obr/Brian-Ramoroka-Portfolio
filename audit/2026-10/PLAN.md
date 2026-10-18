# Implementation plan: brianramoroka.co.za redesign (2026-10)

> For agentic workers: execute phase by phase with `executing-plans`; tasks marked ∥ touch separate files and may run in parallel. Each task: write the test first, make it pass, run `npm run verify` (lint + typecheck + build + Playwright + axe), commit referencing the finding ID.

**Goal:** turn a CV-shaped site with no attributable non-brand clicks into a local service site that can rank for freelance web design, WordPress and small-business SEO in Cape Town, and measure every lead.
**Architecture:** Next.js 16 App Router, Server Components by default, no framer-motion, Tailwind 4 tokens from `design-tokens.css`, content in typed TS modules, Server Action contact form + Resend, GTM + Consent Mode v2.
**Branches:** `redesign/2026-10` (integration, from `main`) ← `redesign/0N-<phase>` per phase, PR into integration. Final PR `redesign/2026-10 → main` waits for you.

**Global acceptance (every PR):** CI green (lint, `tsc --noEmit`, build, Playwright, axe 0 serious/critical, Lighthouse CI budgets: mobile LCP ≤ 2000ms, TBT ≤ 200ms, CLS ≤ 0.05, script ≤ 170KB, total ≤ 600KB on home).

---

## Phase 0: Tooling (`redesign/00-tooling`)

| Task | Files | Change | Test first | Acceptance |
|---|---|---|---|---|
| 0.1 | `package.json`, `playwright.config.ts`, `tests/smoke.spec.ts` | Add `@playwright/test`, `@axe-core/playwright`, scripts `test:e2e`, `typecheck`, `verify` | `smoke.spec.ts`: home returns 200 and has one `<h1>` | `npm run test:e2e` passes against `next start` |
| 0.2 | `lighthouserc.json` | `@lhci/cli` with budgets above, 3 runs, mobile preset | n/a (config) | `npx lhci autorun` runs locally |
| 0.3 | `.github/workflows/ci.yml` | lint, typecheck, build, Playwright (chromium), axe, LHCI on push/PR | n/a | Workflow green on the PR |
| 0.4 | `next.config.ts` | `@next/bundle-analyzer` behind `ANALYZE=true` | n/a | `ANALYZE=true npm run build` emits a report |
| 0.5 | `src/components/layout/Navbar.tsx` | Fix the lint error (`set-state-in-effect`) | `npm run lint` currently fails | lint 0 errors |

## Phase 1: Critical fixes (`redesign/01-critical-fixes`), ordered by ICE then dependency (1.7 is yours, any time)

| Task | Finding | Files | Change | Test first | External check |
|---|---|---|---|---|---|
| 1.1 | F-06 | `Navbar.tsx`, `src/app/hire-me/page.tsx`, `src/lib/cv.ts` | Nav CTA becomes "Get a quote" → `/contact`; CV button lives on `/hire-me` and renders only if `public/cv/brian-ramoroka-cv.pdf` exists (checked at build with `fs.existsSync`); `data-track="cv_download"` | `cv.spec.ts`: no `a[href="#"]` on any page; if the CV exists, `GET /cv/…pdf` → 200 `application/pdf` | `curl -I` |
| 1.2 | F-05 | `Hero.tsx`, `PageTransition.tsx`, `page.tsx` (all pages) | Hero becomes a Server Component; delete PageTransition; no `opacity:0` in SSR HTML | `perf.spec.ts`: raw HTML of `/` has no `style="opacity:0` | LHCI mobile LCP ≤ 2000ms |
| 1.3 | F-08 | `BackgroundImage.tsx` → removed; hero uses `next/image` | Resize the portrait to 1200×1500 source; `priority`, `sizes`; delete the scroll listener (F-17, F-25) | `images.spec.ts`: every `<img>` has width and height; the hero img has `fetchpriority="high"`; transferred hero ≤ 120KB | Network panel |
| 1.4 | F-10 | `src/app/opengraph-image.tsx`, `layout.tsx`, `page.tsx` | `ImageResponse` 1200×630; remove hard-coded wrong dims | `meta.spec.ts`: `og:image` URL returns `image/png` 1200×630 | opengraph.xyz |
| 1.5 | F-16 | `public/images/Brian Ramoroka/` | Delete 30MB of unused PNGs | build passes; grep finds 0 refs | `curl` 404 |
| 1.6 | F-15, F-13 | `layout.tsx`, `sitemap.ts` | One canonical strategy (`alternates.canonical` per page, relative); real `lastModified` | `meta.spec.ts`: canonical equals the page URL | View source |
| 1.7 | F-11 | Vercel dashboard (**you**) | Apex → www 308 | n/a | `curl -I https://brianramoroka.co.za` → 308 |

## Phase 2: Tracking, consent, legal (`redesign/02-tracking-consent`)

| Task | Files | Change | Test first | External check |
|---|---|---|---|---|
| 2.1 | `src/components/consent/*`, `layout.tsx` | Consent Mode v2 default script + banner + footer "Cookie settings"; GTM via `@next/third-parties` when `NEXT_PUBLIC_GTM_ID` is set; remove `GoogleAnalytics` | `consent.spec.ts`: no `_ga` cookie and no `gcs=G111` collect before Accept; Accept and Reject have equal size; banner causes 0 CLS | GTM Preview / Tag Assistant |
| 2.2 | `src/lib/track.ts`, `src/components/TrackClicks.tsx` | Delegated click listener pushes the dataLayer events in `tracking-plan.md` | `tracking.spec.ts`: clicking `tel:` pushes `click_phone` with `link_location` | GA4 DebugView |
| 2.3 | `src/app/contact/actions.ts`, `ContactForm.tsx`, `api/contact` removed | Server Action, zod validation, honeypot + min-time trap, Resend send (falls back to logging + error state if `RESEND_API_KEY` is missing), redirect to `/thank-you?s=<id>` | `contact.spec.ts`: invalid email shows inline error with `aria-describedby`; honeypot submission redirects without send; valid submission (mocked send) → `/thank-you` | Real submission from you on preview |
| 2.4 | `src/app/thank-you/page.tsx` | noindex, excluded from sitemap, fires `generate_lead` once per `s` | `thank-you.spec.ts`: one `generate_lead` push; reload → still one | DebugView |
| 2.5 ∥ | `src/app/privacy`, `src/app/cookies`, `src/app/terms` | POPIA + GDPR privacy (Information Officer: Brian Ramoroka), cookie list, engagement terms draft marked "draft, review before relying" | `legal.spec.ts`: 200, linked from the footer | — |
| 2.6 | `@vercel/speed-insights` in `layout.tsx` | RUM | n/a | Vercel dashboard |

## Phase 3: SEO foundations and schema (`redesign/03-seo-foundations`)

| Task | Files | Change | Test first | External check |
|---|---|---|---|---|
| 3.1 | `src/lib/schema.ts` | `@graph` builder per `schema.json` (Person, ProfessionalService, WebSite, WebPage, Service, BreadcrumbList, CreativeWork) | `schema.spec.ts`: every page has valid JSON-LD containing a `WebPage` whose `url` equals the canonical | Rich Results Test 0 errors |
| 3.2 | `robots.ts` | Allow all incl. GPTBot/ClaudeBot/PerplexityBot; sitemap URL; `/thank-you` stays crawlable so Google sees its `noindex` | `meta.spec.ts` | `curl` |
| 3.3 ∥ | `public/llms.txt`, `public/.well-known/security.txt`, `src/app/manifest.ts`, `src/app/icon.svg`, `src/app/apple-icon.png`, `viewport.themeColor` | Essentials | `essentials.spec.ts`: each returns 200 | `curl` |
| 3.4 | `next.config.ts` | `redirects()` from `redirect-map.csv`; CSP tightened (drop `unsafe-eval`, add GTM/Clarity hosts, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'`) | `redirects.spec.ts`: every row returns 308 to the target | securityheaders.com |
| 3.5 | `src/app/not-found.tsx`, `src/app/error.tsx` | Helpful 404 with links; error boundary | `404.spec.ts`: status 404 | `curl` |
| 3.6 | Skip link in `layout.tsx` | `<a href="#main">` | `a11y.spec.ts`: first Tab focuses the skip link | Keyboard |

## Phase 4: Local and authority (outside the codebase; owner: **you**)

| Week of | Action | Done when |
|---|---|---|
| 2026-10-20 | Create GBP (service-area business, "Website designer"), verify | GBP live, URL sent to me for `sameAs` |
| 2026-10-20 | GSC: URL Inspection `/services` → Request indexing; add DNS domain property | Screenshot of the result |
| 2026-10-27 | Bing Webmaster Tools (import from GSC); Apple Business Connect | Sites verified |
| 2026-10-27 → 11-24 | 10 citations (list in REPORT §6), identical NAP | Spreadsheet of URLs |
| 2026-10-27 → 2027-01-12 | Ask every past client for a review (target 15 by 2027-01-12) | GBP review count |
| 2026-11 | Ask Grizzly New Marketing for a partner/team link; WordCamp Cape Town profile | Links live |

## Phase 5: Tokens → components → pages (`redesign/05-design-system`, `redesign/05b-pages`)

| Task | Files | Change | Test first |
|---|---|---|---|
| 5.1 | `globals.css`, `layout.tsx` | Tokens from `design-tokens.css`; Geist + Geist Mono via `next/font`; remove DM Sans, Space Mono, Instrument Serif, `.glass`, global button transforms | `visual.spec.ts`: body font-family includes Geist; `prefers-color-scheme: dark` switches `--color-bg` |
| 5.2 | `src/components/ui/Button.tsx`, `Field.tsx`, `CaseStudyTile.tsx`, `Section.tsx` | Components with every state; min 44px targets | `a11y.spec.ts`: no interactive element under 44×44 except inline text links |
| 5.3 | `Navbar.tsx`, `Footer.tsx` | Nav per spec; footer NAP + legal + cookie settings | nav one line at 1024px (bounding-box test) |
| 5.4 | `src/app/page.tsx` + `src/components/home/*` | Home per the REPORT §14.4 wireframe | `home.spec.ts`: H1 contains "Cape Town"; hero CTA visible at 375×667 without scroll |
| 5.5 ∥ | `src/app/(services)/*/page.tsx` + `src/content/services.ts` | 5 service pages from one template | `services.spec.ts`: each 200, unique title/H1/description, BreadcrumbList, FAQ only if visible |
| 5.6 ∥ | `src/app/work/*` + `src/content/work.ts` | `/work`, `/work/the-breezy-exchange` (screenshots captured from the demo) | `work.spec.ts` |
| 5.7 ∥ | `src/app/hire-me/page.tsx` | Merges experience + skills + education + CV | `hire-me.spec.ts` |
| 5.8 | `src/app/about`, `src/app/contact`, `src/app/services` (hub) | Rewritten; Google Maps iframe removed from contact (CSP + weight) | page specs |
| 5.9 | Remove dead code | `content/projects`, `src/app/portfolio`, unused components, `framer-motion`, `next-mdx-remote`, `gray-matter`, `next-sitemap` | build + bundle report: no framer-motion chunk |

## Phase 6: Content and case studies (`redesign/06-content`)

| Task | Change |
|---|---|
| 6.1 | Copy pass with `copywriting` + `copy-editing` on all pages: zero em-dashes in rendered text (test: `copy.spec.ts` scans `innerText` for `—` and `–`) |
| 6.2 | 5 blog briefs in `audit/2026-10/content-briefs/` (website cost SA, SEO cost SA, GBP guide, CWV case study, WordPress maintenance checklist). Writing the posts is a follow-up |
| 6.3 | Placeholders clearly marked (`data-placeholder`) for testimonials, prices and extra case studies; a test asserts placeholders don't render in production unless `NEXT_PUBLIC_SHOW_PLACEHOLDERS` |

## Phase 7: Motion (`redesign/07-motion`)

| Task | Change | Test first |
|---|---|---|
| 7.1 | CSS-only transitions per REPORT §14.6; mobile menu sheet 200ms | `motion.spec.ts`: with `reducedMotion: 'reduce'`, computed `transition-duration` is `0s` on buttons |

## Phase 8: QA and launch (`redesign/08-qa`)

Pre-launch checklist (all ticked in the final PR):
- [ ] All CI green; LHCI budgets met on preview
- [ ] axe 0 serious/critical on every route at 375 and 1280
- [ ] Rich Results Test 0 errors: home, a service page, a work page
- [ ] Consent: Tag Assistant shows denied before Accept
- [ ] Every row in `redirect-map.csv` → 308 to target (`redirects.spec.ts`)
- [ ] `/thank-you` noindex and fires `generate_lead` once
- [ ] Sitemap lists only indexable 200 URLs
- [ ] Preview not indexable (`X-Robots-Tag` on `*.vercel.app`)
- [ ] securityheaders.com on preview: A
- [ ] Screenshots at 375/768/1280/1440 in `audit/2026-10/screenshots/after-*`
- [ ] `progress.md` before/after table complete
- [ ] Env vars documented for you: `NEXT_PUBLIC_GTM_ID`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_CAL_URL`, `NEXT_PUBLIC_SITE_URL`

Then the final PR `redesign/2026-10 → main` (**stop and wait for you**).

---

## Revision 2026-10-19: strategy update from `website-research.md`

Source: Brian's `website-research.md` (40 Indeed SA job ads, 5 freelance SERPs, competitor teardown). It's kept outside git because it references job applications. Where it conflicts with the original plan, the research wins.

| Original plan | Revised | Reason (research §) |
|---|---|---|
| Freelance-first, Cape Town local service site | **Two audiences: employers (full-stack, front-end and back-end roles) and freelance clients.** Title "Web Developer" + the positioning line from §5.1 | §1, §5.1 |
| 5 service pages (`/web-design-cape-town`, `/wordpress-developer-cape-town`, `/seo-cape-town`, `/nextjs-developer`, `/white-label-for-agencies`) | **Dropped.** Services stay one page/section. Revisit after 3 months of Search Console data | §4, §5.2 |
| `/experience` and `/skills` → 308 to `/hire-me` | **Kept** as employer pages; `/hire-me` dropped. The CV button lives on `/experience` (and the home hiring path) | employer audience |
| Skills: long lists | Lead with the most-asked terms grouped by evidence level (Work / Own project / Study); add Tailwind CSS; CMS list cut to one line; SEO tools moved to the services page | §2, §5.4 |
| Events `generate_lead` etc. | Add `form_submit_hiring` and `form_submit_project` (the contact form asks "Hiring or project?"); keep `cv_download`. `generate_lead` fires on both with a `lead_type` parameter | §6 |
| Case studies | The Breezy Exchange **and** brianramoroka.co.za itself (before/after Lighthouse, Rich Results, crawl) | §6 |
| GBP + local citations (phase 4) | Optional. Recommended (local pack evidence in REPORT §5 still stands) but secondary to marketplace profiles (Codeable/Upwork/Contra) that link back to the site | §5.2 |

**Claims policy (unanswered research §7 questions 1, 2, 3, 5):** the site does not claim code review, SQL Server, Node.js, automated testing or .NET work experience. "Study" items are labelled as study. No entry offer is shown; it's quote on request. The proof project (§5.3) is listed as "in progress" only once a repo exists.

**Revised redirect map:** only `/portfolio` and `/portfolio/:slug` → `/work` (308). `/experience` and `/skills` keep returning 200.

**Revised phase 5 page list:** `/` (both paths), `/about`, `/experience` (+CV), `/skills` (evidence-grouped), `/services` (single page, including the SEO tools), `/work`, `/work/the-breezy-exchange`, `/work/brianramoroka-co-za`, `/contact` (hiring/project switch), `/thank-you`, `/privacy`, `/cookies`.
