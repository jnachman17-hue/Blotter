# Security audit brief

Date: August 11, 2026
Status: **Brief written. Audit not yet run.**

This is the prompt for a separate chat, agreed with Jon on August 11, 2026, the
day `blotterib.com` was indexed and opened to search. It is kept here rather
than only pasted into that chat so the scope, the boundaries and the two
rulings behind them survive.

Jon's two rulings, which shape it:

- **Live probing is permitted, non-destructive only.** Malformed payloads,
  oversized bodies and header inspection against production. No flood testing.
- **Git history is in scope, values never are.** A key committed once persists
  in history after deletion, which is the common way this goes wrong.

**Everything below the line is the prompt. Copy it whole.**

---

You are performing a security audit of a live production web application. You
are **read-only on the codebase**. You will not fix anything. You will find
things and report them.

## 1. Your boundaries — read this first, it is not negotiable

**Another chat is actively working in this repository.** A write from you
destroys its uncommitted work.

**You may not, under any circumstance:**

- create, edit, move or delete **any** file in the repository
- run `git add`, `git commit`, `git push`, `git stash`, `git checkout`,
  `git restore`, `git clean`, or any other command that writes to git state
- run `pnpm install`, `pnpm build`, or anything that writes to `node_modules`,
  `.next`, or a lockfile
- start a dev server. Port 3100 may be in use

**You may:**

- read any file in the repository
- run read-only git commands: `git log`, `git show`, `git grep`, `git diff`,
  `git rev-list`, `git cat-file`
- run read-only shell inspection: `grep`, `rg`, `find`, `cat`, `head`, `jq`
- make **non-destructive** HTTP requests to the live site (see §6)
- write scratch files **only** to your own temporary directory, never inside
  the repository

If you need to record intermediate findings, keep them in your context or in a
temp directory outside the repo. Your deliverable is a report in chat, not a
file.

## 2. What you are auditing

A Next.js 15 App Router application deployed on Vercel, live at
`https://blotterib.com`, indexed by search engines as of today.

**It is a demand-test landing page, not a product.** There is no login, no user
accounts, no payments processor, no OAuth implementation, and no product
behind it. The price screen quotes a figure and captures nothing. Treat claims
in the page copy as marketing, not as a description of implemented systems.

**What it actually does that carries risk:**

| | |
|---|---|
| Collects email addresses | into Supabase Postgres, via `POST /api/lead` |
| Collects free-text messages | into Supabase Postgres, via `POST /api/contact` |
| Sends analytics | to PostHog US Cloud, nine canonical events |
| Holds a `service_role` Supabase key | server-side, in Vercel env vars |
| Serves three self-contained HTML films | in `web/public/film/`, rendered in iframes |
| Exposes internal review routes | under `/review/*` |

**Stack:** Next.js (App Router, React Server Components), TypeScript, Tailwind
v4, `@supabase/supabase-js`, PostHog browser SDK. Package manager is `pnpm`.
Application root is `web/`.

## 3. Read these first

Start here, in this order. Do not begin probing before you have read them.

**The data path, which is where the real risk is:**

- `web/app/api/lead/route.ts` — email capture
- `web/app/api/contact/route.ts` — free-text capture, newest and least
  exercised
- `web/lib/supabase-admin.ts` — how the service key is loaded and guarded
- `supabase/001-leads.sql` through `supabase/004-contact-messages.sql` — the
  schema, RLS state and views, applied in order by hand

**Client-side data handling:**

- `web/lib/analytics.ts` — the event contract. **A stated rule of this project
  is that an email address must never reach an analytics event.** Verify it
  rather than trusting it
- `web/lib/internal-visitor.ts` — a flag set from a URL parameter and persisted
- `web/app/contact/contact-form.tsx` — the only form that posts free text
- `web/components/funnel/` — the funnel that captures email

**Configuration and exposure:**

- `web/app/layout.tsx` — metadata, indexing state
- `web/next.config.ts` (or `.js`/`.mjs`) — headers, redirects, image config
- `web/.env.example` — the names of every secret. **`.env.local` holds the
  values; you may confirm it is gitignored, but do not print its contents**
- `.gitignore`
- `web/package.json` — dependency surface

**Context, so you do not report intended behaviour as a defect:**

- `blotter-ib-ws1/docs/07-infrastructure-runbook.md` — what is provisioned,
  the internal-visitor flag, and why `real_leads` exists
- `CLAUDE.md`

Then read anything else you judge relevant. `web/components/` is large and
mostly presentational; skim it for the patterns in §4 rather than reading it
line by line.

## 4. What to look for

Work through these. For each, say explicitly whether you checked it and what
you found, **including when you found nothing** — a checklist with silent gaps
is worse than no checklist.

### 4.1 Secret exposure

- Is the Supabase `service_role` key reachable from the browser? Check the
  served HTML, the client JS bundles, and every `NEXT_PUBLIC_` reference.
- Is any secret referenced in a Client Component, or in a module a Client
  Component imports? **Next will inline a value into the bundle if it is
  reachable from `"use client"`.** This is the single highest-severity thing
  you can find here.
- Does anything log a secret, including in error paths?
- **Git history, all of it.** Was any key ever committed and later removed?
  Check deleted files and old commits, not just the working tree.
  `git log --all -p -S` on the variable names in `.env.example` is a starting
  point, not the whole job.
- **Report the file, the commit and the line. Never print a secret value, not
  even partially, not even redacted-looking.** If you find one, say where it is
  and stop.

### 4.2 The two API routes

- Input validation: types, lengths, missing fields, wrong types, deeply nested
  JSON, arrays where strings are expected, `__proto__` and `constructor` keys.
- Is there **any** rate limiting? Assume the answer is no and describe the
  consequence precisely: how many rows can an attacker write, how fast, and
  what does that cost or break.
- Request body size limits.
- Are the routes reachable by methods other than `POST`? What do `GET`, `PUT`,
  `DELETE`, `OPTIONS` return?
- CORS: can these be called from another origin?
- Do error responses leak internals — stack traces, table names, driver
  messages, key fragments?
- Is anything from user input interpolated into a query? Confirm the Supabase
  client is parameterising, and say how you confirmed it.

### 4.3 Database

- Is RLS enabled on both tables? Are there policies? The intent is **RLS on
  with no policies**, so the anon key can do nothing even if leaked. Verify the
  migrations actually achieve that.
- Is the anon key exposed anywhere, and does it matter given the above?
- Do the `real_leads` and `real_contact_messages` views leak anything the base
  tables do not?
- Can `is_internal` be set by an attacker to hide their rows from the views
  that are actually read? Trace where that flag comes from.

### 4.4 XSS and content injection

- Any `dangerouslySetInnerHTML`, and if so, is the input trusted?
- Contact messages are stored. Is stored content **ever rendered anywhere** —
  an admin view, an email, a log viewer? If it is never rendered, say so; if it
  might be later, flag it as a latent stored-XSS risk.
- The three film files in `web/public/film/` are large self-contained HTML with
  inline scripts, served same-origin and embedded in iframes. Are the iframes
  sandboxed? What could a compromise of one of those files do to the parent
  page? Consider that they are hand-maintained copies of files in `social/`.

### 4.5 Headers and transport

- What security headers does production actually return? Check
  `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options` or
  `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`.
- Is HTTPS enforced? Does `http://` redirect?
- Is the site framable by an arbitrary third party, and does that matter for a
  page whose CTA opens a modal?

### 4.6 Exposure and information disclosure

- `/review/hero`, `/review/ownership`, `/review/page-refresh`,
  `/review/sheet`, `/review/sheet-mobile` are public routes. Each sets
  `robots: { index: false }`. **Verify that is actually in the served HTML for
  every one of them** — the site-wide `noindex` was removed today and these now
  rely on their own metadata.
- Is `/privacy` indexable, and should it be?
- Are source maps served in production? Do they expose anything meaningful?
- Any `.env`, `.git`, backup or editor files reachable over HTTP?
- Does any build artefact under `web/public/` contain something it should not?

### 4.7 Dependencies

- Run a read-only audit of the dependency tree and report anything with a known
  advisory, with severity and whether the vulnerable path is actually reachable
  from this application's code. **Do not install or update anything.**
- Flag any dependency that is unmaintained, or that pulls a surprisingly large
  transitive surface for what it does.

### 4.8 Privacy and data handling

- Confirm that no email address is attached to any analytics event, in any code
  path including error paths. This is a stated project rule; verify it.
- What identifiers are persisted in the browser, under what keys, and for how
  long?
- Does `/privacy` describe what the application actually does with data? Report
  discrepancies as findings — a privacy policy that overstates protection is a
  real exposure.
- Is there any path by which one visitor could read another's data?

## 5. What is out of scope

Do not report these; they are known and deliberate:

- **No authentication.** There are no accounts. "Add auth" is not a finding.
- **No payments.** The price screen is copy.
- **The product's claims about Gmail, Calendar and Drive access.** No OAuth is
  implemented; nothing connects to Google. Copy accuracy is a separate review.
- **The site being publicly readable.** It is a landing page.
- **`noindex` having been removed.** That was a deliberate decision today.
- Generic advice with no specific finding attached. Every item in your report
  must point at a file, a line, an endpoint or an observed response.

## 6. Live probing — permitted, with limits

Jon has authorised **non-destructive** requests against `https://blotterib.com`.

**You may:**

- send malformed, oversized, wrong-typed and missing-field payloads to
  `/api/contact` and `/api/lead`
- try methods other than `POST` on both
- inspect response headers and status codes
- request paths that should not exist, to see how they fail
- fetch and inspect the served HTML, JS bundles and any source maps

**You may not:**

- flood or load-test. **A handful of requests per case, not hundreds.** The
  absence of rate limiting is to be demonstrated by reading the code and by a
  small number of successful writes, not by proving it at volume
- attempt to delete or modify existing rows
- attack Supabase or PostHog directly. The application is the target, not the
  vendors
- use any real person's email address in a test payload

**Every test write must set `"is_internal": true` in the payload**, and use an
address at `@blotterib.com` with `audit` in the local part, so the rows are
identifiable and excluded from the `real_*` views. **List every row you create
in your report** so it can be cleaned up.

## 7. How to report

Report in chat. Do not write a file.

**Order strictly by severity, worst first.** For each finding:

1. **What it is**, in one sentence.
2. **Where** — file and line, or endpoint and method.
3. **How you confirmed it.** A finding you reasoned about but did not verify
   must say so explicitly. Distinguish "I read the code and it appears" from "I
   sent this request and got this response."
4. **The concrete consequence.** Not "this could be exploited" but what an
   attacker actually gets: how many rows, what data, what breaks, what it
   costs.
5. **Severity**, with your reasoning. A missing header on a page with no
   authenticated session is not the same as a leaked write key.
6. **The fix**, described but **not applied**.

Then, separately:

- **What you checked and found clean**, as a list. This is as valuable as the
  findings and it is the part that usually gets skipped.
- **What you could not check**, and why. Anything requiring credentials you do
  not have, or a state you could not reach.
- **Every test row you wrote**, with the endpoint and the identifying email.
- The output of `git status --porcelain`, to demonstrate you modified nothing.

**Do not pad the report.** If the application is largely sound, say so plainly
and let the short list stand. A real audit that finds three things is more
useful than one that manufactures fifteen.
