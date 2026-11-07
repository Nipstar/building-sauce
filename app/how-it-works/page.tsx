import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AnswerBlock } from "@/components/AnswerBlock";
import { ButtonLink } from "@/components/Buttons";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "How Building Sauce Builds Each List: Sources and Checks",
  description:
    "The public NYC records behind every Building Sauce row, how we match them by building, how we check the decider, and the rules we won't break.",
  path: "/how-it-works",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "How it works" });

export const SOURCES = [
  {
    name: "NYC DOB Facade Inspection and Safety Program filings (DOB NOW: Safety)",
    url: "https://data.cityofnewyork.us/d/xubg-57si",
  },
  { name: "DOB NOW approved permits", url: "https://data.cityofnewyork.us/d/rbx6-tga4" },
  {
    name: "HPD building registrations and contacts",
    url: "https://data.cityofnewyork.us/d/tesw-yqqr",
  },
  { name: "ACRIS real property records", url: "https://a836-acris.nyc.gov/" },
  {
    name: "NYC Department of City Planning PLUTO",
    url: "https://www.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page",
  },
];

const STEPS = [
  {
    title: "Pull the trigger records.",
    body: "Facade filings from DOB NOW: Safety, published by the City on NYC Open Data and updated daily.",
  },
  {
    title: "Match by building.",
    body: "Each filing is tied to its building and tax lot so permits, registrations and deeds line up.",
  },
  {
    title: "Check the job is open.",
    body: "We look for a repair permit filed since the trigger. No permit, no contractor on record.",
  },
  {
    title: "Check the decider.",
    body: "The HPD registration names the owner entity, managing agent and head officer. We accept it only when it's dated after the latest deed in ACRIS. If the building sold recently, the row says so.",
  },
  {
    title: "Score and size.",
    body: "Deadline, filing class, shed age and permit gap make a 1 to 5 score. Units, floors and year built come from PLUTO.",
  },
  {
    title: "Filter.",
    body: "We drop public owners (NYCHA, City agencies), small owner-occupied homes and individuals' home addresses.",
  },
  {
    title: "Deliver.",
    body: "Monday 7am Eastern: one email, a CSV and a web page.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell>
      <JsonLd
        data={webPageSchema({
          url: META.path,
          name: META.title,
          description: META.description,
          about: ["NYC Facade Inspection and Safety Program", "NYC building permits", "HPD property registration", "ACRIS"],
          mentions: SOURCES,
        })}
      />
      <Section pad="pt-10 pb-10 md:pt-14">
        <div className="flex max-w-[var(--text-w)] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }]} />
          <h1 className="h1">How each list is built: the records, the checks, the rules.</h1>
        </div>
      </Section>

      <AnswerBlock q="How does Building Sauce build a row?" sourceName="NYC Open Data" sourceUrl="https://opendata.cityofnewyork.us/">
        Building Sauce joins public New York City records by building every week. A row only makes the list when a dated
        filing calls for work, no repair permit is on file, and the managing agent's registration is newer than the last
        deed. Every row carries the record ID so you can check it.
      </AnswerBlock>

      <Section>
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="The seven steps" h2="From a City filing to a row you can phone." />
          <ol className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-t border-hairline pt-5">
                <span className="mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-2">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="h3 mb-4">The sources</h2>
            <ul className="flex flex-col gap-2 text-[15px] leading-relaxed">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3 mb-4">Freshness</h2>
            <p className="text-[15px] leading-relaxed text-text-2">
              DOB and HPD data update daily. ACRIS deeds can run about five weeks behind, so a very recent sale may not
              show yet. Where the registration is older than the last deed, the row says so instead of guessing.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="The rules" h2="What we never do." />
          <ul className="grid gap-4 text-[15px] leading-relaxed text-text-2 md:grid-cols-2">
            <li className="border-t border-hairline pt-4">Contact tenants or complainants.</li>
            <li className="border-t border-hairline pt-4">Sell personal mobile numbers or home addresses.</li>
            <li className="border-t border-hairline pt-4">Call owners for you, or sell appointments.</li>
            <li className="border-t border-hairline pt-4">Pitch renovation as a way to move tenants out.</li>
            <li className="border-t border-hairline pt-4">Use logins, paid listing sites or LinkedIn scraping to build the feed.</li>
            <li className="border-t border-hairline pt-4">Say a building needs work. The City said it. We quote the record.</li>
          </ul>
          <div>
            <ButtonLink href="/facade-restoration-leads">See the facade feed</ButtonLink>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
