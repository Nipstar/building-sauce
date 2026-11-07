import type { FAQItem } from "@/content/types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";
import { Section, SectionHeading } from "./Section";

/** Native <details> list. Also emits FAQPage JSON-LD from the same data. */
export function FAQList({
  items,
  eyebrow = "Fair questions",
  h2,
  compact = false,
}: {
  items: FAQItem[];
  eyebrow?: string;
  h2?: string;
  compact?: boolean;
}) {
  const list = (
    <div className="max-w-[var(--text-w)] border-t border-hairline">
      {items.map((item) => (
        <details key={item.q} className="faq border-b border-hairline">
          <summary>
            <span>{item.q}</span>
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed text-text-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
  return (
    <>
      <JsonLd data={faqSchema(items)} />
      {compact ? (
        <div className="flex flex-col gap-6">
          {h2 && <SectionHeading eyebrow={eyebrow} h2={h2} />}
          {list}
        </div>
      ) : (
        <Section>
          <div className="flex flex-col gap-8">
            {h2 && <SectionHeading eyebrow={eyebrow} h2={h2} />}
            {list}
          </div>
        </Section>
      )}
    </>
  );
}
