"use client";

/**
 * TEMPORARY REVIEW ROUTE — session 6. Delete before the session ends.
 *
 * One question, and the whole mobile hero plan rests on the answer: does Film A
 * hold up at real phone width?
 *
 * The evidence so far is a claim in `social/README.md` that the film was
 * authored for "roughly 400px on a phone" and that five columns hold 24px of
 * its 1080px canvas. Against that, Jon looked at this same film at 380px on a
 * desktop monitor and said it read small and blurry, which is why
 * `film-step.tsx` sets it to 520px inside the funnel card.
 *
 * Those two facts are not actually in conflict — a phone is a 3x display held
 * at thirteen inches, a monitor is 1x or 2x at arm's length — but the argument
 * is a prediction and this route replaces it with a look.
 *
 * Three framings, one at a time so only one animation loop ever runs:
 *
 *   4:5       the film's native aspect, full bleed. The ceiling.
 *   1:1       the centre crop the README says every element is authored inside
 *             ("the 4:5's extra height is margin"). Buys ~97px of fold at 390.
 *   In place  the crop at realistic hero gutters, with the real headline above
 *             and the real CTA label below, to answer "does it feel like a
 *             postage stamp" rather than only "can I read it".
 *
 * Nothing here is a design. The placement panel is a ruler, not a proposal.
 * The CTA is a non-interactive facsimile: a real `CtaButton` would fire
 * `funnel_started` and put a review click into the funnel's denominator.
 */

import { useEffect, useRef, useState } from "react";

/** The film's native canvas. Both built films share it. */
const FILM_W = 1080;
const FILM_H = 1350;

/**
 * `?bare=1` strips the film's scrub bar so it reads as an asset rather than a
 * player. Same source and same flag the funnel step uses.
 */
const FILM_SRC = "/film/blotter-film-a-4x5.html?bare=1";

/**
 * A 1:1 centre crop takes 1080 of the 1350 rows, so 135 falls off each end.
 * As a share of the film's own height that is 10%; as a share of the *square*
 * container it is 12.5%, which is what a percentage `top` resolves against
 * here. Expressed in CSS rather than measured in JS so there is no first-paint
 * jump on the phone.
 */
const CROP_TOP = "-12.5%";

type Mode = "portrait" | "square" | "placed";

const MODES: { id: Mode; label: string; note: string }[] = [
  { id: "portrait", label: "4:5", note: "Native aspect, full bleed." },
  { id: "square", label: "1:1", note: "Centre crop, full bleed." },
  { id: "placed", label: "In place", note: "Crop at hero gutters, with headline and CTA." },
];

function Film({ square, nonce }: { square: boolean; nonce: number }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#eef2f8]"
      style={{ aspectRatio: square ? "1 / 1" : `${FILM_W} / ${FILM_H}` }}
    >
      <iframe
        /* Remounts on mode change and on Replay, so the film always starts
           from its first frame rather than mid-loop. */
        key={`${square ? "sq" : "pt"}-${nonce}`}
        src={FILM_SRC}
        title="How Blotter keeps a recruiting tracker current"
        scrolling="no"
        className="absolute left-0 w-full border-0"
        style={{
          aspectRatio: `${FILM_W} / ${FILM_H}`,
          top: square ? CROP_TOP : 0,
        }}
      />
    </div>
  );
}

export default function FilmSizeReview() {
  const [mode, setMode] = useState<Mode>("square");
  const [nonce, setNonce] = useState(0);
  const [readout, setReadout] = useState("");
  const stage = useRef<HTMLDivElement>(null);

  /* The number that matters is how wide the film actually rendered on the
     device in his hand, not the width I designed against. */
  useEffect(() => {
    function measure() {
      const w = stage.current?.getBoundingClientRect().width ?? 0;
      setReadout(
        `viewport ${window.innerWidth}px · film ${Math.round(w)}px · ` +
          `${window.devicePixelRatio}x · scale ${(w / FILM_W).toFixed(3)}`,
      );
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mode]);

  const active = MODES.find((m) => m.id === mode)!;

  return (
    <main className="min-h-dvh bg-[#f4f5f7] pb-16 font-sans text-ink">
      <div className="px-4 pt-5">
        <p className="text-[0.7rem] font-medium tracking-[0.09em] text-navy-500 uppercase">
          Session 6 · film legibility check
        </p>
        <h1 className="font-display mt-1 text-[1.25rem] leading-[1.2] font-bold tracking-[-0.02em]">
          Film A at real phone width
        </h1>
        <p className="mt-2 text-[0.85rem] leading-[1.5] text-ink-read">
          Can you read the spreadsheet inside it, and does it feel right at this
          size or like a postage stamp?
        </p>

        {/* 44px targets, since the reviewer is on a phone and so is the rule. */}
        <div className="mt-4 flex gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`min-h-11 flex-1 rounded-full px-3 text-sm font-medium transition-colors ${
                mode === m.id
                  ? "bg-navy-900 text-white"
                  : "bg-white text-ink-read"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[0.78rem] leading-[1.45] text-ink-read">
          {active.note}
        </p>
      </div>

      {/* ---------------------------------------------------------- the film */}

      {mode === "placed" ? (
        <div className="mt-5 px-5">
          <p className="text-[0.7rem] font-medium tracking-[0.09em] text-navy-500 uppercase">
            Placement test — a ruler, not a design
          </p>
          <h2 className="font-display mt-2 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.028em]">
            Your networking keeps moving.{" "}
            <span className="text-navy-400">Your tracker does not.</span>
          </h2>
          <div ref={stage} className="mt-4 overflow-hidden rounded-xl">
            <Film square nonce={nonce} />
          </div>
          <div className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-navy-900 px-6 text-[0.95rem] font-medium text-white">
            Try Blotter Now
          </div>
          <p className="mt-3 text-center text-[0.78rem] text-ink-read">
            The button is a facsimile and does nothing, so this page stays out of
            the funnel numbers.
          </p>
        </div>
      ) : (
        <div ref={stage} className="mt-5 w-full">
          <Film square={mode === "square"} nonce={nonce} />
        </div>
      )}

      {/* ------------------------------------------------------- the readout */}

      <div className="mt-5 px-4">
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          className="min-h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-ink"
        >
          Replay from first frame
        </button>
        <p className="mt-3 font-mono text-[0.72rem] text-ink-read">{readout}</p>
        <p className="mt-3 text-[0.8rem] leading-[1.5] text-ink-read">
          Film A is the 21.5 second launch film currently in the funnel. It is a
          stand-in for size only. The hero film would be about ten seconds and
          built around one idea.
        </p>
      </div>
    </main>
  );
}
