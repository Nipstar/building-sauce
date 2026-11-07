export interface BarDatum {
  label: string;
  value: number | null;
}

/** Plain inline SVG bar chart, no library. Table fallback underneath. */
export function BarChart({
  data,
  title,
  unit = "",
}: {
  data: BarDatum[];
  title: string;
  unit?: string;
}) {
  const w = 720;
  const h = 220;
  const padL = 36;
  const padB = 28;
  const padT = 12;
  const max = Math.max(1, ...data.map((d) => d.value ?? 0));
  const n = data.length;
  const slot = (w - padL) / n;
  const barW = Math.max(6, slot * 0.6);
  return (
    <figure className="my-8">
      <figcaption className="mb-3 font-semibold">{title}</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`${title}, bar chart`} className="h-auto w-full">
        <line x1={padL} y1={h - padB} x2={w} y2={h - padB} stroke="#141413" strokeWidth="1" />
        <text x="0" y={padT + 10} fontSize="11" fontFamily="var(--font-mono)" fill="#6B6966">
          {max.toLocaleString("en-US")}
        </text>
        <text x="0" y={h - padB} fontSize="11" fontFamily="var(--font-mono)" fill="#6B6966">
          0
        </text>
        {data.map((d, i) => {
          const v = d.value ?? 0;
          const bh = ((h - padB - padT) * v) / max;
          const x = padL + i * slot + (slot - barW) / 2;
          const y = h - padB - bh;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barW} height={bh} fill={d.value == null ? "#ECEAE6" : "#B4431F"} />
              {(n <= 14 || i % Math.ceil(n / 12) === 0) && (
                <text
                  x={x + barW / 2}
                  y={h - padB + 16}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="#6B6966"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="table-wrap mt-4">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-ink text-left">
              <th scope="col" className="py-2 pr-4 font-semibold">Period</th>
              <th scope="col" className="py-2 font-semibold">{unit || "Count"}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label} className="border-b border-hairline">
                <td className="mono py-1.5 pr-4">{d.label}</td>
                <td className="mono py-1.5">{d.value == null ? "not yet counted" : d.value.toLocaleString("en-US")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
