import gsap from "gsap";

/* Pointer parallax.

   One listener, and it does no DOM work: it stores two numbers. All writing
   happens through gsap.quickTo, which reuses a single tween per property
   instead of allocating one per event. Nothing here reads layout, so the
   handler can never force a synchronous reflow.

   Values are deliberately small. If a visitor notices the parallax as an
   effect, it is too strong. */

export function attachParallax({ world, foreground, strength = 6 }) {
  if (!world) return () => {};

  const worldX = gsap.quickTo(world, "xPercent", {
    duration: 0.9,
    ease: "power3.out",
  });
  const worldY = gsap.quickTo(world, "yPercent", {
    duration: 0.9,
    ease: "power3.out",
  });

  const fgX = foreground
    ? gsap.quickTo(foreground, "xPercent", { duration: 0.7, ease: "power3.out" })
    : null;
  const fgY = foreground
    ? gsap.quickTo(foreground, "yPercent", { duration: 0.7, ease: "power3.out" })
    : null;

  function onMove(e) {
    // normalised to -0.5 .. 0.5 without touching layout
    const rx = e.clientX / window.innerWidth - 0.5;
    const ry = e.clientY / window.innerHeight - 0.5;

    worldX(rx * strength * -0.16);
    worldY(ry * strength * -0.16);

    if (fgX) {
      fgX(rx * strength * -0.34);
      fgY(ry * strength * -0.34);
    }
  }

  function onLeave() {
    worldX(0);
    worldY(0);
    if (fgX) {
      fgX(0);
      fgY(0);
    }
  }

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerleave", onLeave);

  return () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerleave", onLeave);
    onLeave();
  };
}
