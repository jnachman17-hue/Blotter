/**
 * Section 3's mechanism visual: one Friday, three moments, one tracker.
 *
 * Authority: `03-SECTION-3-HOW-BLOTTER-WORKS.md` as overruled by Jon on
 * August 5, 2026. He rejected the formal-exact `how-blotter-works-exact-v1.avif`
 * and instructed the mechanism be rebuilt. §2's formal-exact status, §7 in
 * full, §16's composition preservation and the matching acceptance and
 * ratification lines are superseded. Everything else still governs and is
 * respected here: the §1 communication job, §5 exact copy, §13's ban on
 * repeating the hero's cue-to-row demonstration, §15's static-screenshot rule,
 * and §17's ban on architecture diagrams and engine, API or parsing vocabulary.
 *
 * Why a day rather than a flow. `Current` is a time word, and nothing else on
 * the page has any time in it — the hero, Section 2, Section 4 and Section 5 are
 * all stills showing a tracker that happens to be right, never one becoming
 * right. A left-to-right pipeline is a claim about architecture; a left-to-right
 * day is a claim about the reader's Friday.
 *
 * Column order is causal: when it happened, what happened, Blotter, what the
 * tracker now says. Blotter is the layer between the activity and the sheet, so
 * it occupies the column between them, and the three ratified §5 stage labels
 * land in the order §4 and §8 require without drawing a diagram.
 *
 * Blotter is claimed once, by the band and the rail that every moment passes
 * through — never by a badge on an individual row. Jon ruled that out on
 * August 5: marking only Daniel would read as the one thing Blotter caught,
 * when it is equally what recognised Sarah's reply and Priya's chat.
 *
 * Nothing here animates. The whole argument survives a screenshot, per §15.
 */

"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { CalendarMark, GmailMark } from "@/components/google-marks";
import { PAGE_BOX_W } from "@/components/layout/page-box";
import { StatusChip } from "@/components/sheet/status-chip";
import { cn } from "@/lib/cn";
import { SECTION_3_MOMENTS, type DayMoment } from "@/lib/sheet-data";

/* ------------------------------------------------------------------ geometry */

const STAMP_W = 96;
const TRIGGER_W = 252;
const RAIL_W = 156;

/*
 * `cls` is a literal so Tailwind's scanner emits it. A class built from `w` at
 * runtime would never be compiled and the columns would silently lose width.
 */
type Field = "name" | "status" | "next" | "last" | "days" | "call";

const COLS: { field: Field; header: string; w: number }[] = [
  { field: "name", header: "Name", w: 116 },
  { field: "status", header: "Status", w: 128 },
  { field: "next", header: "Next move", w: 142 },
  { field: "last", header: "Last contact", w: 104 },
  { field: "days", header: "Days", w: 52 },
  { field: "call", header: "Call", w: 124 },
];

const GRID_W = COLS.reduce((n, c) => n + c.w, 0);
const NATURAL_W = STAMP_W + TRIGGER_W + RAIL_W + GRID_W;

/** The zone boundary: the first column Blotter maintains. */
const SPLIT = COLS.findIndex((c) => c.field !== "name");

/* --------------------------------------------------------------------- bits */

/**
 * The source badge.
 *
 * This answers "what happened", which varies. It deliberately never answers
 * "who noticed", which does not — that is Blotter at every moment, and it is
 * claimed once by the band rather than per row.
 *
 * Daniel's Gmail mark is muted rather than absent or full strength. The thread
 * is a Gmail thread, so the slot names it; the muting carries the fact that
 * nothing arrived in it. A full-strength mark would imply Gmail signalled
 * something, and Gmail signalling nothing is the entire point of that row.
 */
function Source({ moment }: { moment: DayMoment }) {
  if (moment.source === "gmail") return <GmailMark />;
  if (moment.source === "calendar") return <CalendarMark />;
  return (
    <span className="shrink-0 opacity-40 grayscale">
      <GmailMark />
    </span>
  );
}

function cellValue(m: DayMoment, field: Field) {
  switch (field) {
    case "name":
      return m.name;
    case "status":
      return <StatusChip status={m.status} />;
    case "next":
      return m.next;
    case "last":
      return m.last;
    case "days":
      return m.days;
    case "call":
      return m.call;
  }
}

/**
 * One row of the tracker.
 *
 * Data cells carry no tint. Jon ruled on August 5, 2026 that the maintained
 * zone is marked by the header band alone, matching the hero, and that ruling
 * governs here. The trigger beside each row already explains why it moved, so
 * no per-field claim is made and none can be wrong.
 */
function MomentRow({ m, showHeader }: { m: DayMoment; showHeader: boolean }) {
  return (
    <div
      className="sheet-type overflow-hidden rounded-[10px] border border-sheet-border bg-white shadow-[0_1px_3px_rgba(60,64,67,0.13)]"
      style={{ width: GRID_W }}
    >
      {showHeader && (
        <div className="flex border-b border-sheet-grid text-[12px] font-semibold text-ink">
          {COLS.map((c, i) => (
            <div
              key={c.header}
              className={cn(
                "px-2.5 py-2",
                c.field === "name" ? "bg-manual-100" : "bg-blotter-100",
                c.field === "days" && "text-right",
                i === SPLIT && "border-l-2 border-l-sheet-border",
              )}
              style={{ width: c.w }}
            >
              {c.header}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center text-[13px]">
        {COLS.map((c, i) => (
          <div
            key={c.header}
            className={cn(
              "px-2.5 py-2.5 whitespace-nowrap",
              c.field === "days" && "text-right",
              c.field === "name" && "font-medium",
              i === SPLIT && "border-l-2 border-l-sheet-border",
            )}
            style={{ width: c.w }}
          >
            {cellValue(m, c.field) ?? null}
          </div>
        ))}
      </div>
    </div>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] leading-[1.45] font-semibold tracking-[0.11em] text-navy-500 uppercase">
      {children}
    </p>
  );
}

/** The three exact stage labels, `03-SECTION-3` §5. */
const STAGE_LABELS = [
  "RECRUITING HAPPENS HERE",
  "BLOTTER KEEPS IT CURRENT",
  "YOUR TRACKER STAYS CURRENT",
];

/* ------------------------------------------------------------------ the day */

export function DayTimeline() {
  const scale = PAGE_BOX_W / NATURAL_W;

  /*
    The rail is measured from the first dot's centre to the last dot's, not
    given a fixed inset. Daniel's row is taller than the other two because it
    carries the header, so any fixed value overshoots one end and falls short at
    the other.
  */
  const inner = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [rail, setRail] = useState<{ top: number; height: number } | null>(null);

  useLayoutEffect(() => {
    if (inner.current) setHeight(inner.current.offsetHeight * scale);
    if (!track.current) return;
    const base = track.current.getBoundingClientRect().top;
    const centres = dots.current
      .filter(Boolean)
      .map((d) => d!.getBoundingClientRect())
      .map((r) => r.top - base + r.height / 2);
    if (centres.length > 1) {
      setRail({
        top: centres[0],
        height: centres[centres.length - 1] - centres[0],
      });
    }
  }, [scale]);

  return (
    <div style={{ width: PAGE_BOX_W, height: height || undefined }}>
      <div
        ref={inner}
        style={{
          width: NATURAL_W,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="relative">
          {/*
            Each stage label hangs under a hairline spanning its own stage, so
            the three read as column groups rather than as text floating over
            whitespace. Ratified by Jon, August 5, 2026, over a filled band in
            Blotter's column.
          */}
          <div className="relative flex items-start">
            <div style={{ width: STAMP_W + TRIGGER_W }} className="pr-6">
              <span aria-hidden="true" className="mb-2.5 block h-px bg-navy-400/40" />
              <StageLabel>{STAGE_LABELS[0]}</StageLabel>
            </div>
            <div style={{ width: RAIL_W }} className="px-3 text-center">
              <span aria-hidden="true" className="mb-2.5 block h-px bg-navy-400/40" />
              <StageLabel>{STAGE_LABELS[1]}</StageLabel>
            </div>
            <div style={{ width: GRID_W }}>
              <span aria-hidden="true" className="mb-2.5 block h-px bg-navy-400/40" />
              <StageLabel>{STAGE_LABELS[2]}</StageLabel>
            </div>
          </div>

          <div className="relative mt-9" ref={track}>
            {rail && (
              <span
                aria-hidden="true"
                className="absolute w-px bg-navy-400/45"
                style={{
                  left: STAMP_W + TRIGGER_W + RAIL_W / 2,
                  top: rail.top,
                  height: rail.height,
                }}
              />
            )}
            <div className="space-y-6">
              {SECTION_3_MOMENTS.map((m, i) => (
                <div key={m.id} className="flex items-center">
                  <div className="pr-6 text-right" style={{ width: STAMP_W }}>
                    <p className="font-mono text-[13px] leading-none font-medium text-navy-900">
                      {m.stamp}
                    </p>
                    <p className="mt-1.5 text-[10.5px] leading-[1.3] tracking-[0.07em] text-ink-faint uppercase">
                      {m.substamp}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2.5 pr-6"
                    style={{ width: TRIGGER_W }}
                  >
                    <Source moment={m} />
                    <span className="text-[13.5px] leading-[1.3] font-semibold text-ink">
                      {m.trigger}
                    </span>
                  </div>

                  <div className="flex justify-center" style={{ width: RAIL_W }}>
                    <span
                      ref={(el) => {
                        dots.current[i] = el;
                      }}
                      aria-hidden="true"
                      className="size-[7px] rounded-full bg-navy-500"
                    />
                  </div>

                  <MomentRow m={m} showHeader={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
