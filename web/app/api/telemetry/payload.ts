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

export interface KeyUse {
  key: string;
  install_id: string;
}

/**
 * The key a run reported, and which sheet reported it.
 *
 * **This lives on telemetry rather than the engine on purpose** (amendment
 * A2). Binding is a write, and the engine's whole privacy position is that it
 * stores nothing — a claim that survives being checked only if it stays
 * literally true. Telemetry already writes, already receives the install id,
 * and is already fire-and-forget, so the recording belongs here.
 *
 * **A key binds to a SHEET, not a person.** Google gives the script no address
 * for the account it runs as, because the manifest asks for five scopes and
 * none of them is a userinfo one — found by running the diagnostic on a real
 * sheet rather than by reasoning about it. Adding the sixth scope would work
 * and would cost an extra line on the unverified-app consent screen plus a
 * forced re-authorisation for everyone already installed, and that screen is
 * the single biggest point at which a student abandons the install.
 *
 * **What that costs, stated rather than glossed:** one person with two sheets
 * and two people sharing a key look identical from here. Both produce a flag,
 * and a human decides — which at this scale is the right place for it.
 */
export function pickKeyUse(body: unknown): KeyUse | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;
  const key = typeof raw.key === "string" ? raw.key.trim() : "";
  if (key.length === 0 || key.length > 64) return null;
  if (!/^[A-Za-z0-9._-]+$/.test(key)) return null;
  const install = typeof raw.install_id === "string" ? raw.install_id.trim().toLowerCase() : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(install)) return null;
  return { key, install_id: install };
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
