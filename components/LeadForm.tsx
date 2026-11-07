"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { Trade } from "@/content/site";

export type FormType = "sample" | "waitlist" | "contact";

export interface LeadFormProps {
  formType: FormType;
  trade: Trade;
  title: string;
  intro: string;
  /** Options for "What you do". */
  roleOptions: string[];
  /** Borough or region options. */
  regionOptions?: string[];
  regionLabel?: string;
  submitLabel: string;
  underButton: string;
  showPhone?: boolean;
  showMessage?: boolean;
  /** Path of the page hosting the form, sent with the payload. */
  page: string;
}

const NYC_BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "All"];
const UTM_KEYS = ["source", "medium", "campaign", "content"] as const;
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function readUtm(): Record<(typeof UTM_KEYS)[number], string> {
  const out = { source: "", medium: "", campaign: "", content: "" };
  try {
    const stored = sessionStorage.getItem("bs_utm");
    if (stored) return { ...out, ...(JSON.parse(stored) as typeof out) };
  } catch {
    /* ignore */
  }
  return out;
}

export function LeadForm(props: LeadFormProps) {
  const {
    formType,
    trade,
    title,
    intro,
    roleOptions,
    regionOptions = NYC_BOROUGHS,
    regionLabel = "Borough you work most",
    submitLabel,
    underButton,
    showPhone = formType === "sample",
    showMessage = formType === "contact",
    page,
  } = props;
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // First-touch UTM capture. Stored once per session, sent with every form.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("bs_utm")) return;
      const q = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      let any = false;
      for (const k of UTM_KEYS) {
        const v = q.get(`utm_${k}`);
        if (v) {
          utm[k] = v;
          any = true;
        }
      }
      if (any) sessionStorage.setItem("bs_utm", JSON.stringify(utm));
    } catch {
      /* ignore */
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    const payload = {
      formType,
      trade,
      name: String(fd.get("name") ?? ""),
      firm: String(fd.get("firm") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      borough: String(fd.get("borough") ?? ""),
      role: String(fd.get("role") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      hp: String(fd.get("hp") ?? ""), // honeypot
      turnstileToken: String(fd.get("cf-turnstile-response") ?? ""),
      page,
      utm: readUtm(),
      submittedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      if (res.redirected) {
        window.location.assign(res.url);
        return;
      }
      if (res.ok) {
        window.location.assign(`/thanks?type=${formType}&trade=${trade}`);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Something went wrong. Email hello@buildingsauce.com and we will sort it.");
      setStatus("error");
    } catch {
      setError("Could not reach the server. Email hello@buildingsauce.com and we will sort it.");
      setStatus("error");
    }
  }

  const inputCls =
    "h-11 w-full border border-dashed bg-white px-3 text-[15px] text-ink focus:border-ink";
  const labelCls = "text-[13px] font-semibold text-ink";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="flex flex-col gap-4 border border-hairline bg-white p-6 text-ink"
      aria-labelledby="leadform-title"
      noValidate={false}
    >
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <h3 id="leadform-title" className="text-xl font-bold">
        {title}
      </h3>
      <p className="text-sm text-text-2">{intro}</p>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-name" className={labelCls}>
          Your name
        </label>
        <input id="lf-name" name="name" required autoComplete="name" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-firm" className={labelCls}>
          Firm
        </label>
        <input id="lf-firm" name="firm" required autoComplete="organization" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-email" className={labelCls}>
          Work email
        </label>
        <input id="lf-email" name="email" type="email" required autoComplete="email" className={inputCls} />
      </div>
      {showPhone && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-phone" className={labelCls}>
            Phone (optional)
          </label>
          <input id="lf-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-borough" className={labelCls}>
          {regionLabel}
        </label>
        <select id="lf-borough" name="borough" required className={inputCls} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {regionOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-role" className={labelCls}>
          What you do
        </label>
        <select id="lf-role" name="role" required className={inputCls} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lf-website" className={labelCls}>
          Website (optional)
        </label>
        <input id="lf-website" name="website" type="text" inputMode="url" autoComplete="url" placeholder="yourfirm.com" className={inputCls} />
      </div>
      {showMessage && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lf-message" className={labelCls}>
            Message
          </label>
          <textarea id="lf-message" name="message" rows={4} className={`${inputCls} h-auto py-2`} />
        </div>
      )}
      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lf-hp">Leave this empty</label>
        <input id="lf-hp" name="hp" tabIndex={-1} autoComplete="off" />
      </div>
      {SITE_KEY && <div className="cf-turnstile" data-sitekey={SITE_KEY} data-size="flexible" />}
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 w-full bg-accent px-6 text-base font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending" : submitLabel}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}
      <p className="text-xs leading-relaxed text-muted">{underButton}</p>
    </form>
  );
}
