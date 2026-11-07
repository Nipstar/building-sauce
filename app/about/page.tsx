import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/content/site";
import { webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "About Building Sauce | Run by Antek Automation",
  description:
    "Building Sauce is a contractor lead feed built from public NYC records, run by Antek Automation, a UK data and automation business.",
  path: "/about",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "About" });

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={webPageSchema({ url: META.path, name: META.title, description: META.description, type: "AboutPage" })} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="prose flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
          <h1 className="h1">Who runs Building Sauce</h1>
          <p>
            Building Sauce is run by Antek Automation, a UK data and automation business. We build data pipelines and
            automation for service businesses. Building Sauce applies that to one question contractors ask every week:
            which buildings have a reason to hire someone, and who decides.
          </p>
          <p>{SITE.entityDescription}</p>
          <h2>How we work</h2>
          <p>
            We read public records, join them by building, and send the result to the trade that fixes the problem. We
            do not inspect buildings, give engineering or legal advice, or contact owners on anyone's behalf. Every row
            carries the record ID and date so you can check it on the City's own site.
          </p>
          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Operator details are in the footer of every page.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
