import InquiryForm from "./InquiryForm";

/* The only section below the cinematic.

   It sits last on purpose: the visitor has just watched a complex get built,
   walked into the office and arrived at the screen, and has passed the three
   content panels on the way. The ask comes after the demonstration.

   The composition follows the client's reference sheet exactly: the
   architectural photograph bleeds off the lower-left corner, the identity
   sits above it, and the fields with their single filled action occupy the
   right column. The stage above dissolves to black and this begins on black,
   so the hand-off from the pinned film into normal flow has no visible edge. */

export function Inquiry({ t }) {
  return (
    <section className="inquiry" id="inquiry" aria-labelledby="inquiry-title">
      {/* Decorative: the building carries mood, not information, and the
          section is already titled. */}
      <picture className="inquiry__photo" aria-hidden="true">
        <source
          type="image/avif"
          srcSet="/img/inquiry-712.avif 712w, /img/inquiry-1424.avif 1424w"
          sizes="(max-width: 900px) 100vw, 48vw"
        />
        <source
          type="image/webp"
          srcSet="/img/inquiry-712.webp 712w, /img/inquiry-1424.webp 1424w"
          sizes="(max-width: 900px) 100vw, 48vw"
        />
        <img
          src="/img/inquiry-712.webp"
          alt=""
          width={712}
          height={508}
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="shell">
        <div className="inquiry__grid" data-arrival>
          <div className="inquiry__intro">
            <h2 className="inquiry__title" id="inquiry-title">
              {t.inquiry.h2}
            </h2>
            <p className="inquiry__tagline">{t.inquiry.tagline}</p>
            <p className="inquiry__orient">{t.inquiry.orient}</p>
          </div>
          <div className="inquiry__form">
            <InquiryForm t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
