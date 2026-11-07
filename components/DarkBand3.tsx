import type { TitledItem } from "@/content/types";
import { Section, SectionHeading } from "./Section";

export function DarkBand3({
  eyebrow,
  h2,
  items,
  numbered = false,
  id,
}: {
  eyebrow?: string;
  h2?: string;
  items: TitledItem[];
  numbered?: boolean;
  id?: string;
}) {
  return (
    <Section tone="dark" id={id}>
      <div className="flex flex-col gap-10">
        {h2 && <SectionHeading eyebrow={eyebrow} h2={h2} />}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-2.5 border-t border-hairline-dark pt-5">
              {numbered && <div className="mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</div>}
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-[15px] leading-[1.55] text-dark-text">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
