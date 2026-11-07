import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { COMPARE } from "@/content/compare";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "Construction Lead Services Compared | Building Sauce",
  description:
    "Honest comparisons of Building Sauce with FieldClients, Shovels, ConstructConnect and Dodge: what each sells, price model, terms and who each suits.",
  path: "/compare",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "Compare" });

export default function CompareIndex() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema({ url: META.path, name: META.title, description: META.description })} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-[var(--text-w)] flex-col gap-5">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }]} />
            <h1 className="h1">Construction lead services compared.</h1>
            <p className="lede">
              We wrote these. Every competitor fact links to the competitor's own page with the date we checked it, and
              every page says where they are the better choice.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {COMPARE.map((c) => (
              <li key={c.slug} className="border border-hairline p-6 hover:border-ink">
                <Link href={`/compare/${c.slug}`} className="flex flex-col gap-2 text-ink no-underline">
                  <span className="text-lg font-semibold">{c.h1}</span>
                  <span className="text-[15px] leading-relaxed text-text-2">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
