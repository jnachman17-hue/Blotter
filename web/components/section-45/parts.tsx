/**
 * Shared parts for the merged Sections 4 and 5.
 *
 * Jon merged the two sections on August 5, 2026. The page was carrying three
 * separate Google Sheets windows and the reader files them as one repeated
 * idea; the two beats here are two tabs of one file, which is what the product
 * actually is. `Contacts` sitting untouched in the tab strip is itself the
 * preservation proof.
 *
 * Overrides, all his, all recorded rather than smuggled:
 *   `04-SECTION-4` §6  the formal-exact PNG is discarded outright.
 *   `04-SECTION-4` §13 its exclusions fall wholesale with it — they existed to
 *                      protect that asset.
 *   `05-SECTION-5` §9  zone labels may sit outside the sheet at full size.
 *   `05-SECTION-5` §10 the two sections are one, so the separate composition
 *                      and section boundary go.
 *
 * Not overridden, and obeyed here: the Sheets chrome stays exactly as the hero
 * establishes it, all copy is verbatim, the counts reconcile at 6 + 11 + 4 = 21,
 * and nothing animates.
 */

"use client";

import { Fit } from "@/components/layout/fit";
import { SheetWindow } from "@/components/sheet/sheet-window";
import { StatusChip } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import {
  OUTSTANDING_GROUPS,
  OUTSTANDING_TOTAL,
  REASSURANCE,
  TRACKER_CONTACTS,
} from "@/lib/sheet-data";

/* ------------------------------------------------------------------ geometry */

const YOURS = [
  { header: "Name", w: 112 },
  { header: "Title", w: 116 },
  { header: "Firm", w: 132 },
  { header: "Email", w: 196 },
  { header: "LinkedIn", w: 84 },
];
const MAINTAINED = [
  { header: "Status", w: 128 },
  { header: "Next move", w: 142 },
  { header: "Last contact", w: 104 },
  { header: "Days", w: 52 },
  { header: "Call", w: 112 },
];
const GUTTER = 43;
const YOURS_W = YOURS.reduce((n, c) => n + c.w, 0);
const MAINT_W = MAINTAINED.reduce((n, c) => n + c.w, 0);
const SHEET_W = GUTTER + YOURS_W + MAINT_W;
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

/**
 * The maintained fill.
 *
 * Carried down every maintained cell rather than stopping at the header band,
 * which is where the hero and Section 3 stop it. Ratified by Jon on August 5,
 * 2026: this section's job is the ownership split itself, and an area reads
 * faster than an edge. Dropped two shades from the first pass on his note that
 * it was too much in your face.
 */
const MAINTAINED_FILL = "#fdfaf2";

const TABS_BLOTTER = [{ label: "Contacts" }, { label: "Blotter", active: true }, { label: "Outstanding" }];
const TABS_OUT = [{ label: "Contacts" }, { label: "Blotter" }, { label: "Outstanding", active: true }];

/* ------------------------------------------------------------------- helpers */

/*
 * `Fit` used to live here, hard-coded to `PAGE_BOX_W`, which is why this
 * section was 1124px wide inside a 375px phone. It now measures the width it
 * is given and is shared with the hero and Section 3 —
 * `components/layout/fit.tsx`. On desktop the measurement is 1124px, so this
 * section's scale is unchanged to the pixel. Re-exported because the two beats
 * below and `tracker-and-actions.tsx` import it from here.
 */
export { Fit };

function Gut({ n }: { n: number }) {
  return (
    <div className="w-[43px] shrink-0 border-r border-sheet-grid bg-sheet-header py-2 text-center text-[12px] text-ink-muted">
      {n}
    </div>
  );
}

/* -------------------------------------------------------- the reassurance row */

const CLAY = "#b4705a";
const GLYPH_STROKE = "#1b3050";

/**
 * Two of the three claims are things the reader does not have to do, so those
 * carry the strike; keeping the tracker is not a refusal, so it does not.
 *
 * The strike is drawn twice — once wide in the tile's own colour to knock a
 * channel through the artwork, then thin in clay on top. Without the knockout
 * the two merge at this size and the glyph turns to mush.
 */
function Mark({ tint, strike, children }: { tint: string; strike?: boolean; children: React.ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GLYPH_STROKE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
      {strike && <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={tint} strokeWidth="4.6" />}
      {strike && <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={CLAY} strokeWidth="1.9" />}
    </svg>
  );
}

const CLAIMS = [
  {
    label: REASSURANCE[0],
    tint: "#e6edf8",
    strike: false,
    /* The sheet you already have, kept. */
    art: <><rect x="4" y="3.2" width="16" height="17.6" rx="2" /><path d="M4 8.4h16M9.6 8.4v12.4" /></>,
  },
  {
    label: REASSURANCE[1],
    tint: "#f7f1e4",
    strike: true,
    /* Typing every contact in again. */
    art: <><rect x="3" y="6.4" width="18" height="11.2" rx="2" /><path d="M6.4 10h1.2M10.4 10h1.2M14.4 10h1.2M8.4 14h7.2" /></>,
  },
  {
    label: REASSURANCE[2],
    tint: "#ececed",
    strike: true,
    /* Leaving the tool you already use. */
    art: <><path d="M13.6 3.6H5.6a2 2 0 0 0-2 2v12.8a2 2 0 0 0 2 2h8" /><path d="M15.6 8.4 20.4 12l-4.8 3.6M9.6 12h10.4" /></>,
  },
];

/**
 * Three claims, marked and ruled apart, set to the sheet's own width so the row
 * reads as part of the same object.
 *
 * An earlier pass tried to tick each claim to the part of the sheet that proves
 * it. Jon rejected it and he was right twice over: the arithmetic was wrong, so
 * the leaders pointed at nothing, and the honest anchors are scattered anyway —
 * "no switching out of Google Sheets" is proven by the whole window rather than
 * any one part of it.
 */
export function Reassurance() {
  return (
    <Fit width={SHEET_W}>
      <div className="flex items-stretch" style={{ width: SHEET_W }}>
        {CLAIMS.map((c, i) => (
          <div
            key={c.label}
            className={cn(
              "flex flex-1 items-center gap-3 px-8 py-1 first:pl-0 last:pr-0",
              i > 0 && "border-l border-navy-900/[0.13]",
            )}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg" style={{ background: c.tint }}>
              <Mark tint={c.tint} strike={c.strike}>{c.art}</Mark>
            </span>
            <span className="text-[14.5px] leading-snug font-medium text-navy-900">{c.label}</span>
          </div>
        ))}
      </div>
    </Fit>
  );
}

/* ------------------------------------------------ beat 1 · the Blotter tab */

/**
 * The two zone claims, at real size.
 *
 * The hero states the same split in 13px underlines beneath the sheet. Jon
 * ruled on August 5, 2026 that this section has to be far louder, because the
 * split is the whole point of the beat rather than a caption on it.
 */
function ZoneLabels() {
  return (
    <div className="mb-4 flex items-end" style={{ paddingLeft: GUTTER }}>
      <div style={{ width: YOURS_W }}>
        <p className="font-display text-[19px] leading-none font-bold tracking-[-0.01em] text-ink">You add these</p>
        <p className="mt-1.5 text-[12.5px] text-ink-muted">The contacts and context you choose</p>
        <div className="mt-3 h-[10px] border-x-2 border-t-2 border-ink-faint" />
      </div>
      <div style={{ width: MAINT_W }}>
        <p className="font-display text-[19px] leading-none font-bold tracking-[-0.01em] text-blotter-700">Blotter keeps these current</p>
        <p className="mt-1.5 text-[12.5px] text-blotter-700/75">Updated from Gmail and Calendar</p>
        <div className="mt-3 h-[10px] border-x-2 border-t-2 border-blotter-400" />
      </div>
    </div>
  );
}

export function BlotterTab() {
  return (
    <Fit width={SHEET_W}>
      <div style={{ width: SHEET_W }}>
        <ZoneLabels />
        <SheetWindow
          selectedCell="F2"
          formulaValue="Replied"
          columnLetters={LETTERS}
          columnWidths={[...YOURS, ...MAINTAINED].map((c) => c.w)}
          tabs={TABS_BLOTTER}
        >
          <div className="sheet-type text-[13px]">
            <div className="flex border-b border-sheet-grid font-semibold text-ink">
              <Gut n={1} />
              {YOURS.map((c) => (
                <div key={c.header} className="bg-manual-100 px-3 py-2.5" style={{ width: c.w }}>{c.header}</div>
              ))}
              {MAINTAINED.map((c, i) => (
                <div
                  key={c.header}
                  className={cn("bg-blotter-100 px-3 py-2.5", i === 0 && "border-l-[3px] border-l-blotter-400")}
                  style={{ width: c.w }}
                >
                  {c.header}
                </div>
              ))}
            </div>
            {TRACKER_CONTACTS.map((c, r) => (
              <div key={c.name} className="flex border-b border-sheet-grid last:border-b-0">
                <Gut n={r + 2} />
                <div className="px-3 py-2.5 font-medium text-ink" style={{ width: YOURS[0].w }}>{c.name}</div>
                <div className="px-3 py-2.5 text-ink-muted italic" style={{ width: YOURS[1].w }}>{c.title}</div>
                <div className="px-3 py-2.5" style={{ width: YOURS[2].w }}>{c.firm}</div>
                <div className="truncate px-3 py-2.5 text-ink-muted" style={{ width: YOURS[3].w }}>{c.email}</div>
                <div className="px-3 py-2.5" style={{ width: YOURS[4].w }}>
                  <a href="https://www.linkedin.com" className="text-chip-replied-fg underline">Here</a>
                </div>
                <div className="border-l-[3px] border-l-blotter-400 px-2 py-2.5" style={{ width: MAINTAINED[0].w, background: MAINTAINED_FILL }}>
                  <StatusChip status={c.status} />
                </div>
                <div className="px-3 py-2.5" style={{ width: MAINTAINED[1].w, background: MAINTAINED_FILL }}>{c.next}</div>
                <div className="px-3 py-2.5" style={{ width: MAINTAINED[2].w, background: MAINTAINED_FILL }}>{c.last}</div>
                <div className="px-3 py-2.5 text-right" style={{ width: MAINTAINED[3].w, background: MAINTAINED_FILL }}>{c.days}</div>
                <div className="px-3 py-2.5" style={{ width: MAINTAINED[4].w, background: MAINTAINED_FILL }}>{c.call}</div>
              </div>
            ))}
          </div>
        </SheetWindow>
      </div>
    </Fit>
  );
}

/* -------------------------------------------- beat 2 · the Outstanding tab */

/**
 * The groups run as columns rather than stacked bands.
 *
 * Jon rejected two earlier shapes: the ratified asset, whose group label sat on
 * the left with its count stranded at the far right and four of whose six rows
 * were `+N more` placeholders; and a twenty-one-row stack, where each extra row
 * bought nothing.
 *
 * As columns, each count sits at the head of its own column, every one of the
 * twenty-one actions is visible, and the composition argues on its own: the
 * follow-ups column runs nearly twice as long as the others, which is Section
 * 3's silence argument landing again at scale. Thirteen rows rather than
 * twenty-six.
 */
export function OutstandingTab() {
  const colW = Math.floor((SHEET_W - GUTTER) / 3);
  const tallest = Math.max(...OUTSTANDING_GROUPS.map((g) => g.rows.length));
  return (
    <Fit width={SHEET_W}>
      <div style={{ width: SHEET_W }}>
        <SheetWindow
          selectedCell="A1"
          formulaValue="Outstanding actions"
          columnLetters={["A", "B", "C"]}
          columnWidths={[colW, colW, undefined]}
          tabs={TABS_OUT}
        >
          <div className="sheet-type text-[13px]">
            <div className="flex border-b border-sheet-grid">
              <Gut n={1} />
              <div className="flex flex-1 items-baseline gap-3 px-3 py-2.5">
                <span className="text-[19px] font-bold text-ink">Outstanding actions</span>
                <span className="text-[13px] text-ink-muted">{OUTSTANDING_TOTAL} in total</span>
              </div>
            </div>
            <div className="flex border-b-2 border-b-sheet-border">
              <Gut n={2} />
              {OUTSTANDING_GROUPS.map((g, i) => (
                <div
                  key={g.label}
                  className={cn("flex items-center justify-between px-3 py-2.5", i > 0 && "border-l border-sheet-grid")}
                  style={{ width: colW, background: g.tint }}
                >
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <span aria-hidden="true" className="size-[7px] rounded-full" style={{ background: g.rule }} />
                    {g.label}
                  </span>
                  <span className="text-[17px] font-bold" style={{ color: g.rule }}>{g.count}</span>
                </div>
              ))}
            </div>
            {Array.from({ length: tallest }, (_, r) => (
              <div key={r} className="flex border-b border-sheet-grid last:border-b-0">
                <Gut n={r + 3} />
                {OUTSTANDING_GROUPS.map((g, i) => {
                  const row = g.rows[r];
                  return (
                    <div
                      key={g.label}
                      className={cn("px-3 py-[7px]", i > 0 && "border-l border-sheet-grid")}
                      style={{ width: colW }}
                    >
                      {row && (
                        <span className="flex items-baseline gap-2">
                          <span className="font-medium text-ink">{row.who}</span>
                          <span className="text-[11.5px] text-ink-faint">{row.why}</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </SheetWindow>
      </div>
    </Fit>
  );
}
