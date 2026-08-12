import type { Metadata } from "next";
import Link from "next/link";

import { BlotterLockup } from "@/components/brand/blotter-mark";

import { CONTACT_EMAIL } from "@/lib/contact";

import { ContactForm } from "./contact-form";

/**
 * The contact page.
 *
 * Jon asked for it on August 11, 2026. The privacy policy already carries
 * `blotterib@gmail.com` in three places, but a mail address is a worse
 * instrument than a form: it assumes a configured mail client, it loses most
 * phone readers who use webmail, and it leaves no record anyone can count.
 * Both are offered here — the form for the reader, the address for anyone who
 * would rather use their own mail.
 *
 * **It takes `/privacy`'s shell rather than the landing page's.** Same header,
 * same 900px measure, same quiet ground. These are the page's two secondary
 * surfaces and they should read as one pair; wrapping this in the landing
 * page's bounded box and field gradient would make a form look like a section
 * of the argument.
 *
 * `noindex`, like every other route, until launch.
 */
export const metadata: Metadata = {
  title: "Contact | Blotter",
  description:
    "Ask a question about Blotter, suggest a question this page should answer, or get in touch about anything else.",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-quiet">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-[60px] max-w-[900px] items-center justify-between px-6">
          <Link
            href="/"
            aria-label="Blotter, back to the home page"
            className="text-navy-900"
          >
            <BlotterLockup size={22} />
          </Link>
          <Link
            href="/"
            className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            Back to Blotter
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-6 pt-16 pb-28">
        <h1 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
          Get in touch
        </h1>

        {/*
          The invitation is deliberately broad, and it names the FAQ suggestion
          explicitly because Jon did: *"you can ask a question or just contact.
          It can be about anything, a frequently asked question you suggest,
          just a general question."*

          Naming the three things a reader might want is what stops a blank box
          reading as "for complaints". A form with no prompt gets used by almost
          nobody who is merely curious, which is the group worth hearing from
          while this is still a test.
        */}
        <p className="mt-4 max-w-[58ch] text-lede leading-[1.6] text-ink-muted">
          Ask anything about Blotter, tell us a question this page should
          answer, or say something else entirely. Every message is read.
        </p>

        <div className="mt-10 max-w-[620px]">
          <ContactForm />
        </div>

        <hr className="mt-16 border-rule" />

        <p className="mt-8 max-w-[58ch] text-small leading-[1.6] text-ink-muted">
          Blotter is an early product being tested with recruiting candidates.
          If you are writing about something covered in the{" "}
          <Link
            href="/privacy"
            className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            privacy policy
          </Link>
          , quoting the section helps. Otherwise{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          reaches the same place.
        </p>
      </main>
    </div>
  );
}
