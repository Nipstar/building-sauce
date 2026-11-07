import { SITE } from "@/content/site";
import type { FAQItem, FeedPage, GuideFrontmatter, LinkRef } from "@/content/types";

type JsonLdObject = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function orgSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo/app-icon-512.png`,
    description: SITE.entityDescription,
    email: SITE.email,
    ...(SITE.linkedin ? { sameAs: [SITE.linkedin] } : {}),
    parentOrganization: {
      "@type": "Organization",
      name: SITE.operator.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.operator.streetAddress,
        addressLocality: SITE.operator.addressLocality,
        postalCode: SITE.operator.postalCode,
        addressCountry: SITE.operator.addressCountry,
      },
    },
  };
}

export function webSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function offerSchema(): JsonLdObject {
  return {
    "@type": "Offer",
    price: SITE.price.monthly,
    priceCurrency: SITE.price.currency,
    availability: "https://schema.org/InStock",
    url: `${SITE.url}/pricing`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: SITE.price.monthly,
      priceCurrency: SITE.price.currency,
      billingDuration: "P1M",
      unitText: "MONTH",
    },
  };
}

export function serviceSchema(feed: FeedPage): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Building Sauce ${feed.name} feed`,
    serviceType: `${feed.name} contractor lead feed`,
    description: feed.description,
    url: `${SITE.url}/${feed.slug}`,
    provider: { "@id": ORG_ID },
    areaServed:
      feed.region === "NYC"
        ? { "@type": "City", name: "New York City" }
        : { "@type": "State", name: "Florida" },
    audience: { "@type": "BusinessAudience", audienceType: "Contractors" },
    ...(feed.status === "live" ? { offers: offerSchema() } : {}),
  };
}

export function productSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Building Sauce Facade Feed",
    description:
      "Weekly list of NYC buildings with a new FISP Unsafe or SWARMP filing and no repair permit, with the registered owner entity and managing agent.",
    brand: { "@type": "Brand", name: SITE.name },
    url: `${SITE.url}/pricing`,
    offers: offerSchema(),
  };
}

export function faqSchema(items: FAQItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(items: LinkRef[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function articleSchema(fm: GuideFrontmatter, url: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.h1,
    description: fm.description,
    url: `${SITE.url}${url}`,
    mainEntityOfPage: `${SITE.url}${url}`,
    datePublished: fm.published,
    dateModified: fm.updated,
    author: { "@type": "Organization", name: SITE.byline, url: `${SITE.url}/about` },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    image: `${SITE.url}/og?t=${encodeURIComponent(fm.h1)}`,
  };
}

export interface DatasetSchemaInput {
  url: string;
  name: string;
  description: string;
  temporalCoverage: string;
  dateModified: string;
  isBasedOn: string[];
  csvUrl: string;
}

export function datasetSchema(d: DatasetSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: d.name,
    description: d.description,
    url: `${SITE.url}${d.url}`,
    temporalCoverage: d.temporalCoverage,
    dateModified: d.dateModified,
    spatialCoverage: { "@type": "City", name: "New York City" },
    isBasedOn: d.isBasedOn,
    creator: { "@id": ORG_ID },
    license: `${SITE.url}/terms`,
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/csv",
        contentUrl: `${SITE.url}${d.csvUrl}`,
      },
    ],
  };
}

export function webPageSchema(input: {
  url: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage";
  about?: string[];
  mentions?: { name: string; url: string }[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.url}`,
    isPartOf: { "@id": SITE_ID },
    ...(input.about ? { about: input.about.map((name) => ({ "@type": "Thing", name })) } : {}),
    ...(input.mentions
      ? { mentions: input.mentions.map((m) => ({ "@type": "Thing", name: m.name, url: m.url })) }
      : {}),
  };
}

/** Serialize for a <script type="application/ld+json"> tag. */
export function jsonLdString(obj: JsonLdObject): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
