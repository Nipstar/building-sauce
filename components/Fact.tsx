import { fact } from "@/content/facts";
import { usDate } from "@/content/site";

/** Inline fact value, e.g. "$1,000 a month". Marks confidence for the build check. */
export function F({ id, mode = "value" }: { id: string; mode?: "value" | "text" }) {
  const f = fact(id);
  return (
    <span
      className={mode === "value" ? "fact-value" : undefined}
      data-fact-id={f.id}
      data-fact-confidence={f.confidence}
      title={`Source: ${f.sourceName}, checked ${usDate(f.checked)}`}
    >
      {mode === "value" ? f.value : f.text}
    </span>
  );
}

export function FactSource({ id, className = "" }: { id: string; className?: string }) {
  const f = fact(id);
  return (
    <span className={className}>
      Source:{" "}
      <a href={f.sourceUrl} rel="noopener" className="underline">
        {f.sourceName}
      </a>
      . Last checked {usDate(f.checked)}.
    </span>
  );
}
