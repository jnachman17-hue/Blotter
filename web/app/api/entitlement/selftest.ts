import { verdictFor, type KeyRecord } from "./verdict";

/**
 * The entitlement decision, tested without a database.
 *
 * Everything here is dormant — `enforcing()` is off and nothing is refused —
 * but the decision itself is worth pinning now, because the day it is switched
 * on is the worst possible day to discover it locks out paying students.
 *
 * Run with: `npx tsx web/app/api/entitlement/selftest.ts`
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

const NOW = new Date("2026-09-03T12:00:00Z");
const rec = (o: Partial<KeyRecord> = {}): KeyRecord => ({
  status: "active", account_hash: null, grace_until: null, ...o,
});
const HASH_A = "a".repeat(64);
const HASH_B = "b".repeat(64);

/* The ordinary cases. */
check("no key at all", verdictFor(null, HASH_A, null, NOW).allow, false);
check("an empty key is no key", verdictFor("", HASH_A, null, NOW).reason, "no_key");
check("a key nobody has heard of", verdictFor("k", HASH_A, null, NOW).reason, "unknown_key");
check("an active key runs", verdictFor("k", HASH_A, rec(), NOW).allow, true);
check("an inactive key does not", verdictFor("k", HASH_A, rec({ status: "inactive" }), NOW).allow, false);

/* Grace is a comparison, never a scheduled job that flips a row (A7). */
check("grace that has not expired still runs",
  verdictFor("k", HASH_A, rec({ status: "grace", grace_until: "2026-09-10T00:00:00Z" }), NOW).allow, true);
check("grace that has expired does not",
  verdictFor("k", HASH_A, rec({ status: "grace", grace_until: "2026-09-01T00:00:00Z" }), NOW).allow, false);
check("grace with no date is not grace",
  verdictFor("k", HASH_A, rec({ status: "grace" }), NOW).allow, false);

/* Binding is SOFT, and this is the amendment that matters most (A4). Every
   student's .edu is deprovisioned on a schedule; a Workspace rename does the
   same; on a manual run the effective user is whoever clicked. A mismatch is
   far more likely to be a graduate than a thief. */
{
  const v = verdictFor("k", HASH_B, rec({ account_hash: HASH_A }), NOW);
  check("a mismatched account is NEVER refused", v.allow, true);
  check("but it is flagged for a person to look at", v.mismatch, true);
  check("and named as such", v.reason, "mismatch");
}
check("a matching account is not flagged",
  verdictFor("k", HASH_A, rec({ account_hash: HASH_A }), NOW).mismatch, false);
check("an unbound key is not a mismatch",
  verdictFor("k", HASH_A, rec({ account_hash: null }), NOW).mismatch, false);

/* Absence is a state, never a value (A3). A run that could not read an address
   sends no hash at all, and that must not look like a mismatch — nor bind. */
check("no hash sent is not a mismatch",
  verdictFor("k", null, rec({ account_hash: HASH_A }), NOW).mismatch, false);
check("and such a run still works",
  verdictFor("k", null, rec({ account_hash: HASH_A }), NOW).allow, true);

console.log(
  failures === 0
    ? `All ${checks} entitlement checks passed.`
    : `\n${failures} of ${checks} entitlement checks failed.`,
);
process.exit(failures === 0 ? 0 : 1);
