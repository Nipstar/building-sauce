import { fact } from "@/content/facts";
import { usDate } from "@/content/site";

/** Two-column fact table rendered from facts.ts with source links. */
export function KeyFacts({ ids, title = "Key facts" }: { ids: string[]; title?: string }) {
  return (
    <div className="my-10 border-t border-ink">
      <h2 className="h3 py-4">{title}</h2>
      <dl>
        {ids.map((id) => {
          const f = fact(id);
          return (
            <div
              key={id}
              className="grid gap-2 border-t border-hairline py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
              data-fact-id={f.id}
              data-fact-confidence={f.confidence}
            >
              <dt className="mono text-[15px] font-medium text-accent">{f.value}</dt>
              <dd className="text-[15px] leading-relaxed text-text-2">
                {f.text}{" "}
                <span className="text-[13px] text-muted">
                  (
                  <a href={f.sourceUrl} rel="noopener" className="text-muted underline hover:text-accent">
                    {f.sourceName}
                  </a>
                  , checked {usDate(f.checked)})
                </span>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
