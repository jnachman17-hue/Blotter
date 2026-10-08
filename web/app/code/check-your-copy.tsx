"use client";

import { useState } from "react";
import Link from "next/link";

import { B, LINK } from "@/app/setup/shared";
import { compareScripts, versionOf, type Comparison } from "@/lib/verify-copy";

/**
 * Paste the code from your own sheet; find out whether it is the code we
 * publish. Runs in the browser. Nothing pasted leaves the page.
 *
 * ## Why this is the strongest thing on the code page
 *
 * A fingerprint next to a version number proves the served file is the served
 * file, which nobody doubted. The doubt Jon named is different: *"you just put
 * whatever code in there that's safe, and we have a different code in the back
 * end."* The code that reads a student's Gmail is in their sheet, so the only
 * check that answers that doubt is one against their own copy. This is it.
 *
 * ## What "nothing leaves" has to mean
 *
 * The page fetches our own public `/Code.gs` and compares in the browser; the
 * pasted text is never posted anywhere. The site's analytics also must not see
 * it: the textarea carries `ph-no-capture`, which PostHog honours for both
 * autocapture and session replay, and the result text repeats only line
 * numbers and version strings, never the paste.
 *
 * `cache: "no-store"` on the fetch for the reason `update/copy-script.tsx`
 * gives: a browser will otherwise answer from its own copy of the file, and a
 * check against a stale copy is a check against nothing.
 *
 * ## The offline fallback
 *
 * The page arrives with the script already in it, because the page prints it.
 * If the fetch fails, the comparison runs against that copy instead and says
 * so, naming the version. That is what makes "you can turn your wifi off
 * first" a true sentence rather than a hopeful one: the check needs nothing
 * from the network once the page is open.
 *
 * ## Versions compare as numbers
 *
 * `"4.10" < "4.8"` is true as strings. Versions are compared segment by
 * segment as numbers so an older copy is called older and not something else.
 */

/** Negative when `a` is older than `b`, positive when newer, zero when equal. */
export function compareVersions(a: string, b: string): number {
  const as = a.split(".").map((s) => Number.parseInt(s, 10) || 0);
  const bs = b.split(".").map((s) => Number.parseInt(s, 10) || 0);
  const n = Math.max(as.length, bs.length);
  for (let i = 0; i < n; i += 1) {
    const d = (as[i] ?? 0) - (bs[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

type Source = "live" | "embedded";

export function CheckYourCopy({ version, embedded }: { version: string; embedded: string }) {
  const [text, setText] = useState("");
  const [state, setState] = useState<
    | { kind: "idle" }
    | { kind: "empty" }
    | { kind: "checking" }
    | { kind: "done"; result: Comparison; publishedVersion: string; source: Source }
  >({ kind: "idle" });

  async function check() {
    if (text.trim().length === 0) {
      setState({ kind: "empty" });
      return;
    }
    setState({ kind: "checking" });

    let ours = embedded;
    let source: Source = "embedded";
    try {
      const res = await fetch("/Code.gs", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      ours = await res.text();
      source = "live";
    } catch {
      /* No network, or the file could not be fetched. The page's own copy stands in. */
    }

    const result = compareScripts(text, ours);
    setState({ kind: "done", result, publishedVersion: result.oursVersion ?? version, source });
  }

  const embeddedVersion = versionOf(embedded) ?? version;

  return (
    <div className="mt-6 max-w-[64ch]">
      <label htmlFor="your-copy" className="block text-small font-semibold text-ink">
        Paste the code from your sheet
      </label>
      <p className="mt-1 text-small leading-[1.5] text-ink-muted">
        In your sheet: <B>Extensions</B> → <B>Apps Script</B>. Click in the code, select all of
        it, copy, and paste it here.
      </p>
      <textarea
        id="your-copy"
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        data-ph-no-capture
        className="ph-no-capture mt-3 h-40 w-full rounded-lg border border-rule bg-white p-3 font-mono text-[11px] leading-[1.5] text-ink focus:border-navy-500 focus:outline-none"
        placeholder="/**&#10; * Blotter&#10; *&#10; * This file is the part of Blotter that lives in your spreadsheet…"
      />
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={check}
          disabled={state.kind === "checking"}
          className="inline-flex min-h-11 items-center rounded-full bg-navy-900 px-6 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700 disabled:opacity-60"
        >
          {state.kind === "checking" ? "Checking" : "Check it against the published code"}
        </button>
        <span className="max-w-[28ch] text-small leading-[1.5] text-ink-faint">
          Runs in your browser. Nothing you paste leaves this page. You can turn your wifi off
          first.
        </span>
      </div>

      <div aria-live="polite" className="mt-5">
        {state.kind === "empty" && (
          <p className="text-body leading-[1.6] text-ink-muted">Paste the code first. The box is empty.</p>
        )}
        {state.kind === "done" && state.result.identical && (
          <div className="border-l-2 border-blotter-400 bg-white py-4 pr-5 pl-5">
            <p className="text-body font-semibold text-ink">Identical.</p>
            <p className="mt-1 text-body leading-[1.6] text-ink-muted">
              Every one of the {state.result.oursLines.toLocaleString()} lines in your copy matches
              version {state.publishedVersion}, the one published here. What is running in your
              sheet is what anyone can read on this page.
            </p>
            <Compared source={state.source} version={embeddedVersion} />
          </div>
        )}
        {state.kind === "done" && !state.result.identical && (
          <div className="border-l-2 border-rule bg-white py-4 pr-5 pl-5">
            <p className="text-body font-semibold text-ink">
              {state.result.theirsVersion === null
                ? "Your copy does not say which version it is."
                : state.result.theirsVersion === state.publishedVersion
                  ? `Your copy says it is version ${state.result.theirsVersion}, but it is not the same as the published one.`
                  : `Your copy is version ${state.result.theirsVersion}. The published one is ${state.publishedVersion}.`}
            </p>
            <p className="mt-1 text-body leading-[1.6] text-ink-muted">
              The first difference is at line {state.result.firstDifference?.line.toLocaleString()}.{" "}
              {state.result.differingLines.toLocaleString()} line
              {state.result.differingLines === 1 ? " differs" : "s differ"} in total.
            </p>
            {state.result.firstDifference && (
              <dl className="mt-3 space-y-2 font-mono text-[11px] leading-[1.5]">
                <div>
                  <dt className="font-sans text-micro text-ink-faint">Yours, line {state.result.firstDifference.line}</dt>
                  <dd className="mt-0.5 break-all text-ink">{state.result.firstDifference.theirs || "(blank)"}</dd>
                </div>
                <div>
                  <dt className="font-sans text-micro text-ink-faint">Published, line {state.result.firstDifference.line}</dt>
                  <dd className="mt-0.5 break-all text-ink">{state.result.firstDifference.ours || "(blank)"}</dd>
                </div>
              </dl>
            )}
            <p className="mt-3 text-body leading-[1.6] text-ink-muted">
              {state.result.theirsVersion !== null &&
              compareVersions(state.result.theirsVersion, state.publishedVersion) < 0 ? (
                <>
                  An older version is the usual reason.{" "}
                  <Link href="/update" className={LINK}>
                    Updating
                  </Link>{" "}
                  takes about a minute and changes nothing else in your sheet.
                </>
              ) : (
                <>
                  If you did not change the code yourself, do not run it. Paste the published version in
                  from{" "}
                  <Link href="/update" className={LINK}>
                    the update page
                  </Link>{" "}
                  and check again.
                </>
              )}
            </p>
            <Compared source={state.source} version={embeddedVersion} />
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-rule pt-4 text-small leading-[1.55] text-ink-muted">
        The paste checks the code. <B>Blotter → Check this sheet</B> checks where it sends. Both
        have to pass.
      </p>
    </div>
  );
}

/** Which copy the paste was held against. Said out loud only when it was not the live one. */
function Compared({ source, version }: { source: Source; version: string }) {
  if (source === "live") return null;
  return (
    <p className="mt-3 text-small leading-[1.5] text-ink-faint">
      Compared against the copy this page loaded with, version {version}.
    </p>
  );
}
