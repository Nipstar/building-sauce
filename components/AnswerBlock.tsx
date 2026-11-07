import { SITE, usDate } from "@/content/site";

/**
 * The GEO block: 40 to 60 word direct answer, dated and sourced. Sits under
 * the hero on feed, guide and data pages.
 */
export function AnswerBlock({
  q,
  children,
  sourceName,
  sourceUrl,
  checked = SITE.buildDate,
}: {
  q: string;
  children: React.ReactNode;
  sourceName: string;
  sourceUrl: string;
  checked?: string;
}) {
  return (
    <section className="px-4" aria-labelledby="answer-heading">
      <div className="mx-auto max-w-[var(--max-w)] border-y border-hairline py-8">
        <div className="max-w-[var(--text-w)]">
          <h2 id="answer-heading" className="h3 mb-3">
            {q}
          </h2>
          <p className="text-[17px] leading-relaxed text-ink">{children}</p>
          <p className="mono mt-4 text-xs text-muted">
            Last checked {usDate(checked)}. Source:{" "}
            <a href={sourceUrl} rel="noopener" className="text-muted underline hover:text-accent">
              {sourceName}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
