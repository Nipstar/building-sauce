import type { SampleRow } from "@/content/types";

export function SampleRowCard({ row }: { row: SampleRow }) {
  return (
    <aside className="flex flex-col gap-3.5 border border-hairline bg-paper p-6 text-sm" aria-label="One row from the feed">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="mono text-[11px] tracking-[0.12em] text-muted">ONE ROW FROM THE FEED</span>
        <span className="mono bg-ink px-2 py-1 text-[11px] text-white">SCORE {row.score}/5</span>
      </div>
      <div className="text-lg font-semibold">{row.title}</div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-text-2">
        {row.fields.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] uppercase tracking-[0.08em] text-muted">{f.label}</dt>
            <dd className="font-medium text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-hairline pt-3 text-xs text-muted">{row.source}</p>
    </aside>
  );
}
