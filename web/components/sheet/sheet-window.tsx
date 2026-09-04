/**
 * The reusable high-fidelity Google Sheets window.
 *
 * Authority: WS4-SPEC.md:644 and 04-decision-log.md — "Before broad page-scene
 * implementation, WS5 must create one reusable high-fidelity Google Sheets-style
 * spreadsheet-window component, compare it against the approved references,
 * obtain Jon's visual approval, and reuse the approved primitive across every
 * spreadsheet scene."
 *
 * Consumers: hero, Section 3 crop, Section 4 Outstanding Actions, Section 5
 * preservation, and funnel Frames 1 to 3. Every one of those is static product
 * proof, so nothing here is interactive.
 *
 * Chrome is sampled from hero-reference-v1.png and
 * outstanding-actions-reference-v1.png.
 */

import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ chrome */

function SheetsIcon() {
  return (
    <span
      aria-hidden="true"
      className="grid size-8 shrink-0 place-items-center rounded-[6px] bg-sheet-green"
    >
      <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
        <path d="M9 0H1.5A1.5 1.5 0 0 0 0 1.5v16A1.5 1.5 0 0 0 1.5 19h12a1.5 1.5 0 0 0 1.5-1.5V6L9 0Z" fill="#fff" fillOpacity=".25" />
        <path d="M3.5 8.5h8v6h-8v-6Zm1 1.5v1h2.5v-1H4.5Zm3.5 0v1h2.5v-1H8Zm-3.5 2v1h2.5v-1H4.5Zm3.5 0v1h2.5v-1H8Z" fill="#fff" />
      </svg>
    </span>
  );
}

/**
 * Sheets' hidden-column indicator: two arrowheads facing each other across the
 * boundary. Absolutely positioned so it costs no layout width and the strip
 * stays aligned with the grid it labels.
 */
export function HiddenMark({ edge }: { edge?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 items-center gap-[1px] text-ink-faint",
        /* On the last column the boundary is the window's own edge, which
           clips. Tucked inside instead. */
        edge ? "right-[2px]" : "-right-[6px]",
      )}
    >
      <svg width="4" height="7" viewBox="0 0 4 7" fill="currentColor">
        <path d="M4 0 0 3.5 4 7z" />
      </svg>
      <svg width="4" height="7" viewBox="0 0 4 7" fill="currentColor">
        <path d="M0 0l4 3.5L0 7z" />
      </svg>
    </span>
  );
}

const MENUS = [
  "File",
  "Edit",
  "View",
  "Insert",
  "Format",
  "Data",
  "Tools",
  "Extensions",
  "Help",
] as const;

/* -------------------------------------------------------------------- types */

export interface SheetTab {
  label: string;
  active?: boolean;
}

export interface SheetWindowProps {
  /** Document title in the chrome. Every ratified asset uses the same one. */
  title?: string;
  /** Cell reference shown in the name box, e.g. `D2`. */
  selectedCell: string;
  /** Value shown in the formula bar. */
  formulaValue: string;
  /**
   * Column letters across the top. Pass the exact count the surface needs.
   *
   * Pass an empty array to omit the strip entirely, exactly as `tabs` does, for
   * a surface that composes its own. The phone sheet's swipe variant needs the
   * letters to scroll with the grid they label, and only a surface owning both
   * can arrange that. No existing caller passes an empty array, so every
   * ratified composition renders byte-identically.
   */
  columnLetters: string[];
  /**
   * Width per column, positionally matching `columnLetters`. Must be the same
   * widths the grid body uses, otherwise the letter strip will not align over
   * the columns it labels. Omit an entry to let it flex.
   *
   * A string is applied as a Tailwind utility and must be written as a literal
   * somewhere Tailwind can scan it. A number is applied as an inline pixel
   * width, which is the right choice for any width computed at runtime — a
   * template-built `w-[123px]` never reaches the compiler and the strip
   * silently stops aligning.
   */
  columnWidths?: (string | number | undefined)[];
  /**
   * Column letters after which the sheet has columns hidden. Draws Sheets' own
   * indicator — two arrowheads facing each other across the boundary.
   *
   * A gap in the letter strip with nothing to explain it reads as a rendering
   * fault rather than as a hidden column, and the hero hides `Email` because it
   * is 190px of the student's own data that no cue ever touches.
   */
  hiddenAfter?: string[];
  /**
   * Bottom tab strip. Pass an empty array to omit the strip entirely, for a
   * surface that composes its own.
   */
  tabs: SheetTab[];
  /** Trim the menu row. The Section 3 crop shows a shortened menu set. */
  menuCount?: number;
  /** Hide the "All changes saved in Drive" cluster on narrow crops. */
  showSaveState?: boolean;
  /** Grid body. Composed per surface. */
  children: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ window */

export function SheetWindow({
  title = "IB Recruiting Tracker",
  selectedCell,
  formulaValue,
  columnLetters,
  columnWidths,
  hiddenAfter,
  tabs,
  menuCount = MENUS.length,
  showSaveState = true,
  children,
  className,
}: SheetWindowProps) {
  return (
    <div
      className={cn(
        // Arial, not the page font. hero-reference-v1.png is set in Arial, so
        // pinning it keeps the primitive faithful to the ratified asset and
        // insulated from page-theme changes.
        "sheet-type",
        "overflow-hidden rounded-xl border border-sheet-border bg-sheet-chrome",
        "shadow-[0_1px_3px_rgba(60,64,67,0.15),0_8px_28px_-8px_rgba(60,64,67,0.25)]",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 pt-3">
        <SheetsIcon />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[19px] leading-tight font-normal text-ink">
              {title}
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              ☆
            </span>
          </div>
          <div className="mt-0.5 flex gap-3 text-[13px] text-ink-muted">
            {MENUS.slice(0, menuCount).map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
        {showSaveState && (
          <span className="hidden shrink-0 text-[13px] text-ink-muted lg:inline">
            All changes saved in Drive
          </span>
        )}
        <span className="shrink-0 rounded-full bg-chip-replied-bg px-4 py-1.5 text-[14px] text-chip-replied-fg">
          Share
        </span>
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-[#5f6b7a] text-[12px] font-medium text-white"
        >
          JN
        </span>
      </div>

      {/* Formula bar */}
      <div className="mt-2 flex items-stretch border-y border-sheet-grid text-[13px]">
        <div className="flex w-[100px] shrink-0 items-center justify-between border-r border-sheet-grid px-3 py-1.5">
          <span className="text-ink">{selectedCell}</span>
          <span aria-hidden="true" className="text-ink-faint">
            ▾
          </span>
        </div>
        <div className="flex flex-1 items-center gap-2 px-3 py-1.5">
          <span aria-hidden="true" className="italic text-ink-faint">
            fx
          </span>
          <span className="text-ink">{formulaValue}</span>
        </div>
      </div>

      {/* Column letters. The leading cell is the row-number gutter. */}
      {columnLetters.length > 0 && (
        <div className="flex border-b border-sheet-grid bg-sheet-header text-[12px] text-ink-muted">
          <div className="w-[43px] shrink-0 border-r border-sheet-grid" />
          {columnLetters.map((letter, i) => {
            const w = columnWidths?.[i];
            return (
              <div
                key={letter}
                className={cn(
                  "relative border-r border-sheet-grid py-1 text-center last:border-r-0",
                  typeof w === "string" ? w : w === undefined ? "flex-1" : "shrink-0",
                )}
                style={typeof w === "number" ? { width: w } : undefined}
              >
                {letter}
                {hiddenAfter?.includes(letter) && <HiddenMark />}
              </div>
            );
          })}
        </div>
      )}

      {children}

      {/*
        Tab strip. Omitted entirely when the surface composes its own.

        It scrolls rather than wraps. Four tabs is what the product ships with,
        and at phone width `Start here` broke across two lines and grew the
        whole strip. Real Sheets scrolls its tab strip.
      */}
      {tabs.length > 0 && (
        <div className="flex items-center gap-1 overflow-x-auto border-t border-sheet-grid px-3 py-2 text-[13px] whitespace-nowrap">
          <span aria-hidden="true" className="px-1.5 text-ink-muted">
            +
          </span>
          <span aria-hidden="true" className="px-1.5 text-ink-muted">
            ☰
          </span>
          {tabs.map((tab) => (
            <span
              key={tab.label}
              className={cn(
                "shrink-0 rounded px-3 py-1",
                tab.active
                  ? "bg-chip-replied-bg font-medium text-chip-replied-fg"
                  : "text-ink-muted",
              )}
            >
              {tab.label}
              {tab.active && (
                <span aria-hidden="true" className="ml-1 opacity-60">
                  ▾
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
