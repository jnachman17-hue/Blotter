"use client";

/**
 * The mobile sticky CTA bar — the fifth placement, `cta_location = sticky`.
 *
 * Approved by Jon on August 10, 2026 for the mobile build. It supersedes the
 * four-placement count in `PLAN-AMENDMENTS-2026-08-01.md` and nothing else:
 * all five enter the same canonical funnel, and `cta_location` is a property
 * rather than an event, so the frozen nine are untouched.
 *
 * ## Why it earns its place
 *
 * The one real visitor this page has had clicked the CTA **nine seconds after
 * landing**, on a desktop. A phone reader decides at least as fast and then
 * scrolls eleven screenfuls, during which the page currently offers no way in
 * until the Sections 4 and 5 CTA. A thumb-reachable bar is the highest-leverage
 * mobile conversion pattern there is, and it is the difference between deciding
 * *when you decide* and deciding *when the page next offers*.
 *
 * ## Why it is not there at the top
 *
 * It appears only once the hero's own CTA has scrolled out of view.
 *
 * Two reasons, and the first is the one that matters: **the first screenful is
 * the scarcest thing on this page.** A phone gives roughly 700 usable pixels
 * and the hero has to fit a headline, the film and a CTA inside it; spending 76
 * of those on a bar duplicating a button already on screen is a straight loss.
 * The second is that two identical buttons visible at once reads as a mistake
 * rather than as persistence.
 *
 * ## Mobile only
 *
 * Hidden from the desktop breakpoint up. Desktop already carries four
 * placements inside a page a reader can see whole, and the sticky header CTA
 * covers the same job there. That also makes the data clean: a `sticky` in
 * `funnel_started` is by definition a small-screen visitor.
 */

import { useEffect, useState } from "react";

import { CtaButton } from "@/components/cta-button";
import { cn } from "@/lib/cn";
import { useFunnel } from "@/lib/funnel-store";

/**
 * Height of the bar without its safe-area padding. The page reserves exactly
 * this much at its foot — see `StickyCtaSpacer`.
 *
 * Kept as explicit arithmetic rather than a round number because it drifted
 * once already: it was 76 while the button was at the 44px floor, and raising
 * the button to 52 left the bar 9px taller than the space reserved for it, so
 * it sat on the last line of the footer.
 *
 *   16 top padding + 52 button + 16 bottom padding + 1 top border = 85
 */
export const STICKY_CTA_H = 16 + 52 + 16 + 1;

/**
 * The hero CTA this bar takes over from.
 *
 * An `id` set directly in `sections/hero.tsx` rather than a constant shared
 * from here. That file is a server component, and importing a value out of a
 * `"use client"` module into one gives you a client reference rather than the
 * string — a computed-key spread built from it renders no attribute at all,
 * silently, which is exactly what happened on the first build of this.
 */
const HERO_CTA_ID = "hero-cta";

export function StickyCta() {
  const [shown, setShown] = useState(false);
  /* The funnel is a modal over the page. A bar floating above its backdrop
     would be both wrong and tappable through the overlay. The store has no
     `isOpen`; `closed` is a stage like any other. */
  const funnelOpen = useFunnel((s) => s.stage !== "closed");

  useEffect(() => {
    /*
      A scroll position rather than an `IntersectionObserver`.

      The observer version was the obvious implementation and it is the wrong
      one here. Its semantics depend on the root, and the root is implicit —
      which makes the behaviour hard to reason about, hard to verify, and
      different inside a nested browsing context. A single number compared
      against `scrollY` has none of that: it is the same in every environment
      and it can be checked by reading one value.
    */
    function handoverPoint() {
      const hero = document.getElementById(HERO_CTA_ID);
      /*
        No hero CTA means no handover point, so the bar shows from the start
        rather than never. That is the safe failure: a visitor always has a way
        into the funnel.
      */
      if (!hero) return 0;
      const r = hero.getBoundingClientRect();
      return r.bottom + window.scrollY;
    }

    let threshold = handoverPoint();
    const update = () => setShown(window.scrollY >= threshold);
    const remeasure = () => {
      threshold = handoverPoint();
      update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", remeasure);
    /* Fonts and the film settle after first paint and move the CTA down the
       document, so the threshold measured on mount goes stale. */
    const settle = window.setTimeout(remeasure, 1200);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", remeasure);
      window.clearTimeout(settle);
    };
  }, []);

  const visible = shown && !funnelOpen;

  return (
    <div
      /*
        `z-40` matches the sticky header and sits under the funnel's `z-50`
        backdrop. `aria-hidden` plus `pointer-events-none` while hidden keeps
        it out of the tab order and off a screen reader's path — a persistently
        focusable offscreen button is a real navigation trap.
      */
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 desk:hidden",
        "border-t border-navy-900/[0.07] bg-page/92 backdrop-blur-md",
        "transition duration-200 ease-out motion-reduce:transition-none",
        !visible && "pointer-events-none",
      )}
      aria-hidden={!visible}
      style={{
        /*
          The two animated properties are inline rather than utilities, and
          deliberately.

          `opacity-100` and `translate-y-0` appear nowhere else in this project,
          so they exist only if Tailwind's scanner has seen this file. The
          production build emits them; the dev server did not, which showed up
          as a bar that correctly flipped `aria-hidden`, `tabindex` and
          `pointer-events` — those utilities exist elsewhere — while staying
          invisible and parked off-screen. An inline style cannot be
          tree-shaken by a scanner and behaves identically in both builds.
        */
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        /* Clears the iPhone home indicator. Falls back to 0 everywhere else. */
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="px-5 py-4">
        {/*
          Taller than the 44px accessibility floor. That floor is a minimum for
          any control; this is the primary action on the screen, sitting under
          the reader's thumb, and 44px is where a CTA stops being generous and
          starts being merely legal.
        */}
        <CtaButton
          location="sticky"
          size="large"
          full
          className="min-h-[52px]"
          tabIndex={visible ? 0 : -1}
        />
      </div>
    </div>
  );
}

/**
 * Reserves the bar's height at the foot of the page.
 *
 * The bar is `fixed`, so it is out of flow and would otherwise sit on top of
 * the last thing in the footer — which is the privacy-policy link and the
 * social marks. Rendered inside the page rather than as body padding so it
 * disappears with the bar at the desktop breakpoint.
 */
export function StickyCtaSpacer() {
  return (
    <div
      aria-hidden="true"
      className="desk:hidden"
      style={{ height: `calc(${STICKY_CTA_H}px + env(safe-area-inset-bottom, 0px))` }}
    />
  );
}
