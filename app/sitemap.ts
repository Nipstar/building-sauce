import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { livePages } from "@/content/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  return livePages().map((p) => ({
    url: `${SITE.url}${p.url === "/" ? "" : p.url}`,
    lastModified: new Date(p.updated),
    changeFrequency: p.kind === "data" ? "weekly" : "monthly",
    priority: p.url === "/" ? 1 : p.kind === "feed" ? 0.9 : p.kind === "guide" || p.kind === "data" ? 0.8 : 0.5,
  }));
}
