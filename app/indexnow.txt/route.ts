/**
 * IndexNow key file. The submit script (scripts/indexnow.ts) points search
 * engines here via keyLocation, so the key never needs to be a filename.
 * Set INDEXNOW_KEY at build time; unset returns 404 and IndexNow stays off.
 */
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain" } });
}
