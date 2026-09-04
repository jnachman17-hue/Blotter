import type { Metadata } from "next";
import Link from "next/link";

import { Shell } from "@/app/setup/shared";

/**
 * Where Stripe sends someone after they pay.
 *
 * It deliberately does not confirm the purchase itself. The success URL is
 * reachable by anyone who edits the address bar, and the payment is only real
 * once the webhook has verified Stripe's signature. So this page says what
 * happens next and points at the check that reads the database.
 */
export const metadata: Metadata = {
  title: "Thank you | Blotter",
  robots: { index: false, follow: false },
};

export default function BillingDonePage() {
  return (
    <Shell>
      <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
        Thank you
      </h1>

      <div className="mt-6 max-w-[68ch] space-y-4 text-body leading-[1.65] text-ink-muted">
        <p>
          Your payment has gone through and Stripe has emailed you a receipt.
        </p>
        <p>
          <strong className="font-semibold text-ink">
            There is nothing to paste into your sheet.
          </strong>{" "}
          You named it before paying, so it is already attached to this purchase. Your
          tracker picks it up on its next run, within fifteen minutes, and you can carry on
          in the meantime.
        </p>
        <p>
          To see it now, open the <strong className="font-semibold text-ink">Blotter</strong>{" "}
          menu in your sheet and choose{" "}
          <strong className="font-semibold text-ink">Step 2: Run once now</strong>.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/billing"
          className="inline-flex min-h-12 items-center rounded-full bg-navy-900 px-7 text-body font-medium text-white transition-colors duration-150 ease-out hover:bg-navy-700"
        >
          Check this sheet
        </Link>
      </div>

      <p className="mt-8 max-w-[68ch] text-small leading-[1.55] text-ink-faint">
        If anything looks wrong, email blotterib@gmail.com and quote your Blotter ID from
        the Settings tab.
      </p>
    </Shell>
  );
}
