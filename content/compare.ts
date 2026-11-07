import type { ComparePage } from "./types";

/**
 * Honest comparisons. Every competitor fact carries a source and a checked
 * date. All pages are draft until Andy reviews them (draft: true keeps them
 * out of the sitemap and llms.txt). Re-check every vendor page before publish.
 */

const CHECKED = "2026-11-07";
const UPDATED = "2026-11-07";

const US = {
  sells: "A weekly list of NYC buildings with a dated public filing that calls for work, plus the registered owner entity and managing agent",
  triggers: "FISP Unsafe and SWARMP filings, sidewalk sheds with no repair permit, Local Law 126 garage conditions (next), Local Law 152 due lists (2027)",
  contact: "Registered owner entity, managing agent and head officer from the HPD registration, accepted only when it post-dates the last deed. Office lines only",
  price: "$400 a month per feed, month to month. First 5 firms pay $300 for as long as they stay",
  contract: "None. Cancel by replying to any invoice",
  coverage: "New York City, all five boroughs. Florida condos planned",
  delivery: "Email, CSV and a web page every Monday at 7am Eastern. No portal",
  exclusivity: "Shared list capped at 5 firms per feed. Exclusivity not sold",
};

const COMMON_FAQ = [
  {
    q: "Is this comparison independent?",
    a: "No. Building Sauce wrote it. Every competitor fact links to the competitor's own page with the date we checked it. If something has changed, email hello@buildingsauce.com and we will correct it.",
  },
  {
    q: "Can I use both?",
    a: "Often, yes. Most services here sell a different kind of lead. A permit or bid feed and a compliance-trigger feed cover different stages of the same job.",
  },
];

export const COMPARE: ComparePage[] = [
  {
    slug: "fieldclients",
    competitor: "FieldClients",
    competitorUrl: "https://www.fieldclients.com/",
    title: "Building Sauce vs FieldClients: NYC Signal Leads Compared",
    description:
      "Both sell NYC building signals from DOB, HPD and ACRIS matched to the owner. Here is where they differ: checks, scoring, price model and who each suits.",
    h1: "Building Sauce vs FieldClients",
    updated: UPDATED,
    intro:
      "FieldClients is the closest thing to Building Sauce on the market: NYC signal leads from DOB, HPD, FISP and ACRIS records, matched to the HPD owner or agent. The difference is in what gets checked before a row is sent, how rows are scored, and how the price works.",
    rows: [
      {
        label: "What it sells",
        us: US.sells,
        them: "NYC property signals from DOB, HPD, FISP and ACRIS records, matched to the HPD-registered owner or managing agent",
        source: "https://www.fieldclients.com/",
        checked: CHECKED,
      },
      {
        label: "Triggers",
        us: US.triggers,
        them: "FISP and Local Law 126 filings, violations and related DOB signals, across several trades",
        source: "https://www.fieldclients.com/",
        checked: CHECKED,
      },
      {
        label: "Contact type",
        us: US.contact,
        them: "HPD-registered owner or managing agent",
        source: "https://www.fieldclients.com/",
        checked: CHECKED,
      },
      {
        label: "Checks before a row is sent",
        us: "Repair permit check (no contractor on record), deed date check on the registration, public-owner and small-home filters, record ID on every row",
        them: "Not stated on the public site at the time of checking",
        source: "https://www.fieldclients.com/",
        checked: CHECKED,
      },
      {
        label: "Price model",
        us: US.price,
        them: "Public pricing was inconsistent when checked, showing both a from $99 a month entry point and a $2,000 a month figure on different pages",
        source: "https://www.fieldclients.com/",
        checked: CHECKED,
      },
      { label: "Contract terms", us: US.contract, them: "Not stated on the public site at the time of checking", source: "https://www.fieldclients.com/", checked: CHECKED },
      { label: "Coverage", us: US.coverage, them: "New York City", source: "https://www.fieldclients.com/", checked: CHECKED },
      { label: "Delivery", us: US.delivery, them: "Web platform", source: "https://www.fieldclients.com/", checked: CHECKED },
    ],
    theyAreBetter: [
      "You want several trades and signal types in one platform rather than one feed per trade.",
      "You want to log in and filter a database yourself rather than receive a fixed weekly list.",
      "You want a lower entry price and are happy to do your own permit and deed checks.",
    ],
    weAreBetter: [
      "You want every row pre-checked for an open permit and a deed-dated registration, with the record ID to verify it.",
      "You want one trade, one trigger, one city, every Monday, with a 1 to 5 score and a suggested opener.",
      "You want a flat month-to-month price with no platform to learn.",
    ],
    faq: [
      ...COMMON_FAQ,
      {
        q: "Why is FieldClients' price shown two ways?",
        a: "When we checked on Nov 7, 2026, different pages on their site showed different figures. We have reported both rather than guess. Check their site for the current price.",
      },
    ],
    sources: [{ name: "FieldClients website", url: "https://www.fieldclients.com/", checked: CHECKED }],
    draft: true,
  },
  {
    slug: "shovels",
    competitor: "Shovels",
    competitorUrl: "https://www.shovels.ai/",
    title: "Building Sauce vs Shovels: Permit Data vs Compliance Leads",
    description:
      "Shovels sells national permit and contractor data through a platform and API. Building Sauce sells pre-permit NYC compliance triggers. Different stages of the same job.",
    h1: "Building Sauce vs Shovels",
    updated: UPDATED,
    intro:
      "Shovels is a national permit and contractor data product with an API. It is good at telling you what has been permitted and who pulled the permit. Building Sauce is built for the stage before that: a filed condition with no repair permit yet.",
    rows: [
      { label: "What it sells", us: US.sells, them: "National building permit and contractor data, searchable in a platform and via API", source: "https://www.shovels.ai/", checked: CHECKED },
      { label: "Triggers", us: US.triggers, them: "Issued and applied-for permits, contractor activity", source: "https://www.shovels.ai/", checked: CHECKED },
      { label: "Contact type", us: US.contact, them: "Contractor and permit applicant details as filed on permits; owner data where available", source: "https://www.shovels.ai/", checked: CHECKED },
      { label: "Price model", us: US.price, them: "Basic $599 a month, Pro $999 a month when checked", source: "https://www.shovels.ai/pricing", checked: CHECKED },
      { label: "Contract terms", us: US.contract, them: "Monthly plans listed; check the pricing page for current terms", source: "https://www.shovels.ai/pricing", checked: CHECKED },
      { label: "Coverage", us: US.coverage, them: "National (United States)", source: "https://www.shovels.ai/", checked: CHECKED },
      { label: "Delivery", us: US.delivery, them: "Web platform and API", source: "https://www.shovels.ai/", checked: CHECKED },
    ],
    theyAreBetter: [
      "You sell in more than one city or state.",
      "You want to find contractors, not building owners, for example to sell them materials or services.",
      "You need an API or bulk data rather than a weekly list.",
    ],
    weAreBetter: [
      "You want to reach the owner before a permit exists, not after.",
      "You work NYC only and want one trade's trigger, pre-checked.",
      "You want a price that one job covers many times over.",
    ],
    faq: COMMON_FAQ,
    sources: [
      { name: "Shovels website", url: "https://www.shovels.ai/", checked: CHECKED },
      { name: "Shovels pricing", url: "https://www.shovels.ai/pricing", checked: CHECKED },
    ],
    draft: true,
  },
  {
    slug: "constructconnect",
    competitor: "ConstructConnect",
    competitorUrl: "https://www.constructconnect.com/",
    title: "Building Sauce vs ConstructConnect: Project Leads Compared",
    description:
      "ConstructConnect sells project leads and bid documents for new construction. Building Sauce sells NYC repair triggers on existing buildings. Here is how they differ.",
    h1: "Building Sauce vs ConstructConnect",
    updated: UPDATED,
    intro:
      "ConstructConnect is a long-established project lead and bid management service, strongest in new construction and large renovation projects with published plans. Building Sauce is about existing buildings with a compliance problem and no contractor yet.",
    rows: [
      { label: "What it sells", us: US.sells, them: "Construction project leads, plans and specs, bid management", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Triggers", us: US.triggers, them: "Projects in planning, bidding and awarded stages, mostly new construction and major renovation", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Contact type", us: US.contact, them: "Project owner, architect and general contractor as listed on the project", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Price model", us: US.price, them: "Starter from $129 a month per market, Professional from $199 a month on an annual contract when checked", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Contract terms", us: US.contract, them: "Annual contract on some plans", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Coverage", us: US.coverage, them: "United States and Canada", source: "https://www.constructconnect.com/", checked: CHECKED },
      { label: "Delivery", us: US.delivery, them: "Web platform with search, alerts and document access", source: "https://www.constructconnect.com/", checked: CHECKED },
    ],
    theyAreBetter: [
      "You bid on new construction or large commercial projects with published plans.",
      "You need plans and specs, not just a contact.",
      "You work across several states.",
    ],
    weAreBetter: [
      "You sell repairs to existing building owners and want to be first, not one of a bid list.",
      "You want month to month with no annual contract.",
      "You want a dated public record on every row rather than a project listing.",
    ],
    faq: COMMON_FAQ,
    sources: [{ name: "ConstructConnect website", url: "https://www.constructconnect.com/", checked: CHECKED }],
    draft: true,
  },
  {
    slug: "dodge",
    competitor: "Dodge Construction Network",
    competitorUrl: "https://www.construction.com/",
    title: "Building Sauce vs Dodge: Pre-Bid Intelligence vs Triggers",
    description:
      "Dodge sells pre-bid project intelligence for the construction industry, priced on request. Building Sauce sells NYC repair triggers at a flat monthly price. How they differ.",
    h1: "Building Sauce vs Dodge Construction Network",
    updated: UPDATED,
    intro:
      "Dodge is the biggest name in construction project intelligence, built for firms that chase projects nationally and want to see them early in planning. Building Sauce is one city, one trade at a time, built around a legal deadline on an existing building.",
    rows: [
      { label: "What it sells", us: US.sells, them: "Pre-bid construction project intelligence, forecasts and analytics", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Triggers", us: US.triggers, them: "Projects tracked from planning through bidding and award", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Contact type", us: US.contact, them: "Project participants as tracked by Dodge researchers", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Price model", us: US.price, them: "Quote on request", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Contract terms", us: US.contract, them: "Not published; typically an annual subscription", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Coverage", us: US.coverage, them: "United States and Canada", source: "https://www.construction.com/", checked: CHECKED },
      { label: "Delivery", us: US.delivery, them: "Web platform, alerts, analytics", source: "https://www.construction.com/", checked: CHECKED },
    ],
    theyAreBetter: [
      "You are a larger firm with a bid desk that needs national project visibility and forecasting.",
      "You want research-verified project data with a sales team behind it.",
      "Budget is not the constraint, coverage is.",
    ],
    weAreBetter: [
      "You are a 5 to 50 person NYC contractor without a bid desk.",
      "You want a known monthly price and no sales call to get it.",
      "You sell repairs that start with a filing, not projects that start with an architect.",
    ],
    faq: COMMON_FAQ,
    sources: [{ name: "Dodge Construction Network website", url: "https://www.construction.com/", checked: CHECKED }],
    draft: true,
  },
];

export function getCompare(slug: string): ComparePage | undefined {
  return COMPARE.find((c) => c.slug === slug);
}
