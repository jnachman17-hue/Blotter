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
 * Fixed below the breakpoint in stage 10. **Desktop's half was taken in wave 1
 * of web reconciliation, August 11, 2026**: `<SiteHeader />` moved out of the
 * `field-open` wrapper in `app/page.tsx`, so `sticky` now has the document to
 * travel in. `.field-open` pulls itself back up under it, so the ratified hero
 * is unmoved.
 *
 * ## Why desktop's fill is gated on scroll and mobile's is not
 *
 * A header that genuinely persists passes over every band below it, and this
 * bar carries `backdrop-blur-md`. Blur over a page this light with nothing
 * behind it reads as a smear — `globals.css` says so about the phone and it is
 * just as true at 1440. So desktop needs the fill and the 1px edge that mobile
 * already has.
 *
 * **But it must not have them at rest.** The desktop hero is a ratified
 * composition and its two radial glows are at full strength in the top 60px, so
 * a 78% white veil across them at `scrollY` 0 would wash the corners of a
 * picture `08` §10 lists as deliberately unchanged. The phone has no such
 * constraint: its hero is a film that starts below the bar.
 *
 * Hence `data-elevated`, which appears at 8px of scroll — the fill arrives
 * exactly when there is content underneath to separate from, and the hero at
 * rest is pixel-identical to what was ratified.
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
  /*
    Separate from `scrolled` on purpose. `data-scrolled` fires at 240px and
    drives the phone's `shrink` comparison, which Jon ratified at that
    threshold; this fires at 8px and drives nothing but the fill. Reusing one
    attribute for both would have moved the shrink to 8px and quietly changed a
    shipped mobile behaviour.
  */
  const elevated = useScrolledPast(8, true);

  return (
    <header
      data-header-mode={mode}
      {...(scrolled ? { "data-scrolled": "" } : {})}
      {...(elevated ? { "data-elevated": "" } : {})}
      className={cn(
        "site-header z-40 backdrop-blur-md",
        /* Fixed on a phone, sticky on desktop — and since August 11, 2026 the
           sticky one is a direct child of the page, so it travels the whole
           document instead of the hero's 910px. */
        "fixed inset-x-0 top-0 desk:sticky",
      )}
    >
      <div
        className={cn(
          "site-header__bar mx-auto flex max-w-[1400px] items-center justify-between px-5 desk:px-6",
          "h-[60px]",
        )}
        /*
          Below the breakpoint the bar takes the page box's own ceiling rather
          than 1400px. Wave 1, August 11, 2026.

          `06`'s "481 to 1179px band" row is about the content column being
          capped at 480 and centred in a wide window, which is correct and
          ratified — a browser knows its width and nothing else, and 480 keeps a
          tablet from getting a stretched phone layout. **But the header was not
          obeying that cap.** At 1100px the column sat at 480 in the middle while
          this bar spanned the full 1052, which put `Try Blotter Now` roughly
          500px away from the content it belongs to. That gap is what read as
          broken, rather than the column itself.

          On any real phone the column already fills the screen, so nothing
          moves at or below 480. Above the breakpoint the ratified 1400px bar is
          untouched.
        */
        style={{ "--bar-mobile-max": "520px" } as React.CSSProperties}
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
