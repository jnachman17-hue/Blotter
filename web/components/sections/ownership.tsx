/**
 * Section 02 — the merged ownership-and-preservation section, both surfaces.
 *
 * Authority: `09-page-argument-rework.md` §4 and §8 rows 1, 2, 3 and 5.
 *
 * ## What changed on August 11, 2026, and why this file exists
 *
 * This was `components/section-45/mobile-02.tsx`, a phone-only section that
 * replaced Section 3 below the breakpoint while desktop kept both Section 3 and
 * a two-beat Section 4+5. **Jon cut Section 3 from desktop**, on the grounds
 * that the new hero film demonstrates the mechanism there exactly as Film C
 * does on the phone.
 *
 * That closes `09` §8 row 1, which had read *"The fault, yes. The deletion,
 * no"* — on the reasoning that *"desktop has room and no hero film, so the
 * mechanism may still need its own section there."* The film removes the second
 * clause, and having room was never a reason to state a claim twice.
 *
 * **Cutting Section 3 alone would not have aligned the two surfaces.** Desktop's
 * `field-settle` carried two beats in one section — preservation with the
 * sheet, then the Outstanding view — where the phone has two separate sections.
 * Stopping at the cut would have given desktop four numbered blocks against the
 * phone's five, with desktop's `02` covering what the phone calls `02` and
 * `03`. So Section 4+5 split, and this file is the half that came out.
 *
 * Splitting reverses Jon's own merge of August 5, 2026. The merge predates the
 * argument rework, and the phone had already un-merged them — this component's
 * ancestor *was* the phone's separate section. The two surfaces already
 * disagreed; the numerals would only have made it visible.
 *
 * ## The band, and why nothing had to be invented
 *
 * `field-rise` — the band Section 3 used to occupy. The page background is a
 * handoff chain in which each band opens on the colour the band above closed
 * on, so removing a section normally breaks the chain two sections later. It
 * does not here: the phone's version of this section already took `field-rise`
 * for exactly that reason in stage 10, so the desktop cut drops into a slot the
 * phone build had already cut for it. The chain reads b → d → e → f, unbroken,
 * on both surfaces.
 *
 * ## What the section claims, once each
 *
 * | | Claim | What proves it |
 * |---|---|---|
 * | Preservation | the headline | the `Contacts` tab sitting untouched beside `Blotter` |
 * | Ownership | the deck | the zone divider |
 * | What Blotter does | the supporting paragraph | the maintained columns |
 *
 * The point of the rework is that no two of those rows say the same thing.
 *
 * **The three refusals left this section on August 11, 2026.** They arrived
 * here from Section 3 earlier the same day, on `09` §8 row 3's reasoning that
 * they are the ownership claim stated negatively. Jon moved them out on sight:
 * *"this is kind of like a platform whole thing of what we don't [do]. So it
 * doesn't necessarily need to be in this section."* They are now a page-level
 * statement before the closing CTA — `sections/faq-and-close.tsx`.
 * **This is also why the sheet's zone labels default to `none`** — after the
 * deck lands, `You add these` and `Blotter keeps these current` are that deck
 * restated forty pixels lower. `section-45/parts.tsx` carries the full note.
 *
 * ## The copy, and the one deletion
 *
 * Every string is ratified and verbatim. The single edit is a deletion: the
 * supporting paragraph loses its first sentence, *"Keep the Google Sheet and
 * contacts you already built."*, because it is the headline said again two
 * lines later. That sentence is row 4 of `09` §1's table of the same claim
 * stated four times.
 *
 * Ratified by Jon as `09` §4's option C on August 11, 2026 for the phone, and
 * extended to desktop the same day. It overrides `03-SECTION-3` §5 and
 * `05-SECTION-5` §4's exact-copy clauses; both amendment tables carry it.
 *
 * ## Order, and the one risk in it
 *
 * Number, headline, deck, paragraph, reassurance, visual — the same
 * order on both surfaces, because `09` §6 holds that layout may diverge between
 * devices and the argument may not.
 *
 * The risk, logged in `06-assumptions-and-open-questions.md`: the reassurance
 * claims and the refusals are both three-item lists with a mark each. On
 * desktop they are a horizontal strip and a warm panel and read as different
 * objects. Stacked on a phone they may converge.
 */

import { SectionNumber } from "@/components/layout/section-number";
import { SectionEyebrow, TRIAL_EYEBROWS } from "@/components/layout/section-eyebrow";
import { PageBox } from "@/components/layout/page-box";
import { BlotterTab, Reassurance, ReassuranceStack } from "@/components/section-45/parts";
import type { ZoneTreatment } from "@/components/section-45/parts";
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
export const KEEP_SUB_TRIMMED =
  "Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.";

/**
 * The desktop head: headline and deck left, supporting paragraph right.
 *
 * `09` §4 ratified the deck as sitting **beneath the headline**, so it stays in
 * the left column rather than leading the right one. That keeps the ratified
 * vertical relationship — claim, then the claim the picture actually proves —
 * while still using the two-column head this section has always had.
 *
 * No `flip`. Beat 2's mirrored head belongs to the Outstanding section now, and
 * mirroring exists to distinguish two beats inside one section. With the two
 * beats in separate sections carrying separate numerals and a hairline between
 * them, there is nothing left to distinguish and a right-aligned headline would
 * be decoration.
 */
function DesktopHead() {
  return (
    <div className="flex flex-col gap-4 desk:flex-row desk:items-start desk:gap-16">
      <div className="min-w-0 flex-1">
        <h2 className="font-display max-w-[16ch] text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
          {KEEP_H}
        </h2>
        <p className="font-display mt-3 max-w-[30ch] text-[1.125rem] leading-[1.35] font-semibold tracking-[-0.015em] text-navy-900">
          {SECTION_3_HEADLINE}
        </p>
      </div>
      <p className="max-w-[52ch] min-w-0 flex-1 text-body leading-[1.62] text-ink-muted desk:pt-1">
        {KEEP_SUB_TRIMMED}
      </p>
    </div>
  );
}

export function Ownership({
  variant = "swipe",
  zones = "banner-sub",
}: {
  /** Phone sheet treatment. `swipe` is ratified; the crop survives behind
      `/review/sheet-mobile`, which is why the prop stays. */
  variant?: PhoneSheetVariant;
  /** Desktop zone-label treatment. `/review/ownership` compares all four. */
  zones?: ZoneTreatment;
}) {
  return (
    <section className="field-rise pt-14 pb-16 desk:pt-24 desk:pb-28">
      <PageBox>
        <SectionNumber n={2} />
        <SectionEyebrow>{TRIAL_EYEBROWS.ownership}</SectionEyebrow>

        {/* ------------------------------------------------------ desktop */}
        <div className="hidden desk:block">
          <DesktopHead />
          <div className="mt-7">
            <Reassurance />
          </div>
          <div className="mt-10">
            <BlotterTab zones={zones} />
          </div>
        </div>

        {/* -------------------------------------------------------- phone */}
        <div className="desk:hidden">
          <h2 className="font-display mt-1 max-w-[16ch] text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
            {KEEP_H}
          </h2>

          {/*
            The deck. Section 3's ratified headline, demoted from headline
            weight so the two read as claim and claim rather than as two
            headlines fighting. It carries the ownership half, which is the half
            the visual below actually proves.
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
        </div>
      </PageBox>
    </section>
  );
}
