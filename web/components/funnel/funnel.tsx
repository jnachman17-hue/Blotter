"use client";

/**
 * The canonical funnel.
 *
 * Authority: `WS3-SPEC.md` for sequence, events and price rules, `WS4-SPEC.md`
 * for visible strings, as amended by Jon on August 6, 2026.
 *
 * **A modal card over the page, not a route.** He asked which was right. Full
 * page suits long, high-commitment, deep-linked flows — Typeform, Stripe
 * Checkout, onboarding. A card suits short flows where context matters and
 * dismissing should be cheap. This is six short screens, the page underneath
 * *is* the argument, and `funnel_started / page_viewed` is a ratified
 * comparative metric, so anything making the start feel heavier is a
 * measurement cost rather than only a design one. A card also makes
 * `Return to Blotter` literal instead of a navigation.
 *
 * **The card is one fixed size for every screen.** His note, and he was right:
 * a dialog that resizes on each `Continue` reads as unfinished. `CARD_W` and
 * `CARD_H` are the stage; every step composes inside it and none of them
 * changes it. The film needs the most room, so it sets the size and the rest
 * centre a narrower reading column inside it.
 *
 * It is a real dialog: focus moves in, Escape and the backdrop close it, and
 * the page behind does not scroll.
 *
 *   question_track → question_window → film → email → price → checkout → confirmed
 *
 * Events fire at the transition that earns them, never on render, and
 * `lib/analytics.ts` suppresses repeats per visitor, so back navigation is safe.
 */

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useState } from "react";

import { BlotterMark } from "@/components/brand/blotter-mark";
import {
  BackLink,
  Check,
  Choice,
  Eyebrow,
  Primary,
  Title,
} from "@/components/funnel/parts";
import {
  BACK,
  SKIP,
  CONTINUE,
  EMAIL_EYEBROW,
  EMAIL_LABEL,
  EMAIL_SUPPORTING,
  EMAIL_TITLE,
  Q1_TITLE,
  Q2_TITLE,
  TRACKS,
  WINDOWS,
} from "@/lib/funnel-copy";
import { track } from "@/lib/analytics";
import { saveLead } from "@/lib/lead-store";
import { stageIndex, useFunnel } from "@/lib/funnel-store";
import { cn } from "@/lib/cn";

/** The stage. Set by the film, which needs the most room, and never varies. */
export const CARD_W = 960;
export const CARD_H = 730;

/** The reading measure every screen except the film centres inside the stage. */
const COLUMN = 460;

/** Free-text `Other` needs something typed before it counts as an answer. */
const answered = (choice: string | null, other: string) =>
  Boolean(choice) && (choice !== "Other" || other.trim().length > 0);

/**
 * Re-write the lead with the stage the visitor has now reached.
 *
 * WS5 Phase 4 requires the record hold the **furthest funnel stage reached**,
 * and the lead is first written at email capture — three screens before the
 * end. Written once, the field would say `email` for everyone forever and the
 * one thing it exists to answer, how far they got, would be unanswerable.
 *
 * The upsert conflicts on `visitor_id`, so this updates the row rather than
 * adding one. Safe to call at every later milestone.
 */
function syncLead(state: ReturnType<typeof useFunnel.getState>) {
  if (!state.email) return;
  saveLead({
    email: state.email,
    recruiting_track: state.track,
    recruiting_window: state.window,
    recruiting_track_other: state.track === "Other" ? state.trackOther.trim() : null,
    recruiting_window_other: state.window === "Other" ? state.windowOther.trim() : null,
    cta_location: state.ctaLocation,
    furthest_stage: state.furthestStage,
    furthest_stage_index: stageIndex(state.furthestStage),
  });
}

/* -------------------------------------------------------------------- steps */

/** Centres a narrow column in the fixed stage. */
function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-10">
      <div className="w-full" style={{ maxWidth: COLUMN }}>
        {children}
      </div>
    </div>
  );
}

function QuestionTrack() {
  const { track: chosen, trackOther, setTrack, setTrackOther, goTo } = useFunnel();
  const ready = answered(chosen, trackOther);

  return (
    <Column>
      <Title>{Q1_TITLE}</Title>
      <div className="mt-6 space-y-2">
        {TRACKS.map((t) => (
          <Choice
            key={t}
            label={t}
            selected={chosen === t}
            onSelect={() => setTrack(t)}
            other={
              t === "Other"
                ? {
                    value: trackOther,
                    onChange: setTrackOther,
                    placeholder: "What are you recruiting for?",
                  }
                : undefined
            }
          />
        ))}
      </div>
      <div className="mt-7">
        <Primary disabled={!ready} onClick={() => goTo("question_window")}>
          {CONTINUE}
        </Primary>
      </div>
    </Column>
  );
}

function QuestionWindow() {
  const {
    window: chosen,
    windowOther,
    track: chosenTrack,
    trackOther,
    setWindow,
    setWindowOther,
    goTo,
  } = useFunnel();
  const ready = answered(chosen, windowOther);

  /* Both questions are answered here, so this is where the event belongs. The
     two `_other` values ride along as research fields. */
  function next() {
    track("recruiting_profile_completed", {
      recruiting_track: chosenTrack ?? undefined,
      recruiting_window: chosen ?? undefined,
      recruiting_track_other: chosenTrack === "Other" ? trackOther.trim() : undefined,
      recruiting_window_other: chosen === "Other" ? windowOther.trim() : undefined,
    });
    goTo("email");
  }

  return (
    <Column>
      <Title>{Q2_TITLE}</Title>
      <div className="mt-6 space-y-2">
        {WINDOWS.map((w) => (
          <Choice
            key={w}
            label={w}
            selected={chosen === w}
            onSelect={() => setWindow(w)}
            other={
              w === "Other"
                ? {
                    value: windowOther,
                    onChange: setWindowOther,
                    placeholder: "Which window are you recruiting for?",
                  }
                : undefined
            }
          />
        ))}
      </div>
      <div className="mt-7">
        <Primary disabled={!ready} onClick={next}>
          {CONTINUE}
        </Primary>
      </div>
      <div className="mt-4">
        <BackLink label={BACK} onClick={() => goTo("question_track")} />
      </div>
    </Column>
  );
}

function EmailStep() {
  const {
    setEmail,
    goTo,
    track: t,
    trackOther,
    window: w,
    windowOther,
    ctaLocation,
    furthestStage,
  } = useFunnel();
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setEmail(value.trim());
    /* Email goes to lead storage and never into analytics. `saveLead` records
       in memory until Supabase exists — see `lib/lead-store.ts`. */
    saveLead({
      email: value.trim(),
      recruiting_track: t,
      recruiting_window: w,
      recruiting_track_other: t === "Other" ? trackOther.trim() : null,
      recruiting_window_other: w === "Other" ? windowOther.trim() : null,
      cta_location: ctaLocation,
      furthest_stage: furthestStage,
      furthest_stage_index: stageIndex(furthestStage),
    });
    track("email_submitted");
    /* The funnel ends here now. Jon, 3 September 2026: the three questions
       stay because they collect the address; everything after them goes, and
       the visitor is taken to the setup pages. A full navigation, so the modal
       and its state simply cease rather than needing to be reset. */
    window.location.assign("/setup");
  }

  return (
    <form onSubmit={submit} noValidate className="h-full">
      <Column>
        <Eyebrow>{EMAIL_EYEBROW}</Eyebrow>
        <div className="mt-3">
          <Title>{EMAIL_TITLE}</Title>
        </div>
        <p className="mt-3 text-body leading-[1.6] text-ink-read">{EMAIL_SUPPORTING}</p>

        <label className="mt-6 block">
          <span className="text-small font-medium text-ink">{EMAIL_LABEL}</span>
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="email"
            aria-invalid={touched && !valid}
            className={cn(
              "mt-2 block min-h-12 w-full rounded-lg border bg-white px-3.5 text-body text-ink outline-none",
              "transition-colors duration-150 ease-out",
              touched && !valid ? "border-[#c5221f]" : "border-rule focus:border-navy-500",
            )}
          />
        </label>
        {/* WS4: invalid feedback appears only after an invalid submission. */}
        {touched && !valid && (
          <p className="mt-2 text-small text-[#c5221f]">Enter a valid email address.</p>
        )}

        <div className="mt-7">
          <Primary type="submit">{CONTINUE}</Primary>
        </div>
        {/* Skip, not Back. The funnel opens here now, so there is nowhere
            behind it, and an address nobody wants to give should never stand
            between a reader and the thing they came to do. */}
        <div className="mt-4">
          <BackLink label={SKIP} onClick={() => window.location.assign("/setup")} />
        </div>
      </Column>
    </form>
  );
}

/**
 * The price screen.
 *
 * Jon's note: it did not look official enough for a screen that leads to a
 * payment click. What real plan screens do and this now does — the product is
 * identified by its mark rather than by a word, the price is the largest thing
 * on the screen, what is included sits inside a bordered panel rather than
 * floating, the included marks are filled rather than dots, and the billing
 * terms sit with the price instead of below the fold.
 *
 * `PRICE_DELIVERY` answers the question he actually had at this screen, which
 * was what arrives when you pay. Everything else is WS4 verbatim, and no
 * availability signal may appear here.
 */
export function Funnel() {
  const stage = useFunnel((s) => s.stage);
  const close = useFunnel((s) => s.close);

  return (
    <Dialog.Root open={stage !== "closed"} onOpenChange={(next) => !next && close()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px]" />
        {/*
          A full-screen sheet on a phone, the ratified 960x730 card from `desk`.

          The card is the right shape on a desktop and the wrong one on a phone.
          At 390 the fixed width collapsed to `100vw - 32px` while every step
          inside was still composed for 960, and the film alone is a 520px slot,
          so the content overflowed a container that clips. A modal that is
          almost the whole screen but not quite also reads as a mistake rather
          than as a choice.

          What the comment above says about the card is unchanged and still
          governs desktop: one fixed size, never resizing between steps, the
          film setting that size. On a phone the *screen* is the stage and it
          also never changes size, so the reasoning survives the translation.

          `100dvh` rather than `100vh`: iOS Safari's `vh` is the tallest the
          viewport ever gets, so with the address bar showing, a `100vh` sheet
          puts its own footer under the browser chrome. That is where the
          `Continue` button lives.

          It scrolls vertically, because the film step plus its copy and buttons
          is taller than a phone and a sheet that clips its own CTA converts
          nobody.
        */}
        <Dialog.Popup
          className={cn(
            "fixed z-50 overflow-y-auto overscroll-contain bg-surface-quiet",
            "inset-0 h-[100dvh] w-screen",
            "desk:top-1/2 desk:left-1/2 desk:h-[var(--funnel-h)] desk:w-[var(--funnel-w)]",
            "desk:inset-auto desk:-translate-x-1/2 desk:-translate-y-1/2",
            "desk:max-h-[94vh] desk:max-w-[calc(100vw-32px)] desk:overflow-hidden",
            "desk:rounded-xl desk:shadow-[0_24px_60px_rgba(20,24,31,0.22)]",
          )}
          style={
            {
              "--funnel-w": `${CARD_W}px`,
              "--funnel-h": `${CARD_H}px`,
            } as React.CSSProperties
          }
        >
          {/* Every screen is visibly titled; this names the dialog itself. */}
          {/* Screen-reader name for the dialog. Kept in step with `CTA_LABEL`
              so the thing a blind visitor is told they opened matches the
              button they pressed. */}
          <Dialog.Title className="sr-only">Set up</Dialog.Title>

          {stage === "question_track" && <QuestionTrack />}
          {stage === "question_window" && <QuestionWindow />}
          {stage === "email" && <EmailStep />}

          <Dialog.Close
            aria-label="Close"
            className={cn(
              "absolute right-3 z-10 grid place-items-center rounded-full",
              "text-ink-muted transition-colors duration-150 ease-out hover:bg-ink/5 hover:text-ink",
              /* 44px on a phone, per the target rule the footer rebuild set,
                 and below the status bar rather than under it. */
              "size-11 top-[max(0.75rem,env(safe-area-inset-top))]",
              "desk:top-4 desk:right-4 desk:size-8",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
