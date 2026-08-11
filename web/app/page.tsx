import { SiteHeader } from "@/components/site-header";
import { PageView } from "@/components/page-view";
import { Hero } from "@/components/sections/hero";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { HowBlotterWorks } from "@/components/sections/how-blotter-works";
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
        The hero field carries the header too, so the page opens as one
        continuous surface rather than a white bar sitting on a tinted
        section. It resolves to white before Section 2 begins.
      */}
      <div className="field-open">
        <SiteHeader />
        <main id="top">
          <Hero />
        </main>
      </div>
      <ScaleAndConsequence />
      <HowBlotterWorks />
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
