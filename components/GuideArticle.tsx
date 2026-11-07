import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Guide } from "@/lib/mdx";
import { articleSchema } from "@/lib/schema";
import { AnswerBlock } from "./AnswerBlock";
import { Breadcrumbs } from "./Breadcrumbs";
import { Byline } from "./Byline";
import { CTABox } from "./CTABox";
import { FAQList } from "./FAQList";
import { JsonLd } from "./JsonLd";
import { KeyFacts } from "./KeyFacts";
import { mdxComponents } from "./MdxComponents";
import { Section } from "./Section";
import { SourcesList } from "./SourcesList";
import Link from "next/link";

/**
 * Guide template: Breadcrumbs, H1, Byline, AnswerBlock, KeyFacts, body
 * (H2 per question, <CTA/> after the second H2), CTABox at the end, FAQ,
 * Sources. Article + FAQPage + BreadcrumbList JSON-LD.
 */
export async function GuideArticle({ guide, crumbs }: { guide: Guide; crumbs?: { label: string; href: string }[] }) {
  const { fm } = guide;
  const { content } = await compileMDX({
    source: guide.source,
    components: mdxComponents(fm),
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  const trail = crumbs ?? [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: fm.h1, href: guide.url },
  ];
  return (
    <>
      <JsonLd data={articleSchema(fm, guide.url)} />
      <Section pad="pt-10 pb-6 md:pt-14">
        <div className="flex max-w-[var(--text-w)] flex-col gap-5">
          <Breadcrumbs items={trail} />
          <h1 className="h1">{fm.h1}</h1>
          <Byline updated={fm.updated} />
        </div>
      </Section>
      <AnswerBlock q={`${fm.h1.replace(/[.:]$/, "")}: the short answer`} sourceName={fm.answerSource.name} sourceUrl={fm.answerSource.url} checked={fm.updated}>
        {fm.answer}
      </AnswerBlock>
      <Section pad="pt-4 pb-16">
        <article className="prose">
          <KeyFacts ids={fm.facts} />
          {content}
          <CTABox
            title="For contractors: get the weekly list of the buildings this rule applies to."
            body="Each row is a building with a dated filing, the permit status and the managing agent to call. Start with a free sample of last week's list."
            href={fm.feed}
            label={fm.feedLabel}
          />
          {fm.data && (
            <p className="text-[15px] text-text-2">
              Numbers behind this guide:{" "}
              <Link href={fm.data} className="font-semibold">
                {fm.dataLabel ?? fm.data}
              </Link>
              .
            </p>
          )}
        </article>
        <div className="mt-12 max-w-[var(--text-w)]">
          <FAQList compact h2="Questions people ask" items={fm.faq} />
        </div>
        <SourcesList sources={fm.sources} />
      </Section>
    </>
  );
}
