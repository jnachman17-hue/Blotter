-- One column, so a refund can find the key it paid for.
--
-- Paste into the Supabase SQL Editor and press Run. Idempotent.
--
-- ## Why
--
-- A purchase arrives as `checkout.session.completed` and carries a session id.
-- A refund arrives as `charge.refunded` and carries a payment intent id. They
-- are different identifiers for the same money, and Stripe does not put the
-- session id on the refund event.
--
-- Without this column the refund handler had nothing to match on, so a
-- refunded student would have kept working access: money returned and the
-- product still running. The payment intent is recorded at purchase, when both
-- ids are in hand, and matched at refund.

alter table public.blotter_keys
  add column if not exists stripe_payment_intent text;

create index if not exists blotter_keys_payment_intent
  on public.blotter_keys (stripe_payment_intent);

comment on column public.blotter_keys.stripe_payment_intent is
  'Recorded at purchase so a refund or dispute, which carries only this id, can find the key.';
