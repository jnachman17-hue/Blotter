"use client";

/**
 * Connects PostHog to the provider-independent adapter.
 *
 * The adapter in `lib/analytics.ts` is unchanged and stays the contract: the
 * nine canonical event names, the property set, and the per-visitor milestone
 * suppression are all decided there. This file only supplies a sink. Swapping
 * vendors means editing this file and nothing else.
 *
 * If `NEXT_PUBLIC_POSTHOG_KEY` is absent, nothing initialises and the default
 * console sink stays in place. That is the normal state before Jon provisions
 * the project, and it is also what keeps local development out of production
 * data.
 *
 * ## The four settings that matter, and why
 *
 * `autocapture: false` — WS3 defines an exact nine-event contract and the whole
 * measurement design rests on it. Autocapture would bury those nine in
 * thousands of incidental clicks, and it reads DOM text, which is how form
 * content ends up somewhere it was never meant to be.
 *
 * `disable_session_recording: true` — **the important one.** The funnel has an
 * email field. A session recording captures the screen, and the privacy policy
 * we published says email is used for the account and the cohort list. Nothing
 * on this page justifies recording a stranger typing their address.
 *
 * `capture_pageview: false` — `page_viewed` is one of the canonical nine and is
 * fired explicitly by `components/page-view.tsx`. Letting PostHog also fire its
 * own would double-count the denominator of every ratio in WS3's metric
 * hierarchy.
 *
 * `person_profiles: "identified_only"` with an explicit `identify` — WS3's
 * rates are all "unique eligible visitors", so PostHog's notion of a person has
 * to match ours. We hand it our own `visitor_id`, which is a random local
 * identifier and carries no personal data.
 *
 * The host is pinned to US Cloud. `/privacy` states that information is stored
 * and processed in the United States, so an EU project would make a published
 * claim false.
 */

import { useEffect } from "react";

import { getIdentifiers, setAnalyticsSink } from "@/lib/analytics";

export function AnalyticsProvider() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    let cancelled = false;

    void import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;

      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        autocapture: false,
        /*
          `$pageview` and `$pageleave` are ON, reversing an earlier call.

          They were switched off on the reasoning that PostHog firing its own
          pageview would double-count the denominator of WS3's ratios. That was
          wrong. Our denominator is `page_viewed`, a distinct event name that we
          fire ourselves and suppress per visitor; `$pageview` cannot inflate it
          because nothing reads `$pageview`.

          What it does do is make PostHog's built-in Web Analytics work —
          traffic, referrers, UTM sources, bounce. With them off, every prebuilt
          dashboard reads zero no matter how much traffic arrives, which is
          exactly what Jon found on August 6, 2026. For a paid-traffic demand
          test, where the traffic came from is not incidental.

          The division of labour is now explicit:
            `page_viewed`  ours, one per visitor, the denominator of every
                           ratified metric. Never read `$pageview` for these.
            `$pageview`    PostHog's, one per page load, feeds its own reports.
        */
        capture_pageview: true,
        capture_pageleave: true,
        /*
          Web vitals stays off. It is autocapture by another name and no
          decision in round one turns on page speed. Turn it on if that changes.
        */
        capture_performance: false,
        disable_session_recording: true,
        person_profiles: "identified_only",
        respect_dnt: true,
      });

      /* PostHog's own toolbar and debugger look for `window.posthog`, and the
         module import does not set it. Also the only way to inspect what was
         sent during a manual verification run (WS5 Phase 8). */
      (window as unknown as { posthog: unknown }).posthog = posthog;

      /* Our visitor id becomes PostHog's person, so its unique-user counts and
         WS3's "unique eligible visitors" mean the same thing. It is a random
         local identifier and carries nothing personal. */
      posthog.identify(getIdentifiers().visitor_id);

      /* Setting the sink also flushes anything fired while the vendor loaded —
         `page_viewed` almost always lands before this point. */
      setAnalyticsSink({
        capture(event, properties) {
          posthog.capture(event, properties);
        },
        identify(visitorId) {
          posthog.identify(visitorId);
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
