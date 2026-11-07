import type { Fact } from "./types";

/**
 * Every regulatory fact on the site lives here. Components render from it.
 * A page in the sitemap may only use facts with confidence "high".
 *
 * To update: change the fact, bump `checked`, run `npm run check:links` and
 * `npm run check:copy`.
 */
const CHECKED = "2026-11-07";

const SRC = {
  facadeCompliance: {
    name: "NYC DOB Facade Compliance page",
    url: "https://www.nyc.gov/site/buildings/safety/facade-compliance.page",
  },
  facadeFees: {
    name: "NYC DOB Facade Fees and Penalties page",
    url: "https://www.nyc.gov/site/buildings/safety/facade-fees-penalties.page",
  },
  rcny10304: { name: "1 RCNY 103-04", url: "https://www.nyc.gov/assets/buildings/rules/1_RCNY_103-04.pdf" },
  cycle10: {
    name: "DOB Cycle 10 sub-cycle diagram",
    url: "https://www.nyc.gov/assets/buildings/pdf/cycle10-diagram.pdf",
  },
  earlyFiling: {
    name: "DOB service notice, Dec 8, 2025",
    url: "https://www.nyc.gov/assets/buildings/pdf/fisp10-sn.pdf",
  },
  fispReport: {
    name: "DOB FISP Recommendations Report, Dec 10, 2025",
    url: "https://www.nyc.gov/assets/buildings/pdf/fisp.pdf",
  },
  ll49: { name: "Local Law 49 of 2025", url: "https://www.nyc.gov/assets/buildings/local_laws/ll49of2025.pdf" },
  ll48: { name: "Local Law 48 of 2025", url: "https://www.nyc.gov/assets/buildings/local_laws/ll48of2025.pdf" },
  rcny10207: { name: "1 RCNY 102-07", url: "https://www.nyc.gov/assets/buildings/rules/1_RCNY_102-07.pdf" },
  parking: {
    name: "NYC DOB Parking Structures page",
    url: "https://www.nyc.gov/site/buildings/safety/parking-structure.page",
  },
  gas: {
    name: "NYC DOB Periodic Gas Piping System Inspections page",
    url: "https://www.nyc.gov/site/buildings/property-or-business-owner/gas-piping-inspections.page",
  },
  gasExt: {
    name: "DOB Local Law 152 follow-up notice #6",
    url: "https://www.nyc.gov/assets/buildings/pdf/ll_152_follow_up_6_sn.pdf",
  },
  gasDobNow: {
    name: "DOB Local Law 152 follow-up notice #8, July 2026",
    url: "https://www.nyc.gov/assets/buildings/pdf/foll_up8_gp-sn.pdf",
  },
  ll61: {
    name: "NYC Local Law 61 of 2018 (HPD)",
    url: "https://www.nyc.gov/assets/hpd/downloads/pdfs/services/local-law-61.pdf",
  },
  depMold: { name: "NYC DEP Mold Abatement page", url: "https://www.nyc.gov/site/dep/environment/mold-abatement.page" },
  boiler: { name: "NYC DOB Boiler Compliance page", url: "https://www.nyc.gov/site/buildings/safety/boiler-compliance.page" },
  flMilestone: {
    name: "Florida Statutes 553.899",
    url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0553/Sections/0553.899.html",
  },
  flSirs: {
    name: "Florida Statutes 718.112",
    url: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0700-0799/0718/Sections/0718.112.html",
  },
  hb913: { name: "Florida HB 913 (2025)", url: "https://www.flsenate.gov/Session/Bill/2025/913" },
  openDataFacades: {
    name: "NYC Open Data, DOB NOW: Safety facades filings",
    url: "https://data.cityofnewyork.us/d/xubg-57si",
  },
  openDataGarages: {
    name: "NYC Open Data, DOB NOW: Safety parking structure filings",
    url: "https://data.cityofnewyork.us/d/9ycp-w8r6",
  },
  openDataBoilers: {
    name: "NYC Open Data, DOB NOW: Safety boiler filings",
    url: "https://data.cityofnewyork.us/d/52dp-yji6",
  },
  habitatUnsafe: {
    name: "Habitat, Aug 21, 2026",
    url: "https://www.habitatmag.com/Archive2/445-August-2026/Stricter-Rules-and-Higher-Liability-Drive-Rise-in-NYC-Unsafe-Filings",
  },
  habitatSheds: { name: "Habitat, Mar 9, 2026, citing city data", url: "https://www.habitatmag.com/" },
} as const;

function f(
  id: string,
  value: string,
  text: string,
  src: { name: string; url: string },
  confidence: Fact["confidence"] = "high",
  checked: string = CHECKED,
): Fact {
  return { id, value, text, sourceName: src.name, sourceUrl: src.url, checked, confidence };
}

const LIST: Fact[] = [
  // FISP / Local Law 11
  f("fisp_scope", "Taller than 6 stories", "FISP covers NYC buildings higher than six stories. Owners must have exterior walls inspected and file a report with DOB every five years.", SRC.facadeCompliance),
  f("fisp_qewi", "QEWI", "The inspection, called a critical examination, may only be performed by a DOB-approved Qualified Exterior Wall Inspector (QEWI).", SRC.facadeCompliance),
  f("fisp_10a", "Feb 21, 2027", "Sub-cycle 10A, blocks ending in 4, 5, 6 or 9, files between Feb 21, 2025 and Feb 21, 2027.", SRC.cycle10),
  f("fisp_10b", "Feb 21, 2028", "Sub-cycle 10B, blocks ending in 0, 7 or 8, files between Feb 21, 2026 and Feb 21, 2028.", SRC.cycle10),
  f("fisp_10c", "Feb 21, 2029", "Sub-cycle 10C, blocks ending in 1, 2 or 3, files between Feb 21, 2027 and Feb 21, 2029.", SRC.cycle10),
  f("fisp_early", "Dec 15, 2025", "From Dec 15, 2025, owners whose Cycle 9 status is No Report Filed may file sub-cycle 10B and 10C reports early in DOB NOW: Safety, once outstanding penalties are paid.", SRC.earlyFiling),
  f("fisp_universe", "About 17,000", "About 17,000 buildings are subject to FISP in Cycle 10, out of roughly one million buildings citywide.", SRC.fispReport),
  f("fisp_unsafe_90", "90 days", "An Unsafe condition must be corrected within 90 days of filing the Unsafe report. Owners are liable for civil penalties from day 90 unless an extension is approved.", SRC.facadeCompliance),
  f("fisp_unsafe_protect", "At once", "When a QEWI finds an Unsafe condition, the owner must put up public protection immediately and keep it until an amended Safe or SWARMP report is approved.", SRC.facadeCompliance),
  f("fisp_swarmp_window", "1 to 5 years", "A SWARMP report must state the date by which the condition is expected to become unsafe if not repaired. That date may not be less than one year or more than five years out, and the owner must repair by it.", SRC.facadeCompliance),
  f("fisp_swarmp_carry", "Becomes Unsafe", "A condition reported as SWARMP in one cycle that is still unrepaired, or needs repair again, must be classified as Unsafe in the next cycle.", SRC.facadeCompliance),
  f("fisp_late", "$1,000 a month", "A late initial FISP report carries a civil penalty of $1,000 per month.", SRC.facadeFees),
  f("fisp_nofile", "$5,000 a year", "Failure to file an initial FISP report carries a civil penalty of $5,000 per year.", SRC.facadeFees),
  f("fisp_swarmp_fail", "$2,000", "Failure to correct a SWARMP condition carries a civil penalty of $2,000.", SRC.facadeFees),
  f("fisp_unsafe_pen", "$1,000 a month", "An Unsafe condition left uncorrected after 90 days carries $1,000 per month in civil penalties in the first year, under the schedule in 1 RCNY 103-04. The schedule rises in later years.", SRC.rcny10304),
  f("fisp_fee_initial", "$425", "The DOB filing fee for an initial or amended FISP report is $425.", SRC.facadeFees),
  f("fisp_fee_ext", "$305", "A request for an extension of time to complete facade repairs costs $305. A request for a waiver of penalties costs $140.", SRC.facadeFees),
  f("fisp_amended", "2 weeks", "After repairing an Unsafe condition, the owner must file an amended report within two weeks of completing the repairs.", SRC.facadeFees),
  f("ll49", "Oct 1, 2026", "Local Law 49 of 2025 took effect Oct 1, 2026 and lets DOB set the facade inspection interval at between six and twelve years by rule. No rule has been adopted yet, so Cycle 10 dates stand.", SRC.ll49),

  // Sidewalk sheds
  f("shed_90", "90 days", "Sidewalk shed permits issued or renewed on or after Feb 2, 2026 expire every 90 days and no longer renew automatically.", SRC.ll48),
  f("shed_102", "Aug 13, 2026", "1 RCNY 102-07 took effect Aug 13, 2026. From the second renewal of a shed permit issued after Jan 12, 2026, work must happen in every permit period.", SRC.rcny10207),
  f("shed_progress", "$2,500", "Each renewal needs a progress report with milestones ($90 fee). No acceptable report means a $2,500 penalty. Owners keep a weekly work log.", SRC.rcny10207),
  f("shed_milestones", "5, 8 and 24 months", "For facade sheds first permitted on or after Jan 12, 2026: construction documents within 5 months, permit application within 8 months, repairs complete within 2 years. Penalties are $5,000, $10,000 and $20,000.", SRC.rcny10207),
  f("shed_ext", "$410 to $1,425", "Milestone extension fees are $410, $465 and $1,425. Requests go in 60 to 20 days before the deadline, through DOB NOW: Safety from Nov 2, 2026.", SRC.rcny10207),
  f("shed_exempt", "Exempt", "The shed milestone rules do not apply to sheds on one and two family homes, or to sheds for new building, enlargement or demolition work.", SRC.rcny10207),
  f("shed_lf", "$10 to $200 per foot", "Idle shed penalties run $10, $100 or $200 per linear foot per month depending on how long the shed has been up.", SRC.ll48, "verify"),

  // Local Law 126 (parking structures)
  f("ll126_1c", "Dec 31, 2027", "Local Law 126 sub-cycle 1C, covering every community district in the Bronx, Queens and Staten Island, runs from Jan 1, 2026 to Dec 31, 2027.", SRC.parking),
  f("ll126_srem", "Becomes Unsafe", "A condition reported as SREM (Safe with Repairs and Engineering Monitoring) that is not corrected by the next inspection must be reported as Unsafe.", SRC.parking),
  f("ll126_unsafe_90", "90 days", "Owners must repair Unsafe conditions in a parking structure within 90 days of filing the condition assessment report, then file an amended report within two weeks of finishing the work.", SRC.parking),
  f("ll126_1a", "Dec 31, 2023", "Local Law 126 sub-cycle 1A, Manhattan Community Districts 1 to 7, ran from Jan 1, 2022 to Dec 31, 2023.", SRC.parking),
  f("ll126_1b", "Dec 31, 2025", "Local Law 126 sub-cycle 1B, Manhattan Community Districts 8 to 12 and all Brooklyn Community Districts, ran from Jan 1, 2024 to Dec 31, 2025.", SRC.parking),
  f("ll126_report_60", "60 days", "The QPSI must submit the condition assessment report to DOB within 60 days of completing the assessment, with the filing fee.", SRC.parking),
  f("ll126_initial_obs", "Aug 1, 2024", "Owners in sub-cycles 1B and 1C had to file a one-time initial observation by a QPSI by Aug 1, 2024 under 1 RCNY 103-16, unless a full report was filed first.", SRC.parking),
  f("ll126_cycle", "Every 6 years", "Parking structure owners must hire a New York State licensed Professional Engineer who is a Qualified Parking Structure Inspector (QPSI) to inspect the structure and file a condition assessment report with DOB at least once every six years.", SRC.parking),

  // Local Law 152 (gas piping)
  f("ll152_scope", "Every 4 years", "Local Law 152 of 2016 requires gas piping in all buildings, except one and two family homes and other Occupancy Group R-3 buildings, to be inspected by a Licensed Master Plumber at least once every four years.", SRC.gas),
  f("ll152_a", "2028", "Community Districts 1, 3 and 10 in every borough were due in 2024 and are next due Jan 1 to Dec 31, 2028.", SRC.gas),
  f("ll152_b", "2029", "Community Districts 2, 5, 7, 13 and 18 in every borough were due in 2025 and are next due in 2029.", SRC.gas),
  f("ll152_2026", "Dec 31, 2026", "Community Districts 4, 6, 8, 9 and 16 in every borough are due between Jan 1 and Dec 31, 2026.", SRC.gas),
  f("ll152_2027", "Dec 31, 2027", "Community Districts 11, 12, 14, 15 and 17 in every borough are due between Jan 1 and Dec 31, 2027.", SRC.gas),
  f("ll152_ext", "180 days", "An owner who cannot get the inspection done by the deadline may request a one-time 180-day extension through DOB's online portal. The inspection must happen before the extension runs out.", SRC.gasExt),
  f("ll152_cert", "60 days", "The owner must submit the LMP's signed Gas Piping System Periodic Inspection Certification to DOB within 60 days of the inspection.", SRC.gas),
  f("ll152_correct", "120 days", "If the inspection finds conditions needing correction, a certification that they are fixed is due within 120 days of the inspection, or 180 days where the LMP noted that more time was needed.", SRC.gas),
  f("ll152_ll142", "April 2026", "Local Law 142 of 2025 changed parts of the gas piping inspection rules. DOB's follow-up notice #7, issued April 2026, explains the changes and the amendments to 1 RCNY 103-10 and 101-03.", SRC.gas),
  f("ll152_dobnow", "July 2026", "From July 2026, gas piping certifications are submitted in DOB NOW (DOB follow-up notice #8).", SRC.gasDobNow),

  // Local Law 61 (mold)
  f("ll61", "10 sq ft", "Under Local Law 61 of 2018, mold covering more than 10 square feet in a building with 10 or more apartments, or on a zoning lot of 25,000 square feet or more, must be assessed and remediated by separate New York State licensed firms.", SRC.ll61),
  f("ll61_notice", "48 hours", "The licensed remediator must file a work plan notification with DEP at least 48 hours before mold remediation starts, and the assessor files a post-remediation assessment within seven days of completing it.", SRC.depMold),

  // Boilers
  f("boiler_annual", "Every year", "Low-pressure boilers in residential buildings with six or more families, and in commercial and mixed-use buildings, must be inspected every calendar year and the report filed in DOB NOW: Safety within 14 days.", SRC.boiler),
  f("boiler_exempt", "5 families or fewer", "Registered low-pressure boilers in residential buildings with five families or fewer, and a single boiler inside one dwelling unit heating only that unit, do not need the annual inspection.", SRC.boiler),
  f("boiler_inspector", "Licensed installer or insurer", "Low-pressure boiler inspections may only be performed by qualified installers licensed by DOB or by an authorized boiler insurance company. The owner hires them.", SRC.boiler),
  f("boiler_90", "90 days", "Defects found in a boiler inspection must be corrected within 90 days of the initial inspection date, with a subsequent inspection report filed within 14 days of the follow-up inspection.", SRC.boiler),
  f("boiler_nofile", "$1,000 per boiler", "A boiler report filed late carries $50 per month per boiler, up to $600. A report never filed carries a failure-to-file penalty of $1,000 per boiler.", SRC.boiler),

  // Florida
  f("fl_milestone", "30 years", "Florida condominium and cooperative buildings of three or more habitable stories need a milestone inspection by Dec 31 of the year the building turns 30, then every 10 years.", SRC.flMilestone),
  f("fl_milestone_first", "Dec 31, 2024", "Florida buildings that had already reached 30 years before July 1, 2022 had until Dec 31, 2024 to complete their first milestone inspection.", SRC.flMilestone),
  f("fl_sirs_scope", "Every 10 years", "A structural integrity reserve study is required for each Florida condominium or cooperative building of three or more habitable stories, at least every ten years, covering the roof, structure, fireproofing, plumbing, electrical, waterproofing and other listed items.", SRC.flSirs),
  f("fl_sirs", "Dec 31, 2025", "Florida associations had to complete a structural integrity reserve study by Dec 31, 2025, or by Dec 31, 2026 where a milestone inspection was also due by then. No later date is allowed (HB 913 of 2025).", SRC.flSirs),

  // Our own counts
  f("own_fisp_cycle10", "576 Unsafe", "Our count of DOB filings on NYC Open Data on Nov 5, 2026 showed 576 initial Unsafe, 715 initial SWARMP and 1,499 initial Safe reports filed so far in FISP Cycle 10.", SRC.openDataFacades, "high", "2026-11-05"),
  f("own_fisp_12mo", "315 Unsafe", "In the 12 months to Oct 31, 2026, 315 initial Unsafe and 408 initial SWARMP facade reports were filed, about six Unsafe a week.", SRC.openDataFacades, "high", "2026-11-05"),
  f("own_garages", "1,550 garages", "As of Nov 5, 2026, our count of DOB open data showed 1,550 parking structures with an active Unsafe or SREM filing status. Status on file, not proof the repair is still open.", SRC.openDataGarages, "high", "2026-11-05"),
  f("own_boilers", "About 100 a week", "Our count of DOB boiler filings in 2026 shows about 100 buildings a week with an inspection report that lists defects.", SRC.openDataBoilers, "high", "2026-11-05"),

  // Attributed third-party figures
  f("habitat_unsafe", "13.3%", "Habitat reported in Aug 2026 that 13.3% of FISP filings in Cycle 9 were classified Unsafe, up from under 1% in Cycle 6.", SRC.habitatUnsafe),
  f("habitat_sheds", "7,859 sheds", "Habitat reported in Mar 2026, citing city data, 7,859 sidewalk sheds citywide, 372 of them up for more than five years.", SRC.habitatSheds, "verify"),
];

export const FACTS: Record<string, Fact> = Object.fromEntries(LIST.map((x) => [x.id, x]));

export function fact(id: string): Fact {
  const found = FACTS[id];
  if (!found) throw new Error(`Unknown fact id: ${id}`);
  return found;
}

export function factsAreHigh(ids: string[]): boolean {
  return ids.every((id) => fact(id).confidence === "high");
}

export function verifyFacts(ids: string[]): string[] {
  return ids.filter((id) => fact(id).confidence !== "high");
}

export const ALL_FACT_IDS = LIST.map((x) => x.id);
