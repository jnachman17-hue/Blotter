"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SCRIPT_SENDS_TO, SCRIPT_VERSION } from "@/app/api/script/manifest";
import { DURATIONS, SAMPLE, SCENES, TOTAL_SECONDS } from "@/lib/run-scenes";

import styles from "./run-stage.module.css";

/**
 * One run of the script, drawn on the site's own boundary diagram and made to
 * move. Only facts move: name tags, envelopes, header lines, event blocks, a
 * packet of field chips, status chips.
 *
 * ## The three rules
 *
 * The body of every message is hatched and never lights up. Envelopes that do
 * not match fade and never come back. The server is a dashed box and nothing
 * is ever drawn inside it, because the code cannot prove what happens there
 * and a drawing that showed the inside would be claiming to.
 *
 * ## Why it does not autoplay, and why the poster is the last frame
 *
 * The final frame is the still a sceptic screenshots: statuses written into
 * the sheet, the server dashed and captioned "You cannot see in here", the
 * legend saying which box is proof and which is our word. So that is what the
 * page shows before anything moves. A reader who never presses play still
 * sees where proof ends. Playing rewinds to scene one and runs forward; the
 * page never scrolls itself and nothing loops.
 *
 * ## How the states work
 *
 * `scene` is 0 (the poster: every scene's end state) or 1 to 7. Each element's
 * resting state is a class computed here from `scene`, so the server render,
 * a frozen filmstrip frame and a reduced-motion reader all get the same still.
 * The CSS module only knows how each state *arrives*, and only while
 * `data-live="true"`: playing, not reduced, not a frozen frame.
 *
 * Scene captions and the functions each one names live in `lib/run-scenes.ts`,
 * where `claimsText()` and the self-test can reach them.
 */

const LAST = SCENES.length;
const SERVER_LABEL = SCRIPT_SENDS_TO.replace(/^https:\/\//, "");
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const LAST_WORD = WORDS[LAST] ?? String(LAST);
const POSTER_CAPTION = `One run, from waking up to writing the answer in. ${LAST_WORD[0].toUpperCase() + LAST_WORD.slice(1)} scenes.`;

function HArrow({ back }: { back?: boolean }) {
  const colour = back ? "#5f6368" : "#40608c";
  return (
    <svg width="60" height="12" viewBox="0 0 60 12" aria-hidden="true" className={styles.hArrow}>
      <line
        x1={back ? 60 : 0}
        y1="6"
        x2={back ? 10 : 50}
        y2="6"
        stroke={colour}
        strokeWidth="1.5"
      />
      <path d={back ? "M0 6 L10 1 v10 z" : "M60 6 L50 1 v10 z"} fill={colour} />
    </svg>
  );
}

function VArrow({ back }: { back?: boolean }) {
  const colour = back ? "#5f6368" : "#40608c";
  return (
    <svg width="12" height="44" viewBox="0 0 12 44" aria-hidden="true" className={styles.vArrow}>
      <line x1="6" y1={back ? 44 : 0} x2="6" y2={back ? 10 : 34} stroke={colour} strokeWidth="1.5" />
      <path d={back ? "M6 0 L1 10 h10 z" : "M6 44 L1 34 h10 z"} fill={colour} />
    </svg>
  );
}

function Clock({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 22 22" className={styles.clock} aria-hidden="true">
      <circle cx="11" cy="11" r="9.5" fill="#fff" stroke="#8a6d12" strokeWidth="1.2" />
      <line x1="11" y1="11" x2="11" y2="5" stroke="#8a6d12" strokeWidth="1.4" strokeLinecap="round"
        className={`${styles.hand} ${on ? styles.handOn : ""}`} />
      <line x1="11" y1="11" x2="15" y2="11" stroke="#d9b64a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const CHIP_CLASS: Record<string, string> = {
  replied: styles.replied,
  scheduled: styles.scheduled,
  noreply: styles.noreply,
};

/**
 * One frame. `scene` 0 is the poster. `frozen` renders a still with no
 * motion, for the filmstrip; `reduced` does the same for a reader who asked
 * for no motion; `live` is the only state in which anything moves.
 */
function Frame({
  scene,
  live,
  frozen,
  reduced,
}: {
  scene: number;
  live: boolean;
  frozen?: boolean;
  reduced?: boolean;
}) {
  /* Resting states are cumulative: scene 5's still includes scene 2's faded
     envelopes. The poster (0) is everything. */
  const at = (n: number) => scene === 0 || scene >= n;
  const is = (n: number) => scene === n;
  const cardShown = at(3) && !at(5);
  const bounceShown = is(4);
  const staticPacket = (frozen || reduced) && is(6);
  const staticStays = (frozen || reduced) && is(6);

  return (
    <div
      className={styles.stage}
      data-scene={scene}
      data-live={live ? "true" : "false"}
      data-static={frozen ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      aria-hidden="true"
    >
      {/* ------------------------------------------------ the account */}
      <div className={styles.account}>
        <div className={styles.accountHead}>
          <span className={styles.accountTitle}>Your Google account</span>
          <span className={styles.accountSub}>Everything that reads anything happens in here</span>
        </div>

        <div className={styles.panels}>
          {/* Gmail */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span>Gmail</span>
              <span className={styles.grow} />
              {SAMPLE.contacts.map((c, i) => (
                <span
                  key={c.name}
                  className={`${styles.tag} ${at(2) ? styles.tagOn : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {c.name.split(" ")[0]}
                </span>
              ))}
            </div>
            <div className={`${styles.envelopes} ${cardShown ? styles.envelopesDim : ""}`}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const match = i === 1 || i === 4;
                return (
                  <div
                    key={i}
                    className={`${styles.env} ${at(2) && !match ? styles.envFaded : ""} ${
                      at(2) && match ? styles.envMatch : ""
                    }`}
                  />
                );
              })}
            </div>

            {/* the message card */}
            <div className={`${styles.card} ${cardShown ? styles.cardOn : ""}`} aria-hidden={!cardShown}>
              {[
                ["From", SAMPLE.message.from, null],
                ["To", SAMPLE.message.to, null],
                ["Cc", SAMPLE.message.cc, SAMPLE.message.ccNote],
                ["Date", SAMPLE.message.date, null],
                ["Subject", SAMPLE.message.subject, null],
              ].map(([k, v, note], i) => (
                <div
                  key={k as string}
                  className={`${styles.line} ${at(3) ? styles.lineLit : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className={styles.k}>{k}</span>
                  <span>{v}</span>
                  {note && <span className={styles.ccNote}>{note}</span>}
                </div>
              ))}
              <div className={styles.body}>
                <span className={styles.bodyLabel}>not read</span>
              </div>
            </div>

            {/* the delivery-failure notice */}
            <div className={`${styles.bounce} ${bounceShown ? styles.bounceOn : ""}`} aria-hidden={!bounceShown}>
              <div className={styles.bounceFrom}>{SAMPLE.bounce.from}</div>
              <div className={styles.bounceLine} />
              <div className={styles.bounceLine} style={{ width: "70%" }} />
              <span className={styles.opened}>opened</span>{" "}
              <span className={styles.slip}>{SAMPLE.bounce.address}</span>
            </div>

            <span className={`${styles.stays} ${staticStays ? styles.staysStatic : ""}`}>stays here</span>
          </div>

          {/* Calendar */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span>Calendar</span>
            </div>
            <div className={styles.cal}>
              {["Gym", "Class", "match", "Lunch", "Study"].map((label, i) => {
                const match = label === "match";
                return (
                  <div
                    key={i}
                    className={`${styles.evt} ${at(5) && !match ? styles.evtFaded : ""} ${
                      at(5) && match ? styles.evtMatch : ""
                    }`}
                  >
                    {match ? (
                      <>
                        Coffee ·{" "}
                        <span className={`${styles.u} ${at(5) ? styles.uLit : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
                          {SAMPLE.event.first}
                        </span>{" "}
                        ·{" "}
                        <span className={`${styles.u} ${at(5) ? styles.uLit : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
                          {SAMPLE.event.firm}
                        </span>
                      </>
                    ) : (
                      label
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* The sheet */}
          <div className={`${styles.panel} ${styles.sheetPanel}`}>
            <div className={styles.panelHead}>
              <span>Your Blotter sheet</span>
              <span className={`${styles.dot} ${at(1) ? styles.dotOn : ""}`} aria-hidden="true" />
              <span className={styles.grow} />
              <Clock on={at(1)} />
            </div>
            <div className={styles.rows}>
              <span className={styles.rowsHead}>Contact</span>
              <span className={styles.rowsHead}>Status</span>
              <span className={styles.rowsHead}>Days</span>
              {SAMPLE.contacts.map((c, i) => (
                <div key={c.name} style={{ display: "contents" }}>
                  <span>
                    <span className={`${styles.name} ${is(2) ? styles.searching : ""}`}>{c.name}</span>{" "}
                    <span className={styles.firm}>· {c.firm}</span>
                  </span>
                  <span className={styles.cell}>
                    <span
                      className={`${styles.chip} ${CHIP_CLASS[c.chip]} ${at(LAST) ? styles.chipOn : ""}`}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {c.status}
                    </span>
                  </span>
                  <span className={styles.cell}>
                    <span className={`${styles.days} ${at(LAST) ? styles.daysOn : ""}`}>{c.days}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ the lane */}
      <div className={styles.lane}>
        <HArrow />
        <HArrow back />
        <VArrow />
        <VArrow back />

        <div className={`${styles.packet} ${staticPacket ? styles.packetStatic : ""}`} aria-hidden="true">
          {SAMPLE.packet.map((chip, i) => (
            <span key={chip} className={styles.pchip} style={{ "--i": i } as React.CSSProperties}>
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.ret} aria-hidden="true">
          {SAMPLE.contacts.map((c) => (
            <span key={c.name} className={`${styles.chip} ${CHIP_CLASS[c.chip]}`}>
              {c.status}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ the server */}
      <div className={`${styles.server} ${at(LAST) ? styles.serverOn : ""}`}>
        <span className={styles.serverName}>{SERVER_LABEL}</span>
        <span className={styles.serverSub}>You cannot see in here</span>
      </div>
    </div>
  );
}

export function RunStage() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [film, setFilm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!playing || reduced || scene < 1) return;
    const id = window.setTimeout(() => {
      if (scene >= LAST) setPlaying(false);
      else setScene(scene + 1);
    }, DURATIONS[scene - 1] * 1000);
    return () => window.clearTimeout(id);
  }, [playing, reduced, scene]);

  const live = playing && !reduced;
  const ended = scene === LAST && !playing;

  function play() {
    if (reduced) {
      next();
      return;
    }
    if (scene === 0 || scene === LAST) setScene(1);
    setPlaying(true);
  }
  function pause() {
    setPlaying(false);
  }
  function next() {
    setPlaying(false);
    setScene((s) => (s === 0 ? 1 : Math.min(LAST, s + 1)));
  }
  function prev() {
    setPlaying(false);
    setScene((s) => (s === 0 ? LAST : Math.max(1, s - 1)));
  }
  function jump(n: number) {
    setPlaying(false);
    setScene(n);
  }

  const caption = scene === 0 ? POSTER_CAPTION : SCENES[scene - 1].caption;
  const fns = scene === 0 ? [] : SCENES[scene - 1].fns;

  const playLabel = reduced
    ? "Step through"
    : playing
      ? "Pause"
      : ended
        ? "Replay"
        : `Play one run · about ${Math.round(TOTAL_SECONDS / 5) * 5} seconds`;

  return (
    <div>
      <div
        className={`${styles.wrap} ${styles.liveOnly}`}
        role="group"
        tabIndex={0}
        aria-label="One run of the script, drawn. Left and right arrows step through the scenes; space plays and pauses."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); next(); }
          if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
          if (e.key === " ") { e.preventDefault(); if (playing) pause(); else play(); }
        }}
      >
        <div className={styles.stageOrder}>
          <Frame scene={scene} live={live} reduced={reduced} />
          <p className={`mt-3 text-micro text-ink-muted ${styles.legend} ${scene === 0 || scene === LAST ? styles.legendOn : ""}`}>
            Solid box: the code proves it. Dashed box: our word.
          </p>
        </div>

        <div className={styles.captionOrder}>
          <p aria-live="polite" className="min-h-[3.4em] max-w-[58ch] text-lede leading-[1.55] text-ink">
            {caption}
          </p>
          <p aria-hidden="true" className="mt-1 min-h-[1.5em] font-mono text-[12px] text-ink-muted">
            {fns.length > 0 ? `In the code: ${fns.join(", ")}` : ""}
          </p>
          {(scene === LAST || scene === 0) && (
            <p className="mt-1 text-small">
              <Link href="#r2-5" className="underline underline-offset-4 text-navy-500 hover:text-navy-900">
                Where that is dealt with: row 2.5
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* controls */}
      <div className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 ${styles.liveOnly}`}>
        <button
          type="button"
          onClick={playing ? pause : play}
          className="inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
        >
          {playLabel}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous scene"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-white text-ink hover:border-navy-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2 L4 7 L9 12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next scene"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-white text-ink hover:border-navy-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2 L10 7 L5 12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <div className={styles.dots} role="group" aria-label="Scenes">
          {SCENES.map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => jump(s.n)}
              aria-label={`Scene ${s.n} of ${LAST}`}
              aria-current={scene === s.n ? "step" : undefined}
              className={`${styles.dotBtn} ${scene === s.n ? styles.dotBtnOn : ""}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFilm((v) => !v)}
          className="text-small font-medium text-navy-500 underline underline-offset-4 hover:text-navy-900"
        >
          {film ? `Hide the ${LAST_WORD} stills` : `Show all ${LAST_WORD} as stills`}
        </button>
      </div>

      <p className={`mt-3 font-mono text-[12px] leading-[1.6] text-ink-muted ${styles.liveOnly}`}>
        Drawn from{" "}
        <Link href="/code#script" className="underline underline-offset-4 hover:text-ink">
          Code.gs {SCRIPT_VERSION}
        </Link>
        . Each scene names the part of the script it shows. Solid box: the code proves it. Dashed box: our word.
      </p>

      {/* the filmstrip: seven stills, one per scene; also what prints */}
      <div className={`${styles.film} ${film ? styles.filmOn : ""} mt-8 space-y-8`}>
        {SCENES.map((s) => (
          <figure key={s.n}>
            <Frame scene={s.n} live={false} frozen />
            <figcaption className="mt-3 max-w-[58ch] text-body leading-[1.55] text-ink">
              <span className="font-mono text-small text-blotter-700">{s.n}</span> {s.caption}
              <span className="mt-1 block font-mono text-[12px] text-ink-muted">In the code: {s.fns.join(", ")}</span>
              {s.n === LAST && (
                <span className="mt-1 block text-small">
                  <Link href="#r2-5" className="underline underline-offset-4 text-navy-500 hover:text-navy-900">
                    Where that is dealt with: row 2.5
                  </Link>
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
