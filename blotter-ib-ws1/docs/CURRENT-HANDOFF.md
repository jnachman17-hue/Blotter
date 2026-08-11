# Blotter IB - Current Handoff

Date: August 11, 2026
Status: **Wave 1 of web reconciliation is built and pushed to branch `web`,
awaiting Jon's review.** Stage 10 shipped; `main` serves the mobile build.
Sessions 1 through 8 done. `10-web-reconciliation.md` is the brief.

The site is live, public, carrying real traffic, and has **one real lead**.

**Wave 1's review URL:**

```
https://blotter-claude-git-web-jnachman17-hues-projects.vercel.app
```

Branch `web`, cut from `mobile` on August 11, 2026. Not merged to `main`.
**Nothing in wave 1 is on `blotterib.com` yet.**

## 0. Act on these before anything else

**A checklist, not background.** Work out whether any item is due and say so in
the first reply of the session.

### Done, do not repeat

- Jon's desktop and phone are flagged internal on both live hostnames. **Do not
  ask him to do this again.**
- `inline-fonts.sh` has been run on `social/blotter-film-c-4x5.html`.
- **Vercel preview protection is off**, as of August 11, 2026. Every branch gets
  a public URL. Done with `vercel api`, not the dashboard —
  `07-infrastructure-runbook.md` has the call and how to reverse it. **Do not
  ask him to do this in the dashboard; he cannot reach that control.**
- The X account URL is set. `x.com/blotterib`, live on both surfaces.
- **The connection provider is closed, August 11, 2026.** Jon ruled it stays
  ambiguous exactly as it reads now: *"We don't have one yet and won't for a
  while. Don't relitigate this."* It was carried as a due item for five sessions
  and is no longer one. **Do not raise it again until a provider is selected.**

### Standing, and it governs every number you report

**Never read `leads`; read `real_leads`.** Never report a PostHog figure without
the three filters in `07-infrastructure-runbook.md`. Unfiltered, the funnel
claims several people confirmed a beta spot. **The true number is zero, and
`real_leads` is 1.**

### Due before the domain is promoted anywhere

`noindex` and `app/robots.ts` must both be deleted at launch. Both verified
still in place on August 11, 2026 — `app/layout.tsx:47` and `app/robots.ts` —
and deliberately untouched by wave 1.

### Due if PostHog scopes are ever fixed

`insight:write` and `person:write` returned 403 on August 10. Low priority.

---

## 1. Read these, in this order

1. `CLAUDE.md` at the repository root — the working agreement.
2. **This file.**
3. **`10-web-reconciliation.md`** — the brief for the work that comes next. It
   has the three-wave framework, the full inventory, and the traps.
4. `09-page-argument-rework.md` — the argument fault, the mobile fix, and §8's
   ledger of what web owes.
5. `08-desktop-changes-pending.md` — seventeen entries, each Decided, Confirmed
   defect, or Already applied.
6. `06-assumptions-and-open-questions.md` — everything parked, with triggers.
7. `07-infrastructure-runbook.md` before touching any data.

---

## 2. The documentation system. Follow it or the next session loses the thread.

Jon's instruction, and it has held for two sessions: keep using this, in these
files, **at the moment a thing is noticed rather than at the end.**

| When you notice… | Write it to | With |
|---|---|---|
| An unsettled question needing a decision later | `06-assumptions-and-open-questions.md` | a row, a working position, why it is unresolved, and a **revisit trigger** |
| Something decided that **desktop must also do** | `08-desktop-changes-pending.md` | Decided / Confirmed defect / Already applied, and the reasoning |
| An argument- or structure-level change | `09-page-argument-rework.md` | what transfers to web and what does not, and why |
| A ruling Jon has made | `04-decision-log.md` | the reasoning, not just the outcome |
| Anything that changes what a spec says | the amendment table atop that build spec | the clause number superseded |

**Write the reasoning, not the outcome.** Several entries exist only because
somebody wrote down *why* — and three times in session 7 that reasoning turned
out to be wrong and was caught precisely because it had been written down.

---

## 3. Where to pick up

**Wave 1 is built and pushed. It needs Jon's eyes before anything else starts.**

The new desktop baseline is recorded in `10-web-reconciliation.md` §3 and the
wave-1 delta against it is in §5. Desktop went **7,200 to 7,240** and every
per-section delta decomposes into an intended change.

### What is waiting on Jon, in the order it blocks work

1. **Look at wave 1** on the branch URL, phone and laptop. The two things the
   Browser pane could not verify and he can: **the desktop header's fill fading
   in at 8px of scroll**, and whether the section hairlines earn their 25px.
2. **Section 2's paragraph at 17px** — `08` §16. Applied on his wave-1
   instruction but never ratified, and it is the one presentation call in the
   wave he has not seen. One class reverts it.
3. **`08` §6, the 32px rule before the authority line.** Genuinely undecided for
   desktop and the entry says ask rather than assume.
4. **`08` §9, the two unratified strings.** Ratify or replace.
5. **`06`'s 481–1179 residual.** The header now tracks the column, which was the
   visible half. Whether the 480px cap itself should grow for iPad landscape is
   his, and it is not free.
6. **The desktop hero as a film.** He parked it until after wave 1 and is
   leaning yes. **Take it before planning wave 2** — see §9.

### Then wave 2

**`09-page-argument-rework.md` §8 is the ledger.** Rows 1, 2, 3 and 5 transfer;
row 5 is the biggest. Section numbering (`08` §5) is now a wave-2 row because
desktop's `01`–`05` cannot match the phone's until wave 2 rules on which
sections exist.

---

## 4. What stage 10 shipped

Thirty commits across sessions 6 and 7, now merged to `main` and live.

### The page a phone gets

- **A responsive skeleton.** One breakpoint, `desk` at 1180px. Above it the
  desktop page is byte-identical to before; below it is the mobile build. A page
  box that is a ceiling rather than a fixed width.
- **Film C as the hero**, 11 seconds, a 1:1 centre crop.
- **Five rebuilt sections**, numbered `01`–`05`.
- **The argument rework.** Section 3 stops existing on the phone; its headline
  becomes the merged section's deck, its refusals move there, its boundary and
  closing lines are cut. One claim, stated once.
- **The swipe sheet.** All ten columns at full width in a scroll region, `Name`
  frozen and tinted as manual, a veil over what is ahead that recedes as you
  travel and takes the colour of the zone you are about to reach, and a label
  band pinned in the sheet's chrome that crossfades on one threshold.
- **The Outstanding list** as the films' vertical structure with the tail of
  each group behind a `Show N more` disclosure.
- **The funnel as a full-screen sheet**, film 1:1 cropped, everything on one
  screen at any phone height.
- **A header CTA that actually persists** — it never did, on either surface.
- **One spacing rhythm**, 120px per boundary, 276px reclaimed.
- **The Phase 6 accessibility sweep.**

### What desktop got, deliberately almost nothing

The X link, which Jon asked for on both surfaces, and the phantom `Here` links
becoming text, which has zero visual delta. Everything else is scoped below the
breakpoint. **Desktop measured 7,200px with zero per-section deltas immediately
before the merge.**

---

## 5. Things that will bite you

`10-web-reconciliation.md` §8 carries the full list. The four that cost the most
time in session 7:

- **The dev server serves broken CSS after a syntax error and the page stops
  hydrating.** Clicks do nothing, nothing names the cause, and the production
  build passes. **Restart before debugging anything else.**
- **Two film iframes now exist.** Any measurement must say which; the naive
  query returns the hero, which is correctly 0x0 above the breakpoint. This
  produced a confident, entirely wrong bug diagnosis.
- **`web/public/film/` is a hand-kept copy of `social/`.** Nothing propagates.
- **The background is a handoff chain.** Each band starts on the colour the band
  above ended on. Hiding a section breaks it and shows as a hard line.

**The Browser pane is a hidden document.** Scroll events do not fire,
`IntersectionObserver` never arrives, CSS transitions freeze at their start
value, and `ResizeObserver` may not deliver on a resize — reload rather than
resize. Verify geometry there; send anything motion-dependent to Jon's phone.

**Wave 1 paid for ignoring that last sentence.** Measuring after a *resize*
rather than a reload produced `hero +72.5, tracker +83.7, doc +219` — a
confident, entirely wrong delta table in which the hero, which cannot change,
appeared to have grown 72px. `Fit` measures with `useLayoutEffect` and a
`ResizeObserver` and neither had re-run. **Reload at the target width and
`await document.fonts.ready` before reading any geometry.** It also will not
render a scrolled viewport — a screenshot after `scrollTo` came back blank.

**Two files keep hand-written copies of the same data.** `web/public/film/`
against `social/`, and now `components/section-45/sheet-phone.tsx`'s `FULL_COLS`
against `parts.tsx`'s `YOURS`/`MAINTAINED`. Wave 1's row-height fix had to be
applied twice. Both column lists now carry a comment naming the other.

**Verify CSS against a production build, not the dev server.**

---

## 6. Verification that has earned its place

- **desktop deltas against a baseline** — record a new one first, then expect
  exactly the intended change and nothing else;
- **no horizontal scroll with scripts stripped**, at 320, 390 and 430, served
  from a production build;
- the copy diff against the build specs, read out of the live DOM;
- the dash scan — exactly two dashes permitted in visible copy;
- the production build and lint. Lint has one known pre-existing warning in
  `analytics.ts`;
- the service-key-not-in-HTML check after any change to `supabase-admin.ts` or
  the lead route;
- **tap targets and phantom links** — both were clean at the end of stage 10 and
  a desktop pass can reintroduce either.

---

## 7. The one unverified claim on the page

Section 6 says: `Blotter connects to Google through an established connection
provider whose Google application has passed Google's CASA security assessment.`

Jon ruled this in; it supersedes `06-SECTION-6` §13 and §18. **No provider is
selected, so the sentence is true of no actual arrangement.** Nylas claims
Tier 3, not Tier 2, so no tier may be stated; and on a shared provider
application Google's consent screen reads the provider's name, not Blotter's.

On mobile it sits inside the folded fine-print row rather than in the open,
deliberately: being unverified argues for less prominence, not more.

---

## 8. Decisions that are settled. Do not reopen without Jon.

**a.** Brand identity, page theme, bounded-box layout, status chip colours, date
formats, maintained-zone row tint.

**b. Section 6's present tense.** The demand test needs it. That argument was
made, rejected, and the rejection was correct.

**c.** Alex Morgan's em dash and the Section 6 §10 sentence are the only two
dashes permitted in visible copy.

**d. The mobile CTA arrangement** — header button and hero button, no bottom bar.

**e. Section numbering on mobile** — `01`, not `01 / 05`.

**f. The mobile sheet is the swipe**, not the crop. The crop survives behind
`/review/sheet-mobile` and `05-SECTION-5`'s amendment table records why it lost.

**g. Mobile 02's headline arrangement** — `09` §4 option C, both strings, the
second as a deck.

**h. Mobile 03 lists all 21 actions** with the tail disclosed. A disclosure is
not the `+N more` label Jon overruled on August 5; it is a control that delivers
them.

---

## 9. Open and waiting on Jon

- **Whether the desktop hero becomes a film**, and **which film belongs in the
  funnel.** `06` says these are one question across three slots, not two.
  **Parked until after wave 1, and he is leaning yes.**

  **This is not independent of wave 2, and that is new.** `09` §6's reason for
  keeping desktop's Section 3 is that *"desktop has room and no hero film, so
  the mechanism may still need its own section there."* A film hero deletes the
  second clause: the film would demonstrate the mechanism on desktop exactly as
  it does on the phone, and Section 3's survival becomes a live question rather
  than a settled one. **Answer the hero before planning wave 2.**
- **The Outstanding view is drawn three different ways** across film, desktop
  and mobile. `09` §8 row 8b.
- **Whether the `impeccable` design hook should be silenced** on the Outstanding
  group headers. `04-SECTION-4` §9 requires that coloured left rule verbatim, so
  the code stays either way; the hook will keep firing until he says.
- **Whether the header shrinks on scroll.** Both are built; `?header=shrink`
  shows the variant. He has seen full height and not objected, which is being
  read as a choice unless he says otherwise.
- `web/app/layout.tsx` carries an em dash in the browser-tab title,
  contradicting the standing rule. **Flagged in seven sessions now.**

---

## 10. How sessions work

One session equals one chat. A session ends when the work is committed and
pushed, this file is rewritten, and the assistant states explicitly that the
session is complete.

Within a session, work proceeds by checkpoint: name the stage, name the
controlling specification, state the stop condition, build, review, approve.

**Jon reviews by looking, not by reading.** Build it, put it on his phone at a
real device width, let him react. Prose descriptions of breakpoints do not work.
Where an answer is not obvious, build the variants behind a temporary route
under `/review/` and let him flip between them —
`.claude/skills/prototype/PICKER.md` has the picker.

**His review link is the Vercel branch URL**, not the dev server:

```
https://blotter-claude-git-<branch>-jnachman17-hues-projects.vercel.app
```

Public, stable across pushes, and it survives the chat ending.

**He rejects at least one ratified asset or presentation rule per section, and
has in every session.** That is the process working. Three times in session 7 he
rejected something and was right for a reason better than the one offered.

### Parallel chats

**A film chat can run alongside**, owning `social/` only — never `git add`,
`commit` or `push`, never a dev server. **A documentation chat can run
alongside**, owning `blotter-ib-ws1/docs/` only. Nothing else may touch `web/`
while web reconciliation is in progress.

---

## 11. Sessions 1 through 7

| Session | Stages | Deliverable |
|---|---|---|
| 1 | 1-4 | Spec fixes, scaffold, foundation, `SheetWindow` |
| 2 | 5 | Hero, page theme, Section 2, desktop |
| 3 | 6 | Brand identity, Section 3, Sections 4+5 merged |
| 4 | 7 | Sections 6 and 7, the footer, `/privacy` |
| 5 | 8-9 | Funnel, Supabase, PostHog, live deploy on `blotterib.com` |
| 6 | 10, part 1 | Responsive skeleton, Film C hero, mobile 01/04/05, the argument rework diagnosed |
| 7 | 10, complete | Mobile 02 and 03, the swipe, the funnel sheet, the accessibility sweep, public previews, and the production ship |
| **8** | **Web reconciliation, wave 1** | **The persistent header, the 60px rows on both surfaces, desktop hairlines, Section 2's type, the header/column alignment. Branch `web`, not merged** |

Full detail for 1 through 6 is in `04-decision-log.md`. Stack, credentials and
deployment mechanics are in `07-infrastructure-runbook.md`.

Application root: `web/`. Run with `pnpm --dir web dev`. Secrets live in
`web/.env.local`, gitignored. **Never print a value.**
