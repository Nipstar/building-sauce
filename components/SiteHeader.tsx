import Link from "next/link";
import { NAV } from "@/content/site";
import { Logo } from "./Logo";

/**
 * Site header. `collapsed` (feed pages) keeps only the logo and the CTA so the
 * cold-email landing page stays focused. The Feeds dropdown is a native
 * <details>, so it works with no JavaScript and is keyboard accessible.
 */
export function SiteHeader({ collapsed = false, ctaHref = NAV.cta.href, ctaLabel = NAV.cta.label }: {
  collapsed?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <header className="border-b border-hairline px-4">
      <div className="mx-auto flex min-h-16 max-w-[var(--max-w)] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Logo />
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium">
          {!collapsed && (
            <>
              <details className="group relative">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-ink [&::-webkit-details-marker]:hidden">
                  Feeds
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="transition-transform group-open:rotate-180">
                    <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </summary>
                <ul className="absolute left-0 z-20 mt-1 w-56 border border-hairline bg-white py-2 shadow-none">
                  {NAV.feeds.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href} className="block px-4 py-2.5 text-ink no-underline hover:bg-paper">
                        {f.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
              {NAV.primary.map((l) => (
                <Link key={l.href} href={l.href} className="flex min-h-11 items-center text-ink no-underline hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </>
          )}
          <Link
            href={ctaHref}
            className="inline-flex h-11 items-center bg-ink px-[18px] font-semibold text-white no-underline hover:bg-accent hover:text-white"
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
