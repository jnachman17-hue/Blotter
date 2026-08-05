import { SiteHeader } from "@/components/site-header";

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
      <SiteHeader />
      <main id="top">
        <div className="mx-auto max-w-[1280px] px-6 py-24">
          <p className="text-sm text-ink-muted">
            Foundation checkpoint. Sections build from here.
          </p>
        </div>
      </main>
    </>
  );
}
