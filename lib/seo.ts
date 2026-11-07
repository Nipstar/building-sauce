import type { Metadata } from "next";
import { SITE } from "@/content/site";

export interface PageMeta {
  title: string;
  description: string;
  /** Path starting with "/" */
  path: string;
  /** Eyebrow shown on the OG image. */
  eyebrow?: string;
  noindex?: boolean;
}

export function ogImageUrl(title: string, eyebrow?: string): string {
  const q = new URLSearchParams({ t: title });
  if (eyebrow) q.set("e", eyebrow);
  return `${SITE.url}/og?${q.toString()}`;
}

export function pageMetadata(m: PageMeta): Metadata {
  const canonical = `${SITE.url}${m.path === "/" ? "" : m.path}`;
  const image = ogImageUrl(m.title, m.eyebrow);
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: m.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image],
    },
    ...(m.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
