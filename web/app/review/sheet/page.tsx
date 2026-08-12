import { SheetWindow } from "@/components/sheet/sheet-window";
import { SheetGrid, type SheetRow } from "@/components/sheet/sheet-grid";
import { HERO_COLUMNS, HERO_ROWS } from "@/lib/sheet-data";

/**
 * Internal review surface. Not part of the landing page.
 *
 * Renders the SheetWindow primitive directly above the ratified reference
 * asset so the two can be compared at the same width. WS4-SPEC:644 requires
 * the primitive be approved before the sections that consume it.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function SheetReviewPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-8 py-12">
      <h1 className="text-2xl font-semibold">SheetWindow primitive review</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Built primitive on top, ratified reference asset below, both at the same
        width. The reference still contains the vertical engine rail, which
        01-HERO section 12 orders removed. Jerome Bowel&rsquo;s em dash is
        reproduced: Jon reinstated it on August 5, 2026.
      </p>

      <h2 className="mt-10 mb-3 text-sm font-semibold tracking-wide uppercase text-ink-muted">
        Built
      </h2>
      <div className="w-[1006px] max-w-full">
        <SheetWindow
          selectedCell="D2"
          formulaValue="Replied"
          columnLetters={["A", "B", "C", "D", "E", "F", "G", "H"]}
          columnWidths={HERO_COLUMNS.map((c) => c.width ?? "flex-1")}
          tabs={[{ label: "Contacts" }, { label: "Blotter", active: true }]}
        >
          <SheetGrid
            columns={HERO_COLUMNS}
            rows={HERO_ROWS as SheetRow[]}
            zoneSplit={3}
          />
        </SheetWindow>
      </div>

      <h2 className="mt-12 mb-3 text-sm font-semibold tracking-wide uppercase text-ink-muted">
        Reference asset
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/reference/hero-reference-v1.png"
        alt="Ratified hero reference asset"
        className="w-[1360px] max-w-full"
      />
    </main>
  );
}
