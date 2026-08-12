# Security audit — findings, fixes, and what is left

Date: August 12, 2026
Audit brief: `12-security-audit-brief.md`
Status: **Closed. Every finding is fixed, verified, or consciously deferred.**

Everything in §2 was completed by Jon on August 12, 2026, and the code fixes are
merged and live on `blotterib.com`. What remains is in §4, and each item there is
a decision that was taken deliberately, not an outstanding task.

**Verified live on production after merge**, not just reasoned about: all four
security headers present; a `text/plain` POST to `/api/lead` rejected 415; a
valid lead stored `200 {"stored":true}`; the contact form stored
`200 {"sent":true,"stored":true}`; the funnel walked end to end with the film
playing; and the Vercel rate limit confirmed enforcing — requests 1-10 to
`/api/` returned normally, 11 onward returned 403.

---

## The short version

**The site is in good shape on the things that usually go wrong.** Nobody can
reach the database key, no password or key was ever committed to this
repository, no visitor's email address is being sent to the analytics tool, and
both of the forms check what people send them properly.

There is **no evidence anyone has attacked the site or stolen anything.**

The real problem the audit found is not theft. It is that **anyone on the
internet can write fake sign-ups into the leads table, and they will look
completely real.** The whole point of this test is to produce one number — how
many people wanted this — and right now that number can be faked by a stranger
with a free tool, and nothing anywhere would tell you it had happened.

That is the thing to fix. Everything else on this page is smaller.

---

## 1. What was found, in plain language

Ordered worst first. "Fixed" means the code is changed on the branch. "Needs
you" means it cannot be done from the code.

| # | What it is | State |
|---|---|---|
| 1 | Anyone can write unlimited fake leads that look like completed sign-ups | **Closed** — Vercel rate limit live and verified enforcing |
| 2 | The two database "views" probably ignore the lock on the tables underneath | **Closed** — `005` run by Jon |
| 3 | A fake Goldman Sachs rejection email is published on your live site | **Open by choice** — no security impact, see below |
| 4 | The privacy policy never mentioned the contact form | **Fixed** |
| 5 | Private-browsing visitors overwrote each other's sign-ups | **Fixed** |
| 6 | Any other website could make its visitors write rows into your database | **Fixed and verified** (415 on `text/plain`) |
| 7 | Your two most powerful keys sit in a hidden file on your laptop | **Closed** — cache deleted |
| 8 | The site sent no security headers at all | **Fixed** (4 of 5; no CSP, §4) |
| 9 | The films run in frames with no isolation | **Open by choice** — attempted, breaks the films, §4 |
| 10 | Small bugs: body size, spam trap, mobile button tracking | **Fixed** |

**On #3, revised.** This was originally written up with the legal and
reputational angle leading. Asked directly whether there was a *security*
problem, the honest answer is essentially no: the files expose no key, offer no
route into the site or database, and are unreachable unless someone guesses the
URL. The only technical nit is that `-v2.html` is ~934 KB of machine-generated
export carrying script tags nobody has read, sitting on the origin for no
reason. Left to Jon as a tidiness call, not a security one.

### 1. Fake leads — the important one

The sign-up endpoint has no limit on how many times it can be called, and it
lets the caller decide three things it should not: who they are, whether they
count as "real" traffic, and how far through the funnel they got.

So someone can send thousands of sign-ups, each with a different made-up
identity and a plausible email address, each marked as having **finished** the
funnel — and every one of them lands in `real_leads`, the exact view you read
to count demand. They would not look like junk. They would look like success.

Nothing counts, dedupes, alerts, or would otherwise reveal it.

**What was fixed:** requests must now be proper JSON and under 64 KB, which
stops the drive-by version of this (a random website making its visitors post
for you).

**What is still open:** there is no rate limit. That needs a setting in Vercel,
not code — see §2, item 5.

### 2. The database views may not be locked

Your tables `leads` and `contact_messages` are locked correctly. But the two
**views** you actually read from — `real_leads` and `real_contact_messages` —
were created in a way that, in Postgres, normally makes them ignore that lock
and run with full owner permissions.

If that is true, then anyone who ever got hold of the "anon" key could read
every email address and every contact message through those views, even though
the tables underneath are locked.

**This is not currently exploitable.** The site does not use an anon key at all
— there is no such key anywhere in the code or in the browser — so today there
is nothing published that could open this door. It matters because adding an
anon key is the normal next step for any Supabase project, and the moment you
add one, this becomes serious.

**I could not confirm it**, because I have no database access. `supabase/005-lock-down-views.sql`
contains four checks to run first, then the fix. See §2, item 2.

### 3. The fake Goldman Sachs email is public

`https://blotterib.com/reference/goldman-sachs-rejection-email-exact-v1.html`
returns a working page right now. It is a pixel-accurate fake rejection email
carrying Goldman Sachs branding, a real Goldman recruiting address, and a made-up
Gmail address attributed to Goldman's actual, named CEO.

It was internal design reference. It was never meant to be public. It is
reachable, it has nothing telling search engines to skip it, and there is no
`robots.txt` on the site.

This is not a hacking risk. It is the kind of thing that produces a letter from
a bank's lawyers. It costs nothing to remove — the originals are safely kept in
`docs/workstreams/ws5-assets/`, so deleting the published copies loses nothing.

Deleting files was blocked by a safety check on my side, so it is on your list.

### 4–10. The rest

- **Privacy policy** did not mention the contact form or what it stores, while
  the form told readers the policy covered it. Fixed — a paragraph was added to
  article 03. **Please read and approve the wording**, it is the only sentence
  on that page that is not yours.
- **Private browsing** visitors all shared the identity `"anonymous"`, and since
  that is the key the database updates on, they overwrote each other's sign-ups.
  Real lost data, now fixed.
- **Cross-site writes** were possible without the browser asking permission
  first. Fixed.
- **Keys on your laptop**: your Supabase master key and PostHog admin key are
  sitting in plain text inside a hidden 73 MB build-cache file in the project
  folder. Not on GitHub, not on the internet — but anyone who zips or copies
  that folder gets both, and changing your keys does **not** clear it.
- **Security headers**: the site sent none. Four safe ones added. The fifth and
  most valuable (a Content-Security-Policy) was deliberately left out because
  getting it wrong silently breaks the page, and it needs a proper testing pass.
- **The films** run in frames that have full access to the page around them. I
  tried to isolate them and **the films stopped working**, so I undid it. Left
  open on purpose — see §4.

---

## 2. What Jon had to do — ALL COMPLETED August 12, 2026

Kept below as the record of what was done, and because items 1, 2 and 4 are the
ones to repeat if the schema is ever rebuilt or a key is rotated.

- ✅ Audit test rows deleted
- ✅ `CHECK-view-security.sql` then `005-lock-down-views.sql` run in Supabase
- ✅ `web/.next/dev` deleted — **repeat this after every key rotation**
- ✅ Vercel firewall rate limit added, deployed, and verified enforcing (403 from
  the 11th request to `/api/` in a window)
- ✅ Funnel and contact form tested end to end on production
- ⬜ The three `public/reference/` HTML files — left in place deliberately, see §1

### 1. Delete the audit's test rows — Supabase, 1 minute

The audit wrote 5 fake rows to prove the endpoints work. They are all marked
internal so they are already excluded from your real numbers, but clean them up.

Supabase → SQL Editor → New query → paste → Run:

```sql
delete from public.leads where visitor_id like 'audit-%';
delete from public.contact_messages where email like 'audit-%@blotterib.com';
```

(4 rows in `leads`, 1 in `contact_messages`.)

### 2. Check and lock the database views — Supabase, 5 minutes

Two files, in order. Paste each one whole into Supabase → SQL Editor → Run.

**First** `supabase/CHECK-view-security.sql`. Read-only, changes nothing.
It returns four rows. In the two `view` rows, look at `options`: if it contains
`security_invoker=true` there was never a problem. If it is `NULL` or empty, the
problem is real. `anon_grants` should read 0 on every row.

**Then** `supabase/005-lock-down-views.sql`, which is the fix. Safe to run
either way — every statement is idempotent, and none of them touches the key the
website uses, so the site keeps working regardless.

Re-run the check afterwards to confirm.

### 3. Delete the fake Goldman Sachs pages — your terminal, 10 seconds

From the project folder:

```bash
rm web/public/reference/goldman-sachs-rejection-email-exact-v1.html web/public/reference/goldman-sachs-rejection-email-exact-v2.html web/public/reference/preservation-exact-v1.html
```

Verified safe: nothing on the site links to these, and byte-identical originals
stay in `docs/workstreams/ws5-assets/`. Do **not** delete
`hero-reference-v1.png` — `/review/sheet` uses it.

### 4. Wipe the keys off your laptop — your terminal, 10 seconds

```bash
rm -rf web/.next/dev
```

This is a build cache; it rebuilds itself. Do this again any time you change a
key, because rotating a key does not remove the old copy from here.

### 5. Turn on rate limiting — Vercel dashboard, 10 minutes

**This is the one that actually fixes the fake-leads problem, and it is the most
important thing on this page.**

In the Vercel dashboard: your project → **Firewall** → add a rate-limit rule.

- Path starts with `/api/`
- Something like 10 requests per minute per IP address
- Action: block (or challenge)

You do not need to write any code for this. If you cannot find the control, the
alternative is a Vercel WAF custom rule on the same path.

Until this exists, assume your lead count can be poisoned by anyone who decides
to, and sanity-check the numbers before you make a decision on them.

### 6. Approve the privacy wording, and make one decision

- **Read the new paragraph** in `web/app/privacy/page.tsx`, article 03 ("If you
  send us a message…"). It states exactly what the contact form stores. It is
  marked in the file as not yet ratified by you. Change the words however you
  like — just keep it accurate.
- **Decide**: `/privacy` and `/contact` are both still set to `noindex`, left
  over from before you turned indexing on. So your privacy policy cannot appear
  in search, on a site that is indexed and collects email addresses. I left this
  alone because publication posture is your call. My recommendation: make
  `/privacy` indexable. It is a one-word change in each file.

---

## 3. What I did **not** check, and where you may still be exposed

Being honest about the gaps matters as much as the findings.

**I never got into the database.** Everything I say about the live database is
read from the four `.sql` files in this repo, not from the database itself. The
migrations are applied **by hand**, so the real schema could have drifted —
there could be an extra permission, a policy, or a view that was added in the
dashboard and never written down. The checks in `005` will surface any of that.

**I could not see your Vercel settings.** I know no rate limiting exists *in the
code*. I cannot see whether a firewall rule, bot protection, or spend cap
already exists in your dashboard. Please check before assuming the worst.

**I could not verify my own header and guard fixes at runtime.** Starting a
local server was blocked, so those changes are type-checked and reviewed but not
observed working. This is exactly why they are on a branch — see §5.

**Nobody has checked whether anything outside this repo reads the contact
messages.** Contact-form messages are stored exactly as typed, which is correct
*as long as nothing displays them*. Nothing in the code does. But if you ever
wire those messages into an email digest, a dashboard, a Zapier automation, or
anything that renders them as HTML, a hostile message could attack whatever
displays it. **Ask this question again before connecting anything to that
table.**

**I did not check whether Google has already indexed the Goldman Sachs page.**
Only that it is eligible to be. After deleting it, it is worth searching
`site:blotterib.com` to see whether anything unexpected is listed.

**I did not check the four newest security advisories in an image library**
(`libvips`, via `sharp`). They are dated after my knowledge cutoff. I concluded
they cannot affect you because that library never receives any image from a
visitor on this site, which I did verify. The conclusion is sound; the
underlying advisory text is unread.

**Not examined at all:** TLS certificate configuration, whether either key has
ever leaked through a channel outside this repo (build logs, a screen share, a
chat paste), and whether the package registry accounts behind your dependencies
are trustworthy.

### Things that are fine — do not spend time here

Verified clean, so you can stop worrying about them: the Supabase master key is
not reachable from anyone's browser; no key was ever committed to git across all
305 commits; no email address reaches PostHog on any code path; session
recording and autocapture are switched off in production, so nobody is recording
strangers typing their email; all five `/review/*` pages really do tell search
engines to skip them; database queries cannot be injected; and there is no way
for one visitor to read another's data, because nothing in the app can read the
database at all.

---

## 4. Left open deliberately

**Film isolation.** The three films sit in frames with full access to the page
around them, so a hostile film could read the visitor's stored ID or post to the
API. I attempted the standard fix (`sandbox="allow-scripts"`) and tested it in a
browser: **the films render blank.** They need same-origin access to work, and
the version that keeps them working provides no real protection. The proper fix
is to serve the films from a separate domain, which is a bigger job than a
security patch. **The realistic risk today is low** — changing a film requires
access to this repository, and anyone with that already has everything.

**Content-Security-Policy.** The single most valuable header, and the easiest to
get wrong in a way that silently breaks the page. PostHog loads extra code at
runtime, Next.js injects inline scripts, and the films are inline-script
documents. It needs a session with the browser console open, not a blind change.

**Server-side internal-visitor flag.** Right now the browser tells the server
whether it is you. That is the wrong way round, but fixing it would break the
`?blotter_internal=1` flow you use across your devices. It is a design decision,
not a bug fix.

---

## 5. Why this is on a branch

`CURRENT-HANDOFF.md` says main is the only branch that matters, and normally
that is right. This is the exception, for one reason: **the header changes and
the API guard were never run.**

Preview protection is off, so this branch gets its own public URL. Open it and
confirm three things:

1. The homepage looks normal and **the hero film plays**.
2. Going through the funnel and entering an email still works.
3. The contact form still sends.

Then merge. If anything is wrong, the branch is thrown away and production was
never touched.

```bash
git checkout main && git merge --no-ff security-audit-fixes-2026-08-12 && git push origin main
```

---

## 6. Code changes in this branch

| File | Change |
|---|---|
| `web/lib/request-guard.ts` | **New.** Requires JSON content type, rejects bodies over 64 KB |
| `web/lib/analytics.ts` | Private-browsing visitors get a random ID instead of the shared `"anonymous"` |
| `web/app/api/lead/route.ts` | Guard wired in; `sticky` added to the CTA whitelist |
| `web/app/api/contact/route.ts` | Guard wired in; spam-trap reply now identical to a real success |
| `web/next.config.ts` | Four security headers added; no CSP, on purpose |
| `web/app/privacy/page.tsx` | Contact form disclosed; last-updated split from effective date; stale comment fixed |
| `supabase/005-lock-down-views.sql` | **New, not run.** Checks plus the view lockdown |

Type-check passes. Lint clean apart from one pre-existing warning. No dependency
was added, removed, or updated.
