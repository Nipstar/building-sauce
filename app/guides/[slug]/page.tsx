import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { GuideArticle } from "@/components/GuideArticle";
import { getGuide, listGuides } from "@/lib/mdx";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return listGuides()
    .filter((g) => !g.fm.url)
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g || g.fm.url) return {};
  return pageMetadata({
    title: g.fm.title,
    description: g.fm.description,
    path: g.url,
    eyebrow: "Guide",
    noindex: g.fm.draft || g.verifyFactIds.length > 0,
  });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g || g.fm.url) notFound();
  return (
    <PageShell>
      <GuideArticle guide={g} />
    </PageShell>
  );
}
