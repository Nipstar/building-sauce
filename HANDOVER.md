# Building Sauce site: handover

Next.js 16 (App Router, cacheComponents on), TypeScript, Tailwind 4. Every public page is statically generated. Spec lives in `docs/spec/` (BUILD-PROMPT, COPY-DECK, KEYWORDS). Plan in `docs/superpowers/plans/`.

## Run it

```bash
npm install
cp .env.example .env            # fill in what you have; everything is optional for a local run
npm run dev                     # http://localhost:3000
npm run build && npm start      # production build (warns about standalone; still serves)
node .next/standalone/server.js # how Docker runs it (copy public and .next/static first, see Dockerfile)
```

## Checks (run all before asking anyone to deploy)

```bash
npm run check            # build, check:copy, check:links, test:e2e
npm run check:copy       # rendered-text rules: em dash, "!", Ltd, placeholders, verify facts, headings, titles, JSON-LD, sitemap vs registry
npm run check:links      # every external source URL answers 2xx (429 is reported, not failed)
npm run check:guide SLUG # one guide: frontmatter, facts, word count, structure
npm run test:e2e         # Playwright: screenshots at 390/768/1440 into tests/screenshots, no horizontal scroll, keyboard, form posts signed payload, honeypot posts nothing
```

Lighthouse and the Schema.org / Rich Results validators are manual: run them on the preview URL for `/`, `/facade-restoration-leads`, `/guides/local-law-11`, `/data/fisp-unsafe-buildings`.

## How the site decides what is public

`content/registry.ts` builds the one list of pages. A page is `live` (in `sitemap.xml` and `llms.txt`) only when:

- it has no `[PLACEHOLDER]` in its content (`lib/placeholders.ts` pattern: capitalised text in square brackets),
- it uses no fact with `confidence: "verify"`,
- it is not `draft: true` (compare pages are drafts until Andy reviews them),
- for data pages, the headline fields in `data/stats/<name>.json` are not null.

Pages that are not live still render, with `noindex`. `check:copy` fails if a live page breaks a rule. To see why a page is not live, run:

```bash
npx tsx -e "import {buildRegistry} from './content/registry'; for (const p of buildRegistry()) if (!p.live) console.log(p.url, p.blockers)"
```

## How to update a fact

All regulatory facts live in `content/facts.ts`. Each has `id`, `value` (short figure), `text` (full sentence), `sourceName`, `sourceUrl`, `checked`, `confidence`. Components (`DeadlineRows`, `KeyFacts`, `<F id="..."/>`) render from it and stamp `data-fact-confidence` on the HTML so `check:copy` can police it.

1. Edit the fact. Bump `checked` to today.
2. If you confirmed it against an official page, set `confidence: "high"`. If not, `"verify"` and every page using it drops out of the sitemap automatically.
3. `npm run check:links` then `npm run build && npm run check:copy`.

Facts still marked `verify` on hand-over: `shed_lf` (idle shed penalty per linear foot; confirm against Admin Code 28-220.1) and `habitat_sheds` (Habitat 7,859 sheds article URL not found). Neither is used on a live page.

## How to add a guide

1. Copy `content/guides/local-law-11.mdx`. Keep the frontmatter keys (schema in `lib/mdx.ts`). Title max 60, description max 155.
2. Write 900 to 1,800 words, H2 per question, one `<CTA />` after the second H2. Figures only via `<F id="fact_id" />`. Markdown tables are fine.
3. `npm run check:guide <slug>` until it prints OK. The page appears at `/guides/<slug>` on the next build, and in the guides index, sitemap and llms.txt if it is live. Add it to the footer in `content/site.ts` (`FOOTER_COLUMNS`) if it deserves a slot.
4. A guide at a root URL (like `/construction-leads`) sets `url:` in frontmatter and needs a small page file like `app/construction-leads/page.tsx`.

Writing rules are in `docs/superpowers/guide-brief.md`.

## How to add or change a feed page

`content/feeds.ts`, one object per feed, SPIN order. `status` drives the card tag and whether the page shows the price or the waitlist. Deadline rows reference facts by id. The facade `sampleRow` is a field guide, not a record: swap it for a real masked row from the first feed run (fields and source line only; never a full address, BBL, BIN, owner or contact).

## Weekly stats commit (data pages)

The `antek-leads` CLI writes `data/stats/fisp.json`, `sheds.json` and `garages.json` (shapes in `lib/stats.ts`) and commits them. The push triggers a deploy. Counts only; never addresses, BBL, BIN, owner or contact fields. A data page stays out of the sitemap until its headline fields are filled (`isDataPageLive`). The aggregate CSV at `/data/<slug>/download` is generated from the same JSON.

Seed values are Andy's counts from Nov 5, 2026. The sheds file is all null until the shed pipeline runs, so `/data/nyc-sidewalk-sheds` is rendered but not listed.

## Forms

`components/LeadForm.tsx` (the only client component besides nothing; the nav dropdown is a native `<details>`) posts JSON to `app/api/lead/route.ts`, which: validates with zod, returns 303 to `/thanks` on a honeypot hit without posting, verifies Cloudflare Turnstile when `TURNSTILE_SECRET_KEY` is set, flags free-mail addresses, signs the body with HMAC-SHA256 (`X-Signature: sha256=<hex>`, secret `N8N_LEAD_WEBHOOK_SECRET`) and POSTs to `N8N_LEAD_WEBHOOK_URL`. Payload keys match the Google Sheet headers exactly (Submitted At, Name, Company, Email, Phone, Website, Feed, Areas Covered, Message, Source Page, Stop-list Check, Status, Notes) so the n8n Sheets node maps by name; `meta` carries formType, trade, role, freeMail, utm, ip and user agent. The honeypot field is `hp`; `website` is a required field. First-touch UTM parameters are kept in `sessionStorage` and sent with every form. The site never sends email. If the webhook env is unset the lead is logged to the server console and the user still lands on `/thanks`.

n8n side (not in this repo): verify the signature, run the Easy Answer stop-list gate, upsert the GoHighLevel contact with tag `bs-sample` or `bs-waitlist-<trade>`, notify Andy. Test locally with `npm run mock:webhook` and `N8N_LEAD_WEBHOOK_URL=http://localhost:4001/webhook N8N_LEAD_WEBHOOK_SECRET=test npm start`.

## Env vars

| Var | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Canonical base URL (`https://buildingsauce.com`) |
| `N8N_LEAD_WEBHOOK_URL` | runtime | Where leads are POSTed |
| `N8N_LEAD_WEBHOOK_SECRET` | runtime | HMAC key for `X-Signature` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | build | Renders the Turnstile widget when set |
| `TURNSTILE_SECRET_KEY` | runtime | Verifies the widget token; unset skips verification |
| `CHECKOUT_URL_FACADE` | build | GoHighLevel product or payment link for the "Start the facade feed" button; unset falls back to the free sample |
| `CF_ANALYTICS_TOKEN` | build | Cloudflare Web Analytics beacon (cookieless) |
| `GSC_VERIFICATION`, `BING_VERIFICATION` | build | Search Console and Bing Webmaster meta tags |

## Deploy

**Vercel (Pro):** import the repo, set the env vars above, framework Next.js. `output: 'standalone'` is harmless on Vercel. Add `buildingsauce.com` and `www.buildingsauce.com` as domains; the `www` to apex 301 is in `next.config.ts`. Cloudflare DNS records pointing to Vercel must be DNS only (grey cloud).

**Coolify / Docker:** `Dockerfile` builds the standalone server. Pass `NEXT_PUBLIC_*` values as build args. Container listens on 3000. Put Cloudflare in front.

**Cloudflare dashboard (Andy):** Email Obfuscation off, AI bot blocking off, check Bot Fight Mode against Googlebot and the AI bots named in `app/robots.ts`.

## Decisions taken in the build (check these)

- Founding offer: first 5 firms pay $300 a month for as long as they stay; firm 6 onward $400. Cap 5 firms per feed. Quiet month rule included. All in `content/site.ts`.
- Byline is "Building Sauce research desk" (copy deck D1 default). About page uses version B. To name Andy, change `SITE.byline` and the About copy.
- Terms governing law set to England and Wales (copy deck said `[DECIDE]`). Terms and Privacy carry a DRAFT HTML comment; lawyer check before paid launch.
- Facade sample row card shows what each field carries rather than a placeholder record, so the page can be in the sitemap before the first feed run.
- Roofing feed has no "What it costs" block: no high-confidence regulatory fact for leak violations yet.
- Boiler facts use DOB's Boiler Compliance page (defects corrected within 90 days), replacing the unverified 180-day note.
- Compare pages are `draft: true` (noindex, out of sitemap) until Andy reviews them. Flip `draft` in `content/compare.ts`.
- `/og` renders OG images at request time with Inter fetched from Google Fonts; falls back to the default font if that fetch fails.

## Things not done here

- Lighthouse and Rich Results runs (need a deployed URL).
- LinkedIn page URL: set `SITE.linkedin` when it exists (feeds Organization `sameAs`).
- A real masked sample row for the facade hero.
- Data page borough, sub-cycle and monthly splits (nulls until the CLI writes them).
