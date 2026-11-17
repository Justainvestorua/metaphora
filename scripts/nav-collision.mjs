import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const SIZES = [[375,667],[360,640],[393,852],[1440,900]];
for (const [w,h] of SIZES) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:w<700, hasTouch:w<700 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3210/en",{waitUntil:"domcontentloaded"});
  await p.waitForTimeout(1800);
  // walk the whole document and look for any heading sitting under the nav band
  const worst = await p.evaluate(async () => {
    const brand = document.querySelector(".nav__brand");
    const navBottom = brand.getBoundingClientRect().bottom;
    const heads = [...document.querySelectorAll("h1,h2,h3,.inquiry__title,.cine__panel-title")];
    let hits = [];
    const max = document.documentElement.scrollHeight - innerHeight;
    for (let y = 0; y <= max; y += Math.round(innerHeight/3)) {
      scrollTo({top:y, behavior:"auto"});
      await new Promise(r=>setTimeout(r,120));
      for (const el of heads) {
        const r = el.getBoundingClientRect();
        // effective opacity: walk ancestors, since the hero and panels are
        // faded on their container rather than on the heading itself
        let eff = 1, n = el;
        while (n && n !== document.body) {
          const cs = getComputedStyle(n);
          if (cs.visibility === "hidden" || cs.display === "none") { eff = 0; break; }
          eff *= Number(cs.opacity);
          n = n.parentElement;
        }
        const onScreen = r.bottom > 4 && r.top < innerHeight;
        if (eff > 0.05 && onScreen && r.top < navBottom) {
          hits.push({ y, text: el.textContent.trim().slice(0,26), top: Math.round(r.top) });
        }
      }
    }
    return { navBottom: Math.round(navBottom), hits: hits.slice(0,4), count: hits.length };
  });
  console.log(`${w}x${h}  navBottom=${worst.navBottom}  collisions=${worst.count}` + (worst.count?`  e.g. ${JSON.stringify(worst.hits)}`:""));
  await ctx.close();
}
await b.close();
