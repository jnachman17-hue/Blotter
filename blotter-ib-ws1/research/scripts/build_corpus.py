"""Build the WS9 Stage A corpus.

Inputs
  1. get_thread results that the MCP layer wrote to disk because they exceeded
     the tool-result size cap (full verbatim bodies, incl. html_body).
  2. supplement_stage_a.json - threads whose result did NOT exceed the cap and
     so was never written to disk. Bodies there are each message's own new
     text; quoted reply history is omitted.
  3. _calendar_recruiting.json - in-scope events from the jnachman17@gmail.com
     calendar.

Output
  corpus/contacts/<slug>.json, corpus/index.json, corpus/calendar.json

RULES OBSERVED
  - Attachments: filename and mimeType only. Attachment CONTENT is never read,
    fetched or stored. attachmentIds are dropped as noise.
  - Record, do not interpret: no state category is assigned to any contact.
  - Missing is a legitimate value and is written as null, never invented.
"""
import json, glob, os, re, html, collections

TR = ("/Users/jonathannachman/.claude/projects/"
      "-Users-jonathannachman-Documents-GitHub-Blotter-Claude/"
      "08fad89b-5bac-40cf-8d03-335c1416c5e1/tool-results")
ROOT = 'blotter-ib-ws1/research/corpus'
JON = 'jnachman17@gmail.com'
UTX = 'jnachman@utexas.edu'

# Threads read from the jnachman@utexas.edu mailbox in Stage B.
STAGE_B_THREADS = {
 '18d1a278885e8cd0','18d33af0ee7617f6','18d3908c14f7552e','18d2831f19e55e97','18d2835cf4e7f9a5',
 '18d1fe4be1135868','18d241f188e3c48a','18d19982e1fda671','18d56dd8d8c5e518','18d5724608ac6ffb',
 '18d5d7e1a17bb5e2','18d241d911df6645','18d24187bbb92508','18d1ab2a62e46654','18d19c48a680c2b8',
 '18d19bee85547c65','18d19b85298eaa06','18d1fa618a606fb4','18d243bc54342dec','18d5e094e9f83fb2',
 '18d5df88ffa42376','18d5defb8924ec0a','18d5df31eecb185c','18d5df457c604827',
}
def mailbox_of(tid):
    return UTX if tid in STAGE_B_THREADS else JON

# ---------------------------------------------------------------- thread -> contact
# One contact per person Jon actually had a recruiting relationship with.
# Threads that carry two contacts (an introducer and the banker) are listed
# under both; the message list is filtered per contact at write time only where
# the thread is genuinely about a different person.
CONTACTS = {
 'joseph-candelario':  dict(name='Joseph Candelario', firm='Piper Sandler (Simmons Energy)', title='Associate',
                            addrs=['joseph.candelario@psc.com'], threads=['18d15462568de901','18d1860cb14fbd7b','18d1f37a7163ac0d'],
                            opened='Cold email, Texas KA (fraternity) angle'),
 'micah-poag':         dict(name='Micah Poag', firm='Houlihan Lokey', title=None,
                            addrs=['mpoag@hl.com','MPoag@hl.com'], threads=['18d10ced6a9e70c7'],
                            opened='Resume sent directly; became a referral source'),
 'kate-borden':        dict(name='Kate Borden', firm='Houlihan Lokey', title='Financial Analyst',
                            addrs=['kate.borden@hl.com','Kate.Borden@hl.com'], threads=['18d18bd284cdd493','18d1e34c8a12e95e','18d1e35c96921376'],
                            opened='Cold email, Chadwick School alumni angle'),
 'douglas-melsheimer': dict(name='Douglas Melsheimer', firm='Barclays', title='Managing Director, Technology IB',
                            addrs=['douglas.melsheimer@barclays.com'], threads=['18d17ed90fec72f6'], party_filter=True,
                            opened="Introduced by Jon's father (dnachman@fastspring.com)"),
 'chris-miller':       dict(name='Chris Miller', firm='Citi', title='Managing Director / Vice Chairman, Energy IB',
                            addrs=['chris.miller@citi.com'], threads=['18d1d7c3597e5b8a','18d22cfc9808e8e9','18d229a963218f9e','18d22997be1fcb37'],
                            opened="Introduced by Jon's father; became the largest referral source of the season"),
 'carrie-cruces':      dict(name='Carrie Cruces', firm='Citi', title='Analyst, Global Energy Group',
                            addrs=['carrie.cruces@citi.com'], threads=['18d22cfc9808e8e9','18d241ba25acf9f4','18d32d1f8874a2ca'],
                            opened='Referred by Chris Miller'),
 'grey-bianca':        dict(name='Grey Bianca', firm='Mizuho', title='Analyst, Energy IB',
                            addrs=['Grey.Bianca@mizuhogroup.com'], threads=['18d22cbb43e09bf5','18d2406419fc6b6d'],
                            opened='Inbound; referred by Chris Miller via Chris Getz'),
 'carson-harris':      dict(name='Carson Harris', firm='J.P. Morgan', title='Analyst, Energy IB',
                            addrs=['carson.harris@jpmorgan.com'], threads=['18d23cf387a81adc','18d38c210dd28bf1'],
                            opened='Inbound; contact info passed along via referral'),
 'david-talbot':       dict(name='David Talbot', firm='Raymond James', title='Analyst, Energy IB',
                            addrs=['David.Talbot@raymondjames.com'], threads=['18d32d8554168836','18d3444ec540c8b9'],
                            opened='Inbound; resume forwarded by Sonu Johl via Chris Miller'),
 'grant-gillespie':    dict(name='Grant Gillespie', firm='Morgan Stanley', title='Analyst',
                            addrs=['Grant.Gillespie@morganstanley.com'], threads=['18d32dbd8a80bd39','18d3625b3395166e'],
                            opened='Inbound, unsolicited; fellow Longhorn'),
 'ethan-marnhout':     dict(name='Ethan Marnhout', firm='FT Partners', title='Analyst, Fintech',
                            addrs=['ethan.marnhout@ftpartners.com'], threads=['18d3900b05a25d95'],
                            opened='Cold email, referred by Josh Gumm'),
 'matt-manriquez':     dict(name='Matt Manriquez', firm='Morgan Stanley', title='Associate, IBD Houston',
                            addrs=['Matt.Manriquez@morganstanley.com'], threads=['18d51f2b7d4e1947','18d5638fc9498973'],
                            opened='Inbound first-round interview invitation'),
 'lynell-velten':      dict(name='Lynell Velten', firm='Houlihan Lokey', title='VP, CF Campus Recruiting',
                            addrs=['Lynell.Velten@hl.com'], threads=['18d5bca7d667683f'],
                            opened='Inbound from campus recruiting after resume was passed internally'),
 'sara-laracca':       dict(name='Sara Laracca', firm='Houlihan Lokey', title='Recruiting Analyst',
                            addrs=['Sara.Laracca@hl.com'], threads=['18d609c15bc39d59','18d6705867686e3a'],
                            opened='Inbound; scheduled the LA first round'),
                            addrs=['kyuzefpolsky@k1ops.com'], threads=['18d5d1a0972ec981','18d605da59905dbe','18d7bade0f441fe6','18dd3fb6ef808e40'],
                            opened='Inbound cold outreach from the firm',
                            scope_flag='SEE README: the brief excludes "K-1 and tax mail" by name. This is K1 Investment '
                                       'Management, a PE firm that recruited Jon, not a K-1 tax document. Included and '
                                       'flagged rather than silently dropped. Awaiting Jon\'s ruling.'),
 'ryan-wheeler':       dict(name='Ryan Wheeler', firm='Guggenheim', title='Analyst',
                            addrs=['ryan.wheeler@guggenheimpartners.com'], threads=['18d15f110fb6db53'], opened='Cold email, Texas KA angle'),
 'barbara-barman':     dict(name='Barbara Barman', firm='Goldman Sachs', title='Analyst',
                            addrs=['barman.barbara@gmail.com'], threads=['18d15f8323d56631'], opened='Cold email, PGN angle'),
 'olivia-henderson':   dict(name='Olivia Henderson', firm='Morgan Stanley', title='Analyst',
                            addrs=['Olivialeigh31@gmail.com'], threads=['18d160b970f41af6'], opened='Cold email, PGN angle'),
 'anna-giesler':       dict(name='Anna Giesler', firm='Rothschild & Co', title='Analyst',
                            addrs=['Anna.e.giesler@gmail.com'], threads=['18d160eb643a889e'], opened='Cold email, PGN angle'),
 'quincy-steele':      dict(name='Quincy Steele', firm='Morgan Stanley', title='Analyst',
                            addrs=['steelequincy@gmail.com'], threads=['18d161496aee5dc3'], opened='Cold email, PGN angle'),
 'alice-watts':        dict(name='Alice Watts', firm='Perella Weinberg Partners', title='Analyst',
                            addrs=['alicewatts419@gmail.com'], threads=['18d1618c801fe5e2'], opened='Cold email, PGN angle'),
 'noble-nash':         dict(name='Noble Nash', firm='Intrepid', title='Analyst',
                            addrs=['Noble.nash@me.com'], threads=['18d161ee11364e9a'], opened='Cold email, PGN angle'),
 'victoria-daly':      dict(name='Victoria Daly', firm='Goldman Sachs (London)', title='Analyst',
                            addrs=['victoriad@utexas.edu'], threads=['18d1626daabcbbf9'], opened='Cold email, PGN angle'),
 'kathryn-dzierzanowski':dict(name='Kathryn Dzierzanowski', firm='Cain Brothers', title='Analyst',
                            addrs=['kathryndzierzanowski@gmail.com'], threads=['18d1631c05dc81e3'], opened='Cold email, PGN angle'),
 'sam-susser':         dict(name='Sam Susser', firm='Goldman Sachs', title='Analyst',
                            addrs=['same@susser.us'], threads=['18d18b5453493b2e'], opened='Cold email, PGN angle'),
 'elliot-calkins':     dict(name='Elliot Calkins', firm='Guggenheim Securities', title='Associate, IB',
                            addrs=['Elliot.Calkins@guggenheimpartners.com','elliot.calkins@guggenheimpartners.com'],
                            threads=['18df629cb1adf518'], opened="Cold email, referred by Jon's twin brother Andrew"),
 'steve-mclaughlin':   dict(name='Steve McLaughlin', firm='FT Partners', title='CEO',
                            addrs=['steve.mclaughlin@ftpartners.com'], threads=['18da505200590986','18dc33d0fbf6a9dd','18da86cbcbfeaa10','18dae725d2e2066e'],
                            opened="Introduced by Jon's father"),
 'paige-butters':      dict(name='Paige Butters', firm='Aeris Partners', title='Director of Operations',
                            addrs=['pgb@aerispartners.com'], threads=['18d8707ca8c88b93','18d8ec8ad9534f6c','18dec8e4bf88eff6','18df6b44f49dbb09','18e15a9d8b494747','18e1f319d9688866','18e2eb01b24eddec','18e6263c7bf30b98'],
                            opened='Cold email to the firm; Paige answered'),
 'marijoy-bertolini':  dict(name='Marijoy Bertolini', firm='Aeris Partners', title='VP, Talent and Human Resources',
                            addrs=['mjb@aerispartners.com','Marijoy.Bertolini@aerispartners.com','bm@aerispartners.com'],
                            threads=['18d869220d90d01e','18d870306f73048e','18df66aeebda31cd','18e7adb9abe872ba'],
                            opened='Cold email; first two address guesses both bounced'),
 'ben-dziedzic':       dict(name='Ben Dziedzic', firm='RBC Capital Markets', title='Analyst',
                            addrs=['ben.dziedzic@rbccm.com'], threads=['18ec54bf34ccbd7c'],
                            opened="Cold email, referred by Jon's brother Jared"),
 'emily-saunders':     dict(name='Emily Saunders', firm='Harris Williams', title='Analyst Recruiter',
                            addrs=['esaunders@harriswilliams.com'], threads=['18ec107c0057b5e6'], opened='Cold email to the recruiter'),
 'sean-hussey':        dict(name='Sean Hussey', firm='FT Partners', title=None,
                            addrs=['sean.hussey@ftpartners.com','Sean.Hussey@ftpartners.com'], threads=['18ef3e4e7373be13'],
                            opened='Thank-you note only; the call that preceded it has no calendar event and no prior email'),
 'bradley-cagle':      dict(name='Bradley Cagle', firm='FT Partners', title='Analyst',
                            addrs=['Bradley.Cagle@ftpartners.com'], threads=['18ef21a5ee21fbc6'],
                            opened='Purely inbound congratulation after the offer; no prior contact'),
 'grace-steelman':     dict(name='Grace Steelman', firm='Barclays', title='Analyst, Tech',
                            addrs=['grace.steelman@barclays.com'],
                            threads=['18d17ed90fec72f6','18d7a06e8dc2306d','18d7a02d7de89fb3'], party_filter=True,
                            opened='Referred by Doug Melsheimer. The ENTIRE relationship lives inside the Gmail thread '
                                   '18d17ed90fec72f6, whose subject is "Potential favor" and which was started by Jon\'s '
                                   'father about a different banker. See corpus/README.md, "One thread, five relationships".'),
 'jay-klein':          dict(name='Jay Klein', firm='Barclays', title='Analyst, Tech',
                            addrs=['jay.klein@barclays.com'], threads=['18d17ed90fec72f6'], party_filter=True,
                            opened='Referred by Doug Melsheimer. Entire relationship lives inside the "Potential favor" thread.'),
 'kleopatra-kirkland': dict(name='Kleopatra Kirkland', firm='Barclays', title='Executive Assistant, Global Technology Group',
                            addrs=['kleopatra.kirkland@barclays.com'],
                            threads=['18d17ed90fec72f6','18d186926c1a0f54','18d186fa177e935b'], party_filter=True,
                            opened="Doug Melsheimer's assistant; did the actual scheduling"),
 'gary-horton':        dict(name='Gary Horton', firm='Intrepid', title=None, addrs=['horton@intrepidfp.com'],
                            threads=['18d2831f19e55e97','18d335857a5cd119'],
                            opened='Referred by John Sellingsloh. Outbound is NOT in this mailbox - see missing_outbound'),
 'will-robinson':      dict(name='Will Robinson', firm='Intrepid', title='Analyst', addrs=['Robinson@intrepidfp.com'],
                            threads=['18d2835cf4e7f9a5','18d32dafce4f29ab'],
                            opened='Referred by John Sellingsloh. Outbound is NOT in this mailbox - see missing_outbound'),
 'mathew-young':       dict(name='Mathew (Mat) Young', firm='Citi', title='Analyst, Power', addrs=['mathew.young@citi.com'],
                            threads=['18d332f300b19767'], opened='Referred by Carrie Cruces'),
 'nick-gerstein':      dict(name='Nick Gerstein', firm='Citi', title='Analyst, M&A', addrs=['ngerstein99@gmail.com','NGerstein99@gmail.com'],
                            threads=['18d1fe4be1135868','18d310cc6682d747','18d2ee690c885bae'],
                            opened="Referred by Miranda's brother. Outbound is NOT in this mailbox - see missing_outbound"),
 'lonnie-kauppila':    dict(name='Lonnie Kauppila', firm='Houlihan Lokey', title=None, addrs=['Lonnie.Kauppila@hl.com'],
                            threads=['18d94d171c639c3c'], opened='Assigned as the Houlihan LA first-round interviewer'),

 # ---- Stage B: jnachman@utexas.edu ----
 'joshua-gumm':        dict(name='Joshua Gumm', firm='FT Partners', title='Analyst, Tech',
                            addrs=['joshua.gumm@ftpartners.com','Joshua.Gumm@ftpartners.com'],
                            threads=['18d1a278885e8cd0'],
                            opened="Cold email, referred by Jon's brother Jared. THE most consequential relationship "
                                   "of the season: this call produced the Ethan Marnhout referral, which produced the "
                                   "FT Partners application, which produced the offer Jon accepted. It lives entirely "
                                   "in the utexas account and appears nowhere in gmail."),
 'kevin-stephens':     dict(name='Kevin Stephens', firm='Houlihan Lokey', title='MD, Financial Sponsors',
                            addrs=['kstephens@hl.com','KStephens@hl.com'], threads=['18d33af0ee7617f6'],
                            opened="Cold email via his daughter Zoe, a friend of Jon's. Ended by referring Jon "
                                   "internally to Tyler Martinez, who 'will make sure you get an interview'."),
 'danny-shin':         dict(name='Danny Shin', firm='Houlihan Lokey', title='Financial Analyst',
                            addrs=['danny.shin@hl.com','Danny.Shin@hl.com'], threads=['18d3908c14f7552e'],
                            opened='Cold email, referred by Kate Borden (a gmail-account contact)'),
 'john-sellingsloh':   dict(name='John Sellingsloh', firm='Intrepid', title='VP, Energy',
                            addrs=['sellingsloh@intrepidfp.com','Sellingsloh@intrepidfp.com'],
                            threads=['18d241f188e3c48a'],
                            opened='Met in person at a UT campus event, 2024-01-18. Became the referral hub for Intrepid.'),
 'sam-ward':           dict(name='Samuel Ward', firm='Houlihan Lokey', title='Restructuring, New York',
                            addrs=['SPWard@hl.com','spward@hl.com'], threads=['18d19982e1fda671'],
                            opened='Cold email using an address supplied by Micah Poag in the gmail account'),
 'maura-vestal':       dict(name='Maura Vestal', firm='Houlihan Lokey', title='Senior Campus Recruiter',
                            addrs=['Maura.Vestal@hl.com'], threads=['18d56dd8d8c5e518'],
                            opened='Inbound; routed Jon to the FR campus recruiting shared mailbox'),
 'mike-giaquinto':     dict(name='Mike Giaquinto', firm='Leerink', title='MD, Health Care',
                            addrs=['mike.giaquinto@leerink.com'], threads=['18d1ab2a62e46654'],
                            opened='Family friend, first spoken to in June 2023. Two outbounds, zero inbounds — '
                                   "but the relationship progressed by phone through Jon's mother."),
 'michael-liou':       dict(name='Michael Liou', firm='Guggenheim', title='Associate',
                            addrs=['Michael.liou@guggenheimpartners.com'], threads=['18d19c48a680c2b8'],
                            opened='Cold email, Texas angle'),
 'nicholas-perez':     dict(name='Nicholas Perez', firm='Guggenheim', title='Analyst, Power/Utilities/Renewables',
                            addrs=['nicholas.perez@guggenheimpartners.com'], threads=['18d19bee85547c65'],
                            opened='Cold email, Texas angle'),
 'luke-skelly':        dict(name='Luke Skelly', firm='Guggenheim', title='Associate, Tech',
                            addrs=['lukes5061@gmail.com'], threads=['18d19b85298eaa06'],
                            opened='Cold email to a personal address, LSE and Texas angle'),
 'turner-gauntt':      dict(name='Turner Gauntt', firm='Jefferies', title='Analyst, Tech',
                            addrs=['tgauntt@jefferies.com'], threads=['18d1fa618a606fb4'],
                            opened='Cold email, Texas angle'),
 'keaton-cruzcosa':    dict(name='Keaton Cruzcosa', firm='Piper Sandler', title='Analyst, Energy',
                            addrs=['Keaton.cruzcosa@psc.com'], threads=['18d243bc54342dec'],
                            opened='Referred by Joseph Candelario on a call held in the GMAIL account'),
 'jessica-luft':       dict(name='Jessica (Jess) Luft', firm='Bank of America', title='HR / Campus',
                            addrs=['jessica.luft@bofa.com'], threads=['18d24187bbb92508','18d241d911df6645'],
                            opened='Met in person at a UT networking event, 2024-01-18'),
 'kammeh-valliani':    dict(name='Kammeh Valliani', firm='Jefferies', title='Associate',
                            addrs=['kvalliani@jefferies.com'], threads=['18d5e094e9f83fb2'],
                            opened='Cold email, Texas angle'),
 'kyle-gunnison':      dict(name='Kyle Gunnison', firm='Raymond James', title='Director',
                            addrs=['Kyle.Gunnison@raymondjames.com'], threads=['18d5df88ffa42376'],
                            opened='Cold email to a senior banker, explicitly asking to be routed to an analyst'),
 'sean-kang':          dict(name='Sean Kang', firm='Stifel', title='Analyst (unconfirmed)',
                            addrs=['sean.kang@stifel.com','kang.s@stifel.com','s.kang@stifel.com'],
                            threads=['18d5defb8924ec0a','18d5df31eecb185c','18d5df457c604827'],
                            opened='Three address guesses in 3 minutes 38 seconds. All three bounced. Never reached.'),
 'owen-sherry':        dict(name='Owen Sherry', firm='Houlihan Lokey', title='Restructuring banker, New York',
                            addrs=[], threads=[],
                            opened='A completed call with NO email address anywhere in either mailbox and NO calendar '
                                   'invite. Booked by a shared recruiting mailbox on his behalf; he phoned Jon directly. '
                                   'Evidenced only by a confirmation email naming him and a solo calendar block Jon typed. '
                                   'Recorded as a contact because the call demonstrably happened.'),
 'gayathri-ravi':      dict(name='Gayathri Ravi', firm='Goldman Sachs', title='Recruiting', addrs=['Gayathri.Ravi@gs.com'],
                            threads=['18d94eacfae08858'], opened='Jon reported an impersonation scam to Goldman recruiting'),
}

# Firm-side / process threads that are not one person's relationship.
FIRM_THREADS = {
 'ft-partners-process': dict(label='FT Partners - application, interviews, super day, offer',
     threads=['18e520c565fbb783','18e5cbb25290802e','18e805ab63b9e84f','18e76f06c6ae3f43','18e7bd1d24a71dfa',
              '18e9b42927ecbdde','18e9b853b537d836','18ed3c29c5843f07','18ed3a6a2aacf5a7','18ee7428909c8560',
              '18eafe21f17ade9f','18eafe3187a2aa6d','18eb015e0368678f','18e9b536702e6775']),
 'wells-fargo-process': dict(label='Wells Fargo - application, video interview, first round, withdrawal',
     threads=['18eb03a799ad4481','18ecf646aa41f32b','18eed2a3967defb2','18e37dbd2dc969c0','18e37c66b732e713']),
 'barclays-process':    dict(label='Barclays - application status', threads=['18ec4b3231fbada0','18ebf3d89c07dea0']),
 'bofa-process':        dict(label='Bank of America - application', threads=['18ebeb05f11a3468','18de6e5510c5fd90','18de6d5c989217aa']),
 'citi-process':        dict(label='Citi - application status inquiry (bounced)', threads=['18ec5537db918d3f']),
 'agc-partners':        dict(label='AGC Partners - cold application email', threads=['18ebaecfb7cfb36e']),
 'union-square':        dict(label='Union Square Advisors - cold application email', threads=['18ecf3a300f09e45']),
 'houlihan-rx-process': dict(label='Houlihan Lokey NY Restructuring - shared-mailbox recruiting process',
     threads=['18d56dd8d8c5e518','18d5724608ac6ffb','18d5d7e1a17bb5e2']),
 'piper-sandler-ats':   dict(label='Piper Sandler - applicant tracking acknowledgement', threads=['18d28c00a8dc8131']),
}

# ---------------------------------------------------------------- load sources
def strip_html(s):
    if not s: return None
    s = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<br\s*/?>', '\n', s, flags=re.I)
    s = re.sub(r'</p>', '\n', s, flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return re.sub(r'\n{3,}', '\n\n', s).strip()

threads = {}          # thread_id -> list[message dict]
source_of = {}        # thread_id -> 'spilled' | 'supplement'

for f in sorted(glob.glob(TR + "/*get_thread*.txt"), key=os.path.getmtime):
    d = json.load(open(f))
    msgs = []
    for m in d['messages']:
        body = m.get('plaintextBody') or strip_html(m.get('htmlBody'))
        msgs.append(dict(
            message_id=m['id'], date=m['date'], internal_date=m.get('internalDate'),
            direction='outbound' if 'SENT' in (m.get('labelIds') or []) else 'inbound',
            sender=m.get('sender'), to=m.get('toRecipients') or [], cc=m.get('ccRecipients') or [],
            subject=m.get('subject'), labels=m.get('labelIds') or [],
            attachments=[{'filename': a.get('filename'), 'mimeType': a.get('mimeType')} for a in (m.get('attachments') or [])],
            has_attachment=bool(m.get('attachments')),
            body=body, body_source='verbatim_full',
            source_mailbox=mailbox_of(d['id']),
        ))
    msgs.sort(key=lambda x: x['internal_date'] or '')
    threads[d['id']] = msgs
    source_of[d['id']] = 'spilled'

sup_threads = []
for _sf in ('supplement_stage_a.json', 'supplement_stage_a2.json', 'supplement_stage_b.json'):
    sup_threads += json.load(open('blotter-ib-ws1/research/scripts/' + _sf))['threads']
for t in sup_threads:
    if t['thread_id'] in threads:      # spilled copy is richer; keep it
        continue
    msgs = []
    for m in t['messages']:
        msgs.append(dict(
            message_id=m['id'], date=m['date'], internal_date=None,
            direction='outbound' if 'SENT' in m.get('labels', []) else 'inbound',
            sender=m['from'], to=m.get('to', []), cc=m.get('cc', []),
            subject=m.get('subject'), labels=m.get('labels', []),
            attachments=m.get('attachments', []), has_attachment=bool(m.get('attachments')),
            body=m.get('body'), body_source='own_text_only_quoted_history_omitted',
            bounce=m.get('bounce'), note=m.get('note'),
            source_mailbox=mailbox_of(t['thread_id']),
        ))
    msgs.sort(key=lambda x: x['date'])
    threads[t['thread_id']] = msgs
    source_of[t['thread_id']] = 'supplement'

# Threads seen in the search sweeps but never body-fetched. Metadata recorded so
# the corpus does not silently lose them; body_captured is false and says why.
METADATA_ONLY = {
 '18d1e34c8a12e95e': ('New Time Proposed: Kate - Jonathan Houlihan IB Call','Kate.Borden@hl.com','2024-01-18T20:13:07Z','inbound'),
 '18d1e35c96921376': ('Accepted: Kate - Jonathan Houlihan IB Call','Kate.Borden@hl.com','2024-01-18T20:14:12Z','inbound'),
 '18d241ba25acf9f4': ('Accepted: Invitation: Carrie - Jonathan Citi IB Call @ Mon Jan 22, 2024 2pm - 2:30pm (CST) (carrie.cruces@citi.com)','carrie.cruces@citi.com','2024-01-19T23:43:19Z','inbound'),
 '18d2406419fc6b6d': ('Accepted: Grey - Jonathan Mizuho IB Call','Grey.Bianca@mizuhogroup.com','2024-01-19T23:19:09Z','inbound'),
 '18d3444ec540c8b9': ('Accepted: David - Jonathan RJ IB Call','David.Talbot@raymondjames.com','2024-01-23T03:02:18Z','inbound'),
 '18d3625b3395166e': ('Accepted: Grant - Jonathan Morgan Stanley IB Call','Grant.Gillespie@morganstanley.com','2024-01-23T11:47:32Z','inbound'),
 '18d32dafce4f29ab': ('Accepted: Will - Jonathan Intrepid IB Call','Robinson@intrepidfp.com','2024-01-22T20:27:02Z','inbound'),
 '18d335857a5cd119': ('Accepted: Gary - Jonathan Intrepid IB Call','horton@intrepidfp.com','2024-01-22T22:44:00Z','inbound'),
 '18d332f300b19767': ('Accepted: Invitation: Mat - Jonathan Citi NY IB Call @ Fri Jan 26, 2024 2pm - 2:30pm (CST) (mathew.young@citi.com)','mathew.young@citi.com','2024-01-22T21:58:58Z','inbound'),
 '18d310cc6682d747': ('Accepted: Nick - Jonathan Citi IB Call @ Fri Jan 26, 2024 10am - 10:30am (CST) (jnachman17@gmail.com)','ngerstein99@gmail.com','2024-01-22T12:02:17Z','inbound'),
 '18d2ee690c885bae': ('Accepted: Nick - Jonathan Citi IB Call @ Thu Jan 25, 2024 10am - 10:30am (CST) (jnachman17@gmail.com)','ngerstein99@gmail.com','2024-01-22T02:01:17Z','inbound'),
 '18d5638fc9498973': ('Accepted: Matt - Jonathan Morgan Stanley 1st Round','Matt.Manriquez@morganstanley.com','2024-01-29T17:16:25Z','inbound'),
 '18d7a06e8dc2306d': ('Accepted: Grace - Jonathan Barclays IB Call','grace.steelman@barclays.com','2024-02-05T16:07:56Z','inbound'),
 '18d7a02d7de89fb3': ('Accepted: Grace - Jonathan Barclays IB Call @ Thu Feb 8, 2024 10:30am - 11am (CST) (jnachman17@gmail.com)','calendar-notification@google.com','2024-02-05T16:03:42Z','inbound'),
 '18d32d1f8874a2ca': ('FW: UT Austin 2025 Summer Analyst Information Session','carrie.cruces@citi.com','2024-01-22T20:17:12Z','inbound'),
 '18d605da59905dbe': ('Katrina/Jonathan: K1 Intro','kyuzefpolsky@k1ops.com','2024-01-31T16:19:58Z','inbound'),
 '18dd3fb6ef808e40': ('Connecting You With Finn Warren (Applied to K1)','jnachman17@gmail.com','2024-02-23T00:00:00Z','outbound'),
 '18da86cbcbfeaa10': ('Steve McLaughlin/Jonathan Nachman intro','liz.ream@ftpartners.com','2024-02-14T00:00:00Z','inbound'),
 '18dae725d2e2066e': ('Steve McLaughlin/Jonathan Nachman intro','liz.ream@ftpartners.com','2024-02-15T00:00:00Z','inbound'),
 '18d94d171c639c3c': ("Enjoyed Yesterday's Conversation",'jnachman17@gmail.com','2024-02-10T21:06:14Z','outbound'),
 '18d28c00a8dc8131': ('Thank You','applicant@psc.com','2024-01-20T21:20:49Z','inbound'),
 '18d8ec8ad9534f6c': ('Thank you for applying to Aeris Partners','pgb@aerispartners.com','2024-02-09T16:55:01Z','inbound'),
 '18dec8e4bf88eff6': ('Coffee Chat with Aeris Partners','pgb@aerispartners.com','2024-02-27T21:52:37Z','inbound'),
 '18df6b44f49dbb09': ('Technical Interview with Aeris Partners','pgb@aerispartners.com','2024-02-29T00:00:00Z','inbound'),
 '18e2eb01b24eddec': ('Industry-Specific / Behavioral Interview with Aeris Partners','pgb@aerispartners.com','2024-03-11T00:00:00Z','inbound'),
}
REASON = ('Not body-fetched in Stage A. These are calendar-notification and acknowledgement '
          'messages whose body is a meeting-invite block or a legal disclaimer with no '
          'informational content; the authoritative meeting facts are in calendar.json. '
          'Fetch with get_thread if a later pass needs the body.')
for tid, (subj, sender, date, direction) in METADATA_ONLY.items():
    if tid in threads:
        continue
    threads[tid] = [dict(message_id=tid, date=date, internal_date=None, direction=direction,
                         sender=sender, to=[JON] if direction == 'inbound' else [], cc=[],
                         subject=subj, labels=[], attachments=[], has_attachment=None,
                         body=None, body_source='metadata_only', body_captured_reason=REASON,
                         source_mailbox=mailbox_of(tid))]
    source_of[tid] = 'metadata_only'

# ---------------------------------------------------------------- calendar
cal = json.load(open(ROOT + '/_calendar_recruiting.json'))
def cal_for(addrs):
    lo = {a.lower() for a in addrs}
    return [e['event_id'] for e in cal
            if any((a['email'] or '').lower() in lo for a in e['attendees'])]

# ---------------------------------------------------------------- write contacts
os.makedirs(ROOT + '/contacts', exist_ok=True)
index = []
for slug, c in CONTACTS.items():
    seen_msg, tlist = set(), []
    for tid in c['threads']:
        msgs = threads.get(tid)
        if not msgs:
            tlist.append(dict(thread_id=tid, capture='NOT CAPTURED', messages=[]))
            continue
        if c.get('party_filter'):
            lo = {a.lower() for a in c['addrs']}
            keep = [m for m in msgs
                    if {(m['sender'] or '').lower()} & lo
                    or lo & {x.lower() for x in (m['to'] or [])}
                    or lo & {x.lower() for x in (m['cc'] or [])}]
        else:
            keep = [m for m in msgs if m['message_id'] not in seen_msg]
            for m in keep: seen_msg.add(m['message_id'])
        tlist.append(dict(thread_id=tid, capture=source_of[tid],
                          shared_thread=bool(c.get('party_filter')),
                          subject=next((m['subject'] for m in keep if m.get('subject')), None),
                          messages=keep))
    allm = [m for t in tlist for m in t['messages']]
    ev = cal_for(c['addrs'])
    nout = sum(1 for m in allm if m['direction'] == 'outbound')
    nin = len(allm) - nout
    rec = dict(
        slug=slug, name=c['name'], firm=c['firm'], title=c['title'],
        addresses_seen=c['addrs'],
        relationship_opened=c['opened'],
        source_mailbox=sorted({m['source_mailbox'] for m in allm}) or [JON],
        stage=('A+B' if len({m['source_mailbox'] for m in allm}) > 1 else
               ('B' if allm and allm[0]['source_mailbox'] == UTX else 'A')),
        scope_flag=c.get('scope_flag'),
        counts=dict(threads=len(tlist), messages=len(allm), outbound=nout, inbound=nin,
                    calendar_events=len(ev)),
        first_activity=min([m['date'] for m in allm], default=None),
        last_activity=max([m['date'] for m in allm], default=None),
        calendar_event_ids=ev,
        missing_outbound=(nout == 0),
        missing_outbound_note=("No outbound to this contact exists in jnachman17@gmail.com. "
                               "Both mailboxes have now been read."
                               ) if nout == 0 else None,
        threads=tlist,
    )
    json.dump(rec, open(f'{ROOT}/contacts/{slug}.json', 'w'), indent=1, ensure_ascii=False)
    index.append({k: rec[k] for k in
                  ('slug','name','firm','title','addresses_seen','counts','first_activity',
                   'last_activity','missing_outbound','scope_flag')} | {'file': f'contacts/{slug}.json'})

# firm-level process files
for slug, f in FIRM_THREADS.items():
    tlist, seen_msg = [], set()
    for tid in f['threads']:
        msgs = threads.get(tid)
        if not msgs:
            tlist.append(dict(thread_id=tid, capture='NOT CAPTURED - metadata held in '
                              '02-LEARN-STAGE-A.md thread inventory only', messages=[]))
            continue
        keep = [m for m in msgs if m['message_id'] not in seen_msg]
        for m in keep: seen_msg.add(m['message_id'])
        tlist.append(dict(thread_id=tid, capture=source_of[tid],
                          subject=next((m['subject'] for m in keep if m.get('subject')), None),
                          messages=keep))
    allm = [m for t in tlist for m in t['messages']]
    rec = dict(slug=slug, name=f['label'], firm=None, title=None, addresses_seen=[],
               relationship_opened='Firm-level recruiting process, not a single person',
               source_mailbox=sorted({m['source_mailbox'] for m in allm}) or [JON],
               stage=('B' if allm and allm[0]['source_mailbox'] == UTX else 'A'),
               record_type='firm_process',
               counts=dict(threads=len(tlist), messages=len(allm),
                           outbound=sum(1 for m in allm if m['direction'] == 'outbound'),
                           inbound=sum(1 for m in allm if m['direction'] == 'inbound'),
                           calendar_events=0),
               first_activity=min([m['date'] for m in allm], default=None),
               last_activity=max([m['date'] for m in allm], default=None),
               threads=tlist)
    json.dump(rec, open(f'{ROOT}/contacts/{slug}.json', 'w'), indent=1, ensure_ascii=False)
    index.append({'slug': slug, 'name': f['label'], 'firm': None, 'title': None,
                  'addresses_seen': [], 'counts': rec['counts'],
                  'first_activity': rec['first_activity'], 'last_activity': rec['last_activity'],
                  'missing_outbound': rec['counts']['outbound'] == 0, 'scope_flag': None,
                  'record_type': 'firm_process', 'file': f'contacts/{slug}.json'})

index.sort(key=lambda r: r['first_activity'] or '9999')
json.dump(dict(
    stage='A+B', source_mailbox=[JON, UTX],
    window={'from': '2023-12-01', 'to': '2024-04-30'},
    generated_by='blotter-ib-ws1/research/scripts/build_corpus.py',
    totals=dict(
        records=len(index),
        person_contacts=len(CONTACTS),
        firm_process_records=len(FIRM_THREADS),
        messages=sum(r['counts']['messages'] for r in index),
        outbound=sum(r['counts']['outbound'] for r in index),
        inbound=sum(r['counts']['inbound'] for r in index),
        threads=sum(r['counts']['threads'] for r in index),
        calendar_events_in_scope=len(cal),
    ),
    records=index), open(ROOT + '/index.json', 'w'), indent=1, ensure_ascii=False)

json.dump(dict(stage='A+B', source_mailbox=[JON, UTX], calendar_id=JON,
               calendar_note='The jnachman@utexas.edu calendar was also read (during Stage A, when the '
                             'Calendar connector was still pointed at that account). It holds FOUR events in '
                             'the whole window and none are recruiting. Every recruiting event is in the gmail '
                             'calendar, including for relationships whose email lived only in utexas.',
               window={'from': '2023-12-01', 'to': '2024-04-30'},
               in_scope_count=len(cal),
               excluded_count=len(json.load(open(ROOT + '/_calendar_excluded.json'))),
               excluded_note='Classes, tutoring, flights, spring break and personal events. '
                             'Titles and start times only are kept in _calendar_excluded.json '
                             'so the scoping decision can be re-checked.',
               events=cal), open(ROOT + '/calendar.json', 'w'), indent=1, ensure_ascii=False)

t = json.load(open(ROOT + '/index.json'))['totals']
print("records", t['records'], "| messages", t['messages'],
      "| outbound", t['outbound'], "| inbound", t['inbound'],
      "| threads", t['threads'], "| calendar", t['calendar_events_in_scope'])
print("missing outbound:", [r['slug'] for r in index if r['missing_outbound']])
print("capture mix:", collections.Counter(source_of.values()))
