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
 * `capture_pageview: true` — and the reasoning is inline below, because it
 * reverses an earlier decision. `$pageview` is PostHog's own event and feeds
 * its own reports; `page_viewed` is ours and is the denominator of every
 * ratified metric. They are different names and never mix.
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

import { captureAttribution, getIdentifiers, setAnalyticsSink } from "@/lib/analytics";
import { isInternalVisitor, syncInternalFlag } from "@/lib/internal-visitor";

/**
 * Take the tracking parameters back out of the address bar.
 *
 * The short promotional links in `next.config.ts` redirect to
 * `/?utm_source=…&utm_campaign=…`, so a visitor who was shown a clean
 * `blotterib.com/mba` would otherwise land looking at a campaign string. This
 * puts it back: what they see, bookmark, or paste to a friend is
 * `blotterib.com/`.
 *
 * It also improves the data. A URL copied out of the address bar and shared
 * onward no longer carries the original post's campaign, so a friend-of-a-visitor
 * is not counted as another click on that post.
 *
 * **Only `utm_*` is removed.** `?blotter_internal=1` marks the browser and must
 * survive, and the review routes read their own parameters.
 *
 * **Only called when attribution is durably stored.** In a browser that refuses
 * storage, every event re-reads the URL, and stripping it would send the rest of
 * that visitor's funnel to `direct`.
 */
const TRACKING_PARAMS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_term",
  "utm_content",
];

function cleanTrackingParams() {
  const url = new URL(window.location.href);
  const present = TRACKING_PARAMS.filter((p) => url.searchParams.has(p));
  if (present.length === 0) return;
  for (const p of present) url.searchParams.delete(p);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export function AnalyticsProvider() {
  useEffect(() => {
    /* Before anything is captured, so the first event of a marked session is
       already marked. */
    syncInternalFlag();

    /* First touch is recorded on arrival rather than on the first event that
       happens to fire, so a returning visitor arriving through a tagged link is
       attributed even when every milestone is already suppressed. Runs before
       the PostHog key check, because attribution is ours and does not depend on
       a vendor being configured. */
    if (captureAttribution()) cleanTrackingParams();

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

      /*
        A person property, which is exactly what PostHog's "internal and test
        users" setting consumes. Set once and it sticks to this person forever,
        so the filter keeps working on the public domain — where a host-based
        rule stops helping, because Jon is on the same domain as everyone else.
      */
      if (isInternalVisitor()) {
        posthog.setPersonProperties({ is_internal: true });
        posthog.register({ is_internal: true });
      }

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
