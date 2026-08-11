"use client";

/**
 * The three sheet variants, each shown in the position mobile 02 will give it:
 * the compressed stage-label line directly above, the sheet, the ten field
 * names beneath.
 *
 * Everything else about mobile 02 — the headline, the supporting paragraph, the
 * stacked reassurance claims, the refusals — is left out deliberately. This
 * route exists to settle one question, and the surrounding copy would compete
 * with it.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import {
  SheetPhone,
  type PhoneSheetVariant,
} from "@/components/section-45/sheet-phone";

import { Picker } from "./picker";

const VARIANTS: { key: PhoneSheetVariant; label: string; note: string }[] = [
  {
    key: "crop",
    label: "Crop",
    note: "Four columns, letters relabelled A to D. Reads as a clean small sheet. The ten fields live entirely in the two lines beneath.",
  },
  {
    key: "hidden",
    label: "Hidden",
    note: "The same crop with the real column letters, A F G I, and Sheets' own collapsed-column arrowheads. The sheet itself says there is more.",
  },
  {
    key: "swipe",
    label: "Swipe",
    note: "Rejected, shown for comparison. All ten columns at full size with Name frozen. Look at what it says before you swipe, and where the divider is at rest.",
  },
];

/** `03-SECTION-3` §5, exact. Ratified copy, relocated rather than rewritten. */
const STAGE_LABELS = [
  "RECRUITING HAPPENS HERE",
  "BLOTTER KEEPS IT CURRENT",
  "YOUR TRACKER STAYS CURRENT",
];

/**
 * The mechanism, stated rather than demonstrated.
 *
 * `09` §4: the hero film already proves it, so a second demonstration is the
 * redundancy being removed. Three labels above a proved visual is a caption.
 * The arrow is a glyph rather than a dash, so the two-dash rule is untouched.
 */
function StageLine() {
  /*
    Stacked on a rail, not strung across one line.

    Laid out horizontally the three labels need about 450px of tracked
    uppercase against 350px of page, so they wrapped to three ragged lines with
    the separators orphaned at the start of lines two and three — which read as
    a bulleted list rather than as a sequence.

    The rail is the page's own idiom: the same 2px navy bar the eyebrows use,
    threaded onto a continuous hairline so the three read in order. Section 3's
    parked mobile treatment reaches for the same device, and it costs 62px
    against the roughly 80px `09` §4 budgeted.
  */
  return (
    <div className="mb-5 flex flex-col gap-2 pl-3" style={{ position: "relative" }}>
      <span
        aria-hidden="true"
        className="absolute top-[0.45em] bottom-[0.45em] left-0 w-px bg-navy-500/25"
      />
      {STAGE_LABELS.map((label) => (
        <p
          key={label}
          className="relative text-[10.5px] leading-[1.45] font-semibold tracking-[0.09em] text-navy-500 uppercase"
        >
          <span
            aria-hidden="true"
            className="absolute top-[0.2em] -left-3 h-[0.95em] w-[2px] bg-navy-500"
          />
          {label}
        </p>
      ))}
    </div>
  );
}

export function Stage() {
  /*
    Selection persists across reload via `?v=`, falling back to variant 1.

    Read through `useSearchParams` rather than out of `window.location` in an
    effect. The effect version renders variant 1, then immediately sets state to
    the real one — a cascading render, and the lint rule that forbids it is
    right: on a fresh load at `?v=3` the reader sees the crop for a frame before
    the swipe replaces it, which on this route is the one thing that must not
    happen. It also costs `Fit` a wasted measurement.
  */
  const params = useSearchParams();
  const fromUrl = parseInt(params.get("v") ?? "", 10);
  const initial = fromUrl >= 1 && fromUrl <= VARIANTS.length ? fromUrl - 1 : 0;
  const [i, setI] = useState(initial);

  const change = useCallback((next: number) => {
    setI(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(next + 1));
    window.history.replaceState(null, "", url);
  }, []);

  const active = VARIANTS[i];

  return (
    <>
      <section className="field-settle pt-10 pb-40">
        <PageBox>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
            0{i + 1} / 0{VARIANTS.length} &nbsp; {active.label}
          </p>
          <p className="mt-2 mb-8 max-w-[46ch] text-[13px] leading-[1.5] text-ink-muted">
            {active.note}
          </p>

          <StageLine />
          {/* Keyed so switching re-mounts and `Fit` re-measures cleanly. */}
          <SheetPhone key={active.key} variant={active.key} />
        </PageBox>
      </section>

      <Picker
        labels={VARIANTS.map((v) => v.label)}
        current={i}
        onChange={change}
      />
    </>
  );
}
