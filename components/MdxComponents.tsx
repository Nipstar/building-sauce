import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { GuideFrontmatter } from "@/content/types";
import { CTABox } from "./CTABox";
import { F } from "./Fact";
import { KeyFacts } from "./KeyFacts";

/** Components available inside guide MDX. Keep this list short and documented in HANDOVER.md. */
export function mdxComponents(fm: GuideFrontmatter): MDXComponents {
  return {
    F,
    KeyFacts,
    CTA: () => (
      <CTABox
        title={`For contractors: get the weekly list behind this guide.`}
        body={`Building Sauce sends the buildings this rule applies to, with the filing date and the managing agent, every Monday. Start with a free sample.`}
        href={fm.feed}
        label={fm.feedLabel}
      />
    ),
    table: (props) => (
      <div className="table-wrap">
        <table {...props} />
      </div>
    ),
    a: ({ href = "", children, ...rest }) =>
      href.startsWith("/") ? (
        <Link href={href} {...rest}>
          {children}
        </Link>
      ) : (
        <a href={href} rel="noopener" {...rest}>
          {children}
        </a>
      ),
  };
}
