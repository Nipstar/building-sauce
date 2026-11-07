/**
 * Every external source link must answer 2xx (after redirects).
 * Covers facts.ts, guide frontmatter sources, compare sources and the
 * how-it-works source list. Run: npx tsx scripts/check-links.ts
 */
import { FACTS } from "../content/facts";
import { COMPARE } from "../content/compare";
import { listGuides } from "../lib/mdx";
import { SOURCES } from "../app/how-it-works/page";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function status(url: string): Promise<number | string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    let r = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctrl.signal, headers: { "User-Agent": UA } });
    if (r.status === 405 || r.status === 403 || r.status === 404) {
      r = await fetch(url, { method: "GET", redirect: "follow", signal: ctrl.signal, headers: { "User-Agent": UA } });
    }
    return r.status;
  } catch (e) {
    return (e as Error).name === "AbortError" ? "timeout" : (e as Error).message;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const urls = new Map<string, string[]>();
  const add = (u: string, where: string) => urls.set(u, [...(urls.get(u) ?? []), where]);
  for (const f of Object.values(FACTS)) add(f.sourceUrl, `fact ${f.id}`);
  for (const g of listGuides()) {
    add(g.fm.answerSource.url, `guide ${g.slug} answerSource`);
    for (const s of g.fm.sources) add(s.url, `guide ${g.slug}`);
  }
  for (const c of COMPARE) {
    add(c.competitorUrl, `compare ${c.slug}`);
    for (const s of c.sources) add(s.url, `compare ${c.slug}`);
    for (const r of c.rows) if (r.source) add(r.source, `compare ${c.slug} row`);
  }
  for (const s of SOURCES) add(s.url, "how-it-works");

  const results = await Promise.all(
    Array.from(urls.keys()).map(async (u) => [u, await status(u)] as const),
  );
  // 429 means the host rate-limited the checker, not a dead link. Report it, do not fail.
  const bad = results.filter(([, s]) => typeof s !== "number" || s < 200 || (s >= 400 && s !== 429));
  for (const [u, s] of results) console.log(`${String(s).padEnd(7)} ${u}`);
  if (bad.length) {
    console.error(`\ncheck:links FAILED (${bad.length} of ${results.length})`);
    for (const [u, s] of bad) console.error(`  - ${s} ${u}  (${urls.get(u)?.join("; ")})`);
    process.exit(1);
  }
  console.log(`\ncheck:links OK (${results.length} urls)`);
}

main();
