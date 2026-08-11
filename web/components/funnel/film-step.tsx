"use client";

/**
 * The film step, replacing the three-frame product experience.
 *
 * Jon cut `WS4-SPEC.md`'s three click-to-progress frames on August 6, 2026 and
 * asked for Film A in their place. The film is the launch asset built in a
 * parallel chat and lives at `social/blotter-film-a-4x5.html`; a copy sits in
 * `public/film/` because Next serves static files only from `public`, and that
 * copy carries one addition — `?bare=1`, which strips the film's scrub bar so
 * it reads as an asset rather than as a player.
 *
 * The two files are kept by hand and nothing propagates, so a fix has to land
 * in both. On August 11, 2026 the source in `social/` was still subtracting 40
 * horizontal pixels in bare mode that the copy here had already stopped
 * subtracting; it now matches, so a future re-copy cannot walk the fix back.
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

/*
 * The film's native stage is 1080 x 1350. That ratio now lives in exactly one
 * place, `.funnel-film-slot` in `globals.css`, which derives the slot's height
 * from its width on both surfaces. It used to be repeated here as a second
 * constant and the two could drift.
 */

/**
 * Rendered width inside the card, from the desktop breakpoint up. 4:5 puts the
 * height at the ratified 650, and `.funnel-film-slot` in `globals.css` derives
 * it from the aspect ratio rather than repeating it as a second number.
 *
 * Below the breakpoint the slot is the full width of the **screen**, capped so
 * the copy and both controls still fit: 390x487 at a 390x844 phone. Smaller
 * than desktop's 520, but it is every pixel available and well clear of the
 * 380px build that read blurry.
 */
const SLOT_W = 520;

export function FilmStep() {
  const goTo = useFunnel((s) => s.goTo);
  const [loaded, setLoaded] = useState(false);

  function next() {
    track("product_experience_completed");
    goTo("email");
  }

  return (
    /*
      Stacked on a phone, the ratified side-by-side from `desk`. Film first,
      because it is what the step is for and it is what the reader came to see;
      the copy and the controls follow it down the sheet.

      Full-bleed, too. The film had 20px gutters either side, which is 11% of a
      390px screen spent on margin around the one thing the step exists to show,
      and Jon's note was that the video is hard to see. Edge to edge also reads
      as deliberate for video in a way an inset rectangle does not. The copy
      keeps its gutters; only the film loses them.
    */
    <div className="flex h-full flex-col items-center gap-6 pt-14 pb-8 desk:flex-row desk:gap-10 desk:p-10">
      {/*
        Sized by one rule in `globals.css` rather than by utilities here.

        The phone cap is `min(100%, calc(62dvh * 0.8))` and it has to switch off
        above the breakpoint, which an inline style cannot express and which
        would otherwise need four arbitrary `desk:` variants on one element. The
        rule also lets the aspect ratio derive the height on both surfaces, so
        the ratified 650 is computed from 520 rather than written down twice.
      */}
      <div
        className="funnel-film-slot relative overflow-hidden rounded-lg bg-[#eef2f8]"
        style={{ "--slot-w": `${SLOT_W}px` } as React.CSSProperties}
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

      <div className="flex w-full min-w-0 flex-col justify-center px-5 desk:flex-1 desk:px-0">
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

        <div className="mt-6 w-full desk:mt-8 desk:max-w-[260px]">
          <Primary onClick={next}>{CONTINUE}</Primary>
          <div className="mt-4">
            <BackLink label={BACK} onClick={() => goTo("question_window")} />
          </div>
        </div>
      </div>
    </div>
  );
}
