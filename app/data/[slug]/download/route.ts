import { dataPageMeta } from "@/content/registry";
import { statsCsv } from "@/lib/stats";

export function generateStaticParams() {
  return [{ slug: "fisp-unsafe-buildings" }, { slug: "nyc-sidewalk-sheds" }, { slug: "nyc-parking-garages" }];
}

export async function GET(_request: Request, ctx: RouteContext<"/data/[slug]/download">) {
  const { slug } = await ctx.params;
  const meta = dataPageMeta(slug);
  if (!meta) return new Response("Not found", { status: 404 });
  return new Response(statsCsv(meta.stats), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="buildingsauce-${slug}.csv"`,
    },
  });
}
