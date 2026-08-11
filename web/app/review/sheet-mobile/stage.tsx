"use client";

/**
 * Mobile 02, ratified against the treatment it beat.
 *
 * Both open questions this route carried are settled: the swipe won over the
 * crop on August 11, 2026, and the wash it used has since been replaced by the
 * veil, so the two wash strengths are moot and gone. What is left is the
 * comparison the specs reference — `05-SECTION-5`'s amendment table says the
 * crop "survives behind `/review/sheet-mobile`", and this is that.
 *
 * Mobile 03 no longer has a variant either. `Cut` was dropped when the
 * disclosure landed; `components/section-45/outstanding-phone.tsx` records why
 * a disclosure satisfies the August 5 ruling rather than reopening it.
 *
 * The section shows whole, not the visual alone. Showing a visual with its
 * argument stripped away is why the first pass of this route could not be
 * judged.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import { Mobile02 } from "@/components/section-45/mobile-02";
import { type PhoneSheetVariant } from "@/components/section-45/sheet-phone";

import { Picker } from "./picker";

const VARIANTS: { key: PhoneSheetVariant; label: string; note: string }[] = [
  {
    key: "swipe",
    label: "Swipe",
    note: "Live. All ten columns at full size, Name frozen and tinted as yours, the zone labels riding the scroll. The veil covers what is ahead of you and recedes as you travel; it takes the colour of the zone you are about to reach.",
  },
  {
    key: "crop",
    label: "Crop",
    note: "The treatment the swipe beat, kept so the decision stays reversible. Four columns, the divider at rest, the whole argument in a screenshot. It gave up the zone labels to get there, which is why it lost.",
  },
];

export function Stage() {
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
      <Mobile02 key={active.key} variant={active.key} />

      <div className="pb-40">
        <PageBox>
          <hr className="mb-6 border-navy-900/10" />
          <p className="max-w-[46ch] text-[12.5px] leading-[1.5] text-ink-faint">
            The whole page, including mobile 03 and the funnel, is at{" "}
            <code>/</code>.
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
