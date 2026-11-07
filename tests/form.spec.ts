import { test, expect } from "@playwright/test";
import http from "node:http";
import { createHmac } from "node:crypto";

/**
 * The sample form posts a signed payload to the webhook; honeypot hits post nothing.
 * Runs an in-process mock webhook on port 4001 (matches playwright.config webServer env).
 */
const SECRET = "test";
const received: { body: Record<string, unknown>; signature: string; raw: string }[] = [];
let server: http.Server;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      received.push({ body: JSON.parse(raw), signature: String(req.headers["x-signature"] ?? ""), raw });
      res.end(JSON.stringify({ ok: true }));
    });
  });
  await new Promise<void>((r) => server.listen(4001, r));
});

test.afterAll(async () => {
  await new Promise<void>((r) => server.close(() => r()));
});

test.beforeEach(() => {
  received.length = 0;
});

async function fill(page: import("@playwright/test").Page) {
  await page.fill("#lf-name", "Test Estimator");
  await page.fill("#lf-firm", "Test Facade Corp");
  await page.fill("#lf-email", "estimator@example.com");
  await page.selectOption("#lf-borough", "Brooklyn");
  await page.selectOption("#lf-role", "Facade restoration");
}

test("sample form posts a signed payload and lands on /thanks", async ({ page }) => {
  await page.goto("/free-sample?utm_source=cold&utm_medium=email&utm_campaign=batch1&utm_content=a");
  await fill(page);
  await page.fill("#lf-phone", "212 555 0100");
  await page.fill("#lf-website", "testfacade.com");
  await page.click("button[type=submit]");
  await page.waitForURL(/\/thanks\?type=sample/);
  expect(received).toHaveLength(1);
  const hit = received[0];
  expect(hit.body).toMatchObject({
    Name: "Test Estimator",
    Company: "Test Facade Corp",
    Email: "estimator@example.com",
    Phone: "212 555 0100",
    Website: "testfacade.com",
    Feed: "Facade",
    "Areas Covered": "Brooklyn",
    Message: "Role: Facade restoration",
    "Source Page": "/free-sample",
    Status: "Sample requested",
    meta: { formType: "sample", trade: "facade", freeMail: false, utm: { source: "cold", medium: "email", campaign: "batch1", content: "a" } },
  });
  expect(typeof hit.body["Submitted At"]).toBe("string");
  expect(hit.signature).toBe(`sha256=${createHmac("sha256", SECRET).update(hit.raw).digest("hex")}`);
});

test("free-mail address is flagged", async ({ page }) => {
  await page.goto("/facade-restoration-leads");
  await fill(page);
  await page.fill("#lf-email", "someone@gmail.com");
  await page.click("button[type=submit]");
  await page.waitForURL(/\/thanks/);
  expect(received).toHaveLength(1);
  expect((received[0].body.meta as { freeMail: boolean }).freeMail).toBe(true);
  expect(received[0].body["Source Page"]).toBe("/facade-restoration-leads");
});

test("honeypot submission posts nothing", async ({ page }) => {
  await page.goto("/free-sample");
  await fill(page);
  await page.evaluate(() => {
    (document.querySelector("#lf-hp") as HTMLInputElement).value = "http://spam.example";
  });
  await page.click("button[type=submit]");
  await page.waitForURL(/\/thanks/);
  expect(received).toHaveLength(0);
});

test("invalid payload is rejected", async ({ request }) => {
  const res = await request.post("/api/lead", { data: { formType: "sample", trade: "facade", name: "", firm: "", email: "nope" } });
  expect(res.status()).toBe(422);
  expect(received).toHaveLength(0);
});
