/**
 * The hero spreadsheet-and-cues visual module.
 *
 * Authority: 01-HERO.md. One current sheet, three activity cues to its right,
 * one direct connector per cue landing on that contact's maintained block, and
 * two ownership underlines below the sheet. Section 12 forbids the stale rear
 * sheet, before-and-after labels, and the vertical engine rail that the
 * ratified PNG still draws between the cues and the sheet.
 *
 * The composition is a fixed 1322px desktop object, matching the section 3
 * allowance of roughly 1240px to 1360px of usable width. Geometry constants
 * below are measured from the approved SheetWindow at its 1006px hero width,
 * not guessed; the connectors depend on them, so they are asserted in one
 * place rather than scattered.
 *
 * Nothing here animates. Section 13 requires the mechanism to read in a static
 * first-load screenshot.
 */

import { SheetWindow } from "@/components/sheet/sheet-window";
import { SheetGrid } from "@/components/sheet/sheet-grid";
import { HERO_COLUMNS, HERO_ROWS, HERO_CUES } from "@/lib/sheet-data";
import { ActivityCueCard } from "./activity-cue";

/* --------------------------------------------------------------- geometry */

/** Sheet window width. Reproduces the ratified hero. */
const SHEET_W = 1006;
/** Sheet window height at the five hero rows. Measured. */
const SHEET_H = 432.5;
/** Distance from the window top to the first pixel of the grid. Measured. */
const GRID_TOP = 127;
/** Uniform grid row height, header included. Measured. */
const ROW_H = 43.5;

/** Row-number gutter width, from SheetWindow. */
const GUTTER = 43;
/** Name through Firm: 108 + 126 + 138. */
const MANUAL_W = 372;
/** Status through Call: 132 + 156 + 112 + 56 + 134. */
const MAINTAINED_W = 590;

/** Connector corridor between the sheet edge and the cue column. */
const CORRIDOR = 80;
const CUE_W = 236;
export const TOTAL_W = SHEET_W + CORRIDOR + CUE_W; // 1322

/**
 * Uniform scale applied to the whole module.
 *
 * Section 3 of 01-HERO fixes the composition's *proportions*, not its pixel
 * count: the reference dimensions are to be treated as relative rather than
 * inflexible. Scaling the module as one object therefore preserves every
 * ratified measurement exactly while letting the complete hero, copy included,
 * land inside a 13-inch MacBook Pro viewport of roughly 1440 by 780.
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
 * Vertical centre of each cue card, measured from the window top.
 *
 * Section 9 asks each cue to sit as close to its target row as practical. The
 * cue rows are 1, 2 and 4 — Sarah Chen, Marcus Lee and Daniel Kim — so an
 * evenly pitched stack is impossible without a card coming to rest level with
 * Priya Shah or Alex Morgan, which would imply a mapping that does not exist.
 * The stack is therefore deliberately uneven.
 *
 * Retuned on August 5, 2026 when Jon swapped the third cue from Alex Morgan to
 * Daniel Kim, moving its target up one row. The old third position, 358, sat
 * 35.25px from Daniel and would have read as pointing at the wrong contact.
 *
 * Row centres are 192.25, 235.75, 279.25, 322.75 and 366.25. Against those,
 * every card still sits within 13px of its own target row and no closer than
 * 35px to any other, so the nearest row to a card is always the row it maps to:
 *
 *   180 -> Sarah  12.25 away, next nearest Marcus at 55.75
 *   243 -> Marcus  7.25 away, next nearest Priya at 36.25
 *   322 -> Daniel  0.75 away, next nearest Priya at 42.75, Alex at 44.25
 */
const CUE_CENTER_Y = [180, 243, 322];

/* ------------------------------------------------------------- connectors */

/**
 * One connector per cue: out of the card's left edge, a shallow S through the
 * corridor, into the right boundary of that row's maintained block, closed by
 * a small endpoint node.
 *
 * Section 9 forbids oversized arrowheads, animated particles, glowing tubes,
 * and a line spiderweb. The three routes never cross: the cards and their
 * target rows are in the same top-to-bottom order.
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
          <g key={cue.primary}>
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
            selectedCell="D2"
            formulaValue="Replied"
            columnLetters={["A", "B", "C", "D", "E", "F", "G", "H"]}
            columnWidths={HERO_COLUMNS.map((c) => c.width ?? "flex-1")}
            tabs={[{ label: "Contacts" }, { label: "Blotter", active: true }]}
          >
            <SheetGrid columns={HERO_COLUMNS} rows={HERO_ROWS} zoneSplit={3} />
          </SheetWindow>
        </div>

        <Connectors />

        {HERO_CUES.map((cue, i) => (
          <div
            key={cue.primary}
            className="absolute -translate-y-1/2"
            style={{ left: SHEET_W + CORRIDOR, top: CUE_CENTER_Y[i] }}
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
        what the film fades into and what reduced motion gets instead of the
        film — and a caller that wants the ratified composition whole can still
        ask for it.
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
