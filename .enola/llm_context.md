# Architecture Snapshot

## Repository Map

| Module | Language | Symbols | Exported |
|--------|----------|---------|----------|
| `.` | typescript | 4 | 3 |
| `app` | typescript | 10 | 7 |
| `app/[slug]` | typescript | 3 | 3 |
| `app/about` | typescript | 3 | 2 |
| `app/api/lead` | typescript | 4 | 1 |
| `app/compare` | typescript | 3 | 2 |
| `app/compare/[slug]` | typescript | 3 | 3 |
| `app/construction-leads` | typescript | 3 | 2 |
| `app/data` | typescript | 3 | 2 |
| `app/data/[slug]` | typescript | 5 | 3 |
| `app/data/[slug]/download` | typescript | 2 | 2 |
| `app/free-sample` | typescript | 3 | 2 |
| `app/guides` | typescript | 3 | 2 |
| `app/guides/[slug]` | typescript | 3 | 3 |
| `app/how-it-works` | typescript | 5 | 3 |
| `app/llms.txt` | typescript | 1 | 1 |
| `app/og` | typescript | 2 | 1 |
| `app/pricing` | typescript | 4 | 2 |
| `app/privacy` | typescript | 2 | 2 |
| `app/terms` | typescript | 2 | 2 |
| `app/thanks` | typescript | 3 | 2 |
| `components` | typescript | 46 | 38 |
| `content` | typescript | 48 | 36 |
| `lib` | typescript | 42 | 34 |
| `scripts` | typescript | 18 | 0 |

## Extraction Quality

- Files parsed: **80** / 209 seen (2 file(s) + 3 directory tree(s) skipped by ignore globs)
- Parse errors: 0

## Architecture Pattern

**Architecture pattern: nextjs** (confidence: 88%)

Recognised nextjs from directory names: 22 of 25 typescript modules classified. All 139 imports between ordered layers run inward; none run against the order.

Layer mapping:
- module "app" maps to layer "pages"
- module "app/[slug]" maps to layer "pages"
- module "app/about" maps to layer "pages"
- module "app/api/lead" maps to layer "pages"
- module "app/compare" maps to layer "pages"
- module "app/compare/[slug]" maps to layer "pages"
- module "app/construction-leads" maps to layer "pages"
- module "app/data" maps to layer "pages"
- module "app/data/[slug]" maps to layer "pages"
- module "app/data/[slug]/download" maps to layer "pages"
- module "app/free-sample" maps to layer "pages"
- module "app/guides" maps to layer "pages"
- … and 10 more (query_insights(explainer="layers") for all)

## How to Add a Feature

This code is laid out as **nextjs**. A dependency runs from an outer layer to an inner one, so a feature is built inward:

1. **pages** — e.g. `app`
2. **components** — e.g. `components`
3. **lib** — e.g. `lib`

## Entry Points

- **main**: `scripts.main` (scripts/check-copy.ts)
- **main**: `scripts.main` (scripts/check-links.ts)
25 routes, 15 shown:
- **route** ALL `/api/lead` (app/api/lead/route.ts)
- **route** ALL `/data/[slug]/download` (app/data/[slug]/download/route.ts)
- **route** ALL `/llms.txt` (app/llms.txt/route.ts)
- **route** ALL `/og` (app/og/route.tsx)
- **route** GET `/[slug]` (app/[slug]/page.tsx)
- **route** GET `/` (app/layout.tsx)
- **route** GET `/` (app/page.tsx)
- **route** GET `/about` (app/about/page.tsx)
- **route** GET `/compare/[slug]` (app/compare/[slug]/page.tsx)
- **route** GET `/compare` (app/compare/page.tsx)
- **route** GET `/construction-leads` (app/construction-leads/page.tsx)
- **route** GET `/data/[slug]` (app/data/[slug]/page.tsx)
- **route** GET `/data` (app/data/page.tsx)
- **route** GET `/free-sample` (app/free-sample/page.tsx)
- **route** GET `/guides/[slug]` (app/guides/[slug]/page.tsx)
- … and 10 more (query_facts(kind="route") for all)

## Routes

| Method | Path | File | Type |
|--------|------|------|------|
| GET | `/` | `app/layout.tsx` | layout |
| GET | `/` | `app/page.tsx` | page |
| GET | `/[slug]` | `app/[slug]/page.tsx` | page |
| GET | `/about` | `app/about/page.tsx` | page |
| ALL | `/api/lead` | `app/api/lead/route.ts` | route |
| POST | `/api/lead` | `components/LeadForm.tsx` |  |
| GET | `/compare` | `app/compare/page.tsx` | page |
| GET | `/compare/[slug]` | `app/compare/[slug]/page.tsx` | page |
| GET | `/construction-leads` | `app/construction-leads/page.tsx` | page |
| GET | `/data` | `app/data/page.tsx` | page |
| GET | `/data/[slug]` | `app/data/[slug]/page.tsx` | page |
| ALL | `/data/[slug]/download` | `app/data/[slug]/download/route.ts` | route |
| GET | `/free-sample` | `app/free-sample/page.tsx` | page |
| GET | `/guides` | `app/guides/page.tsx` | page |
| GET | `/guides/[slug]` | `app/guides/[slug]/page.tsx` | page |
| GET | `/how-it-works` | `app/how-it-works/page.tsx` | page |
| ALL | `/llms.txt` | `app/llms.txt/route.ts` | route |
| GET | `/llms.txt` | `scripts/check-copy.ts` |  |
| ALL | `/og` | `app/og/route.tsx` | route |
| GET | `/pricing` | `app/pricing/page.tsx` | page |
| GET | `/privacy` | `app/privacy/page.tsx` | page |
| GET | `/robots.txt` | `scripts/check-copy.ts` |  |
| GET | `/sitemap.xml` | `scripts/check-copy.ts` |  |
| GET | `/terms` | `app/terms/page.tsx` | page |
| GET | `/thanks` | `app/thanks/page.tsx` | page |

## Dependency Rules

- `.` -> `content`
- `.` -> `lib`
- `app/compare` -> `content`
- `app/compare` -> `lib`
- `app/data/[slug]` -> `content`
- `app/data/[slug]` -> `lib`
- `app/data` -> `content`
- `app/data` -> `lib`
- `app/guides` -> `lib`
- `app` -> `content`
- `app` -> `lib`

## Critical Modules

| Module | Fan-In | Fan-Out | Criticality |
|--------|--------|---------|-------------|
| `lib` | 17 | 0 | high |
| `app` | 0 | 16 | high |
| `content` | 14 | 0 | high |
| `.` | 0 | 8 | medium |
| `app/compare` | 0 | 2 | low |
| `app/data` | 0 | 2 | low |
| `app/data/[slug]` | 0 | 2 | low |
| `app/guides` | 0 | 1 | low |

## Risk Zones

- **Cyclic dependency detected (2 modules)** (confidence: 100%): The following modules form a dependency cycle: content -> lib -> content. This can cause initialization issues, make refactoring harder, and indicates tight coupling.

---

*Generated at 2026-11-07T19:37:53Z in 5.470596291s. 786 facts, 13 insights.*
