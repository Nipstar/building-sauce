import type { ReactNode } from "react";
import type { LinkRef } from "@/content/types";
import { ButtonLink } from "./Buttons";
import { Eyebrow } from "./Section";

export function Hero({
  eyebrow,
  h1,
  sub,
  primary,
  secondary,
  micro,
  aside,
}: {
  eyebrow: string;
  h1: string;
  sub: string;
  primary?: LinkRef;
  secondary?: LinkRef;
  micro?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="px-4 pb-16 pt-16 md:pb-20 md:pt-24">
      <div className="mx-auto flex max-w-[var(--max-w)] flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h1 max-w-[20ch]">{h1}</h1>
          <p className="lede max-w-[600px]">{sub}</p>
          {(primary || secondary) && (
            <div className="flex flex-wrap items-center gap-3">
              {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary && (
                <ButtonLink href={secondary.href} variant="ghost">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
          {micro && <p className="text-[13px] text-muted">{micro}</p>}
        </div>
        {aside && <div className="min-w-0 flex-[1_1_400px]">{aside}</div>}
      </div>
    </div>
  );
}
