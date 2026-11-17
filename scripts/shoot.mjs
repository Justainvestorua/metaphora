/* Verification capture.

   The in-app browser pane cannot screenshot this page: the pinned stage
   contains a <video>, and composited video layers come back black or time
   out. Playwright renders it properly and writes real PNGs to disk.

   Usage: node scripts/shoot.mjs [baseUrl]
*/

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = path.resolve(".impeccable/review");
mkdirSync(OUT, { recursive: true });

/* Fractions of the pinned timeline worth looking at, named for what should
   be on screen at each. */
const BEATS = [
  ["01-open", 0.0],
  ["02-groundworks", 0.18],
  ["03-structure", 0.38],
  ["04-complete", 0.55],
  ["05-services", 0.665],
  ["06-industries", 0.775],
  ["07-work", 0.865],
  ["08-final", 0.98],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, pin: 18 },
  { name: "mobile", width: 390, height: 844, pin: 11, mobile: true },
];

async function settle(page, ms = 900) {
  await page.waitForTimeout(ms);
}

for (const vp of VIEWPORTS) {
  // The bundled browser for this Playwright build could not be downloaded in
  // this environment, so we drive the Chromium already cached on the machine.
  // Playwright's bundled build could not be downloaded here, so we drive the
  // Chrome already installed on the machine.
  const browser = await chromium.launch({
    channel: "chrome",
    args: ["--autoplay-policy=no-user-gesture-required"],
  });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: Boolean(vp.mobile),
    hasTouch: Boolean(vp.mobile),
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });

  // wait for the film to be scrubbable
  await page.waitForFunction(
    () => {
      const v = document.querySelector(".cine__frame video");
      return v && v.readyState >= 2;
    },
    { timeout: 60000 }
  );
  await settle(page, 1200);

  const pinPx = vp.height * vp.pin;

  for (const [label, frac] of BEATS) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "auto" }), Math.round(pinPx * frac));
    await settle(page, 1100);
    await page.screenshot({
      path: path.join(OUT, `${vp.name}-${label}.png`),
      animations: "disabled",
    });
  }

  // the inquiry section, below the pin
  await page.evaluate(() => {
    const el = document.querySelector("#inquiry");
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
  });
  await settle(page, 1200);
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-09-inquiry.png`),
    animations: "disabled",
  });

  // measurements that matter
  const metrics = await page.evaluate(() => {
    const de = document.documentElement;
    return {
      hOverflow: de.scrollWidth - de.clientWidth,
      docHeight: de.scrollHeight,
      videoSrc:
        document.querySelector(".cine__frame video")?.currentSrc?.split("/").pop() ?? null,
      h1: document.querySelector("h1")?.textContent ?? null,
      h1Size: getComputedStyle(document.querySelector(".cine__h1")).fontSize,
    };
  });

  console.log(
    JSON.stringify({ viewport: vp.name, ...metrics, consoleErrors: errors }, null, 1)
  );

  await browser.close();
}

console.log("captures written to", OUT);
