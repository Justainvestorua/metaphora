import gsap from "gsap";

/* Normalised progress helpers. gsap.utils already ships the primitives the
   brief sketched by hand, so we use those rather than re-implementing them:
   clamp / mapRange / interpolate / normalize are all battle-tested and
   allocation-free. These wrappers only name them for this project. */

export const clamp01 = gsap.utils.clamp(0, 1);
export const lerp = gsap.utils.interpolate;
export const mapRange = gsap.utils.mapRange;

/**
 * Progress of `p` inside the window [start, end], clamped to 0..1.
 * Used to derive every sub-animation from the one master progress value.
 */
export function windowProgress(p, start, end) {
  if (end <= start) return p >= end ? 1 : 0;
  return clamp01((p - start) / (end - start));
}

/**
 * Drive a <video> element's playhead from a 0..1 progress value.
 *
 * The clips are encoded all-keyframe, so a seek is cheap, but issuing a seek
 * on every rAF still queues work we do not need. We skip writes smaller than
 * roughly one frame, and skip entirely while the element cannot seek yet.
 */
export function makeVideoScrubber(video, { fps = 20 } = {}) {
  const minDelta = 1 / (fps * 1.5);
  let last = -1;

  return function scrub(progress) {
    if (!video) return;
    // HAVE_CURRENT_DATA — below this, seeking throws or silently no-ops
    if (video.readyState < 2) return;
    const duration = video.duration;
    if (!duration || !Number.isFinite(duration)) return;

    const t = clamp01(progress) * (duration - 0.001);
    if (last >= 0 && Math.abs(t - last) < minDelta) return;
    last = t;

    try {
      video.currentTime = t;
    } catch {
      /* seeking before metadata settles — the next frame retries */
    }
  };
}

/**
 * Resolve the responsive source set for one cinematic frame.
 * Widths match what the asset pipeline emitted.
 */
export function frameSources(id) {
  return {
    avif: [1280, 1920, 2560].map((w) => `/img/${id}-${w}.avif ${w}w`).join(", "),
    webp: [1280, 1920, 2560].map((w) => `/img/${id}-${w}.webp ${w}w`).join(", "),
    fallback: `/img/${id}-1920.webp`,
  };
}

/** Single shared sizes attribute — the cinematic layers are always full-bleed. */
export const FULL_BLEED_SIZES = "100vw";
