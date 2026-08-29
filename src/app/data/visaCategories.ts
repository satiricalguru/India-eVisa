export interface VisaCategory {
  id: string;
  code: string;
  name: string;
  badge: string;
  title: string;
  subType: string;
  description: string;
  validity: string;
  entries: string;
  stayDuration: string;
  feeInr: number;
  formattedFee: string;
  requiredDocuments: string[];
  eligibilityNotes: string;
  minAdvanceDays: number;
  maxAdvanceDays: number;
}

export const visaCategories: VisaCategory[] = [
  {
    id: "tourist-30d",
    code: "e-T1 V",
    name: "e-Tourist Visa (30 Days)",
    badge: "e-TOURIST · 30 DAYS",
    title: "Short-Term Tourism & Holiday",
    subType: "e-Tourist Visa (30 Days / Double Entry)",
    description: "For recreation, sightseeing, visiting friends or family, and short-term yoga / informal cultural courses.",
    validity: "30 days from first arrival in India",
    entries: "Double Entry",
    stayDuration: "Up to 30 days total",
    feeInr: 2100,
    formattedFee: "₹2,100",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)"
    ],
    eligibilityNotes: "Apply 4 to 30 days before expected arrival. Non-extendable and non-convertible.",
    minAdvanceDays: 4,
    maxAdvanceDays: 30
  },
  {
    id: "tourist-1y",
    code: "e-T2 V",
    name: "e-Tourist Visa (1 Year)",
    badge: "e-TOURIST · 1 YEAR",
    title: "Extended Multi-Entry Tourism",
    subType: "e-Tourist Visa (01 Year / Multiple Entry)",
    description: "For frequent tourists, cultural programs, casual visits, and yoga retreats throughout the year.",
    validity: "365 days from the date of grant of ETA",
    entries: "Multiple Entry",
    stayDuration: "Continuous stay not to exceed 90-180 days per visit depending on nationality",
    feeInr: 3400,
    formattedFee: "₹3,400",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)"
    ],
    eligibilityNotes: "Max cumulative stay in India should not exceed 180 days per calendar year.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "tourist-5y",
    code: "e-T3 V",
    name: "e-Tourist Visa (5 Years)",
    badge: "e-TOURIST · 5 YEARS",
    title: "Long-Term 5-Year Tourism",
    subType: "e-Tourist Visa (05 Years / Multiple Entry)",
    description: "For long-term leisure and multiple holiday visits over a 5-year span.",
    validity: "5 years from the date of grant of ETA",
    entries: "Multiple Entry",
    stayDuration: "Up to 90 days per visit (180 days for USA, UK, Canada, Japan)",
    feeInr: 6800,
    formattedFee: "₹6,800",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)"
    ],
    eligibilityNotes: "Maximum stay during one calendar year should not exceed 180 days.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "business",
    code: "e-B1 V",
    name: "e-Business Visa",
    badge: "e-BUSINESS · 1 YEAR",
    title: "Commercial & Business Visits",
    subType: "e-Business Visa (01 Year / Multiple Entry)",
    description: "For trade meetings, business ventures, establishing industrial partnerships, buying/selling goods, and commercial discussions.",
    validity: "365 days from the date of grant of ETA",
    entries: "Multiple Entry",
    stayDuration: "Continuous stay up to 180 days (FRRO registration required if staying beyond 180 days)",
    feeInr: 7200,
    formattedFee: "₹7,200",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Copy of Business Card / Visiting Card",
      "Letter of invitation from Indian partner (optional but recommended)"
    ],
    eligibilityNotes: "Also covers GIAN lectures (sanction letter required) and sports events (sports ministry clearance).",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "medical",
    code: "e-M1 V",
    name: "e-Medical Visa",
    badge: "e-MEDICAL · 60 DAYS",
    title: "Medical Treatment in India",
    subType: "e-Medical Visa (60 Days / Triple Entry)",
    description: "For seeking medical treatment in recognized, specialized, or accredited hospitals in India.",
    validity: "60 days from first arrival in India",
    entries: "Triple Entry",
    stayDuration: "Up to 60 days (extendable up to 6 months by FRRO on medical grounds)",
    feeInr: 6400,
    formattedFee: "₹6,400",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Formal Letter from the concerned Indian Hospital on hospital letterhead indicating suggested treatment and tentative admission date"
    ],
    eligibilityNotes: "Maximum 2 Medical Attendants permitted per patient under e-Medical Attendant Visa.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "ayush",
    code: "e-AY V",
    name: "e-Ayush Visa",
    badge: "e-AYUSH · 60 DAYS",
    title: "Ayurveda, Yoga & Holistic Healing",
    subType: "e-Ayush Visa (60 Days / Triple Entry)",
    description: "For undergoing medical treatment, therapeutic yoga, Panchakarma, Unani, Siddha, or Naturopathy in accredited AYUSH wellness institutes in India.",
    validity: "60 days from first arrival in India",
    entries: "Triple Entry",
    stayDuration: "Up to 60 days",
    feeInr: 6400,
    formattedFee: "₹6,400",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Letter from recognized AYUSH hospital or wellness accredited healthcare institute"
    ],
    eligibilityNotes: "Dedicated category introduced by the Ministry of Ayush for traditional Indian medical tourism.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "conference",
    code: "e-B5 V",
    name: "e-Conference Visa",
    badge: "e-CONFERENCE · 30 DAYS",
    title: "Workshops, Seminars & Conferences",
    subType: "e-Conference Visa (30 Days / Double Entry)",
    description: "For attending international conferences, seminars, or symposiums organized by Government Ministries, Universities, or verified private bodies.",
    validity: "30 days from the date of arrival",
    entries: "Double Entry",
    stayDuration: "Up to 30 days",
    feeInr: 7200,
    formattedFee: "₹7,200",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Formal Invitation letter from conference organizer in India",
      "Political clearance from Ministry of External Affairs (MEA)",
      "Event clearance from Ministry of Home Affairs (MHA)"
    ],
    eligibilityNotes: "Event organizers must register details on conference.mha.gov.in beforehand.",
    minAdvanceDays: 4,
    maxAdvanceDays: 60
  },
  {
    id: "student",
    code: "e-S V",
    name: "e-Student Visa",
    badge: "e-STUDENT · 1 YEAR",
    title: "Higher Education & Academic Study",
    subType: "e-Student Visa (01 Year / Multiple Entry)",
    description: "For pursuing regular and full-time academic degree/diploma courses in recognized Indian universities and colleges.",
    validity: "Up to 1 year from the date of grant of ETA (renewable for course duration)",
    entries: "Multiple Entry",
    stayDuration: "Full course duration with mandatory FRRO registration",
    feeInr: 7200,
    formattedFee: "₹7,200",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Official admission letter from recognized Indian educational institution",
      "Financial guarantee or previous 6 months bank statement",
      "NOC from Ministry of Health (if pursuing medical/paramedical study)"
    ],
    eligibilityNotes: "Spouses and dependents can apply under e-Family / Student Dependent category.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  },
  {
    id: "transit",
    code: "e-TR V",
    name: "e-Transit Visa",
    badge: "e-TRANSIT · 15 DAYS",
    title: "Airport Transit & Connecting Flights",
    subType: "e-Transit Visa (Direct Transit / Double Entry)",
    description: "For transiting through Indian airports or seaports with an onward confirmed ticket to a foreign destination.",
    validity: "15 days from the date of grant of ETA",
    entries: "Double Entry",
    stayDuration: "Up to 72 hours per transit entry",
    feeInr: 1800,
    formattedFee: "₹1,800",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Confirmed onward flight ticket to destination country",
      "Valid visa or entry permit for destination country"
    ],
    eligibilityNotes: "Not required if transiting airside without exiting airport transit area.",
    minAdvanceDays: 4,
    maxAdvanceDays: 30
  },
  {
    id: "entry-misc",
    code: "e-X1 V",
    name: "e-Entry / Miscellaneous Visa",
    badge: "e-ENTRY · 1 YEAR",
    title: "PIO, Indian Spouses & Family",
    subType: "e-Miscellaneous Entry Visa (01 Year / Multiple Entry)",
    description: "For Persons of Indian Origin (PIO), foreign spouses and dependent children of Indian citizens or OCI cardholders.",
    validity: "365 days from the date of grant of ETA",
    entries: "Multiple Entry",
    stayDuration: "Up to 180 days per visit",
    feeInr: 6800,
    formattedFee: "₹6,800",
    requiredDocuments: [
      "Passport Bio Page (clear color scan)",
      "Recent passport photograph (white background)",
      "Copy of Indian passport / OCI card of spouse/parent OR surrender certificate of previous Indian passport",
      "Copy of marriage certificate / birth certificate"
    ],
    eligibilityNotes: "Fast-track category ensuring simplified documentation for diaspora families.",
    minAdvanceDays: 4,
    maxAdvanceDays: 120
  }
];

export function getVisaCategoryById(id: string): VisaCategory {
  const match = visaCategories.find((c) => c.id === id);
  return match || visaCategories[0];
}
