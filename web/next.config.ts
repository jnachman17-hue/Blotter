import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
