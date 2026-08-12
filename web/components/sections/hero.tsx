/**
 * Section 1: hero.
 *
 * Copy authority: WS4-SPEC.md "Confirmed hero". WS5 supersedes that section's
 * *visual* only (the stale rear sheet and all-caps zone labels); its eyebrow,
 * headline, subhead, CTA label and authority line stand unchanged.
 *
 * Visual authority: 01-HERO.md, implemented in `HeroVisual`.
 *
 * Composition. The visual is inherently asymmetric: the sheet sits left and
 * the cues hang right, so its optical centre is not its geometric centre.
 * Centring the copy on the page therefore produced two competing axes and the
 * sheet read as misaligned. The fix is to centre nothing. Copy and visual
 * share one bounding box the exact width of the scaled module, the headline
 * starts on the sheet's left edge, and the right-hand copy column ends on the
 * cue column's right edge. The asymmetry then reads as structure.
 *
 * The CTA is the shared canonical entry point with `cta_location = hero`. The
 * funnel screens behind it are session 5 work; the button records the origin
 * and fires `funnel_started` today.
 */

import { CtaButton } from "@/components/cta-button";
import { HeroFilm, HeroFilmDesk } from "@/components/hero/hero-film";
import { AuthorityLine, HeroTop, type HeroTopVariant } from "@/components/hero/hero-top";
import { PageBox } from "@/components/layout/page-box";
import { cn } from "@/lib/cn";

/**
 * Right-hand copy column. 490px sets the subhead in three lines and leaves the
 * headline column wide enough to break at the sentence rather than mid-clause.
 * Its right edge lands on the cue column's right edge, since both are bounded
 * by the shared page box.
 */
const RIGHT_COL_W = 490;

/**
 * How much of the ratified supporting paragraph the phone shows.
 *
 * `full`  the ratified sentence, as a caption under the film
 * `short` one condensed line — UNRATIFIED, see below
 * `none`  nothing; the film carries it alone
 *
 * Desktop is unaffected by all three and always renders the ratified paragraph
 * in its ratified position.
 */
export type HeroSupporting = "full" | "short" | "none";

/**
 * The eyebrow stays above the headline, in its ratified position, on every
 * screen. Ruled by Jon on August 10, 2026 after looking at the alternatives.
 *
 * Three were built and withdrawn: under the film, dropped on a phone, and moved
 * into the sticky header. The header one was never viable — 79 characters of
 * uppercase at 12.5px with 0.1em tracking needs about 630px and a 390px bar has
 * roughly 265px once the lockup and padding are out, so it would take the bar
 * to two lines a reader then scrolls past 7,600px of page with.
 *
 * The cost is real and recorded: eyebrow, headline, byline, film and CTA do not
 * all fit above the fold on a 390x844 phone, so the hero CTA lands just under
 * it. That is what the CTA-arrangement picker settles.
 */

/**
 * UNRATIFIED COPY. Written for the stage-10 comparison on August 10, 2026 and
 * shown only below the desktop breakpoint.
 *
 * It is a condensation of the ratified sentence, not a new claim: same three
 * facts — the sheet is yours already, the sources are Gmail and Calendar, the
 * tracker stays current — with the consequence clause dropped because the film
 * directly above has just shown it happening three times. Written to the page's
 * standing rules: no dash, no availability signal, nothing the product cannot
 * support.
 *
 * Bring it to Jon before public traffic if a variant using it is chosen.
 */
const SUPPORTING_SHORT =
  "Blotter keeps the Google Sheet you already use current, from Gmail and Calendar.";

export function Hero({
  supporting = "short",
  heroCta = true,
  top = "current",
}: {
  supporting?: HeroSupporting;
  /**
   * Which desktop top-block composition to render above the film.
   *
   * `current` is what is live. The lettered variants are the August 11, 2026
   * redesign review and are **desktop only** — below the breakpoint every one
   * of them renders the ratified phone hero untouched, because the phone's
   * fold was solved separately in stage 10 and is not in question.
   * `/review/hero` compares them.
   */
  top?: HeroTopVariant;
  /**
   * Whether the in-flow hero button renders on a phone. Desktop always has it.
   *
   * It exists to test the arrangement Jon described: if the header keeps its
   * button and it is blurred-sticky the whole way down, the hero's own button
   * may be redundant rather than necessary. My first answer — that it cannot
   * leave because it is the button that follows the film — was too strong. The
   * honest position is that it is a trade between salience and cleanliness, and
   * the only evidence either way is that the single real lead this page has
   * produced clicked `cta_location = hero`.
   */
  heroCta?: boolean;
}) {
  const eyebrowLine = (
    <>
      <span
        aria-hidden="true"
        className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
      />
      The smart recruiting tracker for investment banking and high-finance
      networking
    </>
  );

/*
  DESKTOP VERTICAL TRIM, August 11, 2026, and it is a stopgap.

  Jon, on a MacBook: *"the bottom of the visual film is just barely cut off, and
  I don't want it to be cut off at all… we need to remove a little bit of room
  from the top part of the web version."*

  Measured at 1512 x 862 before the trim: the film's foot sat at 725.8px, which
  clears that viewport and does not clear a 13-inch one. The height is set by
  the **right column**, not the headline — paragraph, CTA and authority line
  come to 197.8px against the headline's 84.8 — so the gaps inside that column
  are where the space is.

  Four `desk:` gaps come down by 4 to 8px each and the film's own top margin
  comes down with them, for about 36px. Every mobile value is untouched: each
  change is `desk:`-scoped, and the phone's fold was solved separately in stage
  10.

  **This buys the fold and nothing else.** Jon has already said the whole block
  above the film wants redesigning — *"we're gonna actually need to research
  sites that we like, lean on skills, and try and redesign this top part quite a
  bit better"* — and asked for that to be its own piece of work. Trimming
  gaps is not that. When the redesign happens these values are the first thing
  it should throw away.
*/
  return (
    <section className="pb-14">
      <PageBox>
        {/*
          A variant replaces the ratified block **above the breakpoint only**.
          The phone keeps the composition ratified in stage 10 in every case,
          so nothing below `desk` is under review here.
        */}
        {top !== "current" && <HeroTop variant={top} />}
        <div className={top === "current" ? undefined : "desk:hidden"}>
          {/* Eyebrow, on the shared left edge. Desktop always renders it here;
              on a phone `eyebrow` may move it below the film or drop it. */}
          <p
            className="flex items-start gap-3 pt-6 desk:pt-4 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase"
          >
            {eyebrowLine}
          </p>

          {/*
            One column on a phone, the ratified two-column split from the
            desktop breakpoint. The grid template is desktop-only because
            `${RIGHT_COL_W}px` is a fixed track and a fixed track cannot
            narrow: at 375px it forced the row to 490px and pushed the page
            sideways on its own, independently of the visual below.
          */}
          <div
            className="mt-5 desk:mt-4 grid items-start gap-x-10 gap-y-4 desk:gap-y-6 desk:[grid-template-columns:minmax(0,1fr)_var(--hero-right-col)]"
            style={{ "--hero-right-col": `${RIGHT_COL_W}px` } as React.CSSProperties}
          >
            {/*
              Two-tone headline. The sentences are a contrast, not a list:
              what moves, then what does not. Weight and tint carry that,
              which is cheaper than any decoration.
            */}
            <h1 className="font-display text-display leading-[1.06] font-semibold tracking-[-0.028em] text-ink">
              Your networking keeps moving.{" "}
              <span className="text-navy-400">Your tracker does not.</span>
            </h1>

            <div className="contents desk:block">
              {/*
                THE MOBILE FOLD, and the ordering is deliberate.

                A phone gives about 700 usable pixels. Headline, film and CTA
                come to roughly 650 of them; adding the supporting paragraph
                above the film pushes the film's own foot past the fold, and the
                film is the thing that explains the product.

                So on a phone the order is headline, film, CTA, then the
                supporting line — because the film *is* that sentence, moving.
                A reader who wants it in words still gets it, one scroll down,
                unchanged and in full. Above `desk` the wrapper is a normal
                block again and the ratified desktop order is untouched:
                supporting copy, CTA, authority line, in the right-hand column.

                `contents` on the phone dissolves this wrapper so its children
                become direct grid items and can be ordered independently; at
                `desk` it becomes a block and the column reassembles.
              */}
              {/*
                Desktop always gets the ratified paragraph, in its ratified
                place. On a phone it moves to a caption *under* the film and
                above the CTA — hook, demonstration, explanation, action — and
                `supporting` chooses how much of it survives there.
              */}
              <p
                className={cn(
                  /*
                    Phone: reading size in the darker reading grey.

                    Jon, August 10, 2026: this line and the authority line below
                    the CTA were the same size, weight and colour, and they do
                    completely different jobs. This one is the sentence that
                    says what the product does — the only prose above the fold —
                    so it takes definition. The authority line is a footnote and
                    is set down accordingly. Desktop keeps both exactly as
                    ratified.
                  */
                  "order-2 text-body leading-[1.55] text-ink-read",
                  "desk:order-none desk:text-lede desk:leading-[1.6] desk:text-ink-muted",
                  supporting === "none" && "hidden desk:block",
                )}
              >
                <span className={supporting === "short" ? "hidden desk:inline" : undefined}>
                  Blotter updates the Google Sheet you already use by reading
                  relevant recruiting activity from Gmail and Calendar, so you do
                  not miss follow-ups, coffee chats, or next steps.
                </span>
                {supporting === "short" && (
                  <span className="desk:hidden">{SUPPORTING_SHORT}</span>
                )}
              </p>

              {/* Mobile only; the desktop hero keeps its ratified composition. */}
              <div className="order-1 desk:hidden">
                <HeroFilm />
              </div>


              {/*
                Full width on a phone — a 44px pill floating in a 350px column
                reads as an afterthought, and the CTA is the point of the
                screen.

                `id` rather than a shared constant: this file is a server
                component, and importing a value from a `"use client"` module
                into one yields a client reference rather than the string, so a
                computed `{...{[SENTINEL]: ""}}` spread silently rendered
                nothing. `StickyCta` watches `#hero-cta` to know when this
                button has left the viewport and the bar should take over.
              */}
              <div
                id="hero-cta"
                className={cn(
                  "order-3 mt-5 desk:order-none desk:mt-5 desk:block",
                  !heroCta && "hidden",
                )}
              >
                <CtaButton
                  location="hero"
                  size="large"
                  full
                  className="desk:w-auto"
                />
              </div>

              {/*
                Neutral rule, not the Blotter yellow. Yellow on this page means
                "Blotter maintains this" and appears only where the ratified
                assets use it; borrowing it as decoration would dilute that.
              */}
              {/*
                Below the CTA, where it is ratified and where Jon put it back on
                August 10, 2026.

                It briefly moved above the film as a byline, to stop it dangling
                in the top-only arrangement. His correction: it only dangles
                *because* that arrangement removes the button, and the fix for
                that is the arrangement, not the line. It is proof for the CTA
                and it belongs under the CTA.
              */}
              {/*
                Third pass, and the diagnosis changed. Jon's first note was that
                it looked identical to the supporting line; dropping it to 12px
                grey fixed that and made it an orphan instead — a lone quiet
                sentence 36px under the button with 56px of section padding
                after it, belonging to nothing on either side.

                So: attached rather than shrunk. It sits 12px under the CTA,
                close enough to read as a caption on the button, and the
                credential inside it takes ink weight so the line has a focal
                point instead of being uniform grey. `text-small` rather than
                `text-micro` — 12px is the size this page uses for methodology
                notes, and this is its only piece of social proof.

                It is still clearly subordinate to the supporting line above the
                CTA, which is 16px in the darker reading grey. The rule stays
                desktop-only: Jon called it "the big dash", and on desktop it
                starts a line inside a 490px column where it has an origin,
                while stacked full width it has nothing to lead into.
              */}
              <p className="order-6 -mt-1 text-center text-small leading-[1.5] text-ink-muted desk:order-none desk:mt-4 desk:text-left">
                {/*
                  Centred under the full-width button, with a 12px rule rather
                  than the desktop 32px. Jon's call, August 10, 2026, and it is
                  the arrangement that finally stops this line reading as an
                  orphan: a caption centred beneath a full-width control belongs
                  to that control, which is the one thing no amount of resizing
                  achieved. The short rule is a lead-in at that scale rather
                  than the "big dash" he rejected.

                  The rule is *inline* rather than a flex sibling, and that is
                  the detail that matters. At 390 this line wraps to two, and a
                  flex row put the rule beside line one with nothing under it —
                  the same stray-mark problem the Section 2 annotations had.
                  Inline, it is simply the first thing on the first line, and a
                  wrapped second line centres underneath as ordinary centred
                  text.

                  The page theme's "centre nothing" rule is about the hero's two
                  competing axes — copy against an asymmetric visual — and does
                  not reach a caption on a button that is itself full width.

                  **Desktop's rule came down to 12px on August 11, 2026**, wave
                  1. `08-desktop-changes-pending.md` §6 left this open, on the
                  argument that desktop's 490px column gives a longer rule an
                  origin to start from that a stacked phone layout does not.
                  Jon ruled against it: *"Keep it as is on mobile, for web make
                  the dash before it shorter. Simply like a normal - kinda
                  similar to how it is on mobile."*

                  So the two surfaces now share one 12px rule and differ only in
                  alignment — centred under the full-width phone CTA, left
                  aligned in the desktop column. The "big dash" he objected to
                  is gone from both. Having an origin to start from was a reason
                  a longer rule *could* work, not a reason it should.
                */}
                <span
                  aria-hidden="true"
                  className="mr-2.5 inline-block h-px w-3 align-middle bg-ink-faint desk:mr-3"
                />
                Built by a{" "}
                <span className="font-medium text-ink">
                  former Goldman Sachs banker
                </span>{" "}
                for recruitment.
              </p>
            </div>
          </div>

          {/*
            **The desktop hero is a film from August 11, 2026.**

            It was `Fit` wrapping `HeroVisualModule` — the ratified sheet, three
            activity cues and their connectors, scaled to the 1124px page box at
            0.8502. Jon: *"Yes. I do wanna do a video asset for the hero on
            web."* The film's held final frame is that composition's successor,
            and it is what reduced motion, a failed load and a screenshot all
            get, so nothing is lost by a reader who never sees it move.

            `hero-visual.tsx` stays in the tree even though nothing renders it:
            `PAGE_BOX_W` is derived from its `TOTAL_W` and `VISUAL_SCALE`, so it
            still defines the width of every section on this page.

            The hero's two ownership labels went with it, which is how Jon ruled
            it — the film never touches the left three columns for eleven
            seconds, which proves the same split without captioning it.
          */}
        </div>
          <HeroFilmDesk />
          {/*
            The credibility line, below the film on every variant.

            It has been called an orphan in three reviews and re-sited twice
            inside the hero. The reason it kept failing is that it was in the
            hero at all: the Evil Martians study of 100 devtool pages puts
            social proof after the hero, and `design-taste-frontend` caps the
            hero at four text elements and bans a tagline under the CTAs. This
            was the fifth element. `components/hero/hero-top.tsx` has the note.
          */}
          {top !== "current" && (
            <div className="mt-5 hidden desk:block">
              <AuthorityLine />
            </div>
          )}
      </PageBox>
    </section>
  );
}
