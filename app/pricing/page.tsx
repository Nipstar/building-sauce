import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/Section";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/Buttons";
import { FAQList } from "@/components/FAQList";
import { NeedPayoffBand } from "@/components/NeedPayoffBand";
import { SITE, usd } from "@/content/site";
import { productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const META = {
  title: "Pricing: $400 a Month Per Feed | Building Sauce",
  description:
    "One feed, one trade, one city: $400 a month, month to month, paid by card. No setup fee, no contract. Start with a free sample of last week's list.",
  path: "/pricing",
};

export const metadata: Metadata = pageMetadata({ ...META, eyebrow: "Pricing" });

const ROWS = [
  { feed: "Facade (NYC)", status: "Live", price: `${usd(SITE.price.monthly)} a month`, href: "/facade-restoration-leads" },
  { feed: "Parking garages (NYC)", status: "Next", price: "Waitlist", href: "/parking-garage-leads" },
  { feed: "Gas piping (NYC)", status: "2027", price: "Waitlist", href: "/gas-piping-leads" },
  { feed: "Boilers, Mold, Roofing (NYC)", status: "Planned", price: "Waitlist", href: "/boiler-repair-leads" },
  { feed: "Florida condos", status: "Planned", price: "Waitlist", href: "/florida-condo-leads" },
];

export default function PricingPage() {
  const p = SITE.price;
  const stripe = p.stripeLinkFacade || "/free-sample";
  return (
    <PageShell>
      <JsonLd data={productSchema()} />
      <Section pad="pt-10 pb-12 md:pt-14">
        <div className="flex max-w-[var(--text-w)] flex-col gap-6">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing", href: "/pricing" }]} />
          <h1 className="h1">One price per feed. {usd(p.monthly)} a month, month to month.</h1>
          <p className="lede">Price it against one job, not against other lead lists.</p>
        </div>
      </Section>

      <Section pad="pb-12">
        <div className="table-wrap max-w-[var(--text-w)]">
          <table className="w-full min-w-[480px] text-[15px]">
            <thead>
              <tr className="border-b border-ink text-left">
                <th scope="col" className="py-3 pr-4 font-semibold">Feed</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Status</th>
                <th scope="col" className="py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feed} className="border-b border-hairline">
                  <td className="py-3 pr-4">
                    <a href={r.href} className="font-medium text-ink">
                      {r.feed}
                    </a>
                  </td>
                  <td className="mono py-3 pr-4 text-[13px] text-muted">{r.status.toUpperCase()}</td>
                  <td className="py-3">{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="h3 mb-4">Included</h2>
            <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-2">
              <li>Weekly email at 7am Eastern every Monday</li>
              <li>CSV and a hosted web page</li>
              <li>All five boroughs</li>
              <li>Record ID and date on every row</li>
              <li>Deed-checked decider: owner entity, managing agent, head officer, office line</li>
              <li>Permit status</li>
              <li>1 to 5 score</li>
              <li>Suggested opening line per building</li>
            </ul>
          </div>
          <div>
            <h2 className="h3 mb-4">Not included</h2>
            <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-2">
              <li>Appointments, calls or emails to owners on your behalf</li>
              <li>A login or portal</li>
              <li>Exclusivity</li>
              <li>Personal phone numbers or home addresses</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex max-w-[var(--text-w)] flex-col gap-6">
          <h2 className="h3">Terms</h2>
          <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-2">
            <li>Card payment through Stripe. Billed monthly in USD from the day you start.</li>
            <li>Cancel by replying to any invoice. No notice period.</li>
            <li>
              Founding offer: the first {p.foundingSeats} firms pay {usd(p.founding)} a month for as long as they stay.
              Firm {p.foundingSeats + 1} onward pays {usd(p.monthly)}.
            </li>
            <li>Quiet month rule: if a month has no building worth a call, next month is free.</li>
            <li>Shared list, capped at {p.cap} firms per feed.</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={stripe}>Start the facade feed</ButtonLink>
            <ButtonLink href="/free-sample" variant="ghost">
              Get a free sample first
            </ButtonLink>
          </div>
          {!p.stripeLinkFacade && (
            <p className="text-[13px] text-muted">Card checkout opens with the first paid list. Until then, start with the free sample.</p>
          )}
        </div>
      </Section>

      <NeedPayoffBand
        h2="What's a typical facade job worth to your firm?"
        body="If one job a year covers the list, the rest is margin."
      />

      <FAQList
        h2="Pricing questions"
        items={[
          { q: "Is there a contract?", a: "No." },
          { q: "Can I pause?", a: "Yes, cancel and restart when you want." },
          { q: "Do you invoice in USD?", a: "Yes." },
          { q: "Can I get a borough to myself?", a: "Not offered right now. Ask if it matters to you." },
          {
            q: "What does the founding offer mean?",
            a: `The first ${p.foundingSeats} firms to subscribe pay ${usd(p.founding)} a month and keep that rate for as long as they stay subscribed. From firm ${p.foundingSeats + 1} the price is ${usd(p.monthly)}.`,
          },
        ]}
      />
    </PageShell>
  );
}
