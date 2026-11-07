import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Byline } from "@/components/Byline";
import { FAQList } from "@/components/FAQList";
import { SourcesList } from "@/components/SourcesList";
import { CTABox } from "@/components/CTABox";
import { COMPARE, getCompare } from "@/content/compare";
import { usDate } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return COMPARE.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompare(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.description, path: `/compare/${c.slug}`, eyebrow: "Compare", noindex: c.draft });
}

export default async function ComparePage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  const c = getCompare(slug);
  if (!c) notFound();
  return (
    <PageShell>
      <Section pad="pt-10 pb-16 md:pt-14">
        <div className="flex flex-col gap-8">
          <div className="flex max-w-[var(--text-w)] flex-col gap-5">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: c.competitor, href: `/compare/${c.slug}` }]} />
            <h1 className="h1">{c.h1}</h1>
            <Byline updated={c.updated} />
            <p className="lede">{c.intro}</p>
          </div>

          <div className="table-wrap">
            <table className="w-full min-w-[720px] text-[15px] leading-relaxed">
              <thead>
                <tr className="border-b border-ink text-left align-top">
                  <th scope="col" className="w-[18%] py-3 pr-4 font-semibold">&nbsp;</th>
                  <th scope="col" className="w-[41%] py-3 pr-4 font-semibold">Building Sauce</th>
                  <th scope="col" className="w-[41%] py-3 font-semibold">{c.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.label} className="border-b border-hairline align-top">
                    <th scope="row" className="py-4 pr-4 text-left font-semibold text-ink">{r.label}</th>
                    <td className="py-4 pr-4 text-text-2">{r.us}</td>
                    <td className="py-4 text-text-2">
                      {r.them}
                      {r.source && (
                        <span className="mono block pt-1 text-[12px] text-muted">
                          <a href={r.source} rel="noopener" className="text-muted underline">source</a>
                          {r.checked ? `, checked ${usDate(r.checked)}` : ""}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="prose">
              <h2>Where {c.competitor} is the better choice</h2>
              <ul>
                {c.theyAreBetter.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="prose">
              <h2>Where Building Sauce is the better choice</h2>
              <ul>
                {c.weAreBetter.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <CTABox
            title="See a real list before you decide."
            body="Ten buildings from last week's facade feed, with every field, free. Then compare it with whatever you use now."
            href="/free-sample"
            label="Get last week's list free"
          />

          <div className="max-w-[var(--text-w)]">
            <FAQList compact h2="Questions" items={c.faq} />
          </div>
          <SourcesList sources={c.sources} />
        </div>
      </Section>
    </PageShell>
  );
}
