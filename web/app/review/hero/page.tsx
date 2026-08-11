"use client";

/**
 * TEMPORARY REVIEW ROUTE — session 6. Delete before the session ends.
 *
 * Two independent questions about the mobile hero, both of which Jon has to
 * answer by looking rather than by reading an argument.
 *
 * **1. Where the persistent CTA lives.** On a phone the sticky header's button
 * and the hero's own button are both on the first screenful — two controls with
 * the same four words. The hero one cannot go: it is the button that follows
 * the film. So the choice is between dropping the header's and letting the
 * bottom bar take over, or keeping the header's and dropping the bar.
 *
 *   Bottom bar   header carries the brand only; the bar appears once the hero
 *                CTA scrolls away. Thumb-reachable, but permanently covers
 *                about 85px of every screenful.
 *   Top bar      the header keeps its button the whole way down and no bar
 *                appears. Costs no screen space, but sits at the hardest point
 *                on a phone to reach.
 *
 * **2. How much of the supporting paragraph survives.** Full, condensed to one
 * line, or nothing at all with the film carrying it.
 *
 * ## The picker is at the top here, and that is a deliberate departure
 *
 * `.claude/skills/prototype/PICKER.md` fixes the picker bottom-centre and says
 * to copy it verbatim. Bottom-centre is exactly where the sticky CTA bar lives,
 * and the bar is one of the two things being judged — the harness would sit on
 * top of the subject. The styling is verbatim; only the anchor moves, and only
 * on this route.
 */

import { useState } from "react";

import { Funnel } from "@/components/funnel/funnel";
import { Hero, type HeroSupporting } from "@/components/sections/hero";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { SiteHeader } from "@/components/site-header";
import { StickyCta, StickyCtaSpacer } from "@/components/sticky-cta";

type CtaMode = "bottom" | "top";

const CTA_MODES: { id: CtaMode; label: string }[] = [
  { id: "bottom", label: "Bottom bar" },
  { id: "top", label: "Top bar" },
];

const SUPPORTING_MODES: { id: HeroSupporting; label: string }[] = [
  { id: "full", label: "Full" },
  { id: "short", label: "One line" },
  { id: "none", label: "None" },
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

export default function HeroReview() {
  const [cta, setCta] = useState<CtaMode>("bottom");
  const [supporting, setSupporting] = useState<HeroSupporting>("full");

  return (
    <>
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

      {/* Top-anchored, so it never covers the sticky bar being judged. */}
      <div className="fixed inset-x-0 top-[68px] z-[2147483647] flex flex-col items-center gap-2">
        <Picker items={CTA_MODES} value={cta} onChange={setCta} label="CTA placement" />
        <Picker
          items={SUPPORTING_MODES}
          value={supporting}
          onChange={setSupporting}
          label="Supporting paragraph"
        />
      </div>

      <div className="field-open">
        <SiteHeader mobileCta={cta === "top"} />
        <main id="top">
          <Hero supporting={supporting} />
        </main>
      </div>

      {/* One real section below, so the handover to the bottom bar can be seen
          happening rather than described. */}
      <ScaleAndConsequence />

      {cta === "bottom" && (
        <>
          <StickyCtaSpacer />
          <StickyCta />
        </>
      )}
      <Funnel />
    </>
  );
}
