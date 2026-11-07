import type { SourceRef } from "@/content/types";
import { usDate } from "@/content/site";

export function SourcesList({ sources, title = "Sources" }: { sources: SourceRef[]; title?: string }) {
  return (
    <section className="my-12 max-w-[var(--text-w)]" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="h3 border-t border-ink py-4">
        {title}
      </h2>
      <ol className="list-decimal pl-5 text-[15px] leading-relaxed text-text-2">
        {sources.map((s) => (
          <li key={s.url} className="py-1">
            <a href={s.url} rel="noopener" className="underline">
              {s.name}
            </a>
            <span className="mono text-[12px] text-muted"> checked {usDate(s.checked)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
