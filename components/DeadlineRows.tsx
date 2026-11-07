import { fact } from "@/content/facts";
import type { DeadlineRow } from "@/content/types";
import { Section, SectionHeading } from "./Section";

/** Implication block: mono figure on the left, text on the right. Figures from facts.ts. */
export function DeadlineRows({
  eyebrow,
  h2,
  rows,
  sourceLine,
  id,
}: {
  eyebrow: string;
  h2: string;
  rows: DeadlineRow[];
  sourceLine: string;
  id?: string;
}) {
  return (
    <Section id={id}>
      <div className="flex flex-wrap items-start gap-12">
        <div className="min-w-0 flex-[1_1_400px]">
          <SectionHeading eyebrow={eyebrow} h2={h2} />
        </div>
        <div className="min-w-0 flex-[1_1_480px]">
          <dl>
            {rows.map((row) => {
              const f = fact(row.factId);
              return (
                <div
                  key={row.factId}
                  className="flex flex-col gap-2 border-t border-hairline py-5 last:border-b sm:flex-row sm:gap-5"
                  data-fact-id={f.id}
                  data-fact-confidence={f.confidence}
                >
                  <dt className="mono min-w-[140px] text-[22px] font-medium leading-tight text-accent">
                    {row.figure ?? f.value}
                  </dt>
                  <dd className="text-[15px] leading-[1.55] text-text-2">{row.text ?? f.text}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-4 text-[13px] text-muted">{sourceLine}</p>
        </div>
      </div>
    </Section>
  );
}
