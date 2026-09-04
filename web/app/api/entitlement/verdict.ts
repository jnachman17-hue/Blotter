/**
 * Whether a key entitles a run, given what the database says.
 *
 * **Pure on purpose, and deliberately not `server-only`.** This is the part
 * most worth testing — the day enforcement is switched on is the worst possible
 * day to find out it locks out paying students — and a module a test runner
 * cannot import is a module that does not get tested.
 *
 * **Binding is soft** (amendment A4). A hash that does not match the one on
 * record is reported, never refused. Every student's `.edu` is deprovisioned on
 * a schedule, a Workspace rename does the same, and on a manual run the
 * effective user is whoever clicked rather than the owner — so a mismatch is
 * far more likely to be a graduate than a thief, and locking out somebody who
 * is paying is much the worse mistake.
 */

export type KeyStatus = "active" | "grace" | "inactive";

export interface KeyRecord {
  status: KeyStatus;
  account_hash: string | null;
  /** ISO timestamp, or null. Grace is computed here rather than by a cron. */
  grace_until: string | null;
}

export interface Verdict {
  allow: boolean;
  /** Set when the run is refused, or when something is worth telling them. */
  reason: "no_key" | "unknown_key" | "lapsed" | "grace" | "mismatch" | "ok";
  /** True when the account hash differs from the one on record. Never refuses. */
  mismatch: boolean;
}

export function verdictFor(
  key: string | null,
  accountHash: string | null,
  record: KeyRecord | null,
  now: Date = new Date(),
): Verdict {
  if (!key) return { allow: false, reason: "no_key", mismatch: false };
  if (record === null) return { allow: false, reason: "unknown_key", mismatch: false };

  /* Grace is a timestamp compared at read time, never a job that flips a row
     (amendment A7). A scheduled expiry is a second source of truth and it
     drifts; a comparison cannot. */
  const inGrace =
    record.status === "grace" &&
    record.grace_until !== null &&
    Date.parse(record.grace_until) > now.getTime();

  const mismatch =
    accountHash !== null &&
    record.account_hash !== null &&
    record.account_hash !== accountHash;

  if (record.status === "active") {
    return { allow: true, reason: mismatch ? "mismatch" : "ok", mismatch };
  }
  if (inGrace) return { allow: true, reason: "grace", mismatch };
  return { allow: false, reason: "lapsed", mismatch };
}
