import { Suspense } from "react";

import { SiteHeader, SiteHeaderBar } from "@/components/site-header";
import { PageView } from "@/components/page-view";
import { Hero } from "@/components/sections/hero";
import { Ownership } from "@/components/sections/ownership";
import { DataAndPrivacy } from "@/components/sections/data-and-privacy";
import { FaqAndClose } from "@/components/sections/faq-and-close";
import { Funnel } from "@/components/funnel/funnel";

/**
 * Spreadsheet landing page.
 *
 * Section order, from September 3, 2026:
 *   1 Hero
 *   2 Keep the tracker you built     renders as `01`
 *   3 How Blotter uses your data     renders as `02`
 *   4 FAQ and final CTA              renders as `03`; CTA, cta_location = final
 *
 * Jon cut two sections that day. "Scale and consequence" (the 628 emails) went
 * because the page no longer pitches: *"we have a real product, and we just
 * want you to sign up."* "Everything you owe" went because the product does
 * not make that view; the answer is `Blotter → Sort contacts`, in the sheet.
 * Both component files are kept for now because `/review/*` still imports
 * them; pruning is logged in `32-JON-NOTES-3-SEP.md`.
 *
 * The earlier order, for the record:
 *   2 Scale and consequence          rendered as `01`
 *   4 Outstanding actions            rendered as `03`; cta_location = actions
 *
 * **Section 3, "How Blotter works", was cut on August 11, 2026** and Section
 * 4+5's two beats became two sections. Both surfaces now render the same five
 * numbered blocks in the same order. `09-page-argument-rework.md` §8 has why.
 *
 * Sections land here one checkpoint at a time.
 *
 * ## Two stage-10 decisions live on this file
 *
 * **No sticky bottom CTA bar.** Jon approved one on August 10, 2026, then chose
 * against it the same day having compared all three arrangements on his phone:
 * the header CTA and the hero CTA together, and no bar. The bar cost 85px of
 * every screenful permanently, and the doubling it was meant to solve read as
 * persistence rather than as a mistake once he saw it in place.
 *
 * `StickyCta` is kept rather than deleted — `/review/mobile` still runs all
 * three arrangements, and `cta_location = "sticky"` stays in the enum so the
 * decision can be reversed without touching the analytics contract. Nothing
 * fires it today.
 *
 * **Section numbering is on, at every width, from August 11, 2026.** `01`
 * rather than `01 / 05`. It was phone-only through stage 10 because desktop's
 * sections did not yet match the phone's; cutting Section 3 and splitting 4+5
 * made them match, which is what `08-desktop-changes-pending.md` §5 said had to
 * be true first. Turning it on overrides four build specs that forbid an
 * eyebrow — `components/layout/section-number.tsx` lists the clauses.
 */
export default function Page() {
  return (
    <div data-section-numbers="on">
      <PageView />
      {/*
        The header is a direct child of the page so that `position: sticky` has
        the whole document to travel in.

        **It used to sit inside `field-open` and that was the defect.** A sticky
        element can only travel inside its parent's box, and `field-open` is the
        hero's 910px wrapper, so the header pinned for 910px and then left with
        the hero — on both surfaces, despite `PLAN-AMENDMENTS-2026-08-01.md`
        ratifying it as persistent. `08-desktop-changes-pending.md` §13 has the
        measurement.

        **The comment this replaces was not wrong, and its intent is preserved.**
        It read: "the hero field carries the header too, so the page opens as one
        continuous surface rather than a white bar sitting on a tinted section."
        That is still true — `.field-open` now pulls itself back up under the
        header with a negative top margin, so the gradient box still begins at
        document y=0 and the two radial glows stay anchored exactly where they
        were ratified. The header paints over the top of the field rather than
        beside it, and nothing about the hero moves.

        `SiteHeader` reads `?header=` for the stage-10 comparison, so it needs a
        boundary. The fallback is the header in its default mode, which means
        the bar is server-rendered and identical unless the parameter is
        present — no gap, no shift, and the page stays static.
      */}
      <Suspense fallback={<SiteHeaderBar />}>
        <SiteHeader />
      </Suspense>
      <div className="field-open">
        <main id="top">
          <Hero top="g" />
        </main>
      </div>
      {/*
        **The two surfaces now read the same list**, as of August 11, 2026:

          both   hero · 01 scale · 02 your sheet · 03 outstanding · 04 · 05

        Section 3, "How Blotter works", is gone from both. It went from the
        phone in stage 10 because the hero film demonstrated the mechanism;
        Jon cut it from desktop once the desktop hero became a film too, which
        removed the only reason `09` §6 had given for keeping it —
        *"desktop has room and no hero film"*.

        `components/sections/how-blotter-works.tsx` is retained but rendered
        nowhere. It holds `SECTION_3_HEADLINE`, which is now section 02's deck,
        and the Friday timeline, which is the one ratified asset the cut
        retires. Deleting the file would throw both away for no gain.
      */}
      <Ownership />
      <DataAndPrivacy />
      <FaqAndClose />
      {/*
        The canonical funnel. A modal over the page rather than a route, so
        every CTA opens the same thing without leaving the argument behind.
      */}
      <Funnel />
    </div>
  );
}
