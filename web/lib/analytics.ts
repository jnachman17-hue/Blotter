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

/** The complete canonical event set. There is no separate `cta_clicked` event. */
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
 * Bump this whenever a material page, funnel, price, or proposition change
 * creates a new labeled iteration under the WS3 test-integrity rule.
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

function attribution(): Pick<EventProperties, "traffic_source" | "campaign"> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    traffic_source: params.get("utm_source") ?? document.referrer ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
  };
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
