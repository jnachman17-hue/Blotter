import { readFileSync } from "node:fs";
import path from "node:path";

import { claimsText } from "@/lib/audit-prompt";
import { FINDINGS, ROUNDS, tally } from "@/lib/findings";
import { SCENES, captionsBlock } from "@/lib/run-scenes";

/**
 * What the audit page draws has to be true of the code it draws.
 *
 * The drawing on `/audit` names, under every scene, the functions in
 * `Code.gs` it is showing. A caption that names a function that no longer
 * exists is the drawing lying about the code, quietly, to the one reader who
 * goes and looks. So every name is checked against the published script.
 *
 * The other checks pin the sentences the honesty of the page rests on: the
 * server scene says "We say" and "cannot prove" in every version; the bounce
 * scene says addresses, plural (finding 2.9); the captions ride along in the
 * package a student pastes into an AI; and the figures on the page come from
 * the same function the findings page uses, so they cannot disagree.
 *
 * Run with: `npx tsx web/app/audit/selftest.ts`
 */

let failures = 0;
let checks = 0;

function check(label: string, actual: unknown, expected: unknown): void {
  checks += 1;
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    failures += 1;
    console.error(`FAIL ${label}\n  expected ${e}\n  got      ${a}`);
  }
}

/* ------------------------------------------------ scenes name real code */
{
  const published = readFileSync(path.join(__dirname, "..", "..", "public", "Code.gs"), "utf8");
  for (const scene of SCENES) {
    for (const fn of scene.fns) {
      check(`scene ${scene.n} names a real function: ${fn}`, published.includes(`function ${fn}(`), true);
    }
    check(`scene ${scene.n} caption is 26 words or fewer`, scene.caption.split(/\s+/).length <= 26, true);
    check(`scene ${scene.n} has a positive duration`, scene.seconds > 0, true);
  }
  check("seven scenes", SCENES.length, 7);
  check("scenes are numbered in order", SCENES.map((s) => s.n), [1, 2, 3, 4, 5, 6, 7]);
}

/* ------------------------------------------------ the honesty sentences */
{
  const server = SCENES[6].caption;
  check("the server scene says 'We say'", server.includes("We say"), true);
  check("and that the code cannot prove it", server.includes("cannot prove"), true);
  check("the bounce scene says addresses, plural", /addresses/.test(SCENES[3].caption), true);
  check("no caption draws the inside of the server", SCENES.every((s) => !/inside the server|server (deletes|discards|forgets)/i.test(s.caption)), true);
  check("no caption uses an em dash", SCENES.every((s) => !s.caption.includes("—")), true);
}

/* ------------------------------------------------ the package carries them */
{
  const text = claimsText();
  check("the captions block is in the package", text.includes(captionsBlock()), true);
  check("under its own heading", text.includes("drawing says"), true);
}

/* ------------------------------------------------ the figures cannot drift */
{
  const t = tally();
  check("every finding is counted once", t.fixedInCode + t.fixedInWording + t.kept + t.wrong, FINDINGS.length);
  check("raised is the list", t.raised, FINDINGS.length);
  check("true and fixed is code plus wording", t.trueAndFixed, t.fixedInCode + t.fixedInWording);
  check("finding ids are unique", new Set(FINDINGS.map((f) => f.id)).size, FINDINGS.length);
  check("every finding belongs to a round", FINDINGS.every((f) => ROUNDS.some((r) => r.n === f.round)), true);
  check("every finding says what was done", FINDINGS.every((f) => f.done.trim().length > 0), true);
  check("no finding uses an em dash", FINDINGS.every((f) => !`${f.title}${f.detail}${f.done}`.includes("—")), true);
}

/* ---------------------------------------------------------------- */

if (failures > 0) {
  console.error(`\n${failures} of ${checks} checks failed.`);
  process.exit(1);
}
console.log(`All ${checks} audit checks passed.`);
