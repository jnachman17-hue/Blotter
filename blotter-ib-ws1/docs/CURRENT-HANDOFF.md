# Blotter IB - Current Handoff

Date: August 11, 2026, end of session 8
Status: **Web reconciliation waves 1 and 2 are complete, merged and live on
`blotterib.com`. The site is indexed.** Sessions 1 through 8 done.

The site is live, public, **indexed by search engines**, carrying real traffic,
and has **two real leads**.

`main` is the only branch that matters. Everything is merged; nothing is
waiting on a branch.

---

## 0. Act on these before anything else

**A checklist, not background.** Work out whether any item is due and say so in
the first reply of the session.

### Due now

- **The security audit has reported.** Findings, fixes and the remaining work
  are in `13-security-audit-findings.md`. **Read that before starting design
  work** — it carries six items only Jon can do, and one of them is live.

  The short version: the site is sound on secrets, analytics privacy and input
  handling. The real finding is that **anyone can write unlimited fake leads
  that read as completed funnels**, straight into `real_leads`. Until a Vercel
  rate-limit rule exists, **the lead count cannot be fully trusted** — sanity
  check it before any decision rests on it.

  Code fixes are on branch `security-audit-fixes-2026-08-12`, deliberately not
  merged: the header and API-guard changes were never run, so the branch's
  preview URL is the verification step. `13` §5 has the merge command.

  Still open by choice, do not treat as oversights: no Content-Security-Policy,
  no film-iframe sandboxing (attempted, breaks the films, reverted), and
  `is_internal` still client-asserted. Reasoning for each is in `13` §4.

  Jon's outstanding items, in `13` §2: delete the audit's 5 test rows, run
  `supabase/005-lock-down-views.sql`, delete three published Goldman Sachs
  reference files, clear `web/.next/dev`, add the Vercel rate limit, and ratify
  the new privacy-policy paragraph.
- **Two films now appear on desktop.** `06`'s row on the three films sharing
  one status-change treatment carried the revisit trigger *"before any two
  films appear on the same surface"*, and that condition shipped. See §4.

### Done, do not repeat, do not ask about

- Jon's desktop and phone are flagged internal on both live hostnames.
- `inline-fonts.sh` has been run on `social/blotter-film-c-4x5.html`.
- **Vercel preview protection is off.** Every branch gets a public URL.
  `07-infrastructure-runbook.md` has the call and how to reverse it. **Jon
  cannot reach that dashboard control; do not ask him to.**
- The X account URL is set, `x.com/blotterib`.
- **The connection provider is closed.** Jon: *"We don't have one yet and won't
  for a while. Don't relitigate this."* Not a due item until a provider exists.
- **Indexing is on and `app/robots.ts` is deleted.** This was a due item for
  eight sessions and is discharged.
- **`/privacy` is finished.** Jon answered every `[ to be confirmed ]` slot on
  August 6, 2026. `06` carried it as outstanding for five sessions after it was
  done; it no longer does.

### Standing, and it governs every number you report

**Never read `leads`; read `real_leads`. Never read `contact_messages`; read
`real_contact_messages`.** Never report a PostHog figure without the three
filters in `07-infrastructure-runbook.md`.

**`real_leads` is 2** as of August 11, 2026. The `leads` table holds 8 rows and
**6 are internal** — the view is doing real work.

Both real leads are worth more than the count:

| | |
|---|---|
| Furthest stage | `email`, both. Neither reached checkout |
| CTA clicked | **`hero`, both** |

Two out of two came from the hero button rather than the header, the actions
CTA or the final one. At n=2 that proves nothing, but it is the only CTA
placement signal this test has produced, and it should not be discarded by a
change to the hero CTA made on other grounds.

### Due if PostHog scopes are ever fixed

`insight:write` and `person:write` returned 403 on August 10. Low priority.

---

## 1. Read these, in this order

1. `CLAUDE.md` at the repository root — the working agreement. **The specs
   govern; skills serve them; surface conflicts rather than splitting them.**
2. **This file.**
3. `04-decision-log.md` — **session 8's entries are long and carry the
   reasoning for everything below.** Read the August 11 entries at minimum.
4. `06-assumptions-and-open-questions.md` — everything unsettled, each with a
   revisit trigger. **This is now the live work list.**
5. `07-infrastructure-runbook.md` — before touching any data, and before
   assuming anything about deployment, indexing or the share card.
6. `10-web-reconciliation.md` — the three-wave framework and what remains of
   wave 3.
7. `12-security-audit-brief.md` — what the audit was asked to check.

**Closed, read only for history:** `08-desktop-changes-pending.md` (every row
applied), `09-page-argument-rework.md` (every transferring row applied),
`11-web-hero-film-brief.md` (the film is built and installed).

---

## 2. The documentation system. Follow it or the next session loses the thread.

Jon's instruction, and it has held for three sessions: keep using this, in these
files, **at the moment a thing is noticed rather than at the end.**

| When you notice… | Write it to | With |
|---|---|---|
| An unsettled question needing a decision later | `06-assumptions-and-open-questions.md` | a row, a working position, why it is unresolved, and a **revisit trigger** |
| A ruling Jon has made | `04-decision-log.md` | the reasoning, not just the outcome |
| Anything that changes what a spec says | the amendment table atop that build spec | the clause number superseded |

`08` and `09` are closed. Do not add rows to them.

**Write the reasoning, not the outcome.** In session 8 this paid for itself
five times: three entries in `08` recorded arguments that turned out to be wrong
and were caught only because they had been written down, and two claims in `10`
were falsified the same way. An entry that says what was decided but not why
cannot be checked.

---

## 3. What session 8 shipped

Twenty-six commits, merged to `main`, live. `04-decision-log.md` has the
reasoning for each; this is the inventory.

### The page a desktop visitor now gets

- **A persistent header** carrying the brand, the page tagline and the CTA. It
  never persisted before, on either surface — it was `position: sticky` inside
  the hero's wrapper and left with the hero.
- **The hero is a film**, looping. Film C's wipe was ported into it so it
  returns to its opening state frame-exactly.
- **Hero layout G**: headline left, one short line right, CTA on its own row.
  The eyebrow moved into the header bar, which bought 51px.
- **The credibility line sits below the film**, not orphaned inside the hero.
- **Five sections numbered `01`–`05`**, matching the phone for the first time.
- **Section 3 is cut** and Section 4+5 is split into ownership and Outstanding.
- **The refusals** are a page-level statement before the closing CTA.
- **Section 6 permissions collapse** on both surfaces.
- **Section 2's consequence visual is cut** — it claimed deadline tracking the
  product does not do.
- **The FAQ is on the page axis**, so every headline starts at 158.
- **A contact page and form**, with the address in the footer.
- **A share card**, and **indexing on**.

### Fixes worth remembering

- **Film C went 290KB to 113KB.** A comment closed early and inlined two font
  faces the film never draws, in the asset every phone visitor fetches above
  the fold.
- **Two 60px rows** in the Blotter tab, on both surfaces, back to 40.5px.
- **A dead `mailto`** in the footer: a constant exported from a `"use client"`
  module renders as a client-reference stub in server markup, and **a broken
  mailto looks exactly like a working one.** Found by reading served HTML.

---

## 4. Where to pick up

### First: two films on one surface

`06`'s row on the three films sharing one status-change treatment carried the
trigger *"before any two films appear on the same surface."* **That happened on
August 11.** Desktop now has the hero film above the fold and Film A inside the
funnel. A visitor who clicks the hero CTA sees two films inside a minute, both
showing Sarah Chen replying, with different status-change treatments.

Jon has never accepted the current position on this, and it is no longer
hypothetical. It is entangled with **which film belongs in the funnel**, which
`06` says is one question across three slots rather than three questions.

The working position, on evidence: **Film A stays for now.** Both real leads
completed the film step and both submitted email after it; the one drop happened
before it. Deleting the step also breaks `product_experience_completed`, one of
the nine canonical events. But the hero film changed the calculus — the funnel
no longer needs to prove the mechanism, because the hero just did.

### Then, in rough order

1. **The security audit's findings**, once Fable reports.
2. **The CTA label**, at about 150 clean visitors. 3 of 27 has a confidence
   interval of roughly 2% to 29%; nothing can be concluded yet. **There is a
   real argument against "Try Blotter Now" that owes nothing to the data** — it
   promises a product that does not exist — but the labels that would honestly
   describe the funnel are forbidden by `07-SECTION-7` §13 and the
   no-availability rule. That tension is Jon's to resolve.
3. **Final complete-page rhythm** — `06` has carried this row since the
   beginning and it wants one assembled review now the sections are settled.
4. **Promotion**, which is Jon's, and the reason everything above is live.

### Settled this session, do not reopen without Jon

- **Eyebrows stay as the specs prescribe**: Section 01 only. Jon, August 11:
  *"I think it's okay to have in some sections and not in others as it is
  currently."* `/review/page-refresh` keeps the alternatives.
- The Outstanding view's presentation. Jon asked for a better idea; there is not
  one that keeps all 21 visible without breaking the Sheets frame.
- The funnel film step exists. *Which* film is open; whether to have one is not.

---

## 5. Things that will bite you

**The Browser pane is a hidden document.** Scroll events do not fire,
`IntersectionObserver` never arrives, CSS transitions freeze at their start
value, `ResizeObserver` may not deliver on a resize, and **it will not render a
scrolled viewport** — a screenshot after `scrollTo` comes back blank.

**Reload at the target width and `await document.fonts.ready` before reading
any geometry.** Measuring after a *resize* produced `hero +72.5, doc +219` in
session 8: a confident, entirely wrong delta table in which the hero, which
cannot change, appeared to have grown 72px.

**Three hand-kept duplicates exist.** `web/public/film/` against `social/`;
`sheet-phone.tsx`'s `FULL_COLS` against `parts.tsx`'s column widths; and
`app/_og-fonts/` against the WOFF2 faces `next/font` serves. Nothing
propagates. The row-height fix in session 8 had to be applied twice.

**Satori cannot read WOFF2**, which is why `_og-fonts/` exists. Do not delete
it.

**A constant exported from a `"use client"` module is a stub in server markup.**
It compiles, it type-checks, and it renders as a broken value.

**The background is a handoff chain.** Each band opens on the colour the band
above closed on. `Mobile02`'s `field-rise` and the desktop ownership section are
the same band by design.

**Verify CSS against a production build, not the dev server.** The dev server
serves broken CSS after a syntax error and the page stops hydrating with no
error naming the cause.

**Never `git stash` while a parallel chat holds uncommitted work.**

---

## 6. Verification that has earned its place

- **Desktop deltas against a baseline**, reloaded not resized, fonts settled.
  Every delta should decompose into an intended change with nothing left over.
- **No horizontal scroll at 320, 390 and 430 with every script stripped**, from
  a production build. `curl` the page, strip `<script>`, add a `<base href>`,
  serve it from `web/public/`, measure, then delete it.
- The dash scan — at most two dashes in visible copy.
- The production build and lint. **Lint has one known pre-existing warning in
  `analytics.ts`**; anything else is yours.
- The service-key-not-in-served-HTML check after any change to
  `supabase-admin.ts` or either API route.
- `real_leads` and `real_contact_messages` counts before and after any internal
  run.

---

## 7. Decisions that are settled. Do not reopen without Jon.

**a.** Brand identity, page theme, bounded-box layout, status chip colours, date
formats, maintained-zone row tint.

**b. Section 6's present tense.** The demand test needs it.

**c.** Alex Morgan's em dash and the Section 6 §10 sentence are the only two
dashes permitted in visible copy. **The `design-taste-frontend` skill bans em
dashes outright; the spec governs and wins.**

**d. The mobile CTA arrangement** — header button and hero button, no bottom
bar.

**e. Hero layout G**, the tagline in the header, left-aligned and persistent.

**f. The mobile sheet is the swipe**, not the crop.

**g. Mobile 02's headline arrangement** — both strings, the second as a deck.

**h. All 21 outstanding actions are shown**, on both surfaces, with no `+N more`
label.

**i. The connection provider stays ambiguous.**

**j. Section eyebrows follow the specs** — Section 01 only.

---

## 8. Open and waiting on Jon

- **Which film plays in the funnel**, and whether the three films share one
  status-change treatment. §4. **Most urgent.**
- **The CTA label**, at ~150 visitors.
- **Whether the `impeccable` design hook should be silenced** on the Outstanding
  group headers. `04-SECTION-4` §9 requires that coloured left rule verbatim, so
  the code stays either way.
- **Whether the header shrinks on scroll.** Built; `?header=shrink` shows it. He
  has seen full height and not objected.
- **`web/app/layout.tsx` carries an em dash in the browser-tab title**,
  contradicting the standing rule. **Flagged in eight sessions now.**
- The claim gates in `06` describing a product that does not exist:
  unmatched-message filtering, full-body non-retention, deletion and revocation,
  retention and subprocessors, unrelated Drive access. These were acceptable
  while the site was unlisted. **It is now indexed and being promoted**, which
  is a different posture, and Jon should choose it rather than inherit it.

---

## 9. How sessions work

One session equals one chat. A session ends when the work is committed and
pushed, this file is rewritten, and the assistant states explicitly that the
session is complete.

Within a session, work proceeds by checkpoint: name the stage, name the
controlling specification, state the stop condition, build, review, approve.

**Jon reviews by looking, not by reading.** Build it, put it in front of him at
a real width, let him react. Prose about breakpoints does not work. Where an
answer is not obvious, build the variants behind a temporary route under
`/review/` and let him flip between them.

**Review routes must set their own `robots: { index: false }`.** The site-wide
rule that used to cover them is gone.

**He rejects at least one ratified asset or presentation rule per section, and
has in every session.** That is the process working. In session 8 he overturned
the settle-then-replay hero, the text-slide share card, the left-weighted hero
variant, and the noindex rule — and he was right every time, twice for better
reasons than the ones offered to him.

**Live review URLs**, all public and stable:

```
https://blotterib.com                          the page
https://blotterib.com/review/page-refresh      section eyebrows, three ways
https://blotterib.com/review/hero              the header tagline, four ways
https://blotterib.com/review/ownership         section 02 zone labels, four ways
https://blotterib.com/review/sheet-mobile      the phone sheet, swipe against crop
```

### Parallel chats

**A film chat can run alongside**, owning `social/` only — never `git add`,
`commit` or `push`, never a dev server. This has worked four times.
**A documentation chat can run alongside**, owning `blotter-ib-ws1/docs/` only.
**A read-only audit chat can run alongside**, as the security audit does.

Nothing else may touch `web/`.

---

## 10. Sessions 1 through 8

| Session | Stages | Deliverable |
|---|---|---|
| 1 | 1-4 | Spec fixes, scaffold, foundation, `SheetWindow` |
| 2 | 5 | Hero, page theme, Section 2, desktop |
| 3 | 6 | Brand identity, Section 3, Sections 4+5 merged |
| 4 | 7 | Sections 6 and 7, the footer, `/privacy` |
| 5 | 8-9 | Funnel, Supabase, PostHog, live deploy on `blotterib.com` |
| 6 | 10, part 1 | Responsive skeleton, Film C hero, mobile 01/04/05 |
| 7 | 10, complete | Mobile 02 and 03, the swipe, the funnel sheet, the accessibility sweep, the production ship |
| **8** | **Web reconciliation** | **Waves 1 and 2, the hero film and redesign, the contact page, the share card, indexing on. Merged and live** |

Full detail is in `04-decision-log.md`. Stack, credentials and deployment
mechanics are in `07-infrastructure-runbook.md`.

Application root: `web/`. Run with `pnpm --dir web dev`, or build and start for
anything CSS-sensitive. Secrets live in `web/.env.local`, gitignored. **Never
print a value.**
