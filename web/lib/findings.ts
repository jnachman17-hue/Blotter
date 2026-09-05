/**
 * The public audit log: every finding an independent review has raised against
 * the published script, whether it was true, and what was done.
 *
 * ## Why it is public
 *
 * Jon's ruling, 5 September 2026: publish it in full, including the ones that
 * are embarrassing. The reasoning is the reasoning of the whole `/audit` page:
 * a list of problems that were found and fixed is worth more than a paragraph
 * saying there are none, and the first person to find something we left out
 * would stop believing the rest.
 *
 * ## The rule
 *
 * Nothing is deleted. A finding that turned out to be wrong stays, with the
 * reason, because the same wrong finding will be raised again. A finding that
 * was true and deliberately left alone stays, with the reason, because that is
 * the kind of decision a reader is entitled to disagree with.
 *
 * The private record with the code-level detail is
 * `38-AUDIT-FINDINGS.md`. This file is that record written for a stranger, and
 * the two must agree on every verdict.
 */

export type Verdict =
  /** True. Fixed in the script. */
  | "code"
  /** True. Fixed by changing what the site or the sheet says. */
  | "copy"
  /** True, and left as it is, for a reason given. */
  | "kept"
  /** Wrong, and the reason it will be raised again. */
  | "wrong";

export interface Finding {
  id: string;
  round: number;
  title: string;
  /** What the reviewer found, in plain English. */
  detail: string;
  raisedBy: string;
  verdict: Verdict;
  /** What was done, or why nothing was. */
  done: string;
  /** The script version it shipped in, where it did. */
  version?: string;
}

export interface Round {
  n: number;
  when: string;
  who: string;
  /** How many separate reviews this round was. Summed for the figures the pages print. */
  reviews: number;
  note: string;
}

export const ROUNDS: Round[] = [
  {
    n: 1,
    when: "5 September 2026, morning",
    who: "ChatGPT, run by the founder",
    reviews: 1,
    note: "Blotter had just been posted to r/UTAustin and the first substantive comment was a security objection. The founder pasted the published script into ChatGPT and asked whether the code matched the website. It had only the script, not the permissions file, which explains the one thing it got wrong.",
  },
  {
    n: 2,
    when: "5 September 2026, afternoon",
    who: "Four AI reviews we ran ourselves, on Claude",
    reviews: 4,
    note: "Run with the exact package the audit page puts on your clipboard, each given only what a stranger gets. Four separate sessions on two models, each asked in a different way. All four led with the same finding.",
  },
  {
    n: 3,
    when: "5 September 2026, evening",
    who: "Two more AI reviews on Claude, one told to re-check the fixes without trusting them",
    reviews: 2,
    note: "The review told to re-check the fixes found the worst thing in the whole day. Neither of the earlier rounds had raised it. Two of its findings, 3.5 and 3.6, raised 2.6 and 2.9 again and are recorded there, which is why the numbers skip.",
  },
];

export const FINDINGS: Finding[] = [
  /* ---------------------------------------------------------------- round 1 */
  {
    id: "1.1",
    round: 1,
    title: "The whole calendar was being sent, not just events with your contacts.",
    detail:
      "The script read every event on your calendar, a year back and six months ahead, and sent all of them to the server: titles, times and everyone invited. The server used the few that involved your contacts and threw the rest away, but the rest had already left your account. The website said, in two places, that the server receives events with your contacts.",
    raisedBy: "ChatGPT",
    verdict: "code",
    done: "Events are now filtered inside your sheet, before anything leaves. This was the finding that made the audit page exist.",
    version: "4.5",
  },
  {
    id: "1.2",
    round: 1,
    title: "Five values from the server reached your sheet without a formula check.",
    detail:
      "A cell that begins with = is a live formula. The server's answers were guarded against that in most places and not in five of them.",
    raisedBy: "ChatGPT",
    verdict: "code",
    done: "All five guarded. The guard had to be made aware of dates, because the simple version turned them into text and broke the Next call column.",
    version: "4.5",
  },
  {
    id: "1.3",
    round: 1,
    title: "The script's header said a failed run writes nothing. It can stop partway.",
    detail: "Once writing has begun, a failure leaves the sheet part-updated. The next run finishes the job, but the header claimed more than that.",
    raisedBy: "ChatGPT",
    verdict: "copy",
    done: "The header now says what happens.",
  },
  {
    id: "1.4",
    round: 1,
    title: "The privacy page called its list of what is sent complete, and it was not.",
    detail: "It left out the row number of each contact and the addresses you had rejected on the Found tab.",
    raisedBy: "ChatGPT",
    verdict: "copy",
    done: "Both added.",
  },
  {
    id: "1.5",
    round: 1,
    title: "The terms said Blotter was not open to other people.",
    detail: "It was, by then.",
    raisedBy: "ChatGPT",
    verdict: "copy",
    done: "Removed.",
  },
  {
    id: "1.6",
    round: 1,
    title: "The Gmail permission is full mailbox control.",
    detail:
      "The reviewer guessed the permission was https://mail.google.com/, which would let a script send, delete and change mail.",
    raisedBy: "ChatGPT",
    verdict: "wrong",
    done: "It is gmail.readonly, which cannot send, delete or change anything. The reviewer had only the script and not the permissions file, and a script that searches mail looks like a script that needs more. That is why every audit package now includes the permissions file, and why the Code page prints it.",
  },

  /* ---------------------------------------------------------------- round 2 */
  {
    id: "2.1",
    round: 2,
    title: "The switch for turning off usage counting did not turn it off.",
    detail:
      "The Settings cell says 'Clear this cell to switch it off.' Clearing it stopped counting on runs that worked. Runs that failed were still counted, to the default address, forever.",
    raisedBy: "Two of four reviews",
    verdict: "code",
    done: "Both paths now read the same cell. Sixteen automated checks make sure it stays that way.",
    version: "4.6",
  },
  {
    id: "2.2",
    round: 2,
    title: "The counting address was not checked at all.",
    detail:
      "The main server address was required to start with https. The counting address was not, so a value in that cell could have sent counts anywhere, unencrypted.",
    raisedBy: "One review",
    verdict: "code",
    done: "Counting can now only be sent to blotterib.com over https. Blank still means off.",
    version: "4.6",
  },
  {
    id: "2.3",
    round: 2,
    title: "Setting up the sheet added a formatting rule every time and never removed one.",
    detail: "Every Step 1 left another identical rule behind. A sheet set up a dozen times carried a dozen copies, which is slow and eventually hits Google's limit.",
    raisedBy: "One review",
    verdict: "code",
    done: "It removes its own rule before adding it.",
    version: "4.6",
  },
  {
    id: "2.4",
    round: 2,
    title: "Calendar events with no contact on them were still being sent.",
    detail:
      "After the first fix, an event was sent if any word in its title matched a contact's first name. Track someone called Sam and 'Dinner with Sam' left your account, with its full guest list, for the server to discard. A contact typed in as 'The Blackstone team' put the word 'the' on the match list and sent nearly the whole calendar.",
    raisedBy: "All four reviews",
    verdict: "code",
    done: "The sheet now runs exactly the same test the server does: the first name and the firm both have to appear in the title. A test runs both versions of the rule over 280 name-and-firm pairs and fails if they ever disagree.",
    version: "4.8",
  },
  {
    id: "2.5",
    round: 2,
    title: "The sheet's own diagnostics said Blotter is never given your email address.",
    detail: "Blotter → Check this sheet printed that your name and email address are never given to Blotter. Your addresses are sent on every run; that is how it tells your messages from theirs.",
    raisedBy: "Two reviews",
    verdict: "copy",
    done: "The sentence now says what is true: the Blotter ID is a random number made from nothing about you, and Blotter does have the addresses you typed into Settings. It never has your password.",
    version: "4.8",
  },
  {
    id: "2.6",
    round: 2,
    title: "Where your sheet sends data is an ordinary cell, and nothing showed it.",
    detail:
      "Settings → Server URL was checked only for starting with https. Setting up the sheet did not reset it, handing a sheet on did not clear it, and nothing in the sheet displayed it. Blotter is passed round by copying a sheet.",
    raisedBy: "Three reviews across two rounds",
    verdict: "code",
    done: "Blotter → Check this sheet now shows 'Sends to:' with the address, and says so plainly if it is not blotterib.com. The founder chose to show it rather than lock it, so a sheet can still be pointed at a test server on purpose.",
    version: "4.8",
  },
  {
    id: "2.7",
    round: 2,
    title: "'Every 15 minutes' was wrong for nine hours a day.",
    detail: "Between 10pm and 7am the script checks every two hours. The menu said so. The script header and the privacy page did not.",
    raisedBy: "Two reviews",
    verdict: "copy",
    done: "Both now say every 15 minutes through the day and every two hours overnight.",
  },
  {
    id: "2.8",
    round: 2,
    title: "The sheet can be restyled remotely, and nothing disclosed it.",
    detail:
      "When the server says a new design exists, the sheet fetches it. That can change colours and widths, and it can rewrite the text of the Start here tab, including the part that describes what Blotter can see. Nothing about you goes out on that connection.",
    raisedBy: "Two reviews",
    verdict: "copy",
    done: "Disclosed on the audit page as one of the things we already know. The description you read inside your sheet is something we can change, and the code cannot promise otherwise.",
  },
  {
    id: "2.9",
    round: 2,
    title: "The bounce exception was described more narrowly than it works.",
    detail:
      "The site said the one email Blotter opens is a delivery-failure notice from Google's mail system, and that only the address travels. The check is on the sender's name before the @ being mailer-daemon or postmaster, at any company, and every address found in the notice travels, not one.",
    raisedBy: "Two reviews, and two more in round 3",
    verdict: "copy",
    done: "The wording now says 'a mail system' and 'the addresses it finds'. The code stays as it is on purpose: a real bounce comes back from the recipient's mail server, not from Google, so restricting it to Google would break the Bounced status for every address at a company that does not use Google's mail.",
  },
  {
    id: "2.10",
    round: 2,
    title: "The list of what is sent was still not complete.",
    detail:
      "Missing: your own email addresses, the sheet's random id, the Blotter key, which row a contact is on, whether Closed is ticked, Gmail's own reference numbers, who organised an event, and who declined it.",
    raisedBy: "Three reviews",
    verdict: "copy",
    done: "The privacy page's third step now lists all of it. The Code page publishes the full shape, field by field, and the Status page links to it.",
  },
  {
    id: "2.11",
    round: 2,
    title: "Whole conversations are read, and nothing said so.",
    detail:
      "One message involving a contact pulls every message in that conversation. Somebody else copied in has their name, address and the subject line read and sent, even though they are not one of your contacts.",
    raisedBy: "All four reviews",
    verdict: "copy",
    done: "The privacy page and the audit page now say it. The wording in the script's own header is still being decided.",
  },
  {
    id: "2.12",
    round: 2,
    title: "'Blotter never touches a conversation that does not involve one of your contacts.'",
    detail: "False for calendar at the time, and 'touches' was doing more work than the code could defend for mail.",
    raisedBy: "All four reviews",
    verdict: "copy",
    done: "Now 'never opens'. Weaker on purpose: opens is what the code does.",
  },
  {
    id: "2.13",
    round: 2,
    title: "'Delete the spreadsheet and nothing of yours is left anywhere.'",
    detail: "The counting rows, a random id with run times and contact counts, outlive the sheet by design and are disclosed two paragraphs earlier.",
    raisedBy: "Three reviews",
    verdict: "kept",
    done: "Left as it is. The counting rows are disclosed in the same section, and none of them identifies a person.",
  },
  {
    id: "2.14",
    round: 2,
    title: "'There is no third party in the middle.'",
    detail: "Read plainly, blotterib.com is a party in the middle. The sentence meant no connection provider, and the next paragraph said so, and two reviews still tripped on it.",
    raisedBy: "Two reviews",
    verdict: "copy",
    done: "Now 'There is nobody else in this but Blotter. No connection provider, no data broker, no other company handling your mail on the way through.'",
  },
  {
    id: "2.15",
    round: 2,
    title: "'Every one of them is read-only apart from the spreadsheet.'",
    detail: "Two of the five permissions are not permissions on your data at all, and one of them is precisely what lets data leave your account.",
    raisedBy: "One review",
    verdict: "copy",
    done: "The privacy FAQ now names all five and what each one is for. The first draft of the audit page had made the same mistake and was corrected the same afternoon.",
  },
  {
    id: "2.16",
    round: 2,
    title: "'Your recruiting information lives in one place: your own spreadsheet.'",
    detail: "It travels to the server every run. Whether it is kept there cannot be proven; that it travels can be.",
    raisedBy: "One review",
    verdict: "copy",
    done: "Now 'is kept in one place', with a sentence saying the facts go to the server to be worked out and are not kept there.",
  },
  {
    id: "2.17",
    round: 2,
    title: "'It writes only to Blotter's own columns, never to a cell you typed in.'",
    detail: "When you tick Add? on the Found tab, Blotter writes a name and an email into the Name and Email columns, which are yours. Setting up the sheet also sets the font and row heights across your columns.",
    raisedBy: "Two reviews",
    verdict: "copy",
    done: "The header now says it never changes something you typed, fills its own columns, adds a row when you ask, and standardises font and row height throughout.",
    version: "4.8",
  },
  {
    id: "2.18",
    round: 2,
    title: "A refused run writes one line before it stops.",
    detail: "If the server refuses a run and sends a reason, the reason is written to the banner at the top of the Contacts tab. The header says a run that fails before writing leaves the sheet untouched.",
    raisedBy: "One review",
    verdict: "kept",
    done: "Left as it is. The one thing written is the notice telling you why, and nothing of yours is touched. The founder judged the sentence is about your data and is true of it.",
  },
  {
    id: "2.19",
    round: 2,
    title: "Use Google's headers-only Gmail permission instead.",
    detail: "There is a narrower Gmail permission that returns headers only and refuses bodies at Google's end. Using it would make 'cannot read the text' a limit Google enforces rather than a promise.",
    raisedBy: "One review",
    verdict: "wrong",
    done: "That permission forbids search queries, and searching for your contacts' addresses is the entire mechanism. There is no narrower permission that works. This one will be raised again by every reviewer who knows the permission exists, which is why the privacy FAQ now explains it.",
  },
  {
    id: "2.20",
    round: 2,
    title: "Handing a sheet on leaves the old owner's id behind.",
    detail: "The Clear-to-hand-on step blanks the id from the Settings tab but not from the script's own stored properties, so the next owner's runs would use the same id.",
    raisedBy: "One review",
    verdict: "wrong",
    done: "The script's own storage belongs to the script attached to that one spreadsheet. When you make a copy of the spreadsheet, the copy gets its own script with empty storage, so the id does not travel. The step tells you to make a copy and send that. It would be true only if somebody handed over the original sheet, which the flow does not ask for.",
  },
  {
    id: "2.21",
    round: 2,
    title: "The server address could redirect the request onward.",
    detail: "The request follows redirects, so an https server could bounce the data to a second address.",
    raisedBy: "Two reviews",
    verdict: "kept",
    done: "True of the mechanism and changes nothing: the destination is already whatever the Server URL cell says. Folded into 2.6.",
  },
  {
    id: "2.22",
    round: 2,
    title: "A fallback image formula leaves a remote-loading cell in the sheet.",
    detail: "If a picture on the Start here tab cannot be placed, an =IMAGE formula pointing at Blotter's own address is used instead, and it reloads whenever the sheet recalculates.",
    raisedBy: "One review",
    verdict: "kept",
    done: "True and harmless: the address is ours, and the quotation marks are removed from it before it goes into the formula, so it cannot turn into any other formula. The reviewer rated it low itself.",
  },

  /* ---------------------------------------------------------------- round 3 */
  {
    id: "3.1",
    round: 3,
    title: "A stranger could have run a formula in your sheet by getting suggested as a contact.",
    detail:
      "Names on the Found tab are guarded against formulas when they arrive. The guard is a leading apostrophe, which Google Sheets treats as a text marker rather than part of the value, so when you ticked Add? the name was read back bare and written into Contacts unguarded. A Found name is the display name off an email, which the sender chooses. So: email a conversation involving one of your contacts, put a formula in your own display name, wait to be suggested, and the student ticking Add? runs it in their own account.",
    raisedBy: "The review told to re-check the fixes",
    verdict: "code",
    done: "Guarded on the way into Contacts as well. Ten automated checks make sure it stays guarded in both places. This was the worst thing found in three rounds, and it was found by the review that was not looking for new problems.",
    version: "4.7",
  },
  {
    id: "3.2",
    round: 3,
    title: "Approving a suggested contact could blank your own notes.",
    detail: "Adding a contact wrote a whole row of empty cells with the name and email dropped in. 'The first free row' was only free of names and emails, so anything you kept below your last contact in a column of your own was wiped.",
    raisedBy: "One review",
    verdict: "code",
    done: "It writes the two cells it means to write and clears only Blotter's own columns on that row.",
    version: "4.7",
  },
  {
    id: "3.3",
    round: 3,
    title: "The counting switch still failed on one path.",
    detail: "After the first fix, the address started out as the default and was only replaced a few steps into the run, so a failure before that point would have sent a count the student had switched off.",
    raisedBy: "Both reviews, independently, quoting the same three lines",
    verdict: "code",
    done: "It starts out empty, which means off. The only runs given up are ones that died before the spreadsheet could be opened at all.",
    version: "4.7",
  },
  {
    id: "3.4",
    round: 3,
    title: "Ticking Closed does not stop Blotter reading that person's mail.",
    detail: "A closed contact's conversations are still fetched and sent every run. The sheet says Blotter leaves the row alone.",
    raisedBy: "One review",
    verdict: "kept",
    done: "The rules say a closed row keeps its history: the status reads Closed and the days show a dash, but last contact, attempts and the call dates are still worked out and shown. Stop reading their mail and those columns go blank, which the same rule forbids because a row of empty cells reads as broken. The disclosure point is fair, and it is on the audit page, row 2.4.",
  },
  {
    id: "3.7",
    round: 3,
    title: "The image fallback builds a formula from text.",
    detail: "Same mechanism as 2.22, raised again.",
    raisedBy: "One review",
    verdict: "kept",
    done: "The reviewer checked it and cleared it in the same breath. Recorded because it looks alarming and will be raised again.",
  },
];

/** How many separate reviews there have been. Summed from the rounds, never typed. */
export function reviewCount(): number {
  return ROUNDS.reduce((sum, r) => sum + r.reviews, 0);
}

/** The day the reviews ran, from the round dates, and whether every round fell on it. */
export function reviewDay(): { label: string; sameDay: boolean } {
  const days = [...new Set(ROUNDS.map((r) => r.when.split(",")[0].trim()))];
  const sameDay = days.length === 1;
  return { label: sameDay ? days[0] : `${days[0]} to ${days[days.length - 1]}`, sameDay };
}

/** The versions the fixes shipped in, lowest and highest, from the findings themselves. */
export function versionSpan(): { from: string; to: string } {
  const bySegments = (a: string, b: string) => {
    const as = a.split(".").map(Number);
    const bs = b.split(".").map(Number);
    for (let i = 0; i < Math.max(as.length, bs.length); i += 1) {
      const d = (as[i] ?? 0) - (bs[i] ?? 0);
      if (d !== 0) return d;
    }
    return 0;
  };
  const versions = [...new Set(FINDINGS.map((f) => f.version).filter((v): v is string => Boolean(v)))].sort(bySegments);
  return { from: versions[0] ?? "", to: versions[versions.length - 1] ?? "" };
}

/** The numbers the pages quote. Computed, so they cannot drift from the list. */
export function tally() {
  const by = (v: Verdict) => FINDINGS.filter((f) => f.verdict === v).length;
  return {
    raised: FINDINGS.length,
    fixedInCode: by("code"),
    fixedInWording: by("copy"),
    kept: by("kept"),
    wrong: by("wrong"),
    trueAndFixed: by("code") + by("copy"),
  };
}
