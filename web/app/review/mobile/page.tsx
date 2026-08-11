"use client";

/**
 * TEMPORARY REVIEW ROUTE — session 6. Delete before the session ends.
 *
 * The whole mobile page, with the two arrangements still open behind pickers.
 * `/review/hero` showed the hero and one section; numbering only means anything
 * across the full page, so this route renders all of it.
 *
 * **1. Where the persistent CTA lives.**
 *
 *   Bottom bar  brand-only header, and the bar appears once the hero CTA
 *               scrolls away. Thumb-reachable; permanently covers about 85px.
 *   Both        today's state, and the thing being fixed: header button and
 *               hero button on the same screenful, same four words.
 *   Top only    header button the whole way down, no hero button, no bar.
 *               Cleanest; the only control sits at the hardest point on a phone
 *               to reach.
 *
 * **2. Section numbering.** Jon's idea, and his complaint behind it was that on
 * a phone the sections are hard to tell apart — Sections 4 and 5 worst, because
 * their two beats mirror on desktop and stacking collapses both to
 * headline-then-copy.
 *
 *   Off      as the live page renders today
 *   01       a numeral above each section headline
 *   01 / 05  the numeral plus the total, which is the one thing a phone reader
 *            cannot get from a scrollbar: how much page is left
 *
 * Turning numbering on for real overrides four build specs that forbid an
 * eyebrow. That decision is recorded in `08-desktop-changes-pending.md` rather
 * than taken quietly here, because it cannot stay mobile-only without the two
 * surfaces disagreeing about what the sections of this page are.
 *
 * The picker is top-anchored, departing from `PICKER.md`'s bottom-centre,
 * because bottom-centre is where the sticky CTA bar lives and the bar is one of
 * the things being judged. Styling verbatim; only the anchor moves.
 */

import { useState } from "react";

import { Funnel } from "@/components/funnel/funnel";
import { DataAndPrivacy } from "@/components/sections/data-and-privacy";
import { FaqAndClose } from "@/components/sections/faq-and-close";
import { Hero } from "@/components/sections/hero";
import { HowBlotterWorks } from "@/components/sections/how-blotter-works";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { TrackerAndActions } from "@/components/sections/tracker-and-actions";
import { SiteHeader } from "@/components/site-header";
import { StickyCta, StickyCtaSpacer } from "@/components/sticky-cta";

type CtaMode = "bottom" | "both" | "topOnly";
type NumberMode = "off" | "on" | "total";

const CTA_MODES: { id: CtaMode; label: string }[] = [
  { id: "bottom", label: "Bottom bar" },
  { id: "both", label: "Both" },
  { id: "topOnly", label: "Top only" },
];

const NUMBER_MODES: { id: NumberMode; label: string }[] = [
  { id: "off", label: "No numbers" },
  { id: "on", label: "01" },
  { id: "total", label: "01 / 05" },
];

/** Harness chrome. Verbatim from PICKER.md apart from the anchor. */
function Picker<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <nav className="proto-picker" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="proto-picker-item"
          data-active={item.id === value ? "" : undefined}
          aria-current={item.id === value}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default function MobileReview() {
  const [cta, setCta] = useState<CtaMode>("bottom");
  const [numbers, setNumbers] = useState<NumberMode>("off");

  return (
    <div data-section-numbers={numbers === "off" ? undefined : numbers}>
      <style>{`
        .proto-picker {
          display: flex; align-items: center; gap: 2px; padding: 4px;
          border-radius: 999px; background: rgba(10,10,10,0.82);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          backdrop-filter: blur(12px) saturate(1.4);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08) inset,
                      0 8px 24px rgba(0,0,0,0.24), 0 2px 6px rgba(0,0,0,0.12);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 13px; line-height: 1; -webkit-font-smoothing: antialiased;
          user-select: none; -webkit-user-select: none;
        }
        .proto-picker-item {
          appearance: none; border: 0; background: transparent; cursor: pointer;
          color: rgba(255,255,255,0.62); padding: 0 12px; height: 28px;
          border-radius: 999px; font: inherit; white-space: nowrap;
        }
        .proto-picker-item[data-active] {
          color: #fff; background: rgba(255,255,255,0.12);
        }
      `}</style>

      <div className="fixed inset-x-0 top-[68px] z-[2147483647] flex flex-col items-center gap-2">
        <Picker items={CTA_MODES} value={cta} onChange={setCta} label="CTA placement" />
        <Picker
          items={NUMBER_MODES}
          value={numbers}
          onChange={setNumbers}
          label="Section numbering"
        />
      </div>

      <div className="field-open">
        <SiteHeader mobileCta={cta !== "bottom"} />
        <main id="top">
          <Hero heroCta={cta !== "topOnly"} />
        </main>
      </div>
      <ScaleAndConsequence />
      <HowBlotterWorks />
      <TrackerAndActions />
      <DataAndPrivacy />
      <FaqAndClose />

      {cta === "bottom" && (
        <>
          <StickyCtaSpacer />
          <StickyCta />
        </>
      )}
      <Funnel />
    </div>
  );
}
