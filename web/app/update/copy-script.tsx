"use client";

import { useState } from "react";

/**
 * One button that puts the whole script on the clipboard.
 *
 * The point is that nothing is downloaded and nothing is opened in another
 * program. A file in Downloads, opened in an editor that may be showing a
 * cached copy, is the exact path that wasted an hour on 4 September 2026.
 */
export function CopyScript({ script }: { script: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(script);
      setState("done");
      setTimeout(() => setState("idle"), 4000);
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
        {state === "done" ? "Copied" : "Copy the code"}
      </button>

      <p className="mt-3 text-small leading-[1.5] text-ink-faint">
        {state === "done"
          ? "On your clipboard. Now paste it over the old code in Apps Script."
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
