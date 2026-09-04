/**
 * The hero spreadsheet-and-cues visual module.
 *
 * Authority: 01-HERO.md for the composition, `courier/Code.gs` for what is in
 * the sheet. One current sheet, three activity cues to its right, one direct
 * connector per cue landing on the row it changed. Section 12 forbids the stale
 * rear sheet, before-and-after labels, and the vertical engine rail that the
 * ratified PNG still draws between the cues and the sheet.
 *
 * The composition is a fixed 1322px desktop object, and `TOTAL_W` must stay
 * 1322: `page-box.tsx` derives the page's own width from it.
 *
 * Nothing here animates. Section 13 requires the mechanism to read in a static
 * first-load screenshot.
 */

import { SheetWindow } from "@/components/sheet/sheet-window";
import { SheetGrid, type SheetColumn, type SheetRow } from "@/components/sheet/sheet-grid";
import { ActivityCueCard, type ActivityCue } from "./activity-cue";

/* ------------------------------------------------------------- the sheet */

/**
 * Eight of the eleven Contacts columns, at the widths Code.gs actually sets.
 *
 * `Last call` and `Closed` are off the right edge, which is what a Sheets
 * window does when the sheet is wider than the window, and `Email` is hidden,
 * which is what a student does to a 190px column of addresses they never read.
 * They are the three the hero can afford to lose: `Last call` says nothing
 * until a call has happened, and `Closed` is an empty checkbox until somebody
 * ticks it. Every cell the cues below move is on screen.
 *
 * Widths are `CONTACTS_WIDTHS` verbatim. They sum to 946, which with the 43px
 * row gutter is the sheet's 989px.
 */
const HERO_COLUMNS: SheetColumn[] = [
  { header: "Name", width: "w-[150px]" },
  { header: "Title", width: "w-[120px]", kind: "italic" },
  { header: "Firm", width: "w-[150px]" },
  { header: "Status", width: "w-[132px]", kind: "status" },
  { header: "Days", width: "w-[62px]", align: "right" },
  { header: "Last contact", width: "w-[108px]" },
  { header: "Attempts", width: "w-[82px]", align: "right" },
  { header: "Next call", width: "w-[142px]" },
];

/** The first column Blotter writes. */
const ZONE_SPLIT = 3;

/**
 * Five contacts on January 16, 2026, in the order `Blotter → Sort contacts → By
 * what they are waiting on` leaves them: Replied, Sent, Sent, Call done, Call
 * scheduled, longest-waiting first inside each group. That is why Jerome sits
 * above Larry — three days against none.
 *
 * Every number obeys the engine. `Days` counts on `Sent`, `Replied` and
 * `Call done` and shows a dash everywhere else. `Attempts` counts on `Sent`
 * alone — on `Replied` it is zero by definition, and a scheduled call has
 * nothing to count.
 */
const HERO_ROWS: SheetRow[] = [
  {
    cells: [
      "Jamie Diamond",
      "Associate",
      "JPMorgan",
      { status: "Replied" },
      "0",
      "1/16/26",
      { dash: true },
      null,
    ],
  },
  {
    cells: [
      "Jerome Bowel",
      "Analyst",
      "Carlyle",
      { status: "Sent" },
      "3",
      "1/13/26",
      "1",
      null,
    ],
  },
  {
    cells: [
      "Larry Sync",
      "Associate",
      "BlackRock",
      { status: "Sent" },
      "0",
      "1/16/26",
      "2",
      null,
    ],
  },
  {
    cells: [
      "Ken Molise",
      "Vice President",
      "Moelis",
      { status: "Call done" },
      "1",
      "1/13/26",
      { dash: true },
      null,
    ],
  },
  {
    cells: [
      "David Salmon",
      "Analyst",
      "Goldman Sachs",
      { status: "Call scheduled" },
      { dash: true },
      "1/15/26",
      { dash: true },
      "1/17 @ 2:00 PM",
    ],
  },
];

/* ------------------------------------------------------------------- cues */

/**
 * Three things that happened, and the cells each one moved.
 *
 * The cues this replaces named states the product does not have: one read
 * `No reply for 5 days` against a row whose status said `No reply`, which is
 * not one of the eight, and none of the three said what the sheet did about it
 * beyond changing a single word.
 *
 * Every cue here moves at least three columns off one event, because that is
 * what the sheet does. A status is not the unit of work: a reply lands and the
 * clock, the attempt count and the date all move with it.
 *
 * The timestamp line is gone. It was there when the card had nothing else to
 * say; the sheet's own `Last contact` column carries the date, and the source
 * mark carries where it came from.
 *
 * Cue order matches row order, so the three connectors never cross.
 */
const HERO_CUES: ActivityCue[] = [
  {
    source: "gmail",
    event: "Jamie Diamond replied",
    when: "Jan 16 · 10:42 AM",
    /* They wrote last, so the ball is yours, the clock resets, and the count of
       times you have written since they wrote back drops to nothing. */
    moved: [
      { column: "Status", from: "Sent", to: "Replied" },
      { column: "Days", from: "5", to: "0" },
      { column: "Attempts", from: "2", to: "—" },
    ],
    targetRow: 0,
  },
  {
    source: "gmail",
    event: "Follow-up sent to Larry Sync",
    when: "Jan 16 · 9:15 AM",
    /* The status does not move and that is the point of the column beside it:
       `Sent` reads the same on a first email and a third. `Attempts` is the
       only thing on the sheet that tells them apart. */
    moved: [
      { column: "Attempts", from: "1", to: "2" },
      { column: "Days", from: "6", to: "0" },
      { column: "Last contact", from: "1/10", to: "1/16" },
    ],
    targetRow: 2,
  },
  {
    source: "calendar",
    event: "Coffee chat with David Salmon",
    when: "Jan 15 · 4:20 PM",
    /* `Days` was the one state counting forwards, so a scheduled call drops it
       and `Next call` carries the date instead. */
    moved: [
      { column: "Status", from: "Sent", to: "Call scheduled" },
      { column: "Next call", to: "1/17 @ 2:00 PM" },
      { column: "Days", from: "1", to: "—" },
    ],
    targetRow: 4,
  },
];

/* --------------------------------------------------------------- geometry */

/** Row-number gutter width, from SheetWindow. */
const GUTTER = 43;
/** Name through Firm: 150 + 120 + 150. */
const MANUAL_W = 420;
/** Status through Next call: 132 + 62 + 108 + 82 + 142. */
const MAINTAINED_W = 526;

/** Sheet window width: the gutter plus the eight columns above. */
const SHEET_W = GUTTER + MANUAL_W + MAINTAINED_W;
/** Sheet window height at the five hero rows. Measured. */
const SHEET_H = 432.5;
/** Distance from the window top to the first pixel of the grid. Measured. */
const GRID_TOP = 127;
/** Uniform grid row height, header included. Measured. */
const ROW_H = 43.5;

/** Connector corridor between the sheet edge and the cue column. */
const CORRIDOR = 60;
/**
 * Cue card width. It is what is left after the sheet and the corridor, and the
 * sum is the ratified 1322 — which `page-box.tsx` reads, so it cannot move.
 *
 * The corridor gave up 20px to it. `Status Sent → Call scheduled` is the widest
 * line any cue has to set, and at 253 it was a pixel over.
 */
const CUE_W = 273;
export const TOTAL_W = SHEET_W + CORRIDOR + CUE_W; // 1322

/**
 * Uniform scale applied to the whole module.
 *
 * Section 3 of 01-HERO fixes the composition's *proportions*, not its pixel
 * count. Scaling the module as one object preserves every ratified measurement
 * while letting the complete hero, copy included, land inside a 13-inch MacBook
 * Pro viewport of roughly 1440 by 780.
 *
 * Authorised by Jon on August 5, 2026: scale down, hold the proportions.
 */
export const VISUAL_SCALE = 0.85;

/** Gap between the sheet and the ownership underlines. */
const LABEL_GAP = 24;
/** Underline plus its centred label. */
const LABEL_BLOCK = 30;
/** Full module height at true geometry, before scaling. */
const MODULE_H = SHEET_H + LABEL_GAP + LABEL_BLOCK;

/** Vertical centre of data row `i`, measured from the window top. */
function rowCenterY(i: number) {
  return GRID_TOP + ROW_H * (i + 1) + ROW_H / 2;
}

/**
 * Each cue sits dead level with the row it changed.
 *
 * The old stack was deliberately uneven, because its three target rows were 1,
 * 2 and 4 and an even pitch would have left a card level with a row it did not
 * map to. These three target rows 0, 2 and 4, an even 87px apart against a card
 * about 63px tall — so a cue can sit on its own row, no card is nearer to a row
 * it does not map to, and each connector is a straight line rather than an S
 * looking for an excuse.
 */
const CUE_CENTER_Y = HERO_CUES.map((cue) => rowCenterY(cue.targetRow));

/* ------------------------------------------------------------- connectors */

/**
 * One connector per cue: out of the card's left edge, through the corridor,
 * into the right boundary of that row, closed by a small endpoint node.
 *
 * Section 9 forbids oversized arrowheads, animated particles, glowing tubes,
 * and a line spiderweb.
 */
function Connectors() {
  const cardEdge = SHEET_W + CORRIDOR; // left edge of the cue column
  const sheetEdge = SHEET_W;

  return (
    <svg
      width={TOTAL_W}
      height={SHEET_H}
      viewBox={`0 0 ${TOTAL_W} ${SHEET_H}`}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0"
    >
      {HERO_CUES.map((cue, i) => {
        const cy = CUE_CENTER_Y[i];
        const ry = rowCenterY(cue.targetRow);
        return (
          <g key={cue.event}>
            <path
              d={`M ${cardEdge} ${cy} L ${cardEdge - 24} ${cy} C ${cardEdge - 44} ${cy} ${sheetEdge + 20} ${ry} ${sheetEdge + 16} ${ry} L ${sheetEdge} ${ry}`}
              fill="none"
              stroke="var(--color-blotter-400)"
              strokeWidth="1.25"
            />
            <circle cx={sheetEdge} cy={ry} r="2.75" fill="var(--color-blotter-400)" />
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------- ownership labels */

/**
 * Section 11: one thin region line below each column group, aligned precisely
 * with that group's horizontal span, small vertical end ticks, label centred
 * beneath, gray for the manual zone and the Blotter yellow family for the
 * maintained zone. Not braces, not banners, and never above the sheet.
 *
 * The ticks rise from the line toward the columns they mark.
 */
function OwnershipLabel({
  left,
  width,
  lead,
  rest,
  tone,
}: {
  left: number;
  width: number;
  lead: string;
  rest: string;
  tone: "manual" | "maintained";
}) {
  const line =
    tone === "maintained"
      ? "border-blotter-400"
      : "border-ink-faint";
  const text = tone === "maintained" ? "text-blotter-700" : "text-ink-muted";

  return (
    <div className="absolute top-0" style={{ left, width }}>
      <div className={`h-[7px] border-x border-b ${line}`} />
      {/*
        The space between the two spans is a real space, not margin, so the
        rendered text is exactly `YOU add the contacts` when read or copied.
      */}
      <div className={`mt-2.5 text-center text-[13px] ${text}`}>
        <span className="font-semibold tracking-[0.14em]">{lead}</span>{" "}
        <span className="ml-0.5">{rest}</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- module */

/**
 * Scale wrapper. The inner module keeps its true 1322px geometry; the wrapper
 * reserves the scaled footprint so surrounding layout stays honest.
 *
 * **This file deliberately imports no layout module.** `page-box.tsx` derives
 * `PAGE_BOX_W` from `TOTAL_W` and `VISUAL_SCALE` here, so anything this file
 * imports from `components/layout/` closes a cycle, and `PAGE_BOX_W` is
 * computed at module load — a partially initialised cycle resolves it to `NaN`
 * rather than failing loudly. The responsive fitting therefore happens one
 * level up, in `sections/hero.tsx`, which wraps `HeroVisualModule` in `Fit`.
 * This wrapper stays for any caller that wants the module at a pinned scale.
 */
export function HeroVisual({ scale = VISUAL_SCALE }: { scale?: number }) {
  return (
    <div
      className="mx-auto"
      style={{ width: TOTAL_W * scale, height: MODULE_H * scale }}
    >
      <div
        style={{
          width: TOTAL_W,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <HeroVisualModule />
      </div>
    </div>
  );
}

/** Untransformed module at its ratified geometry. */
export function HeroVisualModule({ labels = false }: { labels?: boolean } = {}) {
  return (
    <div className="relative" style={{ width: TOTAL_W }}>
      {/* Sheet, cues and connectors share one coordinate space. */}
      <div className="relative" style={{ height: SHEET_H }}>
        <div className="absolute top-0 left-0" style={{ width: SHEET_W }}>
          <SheetWindow
            selectedCell="E2"
            formulaValue="Replied"
            columnLetters={["A", "B", "C", "E", "F", "G", "H", "I"]}
            columnWidths={HERO_COLUMNS.map((c) => c.width ?? "flex-1")}
            /* D is `Email`, hidden. J and K run off the right edge, which is
               what a window narrower than its sheet does and needs no mark. */
            hiddenAfter={["C"]}
            tabs={[
              { label: "Start here" },
              { label: "Contacts", active: true },
              { label: "Found" },
              { label: "Settings" },
            ]}
          >
            <SheetGrid columns={HERO_COLUMNS} rows={HERO_ROWS} zoneSplit={ZONE_SPLIT} />
          </SheetWindow>
        </div>

        <Connectors />

        {HERO_CUES.map((cue, i) => (
          <div
            key={cue.event}
            className="absolute -translate-y-1/2"
            style={{ left: SHEET_W + CORRIDOR, top: CUE_CENTER_Y[i], width: CUE_W }}
          >
            <ActivityCueCard cue={cue} />
          </div>
        ))}
      </div>

      {/*
        Ownership underlines, clear of the tab strip and lower chrome.

        **Off by default since August 11, 2026.** Jon cut them: 13px centred
        type on a page whose theme rule is to centre nothing, sitting below the
        whole Sheets window rather than below the columns they name. `01-HERO`
        §11 requires them, so this is his override, and `06` carries it.

        The code stays because this module is now the hero's *settled* state —
        what reduced motion gets instead of the film — and a caller that wants
        the ratified composition whole can still ask for it.
      */}
      {labels && (
        <div
          className="relative"
          style={{ marginTop: LABEL_GAP, height: LABEL_BLOCK }}
        >
          <OwnershipLabel
            left={GUTTER}
            width={MANUAL_W}
            lead="YOU"
            rest="add the contacts"
            tone="manual"
          />
          <OwnershipLabel
            left={GUTTER + MANUAL_W}
            width={MAINTAINED_W}
            lead="BLOTTER"
            rest="keeps them current"
            tone="maintained"
          />
        </div>
      )}
    </div>
  );
}
