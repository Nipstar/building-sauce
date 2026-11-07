import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, usDate } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Building Sauce",
  description: "What the Building Sauce forms collect, who processes it, how long it is kept, and how to contact us.",
  path: "/privacy",
  eyebrow: "Privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <div dangerouslySetInnerHTML={{ __html: "<!-- DRAFT: lawyer check before paid launch. -->" }} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="prose flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy" }]} />
          <h1 className="h1">Privacy Policy</h1>
          <p className="mono text-xs text-muted">Last updated {usDate(SITE.buildDate)}.</p>
          <p>
            This policy explains what {SITE.operator.name} (we, us), the operator of Building Sauce, collects from
            visitors to this site and subscribers to the feed, and what we do with it.
          </p>

          <h2>1. What the forms collect</h2>
          <p>
            When you request a sample, join a waitlist or contact us, we collect the name, firm, work email, phone
            (optional), borough or region, role and message you give us, plus the page you were on, any campaign tags
            in the link you arrived from, and the time of submission. We use this to send what you asked for and one
            follow-up asking whether it was useful.
          </p>

          <h2>2. Site analytics</h2>
          <p>
            We use Cloudflare Web Analytics, which does not use cookies or track you across sites. We do not use
            advertising trackers. There is no cookie banner because there are no tracking cookies.
          </p>

          <h2>3. Who processes it</h2>
          <p>
            Form data passes through Cloudflare (bot protection and network), our hosting provider, our own n8n
            automation server, GoHighLevel (our contact database and email tool) and, if you subscribe, Stripe (card
            payments). We do not sell personal data.
          </p>

          <h2>4. Public-record data in the feed</h2>
          <p>
            The feed contains business contact details drawn from public records published by the City of New York,
            such as HPD property registrations. We publish aggregates only on this site. If you are a managing agent or
            officer named in a public registration and want to know what we hold, email us.
          </p>

          <h2>5. Retention</h2>
          <p>
            Form submissions are kept for as long as you have an open sample, waitlist place or subscription, and for
            24 months after the last contact, then deleted. You can ask us to delete your details sooner at any time.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You can ask for a copy of the personal data we hold about you, ask us to correct or delete it, or object to
            how we use it. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We reply within one month.
          </p>

          <h2>7. Contact</h2>
          <p>
            {SITE.operator.name}, {SITE.operator.streetAddress}, {SITE.operator.addressLocality} {SITE.operator.postalCode},
            United Kingdom. <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
