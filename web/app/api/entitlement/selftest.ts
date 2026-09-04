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
  status: "active", grace_until: null, ...o,
});

/* Allow or refuse, and nothing else. Which sheet a key belongs to, and what to
   do when a second one turns up on it, is telemetry's job — because binding is
   a write and the engine must not do those. */
check("no key at all", verdictFor(null, null, NOW).allow, false);
check("an empty key is no key", verdictFor("", null, NOW).reason, "no_key");
check("a key nobody has heard of", verdictFor("k", null, NOW).reason, "unknown_key");
check("an active key runs", verdictFor("k", rec(), NOW).allow, true);
check("an inactive key does not", verdictFor("k", rec({ status: "inactive" }), NOW).allow, false);

/* Grace is a comparison, never a scheduled job that flips a row (A7). */
check("grace that has not expired still runs",
  verdictFor("k", rec({ status: "grace", grace_until: "2026-09-10T00:00:00Z" }), NOW).allow, true);
check("grace that has expired does not",
  verdictFor("k", rec({ status: "grace", grace_until: "2026-09-01T00:00:00Z" }), NOW).allow, false);
check("grace with no date is not grace",
  verdictFor("k", rec({ status: "grace" }), NOW).allow, false);
check("grace expiring exactly now has expired",
  verdictFor("k", rec({ status: "grace", grace_until: NOW.toISOString() }), NOW).allow, false);

/* Refusing must never be something a bad row can cause by accident. */
check("an unrecognised status is refused, not waved through",
  verdictFor("k", rec({ status: "nonsense" as KeyRecord["status"] }), NOW).allow, false);

console.log(
  failures === 0
    ? `All ${checks} entitlement checks passed.`
    : `\n${failures} of ${checks} entitlement checks failed.`,
);
process.exit(failures === 0 ? 0 : 1);
