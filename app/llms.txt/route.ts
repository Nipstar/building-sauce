import { SITE } from "@/content/site";
import { livePages } from "@/content/registry";

/** llms.txt: entity description, then every live page with a one-line summary. */
export function GET() {
  const pages = livePages().filter((p) => p.url !== "/" && p.summary);
  const section = (title: string, kind: string) => {
    const items = pages.filter((p) => p.kind === kind);
    if (!items.length) return "";
    return `\n## ${title}\n\n${items.map((p) => `- [${p.title}](${SITE.url}${p.url}): ${p.summary}`).join("\n")}\n`;
  };
  const text = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.entityDescription}`,
    "",
    `Operated by ${SITE.operator.name}. Contact ${SITE.email}.`,
    section("Feeds", "feed"),
    section("Guides", "guide"),
    section("Data", "data"),
    section("Compare", "compare"),
    section("Company", "page"),
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
