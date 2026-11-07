import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { SITE } from "@/content/site";
import { orgSchema, webSiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "NYC Construction Leads From Public Records | Building Sauce",
    template: "%s",
  },
  description: SITE.entityDescription,
  applicationName: SITE.name,
  verification: {
    ...(process.env.GSC_VERIFICATION ? { google: process.env.GSC_VERIFICATION } : {}),
    ...(process.env.BING_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_VERIFICATION } }
      : {}),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const cfToken = process.env.CF_ANALYTICS_TOKEN;
  return (
    <html lang="en-US" className={`${inter.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={orgSchema()} />
        <JsonLd data={webSiteSchema()} />
        {children}
        {cfToken && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: cfToken })}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
