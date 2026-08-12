-- Contact messages.
--
-- Run in the SQL Editor, same as the others. Never edit an applied file.
--
-- Jon asked for this on August 11, 2026: a place on the page to ask a question,
-- suggest an FAQ entry, or say anything at all. The privacy policy already
-- carries `blotterib@gmail.com`, but a mail link is a worse instrument than a
-- form — it demands the reader have a mail client configured, it loses everyone
-- on a phone with webmail, and it produces no record anyone can count.
--
-- **This is a separate table from `leads` on purpose.** A lead is the demand
-- signal the whole test exists to measure, and its row is keyed on `visitor_id`
-- and upserted so a repeat run updates rather than duplicates. A contact
-- message is correspondence: several from one person are several messages, not
-- one message revised. Putting them in `leads` would corrupt the count the test
-- turns on, which is the one number that must stay clean.

create table if not exists public.contact_messages (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),

  email        text not null,
  -- Optional. Asking for a name is friction on a form whose whole point is that
  -- it costs nothing to use.
  name         text,
  message      text not null,

  -- Which page the reader was on when they opened the form. Cheap to collect
  -- and the only way to tell a question about the privacy policy from a
  -- question about the product.
  source_path  text,

  -- Same identifiers the funnel carries, so a message can be tied to a session
  -- if it ever needs to be. Nullable: a reader who lands straight on /contact
  -- with analytics blocked still gets to send one.
  session_id   text,
  visitor_id   text,

  -- Matches `leads`. Jon will test this form on the live domain more than
  -- anyone else will, and those rows must not be counted as real correspondence.
  -- `?blotter_internal=1` sets it, per `07-infrastructure-runbook.md`.
  is_internal  boolean not null default false
);

-- Row-level security on with no policies, exactly as `leads` does it. The
-- browser never touches this table: `/api/contact` writes with the service_role
-- key, which stays on the server. RLS with no policies means the anon key can
-- do nothing here even if it leaks.
alter table public.contact_messages enable row level security;

-- The common query is "real messages, newest first". No reason to index the
-- internal rows nobody reads.
create index if not exists contact_messages_real_recent_idx
  on public.contact_messages (created_at desc)
  where is_internal = false;

-- Read this, not the table, for the same reason `real_leads` exists.
create or replace view public.real_contact_messages as
  select * from public.contact_messages where is_internal = false;
