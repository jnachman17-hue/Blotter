/**
 * What may cross the telemetry wire, and nothing else.
 *
 * This lives in its own file so it can be tested directly. It was not, once,
 * and the cost was exactly the bug that teaches the lesson: the courier sends
 * `contract_version` as a **number**, the check demanded a string, every real
 * run was silently rejected — and the hand-written probe that "verified" the
 * endpoint had quoted the number, so it passed. **A payload invented for a
 * test proves nothing about the payload the code sends.** `selftest.ts` beside
 * this file now builds its cases the way `telemetryPayload_` in `Code.gs`
 * does, types included.
 */

/** A UUID and nothing else. Anything shaped differently is not an install id. */
const INSTALL_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Version strings are short and printable.
 *
 * **A number is accepted and stringified**, because the contract version
 * genuinely is one — `CONTRACT_VERSION = 4` — while the courier version is a
 * date string. Demanding one type of a field that legitimately arrives as
 * either is how the first version of this rejected every real run.
 */
function version(value: unknown): string | null {
  const text =
    typeof value === "number" && Number.isFinite(value)
      ? String(value)
      : typeof value === "string"
        ? value.trim()
        : null;
  if (text === null || text.length === 0 || text.length > 32) return null;
  return /^[A-Za-z0-9._-]+$/.test(text) ? text : null;
}

function count(value: unknown, ceiling: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const whole = Math.trunc(value);
  return whole >= 0 && whole <= ceiling ? whole : null;
}

/** A UUID and nothing else, reused for the key/account pair below. */
export interface KeyUse {
  key: string;
  account_hash: string | null;
}

/**
 * The key and account a run reported, if it reported any.
 *
 * **This lives on telemetry rather than the engine on purpose** (amendment
 * A2). Binding a key to an account is a write, and the engine's whole privacy
 * position is that it stores nothing — a claim that survives being checked
 * only if it stays literally true. Telemetry already writes, already receives
 * the install id, and is already fire-and-forget, so the recording belongs
 * here and the engine keeps to reading.
 */
export function pickKeyUse(body: unknown): KeyUse | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;
  const key = typeof raw.key === "string" ? raw.key.trim() : "";
  if (key.length === 0 || key.length > 64) return null;
  if (!/^[A-Za-z0-9._-]+$/.test(key)) return null;
  const hash = typeof raw.account === "string" ? raw.account.trim().toLowerCase() : "";
  return {
    key,
    /* Absence stays absence all the way down (amendment A3). A hash of nothing
       would be one identity shared by every install that could not read an
       address, and one key would unlock all of them. */
    account_hash: /^[0-9a-f]{64}$/.test(hash) ? hash : null,
  };
}

export interface InstallRow {
  install_id: string;
  contract_version: string;
  courier_version: string;
  contacts: number;
  seconds: number;
  ok: boolean;
  last_seen: string;
}

/**
 * The allow-list, and the entire privacy boundary on this side.
 *
 * It works by naming what may pass rather than removing what may not, so a
 * caller that sends a name, an address, a subject or a body has it **dropped
 * before anything is stored** rather than relying on someone having thought to
 * exclude it. Every value is bounded, so a count cannot be turned into a
 * payload by sending a very large one.
 *
 * Adding a field here is the moment to stop and ask whether it belongs.
 */
export function pickInstallRow(body: unknown, now: Date = new Date()): InstallRow | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;

  const id = typeof raw.install_id === "string" ? raw.install_id.trim() : "";
  if (!INSTALL_ID.test(id)) return null;

  const contract = version(raw.contract_version);
  const courier = version(raw.courier_version);
  const contacts = count(raw.contacts, 100_000);
  const seconds = count(raw.seconds, 86_400);
  if (contract === null || courier === null || contacts === null || seconds === null) return null;

  return {
    install_id: id.toLowerCase(),
    contract_version: contract,
    courier_version: courier,
    contacts,
    seconds,
    ok: raw.ok === true,
    /* The server's clock, not the caller's. A sheet with a wrong timezone must
       not be able to write itself into next week and distort a churn figure —
       which is also why the courier's own `at` is read and discarded. */
    last_seen: now.toISOString(),
  };
}
