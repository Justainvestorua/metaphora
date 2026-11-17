import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport:{width:375,height:667}, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3210/en",{waitUntil:"domcontentloaded"});
await p.waitForFunction(()=>{const v=document.querySelector(".cine__frame video");return v&&v.readyState>=2;},{timeout:90000});
await p.waitForTimeout(1500);
await p.screenshot({path:".impeccable/review/se-01-hero.png"});
const pin=667*11;
for (const [n,f] of [["services",0.665],["industries",0.775],["work",0.865]]) {
  await p.evaluate(y=>scrollTo({top:y,behavior:"auto"}),Math.round(pin*f));
  await p.waitForTimeout(1000);
  await p.screenshot({path:`.impeccable/review/se-${n}.png`});
}
const el=await p.$("#inquiry"); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
await el.screenshot({path:".impeccable/review/se-inquiry.png"});
console.log("ok");
await b.close();
