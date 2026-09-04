/**
 * Sections 4 and 5, merged into one section with two beats.
 *
 * Authority: `05-SECTION-5-PRESERVATION.md` and
 * `04-SECTION-4-OUTSTANDING-ACTIONS.md`, as overruled in part by Jon on
 * August 5, 2026. Both spec files carry an amendment table recording this.
 *
 * Why merged. The page was carrying three separate Google Sheets windows —
 * hero, Section 4, Section 5 — and however different the arguments are, a
 * reader files three tables as one repeated idea. The two beats are literally
 * two tabs of one file, which is what the product is: `Contacts` is the sheet
 * you already built, `Blotter` is the standardised view, `Outstanding` is the
 * derived list. `Contacts` sitting untouched in the tab strip is itself the
 * preservation proof.
 *
 * Beat order is deliberate. Preservation kills the switching-cost objection
 * first, then the action view delivers the payoff and carries the CTA. Both
 * ratified headlines survive intact and in their ratified order, so the merge
 * costs no copy — only a section boundary.
 *
 * The two beats mirror each other: beat 1 sets its headline left and its copy
 * right, beat 2 reverses them, so the section does not read as one long column.
 *
 * Exact copy, not rewritten: both headlines, both supporting lines, the three
 * reassurance claims, the CTA line and the CTA label. The counts reconcile as
 * ratified, 6 + 11 + 4 = 21.
 *
 * Nothing animates. The whole section survives a screenshot.
 */

import { CtaButton } from "@/components/cta-button";
import { PageBox } from "@/components/layout/page-box";
import { SectionNumber } from "@/components/layout/section-number";
import { SectionEyebrow, TRIAL_EYEBROWS } from "@/components/layout/section-eyebrow";
import { OutstandingPhone } from "@/components/section-45/outstanding-phone";
/* `BlotterTab` and `Reassurance` left with the preservation beat on August 11,
   2026 — see `components/sections/ownership.tsx`. */
import { OutstandingTab } from "@/components/section-45/parts";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------- exact copy */

/*
  Rewritten September 3, 2026 on Jon's ruling — *"You don't actually keep your
  own sheet now."* `28-WEBSITE-AUDIT.md` §1.8 has the eleven places this claim
  appeared and why every one of them was false.

  The headline had to keep doing the same job: killing the switching-cost
  objection before the reader raises it. **The objection was never really about
  the file** — it is "I don't want to rebuild this and I don't want to learn a
  new tool", and both halves still have a true answer. One paste, and it is
  still Google Sheets.
*/
export const KEEP_H = "Paste your contacts in. Stay in Google Sheets.";
export const KEEP_SUB =
  "Blotter is a Google Sheet you make your own copy of. Paste in the people you are networking with, add any columns you want, and Blotter keeps the right-hand side current from Gmail and Calendar. It never edits anything you typed.";

const ACT_H = "Everything you still owe";
const ACT_SUB =
  "Replies you owe, follow-ups that are due, thank-yous you never sent. Rebuilt every time something changes, so you stop reconstructing it out of Gmail and memory.";

/** `04-SECTION-4` §5. The CTA enters the funnel with `cta_location = actions`. */
const CTA_LINE = "Start maximizing shareholder value.";

/* ------------------------------------------------------------------ pieces */

function Head({ h, sub, flip }: { h: string; sub: string; flip?: boolean }) {
  const title = (
    <h2
      className={cn(
        "font-display max-w-[16ch] min-w-0 flex-1 text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink",
        /* The mirroring is what stops the two beats reading as one long
           column, and a phone has no second column to mirror into. Right
           alignment on a stacked headline just reads as a mistake. */
        flip && "desk:text-right",
      )}
    >
      {h}
    </h2>
  );
  const body = (
    <p className="max-w-[52ch] min-w-0 flex-1 text-body leading-[1.62] text-ink-muted desk:pt-1">
      {sub}
    </p>
  );
  return (
    /*
      Stacked on a phone, the ratified side-by-side from `desk`.

      `desk:flex-row-reverse` rather than reordering the children, so on a
      phone both beats read headline-then-copy in DOM order. Beat 2's mirroring
      is a desktop composition device; inverting the reading order on a phone
      would put the supporting line above the headline it supports, and screen
      readers would follow it. See the note on `min-w-0` in
      `how-blotter-works.tsx`.
    */
    <div
      className={cn(
        "flex flex-col gap-4 desk:items-start desk:gap-16",
        flip ? "desk:flex-row-reverse" : "desk:flex-row",
      )}
    >
      {title}
      {body}
    </div>
  );
}

/* ----------------------------------------------------------------- section */

export function TrackerAndActions() {
  return (
    <section className="field-settle pt-14 pb-16 desk:pt-24 desk:pb-28">
      <PageBox>
        {/*
          Section 03 — the action view. No eyebrow, per `04-SECTION-4` §4.

          **This section used to carry two beats.** Preservation with the sheet
          came first, then this. Both moved out on August 11, 2026: the
          preservation beat became `components/sections/ownership.tsx`, its own
          section on both surfaces, and this is what remained.

          The reason was numbering. Cutting Section 3 from desktop left desktop
          with four numbered blocks against the phone's five, because the phone
          had already split these two beats into `02` and `03`. Desktop's `02`
          would have covered both. `08-desktop-changes-pending.md` §5 requires
          the two surfaces agree about what the sections of this page are.

          The head keeps no `flip`. Mirroring existed to distinguish two beats
          inside one section; with a numeral and a hairline between them there
          is nothing left to distinguish, and a right-aligned headline with no
          partner above it is decoration.
        */}
        <SectionNumber n={3} />
        <SectionEyebrow>{TRIAL_EYEBROWS.outstanding}</SectionEyebrow>
        <Head h={ACT_H} sub={ACT_SUB} />
        {/*
          Desktop keeps the three-column composition, which is what lets all 21
          actions land in thirteen rows. A phone has no room for three columns,
          so it takes the films' vertical list of the same data —
          `components/section-45/outstanding-phone.tsx` has the full reasoning.
        */}
        <div className="mt-10 hidden desk:block">
          <OutstandingTab />
        </div>
        <div className="mt-8 desk:hidden">
          <OutstandingPhone />
        </div>

        {/*
          The page's second primary CTA. Right-aligned on desktop to sit under
          beat 2's flipped headline rather than restarting the section's left
          axis.

          **On a phone it was floating**, which was Jon's word for it on
          August 11, 2026, and right: right-alignment is a device for a
          two-column composition, and with one column it reads as an element
          that missed its anchor. It now sits on the section's own left axis
          with a full-width button, the same treatment the closing block got
          when the footer was rebuilt, and closer to the sheet so it belongs to
          the list above it rather than trailing after it.

          **Kept rather than cut**, which Jon left open. Two reasons. It is the
          conversion moment — the button directly under the list of things you
          owe — and cutting it would mean `cta_location = "actions"` never fires
          from a phone, which silently costs the one comparative metric that
          says where mobile readers convert against where desktop readers do.
          The header CTA doubling it is the same arrangement he already accepted
          in the hero.
        */}
        <div className="mt-9 flex flex-col items-stretch gap-4 desk:mt-14 desk:items-end">
          <p className="font-display text-[1.375rem] leading-[1.35] font-semibold tracking-[-0.015em] text-navy-900">
            {CTA_LINE}
          </p>
          <CtaButton location="actions" size="large" />
        </div>
      </PageBox>
    </section>
  );
}
