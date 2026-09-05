"use client";

import { useState } from "react";

import { auditPackage } from "@/lib/audit-prompt";

/**
 * One button that puts the whole audit package on the clipboard.
 *
 * **It fetches the script and the manifest at the moment it is clicked**, and
 * that is not a detail. `update/copy-script.tsx` carries the reasoning and it
 * was learned the hard way on 4 September 2026: a page that renders the script
 * into itself works exactly once, and a tab left open across a deploy then
 * hands over a version that no longer exists. Here the cost of that is worse
 * than a failed update. Somebody would audit code that is not running, get a
 * clean answer, and install on the strength of it.
 *
 * So the served files are the source of truth and the props are only the
 * fallback for a failed fetch. The version actually copied is reported either
 * way, so a reader can check it against the number on the page and against
 * what their own sheet says under `Blotter → Check this sheet`.
 *
 * `cache: "no-store"` for the same reason it is there on `/update`: without it
 * the browser answers from its own copy and reintroduces the bug.
 */
export function CopyAudit({
  script,
  manifest,
  version,
  label = "Copy the question and the code",
}: {
  script: string;
  manifest: string;
  version: string;
  /** What the button says at rest. The page decides, because the page knows what else is in the package. */
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "done" | "stale" | "failed">("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  async function fetchFresh(url: string, fallback: string): Promise<[string, boolean]> {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const live = await res.text();
        if (live.length > 0) return [live, true];
      }
    } catch {
      /* Offline, or blocked. The prop still works. */
    }
    return [fallback, false];
  }

  async function copy() {
    const [liveScript, freshScript] = await fetchFresh("/Code.gs", script);
    const [liveManifest] = await fetchFresh("/appsscript.json", manifest);

    const seen = /COURIER_VERSION = '([^']+)'/.exec(liveScript)?.[1] ?? null;
    const parcel = auditPackage(liveScript, liveManifest);
    setCopied(seen);
    setText(parcel);

    try {
      await navigator.clipboard.writeText(parcel);
      setState(freshScript && seen !== null && seen !== version ? "stale" : "done");
      setTimeout(() => setState("idle"), 8000);
    } catch {
      setState("failed");
    }
  }

  const size = Math.round(auditPackage(script, manifest).length / 1024);

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
      >
        {state === "done" || state === "stale" ? "Copied" : label}
      </button>

      <p
        id="copy-audit-status"
        role="status"
        className={`mt-3 max-w-[62ch] text-small leading-[1.5] ${state === "idle" ? "text-ink-faint" : "text-ink-muted"}`}
      >
        {state === "done"
          ? `It is on your clipboard. That is version ${copied ?? version} of the code, the question to ask, and what this site claims. Paste the whole thing into any AI.`
          : state === "stale"
            ? `This page was showing ${version}. What you have copied is version ${copied}, the one now published. Reload if the number above still looks wrong.`
            : state === "failed"
              ? "Your browser blocked the copy. Select the text in the box below and copy it by hand."
              : `About ${size} KB. Nothing is downloaded.`}
      </p>

      {state === "failed" && text !== null && (
        <textarea
          readOnly
          aria-label="The audit package, ready to copy"
          aria-describedby="copy-audit-status"
          value={text}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-4 h-64 w-full rounded-lg border border-rule bg-white p-3 font-mono text-[11px] leading-[1.5] text-ink"
        />
      )}
    </div>
  );
}
