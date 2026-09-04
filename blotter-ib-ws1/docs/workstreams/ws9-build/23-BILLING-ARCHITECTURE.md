# Billing — how a paid Blotter would actually work

Date: September 3, 2026
Status: **A design for Jon to rule on. Nothing here is built.**

**Written now because the notice channel is proven** (D27) and it is the hard
half. Server refuses, courier writes the notice and nothing else, student is
told why with a link, data untouched. **What is missing is the ability to refuse
one caller and not another.**

---

## 1. The gap, precisely

The rehearsal blocked **everyone or nobody**, because the engine cannot tell one
sheet from another. Verified in the code today:

- `/api/engine` receives **no identity of any kind**
- `install_id` exists but goes only to `/api/telemetry`
- The courier *does* know the Google account it runs as —
  `Session.getEffectiveUser().getEmail()` — and never sends it

So billing needs one new thing on the wire, and everything else follows.

---

## 2. Identity — SUPERSEDED September 3, 2026. Keys bind to a sheet.

> ⚠ **Everything in this section below the line is kept because the reasoning
> was sound and may matter again. It is no longer what is built.**
>
> **What changed: the evidence, not the argument.** The whole section assumed
> `Session.getEffectiveUser().getEmail()` returns an address. **On a live sheet
> it returns nothing** — and not because of the account type. `appsscript.json`
> declares five scopes: `gmail.readonly`, `calendar.readonly`,
> `spreadsheets.currentonly`, `script.external_request`, `script.scriptapp`.
> **None of them is a userinfo scope, so there was never an address to read.**
> It would have said the same on a `.edu`, and there is no point testing one.
>
> **Found by running it**, not by reasoning — the `Blotter → Check this sheet`
> diagnostic existed precisely because amendment A3 could not be settled from
> the code, and it paid for itself on its first use.
>
> **Jon's ruling: bind to the sheet, not the person.** Adding the sixth scope
> would work, and would cost an extra line on Google's unverified-app consent
> screen plus a forced re-authorisation for everybody already installed. **That
> screen is already the single biggest point at which a student abandons the
> install** (`17-INSTALL-OBSERVED.md` §2, defect one). Spending friction there
> to make billing tidier is the wrong trade.
>
> **The install id already does the job.** Minted once per sheet, already sent
> every run, and it survives a re-paste because script properties belong to the
> script project rather than the code. Only a brand-new copy of the sheet
> changes it — and since binding is soft, that produces one flag for Jon to
> clear rather than a lockout.
>
> **What is lost, stated rather than glossed:** with a per-sheet identity, one
> person with two sheets and two people sharing a key are indistinguishable.
> Both produce a flag. Soft binding means a human decides either way, which at
> this scale is the right place for that decision.
>
> **A3 was still the right call and is why nothing broke.** Because the field
> was omitted rather than sent blank, no install ever silently shared an
> identity with another. A hash of the empty string would have given every
> install one identity and let one key unlock all of them.
>
> **A4's graduation reasoning no longer applies** — a sheet id does not
> graduate — but it was correct, and it is kept below in case a userinfo scope
> is ever added for some other reason.

---

### Not the install id

It looks obvious and it is wrong. **A copied sheet gets a new install id**, and
copying is how Blotter is distributed. A student who takes a fresh template
after an update — which we will ask them to do — would silently lose the
subscription they are paying for.

### Not the addresses in Settings

Those are **typed by the student**. Anyone can put anything there. An identity
you can edit is not an identity.

### The Google account the script runs as

`Session.getEffectiveUser().getEmail()` is **Google's own answer to who is
running this**, and it cannot be faked from inside the sheet. It survives
copying, re-installing and renaming. It is the same person across every sheet
they own.

### But send a hash of it, not the address

**The server should never learn a student's email address**, and it does not
need to: it only needs to know that two requests came from the same person.

- The courier sends `account: sha256(lowercased email + a fixed salt)`
- The server stores only that hash
- **Stripe holds the real identity**, because a payment processor must

**This matters more than it looks.** Blotter's whole privacy claim is that the
server never receives the text of an email. Adding billing must not quietly turn
it into a service that knows who everybody is. A hash keeps the claim intact and
still bills correctly.

> ⚠ **This is still a change to the privacy posture and Jon should make it
> knowingly.** Today the engine receives nothing that identifies a person. After
> this it receives a stable pseudonym. That is a real difference, even though it
> is not an address, and `/privacy` will have to say so.

---

## 3. The flow, end to end

**Buying**
1. Student pays on `blotterib.com` through Stripe Checkout
2. Stripe webhook fires; the server generates a key and stores it as `active`
3. The key is shown on the success page **and** emailed by Stripe

**Activating**
4. Student pastes the key into **Settings → Blotter key**
5. Next run, the courier sends the key and the account hash
6. **First use binds the key to that account hash.** From then on the key only
   works for that person

**Running**
7. Every run: the server looks up the key, checks it is active and that the hash
   matches, then answers normally

**Lapsing**
8. Stripe reports a failed payment; the key enters a **grace period**
9. Runs continue, with a `warning` notice naming the problem
10. Grace expires; the key goes inactive
11. The next run gets a **402 with a `blocked` notice**, exactly as rehearsed

---

## 4. What lapsing does, and what it must never do

**The sheet freezes. Nothing is deleted, ever.**

Every status, date and count Blotter has already written stays exactly where it
is. It simply stops being updated, and the notice explains why.

**This is not a kindness, it is the only defensible behaviour.** The tracker is
the student's own spreadsheet in their own Drive. Blotter has never owned that
data and must not take it away over a failed card. **Anything that blanks or
degrades their columns would be reaching into a file we do not own.**

The practical consequence is good too: paying again resumes exactly where they
left off, because nothing was lost.

---

## 5. What the server stores

One table. Nothing else changes.

| Column | |
|---|---|
| `key` | what the student pastes |
| `account_hash` | bound on first use; null until then |
| `status` | `active` · `grace` · `inactive` |
| `stripe_customer_id`, `stripe_subscription_id` | the link to billing |
| `created_at`, `last_seen_at` | |

**No names. No email addresses. No contacts. Nothing about anybody's mail.**

### Where the check lives, and the honest tension

Enforcement has to be in the engine's path — a separate endpoint the courier
politely calls first would be trivial to skip.

So `/api/engine` gains **one database read per run**. That is a real change to a
component whose statelessness has been load-bearing.

**But the claim survives, and the wording matters:** the engine still stores
nothing, still logs nothing, and still never receives the text of an email. It
reads whether a key is valid. **Reading an entitlement is not keeping a
student's data**, and `/privacy` should say exactly that rather than something
vaguer.

---

## 6. Sharing, and how much to care

One key pasted into five friends' sheets is the obvious abuse.

**Binding to the first account hash solves it**, and it solves it in the right
direction: the same person can use the key on as many of their own sheets as
they like — a fresh copy after an update, a rebuilt tracker — while a different
Google account is refused.

**Do not build anything cleverer than this.** Device counting, seat limits and
re-binding flows are all machinery for a problem a hundred students do not have.
If someone is determined enough to share a Google account, that is cheap
information about demand and not worth engineering against.

**One thing to get right:** a student who genuinely needs to rebind — new Google
account, graduated, lost access — must have a way. A manual unbind by Jon is
enough at this scale, and a support email beats a self-service flow nobody uses.

---

## 7. What Jon has to decide

### 7.1 Free tier — and there is a live commitment here

**Jon has already told students Blotter is free.** Whatever is decided, the
people using it now should not wake up blocked.

Options:
- **Grandfather the pilot.** Existing account hashes marked permanently active.
  Costs nothing and keeps a promise
- **A trial**, N days from first run, then a key is required
- **Free under a contact limit**, paid above it
- **No free tier**, from a stated date, with notice given through the channel
  that now exists

**The notice channel is what makes any of these possible** — for the first time,
a decision can be announced inside the product rather than hoped to reach people.

### 7.2 The price
`$9.99 / month` is on the live page but was never tested. Zero checkout starts,
ever.

### 7.3 What happens at the end of a recruiting season
This is **seasonal software**. A student needs it hard for four months and not
at all for eight. A monthly subscription that silently bills through the summer
is the kind of thing that earns chargebacks and bad word of mouth.

**Worth considering a season pass** rather than a subscription. Not a decision
for this document, but it is the question the pricing actually turns on.

### 7.4 Whether the hash is acceptable
§2. It is the first personally-linked thing the server would ever see.

---

## 8. What NOT to build

- **No accounts, no passwords, no login.** A key in a cell is the whole of it,
  and anything more is a product nobody asked for
- **No usage metering.** Counting contacts or runs to price by them turns a
  simple thing into a complicated one
- **No self-service rebinding** (§6)
- **No dunning emails from Blotter.** Stripe does this properly and already has
  the address Blotter deliberately does not

---

## 9. The order to build it in

1. **The courier sends the key and the account hash.** Contract bump. Harmless
   on its own — the server can ignore both
2. **The keys table and the Stripe webhook.** Still no enforcement
3. **A key can be issued and shown to work** end to end, with nothing refused
4. **Enforcement last**, behind a flag, tested exactly as the notice was — on
   one real sheet, deliberately, before it is true for anybody else

**Nothing between step 1 and step 4 changes what a student experiences.** That
is deliberate: every piece can be proven in place before the one that can lock
somebody out is switched on.

---

# AMENDED, September 3, 2026, after review

**The review found four things wrong and one thing dangerous.** All accepted.
The original text above stands as written so the corrections can be read against
it.

## A1. The hash is a pseudonym, not anonymisation, and §2's wording was wrong

The salt lives in `Code.gs`, which **every student can read**. Anyone holding
the table and the salt can ask *"is `jon@utexas.edu` in here?"* and get an
answer — and student addresses are a small, generable space
(`firstname.lastname@` × a hundred universities). **A hash is not one-way
against a dictionary.**

Salting on the server does not fix it: the courier would have to send the raw
address. Apps Script has `computeDigest` and no bcrypt, and iterating SHA-256
enough to matter would spend a run budget already at 85%.

**The design survives. The claim does not.**

- ❌ *"the server never learns who"*
- ✅ **"Blotter's server stores a pseudonym derived from your Google account,
  never the address itself"**

**This project's entire privacy posture rests on claims that survive being
checked.** One that does not would cost more than it buys.

## A2. `last_seen_at` must not live in the engine's table

The schema in §5 contradicted §5's own sentence. **If the engine writes
`last_seen_at`, "the engine stores nothing" is not weakened, it is dead.**

**Ruled: `/api/telemetry` owns last-seen. The engine reads and never writes.**

And the honest note the review added: after this change a captured request is
**linkable** — one hash across a season ties a person's whole networking history
together, with Stripe holding the hash-to-human mapping. The engine still
accumulates nothing, so the claim holds, but **it is carrying more weight than
before and should be stated rather than leaned on.**

## A3. ⚠ The empty-email hole, which is the dangerous one

**`Session.getEffectiveUser().getEmail()` can return an empty string.** Not
theoretical — `effectiveUserEmail_()` already carries a `try/catch` and an
`|| ''` fallback, added when the decline path was built, because it happened.

**Hash an empty string and every such install shares one hash. One key would
unlock all of them.**

**Ruled: an empty email means the field is not sent at all.** The server refuses
to *bind* a key without a hash, and **still allows the run**. Absence must never
be a value.

**Verify before building anything: run the two-line Apps Script test on a
consumer Gmail account and on a `.edu`.** The whole design rests on a value
nobody has checked.

## A4. Graduation is the normal case, not an exception

§6 treated rebinding as something rare, handled by emailing Jon.

**Every student's `.edu` is deprovisioned, on a schedule.** For a tool aimed at
students that is the modal outcome. A Workspace rename does the same thing, and
a shared sheet does it too — on a *manual* run `getEffectiveUser()` is whoever
clicked, not the owner.

### So binding becomes soft, not hard

**Ruled, and this reverses §6.** On a hash mismatch the server **does not
refuse**. It records the mismatch and flags the key for review.

**The asymmetry decides it: locking out a paying customer who simply graduated
is far worse than a shared key going unnoticed for a week.** Hard binding
optimises against the cheaper problem.

Sharing at scale still shows up — several hashes on one key, visible — and stays
a manual decision rather than an automatic lockout.

## A5. The privacy page changes at step 1, not step 4

The moment the courier sends the hash, the engine receives a stable pseudonym —
whether or not anything reads it. **`/privacy` must be updated with step 1**, or
the site describes behaviour that is not true for the whole build.

Also: **step 1 is a contract bump**, so it is the server-first-then-paste dance
again. Not free.

## A6. Step 3 must make binding observable

Keys get bound before enforcement can verify them. If the hash is wrong for any
reason in A3 or A4, **keys bind silently to bad identities and nobody finds out
until step 4 locks someone out.**

**Ruled: binding shows what it bound to, and Jon's manual unbind works before
step 4, not after.**

## A7. Smaller, all accepted

- **The enforcement flag gets exactly one source**, confirmable with `curl`.
  D27's lesson, applied before it costs the same hour twice
- **No cron for grace periods.** Store `grace_until`, compute at read time. A
  scheduled job is a second source of truth that drifts
- **The Stripe webhook needs `request.text()`**, not `.json()` — signature
  verification runs on the raw body
- **Run budget is at 85%.** A database read per run is small and there is no
  headroom to spend casually
