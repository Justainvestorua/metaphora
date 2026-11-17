import { chromium } from "playwright";

/* One persistent context so the 24 MB film is fetched once and then served
   from cache. A fresh context per run re-downloads it, and that download
   competes with rendering — which measures the network, not the scroll. */
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();

const measure = async () => {
  await p.goto("http://localhost:3210/en", { waitUntil: "domcontentloaded" });
  await p.waitForFunction(() => {
    const v = document.querySelector(".cine__frame video");
    return v && v.readyState >= 4;           // HAVE_ENOUGH_DATA
  }, { timeout: 90000 });
  await p.waitForTimeout(2000);
  return p.evaluate(async () => {
    const frames = []; let last = performance.now(), on = true;
    const tick = t => { frames.push(t - last); last = t; if (on) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    const pin = innerHeight * 18;
    for (let i = 0; i <= 70; i++) { scrollBy(0, pin / 70); await new Promise(r => setTimeout(r, 16)); }
    for (let i = 0; i <= 35; i++) { scrollBy(0, -pin / 35); await new Promise(r => setTimeout(r, 16)); }
    on = false;
    const s = [...frames].sort((a, b) => a - b), q = x => s[Math.floor(s.length * x)] || 0;
    return { n: frames.length, median: +q(.5).toFixed(1), p95: +q(.95).toFixed(1),
             dropped: frames.filter(f => f > 34).length };
  });
};

await measure();                       // warm-up, discarded
const runs = [await measure(), await measure(), await measure()];
console.log(JSON.stringify(runs));
console.log(`median: ${runs.map(r=>r.median).join(" / ")} ms   p95: ${runs.map(r=>r.p95).join(" / ")} ms   dropped: ${runs.map(r=>`${r.dropped}/${r.n}`).join(" / ")}`);
await b.close();
