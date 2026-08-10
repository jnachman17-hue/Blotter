/**
 * Section 2: the scale of a recruiting cycle, and its consequence.
 *
 * Authority: `02-SECTION-2-SCALE-AND-CONSEQUENCE.md`, as amended by Jon on
 * August 5, 2026. Every visible string is exact copy from section 5 except
 * where an override is recorded, and the section order from section 4 is
 * unchanged: eyebrow, headline, four figures, qualification, time proof,
 * supporting argument, consequence visual with two external annotations. No
 * CTA, per section 5 and the section 18 acceptance criteria.
 *
 * Jon's overrides, all recorded in `04-decision-log.md` with reasoning:
 *   - the closing paragraph is cut, and the section ends on the email
 *   - the supporting paragraph loses its first sentence
 *   - the figures run descending by volume
 *   - the consequence visual is an inbox row, not the full Gmail message view
 *   - chart furniture is permitted in the scale block
 *
 * Section 12 still governs what may not appear here: no second spreadsheet, no
 * maintained-zone yellow, no cue-to-row connectors, no ownership underlines.
 * The page gradient reaches Section 2 in its cooler, deeper band, which is why
 * this section carries `field-deep`.
 */

import { Fit } from "@/components/layout/fit";
import { PageBox, PAGE_BOX_W } from "@/components/layout/page-box";
import { EYEBROW, ScaleTrajectory } from "@/components/section-2/scale-trajectory";
import { GmailInboxStrip } from "@/components/section-2/gmail-inbox-strip";

/**
 * The consequence visual and its two annotations, sections 10 and 11.
 *
 * The annotations stay outside the Gmail surface, cover nothing, and carry a
 * short leader tick rather than an arrow, because section 11 forbids arrows
 * that would imply Blotter is already acting. They frame the strip
 * diagonally, which ties each line to it without adding height.
 */
function ConsequenceVisual() {
  return (
    <div className="mt-14">
      <p className="mb-3 flex items-center gap-3 text-[14px] font-medium text-navy-900">
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-navy-400" />
        One thread buried in 628 emails
      </p>

      {/*
        The strip is a Gmail surface built at page-box width. `Fit` scales it
        into whatever width it is given, which on desktop is 1124px and so
        leaves the ratified composition untouched.

        `02-SECTION-2` §15 permits proportional scaling, a controlled crop, or a
        separately composed translation on smaller screens, and none of them is
        chosen yet — this is the placeholder that stops the section pushing the
        page sideways in the meantime.
      */}
      <Fit width={PAGE_BOX_W}>
        <GmailInboxStrip width={PAGE_BOX_W} />
      </Fit>

      {/*
        The annotation is bounded by the page box rather than pinned to it, so
        it wraps on a phone instead of holding 1124px open. It stays outside
        the email asset and covers nothing, per §15.
      */}
      <p
        className="mt-3 flex items-center justify-end gap-3 text-[14px] font-medium text-navy-900"
        style={{ maxWidth: PAGE_BOX_W }}
      >
        A stale tracker does not direct you back before the deadline passes
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-navy-400" />
      </p>
    </div>
  );
}

export function ScaleAndConsequence() {
  return (
    <section className="field-deep pt-24 pb-28">
      <PageBox>
        <p className="flex items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase">
          <span
            aria-hidden="true"
            className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
          />
          {EYEBROW}
        </p>

        <div className="mt-6">
          <ScaleTrajectory />
        </div>

        {/*
          The closing paragraph is cut. Ratified by Jon August 5, 2026: it
          restated the supporting paragraph almost exactly, ending "begin
          falling through the cracks" ninety words after that one ended "begin
          slipping through the cracks". The section now ends on the email,
          which is a stronger exit into Section 3. This overrides the section 5
          and section 18 requirement for exact closing copy.
        */}
        <ConsequenceVisual />
      </PageBox>
    </section>
  );
}
