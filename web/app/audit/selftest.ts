import { claimsText } from "@/lib/audit-prompt";
import { FINDINGS, ROUNDS, reviewCount, tally, versionSpan } from "@/lib/findings";

/**
 * The numbers and sentences the "Your data" page rests on.
 *
 * The page tells three findings as a story, prints figures from `tally()`,
 * and copies a package whose claims come from `privacy-copy.ts`. These checks
 * pin the things that would quietly go wrong: a story finding that no longer
 * exists, a tally that does not add up, an em dash creeping into the log, a
 * package that lost its claims.
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

/* ------------------------------------------------ the story the page tells */
{
  for (const id of ["1.1", "2.4", "3.1"]) {
    const f = FINDINGS.find((x) => x.id === id);
    check(`story finding ${id} exists`, Boolean(f), true);
    check(`story finding ${id} was fixed in code`, f?.verdict, "code");
    check(`story finding ${id} names a version`, Boolean(f?.version), true);
  }
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
  check("review count is the sum of the rounds", reviewCount(), ROUNDS.reduce((s, r) => s + r.reviews, 0));
  check("the version span is ordered", versionSpan().from <= versionSpan().to, true);
  check("no finding uses an em dash", FINDINGS.every((f) => !`${f.title}${f.detail}${f.done}`.includes("—")), true);
}

/* ------------------------------------------------ the package carries the claims */
{
  const text = claimsText();
  check("the package carries the main claim", text.includes("--- The main claim ---"), true);
  check("and the permissions", text.includes("--- What the site says each permission can and cannot do ---"), true);
  check("and the questions", text.includes("--- Questions the site answers ---"), true);
}

/* ---------------------------------------------------------------- */

if (failures > 0) {
  console.error(`\n${failures} of ${checks} checks failed.`);
  process.exit(1);
}
console.log(`All ${checks} audit checks passed.`);
