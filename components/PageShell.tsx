import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({
  children,
  collapsed = false,
  ctaHref,
  ctaLabel,
}: {
  children: ReactNode;
  collapsed?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader collapsed={collapsed} ctaHref={ctaHref} ctaLabel={ctaLabel} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
