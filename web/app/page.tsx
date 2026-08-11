import { Suspense } from "react";

import { SiteHeader, SiteHeaderBar } from "@/components/site-header";
import { PageView } from "@/components/page-view";
import { Hero } from "@/components/sections/hero";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { HowBlotterWorks } from "@/components/sections/how-blotter-works";
import { Mobile02 } from "@/components/section-45/mobile-02";
import { TrackerAndActions } from "@/components/sections/tracker-and-actions";
import { DataAndPrivacy } from "@/components/sections/data-and-privacy";
import { FaqAndClose } from "@/components/sections/faq-and-close";
import { Funnel } from "@/components/funnel/funnel";

/**
 * Spreadsheet landing page.
 *
 * Section order is fixed by WS4-SPEC and LOVABLE-PROJECT-KNOWLEDGE:
 *   1 Hero
 *   2 Scale and consequence
 *   3 How Blotter works
 *   4+5 Tracker and actions      (merged by Jon August 5, 2026;
 *                                CTA, cta_location = actions)
 *   6 How Blotter uses your data
 *   7 FAQ and final CTA          (CTA, cta_location = final)
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
 * **Section numbering is on, below the desktop breakpoint only.** `01` rather
 * than `01 / 05`. See `components/layout/section-number.tsx` for what it costs
 * and `08-desktop-changes-pending.md` for the desktop half of the decision.
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
          <Hero />
        </main>
      </div>
      <ScaleAndConsequence />
      {/*
        Section 3 is desktop-only from August 11, 2026, and `Mobile02` is the
        phone's replacement for it plus beat 1 of the section below. Each
        component owns its own visibility, so this list stays the reading order
        on both surfaces:

          desktop   1 hero · 2 scale · 3 how it works · 4+5 tracker · 6 · 7
          phone     hero   · 01 scale · 02 your sheet  · 03 outstanding · 04 · 05

        `09-page-argument-rework.md` §4 has why, and §8 has what web owes.
      */}
      <HowBlotterWorks />
      <Mobile02 />
      <TrackerAndActions />
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
