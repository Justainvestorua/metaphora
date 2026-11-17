/* The direction contract.

   Emitted as a genuine HTML comment in the shipped markup, not a JSX
   comment — JSX comments are compiled away, so a contract written that way
   is one nobody can audit in the built output. */

export const DIRECTION_CONTRACT = `
METAPHORA — direction contract  [seed: pinned-world/no-tournament]

THESIS: A studio that builds for builders proves it by constructing its own
site in front of you: an empty plot developing into a complex, then one
unbroken push into the screen you are already reading. It refuses the agency
scaffold of hero, three icon cards, logo wall, testimonial carousel.

OWN-WORLD: Pure black ground, thin white technical linework, zero colour. One
filled element in the whole system — the action button, inverted to paper.
Structure is a specification schedule: hairline rules, an index column at the
left, substance at the right. Archivo throughout; tight negative tracking on
display, wide positive tracking on labels. Curtains and progress rules are
drawn in CSS line work, never imagery.

STORY: A visitor arrives sceptical, because every studio site looks alike.
They watch a site get built, land inside the screen, and are asked for their
project while the demonstration is still in view. Everything below the fold
substantiates what they just watched, in measurable terms rather than
adjectives.

FIRST VIEWPORT: Frame 01 full-bleed — an empty plot in wireframe, horizon
high. H1 lower-left at display scale, one sentence beneath it, the filled
primary action and a ghost secondary directly under that. Stage readout and a
1px progress rule pinned to the bottom edge, gutter to gutter.

FORM: Cinematic pin into a specification schedule. Second on the ordered list
after a horizontal-travel variant, which was rejected because it fought the
vertical scroll the sequence depends on. No concept tournament was run: the
visual world was pinned by the client's six reference frames, so it was
inherited rather than invented.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
`;

export const contractMarkup = { __html: `<!--${DIRECTION_CONTRACT}-->` };
