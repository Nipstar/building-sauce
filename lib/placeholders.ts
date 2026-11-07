/**
 * Placeholder detection. Anything in square brackets that starts with a
 * capital letter, e.g. [ADDRESS], [VERIFY against ...], [CAP], [FOUNDING OFFER].
 * Markdown links like [text](url) do not match because they start lower case
 * or are followed by "(".
 */
export const PLACEHOLDER_RE = /\[(?:VERIFY|CONFIRM|DECIDE|[A-Z][A-Z0-9 _:,./$'-]*)\]/;

export function hasPlaceholder(text: string): boolean {
  return PLACEHOLDER_RE.test(text);
}

export function findPlaceholders(text: string): string[] {
  const re = new RegExp(PLACEHOLDER_RE.source, "g");
  return Array.from(text.matchAll(re), (m) => m[0]);
}

/** Deep-scan any content object for placeholders. */
export function objectHasPlaceholder(obj: unknown): boolean {
  return hasPlaceholder(JSON.stringify(obj));
}
