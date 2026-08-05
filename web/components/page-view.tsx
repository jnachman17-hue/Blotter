"use client";

/**
 * Fires the canonical `page_viewed` milestone once the landing page mounts.
 *
 * Authority: WS3-SPEC / WS5-SPEC Phase 5. It is the first of the nine events.
 * `track` already suppresses to at most once per visitor per iteration, so
 * refresh and back navigation do not inflate the denominator.
 *
 * No vendor is connected. This routes through the provider-independent sink,
 * which is swapped once an analytics provider is approved.
 */

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function PageView() {
  useEffect(() => {
    track("page_viewed");
  }, []);

  return null;
}
