-- Mark internal traffic in the leads table.
--
-- Run in the SQL Editor, same as the others.
--
-- Jon will click through his own funnel on the public domain more than any
-- real visitor will. Those runs have to be captured — otherwise there is no way
-- to confirm production lead capture actually works — but they are not demand,
-- and one fake lead in a small sample is a real distortion.
--
-- So they are marked, not dropped. A browser visiting `?blotter_internal=1`
-- once is flagged forever, and every row it produces carries `is_internal`.
--
-- **Exclude it whenever leads are counted or exported.** The `real_leads` view
-- below is the one to read from; querying `leads` directly will include Jon.

alter table public.leads
  add column if not exists is_internal boolean not null default false;

-- Partial index: the common query is "real leads, newest first", and there is
-- no reason to index the internal rows nobody counts.
create index if not exists leads_real_created_at_idx
  on public.leads (created_at desc)
  where is_internal = false;

-- Read this, not `leads`. Same columns, internal traffic removed.
create or replace view public.real_leads as
  select * from public.leads where is_internal = false;
