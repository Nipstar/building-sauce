import { defineConfig } from "@playwright/test";

const PORT = 3998;

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/robots.txt`,
    reuseExistingServer: false,
    timeout: 60_000,
    env: {
      N8N_LEAD_WEBHOOK_URL: "http://localhost:4001/webhook",
      N8N_LEAD_WEBHOOK_SECRET: "test",
      NEXT_PUBLIC_SITE_URL: `http://localhost:${PORT}`,
    },
  },
});
