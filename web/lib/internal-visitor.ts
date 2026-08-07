/**
 * Marks this browser as internal, permanently.
 *
 * Jon's problem, and it is a real one: filtering by `localhost` stops working
 * the moment the site is on a public domain, and he will be clicking through
 * his own funnel on production more than anyone. Without a way to say "this is
 * me", his own traffic inflates `page_viewed` — the denominator of every rate
 * in WS3's metric hierarchy — and his own funnel runs land in the leads table
 * as if they were demand.
 *
 * How it works: visit any page with `?blotter_internal=1` once, on each device
 * and browser he uses. The flag is written to `localStorage` and survives
 * forever. `?blotter_internal=0` clears it.
 *
 * **Marked, not dropped.** Internal traffic is still captured and still stored,
 * carrying `is_internal: true`. Dropping it would mean he could never confirm
 * that production analytics or lead capture actually work without polluting the
 * data he is trying to protect. Marking gives both: everything is verifiable,
 * and every query can exclude it.
 *
 * The corollary is that **`is_internal` must be excluded when results are
 * read.** In PostHog it becomes a person property, which is what its
 * "internal and test users" filter is built to consume. In Supabase it is a
 * column, so exports and counts have to filter on it.
 */

const KEY = "blotter:internal";
const PARAM = "blotter_internal";

/**
 * Reads the URL flag and persists it. Call once on load, before anything is
 * captured, so the very first event of a marked session is already marked.
 */
export function syncInternalFlag(): void {
  if (typeof window === "undefined") return;
  try {
    const value = new URLSearchParams(window.location.search).get(PARAM);
    if (value === "1") window.localStorage.setItem(KEY, "1");
    else if (value === "0") window.localStorage.removeItem(KEY);
  } catch {
    /* Private browsing with storage denied. Nothing to mark. */
  }
}

export function isInternalVisitor(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
