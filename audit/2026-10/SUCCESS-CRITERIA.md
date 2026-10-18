# Success criteria: judged by outside tools, not by us

Baseline date: 2026-10-19. Launch date: **TBD** (L = the day the `main` PR merges). "Checker" is who opens the tool and records the value in `progress.md`.

| Area | External arbiter | Baseline | Target | Date to check | Checker |
|---|---|---|---|---|---|
| Indexing | GSC → Pages (Page indexing) | 5 of 6 sitemap URLs shown by `site:`; `/services` not shown (index state unconfirmed, H-01) | 100% of sitemap URLs indexed (expected ~16) | L + 4 weeks | Brian |
| Visibility: brand | GSC → Performance, query `ramoroka` | 35 impressions / 3 months, pos 3.8 | Position ≤ 1.5 | L + 8 weeks | Brian |
| Visibility: money queries | GSC → Performance, queries in `keyword-intent-map.csv` marked PRIMARY | 0 impressions on all | Impressions > 0 on all 3 PRIMARY clusters (local web design, WordPress, local SEO); avg position ≤ 30 | L + 8 weeks | Brian |
| Visibility: total | GSC | 326 impressions / 9 clicks per 3 months | 3× impressions, 3× clicks vs the same-length window before launch | L + 12 weeks | Brian |
| Local | Grid rank tracker (Local Falcon 5×5, 2km spacing, centre: Cape Town CBD) for "freelance web developer cape town", "wordpress developer cape town", "web designer cape town" | No GBP (not in any pack) | In the 3-pack on ≥ 5 of 25 grid points for 1 term | L + 12 weeks | Brian |
| Reviews | GBP | 0 | ≥ 15 | 2027-01-12 | Brian |
| Speed: lab | Lighthouse CI (mobile, median of 3) on home | LCP 6.61s, TBT 200ms, CLS 0 | LCP ≤ 2.0s, TBT ≤ 200ms, CLS ≤ 0.05 | Every PR (CI) | CI |
| Speed: field | Vercel Speed Insights p75 (CrUX once eligible) | No data | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 | L + 4 weeks (Speed Insights), L + 28 days rolling (CrUX) | Brian |
| Rich results | Rich Results Test + validator.schema.org | Not tested; schema incomplete | 0 errors on home, a service page, a work page | Pre-launch (preview) + L + 1 day | Claude (preview), Brian (prod) |
| Accessibility | axe-core in Playwright + VoiceOver pass | 0 violations; 8-20 targets < 44px per page | 0 serious/critical; 0 controls < 44×44 (inline links excepted) | Every PR (CI) + VoiceOver pre-launch | CI / Brian |
| Consent | GTM Preview / Tag Assistant | GA fires with no consent | No `_ga` cookie and denied `gcs` before Accept | Pre-launch on preview | Brian (needs GTM access) |
| Security | securityheaders.com | not graded (headers present, CSP has `unsafe-eval`) | A | Pre-launch on preview | Claude |
| Security | Mozilla Observatory | not graded | B+ or better (A needs nonce CSP, H-05) | Pre-launch | Claude |
| Conversion | GA4 `generate_lead` reconciled with inbox enquiries | 0 tracked (no events) | Tracking matches the inbox ±1 each month; enquiry count reported monthly vs the first full month | Monthly from L + 1 month | Brian |
| Clarity | 5-second + first-click tests (`usability-test-plan.md`) | Not run | ≥ 4/5 state the offer and find the contact CTA | Preview after phase 5; L + 4 weeks | Brian |
| Regression | Lighthouse CI + Playwright meta/schema specs in GitHub Actions | None | Build fails if a budget, title, canonical, H1 or schema regresses | Every push | CI |

Before/after values measured on the preview are filled in at the end of implementation (section below).

## Measured on preview

_To be completed in phase 8._
