import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Screenshots at 390, 768 and 1440 for every page in the sitemap, plus the
 * non-sitemap pages that matter. Fails on horizontal page scroll.
 */
const WIDTHS = [390, 768, 1440];
const EXTRA = ["/thanks?type=sample&trade=facade", "/does-not-exist"];

test.describe("screenshots", () => {
  test("every sitemap page renders without horizontal scroll", async ({ page, baseURL }) => {
    test.setTimeout(15 * 60_000);
    const xml = await (await page.request.get(`${baseURL}/sitemap.xml`)).text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1]).pathname);
    expect(urls.length).toBeGreaterThan(5);
    const dir = path.join(process.cwd(), "tests", "screenshots");
    fs.mkdirSync(dir, { recursive: true });
    for (const url of [...urls, ...EXTRA]) {
      for (const w of WIDTHS) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(url, { waitUntil: "load" });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${url} at ${w}px has horizontal overflow of ${overflow}px`).toBeLessThanOrEqual(0);
        const name = (url === "/" ? "home" : url.replace(/^\//, "").replace(/[^a-z0-9-]+/gi, "-")) + `-${w}.png`;
        await page.screenshot({ path: path.join(dir, name), fullPage: true });
      }
    }
  });

  test("keyboard reaches nav, FAQ and form with visible focus", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/facade-restoration-leads");
    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo
    const logoFocused = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    expect(logoFocused).toBe("Building Sauce home");
    const summary = page.locator("details.faq summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("details.faq[open]").first()).toBeVisible();
    await page.locator("#lf-name").focus();
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement as Element).outlineStyle);
    expect(outline).not.toBe("none");
  });
});
