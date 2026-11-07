import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatHero } from "@/components/StatHero";
import { AnswerBlock } from "@/components/AnswerBlock";
import { BarChart } from "@/components/BarChart";
import { CTABox } from "@/components/CTABox";
import { SourcesList } from "@/components/SourcesList";
import { JsonLd } from "@/components/JsonLd";
import { F } from "@/components/Fact";
import { dataPageMeta } from "@/content/registry";
import { usDate } from "@/content/site";
import { datasetSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { isDataPageLive, loadFisp, loadGarages, loadSheds, n } from "@/lib/stats";

const SLUGS = ["fisp-unsafe-buildings", "nyc-sidewalk-sheds", "nyc-parking-garages"] as const;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/data/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = dataPageMeta(slug);
  if (!meta) return {};
  return pageMetadata({ title: meta.title, description: meta.description, path: `/data/${slug}`, eyebrow: "Data", noindex: !isDataPageLive(meta.stats) });
}

function Table({ head, rows }: { head: string[]; rows: (string | number | null)[][] }) {
  return (
    <div className="table-wrap my-6">
      <table className="w-full min-w-[420px] text-[15px]">
        <thead>
          <tr className="border-b border-ink text-left">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-4 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-hairline">
              {r.map((c, j) => (
                <td key={j} className={`py-2 pr-4 ${j > 0 ? "mono" : ""}`}>
                  {typeof c === "number" ? c.toLocaleString("en-US") : c == null ? "not yet counted" : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function DataPage({ params }: PageProps<"/data/[slug]">) {
  const { slug } = await params;
  const meta = dataPageMeta(slug);
  if (!meta) notFound();
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Data", href: "/data" },
    { label: meta.title, href: `/data/${slug}` },
  ];
  const csv = `/data/${slug}/download`;

  if (meta.stats === "fisp") {
    const s = loadFisp();
    const asOf = s.as_of ?? "2026-11-07";
    return (
      <PageShell>
        <JsonLd
          data={datasetSchema({
            url: `/data/${slug}`,
            name: "NYC initial Unsafe and SWARMP facade filings, FISP Cycle 10",
            description: meta.description,
            temporalCoverage: `2025-02-21/${asOf}`,
            dateModified: asOf,
            isBasedOn: ["https://data.cityofnewyork.us/d/xubg-57si"],
            csvUrl: csv,
          })}
        />
        <Section pad="pt-10 pb-10 md:pt-14">
          <div className="flex max-w-[var(--text-w)] flex-col gap-8">
            <Breadcrumbs items={crumbs} />
            <h1 className="h1">NYC Unsafe facade filings, counted every week</h1>
            {s.cycle10_initial.unsafe != null && (
              <StatHero value={s.cycle10_initial.unsafe} label="initial Unsafe filings so far in FISP Cycle 10." asOf={asOf} />
            )}
          </div>
        </Section>
        <AnswerBlock q="How many NYC buildings have filed an Unsafe facade report in Cycle 10?" sourceName="DOB filings on NYC Open Data" sourceUrl="https://data.cityofnewyork.us/d/xubg-57si" checked={asOf}>
          As of {usDate(asOf)}, NYC buildings had filed {n(s.cycle10_initial.unsafe)} initial Unsafe and {n(s.cycle10_initial.swarmp)} initial
          SWARMP facade reports in FISP Cycle 10. In the 12 months to {s.last_12_months.to ? usDate(s.last_12_months.to) : "the latest count"},{" "}
          {n(s.last_12_months.unsafe_initial)} initial Unsafe reports were filed, about six a week.
        </AnswerBlock>
        <Section pad="pt-6 pb-16">
          <article className="prose">
            <h2>Cycle 10 so far</h2>
            <Table head={["Rating", "Initial filings"]} rows={[["Unsafe", s.cycle10_initial.unsafe], ["SWARMP", s.cycle10_initial.swarmp], ["Safe", s.cycle10_initial.safe]]} />
            <h2>By borough</h2>
            <Table head={["Borough", "Unsafe", "SWARMP"]} rows={s.by_borough.map((b) => [b.borough, b.unsafe, b.swarmp])} />
            <h2>By sub-cycle</h2>
            <p>
              Sub-cycle 10A (blocks ending 4, 5, 6, 9) closes <F id="fisp_10a" />. 10B closes <F id="fisp_10b" />. 10C closes <F id="fisp_10c" />.
            </p>
            <Table head={["Sub-cycle", "Unsafe", "SWARMP"]} rows={s.by_subcycle.map((b) => [b.subcycle, b.unsafe, b.swarmp])} />
            <h2>Monthly trend</h2>
            <BarChart title="Initial Unsafe filings per month" data={s.monthly.map((m) => ({ label: m.month, value: m.unsafe_initial }))} unit="Unsafe filings" />
            <p className="text-[13px] text-muted">
              Habitat reported in Aug 2026 that <F id="habitat_unsafe" /> of Cycle 9 filings were Unsafe, up from under 1% in Cycle 6.
            </p>
            <h2>Method</h2>
            <p>
              We count initial FISP filings in DOB NOW: Safety data published on NYC Open Data, deduplicated by building (BIN), and group them by the
              rating on the initial filing. Amended and subsequent filings are excluded so a building is counted once per cycle. Counts refresh weekly
              when the pipeline runs; the as-of date is the date of the pull.
            </p>
            <h2>Limits</h2>
            <ul>
              <li>Filing status, not proof of current condition. A building may have been repaired since its Unsafe filing.</li>
              <li>DOB data on Open Data lags DOB NOW by up to a few days.</li>
              <li>Early sub-cycle filings (allowed from <F id="fisp_early" /> for owners who missed Cycle 9) appear in the sub-cycle the building belongs to, not the date it filed.</li>
              <li>Borough, sub-cycle and monthly splits show "not yet counted" until the first full pipeline run writes them.</li>
            </ul>
            <h2>Download</h2>
            <p>
              <a href={csv}>Aggregate CSV (counts only)</a>. Licensed under our <a href="/terms">Terms</a>. Attribute as "Building Sauce count of NYC DOB data".
            </p>
            <CTABox
              title="For facade contractors: the buildings behind these counts, every Monday."
              body="Each row is one building with a new Unsafe or SWARMP filing, no repair permit yet, and the managing agent to call."
              href="/facade-restoration-leads"
              label="See the facade feed"
            />
          </article>
          <SourcesList
            sources={[
              { name: "NYC Open Data, DOB NOW: Safety facades filings", url: "https://data.cityofnewyork.us/d/xubg-57si", checked: asOf },
              { name: "NYC DOB Facade Compliance page", url: "https://www.nyc.gov/site/buildings/safety/facade-compliance.page", checked: "2026-11-07" },
              { name: "Habitat, Aug 21, 2026", url: "https://www.habitatmag.com/Archive2/445-August-2026/Stricter-Rules-and-Higher-Liability-Drive-Rise-in-NYC-Unsafe-Filings", checked: "2026-11-07" },
            ]}
          />
        </Section>
      </PageShell>
    );
  }

  if (meta.stats === "sheds") {
    const s = loadSheds();
    const asOf = s.as_of ?? "2026-11-07";
    const live = isDataPageLive("sheds");
    return (
      <PageShell>
        <JsonLd
          data={datasetSchema({
            url: `/data/${slug}`,
            name: "NYC active sidewalk sheds by age band",
            description: meta.description,
            temporalCoverage: `2026-01-12/${asOf}`,
            dateModified: asOf,
            isBasedOn: ["https://data.cityofnewyork.us/d/rbx6-tga4"],
            csvUrl: csv,
          })}
        />
        <Section pad="pt-10 pb-10 md:pt-14">
          <div className="flex max-w-[var(--text-w)] flex-col gap-8">
            <Breadcrumbs items={crumbs} />
            <h1 className="h1">NYC sidewalk sheds, and how long they've been up</h1>
            {live ? (
              <StatHero value={s.total_active as number} label="active sidewalk sheds in NYC." asOf={asOf} />
            ) : (
              <p className="lede">
                Our own weekly count starts with the first pipeline run. Until then this page carries the rules and an attributed city benchmark.
              </p>
            )}
          </div>
        </Section>
        <AnswerBlock q="What is a sidewalk shed and how long can one stay up?" sourceName="1 RCNY 102-07" sourceUrl="https://www.nyc.gov/assets/buildings/rules/1_RCNY_102-07.pdf">
          A sidewalk shed is a covered walkway built over a sidewalk to protect people from work or a hazard above. In NYC, an Unsafe facade filing
          requires one. Since 2026, shed permits run 90 days and facade sheds face repair milestones at 5, 8 and 24 months.
        </AnswerBlock>
        <Section pad="pt-6 pb-16">
          <article className="prose">
            <h2>By age</h2>
            <Table head={["Age band", "Sheds"]} rows={s.age_bands.map((a) => [a.band, a.count])} />
            <h2>By borough</h2>
            <Table head={["Borough", "Sheds"]} rows={s.by_borough.map((b) => [b.borough, b.count])} />
            {s.monthly.length > 0 && (
              <>
                <h2>New shed permits per month</h2>
                <BarChart title="New sidewalk shed permits per month" data={s.monthly.map((m) => ({ label: m.month, value: m.new_permits }))} unit="Permits" />
              </>
            )}
            <h2>Benchmark</h2>
            <p>
              {s.external_benchmark.source} reported on {usDate(s.external_benchmark.date)}: {s.external_benchmark.text}. That is their figure, not ours;
              our count will differ in method.
            </p>
            <h2>The rules</h2>
            <ul>
              <li>Permits issued or renewed since Feb 2, 2026 expire every <F id="shed_90" /> and do not renew automatically.</li>
              <li>1 RCNY 102-07 took effect <F id="shed_102" />. From the second renewal, work must happen in every permit period.</li>
              <li>Each renewal needs a progress report. No acceptable report: <F id="shed_progress" /> penalty.</li>
              <li>Facade sheds first permitted on or after Jan 12, 2026 must hit milestones at <F id="shed_milestones" />.</li>
            </ul>
            <h2>Method</h2>
            <p>
              We count active sidewalk shed permits in DOB permit data on NYC Open Data, deduplicated by building, and age each shed from its first
              permit issue date. A shed counts as active while its latest permit has not expired.
            </p>
            <h2>Limits</h2>
            <ul>
              <li>Permit status, not a street survey. A shed may be down before its permit expires, or up without one.</li>
              <li>Age is from the first permit on the current job, so a shed renewed under a new job number can look younger than it is.</li>
            </ul>
            <h2>Download</h2>
            <p>
              <a href={csv}>Aggregate CSV (counts only)</a>. Licensed under our <a href="/terms">Terms</a>.
            </p>
            <CTABox
              title="For shed and facade firms: buildings with a new shed and no repair permit, every Monday."
              body="A shed with no repair under way is a stalled job and a motivated owner. The feed lists them with the managing agent."
              href="/facade-restoration-leads"
              label="See the facade feed"
            />
          </article>
          <SourcesList
            sources={[
              { name: "NYC Open Data, DOB NOW: Build approved permits", url: "https://data.cityofnewyork.us/d/rbx6-tga4", checked: "2026-11-07" },
              { name: "1 RCNY 102-07", url: "https://www.nyc.gov/assets/buildings/rules/1_RCNY_102-07.pdf", checked: "2026-11-07" },
              { name: "Local Law 48 of 2025", url: "https://www.nyc.gov/assets/buildings/local_laws/ll48of2025.pdf", checked: "2026-11-07" },
            ]}
          />
        </Section>
      </PageShell>
    );
  }

  // garages
  const s = loadGarages();
  const asOf = s.as_of ?? "2026-11-07";
  return (
    <PageShell>
      <JsonLd
        data={datasetSchema({
          url: `/data/${slug}`,
          name: "NYC parking structures with active Unsafe or SREM status, Local Law 126",
          description: meta.description,
          temporalCoverage: `2022-01-01/${asOf}`,
          dateModified: asOf,
          isBasedOn: ["https://data.cityofnewyork.us/d/9ycp-w8r6"],
          csvUrl: csv,
        })}
      />
      <Section pad="pt-10 pb-10 md:pt-14">
        <div className="flex max-w-[var(--text-w)] flex-col gap-8">
          <Breadcrumbs items={crumbs} />
          <h1 className="h1">NYC parking garages with an Unsafe or SREM filing</h1>
          {s.active_status.total != null && (
            <StatHero value={s.active_status.total} label="parking structures with an active Unsafe or SREM condition assessment status." asOf={asOf} />
          )}
        </div>
      </Section>
      <AnswerBlock q="How many NYC parking garages have an Unsafe or SREM condition on file?" sourceName="DOB filings on NYC Open Data" sourceUrl="https://data.cityofnewyork.us/d/9ycp-w8r6" checked={asOf}>
        As of {usDate(asOf)}, our count of DOB parking structure filings on NYC Open Data showed {n(s.active_status.total)} structures whose latest
        Local Law 126 condition assessment is rated Unsafe or SREM. Status on file, not proof the repair is still open. Sub-cycle 1C, covering the
        Bronx, Queens and Staten Island, runs to <F id="ll126_1c" />.
      </AnswerBlock>
      <Section pad="pt-6 pb-16">
        <article className="prose">
          <h2>Active status</h2>
          <Table head={["Status", "Structures"]} rows={[["Unsafe", s.active_status.unsafe], ["SREM", s.active_status.srem], ["Total", s.active_status.total]]} />
          <h2>By borough</h2>
          <Table head={["Borough", "Unsafe", "SREM"]} rows={s.by_borough.map((b) => [b.borough, b.unsafe, b.srem])} />
          <h2>Monthly trend</h2>
          <BarChart title="New Unsafe condition assessments per month" data={s.monthly.map((m) => ({ label: m.month, value: m.unsafe }))} unit="Unsafe filings" />
          <h2>The rules</h2>
          <ul>
            <li>Owners file a condition assessment by a QPSI <F id="ll126_cycle" mode="value" />.</li>
            <li>Unsafe conditions must be repaired within <F id="ll126_unsafe_90" />.</li>
            <li>A SREM condition not corrected by the next inspection <F id="ll126_srem" mode="value" />.</li>
          </ul>
          <h2>Method</h2>
          <p>
            We take the latest condition assessment per parking structure in DOB NOW: Safety data on NYC Open Data and count structures whose latest
            rating is Unsafe or SREM. One structure, one count.
          </p>
          <h2>Limits</h2>
          <ul>
            <li>Status on file, not proof the repair is still open. An amended report may be pending.</li>
            <li>Borough and monthly splits show "not yet counted" until the first full pipeline run writes them.</li>
          </ul>
          <h2>Download</h2>
          <p>
            <a href={csv}>Aggregate CSV (counts only)</a>. Licensed under our <a href="/terms">Terms</a>.
          </p>
          <CTABox
            title="For garage and concrete contractors: the structures behind these counts, with the owner."
            body="Join the waitlist for the parking garage feed. One email when the first list is ready."
            href="/parking-garage-leads"
            label="Join the garage waitlist"
          />
        </article>
        <SourcesList
          sources={[
            { name: "NYC Open Data, DOB NOW: Safety parking structure filings", url: "https://data.cityofnewyork.us/d/9ycp-w8r6", checked: asOf },
            { name: "NYC DOB Parking Structures page", url: "https://www.nyc.gov/site/buildings/safety/parking-structure.page", checked: "2026-11-07" },
          ]}
        />
      </Section>
    </PageShell>
  );
}
