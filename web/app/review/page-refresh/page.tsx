import { Suspense } from "react";

import { Stage } from "./stage";

/**
 * The page-refresh comparison: section eyebrows, three ways.
 *
 * The FAQ's alignment is **not** a variant here. Its headline started at 240
 * while every other section on the page starts at 158, and once Jon chose a
 * left-aligned hero it was the only centred block left. That is a defect
 * against the page's own axis rather than a choice, so it is simply fixed and
 * shipped.
 *
 * What is genuinely open is the eyebrows, and **both alternatives are spec
 * overrides in opposite directions** —
 * `components/layout/section-eyebrow.tsx` lists the clauses.
 *
 * Real page, controls floating at the bottom. `?v=` holds the state.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function PageRefreshReviewPage() {
  return (
    <Suspense>
      <Stage />
    </Suspense>
  );
}
