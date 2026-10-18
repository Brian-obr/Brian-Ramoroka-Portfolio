# Content briefs (phase 6)

Revised from the original 5 generic briefs to fit `website-research.md` §5.2: no head-term service pages; one narrow topic tied to Brian's own proof first, then two that double as employer evidence. Writing the posts is a follow-up; publish them under `/work` or a future `/notes` section, not as service landing pages.

Rules for every post: claims only from work Brian can show; numbers from a named tool run on a named date; no em-dashes; one H1; a short "what I'd do for your site" close linking to `/contact`.

---

## 1. Product schema for WooCommerce stores: what Google needs and what plugins miss

- **Why this topic:** research §5.2 names it as the one narrow page worth testing; little competition from individual freelancers; The Breezy Exchange is the proof.
- **Search intent:** informational with a commercial tail (store owners checking why their products don't show rich results).
- **Target queries (volumes not verified):** "woocommerce product schema", "woocommerce product rich results", "product structured data woocommerce", "woocommerce schema without plugin".
- **Evidence to gather first:** Rich Results Test and Schema Markup Validator runs on a Breezy Exchange product page before and after adding `Product` + `Offer` + `itemCondition` (the store currently has ShoeStore, BreadcrumbList and CollectionPage only, measured 2026-10-19).
- **Outline:** what Google reads for products (name, image, offers, price, priceCurrency ZAR, availability, itemCondition) → what Blocksy/WooCommerce and Rank Math output by default → the gaps found on The Breezy Exchange → the fix (code or settings) → before/after validator screenshots → checklist.
- **Internal links:** `/work/the-breezy-exchange`, `/services`.
- **Length:** 1,200-1,600 words. **Schema:** `Article` + `HowTo` only if the steps are shown as steps.

## 2. How I cut this site's mobile load time from 4.3 to 1.5 seconds

- **Why:** shows employers Next.js, React, performance and testing; shows clients the same skill applied. All evidence already exists in `audit/2026-10/progress.md`.
- **Target queries (not verified):** "next.js hydration lcp", "framer motion lcp", "lighthouse lantern lcp vs devtools", "next font display optional lcp".
- **Outline:** the symptom (LCP = TTI) → why `opacity: 0` initial states hide the LCP element → removing the gate → the Lantern vs devtools measurement trap (the experiment table) → fonts and script budgets → guarding it with Playwright and Lighthouse CI.
- **Internal links:** `/work/brianramoroka-co-za`, `/skills`.
- **Length:** 1,000-1,400 words, with the before/after table.

## 3. A technical SEO check you can run on a small business site in an hour

- **Why:** matches the "Technical SEO" service and the fixed-scope entry offer question (research §7 Q5); useful whether or not Brian sells the audit.
- **Target queries (not verified):** "technical seo checklist small business", "seo audit checklist south africa".
- **Outline:** indexing (`site:` caveats, Search Console Page indexing), redirects and the apex-to-www 307/308 example from this audit, canonicals, sitemap dates, robots, Core Web Vitals field vs lab, structured data, consent before analytics (POPIA).
- **Internal links:** `/services`, `/contact`.
- **Length:** 1,000-1,300 words plus a downloadable checklist (PDF, tracked as `outbound_click`/`cv_download`-style event `file_download` if added).

---

**Not written, and why:** "website cost in South Africa" and "SEO cost in South Africa" (original plan) need real price data Brian hasn't set (research §7 Q5); revisit after 3 months of Search Console data.
