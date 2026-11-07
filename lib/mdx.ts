import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { GuideFrontmatter } from "@/content/types";
import { ALL_FACT_IDS, verifyFacts } from "@/content/facts";
import { findPlaceholders } from "./placeholders";

const DIR = path.join(process.cwd(), "content", "guides");

const Frontmatter = z.object({
  title: z.string().max(60),
  description: z.string().max(155),
  h1: z.string(),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  phase: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  primaryKeyword: z.string(),
  answer: z.string(),
  answerSource: z.object({ name: z.string(), url: z.string().url() }),
  facts: z.array(z.string()),
  feed: z.string(),
  feedLabel: z.string(),
  data: z.string().optional(),
  dataLabel: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  sources: z.array(z.object({ name: z.string(), url: z.string().url(), checked: z.string() })),
  url: z.string().optional(),
  draft: z.boolean().optional(),
});

export interface Guide {
  slug: string;
  url: string;
  fm: GuideFrontmatter;
  source: string;
  /** Fact ids referenced in frontmatter or inline <F id="..."/>. */
  factIds: string[];
  verifyFactIds: string[];
  placeholders: string[];
  words: number;
}

function parse(file: string): Guide {
  const slug = path.basename(file, ".mdx");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = Frontmatter.parse(data) as GuideFrontmatter;
  const inline = Array.from(content.matchAll(/<F\s+id="([a-z0-9_]+)"/g), (m) => m[1]);
  const factIds = Array.from(new Set([...fm.facts, ...inline]));
  for (const id of factIds) {
    if (!ALL_FACT_IDS.includes(id)) throw new Error(`Guide ${slug} references unknown fact "${id}"`);
  }
  return {
    slug,
    url: fm.url ?? `/guides/${slug}`,
    fm,
    source: content,
    factIds,
    verifyFactIds: verifyFacts(factIds),
    placeholders: findPlaceholders(raw),
    words: content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
  };
}

export function listGuides(): Guide[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => a.fm.title.localeCompare(b.fm.title));
}

export function getGuide(slug: string): Guide | undefined {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  return parse(`${slug}.mdx`);
}

export function guideBlockers(g: Guide): string[] {
  const out: string[] = [];
  if (g.fm.draft) out.push("draft");
  if (g.verifyFactIds.length) out.push(`verify facts: ${g.verifyFactIds.join(", ")}`);
  if (g.placeholders.length) out.push(`placeholders: ${g.placeholders.join(", ")}`);
  return out;
}
