import Link from "next/link";
import type { FeedStatus } from "@/content/types";

const statusLabel: Record<FeedStatus, string> = {
  live: "LIVE",
  next: "NEXT",
  "2027": "2027",
  planned: "PLANNED",
};

export function FeedCard({
  href,
  status,
  region,
  name,
  copy,
  linkText,
}: {
  href: string;
  status: FeedStatus;
  region: string;
  name: string;
  copy: string;
  linkText: string;
}) {
  const live = status === "live";
  return (
    <Link
      href={href}
      className={`flex flex-col gap-3 p-7 text-ink no-underline ${live ? "border-2 border-ink" : "border border-hairline hover:border-ink"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`mono text-[11px] tracking-[0.12em] ${live ? "text-accent" : "text-muted"}`}>
          {statusLabel[status]}
        </span>
        <span className="mono text-[11px] text-muted">{region}</span>
      </div>
      <h3 className="text-2xl font-bold tracking-[-0.01em]">{name}</h3>
      <p className="text-[15px] leading-[1.55] text-text-2">{copy}</p>
      <span className={`text-sm font-semibold ${live ? "text-accent" : "text-ink"}`}>{linkText}</span>
    </Link>
  );
}

export function FeedCardDashed({ email }: { email: string }) {
  return (
    <div className="flex flex-col justify-center gap-3 border border-dashed border-dashed p-7">
      <h3 className="text-lg font-semibold">Your trade, your city?</h3>
      <p className="text-[15px] leading-[1.55] text-text-2">
        If a public record in your city says a building needs your trade, we can probably build a feed on it. Tell us
        the record.{" "}
        <a href={`mailto:${email}`} className="underline">
          {email}
        </a>
      </p>
    </div>
  );
}
