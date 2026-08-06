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
 * **The film sets the size of the whole dialog.** It needs the most room of any
 * screen, so `CARD_W` and `CARD_H` are chosen for it and every other step
 * composes inside what it leaves. That is why the card never resizes between
 * steps, which was Jon's note.
 *
 * It was 380px wide in the first build and he was right that it read small and
 * blurry: at that width the film's own type lands around 8px effective and
 * mushes. It is 520px now, which is 37% wider and 87% more area, and the film
 * scales itself with a CSS transform so nothing is resampled — the gain is real
 * resolution rather than a bigger blur.
 *
 * **4:5 is an advantage here, not a compromise.** The film was authored portrait
 * for X and LinkedIn; the card is portrait too, so it sits at native aspect with
 * nothing cropped.
 *
 * Embedded in an iframe rather than ported to React on purpose: it is 250KB of
 * self-contained timing code that another chat is still editing. Re-implementing
 * it would fork it; refreshing the copy is a file copy.
 *
 * What survives from WS4's frame rules: back navigation is allowed and does not
 * refire events, nothing is a mandatory gate, and `product_experience_completed`
 * fires on the way out rather than on render. The `1 of 3` progress indicator
 * went with the frames it counted.
 */

import { useState } from "react";

import { BackLink, Primary } from "@/components/funnel/parts";
import { BACK, CONTINUE } from "@/lib/funnel-copy";
import { track } from "@/lib/analytics";
import { useFunnel } from "@/lib/funnel-store";

/** Native size of the film stage, and the aspect the frame is held at. */
const FILM_W = 1080;
const FILM_H = 1350;

/** Rendered width inside the card. 4:5 puts the height at 650. */
const SLOT_W = 520;
const SLOT_H = Math.round((SLOT_W * FILM_H) / FILM_W);

export function FilmStep() {
  const goTo = useFunnel((s) => s.goTo);
  const [loaded, setLoaded] = useState(false);

  function next() {
    track("product_experience_completed");
    goTo("email");
  }

  return (
    <div className="flex h-full items-center gap-10 p-10">
      <div
        className="relative shrink-0 overflow-hidden rounded-lg bg-[#eef2f8]"
        style={{ width: SLOT_W, height: SLOT_H }}
      >
        {/*
          Mounted only while this stage is on screen, so the film starts from
          its first frame every time the step is reached, including after a back
          navigation. It autoplays on load and runs 21.5 seconds.
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

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {/*
          ⚠ UNRATIFIED COPY. The three frames this step replaced had ratified
          copy; this step has none, because Jon created it on August 6, 2026.
          Written to the same rules as the rest of the page: no dash, no
          availability signal, no claim the product cannot support. Bring these
          two lines to him before public traffic.
        */}
        <h2 className="font-display max-w-[16ch] text-[1.625rem] leading-[1.2] font-bold tracking-[-0.022em] text-ink">
          This is what Blotter does.
        </h2>
        <p className="mt-4 max-w-[34ch] text-body leading-[1.62] text-ink-read">
          One recruiting cycle, and a tracker that keeps up with it. Watch it or
          continue whenever you like.
        </p>

        <div className="mt-8 max-w-[260px]">
          <Primary onClick={next}>{CONTINUE}</Primary>
          <div className="mt-4">
            <BackLink label={BACK} onClick={() => goTo("question_window")} />
          </div>
        </div>
      </div>
    </div>
  );
}
