import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    const legacy: Record<string, string> = {
      "/facade": "/facade-restoration-leads",
      "/mold": "/mold-remediation-leads",
      "/gas": "/gas-piping-leads",
      "/roofing": "/commercial-roofing-leads",
      "/florida": "/florida-condo-leads",
      "/garages": "/parking-garage-leads",
    };
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.buildingsauce.com" }],
        destination: "https://buildingsauce.com/:path*",
        permanent: true,
      },
      ...Object.entries(legacy).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
