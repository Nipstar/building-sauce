/**
 * Validate one guide: frontmatter, fact ids, placeholders, word count, headings.
 * Usage: npx tsx scripts/check-guide.ts <slug>
 */
import { getGuide, guideBlockers } from "../lib/mdx";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: npx tsx scripts/check-guide.ts <slug>");
  process.exit(2);
}
const g = getGuide(slug);
if (!g) {
  console.error(`no guide at content/guides/${slug}.mdx`);
  process.exit(1);
}
const problems: string[] = [];
const body = g.source;
if (/—/.test(body + JSON.stringify(g.fm))) problems.push("em dash found");
if (/!/.test(body.replace(/<[^>]+>/g, "")) || /!/.test(JSON.stringify(g.fm))) problems.push("exclamation mark found");
if (/Antek Automation (Ltd|Limited)/.test(body)) problems.push("'Ltd' after Antek Automation");
if (/\b(revolutionary|game-changing|unlock|seamless)\b/i.test(body)) problems.push("hype word found");
if (/^#\s/m.test(body)) problems.push("H1 (#) in body; the template renders the H1 from frontmatter");
const h2s = (body.match(/^##\s/gm) ?? []).length;
if (h2s < 3) problems.push(`only ${h2s} H2 sections`);
const ctas = (body.match(/<CTA\s*\/>/g) ?? []).length;
if (ctas !== 1) problems.push(`expected exactly one <CTA /> in the body, found ${ctas}`);
if (g.words < 900 || g.words > 1800) problems.push(`word count ${g.words} outside 900 to 1800`);
if (g.fm.faq.length < 3) problems.push("fewer than 3 FAQ items");
if (g.fm.sources.length < 2) problems.push("fewer than 2 sources");
problems.push(...guideBlockers(g).map((b) => `blocker: ${b}`));

console.log(`${slug}: ${g.words} words, ${h2s} H2s, facts [${g.factIds.join(", ")}], url ${g.url}`);
if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("OK");
