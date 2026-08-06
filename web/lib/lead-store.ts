/**
 * Lead capture, provider-independent.
 *
 * The same shape as `lib/analytics.ts` and for the same reason: the contract is
 * decided now, the vendor is not. Supabase is the intended destination and is
 * not provisioned, so `sink` records in memory and nothing leaves the browser.
 *
 * **This is not storage and must not be described as though it were.** A lead
 * submitted today is gone on refresh. Swap `sink` when Supabase exists; nothing
 * that calls `saveLead` needs to change.
 *
 * The field list is `WS5-SPEC.md` Phase 4, unchanged:
 * recruiting email, track, window, surface variant, CTA location, visitor and
 * session identifiers, timestamp, and the furthest stage reached.
 *
 * Email lives here and nowhere else. It may never be copied into an analytics
 * property — WS3 and WS5 both require it, and `EventProperties` deliberately
 * has no field it could occupy.
 */

import type { CtaLocation, RecruitingTrack, RecruitingWindow } from "./analytics";
import { getIdentifiers, TEST_ITERATION } from "./analytics";

export interface Lead {
  email: string;
  recruiting_track: RecruitingTrack | null;
  recruiting_window: RecruitingWindow | null;
  /** Free text when `Other` was chosen. Untrusted input; never render it back. */
  recruiting_track_other: string | null;
  recruiting_window_other: string | null;
  surface_variant: "spreadsheet";
  cta_location: CtaLocation | null;
  session_id: string;
  visitor_id: string;
  furthest_stage: string;
  submitted_at: string;
}

/** Records must support export and safe idempotent updates (WS5 Phase 4). */
const captured = new Map<string, Lead>();

type Sink = (lead: Lead) => void;

/**
 * Posts to `/api/lead`, which writes to Supabase with a server-side key.
 *
 * Deliberately not awaited by the caller and deliberately swallowing its own
 * failures: a visitor's progress through the funnel may never depend on the
 * database being reachable. `keepalive` lets the request survive if they close
 * the tab in the second after submitting.
 */
const httpSink: Sink = (lead) => {
  // Keyed by visitor so a second submission updates rather than duplicates.
  captured.set(lead.visitor_id, lead);
  if (process.env.NODE_ENV !== "production") {
    console.info("[lead]", lead);
  }

  void fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, test_iteration: TEST_ITERATION }),
    keepalive: true,
  }).catch(() => {
    /* Storage is best-effort. The funnel has already moved on. */
  });
};

let sink: Sink = httpSink;

/** Swap in the real destination once Supabase is provisioned. */
export function setLeadSink(next: Sink) {
  sink = next;
}

export function saveLead(
  input: Omit<Lead, "session_id" | "visitor_id" | "surface_variant" | "submitted_at">,
) {
  const { visitor_id, session_id } = getIdentifiers();
  sink({
    ...input,
    surface_variant: "spreadsheet",
    session_id,
    visitor_id,
    submitted_at: new Date().toISOString(),
  });
}

/** Everything captured this page load. Debug only. */
export function capturedLeads(): Lead[] {
  return [...captured.values()];
}
