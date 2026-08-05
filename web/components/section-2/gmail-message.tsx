/**
 * The exact Section 2 consequence visual.
 *
 * Authority: 02-SECTION-2 section 10, which classifies
 * `ws5-assets/section-2/goldman-sachs-rejection-email-exact-v2.html` as a
 * formal exact asset rather than a directional one. This file is a direct
 * translation of that source into the project's component system, which
 * section 19 explicitly permits. Every dimension, colour and string below is
 * taken from the asset, not invented. Native size is 1180 by 560.
 *
 * CLAIM SAFETY, from section 10 and the asset README. This is an illustrative
 * designed scenario. It is not documentary evidence of a genuine Goldman Sachs
 * email, was not received by the case-study subject, and must never be
 * described as authentic in internal records, implementation discussion, or
 * public copy.
 *
 * The section 10 exclusions are binding here: no red rejection stamp, no
 * warning icons, no dramatic error effects, no extra messages, no three-email
 * sequence, no animation, no Blotter UI inside the Gmail view, and the sender,
 * recipient, recruiter name, subject and body are never rewritten. The body's
 * existing grammar is copied verbatim and must not be polished.
 */

import { GmailMark } from "@/components/google-marks";

/**
 * The asset's own dimensions.
 *
 * The window is resizable rather than fixed, because Jon ratified on August 5,
 * 2026 that the email renders as a *smaller Gmail window*, not a cropped one.
 * At 980 by 420 every element section 10 requires is still present, the folder
 * rail, the toolbar, the message, the footer actions and the application rail;
 * the window is simply the size a real Gmail window would be on a smaller
 * screen. Nothing is removed and nothing meaningful is cropped, which is what
 * section 15 protects.
 *
 * This replaced a uniform 0.95 scale of the native size, which left the email
 * at 1.9 times the area of the hero spreadsheet and inverted the page's
 * hierarchy. The hero is the largest object on the page.
 */
export const GMAIL_W = 1180;
export const GMAIL_H = 560;

/**
 * The ratified landing-page size.
 *
 * 512 is the measured floor, not a preference: at 980 wide the message body
 * wraps to four lines and the content needs 494px before the signature and the
 * Reply / Reply all / Forward actions start clipping. Going shorter would crop
 * meaningful content, which section 15 forbids. At this size the dead space
 * below the message is gone entirely and the application rail sits close to the
 * text, which is what Jon asked for.
 */
export const GMAIL_PAGE_W = 980;
export const GMAIL_PAGE_H = 512;

const FOLDERS = [
  "Starred",
  "Snoozed",
  "Important",
  "Sent",
  "Scheduled",
] as const;

/* ------------------------------------------------------------------ pieces */

function ToolbarSquare() {
  return <div className="mx-3 h-[13px] w-4 rounded-[2px] border-2 border-[#444746]" />;
}

function DotStack({ color = "#444746" }: { color?: string }) {
  return (
    <div className="mx-3 flex flex-col gap-[2px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[3px] w-[3px] rounded-full"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

/** Gmail's generated contact avatar: initials on a flat tint. */
function SenderAvatar() {
  return (
    <div
      aria-hidden="true"
      className="mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-medium text-[#2f3c4a]"
      style={{ background: "#7497c5", fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      GS
    </div>
  );
}

/* ------------------------------------------------------------------ window */

export function GmailMessage({
  width = GMAIL_W,
  height = GMAIL_H,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      className="gmail-type flex flex-col overflow-hidden bg-white text-[#1f1f1f]"
      style={{ width, height }}
    >
      {/* Top bar */}
      <div className="flex h-12 shrink-0 items-center gap-3 px-3">
        <div className="flex h-9 w-9 flex-col items-center justify-center gap-[3px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[2px] w-4 bg-[#5f6368]" />
          ))}
        </div>

        <div className="mr-[14px] flex items-center gap-[7px]">
          <GmailMark width={30} height={24} />
          <div className="text-[17px] tracking-[-0.2px] text-[#5f6368]">Mail</div>
        </div>

        <div className="flex h-[38px] max-w-[480px] flex-1 items-center gap-[10px] rounded-[19px] bg-[#f0f4f9] px-[14px]">
          <div className="h-[11px] w-[11px] shrink-0 rounded-full border-2 border-[#5f6368]" />
          <div className="text-[13px] text-[#5f6368]">Search mail</div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-[14px]">
          <div className="flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 border-[#5f6368] text-[11px] text-[#5f6368]">
            ?
          </div>
          <div className="grid grid-cols-[repeat(3,3px)] gap-[3px]">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="h-[3px] w-[3px] rounded-full bg-[#5f6368]" />
            ))}
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b57d0] text-sm font-medium text-white">
            D
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Folder rail */}
        <div className="flex w-[178px] shrink-0 flex-col gap-px pt-1 pl-1.5">
          <div className="mb-2 flex h-10 w-[108px] items-center gap-[9px] rounded-xl bg-[#c2e7ff] px-4 text-[13px] font-medium text-[#001d35]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#001d35" className="shrink-0" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Compose
          </div>

          <div className="flex h-[26px] items-center rounded-r-[13px] bg-[#d3e3fd] pr-[10px] pl-[18px] text-[13px] font-bold text-[#001d35]">
            <span className="flex-1">Inbox</span>
            <span>22,844</span>
          </div>

          {FOLDERS.map((f) => (
            <div
              key={f}
              className="flex h-[26px] items-center pr-[10px] pl-[18px] text-[13px]"
            >
              {f}
            </div>
          ))}

          <div className="flex h-[26px] items-center pr-[10px] pl-[18px] text-[13px]">
            <span className="flex-1">Drafts</span>
            <span>69</span>
          </div>
          <div className="flex h-[26px] items-center pr-[10px] pl-[18px] text-[13px]">
            All Mail
          </div>
          <div className="flex h-[26px] items-center pr-[10px] pl-[18px] text-[13px]">
            More
          </div>
        </div>

        {/* Opened message */}
        <div className="mr-1.5 mb-1.5 flex min-w-0 flex-1 flex-col overflow-hidden rounded-[14px] bg-[#f6f8fc]">
          {/* Message toolbar */}
          <div className="flex h-[42px] shrink-0 items-center px-3">
            <div className="mr-3 mb-0 ml-1.5 h-[14px] w-[14px] rotate-45 border-b-2 border-l-2 border-[#444746]" />
            <ToolbarSquare />
            <div className="mx-3 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#444746] text-[11px] font-bold text-[#444746]">
              !
            </div>
            <div className="mx-3 h-[15px] w-[13px] rounded-b-[2px] border-2 border-t-[3px] border-[#444746]" />
            <div className="mx-1.5 h-5 w-px bg-[#dadce0]" />
            <ToolbarSquare />
            <ToolbarSquare />
            <DotStack />
            <div className="flex-1" />
            <div className="mr-[10px] text-[12px] text-[#5f6368]">3 of many</div>
            <div className="mx-3 h-[9px] w-[9px] rotate-45 border-b-2 border-l-2 border-[#444746]" />
            <div className="mx-3 h-[9px] w-[9px] rotate-45 border-t-2 border-r-2 border-[#444746]" />
          </div>

          <div className="flex-1 overflow-hidden pr-5 pl-7">
            <div className="mb-[14px] flex items-center gap-[10px]">
              <div className="text-[18px] leading-[1.3] text-[#1f1f1f]">
                RE: First Round Interview Invitation · Deadline Passed
              </div>
              <div className="flex shrink-0 items-center gap-[5px] rounded-[3px] bg-[#e8eaed] px-[6px] py-[2px] text-[11px] text-[#444746]">
                Inbox <span className="text-[#80868b]">✕</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SenderAvatar />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <div className="text-[13px] font-bold">
                    Goldman Sachs Campus Recruiting
                  </div>
                  <div className="text-[12px] text-[#5f6368]">
                    &lt;campusrecruiting@goldmansachs.com&gt;
                  </div>
                  <div className="flex-1" />
                  <div className="text-[12px] text-[#5f6368]">
                    Wed, Jan 20, 8:07 AM (5 hours ago)
                  </div>
                  <div className="ml-3 text-[14px] text-[#5f6368]">☆</div>
                  <div className="ml-3 h-[10px] w-[13px] rounded-[2px] border-2 border-[#5f6368]" />
                  <div className="ml-3">
                    <DotStack color="#5f6368" />
                  </div>
                </div>

                <div className="mt-px text-[11px] text-[#5f6368]">
                  to david.solomon@gmail.com ▾
                </div>

                {/*
                  Verbatim from the asset. Section 10: "Copy the text exactly as
                  written in the asset, including its existing grammar and
                  punctuation. Do not silently edit, polish, shorten, or correct
                  the message."
                */}
                <div className="mt-5 max-w-[720px] text-[14px] leading-[21px] text-pretty text-[#1f1f1f]">
                  <p className="mb-[14px]">Hi David,</p>
                  <p className="mb-[14px]">
                    We are writing to let you know that we are moving forward
                    with other candidates for our Investment Banking Summer
                    Analyst 2028 program. We previously invited you to schedule a
                    first-round interview and asked that you select a time by
                    Wednesday at 5:00 PM ET and did not receive your selection
                    within the scheduling window.
                  </p>
                  <p className="mb-5">
                    Best of luck with rest of your recruiting process.
                  </p>
                  <p>Emily Carter</p>
                  <p>Campus Recruiting</p>
                  <p>Goldman Sachs</p>
                </div>

                <div className="mt-[22px] flex gap-2">
                  {[
                    { glyph: "↩", label: "Reply" },
                    { glyph: "↩↩", label: "Reply all" },
                    { glyph: "↪", label: "Forward" },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex h-[30px] items-center gap-[7px] rounded-[15px] border border-[#dadce0] px-4 text-[13px] text-[#444746]"
                    >
                      <span aria-hidden="true">{a.glyph}</span>
                      {a.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google application rail */}
        <div className="flex w-[42px] shrink-0 flex-col items-center gap-[18px] pt-2.5">
          <div className="box-border flex h-5 w-5 items-end justify-center rounded-[3px] border-t-4 border-[#1967d2] bg-[#1a73e8] pb-[2px] text-[9px] font-bold text-white">
            31
          </div>
          <div className="h-5 w-[18px] rounded-t-[9px] rounded-b-[3px] bg-[#fbbc04]" />
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#34a853]">
            <div className="-mt-[2px] h-1 w-2 -rotate-45 border-b-2 border-l-2 border-white" />
          </div>
          <div className="flex h-5 w-[18px] flex-col items-center gap-px">
            <div className="h-[9px] w-[9px] rounded-full bg-[#4285f4]" />
            <div className="h-2 w-4 rounded-t-lg rounded-b-[2px] bg-[#4285f4]" />
          </div>
          <div className="relative h-[15px] w-[22px] rounded-[3px] bg-[#ea4335]">
            <div className="absolute top-[3px] -right-[5px] border-y-4 border-l-[6px] border-y-transparent border-l-[#ea4335]" />
          </div>
          <div className="relative h-5 w-5">
            <div className="absolute top-[9px] left-0 h-[2px] w-5 bg-[#5f6368]" />
            <div className="absolute top-0 left-[9px] h-5 w-[2px] bg-[#5f6368]" />
          </div>
        </div>
      </div>
    </div>
  );
}
