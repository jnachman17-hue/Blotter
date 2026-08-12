"use client";

/**
 * The whole page, with the eyebrow state switchable.
 *
 * Rendered in full rather than as section stubs: an eyebrow is a rhythm
 * decision, and rhythm is only visible across a scroll. Same reason
 * `/review/hero` mounts the real page.
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
import { SiteHeaderBar } from "@/components/site-header";

import { Picker } from "../sheet-mobile/picker";

type State = "spec" | "all" | "none";

const OPTIONS: { key: State; label: string }[] = [
  { key: "spec", label: "Spec · 01 only" },
  { key: "all", label: "All sections" },
  { key: "none", label: "No sections" },
];

export function Stage() {
  const params = useSearchParams();
  const found = OPTIONS.findIndex((o) => o.key === params.get("v"));
  const [i, setI] = useState(found >= 0 ? found : 0);

  const change = useCallback((next: number) => {
    setI(next);
    const url = new URL(window.location.href);
    url.searchParams.set("v", OPTIONS[next].key);
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <div data-section-numbers="on" data-section-eyebrows={OPTIONS[i].key}>
      <SiteHeaderBar />
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
        labels={OPTIONS.map((o) => o.label)}
        current={i}
        onChange={change}
      />
    </div>
  );
}
