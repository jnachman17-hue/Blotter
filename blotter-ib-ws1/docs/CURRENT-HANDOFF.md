# Blotter IB - Current Handoff

Date: August 12, 2026, end of session 9
Status: **Session 9 is merged and live on `blotterib.com`.** Sessions 1 to 9 done.

The site is live, public, **indexed**, carrying real traffic, and has **five real
leads**. `main` is the only branch that matters and everything is merged.

**The next session is promotion.** Everything built so far exists to be posted.

---

## 0. Act on these before anything else

**A checklist, not background.** Work out whether any item is due and say so in
the first reply.

### Due now

- **Nothing is blocking.** No parallel chat is running, no migration is pending,
  no verification is outstanding. This is the first handoff in five sessions
  with an empty due list.
- **Promotion is the work.** X, LinkedIn and Reddit posts: the copy, the asset
  in each, and which audience each targets. Nothing is drafted. See §4.

### Done, do not repeat, do not ask about

- The security audit is **complete**, its fixes merged and live. `13` has the
  findings. Three things were left open on purpose and are recorded there: no
  CSP, films not isolated, `is_internal` set client-side. **Do not "helpfully"
  undo those.**
- Migrations `005` and `006` are **applied**. Verified.
- Indexing is on, `app/robots.ts` is deleted, `/privacy` is finished.
- The connection provider stays ambiguous. Closed. Do not relitigate.
- Vercel preview protection is off; every branch gets a public URL.
- **The Section 6 claim gates are closed** on Jon's August 12 ruling. They
  reopen on provider selection, not on traffic. `04` has the reasoning.
- **`+N more` is fine.** Ruled August 12. The Outstanding view stays as it is on
  all three surfaces.
- The em dash in the browser-tab title was fixed on August 11. Eight handoffs
  carried it after it was done; it is gone.

### Standing, and it governs every number

**Never read `leads`; read `real_leads`. Never read `contact_messages`; read
`real_contact_messages`.** Never report a PostHog figure without the three
filters in `07-infrastructure-runbook.md`.

**`real_leads` is 5** as of August 12, 2026. All five stopped at
`furthest_stage = email`. Four of five clicked `hero`, one `header`.

**Zero checkout starts, ever.** And zero waitlist joins, because the waitlist
shipped the same day.

---

## 1. Read these, in this order

1. `CLAUDE.md` — the working agreement. **Specs govern; skills serve them;
   surface conflicts rather than splitting them.**
2. **This file.**
3. `04-decision-log.md` — **the August 12 entries.** Session 9's reasoning.
4. `06-assumptions-and-open-questions.md` — everything unsettled, each with a
   revisit trigger. **The live work list.**
5. `07-infrastructure-runbook.md` — before touching data, and before assuming
   anything about deployment, indexing, the stage order or the share card.
6. `02-strategy-and-test.md` — **read this before drafting any promotion copy.**
   It is the test design the posts have to serve.

**Closed, read only for history:** `08`, `09`, `10`, `11`, `12`, `13`, `14`.

---

## 2. The documentation system. Follow it or the next session loses the thread.

| When you notice… | Write it to | With |
|---|---|---|
| An unsettled question needing a decision later | `06` | a row, a working position, why it is unresolved, and a **revisit trigger** |
| A ruling Jon has made | `04` | the reasoning, not just the outcome |
| Anything that changes what a spec says | the amendment table atop that build spec | the clause number superseded |

**At the moment it happens, not at the end.** In session 9 this caught a
proposed fix that did not survive checking, a claim about film colour that was
wrong, and a baseline that had been stale for a session and a half.

---

## 3. What session 9 shipped

### The offer changed

- **The price screen now discloses Fall 2026.** `Blotter opens Fall 2026.
  Billing starts when your access does.` Checkout shows `Due today $0.00` and
  `$9.99 / month, from Fall 2026`. **Amends `07-SECTION-7` §8**, whose last
  clause put availability only in the terminal state.
- **A waitlist branch** off the price screen — a subordinate text button, a
  terminal state, and `waitlist_joined` as a **tenth canonical event** amending
  WS3's frozen nine.

The reason: `checkout_started` had fired **zero times against four email
captures**. Most traffic is pre-season, so a decline was a statement about the
calendar, and the funnel could not tell that apart from not wanting the product.

### The names changed

All five contacts became near-miss finance parodies, everywhere: sheet data,
both hero films, Film A, the share card, Outstanding, the phone swipe.

| Row | Name | Title | Firm |
|---|---|---|---|
| 1 | Jamie Diamond | Associate | JPMorgan |
| 2 | David Salmon | Analyst | Goldman Sachs |
| 3 | Ken Molise | Vice President | Moelis & Co |
| 4 | Larry Sync | Associate | BlackRock |
| 5 | Jerome Bowel | Analyst | Carlyle |

Near-miss rather than exact: a real person's name in commercial material is a
right-of-publicity question independent of defamation, and the parody lands the
same joke without it.

### Film A was re-cut

By a parallel chat against `14`. The simultaneous zone fade became five sweeps
running top to bottom, matching Film C and the web hero.

### Fixes worth remembering

- **Three columns had to grow** because the new names are longer. Every one was
  found by *looking*, never by measuring.
- **The hero films' activity cues still named the old contacts** — the card said
  `Sarah Chen replied` while the row said Jamie Diamond.
- **`social/blotter-film-a-4x5.html` has no `?bare=1` handler; the served copy
  does.** A straight copy would have put a Play button and scrubber inside the
  funnel. Now commented in place.

---

## 4. Where to pick up: promotion

**This is the session's work and none of it is drafted.**

### Read this before anything else in this section

**`02-strategy-and-test.md` forbids promoting this page alone**, in three
Confirmed places: line 40, line 93 and line 101's traffic gate. Round one is a
**matched test of two surfaces** — spreadsheet-native against standalone
platform — and **the platform page is Workstream 7 and does not exist.**

The stated reason for simultaneity is the exact confounder Jon identified on
August 12: *"different launch weeks would confound results with
recruiting-cycle timing."*

**This is not an instruction to stop.** The gate was already crossed — the site
is live, indexed and carrying traffic, and Jon overrode the domain hold
knowingly. But promotion is a different act from being live: it spends the
sample deliberately. `06` carries the row and the three legitimate ways out.
**Get the ruling before anything is published**, not before drafting.

What exists to post: the live page, three films (`A` 21.5s funnel, `B` 37.8s
unused, `C` 11s mobile hero), the web hero film, the launch film, and a share
card that renders on every link.

What has to be decided, and it is Jon's:

1. **Which audience each platform gets.** This is not cosmetic — it decides what
   the numbers mean. Post broadly to r/FinancialCareers and you get pre-season
   sophomores, and `checkout_started` stays at zero for reasons the page cannot
   fix. Aim at full-time and off-cycle candidates and you reach people whose
   season is now.
2. **The copy for each**, which differs by platform more than the asset does.
3. **Which asset goes in each post.** Film B has never shipped anywhere.
4. **Whether Reddit gets a different posture entirely.** That audience reads
   Section 6 closely and will ask which provider — a question the page
   deliberately does not answer.

`02-strategy-and-test.md` is the test design and the posts have to serve it.

### Then, in rough order

1. **The CTA label**, at about 150 clean visitors. 47 now. The argument against
   `Try Blotter Now` that owes nothing to the data still stands — it promises a
   product that does not exist — but the honest labels are forbidden by
   `07-SECTION-7` §13. **The Fall 2026 disclosure has partly defused this**,
   since the price screen now says when it opens.
2. **Final complete-page rhythm** — `06` has carried this since the beginning.
3. **Whether the header shrinks on scroll.** Built; `?header=shrink`.

---

## 5. Things that will bite you

**The Browser pane is a hidden document.** Scroll events do not fire,
`IntersectionObserver` never arrives, transitions freeze at their start value,
and a screenshot after `scrollTo` comes back blank.

**Reload at the target width and `await document.fonts.ready` before reading any
geometry.** Measuring after a *resize* produced a confidently wrong delta table
in session 8.

**For film geometry, render and look. Do not trust a measurement script.** This
is session 9's hardest-won lesson: three scripted measurements of the same film
cell disagreed with each other and two said text fitted when it visibly did not.
Films scale themselves via `fit()`, so a DOM read mixes scaled and unscaled
values, and text painted over by an opaque neighbour is not clipped in geometry.
**Every real clipping defect this session was found by Jon or by a screenshot.**

**Four hand-kept duplicates exist.** `web/public/film/` against `social/`;
`sheet-phone.tsx`'s `FULL_COLS` against `parts.tsx`; a *third* column list at
`sheet-phone.tsx:93`; and `app/_og-fonts/` against the WOFF2 faces. Nothing
propagates.

**`web/public/film/blotter-film-a-4x5.html` carries a `?bare=1` line its source
does not.** Re-apply it on every copy across. It is commented in place.

**Satori cannot read WOFF2**, which is why `_og-fonts/` exists.

**A constant exported from a `"use client"` module is a stub in server markup.**

**The background is a handoff chain.** Each band opens on the colour the band
above closed on.

**Verify CSS against a production build, not the dev server.**

**`next start` serves a stale build after an edit.** A verification pass in
session 9 read the old bundle twice and reported a fix as broken. `rm -rf .next`
and rebuild when a change does not appear.

**Never `git add -A` while a parallel chat is running.** See §9.

---

## 6. Verification that has earned its place

- **Desktop and phone deltas against the baseline in `10` §3**, reloaded not
  resized, fonts settled. Every delta should decompose into an intended change
  with nothing left over. **Re-record the baseline after any structural change**
  — it went stale for a session and a half and nobody noticed.
- **No horizontal scroll at 320, 390 and 430 with every script stripped**, from
  a production build.
- The dash scan — at most two dashes in visible copy. Currently 0.
- The production build and lint. **One known pre-existing `analytics.ts`
  warning**; anything else is yours.
- The service-key-not-in-served-HTML check after any change to
  `supabase-admin.ts` or either API route.
- **`real_leads` before and after any internal run**, and delete the row after.
- **PostHog filtered `email_submitted` against `real_leads`.** They must agree.
  This is what found a permanently lost lead on August 12.

---

## 7. Decisions that are settled. Do not reopen without Jon.

**a.** Brand identity, page theme, bounded-box layout, status chip colours, date
formats, maintained-zone row tint. **Geist and Geist Mono are the typefaces**;
the `impeccable` hook flags them as overused and the spec governs.

**b. Section 6's present tense.** The demand test needs it.

**c.** Two em dashes are permitted in visible copy. The `design-taste-frontend`
skill bans them outright; the spec wins.

**d. The mobile CTA arrangement** — header button and hero button, no bottom bar.

**e. Hero layout G**, tagline in the header, left-aligned and persistent.

**f. The mobile sheet is the swipe**, not the crop.

**g. Mobile 02's headline arrangement.**

**h. All 21 outstanding actions are shown** on web and phone. **`+N more` in
Film A is fine** — ruled August 12.

**i. The connection provider stays ambiguous.**

**j. Section eyebrows follow the specs** — Section 01 only.

**k. The five parody names**, their firms and titles.

**l. The Section 6 claim gates are closed** until a provider is selected.

---

## 8. Open and waiting on Jon

- **Promotion.** §4. The whole session.
- **The CTA label**, at ~150 visitors.
- **Whether the `impeccable` design hook should be silenced** on the Outstanding
  group headers. `04-SECTION-4` §9 requires that coloured left rule verbatim.
- **Whether the header shrinks on scroll.** Built.
- **`/privacy` and `/contact` still carry `noindex`** from before indexing was
  turned on. Flagged in the code as a question. The audit recommends making
  `/privacy` indexable.
- **Film B has never shipped anywhere.** 37.8s, built, unused.

---

## 9. How sessions work

One session equals one chat. A session ends when the work is committed and
pushed, this file is rewritten, and the assistant states the session is
complete.

**Jon reviews by looking, not by reading.** Build it, put it in front of him at
a real width, let him react. Prose about breakpoints does not work. Where an
answer is not obvious, build variants behind a route under `/review/`.

**Review routes must set their own `robots: { index: false }`.**

**He rejects at least one ratified asset or presentation rule per session, and
has in every session.** In session 9 he caught three clipping defects that
measurement had passed, and he was right every time.

**Live review URLs**, all public and stable:

```
https://blotterib.com                          the page
https://blotterib.com/review/page-refresh      section eyebrows, three ways
https://blotterib.com/review/hero              the header tagline, four ways
https://blotterib.com/review/ownership         section 02 zone labels, four ways
https://blotterib.com/review/sheet-mobile      the phone sheet, swipe against crop
```

### Parallel chats, and the rule that changed

A film chat owning `social/` only, a documentation chat owning
`blotter-ib-ws1/docs/` only, and a read-only audit chat have all worked.

**But a file boundary does not isolate a parallel chat — a shared git index
defeats it.** In session 9 the film chat obeyed its brief completely and its
work was still swept into two of this chat's commits, because the brief
constrained what *it* wrote and nothing constrained what *this chat staged*.

1. **Never `git add -A`, `git add .`, or `git commit -a` while a parallel chat
   is running.** Explicit paths, every time.
2. **A parallel-chat brief must bind both sides**, naming which paths the main
   chat may stage while the other is live.
3. **Prefer a separate git worktree.** It makes the isolation structural rather
   than procedural.

---

## 10. Sessions 1 through 9

| Session | Deliverable |
|---|---|
| 1 | Spec fixes, scaffold, foundation, `SheetWindow` |
| 2 | Hero, page theme, Section 2, desktop |
| 3 | Brand identity, Section 3, Sections 4+5 merged |
| 4 | Sections 6 and 7, the footer, `/privacy` |
| 5 | Funnel, Supabase, PostHog, live deploy on `blotterib.com` |
| 6 | Responsive skeleton, Film C hero, mobile 01/04/05 |
| 7 | Mobile 02 and 03, the swipe, the funnel sheet, the production ship |
| 8 | Web reconciliation waves 1 and 2, the hero film, contact page, share card, indexing on |
| **9** | **The security audit closed. The Fall 2026 offer and the waitlist branch. The five parody names across every surface. Film A re-cut. Merged and live** |

Application root: `web/`. Run with `pnpm --dir web dev`, or build and start for
anything CSS-sensitive. Secrets live in `web/.env.local`, gitignored. **Never
print a value.**
