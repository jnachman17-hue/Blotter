/**
 * Is the code in a student's sheet the code we publish?
 *
 * ## Why this exists
 *
 * Jon, 5 September 2026: *"people might think, oh, you just put whatever code
 * in there that's safe, and we have a different code in the back end."* The
 * honest answer is that the code that reads their Gmail is in their own sheet,
 * so the question is not whether we publish the real thing but whether their
 * copy is it. This answers that question, in their browser, without sending
 * their copy anywhere.
 *
 * ## Why lines and not bytes
 *
 * A hash of the served file is published and is the right thing to put next
 * to a version number. It is the wrong thing to check a paste against. The
 * Apps Script editor is selected, copied and pasted into a box, and along the
 * way Windows line endings become Unix ones, trailing spaces vanish, and the
 * final newline comes or goes. Every one of those changes the hash and none of
 * them changes the code, so a byte check would tell honest students their copy
 * differs, which is the one outcome this tool must never produce by accident.
 *
 * So both texts are normalised the same way and compared line by line, and the
 * answer names the first line that differs. That is also more useful than a
 * hash: "your copy is version 4.5 and differs from line 28" tells a student what
 * to do, and "hashes differ" does not.
 *
 * Pure, so it runs in the browser and in `selftest.ts` alike.
 */

export interface Comparison {
  identical: boolean;
  theirsVersion: string | null;
  oursVersion: string | null;
  theirsLines: number;
  oursLines: number;
  /** Lines that differ, counted over the longer of the two. */
  differingLines: number;
  /** The first place they part, one-indexed, or null when identical. */
  firstDifference: { line: number; theirs: string; ours: string } | null;
}

/** The same shape for both sides: LF endings, no trailing space, no BOM, no blank edges. */
export function normaliseLines(text: string): string[] {
  const lines = text
    .replace(/^﻿/, "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""));
  while (lines.length > 0 && lines[0].trim() === "") lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();
  return lines;
}

/** The version a script declares about itself, or null when it declares none. */
export function versionOf(text: string): string | null {
  return /COURIER_VERSION = '([^']+)'/.exec(text)?.[1] ?? null;
}

export function compareScripts(theirs: string, ours: string): Comparison {
  const a = normaliseLines(theirs);
  const b = normaliseLines(ours);
  const n = Math.max(a.length, b.length);

  let differingLines = 0;
  let firstDifference: Comparison["firstDifference"] = null;
  for (let i = 0; i < n; i += 1) {
    const left = a[i] ?? "";
    const right = b[i] ?? "";
    if (left !== right) {
      differingLines += 1;
      if (firstDifference === null) {
        firstDifference = { line: i + 1, theirs: left, ours: right };
      }
    }
  }

  return {
    identical: differingLines === 0 && a.length === b.length,
    theirsVersion: versionOf(theirs),
    oursVersion: versionOf(ours),
    theirsLines: a.length,
    oursLines: b.length,
    differingLines,
    firstDifference,
  };
}
