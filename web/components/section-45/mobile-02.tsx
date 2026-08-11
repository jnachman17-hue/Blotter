/**
 * Mobile section 02 — the merged ownership-and-preservation section.
 *
 * Authority: `09-page-argument-rework.md` §4. This is what is left after
 * Section 3 stops existing on the phone: its refusals fold in here, its
 * headline becomes this section's deck, and its boundary line, closing line and
 * stage labels are cut.
 *
 * ## What the section claims, once each
 *
 * | | Claim | What proves it |
 * |---|---|---|
 * | Preservation | the headline | the `Contacts` tab sitting untouched beside `Blotter` |
 * | Ownership | the deck | the zone divider and the two zone labels |
 * | What Blotter does | the supporting paragraph | the maintained columns |
 * | What Blotter refuses | the three refusals | — |
 *
 * The point of the rework is that no two of those rows say the same thing.
 *
 * ## The copy, and the one deletion
 *
 * Every string is ratified and verbatim. The single edit is a deletion: the
 * supporting paragraph loses its first sentence, *"Keep the Google Sheet and
 * contacts you already built."*, because it is the headline said again two
 * lines later. That sentence is row 4 of `09` §1's table of the same claim
 * stated four times, so cutting it here is the rework doing its job rather than
 * an incidental trim.
 *
 * **Ratified by Jon, August 11, 2026**, as `09` §4's option C, after seeing the
 * whole section at device width. That makes it an override of `03-SECTION-3` §5
 * and `05-SECTION-5` §4's exact-copy clauses; both amendment tables carry it.
 *
 * ## Order, and the one risk in it
 *
 * Number, headline, deck, paragraph, reassurance, visual, refusals. Reassurance
 * sits before the visual because that is where desktop has it, and preserving
 * the argument's order across surfaces is the principle `09` §6 holds.
 *
 * The risk, logged in `06-assumptions-and-open-questions.md`: the reassurance
 * claims and the refusals are both three-item stacked lists with a mark each,
 * about 200px apart. On desktop they are a horizontal strip and a warm panel
 * and read as different objects. Stacked, they may converge — which would be
 * the fault `09` exists to remove, reappearing in a new place.
 */

import { SectionNumber } from "@/components/layout/section-number";
import { PageBox } from "@/components/layout/page-box";
import { RefusalPanel } from "@/components/section-3/boundary-block";
import { ReassuranceStack } from "@/components/section-45/parts";
import {
  SheetPhone,
  type PhoneSheetVariant,
} from "@/components/section-45/sheet-phone";
import { SECTION_3_HEADLINE } from "@/components/sections/how-blotter-works";
import { KEEP_H } from "@/components/sections/tracker-and-actions";

/**
 * `KEEP_SUB` with its first sentence removed. Written out rather than sliced so
 * the string on the page is greppable and a spec diff can find it.
 *
 * Ratified original: *"Keep the Google Sheet and contacts you already built.
 * Blotter creates a standardized recruiting view in a new tab and keeps the
 * changing activity current from Gmail and Calendar."*
 */
const KEEP_SUB_TRIMMED =
  "Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.";

/**
 * `swipe` is ratified. Jon approved it on August 11, 2026 after comparing it
 * against the crop at device width. The crop survives only behind
 * `/review/sheet-mobile`, which is why the prop stays.
 */
export function Mobile02({
  variant = "swipe",
}: {
  variant?: PhoneSheetVariant;
}) {
  return (
    /*
      `field-rise`, not `field-settle`, and it is a bug fix.

      The page's background is a **handoff chain**: each band starts on the exact
      colour the band above it ended on, which is what makes the seams
      invisible. On a phone Section 3 is hidden, and Section 3 was the band that
      bridged `--field-b` to `--field-d`. Without it the chain broke twice —
      Section 2 ended on `b` while this section started on `d`, and this section
      ended on `e` while the next one started on `d` again, which steps the
      colour back *up*. Jon saw the second one as "a blue square that cuts off,
      and then it goes to lighter blue", and it only became obvious once the
      spacing pass shortened the sections and compressed the same mismatch into
      a shorter run.

      This section replaces Section 3 on the phone, so it takes Section 3's
      band: `b` to light to `d`. The chain reads b → d → e → f again, unbroken.
    */
    <section className="field-rise pt-14 pb-16 desk:hidden">
      <PageBox>
        <SectionNumber n={2} />

        <h2 className="font-display mt-1 max-w-[16ch] text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
          {KEEP_H}
        </h2>

        {/*
          The deck. Section 3's ratified headline, demoted from headline weight
          so the two read as claim and claim rather than as two headlines
          fighting. It carries the ownership half, which is the half the visual
          below actually proves.
        */}
        <p className="font-display mt-3 max-w-[28ch] text-[1.0625rem] leading-[1.35] font-semibold tracking-[-0.015em] text-navy-900">
          {SECTION_3_HEADLINE}
        </p>

        <p className="mt-4 text-body leading-[1.62] text-ink-muted">
          {KEEP_SUB_TRIMMED}
        </p>

        <div className="mt-7">
          <ReassuranceStack />
        </div>

        <div className="mt-9">
          <SheetPhone variant={variant} />
        </div>

        {/*
          The refusals, without Section 3's boundary and closing lines. They are
          the ownership claim stated negatively — "you write the messages" and
          "no generic mass AI outreach" are one sentence facing two directions —
          so they resolve this section after the picture has made the positive
          case. `09` §4.
        */}
        <div className="mt-10">
          <RefusalPanel />
        </div>
      </PageBox>
    </section>
  );
}
