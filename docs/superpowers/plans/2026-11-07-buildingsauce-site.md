# Building Sauce Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship buildingsauce.com: every page in the spec's site map (phases 1 to 3), statically generated, with facts-driven copy, JSON-LD, forms to n8n, data pages from JSON, and the acceptance checks passing.

**Architecture:** Next.js 16 App Router, all public pages static. One content registry (`content/registry.ts`) is the single index that sitemap, llms.txt, footer and nav read from; a page is "live" only when its phase is set, it has no `[PLACEHOLDER]` and uses no `verify` fact. Feeds and compare pages are typed TS objects rendered by one template each; guides are MDX with frontmatter; data pages read `data/stats/*.json` at build.

**Tech Stack:** Next 16.4 (cacheComponents on), React 19, TypeScript, Tailwind 4, next-mdx-remote 6, zod 4, Playwright, tsx.

**Spec:** `/Users/andrewnorman/dev/Building Sauce/Website/BUILD-PROMPT.md` and `COPY-DECK.md` (copied into `docs/spec/`). Decisions taken 7 Nov 2026 by Andy: cap 5 firms per feed; founding offer first 5 firms pay $300 a month for as long as they stay, firm 6 onward pays $400; quiet-month rule confirmed; byline "Building Sauce research desk" (D1 default); garages NEXT, mold PLANNED; all phases built now.

## Global Constraints

- US English, US dates (Feb 21, 2027), no em dashes, no exclamation marks, no hype words.
- Never "Ltd" or "Limited" after Antek Automation.
- Every regulatory fact rendered from `content/facts.ts`; never typed into copy.
- `[PLACEHOLDER]` or a `verify` fact on a page keeps it out of the sitemap and llms.txt.
- Public pages show aggregates only; no address, BBL, BIN, owner or contact from the feed.
- Square corners, no shadows, hairlines, Inter plus JetBrains Mono, max width 1120px, text 720px.
- Tokens: ink #141413, accent #B4431F, accent hover #8F3F2A, paper #F7F6F3, hairline #ECEAE6, dark rule #3A3833, body grey #4A4845, muted #6B6966, dark-band text #CDC5B5, dashed #CFCBC4.
- Server components by default; client only for `LeadForm` and nav dropdown. JS under 90KB gzip on content pages.
- Runs on Vercel and in Docker (`output: 'standalone'`).
- Entity description used word for word: "Building Sauce is a weekly lead feed for contractors. Each row is a New York City building with a dated public record that calls for work, plus the registered owner entity and managing agent. It is run by Antek Automation."

## Review Focus

1. A page with `[CAP]`-style placeholder anywhere in its rendered text appears in sitemap. Test: `check:copy` fetches every sitemap URL and fails on `/\[[A-Z][A-Z0-9 :,./$-]*\]/`.
2. A `verify` fact rendered on a sitemap page. Test: facts render `data-fact-confidence`; `check:copy` fails if `verify` found on a sitemap page.
3. Honeypot filled or Turnstile fails yet webhook still posts. Test: Playwright form spec against `scripts/mock-webhook.mjs` asserts zero posts.
4. `data/stats/*.json` headline null makes the page render "null". Test: `lib/stats.ts` unit check: `isDataPageLive()` false and StatHero not rendered when null.
5. Heading order skips a level (H1 then H3). Test: `check:copy` walks headings per page and fails on skips.

---

### Task 1: Tokens, layout, site constants, registry

**Files:** `app/globals.css`, `app/layout.tsx`, `next.config.ts`, `.env.example`, `content/site.ts`, `content/registry.ts`, `lib/placeholders.ts`, `public/logo/*`, `Dockerfile`.

**Produces:** `SITE` (url, name, entityDescription, operator address, email, price constants), `PAGES: PageEntry[]` with `{url,title,description,updated,phase,kind,draft?}` and `livePages()`.

- [ ] Write tokens as CSS variables and Tailwind `@theme`.
- [ ] Layout: Inter + JetBrains Mono via `next/font/google`, `lang="en-US"`, `SiteHeader`, `SiteFooter`, Organization + WebSite JSON-LD, CF beacon when `CF_ANALYTICS_TOKEN` set, GSC/Bing verification meta.
- [ ] `next.config.ts`: `output: 'standalone'`, redirects (www to apex, `/facade` etc to new slugs).
- [ ] Verify: `npm run build` passes.

### Task 2: Facts and schema helpers

**Files:** `content/facts.ts`, `lib/schema.ts`, `lib/seo.ts`.

**Produces:** `fact(id): Fact`, `FACTS`, `Fact = {id,text,value,sourceName,sourceUrl,checked,confidence}`; `orgSchema()`, `webSiteSchema()`, `serviceSchema(feed)`, `productSchema()`, `faqSchema(items)`, `breadcrumbSchema(items)`, `articleSchema(guide)`, `datasetSchema(data)`, `webPageSchema()`; `JsonLd` component; `pageMetadata(entry)` building title/description/canonical/OG/Twitter with OG image URL `/og?t=&e=`.

- [ ] Seed facts from copy deck section F with official source URLs.
- [ ] Verify: `npx tsx scripts/check-links.mjs` (Task 9) returns 200 for every `sourceUrl`.

### Task 3: Components

**Files:** `components/*.tsx` per spec table (SiteHeader, Eyebrow, Hero, SampleRowCard, AnswerBlock, DarkBand3, DeadlineRows, NeedPayoffBand, CapabilityTable, TrustTriplet, PricingBand, LeadForm (client), FeedCard, FAQList, KeyFacts, StatHero, BarChart, SourcesList, CTABox, Breadcrumbs, Byline, SiteFooter, Section, Prose).

- [ ] `FAQList` uses native `<details>` and emits FAQPage JSON-LD.
- [ ] `DeadlineRows`, `KeyFacts`, `AnswerBlock` render from facts with `data-fact-confidence`.
- [ ] `LeadForm`: honeypot `company_website`, Turnstile widget when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` set, UTM from sessionStorage, posts JSON to `/api/lead`, navigates to `/thanks?type=`.
- [ ] Verify: build passes; `/` renders at 390/768/1440 with no horizontal scroll (Task 10).

### Task 4: Phase 1 pages

**Files:** `app/page.tsx`, `app/[slug]/page.tsx` (feeds), `content/feeds.ts`, `app/free-sample`, `app/pricing`, `app/how-it-works`, `app/about`, `app/thanks`, `app/terms`, `app/privacy`, `app/not-found.tsx`, `app/api/lead/route.ts`, `app/og/route.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`.

**Produces:** `FeedPage` type and `FEEDS` array (all seven feeds, facade live).

- [ ] Feed template in SPIN order per spec section 5.
- [ ] Route handler: zod validate, honeypot silent 200, Turnstile verify, `freeMail` flag, HMAC `X-Signature: sha256=<hex>` over raw body with `N8N_LEAD_WEBHOOK_SECRET`, POST to `N8N_LEAD_WEBHOOK_URL`, 303 to `/thanks?type=`.
- [ ] Verify: `npm run build`; `curl -X POST localhost:3000/api/lead` with mock webhook (Task 9) shows signed payload.

### Task 5: Data pages

**Files:** `data/stats/{fisp,sheds,garages}.json`, `lib/stats.ts`, `app/data/page.tsx`, `app/data/[slug]/page.tsx`, `app/data/[slug]/download/route.ts`.

- [ ] Seed JSON from spec section 8 (garages: as_of 2026-11-05, total_active 1550).
- [ ] Page: Breadcrumbs, H1, StatHero, AnswerBlock, borough table, sub-cycle or age-band table, BarChart (SVG, table fallback), method, limits, CTABox, SourcesList, CSV link, Dataset JSON-LD.
- [ ] `isDataPageLive(slug)` false when any headline field null (sheds stays out).

### Task 6: Guides (MDX)

**Files:** `lib/mdx.ts`, `app/guides/page.tsx`, `app/guides/[slug]/page.tsx`, `app/construction-leads/page.tsx`, `content/guides/*.mdx` (local-law-11, fisp-cycle-10-deadlines, swarmp-vs-unsafe, local-law-11-penalties, sidewalk-shed-rules, local-law-152, local-law-126, nyc-boiler-inspection, florida-milestone-inspection, florida-sirs-deadline, construction-leads).

**Frontmatter:** `title, description, h1, updated, phase, primaryKeyword, answer, answerSource (fact id or {name,url}), facts: [ids], feed: /slug, data: /data/slug, faq: [{q,a}], sources: [{name,url,checked}]`.

- [ ] MDX components: `AnswerBlock`, `KeyFacts`, `CTABox`, `FAQList`, `SourcesList`, `F` (inline fact value), `Table`.
- [ ] 900 to 1,800 words, H2 per question, facts via `<F id="..."/>` only.
- [ ] Guides using any `verify` fact drop out of sitemap automatically.
- [ ] Verify: `check:copy` passes for each guide in sitemap.

### Task 7: Compare pages

**Files:** `content/compare.ts`, `app/compare/page.tsx`, `app/compare/[slug]/page.tsx` (fieldclients, shovels, constructconnect, dodge). All `draft: true` until Andy reviews.

- [ ] Each row has `source` and `checked`; required section "Where they are the better choice".

### Task 8: Pipeline docs and handover

**Files:** `HANDOVER.md`, `README.md`, `docs/spec/*` (copied).

### Task 9: Check scripts

**Files:** `scripts/check-copy.mjs`, `scripts/check-links.mjs`, `scripts/mock-webhook.mjs`, `package.json` scripts `check:copy`, `check:links`, `test:e2e`.

- [ ] `check:copy`: starts `next start -p 3999`, reads sitemap, fetches each page, strips tags, fails on em dash, `!` in text, "Antek Automation Ltd|Limited", placeholder pattern, `data-fact-confidence="verify"`, heading skips, missing single H1. Also scans every registry page (not only sitemap) for em dash and `!`.
- [ ] `check:links`: GET every `sourceUrl` in facts and every source in guides/compare; non-200 fails.

### Task 10: Playwright

**Files:** `playwright.config.ts`, `tests/screenshots.spec.ts`, `tests/form.spec.ts`.

- [ ] Screenshots at 390, 768, 1440 for every live page into `tests/screenshots/`; assert `document.scrollingElement.scrollWidth <= innerWidth`.
- [ ] Form: fill and submit sample form, assert mock webhook received one signed POST; honeypot filled asserts zero posts.
