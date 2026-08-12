/**
 * Standard row-and-column grid body for SheetWindow.
 *
 * Serves the hero, the Section 3 crop, Section 5 preservation, and funnel
 * Frames 1 and 2. Section 4 Outstanding Actions uses a grouped body instead.
 *
 * Zone model (01-HERO sections 8 and 10, 05-SECTION-5 section 6):
 *   - columns before `zoneSplit` are student-maintained
 *   - columns from `zoneSplit` onward are Blotter-maintained and carry a
 *     continuous faint tint across headers and every data row
 *   - a legible vertical boundary sits at the split, stronger than a gridline
 *
 * Blank cells are genuinely blank. Never a dash, em dash, N/A, or placeholder
 * (01-HERO section 6; reaffirmed by Jon August 4, 2026 for Section 5).
 *
 * One ratified exception, instructed by Jon August 5, 2026: Jerome Bowel's hero
 * `Next move` carries the em dash exactly as the ratified PNG draws it, muted
 * and centred. That is the `{ dash: true }` cell and it is the only place it is
 * permitted. Section 5 and every other surface keep genuinely blank cells.
 */

import { cn } from "@/lib/cn";
import { StatusChip, type Status } from "./status-chip";

export interface SheetColumn {
  header: string;
  /** Tailwind width utility, e.g. `w-[180px]`. Omit to share remaining space. */
  width?: string;
  align?: "left" | "right";
  /** Render the cell as a status chip rather than plain text. */
  kind?: "text" | "status" | "link" | "italic";
}

export type SheetCell = string | { status: Status } | { dash: true } | null;

export interface SheetRow {
  cells: SheetCell[];
  /**
   * Stronger emphasis across this row's maintained block. Used for the three
   * cue-linked hero rows (01-HERO section 10). Priya and Daniel keep only the
   * baseline tint and must not be de-emphasised.
   */
  emphasised?: boolean;
}

interface SheetGridProps {
  columns: SheetColumn[];
  rows: SheetRow[];
  /** Index of the first Blotter-maintained column. Omit for no zone split. */
  zoneSplit?: number;
  /** Row number to start from in the gutter. Header occupies row 1. */
  className?: string;
}

export function SheetGrid({
  columns,
  rows,
  zoneSplit,
  className,
}: SheetGridProps) {
  const maintained = (i: number) => zoneSplit !== undefined && i >= zoneSplit;
  const isSplit = (i: number) => zoneSplit !== undefined && i === zoneSplit;

  return (
    <div className={cn("text-[15px]", className)}>
      {/* Header row */}
      <div className="flex border-b border-sheet-grid">
        <div className="w-[43px] shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[12px] text-ink-muted">
          1
        </div>
        {columns.map((col, i) => (
          <div
            key={col.header}
            className={cn(
              "py-2.5 font-semibold text-ink whitespace-nowrap",
              // Chip columns sit closer to the cell edge, as the reference does.
              col.kind === "status" ? "px-2" : "px-3",
              col.width ?? "flex-1",
              col.align === "right" && "text-right",
              maintained(i) ? "bg-blotter-100" : "bg-manual-100",
              isSplit(i) && "border-l-2 border-l-sheet-border",
            )}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((row, r) => (
        <div key={r} className="flex border-b border-sheet-grid last:border-b-0">
          <div className="w-[43px] shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[12px] text-ink-muted">
            {r + 2}
          </div>
          {columns.map((col, i) => {
            const cell = row.cells[i];
            return (
              <div
                key={col.header}
                className={cn(
                  "py-2.5 whitespace-nowrap overflow-hidden",
                  col.kind === "status" ? "px-2" : "px-3",
                  col.width ?? "flex-1",
                  col.align === "right" && "text-right",
                  col.kind === "italic" && "italic text-ink-muted",
                  /*
                    Data rows carry no zone tint. Jon ruled August 5, 2026
                    that the maintained zone is marked by the header band
                    alone, matching hero-reference-v1.png, which samples
                    #fafbfd across every data row.

                    This supersedes 01-HERO sections 8 and 10, which called
                    for a 5-8% baseline tint on all rows plus 10-14% emphasis
                    on the three cue-linked rows. Revisit if the cue-to-row
                    connectors alone prove too thin a signal once the full
                    hero is assembled. `row.emphasised` is retained in the
                    data model so that reversal is a one-line change.
                  */
                  "bg-manual-row",
                  isSplit(i) && "border-l-2 border-l-sheet-border",
                )}
              >
                {cell === null || cell === "" ? null : typeof cell === "string" ? (
                  col.kind === "link" ? (
                    /*
                      Text, not an anchor. A `link` cell is spreadsheet
                      *content* in an illustrative asset, not navigation, and a
                      real `href` put phantom destinations in the tab order and
                      made a screen reader announce "link, Here" with no
                      context. `08-desktop-changes-pending.md` §8; fixed in the
                      Phase 6 sweep, August 11, 2026, with zero visual delta on
                      either surface.
                    */
                    <span className="text-chip-replied-fg underline">
                      {cell}
                    </span>
                  ) : (
                    cell
                  )
                ) : "dash" in cell ? (
                  <span className="block text-center text-ink-faint">—</span>
                ) : (
                  <StatusChip status={cell.status} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
