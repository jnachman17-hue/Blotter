"use client";

/**
 * Sticky header with the fourth CTA placement.
 *
 * Authority: PLAN-AMENDMENTS-2026-08-01.md — "Retain the sticky-header CTA.
 * The spreadsheet landing page has four CTA placements, all entering the same
 * canonical funnel", origin `header`.
 *
 * The brand is the ratified `Ledger B` lockup (Jon, August 5, 2026). It
 * replaces the plain Geist wordmark this header carried while no canonical mark
 * existed. The provisional stacked-record mark inside the Section 3 asset is
 * still authoritative for that asset alone and is not the identity.
 */

import { BlotterLockup } from "./brand/blotter-mark";
import { CtaButton } from "./cta-button";

/**
 * `mobileCta` exists for the stage-10 comparison and defaults to today's
 * behaviour, so nothing changes unless a caller asks.
 *
 * The problem it lets us test: on a phone the header CTA and the hero CTA are
 * both on the first screenful, two buttons with the same four words. The hero
 * one has to stay — it is the button that follows the film — so the choice is
 * between dropping this one and keeping the bottom bar, or keeping this one and
 * dropping the bar. `/review/hero` runs both.
 */
export function SiteHeader({ mobileCta = true }: { mobileCta?: boolean }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-5 desk:px-6">
        <a href="#top" aria-label="Blotter, back to top" className="text-navy-900">
          <BlotterLockup size={22} />
        </a>
        {/* Desktop always carries it: four placements are ratified there and a
            desktop reader can see the whole page at once. */}
        <div className={mobileCta ? undefined : "hidden desk:block"}>
          <CtaButton location="header" size="compact" />
        </div>
      </div>
    </header>
  );
}
