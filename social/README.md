# Blotter social launch films

Self-contained HTML. Open any file with `file://`. No build step, no framework,
no server. Fonts are inlined, so they work offline and the wordmark cannot fall
back to Arial mid-recording.

Nothing here touches `web/`. Nothing here is committed by this session.

| File | State |
|---|---|
| `blotter-film-a-4x5.html` | **Current.** Film A, the launch post. 1080 x 1350, 21.5s, seamless loop. |
| `blotter-launch-4x5.html` | Superseded first cut, 12s. Kept only for comparison. |
| `inline-fonts.sh` | Embeds Schibsted Grotesk, Geist, Geist Mono and Roboto as base64. |

| Key | |
|---|---|
| `space` | play / pause |
| `left` `right` | step one frame at 30fps |
| `s` | cycle the stall-beat copy, four options, jumps you to the beat |
| `o` | cycle the scale-beat subhead, three options |
| `e` | cycle the end-card copy, three options, jumps you to the card |
| `r` | restart |
| `c` | hide the controls, for recording |
| `f` | true 1080px size instead of fit-to-window |
| `1` | show the 1:1 safe band |

`?t=7.2` opens paused on one frame. `window.renderAt(seconds)` draws any frame
deterministically, which is what a capture script would drive.

## The planned set

Three films, three jobs. One cannot do all of them.

| | Job | Length | State |
|---|---|---|---|
| **A** | The launch post. Hello world, day one. | 21.5s | **Built** |
| **B** | The explainer. Shows the connection and the mechanism properly. | 25 to 35s | Next |
| **C** | The silence cut. One idea, no setup, for replies and Reddit. | 6 to 8s | After B |

## Film A, the twenty-one and a half seconds

| | Beat | Hold | What happens |
|---|---|---|---|
| 0.0 to 4.4 | **Volume** | | One recruiting cycle arriving. The first few subject lines are readable, then they are not. Both counters run to 628 and 68, each beside its own product mark, and land on the same frame. |
| 4.4 to 7.5 | **You add the contacts** | | The sheet arrives with headers and nothing else. The left zone is greyed and captioned, and you type the five contacts in: each name wipes on left to right, the Sheets selection box rides down the rows, and the grey recedes one row at a time. The manual underline draws as the last name lands. |
| 7.5 to 10.3 | **The stall** | 2.0s | Names filled, state empty. The tracker is exactly as current as it was an hour ago. |
| 10.2 to 14.3 | **Blotter keeps them current** | 3.15s | A navy rule draws left to right along the Gmail and Calendar line. The right zone then mirrors the left exactly: cream washes in with its own caption, then recedes as each row writes itself. |
| 14.3 to 17.2 | **Silence** | 1.6s | Everything dims but Daniel Kim, then nothing moves at all. In a film that opened on a torrent, the stillness is the argument. |
| 17.1 to 20.0 | **Scale** | 1.4s | Outstanding Actions. 21, counting up, 6 / 11 / 4. |
| 20.0 to 21.5 | **Mark** | | Navy, Ledger B, wordmark, closing line. Wipes off onto the opening frame. |

### The rule on the sources line

Jon, third pass: the Gmail and Calendar line carries the mechanism claim and was
reading as a footnote under the headline. It now holds for over three seconds
instead of one, and carries a rule that draws along it.

Two rejected attempts before the current one, both instructive:

1. **A cream marker sweeping in behind the text.** Read as annotation rather
   than emphasis.
2. **A pill outline around the line.** Read as a control, like something you
   could click, and it led the eye nowhere: an outline arrives everywhere at
   once, whereas a rule *travels*, and travel is what pulls a reader across a
   line of type. It was also visibly clipping the end of "Calendar." — see the
   note below.

The current treatment is a navy rule that draws left to right across 0.95s, from
the Gmail mark to the full stop.

- **Navy, not the Blotter yellow.** `globals.css` assigns the navy accent to
  "headline emphasis", which is exactly what this is. The yellow is semantic on
  this page and means "Blotter maintains this". This line is about the activity
  Blotter *reads*, not a field it maintains, so marking it yellow would overload
  the one colour that carries meaning.
- **It spans with `left:0; right:0`, not a measured width.** The pill was
  measured in JS and cached on first paint, which left it a few pixels short
  once the webfont resolved after that frame, clipping the end of the word it
  was supposed to be emphasising. Geometry the browser owns cannot go stale.
  Verified: rule width and row width are both 656px, and the rule's right edge
  lands exactly on the text's.

### The typing beat

Jon's idea, August 5, 2026, and it is a better device than the label alone. Each
zone starts as an unfilled area carrying a caption, and the caption recedes as
the zone fills. The left is filled by the user. The right fills itself. The two
gestures mirror, which makes the ownership split **happen** rather than get
asserted by a word underneath the sheet.

It is not additive. It took over the slot where the sheet previously just sat
there being static, and it gives the stall beat a reason to exist: you did the
work, and the state columns are still empty.

Three details worth keeping if this gets rebuilt: names are revealed left to
right rather than faded, because a fade reads as an import and a wipe reads as
typing; the Sheets selection box rides the active row, which is what a real user
sees while doing this; and the two ratified underlines now draw as the
**conclusion** of each zone's gesture rather than as duplicate labels.

## What changed from the first cut

Jon's direction, August 5, 2026.

**1. The framing was wrong and is fixed.** The first cut opened on "Nothing in
your inbox will tell you which one." That is false: you can scroll Gmail and
reconstruct who has gone quiet. The honest argument is the one
`01-project-and-product.md` already makes, that a spreadsheet "cannot reliably
hold live state, because state changes every time an email arrives and nobody
updates a spreadsheet every time an email arrives." The problem is not that you
cannot know. It is that you cannot **keep** knowing. The film now opens on
volume rather than on a riddle.

**2. Volume is shown, not asserted.** An inbox that fills slowly enough to read,
then faster, then far too fast, with the counter running to the ratified
figures. Four and a half seconds of it before the sheet appears.

**3. The silence beat is re-earned.** It no longer claims Blotter sees what you
cannot. It says *Blotter is the only one still counting*, which is true and
which the volume opening has by then paid for.

**4. Twenty-one and a half seconds, not twelve.** Seventeen first, the typing
beat took it to 19.5, then three beats that were too quick to read were given
room: the stall now holds 2.0s, the sources line 3.15s, and the scale beat 1.4s.

**5. You add the contacts, shown.** See the typing beat above.

## Copy decisions: the stall line

Jon, August 5, 2026: the first version blamed the reader. "A manual tracker
changes only when you remember to update it" is `02-SECTION-2` section 5
verbatim, and it is true, but it lands as *you forgot*. Everyone serious about
recruiting does update their tracker. It goes stale anyway, because the volume
outruns the upkeep rather than because the effort was missing. Aiming that at
the diligent student, who is the buyer, is both inaccurate and alienating.

Second pass, Jon: the bold first line is the only thing a skimmer reads, so it
has to carry the message alone. "You keep it updated." read by itself says the
opposite of the point. Every option now fails safe, and the original ratified
sentence is dropped since it was rejected twice.

Press `s` to cycle; it jumps you to the beat.

**Chosen by Jon: `try`.**

| id | Line |
|---|---|
| `try` **(chosen)** | You try to keep it updated. / It keeps going stale. |
| `outrun` | You cannot update it / fast enough. |
| `snapshot` | A tracker is a snapshot. / Recruiting is not. |
| `sunday` | You updated it Sunday. / It was wrong by Tuesday. |

The first three share a second line that is also `02-SECTION-2` section 5
verbatim and already makes Jon's exact point, with no fault assigned:

> At this volume, a manual tracker inevitably falls behind reality.

My pick is `try`. It concedes the effort in the first five words, which is the
note, and the ratified second line supplies the reason. `snapshot` is the
sharpest phrase but colder. `sunday` is the most human and the only one that
invents a detail, so it is the only one carrying any risk. Once you choose,
delete the rest.

## Copy decisions: the scale subhead

Jon asked whether to keep the enumeration or go to something like "nothing slips
through the cracks again."

My read: `cracks` is the most emotional and the only one I would not ship.
"Nothing slips through the cracks" and "never miss a deadline again" are promises
about an **outcome that depends on the reader acting**. Blotter "tracks,
computes, and prompts. Nothing else" (`01-project-and-product.md`). It can show
you the thank-you note you owe; it cannot make you send it. An absolute
never-miss guarantee is the one kind of claim that cannot be walked back, and it
is exactly the line a launch post gets quote-tweeted for.

Worth noting that "slipping through the cracks" IS ratified vocabulary, but
`02-SECTION-2` section 5 uses it to describe the **problem**. Inverting it into a
guarantee is a different claim, not the same words reused.

Press `o` to cycle.

**Chosen by Jon: `cracks`.** My objection above was put to him and he ruled for
it anyway. Recorded rather than argued again.

| id | Line |
|---|---|
| `cracks` **(chosen)** | Nothing slips through the cracks. |
| `owe` | One current view of every action you owe. |
| `enumerate` | Replies, follow-ups and thank-you notes, all current. |

One practical consequence to carry forward: this is now the only line in the
film that promises an outcome, so it is the line to put in front of the claim
gate `WS5-SPEC.md` already requires before public traffic.

## Copy decisions: the end card

Jon asked whether the hero headline or the category descriptor belongs on the
last frame. My answer is neither, and it is worth saying why.

The hero line is the **problem** statement: on the page it opens the argument.
Closing a film with it, after nineteen seconds of showing the solution, inverts
it, and the last thing left on screen is "your tracker does not move." The
descriptor is the category, which a cold viewer does need, but the film has
already spent nineteen seconds showing what this is, and the full eyebrow is far
too long for a final frame.

Press `e` to cycle.

**Chosen by Jon: `hero`.**

| id | Line |
|---|---|
| `hero` **(chosen)** | Your networking keeps moving. / Your tracker does not. |
| `closing` | Your recruiting tracker, / always current. |
| `category` | The smart recruiting tracker / for investment banking. |

`closing` is the ratified Section 7 closing line, Confirmed in
`04-decision-log.md`. It is short, it says what the product is and does in five
words, and it **resolves** rather than restating the problem, which is the one
job a last frame has. `category` is the eyebrow trimmed to fit, which is itself
a change to ratified copy, so it needs your ruling if you want it.

## Jon's override, August 5, 2026

**Recorded here because this directory is the only place this session may
write. It needs to land in `04-decision-log.md` by whoever owns that file.**

> OAuth and connection UI may appear in a marketing video, and a scanning
> depiction limited to recruiting mail from tracked contacts is acceptable.
> Ruled by Jon, who is authority level 1 under `WS5-SPEC.md` "Source hierarchy".

This overrides, for video only:

- `04-decision-log.md` rejected item, "Mandatory early Gmail OAuth or simulated
  Google authentication"
- `WS3-SPEC.md`, "Actual or simulated OAuth is excluded"
- `03-SECTION-3` section 17, "OAuth or account-connection UI" and "full Gmail or
  Calendar screens"
- `03-page-spec.md`, the auth-adjacent screen rule

His reasoning: the video describes how the product works rather than offering a
live product, and the two-ring model is exactly how the privacy story will
work and is documented in full in the privacy section. The landing-page bans are
unaffected and still govern every page surface.

**Two guardrails I am holding regardless, neither of which fights the ruling:**

1. The consent screen shows scopes and Blotter's name and **never a credential
   field**. No email input, no password input, at any size, in any frame.
2. The scanning beat shows only recruiting mail from tracked contacts. Nothing
   depicts a sweep across an inbox, because
   `01-project-and-product.md` calls that claim "wrong and damaging" and that is
   an accuracy point rather than a presentation one.

The connection beat is designed for **Film B**, where it has room to explain
itself. Film A stays tight. Say the word and it goes into A as well.

## Where the values came from

Load-bearing, all copied from the repository:

| Source | What it gave |
|---|---|
| `web/lib/brand.ts` | navy `#12233d`, reversed white, wordmark weight and tracking, lockup ratios |
| `web/components/brand/blotter-mark.tsx` | the Ledger B path, verbatim |
| `web/app/globals.css` | every colour token and the page field gradient |
| `web/lib/sheet-data.ts` | the five contacts and their January 16 state |
| `web/components/sheet/*.tsx` | chrome, grid and status-chip geometry |
| `web/components/google-marks.tsx` | the Gmail and Calendar marks, verbatim |
| `02-SECTION-2` section 5 | 628 and 68, and the stall beat's second line, "At this volume, a manual tracker inevitably falls behind reality." |
| `04-SECTION-4` section 7 | 21 outstanding actions, 6 / 11 / 4, the exact rows and reasons |
| `07-SECTION-7` / `04-decision-log.md` | the end card's closing line, "Your recruiting tracker, always current." |
| `WS4-SPEC.md` "Confirmed hero" | the `hero` end-card option |

Texture, and clearly texture: the sender names and subject lines in the torrent.
They exist to become unreadable. Generic recruiting subjects, no firm attached,
no offer or rejection language, so nothing legible in the blur can be read as a
claim. The five canonical contacts appear among the senders. No bank logo
appears anywhere.

## Deviations from the page specs

Crop decisions for a phone-sized video. None touches a landing-page surface.

1. **Title, Last contact and Call are dropped from the tracker.** At 4:5 a
   1080px canvas is roughly 400px on a phone, and the hero's eight columns put
   the sheet type under 6px. Five columns hold 24px. `01-HERO` section 6 forbids
   *adding* fields and section 16 defers responsive adaptation; nothing was
   added and the order among the survivors is unchanged.
2. **The selected cell is C2, not D2.** With Title gone, Status is column C. The
   formula bar still reads `Replied` and still points at Sarah Chen's status.
3. **The maintained columns are absent in the stall beat, then arrive.** Not a
   stale-tracker or before-and-after treatment, which `01-HERO` section 12
   rejects. The opening sheet is clean and correct: it is the tracker you were
   given. What arrives is the layer, not a repair.
4. **The Outstanding view scales to about 0.91 as it arrives.** It is taller
   than the tracker, so the camera gives ground. That reads as a pull-back.
5. **Summer Analyst 2027, not 2028.** Instructed by Jon, August 5, 2026.
   `02-SECTION-2` section 5's exact qualification says 2028 and
   `01-project-and-product.md` records the test subject as the SA '28 class, so
   this diverges from ratified copy in two files and needs reconciling by
   whoever owns them. The `SA 2027 application` subject line in the torrent was
   changed to match: a subject naming a different class than the caption would
   contradict it inside the same frame.

## Claim safety

No price, no availability, no beta, no launch date, no cohort language. Nothing
claims Blotter writes outreach or generates content: every `Next move` on screen
is a prompt to the user and no drafted message appears. "Relevant" stays in the
Gmail line. No em dashes in spoken copy; Alex Morgan's `Next move` cell keeps the
one ratified exception.

## Verification run on Film A

- All 646 frames rendered, no runtime errors.
- Loop seam frame-identical: every animated property at `t = 21.499` matches
  `t = 0`, including the wash positions, captions and selection box.
- Every visible element stays inside the 1:1 safe band, `y 150` to `1212`
  against a band of `135` to `1215`, across the whole loop. The square is a
  clean centre crop.
- No text clips in any cell at any beat.
- All ten copy variants, four stall, three scale subhead and three end card,
  render at their intended line counts and inside their slots.

## Exporting an MP4

1. Open it, `c` to hide the controls, `f` for true 1080 x 1350.
2. Screen record for about 45 seconds so you capture two clean loops.
3. Trim to exactly 21.50 seconds. The seam is frame-identical, so any cut point
   works as long as the duration is exact.

For a frame-accurate render instead of a capture, `window.renderAt(seconds)` is
deterministic over `t = 0` to `21.467` at 30fps. Say the word and I will write
the capture script.

## Open for Jon

1. **Does the connection beat go into Film A too**, or stay in B as designed?
2. **The eleven.** `04-SECTION-4` section 7 gives `Follow-ups due` as 11 with
   Daniel's reason as `No reply for 5 days`, but never says all eleven are
   silence. The film shows the three counts as ratified and leaves that
   inference out. Putting it in is a new claim and needs your ruling.
3. **The end card** carries no URL, because `blotterib.com` is not routed and
   the page is private under the WS5 deployment rule. Add it only if it will
   resolve when you post.
4. **1:1** is a centre crop, which is why the whole composition sits inside the
   safe band and the 4:5's extra height is margin. If you would rather the 4:5
   filled its frame, I will compose the square separately.
