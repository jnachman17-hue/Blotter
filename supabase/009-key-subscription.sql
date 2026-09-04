-- One more column, so a subscription can be renewed.
--
-- Paste into the Supabase SQL Editor and press Run. Idempotent.
--
-- ## Why
--
-- A one-time purchase is a single event: the key is issued and either never
-- expires or lapses on a fixed date. A subscription is a series. Each paid
-- invoice has to find the key it belongs to and push `entitled_until` out to
-- the end of the period just paid for.
--
-- An invoice carries the subscription id and nothing else that identifies us,
-- so the subscription id is recorded when the key is created. Without it a
-- renewal would have nothing to match and a subscriber would lapse a month
-- after paying, having paid again.

alter table public.blotter_keys
  add column if not exists stripe_subscription_id text;

create index if not exists blotter_keys_subscription
  on public.blotter_keys (stripe_subscription_id);

comment on column public.blotter_keys.stripe_subscription_id is
  'Set when a subscription checkout completes, so each renewal invoice can find the key and extend entitled_until.';
