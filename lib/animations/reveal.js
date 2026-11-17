import gsap from "gsap";

/**
 * The inquiry section rises out of the same black the film dissolved into.
 * This is the second half of the hand-off: the stage above ends on black,
 * this begins on black, so the seam between the pinned film and normal
 * document flow is not visible.
 */
export function attachInquiryArrival(ScrollTrigger, el) {
  if (!el) return () => {};

  const target = el.querySelector("[data-arrival]");
  if (!target) return () => {};

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 95%",
      end: "top 35%",
      scrub: 0.6,
    },
  });

  tl.fromTo(
    target,
    { scale: 0.96, opacity: 0 },
    { scale: 1, opacity: 1, ease: "none" }
  );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
