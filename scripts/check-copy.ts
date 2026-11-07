/**
 * Acceptance check on rendered pages. Starts `next start` on a spare port,
 * fetches the sitemap and every registry page, and fails on:
 *   - em dash or exclamation mark in visible text (every page)
 *   - "Ltd"/"Limited" after Antek Automation (every page)
 *   - a [PLACEHOLDER] in visible text (sitemap pages)
 *   - a `verify` fact rendered (sitemap pages)
 *   - zero or more than one H1, or a skipped heading level (every page)
 *   - title over 60 or description over 155 characters (sitemap pages)
 *   - a sitemap page whose rendered HTML has no FAQ/Article/Service JSON-LD block when expected
 * Run after `npm run build`: npx tsx scripts/check-copy.ts
 */
import { spawn } from "node:child_process";
import { buildRegistry } from "../content/registry";
import { PLACEHOLDER_RE } from "../lib/placeholders";

const PORT = 3999;
const BASE = `http://localhost:${PORT}`;

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ");
}

function headings(html: string): number[] {
  const main = html.replace(/<footer[\s\S]*?<\/footer>/i, "");
  return Array.from(main.matchAll(/<h([1-6])\b/gi), (m) => Number(m[1]));
}

async function waitFor(url: string, ms: number) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`server at ${url} did not start`);
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: ["ignore", "ignore", "inherit"],
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: BASE },
  });
  const failures: string[] = [];
  try {
    await waitFor(`${BASE}/robots.txt`, 30000);

    const sitemapXml = await fetch(`${BASE}/sitemap.xml`).then((r) => r.text());
    const sitemapUrls = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1]).pathname);
    const llms = await fetch(`${BASE}/llms.txt`).then((r) => r.text());
    if (!llms.startsWith("# Building Sauce")) failures.push("llms.txt missing H1");
    const robots = await fetch(`${BASE}/robots.txt`).then((r) => r.text());
    if (!/Sitemap:/.test(robots) || !/GPTBot/.test(robots)) failures.push("robots.txt missing sitemap or AI bots");

    const registry = buildRegistry();
    const pages = registry.map((p) => p.url);
    for (const p of registry) {
      if (p.live && !sitemapUrls.includes(p.url === "/" ? "/" : p.url)) failures.push(`${p.url}: live but not in sitemap`);
      if (!p.live && sitemapUrls.includes(p.url)) failures.push(`${p.url}: not live but in sitemap`);
    }
    for (const u of sitemapUrls) {
      if (!pages.includes(u)) failures.push(`${u}: in sitemap but not in registry`);
    }

    for (const url of pages) {
      const res = await fetch(`${BASE}${url}`);
      if (!res.ok) {
        failures.push(`${url}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      const text = visibleText(html);
      const inSitemap = sitemapUrls.includes(url);
      if (/—/.test(text)) failures.push(`${url}: em dash in text`);
      if (/!/.test(text)) failures.push(`${url}: exclamation mark in text: ${text.match(/.{0,40}!.{0,20}/)?.[0]}`);
      if (/Antek Automation (Ltd|Limited)/.test(text)) failures.push(`${url}: Ltd after Antek Automation`);
      const hs = headings(html);
      if (hs.filter((h) => h === 1).length !== 1) failures.push(`${url}: ${hs.filter((h) => h === 1).length} H1 headings`);
      for (let i = 1; i < hs.length; i++) {
        if (hs[i] > hs[i - 1] + 1) failures.push(`${url}: heading skips from h${hs[i - 1]} to h${hs[i]}`);
      }
      if (inSitemap) {
        const ph = text.match(new RegExp(PLACEHOLDER_RE.source, "g"));
        if (ph) failures.push(`${url}: placeholders ${Array.from(new Set(ph)).join(", ")}`);
        if (/data-fact-confidence="verify"/.test(html)) failures.push(`${url}: renders a verify fact`);
        const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
        if (title.length > 60) failures.push(`${url}: title ${title.length} chars`);
        const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
        if (desc.length > 155) failures.push(`${url}: description ${desc.length} chars`);
        if (!desc) failures.push(`${url}: no meta description`);
        if (!/<link rel="canonical"/.test(html)) failures.push(`${url}: no canonical`);
        const ld = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g), (m) => m[1]);
        for (const block of ld) {
          try {
            JSON.parse(block);
          } catch {
            failures.push(`${url}: invalid JSON-LD`);
          }
        }
        const types = ld.map((b) => (JSON.parse(b) as { "@type"?: string })["@type"]).filter(Boolean);
        if (!types.includes("Organization") || !types.includes("WebSite")) failures.push(`${url}: missing Organization/WebSite JSON-LD`);
      }
    }
  } finally {
    server.kill();
  }
  if (failures.length) {
    console.error(`check:copy FAILED (${failures.length})`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`check:copy OK (${buildRegistry().length} pages, ${buildRegistry().filter((p) => p.live).length} live)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
