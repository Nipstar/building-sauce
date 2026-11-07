import Link from "next/link";
import { FOOTER_COLUMNS, SITE } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-hairline px-4">
      <div className="mx-auto max-w-[var(--max-w)] py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-[36ch] text-sm leading-relaxed text-text-2">{SITE.entityDescription}</p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mono mb-3 text-[11px] uppercase tracking-[0.12em] text-muted">{col.heading}</h2>
              <ul className="flex flex-col gap-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-0.5 text-ink no-underline hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-[13px] text-muted">
          <p>
            {SITE.operator.line}{" "}
            <a href={`mailto:${SITE.email}`} className="text-muted underline hover:text-accent">
              {SITE.email}
            </a>
          </p>
          <p>{SITE.footerSmallPrint}</p>
          <p>{SITE.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
