"use client";

/**
 * Four ways of naming the two zones, in the assembled section.
 *
 * The section shows whole rather than the sheet alone. Showing a visual with
 * its argument stripped away is why the first pass of `/review/sheet-mobile`
 * could not be judged, and the point here is precisely whether the labels
 * repeat the copy above them — which is invisible if the copy is not there.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { PageBox } from "@/components/layout/page-box";
import { Ownership } from "@/components/sections/ownership";
import { type ZoneTreatment } from "@/components/section-45/parts";

import { Picker } from "../sheet-mobile/picker";

const VARIANTS: { key: ZoneTreatment; label: string; note: string }[] = [
  {
    key: "none",
    label: "A · None",
    note: "No labels. The cream header band, the 3px divider and the deck above the sheet carry the split between them. Nothing is lost that is not already said in words one section-width above — which is the case for cutting them: after the headline arrangement, `You add these` and `Blotter keeps these current` are the deck restated forty pixels lower.",
  },
  {
    key: "banner",
    label: "B · Banner",
    note: "A merged banner row inside the sheet, directly above the column headers, each half filled with its own zone colour. This is what a person actually does in Sheets to label a column group, so it adds to the Google Sheets context rather than costing any. The 3px divider now runs unbroken from the top of the grid to the bottom.",
  },
  {
    key: "banner-sub",
    label: "C · Banner + sub",
    note: "The same banner, keeping both subtitles. Tests whether `The contacts and context you choose` and `Updated from Gmail and Calendar` are carrying anything the headline, deck and paragraph do not already say. The second is a near-verbatim repeat of the paragraph's last four words.",
  },
  {
    key: "above",
    label: "Ratified",
    note: "What is live today, kept for comparison. Note where the labels actually sit: above the whole application window, with the title bar, menus, formula bar and column letters between them and the first cell they name. That distance is the fault, not the styling.",
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
          <p className="mt-2 max-w-[70ch] text-[13px] leading-[1.5] text-ink-muted">
            {active.note}
          </p>
          <hr className="mt-6 border-navy-900/10" />
        </PageBox>
      </div>

      {/* Keyed so switching re-mounts and `Fit` re-measures cleanly. */}
      <Ownership key={active.key} zones={active.key} />

      <div className="pb-40">
        <PageBox>
          <hr className="mb-6 border-navy-900/10" />
          <p className="max-w-[70ch] text-[12.5px] leading-[1.5] text-ink-faint">
            Review this at 1440. The treatments differ only above the
            breakpoint — the phone renders the swipe, whose zone labels ride the
            scroll and are ratified separately.
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
