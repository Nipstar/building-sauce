import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

const BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Applebot-Extended",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thanks", "/og"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
