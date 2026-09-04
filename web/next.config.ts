import type { NextConfig } from "next";

/* ------------------------------------------------------- promotional links */

/**
 * Short links for promotion. Added August 12, 2026.
 *
 * ## The problem these solve
 *
 * Attribution needs `?utm_source=` and `?utm_campaign=` on the end of the URL,
 * and Jon's objection to that is correct: `blotterib.com` is cleaner than
 * `blotterib.com/?utm_source=reddit&utm_campaign=reddit-mba-01`, and on Reddit
 * a visible tracking query reads as marketing on the one platform where that
 * costs the most.
 *
 * So the tracking is moved off the visible link and onto the server. **A post
 * shows a short path on our own domain; the redirect adds the parameters.**
 * The reader sees `blotterib.com/mba`, which looks like a page rather than a
 * campaign. `AnalyticsProvider` then strips the parameters from the address bar
 * once first touch is recorded, so what a visitor sees, bookmarks or copies to
 * a friend is a clean `blotterib.com/`.
 *
 * This is also more robust than putting the parameters in the post: a short
 * path cannot be stripped by a platform, mangled by an in-app browser, or
 * dropped when somebody retypes the link from memory.
 *
 * ## Adding one
 *
 * One line per post. `path` is what goes in the post, `campaign` is what shows
 * in PostHog. Never reuse a campaign value — a second post to the same place is
 * `-02`. The scheme is in `07-infrastructure-runbook.md`.
 *
 * **A path must not collide with a real route.** Taken: `/privacy`, `/contact`,
 * `/review/*`, `/api/*`, `/opengraph-image`, `/icon.svg`.
 *
 * `permanent: false` deliberately — a 307 can be re-pointed later; a 308 is
 * cached by browsers and is very hard to take back.
 */
const PROMO_LINKS: Array<{ path: string; source: string; campaign: string }> = [
  /* Platform defaults, for anything without its own path. */
  { path: "/r", source: "reddit", campaign: "reddit-01" },
  { path: "/x", source: "x", campaign: "x-01" },
  { path: "/li", source: "linkedin", campaign: "linkedin-01" },

  /*
    Reddit round one. Jon's provisional list, August 12, 2026 — one path per
    subreddit, so six simultaneous posts stay separable afterwards. Without
    this they would all read as `reddit` and the only question worth asking
    of six posts, which one worked, could not be answered.

    Subreddit names are Jon's and unverified; a path costs nothing if its
    subreddit turns out not to exist or not to accept the post.
  */
  { path: "/mba", source: "reddit", campaign: "reddit-mba-01" },
  { path: "/consulting", source: "reddit", campaign: "reddit-consultingcareers-01" },
  { path: "/hub", source: "reddit", campaign: "reddit-financestudentshub-01" },
  { path: "/fc", source: "reddit", campaign: "reddit-financialcareers-01" },
  { path: "/analyst", source: "reddit", campaign: "reddit-financialanalyst-01" },
  { path: "/students", source: "reddit", campaign: "reddit-financestudents-01" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return PROMO_LINKS.map(({ path, source, campaign }) => ({
      source: path,
      destination: `/?utm_source=${source}&utm_campaign=${campaign}`,
      permanent: false,
    }));
  },

  /*
    Hosts allowed to load dev-server resources.

    Next blocks cross-origin requests to `/_next/*` in development by default.
    That means opening the dev server from a phone on the LAN — the only way to
    review this build on a real device — serves the HTML but blocks every
    client chunk, so the page renders and never hydrates. It looks like a
    working page with all the interactive parts dead: on August 10, 2026 that
    showed as the mobile sticky CTA never appearing on Jon's iPhone while
    working fine on `localhost`, because the bar is server-rendered in its
    hidden state and only the client makes it visible.

    Development only — Next ignores this in a production build, and these are
    private addresses.

    **The address changes.** It was `192.168.1.64` on the morning of August 10,
    2026 and `192.168.68.63` by the afternoon: a new DHCP lease is enough, and
    the failure is silent and confusing — the page loads, nothing works, because
    the HTML is served and every client chunk is refused. The wildcards cover
    the two private ranges a home network hands out, so a new lease does not
    break the review link again. The literals stay as a fallback in case a Next
    version drops pattern support.
  */
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "192.168.68.63",
    "192.168.1.64",
  ],

  /*
    SECURITY HEADERS.

    Production returned none of these. Vercel supplies
    `strict-transport-security` and the http -> https redirect on its own, and
    those are left alone deliberately: adding `includeSubDomains` or `preload`
    to HSTS is a durable, hard-to-reverse commitment, and this is a demand test
    that may not keep the domain.

    **There is deliberately no Content-Security-Policy here.** A real one is the
    single most valuable header this site could add, and it is also the one that
    breaks a page silently if it is wrong: `posthog-js` loads further script from
    PostHog's asset host at runtime, Next injects inline bootstrap script, and
    the three films are inline-script documents in same-origin iframes. Writing
    that policy needs a pass with the browser console open, verifying each of
    those still works. It is worth doing and it is not a change to make blind.

    The four below carry no such risk.

    `X-Frame-Options: SAMEORIGIN` — the page was framable by any origin. The
    films are framed by our own pages, which SAMEORIGIN still permits; nothing
    third-party embeds this site.

    `X-Content-Type-Options: nosniff` — matters here more than on a typical app,
    because `public/` serves standalone HTML documents.

    `Referrer-Policy: strict-origin-when-cross-origin` — the browser default in
    current versions, stated explicitly so it does not depend on the visitor's
    browser. It keeps the path out of outbound referrers.

    `Permissions-Policy` — camera, microphone and geolocation are never used by
    anything on this page, and `browsing-topics` opts out of an advertising API
    that is on by default. Payment is deliberately NOT disabled: the price
    screen is copy today, but disabling it would quietly block a future
    Apple Pay integration for a reason nobody would remember.
  */
  async headers() {
    return [
      {
        /*
         * `.gs` is not a type Vercel knows, so it served the courier as
         * application/octet-stream and every browser downloaded it. With
         * `nosniff` set below, the browser cannot second-guess that either.
         * A student told to update then had a file in Downloads and no
         * instructions, which is exactly where Jon landed on 4 September 2026.
         */
        source: "/Code.gs",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
