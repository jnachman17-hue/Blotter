"use client";

/**
 * The contact form.
 *
 * Jon, August 11, 2026: *"Let's add a contact form on our page. Somewhere
 * where you can ask a question or just contact. It can be about anything, a
 * frequently asked question you suggest, just a general question. Let's just
 * create a contact page."*
 *
 * ## Three fields, and only two are required
 *
 * Email and message. Name is optional, because asking for it is friction on a
 * form whose entire premise is that it costs nothing to use — and a reply only
 * needs somewhere to go.
 *
 * There is no subject line and no category selector. A dropdown asking whether
 * this is a question, a suggestion or something else makes the reader classify
 * their own message before they are allowed to write it, and every option would
 * land in the same table and the same inbox.
 *
 * ## What it does not do
 *
 * **It does not fire an analytics event.** The nine canonical events in
 * `lib/analytics.ts` are the funnel contract, and WS3 fixes them. Adding a
 * tenth for this would either break that contract or quietly widen it. The
 * table is the record; the row's `created_at` is the count.
 *
 * **It does not collect the message into anything that leaves the server.**
 * Same rule the lead route follows: email lives in the database and nowhere
 * else, never attached to an analytics event.
 *
 * ## Failure is visible, and that is deliberate
 *
 * The lead route reports success on every failure path because interrupting a
 * converting visitor is worse than losing a row. Here the opposite holds. A
 * reader told their message sent will wait for an answer that cannot come,
 * because nothing recorded that they wrote. So a failure says so and offers the
 * mail address, which is the fallback that always works.
 */

import Link from "next/link";
import { useState } from "react";

import { getIdentifiers } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/contact";
import { isInternalVisitor } from "@/lib/internal-visitor";
import { cn } from "@/lib/cn";

type State = "idle" | "sending" | "sent" | "failed";

const FIELD =
  "w-full rounded-lg border border-rule bg-white px-3.5 py-2.5 text-body leading-[1.5] text-ink " +
  "outline-none transition-colors duration-150 ease-out " +
  "placeholder:text-ink-faint focus:border-navy-400 focus:ring-2 focus:ring-navy-400/20";

const LABEL = "block text-small font-medium text-ink";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");

    /*
      Identifiers are best-effort. A reader with analytics blocked still gets to
      send a message — the form's job is correspondence, not measurement.
    */
    let ids: { visitor_id: string; session_id: string } | null = null;
    try {
      ids = getIdentifiers();
    } catch {
      ids = null;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name"),
          message: data.get("message"),
          website: data.get("website"),
          source_path:
            typeof window !== "undefined" ? window.location.pathname : null,
          session_id: ids?.session_id ?? null,
          visitor_id: ids?.visitor_id ?? null,
          is_internal: isInternalVisitor(),
        }),
      });
      const json = (await response.json()) as { sent?: boolean };
      if (!response.ok || !json.sent) throw new Error("not sent");
      form.reset();
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-rule bg-white px-6 py-8 text-center"
      >
        <p className="font-display text-lede font-semibold text-ink">
          Message sent.
        </p>
        <p className="mx-auto mt-2 max-w-[42ch] text-body leading-[1.6] text-ink-muted">
          Thank you. You will get a reply at the address you gave.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label htmlFor="contact-email" className={LABEL}>
          Your email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@university.edu"
          className={FIELD}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-name" className={LABEL}>
          Your name{" "}
          <span className="font-normal text-ink-faint">(optional)</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={FIELD}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className={LABEL}>
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={7}
          placeholder="A question, a question you think this page should answer, or anything else."
          className={cn(FIELD, "resize-y")}
        />
      </div>

      {/*
        The honeypot. Hidden from people and from assistive technology, present
        in the DOM for anything filling every field it finds. `tabIndex={-1}`
        and `aria-hidden` keep it out of the keyboard path and the screen-reader
        pass; a real reader can neither see it nor reach it.
      */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state === "failed" && (
        <p role="alert" className="text-small leading-[1.5] text-[#8a3d2a]">
          That did not send. Please email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          instead, and the message will reach the same place.
        </p>
      )}

      <div className="flex flex-col items-start gap-4 desk:flex-row desk:items-center desk:justify-between">
        <button
          type="submit"
          disabled={state === "sending"}
          className={cn(
            "inline-flex min-h-11 items-center justify-center rounded-full bg-navy-900 px-7 text-body font-medium text-white",
            "transition-colors duration-150 ease-out hover:bg-navy-800",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-small leading-[1.5] text-ink-muted">
          Or email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <p className="text-small leading-[1.5] text-ink-muted">
        Your address is used to reply and nothing else. The{" "}
        <Link
          href="/privacy"
          className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
        >
          privacy policy
        </Link>{" "}
        covers what happens to it.
      </p>
    </form>
  );
}
