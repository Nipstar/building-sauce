import fs from "node:fs";
import path from "node:path";

/**
 * Weekly aggregate stats written by the antek-leads CLI into data/stats/*.json.
 * Counts only. Never addresses, BBL, BIN, owners or contacts.
 */

export interface FispStats {
  as_of: string | null;
  source_note: string;
  cycle10_initial: { unsafe: number | null; swarmp: number | null; safe: number | null };
  last_12_months: {
    from: string | null;
    to: string | null;
    unsafe_initial: number | null;
    swarmp_initial: number | null;
  };
  by_borough: { borough: string; unsafe: number | null; swarmp: number | null }[];
  by_subcycle: { subcycle: string; unsafe: number | null; swarmp: number | null }[];
  monthly: { month: string; unsafe_initial: number | null; swarmp_initial: number | null }[];
}

export interface ShedStats {
  as_of: string | null;
  total_active: number | null;
  age_bands: { band: string; count: number | null }[];
  by_borough: { borough: string; count: number | null }[];
  monthly: { month: string; new_permits: number | null }[];
  external_benchmark: { text: string; source: string; date: string };
}

export interface GarageStats {
  as_of: string | null;
  source_note: string;
  active_status: { unsafe: number | null; srem: number | null; total: number | null };
  by_borough: { borough: string; unsafe: number | null; srem: number | null }[];
  monthly: { month: string; unsafe: number | null; srem: number | null }[];
}

export type StatsName = "fisp" | "sheds" | "garages";

const DIR = path.join(process.cwd(), "data", "stats");

function read<T>(name: StatsName): T {
  const file = path.join(DIR, `${name}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}

export function loadFisp(): FispStats {
  return read<FispStats>("fisp");
}
export function loadSheds(): ShedStats {
  return read<ShedStats>("sheds");
}
export function loadGarages(): GarageStats {
  return read<GarageStats>("garages");
}

/** A data page is live only when its headline fields are filled. */
export function isDataPageLive(name: StatsName): boolean {
  switch (name) {
    case "fisp": {
      const s = loadFisp();
      return (
        s.as_of != null &&
        s.cycle10_initial.unsafe != null &&
        s.cycle10_initial.swarmp != null &&
        s.last_12_months.unsafe_initial != null
      );
    }
    case "sheds": {
      const s = loadSheds();
      return s.as_of != null && s.total_active != null;
    }
    case "garages": {
      const s = loadGarages();
      return s.as_of != null && s.active_status.total != null;
    }
  }
}

export function dataPageUpdated(name: StatsName): string {
  const asOf =
    name === "fisp" ? loadFisp().as_of : name === "sheds" ? loadSheds().as_of : loadGarages().as_of;
  return asOf ?? "2026-11-07";
}

export function n(v: number | null | undefined): string {
  return v == null ? "not yet counted" : v.toLocaleString("en-US");
}

/** Build the aggregate CSV for a data page. Counts only. */
export function statsCsv(name: StatsName): string {
  const rows: string[][] = [];
  if (name === "fisp") {
    const s = loadFisp();
    rows.push(["metric", "group", "unsafe", "swarmp", "safe", "as_of"]);
    rows.push(["cycle10_initial", "all", String(s.cycle10_initial.unsafe ?? ""), String(s.cycle10_initial.swarmp ?? ""), String(s.cycle10_initial.safe ?? ""), s.as_of ?? ""]);
    rows.push(["last_12_months", `${s.last_12_months.from ?? ""} to ${s.last_12_months.to ?? ""}`, String(s.last_12_months.unsafe_initial ?? ""), String(s.last_12_months.swarmp_initial ?? ""), "", s.as_of ?? ""]);
    for (const b of s.by_borough) rows.push(["by_borough", b.borough, String(b.unsafe ?? ""), String(b.swarmp ?? ""), "", s.as_of ?? ""]);
    for (const b of s.by_subcycle) rows.push(["by_subcycle", b.subcycle, String(b.unsafe ?? ""), String(b.swarmp ?? ""), "", s.as_of ?? ""]);
    for (const m of s.monthly) rows.push(["monthly_initial", m.month, String(m.unsafe_initial ?? ""), String(m.swarmp_initial ?? ""), "", s.as_of ?? ""]);
  } else if (name === "sheds") {
    const s = loadSheds();
    rows.push(["metric", "group", "count", "as_of"]);
    rows.push(["total_active", "all", String(s.total_active ?? ""), s.as_of ?? ""]);
    for (const a of s.age_bands) rows.push(["age_band", a.band, String(a.count ?? ""), s.as_of ?? ""]);
    for (const b of s.by_borough) rows.push(["by_borough", b.borough, String(b.count ?? ""), s.as_of ?? ""]);
    for (const m of s.monthly) rows.push(["monthly_new_permits", m.month, String(m.new_permits ?? ""), s.as_of ?? ""]);
  } else {
    const s = loadGarages();
    rows.push(["metric", "group", "unsafe", "srem", "total", "as_of"]);
    rows.push(["active_status", "all", String(s.active_status.unsafe ?? ""), String(s.active_status.srem ?? ""), String(s.active_status.total ?? ""), s.as_of ?? ""]);
    for (const b of s.by_borough) rows.push(["by_borough", b.borough, String(b.unsafe ?? ""), String(b.srem ?? ""), "", s.as_of ?? ""]);
    for (const m of s.monthly) rows.push(["monthly", m.month, String(m.unsafe ?? ""), String(m.srem ?? ""), "", s.as_of ?? ""]);
  }
  return rows.map((r) => r.map((c) => (/[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c)).join(",")).join("\n") + "\n";
}
