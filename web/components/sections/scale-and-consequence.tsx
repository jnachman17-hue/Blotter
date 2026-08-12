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

import { SectionNumber } from "@/components/layout/section-number";
import { PageBox } from "@/components/layout/page-box";
import { EYEBROW, ScaleTrajectory } from "@/components/section-2/scale-trajectory";

export function ScaleAndConsequence() {
  return (
    <section className="field-deep pt-14 pb-16 desk:pt-24 desk:pb-28">
      <PageBox>
        <SectionNumber n={1} />
        <p className="section-eyebrow flex items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase">
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
          THE CONSEQUENCE VISUAL IS CUT, August 11, 2026.

          It was a Gmail row reading `RE: First Round Interview Invitation ·
          Deadline Passed`, under the annotation *"A stale tracker does not
          direct you back before the deadline passes."*

          **Jon cut it, and the reason is a claim rather than taste.** That
          sentence only lands if Blotter's tracker *would* direct you back
          before a deadline. It would not. The maintained columns are `Status`,
          `Next move`, `Last contact`, `Days` and `Call` — **there is no
          deadline field anywhere in the product**, and no section on this page
          demonstrates one. The visual promised a capability the page never
          shows and the spec never granted.

          That is the sharpest form of the fault `09-page-argument-rework.md`
          exists to remove: not a claim proved in the wrong place, but a picture
          making a promise the product cannot keep. It stopped being theoretical
          the same day, because the site is now indexed.

          It also discharges `06`'s open claim gate on this asset, which
          required an illustrative-scenario review "before public-release
          approval" and had gone overdue.

          **What the section loses, and why it survives it.** `09` §3 lists the
          buried email alongside the four mark blocks as proof of claim A,
          volume. The marks are the volume proof; the email was the consequence
          beat. Section 2 now ends on the supporting paragraph's own last line,
          *"Deadlines, follow-ups, and next steps begin slipping through the
          cracks"* — which states the consequence in words the product can
          support rather than depicting one it cannot.

          **A re-scoped version is available if this ever reads thin**: a thread
          that went quiet is a consequence Blotter genuinely addresses, since
          `Days` and `Last contact` are fields it maintains. That is a new
          ratified asset and it is not being invented here.

          `GmailInboxStrip`, `GmailInboxPhone` and the full `GmailMessage` are
          retained and rendered nowhere, the same way `ServiceColumns` and
          `HeroVisualModule` are.

          This overrides `02-SECTION-2` §10 and §11. The earlier override still
          stands: the closing paragraph was cut on August 5 because it restated
          the supporting paragraph almost word for word.
        */}
      </PageBox>
    </section>
  );
}
