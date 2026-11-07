import type { PageEntry } from "./types";
import { FEEDS } from "./feeds";
import { COMPARE } from "./compare";
import { SITE } from "./site";
import { verifyFacts } from "./facts";
import { objectHasPlaceholder, findPlaceholders } from "@/lib/placeholders";
import { listGuides, guideBlockers } from "@/lib/mdx";
import { isDataPageLive, dataPageUpdated } from "@/lib/stats";

/**
 * The one index of every page. sitemap.ts, llms.txt, the guides and data
 * hubs, and HANDOVER all read from here. A page is `live` only when it may be
 * listed publicly: no placeholder, no `verify` fact, not a draft, headline
 * data present.
 */

const STATIC: Omit<PageEntry, "live" | "blockers">[] = [
  {
    url: "/",
    title: "NYC Construction Leads From Public Records | Building Sauce",
    description:
      "Weekly lists of NYC buildings with a dated City filing that calls for work, plus the managing agent to call. Built for contractors. $400 a month.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "home",
    summary: "What Building Sauce is, the feeds, and how a row is built.",
  },
  {
    url: "/free-sample",
    title: "Free Sample: Last Week's NYC Facade Leads | Building Sauce",
    description:
      "Ten real NYC buildings from last week's facade feed, with filing dates, permit status and the managing agent. Free, once per firm, no card.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "Request last week's facade list free, once per firm.",
  },
  {
    url: "/pricing",
    title: "Pricing: $400 a Month Per Feed | Building Sauce",
    description:
      "One feed, one trade, one city: $400 a month, month to month, paid by card. No setup fee, no contract. Start with a free sample of last week's list.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "One price per feed, month to month, founding offer for the first five firms.",
  },
  {
    url: "/how-it-works",
    title: "How Building Sauce Builds Each List: Sources and Checks",
    description:
      "The public NYC records behind every Building Sauce row, how we match them by building, how we check the decider, and the rules we won't break.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "The public sources, the seven steps, and what we never do.",
  },
  {
    url: "/about",
    title: "About Building Sauce | Run by Antek Automation",
    description:
      "Building Sauce is a contractor lead feed built from public NYC records, run by Antek Automation, a UK data and automation business.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "Who runs Building Sauce and how to reach them.",
  },
  {
    url: "/guides",
    title: "NYC Compliance Guides for Contractors | Building Sauce",
    description:
      "Plain guides to the NYC rules that create repair work: Local Law 11, FISP cycles, SWARMP, sidewalk sheds, Local Law 152 and more. Dated and sourced.",
    updated: SITE.buildDate,
    phase: 2,
    kind: "page",
    summary: "Index of the guides.",
  },
  {
    url: "/data",
    title: "NYC Building Compliance Data, Updated Weekly | Building Sauce",
    description:
      "Weekly counts of NYC facade Unsafe filings, sidewalk sheds and parking garage conditions from DOB records. Aggregates only, with method and limits.",
    updated: SITE.buildDate,
    phase: 2,
    kind: "page",
    summary: "Index of the data pages.",
  },
  {
    url: "/compare",
    title: "Construction Lead Services Compared | Building Sauce",
    description:
      "Honest comparisons of Building Sauce with FieldClients, Shovels, ConstructConnect and Dodge: what each sells, price model, contract terms and who each suits.",
    updated: SITE.buildDate,
    phase: 3,
    kind: "page",
    summary: "Index of the comparison pages.",
  },
  {
    url: "/terms",
    title: "Terms of Service | Building Sauce",
    description: "Terms for the Building Sauce lead feed: public-record data supplied as is, monthly billing, cancellation, no resale.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "Terms of service.",
  },
  {
    url: "/privacy",
    title: "Privacy Policy | Building Sauce",
    description: "What the Building Sauce forms collect, who processes it, how long it is kept, and how to contact us.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "Privacy policy.",
  },
  {
    url: "/thanks",
    title: "Thanks | Building Sauce",
    description: "Form received.",
    updated: SITE.buildDate,
    phase: 1,
    kind: "page",
    summary: "",
    noindex: true,
  },
];

const DATA_PAGES = [
  {
    slug: "fisp-unsafe-buildings",
    stats: "fisp" as const,
    title: "NYC Unsafe Facade Filings (FISP), Updated Weekly",
    description:
      "How many NYC buildings filed an Unsafe or SWARMP facade report this cycle, by borough and sub-cycle, updated every week from DOB records.",
    summary: "Weekly count of initial Unsafe and SWARMP facade filings in FISP Cycle 10.",
  },
  {
    slug: "nyc-sidewalk-sheds",
    stats: "sheds" as const,
    title: "NYC Sidewalk Sheds by Age: Weekly Count",
    description:
      "How many sidewalk sheds are up in NYC and how long they have been up, by age band and borough, updated weekly from DOB permit records.",
    summary: "Weekly count of active sidewalk sheds by age band and borough.",
  },
  {
    slug: "nyc-parking-garages",
    stats: "garages" as const,
    title: "NYC Parking Garages With Unsafe or SREM Status",
    description:
      "How many NYC parking structures have an active Unsafe or SREM condition assessment on file under Local Law 126, by borough, updated weekly.",
    summary: "Weekly count of parking structures with an active Unsafe or SREM filing status.",
  },
];

export function dataPageMeta(slug: string) {
  return DATA_PAGES.find((d) => d.slug === slug);
}

export function buildRegistry(): PageEntry[] {
  const pages: PageEntry[] = [];

  for (const s of STATIC) {
    pages.push({ ...s, live: !s.noindex, blockers: s.noindex ? ["noindex"] : [] });
  }

  for (const f of FEEDS) {
    const blockers: string[] = [];
    if (objectHasPlaceholder(f)) blockers.push(`placeholders: ${findPlaceholders(JSON.stringify(f)).join(", ")}`);
    const v = verifyFacts(f.deadlines?.rows.map((r) => r.factId) ?? []);
    if (v.length) blockers.push(`verify facts: ${v.join(", ")}`);
    pages.push({
      url: `/${f.slug}`,
      title: f.title,
      description: f.description,
      updated: f.updated,
      phase: f.phase,
      kind: "feed",
      summary: f.description,
      live: blockers.length === 0,
      blockers,
    });
  }

  for (const g of listGuides()) {
    const blockers = guideBlockers(g);
    pages.push({
      url: g.url,
      title: g.fm.title,
      description: g.fm.description,
      updated: g.fm.updated,
      phase: g.fm.phase,
      kind: "guide",
      summary: g.fm.description,
      live: blockers.length === 0,
      blockers,
    });
  }

  for (const d of DATA_PAGES) {
    const live = isDataPageLive(d.stats);
    pages.push({
      url: `/data/${d.slug}`,
      title: d.title,
      description: d.description,
      updated: dataPageUpdated(d.stats),
      phase: 2,
      kind: "data",
      summary: d.summary,
      live,
      blockers: live ? [] : ["headline counts not yet filled in data/stats"],
    });
  }

  for (const c of COMPARE) {
    const blockers: string[] = [];
    if (c.draft) blockers.push("draft: Andy reviews before publish");
    if (objectHasPlaceholder(c)) blockers.push("placeholders");
    pages.push({
      url: `/compare/${c.slug}`,
      title: c.title,
      description: c.description,
      updated: c.updated,
      phase: 3,
      kind: "compare",
      summary: c.description,
      live: blockers.length === 0,
      blockers,
    });
  }

  return pages;
}

export function livePages(): PageEntry[] {
  return buildRegistry().filter((p) => p.live);
}
