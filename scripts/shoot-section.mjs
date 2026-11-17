import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3210/en", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);
const el = await p.$("#inquiry");
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(1200);
await el.screenshot({ path: ".impeccable/review/inquiry-full.png" });
// and one panel, full stage
await p.evaluate(y => scrollTo({top:y, behavior:"auto"}), Math.round(900*18*0.665));
await p.waitForTimeout(1400);
await p.screenshot({ path: ".impeccable/review/panel-check.png" });
console.log("ok");
await b.close();
