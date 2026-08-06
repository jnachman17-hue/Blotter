"use client";

/**
 * The canonical funnel.
 *
 * Authority: `WS3-SPEC.md` for sequence, events and price rules, `WS4-SPEC.md`
 * for every visible string, as amended by Jon on August 6, 2026.
 *
 * **A modal card over the page, not a route.** He asked which is right and this
 * is the answer. The two real patterns are a full-page flow — Typeform, Stripe
 * Checkout, product onboarding — which suits long, high-commitment, deep-linked
 * flows; and a card over a dimmed page, which suits short flows where context
 * matters and dismissing should be cheap. This flow is six short screens, the
 * page underneath *is* the argument, and `funnel_started / page_viewed` is a
 * ratified comparative metric — so anything that makes starting feel heavier is
 * a measurement cost, not just a UX one. A card also makes `Return to Blotter`
 * literal rather than a navigation.
 *
 * It is a real dialog: focus moves into it, Escape closes it, the backdrop
 * closes it, and the page behind it does not scroll.
 *
 * The sequence, after his amendment:
 *
 *   question_track → question_window → film → email → price → checkout → confirmed
 *
 * Events fire at the transition that earns them, never on render, and
 * `lib/analytics.ts` suppresses repeats per visitor, so back navigation is safe.
 */

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useState } from "react";

import { FilmStep } from "@/components/funnel/film-step";
import {
  BACK,
  CHECKOUT_SUMMARY,
  CHECKOUT_TITLE,
  CONTINUE,
  DONE_BUTTON,
  DONE_CHARGE,
  DONE_CONFIRMATION,
  DONE_EYEBROW,
  DONE_SUPPORTING,
  DONE_TITLE,
  EMAIL_EYEBROW,
  EMAIL_LABEL,
  EMAIL_SUPPORTING,
  EMAIL_TITLE,
  PAY_APPLE,
  PAY_CARD,
  PRICE_AMOUNT,
  PRICE_BILLING,
  PRICE_CTA,
  PRICE_DESCRIPTION,
  PRICE_INCLUDED,
  PRICE_TITLE,
  Q1_TITLE,
  Q2_TITLE,
  TRACKS,
  WINDOWS,
} from "@/lib/funnel-copy";
import { track, type PaymentMethod } from "@/lib/analytics";
import { saveLead } from "@/lib/lead-store";
import { useFunnel } from "@/lib/funnel-store";
import { cn } from "@/lib/cn";

/* --------------------------------------------------------------- primitives */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow leading-none font-medium tracking-[0.1em] text-navy-500 uppercase">
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.5rem] leading-[1.25] font-bold tracking-[-0.02em] text-ink">
      {children}
    </h2>
  );
}

function Primary({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 text-[0.95rem] font-medium",
        "transition-[transform,background-color,opacity] duration-150 ease-out active:scale-[0.98]",
        disabled
          ? "cursor-not-allowed bg-navy-900/25 text-white"
          : "bg-navy-900 text-white hover:bg-navy-800",
      )}
    >
      {children}
    </button>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-small font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
    >
      {BACK}
    </button>
  );
}

/** The option rows on both questions. One choice, then an explicit Continue. */
function Choice({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex min-h-11 w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-body transition-colors duration-150 ease-out",
        selected
          ? "border-navy-500 bg-navy-500/[0.07] text-ink"
          : "border-rule bg-white text-ink-read hover:border-navy-400/50",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "grid size-[18px] shrink-0 place-items-center rounded-full border",
          selected ? "border-navy-500" : "border-rule",
        )}
      >
        {selected && <span className="size-[8px] rounded-full bg-navy-500" />}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------- steps */

function QuestionTrack() {
  const { track: chosen, setTrack, goTo } = useFunnel();
  return (
    <div className="p-8">
      <Title>{Q1_TITLE}</Title>
      <div className="mt-6 space-y-2">
        {TRACKS.map((t) => (
          <Choice
            key={t}
            label={t}
            selected={chosen === t}
            onSelect={() => setTrack(t)}
          />
        ))}
      </div>
      <div className="mt-7">
        <Primary disabled={!chosen} onClick={() => goTo("question_window")}>
          {CONTINUE}
        </Primary>
      </div>
    </div>
  );
}

function QuestionWindow() {
  const { window: chosen, track: chosenTrack, setWindow, goTo } = useFunnel();

  /* `recruiting_profile_completed` means both questions are answered, so it
     belongs on the way out of the second one, not on the way in. */
  function next() {
    track("recruiting_profile_completed", {
      recruiting_track: chosenTrack ?? undefined,
      recruiting_window: chosen ?? undefined,
    });
    goTo("film");
  }

  return (
    <div className="p-8">
      <Title>{Q2_TITLE}</Title>
      <div className="mt-6 space-y-2">
        {WINDOWS.map((w) => (
          <Choice
            key={w}
            label={w}
            selected={chosen === w}
            onSelect={() => setWindow(w)}
          />
        ))}
      </div>
      <div className="mt-7 flex items-center gap-6">
        <Primary disabled={!chosen} onClick={next}>
          {CONTINUE}
        </Primary>
      </div>
      <div className="mt-4">
        <BackLink onClick={() => goTo("question_track")} />
      </div>
    </div>
  );
}

function EmailStep() {
  const { setEmail, goTo, track: t, window: w, ctaLocation, furthestStage } = useFunnel();
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
      cta_location: ctaLocation,
      furthest_stage: furthestStage,
    });
    track("email_submitted");
    goTo("price");
  }

  return (
    <form className="p-8" onSubmit={submit} noValidate>
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
            "mt-2 block min-h-11 w-full rounded-lg border bg-white px-3.5 text-body text-ink outline-none",
            "transition-colors duration-150 ease-out",
            touched && !valid
              ? "border-[#c5221f]"
              : "border-rule focus:border-navy-500",
          )}
        />
      </label>
      {/* WS4: invalid feedback appears only after an invalid submission. */}
      {touched && !valid && (
        <p className="mt-2 text-small text-[#c5221f]">Enter a valid email address.</p>
      )}

      <div className="mt-7">
        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-navy-900 px-6 text-[0.95rem] font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-navy-800 active:scale-[0.98]"
        >
          {CONTINUE}
        </button>
      </div>
      <div className="mt-4">
        <BackLink onClick={() => goTo("film")} />
      </div>
    </form>
  );
}

function PriceStep() {
  const { goTo } = useFunnel();

  /* WS3: `price_viewed` means the exact monthly price rendered. */
  useEffect(() => {
    track("price_viewed", { price: 9.99, billing_period: "monthly" });
  }, []);

  function next() {
    track("checkout_started", { price: 9.99, billing_period: "monthly" });
    goTo("checkout");
  }

  return (
    <div className="p-8">
      {/* Reads as a current product-selection step. No availability signal. */}
      <Title>{PRICE_TITLE}</Title>
      <p className="mt-4 font-display text-[2rem] leading-none font-bold tracking-[-0.02em] text-ink">
        {PRICE_AMOUNT}
      </p>
      <p className="mt-2 text-small text-ink-muted">{PRICE_BILLING}</p>
      <p className="mt-5 text-body leading-[1.6] text-ink-read">{PRICE_DESCRIPTION}</p>

      <ul className="mt-5 space-y-2.5 border-t border-rule pt-5">
        {PRICE_INCLUDED.map((line) => (
          <li key={line} className="flex gap-3 text-body leading-[1.5] text-ink-read">
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-navy-500"
            />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Primary onClick={next}>{PRICE_CTA}</Primary>
      </div>
      <div className="mt-4">
        <BackLink onClick={() => goTo("email")} />
      </div>
    </div>
  );
}

function CheckoutStep() {
  const { setPaymentMethod, goTo } = useFunnel();

  /* No card fields and no money. Either button records the method and advances
     immediately. WS3 is explicit that both trigger the same canonical event. */
  function pay(method: PaymentMethod) {
    setPaymentMethod(method);
    track("payment_option_clicked", {
      payment_method: method,
      price: 9.99,
      billing_period: "monthly",
    });
    goTo("confirmed");
  }

  return (
    <div className="p-8">
      <Title>{CHECKOUT_TITLE}</Title>

      <dl className="mt-6 space-y-3 border-y border-rule py-5">
        {CHECKOUT_SUMMARY.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-8">
            <dt className="shrink-0 text-small text-ink-muted">{row.label}</dt>
            <dd
              className={cn(
                "text-right text-small",
                row.label === "Due today" ? "font-semibold text-ink" : "text-ink-read",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 space-y-2.5">
        <Primary onClick={() => pay("card")}>{PAY_CARD}</Primary>
        <button
          type="button"
          onClick={() => pay("apple_pay")}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-6 text-[0.95rem] font-medium text-white transition-[transform,opacity] duration-150 ease-out hover:opacity-90 active:scale-[0.98]"
        >
          {PAY_APPLE}
        </button>
      </div>
      <div className="mt-4">
        <BackLink onClick={() => goTo("price")} />
      </div>
    </div>
  );
}

function ConfirmedStep() {
  const close = useFunnel((s) => s.close);

  useEffect(() => {
    track("beta_spot_confirmed");
  }, []);

  return (
    <div className="p-8">
      <Eyebrow>{DONE_EYEBROW}</Eyebrow>
      <div className="mt-3">
        <Title>{DONE_TITLE}</Title>
      </div>
      <p className="mt-4 text-body leading-[1.62] text-ink-read">{DONE_SUPPORTING}</p>
      <p className="mt-4 text-body leading-[1.62] font-medium text-ink">{DONE_CHARGE}</p>
      <p className="mt-2 text-body leading-[1.62] text-ink-read">{DONE_CONFIRMATION}</p>
      <div className="mt-7">
        <Primary onClick={close}>{DONE_BUTTON}</Primary>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the shell */

/** The film step is wider than the rest: it holds a 4:5 frame beside its copy. */
const WIDE = new Set(["film"]);

export function Funnel() {
  const stage = useFunnel((s) => s.stage);
  const close = useFunnel((s) => s.close);
  const open = stage !== "closed";

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && close()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="funnel-backdrop fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px]" />
        <Dialog.Popup
          className={cn(
            "funnel-card fixed top-1/2 left-1/2 z-50 max-h-[92vh] w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2",
            "overflow-y-auto rounded-xl bg-surface-quiet shadow-[0_24px_60px_rgba(20,24,31,0.22)]",
            WIDE.has(stage) ? "max-w-[880px]" : "max-w-[520px]",
          )}
        >
          {/* Every screen is titled; the visible heading is the accessible one. */}
          <Dialog.Title className="sr-only">Try Blotter</Dialog.Title>

          {stage === "question_track" && <QuestionTrack />}
          {stage === "question_window" && <QuestionWindow />}
          {stage === "film" && <FilmStep />}
          {stage === "email" && <EmailStep />}
          {stage === "price" && <PriceStep />}
          {stage === "checkout" && <CheckoutStep />}
          {stage === "confirmed" && <ConfirmedStep />}

          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-ink-muted transition-colors duration-150 ease-out hover:bg-ink/5 hover:text-ink"
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
