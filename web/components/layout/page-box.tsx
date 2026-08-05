/**
 * The page's shared bounding box.
 *
 * Every section aligns to the same box, and the box is exactly the width of
 * the scaled hero visual. That is what lets the hero's asymmetric composition
 * read as structure rather than as a centring mistake: the headline sits on
 * the sheet's left edge and the supporting column ends on the cue column's
 * right edge because all three are bounded by this one measurement.
 *
 * Sections 3 through 7 inherit it. Do not introduce a second page width.
 */

import { TOTAL_W, VISUAL_SCALE } from "@/components/hero/hero-visual";

export const PAGE_BOX_W = Math.round(TOTAL_W * VISUAL_SCALE);

export function PageBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto px-6" style={{ maxWidth: PAGE_BOX_W + 48 }}>
      <div className="mx-auto" style={{ maxWidth: PAGE_BOX_W }}>
        {children}
      </div>
    </div>
  );
}
