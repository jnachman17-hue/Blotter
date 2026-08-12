"use client";

/**
 * The header tagline, four ways, on the whole page.
 *
 * Jon chose layout G on August 11, 2026 and is leaning toward the tagline
 * persisting. What is left is where it sits and whether it survives scrolling,
 * so this route stops being a hero comparison and becomes **the real page**:
 * the actual header, the actual sections, the actual footer.
 *
 * *"show this more page content below so I can scroll more to get the feel."*
 *
 * That is the right instinct and it is why the earlier harness chrome is gone.
 * A persistent tagline cannot be judged from the top of the page. The question
 * it raises is what the bar feels like at section 04, and a stub cannot answer
 * that.
 *
 * The controls float at the bottom rather than sitting above the fold, so the
 * page reads from its first pixel exactly as it will ship.
 *
 * The earlier variants A to H are still in `components/hero/hero-top.tsx`; only
 * this harness narrowed. `Hero` still takes `top`, so any of them can be put
 * back in front of Jon by changing one string.
 */

import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { Funnel } from "@/components/funnel/funnel";
import { DataAndPrivacy } from "@/components/sections/data-and-privacy";
import { FaqAndClose } from "@/components/sections/faq-and-close";
import { Hero } from "@/components/sections/hero";
import { Ownership } from "@/components/sections/ownership";
import { ScaleAndConsequence } from "@/components/sections/scale-and-consequence";
import { TrackerAndActions } from "@/components/sections/tracker-and-actions";
import {
  SiteHeaderBar,
  type HeaderTagline,
  type HeaderTaglineAlign,
} from "@/components/site-header";

import { Picker } from "../sheet-mobile/picker";

type Combo = {
  key: string;
  label: string;
  align: HeaderTaglineAlign;
  behaviour: HeaderTagline;
};

/**
 * Two axes, four combinations. Alignment shows immediately; behaviour only
 * shows once you move, which is the whole reason the page is here in full.
 */
const COMBOS: Combo[] = [
  { key: "left-persist", label: "Left · persists", align: "left", behaviour: "persist" },
  { key: "left-fade", label: "Left · fades", align: "left", behaviour: "scroll" },
  { key: "center-persist", label: "Centred · persists", align: "center", behaviour: "persist" },
  { key: "center-fade", label: "Centred · fades", align: "center", behaviour: "scroll" },
];

export function Stage() {
  const params = useSearchParams();
  const fromUrl = COMBOS.findIndex((c) => c.key === params.get("v"));
  const [i, setI] = useState(fromUrl >= 0 ? fromUrl : 0);

  const change = useCallback((next: number) => {
    setI(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", COMBOS[next].key);
    window.history.replaceState(null, "", url);
  }, []);

  const active = COMBOS[i];

  return (
    <div data-section-numbers="on">
      {/*
        The page as it ships, with layout G in the hero.

        `key` on the header remounts it when the combination changes, so the
        scroll flag re-reads from the current position instead of carrying a
        stale `data-elevated` across a switch.
      */}
      <SiteHeaderBar
        key={active.key}
        tagline={active.behaviour}
        taglineAlign={active.align}
      />
      <div className="field-open">
        <main id="top">
          <Hero top="g" />
        </main>
      </div>
      <ScaleAndConsequence />
      <Ownership />
      <TrackerAndActions />
      <DataAndPrivacy />
      <FaqAndClose />
      <Funnel />

      <Picker
        labels={COMBOS.map((c) => c.label)}
        current={i}
        onChange={change}
      />
    </div>
  );
}
