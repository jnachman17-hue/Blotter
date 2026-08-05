"use client";

/**
 * Sticky header with the fourth CTA placement.
 *
 * Authority: PLAN-AMENDMENTS-2026-08-01.md — "Retain the sticky-header CTA.
 * The spreadsheet landing page has four CTA placements, all entering the same
 * canonical funnel", origin `header`.
 *
 * The displayed brand is `Blotter` (WS4-SPEC). No canonical logo mark exists
 * yet: the stacked-record mark inside the Section 3 asset is authoritative for
 * that asset only and must not be reused here (04-decision-log.md).
 */

import { CtaButton } from "./cta-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-page/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <a
          href="#top"
          className="text-[1.0625rem] font-semibold tracking-tight text-ink"
        >
          Blotter
        </a>
        <CtaButton location="header" size="compact" />
      </div>
    </header>
  );
}
