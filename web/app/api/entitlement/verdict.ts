/**
 * Whether a key entitles a run, given what the database says.
 *
 * **Pure on purpose, and deliberately not `server-only`.** This is the part
 * most worth testing — the day enforcement is switched on is the worst possible
 * day to find out it locks out paying students — and a module a test runner
 * cannot import is a module that does not get tested.
 *
 * **This decides allow-or-refuse and nothing else.** Binding a key to a sheet,
 * and noticing when a second sheet turns up on the same key, happens in
 * `/api/telemetry` — because binding is a write, and the engine writing
 * anything would end a claim that currently survives being checked
 * (amendment A2).
 *
 * **Binding is soft, and it stays soft** (amendment A4). A second sheet on one
 * key is flagged for a person to look at, never refused. It could equally be
 * one student who made a fresh copy of their own tracker as two people sharing
 * — the two are indistinguishable from here — and at this scale a human
 * deciding is the right place for that decision. Locking out somebody who is
 * paying is much the worse mistake.
 */

export type KeyStatus = "active" | "grace" | "inactive";

export interface KeyRecord {
  status: KeyStatus;
  /** ISO timestamp, or null. Grace is computed here rather than by a cron. */
  grace_until: string | null;
}

export interface Verdict {
  allow: boolean;
  reason: "no_key" | "unknown_key" | "lapsed" | "grace" | "ok";
}

export function verdictFor(
  key: string | null,
  record: KeyRecord | null,
  now: Date = new Date(),
): Verdict {
  if (!key) return { allow: false, reason: "no_key" };
  if (record === null) return { allow: false, reason: "unknown_key" };

  /* Grace is a timestamp compared at read time, never a job that flips a row
     (amendment A7). A scheduled expiry is a second source of truth and it
     drifts; a comparison cannot. */
  const inGrace =
    record.status === "grace" &&
    record.grace_until !== null &&
    Date.parse(record.grace_until) > now.getTime();

  if (record.status === "active") return { allow: true, reason: "ok" };
  if (inGrace) return { allow: true, reason: "grace" };
  return { allow: false, reason: "lapsed" };
}
