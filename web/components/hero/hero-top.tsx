/**
 * Hero top-block variants, for review. Desktop only.
 *
 * Opened August 11, 2026. Jon: *"we're gonna actually need to research sites
 * that we like, lean on skills, and try and redesign this top part quite a bit
 * better."*
 *
 * ## The measured problem
 *
 * 248px sat between the header and the film, spent like this: eyebrow 35,
 * **headline 85**, paragraph 82, CTA 44, authority line 20. The hero was
 * spending twice as much vertical space on supporting apparatus as on its own
 * claim, and the right column (180px) was nearly twice the height of the
 * headline beside it, so the two-column composition never resolved.
 *
 * ## What the research says, and it converged from three directions
 *
 * Evil Martians studied 100 devtool landing pages in 2025: *"In the vast
 * majority of examples we studied, the hero section is centered"*, and
 * side-by-side text-left/visual-right reads as *"classic SaaS"* and is the
 * exception. Linear's own hero is centred, and carries a headline, a **single
 * 12-word** subheadline, and a CTA. No paragraph.
 *
 * The same study puts **social proof after the hero, not inside it**. The
 * `design-taste-frontend` skill reaches the same rule independently, banning a
 * "tiny tagline below CTAs" and capping the hero at four text elements. This
 * hero has five, and the fifth is the authority line.
 *
 * **So the authority line's problem was never where it sat inside the hero.**
 * It was that it was in the hero at all. It has been called an orphan in three
 * separate reviews and re-sited twice; every variant below moves it beneath the
 * film, where a credibility line belongs, and the orphan problem disappears
 * rather than moving again.
 *
 * That is held constant across all five so the comparison has one variable.
 * `AuthorityLine` is exported, so putting it back is a one-line change.
 *
 * ## Where the spec governs over the skill
 *
 * Two conflicts, surfaced rather than split, per `CLAUDE.md`:
 *
 * - The skill bans em-dashes outright. `CURRENT-HANDOFF` §8c permits exactly
 *   two on this page and lists them as do-not-reopen. **The spec governs.**
 * - The skill bans div-built product UI as fake screenshots. The sheet is a
 *   ratified illustrative asset across seven sessions, and the hero visual is
 *   now an animated product UI, which the same research names as the strongest
 *   hero treatment available. **The spec governs.**
 *
 * One tension worth Jon's eye rather than a ruling: the page theme's "centre
 * nothing" rule, and the skill's anti-centre bias at this variance, both point
 * away from variant A, while the category research points hard toward it. A is
 * built so the argument can be had against something real.
 */

import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/cn";
import { HERO_SUPPORTING_SHORT } from "@/lib/hero-copy";

export type HeroTopVariant = "current" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

/** Ratified, `01-HERO`. */
const EYEBROW =
  "A Google Sheet that automatically keeps your recruiting tracker current.";

function Eyebrow({ center = false }: { center?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase",
        center && "justify-center text-center",
      )}
    >
      <span
        aria-hidden="true"
        className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
      />
      {EYEBROW}
    </p>
  );
}

/**
 * `620px` is the ratified break rather than a guess: "Your networking keeps
 * moving." sets to about 560px at 40px in the display face, so a 620px measure
 * puts the second sentence on its own line exactly as `01-HERO` composes it.
 * Without it, the variants that do not use a grid column let the headline run
 * the full page box and break after "does", which is mid-clause.
 */
function Headline({ center = false }: { center?: boolean }) {
  return (
    <h1
      className={cn(
        "font-display text-display leading-[1.06] font-semibold tracking-[-0.028em] text-ink",
        /* 760, from September 4, 2026: the headline that replaced "Recruiting truly
           sucks" is longer, and at 620 it wrapped to four lines at 1440px. */
        center ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]",
      )}
    >
      {/* One line, one colour. The two-tone contrast read as a pitch; Jon's
          5 September 2026 brief is peer to peer and plain. */}
      <span className="block">A networking tracker that keeps itself current.</span>
    </h1>
  );
}

/**
 * The credibility line, now below the film on every variant.
 *
 * The 12px rule stays: Jon ruled on August 11 that both surfaces share one
 * short mark rather than desktop's old 32px "big dash". Left-aligned to the
 * page box, quiet, directly under the thing it vouches for.
 */
export function AuthorityLine({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-small leading-[1.5] text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mr-3 inline-block h-px w-3 align-middle bg-ink-faint"
      />
      Made by{" "}
      <span className="font-medium text-ink">
        someone who went through IB recruitment
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ variants */

/**
 * A — Centred. The devtool default.
 *
 * Eyebrow, headline, one short line, CTA, all on the page's centre axis, with
 * the film full width beneath. This is Linear's shape and the shape the
 * hundred-page study found dominant.
 *
 * **What it costs:** the page theme's "centre nothing" rule, which exists
 * because the *static* hero was asymmetric — sheet left, three cue cards always
 * right — so centred copy fought the visual's optical centre. The film changed
 * that premise: its right side is empty for most of its run and a cue appears,
 * works and leaves. Whether an asymmetry that only exists intermittently should
 * still govern the copy above it is exactly the question A is here to answer.
 */
function VariantA() {
  return (
    <div className="mx-auto max-w-[52rem] pt-6 text-center">
      <Eyebrow center />
      <div className="mt-5">
        <Headline center />
      </div>
      <p className="mx-auto mt-5 max-w-[46ch] text-lede leading-[1.55] text-ink-muted">
        {HERO_SUPPORTING_SHORT}
      </p>
      <div className="mt-7 flex justify-center">
        <CtaButton location="hero" />
      </div>
    </div>
  );
}

/**
 * B — Two columns, resolved.
 *
 * The most conservative option: keeps the ratified split and fixes what was
 * broken about it. The headline fills its column, the right column is a bound
 * block rather than a stack of four unrelated weights, and with the paragraph
 * cut to one line the two columns finally end within a few pixels of each
 * other instead of 95px apart.
 */
function VariantB() {
  return (
    <div className="pt-6">
      <Eyebrow />
      <div className="mt-5 grid items-end gap-x-16 gap-y-6 desk:grid-cols-[minmax(0,1fr)_420px]">
        <Headline />
        <div>
          <p className="max-w-[44ch] text-lede leading-[1.55] text-ink-muted">
            {HERO_SUPPORTING_SHORT}
          </p>
          <div className="mt-5">
            <CtaButton location="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * C — Text block, then a CTA row.
 *
 * Headline and subhead share the two-column split, then a full-width row
 * beneath carries the CTA on the page's left axis. Nothing is centred, the
 * columns no longer have to resolve against each other because the CTA has
 * left the column entirely, and it is the most compact of the three that keep
 * a subhead.
 */
function VariantC() {
  return (
    <div className="pt-6">
      <Eyebrow />
      <div className="mt-5 grid items-start gap-x-16 gap-y-4 desk:grid-cols-[minmax(0,1fr)_420px]">
        <Headline />
        <p className="max-w-[44ch] text-lede leading-[1.55] text-ink-muted desk:pt-2">
          {HERO_SUPPORTING_SHORT}
        </p>
      </div>
      <div className="mt-7">
        <CtaButton location="hero" />
      </div>
    </div>
  );
}

/**
 * D — No subhead. The film carries it.
 *
 * Three elements: eyebrow, headline, CTA. Jon: *"I don't know if we need all
 * that text there and maybe try and let visual asset do more of the work."*
 *
 * This is the variant that tests that directly. The film demonstrates, three
 * times with names, exactly what the subhead asserts — so the subhead is the
 * page's own fault pattern in its most literal form: words doing work the
 * picture already does, 300px above the picture.
 *
 * It is also the shortest, which buys the most room for the film above the
 * fold on a small laptop.
 */
function VariantD() {
  return (
    <div className="pt-6">
      <Eyebrow />
      <div className="mt-5 flex flex-col gap-7 desk:flex-row desk:items-end desk:justify-between desk:gap-16">
        <Headline />
        <div className="shrink-0 desk:pb-1">
          <CtaButton location="hero" />
        </div>
      </div>
    </div>
  );
}

/**
 * E — Left-weighted, mirroring the film.
 *
 * Everything in a narrow left column with the right side deliberately empty.
 *
 * This is the one variant that responds to the film's own composition rather
 * than to a layout convention. The film's weight sits left — the sheet occupies
 * 1006 of its 1322px — and its right side is empty except when a cue is
 * present. **The empty right at the top rhymes with the empty right below it**,
 * so the block above the visual is built from the same asymmetry as the visual,
 * instead of being aligned against a symmetry the page does not have.
 *
 * It keeps "centre nothing" and pushes it further rather than abandoning it.
 */
function VariantE() {
  return (
    <div className="max-w-[38rem] pt-6">
      <Eyebrow />
      <div className="mt-5">
        <Headline />
      </div>
      <p className="mt-5 max-w-[42ch] text-lede leading-[1.55] text-ink-muted">
        {HERO_SUPPORTING_SHORT}
      </p>
      <div className="mt-7">
        <CtaButton location="hero" />
      </div>
    </div>
  );
}

/* ------------------------------------------ round two: the eyebrow moves up */

/**
 * F, G and H all drop the eyebrow from the hero, because it moves into the
 * header bar. `components/site-header.tsx` carries why that became available.
 *
 * **This is the change that unlocked the layout question rather than a tidy-up.**
 * The eyebrow and its gap were about 51px of the 248 above the film. Taking them
 * out is what lets a composition be chosen on how it reads instead of on how
 * short it is, and it is what makes H — centred — testable at all, since the
 * reason to reject centring last round was that it pushed the film off a laptop
 * screen rather than anything about the look.
 *
 * It also answers the thing Jon named in B and E: *"there's no real header start
 * to the page."* The start is now the header.
 *
 * ## Why E is not in this round
 *
 * Jon: *"This feels very left weighted, and there's a lot of empty space on the
 * right that doesn't feel right… it almost feels like our page is hopping over
 * to the left."*
 *
 * He is right and the argument for E was wrong in a way worth recording. It
 * rested on the empty right at the top rhyming with the empty right of the film
 * — **but the film's right is not reliably empty.** A cue card occupies it for
 * roughly half the run and then leaves. So the rhyme holds intermittently and
 * the lean is constant, which is the wrong way round. A composition rule cannot
 * depend on what a visual happens to be doing at a given second.
 */

/**
 * F — the left funnel.
 *
 * Headline, subhead, CTA stacked and each narrower than the last: 620, then
 * 440, then the button. Jon liked A's *"upside down triangle… that kinda funnels
 * you in"*, and this tests whether that quality needs centring or only needs
 * each element to be narrower than the one above it. The eye still travels down
 * and inward; it just does it against a left edge.
 */
function VariantF() {
  return (
    <div className="pt-2">
      <Headline />
      <p className="mt-5 max-w-[440px] text-lede leading-[1.55] text-ink-muted">
        {HERO_SUPPORTING_SHORT}
      </p>
      <div className="mt-7">
        <CtaButton location="hero" />
      </div>
    </div>
  );
}

/**
 * G — the counterbalance. **The recommendation.**
 *
 * Headline left, subhead right, CTA on its own row beneath. This is C with the
 * eyebrow moved, and it is the only option that answers every objection Jon
 * raised in one shape:
 *
 * - the counterbalance he liked in C is what stops the block leaning, which is
 *   what he disliked in E;
 * - the header start he missed in B comes from the bar;
 * - nothing is centred, so it avoids the *"too AI-SaaS"* risk he flagged in A;
 * - and it is **the shortest of the three**, because the subhead sits beside the
 *   headline rather than under it. About 150px against the current 248, so the
 *   film clears a laptop fold with room rather than with borrowed spacing.
 */
function VariantG() {
  return (
    <div className="pt-2">
      <div className="grid items-start gap-x-16 gap-y-4 desk:grid-cols-[minmax(0,1fr)_420px]">
        <Headline />
        <p className="max-w-[44ch] text-lede leading-[1.55] text-ink-muted desk:pt-2">
          {HERO_SUPPORTING_SHORT}
        </p>
      </div>
      <div className="mt-7">
        <CtaButton location="hero" />
        {/*
          Under the button, September 4, 2026. Jon: make it obvious this is
          free, that there is no catch, and that setup is short. Before this
          the word "free" appeared on the landing page exactly once, as the
          button's own label, which is the one place a reader discounts it.

          "About three minutes" is the whole journey. The setup pages say two
          for the numbered steps, which is the same claim measured from a
          later starting line.
        */}
        <p className="mt-3 text-small leading-[1.5] text-ink-muted">
          Free. No downloads or installs. Takes &lt; 3 min.
        </p>
      </div>
    </div>
  );
}

/**
 * H — centred, retested.
 *
 * A again, now that the eyebrow has left the hero. Worth rebuilding rather than
 * ruling out, because Jon's two objections to A were different in kind: *"half
 * the hero visual film is out of view immediately"* is a height problem, and
 * the header eyebrow fixes it. *"I don't know if that's just too AI-SaaS"* is a
 * taste problem, and it is the only one left to judge once the height is gone.
 *
 * So H isolates the actual question: with the film on screen, is centred right
 * for this page? The page theme's centre-nothing rule still says no, and the
 * category research still says it is what the category does.
 */
function VariantH() {
  return (
    <div className="pt-2 text-center">
      <Headline center />
      <p className="mx-auto mt-5 max-w-[46ch] text-lede leading-[1.55] text-ink-muted">
        {HERO_SUPPORTING_SHORT}
      </p>
      <div className="mt-7 flex justify-center">
        <CtaButton location="hero" />
      </div>
    </div>
  );
}

const VARIANTS: Record<Exclude<HeroTopVariant, "current">, () => React.JSX.Element> = {
  a: VariantA,
  b: VariantB,
  c: VariantC,
  d: VariantD,
  e: VariantE,
  f: VariantF,
  g: VariantG,
  h: VariantH,
};

/** The three that expect the tagline in the header bar instead of the hero. */
export const HEADER_TAGLINE_VARIANTS: HeroTopVariant[] = ["f", "g", "h"];

export function HeroTop({ variant }: { variant: Exclude<HeroTopVariant, "current"> }) {
  const Block = VARIANTS[variant];
  return (
    <div className="hidden desk:block">
      <Block />
    </div>
  );
}
