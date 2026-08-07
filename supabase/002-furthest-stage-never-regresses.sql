-- Stop `furthest_stage` going backwards.
--
-- Run this after 001, the same way: SQL Editor -> New query -> paste -> Run.
--
-- The client writes the lead more than once: at email capture, and again at
-- each later milestone, so an abandoner is still recorded and a finisher shows
-- as finished. Those writes are fire-and-forget and are not ordered, so the
-- `checkout` write can land after the `confirmed` write and overwrite it. The
-- row then understates how far the visitor got, which is the one thing the
-- column exists to record.
--
-- Ordering it on the client would only narrow the window. This makes it
-- impossible: the database keeps the highest stage it has ever seen for a
-- visitor, whatever order the writes arrive in.

alter table public.leads
  add column if not exists furthest_stage_index smallint not null default 0;

create or replace function public.keep_furthest_stage()
returns trigger
language plpgsql
as $$
begin
  -- A lower or equal stage arriving late must not undo a higher one.
  if new.furthest_stage_index <= old.furthest_stage_index then
    new.furthest_stage       := old.furthest_stage;
    new.furthest_stage_index := old.furthest_stage_index;
  end if;
  return new;
end;
$$;

drop trigger if exists leads_keep_furthest_stage on public.leads;
create trigger leads_keep_furthest_stage
  before update on public.leads
  for each row execute function public.keep_furthest_stage();
