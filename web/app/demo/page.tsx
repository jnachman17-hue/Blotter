import type { Metadata } from "next";
import Link from "next/link";

import { H1, LINK, PROSE, Shell } from "@/app/setup/shared";
import { CONTACT_EMAIL } from "@/lib/contact";

/**
 * The demo video, recorded by Jon on 18 September 2026 and hosted on the
 * Blotter YouTube channel (blotterib@gmail.com), unlisted. Change the id here
 * and nowhere else; the page, the link below the player and the share text all
 * read it.
 *
 * `youtube-nocookie.com` is YouTube's privacy-enhanced embed: it sets no
 * cookies until the visitor presses play. `rel=0` keeps the end screen to
 * this channel's videos rather than whatever YouTube thinks is related.
 */
const YOUTUBE_ID = "2EZ7fPpntpY";
const WATCH_URL = `https://youtu.be/${YOUTUBE_ID}`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`;

export const metadata: Metadata = {
  title: "Demo | Blotter",
  description:
    "Watch Blotter set up from scratch, in about seven minutes: copy the sheet, add your contacts, and see it fill in from real Gmail and Calendar activity.",
};

export default function DemoPage() {
  return (
    <Shell here="/demo" wide>
      <p className="text-small text-ink-muted">About seven minutes</p>
      <H1>Watch the demo</H1>

      <div className={`mt-5 space-y-4 ${PROSE}`}>
        <p>
          Blotter set up from nothing and run for real: copying the sheet, adding contacts,
          the permission screen, and every status filling in from a real inbox and a real
          calendar. The people in it are made up. The emails and calendar events are not.
        </p>
      </div>

      {/*
        16:9 at the page's full measure. The player is the page; nothing else on
        it should compete, so there is no sidebar and no second column.
      */}
      <div className="mt-8 overflow-hidden rounded-[12px] bg-black shadow-sm">
        <iframe
          className="aspect-video w-full"
          src={EMBED_URL}
          title="Blotter demo: an intelligent networking tracker that updates itself"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <p className="mt-3 text-small text-ink-muted">
        Not playing?{" "}
        <a href={WATCH_URL} className={LINK} target="_blank" rel="noopener noreferrer">
          Watch it on YouTube
        </a>
        .
      </p>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link
          href="/setup"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy-900 px-6 text-[0.95rem] font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-navy-800 active:scale-[0.98]"
        >
          Set up
        </Link>
        <p className="text-body text-ink-muted">
          Free. Takes about two minutes. Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={LINK}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </Shell>
  );
}
