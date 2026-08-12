import { Suspense } from "react";

import { Stage } from "./stage";

/**
 * The header tagline, on the whole page.
 *
 * Layout G is chosen (Jon, August 11, 2026). What is left is the tagline: left
 * beside the lockup or centred on the page axis, and persisting or fading once
 * you scroll.
 *
 * **This route renders the real page**, not a hero stub, because Jon asked to
 * scroll it — and because a persistent tagline is not a top-of-page question.
 * The thing worth judging is what the bar feels like at section 04.
 *
 * Controls float at the bottom, so the page reads from its first pixel exactly
 * as it will ship. `?v=` holds the combination across a reload.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function HeroReviewPage() {
  return (
    /* No wrapper element: `Stage` now renders the real page, which owns its
       own `<main id="top">`. Wrapping it in another would nest two. */
    <Suspense>
      <Stage />
    </Suspense>
  );
}
