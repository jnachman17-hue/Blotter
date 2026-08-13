/**
 * The candidate frames, and the timestamps they are taken at.
 *
 * Every `t` was chosen by rendering and looking, not by reading the beat table.
 * Two of them moved as a result:
 *
 * - Film A's volume beat ends at 4.4 by the table, but **4.35 lands inside the
 *   cross-fade** and draws both layers ghosted over each other. 3.90 is the last
 *   clean frame with both counters landed.
 * - Film C's silence beat runs to 9.56; 9.40 is inside the 1.60s hold, before
 *   the wipe-back starts at 9.60.
 *
 * This is the session-9 rule applied to a still: for film geometry, render and
 * look. A timestamp read off a table is a claim about the film, not the film.
 */

export interface FilmStill {
  id: string;
  title: string;
  note: string;
  src: string;
  /** Native canvas, for the aspect ratio only. */
  w: number;
  h: number;
  alt: string;
}

const FOUR_FIVE = { w: 1080, h: 1350 };

export const FILM_STILLS: FilmStill[] = [
  {
    id: "A1",
    title: "The cost — 628 emails, 68 coffee chats",
    note:
      "Film A's volume beat. A Gmail inbox and a January of coffee chats behind two counted figures, captioned One Summer Analyst 2027 recruiting cycle. No product anywhere in the frame. It shows the problem the post opens on, and it is the only candidate whose numbers are the same numbers the post text carries.",
    src: "/film/blotter-film-a-4x5.html?bare=1&t=3.9",
    ...FOUR_FIVE,
    alt: "628 recruiting emails and 68 coffee chats, over a Gmail inbox and a month of calendar entries",
  },
  {
    id: "A2",
    title: "The fix — the tracker maintaining itself",
    note:
      "Film A after the maintained zone has written itself. Five columns including Firm, so JPMorgan, Goldman Sachs, Moelis & Co, BlackRock and Carlyle are all legible. Carries its own headline and the Gmail and Calendar marks, and the ownership split along the bottom. The most self-contained frame in the set — it would work with no caption at all. Note it uses the YOU / BLOTTER labels that were cut from the live page hero.",
    src: "/film/blotter-film-a-4x5.html?bare=1&t=13.8",
    ...FOUR_FIVE,
    alt: "A recruiting tracker with five contacts at Wall Street firms, each row carrying a status and a next move",
  },
  {
    id: "A3",
    title: "The payoff — 21 outstanding actions",
    note:
      "Film A's scale beat. Everything you owe. One list, over the Outstanding view grouped 6 replies owed, 11 follow-ups due, 4 thank-you notes. The most concrete promise in the set and the one furthest from what the post text says, since the post opens on cost rather than on relief.",
    src: "/film/blotter-film-a-4x5.html?bare=1&t=19.2",
    ...FOUR_FIVE,
    alt: "An outstanding actions list grouped into replies owed, follow-ups due and thank-you notes",
  },
  {
    id: "C1",
    title: "Film C — the silence beat, biggest type",
    note:
      "The largest type in any film, and the clearest at feed size. Four columns: Firm is dropped, so no bank names. The cue reads No reply for 5 days and plugs straight into the row it changed, which is the one claim a still can make that a screenshot of a spreadsheet cannot.",
    src: "/film/blotter-film-c-4x5.html?bare=1&t=9.4",
    ...FOUR_FIVE,
    alt: "A tracker row updating itself after five days of no reply",
  },
  {
    id: "W1",
    title: "Web hero — most columns, wrong shape",
    note:
      "Included so the trade is visible rather than asserted. Eight columns, the full set, and roughly 3:1 — a thin strip in a feed, with small type and a long connector across empty space. Not recommended.",
    src: "/film/blotter-film-web-hero.html?bare=1&t=11.4",
    w: 1322,
    h: 433,
    alt: "The full recruiting tracker with eight columns, in a wide strip",
  },
];
