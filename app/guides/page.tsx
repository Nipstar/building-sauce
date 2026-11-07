import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildRegistry } from "@/content/registry";
import { usDate } from "@/content/site";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "NYC Compliance Guides for Contractors | Building Sauce",
  description:
    "Plain guides to the NYC rules that create repair work: Local Law 11, FISP cycles, SWARMP, sidewalk sheds, Local Law 152 and more. Dated and sourced.",
  path: "/guides",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "Guides" });

export default function GuidesIndex() {
  const guides = buildRegistry().filter((p) => p.kind === "guide");
  return (
    <PageShell>
      <JsonLd data={webPageSchema({ url: META.path, name: META.title, description: META.description })} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-[var(--text-w)] flex-col gap-5">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }]} />
            <h1 className="h1">Guides to the rules that create the work.</h1>
            <p className="lede">
              Each guide answers one question first, then shows the facts with the source and the date we checked it.
              Written for contractors and the owners they sell to.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.url} className="border border-hairline p-6 hover:border-ink">
                <Link href={g.url} className="flex flex-col gap-2 text-ink no-underline">
                  <span className="text-lg font-semibold">{g.title}</span>
                  <span className="text-[15px] leading-relaxed text-text-2">{g.description}</span>
                  <span className="mono text-xs text-muted">Updated {usDate(g.updated)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
