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
};

export default nextConfig;
