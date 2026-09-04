"use client";

import { useState } from "react";

/**
 * One button that puts the whole script on the clipboard.
 *
 * The point is that nothing is downloaded and nothing is opened in another
 * program. A file in Downloads, opened in an editor that may be showing a
 * cached copy, is the exact path that wasted an hour on 4 September 2026.
 *
 * **It fetches at the moment it is clicked, and this is the whole design.**
 * The obvious version takes the script as a prop, rendered into the page. That
 * works exactly once: a tab left open across a deploy then holds the old
 * script forever, and clicking Copy hands over a version that no longer
 * exists. Jon hit this the same evening, twice, and the symptom is silent —
 * Apps Script saves a paste identical to what is already there without
 * pausing, so the only clue is the absence of a delay.
 *
 * `cache: "no-store"` because the browser will otherwise answer from its own
 * copy of `/Code.gs` and reintroduce the bug it was added to remove.
 *
 * The prop is kept as the fallback for when the fetch fails, since a slightly
 * stale script beats no script, and the version actually copied is reported
 * either way so a student can check it against what the page says.
 */
export function CopyScript({ script, version }: { script: string; version: string }) {
  const [state, setState] = useState<"idle" | "done" | "stale" | "failed">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  async function copy() {
    let text = script;
    let fresh = false;
    try {
      const res = await fetch("/Code.gs", { cache: "no-store" });
      if (res.ok) {
        const live = await res.text();
        if (live.length > 0) { text = live; fresh = true; }
      }
    } catch {
      /* Offline, or the request was blocked. The prop still works. */
    }

    const seen = /COURIER_VERSION = '([^']+)'/.exec(text)?.[1] ?? null;
    setCopied(seen);

    try {
      await navigator.clipboard.writeText(text);
      /* Say so when the page itself turned out to be behind, rather than
         letting somebody paste a version they were not expecting. */
      setState(fresh && seen !== null && seen !== version ? "stale" : "done");
      setTimeout(() => setState("idle"), 6000);
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
      >
        {state === "done" || state === "stale" ? "Copied" : "Copy the code"}
      </button>

      <p className="mt-3 text-small leading-[1.5] text-ink-faint">
        {state === "done"
          ? `Version ${copied ?? version} is on your clipboard. Now paste it over the old code in Apps Script.`
          : state === "stale"
            ? `This page was showing ${version}. You have version ${copied} on your clipboard, which is the current one. Reload the page if the number above still looks wrong.`
            : state === "failed"
              ? "Your browser blocked the copy. Select the code below and copy it by hand."
              : `${Math.round(script.length / 1024)} KB. Nothing is downloaded.`}
      </p>

      {state === "failed" && (
        <textarea
          readOnly
          value={script}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-4 h-64 w-full rounded-lg border border-rule bg-white p-3 font-mono text-[11px] leading-[1.5] text-ink"
        />
      )}
    </div>
  );
}
