# Design

Recorded from the shipped build, not from intentions. Every value below was
read out of the code that ships.

## World

Pure black ground, thin white technical linework, no colour anywhere. One
filled element in the whole system — the primary action button, inverted to
paper. Everything else is drawn in line.

The ground is dark because the scene is: the film is a night-lit
architectural blueprint, and the interface is the same drawing continued.
There is no light counterpart and no light theme.

## Colour

| Token | Value | Role | Contrast on black |
|---|---|---|---|
| `--ground` | `#000000` | Page ground | — |
| `--ink` | `#ffffff` | Display, active state | 21:1 |
| `--ink-1` | `#ededed` | Body | ~18.9:1 |
| `--ink-2` | `#9c9c9c` | Secondary | ~7.6:1 |
| `--ink-3` | `#7c7c7c` | Tertiary, placeholders | ~5.0:1 |
| `--line` | `rgba(255,255,255,.14)` | Hairline off-film |
| `--line-mid` | `rgba(255,255,255,.26)` | Field underline |
| `--line-strong` | `rgba(255,255,255,.52)` | Emphasis rule |
| `--invert-bg` / `--invert-ink` | `#f4f4f4` / `#000` | The one filled control |

Over the film, rules run at `rgba(255,255,255,.24)` and body copy at `#c2c2c2`
— both lifted from the off-film values because line art behind text eats
contrast.

## Type

The interface face is bound **per locale**, in each root layout:

| Locale | Face | Why |
|---|---|---|
| EN, DE | **Chillax** (variable 200–700, Fontshare, self-hosted) | The chosen voice |
| UK | **Onest** (variable, Google, self-hosted) | Chillax contains zero Cyrillic — verified against the shipped file, nothing in 0x0400–0x04FF |
| all | **Outfit** Thin, capitals (Fontshare, self-hosted) | Wordmark only, and it is Latin |

Both interface faces expose the same `--font-body` custom property, so every
rule downstream is face-agnostic and the Ukrainian pages keep the identical
hierarchy rather than a substituted one.

### Weight roles

Three steps, the ones Chillax is designed around, and present in Onest too:

| Token | Weight | Applied to |
|---|---|---|
| `--w-heading` | 500 Medium | H1, panel titles, inquiry title, legal titles |
| `--w-sub` | 400 Regular | Service names, case title, industry cells, field labels |
| `--w-body` | 300 Light | All running text: ledes, descriptions, hints, sub-heading |

The wordmark sits outside this scale at Outfit 100, set larger than the nav
links beside it — at that weight the strokes are hairlines and at label size
they would disappear against the film.

| Step | Range | Used for |
|---|---|---|
| `--step--1` | 0.72–0.8rem | Labels, HUD, buttons, footer |
| `--step-0` | 0.9–1rem | Body, form fields |
| `--step-1` | 1.06–1.3rem | Ledes, spec names, industries |
| `--step-2` | 1.35–2rem | Case title |
| `--step-3` | 1.9–3.4rem | Panel titles, inquiry title |
| `--step-4` | 2.6–5.6rem | H1 only, capped at `7.6vh`, and re-scaled below 560px |

### Short viewports

The services panel is the tallest block on the site — five rows of name plus
a two-line description. On a 640–667px-tall phone it ran to ~690px and pushed
past both the wordmark and the bottom edge. Two media queries
(`max-height: 740px` and `660px`) step the type down and tighten the rows
until it fits, and the hero is re-scaled below 560px with a shade pool sized
to the taller mobile text block. Nothing is hidden at any size: a small screen
gets the same five services and the same five descriptions, set tighter.

Verified with no heading/wordmark collision at 360×640, 375×667, 393×852 and
1440×900, scanning every scroll position on the page.

## Structure

Two structures only.

**Over the film** — a specification schedule: hairline top rule, then rows of
name and body. Industries is the same language as an explicit 3×2 grid, whose
cells deliberately echo the window mullions in the frame behind them.

**Below the film** — the inquiry section, mirroring the client's reference:
identity, tagline and image on the left, fields and the single filled action
on the right.

There are no cards anywhere.

## Motion

### One timeline

`lib/animations/cinematic.js` owns a single ScrollTrigger. It pins the stage
and scrubs a one-property proxy tween; every transform is derived from that
one number in one render pass. No second scroll listener, no competing rAF.

```
progress ──┬─ film playhead      0 → 40.2s   (linear)
           ├─ world scale        1.00 → 1.18 (0.00–0.90)
           ├─ headline clear     0.05–0.14
           ├─ curtains           ±62% → ±150%, scale → 1.30 (0.50–0.96)
           ├─ panels             services / industries / work
           ├─ scrim              0 → 0.78, only while a panel is up
           ├─ final push         ×1.32 (0.90–1.00), dissolve 0.93–0.995
           └─ progress rule      a single hairline, no text
```

### Timing, in the film's own clock

| Film time | Progress | What happens |
|---|---|---|
| 0–2s | 0.00–0.05 | Title card holds |
| 2–5.6s | 0.05–0.14 | Title clears |
| 0–25s | 0.00–0.62 | Construction story. No panels, scrim at zero |
| 25.1–29.6s | 0.625–0.735 | What we do |
| 29.6–33.2s | 0.735–0.825 | Industries |
| 33.2–36.8s | 0.825–0.915 | Selected work |
| 36.8–40.2s | 0.915–1.00 | Panels clear, push into the monitor, dissolve |

The first twenty-five seconds carry a headline for the first few and nothing
after. That is the point: the film is the argument, and covering it with copy
was the single biggest fault of the previous build.

### Pace

18 viewport heights of scroll across 40 seconds of film on desktop — about
2.2 seconds of footage per screen of scroll. Tablet 14, phone 11. `scrub: 1.1`
smooths wheel steps without lag.

`scroll-behavior: smooth` is deliberately **not** set on `html`: on a scrubbed
timeline the browser keeps animating after the wheel stops, so the film
overshoots the frame the visitor meant to stop on. Anchor jumps into the film
resolve to a timeline position instead of an element, since pinned panels
never move.

### Values written per frame

Only `transform` and `opacity`, through `gsap.quickSetter`. `quickSetter` has
no handler for the `scale` shorthand — it accepts the call and writes nothing
— so uniform scale is a matched `scaleX`/`scaleY` pair. `will-change` appears
only on the six elements that actually animate.

### Tiers

`gsap.matchMedia()` owns all four and reverts them on unmount.

| Condition | Behaviour |
|---|---|
| ≥1024px | Full film, pointer parallax, pin 18vh, world 1.18 |
| 640–1023px | Full film, no parallax, pin 14vh, world 1.14 |
| ≤639px | Full film at 1280, pin 11vh, world 1.10 |
| `prefers-reduced-motion` | No pin, no scrub, **no video fetched at all**; the poster frame stands in and every panel becomes a stacked section |

`@media (scripting: none)` gives the same fallback without JavaScript.

## The film

One continuous 40.2s take, not a slideshow of stills. An earlier build used
six stills with two short clips; it read as "cropped photos of the worst
quality" because four of six scenes were static images cropped by
`object-fit: cover` and then magnified.

| File | Size | For |
|---|---|---|
| `sequence-1920.mp4` | 24.4 MB | ≥900px |
| `sequence-1280.mp4` | 14.6 MB | below that |

Encoded `-crf 31 -g 10 -bf 0 -tune animation`. The 10-frame GOP means a scrub
seek decodes at most ten frames; all-keyframe was tested and cost 40 MB for no
visible gain.

Both carry `unsharp=5:5:0.8` and `eq=contrast=1.12:brightness=-0.018`.
Downscaling 3836→1920 halves a 1px line to 0.5px, which anti-aliases to grey
and is why the footage looked dimmer than the master; the sharpen and contrast
lift put the line weight back.

The source is picked by layout width, never pixel density — a phone at dpr 2
is still only ~750 physical pixels wide, and keying off density shipped the
24 MB master to phones.

## Legibility over the film

Two devices, in this order:

1. **Text shadow** — a tight 2px rim plus a wide soft halo. This does the work.
2. **A scrim** — behind the headline, a pool sized to the text (920px × 46%);
   behind panels, a radial that reaches 0.78 and is at zero the rest of the time.

An earlier scrim covered most of the lower frame and greyed out the
architecture. Contrast that costs the film its blacks is the wrong trade.

## Layout

`--gutter` 1.25–2.75rem, `--section-y` 5–11rem, shell capped at 1440px. Every
grid track uses `minmax(0, …)`.

**No `overflow-x` on `html` or `body`.** It is the usual reflex against
sideways scroll and it can blind ScrollTrigger's scroll reader. Horizontal
overflow is prevented at the source and verified at 320/360/390/768/1024/1280/
1440/1920.

**`.cine` carries no height.** ScrollTrigger wraps the pinned stage in a
pin-spacer inside it; a fixed height there caps the spacer, the pin never
lengthens the document, and every section below ends up underneath the fixed
stage.

## Languages

Three, each with its own root layout so `<html lang>` is correct:
`/en`, `/de`, `/uk`. `/` redirects to `/en`. Every page declares all three
alternates plus `x-default`. Statutory pages exist per locale with localised
slugs and are `noindex` while they still hold bracketed placeholders.

## Content rules

The studio has no clients, testimonials, logos, metrics, awards, team names or
pricing on record. None are invented. The cinematic sequence is the one
demonstrable piece of work, and the site says so plainly.

Removed from the home page at the client's instruction, to be built as
separate pages later: How we work, What you get, About, Journal.

## Verified

`scripts/verify.mjs` — 53 checks, all passing: three locales (lang, title,
canonical, hreflang, one H1, no heading skips, alt text, JSON-LD, no console
errors), form validation and success with focus management, reduced motion,
keyboard order and visible focus, horizontal overflow at eight widths, and
scroll frame timing (median 17.7ms, p95 18.6ms, 1 dropped frame in 93 across a
full sweep and reverse).

`scripts/shoot.mjs` writes the review captures. The in-app browser pane cannot
screenshot this page — composited video layers come back black — so
verification runs through Playwright against a production build.

## Deliberate omissions

No kicker above any heading. No icon-plus-heading card grid. No gradient text,
glass or decorative blur. No monospace costume. No emoji standing in for
icons; the only glyph is `→`, `aria-hidden`, inside actions.
