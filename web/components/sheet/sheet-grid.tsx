/**
 * Standard row-and-column grid body for SheetWindow.
 *
 * Serves the hero and the `/review/sheet` primitive page. Section 02 and the
 * phone sheet compose their own bodies, because both need the `Closed`
 * checkbox column and the closed-row fade, which nothing else wants.
 *
 * Zone model, from `courier/Code.gs`'s `bands` theme, which is what a student's
 * sheet actually looks like:
 *   - columns before `zoneSplit` are the student's
 *   - columns from `zoneSplit` onward are Blotter's
 *   - the two zones are told apart by their header tint and by a 3px
 *     Blotter-yellow rule at the split. Data rows stay white in both zones.
 *
 * A blank cell is genuinely blank. A dash is not blank: `Days` and `Attempts`
 * write an em dash wherever there is no number to show, which is a real value
 * meaning "nothing to count here" and is why `NO_CLOCK` exists in Code.gs.
 * `Days` carries a number on `Sent`, `Replied` and `Call done` only, and
 * `Attempts` on `Sent` alone.
 */

import { cn } from "@/lib/cn";
import { StatusCell, type Status } from "./status-chip";

export interface SheetColumn {
  header: string;
  /** Tailwind width utility, e.g. `w-[180px]`. Omit to share remaining space. */
  width?: string;
  align?: "left" | "right";
  kind?: "text" | "status" | "link" | "italic";
}

export type SheetCell = string | { status: Status } | { dash: true } | null;

export interface SheetRow {
  cells: SheetCell[];
  /**
   * Stronger emphasis across this row's maintained block. Carried in the data
   * model but not drawn: Jon ruled on August 5, 2026 that the header band alone
   * marks the zone, and `bands` in Code.gs holds to that.
   */
  emphasised?: boolean;
}

interface SheetGridProps {
  columns: SheetColumn[];
  rows: SheetRow[];
  /** Index of the first Blotter-maintained column. Omit for no zone split. */
  zoneSplit?: number;
  className?: string;
}

/**
 * Cells are `px-2`, not `px-3`.
 *
 * Sheets leaves about 3px each side of a cell, and the column widths here are
 * Code.gs's own `CONTACTS_WIDTHS`. At `px-3` those widths clip their own
 * content — "Vice President" in a 120px `Title` is the first to go.
 */
const CELL_X = "px-2";

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
              CELL_X,
              col.width ?? "flex-1",
              col.align === "right" && "text-right",
              maintained(i) ? "bg-blotter-100" : "bg-manual-100",
              isSplit(i) && "border-l-[3px] border-l-blotter-400",
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
            const status = col.kind === "status";
            return (
              <div
                key={col.header}
                className={cn(
                  "overflow-hidden whitespace-nowrap bg-manual-row",
                  status ? "py-0" : cn("py-2.5", CELL_X),
                  col.width ?? "flex-1",
                  col.align === "right" && "text-right",
                  col.kind === "italic" && "italic text-ink-muted",
                  isSplit(i) && "border-l-[3px] border-l-blotter-400",
                )}
              >
                {cell === null || cell === "" ? null : typeof cell === "string" ? (
                  col.kind === "link" ? (
                    /*
                      Text, not an anchor. A `link` cell is spreadsheet
                      *content* in an illustrative asset, not navigation, and a
                      real `href` put phantom destinations in the tab order and
                      made a screen reader announce "link, Here" with no
                      context.
                    */
                    <span className="text-chip-replied-fg underline">
                      {cell}
                    </span>
                  ) : (
                    cell
                  )
                ) : "dash" in cell ? (
                  /* A value, so it takes the column's own alignment. */
                  <span className="text-ink-faint">—</span>
                ) : (
                  <StatusCell status={cell.status} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
