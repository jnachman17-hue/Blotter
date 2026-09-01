# Brief — Courier, round 2: the cadence, the window, and Jon's first real install

Date: September 1, 2026
Model: **Opus.** Continues `08-BRIEF-COURIER.md`, which still binds in full.

**Every boundary in the original brief still applies** — read-only on Gmail and
Calendar, never open an attachment, you own `courier/` and nothing else, the
courier makes no judgments. If you are a fresh chat, read `08-BRIEF-COURIER.md`
and `11-COURIER-NOTES.md` first.

---

## 1. The hybrid cadence — Jon's ruling

> **Every 15 minutes from 7am to 10pm. Every 120 minutes the rest of the time.**
> Both in the student's own timezone.

Your quota analysis is why. This drops the day from 96 runs to about 65.

**Apps Script timers cannot vary by time of day**, so the shape is: keep the
15-minute trigger, and **decide at the top of each run whether to do work.**
Outside day hours, return immediately unless 120 minutes have passed since the
last run. An immediate exit costs about a second of trigger time and **zero
Gmail reads**, which is the budget that actually matters.

**Both numbers and both boundary hours go in named constants at the top of
`Code.gs`, with a comment saying they are Jon's ruling and adjustable.**

**Then re-do the arithmetic in `11-COURIER-NOTES.md` §3** against the new
cadence, and say plainly whether it clears both budgets or only one. Your
original estimate of ~450 read operations per run carried a stated uncertainty;
**keep that honesty rather than presenting the new number as settled.**

## 2. Measure the run — this is a real deliverable

Nobody knows how long a run takes or what it costs. **Record and write to
Settings, every run:** wall-clock duration, threads fetched, messages fetched,
and Gmail calls made.

That turns the quota question from arithmetic into an observation the first time
Jon runs it. **A run that takes 4 minutes changes the cadence decision
immediately**, and right now nothing would tell us.

## 3. The calendar window

It is 365 days back. **Jon's mail is from 2024, about 2.5 years ago**, so his
calendar returns nothing and the call columns come back empty — which would make
his test look like a bug.

Make the window **configurable from the Settings tab**, defaulting to today's
365/180. Jon widens it for his archive run and every future student leaves it
alone.

## 4. What Jon is actually about to do, and it is not what the roadmap said

**He finished recruiting nearly three years ago and has no live mail.** He cannot
dogfood this the way a normal first user would. He said so, twice, and he is
right.

**What he can do is run it against his own 2024 archive** — real Google account,
real permission screens, real Apps Script, real Gmail fetching, real round trip,
real spreadsheet at the end. Everything except mail arriving.

**And we already know what the right answer is.** The engine's fixtures encode
the correct row for all 67 of those people. So the test is: does the live sheet
match the answer key?

**Rewrite `courier/INSTALL.md` for that**, and add a closing section:

- **Which contacts to enter.** Pull real names and addresses from
  `blotter-ib-ws1/research/corpus/index.json` so his sheet matches the fixtures.
  Give him a block he can paste, not an instruction to go and look
- **What the sheet should say afterwards**, drawn from
  `__fixtures__/season/2024-04-30.expected.json`. A handful of named rows he can
  eyeball — a `Bounced`, a `Replied`, a `Call done`, a high `Attempts`
- **What a mismatch means** and what to send back
- **The calendar window**, per §3 above

**Part B stays four steps.** It is the thing a real student does and it is
already right. **Do not let it grow** while you rewrite Part A.

## 5. Step 16 still matters most

`INSTALL.md` step 16 asks Jon to screenshot Google's unverified-app warning.
**Nobody on this project has ever seen it.** It is the single biggest point where
a real student abandons the install, and every word written about it so far comes
from Google's documentation rather than a live screen.

**Make that instruction impossible to skip**, and say why it matters, so he does
not click past the one screen we most need to see.

## 6. Boundaries, unchanged

- Read-only on Gmail and Calendar. No attachment, ever
- You own `courier/` and `11-COURIER-NOTES.md`. **Nothing under `web/`** — the
  engine and the fixtures belong to other chats and one may be running now
- Never `git add -A`
- **No judgments in the courier.** A time-of-day check is scheduling, not a rule
  about recruiting — that is the line, and it does not move

## 7. Write

- The changes in `courier/`
- A rewritten `courier/INSTALL.md`
- Updated `11-COURIER-NOTES.md` — the new arithmetic, what you measured, and
  anything Jon should expect to go wrong

**Report in plain English. Jon is not technical.** Tell him what to do first,
what he will see, and what to send back.
