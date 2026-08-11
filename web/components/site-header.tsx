"use client";

/**
 * The header, and the fourth CTA placement.
 *
 * Authority: PLAN-AMENDMENTS-2026-08-01.md — "Retain the sticky-header CTA.
 * The spreadsheet landing page has four CTA placements, all entering the same
 * canonical funnel", origin `header`.
 *
 * The brand is the ratified `Ledger B` lockup (Jon, August 5, 2026). It
 * replaces the plain Geist wordmark this header carried while no canonical mark
 * existed. The provisional stacked-record mark inside the Section 3 asset is
 * still authoritative for that asset alone and is not the identity.
 *
 * ## The sticky header was never sticky
 *
 * Found on August 11, 2026, measuring rather than reading: at `scrollY` 2200
 * this header sat at document y=850 and was long gone off screen. It is
 * `position: sticky`, but **its parent is the hero's 910px `field-open`
 * wrapper**, and a sticky element can only travel inside its parent's box. So
 * it pinned for 910px and then left with the hero.
 *
 * That is a defect on **both** surfaces, and it makes a piece of recorded
 * reasoning wrong: `08-desktop-changes-pending.md` §2 argued against the mobile
 * bottom bar partly on the grounds that "the header CTA is the only persistent
 * one". It was not persistent anywhere.
 *
 * Fixed below the breakpoint only, because stage 10 does not touch desktop.
 * `position: fixed` rather than restructuring the DOM: moving the header out of
 * the hero wrapper would fix both surfaces at once, and desktop's half belongs
 * in `08` until Jon takes it.
 */

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BlotterLockup } from "./brand/blotter-mark";
import { CtaButton } from "./cta-button";
import { cn } from "@/lib/cn";

/**
 * How the fixed mobile header behaves as the reader travels.
 *
 * `full` holds its 60px the whole way down. `shrink` drops to 48px and loses
 * the wordmark's descender room once the hero is behind you, on the argument
 * that a header earns less of a short screen the further in you are.
 *
 * Both are built because Jon asked to compare them. Neither animates the CTA
 * itself: the button is the one thing on the bar that must not move, since it
 * is a target the reader may already be reaching for.
 */
export type HeaderMode = "full" | "shrink";

/**
 * True once the hero is behind the reader. Only `shrink` reads it.
 *
 * Guarded so it sets state on the crossing rather than on every scroll event —
 * a `setState` per frame during a flick is the cheapest way to make a page feel
 * expensive. The threshold sits below the hero's fold so the bar has settled
 * before the first section arrives.
 */
function useScrolledPast(px: number, enabled: boolean) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const read = () => setPast((prev) => {
      const next = window.scrollY > px;
      return prev === next ? prev : next;
    });
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [px, enabled]);
  return past;
}

/**
 * The bar itself, with no dependency on the URL.
 *
 * Split out because `useSearchParams` forces a client-side bail, and a Suspense
 * fallback that calls it bails as well — which is exactly what broke the
 * production build the first time. The fallback renders **this**, so the header
 * is server-rendered in its default mode and the parameter reader below is the
 * only part that waits.
 */
export function SiteHeaderBar({
  mobileCta = true,
  mode = "full",
}: {
  mobileCta?: boolean;
  mode?: HeaderMode;
}) {
  const scrolled = useScrolledPast(240, mode === "shrink");

  return (
    <header
      data-header-mode={mode}
      {...(scrolled ? { "data-scrolled": "" } : {})}
      className={cn(
        "site-header z-40 backdrop-blur-md",
        /* Fixed on a phone so it actually persists; the ratified desktop
           behaviour is untouched and still scoped to the hero wrapper. */
        "fixed inset-x-0 top-0 desk:sticky",
      )}
    >
      <div
        className={cn(
          "site-header__bar mx-auto flex max-w-[1400px] items-center justify-between px-5 desk:px-6",
          "h-[60px]",
        )}
      >
        {/*
          44px on a phone. The lockup is 22px tall and the anchor around it
          measured 85x29, which is under the Phase 6 floor; the bar is 60px so
          the height is free, and the mark itself does not change size.
        */}
        <a
          href="#top"
          aria-label="Blotter, back to top"
          className="flex min-h-11 items-center text-navy-900 desk:min-h-0"
        >
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

/**
 * `?header=shrink` is a temporary comparison affordance, not a feature. Jon
 * asked to see both on August 11, 2026; whichever he keeps, this wrapper and
 * the mode it feeds come out and `SiteHeaderBar` stays.
 */
export function SiteHeader({ mobileCta = true }: { mobileCta?: boolean }) {
  const params = useSearchParams();
  return (
    <SiteHeaderBar
      mobileCta={mobileCta}
      mode={params.get("header") === "shrink" ? "shrink" : "full"}
    />
  );
}
