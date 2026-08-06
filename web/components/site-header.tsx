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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-6">
        <a href="#top" aria-label="Blotter, back to top" className="text-navy-900">
          <BlotterLockup size={22} />
        </a>
        <CtaButton location="header" size="compact" />
      </div>
    </header>
  );
}
