# Blotter IB - Current Handoff

Date: August 10, 2026
Status: WS5 active. Sessions 1 through 6 complete. **Stage 10, the mobile
build, is roughly two-thirds done and the work is on the `mobile` branch.**

**The site is live at `blotterib.com`, public, carrying real traffic, and has
one real lead.** Production is still session 5's build: **nothing from session 6
has been deployed.** `main` has no mobile work in it at all.

## 0. Act on these before anything else

**A checklist, not background.** Work out whether any item is due and say so in
the first reply of the session.

### Done, do not repeat

Jon flagged his desktop and phone as internal on both live hostnames on
August 10 and applied the host and person filters to his `Canonical Funnel`
insight. **Do not ask him to do this again.**

`social/blotter-film-c-4x5.html` has had `inline-fonts.sh` run on it. Do not run
it again.

### Standing, and it governs every number you report

**Never read `leads`; read `real_leads`.** Never report a PostHog figure without
the three filters in `07-infrastructure-runbook.md`. Unfiltered, the funnel
claims three people confirmed a beta spot. The true number is zero.

### Due before the domain is promoted anywhere

The provider sentence — that the connection provider's Google application has
passed CASA — is still the one unverified claim on the page, and no provider has
been selected. Section 6 of this file has the record. **Finishing mobile removes
the last technical blocker to promoting this on Reddit, X or LinkedIn, so this
gate is closer than it was.**

`noindex` and `app/robots.ts` also still have to be deleted at launch.

### Due if PostHog scopes are ever fixed

`insight:write` and `person:write` returned 403 on August 10. Low priority.

---

## 1. Read these, in this order

1. `CLAUDE.md` at the repository root — the working agreement.
2. **This file.**
3. **`09-page-argument-rework.md`** — new this session, and the most important
   thing to understand. The page's argument has a real fault; it is diagnosed,
   the mobile fix is agreed, and it is not built.
4. `08-desktop-changes-pending.md` — new this session. Everything the mobile
   build decided that desktop still has to do.
5. `06-assumptions-and-open-questions.md` — the responsive rows, plus the film
   decisions parked this session.
6. `07-infrastructure-runbook.md` before touching any data.

---

## 2. The documentation system. Follow it or the next session loses the thread.

Jon's instruction, August 10, 2026: keep using this, in these files, at the
moment a thing is noticed rather than at the end.

| When you notice… | Write it to | With |
|---|---|---|
| An unsettled question that needs a decision later | `06-assumptions-and-open-questions.md` | a row, a working position, why it is unresolved, and a **revisit trigger** |
| Something decided for mobile that **desktop must also do** | `08-desktop-changes-pending.md` | a status of Decided / Confirmed defect / Already applied, and the reasoning |
| An argument- or structure-level change | `09-page-argument-rework.md` | what transfers to web and what does not, and why |
| A ruling Jon has made, with reasoning | `04-decision-log.md` | the reasoning, not just the outcome |
| Anything that changes what a spec says | the amendment table at the top of the relevant build spec | the clause number superseded |

**This matters most for web.** Jon repeatedly says "I actually meant when it
changes on the web" — those go to `08` or `09` immediately, not into a mental
note. Several rows in both files exist only because they were written the moment
he said them.

**Things he has explicitly asked be parked so they force a return:**

- which film belongs in the funnel — `06`
- whether the desktop hero becomes a film — `06`
- whether the three films should share one status-change treatment — `06`
- whether Film B's consent-screen treatment changes — `06`
- section numbering on desktop — `08` §5
- the hero rule on desktop — `08` §6
- the five phantom `Here` links — `08` §8
- the whole argument rework — `09`

---

## 3. Where to pick up

**Mobile 02, the merged section.** `09-page-argument-rework.md` §4 has the
agreed architecture. §5 has the one thing still unsolved and it is the next
decision to make with Jon:

> **How does a ten-column, 1,221px spreadsheet render on a 350px phone?**

Nothing has been agreed. Three approaches are written up in §5 with their
constraints. Film A already solved a version of this — it dropped eight columns
to five because at phone size eight put the sheet type under 6px — and
`social/README.md` records how.

Do not build the merged section until that is settled. Everything else about
mobile 02 is decided.

After that: **mobile 03** (the Outstanding list, which `04-SECTION-4` §12 says
may reduce to three groups and one readable row each), then **the funnel** as a
full-screen sheet, then **the Phase 6 accessibility sweep**.

---

## 4. What session 6 shipped

Seventeen commits on `mobile`. In order of how much they matter.

### The responsive skeleton

The page was a fixed 1,124px at every viewport and overflowed sideways on every
phone. It now has:

- **one breakpoint, `desk` at 1180px.** Above it the desktop page is
  byte-identical to before. Below it is the mobile build. `desk:` in a class
  means "the ratified desktop page"; unprefixed means the phone.
- **a page box that is a ceiling, not a fixed width** — up to 1124 on desktop,
  up to 480 below the breakpoint so a tablet gets a centred phone-shaped column
  rather than a stretched one.
- **a mobile type scale.** Only two tokens move: display 40→32, h2 34→26. Body
  holds at 16 because iOS zooms any input under it.
- **`components/layout/fit.tsx`**, shared by every fixed-width composition.
  **Read its doc comment before touching any of them** — it documents the
  first-paint trap that cost half a session.

**Verified: no horizontal scroll at 320, 360, 375, 390, 430, 768, 1024, 1180 or
1440, with JavaScript enabled and with every script tag stripped.**

### Section 1, the hero

**Film C is the mobile hero.** 11 seconds, three beats, looping, shown as a 1:1
centre crop inset at ~350px. The desktop sheet-and-cues composition is untouched
above the breakpoint. Two heroes, each right for its device.

Order on a phone: eyebrow, headline, film, one-line supporting copy, CTA, credit
line. The CTA clears the fold at 390x844.

**No sticky bottom bar.** Jon approved one and then chose against it having seen
all three arrangements. `StickyCta` and `cta_location = "sticky"` are kept so it
is reversible; nothing mounts it.

### Section 01 (mobile numbering), the scale section — ratified

The month-by-month trajectory is desktop-only. On a phone the four volumes are
**packed mark blocks with no time axis** — all 745 marks, one per unit, eight
rows of seventy-nine for the 628 emails. Jon's idea and better than the three
alternatives offered.

The Gmail strip is **rebuilt as a phone inbox**, five two-line rows, the subject
rendering in full. Both footnotes fold into one disclosure.

### Section 04, data and privacy — ratified

**2,693px → 1,900px at 390.** Nothing withdrawn. Calendar and Sheets fold,
Gmail stays open. Both footnotes fold into one row of fine print about the
Google connection.

`SHEETS_SCOPE_NOTE` is new copy on **both** surfaces: *Granted through Google
Drive, limited to the one file you connect.* The heading and mark stay
`Google Sheets` on Jon's argument that a Drive icon implies the whole Drive.

### Section 05 and the closing block

The footer was the worst thing on the mobile page — 26px type in a 187px column
and a CTA squeezed to 115x72 with its label wrapping inside the pill. Rebuilt
stacked. **Every footer target now clears 44px**, where three of four missed.

### Section numbering

`01` through `05` above each section headline, **mobile only**. Jon chose the
bare numeral over `01 / 05`. Desktop is unnumbered, so the two surfaces disagree
about whether this page has numbered sections — a known cost recorded in `08` §5.

### The films

Film C was built in a parallel chat to a brief written here, fonts inlined, and
copied to `web/public/film/`. Film B was revised in a second parallel chat and
is now 28.0s.

**`web/public/film/` is a manual copy of `social/`. Nothing propagates.**

---

## 5. Things that will bite you

**Jon reviews on the Vercel branch URL now, not the dev server.**

```
https://blotter-claude-git-mobile-jnachman17-hues-projects.vercel.app
```

Stable across pushes, public since August 11, 2026, and it survives the chat
ending. Push to `mobile` and it updates. `07-infrastructure-runbook.md` has how
protection was turned off and how to put it back.

The dev server is still the fastest loop while building, and everything below
still applies to it. It died four times in session 6 and once in session 7, and
**it dies when the chat that started it ends**, which is what happened when a
parallel chat owned it.

- **`allowedDevOrigins` in `next.config.ts` must include the Mac's LAN address.**
  Next blocks cross-origin dev resources by default, so a wrong entry serves the
  HTML and refuses every client chunk: the page renders and nothing works.
  Wildcards for both private ranges are in place, but the failure is silent, so
  suspect this first if he says "it loads but nothing works".
- **The address changes.** It moved from `192.168.1.64` to `192.168.68.63`
  inside one session.
- **Done, August 11, 2026. Do not raise it again.** Vercel Authentication is off
  for previews, so the `mobile` branch has a permanent URL. Jon could not reach
  the dashboard control; it was done with `vercel api`, which uses the CLI's own
  credentials. The Vercel MCP connector is authenticated to a different account
  and 404s on this project, so reach for the CLI.

**The Browser pane is a hidden document.** `visibilityState: "hidden"`, zero
`requestAnimationFrame` ticks. **Scroll events do not fire, IntersectionObserver
callbacks never arrive, and CSS transitions freeze at their start value.**
Anything time- or paint-driven reads as broken when it is fine. Verify state and
geometry there; send anything motion-dependent to Jon's phone.

**The dev server's Tailwind CSS goes stale.** A utility used in exactly one new
file may not be emitted until a restart. Verify CSS against the production
build, not the dev server. This produced two false bug reports in session 6.

**Never `git stash` while parallel chats hold uncommitted work.** Doing it in
session 6 swept a film chat's files for a minute.

**Importing a value from a `"use client"` module into a server component** gives
you a client reference rather than the value. A computed-key spread built from
one renders no attribute at all, silently.

---

## 6. Verification that has earned its place

Run these, not a glance:

- **no horizontal scroll with scripts stripped** — fetch the served HTML, remove
  every `<script>`, lay it out at 320 through 1440. This catches the first-paint
  overflow that a hydrated test cannot see.
- **desktop deltas against a baseline** — measure every section's height before
  and after. The expected result today is all zeros except Section 6's +50px,
  which is the Drive line. Anything else is a regression.
- the copy diff against both build specs, read out of the live DOM;
- the dash scan — exactly two dashes permitted in visible copy;
- the production build and lint. Lint has one known pre-existing warning in
  `analytics.ts`;
- the service-key-not-in-HTML check after any change to `supabase-admin.ts` or
  the lead route.

---

## 7. The one unverified claim on the page

Section 6 says: `Blotter connects to Google through an established connection
provider whose Google application has passed Google's CASA security assessment.`

Jon ruled this in; it supersedes `06-SECTION-6` §13 and §18. **No provider is
selected, so the sentence is true of no actual arrangement.** Nylas claims
Tier 3, not Tier 2, so no tier may be stated; and on a shared provider
application Google's consent screen reads the provider's name, not Blotter's,
which is an open product decision.

On mobile it now sits inside the folded fine-print row rather than in the open —
deliberately. Being unverified argues for less prominence, not more.

---

## 8. Decisions that are settled. Do not reopen without Jon.

**a.** The brand identity, the page theme, the bounded-box layout, the status
chip colours, the date formats, the maintained-zone row tint.

**b. Section 6's present tense.** The demand test needs it. That argument was
made, rejected, and the rejection was correct.

**c.** Alex Morgan's em dash and the Section 6 §10 sentence are the only two
dashes permitted in visible copy.

**d. The mobile CTA arrangement** — header button and hero button, no bottom bar.

**e. Section numbering on mobile** — `01`, not `01 / 05`.

**f. Film A stays in the funnel** on every device, for now.

---

## 9. Open and waiting on Jon

- **The mobile sheet treatment** — `09` §5. Blocks mobile 02.
- **A connection provider.** Closes the last unverified claim.
- **Whether the film earns its place in the funnel**, and **why the price screen
  loses people** — both n=1 questions waiting on traffic.
- `web/app/layout.tsx` carries an em dash in the browser-tab title,
  contradicting the standing rule. **Flagged in six sessions now**, unchanged
  without instruction.

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
`.claude/skills/prototype/PICKER.md` has the picker, and note that its
bottom-centre anchor collides with anything fixed to the bottom of the page.

**He rejects at least one ratified asset or presentation rule per section, and
has in every session.** That is the process working, not a problem.

### Parallel chats

**A second chat cannot build the web version while mobile is in progress.** The
collision is total: `hero.tsx`, `tracker-and-actions.tsx`,
`scale-trajectory.tsx`, `privacy-copy.ts` — every file a web build would touch is
the same file the mobile build is editing, because the whole premise is one
component with two layouts.

**A documentation chat can run in parallel** — one that only writes
`blotter-ib-ws1/docs/` and the build specs, turning `09` and `08` into spec
amendments. Zero collision with `web/`.

The film chats are the precedent for how to do this: own one directory, treat
everything else as read-only, never run `git add`/`commit`/`push`, never start a
dev server.

---

## 11. Sessions 1 through 5

| Session | Stages | Deliverable |
|---|---|---|
| 1 | 1-4 | Spec fixes, scaffold, foundation, `SheetWindow` |
| 2 | 5 | Hero, page theme, Section 2, desktop |
| 3 | 6 | Brand identity, Section 3, Sections 4+5 merged |
| 4 | 7 | Sections 6 and 7, the footer, `/privacy` |
| 5 | 8-9 | Funnel, Supabase, PostHog, live deploy on `blotterib.com` |
| **6** | **10, part 1** | **Responsive skeleton, mobile hero with Film C, mobile 01, 04 and 05, the argument rework diagnosed** |

Full detail for 1 through 5 is in `04-decision-log.md`. The technical stack,
credentials and deployment mechanics are in `07-infrastructure-runbook.md`.

Application root: `web/`. Run with `pnpm --dir web dev`. Secrets live in
`web/.env.local`, gitignored. Never print a value.
