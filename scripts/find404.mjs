import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const bad = [];
p.on("response", r => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
p.on("requestfailed", r => bad.push("FAILED " + r.url() + " " + r.failure()?.errorText));
await p.goto("http://localhost:3210/en", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(3000);
for (const f of [0.2,0.5,0.7,0.87,1.0]) {
  await p.evaluate(y => window.scrollTo({top:y, behavior:"auto"}), Math.round(900*18*f));
  await p.waitForTimeout(900);
}
await p.evaluate(() => { const e=document.querySelector("#inquiry"); window.scrollTo({top:e.getBoundingClientRect().top+scrollY, behavior:"auto"}); });
await p.waitForTimeout(1500);
console.log(bad.length ? [...new Set(bad)].join("\n") : "no failed requests");
await b.close();
