/**
 * The Section 2 scale block: volume trajectory across one recruiting cycle.
 *
 * Chosen by Jon on August 5, 2026 from three candidates built side by side.
 * The two rejected treatments, equal counted cards and a wide-628 variant,
 * were deleted with their review route.
 *
 * The idea: every mark is one real unit, piled into the month it belongs to,
 * so the curve is not drawn over the data, it is made of it. 628 dots, 68
 * squares, 30 rings, 19 bars, distributed across the cycle by largest
 * remainder so each band sums to its true total exactly. Mark size rises as
 * the count falls, which lets every band's heaviest month fill a comparable
 * height while staying one to one with the count. Cross-band magnitude is
 * carried by the numerals, which is the honest place for it: a shared vertical
 * scale across a thirty-three-fold spread would render applications invisible.
 *
 * Jon's overrides of `02-SECTION-2`, all August 5, 2026, recorded in
 * `04-decision-log.md`:
 *   - the section 7 ban on chart furniture is set aside for this treatment
 *   - figure order is descending by volume, 628 / 68 / 30 / 19, not the
 *     section 5 order of 628 / 68 / 19 / 30
 *   - the supporting paragraph loses its first sentence
 *
 * Still binding: every mark is an abstract glyph and never a pictogram, since
 * section 7 bans icons; nothing animates, since section 14 requires the whole
 * argument to read in a static screenshot; and none of the hero's devices
 * appear, which section 12 forbids.
 */

import { Fit } from "@/components/layout/fit";

/* ------------------------------------------------------------------- copy */

export const EYEBROW = "The scale of a recruiting cycle";
export const HEADLINE =
  "Your manual tracker was never built to keep up with this.";

export const QUALIFICATION =
  "* Representative workload from a high-intensity Summer Analyst 2027 recruiting cycle that resulted in a JPMorgan offer.";

export const METHODOLOGY =
  "Estimated from manual Gmail and Calendar logging, tracker updates, and recurring reconciliation across the case-study recruiting cycle.";

/** Descending by volume, per Jon's reorder. Every mark is one real unit. */
const METRICS = [
  {
    value: "628",
    count: 628,
    label: "Recruiting emails",
    fill: "var(--color-metric-email-fill)",
    ink: "var(--color-metric-email-ink)",
    mark: "dot" as const,
    size: 3,
    pitch: 4.4,
    perRow: 12,
  },
  {
    value: "68",
    count: 68,
    label: "Coffee chats",
    fill: "var(--color-metric-chat-fill)",
    ink: "var(--color-metric-chat-ink)",
    mark: "square" as const,
    size: 6,
    pitch: 8.6,
    perRow: 5,
  },
  {
    value: "30",
    count: 30,
    label: "Interview rounds",
    fill: "var(--color-metric-interview-fill)",
    ink: "var(--color-metric-interview-ink)",
    mark: "ring" as const,
    size: 9,
    pitch: 12,
    perRow: 3,
  },
  {
    value: "19",
    count: 19,
    label: "Applications",
    fill: "var(--color-metric-app-fill)",
    ink: "var(--color-metric-app-ink)",
    mark: "bar" as const,
    size: 11,
    pitch: 13.5,
    perRow: 3,
  },
] as const;

type Metric = (typeof METRICS)[number];

/**
 * The supporting argument, section 9.
 *
 * The specification's first sentence, "Recruiting activity changes
 * continuously across hundreds of emails, coffee chats, applications, and
 * interview rounds", is cut. Ratified by Jon August 5, 2026: the diagram
 * directly above says exactly that, across exactly those four metrics, month
 * by month, so the sentence made the reader read what they had just looked at.
 * This overrides the section 9 and section 18 requirement for the exact
 * three-sentence paragraph. The two surviving sentences are the ones the
 * diagram cannot say.
 */
function SupportingParagraph({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      A manual tracker changes only when you remember to update it, so at this
      volume it{" "}
      <span className="font-semibold text-ink">
        inevitably falls behind reality
      </span>
      . Deadlines, follow-ups, and next steps begin slipping through the cracks.
    </p>
  );
}

/* ------------------------------------------------------------------ marks */

function Mark({ metric, x, y }: { metric: Metric; x: number; y: number }) {
  const s = metric.size;
  if (metric.mark === "dot") {
    return <circle cx={x + s / 2} cy={y + s / 2} r={s / 2} fill={metric.ink} opacity={0.72} />;
  }
  if (metric.mark === "square") {
    return <rect x={x} y={y} width={s} height={s} rx={1} fill={metric.ink} opacity={0.72} />;
  }
  if (metric.mark === "ring") {
    return (
      <circle
        cx={x + s / 2}
        cy={y + s / 2}
        r={s / 2 - 1}
        fill="none"
        stroke={metric.ink}
        strokeWidth={1.6}
        opacity={0.8}
      />
    );
  }
  return <rect x={x} y={y + s / 3} width={s} height={s / 3} rx={0.8} fill={metric.ink} opacity={0.78} />;
}

/* ------------------------------------------------------------------ cycle */

const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"] as const;

/**
 * January and February, marked identically. Both carry similarly high volume
 * across all four metrics and the pair is the diagram's hinge. Extended from
 * January alone by Jon, August 5, 2026.
 */
const PIVOT_START = 5;
const PIVOT_SPAN = 2;
const isPivot = (i: number) => i >= PIVOT_START && i < PIVOT_START + PIVOT_SPAN;

/**
 * The trajectory, as Jon described it from his own knowledge of the cycle.
 * Directional weights rather than measured counts; the counts come from
 * distributing each metric's real total across these weights.
 */
const TRAJECTORY: Record<string, number[]> = {
  "Recruiting emails": [0.22, 0.45, 0.68, 1.0, 0.6, 1.0, 0.95, 0.6, 0.28, 0.1],
  "Coffee chats": [0, 0.14, 0.55, 1.0, 0.6, 0.95, 0.45, 0.24, 0.1, 0],
  "Interview rounds": [0, 0, 0, 0, 0.1, 1.0, 0.95, 0.62, 0.55, 0.12],
  Applications: [0, 0, 0, 0, 0.12, 1.0, 0.92, 0.26, 0.1, 0],
};

/**
 * Largest remainder, so the monthly piles sum to the real total exactly. 628
 * marks are drawn because there are 628 emails, not 630 or 625.
 */
function distribute(total: number, weights: number[]) {
  const sum = weights.reduce((a, b) => a + b, 0);
  const exact = weights.map((w) => (w / sum) * total);
  const counts = exact.map(Math.floor);
  const short = total - counts.reduce((a, b) => a + b, 0);
  const order = exact
    .map((e, i) => ({ i, frac: e - Math.floor(e) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < short; k++) counts[order[k].i] += 1;
  return counts;
}

const CHART_W = 852;
const BAND_H = 54;
const SLOT = CHART_W / MONTHS.length;
const LABEL_W = 236;
const GUTTER = 32;
/** The diagram's full natural width. `Fit` scales it as one object. */
const CHART_TOTAL_W = LABEL_W + GUTTER + CHART_W;

/** Smooth line through the top of each month's pile. */
function smoothPath(points: readonly (readonly [number, number])[]) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

function TrajectoryBand({ metric, last }: { metric: Metric; last: boolean }) {
  const counts = distribute(metric.count, TRAJECTORY[metric.label]);

  const tops = counts.map((n, i) => {
    const rows = Math.ceil(n / metric.perRow);
    return [SLOT * i + SLOT / 2, BAND_H - rows * metric.pitch] as const;
  });

  const line = smoothPath(tops);
  const area = `${line} L ${CHART_W} ${BAND_H} L 0 ${BAND_H} Z`;

  return (
    <div className={`flex items-end gap-8 py-3 ${last ? "" : "border-b border-ink/8"}`}>
      <div className="shrink-0" style={{ width: LABEL_W }}>
        <div
          className="text-[40px] leading-none font-semibold tracking-[-0.035em] tabular-nums"
          style={{ color: metric.ink }}
        >
          {metric.value}
        </div>
        <div className="mt-1.5 text-small text-ink-muted">{metric.label}</div>
      </div>

      <svg
        aria-hidden="true"
        width={CHART_W}
        height={BAND_H}
        viewBox={`0 0 ${CHART_W} ${BAND_H}`}
        className="relative block"
      >
        <path d={area} fill={metric.fill} opacity={metric.mark === "bar" ? 0.34 : 0.16} />
        <path d={line} fill="none" stroke={metric.ink} strokeWidth={1.5} opacity={0.85} />

        {counts.map((n, mi) => {
          const pileW = metric.perRow * metric.pitch;
          const x0 = SLOT * mi + (SLOT - pileW) / 2;
          return Array.from({ length: n }, (_, k) => (
            <Mark
              key={`${mi}-${k}`}
              metric={metric}
              x={x0 + (k % metric.perRow) * metric.pitch}
              y={BAND_H - (Math.floor(k / metric.perRow) + 1) * metric.pitch}
            />
          ));
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------- argument and notes */

/**
 * Shared column geometry, so the two rows below the diagram line up exactly.
 *
 * One column on a phone; the ratified two-column split from the desktop
 * breakpoint. The 460px track is fixed and a fixed track cannot narrow, so
 * below `desk` it held the row open past the viewport on its own.
 */
const ROW =
  "grid gap-y-8 items-start desk:grid-cols-[minmax(0,1fr)_460px] desk:gap-x-16";

/**
 * The argument and its proof, side by side.
 *
 * The 60-hour line sits beside the statement rather than in the footnotes, per
 * Jon, August 5, 2026, and `~60 hours` is centred against the two lines beside
 * it so the block reads as one unit. Section 8 requires this proof stay
 * subordinate to the four figures and forbids a badge or a loud highlight, so
 * the emphasis comes from the page's own numeral language rather than from
 * imported decoration.
 */
function ArgumentRow() {
  return (
    <div className={`mt-12 ${ROW}`}>
      <SupportingParagraph className="max-w-[600px] font-display text-[22px] leading-[1.45] tracking-[-0.012em] text-ink-muted" />

      <div className="flex items-center gap-3 pt-1">
        <span className="font-display text-[34px] leading-none font-semibold tracking-[-0.03em] tabular-nums text-navy-900">
          ~60 hours
        </span>
        <span className="text-small leading-[1.45] text-ink-muted">
          saved on manual tracker administration
          <br />
          over one recruiting cycle
        </span>
      </div>
    </div>
  );
}

/**
 * The footnotes.
 *
 * The qualification keeps the asterisk that is in its ratified copy, and the
 * mark now has an anchor at the foot of the diagram it refers to, so it is a
 * reference rather than a dangling glyph. The methodology carries no marker
 * and sits in the column the 60-hour line occupies above it, so it still reads
 * as explaining that line. The two notes are not peers and no longer look as
 * though they should be.
 */
function FootnoteStrip() {
  return (
    <div className={`mt-10 border-t border-ink/10 pt-5 ${ROW}`}>
      <p className="max-w-[540px] text-micro leading-[1.6] text-ink-faint">
        {QUALIFICATION}
      </p>
      <p className="max-w-[440px] text-micro leading-[1.6] text-ink-faint">
        {METHODOLOGY}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- exported */

export function ScaleTrajectory() {
  return (
    <div>
      <h2 className="max-w-[900px] font-display text-h2 leading-[1.12] font-semibold tracking-[-0.025em] text-ink">
        {HEADLINE}
      </h2>

      {/*
        The diagram is one fixed 1120px composition — the label column, the
        gutter and the ten month slots all depend on each other, so it scales
        as one object rather than reflowing piecemeal.

        Scaffolding, and specifically the thing this section must replace:
        `perRow` on each band is a real parameter, so the mark field can be
        rebuilt to reflow at phone width instead of shrinking. `02-SECTION-2`
        §15 leaves the choice open between proportional scaling, a controlled
        crop and a separate translation, and the reflow is the one that keeps
        every mark one-to-one with its count.
      */}
      <Fit width={CHART_TOTAL_W}>
        <div className="mt-10" style={{ width: CHART_TOTAL_W }}>
        {/* Months read first, at the top, before the four shapes. */}
        <div className="flex gap-8 pb-2">
          <div className="shrink-0" style={{ width: LABEL_W }} />
          <div className="flex" style={{ width: CHART_W }}>
            {MONTHS.map((m, i) => (
              <div
                key={m}
                className={`text-center text-micro tracking-[0.08em] uppercase ${
                  isPivot(i) ? "font-semibold text-navy-900" : "text-ink-muted"
                }`}
                style={{ width: SLOT }}
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        {/*
          The month grid is drawn once behind all four bands rather than inside
          each one, so a rule runs unbroken from the header to the foot and a
          single month can be traced down the stack.
        */}
        <div className="relative border-t border-ink/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0"
            style={{ left: LABEL_W + GUTTER, width: CHART_W }}
          >
            <div
              className="absolute inset-y-0"
              style={{
                left: SLOT * PIVOT_START,
                width: SLOT * PIVOT_SPAN,
                background: "var(--color-navy-900)",
                opacity: 0.05,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(90deg, transparent 0 ${SLOT - 1}px, rgba(20,24,31,0.07) ${SLOT - 1}px ${SLOT}px)`,
              }}
            />
          </div>

          {METRICS.map((m, i) => (
            <TrajectoryBand key={m.label} metric={m} last={i === METRICS.length - 1} />
          ))}
        </div>

        {/* The asterisk's anchor, at the foot of the block it qualifies. */}
        <div className="mt-2 flex justify-end" style={{ width: CHART_TOTAL_W }}>
          <span className="text-small leading-none text-ink-muted" aria-hidden="true">
            *
          </span>
        </div>
        </div>
      </Fit>

      <ArgumentRow />
      <FootnoteStrip />
    </div>
  );
}
