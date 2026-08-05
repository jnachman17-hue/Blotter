import { SiteHeader } from "@/components/site-header";
import { PageView } from "@/components/page-view";
import { Hero } from "@/components/sections/hero";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";

/**
 * Spreadsheet landing page.
 *
 * Section order is fixed by WS4-SPEC and LOVABLE-PROJECT-KNOWLEDGE:
 *   1 Hero
 *   2 Scale and consequence
 *   3 How Blotter works
 *   4 Outstanding Actions        (CTA, cta_location = actions)
 *   5 Preservation
 *   6 How Blotter uses your data
 *   7 FAQ and final CTA          (CTA, cta_location = final)
 *
 * Sections land here one checkpoint at a time.
 */
export default function Page() {
  return (
    <>
      <PageView />
      {/*
        The hero field carries the header too, so the page opens as one
        continuous surface rather than a white bar sitting on a tinted
        section. It resolves to white before Section 2 begins.
      */}
      <div className="hero-field">
        <SiteHeader />
        <main id="top">
          <Hero />
        </main>
      </div>
      <ScaleAndConsequence />
    </>
  );
}
