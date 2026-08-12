-- Restamp `furthest_stage_index` after `waitlist` was inserted into the stage
-- order on August 12, 2026.
--
-- ⚠ NOT YET APPLIED. Run it the same way as the others — SQL Editor -> New
-- query -> paste -> Run — and **run part 1 first** so you can see what it is
-- about to change.
--
-- ## Why this exists
--
-- `lib/funnel-store.ts` holds the stage order, and a stage's index is its
-- position in that list. `waitlist` was inserted between `price` and
-- `checkout`, which pushes:
--
--     checkout    6 -> 7
--     confirmed   7 -> 8
--
-- Rows written before the change carry the old numbers. A row saying
-- `confirmed` with index 7 now reads, to anything that trusts the index, as
-- the new `checkout`.
--
-- ## This is cosmetic, and that was checked rather than assumed
--
-- **No real lead is affected.** Read on August 12, 2026 before writing this:
-- ten rows exist, and every row above index 4 is internal.
--
--     email       idx 4   internal=false   x4     <- the real leads
--     email       idx 4   internal=true    x1
--     confirmed   idx 7   internal=true    x5     <- the only rows this touches
--
-- So `real_leads` is untouched by this migration and every published figure
-- stays the same. It runs so the internal rows do not quietly misreport if
-- anyone ever reads the table directly.
--
-- Migration 002's trigger keeps the highest index a row has ever seen. That is
-- why this is an explicit restamp: a lower number cannot be written by the
-- application, and a *higher* one arriving later would be accepted silently.


-- ---------------------------------------------------------------- 1. Check
--
-- Run this first and keep the output. If any row here has is_internal = false,
-- STOP and say so — the assumption above no longer holds and this file needs
-- rewriting before it runs.

--   select furthest_stage, furthest_stage_index, is_internal, count(*)
--     from public.leads
--    where furthest_stage_index >= 6
--    group by 1, 2, 3
--    order by 2;


-- ----------------------------------------------------------------- 2. Fix
--
-- Set from the stage name rather than by adding one to the old number, so
-- running it twice cannot double-shift. Idempotent by construction.

update public.leads set furthest_stage_index = 8 where furthest_stage = 'confirmed';
update public.leads set furthest_stage_index = 7 where furthest_stage = 'checkout';
update public.leads set furthest_stage_index = 6 where furthest_stage = 'waitlist';

-- Stages at or below `price` are unchanged: closed 0, question_track 1,
-- question_window 2, film 3, email 4, price 5. Listed here so the full order is
-- recorded in one place alongside the three that moved.


-- --------------------------------------------------------------- 3. Verify
--
-- Re-run the check in part 1. Expected afterwards: no row reports `confirmed`
-- at 7, and `select count(*) from real_leads` is still 4.
