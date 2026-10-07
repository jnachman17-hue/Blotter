# Blotter

A networking tracker for investment banking recruiting that keeps itself up to date. It reads your Gmail and Google Calendar and fills in your contact tracker for you: who you're waiting on, how long it's been, how many times you've reached out, and when your next call is.

Live at [blotterib.com](https://blotterib.com).

Status: pilot. The site and signup funnel have been live and instrumented since August 2026. The Gmail and Calendar sync is built and was tested against a full real recruiting season.

## The problem

Recruiting for banking means hundreds of cold emails, calls and follow ups across dozens of firms, tracked by hand in a spreadsheet. The spreadsheet is only as good as the last time you updated it, and a missed follow up is a lost contact.

## How it works

The student keeps a Google Sheet. Blotter does the bookkeeping.

1. A small script, the "courier," lives inside the student's own Google account, attached to their sheet. It reads mail and calendar facts and sends them to Blotter's server.
2. The server decides. Every judgment lives there, not in the script: where each contact stands, how long it's been waiting, what counts as an attempt.
3. The courier writes the answer back into six columns: Status, Days waiting, Last contact, Attempts, Next call, Last call.
4. New people found in the student's email threads land in a Found tab for approval. Nobody is added automatically. Rejections are remembered and never suggested again.

## Design decisions

- Hard boundaries, enforced by both Google's permissions and the code. Read only on Gmail and Calendar. It never sends, drafts, labels or deletes mail, never opens an attachment, and never edits a calendar event. It writes only to Blotter's own columns and never touches a cell the student wrote.
- Fails safe. A failure before writing starts leaves the sheet untouched. A "Last successful run" timestamp makes a quiet failure visible.
- Columns are found by their header text, not their position, so students can insert and reorder columns freely.
- A thin client and a versioned contract. The courier is deliberately simple. Logic changes ship on the server without anyone reinstalling anything.
- Validation before backend. The landing page and funnel were built and instrumented first, to test demand before the sync was built. Internal traffic is filtered out of every reported number at the database level, so the funnel data is real.

## How it was built

Built by directing AI agents (Claude Code). I write the specs. The agents write the code against them.

The repo is set up so that works:

- [CLAUDE.md](CLAUDE.md) is the working agreement. The written specs are authoritative. Agent skills and outside convention can fill gaps but never override a spec. When they conflict, the agent has to surface the conflict rather than quietly pick a side.
- [The docs folder](blotter-ib-ws1/docs/) holds the specs, the decision log, the assumptions and open questions, the infrastructure runbook, a security audit and its findings, and handoffs between sessions.
- Verification against a known answer. The courier was run against my own full 2024 recruiting archive, and its output was checked against an answer key I already trusted. The courier also has [its own tests](courier/helpers.test.js).

Stack: Next.js and TypeScript, Supabase (10 versioned database migrations), Google Apps Script, Vercel, PostHog.

## Where things are

- web: the site, the signup funnel, and the server engine the courier calls
- courier: the script that runs in the student's Google account, plus the install guide and template spec
- supabase: database migrations, in order
- blotter-ib-ws1/docs: specs, decision log, runbook, security audit, handoffs
- blotter-ib-ws1/research: market and user research
- CLAUDE.md: the working agreement for every agent session
