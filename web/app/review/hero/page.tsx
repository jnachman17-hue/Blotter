"use client";

/**
 * TEMPORARY REVIEW ROUTE — session 6. Delete before the session ends.
 *
 * Two independent questions about the mobile hero, both of which Jon has to
 * answer by looking rather than by reading an argument.
 *
 * **1. Where the persistent CTA lives.** On a phone the sticky header's button
 * and the hero's own button are both on the first screenful — two controls with
 * the same four words.
 *
 *   Bottom bar  header carries the brand only, and the bar appears once the
 *               hero CTA scrolls away. Thumb-reachable, but permanently covers
 *               about 85px of every screenful.
 *   Both        today's state, and the one being fixed: header button and hero
 *               button, no bar. Included so the problem is visible next to its
 *               two solutions rather than only described.
 *   Top only    the header keeps its button the whole way down, the hero's own
 *               button goes, and no bar appears. The cleanest, and the version
 *               Jon described. It costs no screen space and puts the only
 *               control at the hardest point on a phone to reach.
 *
 * **2. Where the eyebrow sits.** Above the headline as ratified, under the film
 * as a qualifier read after the demonstration, or not on a phone at all. The
 * eyebrow, headline and film together are about 182px of the roughly 700 a
 * phone gives, and the eyebrow is the only line that says who this is for.
 *
 * The supporting paragraph is no longer a variant: Jon chose the one-line
 * condensation on August 10, 2026, and it is now the default in `Hero` itself.
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
import {
  Hero,
  type HeroEyebrow,
  type HeroSupporting,
} from "@/components/sections/hero";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { SiteHeader } from "@/components/site-header";
import { StickyCta, StickyCtaSpacer } from "@/components/sticky-cta";

/**
 * `topOnly` is the arrangement Jon described: the blurred header keeps its
 * button the whole way down, the hero's own button goes, and no bottom bar
 * appears. It is the genuinely clean version, and it is here because my first
 * answer — that the hero CTA could not leave — was too strong.
 */
type CtaMode = "bottom" | "top" | "topOnly";

const CTA_MODES: { id: CtaMode; label: string }[] = [
  { id: "bottom", label: "Bottom bar" },
  { id: "top", label: "Both" },
  { id: "topOnly", label: "Top only" },
];

const EYEBROW_MODES: { id: HeroEyebrow; label: string }[] = [
  { id: "top", label: "Eyebrow up" },
  { id: "below", label: "Under film" },
  { id: "none", label: "No eyebrow" },
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
  const [eyebrow, setEyebrow] = useState<HeroEyebrow>("top");
  /* Jon chose the one-line condensation on August 10, 2026, so it is the
     default here rather than a variant to pick. */
  const supporting: HeroSupporting = "short";

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
          items={EYEBROW_MODES}
          value={eyebrow}
          onChange={setEyebrow}
          label="Eyebrow position"
        />
      </div>

      <div className="field-open">
        <SiteHeader mobileCta={cta !== "bottom"} />
        <main id="top">
          <Hero
            supporting={supporting}
            eyebrow={eyebrow}
            heroCta={cta !== "topOnly"}
          />
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
