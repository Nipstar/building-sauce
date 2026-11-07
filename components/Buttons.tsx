import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex h-[52px] items-center justify-center px-6 text-base font-semibold no-underline transition-colors";

export function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "ink" | "ghost" | "white";
  className?: string;
}) {
  const styles = {
    accent: "bg-accent text-white hover:bg-accent-hover hover:text-white",
    ink: "bg-ink text-white hover:bg-accent hover:text-white",
    ghost: "px-2 text-ink font-medium hover:text-accent",
    white: "bg-white text-ink hover:bg-paper hover:text-ink",
  }[variant];
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
