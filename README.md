# Brian Ramoroka: portfolio

Source for [brianramoroka.co.za](https://brianramoroka.co.za), my portfolio and online CV.

## Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Validation:** Zod (contact form, server side)
- **Contact:** Formspree, through the `/api/contact` route
- **Analytics:** Google Analytics 4 through Google Tag Manager, loaded only after cookie consent
- **Tests:** Playwright
- **Hosting:** Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` with:

```
FORMSPREE_URL=https://formspree.io/f/your-form-id
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Without `FORMSPREE_URL` the contact form returns an error. Without `NEXT_PUBLIC_GTM_ID` no analytics load. The Google Tag Manager container loads only after a visitor accepts analytics, and it holds the GA4 tag.

## Checks

```bash
npm run lint
npm run build
npm run typecheck
npx playwright test
```

The same checks run in GitHub Actions on every pull request and every push to `main`.

## Deployment

Vercel deploys every push to `main`.
