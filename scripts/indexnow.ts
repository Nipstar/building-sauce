/**
 * Submit live page URLs to IndexNow (Bing, Yandex, Naver, Seznam; Bing feeds
 * DuckDuckGo and ChatGPT search). Google ignores IndexNow.
 *
 *   npm run indexnow                    # every live page from the registry
 *   npm run indexnow -- /guides/x /data/y   # only these paths
 *   npm run indexnow -- --dry-run         # print the URL list, post nothing
 *
 * Needs INDEXNOW_KEY and NEXT_PUBLIC_SITE_URL (read from .env when present).
 * The key must also be served at <site>/indexnow.txt (app/indexnow.txt/route.ts).
 */
import "./load-env";
import { SITE } from "../content/site";
import { livePages } from "../content/registry";

async function main() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) throw new Error("INDEXNOW_KEY is not set");
  if (!/^https:\/\//.test(SITE.url)) throw new Error(`NEXT_PUBLIC_SITE_URL must be the public https URL, got ${SITE.url}`);

  const dryRun = process.argv.includes("--dry-run");
  const paths = process.argv.slice(2).filter((a) => a !== "--dry-run");
  const urlList = (paths.length ? paths : livePages().map((p) => p.url)).map((p) => `${SITE.url}${p.startsWith("/") ? p : `/${p}`}`);

  if (dryRun) {
    console.log(urlList.join("\n"));
    console.log(`dry run: ${urlList.length} URL(s), key at ${SITE.url}/indexnow.txt`);
    return;
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE.url).host,
      key,
      keyLocation: `${SITE.url}/indexnow.txt`,
      urlList,
    }),
  });
  // 200 and 202 both mean accepted.
  console.log(`IndexNow ${res.status}: ${urlList.length} URL(s) submitted for ${SITE.url}`);
  if (!res.ok) {
    console.error(await res.text());
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
