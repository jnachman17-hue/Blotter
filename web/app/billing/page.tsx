import type { Metadata } from "next";

import { BillingLookup } from "./lookup-form";
import { sellingEnabled } from "@/lib/stripe";
import { Shell } from "@/app/setup/shared";

/**
 * `/billing`, and nothing on the site links to it.
 *
 * Not hidden for secrecy. It is here because the refusal notice the engine
 * writes into a blocked sheet carries this URL, and that link is the only way
 * out a blocked student is offered. A 404 at that moment would be the worst
 * screen in the product. So the page exists before the switch it serves.
 *
 * Nothing can be bought yet. Blotter is free, `BLOTTER_ENFORCE` is off, and
 * no payment has ever been taken. What this page does today is answer the one
 * question a student would arrive with: is my sheet known, and is it paid for.
 *
 * `noindex`: an unlinked page that sells nothing has no business in search
 * results, and a student who finds it before there is a price would only be
 * confused. Lift it when there is something to buy.
 */
export const metadata: Metadata = {
  title: "Your Blotter sheet | Blotter",
  description: "Check the status of a Blotter sheet.",
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return (
    <Shell>
      <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Your Blotter sheet
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          <strong className="font-semibold text-ink">Blotter is free right now.</strong> No
          payment has been taken from anyone, and there is nothing to buy on this page yet.
          When that changes, your sheet will tell you before anything is owed.
        </p>
        <p>
          If you have been sent here, it is to check one thing: whether this sheet is
          recognised, and whether it is paid for.
        </p>
      </div>

      {/* `selling` is off unless BLOTTER_SELLING is "on". Until then the
          lookup answers the question and nothing can be bought, which is the
          state the whole page is written for. */}
      <BillingLookup selling={sellingEnabled()} />

      <section className="mt-14 border-t border-rule pt-10">
        <h2 className="font-display text-[1.18rem] leading-[1.35] font-semibold tracking-[-0.012em] text-ink">
          Where to find your Blotter ID
        </h2>
        <div className="mt-4 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
          <p>
            Open your tracker and go to the{" "}
            <strong className="font-semibold text-ink">Settings</strong> tab. The row called{" "}
            <strong className="font-semibold text-ink">
              Your Blotter ID
            </strong>{" "}
            holds it. It is filled in on the first run, and you never type it yourself.
          </p>
          <p>
            The first eight characters are enough. The ID says which sheet is yours and
            nothing about you: not your name, not your email address, neither of which
            Blotter is ever given.
          </p>
        </div>
      </section>
    </Shell>
  );
}
