/* Full verification pass.

   Runs against a production build. Everything here is a check on the built
   result, not on intentions. Usage: node scripts/verify.mjs [baseUrl]
*/

import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3210";
const results = [];
const fail = (name, detail) => results.push({ ok: false, name, detail });
const pass = (name, detail) => results.push({ ok: true, name, detail });

const browser = await chromium.launch({ channel: "chrome" });

/* ------------------------------------------------------- locales & SEO */
for (const [lang, expectTitleFragment] of [
  ["en", "Digital Foundations"],
  ["de", "Digitale Fundamente"],
  ["uk", "Цифровий фундамент"],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  await page.goto(`${BASE}/${lang}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  const d = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("h1,h2,h3")].map((h) => +h.tagName[1]);
    let skips = 0;
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++;
    return {
      lang: document.documentElement.lang,
      title: document.title,
      canonical: document.querySelector("link[rel=canonical]")?.href,
      hreflang: [...document.querySelectorAll("link[rel=alternate]")].map(
        (l) => `${l.hreflang}=${l.href}`
      ),
      h1: document.querySelectorAll("h1").length,
      headingSkips: skips,
      imgsMissingAlt: [...document.querySelectorAll("img")].filter(
        (i) => !i.hasAttribute("alt")
      ).length,
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
        JSON.parse(s.textContent).map((o) => o["@type"]).join("+")
      ),
      landmarks: ["header", "main", "footer", "nav"].map(
        (t) => `${t}:${document.querySelectorAll(t).length}`
      ),
      hOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  d.lang === lang ? pass(`${lang} html lang`) : fail(`${lang} html lang`, d.lang);
  d.title.includes(expectTitleFragment)
    ? pass(`${lang} localized title`)
    : fail(`${lang} localized title`, d.title);
  d.canonical?.endsWith(`/${lang}`)
    ? pass(`${lang} canonical`)
    : fail(`${lang} canonical`, d.canonical);
  d.hreflang.length === 4
    ? pass(`${lang} hreflang (3 + x-default)`)
    : fail(`${lang} hreflang`, d.hreflang.join(", "));
  d.h1 === 1 ? pass(`${lang} exactly one h1`) : fail(`${lang} h1 count`, d.h1);
  d.headingSkips === 0
    ? pass(`${lang} no heading level skips`)
    : fail(`${lang} heading skips`, d.headingSkips);
  d.imgsMissingAlt === 0
    ? pass(`${lang} all images have alt`)
    : fail(`${lang} images missing alt`, d.imgsMissingAlt);
  d.ld[0]?.includes("ProfessionalService")
    ? pass(`${lang} JSON-LD`)
    : fail(`${lang} JSON-LD`, d.ld.join());
  d.hOverflow === 0
    ? pass(`${lang} no horizontal overflow`)
    : fail(`${lang} horizontal overflow`, d.hOverflow);
  errors.length === 0
    ? pass(`${lang} no console errors`)
    : fail(`${lang} console errors`, errors.join(" | "));

  await page.close();
}

/* ------------------------------------------------------------- the form */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    const el = document.querySelector("#inquiry");
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
  });
  await page.waitForTimeout(600);

  await page.evaluate(() => document.querySelector("form.form").requestSubmit());
  await page.waitForTimeout(500);
  const invalid = await page.evaluate(() => ({
    errors: document.querySelectorAll(".field__error").length,
    focused: document.activeElement === document.querySelector(".form__summary"),
    ariaInvalid: document.querySelectorAll('[aria-invalid="true"]').length,
  }));
  invalid.errors === 3 ? pass("form: 3 validation errors") : fail("form errors", invalid.errors);
  invalid.focused ? pass("form: focus moves to alert") : fail("form focus", "not on summary");
  invalid.ariaInvalid === 3
    ? pass("form: aria-invalid set")
    : fail("form aria-invalid", invalid.ariaInvalid);

  await page.fill('input[name="name"]', "Maksym Ivanchenko");
  await page.fill('input[name="email"]', "maksym@example.com");
  await page.fill('input[name="project"]', "Marketing site for a construction firm");
  await page.evaluate(() => document.querySelector("form.form").requestSubmit());
  await page.waitForTimeout(1500);
  const ok = await page.evaluate(() => {
    const s = document.querySelector(".form__success");
    return { shown: !!s, focused: document.activeElement === s, role: s?.getAttribute("role") };
  });
  ok.shown && ok.focused && ok.role === "status"
    ? pass("form: success state + focus + role")
    : fail("form success", JSON.stringify(ok));

  await page.close();
}

/* -------------------------------------------------------- reduced motion */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  const d = await page.evaluate(() => {
    const cine = document.querySelector(".cine");
    const stage = document.querySelector(".cine__stage");
    const panels = [...document.querySelectorAll(".cine__panel")].map((p) =>
      Number(getComputedStyle(p).opacity)
    );
    return {
      staticAttr: cine.getAttribute("data-static"),
      stagePosition: getComputedStyle(stage).position,
      pinSpacer: !!document.querySelector(".pin-spacer"),
      panelsVisible: panels.every((o) => o === 1),
      videoHasSrc: !!document.querySelector(".cine__frame video")?.getAttribute("src"),
      h1Visible: Number(getComputedStyle(document.querySelector(".cine__hero")).opacity) === 1,
      textPresent: document.body.innerText.includes("Digital presence"),
    };
  });
  d.staticAttr === "true" ? pass("reduced motion: static mode") : fail("reduced motion", d.staticAttr);
  !d.pinSpacer ? pass("reduced motion: no pin") : fail("reduced motion: pin still created");
  d.panelsVisible ? pass("reduced motion: all panels visible") : fail("reduced motion panels");
  !d.videoHasSrc ? pass("reduced motion: video not loaded") : fail("reduced motion: video loaded");
  d.textPresent ? pass("reduced motion: content readable") : fail("reduced motion: content missing");
  await ctx.close();
}

/* ------------------------------------------------------------- keyboard */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const order = [];
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    order.push(
      await page.evaluate(() => {
        const a = document.activeElement;
        return `${a.tagName}:${(a.textContent || a.name || "").trim().slice(0, 22)}`;
      })
    );
  }
  const hasSkip = order[0]?.includes("Skip");
  const ring = await page.evaluate(() => {
    const a = document.activeElement;
    const s = getComputedStyle(a);
    return s.outlineStyle !== "none" || s.boxShadow !== "none";
  });
  hasSkip ? pass("keyboard: skip link first") : fail("keyboard: skip link", order[0]);
  ring ? pass("keyboard: visible focus") : fail("keyboard: no visible focus");
  pass("keyboard: tab order", order.slice(0, 8).join(" → "));
  await page.close();
}

/* ------------------------------------------- scroll performance (jank) */
{
  /* A warm load. On a cold context the 24 MB film downloads while the page
     renders, and the resulting frame times measure the network rather than
     the scroll — which is what a returning visitor never experiences. */
  const perfCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await perfCtx.newPage();
  for (let warm = 0; warm < 2; warm++) {
    await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".cine__frame video");
        return v && v.readyState >= 4;
      },
      { timeout: 90000 }
    );
  }
  await page.waitForTimeout(1500);

  const perf = await page.evaluate(async () => {
    const long = [];
    const po = new PerformanceObserver((l) => {
      for (const e of l.getEntries()) long.push(Math.round(e.duration));
    });
    try {
      po.observe({ entryTypes: ["longtask"] });
    } catch {}

    const frames = [];
    let last = performance.now();
    let running = true;
    const tick = (t) => {
      frames.push(t - last);
      last = t;
      if (running) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // sweep the whole pin, then reverse — the direction change is where
    // scrubbed timelines usually break
    const pin = window.innerHeight * 18;
    for (let i = 0; i <= 60; i++) {
      window.scrollBy(0, pin / 60);
      await new Promise((r) => setTimeout(r, 16));
    }
    for (let i = 0; i <= 30; i++) {
      window.scrollBy(0, -pin / 30);
      await new Promise((r) => setTimeout(r, 16));
    }
    running = false;
    po.disconnect();

    const sorted = [...frames].sort((a, b) => a - b);
    const p = (q) => sorted[Math.floor(sorted.length * q)] ?? 0;
    return {
      frames: frames.length,
      medianMs: +p(0.5).toFixed(1),
      p95Ms: +p(0.95).toFixed(1),
      worstMs: +Math.max(...frames).toFixed(1),
      dropped: frames.filter((f) => f > 34).length,
      longTasks: long.length,
      longestTask: long.length ? Math.max(...long) : 0,
    };
  });

  perf.p95Ms < 34
    ? pass("scroll: p95 frame time", `${perf.p95Ms}ms`)
    : fail("scroll: p95 frame time", `${perf.p95Ms}ms`);
  perf.dropped / perf.frames < 0.05
    ? pass("scroll: dropped frames", `${perf.dropped}/${perf.frames}`)
    : fail("scroll: dropped frames", `${perf.dropped}/${perf.frames}`);
  pass("scroll: detail", JSON.stringify(perf));
  await perfCtx.close();
}

/* ------------------------------------------------- responsive overflow */
for (const w of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  const o = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  o === 0 ? pass(`no overflow @${w}`) : fail(`overflow @${w}`, o);
  await page.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? "  — " + r.detail : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
