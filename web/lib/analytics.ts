/**
 * Provider-independent analytics adapter.
 *
 * Authority: WS3-SPEC.md (event set, meanings, properties),
 * WS5-SPEC.md Phase 5, PLAN-AMENDMENTS-2026-08-01.md (suppression key shape).
 *
 * No vendor is connected here. `sink` is swapped at the analytics phase once
 * a provider is approved. The nine event names and the property contract are
 * frozen and must not change with the vendor.
 */

import { isInternalVisitor } from "./internal-visitor";

/**
 * The complete canonical event set. There is no separate `cta_clicked` event.
 *
 * ## `waitlist_joined` is a tenth event, added August 12, 2026
 *
 * **This amends WS3's frozen nine-event contract**, approved by Jon. Recorded
 * here rather than only in the log, because the freeze exists to stop exactly
 * this happening by accident.
 *
 * What justifies it: the contract is frozen to protect the comparability of
 * the nine, and this alters none of them. **`checkout_started / page_viewed`,
 * the primary comparative metric, keeps its numerator and its denominator.**
 * The tenth event fires only on a branch that did not previously exist, so no
 * historical figure changes meaning.
 *
 * Why it could not be avoided: without it the waitlist branch is invisible in
 * PostHog and recoverable only by reading Supabase, which is not where funnel
 * questions get answered.
 *
 * **It is not a funnel step.** A PostHog funnel is an ordered sequence, and
 * `waitlist_joined` and `checkout_started` are mutually exclusive branches off
 * `price_viewed` — a visitor does exactly one. Inserting it into the canonical
 * funnel would drive every step after it to zero. It belongs in its own
 * insight, `price_viewed -> waitlist_joined`, which is what
 * `07-infrastructure-runbook.md` now says.
 */
export const CANONICAL_EVENTS = [
  "page_viewed",
  "funnel_started",
  "recruiting_profile_completed",
  "product_experience_completed",
  "email_submitted",
  "price_viewed",
  "checkout_started",
  "payment_option_clicked",
  "beta_spot_confirmed",
  "waitlist_joined",
] as const;

export type CanonicalEvent = (typeof CANONICAL_EVENTS)[number];

/** The four ratified CTA origins. `header` was added in PLAN-AMENDMENTS-2026-08-01. */
/**
 * `sticky` is a fifth placement, added August 10, 2026 for the mobile build and
 * approved by Jon. `PLAN-AMENDMENTS-2026-08-01.md` records four; this
 * supersedes that count and nothing else about it — all five still enter the
 * same canonical funnel.
 *
 * **It adds a property value, not a tenth event.** `cta_location` is a property
 * of `funnel_started`, so the frozen nine are untouched and every ratified rate
 * keeps its denominator. A funnel split by `cta_location` simply gains a row.
 *
 * It exists only below the desktop breakpoint, so any `sticky` in the data is
 * by definition a small-screen visitor — which makes it the cleanest read we
 * have on whether mobile converts differently.
 */
export type CtaLocation = "header" | "hero" | "actions" | "final" | "sticky";

export type RecruitingTrack =
  | "Investment Banking"
  | "Management Consulting"
  | "Private Equity / Growth Equity"
  | "Sales & Trading"
  | "Asset Management / Equity Research"
  | "Venture Capital"
  | "Other";

export type RecruitingWindow = "Summer 2028" | "Full-time" | "Other";

export type PaymentMethod = "card" | "apple_pay";

/**
 * Event properties. Email is deliberately absent and must never be added:
 * it belongs in lead storage only (WS3-SPEC, LOVABLE-PROJECT-KNOWLEDGE).
 */
export interface EventProperties {
  surface_variant: "spreadsheet";
  session_id: string;
  visitor_id: string;
  traffic_source?: string;
  campaign?: string;
  device_type?: "desktop" | "tablet" | "mobile";
  cta_location?: CtaLocation;
  recruiting_track?: RecruitingTrack;
  recruiting_window?: RecruitingWindow;
  /**
   * What the visitor typed when they chose `Other`.
   *
   * Added August 6, 2026 on Jon's instruction, and it is a research field
   * rather than a segmentation one: the point is to learn which categories are
   * missing from the two option lists. Additive to WS3's frozen property set,
   * which it does not alter — every existing property keeps its meaning, so
   * the two variants stay comparable.
   *
   * Free text typed by a stranger. Never render it back into the page, and
   * treat it as untrusted anywhere it is read.
   */
  recruiting_track_other?: string;
  recruiting_window_other?: string;
  price?: 9.99;
  billing_period?: "monthly";
  payment_method?: PaymentMethod;
  /**
   * True for browsers marked with `?blotter_internal=1`.
   *
   * Present on every event so no query has to guess. **Exclude it when reading
   * results**: internal traffic is captured deliberately so production can be
   * verified, which means it is in the data until something filters it out.
   */
  is_internal?: true;
}

export interface AnalyticsSink {
  capture(event: CanonicalEvent, properties: EventProperties): void;
  identify?(visitorId: string): void;
}

/** Default sink. Records to console in development, discards in production. */
const noopSink: AnalyticsSink = {
  capture(event, properties) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.info(`[analytics] ${event}`, properties);
    }
  },
};

let sink: AnalyticsSink = noopSink;

/**
 * Events fired before a real sink arrived.
 *
 * `page_viewed` fires the moment the page mounts, and the vendor is loaded
 * asynchronously, so the first and most important event of the contract is
 * guaranteed to be early. It is the denominator of every ratio in WS3's metric
 * hierarchy — losing it does not lose one event, it silently deflates every
 * rate on the surface.
 *
 * So they queue instead. Suppression has already been applied by the time an
 * event lands here, so flushing cannot double-count.
 */
const pending: Array<[CanonicalEvent, EventProperties]> = [];
let sinkIsReal = false;

export function setAnalyticsSink(next: AnalyticsSink) {
  sink = next;
  sinkIsReal = true;
  const queued = pending.splice(0, pending.length);
  for (const [event, properties] of queued) sink.capture(event, properties);
}

/**
 * Test iteration. Namespaces milestone suppression so a visitor is not
 * permanently suppressed across future test rounds (PLAN-AMENDMENTS).
 *
 * ## Do not bump this for a page change. Amended August 12, 2026.
 *
 * It used to read *"bump this whenever a material page, funnel, price, or
 * proposition change creates a new labeled iteration under the WS3
 * test-integrity rule."* **Jon withdrew the test-integrity rule on August 12,
 * 2026** — the page may now change mid-flight and its data is not split.
 *
 * A bump re-fires every milestone for every returning visitor and starts a
 * second dataset, which is precisely the non-blending behaviour that ruling
 * withdrew. It stays `r1` for the whole of round one. A genuinely new test
 * round is the only thing that moves it.
 *
 * What survives the withdrawal is a *reporting* obligation rather than a code
 * one: WS3's reporting requirements still ask for exact dates and material
 * changes, so a page change is written down, not namespaced away.
 */
export const TEST_ITERATION = "r1";

const SURFACE_VARIANT = "spreadsheet" as const;

function suppressionKey(event: CanonicalEvent) {
  return `blotter:${TEST_ITERATION}:${SURFACE_VARIANT}:${event}`;
}

/** At-most-once per visitor, per iteration, per surface, per event. */
function alreadyFired(event: CanonicalEvent): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(suppressionKey(event)) !== null;
  } catch {
    return false;
  }
}

function markFired(event: CanonicalEvent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(suppressionKey(event), "1");
  } catch {
    /* storage unavailable; fire-through is preferable to dropping the event */
  }
}

const VISITOR_KEY = "blotter:visitor_id";
const SESSION_KEY = "blotter:session_id";

function readId(storage: Storage, key: string): string {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  storage.setItem(key, next);
  return next;
}

/**
 * Identifiers for a browser that refuses storage.
 *
 * This used to return the constant `"anonymous"`, and that was a real bug
 * rather than a cosmetic one: `visitor_id` is the conflict key that
 * `/api/lead` upserts on, so every storage-blocked visitor wrote onto the same
 * row and overwrote the previous one's email. Private browsing is not a rare
 * case, and the rows lost that way were silently lost.
 *
 * A per-load random pair fixes it. It is not durable — a refresh produces a new
 * identity, so these visitors cannot be deduplicated across sessions — but a
 * duplicate row is a far smaller error than a destroyed one, and the constant
 * was also a publicly known key anyone could post to.
 */
let volatileIds: { visitor_id: string; session_id: string } | null = null;

export function getIdentifiers(): { visitor_id: string; session_id: string } {
  if (typeof window === "undefined") {
    return { visitor_id: "ssr", session_id: "ssr" };
  }
  try {
    return {
      visitor_id: readId(window.localStorage, VISITOR_KEY),
      session_id: readId(window.sessionStorage, SESSION_KEY),
    };
  } catch {
    volatileIds ??= {
      visitor_id: crypto.randomUUID(),
      session_id: crypto.randomUUID(),
    };
    return volatileIds;
  }
}

function deviceType(): "desktop" | "tablet" | "mobile" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/* ------------------------------------------------------------- attribution */

/**
 * Where the visitor came from, and which post brought them.
 *
 * Rewritten August 12, 2026, before promotion. **This is an instrumentation
 * repair, not a change of meaning:** `traffic_source` and `campaign` are WS3
 * properties and still answer the same question. What changed is that the old
 * implementation could not answer it reliably on the three surfaces this test
 * is about to be promoted on.
 *
 * ## Why it matters more than it used to
 *
 * Round one has one arm, so the audience *is* the result, and the August 12
 * audience ruling is deliberately broad — anyone recruiting in finance. That
 * makes composition something to be **read after the fact rather than
 * controlled up front**, and `traffic_source` is what makes that reading
 * possible. WS3's reporting requirements demand results by traffic source.
 *
 * ## The four faults in the previous version
 *
 * 1. **`document.referrer` is `""` for direct traffic, and `?? ` does not catch
 *    an empty string.** So direct visitors carried `traffic_source: ""` rather
 *    than no property, which is a value that reads as a bug in every breakdown.
 *    Direct traffic is now the explicit bucket `direct`.
 * 2. **Raw referrer strings do not group.** `https://www.reddit.com/r/x/...`
 *    and `reddit` are the same source and were two rows. Referrers are now
 *    reduced to a bare hostname.
 * 3. **Same-host navigation counted as a referral.** A visitor going to
 *    `/privacy` and back arrived referred by `blotterib.com`, overwriting their
 *    real source. Own-host referrers are now ignored.
 * 4. **Nothing was persisted**, so attribution was recomputed per event from
 *    the URL at that moment. Within one uninterrupted visit the funnel is a
 *    dialog and never rewrites the URL, so this held — but a return visit
 *    converted as direct, and the visitor who converts is often not the one who
 *    first arrived.
 *
 * ## First identified touch wins
 *
 * The post that brought someone gets the credit, so the first *identified*
 * source is stored and every later event reports it. `direct` is deliberately
 * never stored: a visitor who arrives cold and comes back through a tagged link
 * should be claimable by that link, rather than locked to the absence of one.
 *
 * Namespaced by `TEST_ITERATION` to match the suppression keys, so a future
 * round does not inherit this round's attribution.
 */

type Attribution = Pick<EventProperties, "traffic_source" | "campaign">;

const ATTRIBUTION_KEY = `blotter:${TEST_ITERATION}:attribution`;

/** Unattributed traffic, as a countable value rather than an empty string. */
const DIRECT = "direct";

/** Lowercased, trimmed and bounded. Query strings are typed by strangers. */
function tag(value: string | null): string | undefined {
  const trimmed = value?.trim().toLowerCase();
  return trimmed ? trimmed.slice(0, 64) : undefined;
}

/** `https://www.reddit.com/r/x/...` becomes `reddit.com`. Own host is not a source. */
function referrerHost(): string | undefined {
  if (!document.referrer) return undefined;
  let host: string;
  try {
    host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return undefined;
  }
  if (!host) return undefined;
  const self = window.location.hostname.toLowerCase().replace(/^www\./, "");
  return host === self ? undefined : host;
}

/** What this page load alone can say. A tagged link always beats a referrer. */
function attributionFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const tagged = tag(params.get("utm_source"));
  if (tagged) {
    return { traffic_source: tagged, campaign: tag(params.get("utm_campaign")) };
  }
  const referred = referrerHost();
  return referred ? { traffic_source: referred } : {};
}

function readStoredAttribution(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { traffic_source, campaign } = parsed as Attribution;
    return typeof traffic_source === "string" && traffic_source
      ? { traffic_source, ...(typeof campaign === "string" && campaign ? { campaign } : {}) }
      : null;
  } catch {
    return null;
  }
}

function writeStoredAttribution(value: Attribution) {
  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable; this load still reports itself correctly */
  }
}

function attribution(): Attribution {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution();
  if (stored) return stored;

  const fresh = attributionFromUrl();
  if (fresh.traffic_source) {
    writeStoredAttribution(fresh);
    return fresh;
  }

  return { traffic_source: DIRECT };
}

/**
 * Record first touch on page load, independently of whether any event fires.
 *
 * `attribution()` is otherwise reached only from `track()`, which returns early
 * on a suppressed milestone — so a visitor whose milestones had all fired could
 * arrive through a tagged link and have it recorded nowhere. That case barely
 * matters on its own (they are already counted under their first source), but
 * the coupling does: it makes attribution silently depend on suppression state,
 * which is both wrong in principle and untestable in a browser that has been
 * through the funnel before. Called by `AnalyticsProvider` on mount.
 *
 * **Returns whether attribution is now durably stored**, which is not the same
 * as whether it was captured. A browser that refuses storage still reports its
 * source correctly on this load, by re-reading the URL for every event — so a
 * caller must not clean the tracking parameters out of the address bar unless
 * this returns `true`. Stripping them there would attribute that visitor's
 * `page_viewed` to Reddit and every later event to `direct`.
 */
export function captureAttribution(): boolean {
  if (typeof window === "undefined") return false;
  attribution();
  return readStoredAttribution() !== null;
}

/**
 * Fire a canonical milestone. Deduplicated per visitor, so back navigation
 * and refresh do not inflate counts (WS3 metric rule: all rates use unique
 * eligible visitors).
 */
export function track(
  event: CanonicalEvent,
  properties: Partial<EventProperties> = {},
) {
  if (alreadyFired(event)) return;

  const payload: EventProperties = {
    surface_variant: SURFACE_VARIANT,
    ...getIdentifiers(),
    device_type: deviceType(),
    ...attribution(),
    ...(isInternalVisitor() ? { is_internal: true as const } : {}),
    ...properties,
  };

  if (sinkIsReal) {
    sink.capture(event, payload);
  } else {
    /* Held until a vendor connects. The console sink still shows it in
       development so the flow can be watched without a provider. */
    sink.capture(event, payload);
    pending.push([event, payload]);
  }
  markFired(event);
}

/** Escape hatch for manual verification runs (WS5 Phase 8). */
export function resetSuppression() {
  if (typeof window === "undefined") return;
  for (const event of CANONICAL_EVENTS) {
    window.localStorage.removeItem(suppressionKey(event));
  }
}
