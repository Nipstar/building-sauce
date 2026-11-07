import type { Trade } from "./site";

export type Confidence = "high" | "verify";

export interface Fact {
  id: string;
  /** Full sentence, as it may be rendered in copy. */
  text: string;
  /** Short figure for DeadlineRows and KeyFacts, e.g. "Feb 21, 2027" or "$1,000 a month". */
  value: string;
  sourceName: string;
  sourceUrl: string;
  /** ISO date the fact was last checked against the source. */
  checked: string;
  confidence: Confidence;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SourceRef {
  name: string;
  url: string;
  checked: string;
}

export interface LinkRef {
  label: string;
  href: string;
}

export type FeedStatus = "live" | "next" | "2027" | "planned";

export interface SampleRow {
  score: number;
  title: string;
  fields: { label: string; value: string }[];
  source: string;
}

export interface TitledItem {
  title: string;
  body: string;
}

export interface DeadlineRow {
  factId: string;
  /** Override the mono figure (defaults to fact.value). */
  figure?: string;
  /** Override the sentence (defaults to fact.text). */
  text?: string;
}

export interface CapabilityRow {
  youSaid: string;
  carries: string;
  from: string;
}

export interface FeedPage {
  slug: string;
  trade: Trade;
  status: FeedStatus;
  region: "NYC" | "FL";
  phase: 1 | 2 | 3;
  /** Short name used on cards and in the nav, e.g. "Facade". */
  name: string;
  cardCopy: string;
  cardLink: string;
  /** SEO */
  title: string;
  description: string;
  primaryKeyword: string;
  updated: string;
  /** Hero */
  eyebrow: string;
  h1: string;
  sub: string;
  ctaPrimary: LinkRef;
  ctaSecondary: LinkRef;
  micro: string;
  sampleRow?: SampleRow;
  /** AnswerBlock */
  answer: { q: string; text: string; sourceName: string; sourceUrl: string };
  problem: { eyebrow: string; h2: string; items: TitledItem[] };
  /** Implication block. Omitted where no high-confidence regulatory fact applies yet. */
  deadlines?: { eyebrow: string; h2: string; rows: DeadlineRow[]; sourceLine: string };
  needPayoff: { eyebrow: string; h2: string; body: string };
  capabilities: { eyebrow: string; h2: string; rows: CapabilityRow[] };
  trust: TitledItem[];
  proofStat?: { value: string; label: string; note?: string };
  faq: FAQItem[];
  related: LinkRef[];
  /** Form */
  formTitle: string;
  formIntro: string;
  roleOptions: string[];
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  h1: string;
  updated: string;
  published: string;
  phase: 1 | 2 | 3;
  primaryKeyword: string;
  /** Direct answer, 40 to 60 words. */
  answer: string;
  answerSource: { name: string; url: string };
  /** Fact ids used on the page. Drives KeyFacts and the live check. */
  facts: string[];
  /** Matching feed page and data page for internal links. */
  feed: string;
  feedLabel: string;
  data?: string;
  dataLabel?: string;
  faq: FAQItem[];
  sources: SourceRef[];
  /** Optional URL override (default /guides/<slug>). */
  url?: string;
  draft?: boolean;
}

export interface CompareRow {
  label: string;
  us: string;
  them: string;
  source?: string;
  checked?: string;
}

export interface ComparePage {
  slug: string;
  competitor: string;
  competitorUrl: string;
  title: string;
  description: string;
  h1: string;
  updated: string;
  intro: string;
  rows: CompareRow[];
  theyAreBetter: string[];
  weAreBetter: string[];
  faq: FAQItem[];
  sources: SourceRef[];
  draft: boolean;
}

export type PageKind =
  | "home"
  | "feed"
  | "guide"
  | "data"
  | "compare"
  | "page";

export interface PageEntry {
  url: string;
  title: string;
  description: string;
  updated: string;
  phase: 1 | 2 | 3;
  kind: PageKind;
  /** One-line summary for llms.txt. */
  summary: string;
  /** True when the page may be listed in sitemap and llms.txt. */
  live: boolean;
  /** Why it is not live (for HANDOVER and the build log). */
  blockers: string[];
  noindex?: boolean;
}
