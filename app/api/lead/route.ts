import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead form handler. Validates, drops honeypot hits silently, verifies
 * Turnstile, signs the payload and forwards it to n8n. The site never sends
 * email itself.
 */

const FREE_MAIL = /@(gmail|yahoo|hotmail|aol|outlook|icloud|live|msn|ymail|protonmail)\./i;

const Lead = z.object({
  formType: z.enum(["sample", "waitlist", "contact"]),
  trade: z.enum(["facade", "garage", "gas", "boiler", "mold", "roofing", "florida", "other"]),
  name: z.string().trim().min(1).max(120),
  firm: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  borough: z.string().trim().max(60).optional().default(""),
  role: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  website: z.string().optional().default(""), // honeypot
  turnstileToken: z.string().optional().default(""),
  page: z.string().max(200).optional().default(""),
  utm: z
    .object({
      source: z.string().max(100).optional().default(""),
      medium: z.string().max(100).optional().default(""),
      campaign: z.string().max(100).optional().default(""),
      content: z.string().max(100).optional().default(""),
    })
    .optional()
    .default({ source: "", medium: "", campaign: "", content: "" }),
  submittedAt: z.string().optional().default(""),
});

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (local dev, preview)
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const parsed = Lead.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 422 });
  }
  const lead = parsed.data;

  // Honeypot: pretend it worked, post nothing.
  if (lead.website) {
    return NextResponse.redirect(new URL(`/thanks?type=${lead.formType}&trade=${lead.trade}`, request.url), 303);
  }

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for");
  if (!(await verifyTurnstile(lead.turnstileToken, ip))) {
    return NextResponse.json({ error: "Could not verify you are human. Reload and try again." }, { status: 403 });
  }

  const webhook = process.env.N8N_LEAD_WEBHOOK_URL;
  const secret = process.env.N8N_LEAD_WEBHOOK_SECRET ?? "";
  const payload = {
    formType: lead.formType,
    trade: lead.trade,
    name: lead.name,
    firm: lead.firm,
    email: lead.email,
    phone: lead.phone,
    borough: lead.borough,
    role: lead.role,
    message: lead.message,
    page: lead.page,
    utm: lead.utm,
    submittedAt: lead.submittedAt || new Date().toISOString(),
    freeMail: FREE_MAIL.test(lead.email),
    ip: ip ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  };
  const body = JSON.stringify(payload);

  if (!webhook) {
    console.warn("[lead] N8N_LEAD_WEBHOOK_URL not set; lead not forwarded", { email: lead.email, formType: lead.formType });
  } else {
    const signature = createHmac("sha256", secret).update(body).digest("hex");
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Signature": `sha256=${signature}`,
        "X-Form-Type": lead.formType,
      },
      body,
    }).catch((err: unknown) => {
      console.error("[lead] webhook error", err);
      return null;
    });
    if (!res || !res.ok) {
      return NextResponse.json(
        { error: "Could not save your request. Email hello@buildingsauce.com and we will sort it." },
        { status: 502 },
      );
    }
  }

  return NextResponse.redirect(new URL(`/thanks?type=${lead.formType}&trade=${lead.trade}`, request.url), 303);
}
