import Link from "next/link";
import { usDate } from "@/content/site";

export function StatHero({
  value,
  label,
  asOf,
  link,
}: {
  value: string | number;
  label: string;
  asOf: string;
  link?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="mono text-[64px] font-medium leading-none tracking-tight text-ink md:text-[88px]">
        {typeof value === "number" ? value.toLocaleString("en-US") : value}
      </div>
      <p className="max-w-[48ch] text-lg text-text-2">
        {label} <span className="mono text-sm text-muted">As of {usDate(asOf)}.</span>
      </p>
      {link && (
        <Link href={link.href} className="text-sm font-semibold text-accent">
          {link.label}
        </Link>
      )}
    </div>
  );
}
