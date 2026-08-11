"use client";

/**
 * Mobile 02, whole, in two treatments.
 *
 * The first pass showed the sheet on its own with the section stripped away,
 * and Jon could not tell what it was for — correctly, because a visual with its
 * argument removed is not judgeable. Everything the section says is here now:
 * the number, the headline, the deck, the paragraph, the reassurance claims and
 * the refusals. The only thing that differs between the two options is the
 * sheet.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import { Mobile02 } from "@/components/section-45/mobile-02";
import { type PhoneSheetVariant } from "@/components/section-45/sheet-phone";

import { Picker } from "./picker";

const VARIANTS: { key: PhoneSheetVariant; label: string; note: string }[] = [
  {
    key: "crop",
    label: "Crop",
    note: "Static. Four columns, the divider on screen at rest, the zone labels small but still sitting over the columns they name. Whole argument in a screenshot. The six columns it drops are named underneath.",
  },
  {
    key: "swipe",
    label: "Swipe",
    note: "All ten columns at full size. Swipe and the zone you reach washes and names itself. Nothing is shrunk and nothing is dropped, but a reader who does not swipe sees only the half you own.",
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
            Section 03, the Outstanding list, follows this on the real page and
            carries the CTA. Not built yet.
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
