import "server-only";

/**
 * Shared entry checks for the two write routes.
 *
 * Neither route had any: both called `request.json()` on whatever arrived, from
 * wherever it arrived, at whatever size it arrived. That is three separate
 * problems and this file closes two of them. It deliberately does not attempt
 * the third — see the note on rate limiting at the bottom.
 *
 * This module validates and returns a reason. It does not build a response,
 * because the two routes answer failure differently on purpose: `/api/lead`
 * never blocks the funnel and reports every failure as a 200 with
 * `stored: false`, while `/api/contact` fails loudly so a reader is never told
 * their message sent when it did not. A shared helper that also chose the
 * status code would have to break one of those rules.
 *
 * ## Why the content type is checked
 *
 * A cross-origin `fetch` carrying `Content-Type: application/json` is not a
 * CORS "simple request", so the browser sends a preflight first, and the
 * preflight fails because neither route returns any
 * `Access-Control-Allow-Origin`. Send the identical JSON body as
 * `Content-Type: text/plain` and it becomes a simple request: **no preflight,
 * and the write executes.** The attacker cannot read the response, which is
 * why this is not a data-disclosure bug, but they can make any visitor to any
 * page on the internet write rows into these tables.
 *
 * Requiring `application/json` closes that path, and costs the real client
 * nothing: `lib/lead-store.ts` and `app/contact/contact-form.tsx` both already
 * send exactly that header.
 *
 * ## Why there is deliberately no `Origin` check
 *
 * An earlier draft of this file also compared `Origin` against the request's
 * `Host` and rejected a mismatch. It was removed on purpose.
 *
 * It buys nothing. Once `application/json` is required, a cross-origin browser
 * request is preflighted, and the preflight already fails — so the browser
 * never sends the POST at all. An `Origin` check would only ever fire on a
 * non-browser caller, which sets that header to whatever it likes.
 *
 * And it can cost something real. Whether the function sees the same host the
 * browser used depends on how the platform forwards the request, and if it ever
 * does not, every genuine lead POST starts failing — silently, because
 * `/api/lead` reports failure as a 200. Trading a guaranteed risk to the funnel
 * for a redundant check against an attacker who is already blocked is the wrong
 * side of that bargain.
 *
 * ## What this does NOT do
 *
 * **There is still no rate limiting.** It does not belong here: an in-process
 * counter is close to worthless on serverless, where each invocation may be a
 * fresh instance, and it would read as protection while providing almost none.
 * The real fix is a platform rule (Vercel WAF) or a shared store, and it is the
 * single most important outstanding item on these two routes.
 */

/** Vercel's own limit is 4.5MB; nothing legitimate here approaches 64KB. */
const MAX_BODY_BYTES = 64 * 1024;

export type GuardFailure = "unsupported_media_type" | "payload_too_large";

/**
 * Returns a reason to reject, or `null` when the request may be parsed.
 *
 * Callers must still treat the parsed body as hostile; this only decides
 * whether it is worth reading at all.
 */
export function guardWrite(request: Request): GuardFailure | null {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return "unsupported_media_type";
  }

  /*
    Declared length only. A body without `Content-Length` (chunked) is not
    rejected here — the platform's own ceiling still applies, and the field
    truncation in each route bounds what can actually be stored.
  */
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return "payload_too_large";
  }

  return null;
}
