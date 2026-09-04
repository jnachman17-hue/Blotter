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
import { StatusCell, type ProductStatus } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import {
  OUTSTANDING_GROUPS,
  OUTSTANDING_TOTAL,
  REASSURANCE,
} from "@/lib/sheet-data";

/* ------------------------------------------------------------------ geometry */

/**
 * The Contacts tab, at the widths the product actually sets.
 *
 * `CONTACTS_WIDTHS` out of `courier/Code.gs`, verbatim and in header order. No
 * scaling, no fitting to content, no fudge: this section's whole job is to be a
 * picture of the sheet, so the sheet's own numbers are the numbers.
 *
 * They sum to 1,316, which with the 43px row gutter makes the object 1,359px
 * against the page box's 1,124. `Fit` scales the whole thing by 0.827, so the
 * 14px type lands at about 11.6px on screen — a hair under what the ten
 * invented columns used to render at, for three more columns and the real
 * proportions.
 *
 * **The order reads yours, Blotter's, yours.** `Closed` is a checkbox the
 * student ticks, so it goes back to the manual tint on the far side of a second
 * divider, exactly as Code.gs paints it.
 */
const YOURS = [
  { header: "Name", w: 150 },
  { header: "Title", w: 120 },
  { header: "Firm", w: 150 },
  { header: "Email", w: 190 },
];
const MAINTAINED = [
  { header: "Status", w: 132 },
  { header: "Days", w: 62 },
  { header: "Last contact", w: 108 },
  { header: "Attempts", w: 82 },
  { header: "Next call", w: 142 },
  { header: "Last call", w: 108 },
];
const CLOSED = { header: "Closed", w: 72 };

const GUTTER = 43;
const YOURS_W = YOURS.reduce((n, c) => n + c.w, 0);
const MAINT_W = MAINTAINED.reduce((n, c) => n + c.w, 0);
const SHEET_W = GUTTER + YOURS_W + MAINT_W + CLOSED.w;
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

/**
 * Header 30, body 26, at 10pt Arial. Code.gs's `HEADER_ROW_HEIGHT` and
 * `BODY_ROW_HEIGHT`, held as padding against a fixed 17px leading so the two
 * keep their ratio at 14px.
 */
const HEADER_PAD = "py-[7px]";
const BODY_PAD = "py-[5px]";

/**
 * Cells are `px-2`. Sheets leaves about 3px each side, and at `px-3` the real
 * column widths clip their own content — "Vice President" in a 120px `Title` is
 * the first to go.
 */
const CELL_X = "px-2";

/**
 * **The data rows are white, in both zones.** The header band alone carries the
 * tint, and the divider carries the split.
 *
 * This reverses the filled zones ratified on August 11, 2026. Jon ruled the
 * `bands` theme on September 3, 2026 after seeing the filled version on a real
 * sheet: *"I don't want the Blotter side to have the cell highlight colour in
 * the background… however I do like the vertical bars you have that separate
 * sections with colour."* `THEME = 'bands'` in `courier/Code.gs` is that
 * ruling, and it is what a student's sheet looks like, so it is what this
 * draws. The two derived fills that used to live here are gone with it.
 */
const TABS_BLOTTER = [
  { label: "Start here" },
  { label: "Contacts", active: true },
  { label: "Found" },
  { label: "Settings" },
];
const TABS_OUT = [{ label: "Contacts" }, { label: "Blotter" }, { label: "Outstanding", active: true }];

/* --------------------------------------------------------------- the rows */

/**
 * `NO_CLOCK` from Code.gs. An em dash, not a hyphen, and not a blank: a blank
 * cell reads as "Blotter has not run", a dash reads as "there is nothing to
 * count here". A leading hyphen is how you start a formula, which is the other
 * reason it is an em dash.
 */
export const DASH = "—";

export interface Contact {
  name: string;
  title: string;
  firm: string;
  email: string;
  status: ProductStatus;
  /** Every Blotter cell is a string, because a dash is a real value. */
  days: string;
  lastContact: string;
  attempts: string;
  nextCall: string;
  lastCall: string;
  closed?: boolean;
}

/**
 * Seven contacts on January 16, 2026, in the order `Blotter → Sort contacts →
 * By what they are waiting on` leaves them: Replied, Sent, Sent, Bounced, Call
 * done, Call scheduled, Closed, longest-waiting first inside each group.
 *
 * The numbers obey the engine rather than looking plausible. `Days` carries a
 * count on `Sent`, `Replied` and `Call done` and a dash everywhere else, and
 * `Attempts` carries one on `Sent` alone — on `Replied` it is zero by
 * definition, and a bounced address is bounced whether it was guessed at once
 * or three times. A closed row keeps everything it knew and loses only the
 * clock.
 */
export const CONTACTS: Contact[] = [
  {
    name: "Jamie Diamond", title: "Associate", firm: "JPMorgan",
    email: "jamie.diamond@jpmorgan.com",
    status: "Replied", days: "0", lastContact: "1/16/26",
    attempts: DASH, nextCall: "", lastCall: "",
  },
  {
    name: "Jerome Bowel", title: "Analyst", firm: "Carlyle",
    email: "jerome.bowel@carlyle.com",
    /* Not emailed from September 4, 2026, on Jon's ruling. The sheet opened on
       four Sents and a Call done, which showed neither the starting state
       every tracker begins in nor the dash rule. Jerome is the only contact no
       cue touches, so he can hold a state that never moves. */
    status: "Not emailed", days: "—", lastContact: "",
    attempts: "—", nextCall: "", lastCall: "",
  },
  {
    name: "Larry Sync", title: "Associate", firm: "BlackRock",
    email: "larry.sync@blackrock.com",
    status: "Sent", days: "0", lastContact: "1/16/26",
    attempts: "2", nextCall: "", lastCall: "",
  },
  {
    name: "Nathan Cole", title: "Analyst", firm: "Lazard",
    email: "nathan.cole@lazard.com",
    status: "Bounced", days: DASH, lastContact: "1/14/26",
    attempts: DASH, nextCall: "", lastCall: "",
  },
  {
    name: "Ken Molise", title: "Vice President", firm: "Moelis",
    email: "ken.molise@moelis.com",
    status: "Call done", days: "1", lastContact: "1/13/26",
    attempts: DASH, nextCall: "", lastCall: "1/15/26",
  },
  {
    name: "David Salmon", title: "Analyst", firm: "Goldman Sachs",
    email: "david.salmon@gs.com",
    status: "Call scheduled", days: DASH, lastContact: "1/15/26",
    attempts: DASH, nextCall: "1/17 @ 2:00 PM", lastCall: "",
  },
  {
    name: "Priya Raman", title: "Analyst", firm: "Evercore",
    email: "priya.raman@evercore.com",
    status: "Closed", days: DASH, lastContact: "1/9/26",
    attempts: DASH, nextCall: "", lastCall: "1/8/26",
    closed: true,
  },
];

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

function Gut({ n, pad = "py-2" }: { n: number; pad?: string }) {
  return (
    <div className={cn("w-[43px] shrink-0 border-r border-sheet-grid bg-sheet-header text-center text-[12px] text-ink-muted", pad)}>
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

/**
 * The same three claims, stacked, for a phone.
 *
 * Three across at sheet width is 116px per claim at 350, which wraps every
 * label to three lines. Jon asked on August 11, 2026 to see them stacked.
 *
 * Same glyphs, same tints, same order, same copy — only the axis changes, so
 * the claim and its evidence are untouched. The hairline moves from between the
 * columns to between the rows for the same reason: it is what separates three
 * statements from one paragraph.
 */
export function ReassuranceStack() {
  return (
    <ul className="flex flex-col">
      {CLAIMS.map((c, i) => (
        <li
          key={c.label}
          className={cn(
            "flex items-center gap-3 py-2",
            i > 0 && "border-t border-navy-900/[0.10]",
          )}
        >
          <span
            className="grid size-8 shrink-0 place-items-center rounded-lg"
            style={{ background: c.tint }}
          >
            <Mark tint={c.tint} strike={c.strike}>
              {c.art}
            </Mark>
          </span>
          <span className="text-[14.5px] leading-snug font-medium text-navy-900">
            {c.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------ beat 1 · the Contacts tab */

/**
 * How this section names its two zones. Three treatments, August 11, 2026.
 *
 * ## Why the ratified one is being replaced
 *
 * Jon, seeing it at width: *"terrible UI that isn't presented well is hard to
 * read."* He had already used that judgement to cut the hero's version of the
 * same device, and the two cannot be defended differently.
 *
 * **The measured reason it fails, which is not the one first offered.** The
 * labels do not sit above the columns they name. They sit above the whole
 * Google Sheets *window* — and between the label and the first cell there is a
 * title bar, a menu row, a formula bar and a row of column letters, roughly
 * 100px of unrelated chrome. A 1px bracket with 10px end ticks is being asked
 * to reach across all of that. It cannot, so the label floats and reads as
 * page furniture rather than as part of the object.
 *
 * That is why moving the label *inside* the sheet is the fix, and why
 * restyling the bracket would not have been.
 *
 * ## The second reason, which is the rework's own argument
 *
 * After `09` §4's headline arrangement lands, this section carries the deck
 * *"You manage the relationships. Blotter maintains the moving parts."* one
 * section-width above the sheet. That is what `You add these` and
 * `Blotter keeps these current` say. The supporting paragraph ends *"from Gmail
 * and Calendar"*, which is what the right-hand sublabel says. **The labels
 * became a restatement of the sentences directly above them**, which is the
 * fault this whole rework exists to remove.
 *
 * | | |
 * |---|---|
 * | `none` | No labels. The header band, the 3px divider and the deck carry the split |
 * | `banner` | A merged banner row **inside** the sheet, directly above the column headers, filled with each zone's own colour |
 * | `banner-sub` | The same, keeping the two subtitles |
 * | `above` | The ratified treatment, kept so the review route can show what was replaced |
 */
export type ZoneTreatment = "none" | "banner" | "banner-sub" | "above";

/**
 * `Closed` gets a third band with the manual tint and no words in it.
 *
 * 72px holds no label, and it does not need one: the second yellow rule says
 * the sheet has crossed back over. Code.gs makes the same point in a comment —
 * *"The sheet reads yours, Blotter's, yours — which is what it actually is."*
 */
function ZoneLabelsAbove() {
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
      <div style={{ width: CLOSED.w }}>
        <div className="mt-3 h-[10px] border-x-2 border-t-2 border-ink-faint" />
      </div>
    </div>
  );
}

/**
 * The merged banner row.
 *
 * Two merged cells above the column headers, each filled with its own zone's
 * colour and carrying that zone's name, plus a third over `Closed`. This is
 * what a person actually does in Sheets to label a column group, so it costs
 * nothing in `04-SECTION-4` §12's "recognisable Google Sheets context" — it
 * adds to it.
 *
 * It takes row number 1 and the headers become row 2, exactly as a real merged
 * banner would, which is why `BlotterTab` moves its selected cell to `E3`.
 *
 * Both 3px rules run through the banner as well as the header row, so each
 * ownership boundary is a single unbroken vertical from the top of the grid to
 * the bottom rather than starting one row down.
 */
function ZoneBanner({ withSub }: { withSub: boolean }) {
  const pad = withSub ? "py-2" : "py-2.5";
  return (
    <div className="flex border-b border-sheet-grid font-semibold">
      <Gut n={1} />
      <div className={cn("bg-manual-100 px-3", pad)} style={{ width: YOURS_W }}>
        <span className="font-display text-[15px] leading-tight font-bold tracking-[-0.01em] text-ink">
          You add these
        </span>
        {withSub && (
          <span className="ml-2 text-[12px] font-normal text-ink-muted">
            The contacts and context you choose
          </span>
        )}
      </div>
      <div
        className={cn("border-l-[3px] border-l-blotter-400 bg-blotter-100 px-3", pad)}
        style={{ width: MAINT_W }}
      >
        <span className="font-display text-[15px] leading-tight font-bold tracking-[-0.01em] text-blotter-700">
          Blotter keeps these current
        </span>
        {withSub && (
          <span className="ml-2 text-[12px] font-normal text-blotter-700/75">
            Updated from Gmail and Calendar
          </span>
        )}
      </div>
      <div
        className={cn("border-l-[3px] border-l-blotter-400 bg-manual-100", pad)}
        style={{ width: CLOSED.w }}
      />
    </div>
  );
}

/**
 * The checkbox in the `Closed` column.
 *
 * A real Sheets checkbox, which is what Code.gs inserts there — not a tick
 * glyph and not a word. Ticking it is the one thing a student does inside
 * Blotter's half of the sheet, and it is the reason the column sits on the far
 * side of a second divider.
 */
function Checkbox({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-[13px] place-items-center rounded-[2px] align-[-2px]",
        on ? "bg-[#5f6368]" : "border border-[#80868b]",
      )}
    >
      {on && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.6 3.3 6 8 1.2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export function BlotterTab({ zones = "none" }: { zones?: ZoneTreatment }) {
  const banner = zones === "banner" || zones === "banner-sub";
  /* The banner takes row 1, so every row below it shifts by one and the
     formula bar has to follow. Jamie Diamond's status is the ratified
     selection; `Status` is column E now that `LinkedIn` is gone. */
  const rowOffset = banner ? 1 : 0;

  return (
    <Fit width={SHEET_W}>
      <div style={{ width: SHEET_W }}>
        {zones === "above" && <ZoneLabelsAbove />}
        <SheetWindow
          selectedCell={banner ? "E3" : "E2"}
          formulaValue="Replied"
          columnLetters={LETTERS}
          columnWidths={[...YOURS, ...MAINTAINED, CLOSED].map((c) => c.w)}
          tabs={TABS_BLOTTER}
        >
          <div className="sheet-type text-[14px] leading-[17px]">
            {banner && <ZoneBanner withSub={zones === "banner-sub"} />}

            <div className="flex border-b border-sheet-grid font-semibold text-ink">
              <Gut n={1 + rowOffset} pad={HEADER_PAD} />
              {YOURS.map((c) => (
                <div key={c.header} className={cn("bg-manual-100", CELL_X, HEADER_PAD)} style={{ width: c.w }}>{c.header}</div>
              ))}
              {MAINTAINED.map((c, i) => (
                <div
                  key={c.header}
                  className={cn(
                    "bg-blotter-100",
                    CELL_X,
                    HEADER_PAD,
                    i === 0 && "border-l-[3px] border-l-blotter-400",
                    (c.header === "Days" || c.header === "Attempts") && "text-right",
                  )}
                  style={{ width: c.w }}
                >
                  {c.header}
                </div>
              ))}
              <div
                className={cn("border-l-[3px] border-l-blotter-400 bg-manual-100 text-center", CELL_X, HEADER_PAD)}
                style={{ width: CLOSED.w }}
              >
                {CLOSED.header}
              </div>
            </div>

            {CONTACTS.map((c, r) => {
              /* A closed row is greyed and struck through, every cell of it.
                 The strike says the relationship is finished; the fade stops it
                 competing with the rows that still want something.

                 Per cell rather than on the row: `text-decoration` propagates
                 into descendants and cannot be removed by one, so a strike on
                 the row would cross out the row-number gutter, which is Sheets'
                 chrome rather than a cell. */
              const fade = c.closed && "text-ink-faint line-through";
              return (
                <div key={c.name} className="flex border-b border-sheet-grid last:border-b-0">
                  <Gut n={r + 2 + rowOffset} pad={BODY_PAD} />
                  <div className={cn(CELL_X, BODY_PAD, fade)} style={{ width: YOURS[0].w }}>{c.name}</div>
                  <div className={cn("italic", fade || "text-ink-muted", CELL_X, BODY_PAD)} style={{ width: YOURS[1].w }}>{c.title}</div>
                  <div className={cn(CELL_X, BODY_PAD, fade)} style={{ width: YOURS[2].w }}>{c.firm}</div>
                  {/* Sheets clips an overlong cell rather than growing the row,
                      and it clips without an ellipsis. */}
                  <div className={cn("overflow-hidden whitespace-nowrap", fade || "text-ink-muted", CELL_X, BODY_PAD)} style={{ width: YOURS[3].w }}>{c.email}</div>
                  <div className={cn("border-l-[3px] border-l-blotter-400", fade)} style={{ width: MAINTAINED[0].w }}>
                    <StatusCell status={c.status} pad={BODY_PAD} />
                  </div>
                  <div className={cn("text-right", CELL_X, BODY_PAD, fade)} style={{ width: MAINTAINED[1].w }}>{c.days}</div>
                  <div className={cn(CELL_X, BODY_PAD, fade)} style={{ width: MAINTAINED[2].w }}>{c.lastContact}</div>
                  <div className={cn("text-right", CELL_X, BODY_PAD, fade)} style={{ width: MAINTAINED[3].w }}>{c.attempts}</div>
                  <div className={cn(CELL_X, BODY_PAD, fade)} style={{ width: MAINTAINED[4].w }}>{c.nextCall}</div>
                  <div className={cn(CELL_X, BODY_PAD, fade)} style={{ width: MAINTAINED[5].w }}>{c.lastCall}</div>
                  <div
                    className={cn("border-l-[3px] border-l-blotter-400 text-center", CELL_X, BODY_PAD)}
                    style={{ width: CLOSED.w }}
                  >
                    <Checkbox on={c.closed === true} />
                  </div>
                </div>
              );
            })}
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
