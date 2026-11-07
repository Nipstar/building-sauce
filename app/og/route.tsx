import { ImageResponse } from "next/og";

/**
 * OG image: eyebrow, title, wordmark. 1200x630, landscape only.
 * /og?t=Title&e=Eyebrow
 */

async function loadInter(weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0" },
    }).then((r) => r.text());
    const url = css.match(/src: url\(([^)]+)\) format\('(?:truetype|woff)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("t") ?? "Building Sauce").slice(0, 140);
  const eyebrow = (searchParams.get("e") ?? "NYC construction leads from public records").slice(0, 80);
  const [regular, bold] = await Promise.all([loadInter(400), loadInter(700)]);
  const fonts = [
    regular ? { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const } : null,
    bold ? { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const } : null,
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#FFFFFF",
          color: "#141413",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#B4431F" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 70 ? 52 : 64, lineHeight: 1.08, fontWeight: 700, letterSpacing: -1.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, background: "#141413", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 18, height: 18, background: "#B4431F" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, display: "flex" }}>
            Building Sauce<span style={{ color: "#B4431F" }}>.</span>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 20, color: "#6B6966" }}>buildingsauce.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts.length ? fonts : undefined },
  );
}
