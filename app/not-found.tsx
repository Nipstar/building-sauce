import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { FEEDS } from "@/content/feeds";
import { FOOTER_COLUMNS } from "@/content/site";

export default function NotFound() {
  const guides = FOOTER_COLUMNS[1].links;
  return (
    <PageShell>
      <Section pad="pt-14 pb-24">
        <div className="flex max-w-[var(--text-w)] flex-col gap-8">
          <div className="eyebrow">404</div>
          <h1 className="h1">That page is not on file.</h1>
          <p className="lede">Try a feed or a guide instead.</p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="h3 mb-3">Feeds</h2>
              <ul className="flex flex-col gap-2 text-[15px]">
                {FEEDS.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/${f.slug}`}>{f.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h3 mb-3">Guides</h2>
              <ul className="flex flex-col gap-2 text-[15px]">
                {guides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href}>{g.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
