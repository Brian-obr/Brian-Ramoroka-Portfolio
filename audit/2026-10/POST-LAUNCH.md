# Post-launch monitoring: 8 weeks

L = the day `redesign/2026-10` merges to `main` and Vercel deploys production. Record every check in `progress.md` with the date and a screenshot or export.

## Launch day (L)

- [ ] `curl -I https://brianramoroka.co.za/` returns **308** to `https://www.brianramoroka.co.za/` (Vercel → Domains: set apex "Redirect to www" with 308; currently 307)
- [ ] `/portfolio` and `/portfolio/project-alpha` return 308 to `/work`
- [ ] `/experience`, `/skills`, `/about`, `/services`, `/contact` return 200 (unchanged URLs)
- [ ] `https://www.brianramoroka.co.za/sitemap.xml` lists 11 URLs, all 200
- [ ] Search Console → Sitemaps → resubmit `sitemap.xml`
- [ ] Search Console → URL Inspection → "Request indexing" for `/`, `/services`, `/work`, `/work/the-breezy-exchange`, `/work/brianramoroka-co-za`
- [ ] Rich Results Test on `/`, `/work/the-breezy-exchange`, `/services`: 0 errors (Breadcrumb detected on inner pages)
- [ ] securityheaders.com on `https://www.brianramoroka.co.za/`: grade A
- [ ] Tag Assistant: no Google request before "Accept analytics"; GA4 page_view after Accept
- [ ] Send one real enquiry through `/contact` (hiring) and one (project): both arrive in the inbox; GA4 DebugView shows one `generate_lead` each
- [ ] Bing Webmaster Tools: import from Search Console, submit sitemap

## Weekly for 8 weeks (every Monday, ~15 minutes)

| Check | Where | Healthy | If not |
|---|---|---|---|
| Indexed pages | Search Console → Pages | Rising towards 11 indexed; no new "Not found (404)" | Open the reason; for 404s add a redirect in `next.config.ts` |
| 404s from old URLs | Search Console → Pages → Not found; Vercel → Logs filtered `status:404` | Only junk URLs | Add a 308 for any real old URL |
| Impressions and clicks | Search Console → Performance, compare to the 3 months before L (326 impressions, 9 clicks) | Impressions up by week 4 | See "If rankings drop" |
| Brand query `ramoroka` | Search Console → Performance → Queries | Position ≤ 3 | Check `/` is indexed and the title shows "Brian Ramoroka" |
| Field speed | Vercel Speed Insights (p75) | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 | Compare with the Lighthouse CI artifact for that commit |
| Leads | GA4 key events vs inbox | `generate_lead` count = real enquiries ±1 | Check consent rate and the `lead` cookie path |
| SEO elements | Run `npx playwright test tests/seo.spec.ts tests/critical.spec.ts` with `BASE_URL=https://www.brianramoroka.co.za` | All pass | The failing test names the element that regressed |

## Week 4 and week 8

- [ ] Fill the "Measured after launch" columns in `SUCCESS-CRITERIA.md`
- [ ] Run the 5-second and first-click tests (`usability-test-plan.md`) at week 4
- [ ] CrUX: check `https://www.brianramoroka.co.za` in PageSpeed Insights; expect "no field data" until traffic grows, then use Speed Insights instead

## If rankings drop

1. **Confirm it's real:** compare the same 28-day windows; with 3-10 impressions a day, a single day means nothing.
2. **Brand drop** (`ramoroka` loses position): check `/` is indexed, the title still contains "Brian Ramoroka", and the Person schema is valid. Inspect `/` in Search Console.
3. **A page disappears:** URL Inspection on it. "Crawled, currently not indexed" on a new page usually resolves within weeks; add internal links to it from `/` and `/work`. "Duplicate, Google chose different canonical": check the canonical tag matches the URL.
4. **Old URL traffic lost** (`/experience`, `/skills` kept their URLs, so this should not happen): look for 404s and add redirects.
5. **Speed regression:** Lighthouse CI fails the build on regressions, so a field-only drop points to real-device conditions; check Speed Insights by device and page.
6. **Roll back** only if the site is broken: Vercel → Deployments → the previous production deployment (`f26e6f4`) → "Promote to Production". Then fix forward on a branch.
