# Building Sauce site: copy deck (SEO, GEO and SPIN copy, page by page)

Version 1, 7 Nov 2026. Built on the Design canvas mockup (Home, Facade, Mold, Gas, Roofing, Florida), Ahrefs and Treg keyword data pulled 7 Nov 2026, and the Building Sauce SEO and GEO research report (7 Nov 2026).

Placeholders in square brackets must be filled before a page goes in the sitemap. `[VERIFY]` means the fact is not confirmed from an official source yet.

---

## A. Decisions Andy needs to make before launch

| ID | Decision | Default used in this deck |
|---|---|---|
| D1 | Name Andy as author and founder on the site (stronger E-E-A-T, but links Andy to Building Sauce publicly, so Don and JP could find it before revenue) | Byline "Building Sauce research desk" until Andy says otherwise. About page has both versions |
| D2 | Founding offer for the first 5 firms | `[FOUNDING OFFER]` placeholder |
| D3 | Quiet-month rule: next month free if a month has no building worth a call | Included, marked `[CONFIRM]` |
| D4 | Shared list cap (mockup said up to five firms) | `[CAP]` placeholder. Exclusivity not advertised |
| D5 | Next feed after facade: garages (data checked 5 Nov) or mold (mockup said next) | Garages NEXT, mold PLANNED |
| D6 | Response to FieldClients (sells FISP and LL126 signals matched to the HPD owner or agent; public price shows both "from $99 a month" and "$2,000 a month") | Differentiate on proof and checks, keep $400. See section E, compare pages |

---

## B. Voice

- Plain, specific, a bit dry. Talks like an estimator, not a marketer.
- Records, not opinions: "the City filed it", never "this building needs work".
- Short sentences. US English. No em dashes, no exclamation marks.
- SPIN on every feed page: situation and problem first, then what it costs, then a question, then the product, then the price.
- Never promise jobs, appointments, a weekly count or exclusivity.

---

## C. Global elements

**Entity description (use word for word in home AnswerBlock, Organization schema, llms.txt, LinkedIn About):**
Building Sauce is a weekly lead feed for contractors. Each row is a New York City building with a dated public record that calls for work, plus the registered owner entity and managing agent. It is run by Antek Automation.

**Nav:** Feeds (Facade, Parking garages, Gas piping, Boilers, Mold, Roofing, Florida condos), How it works, Pricing, Guides. Button: Get a free list.

**Footer:**
Building Sauce is operated by Antek Automation, Chantry House, 38 Chantry Way, Andover SP10 1LZ, United Kingdom. hello@buildingsauce.com
Columns: Feeds | Guides (Local Law 11, FISP Cycle 10 deadlines, SWARMP vs Unsafe, Sidewalk shed rules, Local Law 152) | Data (FISP Unsafe filings, NYC sidewalk sheds) | Company (How it works, Pricing, About, Terms, Privacy)
Small print: Public records as filed. We report what the City published and when. We do not contact owners on your behalf.

---

## D. Phase 1 pages (live before Mon 30 Nov 2026)

### D1. Home `/`

- **Title:** NYC Construction Leads From Public Records | Building Sauce
- **Meta description:** Weekly lists of NYC buildings with a dated City filing that calls for work, plus the managing agent to call. Built for contractors. $400 a month.
- **Primary keyword:** construction leads nyc. Secondary: nyc construction leads from public records, contractor leads nyc
- **Schema:** Organization, WebSite
- **Internal links out:** facade feed, both data pages, Local Law 11 guide, how it works, pricing

**Hero**
Eyebrow: For contractors who sell to building owners
H1: Dated public proof a building needs work, and the name of who to call about it.
Sub: City filings, violations, permits and ownership records, matched by building and sent every Monday to the trade that fixes the problem. New York City first.
Buttons: Start with the facade feed | See all feeds
Microcopy: Free sample of last week's real list. No card, no call.

**AnswerBlock**
What is Building Sauce? Building Sauce is a weekly lead feed for contractors. Each row is a New York City building with a dated public record that calls for work, plus the registered owner entity and managing agent. It is run by Antek Automation and costs $400 a month per feed, month to month.
Last checked: [build date]. Source: our own pipeline, built on NYC Open Data and DOB NOW.

**The problem (DarkBand3, SPIN problem)**
Eyebrow: Why most lead lists disappoint
H2: Most leads tell you about a job after someone else has it.
1. **Permit feeds are late by design.** A permit means the owner already hired someone. You're reading about a job you lost.
2. **Bid boards are crowded.** If a project is on a bid board, so is every firm in your trade.
3. **Owner names go nowhere.** The deed says an LLC. The phone number on file rings a seller who left two years ago.

**What we do instead (DarkBand3, numbered, from mockup)**
01 **A record, with its date.** A facade filing, a violation, a permit that should exist and doesn't, a legal deadline. We quote the record and the date. We never say a building needs work. The City already did.
02 **A decider, checked.** The registered owner entity, managing agent and head officer from the public register, accepted only when the registration is newer than the last deed, so you aren't calling the seller.
03 **Every Monday, to the right trade.** One email, a CSV and a web page. Business contacts only. No portal, no appointments, no calls made on your behalf. You work the list.

**Need-payoff band**
H2: If you knew which buildings had a deadline and no contractor yet, who would you call first?
Body: That's the list. One trade, one trigger, one city, every Monday.

**Feeds grid**
Eyebrow: The feeds
H2: One feed per trade, each built on the record that trade sells against.

| Card | Tag | Copy | Link text |
|---|---|---|---|
| Facade | LIVE, NYC | FISP Unsafe and SWARMP filings and sidewalk sheds with no repair permit. For facade restoration and shed firms. Sub-cycle 10A closes Feb 21, 2027. | Get last week's list free |
| Parking garages | NEXT, NYC | Local Law 126 Unsafe and SREM conditions, with the owner on file. For concrete and garage restoration firms. Sub-cycle 1C runs to Dec 31, 2027. | Join the waitlist |
| Gas piping | 2027, NYC | Local Law 152 buildings due in 2027 (Community Districts 11, 12, 14, 15 and 17), with the registered agent. For licensed master plumbers. | Join the waitlist |
| Boilers | PLANNED, NYC | Buildings whose annual boiler inspection reported defects. For boiler and heating contractors. | Join the waitlist |
| Mold | PLANNED, NYC | Open mold violations in buildings covered by Local Law 61, which must use a licensed assessor and a separate licensed remediator. | Join the waitlist |
| Roofing | PLANNED, NYC | Buildings with open water-leak violations and no roof or waterproofing permit on file. | Join the waitlist |
| Florida condos | PLANNED, FL | Associations due a milestone inspection or past the reserve study deadline, with the management company on file. | Join the waitlist |
| Your trade, your city? | dashed card | If a public record in your city says a building needs your trade, we can probably build a feed on it. Tell us the record. hello@buildingsauce.com | |

**Data teaser (StatHero, from fisp.json)**
Eyebrow: From the data
Big number: {last_12_months.unsafe_initial}
Label: initial Unsafe facade filings in NYC in the last 12 months, as of {as_of}.
Link: See the weekly count by borough and sub-cycle

**TrustTriplet**
- **Check every row yourself.** Each row carries the record ID and date. Two minutes on the City's own site confirms it.
- **Business contacts only.** Registered agents, officers and office lines. No home addresses, no tenants, no complainants.
- **No lock-in.** Month to month. Start with a free sample of last week's list. Cancel by replying to any invoice.

**FAQ (FAQPage)**
- *Where does the data come from?* NYC Department of Buildings filings and permits, HPD registrations, ACRIS deeds and the City's PLUTO land use file, all public. See How it works.
- *Who is it for?* Contractors and service firms that sell repairs to building owners and managing agents. Each feed is built for one trade.
- *Do you sell leads nationally?* Not yet. New York City first. Florida condos are planned.
- *Is this a bid board?* No. Most rows are buildings with a legal reason to hire someone and no contractor on record yet.

---

### D2. Facade feed `/facade-restoration-leads` (cold email landing page)

- **Title:** Local Law 11 Leads for Facade Contractors | Building Sauce
- **Meta description:** Every Monday: NYC buildings with a new FISP Unsafe or SWARMP filing and no repair permit, plus the managing agent's office line. $400 a month.
- **Primary keywords:** local law 11 leads, fisp leads, facade restoration leads nyc. Secondary: local law 11 contractors leads, nyc facade leads, unsafe facade buildings nyc
- **Schema:** Service, Offer (400 USD, P1M), FAQPage, BreadcrumbList
- **Nav:** collapsed (logo plus CTA)

**Hero**
Eyebrow: Local Law 11 leads for NYC facade restoration contractors
H1: Every Monday: the NYC apartment buildings that just got an Unsafe facade filing, and the managing agent's name.
Sub: FISP filings, repair permits, sidewalk sheds and the HPD registration, joined building by building and checked against the last deed. In your inbox at 7am Eastern.
Buttons: Get last week's list free | See what's in each row
Microcopy: 10 real buildings from last week. Check every row on DOB NOW. No card, no call.

**SampleRowCard** (fill from a real, masked row before launch)
Label: ONE ROW FROM THE FEED. Chip: SCORE [N]/5
Title: [ADDRESS], [BOROUGH]
Fields: Trigger: FISP Unsafe filing, [DATE] | Sub-cycle: 10A, due Feb 21, 2027 | Repair permit: None on file | Sidewalk shed: Up [N] days | Owner entity: [OWNER LLC] | Managing agent: [NAME], [FIRM] | Office phone: [OFFICE NUMBER] | Size: [UNITS] units, [FLOORS] floors
Source line: Source: DOB NOW: Safety filing [ID]. HPD registration dated after the last deed. Public record as filed. We have not contacted this owner.

**AnswerBlock**
What is a Local Law 11 lead? NYC's Facade Inspection and Safety Program (FISP, often called Local Law 11) makes owners of buildings taller than six stories file a facade report each cycle. An Unsafe rating means repairs within 90 days and a sidewalk shed now. A Local Law 11 lead is that filing, dated, with the owner's managing agent attached.
Last checked: [build date]. Source: NYC DOB Facade Compliance page.

**The problem (DarkBand3)**
Eyebrow: The problem
H2: By the time you hear about an Unsafe filing, someone has already called the owner.
1. **You find out late.** DOB NOW publishes the filing. Nobody tells you. You see the shed go up on a job you could have bid.
2. **You don't know who to call.** The deed says an LLC. The registration might still name the seller. Finding the person who decides takes an afternoon.
3. **Someone has to chase it.** Checking filings, permits and registrations by hand is a day a week for an estimator, or it doesn't get done.

**What it costs (DeadlineRows, all from facts.ts)**
Eyebrow: What it costs
H2: The owner's clock is already running. The question is whose number is on the desk when it rings.
- **Feb 21, 2027.** Sub-cycle 10A closes for blocks ending in 4, 5, 6 or 9. A SWARMP condition left unfixed from Cycle 9 has to be filed as Unsafe.
- **90 days.** An Unsafe condition must be corrected within 90 days of filing. After that the owner pays $1,000 a month in civil penalties in the first year.
- **90-day sheds.** Shed permits issued or renewed since Feb 2, 2026 expire every 90 days and no longer renew automatically. From the second renewal, work has to happen in every permit period.
- **5, 8 and 24 months.** For facade sheds first permitted on or after Jan 12, 2026: construction documents in 5 months, permit application in 8, repairs finished in 2 years. Miss them and the penalties are $5,000, $10,000 and $20,000.
- Optional row, only once verified: **$10 to $200 per foot.** Idle shed penalty per linear foot per month by shed age. `[VERIFY against Admin Code 28-220.1]`
Source line: Sources: NYC DOB Facade Compliance page, 1 RCNY 103-04, 1 RCNY 102-07, Local Laws 48 and 51 of 2025. Penalties set by the City, not by us. Last checked [date].

**Need-payoff band**
Eyebrow: Worth asking
H2: If you had the filing, the permit status and the agent's office number on Monday morning, how many of those calls would you make?
Body: One extra facade job a year pays for the list many times over. We can't promise the job. We can promise you'll know about the building early, and who to ring.

**What you get (CapabilityTable)**
Eyebrow: What you get
H2: One email every Monday, 7am Eastern. A CSV and a web page. Nothing to log into.

| You said | Each row carries | From |
|---|---|---|
| "I find out late" | The Unsafe or SWARMP filing with its date, and new sidewalk sheds with no repair permit, within days of publication | DOB NOW: Safety, DOB permits |
| "I don't know who to call" | The registered owner entity, managing agent and head officer, business address and office phone. Registration accepted only if it post-dates the last deed | HPD registration, ACRIS |
| "Has someone already got it?" | Whether a repair permit exists and which firm filed it. No permit means no contractor on record | DOB NOW permits |
| "Which ones first?" | A 1 to 5 score from the sub-cycle deadline, filing class, shed age and permit gap, plus units, floors and year built | DOB, PLUTO |
| "Can I trust it?" | The record ID and date on every row. Check any of them on DOB NOW in two minutes | Public record |
| "What do I say?" | A suggested opening line for each building, based on its trigger and deadline | Building Sauce |

**TrustTriplet**
- **Business contacts only.** Agents, officers and office lines from the public register. No home addresses, no tenants.
- **Records, not opinions.** We report what was filed and when. You decide on site whether the job is real.
- **We don't contact owners.** The list is yours to work. No appointments sold, no calls made for you.

**PricingBand**
Eyebrow: Pricing
H2: $400 a month. Cancel any time. First list the Monday after you say yes.
Bullets:
- Weekly feed, all five boroughs, every building that meets the trigger that week
- Shared list, capped at [CAP] firms
- [FOUNDING OFFER]
- Quiet month rule: if a month has no building worth a call, next month is free [CONFIRM]
- No setup fee, no contract, pay by card
Small print: Start with last week's list, free. If it isn't worth $400 to you after you've phoned three rows, don't subscribe.

**LeadForm (sample)**
Title: Get last week's list free
Intro: 10 buildings with the full fields. Sent within one business day.
Fields: Your name | Firm | Work email | Phone (optional) | Borough you work most (select: Manhattan, Brooklyn, Queens, Bronx, Staten Island, All) | What you do (select: Facade restoration, Sidewalk shed or scaffold, Waterproofing, Other)
Button: Send me the list
Under button: Contractors only. One sample per firm. We'll send the list and one follow-up asking if it was useful. Nothing else unless you ask.

**FAQ (FAQPage)**
- *Can't I pull this from DOB NOW myself?* Yes. Every record is public. You're paying for the join across five datasets, the deed check on the agent, the permit check, and someone doing it every Monday so your estimator doesn't.
- *How is this different from a permit feed or a bid board?* A permit feed shows jobs someone already won. A bid board shows jobs everyone is bidding. This shows buildings with a filed Unsafe or SWARMP condition and no repair permit yet.
- *Is the managing agent the person who signs?* Not always. It's the registered agent or head officer on the HPD record, which is the right first call. You still have to sell the job.
- *How many buildings a week?* It depends on what the City publishes. Some weeks it's a handful, some weeks more. We'd rather send five real ones than fifty padded ones.
- *Do my competitors get the same list?* Up to [CAP] firms share each feed. We don't sell it beyond that.
- *Why a UK company?* Building Sauce is run by Antek Automation, a UK data and automation business. The records are New York's; the pipeline runs every Monday wherever we sit. Questions to hello@buildingsauce.com.
- *How do I cancel?* Reply to any invoice email. No notice period.

**Related links:** Local Law 11 guide, SWARMP vs Unsafe, Local Law 11 penalties, Sidewalk shed rules, FISP Unsafe filings data.

---

### D3. Free sample `/free-sample`

- **Title:** Free Sample: Last Week's NYC Facade Leads | Building Sauce
- **Meta:** Ten real NYC buildings from last week's facade feed, with filing dates, permit status and the managing agent. Free, once per firm, no card.
- **Schema:** WebPage, BreadcrumbList

H1: Get last week's list, free.
Sub: Ten real buildings from last week's facade feed, with every field the paid list carries. Watermarked, once per firm.
What you get (3 short rows): The filing and its date | The permit and shed status | The owner entity, managing agent and office line
What we ask: After you've looked at it, one reply: was each row useful, bad, or did you already know about it, and if so, from where. That's how we make the next list better.
Form: as D2.
Rules: Contractors and service firms only. One sample per firm. We don't share your details.

---

### D4. Pricing `/pricing`

- **Title:** Pricing: $400 a Month Per Feed | Building Sauce
- **Meta:** One feed, one trade, one city: $400 a month, month to month, paid by card. No setup fee, no contract. Start with a free sample of last week's list.
- **Schema:** Product (Building Sauce Facade Feed) with Offer, FAQPage

H1: One price per feed. $400 a month, month to month.
Sub: Price it against one job, not against other lead lists.

Table:
| Feed | Status | Price |
|---|---|---|
| Facade (NYC) | Live | $400 a month |
| Parking garages (NYC) | Next | Waitlist |
| Gas piping (NYC) | 2027 | Waitlist |
| Boilers, Mold, Roofing (NYC) | Planned | Waitlist |
| Florida condos | Planned | Waitlist |

Included: Weekly email at 7am Eastern every Monday, CSV, hosted web page, all five boroughs, record ID and date on every row, deed-checked decider, permit status, 1 to 5 score, suggested opening line.
Not included: Appointments, calls or emails to owners on your behalf, a login or portal, exclusivity, personal phone numbers or home addresses.
Terms: Card payment through Stripe. Billed monthly from the day you start. Cancel by replying to any invoice. [FOUNDING OFFER]. Quiet month rule [CONFIRM].
Button: Start the facade feed (Stripe link) | Get a free sample first

Need-payoff line under the table: What's a typical facade job worth to your firm? If one job a year covers the list, the rest is margin.

FAQ: Is there a contract? No. | Can I pause? Yes, cancel and restart when you want. | Do you invoice in USD? Yes. | Can I get a borough to myself? Not offered right now. Ask if it matters to you.

---

### D5. How it works `/how-it-works`

- **Title:** How Building Sauce Builds Each List: Sources and Checks
- **Meta:** The public NYC records behind every Building Sauce row, how we match them by building, how we check the decider, and the rules we won't break.
- **Schema:** WebPage with about and mentions

H1: How each list is built: the records, the checks, the rules.
AnswerBlock: Building Sauce joins public New York City records by building every week. A row only makes the list when a dated filing calls for work, no repair permit is on file, and the managing agent's registration is newer than the last deed. Every row carries the record ID so you can check it.

Steps (numbered):
1. **Pull the trigger records.** Facade filings from DOB NOW: Safety, published by the City on NYC Open Data and updated daily.
2. **Match by building.** Each filing is tied to its building and tax lot so permits, registrations and deeds line up.
3. **Check the job is open.** We look for a repair permit filed since the trigger. No permit, no contractor on record.
4. **Check the decider.** The HPD registration names the owner entity, managing agent and head officer. We accept it only when it's dated after the latest deed in ACRIS. If the building sold recently, the row says so.
5. **Score and size.** Deadline, filing class, shed age and permit gap make a 1 to 5 score. Units, floors and year built come from PLUTO.
6. **Filter.** We drop public owners (NYCHA, City agencies), small owner-occupied homes and individuals' home addresses.
7. **Deliver.** Monday 7am Eastern: one email, a CSV and a web page.

Sources (named, with links): NYC DOB Facade Inspection and Safety Program filings | DOB NOW approved permits | HPD building registrations and contacts | ACRIS real property records | NYC Department of City Planning PLUTO.
Freshness: DOB and HPD data update daily. ACRIS deeds can run about five weeks behind, so a very recent sale may not show yet.

What we never do: contact tenants or complainants; sell personal mobile numbers or home addresses; call owners for you; sell appointments; pitch renovation as a way to move tenants out; use logins, paid listing sites or LinkedIn scraping to build the feed.

---

### D6. About `/about`

- **Title:** About Building Sauce | Run by Antek Automation
- **Meta:** Building Sauce is a contractor lead feed built from public NYC records, run by Antek Automation, a UK data and automation business.
- **Schema:** AboutPage, Organization

H1: Who runs Building Sauce
Version A (D1 = yes, name Andy): Building Sauce is run by Andy Norman, founder of Antek Automation. Andy spent more than 30 years in field service, from engineer to service manager, selling repair work into buildings. Building Sauce is the list he wanted back then: which buildings have a reason to hire someone this week, and who to ask for.
Version B (default): Building Sauce is run by Antek Automation, a UK data and automation business. We build data pipelines and automation for service businesses. Building Sauce applies that to one question contractors ask every week: which buildings have a reason to hire someone, and who decides.
Both: Contact hello@buildingsauce.com. Operator details in the footer.

---

### D7. Thanks `/thanks` (noindex)

Sample: Thanks. Your sample goes out within one business day from hello@buildingsauce.com. If it lands in spam, mark it safe so next week's list doesn't.
Waitlist: You're on the [TRADE] waitlist. We'll email you once, when the first list is ready. No newsletters.

### D8. Terms and Privacy

Draft clauses to cover (lawyer check before paid launch): public-record data supplied as is, no warranty; subscriber responsible for their own outreach and its legal compliance (TCPA, CAN-SPAM, NY rules); no resale of the list; month-to-month billing and cancellation; liability cap; governing law `[DECIDE]`. Privacy: what the forms collect, processors (Cloudflare, host, n8n, GoHighLevel, Stripe), retention, contact email, no sale of personal data.

---

## E. Phase 2 and 3 pages

### E1. Waitlist feed pages (same SPIN template as D2, with waitlist form)

Form fields for all: Name, Firm, Work email, Borough or region, What you do (trade select). Button: Join the waitlist. Under button: One email when the first list is ready. Nothing else.

**Parking garages `/parking-garage-leads`** (NEXT)
- Title: Local Law 126 Garage Repair Leads, NYC | Building Sauce
- Meta: NYC parking garages with an Unsafe or SREM condition on file under Local Law 126, with the owner to call. For concrete and garage restoration firms.
- Keywords: local law 126 leads, parking garage repair leads nyc. Supports: local law 126 (200 / 11), local law 126 nyc (90 / 11)
- H1: NYC parking garages with an Unsafe or SREM condition on file, and who owns them.
- AnswerBlock: Local Law 126 makes NYC parking structure owners file a condition assessment each cycle, rated Safe, SREM or Unsafe. A SREM condition not repaired by the next cycle becomes Unsafe. Sub-cycle 1C, covering the Bronx, Queens and Staten Island, runs from Jan 1, 2026 to Dec 31, 2027.
- Problem: 1. The inspecting engineer usually designs the repair and runs the bid. If you hear about it from them, you're one of several. 2. Garage owners are LLCs and REITs; the right contact is buried. 3. Repairs get deferred until the next filing forces them.
- Implication rows: Dec 31, 2027 (1C closes) | SREM becomes Unsafe if unrepaired by next cycle | Unsafe repair window `[VERIFY: 90 days]`
- Proof stat: As of Nov 5, 2026, our count of DOB open data showed 1,550 garages with an active Unsafe or SREM filing status. (Status on file, not proof the repair is still open.)
- Need-payoff: What would it be worth to talk to the owner before the bid list is drawn up?

**Gas piping `/gas-piping-leads`** (2027)
- Title: Local Law 152 Leads for NYC Master Plumbers | Building Sauce
- Meta: NYC buildings due their Local Law 152 gas piping inspection in 2027, Community Districts 11, 12, 14, 15 and 17, with the registered agent. Join the waitlist.
- Keywords: local law 152 leads, gas piping inspection nyc (200 / 0)
- H1: The NYC buildings due a gas piping inspection in 2027, and who to call.
- AnswerBlock: Local Law 152 requires periodic gas piping inspections by a Licensed Master Plumber. Buildings in Community Districts 11, 12, 14, 15 and 17, in every borough, are due between Jan 1 and Dec 31, 2027. Owners get one 180-day extension per cycle.
- Problem: Every LMP in the city is chasing the same districts in the same year. Owners leave it late. Finding which buildings in your districts haven't booked yet is guesswork.
- Need-payoff: If you could book your 2027 inspections in the first quarter instead of the last, what would that do to your calendar?

**Boilers `/boiler-repair-leads`** (PLANNED)
- Title: NYC Boiler Repair Leads From Inspection Filings | Building Sauce
- H1: NYC buildings whose boiler inspection just reported defects.
- AnswerBlock: NYC boilers are inspected every year and the report is filed with DOB. When an inspection reports defects, the owner has to correct them and file proof `[VERIFY: 180 days]`. Our count shows about 100 buildings a week with a defect filing in 2026.
- Need-payoff: What would a steady list of buildings with a filed defect do for your service team's quiet weeks?

**Mold `/mold-remediation-leads`** (PLANNED)
- Title: NYC Mold Remediation Leads, Local Law 61 | Building Sauce
- Keywords: mold remediation leads (70 / 0)
- H1: NYC buildings with open mold violations that need a licensed assessor and remediator.
- AnswerBlock: Under Local Law 61 of 2018, mold over 10 square feet in buildings with 10 or more apartments, or 25,000 square feet or more of non-residential space, must be assessed and remediated by separate New York State licensed firms. The remediator files notice two days before work starts.
- Rule: rows come from violations; contacts are the owner and managing agent only, never tenants.

**Roofing `/commercial-roofing-leads`** (PLANNED)
- Title: Commercial Roofing Leads in NYC From Public Records | Building Sauce
- Keywords: commercial roofing leads (300 / 1, CPC $12), commercial roofing leads nyc
- H1: NYC apartment buildings with open leak violations and no roof permit on file.
- AnswerBlock: A commercial roofing lead from public records is a building where the City has recorded an open water-leak violation and no roofing or waterproofing permit has been filed since. Building Sauce plans a weekly NYC list of these, with the owner entity and managing agent.

**Florida condos `/florida-condo-leads`** (PLANNED)
- Title: Florida Condo Milestone Inspection and SIRS Leads | Building Sauce
- Keywords: florida milestone inspection (200 / 9), sirs florida (150 / 5), structural integrity reserve study (150 / 0)
- H1: Florida condo associations due a milestone inspection or past the reserve study deadline.
- AnswerBlock: Florida condo buildings three or more stories tall need a milestone inspection by Dec 31 of the year they turn 30, then every 10 years. Associations had to finish a structural integrity reserve study by Dec 31, 2025, or with a milestone inspection due by Dec 31, 2026, but never later.

### E2. Construction leads pillar `/construction-leads`

- Title: Construction Leads From Public Records: A 2026 Guide
- Meta: Where construction leads come from, what each type is worth, and how to find buildings with a legal reason to hire you before anyone else bids.
- Keywords: construction leads (700 / 4), leads for construction (1,300 / 7), contractor leads (700 / 6), leads for contractors (450 / 0), construction lead generation (400 / 5), commercial construction leads (200 / 0), how to find construction leads (150 / 11)
- H1: Construction leads: where they come from and which ones are still open
- AnswerBlock: Construction leads come from four places: bid boards, permit data, referral or pay-per-lead services, and compliance triggers. Bid boards and permits show jobs others already see or have won. Compliance triggers, such as a failed facade inspection, show buildings with a legal deadline and often no contractor yet.
- Outline: H2 The four types of construction leads (table: source, how early, how crowded, typical cost model) | H2 Why timing matters more than volume | H2 How to find compliance-trigger leads yourself (honest free method: NYC Open Data, DOB NOW, HPD; 5 steps) | H2 What to check before you call (open permit, deed vs registration, public owner) | H2 Where Building Sauce fits (one paragraph, CTA) | FAQ: Are free construction leads worth it? How do I get commercial construction leads? What's the best way to get construction leads as a subcontractor?

### E3. Data pages

**`/data/fisp-unsafe-buildings`**
- Title: NYC Unsafe Facade Filings (FISP), Updated Weekly
- Meta: How many NYC buildings filed an Unsafe or SWARMP facade report this cycle, by borough and sub-cycle, updated every week from DOB records.
- H1: NYC Unsafe facade filings, counted every week
- StatHero: {cycle10_initial.unsafe} initial Unsafe filings so far in FISP Cycle 10, as of {as_of}.
- AnswerBlock: As of {as_of}, NYC buildings had filed {cycle10_initial.unsafe} initial Unsafe and {cycle10_initial.swarmp} initial SWARMP facade reports in FISP Cycle 10. In the 12 months to {last_12_months.to}, {last_12_months.unsafe_initial} initial Unsafe reports were filed, about six a week. Source: DOB filings on NYC Open Data.
- Sections: By borough | By sub-cycle | Monthly trend | Method (initial filings only, deduplicated by building) | Limits (filing status, not proof of current condition; amended filings excluded) | Download aggregate CSV
- Context line (attributed): Habitat reported in Aug 2026 that 13.3% of filings in the latest cycle were Unsafe.

**`/data/nyc-sidewalk-sheds`**
- Title: NYC Sidewalk Sheds by Age: Weekly Count
- Keywords: sidewalk shed (700 / 0), sidewalk shed nyc (150 / 0), what is a sidewalk shed (90 / 2)
- H1: NYC sidewalk sheds, and how long they've been up
- AnswerBlock: A sidewalk shed is a covered walkway built over a sidewalk to protect people from work or a hazard above. In NYC, an Unsafe facade filing requires one. Since 2026, shed permits run 90 days and facade sheds face repair milestones at 5, 8 and 24 months.
- Until the shed pipeline runs: show the Habitat benchmark (7,859 sheds citywide, 372 up more than five years, Mar 2026, attributed) and keep the page out of the sitemap until own counts exist.

### E4. Guides (answer first, from facts.ts only)

**`/guides/local-law-11`** (pillar)
- Title: Local Law 11 (FISP) Explained: Rules, Deadlines, Penalties
- Meta: What NYC Local Law 11 requires, who it covers, how Safe, SWARMP and Unsafe ratings work, Cycle 10 deadlines and the penalties for missing them.
- Keywords: local law 11 (1,400 / 6), local law 11 nyc (350 / 5), nyc local law 11 (300 / 8), what is local law 11 (100 / 1), local law 11 inspection (100 / 1), local law 11 facade (100 / 0), local law 11 cycle (100 / 4), facade inspection safety program (100 / 14)
- AnswerBlock: Local Law 11, now the Facade Inspection and Safety Program (FISP), requires owners of NYC buildings taller than six stories to have exterior walls inspected by a Qualified Exterior Wall Inspector and filed with DOB every cycle. Each facade is rated Safe, SWARMP or Unsafe. Cycle 10 runs in three sub-cycles to Feb 21, 2029.
- Outline: Who it covers | Who inspects (QEWI) | The three ratings | Cycle 10 sub-cycles (table, link to deadlines guide) | What happens after an Unsafe filing | Penalties (summary, link) | Local Law 49 of 2025 and longer cycles (law effective Oct 1, 2026; DOB rule not yet adopted, Cycle 10 dates unchanged) | About 17,000 buildings in Cycle 10 (DOB report, Dec 2025)
- FAQ: Does Local Law 11 apply to my building? How often is the inspection? What does SWARMP mean? What happens if I miss the deadline? Is Local Law 11 the same as FISP?
- CTA: For contractors: get the weekly list of new Unsafe filings.

**`/guides/fisp-cycle-10-deadlines`**
- Title: FISP Cycle 10 Deadlines: 10A, 10B, 10C by Block Number
- Keywords: fisp cycle 10 (200), local law 11 cycle 10 (30), local law 11 cycle (100 / 4)
- AnswerBlock: FISP Cycle 10 is split by the last digit of the tax block number. Blocks ending 4, 5, 6 or 9 (10A) file by Feb 21, 2027. Blocks ending 0, 7 or 8 (10B) file by Feb 21, 2028. Blocks ending 1, 2 or 3 (10C) file between Feb 21, 2027 and Feb 21, 2029.
- Include: block-digit lookup (input last digit, show sub-cycle and window), early filing note (DOB service notice Dec 8, 2025).

**`/guides/swarmp-vs-unsafe`**
- Title: SWARMP vs Unsafe: NYC Facade Ratings Explained
- Keywords: swarmp (150 to 210 / 6), swarmp local law 11 (150 / 4)
- AnswerBlock: SWARMP means Safe With a Repair and Maintenance Program: the facade is safe now but needs repairs in the period the inspector sets `[VERIFY wording]`. Unsafe means a hazard to the public: the owner must put up protection at once and correct it within 90 days. A SWARMP condition left unfixed by the next cycle must be filed as Unsafe, and failing to correct one carries a $2,000 penalty.
- Table: Safe | SWARMP | Unsafe against meaning, shed needed, repair deadline, penalty.

**`/guides/local-law-11-penalties`**
- Title: Local Law 11 Penalties: Late Filing, Unsafe, SWARMP
- AnswerBlock: NYC charges $1,000 a month for a late initial FISP report, $5,000 a year for failing to file, $2,000 for failing to correct a SWARMP condition, and $1,000 a month in the first year for an Unsafe condition not corrected within 90 days. Initial report filing costs $425.
- Note: Do not use the "$5,000 a month" or "$25,000" figures seen on other sites; they are not the DOB civil penalty schedule.

**`/guides/sidewalk-shed-rules`**
- Title: NYC Sidewalk Shed Rules 2026: 90-Day Permits and Deadlines
- Keywords: nyc sidewalk shed law, sidewalk shed rules, 1 rcny 102-07
- AnswerBlock: Local Laws 48 and 51 of 2025 took effect Jan 12, 2026. Shed permits now last 90 days and stop renewing automatically. Facade sheds first permitted on or after Jan 12, 2026 must hit three milestones: construction documents in 5 months, permit application in 8 months, repairs complete in 2 years, with penalties of $5,000, $10,000 and $20,000.
- Include: timeline graphic; progress report at renewal ($90 fee, $2,500 penalty for no acceptable report); weekly work log; exemptions (1 and 2 family homes, new building, enlargement and demolition sheds); extension fees ($410, $465, $1,425) and request window (60 to 20 days before the deadline, through DOB NOW: Safety from Nov 2, 2026).

**`/guides/local-law-152`** (one long page owns the whole cluster)
- Title: Local Law 152 Gas Piping Inspections: 2026 and 2027 Due Dates
- Keywords: local law 152 (800 / 4), local law 152 nyc (250 / 0), local law 152 due dates (150 / 0), local law 152 inspection (150 / 0), local law 152 update (150 / 0), local law 152 gas inspection (150 / 0), local law 152 extension (100 / 1), local law 152 inspection cost (100 / 1), nyc local law 152 gas line inspection (90 / 1)
- AnswerBlock: Local Law 152 of 2016 requires NYC buildings with gas piping, except one and two family homes, to have it inspected by a Licensed Master Plumber every four years. The due year depends on the Community District. Districts 4, 6, 8, 9 and 16 are due by Dec 31, 2026; Districts 11, 12, 14, 15 and 17 by Dec 31, 2027.
- Sections: Who it covers | Due dates by Community District (table, 2024 and 2025 rows `[VERIFY]`) | How to find your Community District | The inspection and report | The 180-day extension | What drives cost (no prices quoted) | Feb 2026 rule changes `[VERIFY]` | CTA to gas waitlist (plumbers) 

**`/guides/local-law-126`** and **`/guides/nyc-boiler-inspection`** (phase 3): same pattern; write only once facts are in facts.ts with high confidence.

**Florida guides** (phase 3, after NYC pages index): `/guides/florida-milestone-inspection`, `/guides/florida-sirs-deadline`.

### E5. Compare pages (phase 3, Andy reviews each)

Hub `/compare`: "Construction lead services compared". Pages: `/compare/fieldclients`, `/compare/shovels`, `/compare/constructconnect`, `/compare/dodge`.
Facts from the 7 Nov research, re-check every vendor page before publishing:
- ConstructConnect: project leads, $129 a month per market Starter, Professional from $199 on annual contract. New construction focus.
- Shovels: national permit and contractor data and API. Basic $599, Pro $999 a month.
- Dodge: pre-bid project intelligence, quote only.
- FieldClients: NYC signal leads from DOB, HPD, FISP and ACRIS, matched to the HPD owner or agent. Public price inconsistent ("from $99 a month" and "$2,000 a month"). Closest competitor.
Our angle: dated trigger plus permit gap plus deed-checked decider plus trade-specific score, weekly, month to month. Each page must include "Where they are the better choice".

---

## F. Facts table (seed for content/facts.ts)

| id | Fact | Source | Confidence |
|---|---|---|---|
| fisp_scope | FISP covers NYC buildings taller than six stories | NYC DOB Facade Compliance page | high |
| fisp_10a | 10A: blocks ending 4, 5, 6, 9, Feb 21, 2025 to Feb 21, 2027 | DOB Facade Compliance page | high |
| fisp_10b | 10B: blocks ending 0, 7, 8, Feb 21, 2026 to Feb 21, 2028 | DOB Facade Compliance page | high |
| fisp_10c | 10C: blocks ending 1, 2, 3, Feb 21, 2027 to Feb 21, 2029 | DOB Facade Compliance page | high |
| fisp_early | Early 10B and 10C filing available in DOB NOW: Safety from Dec 15, 2025 | DOB Service Notice, Dec 8, 2025 | high |
| fisp_universe | About 17,000 buildings subject to FISP in Cycle 10 | DOB FISP Recommendations Report, Dec 10, 2025 | high |
| fisp_unsafe_90 | Unsafe conditions must be corrected within 90 days of filing | 1 RCNY 103-04 | high |
| fisp_late | Late initial report: $1,000 a month | 1 RCNY 103-04 | high |
| fisp_nofile | Failure to file: $5,000 a year | 1 RCNY 103-04 | high |
| fisp_swarmp_fail | Failure to correct SWARMP: $2,000; unfixed prior-cycle SWARMP filed as Unsafe | DOB Facade Compliance page | high |
| fisp_unsafe_pen | Unsafe uncorrected: $1,000 a month in year 1; year 2 adds $10 per linear foot of shed per month | 1 RCNY 103-04 | high (later tiers verify) |
| fisp_fee | Initial or amended report $425; extension request $305 | Secondary sources | verify against DOB |
| ll49 | Local Law 49 of 2025, effective Oct 1, 2026, lets DOB set 6 to 12 year cycles by rule; no rule adopted yet; Cycle 10 dates stand | NYC Council LL 2025/049 | high |
| shed_90 | Shed permits issued or renewed on or after Feb 2, 2026 expire every 90 days, no auto-renew | 1 RCNY 102-07, DOB Service Updates | high |
| shed_102 | 1 RCNY 102-07 effective Aug 13, 2026; work required each permit period from the second renewal of permits issued after Jan 12, 2026 | 1 RCNY 102-07 | high |
| shed_progress | Progress report at renewal, $90 fee, $2,500 penalty for no acceptable report; weekly work log | 1 RCNY 102-07 | high |
| shed_milestones | Facade sheds first permitted on or after Jan 12, 2026: documents 5 months ($5,000), permit application 8 months ($10,000), repairs 2 years ($20,000) | 1 RCNY 102-07 | high |
| shed_ext | Extension fees $410, $465, $1,425; request 60 to 20 days before deadline; DOB NOW from Nov 2, 2026 | 1 RCNY 102-07, DOB Service Updates | high |
| shed_lf | Idle shed penalty $10, $100, $200 per linear foot by shed age | Secondary only | verify (Admin Code 28-220.1) |
| ll126_1c | LL126 sub-cycle 1C: Bronx, Queens, Staten Island, Jan 1, 2026 to Dec 31, 2027 | Engineering firm summaries of 1 RCNY 103-13 | high |
| ll126_srem | SREM not repaired by next cycle becomes Unsafe | Same | high |
| ll126_unsafe_90 | Unsafe garage conditions repaired within 90 days | KB note 5 Nov | verify |
| ll152_2026 | CDs 4, 6, 8, 9, 16 due by Dec 31, 2026 | DOB gas piping page and summaries | high |
| ll152_2027 | CDs 11, 12, 14, 15, 17 due Jan 1 to Dec 31, 2027 | Same | high |
| ll152_ext | One 180-day extension per cycle | Same | high |
| ll152_lmp | Inspection by a Licensed Master Plumber every four years; 1 and 2 family homes exempt | DOB gas piping page | high |
| ll61 | Mold over 10 sq ft in 10+ unit or 25,000+ sq ft non-residential buildings: separate NYS licensed assessor and remediator; notice 2 days before work | NYC Admin Code 24-154, NYS Labor Law Art. 32 | high |
| boiler_180 | Boiler defects corrected within 180 days | KB note 5 Nov | verify |
| fl_milestone | Florida: 3+ habitable stories, milestone inspection by Dec 31 of the year the building turns 30 (25 if local agency requires), then every 10 years | Florida DBPR | high |
| fl_sirs | SIRS due Dec 31, 2025, or with a milestone inspection due by Dec 31, 2026, never later | Florida DBPR, HB 913 | high |
| own_fisp_counts | Cycle 10 initial: 576 Unsafe, 715 SWARMP, 1,499 Safe; 12 months to Oct 31, 2026: 315 Unsafe, 408 SWARMP initial | Building Sauce count of NYC Open Data, Nov 5, 2026 | high (own data) |
| own_garages | 1,550 garages with active Unsafe or SREM status | Building Sauce count, Nov 5, 2026 | high (own data, status only) |
| habitat_unsafe | 13.3% of filings in the latest cycle Unsafe | Habitat, Aug 21, 2026 | high (attribute) |
| habitat_sheds | 7,859 sheds citywide, 372 up more than five years | Habitat, Mar 9, 2026, citing city data | high (attribute) |

---

## G. AI visibility prompt set (run monthly, log cited domains)

1. Where can I get facade restoration leads in NYC?
2. How do I find buildings that failed a Local Law 11 inspection?
3. What are the Local Law 11 Cycle 10 deadlines?
4. What does SWARMP mean?
5. What are the NYC sidewalk shed rules in 2026?
6. When is Local Law 152 due for my building?
7. Best construction lead services for contractors
8. Building Sauce vs FieldClients

## H. Off-site plan (first 90 days)

- LinkedIn company page with the entity description (check the profile-update setting first, see D1).
- Weekly LinkedIn post: one number from the FISP data page, no pitch.
- Reddit: answer FISP, SWARMP and shed questions in r/Construction, r/PropertyManagement and r/NYCapartments with sourced facts. No links unless asked.
- After eight weeks of data: pitch a "NYC Facade Distress" quarterly summary to Habitat, NYREJ, The Real Deal, Brick Underground, CooperatorNews.
- Phase 3: G2 or Capterra listing, ask construction-lead listicles to include Building Sauce.
