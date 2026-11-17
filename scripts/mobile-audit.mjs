import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const SIZES = [
  ["iPhone SE",       375, 667, 11],
  ["Android small",   360, 640, 11],
  ["iPhone 13 mini",  375, 812, 11],
  ["iPhone 14 Pro",   393, 852, 11],
  ["tablet",          768,1024, 14],
];
const beats = [["services",0.665],["industries",0.775],["work",0.865]];
for (const [label,w,h,pinVh] of SIZES) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:w<700, hasTouch:w<700, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3210/en", { waitUntil:"domcontentloaded" });
  await p.waitForFunction(()=>{const v=document.querySelector(".cine__frame video");return v&&v.readyState>=2;},{timeout:90000});
  await p.waitForTimeout(1200);
  const pin = h*pinVh;
  const rows = [];
  for (const [name,frac] of beats) {
    await p.evaluate(y=>scrollTo({top:y,behavior:"auto"}), Math.round(pin*frac));
    await p.waitForTimeout(900);
    rows.push(await p.evaluate((n)=>{
      const panel=document.querySelector(`[data-panel="${n}"]`);
      const grid=panel.querySelector(".shell");
      const brand=document.querySelector(".nav__brand");
      const title=panel.querySelector(".cine__panel-title");
      const gr=grid.getBoundingClientRect(), br=brand.getBoundingClientRect(), tr=title.getBoundingClientRect();
      return { p:n, h:Math.round(gr.height), top:Math.round(gr.top), bot:Math.round(gr.bottom),
               hitsLogo: tr.top < br.bottom + 6, cutTop: gr.top < 0, cutBot: gr.bottom > innerHeight };
    }, name));
  }
  const bad = rows.filter(r=>r.hitsLogo||r.cutTop||r.cutBot);
  console.log(`${label.padEnd(16)} ${w}x${h}  ${bad.length? "PROBLEM: "+JSON.stringify(bad) : "ok"}`);
  await ctx.close();
}
await b.close();
