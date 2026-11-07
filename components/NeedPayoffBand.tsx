import { Eyebrow, Section } from "./Section";

export function NeedPayoffBand({ eyebrow, h2, body }: { eyebrow?: string; h2: string; body: string }) {
  return (
    <Section tone="paper">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="h2">{h2}</h2>
        <p className="max-w-[60ch] text-[17px] leading-relaxed text-text-2">{body}</p>
      </div>
    </Section>
  );
}
