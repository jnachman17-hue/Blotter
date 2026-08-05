import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

/*
 * The display face, added August 5, 2026 after Jon twice flagged the type as
 * flat. Schibsted Grotesk was drawn for a news publisher, so it carries
 * editorial authority at large sizes and has real character in its terminals
 * and apertures, where Geist is deliberately neutral. It is a system decision,
 * not a one-off: it sets every headline and the Section 2 statement, and Geist
 * keeps the body and the interface.
 */
const displaySans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

/*
 * Roboto exists on this page for one reason: the Section 2 asset is a Gmail
 * surface and Gmail is set in Roboto. It is scoped to that component through
 * `--font-gmail` and is not part of the page's type system.
 */
const roboto = Roboto({
  variable: "--font-gmail",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blotter — the recruiting tracker that stays current",
  description:
    "Blotter updates the Google Sheet you already use by reading relevant recruiting activity from Gmail and Calendar, so you do not miss follow-ups, coffee chats, or next steps.",
  // WS5 deployment rule: private and unpublished throughout. Keep the page out
  // of indexes until the final simultaneous-launch authorization.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displaySans.variable} ${roboto.variable} h-full`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
