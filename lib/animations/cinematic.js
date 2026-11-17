import gsap from "gsap";
import { windowProgress } from "./helpers";

/* ===========================================================================
   The cinematic scroll system.

   One ScrollTrigger pins the stage and scrubs a single proxy value. Every
   transform below is derived from that one number inside one render pass.
   There is no second scroll listener and no competing rAF loop.

   The film is one continuous 40.2s take — not a slideshow of stills. Scroll
   position maps linearly onto the video playhead, so the visitor is always
   looking at real footage at whatever moment they have scrolled to.

   Choreography, expressed in the film's own timeline:

     0s ─────────────── 25s     construction story. Almost no text: the
                                headline clears within the first stretch and
                                the frame belongs to the film.
     25s ────────────── 33s     the camera approaches the building; content
                                panels arrive in sequence over a scrim.
     33s ────────────── 40s     panels clear, the push into the monitor
                                completes, the frame dissolves to black.

   The section that follows begins on the same black, so the hand-off from
   the pinned stage into normal document flow has no visible edge.
   =========================================================================== */

export const FILM_DURATION = 40.2;
export const CONTENT_ENTERS_AT = 25 / FILM_DURATION; // ≈ 0.622

/** Panel windows, in master progress. Each is [fadeIn, hold, fadeOut]. */
export const PANELS = [
  { id: "services", in: 0.625, out: 0.735 },
  { id: "industries", in: 0.735, out: 0.825 },
  { id: "work", in: 0.825, out: 0.915 },
];

const PANEL_FADE = 0.028;

function panelOpacity(p, panel) {
  const up = windowProgress(p, panel.in, panel.in + PANEL_FADE);
  const down = 1 - windowProgress(p, panel.out - PANEL_FADE, panel.out);
  return Math.min(up, down);
}

/**
 * @param {object} refs   DOM nodes collected by the component
 * @param {object} opts
 * @returns {{kill: () => void}}
 */
export function buildCinematic(refs, opts = {}) {
  const {
    root,
    stage,
    frame, // wraps the video — carries world scale and the final push
    video,
    poster,
    scrim,
    hero,
    panels, // { [id]: element }
    curtainL,
    curtainR,
    progressBar,
  } = refs;

  const {
    ScrollTrigger,
    pinLength = 18,
    worldScale = 1.18,
    parallax = true,
  } = opts;

  /* ---------------------------------------------------------------- setters
     Resolved once, then called with a number. Note that quickSetter has no
     handler for the `scale` shorthand — it accepts the call and writes
     nothing — so uniform scale goes through a matched axis pair. */
  const uniformScale = (el) => {
    const sx = gsap.quickSetter(el, "scaleX");
    const sy = gsap.quickSetter(el, "scaleY");
    return (v) => {
      sx(v);
      sy(v);
    };
  };

  const setFrameScale = uniformScale(frame);
  const setFrameOpacity = gsap.quickSetter(frame, "opacity");
  const setScrim = gsap.quickSetter(scrim, "opacity");
  const setHero = {
    opacity: gsap.quickSetter(hero, "opacity"),
    y: gsap.quickSetter(hero, "yPercent"),
  };
  const setCurtainL = {
    x: gsap.quickSetter(curtainL, "xPercent"),
    scale: uniformScale(curtainL),
  };
  const setCurtainR = {
    x: gsap.quickSetter(curtainR, "xPercent"),
    scale: uniformScale(curtainR),
  };
  const panelSetters = PANELS.map((panel) => ({
    panel,
    el: panels[panel.id],
    setOpacity: gsap.quickSetter(panels[panel.id], "opacity"),
    setY: gsap.quickSetter(panels[panel.id], "yPercent"),
  }));

  /* ------------------------------------------------------------ video scrub
     The clip is encoded with a 10-frame GOP, so a seek decodes at most ten
     frames and lands immediately. We still skip sub-frame writes: issuing a
     seek per rAF queues work that will be superseded before it paints. */
  const FRAME = 1 / 24;
  let lastSeek = -1;
  let posterHidden = false;

  function scrubFilm(p) {
    if (!video) return;
    if (video.readyState < 2) return; // HAVE_CURRENT_DATA

    if (!posterHidden) {
      posterHidden = true;
      // hand over from the instant poster once real frames exist
      gsap.to(poster, { opacity: 0, duration: 0.45, ease: "power2.out" });
    }

    const duration = video.duration;
    if (!duration || !Number.isFinite(duration)) return;

    const t = Math.min(p, 0.9999) * duration;
    if (lastSeek >= 0 && Math.abs(t - lastSeek) < FRAME * 0.9) return;
    lastSeek = t;
    try {
      video.currentTime = t;
    } catch {
      /* metadata not settled yet; the next frame retries */
    }
  }

  /* -------------------------------------------------------------- the render
     One function, one input. Everything visual is a pure function of p. */
  function render(p) {
    scrubFilm(p);

    /* world: a slow, continuous depth push behind the film */
    const worldP = windowProgress(p, 0, 0.9);
    const baseScale = 1 + (worldScale - 1) * worldP;

    /* Final push into the monitor.

       Deliberately small. The film already flies into the screen — that
       camera move is in the footage — so scaling the video on top of it only
       magnifies compression, and the screen goes soft exactly at the moment
       the visitor is meant to read it. A short continuation plus an early
       dissolve keeps the frame sharp and hands over to the real form, which
       is live DOM and stays crisp at any size. */
    const pushP = windowProgress(p, 0.9, 1);
    const push = 1 + 0.32 * (pushP * pushP);
    setFrameScale(baseScale * push);
    setFrameOpacity(1 - windowProgress(p, 0.93, 0.995));

    /* curtains: the facade passing the lens as the camera closes in */
    const cP = windowProgress(p, 0.5, 0.96);
    const eased = cP * cP * (3 - 2 * cP);
    const offset = 62 + (150 - 62) * eased;
    const cScale = 1 + 0.3 * eased;
    setCurtainL.x(-offset);
    setCurtainL.scale(cScale);
    setCurtainR.x(offset);
    setCurtainR.scale(cScale);

    /* headline: clears early so the film owns the first stretch */
    const hP = windowProgress(p, 0.05, 0.14);
    setHero.opacity(1 - hP);
    setHero.y(-hP * 10);

    /* panels, and the scrim that makes them legible over the film */
    let maxPanel = 0;
    for (let i = 0; i < panelSetters.length; i++) {
      const { panel, el, setOpacity, setY } = panelSetters[i];
      const o = panelOpacity(p, panel);
      setOpacity(o);
      setY((1 - o) * 2.5);
      if (o > maxPanel) maxPanel = o;
      const vis = o > 0.001 ? "visible" : "hidden";
      if (el.style.visibility !== vis) el.style.visibility = vis;
      el.style.pointerEvents = o > 0.6 ? "auto" : "none";
    }
    setScrim(maxPanel * 0.78);

    /* progress rule — the only readout left */
    if (progressBar) progressBar.style.transform = `scaleX(${p})`;
  }

  /* --------------------------------------------------------- the one trigger */
  const state = { p: 0 };

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * pinLength}`,
      pin: stage,
      pinSpacing: true,
      anticipatePin: 1,
      // a longer catch-up than usual: this is a slow, deliberate camera and
      // the extra smoothing keeps wheel steps from reading as jumps
      scrub: 1.1,
      invalidateOnRefresh: true,
    },
  });

  timeline.to(state, { p: 1, ease: "none", onUpdate: () => render(state.p) });

  /* --------------------------------------------------------------- parallax
     Very small, and written through quickTo so the pointer handler never
     touches layout. */
  let detachParallax = () => {};
  if (parallax) {
    const fx = gsap.quickTo(frame, "xPercent", { duration: 1.1, ease: "power3" });
    const fy = gsap.quickTo(frame, "yPercent", { duration: 1.1, ease: "power3" });
    const lx = gsap.quickTo(curtainL, "yPercent", { duration: 0.9, ease: "power3" });
    const rx = gsap.quickTo(curtainR, "yPercent", { duration: 0.9, ease: "power3" });

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      fx(nx * -0.9);
      fy(ny * -0.9);
      lx(ny * 1.2);
      rx(ny * 1.2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    detachParallax = () => window.removeEventListener("pointermove", onMove);
  }

  render(0);

  /* Anchors into the film.

     "View selected work" cannot scroll to an element: the panels live inside
     a pinned stage, so they never move. What it can do is scroll to the
     position on the timeline where that panel is fully on screen. */
  function scrollToPanel(id, { instant = false } = {}) {
    const st = timeline.scrollTrigger;
    const target = PANELS.find((p) => p.id === id);
    if (!st || !target) return false;
    const mid = target.in + PANEL_FADE + 0.012;
    const y = st.start + (st.end - st.start) * mid;
    window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
    return true;
  }

  return {
    scrollToPanel,
    kill() {
      detachParallax();
      timeline.scrollTrigger?.kill();
      timeline.kill();
    },
  };
}
