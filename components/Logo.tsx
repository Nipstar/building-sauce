import Link from "next/link";

/** Three-storey block, one lit window. From the logo sheet. */
export function Mark({ size = 28, onDark = false }: { size?: number; onDark?: boolean }) {
  const bg = onDark ? "#FFFFFF" : "#141413";
  const win = onDark ? "#141413" : "#FFFFFF";
  const cells: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push([c, r]);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="72" height="72" fill={bg} />
      {cells.map(([c, r]) =>
        c === 1 && r === 1 ? (
          <rect key="lit" x="30" y="30" width="12" height="12" fill="#B4431F" />
        ) : (
          <rect
            key={`${c}${r}`}
            x={14 + c * 16}
            y={14 + r * 16}
            width="12"
            height="12"
            fill={win}
            opacity="0.28"
          />
        ),
      )}
    </svg>
  );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 no-underline"
      style={{ color: onDark ? "#FFFFFF" : "#141413" }}
      aria-label="Building Sauce home"
    >
      <Mark onDark={onDark} />
      <span className="text-[17px] font-bold tracking-[-0.01em]">
        Building Sauce<span className="text-accent">.</span>
      </span>
    </Link>
  );
}
