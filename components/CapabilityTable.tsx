import type { CapabilityRow } from "@/content/types";
import { Section, SectionHeading } from "./Section";

export function CapabilityTable({
  eyebrow,
  h2,
  rows,
  id,
}: {
  eyebrow: string;
  h2: string;
  rows: CapabilityRow[];
  id?: string;
}) {
  return (
    <Section id={id}>
      <div className="flex flex-col gap-10">
        <SectionHeading eyebrow={eyebrow} h2={h2} />
        <div className="table-wrap">
          <table className="w-full min-w-[640px] border-collapse text-[15px] leading-[1.5]">
            <thead>
              <tr className="border-b border-ink text-left">
                <th scope="col" className="w-[22%] py-3 pr-4 font-semibold">You said</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Each row carries</th>
                <th scope="col" className="w-[20%] py-3 font-semibold">From</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.youSaid} className="border-b border-hairline align-top">
                  <td className="py-4 pr-4 text-text-2">{r.youSaid}</td>
                  <td className="py-4 pr-4 text-ink">{r.carries}</td>
                  <td className="mono py-4 text-[13px] text-muted">{r.from}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
