import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { SampleRowCard } from "@/components/SampleRowCard";
import { AnswerBlock } from "@/components/AnswerBlock";
import { DarkBand3 } from "@/components/DarkBand3";
import { DeadlineRows } from "@/components/DeadlineRows";
import { NeedPayoffBand } from "@/components/NeedPayoffBand";
import { CapabilityTable } from "@/components/CapabilityTable";
import { TrustTriplet } from "@/components/TrustTriplet";
import { PricingBand } from "@/components/PricingBand";
import { LeadForm } from "@/components/LeadForm";
import { FAQList } from "@/components/FAQList";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/Section";
import { FEEDS, FEED_REGIONS_FL, getFeed } from "@/content/feeds";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return FEEDS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feed = getFeed(slug);
  if (!feed) return {};
  return pageMetadata({ title: feed.title, description: feed.description, path: `/${feed.slug}`, eyebrow: feed.eyebrow });
}

export default async function FeedPageRoute({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const feed = getFeed(slug);
  if (!feed) notFound();
  const live = feed.status === "live";
  const formAnchor = live ? "sample" : "waitlist";
  return (
    <PageShell collapsed ctaHref={`#${formAnchor}`} ctaLabel={live ? "Get last week's list free" : "Join the waitlist"}>
      <JsonLd data={serviceSchema(feed)} />
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: `${feed.name} feed`, href: `/${feed.slug}` }])} />

      <Hero
        eyebrow={feed.eyebrow}
        h1={feed.h1}
        sub={feed.sub}
        primary={{ label: feed.ctaPrimary.label, href: `#${formAnchor}` }}
        secondary={feed.ctaSecondary}
        micro={feed.micro}
        aside={feed.sampleRow ? <SampleRowCard row={feed.sampleRow} /> : undefined}
      />

      <AnswerBlock q={feed.answer.q} sourceName={feed.answer.sourceName} sourceUrl={feed.answer.sourceUrl}>
        {feed.answer.text}
      </AnswerBlock>

      <DarkBand3 eyebrow={feed.problem.eyebrow} h2={feed.problem.h2} items={feed.problem.items} />

      {feed.deadlines && (
        <DeadlineRows
          eyebrow={feed.deadlines.eyebrow}
          h2={feed.deadlines.h2}
          rows={feed.deadlines.rows}
          sourceLine={feed.deadlines.sourceLine}
        />
      )}

      {feed.proofStat && (
        <Section tone="paper" pad="py-12">
          <div className="flex flex-col gap-2">
            <div className="mono text-[56px] font-medium leading-none text-ink md:text-[72px]">{feed.proofStat.value}</div>
            <p className="text-lg text-text-2">{feed.proofStat.label}</p>
            {feed.proofStat.note && <p className="text-[13px] text-muted">{feed.proofStat.note}</p>}
          </div>
        </Section>
      )}

      <NeedPayoffBand eyebrow={feed.needPayoff.eyebrow} h2={feed.needPayoff.h2} body={feed.needPayoff.body} />

      <CapabilityTable id="what-you-get" eyebrow={feed.capabilities.eyebrow} h2={feed.capabilities.h2} rows={feed.capabilities.rows} />

      <TrustTriplet variant="cards" items={feed.trust} />

      <PricingBand variant={live ? "live" : "waitlist"} feedName={feed.name} id={formAnchor}>
        <LeadForm
          formType={live ? "sample" : "waitlist"}
          trade={feed.trade}
          title={feed.formTitle}
          intro={feed.formIntro}
          roleOptions={feed.roleOptions}
          regionOptions={feed.region === "FL" ? FEED_REGIONS_FL : undefined}
          regionLabel={feed.region === "FL" ? "Where you work most" : "Borough you work most"}
          submitLabel={live ? "Send me the list" : "Join the waitlist"}
          underButton={
            live
              ? "Contractors only. One sample per firm. We'll send the list and one follow-up asking if it was useful. Nothing else unless you ask."
              : "One email when the first list is ready. Nothing else."
          }
          page={`/${feed.slug}`}
        />
      </PricingBand>

      <FAQList h2="Fair questions" items={feed.faq} />

      <Section pad="pb-16">
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Read next" h2="Guides and data behind this feed" />
          <ul className="flex flex-col gap-2 text-[15px]">
            {feed.related.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
