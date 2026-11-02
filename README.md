# RealEstateCNX.com

The Real Estate CNX website: a media and community hub where buyers, sellers and agents get information and connections. Built with Next.js, TypeScript and Tailwind CSS, deployed on Vercel.

## Edit common things

| What | File |
| --- | --- |
| Tagline, mission, contact info, social links, licensing disclosure, planner link | `lib/site.ts` |
| Arizona and Washington market hubs (add a new state here) | `lib/markets.ts` |
| Guides and checklists | `lib/guides.ts` |
| Homepage | `app/page.tsx` |
| Colors and fonts | `app/globals.css` (Nov 2026 brand guide: CNX Red #AF1500, Gold #E6C01F, Black #1A1A1A, Red on dark #E32B12, Light #F2EFE9) |
| Logos | `public/cnx-*.svg` (official files from the brand Drive folder) |

Articles come from Substack automatically (`lib/substack.ts`, refreshed hourly). Post on Substack and they appear on the site.

## Forms

"Get connected" and "Join the network" post to `/api/connect`, which:

- emails each entry to `CONTACT_TO_EMAIL` through [Resend](https://resend.com) (free tier) when `RESEND_API_KEY` is set,
- optionally posts it as JSON to `FORM_WEBHOOK_URL` (for example a Google Sheet),
- always writes it to the server log (Vercel > Project > Logs), so nothing is lost before email is set up.

See `.env.example` for the variables.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Deploy

1. Import this GitHub repo at vercel.com/new (framework: Next.js, no settings to change).
2. Add the environment variables from `.env.example` in Vercel > Settings > Environment Variables.
3. Add `realestatecnx.com` and `www.realestatecnx.com` in Vercel > Settings > Domains and set the DNS records Vercel shows at your domain registrar.

Old Hostinger URLs (`/blog`, `/az-snap-market-update`, the prompt tool pages) redirect to their new homes (`next.config.ts`).
