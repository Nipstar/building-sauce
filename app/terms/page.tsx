import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE, usd, usDate } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Building Sauce",
  description: "Terms for the Building Sauce lead feed: public-record data supplied as is, monthly billing, cancellation, no resale.",
  path: "/terms",
  eyebrow: "Terms",
});

export default function TermsPage() {
  const p = SITE.price;
  return (
    <PageShell>
      <div dangerouslySetInnerHTML={{ __html: "<!-- DRAFT: lawyer check before paid launch. Governing law set to England and Wales by default; confirm. -->" }} />
      <Section pad="pt-10 pb-20 md:pt-14">
        <div className="prose flex flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms", href: "/terms" }]} />
          <h1 className="h1">Terms of Service</h1>
          <p className="mono text-xs text-muted">Last updated {usDate(SITE.buildDate)}.</p>
          <p>
            These terms govern your use of the Building Sauce website and lead feeds (the Service), operated by{" "}
            {SITE.operator.name}, {SITE.operator.streetAddress}, {SITE.operator.addressLocality} {SITE.operator.postalCode},
            United Kingdom (we, us). By requesting a sample or subscribing you agree to them.
          </p>

          <h2>1. What the Service is</h2>
          <p>
            The Service is sales intelligence compiled from public records published by the City of New York and other
            public bodies. Each row reports a public filing, its date and the owner or managing agent of record. It is
            not legal, engineering, code-compliance or professional advice, and it is not a statement that any building
            requires work.
          </p>

          <h2>2. Data supplied as is</h2>
          <p>
            Public records contain errors and delays. We supply the Service as is and as available, without warranty of
            accuracy, completeness, fitness for a particular purpose or non-infringement. We do not warrant that any
            row will lead to work, a meeting or a contract, or that any contact is current. You must verify any record
            before relying on it.
          </p>

          <h2>3. Your outreach is your responsibility</h2>
          <p>
            You are solely responsible for how you contact anyone named in the Service and for complying with all laws
            that apply to that contact, including the Telephone Consumer Protection Act, CAN-SPAM, New York State and
            City rules on solicitation, and any do-not-call requirements. You will not contact tenants or residential
            occupants using the Service, and you will not use the Service to pressure tenants to vacate.
          </p>

          <h2>4. Licence and no resale</h2>
          <p>
            We grant you a non-exclusive, non-transferable licence to use the feed for your own firm's business
            development. You may not resell, sublicense, publish, share outside your firm, or use the feed to build a
            competing product. Each feed is shared with up to {p.cap} subscribing firms; we do not promise exclusivity.
          </p>

          <h2>5. Free sample</h2>
          <p>
            One free sample per firm, for contractors and service firms only. We may decline or withdraw a sample at
            our discretion. Samples are watermarked.
          </p>

          <h2>6. Billing and cancellation</h2>
          <p>
            Subscriptions are billed monthly in advance in US dollars by card at {usd(p.monthly)} a
            month per feed, or {usd(p.founding)} a month for the first {p.foundingSeats} subscribing firms for as long
            as they remain continuously subscribed. You may cancel at any time by replying to any invoice email; the
            cancellation takes effect at the end of the paid month and no further charge is made. Fees already paid are
            not refunded except as set out in section 7.
          </p>

          <h2>7. Quiet month rule</h2>
          <p>
            If, in our reasonable judgement, a billing month produces no building worth a call for your trade, the
            following month is free. This is our only guarantee.
          </p>

          <h2>8. Changes and suspension</h2>
          <p>
            We may change the Service, its sources or its format, and may suspend or end a feed. If we end a feed you
            have paid for, we refund the unused part of that month. We may suspend your access without refund if you
            breach section 3 or 4.
          </p>

          <h2>9. Liability</h2>
          <p>
            To the fullest extent permitted by law, our total liability to you arising out of or in connection with the
            Service in any twelve-month period is limited to the fees you paid us in that period. We are not liable for
            indirect, consequential or special loss, loss of profit, or loss of business. Nothing in these terms limits
            liability that cannot be limited by law.
          </p>

          <h2>10. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales. The courts of England and Wales have
            non-exclusive jurisdiction.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
