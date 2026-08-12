import { Suspense } from "react";

import { Stage } from "./stage";

/**
 * Internal review surface for the hero's top block, above the film.
 *
 * Jon, August 11, 2026: *"we're gonna actually need to research sites that we
 * like, lean on skills, and try and redesign this top part quite a bit
 * better."*
 *
 * Six options: what is live, plus five compositions. Every variant is desktop
 * only — the phone hero was settled in stage 10 and is not in question.
 *
 * Two things are held constant across all five so the comparison has one
 * variable: the supporting paragraph drops to the phone's ratified 13-word
 * line, and the authority line moves below the film. Both are argued in
 * `components/hero/hero-top.tsx`.
 *
 * Review at 1440 and again at a laptop height. Keys 1 to 6 and the arrows
 * switch; `?v=` holds the selection across a reload.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function HeroReviewPage() {
  return (
    <main>
      {/* `Stage` reads `?v=` through `useSearchParams`, which needs a boundary. */}
      <Suspense>
        <Stage />
      </Suspense>
    </main>
  );
}
