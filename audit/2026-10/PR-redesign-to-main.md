# Redesign 2026-10: two-audience site, 4.3s → 1.5s mobile LCP, consent-first analytics

Merges `redesign/2026-10` into `main`. **Production deploys on merge.** Brian decides when.

## What changes for visitors
- New design (light and dark), rebuilt from `website-research.md`: employers and freelance clients each get a clear path.
- New pages: `/work`, `/work/the-breezy-exchange`, `/work/brianramoroka-co-za`, `/privacy`, `/cookies`, `/thank-you`.
- `/portfolio` (was 404) now 308 → `/work`. All other existing URLs are unchanged.
- Contact form: hiring or project, works without JavaScript, replies promised within one working day.
- Analytics only after "Accept analytics" (POPIA/GDPR).

## Evidence (full log: `audit/2026-10/progress.md`)
| | Before (live) | After |
|---|---|---|
| Mobile LCP, devtools throttling, home | 4,269ms | 1,478ms |
| Lighthouse performance, mobile | 83-84 | 99-100 |
| Page weight, home | 1,043KB | 330KB |
| axe violations | 0 (but 8-20 small targets/page) | 0, and 0 small targets |
| Google requests before consent | gtag on every page | 0 |
| Tests | none | 349 Playwright + LHCI budgets in CI |

## Pre-launch checklist
- [x] CI green (lint, typecheck, build, Playwright, axe, Lighthouse budgets)
- [x] Redirect map applied (`/portfolio*` → `/work`, 308) and tested
- [x] `/thank-you` noindex, not in sitemap, fires `generate_lead` once
- [x] Preview not indexable (Vercel Authentication + `x-robots-tag: noindex`)
- [ ] **Brian:** Vercel env vars for production: `NEXT_PUBLIC_GA_ID` (already set?) or `NEXT_PUBLIC_GTM_ID`; `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` (or keep `FORMSPREE_URL`); confirm one of them is set, or the form shows "couldn't be sent"
- [ ] **Brian:** Vercel Domains → apex `brianramoroka.co.za` → Redirect to www with **308**
- [ ] **Brian:** add `public/cv/brian-ramoroka-cv.pdf` if you want the CV button (otherwise "CV available on request")
- [ ] Launch-day checks in `audit/2026-10/POST-LAUNCH.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
