# Building Sauce marketing site: build prompt for Claude Code

Version 1, 7 Nov 2026. Owner: Andy Norman (Antek Automation). Domain: buildingsauce.com.

Read this whole file, then `docs/COPY-DECK.md` and `docs/KEYWORDS.csv`, before writing any code. The copy deck holds every page's SEO fields and copy. This file holds the stack, structure, templates, SEO/GEO rules and acceptance tests.

## 0. House rules (apply to everything)

- Never spend money, call a paid API, send an email, change DNS or deploy to production without Andy typing yes. Preview deploys are fine.
- Site copy: US English, US date format (Feb 21, 2027), no em dashes, no exclamation marks, no hype words (revolutionary, game-changing, unlock, seamless).
- Never write "Ltd" or "Limited" after Antek Automation.
- Every regulatory fact on the site comes from `content/facts.ts` (section 7). Do not write a date, penalty, threshold or count into copy by hand.
- Anything in square brackets in the copy deck, e.g. `[ADDRESS]` or `[VERIFY ...]`, is a placeholder. A page that contains one must not be listed in the sitemap or linked from the nav until it is filled. The build check in section 11 enforces this.
- Public pages show aggregates only. Never publish a building address list, BBL list, owner name or contact from the feed. That is the product.
- No method detail beyond what `/how-it-works` says. Name the public sources, not the join logic or scoring weights.

## 1. What the site has to do

1. Turn cold email clicks into free sample requests. Cold email always lands on a single-trade feed page (launch: `/facade-restoration-leads`), never the home page.
2. Rank for low-competition NYC compliance terms (Local Law 11, FISP, SWARMP, sidewalk sheds, Local Law 152, Local Law 126) and a few national lead terms with low difficulty. See `docs/KEYWORDS.csv`.
3. Be the page AI engines quote when asked about these rules or how to find these jobs: answer first, dated, sourced, consistent.
4. Collect waitlist sign-ups for feeds that are not live yet, so Andy can see which trade to build next.
5. Take payment by card via a Stripe Payment Link. No checkout code.

## 2. Stack

- Next.js, App Router, latest stable, TypeScript, Tailwind CSS. Static generation for every page (no runtime data fetching on public pages).
- Content in MDX under `content/` with typed frontmatter (`title`, `description`, `h1`, `updated`, `phase`, `primaryKeyword`, `schema`). Pages render from content plus components. No CMS.
- Fonts via `next/font`: Inter (400, 500, 600, 700) and JetBrains Mono (400, 500). Self-hosted, `display: swap`.
- Forms: one route handler `app/api/lead/route.ts`. Validates, checks Cloudflare Turnstile and a honeypot, then POSTs JSON to `N8N_LEAD_WEBHOOK_URL`. The site never sends email.
- Payments: Stripe Payment Link URL from env (`STRIPE_LINK_FACADE`). Button only.
- Analytics: Cloudflare Web Analytics beacon (cookieless, env `CF_ANALYTICS_TOKEN`). Google Search Console and Bing Webmaster verification via env meta tags.
- Hosting: must run on both Vercel (Pro plan, the Hobby plan is non-commercial) and Coolify on Andy's Contabo VPS (`output: 'standalone'`, Dockerfile included). Andy picks. No Vercel-only features except optional Vercel Analytics behind a flag.
- Repo: `buildingsauce-site`, separate from `antek-leads`. Nothing from Easy Answer, no client data, in this repo.

Env file template (`.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://buildingsauce.com
N8N_LEAD_WEBHOOK_URL=
N8N_LEAD_WEBHOOK_SECRET=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
STRIPE_LINK_FACADE=
CF_ANALYTICS_TOKEN=
GSC_VERIFICATION=
BING_VERIFICATION=
```

## 3. Design system

Source of truth is the Building Sauce Design canvas mockup (Home and Facade pages, plus Mold, Gas, Roofing, Florida). If Andy has exported the mockup HTML into `design-ref/`, take colours, spacing and type sizes from it: the `accent` default prop, the off-white panel, the near-black bands, the hairline and the greys. Define each once as a CSS variable in `globals.css`. If `design-ref/` is empty, stop and ask Andy for the values. Do not invent a palette.

Look: white page, near-black bands, one accent colour, square corners everywhere (no border radius), no drop shadows, hairline dividers, JetBrains Mono for eyebrows, numbers and record IDs, Inter for everything else. Big confident H1s, generous white space, max content width about 1120px, text columns about 720px.

Components (build each once, reuse everywhere):

| Component | From the mockup | Notes |
|---|---|---|
| `SiteHeader` | Logo square mark plus wordmark, nav, dark CTA button | Nav: Feeds (dropdown), How it works, Pricing, Guides, CTA "Get a free list". On feed pages the nav collapses to logo plus CTA to keep focus |
| `Eyebrow` | Mono, uppercase, letterspaced, accent colour | |
| `Hero` | Eyebrow, H1, sub, CTA pair, microcopy line | Optional right column slot for `SampleRowCard` |
| `SampleRowCard` | "One row from the feed" card with score chip and 2-column field grid | Fields come from props. Footer source line |
| `AnswerBlock` | New | 40 to 60 word answer to the page's main question, "Last checked" date and source link. Sits directly under the hero. This is the GEO block |
| `DarkBand3` | Near-black band, 3 columns, hairline top border, mono number or bold title | Used for "how it works" and "the problem" |
| `DeadlineRows` | Mono figure on the left, text on the right, hairline rows, source line under | Figures and text pulled from `facts.ts` |
| `NeedPayoffBand` | Centred, off-white panel, one big question, one paragraph | |
| `CapabilityTable` | "You said / Each row carries / From" table | Scrolls horizontally on mobile |
| `TrustTriplet` | Three short statements | |
| `PricingBand` | Dark band, price H2, bullet list, white form card on the right | Variant `waitlist` swaps the price for "Join the waitlist" |
| `LeadForm` | Form card | Props: `formType` (sample, waitlist, contact), `trade`, fields |
| `FeedCard` | Status tag (LIVE, NEXT, 2027, PLANNED) and region tag | Live card gets the heavy border |
| `FAQList` | Hairline list | Use native `<details>` so it works without JS. Renders FAQPage JSON-LD from the same data |
| `KeyFacts` | New | Two-column fact table rendered from `facts.ts` with source links |
| `StatHero` | New | One big mono number, label, "as of" date |
| `BarChart` | New | Plain inline SVG, no chart library. Accessible table fallback underneath |
| `SourcesList` | New | Numbered sources, official first, with "checked" dates |
| `CTABox` | New | Inline box on guides linking to the matching feed page |
| `Breadcrumbs` | New | Guides, data and compare pages. Renders BreadcrumbList JSON-LD |
| `Byline` | New | "Written by [AUTHOR], updated [date]". See decision D1 in the copy deck |
| `SiteFooter` | Operator line, Terms, Privacy | Add Guides and Data columns |

Responsive: the mockup uses fixed 3 and 2 column grids. Stack to one column under 768px. Tap targets at least 44px. Test at 390, 768 and 1440.

## 4. Site map and URLs

Phase 1 must be live before the first send (Mon 30 Nov 2026). Phase 2 in December. Phase 3 from January.

| URL | Page | Template | Phase | Primary keyword (US vol / KD) |
|---|---|---|---|---|
| `/` | Home | Home | 1 | construction leads nyc (10, TP 1,000) |
| `/facade-restoration-leads` | Facade feed (LIVE) | Feed | 1 | local law 11 leads, fisp leads, facade restoration leads nyc (long tail) |
| `/free-sample` | Free sample request | Form | 1 | brand |
| `/pricing` | Pricing | Pricing | 1 | brand |
| `/how-it-works` | Method and sources | Method | 1 | brand, GEO |
| `/about` | Who runs it | About | 1 | brand, E-E-A-T |
| `/thanks` | Form thank-you | Simple, noindex | 1 | |
| `/terms`, `/privacy` | Legal | Simple | 1 | |
| `/data/fisp-unsafe-buildings` | Weekly Unsafe and SWARMP counts | Data | 2 | fisp unsafe buildings list (long tail) |
| `/data/nyc-sidewalk-sheds` | Sheds by age band | Data | 2 | sidewalk shed (700 / 0), sidewalk shed nyc (150 / 0) |
| `/guides/local-law-11` | Pillar | Guide | 2 | local law 11 (1,400 / 6) |
| `/guides/fisp-cycle-10-deadlines` | Sub-cycles | Guide | 2 | fisp cycle 10 (200) |
| `/guides/swarmp-vs-unsafe` | Ratings explained | Guide | 2 | swarmp (150 to 210 / 6) |
| `/guides/local-law-11-penalties` | Penalty table | Guide | 2 | local law 11 penalties (long tail) |
| `/guides/sidewalk-shed-rules` | 2026 shed rules | Guide | 2 | nyc sidewalk shed law (long tail) |
| `/guides/local-law-152` | Gas piping, all due dates | Guide | 2 | local law 152 (800 / 4) plus cluster |
| `/parking-garage-leads` | Garage feed (NEXT) | Feed, waitlist | 2 | local law 126 leads (long tail) |
| `/gas-piping-leads` | Gas feed (2027) | Feed, waitlist | 2 | gas piping inspection nyc (200 / 0) |
| `/construction-leads` | National pillar | Guide | 2 | construction leads (700 / 4), leads for contractors (450 / 0) |
| `/guides/local-law-126` | Garages | Guide | 3 | local law 126 (200 / 11) |
| `/guides/nyc-boiler-inspection` | Boilers | Guide | 3 | boiler inspection nyc (200 / 2) |
| `/boiler-repair-leads` | Boiler feed (PLANNED) | Feed, waitlist | 3 | |
| `/mold-remediation-leads` | Mold feed (PLANNED) | Feed, waitlist | 3 | mold remediation leads (70 / 0) |
| `/commercial-roofing-leads` | Roofing feed (PLANNED) | Feed, waitlist | 3 | commercial roofing leads (300 / 1) |
| `/florida-condo-leads` | Florida (PLANNED) | Feed, waitlist | 3 | florida milestone inspection (200 / 9) |
| `/compare` and `/compare/*` | Honest comparisons | Compare | 3 | construction leads services (90 / 13) |
| `/data/nyc-parking-garages` | Garage counts | Data | 3 | |

Volumes are Ahrefs US monthly estimates pulled 7 Nov 2026. KD is Ahrefs difficulty (0 to 100). TP is traffic potential.

Redirects: `www` to apex (301). Old mockup names: `/facade`, `/mold`, `/gas`, `/roofing`, `/florida` 301 to the new slugs. No trailing slash.

## 5. Page templates

### Feed page (SPIN order). Used by `/facade-restoration-leads` and every waitlist feed

The order follows SPIN, so the page builds the problem before it shows the product or the price:

1. `Hero` (situation and problem in one line) with `SampleRowCard` on the right.
2. `AnswerBlock`: what this lead type is, in 40 to 60 words, dated and sourced.
3. `DarkBand3` "The problem": three problems in the buyer's words.
4. `DeadlineRows` "What it costs": implication. The owner's clock, penalties, deadlines, all from `facts.ts`.
5. `NeedPayoffBand`: one question the reader answers for themselves.
6. `CapabilityTable` "What you get": each row maps a problem from step 3 to a field in the feed. Benefits, not features.
7. `TrustTriplet`.
8. `PricingBand` (live feed) or `PricingBand variant=waitlist` (other feeds), with `LeadForm`.
9. `FAQList` (objections). FAQPage JSON-LD.
10. Related guides and data links (3 to 5 internal links).

### Guide page

`Breadcrumbs`, H1, `Byline`, `AnswerBlock` (the direct answer in the first screen), `KeyFacts` table, body sections (H2 per question), `CTABox` after the second H2 and at the end, `FAQList`, `SourcesList`. Article JSON-LD with `datePublished`, `dateModified`, `author`, `publisher`. One topic per guide. 900 to 1,800 words. Write from `facts.ts` only; mark anything not in it `[VERIFY]` and leave the page out of the sitemap.

### Data page

`Breadcrumbs`, H1, `StatHero` (headline count and "as of" date), `AnswerBlock`, borough table, sub-cycle or age-band table, `BarChart` (monthly trend), methodology section, limits section, `CTABox`, `SourcesList`, aggregate CSV download (counts only). Dataset JSON-LD (section 6). Reads `data/stats/<name>.json` at build time.

### Compare page

Honest table of Building Sauce against one named competitor: what each sells, triggers, contact type, price model, contract terms, coverage. A "Where they are the better choice" section is required. Every competitor fact carries a source link and a checked date. Andy reviews before publish.

### Home, Pricing, How it works, About, Free sample

Layouts described in the copy deck.

## 6. Technical SEO

- Metadata from frontmatter via the Metadata API: title (max 60 chars), description (max 155), canonical (absolute), Open Graph and Twitter cards.
- OG images generated per page with `next/og` at 1200x630: eyebrow, H1, wordmark. Landscape only.
- `app/sitemap.ts`: only pages with `phase` live and no placeholders, `lastModified` from frontmatter `updated`.
- `app/robots.ts`: allow all crawlers, disallow `/api/` and `/thanks`. Name and allow Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Claude-SearchBot, Applebot-Extended, Google-Extended. Point to the sitemap.
- One H1 per page. Heading order never skips a level.
- `lang="en-US"`.
- Internal linking: every guide links to its feed page and one data page; every feed page links to 3 guides; home links to every live feed, both data pages and the Local Law 11 guide. Descriptive anchor text, never "click here".
- 404 page with links to feeds and guides.
- Performance budget (mobile, Lighthouse): LCP under 2.0s, CLS under 0.05, total JS under 90KB gzip on content pages. Server components by default; client components only for the form and the nav dropdown. No hero image; illustrations as inline SVG.

JSON-LD (one `<script type="application/ld+json">` per type, generated from typed helpers in `lib/schema.ts`):

| Page | Types |
|---|---|
| Every page | `Organization` (name Building Sauce, url, logo, `parentOrganization` Antek Automation with address Chantry House, 38 Chantry Way, Andover SP10 1LZ, GB; `sameAs` LinkedIn page when it exists), `WebSite` |
| Feed pages | `Service` (serviceType, areaServed New York City, provider Organization), `Offer` with `UnitPriceSpecification` 400 USD, `billingDuration` P1M (live feed only), `FAQPage`, `BreadcrumbList` |
| Pricing | `Product` "Building Sauce Facade Feed" with `Offer` as above |
| Guides | `Article`, `FAQPage`, `BreadcrumbList` |
| Data pages | `Dataset` (name, description, `temporalCoverage`, `dateModified`, `spatialCoverage` New York City, `isBasedOn` the NYC Open Data and DOB source URLs, `creator` Organization, `license` link to Terms, `distribution` the aggregate CSV), `BreadcrumbList` |
| How it works | `WebPage` with `about` and `mentions` for each public source |

Validate every type with the Schema.org validator and Google Rich Results Test. No fake reviews or ratings, ever.

## 7. GEO (AI search)

1. **Facts file.** `content/facts.ts` exports every regulatory fact as an object: `id`, `text`, `value`, `sourceName`, `sourceUrl`, `checked` (date), `confidence` (`high` or `verify`). Components (`DeadlineRows`, `KeyFacts`, `AnswerBlock`) render from it. Build fails if a page in the sitemap uses a `verify` fact. Seed it from the fact table in the copy deck, section F.
2. **Answer first.** Every feed, guide and data page opens with an `AnswerBlock`: the direct answer in 40 to 60 words, the date, the source. AI engines quote the first third of a page most.
3. **Dates everywhere.** "Last checked" on facts, "as of" on counts, "updated" in the byline and in `dateModified`.
4. **Entity consistency.** One description of Building Sauce, used word for word in the home `AnswerBlock`, the Organization schema, llms.txt, the footer and the LinkedIn page: "Building Sauce is a weekly lead feed for contractors. Each row is a New York City building with a dated public record that calls for work, plus the registered owner entity and managing agent. It is run by Antek Automation."
5. **llms.txt** at `/llms.txt`: H1, the entity description, then markdown links to every live feed, guide and data page with one-line summaries. Generated from the same content index as the sitemap. Low expected lift; it takes five minutes.
6. **Citable data.** The two data pages are the main GEO asset: own counts nobody else publishes, refreshed weekly, with method and limits.
7. **Cloudflare settings (Andy, in the dashboard):** Email Obfuscation off, AI bot blocking off, Bot Fight Mode checked against Googlebot and the AI bots above, records pointing to Vercel set to DNS only.
8. **Off-site (not code, listed for the plan):** LinkedIn company page, Reddit answers in r/Construction and r/PropertyManagement with data and no pitch, data pitches to Habitat, NYREJ, The Real Deal and Brick Underground once the FISP data page has eight weeks of history, G2 or Capterra listing. Monthly prompt check in ChatGPT, Perplexity, Gemini and Google AI Overviews with a fixed prompt list (copy deck section G).

## 8. Data page pipeline

The `antek-leads` CLI writes aggregate stats weekly and commits them to this repo. A push triggers the deploy. Files and shapes:

`data/stats/fisp.json`
```json
{
  "as_of": "2026-11-05",
  "source_note": "NYC Open Data, DOB NOW: Safety facades filings",
  "cycle10_initial": { "unsafe": 576, "swarmp": 715, "safe": 1499 },
  "last_12_months": { "from": "2025-11-01", "to": "2026-10-31", "unsafe_initial": 315, "swarmp_initial": 408 },
  "by_borough": [ { "borough": "Manhattan", "unsafe": null, "swarmp": null } ],
  "by_subcycle": [ { "subcycle": "10A", "unsafe": null, "swarmp": null } ],
  "monthly": [ { "month": "2026-10", "unsafe_initial": null, "swarmp_initial": null } ]
}
```

`data/stats/sheds.json`
```json
{
  "as_of": null,
  "total_active": null,
  "age_bands": [ { "band": "under 90 days", "count": null } ],
  "by_borough": [],
  "external_benchmark": { "text": "7,859 sidewalk sheds citywide, 372 up more than five years", "source": "Habitat, citing city data", "date": "2026-03-09" }
}
```

The seed values above are Andy's counts from 5 Nov 2026. Nulls are filled by the CLI. A data page with nulls in its headline fields stays out of the sitemap. Never add address, BBL, BIN, owner or contact fields to these files.

## 9. Forms and lead handling

`LeadForm` posts to `/api/lead`. Payload:

```json
{
  "formType": "sample | waitlist | contact",
  "trade": "facade | garage | gas | boiler | mold | roofing | florida | other",
  "name": "", "firm": "", "email": "", "phone": "", "borough": "", "role": "", "message": "",
  "page": "/facade-restoration-leads",
  "utm": { "source": "", "medium": "", "campaign": "", "content": "" },
  "submittedAt": "ISO date"
}
```

- Route handler: validate with zod, reject honeypot hits silently, verify Turnstile, sign the body with an HMAC header using `N8N_LEAD_WEBHOOK_SECRET`, POST to n8n, redirect to `/thanks?type=...`.
- Capture UTM params on landing (first-touch, sessionStorage) and send them with the form.
- Free-mail addresses (gmail, yahoo, hotmail, aol, outlook) are allowed but flagged `freeMail: true` in the payload.
- n8n side (not in this repo, listed so the payload fits): stop-list Gate first, then create or update the GHL contact in the Building Sauce sub-account with tags `bs-sample` or `bs-waitlist-<trade>`, notify Andy. The sample is sent by Andy after he approves it. Nothing is sent automatically.
- `/thanks` copy by type is in the copy deck. noindex.

## 10. Legal and compliance

- Footer operator line on every page (copy deck).
- `/terms` and `/privacy` ship as drafts marked DRAFT in an HTML comment only, with the clauses listed in the copy deck. Andy gets them checked before paid launch.
- Privacy page names the processors: Cloudflare, the host, n8n (self-hosted), GoHighLevel, Stripe.
- No cookie banner needed while analytics stay cookieless. If GA4 is ever added, add consent first.

## 11. Acceptance tests (all must pass before Andy is asked to deploy)

1. `npm run build` passes with no type errors.
2. `npm run check:copy` (write this script) fails on: em dash, exclamation mark in rendered text, the word "Ltd" next to Antek, any `[` placeholder pattern on a sitemap page, any `verify` fact on a sitemap page.
3. Lighthouse mobile on home, facade, one guide, one data page: Performance 95+, Accessibility 95+, Best Practices 100, SEO 100.
4. Playwright screenshots at 390, 768, 1440 for every phase 1 page; no horizontal scroll except the capability table wrapper.
5. Every JSON-LD block validates.
6. Every external source link returns 200 (script, run locally).
7. Form posts to a local mock webhook with the right payload and HMAC; honeypot and Turnstile failures do not post.
8. `robots.txt`, `sitemap.xml` and `llms.txt` render and list only live pages.
9. Keyboard-only run through nav, FAQ and form. Visible focus states.
10. Write `HANDOVER.md`: how to add a guide, how to update a fact, how the weekly stats commit works, env vars, deploy steps.

## 12. Order of work

1. Scaffold, design tokens from `design-ref/`, components, `facts.ts`, schema helpers.
2. Phase 1 pages from the copy deck. Run checks. Preview deploy. Stop for Andy's review.
3. Phase 2: data pages (with seed JSON), Local Law 11 cluster, sidewalk shed pages, Local Law 152 guide, garage and gas waitlist pages, construction leads pillar.
4. Phase 3: remaining feeds, guides and compare pages.

## Appendix A: WordPress route (only if Andy chooses it over Next.js)

Reuse what worked on We Plumb It, not its look.

- New block theme `buildingsauce` styled from the mockup, with the components above built as native, content-locked block patterns (not Custom HTML). Do not copy the We Plumb It visual design.
- Fork `weplumbit-core` to `buildingsauce-core`: keep the settings page, schema from settings, llms.txt, robots, FAQ block and CF7 setup. Add Service, Offer, Dataset and Article schema types, and the facts store as a JSON option with an admin screen.
- Forms: Contact Form 7, with a `wpcf7_mail_sent` hook in the core plugin that `wp_remote_post`s the same JSON payload (section 9) to n8n with the HMAC header. Add Turnstile (Simple Cloudflare Turnstile plugin) and the CF7 honeypot.
- Data pages: a custom REST route in the core plugin (`/wp-json/bs/v1/stats/<name>`, authenticated with an application password) that n8n PUTs the weekly JSON to. A dynamic block renders the tables and SVG chart from it.
- Hosting: Contabo via Coolify or the IONOS Plesk box, PHP 8.3 (Contact Form 7 6.2 needs it), Cloudflare in front.
- Carry over the We Plumb It gotchas: set the WP Site Title before launch (it feeds og:site_name), keep editor notes out of content blocks, delete Hello World, turn off Cloudflare Email Obfuscation and AI bot blocking.
