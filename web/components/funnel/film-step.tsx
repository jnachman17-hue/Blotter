"use client";

/**
 * The film step, replacing the three-frame product experience.
 *
 * Jon cut `WS4-SPEC.md`'s three click-to-progress frames on August 6, 2026 and
 * asked for Film A in their place. The film is the launch asset built in a
 * parallel chat and lives at `social/blotter-film-a-4x5.html`; a copy sits in
 * `public/film/` because Next serves static files only from `public`, and that
 * copy carries one addition — `?bare=1`, which strips the film's scrub bar so
 * it reads as an asset rather than as a player. The source in `social/` is
 * untouched.
 *
 * **4:5 is the right shape here, not a compromise.** The film was authored
 * portrait for X and LinkedIn, and a modal card is portrait too, so it sits in
 * a column beside the copy at its native aspect with nothing cropped. It is the
 * one placement on this project where the phone aspect is an advantage.
 *
 * It is embedded in an iframe rather than ported to React on purpose: the film
 * is 250KB of self-contained timing code that another chat is still editing.
 * Re-implementing it would fork it. Refreshing the copy is a file copy.
 *
 * What survives from `WS4-SPEC.md`'s frame rules: back navigation is allowed
 * and does not refire events, nothing is a mandatory gate, and
 * `product_experience_completed` fires on the way out — not on render.
 *
 * The `1 of 3` progress indicator goes with the frames it counted.
 */

import { useState } from "react";

import { CONTINUE } from "@/lib/funnel-copy";
import { track } from "@/lib/analytics";
import { useFunnel } from "@/lib/funnel-store";

/** Native size of the film stage, and the aspect the frame is held at. */
const FILM_W = 1080;
const FILM_H = 1350;

/** Rendered width inside the card. 4:5 gives 475px of height at this width. */
const SLOT_W = 380;
const SLOT_H = Math.round((SLOT_W * FILM_H) / FILM_W);

export function FilmStep() {
  const goTo = useFunnel((s) => s.goTo);
  const [loaded, setLoaded] = useState(false);

  function next() {
    track("product_experience_completed");
    goTo("email");
  }

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-9 p-8">
      <div
        className="relative overflow-hidden rounded-lg bg-[#eef2f8]"
        style={{ width: SLOT_W, height: SLOT_H }}
      >
        {/*
          Mounted only while this stage is on screen, so the film starts from
          its first frame every time the step is reached, including after a
          back navigation. It autoplays on load and runs 21.5 seconds.
        */}
        <iframe
          src="/film/blotter-film-a-4x5.html?bare=1"
          title="How Blotter keeps a recruiting tracker current"
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 220ms ease-out" }}
          scrolling="no"
        />
      </div>

      <div className="flex flex-col justify-center">
        {/*
          ⚠ UNRATIFIED COPY. The three frames this step replaced had ratified
          copy; this step has none, because Jon created it on August 6, 2026.
          These two lines are placeholders written to the same rules as the rest
          of the page: no dash, no availability signal, no claim the product
          cannot support. Bring them to him before public traffic.
        */}
        <h2 className="font-display max-w-[18ch] text-[1.5rem] leading-[1.25] font-bold tracking-[-0.02em] text-ink">
          This is what Blotter does.
        </h2>
        <p className="mt-4 max-w-[42ch] text-body leading-[1.62] text-ink-read">
          One recruiting cycle, and a tracker that keeps up with it. Watch it or
          continue whenever you like.
        </p>

        <div className="mt-8 max-w-[280px]">
          <button
            type="button"
            onClick={next}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-navy-900 px-6 text-[0.95rem] font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-navy-800 active:scale-[0.98]"
          >
            {CONTINUE}
          </button>
          <button
            type="button"
            onClick={() => goTo("question_window")}
            className="mt-4 text-small font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
