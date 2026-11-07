import type { FeedPage } from "./types";

/**
 * One object per feed page. Copy follows the copy deck (docs/spec/COPY-DECK.md),
 * SPIN order: situation and problem, implication, need-payoff, capability, price.
 * Regulatory figures are referenced by fact id, never typed here.
 */

const UPDATED = "2026-11-07";

const FACADE_ROLES = ["Facade restoration", "Sidewalk shed or scaffold", "Waterproofing", "Other"];

export const FEEDS: FeedPage[] = [
  // ---------------------------------------------------------------- Facade
  {
    slug: "facade-restoration-leads",
    trade: "facade",
    status: "live",
    region: "NYC",
    phase: 1,
    name: "Facade",
    cardCopy:
      "FISP Unsafe and SWARMP filings and sidewalk sheds with no repair permit. For facade restoration and shed firms. Sub-cycle 10A closes Feb 21, 2027.",
    cardLink: "Get last week's list free",
    title: "Local Law 11 Leads for Facade Contractors | Building Sauce",
    description:
      "Every Monday: NYC buildings with a new FISP Unsafe or SWARMP filing and no repair permit, plus the managing agent's office line. $400 a month.",
    primaryKeyword: "local law 11 leads",
    updated: UPDATED,
    eyebrow: "Local Law 11 leads for NYC facade restoration contractors",
    h1: "Every Monday: the NYC apartment buildings that just got an Unsafe facade filing, and the managing agent's name.",
    sub: "FISP filings, repair permits, sidewalk sheds and the HPD registration, joined building by building and checked against the last deed. In your inbox at 7am Eastern.",
    ctaPrimary: { label: "Get last week's list free", href: "#sample" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "10 real buildings from last week. Check every row on DOB NOW. No card, no call.",
    // Field guide, not a record. Swap for a real masked row once the first feed has run (see HANDOVER.md).
    sampleRow: {
      score: 5,
      title: "One building per row, all five boroughs",
      fields: [
        { label: "Trigger", value: "Filing type and the date DOB published it" },
        { label: "Sub-cycle", value: "10A, 10B or 10C, with its deadline" },
        { label: "Repair permit", value: "On file, and which firm, or none" },
        { label: "Sidewalk shed", value: "Days up and renewal status" },
        { label: "Owner entity", value: "Registered owner from HPD" },
        { label: "Managing agent", value: "Name and firm, deed-checked" },
        { label: "Office phone", value: "Business line only" },
        { label: "Size", value: "Units, floors, year built" },
      ],
      source:
        "Every row carries the DOB NOW: Safety filing ID and date, so you can check it on the City's own site. Public record as filed. We do not contact the owner.",
    },
    answer: {
      q: "What is a Local Law 11 lead?",
      text: "NYC's Facade Inspection and Safety Program (FISP, often called Local Law 11) makes owners of buildings taller than six stories file a facade report each cycle. An Unsafe rating means repairs within 90 days and a sidewalk shed now. A Local Law 11 lead is that filing, dated, with the owner's managing agent attached.",
      sourceName: "NYC DOB Facade Compliance page",
      sourceUrl: "https://www.nyc.gov/site/buildings/safety/facade-compliance.page",
    },
    problem: {
      eyebrow: "The problem",
      h2: "By the time you hear about an Unsafe filing, someone has already called the owner.",
      items: [
        {
          title: "You find out late.",
          body: "DOB NOW publishes the filing. Nobody tells you. You see the shed go up on a job you could have bid.",
        },
        {
          title: "You don't know who to call.",
          body: "The deed says an LLC. The registration might still name the seller. Finding the person who decides takes an afternoon.",
        },
        {
          title: "Someone has to chase it.",
          body: "Checking filings, permits and registrations by hand is a day a week for an estimator, or it doesn't get done.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "The owner's clock is already running. The question is whose number is on the desk when it rings.",
      rows: [
        {
          factId: "fisp_10a",
          text: "Sub-cycle 10A closes for blocks ending in 4, 5, 6 or 9. A SWARMP condition left unfixed from Cycle 9 has to be filed as Unsafe.",
        },
        {
          factId: "fisp_unsafe_90",
          text: "An Unsafe condition must be corrected within 90 days of filing. After that the owner pays $1,000 a month in civil penalties in the first year.",
        },
        {
          factId: "shed_90",
          figure: "90-day sheds",
          text: "Shed permits issued or renewed since Feb 2, 2026 expire every 90 days and no longer renew automatically. From the second renewal, work has to happen in every permit period.",
        },
        {
          factId: "shed_milestones",
          figure: "5, 8 and 24 months",
          text: "For facade sheds first permitted on or after Jan 12, 2026: construction documents in 5 months, permit application in 8, repairs finished in 2 years. Miss them and the penalties are $5,000, $10,000 and $20,000.",
        },
      ],
      sourceLine:
        "Sources: NYC DOB Facade Compliance page, 1 RCNY 103-04, 1 RCNY 102-07, Local Laws 48 and 51 of 2025. Penalties set by the City, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "If you had the filing, the permit status and the agent's office number on Monday morning, how many of those calls would you make?",
      body: "One extra facade job a year pays for the list many times over. We can't promise the job. We can promise you'll know about the building early, and who to ring.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "One email every Monday, 7am Eastern. A CSV and a web page. Nothing to log into.",
      rows: [
        {
          youSaid: "“I find out late”",
          carries:
            "The Unsafe or SWARMP filing with its date, and new sidewalk sheds with no repair permit, within days of publication",
          from: "DOB NOW: Safety, DOB permits",
        },
        {
          youSaid: "“I don't know who to call”",
          carries:
            "The registered owner entity, managing agent and head officer, business address and office phone. Registration accepted only if it post-dates the last deed",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Has someone already got it?”",
          carries: "Whether a repair permit exists and which firm filed it. No permit means no contractor on record",
          from: "DOB NOW permits",
        },
        {
          youSaid: "“Which ones first?”",
          carries:
            "A 1 to 5 score from the sub-cycle deadline, filing class, shed age and permit gap, plus units, floors and year built",
          from: "DOB, PLUTO",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The record ID and date on every row. Check any of them on DOB NOW in two minutes",
          from: "Public record",
        },
        {
          youSaid: "“What do I say?”",
          carries: "A suggested opening line for each building, based on its trigger and deadline",
          from: "Building Sauce",
        },
      ],
    },
    trust: [
      {
        title: "Business contacts only.",
        body: "Agents, officers and office lines from the public register. No home addresses, no tenants.",
      },
      {
        title: "Records, not opinions.",
        body: "We report what was filed and when. You decide on site whether the job is real.",
      },
      {
        title: "We don't contact owners.",
        body: "The list is yours to work. No appointments sold, no calls made for you.",
      },
    ],
    faq: [
      {
        q: "Can't I pull this from DOB NOW myself?",
        a: "Yes. Every record is public. You're paying for the join across five datasets, the deed check on the agent, the permit check, and someone doing it every Monday so your estimator doesn't.",
      },
      {
        q: "How is this different from a permit feed or a bid board?",
        a: "A permit feed shows jobs someone already won. A bid board shows jobs everyone is bidding. This shows buildings with a filed Unsafe or SWARMP condition and no repair permit yet.",
      },
      {
        q: "Is the managing agent the person who signs?",
        a: "Not always. It's the registered agent or head officer on the HPD record, which is the right first call. You still have to sell the job.",
      },
      {
        q: "How many buildings a week?",
        a: "It depends on what the City publishes. Some weeks it's a handful, some weeks more. We'd rather send five real ones than fifty padded ones.",
      },
      {
        q: "Do my competitors get the same list?",
        a: "Up to 5 firms share each feed. We don't sell it beyond that.",
      },
      {
        q: "Why a UK company?",
        a: "Building Sauce is run by Antek Automation, a UK data and automation business. The records are New York's; the pipeline runs every Monday wherever we sit. Questions to hello@buildingsauce.com.",
      },
      {
        q: "How do I cancel?",
        a: "Reply to any invoice email. No notice period.",
      },
    ],
    related: [
      { label: "Local Law 11 explained: rules, deadlines, penalties", href: "/guides/local-law-11" },
      { label: "SWARMP vs Unsafe: NYC facade ratings explained", href: "/guides/swarmp-vs-unsafe" },
      { label: "Local Law 11 penalties", href: "/guides/local-law-11-penalties" },
      { label: "NYC sidewalk shed rules 2026", href: "/guides/sidewalk-shed-rules" },
      { label: "NYC Unsafe facade filings, counted every week", href: "/data/fisp-unsafe-buildings" },
    ],
    formTitle: "Get last week's list free",
    formIntro: "10 buildings with the full fields. Sent within one business day.",
    roleOptions: FACADE_ROLES,
  },

  // ---------------------------------------------------------------- Garages
  {
    slug: "parking-garage-leads",
    trade: "garage",
    status: "next",
    region: "NYC",
    phase: 2,
    name: "Parking garages",
    cardCopy:
      "Local Law 126 Unsafe and SREM conditions, with the owner on file. For concrete and garage restoration firms. Sub-cycle 1C runs to Dec 31, 2027.",
    cardLink: "Join the waitlist",
    title: "Local Law 126 Garage Repair Leads, NYC | Building Sauce",
    description:
      "NYC parking garages with an Unsafe or SREM condition on file under Local Law 126, with the owner to call. For concrete and garage restoration firms.",
    primaryKeyword: "local law 126 leads",
    updated: UPDATED,
    eyebrow: "Local Law 126 leads for garage and concrete restoration contractors",
    h1: "NYC parking garages with an Unsafe or SREM condition on file, and who owns them.",
    sub: "Condition assessment filings from DOB NOW: Safety, matched to the registered owner and checked against the last deed. The next feed we build, once facade has paying firms.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready. No card, no call.",
    answer: {
      q: "What is a Local Law 126 lead?",
      text: "Local Law 126 makes NYC parking structure owners file a condition assessment each cycle, rated Safe, SREM or Unsafe. A SREM condition not repaired by the next cycle becomes Unsafe. Sub-cycle 1C, covering the Bronx, Queens and Staten Island, runs from Jan 1, 2026 to Dec 31, 2027. A Local Law 126 lead is that filing with the owner attached.",
      sourceName: "NYC DOB Parking Structures page",
      sourceUrl: "https://www.nyc.gov/site/buildings/safety/parking-structure.page",
    },
    problem: {
      eyebrow: "The problem",
      h2: "By the time a garage repair goes out to bid, the engineer has already picked the shortlist.",
      items: [
        {
          title: "The engineer runs the bid.",
          body: "The inspecting engineer usually designs the repair and runs the tender. If you hear about it from them, you're one of several.",
        },
        {
          title: "The owner is buried.",
          body: "Garage owners are LLCs and REITs. The right contact is three layers down and the deed doesn't name them.",
        },
        {
          title: "Repairs get deferred.",
          body: "SREM conditions sit until the next filing forces the issue. Nobody calls the owner in the quiet years.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "A filed condition is a dated obligation. The owner knows it. The question is who calls first.",
      rows: [
        {
          factId: "ll126_1c",
          text: "Sub-cycle 1C closes. Every parking structure in the Bronx, Queens and Staten Island must have a condition assessment on file by then.",
        },
        {
          factId: "ll126_srem",
          figure: "SREM to Unsafe",
          text: "A SREM condition that is not corrected by the next inspection must be reported as Unsafe, with the public protection and penalties that come with it.",
        },
        {
          factId: "ll126_unsafe_90",
        },
      ],
      sourceLine:
        "Sources: NYC DOB Parking Structures page, 1 RCNY 103-13. Deadlines set by the City, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "What would it be worth to talk to the owner before the bid list is drawn up?",
      body: "One garage restoration job is a season's work. We can't put you on the engineer's list. We can tell you which owners have a filed condition and no contractor on record.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the facade feed. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“I hear about it from the engineer”",
          carries: "The Unsafe or SREM condition assessment with its filing date, within days of publication",
          from: "DOB NOW: Safety",
        },
        {
          youSaid: "“I can't find the owner”",
          carries: "The registered owner entity, managing agent and head officer with a business address and office line, accepted only if the registration post-dates the last deed",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Is someone already on it?”",
          carries: "Whether a repair permit has been filed since the assessment, and by whom",
          from: "DOB NOW permits",
        },
        {
          youSaid: "“Which ones first?”",
          carries: "A 1 to 5 score from the sub-cycle deadline, condition class and permit gap, plus structure size",
          from: "DOB, PLUTO",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The record ID and date on every row",
          from: "Public record",
        },
      ],
    },
    trust: [
      { title: "Business contacts only.", body: "Registered agents, officers and office lines. No home addresses." },
      { title: "Records, not opinions.", body: "We report the filed condition and its date. The engineer's report says what the work is." },
      { title: "We don't contact owners.", body: "The list is yours to work. No appointments, no calls made for you." },
    ],
    proofStat: {
      value: "1,550",
      label: "garages with an active Unsafe or SREM filing status",
      note: "Our count of DOB open data, Nov 5, 2026. Status on file, not proof the repair is still open.",
    },
    faq: [
      {
        q: "When will the garage feed start?",
        a: "Once the facade feed has paying firms. People on the waitlist get one email when the first list is ready, and the first list is free.",
      },
      {
        q: "Isn't the engineer's firm always going to win the repair?",
        a: "Often they design it and run the bid. Knowing the owner before that happens is the edge. Some owners want a second number.",
      },
      {
        q: "What's the difference between SREM and Unsafe?",
        a: "SREM is Safe with Repairs and Engineering Monitoring: safe for now, repairs required. Unsafe needs immediate protection and repair within 90 days. A SREM condition left unrepaired becomes Unsafe at the next filing.",
      },
      {
        q: "Do you cover Manhattan and Brooklyn?",
        a: "Yes. The feed covers all five boroughs. The Bronx, Queens and Staten Island are in the current sub-cycle, so that's where most new filings come from until Dec 31, 2027.",
      },
    ],
    related: [
      { label: "Local Law 126 explained", href: "/guides/local-law-126" },
      { label: "NYC parking garage filings, counted", href: "/data/nyc-parking-garages" },
      { label: "Local Law 11 explained", href: "/guides/local-law-11" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the garage waitlist",
    formIntro: "One email when the first list is ready. The first list is free.",
    roleOptions: ["Concrete restoration", "Garage restoration", "Waterproofing", "Structural engineering", "Other"],
  },

  // ---------------------------------------------------------------- Gas
  {
    slug: "gas-piping-leads",
    trade: "gas",
    status: "2027",
    region: "NYC",
    phase: 2,
    name: "Gas piping",
    cardCopy:
      "Local Law 152 buildings due in 2027 (Community Districts 11, 12, 14, 15 and 17), with the registered agent. For licensed master plumbers.",
    cardLink: "Join the waitlist",
    title: "Local Law 152 Leads for NYC Master Plumbers | Building Sauce",
    description:
      "NYC buildings due their Local Law 152 gas piping inspection in 2027, Community Districts 11, 12, 14, 15 and 17, with the registered agent. Join the waitlist.",
    primaryKeyword: "local law 152 leads",
    updated: UPDATED,
    eyebrow: "Local Law 152 leads for Licensed Master Plumbers",
    h1: "The NYC buildings due a gas piping inspection in 2027, and who to call.",
    sub: "DOB's own list of Local Law 152 properties, filtered to the districts due in 2027, matched to the HPD registration and checked against the last deed.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready. Planned for the start of 2027.",
    answer: {
      q: "What is a Local Law 152 lead?",
      text: "Local Law 152 requires periodic gas piping inspections by a Licensed Master Plumber at least every four years. Buildings in Community Districts 11, 12, 14, 15 and 17, in every borough, are due between Jan 1 and Dec 31, 2027. Owners get one 180-day extension. A Local Law 152 lead is a building on that list with its registered agent.",
      sourceName: "NYC DOB Periodic Gas Piping System Inspections page",
      sourceUrl: "https://www.nyc.gov/site/buildings/property-or-business-owner/gas-piping-inspections.page",
    },
    problem: {
      eyebrow: "The problem",
      h2: "Every LMP in the city is chasing the same districts in the same year.",
      items: [
        {
          title: "Owners leave it late.",
          body: "Most buildings book in the last quarter. Your calendar is empty in March and overbooked in November.",
        },
        {
          title: "You're guessing who hasn't booked.",
          body: "DOB publishes which buildings are due. It doesn't say which ones have already hired someone.",
        },
        {
          title: "The managing agent is the sale.",
          body: "One agent runs twenty buildings. Finding the right agent, and the right person at the agent, is the work.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "The due date is in the law. The owner either books early or pays for the scramble.",
      rows: [
        { factId: "ll152_2027" },
        { factId: "ll152_ext" },
        { factId: "ll152_cert" },
        { factId: "ll152_correct" },
      ],
      sourceLine:
        "Sources: NYC DOB Periodic Gas Piping System Inspections page, DOB Local Law 152 follow-up notices. Deadlines set by the City, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "If you could book your 2027 inspections in the first quarter instead of the last, what would that do to your calendar?",
      body: "The buildings are listed. The agents are registered. The only question is who calls them in January.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the facade feed. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“Which buildings are due?”",
          carries: "Every building on DOB's LL152 list in the districts due in 2027, grouped by managing agent",
          from: "DOB LL152 property list",
        },
        {
          youSaid: "“Who books the plumber?”",
          carries: "The registered owner entity, managing agent and head officer with an office line, deed-checked",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Which agents run the most buildings?”",
          carries: "A count of due buildings per managing agent, so one call can cover a portfolio",
          from: "Building Sauce",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The BIN and the DOB list date on every row",
          from: "Public record",
        },
      ],
    },
    trust: [
      { title: "Business contacts only.", body: "Managing agents and office lines. No tenants, no home numbers." },
      { title: "Records, not opinions.", body: "We report which buildings the City says are due. We don't inspect anything." },
      { title: "We don't contact owners.", body: "The list is yours to work." },
    ],
    faq: [
      {
        q: "When will the gas feed start?",
        a: "The plan is the start of 2027, so the list arrives before the due year begins. Waitlist members get one email when it's ready.",
      },
      {
        q: "Can I get the 2026 districts instead?",
        a: "Ask. If enough plumbers want Districts 4, 6, 8, 9 and 16 before Dec 31, 2026, we'll run it.",
      },
      {
        q: "Does the list show who has already been inspected?",
        a: "DOB's list shows status where it's published. Where it isn't, the row says so. We don't guess.",
      },
      {
        q: "Is this only for Licensed Master Plumbers?",
        a: "The inspection must be done by an LMP or someone working under one. If that's you, or you employ one, the list is for you.",
      },
    ],
    related: [
      { label: "Local Law 152: 2026 and 2027 due dates", href: "/guides/local-law-152" },
      { label: "Local Law 11 explained", href: "/guides/local-law-11" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the gas piping waitlist",
    formIntro: "One email when the first list is ready. Nothing else.",
    roleOptions: ["Licensed Master Plumber", "Plumbing contractor", "Mechanical contractor", "Other"],
  },

  // ---------------------------------------------------------------- Boilers
  {
    slug: "boiler-repair-leads",
    trade: "boiler",
    status: "planned",
    region: "NYC",
    phase: 3,
    name: "Boilers",
    cardCopy: "Buildings whose annual boiler inspection reported defects. For boiler and heating contractors.",
    cardLink: "Join the waitlist",
    title: "NYC Boiler Repair Leads From Inspection Filings | Building Sauce",
    description:
      "NYC buildings whose annual boiler inspection just reported defects, with the managing agent to call. Defects must be corrected within 90 days. Join the waitlist.",
    primaryKeyword: "boiler repair leads nyc",
    updated: UPDATED,
    eyebrow: "Boiler repair leads for NYC heating contractors",
    h1: "NYC buildings whose boiler inspection just reported defects.",
    sub: "Annual inspection reports filed in DOB NOW: Safety, filtered to the ones that list defects, matched to the managing agent.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready.",
    answer: {
      q: "What is a boiler repair lead from public records?",
      text: "NYC low-pressure boilers in buildings with six or more families, and in commercial buildings, are inspected every year and the report is filed with DOB. When a report lists defects, the owner must correct them within 90 days. A boiler repair lead is that report, dated, with the managing agent attached. Our count shows about 100 such buildings a week.",
      sourceName: "NYC DOB Boiler Compliance page",
      sourceUrl: "https://www.nyc.gov/site/buildings/safety/boiler-compliance.page",
    },
    problem: {
      eyebrow: "The problem",
      h2: "The inspector found the defect. The owner has 90 days. Nobody told you.",
      items: [
        {
          title: "The inspector isn't the repairer.",
          body: "Insurance company inspectors file the report and move on. The owner is left holding a list of defects and a deadline.",
        },
        {
          title: "Service contracts don't cover it.",
          body: "A defect report often means work outside the maintenance contract. That's a quote someone has to win.",
        },
        {
          title: "Quiet weeks are expensive.",
          body: "Summer is slow for heating firms. The defect filings don't stop in summer.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "A defect report starts a 90-day clock that the owner can see on DOB NOW.",
      rows: [{ factId: "boiler_annual" }, { factId: "boiler_90" }, { factId: "boiler_nofile" }],
      sourceLine: "Source: NYC DOB Boiler Compliance page. Deadlines set by the City, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "What would a steady list of buildings with a filed defect do for your service team's quiet weeks?",
      body: "About 100 buildings a week file a report with defects. Even a small share of those is a full diary.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the facade feed. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“I never hear about defect reports”",
          carries: "Every boiler report filed that week that lists defects, with the filing date and boiler ID",
          from: "DOB NOW: Safety",
        },
        {
          youSaid: "“Who do I call?”",
          carries: "The registered owner entity, managing agent and head officer with an office line, deed-checked",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Is it worth a visit?”",
          carries: "Building size, boiler count where filed, and days left in the 90-day window",
          from: "DOB, PLUTO",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The DOB NOW report ID and date on every row",
          from: "Public record",
        },
      ],
    },
    trust: [
      { title: "Business contacts only.", body: "Managing agents and office lines. No tenants, no home numbers." },
      { title: "Records, not opinions.", body: "We report that a defect was filed and when. The inspector's report says what it is." },
      { title: "We don't contact owners.", body: "The list is yours to work." },
    ],
    faq: [
      {
        q: "When will the boiler feed start?",
        a: "It's planned, not scheduled. The order we build feeds depends on who joins the waitlists. One email when it's ready.",
      },
      {
        q: "Does the row say what the defect is?",
        a: "Where DOB publishes the defect text, yes. Where it only publishes the status, the row says defects were reported and gives the report ID so you can look it up.",
      },
      {
        q: "Do you cover high-pressure boilers?",
        a: "The first version covers low-pressure boilers in residential and commercial buildings, which is most of the volume. High-pressure can follow if plumbers ask.",
      },
    ],
    related: [
      { label: "NYC boiler inspection rules explained", href: "/guides/nyc-boiler-inspection" },
      { label: "Local Law 152 gas piping due dates", href: "/guides/local-law-152" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the boiler waitlist",
    formIntro: "One email when the first list is ready. Nothing else.",
    roleOptions: ["Boiler contractor", "Heating contractor", "Licensed Master Plumber", "Other"],
  },

  // ---------------------------------------------------------------- Mold
  {
    slug: "mold-remediation-leads",
    trade: "mold",
    status: "planned",
    region: "NYC",
    phase: 3,
    name: "Mold",
    cardCopy:
      "Open mold violations in buildings covered by Local Law 61, which must use a licensed assessor and a separate licensed remediator.",
    cardLink: "Join the waitlist",
    title: "NYC Mold Remediation Leads, Local Law 61 | Building Sauce",
    description:
      "NYC buildings with open mold violations that must, under Local Law 61, hire a licensed assessor and a separate licensed remediator. With the managing agent. Join the waitlist.",
    primaryKeyword: "mold remediation leads",
    updated: UPDATED,
    eyebrow: "Mold remediation leads for licensed NYC assessors and remediators",
    h1: "NYC buildings with open mold violations that need a licensed assessor and remediator.",
    sub: "HPD mold violations in buildings covered by Local Law 61, matched to the registered owner and managing agent. Owner and agent contacts only, never tenants.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready.",
    answer: {
      q: "What is a mold remediation lead from public records?",
      text: "Under Local Law 61 of 2018, mold over 10 square feet in buildings with 10 or more apartments, or 25,000 square feet or more of non-residential space, must be assessed and remediated by separate New York State licensed firms. The remediator files notice with DEP 48 hours before work starts. A mold lead is an open violation in a covered building, with the managing agent attached.",
      sourceName: "NYC Local Law 61 of 2018 (HPD)",
      sourceUrl: "https://www.nyc.gov/assets/hpd/downloads/pdfs/services/local-law-61.pdf",
    },
    problem: {
      eyebrow: "The problem",
      h2: "The law says the owner needs two licensed firms. The owner usually doesn't know that until the violation lands.",
      items: [
        {
          title: "Owners hire the painter.",
          body: "A covered building with a 15 square foot patch of mold needs a licensed assessor and a separate licensed remediator. Most owners find out the hard way.",
        },
        {
          title: "Violations are public, scattered.",
          body: "HPD publishes every violation. Reading them building by building, and checking which buildings Local Law 61 covers, is nobody's job.",
        },
        {
          title: "The agent, not the tenant.",
          body: "The complaint comes from a tenant. The buyer is the managing agent. You should never be calling the tenant.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "Local Law 61 sets who can do the work. HPD sets the clock.",
      rows: [{ factId: "ll61" }, { factId: "ll61_notice" }],
      sourceLine:
        "Sources: NYC Local Law 61 of 2018, NYC DEP Mold Abatement page. Rules set by the City and State, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "If you knew every covered building with a new mold violation on Monday, before the owner had rung anyone, what would you do with the list?",
      body: "Licensed firms are a short list. Owners with a violation and a legal duty to hire one are not.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the facade feed. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“I don't see the violations”",
          carries: "New HPD mold violations in Local Law 61 buildings, with the violation ID, class and date",
          from: "HPD violations, PLUTO",
        },
        {
          youSaid: "“Who hires the remediator?”",
          carries: "The registered owner entity, managing agent and head officer with an office line, deed-checked",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Is it a real job?”",
          carries: "Open violation count per building and whether a DEP work plan notification is already on file",
          from: "HPD, DEP",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The violation ID and date on every row",
          from: "Public record",
        },
      ],
    },
    trust: [
      { title: "Owner and agent only.", body: "Rows come from violations. Contacts are the owner and managing agent. Never the tenant or complainant." },
      { title: "Records, not opinions.", body: "We report that a violation was issued and when. The assessor says what the job is." },
      { title: "We don't contact owners.", body: "The list is yours to work." },
    ],
    faq: [
      {
        q: "When will the mold feed start?",
        a: "It's planned. The order we build feeds depends on who joins the waitlists. One email when it's ready.",
      },
      {
        q: "Do you include tenant contact details?",
        a: "No. Never. Rows carry the owner entity and the managing agent. Tenants and complainants are not in the feed.",
      },
      {
        q: "Is this for assessors or remediators?",
        a: "Both. Local Law 61 requires a separate licensed firm for each, so one violation is two jobs.",
      },
    ],
    related: [
      { label: "Local Law 11 explained", href: "/guides/local-law-11" },
      { label: "NYC boiler inspection rules", href: "/guides/nyc-boiler-inspection" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the mold waitlist",
    formIntro: "One email when the first list is ready. Nothing else.",
    roleOptions: ["Licensed mold remediator", "Licensed mold assessor", "Environmental consultant", "Other"],
  },

  // ---------------------------------------------------------------- Roofing
  {
    slug: "commercial-roofing-leads",
    trade: "roofing",
    status: "planned",
    region: "NYC",
    phase: 3,
    name: "Roofing",
    cardCopy: "Buildings with open water-leak violations and no roof or waterproofing permit on file.",
    cardLink: "Join the waitlist",
    title: "Commercial Roofing Leads in NYC From Public Records | Building Sauce",
    description:
      "NYC apartment and commercial buildings with open water-leak violations and no roofing or waterproofing permit on file, with the managing agent. Join the waitlist.",
    primaryKeyword: "commercial roofing leads",
    updated: UPDATED,
    eyebrow: "Commercial roofing leads for NYC roofing and waterproofing contractors",
    h1: "NYC apartment buildings with open leak violations and no roof permit on file.",
    sub: "HPD and DOB leak and water-damage violations, cross-checked against DOB permits, matched to the managing agent.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready.",
    answer: {
      q: "What is a commercial roofing lead from public records?",
      text: "A commercial roofing lead from public records is a building where the City has recorded an open water-leak violation and no roofing or waterproofing permit has been filed since. Building Sauce plans a weekly NYC list of these, with the registered owner entity and managing agent attached, for roofing and waterproofing contractors.",
      sourceName: "NYC Open Data, HPD violations",
      sourceUrl: "https://data.cityofnewyork.us/d/wvxf-dwi5",
    },
    problem: {
      eyebrow: "The problem",
      h2: "A leak violation is a roof job nobody has priced yet.",
      items: [
        {
          title: "Leaks get patched, not fixed.",
          body: "The super patches it. The violation stays open. The next storm files another one.",
        },
        {
          title: "Nobody reads HPD for roofs.",
          body: "Water-damage violations are filed as apartment conditions. Reading them as roof signals takes a join nobody does.",
        },
        {
          title: "The permit is the tell.",
          body: "If a roof permit is on file, someone has the job. If three leak violations are open and no permit, nobody does.",
        },
      ],
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "If you had the buildings with repeat leak violations and no permit, and the agent's office line, what would a wet October look like?",
      body: "Roofing is seasonal and reactive. A list of buildings already in trouble turns the phone around.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the facade feed. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“I don't see leak violations”",
          carries: "Buildings with open water-leak or water-damage violations, counted per building, with the latest violation date",
          from: "HPD violations",
        },
        {
          youSaid: "“Has someone got the job?”",
          carries: "Whether a roofing or waterproofing permit has been filed since the first open violation",
          from: "DOB NOW permits",
        },
        {
          youSaid: "“Who do I call?”",
          carries: "The registered owner entity, managing agent and head officer with an office line, deed-checked",
          from: "HPD registration, ACRIS",
        },
        {
          youSaid: "“Which ones first?”",
          carries: "A 1 to 5 score from violation count, top-floor share, building size and permit gap",
          from: "HPD, PLUTO",
        },
      ],
    },
    trust: [
      { title: "Owner and agent only.", body: "Never the tenant who reported the leak." },
      { title: "Records, not opinions.", body: "A leak violation is not proof the roof is the cause. You decide on site." },
      { title: "We don't contact owners.", body: "The list is yours to work." },
    ],
    faq: [
      {
        q: "When will the roofing feed start?",
        a: "It's planned. The order we build feeds depends on who joins the waitlists. One email when it's ready.",
      },
      {
        q: "How do you know the leak is the roof?",
        a: "We don't. The row shows how many open leak violations the building has and whether they cluster on top floors. You decide if it's worth a visit.",
      },
      {
        q: "Do you cover one and two family homes?",
        a: "No. Multifamily and commercial buildings only.",
      },
    ],
    related: [
      { label: "NYC sidewalk shed rules 2026", href: "/guides/sidewalk-shed-rules" },
      { label: "Local Law 11 explained", href: "/guides/local-law-11" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the roofing waitlist",
    formIntro: "One email when the first list is ready. Nothing else.",
    roleOptions: ["Commercial roofing", "Waterproofing", "Exterior restoration", "Other"],
  },

  // ---------------------------------------------------------------- Florida
  {
    slug: "florida-condo-leads",
    trade: "florida",
    status: "planned",
    region: "FL",
    phase: 3,
    name: "Florida condos",
    cardCopy:
      "Associations due a milestone inspection or past the reserve study deadline, with the management company on file.",
    cardLink: "Join the waitlist",
    title: "Florida Condo Milestone Inspection and SIRS Leads | Building Sauce",
    description:
      "Florida condo associations due a milestone inspection or past the structural integrity reserve study deadline, with the management company on file. Join the waitlist.",
    primaryKeyword: "florida milestone inspection",
    updated: UPDATED,
    eyebrow: "Milestone inspection and SIRS leads for Florida restoration contractors",
    h1: "Florida condo associations due a milestone inspection or past the reserve study deadline.",
    sub: "State and county records on building age, height and association filings, matched to the management company. For concrete restoration, waterproofing and roofing firms.",
    ctaPrimary: { label: "Join the waitlist", href: "#waitlist" },
    ctaSecondary: { label: "See what's in each row", href: "#what-you-get" },
    micro: "One email when the first list is ready. Florida is planned after New York.",
    answer: {
      q: "What is a Florida milestone inspection lead?",
      text: "Florida condo buildings three or more stories tall need a milestone inspection by Dec 31 of the year they turn 30, then every 10 years. Associations had to finish a structural integrity reserve study by Dec 31, 2025, or with a milestone inspection due by Dec 31, 2026, but never later. A milestone lead is an association approaching or past one of those dates, with its management company.",
      sourceName: "Florida Statutes 553.899",
      sourceUrl:
        "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0553/Sections/0553.899.html",
    },
    problem: {
      eyebrow: "The problem",
      h2: "The deadlines are in statute. The boards are volunteers. The work lands on whoever the manager calls.",
      items: [
        {
          title: "Boards wait for the engineer.",
          body: "A phase two milestone report lists the repairs. By then the engineer has a contractor in mind.",
        },
        {
          title: "Management companies run portfolios.",
          body: "One manager handles thirty associations. The right person there is worth more than thirty cold calls.",
        },
        {
          title: "The dates are public and ignored.",
          body: "Certificate of occupancy dates and story counts are county records. Few contractors turn them into a calendar.",
        },
      ],
    },
    deadlines: {
      eyebrow: "What it costs",
      h2: "The statute sets the date. The board's exposure starts when it passes.",
      rows: [{ factId: "fl_milestone" }, { factId: "fl_sirs" }],
      sourceLine:
        "Sources: Florida Statutes 553.899 and 718.112, Florida HB 913 (2025). Deadlines set by the State, not by us. Last checked Nov 7, 2026.",
    },
    needPayoff: {
      eyebrow: "Worth asking",
      h2: "If you knew which associations turn 30 next year, and who manages them, when would you start the conversation?",
      body: "Milestone repairs are large, slow and planned a year out. Being the first number the manager has is the whole game.",
    },
    capabilities: {
      eyebrow: "What you get",
      h2: "Same format as the NYC feeds. One email every Monday, a CSV and a web page.",
      rows: [
        {
          youSaid: "“Which buildings are due?”",
          carries: "Condo buildings of three or more stories with the year they reach 30, and the milestone deadline that follows",
          from: "County property records, DBPR",
        },
        {
          youSaid: "“Who manages it?”",
          carries: "The association, its registered agent and the management company on file, with an office line",
          from: "Florida Division of Corporations, DBPR",
        },
        {
          youSaid: "“Has the SIRS been done?”",
          carries: "Whether the association's reserve study and milestone filings are on record where the county publishes them",
          from: "County records",
        },
        {
          youSaid: "“Can I trust it?”",
          carries: "The parcel ID and record date on every row",
          from: "Public record",
        },
      ],
    },
    trust: [
      { title: "Business contacts only.", body: "Management companies, registered agents and office lines. No unit owners, no board members' home numbers." },
      { title: "Records, not opinions.", body: "We report the building's age and the statutory date. The engineer says what the work is." },
      { title: "We don't contact associations.", body: "The list is yours to work." },
    ],
    faq: [
      {
        q: "When will the Florida feed start?",
        a: "After the NYC feeds have paying firms. Florida is the first market outside New York we plan to build. One email when it's ready.",
      },
      {
        q: "Which counties?",
        a: "The plan is to start with Miami-Dade, Broward and Palm Beach, where the building stock is densest, then the Gulf coast. Tell us on the form where you work.",
      },
      {
        q: "Do you have the milestone reports themselves?",
        a: "Where a county or city publishes them, the row links to the record. Where it doesn't, the row shows the statutory date and the management contact.",
      },
    ],
    related: [
      { label: "Florida milestone inspections explained", href: "/guides/florida-milestone-inspection" },
      { label: "Florida SIRS deadline explained", href: "/guides/florida-sirs-deadline" },
      { label: "Construction leads from public records", href: "/construction-leads" },
    ],
    formTitle: "Join the Florida waitlist",
    formIntro: "One email when the first list is ready. Nothing else.",
    roleOptions: ["Concrete restoration", "Waterproofing", "Roofing", "Structural engineering", "Other"],
  },
];

export const FEED_REGIONS_FL = [
  "Miami-Dade",
  "Broward",
  "Palm Beach",
  "Tampa Bay",
  "Southwest Florida",
  "Other Florida",
];

export function getFeed(slug: string): FeedPage | undefined {
  return FEEDS.find((f) => f.slug === slug);
}

export const LIVE_FEED = FEEDS[0];
