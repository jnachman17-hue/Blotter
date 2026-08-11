/**
 * The Blotter tab, composed for a phone. Two treatments, both live.
 *
 * Authority: `09-page-argument-rework.md` §5, and `04-decision-log.md` session
 * 7. `05-SECTION-5` §12 governs what any smaller-screen treatment must
 * preserve: all ten field names, the LinkedIn-to-Status divider, and the
 * distinction between the existing fields and the Blotter-maintained layer.
 *
 * ## Why scaling is not one of the options
 *
 * The desktop sheet is 1,221px natural in 13px Arial. Phone content width is
 * 350px at a 390 viewport, 320px at 360, 280px at 320. Scaling to fit is 0.287
 * and puts the type at 3.7px. §12 permits a deliberate horizontal crop or a
 * controlled internal scroll and forbids scaling "until the text becomes
 * unreadable", so both treatments below do one of the permitted things.
 *
 * ## The trade the two treatments are trading
 *
 * `05-SECTION-5`'s amendment table holds the column order fixed, so `Status`
 * cannot be moved beside `Name`. The divider sits 683px in, 56% across the
 * sheet, and the only columns between `Name` and it are `Title`, `Firm`,
 * `Email` and `LinkedIn`. **Getting the divider on screen at rest costs exactly
 * those four**, and with them the spatial zone labels: after cropping, the
 * manual zone is 94px and cannot hold "You add these".
 *
 * `CROP` pays that and keeps a still frame that argues.
 * `SWIPE` refuses to pay it and gives up the still frame instead.
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

import { useCallback, useEffect, useRef, useState } from "react";

import { Fit } from "@/components/layout/fit";
import { SheetWindow } from "@/components/sheet/sheet-window";
import { StatusChip } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import { TRACKER_CONTACTS } from "@/lib/sheet-data";

export type PhoneSheetVariant = "crop" | "swipe";

/* ------------------------------------------------------------- zone wording */

/** Desktop's exact wording, unchanged on both treatments. */
const YOURS_LABEL = "You add these";
const YOURS_SUB = "The contacts and context you choose";
const MAINT_LABEL = "Blotter keeps these current";
const MAINT_SUB = "Updated from Gmail and Calendar";

/** Unchanged from `parts.tsx`. The cream is the ownership claim at rest. */
const MAINTAINED_FILL = "#fdfaf2";

const TABS = [
  { label: "Contacts" },
  { label: "Blotter", active: true },
  { label: "Outstanding" },
];

/* =========================================================== the crop ===== */

/**
 * `SheetWindow` hard-codes 43px in its own letter strip, so both treatments
 * pass `columnLetters={[]}` and compose the strip themselves. A 43px strip over
 * a 22px grid puts every letter over the wrong column.
 */
const GUTTER = 22;

interface PhoneCol {
  header: string;
  /** The real letter in the ten-column sheet. Order is fixed by spec. */
  letter: string;
  w: number;
  maintained?: boolean;
  align?: "right";
}

/*
 * Fitted to content at 13px Arial rather than scaled down from desktop: `Name`
 * holds "Alex Morgan" unwrapped, `Status` holds the "Call completed" chip,
 * `Next move` holds "Attend coffee chat", and `Days` holds its own header,
 * which is wider than any value in it.
 */
const COLS: PhoneCol[] = [
  { header: "Name", letter: "A", w: 94 },
  { header: "Status", letter: "F", w: 112, maintained: true },
  { header: "Next move", letter: "G", w: 120, maintained: true },
  { header: "Days", letter: "I", w: 46, maintained: true, align: "right" },
];

const CROP_W = GUTTER + COLS.reduce((n, c) => n + c.w, 0);
const CROP_YOURS_W = COLS[0].w;
const CROP_MAINT_W = CROP_W - GUTTER - CROP_YOURS_W;

/** Boundaries in the cropped strip with columns collapsed behind them. */
const HIDDEN_AFTER = new Set(["A", "G", "I"]);

/**
 * The six columns the crop does not show, named so all ten survive §12.
 *
 * **Unratified copy.** Logged in `08-desktop-changes-pending.md` §9. It states
 * no new claim: every field named is already in `05-SECTION-5` §6's fixed
 * column list, and "Also in your tracker" says only that they exist.
 */
const HIDDEN_FIELDS =
  "Also in your tracker: Title, Firm, Email, LinkedIn, Last contact, Call.";

/**
 * Google Sheets' own hidden-column indicator: two arrowheads facing each other
 * across the boundary where columns were collapsed. Absolutely positioned so it
 * costs no layout width, which keeps the strip aligned with its grid.
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

/**
 * Desktop's zone-label device at phone scale: a heading sized to its own zone
 * with a bracket rule spanning the columns it names.
 *
 * The first crop replaced this with two text lines beneath the sheet and Jon
 * caught it on August 11, 2026 — a key is not a claim. The labels are small
 * here because the manual zone is 94px, but they still *point at* their own
 * columns, which is the whole device. The subtitles do not fit at 94px and are
 * dropped rather than shrunk into illegibility.
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

function CropSheet() {
  return (
    <div>
      <Fit width={CROP_W}>
        <div style={{ width: CROP_W }}>
          <CropZoneLabels />
          <SheetWindow
            selectedCell="F2"
            formulaValue="Replied"
            columnLetters={[]}
            tabs={TABS}
            menuCount={4}
            showSaveState={false}
          >
            <div className="sheet-type text-[13px]">
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
                  className="shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[11px] font-normal text-ink-muted"
                  style={{ width: GUTTER }}
                >
                  1
                </div>
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
                  <div
                    className="shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[11px] text-ink-muted"
                    style={{ width: GUTTER }}
                  >
                    {r + 2}
                  </div>
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
      <p className="mt-2.5 text-[12px] leading-[1.45] text-ink-faint">
        {HIDDEN_FIELDS}
      </p>
    </div>
  );
}

/* ========================================================== the swipe ===== */

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
const YOURS_W = FULL_COLS.slice(0, 5).reduce((n, c) => n + c.w, 0);
const MAINT_W = FULL_COLS.slice(5).reduce((n, c) => n + c.w, 0);
/** Where the divider sits in natural coordinates. */
const SPLIT_X = FULL_GUTTER + YOURS_W;

/**
 * `Name` is frozen, and it keeps its own zone tint while frozen.
 *
 * Freezing it is what real Sheets users do and it is what stops the maintained
 * half being five rows of anonymous cells — "Send thank-you" with no name
 * attached is not evidence of anything.
 *
 * The tint is the part that matters to the argument. A frozen manual column
 * sitting inside the cream "Blotter keeps these current" wash would say a
 * manual field is maintained, which is the one thing this section exists to
 * deny. So `Name` renders above both washes and carries the manual tint
 * permanently: wherever you swipe to, the column that stays with you is
 * visibly yours.
 */
const FROZEN_NAME_FILL = "#f6f8fb";

/**
 * How far the reader has travelled, and which zone is ahead of them.
 *
 * `zone` drives two different things and they want opposite readings, which is
 * why it is computed from the **right edge** rather than from the middle. The
 * veil covers what is ahead, so it should take the colour of the zone the
 * reader is about to meet; the labels dim the one they have left. Right-edge
 * ownership gives both: the veil turns cream slightly before the divider
 * arrives, which is the point at which telling someone what is coming is
 * useful rather than redundant.
 *
 * `progress` is a **high-water mark**. Scrolling back does not put the veil
 * back, because a cue that repeats after it has been followed is nagging.
 */
function useActiveZone(ref: React.RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState({
    zone: "yours" as "yours" | "maintained",
    progress: 0,
    scrollable: false,
  });
  const furthest = useRef(0);

  const read = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const scrollable = max > 8;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 1;
    if (p > furthest.current) furthest.current = p;
    const rightEdge = el.scrollLeft + el.clientWidth;
    const zone: "yours" | "maintained" =
      rightEdge <= SPLIT_X ? "yours" : "maintained";
    setState((prev) =>
      prev.zone === zone &&
      prev.scrollable === scrollable &&
      Math.abs(prev.progress - furthest.current) < 0.004
        ? prev
        : { zone, progress: furthest.current, scrollable },
    );
  }, [ref]);

  useEffect(() => {
    read();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", read);
      ro.disconnect();
    };
  }, [read, ref]);

  return state;
}

/**
 * The two zone labels at their full ratified size, riding the scroll.
 *
 * This is desktop's own composition — a heading and subtitle sized to the zone,
 * over a bracket rule spanning its columns — reachable on a phone because the
 * sheet is at 1:1 rather than scaled. The label is `sticky` so it stays on
 * screen while any part of its zone is, instead of sliding away at the moment
 * the reader is reading the columns it names.
 */
function ZoneBand({ zone }: { zone: "yours" | "maintained" }) {
  return (
    <div className="mb-3 flex items-end" style={{ paddingLeft: FULL_GUTTER }}>
      <div style={{ width: YOURS_W }}>
        <div
          className="sticky left-0 transition-opacity duration-300"
          style={{ opacity: zone === "yours" ? 1 : 0.4 }}
        >
          <p className="font-display text-[19px] leading-none font-bold tracking-[-0.01em] text-ink">
            {YOURS_LABEL}
          </p>
          <p className="mt-1.5 text-[12.5px] text-ink-muted">{YOURS_SUB}</p>
        </div>
        <div className="mt-3 h-[10px] border-x-2 border-t-2 border-ink-faint" />
      </div>
      <div style={{ width: MAINT_W }}>
        <div
          className="sticky left-0 transition-opacity duration-300"
          style={{ opacity: zone === "maintained" ? 1 : 0.4 }}
        >
          <p className="font-display text-[19px] leading-none font-bold tracking-[-0.01em] text-blotter-700">
            {MAINT_LABEL}
          </p>
          <p className="mt-1.5 text-[12.5px] text-blotter-700/75">{MAINT_SUB}</p>
        </div>
        <div className="mt-3 h-[10px] border-x-2 border-t-2 border-blotter-400" />
      </div>
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
 * more* rather than as *this is all there is*. That is a better still frame
 * than the flat wash it replaces, and it recovers a cost recorded against the
 * swipe in `09` §5.
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
  progress,
  ahead,
  show,
}: {
  progress: number;
  ahead: "yours" | "maintained";
  show: boolean;
}) {
  /* Fully clear by 80% travelled: the last stretch needs no coaching. */
  const veilOpacity = show ? Math.max(0, 1 - progress / 0.8) : 0;
  /* The words go earlier than the veil. Once someone is moving they know. */
  const coachOpacity = show ? Math.max(0, 1 - progress / 0.22) : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[64%]"
      style={{ opacity: veilOpacity, transition: "opacity 220ms ease-out" }}
    >
      <span
        className="absolute inset-0 backdrop-blur-[2.5px]"
        style={{ maskImage: VEIL_RAMP, WebkitMaskImage: VEIL_RAMP }}
      />
      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${VEIL_TINT[ahead]} 100%)`,
          transition: "background 300ms ease-out",
        }}
      />
      <span
        className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2 rounded-full bg-white/80 py-1.5 pr-2.5 pl-3 text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap text-navy-900 uppercase shadow-[0_1px_4px_rgba(20,24,31,0.12)]"
        style={{ opacity: coachOpacity, transition: "opacity 220ms ease-out" }}
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

function SwipeSheet() {

  const scroller = useRef<HTMLDivElement>(null);
  const { zone, progress, scrollable } = useActiveZone(scroller);

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
        <div
          ref={scroller}
          className="overflow-x-auto overscroll-x-contain pt-4"
          /* The reader is meant to land on the manual zone, so no snapping:
             snap points would fight a gesture whose whole job is continuous
             travel across the divider. */
        >
          <div className="sheet-type text-[13px]" style={{ width: FULL_W }}>
            <ZoneBand zone={zone} />

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
                  className="sticky left-0 z-20 shrink-0 border-r border-sheet-grid bg-sheet-header py-2.5 text-center text-[12px] font-normal text-ink-muted"
                  style={{ width: FULL_GUTTER }}
                >
                  1
                </div>
                {FULL_COLS.map((c, i) => (
                  <div
                    key={c.header}
                    className={cn(
                      "shrink-0 px-3 py-2.5",
                      c.maintained ? "bg-blotter-100" : "bg-manual-100",
                      c.header === "Status" &&
                        "border-l-[3px] border-l-blotter-400",
                      i === 0 && "sticky z-20 border-r border-sheet-grid",
                    )}
                    style={{ width: c.w, left: i === 0 ? FULL_GUTTER : undefined }}
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
                      className="sticky z-20 shrink-0 border-r border-sheet-grid px-3 py-2.5 font-medium text-ink"
                      style={{
                        width: FULL_COLS[0].w,
                        left: FULL_GUTTER,
                        background: FROZEN_NAME_FILL,
                      }}
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
                        defect on both surfaces; no reason to author a sixth
                        while that fix is queued.
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
        </div>

        <Veil progress={progress} ahead={zone} show={scrollable} />
      </div>
    </SheetWindow>
  );
}

/* ------------------------------------------------------------------- entry */

export function SheetPhone({ variant }: { variant: PhoneSheetVariant }) {
  return variant === "swipe" ? <SwipeSheet /> : <CropSheet />;
}
