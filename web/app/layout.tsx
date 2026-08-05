import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

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
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} h-full`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
