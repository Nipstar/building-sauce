import { ButtonLink } from "./Buttons";

/** Inline box on guides and data pages linking to the matching feed page. */
export function CTABox({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <aside className="my-10 flex max-w-[var(--text-w)] flex-col gap-4 border-2 border-ink p-6">
      <div className="eyebrow">For contractors</div>
      <p className="text-lg font-semibold leading-snug text-ink">{title}</p>
      <p className="text-[15px] leading-relaxed text-text-2">{body}</p>
      <div>
        <ButtonLink href={href} variant="ink">
          {label}
        </ButtonLink>
      </div>
    </aside>
  );
}
