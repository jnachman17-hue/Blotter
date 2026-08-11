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
 *
 * ## What changed for mobile, and why it is not a second page width
 *
 * The box used to be exactly 1124px at every viewport, so on a 375px phone
 * every section stuck out 749px past the right edge. It is now a *ceiling*
 * rather than a fixed number: as wide as the screen allows, up to 1124px. On
 * any desktop the screen is wider than the ceiling, so the box is 1124px and
 * nothing about the ratified composition changes. Jon confirmed this reading on
 * August 10, 2026 — a maximum is not a second width.
 *
 * Below the desktop breakpoint the box takes a second ceiling, `PAGE_BOX_MOBILE_W`.
 * That is what keeps a tablet from receiving a phone layout stretched across
 * 1024px: it gets a phone-shaped column, centred, which reads as intentional.
 * 480px sits above the widest current phone (440px, iPhone 16 Pro Max) so no
 * phone ever hits it and sees margins, and it holds body copy at about 55
 * characters, which is inside the comfortable measure.
 *
 * The breakpoint itself lives in `globals.css` as `--breakpoint-desk`, because
 * it has to be expressible in a media query. Both widths are set from here so
 * this file stays the single source of truth for the numbers.
 */

import { TOTAL_W, VISUAL_SCALE } from "@/components/hero/hero-visual";

export const PAGE_BOX_W = Math.round(TOTAL_W * VISUAL_SCALE);

/**
 * The ceiling below `--breakpoint-desk`. Above the widest phone, inside a
 * comfortable reading measure. See the note above.
 */
export const PAGE_BOX_MOBILE_W = 480;

export function PageBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      /*
        20px gutters on a phone, 24px from the desktop breakpoint. The phone
        gutter is narrower because 24px each side of a 360px screen spends 13%
        of the viewport on margin.
      */
      className="page-box mx-auto w-full px-5 desk:px-6"
      style={
        {
          maxWidth: PAGE_BOX_W + 48,
          "--page-box-w": `${PAGE_BOX_W}px`,
          "--page-box-mobile-w": `${PAGE_BOX_MOBILE_W}px`,
        } as React.CSSProperties
      }
    >
      <div className="page-box__inner mx-auto w-full">{children}</div>
    </div>
  );
}
