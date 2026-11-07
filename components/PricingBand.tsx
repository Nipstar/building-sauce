import type { ReactNode } from "react";
import { SITE, usd } from "@/content/site";
import { Eyebrow, Section } from "./Section";

/**
 * Dark band with the price on the left and a white form card on the right.
 * `waitlist` swaps the price for "Join the waitlist".
 */
export function PricingBand({
  variant,
  feedName,
  children,
  id = "pricing",
}: {
  variant: "live" | "waitlist";
  feedName: string;
  children: ReactNode;
  id?: string;
}) {
  const p = SITE.price;
  const live = variant === "live";
  return (
    <Section tone="dark" id={id}>
      <div className="flex flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <Eyebrow>{live ? "Pricing" : "Waitlist"}</Eyebrow>
          <h2 className="h2">
            {live
              ? `${usd(p.monthly)} a month. Cancel any time. First list the Monday after you say yes.`
              : `Join the waitlist for the ${feedName.toLowerCase()} feed.`}
          </h2>
          <ul className="flex flex-col gap-2 text-[15px] leading-[1.55] text-dark-text">
            {live ? (
              <>
                <li>Weekly feed, all five boroughs, every building that meets the trigger that week</li>
                <li>Shared list, capped at {p.cap} firms</li>
                <li>
                  Founding offer: the first {p.foundingSeats} firms pay {usd(p.founding)} a month for as long as
                  they stay. Firm {p.foundingSeats + 1} onward pays {usd(p.monthly)}
                </li>
                <li>Quiet month rule: if a month has no building worth a call, next month is free</li>
                <li>No setup fee, no contract, pay by card</li>
              </>
            ) : (
              <>
                <li>One email when the first list is ready. Nothing else</li>
                <li>Same format as the facade feed: weekly email, CSV and web page</li>
                <li>Same price: {usd(p.monthly)} a month, month to month, capped at {p.cap} firms</li>
                <li>Which trade we build next depends on who joins the waitlist</li>
              </>
            )}
          </ul>
          <p className="text-[13px] text-dark-text">
            {live
              ? `Start with last week's list, free. If it isn't worth ${usd(p.monthly)} to you after you've phoned three rows, don't subscribe.`
              : "No card, no commitment. We will not email you about anything else."}
          </p>
        </div>
        <div className="min-w-0 flex-[1_1_380px]">{children}</div>
      </div>
    </Section>
  );
}
