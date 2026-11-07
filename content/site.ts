/**
 * Site-wide constants. Copy here is fixed by the copy deck and must be used
 * word for word where the deck says so (entity description, footer line).
 */
export const SITE = {
  name: "Building Sauce",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildingsauce.com").replace(/\/$/, ""),
  email: "hello@buildingsauce.com",
  entityDescription:
    "Building Sauce is a weekly lead feed for contractors. Each row is a New York City building with a dated public record that calls for work, plus the registered owner entity and managing agent. It is run by Antek Automation.",
  operator: {
    name: "Antek Automation",
    streetAddress: "Chantry House, 38 Chantry Way",
    addressLocality: "Andover",
    postalCode: "SP10 1LZ",
    addressCountry: "GB",
    line: "Building Sauce is operated by Antek Automation, Chantry House, 38 Chantry Way, Andover SP10 1LZ, United Kingdom.",
  },
  footerSmallPrint:
    "Public records as filed. We report what the City published and when. We do not contact owners on your behalf.",
  disclaimer: "Sales intelligence from public records. Not legal, engineering or code-compliance advice.",
  byline: "Building Sauce research desk",
  linkedin: "", // set when the company page exists
  // Pricing decided by Andy, 7 Nov 2026
  price: {
    monthly: 400,
    founding: 300,
    foundingSeats: 5,
    cap: 5,
    currency: "USD",
    quietMonthRule:
      "Quiet month rule: if a month has no building worth a call, next month is free.",
    foundingOffer:
      "Founding offer: the first 5 firms pay $300 a month for as long as they stay. Firm 6 onward pays $400.",
    stripeLinkFacade: process.env.STRIPE_LINK_FACADE ?? "",
  },
  delivery: "Every Monday, 7am Eastern. One email, a CSV and a web page.",
  buildDate: "2026-11-07",
} as const;

export type Trade =
  | "facade"
  | "garage"
  | "gas"
  | "boiler"
  | "mold"
  | "roofing"
  | "florida"
  | "other";

export const NAV = {
  feeds: [
    { label: "Facade", href: "/facade-restoration-leads" },
    { label: "Parking garages", href: "/parking-garage-leads" },
    { label: "Gas piping", href: "/gas-piping-leads" },
    { label: "Boilers", href: "/boiler-repair-leads" },
    { label: "Mold", href: "/mold-remediation-leads" },
    { label: "Roofing", href: "/commercial-roofing-leads" },
    { label: "Florida condos", href: "/florida-condo-leads" },
  ],
  primary: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Guides", href: "/guides" },
  ],
  cta: { label: "Get a free list", href: "/free-sample" },
} as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Feeds",
    links: NAV.feeds,
  },
  {
    heading: "Guides",
    links: [
      { label: "Local Law 11", href: "/guides/local-law-11" },
      { label: "FISP Cycle 10 deadlines", href: "/guides/fisp-cycle-10-deadlines" },
      { label: "SWARMP vs Unsafe", href: "/guides/swarmp-vs-unsafe" },
      { label: "Sidewalk shed rules", href: "/guides/sidewalk-shed-rules" },
      { label: "Local Law 152", href: "/guides/local-law-152" },
      { label: "All guides", href: "/guides" },
    ],
  },
  {
    heading: "Data",
    links: [
      { label: "FISP Unsafe filings", href: "/data/fisp-unsafe-buildings" },
      { label: "NYC sidewalk sheds", href: "/data/nyc-sidewalk-sheds" },
      { label: "NYC parking garages", href: "/data/nyc-parking-garages" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Compare", href: "/compare" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const;

export function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/** US long date: Feb 21, 2027 */
export function usDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
