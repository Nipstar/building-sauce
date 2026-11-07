# Guide writing brief (for parallel writers)

You are writing one or more guide pages for buildingsauce.com as MDX files in `content/guides/<slug>.mdx`. The repo is `/Users/andrewnorman/dev/buildingsauce-site`.

## Read first, in this order

1. This file.
2. `content/guides/local-law-11.mdx`: the exemplar. Match its frontmatter shape, tone and structure exactly.
3. `content/facts.ts`: every regulatory fact you may use, by id. Read the whole file.
4. `lib/mdx.ts`: the frontmatter schema (zod). Title max 60 characters, description max 155.
5. `docs/spec/COPY-DECK.md` section E4 (guides) and E2 (construction leads pillar): the outline, AnswerBlock text, keywords and notes for your guide. Use the AnswerBlock text given there as the `answer` frontmatter (adjust only to fit 40 to 60 words and to match facts.ts).
6. `docs/spec/KEYWORDS.csv`: the keywords mapped to your URL. Use them naturally in H2s and body, never stuffed.

## Hard rules

- US English. US dates: `Feb 21, 2027`. No em dashes (the character `—`), no exclamation marks, no hype words (revolutionary, game-changing, unlock, seamless). Never write "Ltd" or "Limited" after Antek Automation.
- Voice: plain, specific, a bit dry. Talks like an estimator, not a marketer. Records, not opinions. Short sentences. See `docs/spec/COPY-DECK.md` section B.
- Every regulatory date, penalty, threshold, count or deadline comes from `content/facts.ts`, referenced inline as `<F id="fact_id" />` (renders the short value) or `<F id="fact_id" mode="text" />` (renders the full sentence). Never type a figure by hand. If you need a fact that is not in facts.ts, do NOT add it to facts.ts (other writers are editing in parallel). Either write around it, or write `[VERIFY: what you need and the likely source]` in the body and list it in your final report. A page with a placeholder is kept out of the sitemap automatically, so prefer writing around it when the guide still answers its question without that fact.
- Do not use facts whose confidence is `verify` (currently `shed_lf` and `habitat_sheds`). Using one keeps the page out of the sitemap.
- Frontmatter `facts:` lists the ids the KeyFacts table shows at the top (6 to 12 of the most useful). Any `<F>` used in the body is also allowed even if not in that list.
- Structure: no H1 in the body (the template renders it). H2 per question, 4 to 8 of them. One `<CTA />` on its own line after the second H2 section (before the third H2). Markdown tables are fine (GFM). Internal links in markdown to other site pages: feeds `/facade-restoration-leads`, `/parking-garage-leads`, `/gas-piping-leads`, `/boiler-repair-leads`, `/mold-remediation-leads`, `/commercial-roofing-leads`, `/florida-condo-leads`; guides `/guides/local-law-11`, `/guides/fisp-cycle-10-deadlines`, `/guides/swarmp-vs-unsafe`, `/guides/local-law-11-penalties`, `/guides/sidewalk-shed-rules`, `/guides/local-law-152`, `/guides/local-law-126`, `/guides/nyc-boiler-inspection`, `/guides/florida-milestone-inspection`, `/guides/florida-sirs-deadline`, `/construction-leads`; data `/data/fisp-unsafe-buildings`, `/data/nyc-sidewalk-sheds`, `/data/nyc-parking-garages`; `/how-it-works`, `/pricing`, `/free-sample`. Link to at least two related guides and the matching feed.
- 900 to 1,800 words of body. One topic per guide. Answer first: the first H2 should answer the main question directly.
- FAQ: 4 to 6 items in frontmatter, each answer 1 to 3 sentences, facts consistent with facts.ts (type the figures here as they appear in facts.ts; the FAQ renders as plain text and JSON-LD).
- Sources: official first (nyc.gov, leg.state.fl.us), then others. Use the exact `sourceUrl` values from facts.ts for the facts you used. `checked: "2026-11-07"`.
- `feed:` and `feedLabel:` point to the matching feed page. `data:` and `dataLabel:` to a data page when one fits (facade and shed guides: `/data/fisp-unsafe-buildings` or `/data/nyc-sidewalk-sheds`; garage guide: `/data/nyc-parking-garages`; others omit).
- Never mention building addresses, owner names or any specific property. Public pages show aggregates and rules only.
- No method detail about how Building Sauce joins or scores data beyond what `/how-it-works` says. Name public sources, not join logic.
- The `construction-leads` guide uses `url: "/construction-leads"` in frontmatter (it lives at the site root). Every other guide omits `url`.

## Validate

After writing each file run, from the repo root:

```
npx tsx scripts/check-guide.ts <slug>
```

It must print `OK`. Fix anything it lists. Do NOT run `npm run build` or `next dev` (another process owns the build). Do not commit.

## Report back

A short list: each slug, word count, the check-guide result, and any `[VERIFY ...]` placeholders you had to leave with the fact and source you think resolves them.
