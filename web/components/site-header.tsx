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
/**
 * Whether the bar carries the page's tagline, and what it does on scroll.
 *
 * `off` is live. The other two are the August 11, 2026 review.
 *
 * **The reason this is even available is a phone-width argument that does not
 * apply here.** The tagline in the header was built and rejected during stage
 * 10: 79 characters of uppercase at 12.5px with 0.1em tracking needs about
 * 630px, and a 390px bar has roughly 265px once the lockup and padding are
 * out, so it went to two lines. The desktop bar is 1400px, with the lockup at
 * ~85 and the CTA at ~150. 630 fits with 300px to spare. The objection was
 * never to the idea.
 *
 * What it buys is not tidiness: **it takes about 51px out of the hero**, which
 * is the difference between the film clearing the fold on a small laptop and
 * borrowing spacing to make it fit.
 */
export type HeaderTagline = "off" | "persist" | "scroll";

/*
  RATIFIED August 11, 2026: `persist`, left. Jon, having compared all four
  combinations on the whole page: *"Left persists it is."*

  **Left, on measurement rather than taste.** At 1440 the page's content runs
  158 to 1282 and the lockup sits at 44. Centred, the tagline ran 382 to 1058 —
  aligned with the content, the lockup and the headline all at once, which is to
  say with nothing. It sat on the viewport's centre axis, and no other element
  on this page uses that axis. Beside the lockup it is a descriptor on a
  wordmark, which is a relationship rather than a coincidence.

  **Persist was Jon's call against my recommendation, and his argument is the
  better one for this page.** Mine was that the bar already gains a fill and an
  edge on scroll, so adding a permanent 630px line makes the scrolled bar
  heavier than the resting bar, which is backwards. His is that Blotter is
  unknown and about to be promoted cold, so a descriptor that survives at any
  scroll depth is doing a functional job rather than decorating. For a known
  brand I would still fade it. This is not a known brand.

  The defaults below are the shipped state, so `app/page.tsx` and its Suspense
  fallback both inherit it. `/review/hero` overrides to keep the comparison.
*/

/**
 * Where the tagline sits in the bar.
 *
 * `left` groups it with the lockup, which is what a descriptor is: it belongs
 * to the wordmark. `center` puts it on the page's own centre axis, independent
 * of both the brand and the CTA, which reads as a statement about the page
 * rather than a label on the brand.
 *
 * Centred is absolutely positioned rather than a third flex child, because
 * `justify-between` across three items centres it between the lockup and the
 * button, not in the bar. Those differ by about 30px here, and the whole point
 * of the option is that it lands on the page's axis.
 */
export type HeaderTaglineAlign = "left" | "center";

/** Ratified, `01-HERO`. One copy, so the two placements cannot drift. */
const TAGLINE =
  "The non-AI slop tracker that actually saves you time";

const TAGLINE_TYPE =
  "text-eyebrow leading-none font-medium tracking-[0.1em] text-navy-500 uppercase whitespace-nowrap";

export function SiteHeaderBar({
  mobileCta = true,
  mode = "full",
  tagline = "persist",
  taglineAlign = "left",
}: {
  mobileCta?: boolean;
  mode?: HeaderMode;
  tagline?: HeaderTagline;
  taglineAlign?: HeaderTaglineAlign;
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
      data-tagline={tagline}
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
          "site-header__bar relative mx-auto flex max-w-[1400px] items-center justify-between px-5 desk:px-6",
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
        {/*
          Brand and tagline are one group. The tagline is the wordmark's
          descriptor, so it sits with it rather than floating in the middle of
          the bar under `justify-between`.

          Desktop only, always. The phone bar has no room and that finding
          stands.
        */}
        <div className="flex items-center gap-4">
          <a
            href="#top"
            aria-label="Blotter, back to top"
            className="flex min-h-11 items-center text-navy-900 desk:min-h-0"
          >
            <BlotterLockup size={22} />
          </a>
          {tagline !== "off" && taglineAlign === "left" && (
            <>
              <span
                aria-hidden="true"
                className="site-header__tagline hidden h-3.5 w-px bg-navy-900/15 desk:block"
              />
              <p className={cn(TAGLINE_TYPE, "site-header__tagline hidden desk:block")}>
                {TAGLINE}
              </p>
            </>
          )}
        </div>

        {tagline !== "off" && taglineAlign === "center" && (
          <p
            className={cn(
              TAGLINE_TYPE,
              "site-header__tagline pointer-events-none absolute left-1/2 hidden -translate-x-1/2 desk:block",
            )}
          >
            {TAGLINE}
          </p>
        )}
        {/* Desktop always carries it: four placements are ratified there and a
            desktop reader can see the whole page at once. */}
        {/*
          The setup link, added September 3, 2026.

          `27-BRIEF-WEBSITE-AUDIT.md` §5: *"a header link leads to a page that
          walks through"* the install. This is that link.

          **Desktop only, and quiet.** It is a door for somebody who has already
          decided, not a second call to action — a phone bar has roughly 265px
          once the lockup and the CTA are out, which is the same measurement
          that kept the tagline off the phone. Below the breakpoint the footer
          and the privacy page both reach `/setup`.

          Set in the tagline's type rather than the CTA's so it reads as
          navigation. It sits before the button because the button is the
          primary and a secondary link after it reads as an afterthought.
        */}
        <div className="flex items-center gap-5">
          <a
            href="/setup"
            className="hidden text-small font-medium text-navy-500 transition-colors duration-150 ease-out hover:text-navy-900 desk:block"
          >
            Set up
          </a>
          <div className={mobileCta ? undefined : "hidden desk:block"}>
            <CtaButton location="header" size="compact" />
          </div>
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
