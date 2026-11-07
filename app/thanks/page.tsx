import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { FEEDS } from "@/content/feeds";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Thanks | Building Sauce",
  description: "Form received.",
  path: "/thanks",
  noindex: true,
});

async function Body({ searchParams }: { searchParams: PageProps<"/thanks">["searchParams"] }) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" ? sp.type : "sample";
  const trade = typeof sp.trade === "string" ? sp.trade : "";
  const feed = FEEDS.find((f) => f.trade === trade);
  const tradeName = feed ? feed.name.toLowerCase() : "feed";
  return (
    <div className="prose flex flex-col gap-6">
      <h1 className="h1">Thanks.</h1>
      {type === "waitlist" ? (
        <p>You're on the {tradeName} waitlist. We'll email you once, when the first list is ready. No newsletters.</p>
      ) : type === "contact" ? (
        <p>Got it. We reply within one business day from {SITE.email}.</p>
      ) : (
        <p>
          Your sample goes out within one business day from {SITE.email}. If it lands in spam, mark it safe so next
          week's list doesn't.
        </p>
      )}
      <p>
        <Link href="/">Back to the home page</Link>
      </p>
    </div>
  );
}

export default function ThanksPage({ searchParams }: PageProps<"/thanks">) {
  return (
    <PageShell>
      <Section pad="pt-14 pb-24">
        <Suspense fallback={<p className="h1">Thanks.</p>}>
          <Body searchParams={searchParams} />
        </Suspense>
      </Section>
    </PageShell>
  );
}
