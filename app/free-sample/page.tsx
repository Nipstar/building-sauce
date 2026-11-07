import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "Free Sample: Last Week's NYC Facade Leads | Building Sauce",
  description:
    "Ten real NYC buildings from last week's facade feed, with filing dates, permit status and the managing agent. Free, once per firm, no card.",
  path: "/free-sample",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "Free sample" });

export default function FreeSamplePage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema({ url: META.path, name: META.title, description: META.description })} />
      <Section pad="pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="flex flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free sample", href: "/free-sample" }]} />
            <h1 className="h1">Get last week's list, free.</h1>
            <p className="lede">
              Ten real buildings from last week's facade feed, with every field the paid list carries. Watermarked, once
              per firm.
            </p>
            <div>
              <h2 className="h3 mb-3">What you get</h2>
              <ul className="flex flex-col divide-y divide-hairline border-y border-hairline text-[15px] text-text-2">
                <li className="py-3">The filing and its date</li>
                <li className="py-3">The permit and shed status</li>
                <li className="py-3">The owner entity, managing agent and office line</li>
              </ul>
            </div>
            <div>
              <h2 className="h3 mb-2">What we ask</h2>
              <p className="text-[15px] leading-relaxed text-text-2">
                After you've looked at it, one reply: was each row useful, bad, or did you already know about it, and if
                so, from where. That's how we make the next list better.
              </p>
            </div>
            <p className="text-[13px] text-muted">
              Contractors and service firms only. One sample per firm. We don't share your details.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_380px]">
            <LeadForm
              formType="sample"
              trade="facade"
              title="Get last week's list free"
              intro="10 buildings with the full fields. Sent within one business day."
              roleOptions={["Facade restoration", "Sidewalk shed or scaffold", "Waterproofing", "Other"]}
              submitLabel="Send me the list"
              underButton="Contractors only. One sample per firm. We'll send the list and one follow-up asking if it was useful. Nothing else unless you ask."
              page="/free-sample"
            />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
