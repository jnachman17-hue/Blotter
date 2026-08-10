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
import { HeroVisualModule, TOTAL_W } from "@/components/hero/hero-visual";
import { Fit } from "@/components/layout/fit";
import { PageBox } from "@/components/layout/page-box";

/**
 * Right-hand copy column. 490px sets the subhead in three lines and leaves the
 * headline column wide enough to break at the sentence rather than mid-clause.
 * Its right edge lands on the cue column's right edge, since both are bounded
 * by the shared page box.
 */
const RIGHT_COL_W = 490;

export function Hero() {
  return (
    <section className="pb-14">
      <PageBox>
          {/* Eyebrow, on the shared left edge. */}
          <p className="flex items-start gap-3 pt-6 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase">
            <span
              aria-hidden="true"
              className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
            />
            The smart recruiting tracker for investment banking and high-finance
            networking
          </p>

          {/*
            One column on a phone, the ratified two-column split from the
            desktop breakpoint. The grid template is desktop-only because
            `${RIGHT_COL_W}px` is a fixed track and a fixed track cannot
            narrow: at 375px it forced the row to 490px and pushed the page
            sideways on its own, independently of the visual below.
          */}
          <div
            className="mt-5 grid items-start gap-x-10 gap-y-6 desk:[grid-template-columns:minmax(0,1fr)_var(--hero-right-col)]"
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

            <div>
              <p className="text-lede leading-[1.6] text-ink-muted">
                Blotter updates the Google Sheet you already use by reading
                relevant recruiting activity from Gmail and Calendar, so you do
                not miss follow-ups, coffee chats, or next steps.
              </p>

              <div className="mt-7">
                <CtaButton location="hero" size="large" />
              </div>

              {/*
                Neutral rule, not the Blotter yellow. Yellow on this page means
                "Blotter maintains this" and appears only where the ratified
                assets use it; borrowing it as decoration would dilute that.
              */}
              <p className="mt-6 flex items-center gap-3 text-small text-ink-muted">
                <span
                  aria-hidden="true"
                  className="h-px w-8 shrink-0 bg-ink-faint"
                />
                Built by a former Goldman Sachs banker for recruitment.
              </p>
            </div>
          </div>

          {/*
            `Fit` rather than `HeroVisual`, so the module is scaled to the
            width it is actually given. On desktop that is the 1124px page box
            and the scale resolves to the ratified 0.85 exactly. The fitting
            lives here rather than inside `hero-visual.tsx` because that file
            defines the constants `PAGE_BOX_W` is derived from and must not
            import back from `components/layout/`.

            Below the breakpoint this shrinks, which is scaffolding: the
            mobile hero is a separate composition built around the looping
            film and it replaces this block rather than resizing it.
          */}
          <div className="mt-8">
            <Fit width={TOTAL_W}>
              <HeroVisualModule />
            </Fit>
          </div>
      </PageBox>
    </section>
  );
}
