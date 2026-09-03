import { pickInstallRow } from "./payload";

/**
 * The telemetry boundary, tested against the payload the courier really sends.
 *
 * **This file exists because of a specific bug.** `telemetryPayload_` in
 * `Code.gs` sets `contract_version: CONTRACT_VERSION`, which is the *number*
 * 4. The first version of the check demanded a string, so every real run was
 * rejected and nothing was ever counted — and the hand-written curl that
 * "verified" the endpoint had written `"4"` in quotes, so it passed and hid
 * it. **A payload invented for a test proves nothing about the payload the
 * code sends**, so `courierPayload()` below mirrors `telemetryPayload_` field
 * for field, types included, and every case is built from it.
 *
 * Run with: `npx tsx web/app/api/telemetry/selftest.ts`
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

/**
 * A copy of `telemetryPayload_` from `courier/Code.gs`, kept deliberately
 * literal. **If that function changes, this must change with it** — that is
 * the whole point of it being here rather than being described in prose.
 */
function courierPayload(overrides: Record<string, unknown> = {}) {
  return {
    install_id: "3f2a91c4-77b1-4d2e-9a63-0c5518ee7b04",
    contract_version: 4,            // a NUMBER, as CONTRACT_VERSION is
    courier_version: "2026-09-03",  // a string
    at: "2026-09-03T12:00:00-05:00",
    contacts: 37,
    seconds: 44,
    ok: true,
    ...overrides,
  };
}

const NOW = new Date("2026-09-03T18:00:00Z");

/* ---------------------------------------------------------------- *
 * The real payload is accepted, and this is the check that was missing
 * ---------------------------------------------------------------- */

{
  const row = pickInstallRow(courierPayload(), NOW);
  check("the courier's own payload is accepted", row !== null, true);
  check("a numeric contract version is stringified", row?.contract_version, "4");
  check("the courier version passes through", row?.courier_version, "2026-09-03");
  check("the contact count survives", row?.contacts, 37);
  check("the duration survives", row?.seconds, 44);
  check("and whether it worked", row?.ok, true);
  check("a failed run is accepted too", pickInstallRow(courierPayload({ ok: false }), NOW)?.ok, false);
  check("an empty sheet is a real number, not a rejection", pickInstallRow(courierPayload({ contacts: 0 }), NOW)?.contacts, 0);
}

/* ---------------------------------------------------------------- *
 * The clock is the server's, and the caller's `at` is discarded
 * ---------------------------------------------------------------- */

{
  const row = pickInstallRow(courierPayload({ at: "2099-01-01T00:00:00Z" }), NOW);
  check("last_seen is the server's clock", row?.last_seen, NOW.toISOString());
  check("a sheet cannot write itself into next year", row?.last_seen.startsWith("2026"), true);
}

/* ---------------------------------------------------------------- *
 * The allow-list: what may never be stored
 * ---------------------------------------------------------------- */

{
  const row = pickInstallRow(
    courierPayload({
      name: "Jamie Diamond",
      email: "jamie@jpmorgan.com",
      subject: "Re: Intro",
      body: "the text of an email",
      firm: "JPMorgan",
    }),
    NOW,
  );
  check(
    "only the seven allowed fields are ever stored",
    Object.keys(row ?? {}).sort(),
    ["contacts", "contract_version", "courier_version", "install_id", "last_seen", "ok", "seconds"],
  );
  const stored = JSON.stringify(row).toLowerCase();
  for (const forbidden of ["jamie", "jpmorgan", "@", "intro", "the text"]) {
    check(`nothing resembling "${forbidden}" is stored`, stored.includes(forbidden), false);
  }
}

/* ---------------------------------------------------------------- *
 * What is refused
 * ---------------------------------------------------------------- */

check("a missing install id", pickInstallRow(courierPayload({ install_id: undefined }), NOW), null);
check("an install id that is not a uuid", pickInstallRow(courierPayload({ install_id: "student@example.com" }), NOW), null);
check("an email smuggled in as the id", pickInstallRow(courierPayload({ install_id: "jamie@jpmorgan.com" }), NOW), null);
check("a version with punctuation in it", pickInstallRow(courierPayload({ courier_version: "2026-09-03; drop table" }), NOW), null);
check("a very long version string", pickInstallRow(courierPayload({ courier_version: "x".repeat(33) }), NOW), null);
check("a count that is text", pickInstallRow(courierPayload({ contacts: "37" }), NOW), null);
check("a negative count", pickInstallRow(courierPayload({ contacts: -1 }), NOW), null);
check("an absurd count", pickInstallRow(courierPayload({ contacts: 1e9 }), NOW), null);
check("a duration longer than a day", pickInstallRow(courierPayload({ seconds: 90_000 }), NOW), null);
check("not an object at all", pickInstallRow("hello", NOW), null);
check("an array", pickInstallRow([courierPayload()], NOW), null);
check("null", pickInstallRow(null, NOW), null);

/* `ok` is strict: anything that is not literally true is a failed run, so a
   caller cannot make a broken install look healthy with a truthy string. */
check("a truthy string is not success", pickInstallRow(courierPayload({ ok: "yes" }), NOW)?.ok, false);
check("a missing ok is not success", pickInstallRow(courierPayload({ ok: undefined }), NOW)?.ok, false);

console.log(
  failures === 0
    ? `All ${checks} telemetry checks passed.`
    : `\n${failures} of ${checks} telemetry checks failed.`,
);
process.exit(failures === 0 ? 0 : 1);
