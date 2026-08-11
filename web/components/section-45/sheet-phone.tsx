/**
 * The Blotter tab, composed for a phone.
 *
 * Authority: `09-page-argument-rework.md` §5, settled by Jon on August 11,
 * 2026, and `04-decision-log.md` session 7. `05-SECTION-5` §12 governs what any
 * smaller-screen treatment must preserve.
 *
 * ## Why this is a re-composition and not a scale
 *
 * The desktop sheet is 1,221px natural in 13px Arial. Phone content width is
 * 350px at a 390 viewport, 320px at 360, 280px at 320. Scaling to fit is 0.287
 * and puts the type at 3.7px, which is the state the section was in. §12 permits
 * a deliberate horizontal crop and forbids scaling "until the text becomes
 * unreadable", so the columns are re-cut at phone widths rather than shrunk.
 *
 * ## Why these four columns
 *
 * `05-SECTION-5`'s amendment table holds the column order fixed, so `Status`
 * cannot be moved beside `Name`. The divider sits 683px in, 56% across the
 * sheet, and the only columns between `Name` and it are `Title`, `Firm`,
 * `Email` and `LinkedIn` — the columns that prove preservation. Getting the
 * ownership divider on screen at rest costs exactly those four.
 *
 * That is affordable because `09` §4 assigns the preservation proof to the tab
 * strip: `Contacts` sitting untouched beside `Blotter` is what says "this is
 * the sheet you already had". The grid only has to prove ownership, and these
 * four columns do: one manual field, the 3px divider, and three maintained
 * fields carrying the cream fill.
 *
 * `Days` survives at 46px because it is the silence argument — Daniel Kim's 5
 * is the one cell on the page that proves the tracker moves when nothing
 * arrives.
 *
 * ## The ten field names
 *
 * §12 requires all ten survive. They are in `ZoneLines` below, beneath the
 * sheet rather than above it: desktop's zone labels are sized to the two zones'
 * widths, which on a phone are 94px and 278px, and `09` §4 gives the space
 * directly above the sheet to the three stage labels.
 *
 * ## Three variants, under `/review/sheet-mobile`
 *
 * Jon picks one and the other two branches are deleted. The winner becomes the
 * amendment to `05-SECTION-5` §12.
 */

"use client";

import { Fit } from "@/components/layout/fit";
import { SheetWindow } from "@/components/sheet/sheet-window";
import { StatusChip } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import { TRACKER_CONTACTS } from "@/lib/sheet-data";

/* ---------------------------------------------------------------- variants */

export type PhoneSheetVariant = "crop" | "hidden" | "swipe";

/* ---------------------------------------------------------------- geometry */

/**
 * Narrower than desktop's 43px, which is what Sheets itself does on a phone and
 * what buys `Next move` the width to hold "Attend coffee chat" unclipped.
 *
 * `SheetWindow` hard-codes 43px in its own letter strip, so these surfaces pass
 * `columnLetters={[]}` and compose the strip here instead. A 43px strip over a
 * 22px grid puts every letter over the wrong column.
 */
const GUTTER = 22;

interface PhoneCol {
  header: string;
  /** The real column letter in the ten-column sheet. Order is fixed by spec. */
  letter: string;
  w: number;
  maintained?: boolean;
  align?: "right";
}

/*
 * Widths are fitted to content at 13px Arial, not scaled down from desktop:
 * `Name` holds "Alex Morgan" without wrapping, `Status` holds the "Call
 * completed" chip, `Next move` holds "Attend coffee chat", and `Days` holds its
 * own header, which is wider than any value in it.
 */
const COLS: PhoneCol[] = [
  { header: "Name", letter: "A", w: 94 },
  { header: "Status", letter: "F", w: 112, maintained: true },
  { header: "Next move", letter: "G", w: 120, maintained: true },
  { header: "Days", letter: "I", w: 46, maintained: true, align: "right" },
];

const SHEET_W = GUTTER + COLS.reduce((n, c) => n + c.w, 0);

/** Unchanged from `parts.tsx`. The cream is the ownership claim at rest. */
const MAINTAINED_FILL = "#fdfaf2";

const TABS = [
  { label: "Contacts" },
  { label: "Blotter", active: true },
  { label: "Outstanding" },
];

/* ------------------------------------------------------- the full ten, swipe */

const FULL_GUTTER = 43;
const FULL_COLS = [
  { header: "Name", letter: "A", w: 112 },
  { header: "Title", letter: "B", w: 116, italic: true },
  { header: "Firm", letter: "C", w: 132 },
  { header: "Email", letter: "D", w: 196 },
  { header: "LinkedIn", letter: "E", w: 84 },
  { header: "Status", letter: "F", w: 128, maintained: true },
  { header: "Next move", letter: "G", w: 142, maintained: true },
  { header: "Last contact", letter: "H", w: 104, maintained: true },
  { header: "Days", letter: "I", w: 52, maintained: true, align: "right" },
  { header: "Call", letter: "J", w: 112, maintained: true },
];
const FULL_W = FULL_GUTTER + FULL_COLS.reduce((n, c) => n + c.w, 0);

/* ----------------------------------------------------------------- the lines */

/**
 * The ten field names, in ratified column order, in desktop's exact wording.
 *
 * A colon rather than a dash: the page permits exactly two dashes in visible
 * copy and both are spoken for.
 */
function ZoneLines() {
  return (
    <div className="mt-3 space-y-1.5 text-[12.5px] leading-[1.45]">
      <p className="text-ink-muted">
        <span className="font-semibold text-ink">You add these:</span>{" "}
        Name, Title, Firm, Email, LinkedIn
      </p>
      <p className="text-blotter-700/80">
        <span className="font-semibold text-blotter-700">
          Blotter keeps these current:
        </span>{" "}
        Status, Next move, Last contact, Days, Call
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ helpers */

function Gut({ n, w = GUTTER }: { n: number | null; w?: number }) {
  return (
    <div
      className="shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[11px] text-ink-muted"
      style={{ width: w }}
    >
      {n}
    </div>
  );
}

/**
 * Google Sheets' own hidden-column indicator: two arrowheads facing each other
 * across the boundary where columns were collapsed.
 *
 * Absolutely positioned so it costs no layout width, which is what keeps the
 * letter strip aligned with the grid it labels.
 */
function HiddenMark({ edge }: { edge?: boolean }) {
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

/* -------------------------------------------------- variants 1 and 2, cropped */

/** Which boundaries in the cropped strip have columns collapsed behind them. */
const HIDDEN_AFTER = new Set(["A", "G", "I"]);

function CroppedSheet({ trueLetters }: { trueLetters: boolean }) {
  return (
    <Fit width={SHEET_W}>
      <div style={{ width: SHEET_W }}>
        <SheetWindow
          selectedCell={trueLetters ? "F2" : "B2"}
          formulaValue="Replied"
          columnLetters={[]}
          tabs={TABS}
          menuCount={4}
          showSaveState={false}
        >
          <div className="sheet-type text-[13px]">
            {/* Letter strip, composed here so it shares the 22px gutter. */}
            <div className="flex border-b border-sheet-grid bg-sheet-header text-[11px] text-ink-muted">
              <div
                className="shrink-0 border-r border-sheet-grid"
                style={{ width: GUTTER }}
              />
              {COLS.map((c, i) => (
                <div
                  key={c.letter}
                  className="relative shrink-0 border-r border-sheet-grid py-1 text-center last:border-r-0"
                  style={{ width: c.w }}
                >
                  {trueLetters ? c.letter : String.fromCharCode(65 + i)}
                  {trueLetters && HIDDEN_AFTER.has(c.letter) && (
                    <HiddenMark edge={i === COLS.length - 1} />
                  )}
                </div>
              ))}
            </div>

            {/* Header row */}
            <div className="flex border-b border-sheet-grid font-semibold text-ink">
              <Gut n={1} />
              {COLS.map((c) => (
                <div
                  key={c.header}
                  className={cn(
                    "shrink-0 px-2 py-2.5 whitespace-nowrap",
                    c.maintained ? "bg-blotter-100" : "bg-manual-100",
                    c.header === "Status" &&
                      "border-l-[3px] border-l-blotter-400",
                    c.align === "right" && "text-right",
                  )}
                  style={{ width: c.w }}
                >
                  {c.header}
                </div>
              ))}
            </div>

            {TRACKER_CONTACTS.map((c, r) => (
              <div
                key={c.name}
                className="flex border-b border-sheet-grid last:border-b-0"
              >
                <Gut n={r + 2} />
                <div
                  className="shrink-0 px-2 py-2.5 font-medium whitespace-nowrap text-ink"
                  style={{ width: COLS[0].w }}
                >
                  {c.name}
                </div>
                <div
                  className="shrink-0 border-l-[3px] border-l-blotter-400 px-1 py-2.5"
                  style={{ width: COLS[1].w, background: MAINTAINED_FILL }}
                >
                  <StatusChip status={c.status} />
                </div>
                <div
                  className="shrink-0 px-2 py-2.5 whitespace-nowrap"
                  style={{ width: COLS[2].w, background: MAINTAINED_FILL }}
                >
                  {c.next}
                </div>
                <div
                  className="shrink-0 px-2 py-2.5 text-right"
                  style={{ width: COLS[3].w, background: MAINTAINED_FILL }}
                >
                  {c.days}
                </div>
              </div>
            ))}
          </div>
        </SheetWindow>
      </div>
    </Fit>
  );
}

/* ------------------------------------------------------- variant 3, the swipe */

/**
 * All ten columns at 1:1, `Name` and the row gutter frozen, the rest swiped.
 *
 * Rejected as the answer and kept as a variant so the crop's cost is visible
 * rather than asserted. Two things to look at: what the sheet says in a still
 * frame before anything is swiped, and where the divider is at rest.
 *
 * Marcus Lee's and Priya Shah's rows are 60px against the other three at 40px,
 * because `Call` cannot hold `1/17 @ 2:00 PM` on one line. That is **faithful**:
 * the live desktop page does exactly the same thing, measured on August 11,
 * 2026 and recorded as a confirmed defect in `08-desktop-changes-pending.md`
 * §12. Do not quietly fix it here — this variant has to show what the full
 * sheet actually is, and desktop does not change during stage 10.
 *
 * The letter strip is composed here rather than by `SheetWindow`, because the
 * letters have to scroll with the grid they label. That is what the empty
 * `columnLetters` array is for.
 */
function SwipeSheet() {
  return (
    <SheetWindow
      selectedCell="F2"
      formulaValue="Replied"
      columnLetters={[]}
      tabs={TABS}
      menuCount={4}
      showSaveState={false}
    >
      <div className="relative">
        <div className="overflow-x-auto overscroll-x-contain">
          <div className="sheet-type text-[13px]" style={{ width: FULL_W }}>
            {/* Letter strip, scrolling with its own grid. */}
            <div className="flex border-b border-sheet-grid bg-sheet-header text-[12px] text-ink-muted">
              <div
                className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header"
                style={{ width: FULL_GUTTER }}
              />
              <div
                className="sticky z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-1 text-center"
                style={{ width: FULL_COLS[0].w, left: FULL_GUTTER }}
              >
                {FULL_COLS[0].letter}
              </div>
              {FULL_COLS.slice(1).map((c) => (
                <div
                  key={c.letter}
                  className="shrink-0 border-r border-sheet-grid py-1 text-center last:border-r-0"
                  style={{ width: c.w }}
                >
                  {c.letter}
                </div>
              ))}
            </div>

            {/* Header row */}
            <div className="flex border-b border-sheet-grid font-semibold text-ink">
              <div
                className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[12px] font-normal text-ink-muted"
                style={{ width: FULL_GUTTER }}
              >
                1
              </div>
              <div
                className="sticky z-20 shrink-0 bg-manual-100 px-3 py-2.5"
                style={{ width: FULL_COLS[0].w, left: FULL_GUTTER }}
              >
                {FULL_COLS[0].header}
              </div>
              {FULL_COLS.slice(1).map((c) => (
                <div
                  key={c.header}
                  className={cn(
                    "shrink-0 px-3 py-2.5",
                    c.maintained ? "bg-blotter-100" : "bg-manual-100",
                    c.header === "Status" &&
                      "border-l-[3px] border-l-blotter-400",
                  )}
                  style={{ width: c.w }}
                >
                  {c.header}
                </div>
              ))}
            </div>

            {TRACKER_CONTACTS.map((c, r) => {
              const fill = { background: MAINTAINED_FILL };
              return (
                <div
                  key={c.name}
                  className="flex border-b border-sheet-grid last:border-b-0"
                >
                  <div
                    className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[12px] text-ink-muted"
                    style={{ width: FULL_GUTTER }}
                  >
                    {r + 2}
                  </div>
                  <div
                    className="sticky z-20 shrink-0 bg-white px-3 py-2.5 font-medium text-ink"
                    style={{ width: FULL_COLS[0].w, left: FULL_GUTTER }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="shrink-0 px-3 py-2.5 text-ink-muted italic"
                    style={{ width: FULL_COLS[1].w }}
                  >
                    {c.title}
                  </div>
                  <div className="shrink-0 px-3 py-2.5" style={{ width: FULL_COLS[2].w }}>
                    {c.firm}
                  </div>
                  <div
                    className="shrink-0 truncate px-3 py-2.5 text-ink-muted"
                    style={{ width: FULL_COLS[3].w }}
                  >
                    {c.email}
                  </div>
                  <div className="shrink-0 px-3 py-2.5" style={{ width: FULL_COLS[4].w }}>
                    {/*
                      Text, not an anchor. `08-desktop-changes-pending.md` §8
                      records the five phantom `Here` links as a confirmed
                      defect on both surfaces; there is no reason to author a
                      sixth one here while that fix is queued.
                    */}
                    <span className="text-chip-replied-fg underline">Here</span>
                  </div>
                  <div
                    className="shrink-0 border-l-[3px] border-l-blotter-400 px-2 py-2.5"
                    style={{ width: FULL_COLS[5].w, ...fill }}
                  >
                    <StatusChip status={c.status} />
                  </div>
                  <div className="shrink-0 px-3 py-2.5" style={{ width: FULL_COLS[6].w, ...fill }}>
                    {c.next}
                  </div>
                  <div className="shrink-0 px-3 py-2.5" style={{ width: FULL_COLS[7].w, ...fill }}>
                    {c.last}
                  </div>
                  <div
                    className="shrink-0 px-3 py-2.5 text-right"
                    style={{ width: FULL_COLS[8].w, ...fill }}
                  >
                    {c.days}
                  </div>
                  <div className="shrink-0 px-3 py-2.5" style={{ width: FULL_COLS[9].w, ...fill }}>
                    {c.call}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/*
          A scroll affordance, because a still frame of this variant otherwise
          claims the sheet ends at `Firm`. It is part of the variant being
          judged, not page furniture.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/[0.07] to-transparent"
        />
      </div>
    </SheetWindow>
  );
}

/* ------------------------------------------------------------------- export */

export function SheetPhone({ variant }: { variant: PhoneSheetVariant }) {
  return (
    <div>
      {variant === "swipe" ? (
        <SwipeSheet />
      ) : (
        <CroppedSheet trueLetters={variant === "hidden"} />
      )}
      <ZoneLines />
    </div>
  );
}

/** Exported for the review route's readout. */
export const PHONE_SHEET_W = SHEET_W;
