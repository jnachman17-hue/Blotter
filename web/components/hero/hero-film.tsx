"use client";

/**
 * The mobile hero visual: Film C, looping.
 *
 * ## Why the hero is a film on a phone and a spreadsheet on a desktop
 *
 * The desktop hero's mechanism *is* its sideways relationship — activity on the
 * right, a connector, the row it changed on the left. A phone has no "beside".
 * Shrinking the 1322px composition to fit lands it at 0.265, where the sheet's
 * own type falls under 4px: a hero that fits and cannot be read.
 *
 * Film C is the same argument built for the device. Its first frame does an
 * intro card's job for free — a recognisable Sheets window and legible headers
 * — and its three beats are Section 3's three ratified moments, so the film
 * cannot contradict the page. The desktop composition is untouched and stays
 * the hero above `desk`.
 *
 * ## 1:1, not the film's native 4:5
 *
 * Both built films are authored with every visible element inside a 1:1 safe
 * band, and `social/README.md` calls the 4:5's extra height margin. The square
 * crop therefore shows identical content at identical size and buys about 97px
 * of the fold — most of a CTA — for nothing. Jon compared both on his phone on
 * August 10, 2026 and chose the square.
 *
 * The crop is expressed in CSS rather than measured in JS so it is correct in
 * the server-rendered HTML. A 1080x1080 crop out of 1080x1350 drops 135 rows at
 * each end; against the *square* container that is 12.5%.
 *
 * ## Inset rather than full bleed
 *
 * Also Jon's call. Full bleed is 9% wider, but Film C's own type floor already
 * clears legibility at this size, so the width buys nothing — and the film is a
 * product demo, which reads as an object on the page rather than as the page's
 * atmosphere. It is also the only element that would otherwise break the
 * bounded-box discipline.
 *
 * ## Loading
 *
 * `loading="lazy"` with a `desk:hidden` wrapper: a lazily-loaded iframe inside
 * a `display: none` subtree is never fetched, so desktop pays nothing for a
 * 292KB asset it does not show, while a phone fetches it immediately because it
 * is in the viewport.
 */

import { useSyncExternalStore } from "react";

/** Native canvas. Both built films share it. */
const FILM_W = 1080;
const FILM_H = 1350;

/** `?bare=1` strips the scrub bar so it reads as an asset, not a player. */
const FILM_SRC = "/film/blotter-film-c-4x5.html?bare=1";

/**
 * The still shown when a visitor asks for reduced motion.
 *
 * `9.0s` is inside the silence beat's hold, after its row has landed and while
 * nothing is moving: all three rows are in their end state, which is the
 * ratified tracker. It is the one frame that carries the whole argument, which
 * is exactly what a static substitute has to do. The film exposes `?t=` as a
 * deterministic frame render, so this costs nothing.
 */
const STILL_SRC = "/film/blotter-film-c-4x5.html?bare=1&t=9.0";

/** A 1:1 centre crop of a 4:5 canvas hides 12.5% of the square at each end. */
const CROP_TOP = "-12.5%";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * A media query is an external store, so it is read as one.
 *
 * The server snapshot is `false` — the film, not the still. The server cannot
 * know the preference, and defaulting to the still would make the common case
 * wait for JavaScript to get its hero. A reader who has asked for reduced
 * motion gets one frame swap on hydration instead of a running film, which is
 * the right way round: the majority pays nothing and the minority pays a swap.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function HeroFilm() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="mt-7 desk:hidden">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-[#eef2f8] ring-1 ring-navy-900/[0.06]"
        style={{ aspectRatio: "1 / 1" }}
      >
        <iframe
          /* Remounts on the preference change so the still and the film never
             race each other for the same frame. */
          key={reduced ? "still" : "film"}
          src={reduced ? STILL_SRC : FILM_SRC}
          title="A recruiting tracker updating itself: an email arrives, a meeting completes, and a contact goes quiet"
          loading="lazy"
          scrolling="no"
          className="absolute left-0 w-full border-0"
          style={{ aspectRatio: `${FILM_W} / ${FILM_H}`, top: CROP_TOP }}
        />
      </div>
    </div>
  );
}
