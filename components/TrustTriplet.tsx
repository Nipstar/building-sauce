import type { TitledItem } from "@/content/types";
import { Section } from "./Section";

export function TrustTriplet({ items, variant = "band" }: { items: TitledItem[]; variant?: "band" | "cards" }) {
  if (variant === "cards") {
    return (
      <Section pad="pb-16 md:pb-20">
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((i) => (
            <li key={i.title} className="flex flex-col gap-1.5 border border-hairline p-5">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm leading-relaxed text-text-2">{i.body}</p>
            </li>
          ))}
        </ul>
      </Section>
    );
  }
  return (
    <Section tone="paper">
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <li key={i.title} className="flex flex-col gap-1.5">
            <h3 className="font-semibold">{i.title}</h3>
            <p className="text-sm leading-relaxed text-text-2">{i.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
