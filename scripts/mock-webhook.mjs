/**
 * Local stand-in for the n8n lead webhook. Logs every POST with its headers,
 * keeps them in memory, and serves them at GET /received (DELETE clears).
 *   N8N_LEAD_WEBHOOK_URL=http://localhost:4001/webhook N8N_LEAD_WEBHOOK_SECRET=test npm run start
 *   node scripts/mock-webhook.mjs
 */
import http from "node:http";
import { createHmac } from "node:crypto";

const PORT = Number(process.env.MOCK_PORT ?? 4001);
const SECRET = process.env.N8N_LEAD_WEBHOOK_SECRET ?? "test";
const received = [];

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/received") {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(received));
    }
    if (req.method === "DELETE" && req.url === "/received") {
      received.length = 0;
      return res.end("ok");
    }
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      const sig = req.headers["x-signature"] ?? "";
      const expected = `sha256=${createHmac("sha256", SECRET).update(body).digest("hex")}`;
      const entry = { url: req.url, headers: req.headers, body: body ? JSON.parse(body) : null, signatureValid: sig === expected };
      received.push(entry);
      console.log(JSON.stringify(entry, null, 2));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true }));
    });
  })
  .listen(PORT, () => console.log(`mock webhook on http://localhost:${PORT}/webhook`));
