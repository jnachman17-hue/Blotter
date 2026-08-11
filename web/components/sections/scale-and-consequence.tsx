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
import { SectionNumber } from "@/components/layout/section-number";
import { PageBox, PAGE_BOX_W } from "@/components/layout/page-box";
import { EYEBROW, ScaleTrajectory } from "@/components/section-2/scale-trajectory";
import {
  GmailInboxPhone,
  GmailInboxStrip,
} from "@/components/section-2/gmail-inbox-strip";

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
      {/*
        The leader tick turns ninety degrees on a phone.

        A 24px horizontal dash works on desktop because the annotation is one
        line beside a wide asset and the dash points at it. At 350px both
        annotations wrap to two lines, and a horizontal dash beside line one
        with nothing under it reads as a stray mark rather than as a leader.

        The vertical tick is the page's own idiom — the same 2px bar the eyebrow
        uses, aligned to the cap height of the first line — so it stays put
        however the text wraps and it is a mark this page already speaks.
      */}
      <p className="mb-3 flex items-start gap-3 text-[14px] font-medium text-navy-900 desk:items-center">
        <span
          aria-hidden="true"
          className="mt-[0.32em] h-[0.9em] w-[2px] shrink-0 bg-navy-400 desk:mt-0 desk:h-px desk:w-6"
        />
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
      {/* Desktop: the ratified strip, scaled into the page box. */}
      <div className="hidden desk:block">
        <Fit width={PAGE_BOX_W}>
          <GmailInboxStrip width={PAGE_BOX_W} />
        </Fit>
      </div>
      {/* Phone: the same five rows as a phone inbox. See `GmailInboxPhone`. */}
      <div className="desk:hidden">
        <GmailInboxPhone />
      </div>

      {/*
        The annotation is bounded by the page box rather than pinned to it, so
        it wraps on a phone instead of holding 1124px open. It stays outside
        the email asset and covers nothing, per §15.
      */}
      {/*
        The same tick, and on a phone it moves to the front so both annotations
        read from the same edge. Right-aligning this one is what made the pair
        frame the asset diagonally on desktop; at 350px there is no diagonal to
        make, and a right-aligned wrapped paragraph in a left-aligned section
        just looks like a mistake. `order-first` handles it without duplicating
        the copy.
      */}
      <p
        className="mt-3 flex items-start gap-3 text-[14px] font-medium text-navy-900 desk:items-center desk:justify-end"
        style={{ maxWidth: PAGE_BOX_W }}
      >
        A stale tracker does not direct you back before the deadline passes
        <span
          aria-hidden="true"
          className="order-first mt-[0.32em] h-[0.9em] w-[2px] shrink-0 bg-navy-400 desk:order-last desk:mt-0 desk:h-px desk:w-6"
        />
      </p>
    </div>
  );
}

export function ScaleAndConsequence() {
  return (
    <section className="field-deep pt-14 pb-16 desk:pt-24 desk:pb-28">
      <PageBox>
        <SectionNumber n={1} />
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
