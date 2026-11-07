import { SITE, usDate } from "@/content/site";

export function Byline({ updated, author = SITE.byline }: { updated: string; author?: string }) {
  return (
    <p className="mono text-xs text-muted">
      Written by {author}, updated <time dateTime={updated}>{usDate(updated)}</time>.
    </p>
  );
}
