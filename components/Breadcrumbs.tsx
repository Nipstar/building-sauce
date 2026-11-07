import Link from "next/link";
import type { LinkRef } from "@/content/types";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: LinkRef[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="mono text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-muted no-underline hover:text-accent">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
