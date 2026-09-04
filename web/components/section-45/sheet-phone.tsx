/**
 * The Contacts tab, composed for a phone. Two treatments, both live.
 *
 * Authority: `09-page-argument-rework.md` §5, `04-decision-log.md` session 7,
 * and `courier/Code.gs` for what is in the sheet. `05-SECTION-5` §12 governs
 * what any smaller-screen treatment must preserve: every field name, the zone
 * divider, and the distinction between the student's fields and Blotter's.
 *
 * ## Why scaling is not one of the options
 *
 * The desktop sheet is 1,359px natural in 14px Arial. Phone content width is
 * 350px at a 390 viewport, 320px at 360, 280px at 320. Scaling to fit is 0.26
 * and puts the type at 3.6px. §12 permits a deliberate horizontal crop or a
 * controlled internal scroll and forbids scaling "until the text becomes
 * unreadable", so both treatments below do one of the permitted things.
 *
 * ## The trade the two treatments are trading
 *
 * `CROP` drops columns and stays a still frame. `SWIPE` keeps all eleven and
 * gives up the still frame instead.
 *
 * Jon's, August 11, 2026, and the reason `SWIPE` exists at all: the swipe has to
 * *say* it is a swipe, and the gesture should drive the explanation rather than
 * merely reveal columns. So the zone labels ride the scroll at their full
 * ratified size and each zone washes as you reach it — which is Film A's typing
 * beat driven by a thumb. From `social/README.md`: *"The left is filled by the
 * user. The right fills itself. The two gestures mirror, which makes the
 * ownership split happen rather than get asserted by a word underneath the
 * sheet."*
 */

"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { Fit } from "@/components/layout/fit";
import { HiddenMark, SheetWindow } from "@/components/sheet/sheet-window";
import { StatusCell } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import { CONTACTS, type Contact } from "@/components/section-45/parts";

export type PhoneSheetVariant = "crop" | "swipe";

/* ------------------------------------------------------------- zone wording */

/** Desktop's exact wording, unchanged on both treatments. */
const YOURS_LABEL = "You add these";
const YOURS_SUB = "The contacts and context you choose";
const MAINT_LABEL = "Blotter keeps these current";
const MAINT_SUB = "Updated from Gmail and Calendar";

const TABS = [
  { label: "Start here" },
  { label: "Contacts", active: true },
  { label: "Found" },
  { label: "Settings" },
];

/**
 * A closed row is greyed and struck through, every cell of it. It is the one
 * row state that is not a colour in the `Status` cell, so a treatment that
 * dropped it would be dropping a behaviour rather than a column.
 *
 * Applied per cell rather than to the row, because `text-decoration` propagates
 * into descendants and cannot be removed by one — put it on the row and the
 * row-number gutter, which is Sheets' chrome rather than a cell, gets struck
 * through too.
 */
const CLOSED_CELL = "text-ink-faint line-through";

/* =========================================================== the crop ===== */

/**
 * `SheetWindow` hard-codes 43px in its own letter strip, so both treatments
 * pass `columnLetters={[]}` and compose the strip themselves. A 43px strip over
 * a 22px grid puts every letter over the wrong column.
 */
const GUTTER = 22;

interface PhoneCol {
  header: string;
  /** The real letter in the eleven-column sheet. */
  letter: string;
  w: number;
  maintained?: boolean;
  align?: "right";
}

/**
 * Four columns, sized to their own content at 13px Arial rather than scaled
 * down from desktop, so nothing on a phone is a shrunken desktop cell.
 *
 * **Which four, and why the other seven go.** A 375px viewport leaves 335px
 * inside the page gutters. `Name` has to stay or the maintained half is a
 * column of anonymous cells. What is left buys three:
 *
 *   - `Status`, `Days` and `Attempts` are the three cells one event moves
 *     together, which is the claim the whole page makes. Keeping the trio is
 *     what lets a phone reader see a status change and a count change as one
 *     thing rather than two facts in a list.
 *   - `Title`, `Firm` and `Email` are the student's own and say nothing about
 *     what Blotter does. They are the cheapest three to lose and the only three
 *     the reader could have written down themselves.
 *   - `Last contact` is the same fact as `Days` in the form nobody uses. A
 *     student asks how long it has been, not what the date was.
 *   - `Next call` and `Last call` both need a full date-and-time string —
 *     `1/17 @ 2:00 PM` is 142px on the real sheet, or 42% of the viewport for
 *     one cell that is empty on most rows.
 *   - `Closed` is an empty checkbox until somebody ticks it. The struck-through
 *     row says the same thing and costs no width.
 *
 * All eleven are still named, under the sheet, so §12's preservation clause
 * holds.
 */
const COLS: PhoneCol[] = [
  { header: "Name", letter: "A", w: 102 },
  { header: "Status", letter: "E", w: 96, maintained: true },
  { header: "Days", letter: "F", w: 46, maintained: true, align: "right" },
  { header: "Attempts", letter: "H", w: 74, maintained: true, align: "right" },
];

const CROP_W = GUTTER + COLS.reduce((n, c) => n + c.w, 0);
const CROP_YOURS_W = COLS[0].w;
const CROP_MAINT_W = CROP_W - GUTTER - CROP_YOURS_W;

/** Boundaries in the cropped strip with columns collapsed behind them. */
const HIDDEN_AFTER = new Set(["A", "F", "H"]);

/**
 * The seven columns the crop does not show, named so all eleven survive §12.
 *
 * **Unratified copy.** It states no new claim: every field named is in the
 * Contacts headers `courier/Code.gs` writes, and "Also in your tracker" says
 * only that they exist.
 */
const HIDDEN_FIELDS =
  "Also in your tracker: Title, Firm, Email, Last contact, Next call, Last call, Closed.";

/**
 * Desktop's zone-label device at phone scale: a heading sized to its own zone
 * with a bracket rule spanning the columns it names.
 *
 * The first crop replaced this with two text lines beneath the sheet and Jon
 * caught it on August 11, 2026 — a key is not a claim. The labels are small
 * here because the manual zone is one column wide, but they still *point at*
 * their own columns, which is the whole device. The subtitles do not fit and
 * are dropped rather than shrunk into illegibility.
 */
function CropZoneLabels() {
  return (
    <div className="mb-2 flex items-end" style={{ paddingLeft: GUTTER }}>
      <div style={{ width: CROP_YOURS_W }}>
        <p className="font-display text-[11px] leading-tight font-bold tracking-[-0.01em] text-ink">
          {YOURS_LABEL}
        </p>
        <div className="mt-1.5 h-[7px] border-x-2 border-t-2 border-ink-faint" />
      </div>
      <div style={{ width: CROP_MAINT_W }}>
        <p className="font-display text-[11px] leading-tight font-bold tracking-[-0.01em] text-blotter-700">
          {MAINT_LABEL}
        </p>
        <div className="mt-1.5 h-[7px] border-x-2 border-t-2 border-blotter-400" />
      </div>
    </div>
  );
}

function CropValue(c: Contact, header: string) {
  if (header === "Name") return c.name;
  if (header === "Days") return c.days;
  return c.attempts;
}

function CropSheet() {
  return (
    <div>
      <Fit width={CROP_W}>
        <div style={{ width: CROP_W }}>
          <CropZoneLabels />
          <SheetWindow
            selectedCell="E2"
            formulaValue="Replied"
            columnLetters={[]}
            tabs={TABS}
            menuCount={4}
            showSaveState={false}
          >
            <div className="sheet-type text-[13px] leading-[16px]">
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
                    {c.letter}
                    {HIDDEN_AFTER.has(c.letter) && (
                      <HiddenMark edge={i === COLS.length - 1} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex border-b border-sheet-grid font-semibold text-ink">
                <div
                  className="shrink-0 border-r border-sheet-grid bg-sheet-header py-[7px] text-center text-[11px] font-normal text-ink-muted"
                  style={{ width: GUTTER }}
                >
                  1
                </div>
                {COLS.map((c) => (
                  <div
                    key={c.header}
                    className={cn(
                      "shrink-0 px-1.5 py-[7px] whitespace-nowrap",
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

              {CONTACTS.map((c, r) => {
                const fade = c.closed && CLOSED_CELL;
                return (
                  <div key={c.name} className="flex border-b border-sheet-grid last:border-b-0">
                    <div
                      className="shrink-0 border-r border-sheet-grid bg-sheet-header py-[5px] text-center text-[11px] text-ink-muted"
                      style={{ width: GUTTER }}
                    >
                      {r + 2}
                    </div>
                    {COLS.map((col) =>
                      col.header === "Status" ? (
                        <div
                          key={col.header}
                          className={cn("shrink-0 border-l-[3px] border-l-blotter-400", fade)}
                          style={{ width: col.w }}
                        >
                          <StatusCell status={c.status} pad="py-[5px]" />
                        </div>
                      ) : (
                        <div
                          key={col.header}
                          className={cn(
                            "shrink-0 overflow-hidden px-1.5 py-[5px] whitespace-nowrap",
                            col.align === "right" && "text-right",
                            fade,
                          )}
                          style={{ width: col.w }}
                        >
                          {CropValue(c, col.header)}
                        </div>
                      ),
                    )}
                  </div>
                );
              })}
            </div>
          </SheetWindow>
        </div>
      </Fit>
      <p className="mt-2.5 text-[12px] leading-[1.45] text-ink-faint">
        {HIDDEN_FIELDS}
      </p>
    </div>
  );
}

/* ========================================================== the swipe ===== */

/**
 * All eleven columns at `CONTACTS_WIDTHS`, the widths `courier/Code.gs` sets.
 *
 * **This list and `parts.tsx`'s are now one list** — both read the same widths
 * from the same source and both draw the same seven contacts, imported rather
 * than copied. The two used to be hand-kept duplicates with a comment begging
 * whoever changed one to change the other.
 */
const FULL_GUTTER = 43;
const FULL_COLS = [
  { header: "Name", letter: "A", w: 150 },
  { header: "Title", letter: "B", w: 120, italic: true },
  { header: "Firm", letter: "C", w: 150 },
  { header: "Email", letter: "D", w: 190 },
  { header: "Status", letter: "E", w: 132, maintained: true },
  { header: "Days", letter: "F", w: 62, maintained: true, align: "right" },
  { header: "Last contact", letter: "G", w: 108, maintained: true },
  { header: "Attempts", letter: "H", w: 82, maintained: true, align: "right" },
  { header: "Next call", letter: "I", w: 142, maintained: true },
  { header: "Last call", letter: "J", w: 108, maintained: true },
  { header: "Closed", letter: "K", w: 72, closed: true },
];
const FULL_W = FULL_GUTTER + FULL_COLS.reduce((n, c) => n + c.w, 0);
const YOURS_W = FULL_COLS.slice(0, 4).reduce((n, c) => n + c.w, 0);
/** Where the first divider sits in natural coordinates. */
const SPLIT_X = FULL_GUTTER + YOURS_W;

/**
 * `Name` is frozen, which is what `sheet.setFrozenColumns` does on the real
 * sheet and what stops the maintained half being seven rows of anonymous cells.
 *
 * It is white, like every other data row under the `bands` theme, so the fill
 * here is doing one job only: a frozen column has to be opaque or the cells
 * travelling underneath show through it. The heavier right border is the freeze
 * boundary, which Sheets draws too.
 */
const FROZEN_NAME_FILL = "#ffffff";

/**
 * The label band does not move. That is the whole design.
 *
 * ## Why the first two attempts buzzed
 *
 * v1 put the label's `translateX` in React state with a 200ms transition, so
 * every scroll event moved a target the ease had not reached. v2 removed the
 * transition and wrote the transform directly, which was better and **still
 * vibrated**, because the band was inside the scrolling content: the browser
 * paints the content at its new offset, then a scroll handler runs and writes a
 * counter-transform **one frame later**. The label is permanently a frame
 * behind the sheet it sits on, and a one-frame positional lag at 60fps is
 * exactly what a vibration is.
 *
 * There is no way to win that race from JavaScript. The fix is to stop running
 * it.
 *
 * ## What replaces it, and it is Jon's, August 11, 2026
 *
 * > *"Can you just hold that entirely still as you scroll? And then once you
 * > reach a certain threshold, we cross the line of status, then it just
 * > switches to Blotter, and that stays in the centre up top."*
 *
 * The band moves **out of the scroll container** and sits in the sheet's own
 * chrome, below the formula bar and above row 1, where it already appeared to
 * be. Nothing counteracts anything: the element is not in the scrolling
 * subtree, so it cannot lag it.
 *
 * All that is left is a **crossfade on one threshold** — the divider passing
 * the middle of the window, which is the point at which the reader is looking
 * more at Blotter's columns than at their own.
 *
 * `Closed` sits past a second divider at the far right and does not get a third
 * label. It is 72px at the end of a 1,359px sheet, so the window it is visible
 * in is still mostly Blotter's columns, and a label that flickered back on the
 * last 5% of the travel would be lying more often than it told the truth.
 */

function ZoneLabel({
  label,
  sub,
  accent,
  tone,
  active,
}: {
  label: string;
  sub: string;
  accent: string;
  tone: string;
  active: boolean;
}) {
  return (
    <div
      className="zone-label absolute inset-0 flex items-center justify-center gap-2"
      style={{
        opacity: active ? 1 : 0,
        filter: active ? "blur(0px)" : "blur(2px)",
      }}
    >
      <span
        aria-hidden="true"
        className="h-[26px] w-[2px] shrink-0 rounded-full"
        style={{ background: accent }}
      />
      <span className="flex flex-col gap-[3px]">
        <span
          className="text-[12.5px] leading-none font-semibold tracking-[-0.005em] whitespace-nowrap"
          style={{ color: tone }}
        >
          {label}
        </span>
        <span className="text-[11px] leading-none whitespace-nowrap text-ink-muted">
          {sub}
        </span>
      </span>
    </div>
  );
}

/**
 * Both labels are always mounted in the same place; only opacity says which is
 * speaking. Mounting on demand would give the incoming label nothing to fade
 * in at, and would put a layout in the middle of a gesture.
 */
function ZoneBand({ zone }: { zone: "yours" | "maintained" }) {
  return (
    <div className="relative h-[38px] border-b border-sheet-grid bg-white">
      <ZoneLabel
        label={YOURS_LABEL}
        sub={YOURS_SUB}
        accent="var(--color-ink-faint, #a4a8ac)"
        tone="var(--color-ink, #12233d)"
        active={zone === "yours"}
      />
      <ZoneLabel
        label={MAINT_LABEL}
        sub={MAINT_SUB}
        accent="var(--color-blotter-400, #d9b64a)"
        tone="var(--color-blotter-700, #8a6d12)"
        active={zone === "maintained"}
      />
    </div>
  );
}

/**
 * The veil, and it is the whole swipe affordance.
 *
 * Jon's design, August 11, 2026, replacing a pill that said `Swipe`. His note:
 * the cue has to *coach* the gesture rather than label it. So the sheet is
 * veiled ahead of the reader, mildly blurred, denser toward the right edge
 * where the content runs off screen, and the veil recedes as they travel.
 *
 * Four decisions inside it, each load-bearing:
 *
 * **It covers only what is ahead.** The alternative was veiling the visible
 * area too. Blurring what someone is actively reading fights the entire reason
 * the swipe beat the crop — nothing shrunk, nothing dropped, every field
 * legible. Veiling forward instead means a screenshot shows a sharp, readable
 * manual zone with an obviously unfinished right edge, which reads as *there is
 * more* rather than as *this is all there is*.
 *
 * **It takes the colour of the zone it is covering**, so the veil announces
 * what is coming: grey while the manual columns run out, cream once the
 * remainder is Blotter's. The reader learns the split before they arrive at it.
 *
 * **The blur is mild and masked on the same ramp as the tint.** It has to
 * obscure enough to read as "not yet" and little enough that the sheet is
 * plainly a sheet. An opaque panel would hide the fields the swipe exists to
 * show.
 *
 * **The progress is a high-water mark.** Scrolling back does not re-veil what
 * has already been cleared; the cue is instruction, and instruction that
 * repeats after it has been followed is nagging.
 */
const VEIL_TINT: Record<"yours" | "maintained", string> = {
  yours: "rgba(23,42,70,0.20)",
  maintained: "rgba(196,155,40,0.28)",
};

/** Tint and blur share this ramp, so the two never disagree about density. */
const VEIL_RAMP =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.30) 34%, rgba(0,0,0,0.92) 100%)";

function Veil({
  ahead,
  show,
  veilRef,
  coachRef,
}: {
  ahead: "yours" | "maintained";
  show: boolean;
  veilRef: React.RefObject<HTMLDivElement | null>;
  coachRef: React.RefObject<HTMLSpanElement | null>;
}) {
  /*
    Opacity is written by the scroll handler, for the same reason the labels'
    position is: it is a continuous readout, not a state change. Only the tint
    comes through React, because which zone is ahead genuinely is one.

    Clears by 80% travelled — the last stretch needs no coaching — and the words
    go at 22%, because once someone is moving they already know.
  */
  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[64%]"
      style={{ opacity: show ? 1 : 0 }}
    >
      <span
        className="absolute inset-0 backdrop-blur-[2.5px]"
        style={{ maskImage: VEIL_RAMP, WebkitMaskImage: VEIL_RAMP }}
      />
      <span
        className="swipe-veil-tint absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${VEIL_TINT[ahead]} 100%)`,
          transition: "background 300ms ease-out",
        }}
      />
      <span
        ref={coachRef}
        className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2 rounded-full bg-white/80 py-1.5 pr-2.5 pl-3 text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase shadow-[0_1px_4px_rgba(20,24,31,0.12)]"
      >
        Swipe
        <span className="flex items-center gap-[3px]">
          <span className="swipe-dot block size-[3px] rounded-full bg-navy-900" />
          <span className="swipe-dot block size-[3px] rounded-full bg-navy-900" />
          <span className="swipe-dot block size-[3px] rounded-full bg-navy-900" />
        </span>
        <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
          <path
            d="M1 5h9M6.6 1.2 10.4 5l-3.8 3.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

/** A Sheets checkbox, which is what `Closed` holds on the real sheet. */
function Checkbox({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid size-[12px] place-items-center rounded-[2px] align-[-1px]",
        on ? "bg-[#5f6368]" : "border border-[#80868b]",
      )}
    >
      {on && (
        <svg width="8" height="6" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.6 3.3 6 8 1.2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function SwipeSheet() {
  const scroller = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const coach = useRef<HTMLSpanElement>(null);

  /* Only the discrete facts live in React. */
  const [zone, setZone] = useState<"yours" | "maintained">("yours");
  const [scrollable, setScrollable] = useState(false);
  const furthest = useRef(0);

  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;

    function read() {
      const box = scroller.current;
      if (!box) return;
      const left = box.scrollLeft;
      const width = box.clientWidth;
      const max = box.scrollWidth - width;

      const p = max > 0 ? Math.min(1, Math.max(0, left / max)) : 1;
      if (p > furthest.current) furthest.current = p;
      if (veil.current) {
        veil.current.style.opacity = String(
          Math.max(0, 1 - furthest.current / 0.8),
        );
      }
      if (coach.current) {
        coach.current.style.opacity = String(
          Math.max(0, 1 - furthest.current / 0.22),
        );
      }

      /*
        One threshold, and only on the crossing: the divider passing the middle
        of the window. That is the point at which the reader is looking more at
        Blotter's columns than at their own, which is what the label should be
        naming. Jon's, and it replaces a right-edge test that switched as soon
        as the divider was glimpsed.
      */
      const nextZone: "yours" | "maintained" =
        left + width / 2 <= SPLIT_X ? "yours" : "maintained";
      const nextScrollable = max > 8;
      setZone((prev) => (prev === nextZone ? prev : nextZone));
      setScrollable((prev) => (prev === nextScrollable ? prev : nextScrollable));
    }

    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", read);
      ro.disconnect();
    };
  }, []);

  return (
    <SheetWindow
      selectedCell="E2"
      formulaValue="Replied"
      columnLetters={[]}
      tabs={TABS}
      menuCount={4}
      showSaveState={false}
    >
      {/*
        Outside the scroll container, deliberately. Inside it the band had to be
        counter-transformed every frame and was always one frame behind the
        sheet, which is what Jon saw as vibration. Out here it simply does not
        move.
      */}
      <ZoneBand zone={zone} />

      <div className="relative">
        {/*
          Focusable, named, and given a role.

          The swipe is a thumb gesture, and a keyboard has no thumb. Without
          this the maintained half of the sheet — the half the whole section
          exists to show — is simply unreachable without a touchscreen. A
          focusable scroll container gets arrow-key scrolling from the browser
          for free, so the fix is a tab stop and a name rather than a key
          handler of our own.
        */}
        <div
          ref={scroller}
          tabIndex={0}
          role="region"
          aria-label="Your recruiting tracker, scroll sideways for the fields Blotter keeps current"
          className="overflow-x-auto overscroll-x-contain"
          /* The reader is meant to land on the manual zone, so no snapping:
             snap points would fight a gesture whose whole job is continuous
             travel across the divider. */
        >
          <div className="sheet-type text-[13px] leading-[16px]" style={{ width: FULL_W }}>
            <div className="relative">
              {/* Letter strip, scrolling with the grid it labels. */}
              <div className="flex border-b border-sheet-grid bg-sheet-header text-[12px] text-ink-muted">
                <div
                  className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header"
                  style={{ width: FULL_GUTTER }}
                />
                {FULL_COLS.map((c, i) => (
                  <div
                    key={c.letter}
                    className={cn(
                      "shrink-0 border-r border-sheet-grid py-1 text-center last:border-r-0",
                      i === 0 && "sticky z-20 bg-sheet-header",
                    )}
                    style={{ width: c.w, left: i === 0 ? FULL_GUTTER : undefined }}
                  >
                    {c.letter}
                  </div>
                ))}
              </div>

              <div className="flex border-b border-sheet-grid font-semibold text-ink">
                <div
                  className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-[7px] text-center text-[12px] font-normal text-ink-muted"
                  style={{ width: FULL_GUTTER }}
                >
                  1
                </div>
                {FULL_COLS.map((c, i) => (
                  <div
                    key={c.header}
                    className={cn(
                      "shrink-0 px-2 py-[7px] whitespace-nowrap",
                      c.maintained ? "bg-blotter-100" : "bg-manual-100",
                      (c.header === "Status" || c.closed) &&
                        "border-l-[3px] border-l-blotter-400",
                      c.align === "right" && "text-right",
                      c.closed && "text-center",
                      i === 0 && "sticky z-20 border-r border-sheet-grid",
                    )}
                    style={{ width: c.w, left: i === 0 ? FULL_GUTTER : undefined }}
                  >
                    {c.header}
                  </div>
                ))}
              </div>

              {CONTACTS.map((c, r) => {
                const fade = c.closed && CLOSED_CELL;
                return (
                  <div key={c.name} className="flex border-b border-sheet-grid last:border-b-0">
                    <div
                      className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-[5px] text-center text-[12px] text-ink-muted"
                      style={{ width: FULL_GUTTER }}
                    >
                      {r + 2}
                    </div>
                    <div
                      className={cn("sticky z-20 shrink-0 border-r border-sheet-border px-2 py-[5px]", fade || "text-ink")}
                      style={{
                        width: FULL_COLS[0].w,
                        left: FULL_GUTTER,
                        background: FROZEN_NAME_FILL,
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      className={cn("shrink-0 px-2 py-[5px] italic", fade || "text-ink-muted")}
                      style={{ width: FULL_COLS[1].w }}
                    >
                      {c.title}
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px]", fade)} style={{ width: FULL_COLS[2].w }}>
                      {c.firm}
                    </div>
                    <div
                      className={cn("shrink-0 overflow-hidden px-2 py-[5px] whitespace-nowrap", fade || "text-ink-muted")}
                      style={{ width: FULL_COLS[3].w }}
                    >
                      {c.email}
                    </div>
                    <div
                      className={cn("shrink-0 border-l-[3px] border-l-blotter-400", fade)}
                      style={{ width: FULL_COLS[4].w }}
                    >
                      <StatusCell status={c.status} pad="py-[5px]" />
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px] text-right", fade)} style={{ width: FULL_COLS[5].w }}>
                      {c.days}
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px]", fade)} style={{ width: FULL_COLS[6].w }}>
                      {c.lastContact}
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px] text-right", fade)} style={{ width: FULL_COLS[7].w }}>
                      {c.attempts}
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px]", fade)} style={{ width: FULL_COLS[8].w }}>
                      {c.nextCall}
                    </div>
                    <div className={cn("shrink-0 px-2 py-[5px]", fade)} style={{ width: FULL_COLS[9].w }}>
                      {c.lastCall}
                    </div>
                    <div
                      className="shrink-0 border-l-[3px] border-l-blotter-400 px-2 py-[5px] text-center"
                      style={{ width: FULL_COLS[10].w }}
                    >
                      <Checkbox on={c.closed === true} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Veil ahead={zone} show={scrollable} veilRef={veil} coachRef={coach} />
      </div>
    </SheetWindow>
  );
}

/* ------------------------------------------------------------------- entry */

export function SheetPhone({ variant }: { variant: PhoneSheetVariant }) {
  return variant === "swipe" ? <SwipeSheet /> : <CropSheet />;
}
