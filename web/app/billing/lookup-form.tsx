"use client";

import { useState } from "react";

/**
 * The lookup, and the whole of the interaction on this page.
 *
 * A client component because it has a text field and a result, and for no
 * other reason. It calls `/api/billing/lookup`, which reads and never writes.
 */

interface Result {
  known: boolean;
  reason?: string;
  install_id?: string;
  first_seen?: string;
  last_seen?: string;
  entitled?: boolean;
  entitled_until?: string | null;
}

/** What each refusal means, said to the person rather than about the code. */
const NOT_KNOWN: Record<string, string> = {
  not_an_id:
    "That does not look like a Blotter ID. It is either the whole thing, or the first eight characters of it.",
  no_such_sheet:
    "No sheet with that ID has ever reported in. Check the Settings tab of your tracker, and note that the ID is only filled in after the first run.",
  ambiguous:
    "Two sheets start with those eight characters. Paste the whole ID from your Settings tab.",
  not_configured: "Blotter cannot reach its records right now. Try again shortly.",
  lookup_failed: "Blotter cannot reach its records right now. Try again shortly.",
};

function when(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BillingLookup({ selling = false }: { selling?: boolean }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [buying, setBuying] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  /* Straight to Stripe. The sheet has already been proved to exist by the
     lookup above, and the checkout route proves it again rather than trusting
     this. */
  async function buy(installId: string) {
    setBuying(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ install_id: installId }),
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.assign(data.url);
      else setBuying(false);
    } catch {
      setBuying(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/billing/lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ blotter_id: value }),
      });
      setResult((await res.json()) as Result);
    } catch {
      setResult({ known: false, reason: "lookup_failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10">
      <form onSubmit={submit} noValidate className="max-w-[34rem]">
        <label className="block">
          <span className="text-small font-medium text-ink">Your Blotter ID</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="3a8444f2"
            spellCheck={false}
            autoComplete="off"
            className="mt-2 block min-h-12 w-full rounded-lg border border-rule bg-white px-3.5 font-mono text-body text-ink outline-none transition-colors duration-150 ease-out focus:border-navy-500"
          />
        </label>
        <button
          type="submit"
          disabled={busy || value.trim() === ""}
          className="mt-4 inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700 disabled:opacity-40"
        >
          {busy ? "Checking" : "Check this sheet"}
        </button>
      </form>

      {result !== null && (
        <div
          role="status"
          className="mt-7 max-w-[34rem] rounded-[6px] border border-rule bg-white px-6 py-5"
        >
          {!result.known ? (
            <p className="text-body leading-[1.6] text-ink">
              {NOT_KNOWN[result.reason ?? ""] ??
                "Blotter could not check that. Try again shortly."}
            </p>
          ) : (
            <div className="space-y-3 text-body leading-[1.6] text-ink">
              <p>
                <strong className="font-semibold">This sheet is recognised.</strong> It first
                reported in on {when(result.first_seen)} and was last seen on{" "}
                {when(result.last_seen)}.
              </p>
              {result.entitled ? (
                <p>
                  It is active
                  {result.entitled_until
                    ? ` until ${when(result.entitled_until)}.`
                    : ", and does not expire."}
                </p>
              ) : (
                <>
                  <p>
                    Nothing is owed on it. Blotter is free right now, so every recognised
                    sheet keeps running.
                  </p>
                  {selling && result.install_id && (
                    <button
                      type="button"
                      disabled={buying}
                      onClick={() => buy(result.install_id as string)}
                      className="mt-2 inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700 disabled:opacity-40"
                    >
                      {buying ? "Opening Stripe" : "Pay for this sheet"}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
