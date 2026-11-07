import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { AnswerBlock } from "@/components/AnswerBlock";
import { DarkBand3 } from "@/components/DarkBand3";
import { NeedPayoffBand } from "@/components/NeedPayoffBand";
import { FeedCard, FeedCardDashed } from "@/components/FeedCard";
import { StatHero } from "@/components/StatHero";
import { TrustTriplet } from "@/components/TrustTriplet";
import { FAQList } from "@/components/FAQList";
import { Section, SectionHeading } from "@/components/Section";
import { FEEDS } from "@/content/feeds";
import { SITE, usd } from "@/content/site";
import { loadFisp } from "@/lib/stats";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "NYC Construction Leads From Public Records | Building Sauce",
  description:
    "Weekly lists of NYC buildings with a dated City filing that calls for work, plus the managing agent to call. Built for contractors. $400 a month.",
  path: "/",
  eyebrow: "For contractors who sell to building owners",
});

export default function HomePage() {
  const fisp = loadFisp();
  const hasStat = fisp.as_of && fisp.last_12_months.unsafe_initial != null;
  return (
    <PageShell>
      <Hero
        eyebrow="For contractors who sell to building owners"
        h1="Dated public proof a building needs work, and the name of who to call about it."
        sub="City filings, violations, permits and ownership records, matched by building and sent every Monday to the trade that fixes the problem. New York City first."
        primary={{ label: "Start with the facade feed", href: "/facade-restoration-leads" }}
        secondary={{ label: "See all feeds", href: "#feeds" }}
        micro="Free sample of last week's real list. No card, no call."
      />

      <AnswerBlock
        q="What is Building Sauce?"
        sourceName="our own pipeline, built on NYC Open Data and DOB NOW"
        sourceUrl="/how-it-works"
      >
        {SITE.entityDescription} It costs {usd(SITE.price.monthly)} a month per feed, month to month.
      </AnswerBlock>

      <DarkBand3
        eyebrow="Why most lead lists disappoint"
        h2="Most leads tell you about a job after someone else has it."
        items={[
          {
            title: "Permit feeds are late by design.",
            body: "A permit means the owner already hired someone. You're reading about a job you lost.",
          },
          {
            title: "Bid boards are crowded.",
            body: "If a project is on a bid board, so is every firm in your trade.",
          },
          {
            title: "Owner names go nowhere.",
            body: "The deed says an LLC. The phone number on file rings a seller who left two years ago.",
          },
        ]}
      />

      <Section>
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="What we do instead" h2="A record with its date, a decider who was checked, every Monday." />
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                n: "01",
                title: "A record, with its date.",
                body: "A facade filing, a violation, a permit that should exist and doesn't, a legal deadline. We quote the record and the date. We never say a building needs work. The City already did.",
              },
              {
                n: "02",
                title: "A decider, checked.",
                body: "The registered owner entity, managing agent and head officer from the public register, accepted only when the registration is newer than the last deed, so you aren't calling the seller.",
              },
              {
                n: "03",
                title: "Every Monday, to the right trade.",
                body: "One email, a CSV and a web page. Business contacts only. No portal, no appointments, no calls made on your behalf. You work the list.",
              },
            ].map((i) => (
              <div key={i.n} className="flex flex-col gap-2.5 border-t border-ink pt-5">
                <div className="mono text-xs text-accent">{i.n}</div>
                <h3 className="text-lg font-semibold">{i.title}</h3>
                <p className="text-[15px] leading-[1.55] text-text-2">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <NeedPayoffBand
        h2="If you knew which buildings had a deadline and no contractor yet, who would you call first?"
        body="That's the list. One trade, one trigger, one city, every Monday."
      />

      <Section id="feeds">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="The feeds" h2="One feed per trade, each built on the record that trade sells against." />
          <div className="grid gap-6 md:grid-cols-2">
            {FEEDS.map((f) => (
              <FeedCard
                key={f.slug}
                href={`/${f.slug}`}
                status={f.status}
                region={f.region === "NYC" ? "NYC" : "FLORIDA"}
                name={f.name}
                copy={f.cardCopy}
                linkText={f.cardLink}
              />
            ))}
            <FeedCardDashed email={SITE.email} />
          </div>
        </div>
      </Section>

      {hasStat && (
        <Section tone="paper">
          <div className="flex flex-col gap-4">
            <div className="eyebrow">From the data</div>
            <StatHero
              value={fisp.last_12_months.unsafe_initial as number}
              label="initial Unsafe facade filings in NYC in the last 12 months."
              asOf={fisp.as_of as string}
              link={{ label: "See the weekly count by borough and sub-cycle", href: "/data/fisp-unsafe-buildings" }}
            />
          </div>
        </Section>
      )}

      <TrustTriplet
        variant="cards"
        items={[
          {
            title: "Check every row yourself.",
            body: "Each row carries the record ID and date. Two minutes on the City's own site confirms it.",
          },
          {
            title: "Business contacts only.",
            body: "Registered agents, officers and office lines. No home addresses, no tenants, no complainants.",
          },
          {
            title: "No lock-in.",
            body: "Month to month. Start with a free sample of last week's list. Cancel by replying to any invoice.",
          },
        ]}
      />

      <FAQList
        h2="Fair questions"
        items={[
          {
            q: "Where does the data come from?",
            a: "NYC Department of Buildings filings and permits, HPD registrations, ACRIS deeds and the City's PLUTO land use file, all public. See How it works.",
          },
          {
            q: "Who is it for?",
            a: "Contractors and service firms that sell repairs to building owners and managing agents. Each feed is built for one trade.",
          },
          { q: "Do you sell leads nationally?", a: "Not yet. New York City first. Florida condos are planned." },
          {
            q: "Is this a bid board?",
            a: "No. Most rows are buildings with a legal reason to hire someone and no contractor on record yet.",
          },
        ]}
      />

      <Section pad="pb-16">
        <nav aria-label="Start here" className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <Link href="/guides/local-law-11" className="font-semibold">
            Local Law 11 explained
          </Link>
          <Link href="/data/fisp-unsafe-buildings" className="font-semibold">
            NYC Unsafe facade filings, weekly count
          </Link>
          <Link href="/data/nyc-sidewalk-sheds" className="font-semibold">
            NYC sidewalk sheds by age
          </Link>
          <Link href="/how-it-works" className="font-semibold">
            How each list is built
          </Link>
          <Link href="/pricing" className="font-semibold">
            Pricing
          </Link>
        </nav>
      </Section>
    </PageShell>
  );
}
