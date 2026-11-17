"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { buildCinematic } from "@/lib/animations/cinematic";
import { frameSources, FULL_BLEED_SIZES } from "@/lib/animations/helpers";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CinematicSequence({ t }) {
  const root = useRef(null);
  const stage = useRef(null);
  const frame = useRef(null);
  const videoRef = useRef(null);
  const poster = useRef(null);
  const scrim = useRef(null);
  const hero = useRef(null);
  const curtainL = useRef(null);
  const curtainR = useRef(null);
  const progressBar = useRef(null);
  const panelRefs = useRef({});

  const [ready, setReady] = useState(false);

  /* Pick the encode that suits the display before anything is fetched, so a
     phone never downloads the 1920 master. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Someone who has asked for reduced motion never sees the film, so the
    // download must not start at all. Checking this here rather than only in
    // the matchMedia branch matters: this effect runs first, and by the time
    // the branch removed the src the fetch was already in flight.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Layout width decides, never pixel density on its own: a phone at dpr 2
    // is still only ~750 physical pixels wide, and the 1280 encode covers it
    // exactly. Keying off density would ship the 24 MB master to phones.
    const wide = window.matchMedia("(min-width: 900px)").matches;
    v.src = wide ? "/video/sequence-1920.mp4" : "/video/sequence-1280.mp4";
    v.preload = "auto";
    v.load();

    const onReady = () => setReady(true);
    v.addEventListener("loadeddata", onReady, { once: true });
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  useGSAP(
    (context, contextSafe) => {
      const mm = gsap.matchMedia();

      /* Anchors that point into the pinned film resolve to a scroll position
         on its timeline, not to an element — the panels never move, so there
         is nothing to scroll an element into view for. Wrapped in
         contextSafe so the listener is removed with the rest of the context. */
      const wireAnchors = (cinematic) => {
        const onClick = contextSafe((e) => {
          const a = e.target.closest?.('a[href^="#"]');
          if (!a) return;
          const id = a.getAttribute("href").slice(1);
          if (id !== "services" && id !== "work") return;
          if (cinematic.scrollToPanel(id)) e.preventDefault();
        });
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
      };

      const refs = () => ({
        root: root.current,
        stage: stage.current,
        frame: frame.current,
        video: videoRef.current,
        poster: poster.current,
        scrim: scrim.current,
        hero: hero.current,
        panels: panelRefs.current,
        curtainL: curtainL.current,
        curtainR: curtainR.current,
        progressBar: progressBar.current,
      });

      /* Desktop — the full camera, deliberately slow. 18 viewport heights of
         travel across 40 seconds of film: roughly 2.2s of footage per screen
         of scroll, which is slow enough to actually watch. */
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const c = buildCinematic(refs(), {
          ScrollTrigger,
          pinLength: 18,
          worldScale: 1.18,
          parallax: true,
        });
        const unwire = wireAnchors(c);
        return () => {
          unwire();
          c.kill();
        };
      });

      mm.add(
        "(min-width: 640px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
        () => {
          const c = buildCinematic(refs(), {
            ScrollTrigger,
            pinLength: 14,
            worldScale: 1.14,
            parallax: false,
          });
          const unwire = wireAnchors(c);
          return () => {
            unwire();
            c.kill();
          };
        }
      );

      mm.add("(max-width: 639.98px) and (prefers-reduced-motion: no-preference)", () => {
        const c = buildCinematic(refs(), {
          ScrollTrigger,
          pinLength: 11,
          worldScale: 1.1,
          parallax: false,
        });
        const unwire = wireAnchors(c);
        return () => {
          unwire();
          c.kill();
        };
      });

      /* Reduced motion — no pin, no scrub, no film. The still frame stands in
         and every panel becomes a normal stacked section. Nothing is lost. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.current?.setAttribute("data-static", "true");
        videoRef.current?.removeAttribute("src");
        return () => root.current?.removeAttribute("data-static");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const p1 = frameSources("f01");

  /* Two columns, not one stack.

     A single column ran the full height of the stage, and on a short viewport
     the block overflowed upward until the heading collided with the fixed
     wordmark. Splitting the heading rail from the body halves the height, so
     the panel centres inside the stage instead of pushing out of it. */
  const panel = (id, head, body) => (
    <div
      className={`cine__panel cine__panel--${id}`}
      ref={(el) => (panelRefs.current[id] = el)}
      data-panel={id}
    >
      <div className="shell cine__panel-grid">
        <div className="cine__panel-head">{head}</div>
        <div className="cine__panel-body">{body}</div>
      </div>
    </div>
  );

  return (
    <section className="cine" ref={root} id="top" aria-label={t.hero.h1.join(" ")}>
      <div className="cine__stage" ref={stage}>
        {/* the film */}
        <div className="cine__frame" ref={frame}>
          <picture className="cine__poster" ref={poster}>
            <source type="image/avif" srcSet={p1.avif} sizes={FULL_BLEED_SIZES} />
            <source type="image/webp" srcSet={p1.webp} sizes={FULL_BLEED_SIZES} />
            <img
              src={p1.fallback}
              alt=""
              width={1920}
              height={1082}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {/* facade passing the lens — CSS line work, nothing to decode */}
        <div className="cine__curtains" aria-hidden="true">
          <div className="cine__curtain cine__curtain--l" ref={curtainL} />
          <div className="cine__curtain cine__curtain--r" ref={curtainR} />
        </div>

        {/* darkens the film only while a panel is on screen */}
        <div className="cine__scrim" ref={scrim} aria-hidden="true" />

        {/* the opening title. It clears within the first seconds so the film
            owns the construction story. */}
        <div className="cine__hero" ref={hero}>
          <div className="shell">
            <h1 className="cine__h1">
              {t.hero.h1.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="cine__sub">{t.hero.sub}</p>
            <div className="cine__actions">
              <a className="btn btn--solid" href="#inquiry">
                {t.hero.primary}
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn--ghost" href="#work">
                {t.hero.secondary}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* content, choreographed to the film's own timeline */}
        {panel(
          "services",
          <>
            <h2 className="cine__panel-title" id="services">
              {t.services.h2}
            </h2>
            <p className="cine__panel-lede">{t.services.lede}</p>
          </>,
          <>
            <ul className="spec">
              {t.services.items.map((s) => (
                <li className="spec__row" key={s.name}>
                  <h3 className="spec__name">{s.name}</h3>
                  <p className="spec__body">{s.body}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {panel(
          "industries",
          <>
            <h2 className="cine__panel-title">{t.industries.h2}</h2>
            <p className="cine__panel-lede">{t.industries.lede}</p>
          </>,
          <>
            <ul className="tags">
              {t.industries.items.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}

        {panel(
          "work",
          <>
            <h2 className="cine__panel-title" id="work">
              {t.work.h2}
            </h2>
            <p className="cine__panel-lede">{t.work.lede}</p>
          </>,
          <>
            <div className="case">
              <div className="case__strip">
                {t.work.frames.map((fr) => {
                  const s = frameSources(fr.src);
                  return (
                    <figure key={fr.src}>
                      <picture>
                        <source
                          type="image/avif"
                          srcSet={s.avif}
                          sizes="(max-width: 760px) 33vw, 220px"
                        />
                        <img src={s.fallback} alt={fr.alt} width={1920} height={1082} loading="lazy" decoding="async" />
                      </picture>
                    </figure>
                  );
                })}
              </div>
              <div className="case__meta">
                <h3 className="case__title">{t.work.caseTitle}</h3>
                <dl>
                  {t.work.meta.map((m) => (
                    <div key={m.k}>
                      <dt>{m.k}</dt>
                      <dd>{m.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </>
        )}

        {/* A single hairline showing how far through the film the visitor is.
            No scene names and no timecode: which second of a video someone is
            on is production metadata, not something a prospective client has
            any use for. The rule alone answers "is there much more of this?",
            which is the only part that was doing work. */}
        <div className="cine__hud" aria-hidden="true">
          <div className="cine__track">
            <span className="cine__bar" ref={progressBar} />
          </div>
        </div>

        <div className={`cine__loading${ready ? " is-ready" : ""}`} aria-hidden="true" />
      </div>
    </section>
  );
}
