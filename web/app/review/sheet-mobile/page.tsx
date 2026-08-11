import { Suspense } from "react";

import { Stage } from "./stage";

/**
 * Internal review surface for the one decision that blocked mobile 02: how the
 * ten-column Blotter tab renders on a phone.
 *
 * Jon ruled for a deliberate crop on August 11, 2026 — `09-page-argument-rework.md`
 * §5 and `04-decision-log.md` session 7. The approach is settled; which crop is
 * not. Three variants here, the winner becomes the amendment to
 * `05-SECTION-5` §12 and the other two branches are deleted from
 * `components/section-45/sheet-phone.tsx`.
 *
 * Review at real device width. Keys 1 to 3 and the arrows switch; `?v=` holds
 * the selection across a reload.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function SheetMobileReviewPage() {
  return (
    <main>
      {/* `Stage` reads `?v=` through `useSearchParams`, which needs a boundary. */}
      <Suspense>
        <Stage />
      </Suspense>
    </main>
  );
}
