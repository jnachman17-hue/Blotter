import type { MetadataRoute } from "next";

/**
 * Keep the site out of every index until launch.
 *
 * `app/layout.tsx` already sends `noindex, nofollow` on every page, and that is
 * the directive crawlers actually obey. This file exists because on Vercel's
 * Hobby plan a **production** deployment cannot be password- or
 * SSO-protected — that is a Pro feature — so the live URL is genuinely public,
 * not merely unlisted. Two independent signals are worth having when the only
 * other thing keeping the page unseen is that nobody knows the address.
 *
 * The page currently states as settled fact things that are true of no
 * implementation. Until those claims are fixed, being crawled is the specific
 * risk worth spending a file on.
 *
 * **Delete this at launch.** A site nobody may index is a site nobody can find.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
