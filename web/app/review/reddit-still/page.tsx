/**
 * Candidate stills for the Reddit post.
 *
 * Session 10, August 12, 2026. Jon: *"Let me know what frame candidates you are
 * thinking from film C. Or if we make a new one specifically for this that can
 * capture more and show it better."*
 *
 * ## Why these are film frames rather than a new asset
 *
 * The films render any frame deterministically — `?bare=1&t=` draws that moment
 * and stops — so a still costs nothing to produce and inherits type sizes,
 * column arithmetic and clipping checks that were verified by looking in
 * sessions 8 and 9. A purpose-built still would repeat all of it.
 *
 * **Two candidates were rejected before this page, by looking:**
 *
 * - **The web hero film** carries the most columns, eight, and is the wrong
 *   shape at 1322 x 432.5 — roughly 3:1. In a Reddit feed that renders as a thin
 *   strip, its type is small against the frame, and at the silence beat the cue
 *   sits far right with a long connector across empty space.
 * - **Film C** is the right shape and the biggest type, but fits **four
 *   columns** — `Firm` is one of the two it drops. On a finance subreddit the
 *   bank names are the strongest thing in the frame, so dropping them to gain
 *   type size is the wrong trade here. It stays as the fallback if legibility
 *   beats content on a small screen, which is Jon's call and is why it is on
 *   this page.
 *
 * ## What is actually being chosen
 *
 * Not a picture — an argument. The three Film A frames each open a different
 * post:
 *
 *   the cost   -> 628 emails and 68 coffee chats. The problem, no product.
 *   the fix    -> the tracker maintaining itself, five columns, bank names.
 *   the payoff -> 21 outstanding actions in one list.
 *
 * ## Widths
 *
 * Reddit's post column is about 640px on desktop and the full screen width on a
 * phone, and the feed thumbnail is far smaller than either. So each candidate
 * renders at a **feed width of 320** beside a **post width of 560**: the first
 * decides whether anyone stops, the second whether they read.
 */

import { FILM_STILLS, type FilmStill } from "./stills";

export const metadata = { robots: { index: false, follow: false } };

const FEED_W = 320;
const POST_W = 560;

function Frame({ still, width }: { still: FilmStill; width: number }) {
  return (
    <div style={{ width }}>
      <iframe
        src={still.src}
        title={still.alt}
        scrolling="no"
        loading="lazy"
        className="w-full rounded-lg border border-black/10 bg-white"
        style={{ aspectRatio: `${still.w} / ${still.h}` }}
      />
    </div>
  );
}

export default function RedditStillReviewPage() {
  return (
    <main className="min-h-screen bg-neutral-100 px-5 py-10 text-neutral-900">
      <div className="mx-auto max-w-[1000px]">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reddit still, five candidates
        </h1>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-neutral-600">
          Left is roughly what a phone shows in the feed, at {FEED_W}px. Right is
          roughly the post column at {POST_W}px. The feed size decides whether
          anyone stops; the post size decides whether they read.
        </p>

        {FILM_STILLS.map((still) => (
          <section key={still.id} className="mt-12 border-t border-black/10 pt-8">
            <h2 className="text-lg font-medium">
              <span className="mr-2 font-mono text-sm text-neutral-500">
                {still.id}
              </span>
              {still.title}
            </h2>
            <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-neutral-600">
              {still.note}
            </p>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              {still.src}
            </p>

            <div className="mt-5 flex flex-wrap items-start gap-8">
              <div>
                <p className="mb-2 font-mono text-xs text-neutral-500">
                  feed · {FEED_W}px
                </p>
                <Frame still={still} width={FEED_W} />
              </div>
              <div>
                <p className="mb-2 font-mono text-xs text-neutral-500">
                  post · {POST_W}px
                </p>
                <Frame still={still} width={POST_W} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
