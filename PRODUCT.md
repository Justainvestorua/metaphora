# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js / React — user decision (offered static HTML/CSS and Astro alongside it; Next.js chosen).
Three root layouts under route groups, one per locale, so `<html lang>` is correct per language.
Implication accepted: GSAP work must use `useGSAP` with `gsap.context()` cleanup so no ScrollTrigger,
timeline, ticker, or listener survives unmount or route change.

## Users

Primary: business decision-makers commissioning a custom website — owners, marketing leads, and
partners at firms in architecture, construction, real estate, industrial, product, and e-commerce.

Situation: they are evaluating studios, usually from search or referral, and are deciding within a
few minutes whether this studio is capable enough to trust with a build. They are not shopping for
a template. They arrive skeptical because most agency sites look identical.

Job: judge craft quickly, understand what is actually offered, and start a conversation without
friction.

## Product Purpose

METAPHORA is a digital studio. It builds digital foundations — and the cinematic experiences that
stand on them — for businesses that already exist in the real world.

The site's job is to win qualified project inquiries. Success is a completed Project Inquiry
submission from a buyer who understood what was offered before they submitted.

## Positioning

The brand idea is digital construction: we build digital foundations, and the cinematic experiences
that stand on them. The studio demonstrates capability rather than claiming it: the site itself is
the portfolio piece.
The cinematic construction sequence — an empty site developing into a completed complex, then a
continuous camera move into the office and into the screen — is a working demonstration of
engineering and art direction that a competitor cannot truthfully copy by describing it.

The governing claim, from the client brief: the work feels expensive because it is precise, not
because it is overloaded.

## Operating Context

Buyers arrive predominantly from organic search on commercial intent (web design, web designer,
web development, custom website design) and from industry-qualified intent (architecture,
construction, real estate, industrial, product, e-commerce, business website design). Referral is
secondary.

Evaluation happens on-page and fast. There is no sales call before the inquiry form; the form is
the first contact.

Trilingual EN / DE / UK market, served at `/en`, `/de` and `/uk`. The presence of an Impressum
indicates a German-speaking legal jurisdiction, where Impressum and Privacy are statutory rather
than optional. Copy is authored per language rather than machine-translated from English.

## Capabilities and Constraints

Confirmed service offering (from the client brief's commercial intent list, confirmed by the user
as the real offering):

- Custom website design
- Web development
- Industry-specific website design: architecture, construction, real estate, industrial, product,
  e-commerce, business

Hard technical constraints carried from the brief:

- Scroll must remain smooth under fast, reverse, and direction-changing input. No jank, no layout
  shift, no horizontal overflow.
- Animation must be GPU-friendly: transform and opacity only, save for justified exceptions.
- One master scroll progress source of truth; no competing scroll systems.
- `prefers-reduced-motion` must be honoured without losing content or navigation.
- Mobile degrades the cinematic complexity but must preserve the visual story.
- No heavy canvas, WebGL, particle systems, or expensive continuous filters.
- The film is the argument. The first 25 seconds of the sequence carry almost no
  copy; content arrives only once the camera begins its approach to the building.
- The home page stays short. The client will find clients rather than be found by
  them, so the site works as a calling card: who, what, for whom, proof, action.

Undecided / not yet established: pricing, engagement model, team size, location, turnaround times.
These must not be invented.

## Brand Commitments

Binding, taken from the supplied reference frames and treated as fixed:

- Name: METAPHORA. Domain: METAPHORA.COM
- Typeface: Chillax for the interface, Outfit Thin in capitals for the wordmark
  (both Fontshare, self-hosted). Onest backs them for Cyrillic, which neither has.
- Visual identity: pure black background, thin white architectural wireframe / technical blueprint
  linework. Monochrome. No colour accents introduced.
- Navigation: WORK · SERVICES · CONTACT. The client has reserved About, Journal,
  How we work and What you get as separate pages to be designed later; they are
  deliberately absent from the home page and from the nav until they exist.
- Brand idea: digital construction. We build digital foundations and the
  cinematic experiences that stand on them — not "websites".
- No scene counter or timecode on the film. Which second of a video a visitor is
  on is production metadata and was removed at the client's instruction.
- Footer: PRIVACY · LEGAL · IMPRESSUM
- Language switcher: EN / DE / UK
- Primary CTA: `START A PROJECT →` — Secondary CTA: `VIEW SELECTED WORK →`. No other CTA labels.
- Project Inquiry form fields, in order: Name, Company, Email, Project, Message
- Inquiry section heading: "PROJECT INQUIRY"

## Evidence on Hand

Real and usable:

- Six cinematic 4K reference frames and five generated 4K transition clips (`output/`), assembled
  into one continuous 40.2s 4K master (`output/FULL_SEQUENCE_01_to_06_4K.mp4`).
- Two web encodes derived from that master (`public/video/sequence-1920.mp4`,
  `sequence-1280.mp4`) plus responsive AVIF/WebP stills (`public/img/`).
- `07_PROJECT_INQUIRY_FORM_REFERENCE.png` — the binding visual reference for the inquiry form.

Explicitly absent — must not be fabricated:

- No client names, logos, or case studies
- No testimonials or quotes
- No metrics, awards, press, or performance claims
- No team member names, photos, or bios
- No pricing

Proof and Projects sections are to be structured and present, but must not be filled with invented
evidence. The cinematic sequence is the one demonstrable piece of work available.

## Product Principles

1. **Demonstrate, do not assert.** Craft claims are only credible here if the page itself proves
   them. Any sentence that could be pasted onto a competitor's site is a liability.
2. **Precision over volume.** Restraint is the brand. Adding elements weakens the position.
3. **Motion must carry meaning.** Every movement communicates progression, depth, scale, or
   hierarchy, or it is removed.
4. **Never trade usability for spectacle.** The visitor must always know where they are, what is
   offered, and what happens next — including with motion disabled.
5. **Say nothing that is not true.** Absent evidence stays absent rather than becoming filler.

## Accessibility & Inclusion

- Full keyboard operability with visible focus states throughout.
- Semantic buttons, links, and form labels; no div-based controls.
- Text contrast must remain legible against pure black at all cinematic stages.
- `prefers-reduced-motion` disables large camera movement and parallax while preserving all content
  and navigation.
- The site must remain fully usable and comprehensible with animation disabled entirely.
