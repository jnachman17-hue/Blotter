# The trust pages: what was built on 5 September 2026, and why

Preview only. Nothing here is on blotterib.com until Jon has reviewed it.

## The ruling that shaped it

Jon, the same evening: full creative authority for this build; the older specs
are background, not constraints; he reviews everything at the end. Recorded in
memory as `creative-authority-sep-2026`. The honesty rules that are about facts
rather than taste still hold throughout: never claim the audit proves more than
it does, never contradict what the code does, keep every number generated.

## How the design was chosen

A judge panel rather than one draft. Four independent proposals from four
angles (film-first, receipt-first, evidence-first, reader-journey), scored by
three judges with different worries (a suspicious non-technical student, a
security-literate Reddit commenter, a design director), then one synthesis.
The synthesis is `SPEC.md` in the session scratchpad; its spine is *Claims and
checks*: every limit is printed beside the claim it limits, and the server is
drawn as a dashed box with nothing inside it.

Three things no proposal had, added by the judges: how to leave (remove access
in Google's security settings, and what is left behind), the sixty-second
check (row 2.2 and stop), and a place for findings that were true and kept.

## The pages

| Route | What it is | Built from |
|---|---|---|
| `/audit` | The hub. One run of the script, drawn and played on demand; five claims each with CHECK IT and CAN'T SHOW; the question to paste, verbatim; the findings figures; where checking ends. | `app/audit/page.tsx`, `run-stage.tsx`, `run-stage.module.css`, `lib/run-scenes.ts` |
| `/code` | The whole script, a paste-to-verify check that runs in the browser (offline too), the five permissions as a ledger, and every field the server receives and returns. | `app/code/*`, `lib/verify-copy.ts`, `lib/contract-shapes.ts` |
| `/status` | What the server holds, live: every table and column in plain English with live counts, and find-your-sheet by Blotter ID. Says plainly it proves what this database holds and not that there is no other. | `app/status/*`, `lib/what-we-hold.ts`, `lib/status-snapshot.ts`, `app/api/status/route.ts` |
| `/findings` | The public audit log, every finding from every review, filterable, with the wrong ones and the kept ones. | `app/findings/*`, `lib/findings.ts` |

Plus: the receipt stub (`components/receipt-stub.tsx`) on every trust page and
`/update`; `SCRIPT_SENDS_TO` written into `manifest.ts` by `publish.js` and
pinned by `helpers.test.js`; the nav across the inner pages (Audit · Code ·
Findings · Status · Update · Privacy · Terms); one line on `/privacy` pointing
at `/audit#claims`; step 04 on `/update`.

## The rules the drawing is under

The body of every message is hatched and never lights up. Envelopes that do not
match fade and never come back. Nothing is ever drawn inside the server box.
It does not autoplay; the poster is the last frame, so a reader who never
presses play still sees where proof ends. `app/audit/selftest.ts` asserts every
function a scene names exists in `public/Code.gs`, that the server scene says
"We say" and "cannot prove", that the bounce scene says addresses (plural), and
that the captions ride along in the package a student pastes into an AI.

## The numbers, and where they come from

Nothing is typed. Version, bytes, fingerprint and "Sends to" come from
`manifest.ts` (generated). The findings figures come from `tally()`,
`reviewCount()` and `versionSpan()` in `lib/findings.ts`. Table names and
columns come from `lib/what-we-hold.ts`, which must be kept in step with
`supabase/*.sql`. Live counts come from `statusSnapshot()`. The published
request shape is pinned to `types.ts` by a self-test that parses a full
request and fails if any accepted field is unlisted.

## Decisions Jon made along the way

- Publish the findings log in full, embarrassing ones included.
- Do not publish the engine's code; publish exactly what it receives and returns.
- Build the paste-to-verify check and the live status page; the live database
  view was his idea, and the one number it gives away (how many sheets exist) is
  one line to remove if he would rather not.
- Length: build the fuller version; he rules on cuts with the page in front of
  him. `/audit` measures about 4,650px at 1280×900 (five viewports); the spec's
  section 12 has the cut order.

## The review of the pages themselves

Before the second preview, the four pages went through the same kind of review
the product did: four lenses in parallel (every factual sentence against the
code and the SQL; the house voice; accessibility and phone layout by reading
the code; a sceptical reader following every link), and every finding handed
to a refuter who had to try to knock it down before it counted. Seventy-six
raised, sixteen refuted, sixty applied by four fixers with strict file
ownership. The confirmed list is `REVIEW.json` in the session scratchpad.

The two rated high: a sentence in the findings log the house voice bans
("they did not agree to anything"), and the round-3 numbering gap (3.5 and 3.6
repeat 2.6 and 2.9 and are recorded there) which read as deleted findings under
a lede promising nothing is removed. The note now says why the numbers skip.

Decisions taken on the ones that offered options: the status strip says
"Server" rather than "Engine", because nothing on that page asks the engine;
the receipt stub prints the address with `https://`, exactly as the sheet
does, so "both should match" is literally true; the leave paragraph gives the
sheet's own menu item and a direct link to Google's third-party access page;
the source line under the drawing links to the script, not the shapes; row 2.4
now says a contact ticked Closed is still read every run.

## Still open

- The script header's whole-conversation sentence (finding 2.11): the site
  says conversations are read whole; the header does not yet. Jon disputed it;
  the four lines of `fetchThreads_` are in front of him.
- `checkThisSheet` gaining a "Compare at blotterib.com/code?v=" line ships with
  the next courier version, not this one.
- The React warning "Can't perform a state update on a component that hasn't
  mounted yet" appears in the dev console on pages this work did not touch
  (`/terms`), so it predates this build. Worth a look separately.
- The landing page rework, which has its own design round.
