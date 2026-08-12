import { Suspense } from "react";

import { Stage } from "./stage";

/**
 * Internal review surface for how section 02 names its two zones.
 *
 * Jon, August 11, 2026, on the ratified treatment: *"terrible UI that isn't
 * presented well is hard to read."* He had already used that judgement to cut
 * the hero's version of the same device, and the two could not be defended
 * differently.
 *
 * **The measured fault, which is not the one first proposed.** The labels do
 * not sit above the columns they name — they sit above the whole Google Sheets
 * window, with a title bar, a menu row, a formula bar and a row of column
 * letters between them and the first cell. A 1px bracket with 10px end ticks
 * cannot reach across that, so the label floats free of its object. Restyling
 * the bracket would not have fixed it; moving the label inside the sheet does.
 *
 * **The second fault is the rework's own.** After `09` §4's headline
 * arrangement lands, the deck one section-width above says exactly what the two
 * labels say, and the supporting paragraph ends on the words the right-hand
 * sublabel repeats. The labels became a restatement of the sentences above
 * them.
 *
 * The winner becomes an amendment to `05-SECTION-5` and the losing branches
 * come out of `components/section-45/parts.tsx`.
 *
 * Review at 1440. Keys 1 to 4 and the arrows switch; `?v=` holds the selection
 * across a reload.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function OwnershipReviewPage() {
  return (
    <main>
      {/* `Stage` reads `?v=` through `useSearchParams`, which needs a boundary. */}
      <Suspense>
        <Stage />
      </Suspense>
    </main>
  );
}
