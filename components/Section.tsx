import type { ReactNode } from "react";

type Tone = "white" | "dark" | "paper";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  dark: "bg-ink text-white",
  paper: "bg-paper text-ink",
};

export function Section({
  tone = "white",
  children,
  id,
  className = "",
  pad = "py-16 md:py-20",
  as: Tag = "section",
  labelledBy,
}: {
  tone?: Tone;
  children: ReactNode;
  id?: string;
  className?: string;
  pad?: string;
  as?: "section" | "div";
  labelledBy?: string;
}) {
  return (
    <Tag id={id} className={`${tones[tone]} px-4 ${pad} ${className}`} aria-labelledby={labelledBy}>
      <div className="mx-auto max-w-[var(--max-w)]">{children}</div>
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`eyebrow ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  h2,
  id,
  className = "",
}: {
  eyebrow?: string;
  h2: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`flex max-w-[var(--text-w)] flex-col gap-3 ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="h2">
        {h2}
      </h2>
    </div>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`prose ${className}`}>{children}</div>;
}
