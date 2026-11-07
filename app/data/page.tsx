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
  title: "NYC Building Compliance Data, Weekly | Building Sauce",
  description:
    "Weekly counts of NYC facade Unsafe filings, sidewalk sheds and parking garage conditions from DOB records. Aggregates only, with method and limits.",
  path: "/data",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "Data" });

export default function DataIndex() {
  const pages = buildRegistry().filter((p) => p.kind === "data");
  return (
    <PageShell>
      <JsonLd data={webPageSchema({ url: META.path, name: META.title, description: META.description })} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-[var(--text-w)] flex-col gap-5">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Data", href: "/data" }]} />
            <h1 className="h1">Counts nobody else publishes, refreshed weekly.</h1>
            <p className="lede">
              Aggregates from DOB records on NYC Open Data: how many buildings, which boroughs, which sub-cycles, and
              how the number moves month to month. Counts only. The building list is the product.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {pages.map((p) => (
              <li key={p.url} className="border border-hairline p-6 hover:border-ink">
                <Link href={p.url} className="flex flex-col gap-2 text-ink no-underline">
                  <span className="text-lg font-semibold">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-text-2">{p.description}</span>
                  <span className="mono text-xs text-muted">
                    {p.live ? `As of ${usDate(p.updated)}` : "First count pending"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
