"use client";

/**
 * The two open mobile comparisons, in one picker.
 *
 * Both show the section they belong to rather than the visual alone — showing
 * a visual with its argument stripped away is why the first pass of this route
 * could not be judged.
 *
 *   1, 2   mobile 02, the two wash strengths. Everything else is identical.
 *   3, 4   mobile 03, the Outstanding list. Every action, or the films' cut.
 *
 * The crop that lost to the swipe is still reachable at `?crop=1`, so the
 * ratified decision stays reversible without a fifth pill in the picker.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import { Mobile02 } from "@/components/section-45/mobile-02";
import {
  OutstandingPhone,
  type OutstandingPhoneVariant,
} from "@/components/section-45/outstanding-phone";
import { type WashStrength } from "@/components/section-45/sheet-phone";

import { Picker } from "./picker";

type Variant =
  | { kind: "wash"; key: WashStrength; label: string; note: string }
  | { kind: "outstanding"; key: OutstandingPhoneVariant; label: string; note: string };

const VARIANTS: Variant[] = [
  {
    kind: "wash",
    key: "soft",
    label: "Soft",
    note: "Mobile 02 as shipped. The wash is deliberately quiet so the cells underneath stay readable. Swipe across the divider and watch which zone is lit.",
  },
  {
    kind: "wash",
    key: "strong",
    label: "Strong",
    note: "The same section, one value per zone doubled. Nothing else changes. The question is whether the cells are still comfortable to read under it.",
  },
  {
    kind: "outstanding",
    key: "full",
    label: "All 21",
    note: "Mobile 03, the films' vertical list. Every one of the 21 actions is present, which is what the section claims. Taller, and no row that says the content is elsewhere.",
  },
  {
    kind: "outstanding",
    key: "cut",
    label: "Cut",
    note: "The films' own compression: one readable row per group and a +N more line. Shorter. Note that you overruled exactly these rows on August 5 for the desktop build.",
  },
];

export function Stage() {
  const params = useSearchParams();
  const crop = params.get("crop") === "1";
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
    <div data-section-numbers="on">
      {/* Harness chrome, deliberately plain so it reads as not-the-page. */}
      <div className="pt-8">
        <PageBox>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-faint uppercase">
            0{i + 1} / 0{VARIANTS.length} &nbsp; {active.label}
          </p>
          <p className="mt-2 max-w-[46ch] text-[13px] leading-[1.5] text-ink-muted">
            {active.note}
          </p>
          <hr className="mt-6 border-navy-900/10" />
        </PageBox>
      </div>

      {/* Keyed so switching re-mounts and the sheet re-measures cleanly. */}
      {active.kind === "wash" ? (
        <Mobile02
          key={active.key}
          variant={crop ? "crop" : "swipe"}
          wash={active.key}
        />
      ) : (
        <section key={active.key} className="field-settle pt-10 pb-16">
          <PageBox>
            <h2 className="font-display max-w-[16ch] text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
              Know exactly what needs your attention.
            </h2>
            <p className="mt-4 text-body leading-[1.62] text-ink-muted">
              Stop reconstructing your next moves from Gmail, Calendar, and
              memory. Blotter gives you one current view of every action you owe.
            </p>
            <div className="mt-8">
              <OutstandingPhone variant={active.key} />
            </div>
          </PageBox>
        </section>
      )}

      <div className="pb-40">
        <PageBox>
          <hr className="mb-6 border-navy-900/10" />
          <p className="max-w-[46ch] text-[12.5px] leading-[1.5] text-ink-faint">
            The whole page is at <code>/</code>. The funnel is a full-screen
            sheet on a phone now, so any CTA opens it.
          </p>
        </PageBox>
      </div>

      <Picker
        labels={VARIANTS.map((v) => v.label)}
        current={i}
        onChange={change}
      />
    </div>
  );
}
