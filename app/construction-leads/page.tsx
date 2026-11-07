import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide } from "@/lib/mdx";
import { pageMetadata } from "@/lib/seo";

const SLUG = "construction-leads";

export async function generateMetadata(): Promise<Metadata> {
  const g = getGuide(SLUG);
  if (!g) return {};
  return pageMetadata({ title: g.fm.title, description: g.fm.description, path: g.url, eyebrow: "Guide", noindex: g.fm.draft || g.verifyFactIds.length > 0 });
}

export default async function ConstructionLeadsPage() {
  const g = getGuide(SLUG);
  if (!g) notFound();
  return (
    <PageShell>
      <GuideArticle
        guide={g}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Construction leads", href: g.url },
        ]}
      />
    </PageShell>
  );
}
