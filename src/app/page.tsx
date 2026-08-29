"use client";

import Image from "next/image";
import { generateEtaPdf } from "./utils/generateEtaPdf";
import { generateApplicationSummaryPdf } from "./utils/generateApplicationSummaryPdf";
import { eligibleCountriesList, getCountryFeeConfig } from "./data/countriesFeeData";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Bell, CalendarDays, Check, CheckCircle2, ChevronDown, CircleHelp,
  Clock3, CloudUpload, Compass, FileText, Globe2, House, Info, LockKeyhole, LogOut, Mail, MapPin, Menu,
  MessageCircle, MoveRight, Plane, ScanFace, ScanLine, Search, ShieldCheck, TicketCheck, Upload, UserCheck, UserRound, X,
  Printer, Building2, HeartPulse, GraduationCap
} from "lucide-react";
import { useEffect, useState, type ChangeEvent, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { PortsDirectoryModal } from "./components/PortsDirectoryModal";
import { FeeCalculatorModal } from "./components/FeeCalculatorModal";
import { DocumentReuploadModal } from "./components/DocumentReuploadModal";
import { PaymentVerifyModal } from "./components/PaymentVerifyModal";
import { SampleFormModal } from "./components/SampleFormModal";
import { ArrivalCardModal } from "./components/ArrivalCardModal";
import { GovernmentServicesHub } from "./components/GovernmentServicesHub";

type Screen = "home" | "eligibility" | "result" | "login" | "wizard" | "review" | "payment" | "tracking";
type EligibilityStep = "passport" | "purpose" | "arrival" | "duration";
type DocumentKind = "passport" | "photo";
type EligibilityData = { passport: string; purpose: string; arrival: string; duration: string };
type DocumentState = { name: string; kind: DocumentKind; ready: boolean; demo?: boolean; feedback?: string[]; score?: number };
type FormData = { fullName: string; gender: string; dob: string; stay: string; email: string; phone: string; passportNumber: string };
export type UserProfile = { fullName: string; gender: string; dob: string; passportNumber: string; nationality: string; email: string; phone: string; stay: string };

const defaultProfile: UserProfile = {
  fullName: "Alex Morgan",
  gender: "Female",
  dob: "1992-05-14",
  passportNumber: "542617843",
  nationality: "United Kingdom",
  email: "alex.morgan@example.com",
  phone: "+44 7700 900 123",
  stay: "The Park, New Delhi",
};

const initialEligibility: EligibilityData = { passport: "United Kingdom", purpose: "Tourism", arrival: "2026-10-15", duration: "12 days" };
const initialForm: FormData = { fullName: "Alex Morgan", gender: "Female", dob: "1992-05-14", stay: "The Park, New Delhi", email: "alex.morgan@example.com", phone: "+44 7700 900 123", passportNumber: "542617843" };
const wizardSteps = [{ label: "About you", eyebrow: "01" }, { label: "Passport", eyebrow: "02" }, { label: "Photo", eyebrow: "03" }, { label: "Your trip", eyebrow: "04" }, { label: "Contact", eyebrow: "05" }];
const countries = eligibleCountriesList;

export function getVisaDetails(purpose: string = "Tourism", duration: string = "12 days", country?: string) {
  const countryFees = getCountryFeeConfig(country || "United Kingdom");
  if (purpose === "Business") {
    return {
      name: "e-Business Visa",
      badge: "e-BUSINESS · 1 YEAR",
      subType: "e-Business Visa (01 Year / Multiple Entry)",
      appType: "Business / Trade Meetings",
      entries: "Multiple Entry",
      validity: "365 days",
      expiryDate: "25 Aug 2027",
      fee: countryFees.business,
      formattedFee: `₹${countryFees.business.toLocaleString("en-IN")}`,
      description: "For business meetings, trade events, and commercial visits to India.",
    };
  }
  if (purpose === "Medical treatment") {
    return {
      name: "e-Medical Visa",
      badge: "e-MEDICAL · 60 DAYS",
      subType: "e-Medical Visa (60 Days / Triple Entry)",
      appType: "Medical Treatment / Hospital Consultation",
      entries: "Triple Entry",
      validity: "60 days",
      expiryDate: "25 Oct 2026",
      fee: countryFees.medical,
      formattedFee: `₹${countryFees.medical.toLocaleString("en-IN")}`,
      description: "For medical treatment, diagnostics, and clinical care in recognized Indian hospitals.",
    };
  }
  if (purpose === "Ayurveda / Yoga (e-Ayush)" || purpose === "e-Ayush") {
    return {
      name: "e-Ayush Visa",
      badge: "e-AYUSH · 60 DAYS",
      subType: "e-Ayush Visa (60 Days / Triple Entry)",
      appType: "Ayurveda & Holistic Wellness",
      entries: "Triple Entry",
      validity: "60 days",
      expiryDate: "25 Oct 2026",
      fee: countryFees.medical,
      formattedFee: `₹${countryFees.medical.toLocaleString("en-IN")}`,
      description: "For therapeutic yoga, Ayurveda, Panchakarma, and holistic healing in accredited Indian wellness institutes.",
    };
  }
  if (purpose === "Conference" || purpose === "e-Conference") {
    return {
      name: "e-Conference Visa",
      badge: "e-CONFERENCE · 30 DAYS",
      subType: "e-Conference Visa (30 Days / Double Entry)",
      appType: "Conference / Symposium",
      entries: "Double Entry",
      validity: "30 days",
      expiryDate: "25 Sep 2026",
      fee: countryFees.conference,
      formattedFee: `₹${countryFees.conference.toLocaleString("en-IN")}`,
      description: "For attending official international seminars, workshops, or symposiums with MEA/MHA clearances.",
    };
  }
  if (purpose === "Higher Education (e-Student)" || purpose === "Student") {
    return {
      name: "e-Student Visa",
      badge: "e-STUDENT · 1 YEAR",
      subType: "e-Student Visa (01 Year / Multiple Entry)",
      appType: "Academic Study & Degree",
      entries: "Multiple Entry",
      validity: "365 days",
      expiryDate: "25 Aug 2027",
      fee: countryFees.tier === "Gratis (Zero Fee)" ? 0 : 7200,
      formattedFee: `₹${(countryFees.tier === "Gratis (Zero Fee)" ? 0 : 7200).toLocaleString("en-IN")}`,
      description: "For full-time academic degree and diploma programs in recognized Indian universities and colleges.",
    };
  }
  if (purpose === "PIO / Family of Indian Citizen (e-Entry)" || purpose === "e-Entry") {
    return {
      name: "e-Entry / Miscellaneous Visa",
      badge: "e-ENTRY · 1 YEAR",
      subType: "e-Miscellaneous Visa (01 Year / Multiple Entry)",
      appType: "PIO & Diaspora Family Entry",
      entries: "Multiple Entry",
      validity: "365 days",
      expiryDate: "25 Aug 2027",
      fee: countryFees.tier === "Gratis (Zero Fee)" ? 0 : 6800,
      formattedFee: `₹${(countryFees.tier === "Gratis (Zero Fee)" ? 0 : 6800).toLocaleString("en-IN")}`,
      description: "For Persons of Indian Origin (PIO), foreign spouses, and children of Indian citizens or OCI cardholders.",
    };
  }
  if (purpose === "Transit") {
    return {
      name: "e-Transit Visa",
      badge: "e-TRANSIT · 15 DAYS",
      subType: "e-Transit Visa (Direct Transit / Double Entry)",
      appType: "Direct Airport Transit",
      entries: "Double Entry",
      validity: "15 days",
      expiryDate: "10 Sep 2026",
      fee: countryFees.tier === "Gratis (Zero Fee)" ? 0 : 1800,
      formattedFee: `₹${(countryFees.tier === "Gratis (Zero Fee)" ? 0 : 1800).toLocaleString("en-IN")}`,
      description: "For direct transit through international airports in India with confirmed onward journey.",
    };
  }
  const isOneYear = duration === "More than 30 days" || duration === "1 Year" || duration === "More than 30 days (1 Year)";
  const isFiveYear = duration === "5 Years" || duration === "5 Years Multi-Entry";
  return {
    name: isFiveYear ? "5-Year e-Tourist Visa" : isOneYear ? "1-Year e-Tourist Visa" : "30-Day e-Tourist Visa",
    badge: isFiveYear ? "e-TOURIST · 5 YEARS" : isOneYear ? "e-TOURIST · 1 YEAR" : "e-TOURIST · 30 DAYS",
    subType: isFiveYear ? "e-Tourist Visa (05 Years / Multiple Entry)" : isOneYear ? "e-Tourist Visa (01 Year / Multiple Entry)" : "e-Tourist Visa (30 Days / Double Entry)",
    appType: "Tourist / Sightseeing",
    entries: isFiveYear || isOneYear ? "Multiple Entry" : "Double Entry",
    validity: isFiveYear ? "5 years" : isOneYear ? "365 days" : "30 days",
    expiryDate: isFiveYear ? "25 Aug 2031" : isOneYear ? "25 Aug 2027" : "25 Sep 2026",
    fee: isFiveYear ? countryFees.tourist5Y : isOneYear ? countryFees.tourist1Y : countryFees.tourist30D,
    formattedFee: `₹${(isFiveYear ? countryFees.tourist5Y : isOneYear ? countryFees.tourist1Y : countryFees.tourist30D).toLocaleString("en-IN")}`,
    description: `For a ${duration} visit from a passport holder, this is the recommended demo path.`,
  };
}

function formatDate(value: string) {
  const date = new Date(`${value || "2026-10-15"}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? "Not provided"
    : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function HelpDrawer({ open, onClose, onOpenPorts }: { open: boolean; onClose: () => void; onOpenPorts: () => void }) {
  if (!open) return null;
  return (
    <div className="help-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="help-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="help-head">
          <h2>Help &amp; Guidance</h2>
          <button className="help-close" onClick={onClose} aria-label="Close help modal">
            <X size={20} />
          </button>
        </div>
        <div className="help-faq-list">
          <div className="help-faq-item">
            <h3>How does the e-Visa application process work?</h3>
            <p>
              1. <strong>Check eligibility</strong> across 174 countries and 9 visa subcategories.<br />
              2. <strong>Upload documents</strong> (passport bio page &amp; photo) with real-time AI compliance checking.<br />
              3. <strong>Enter trip details</strong> and complete simulated checkout.<br />
              4. <strong>Track your application</strong> and download a genuine PDF Electronic Travel Authorisation (ETA).
            </p>
          </div>
          <div className="help-faq-item">
            <h3>What documents do I need to prepare?</h3>
            <p>
              • Ordinary passport with at least 6 months validity from arrival date and 2 blank pages.<br />
              • Clear front-facing color photo against a light/white background.<br />
              • First accommodation / hotel details in India.
            </p>
          </div>
          <div className="help-faq-item">
            <h3>Which ports can I enter India through?</h3>
            <p>
              e-Visa is valid for entry at <strong>37 designated International Airports</strong> and <strong>38 Seaports</strong> for cruise passengers. Exit can be made from any authorized immigration check post.
            </p>
            <button
              className="text-button"
              style={{ marginTop: "6px" }}
              onClick={() => {
                onClose();
                onOpenPorts();
              }}
            >
              <span>View full directory of authorized ports</span> <ArrowRight size={13} />
            </button>
          </div>
          <div className="help-faq-item">
            <h3>Can I change my answers before payment?</h3>
            <p>
              Yes. All progress is autosaved in your browser. You can click &quot;Edit&quot; on any section in the Review screen to adjust your details before proceeding.
            </p>
          </div>
        </div>
        <div className="help-contact-box">
          <strong>Official 24x7 e-Visa Helpdesk (Government of India)</strong>
          <small>Email: indian-evisa@gov.in</small>
          <small>Phone: +91-11-24300666 / +91-11-24300667</small>
          <small>Toll Free (USA): 1855 205 5577 · (UK): 0808 178 5040</small>
        </div>
      </div>
    </div>
  );
}

function ProfileDrawer({
  open,
  onClose,
  profile,
  onSaveProfile,
  onLogout,
  onTrack,
}: {
  open: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  onTrack: () => void;
}) {
  const [editData, setEditData] = useState<UserProfile>(profile);
  const [savedMessage, setSavedMessage] = useState(false);

  if (!open) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(editData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2) || "AM";

  return (
    <div className="help-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="profile-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="help-head">
          <h2>Applicant Profile</h2>
          <button className="help-close" onClick={onClose} aria-label="Close profile drawer">
            <X size={20} />
          </button>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-meta">
            <strong>{profile.fullName}</strong>
            <span>{profile.email}</span>
            <small>● {profile.nationality} Passport Holder</small>
          </div>
        </div>

        <div>
          <div className="profile-section-title">
            <span>Active Demo Application</span>
          </div>
          <div className="profile-app-card">
            <div>
              <strong>ETV-2026-10482</strong>
              <small>e-Visa Application · Live Prototype</small>
            </div>
            <button
              onClick={() => {
                onClose();
                onTrack();
              }}
            >
              Track <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="profile-section-title">
            <span>Saved Profile (Auto-Fetch Details)</span>
          </div>
          <div className="profile-fields-grid">
            <div className="field-group">
              <label htmlFor="p-name">Full Name (as on passport)</label>
              <div className="input-wrap">
                <UserRound size={17} />
                <input
                  id="p-name"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-passport">Passport Number</label>
              <div className="input-wrap">
                <FileText size={17} />
                <input
                  id="p-passport"
                  value={editData.passportNumber}
                  onChange={(e) => setEditData({ ...editData, passportNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-country">Nationality / Passport Country</label>
              <div className="select-wrap" style={{ border: "1px solid #cfd6cf", background: "var(--white)", height: "46px", padding: "0 12px", display: "flex", alignItems: "center" }}>
                <Globe2 size={17} />
                <select
                  id="p-country"
                  value={editData.nationality}
                  onChange={(e) => setEditData({ ...editData, nationality: e.target.value })}
                  style={{ border: 0, outline: 0, flex: 1, background: "transparent", fontSize: "12px" }}
                >
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={15} />
              </div>
            </div>

            <div className="field-group">
              <label>Gender</label>
              <div className="gender-chips">
                {["Female", "Male", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={editData.gender === g ? "gender-chip selected" : "gender-chip"}
                    onClick={() => setEditData({ ...editData, gender: g })}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-dob">Date of Birth</label>
              <div className="input-wrap">
                <CalendarDays size={17} />
                <input
                  id="p-dob"
                  type="date"
                  value={editData.dob}
                  onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-email">Email Address</label>
              <div className="input-wrap">
                <Mail size={17} />
                <input
                  id="p-email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-phone">Mobile Number</label>
              <div className="input-wrap">
                <MessageCircle size={17} />
                <input
                  id="p-phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="p-stay">Default Stay / Hotel in India</label>
              <div className="input-wrap">
                <MapPin size={17} />
                <input
                  id="p-stay"
                  value={editData.stay}
                  onChange={(e) => setEditData({ ...editData, stay: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="save-profile-btn">
              <CheckCircle2 size={16} /> Save Profile for Auto-Fill
            </button>

            {savedMessage && (
              <div style={{ color: "#4a8b6a", fontSize: "11px", display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", fontWeight: 700 }}>
                <Check size={14} /> Profile updated and synced with forms!
              </div>
            )}
          </div>
        </form>

        <button
          type="button"
          className="logout-btn"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <LogOut size={16} /> Log Out of Demo Account
        </button>
      </div>
    </div>
  );
}

function SiteFooter({
  onSelectVisa,
  onTrack,
  onHelp,
  onOpenFeeCalculator,
  onOpenPortsDirectory,
  onOpenSampleForm,
  onOpenPaymentVerify,
  onOpenReupload,
  onOpenArrivalCard
}: {
  onSelectVisa: (purpose: string) => void;
  onTrack: () => void;
  onHelp: () => void;
  onOpenFeeCalculator: () => void;
  onOpenPortsDirectory: () => void;
  onOpenSampleForm: () => void;
  onOpenPaymentVerify: () => void;
  onOpenReupload: () => void;
  onOpenArrivalCard: () => void;
}) {
  const [lookupQuery, setLookupQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ name: string; purpose: string; description: string }>>([]);

  const visaCategories = [
    { name: "e-Tourist Visa (30 Days, 1 Year & 5 Years)", purpose: "Tourism", description: "For sightseeing, recreation, visiting family & friends." },
    { name: "e-Business Visa (1 Year Multi-Entry)", purpose: "Business", description: "For business meetings, trade events, and commercial visits." },
    { name: "e-Medical Visa (60 Days Triple-Entry)", purpose: "Medical treatment", description: "For medical treatment and clinical consultations in India." },
    { name: "e-Ayush Visa (60 Days Triple-Entry)", purpose: "Ayurveda / Yoga (e-Ayush)", description: "For Ayurvedic healing, yoga therapy, and holistic wellness." },
    { name: "e-Conference Visa (30 Days Double-Entry)", purpose: "Conference", description: "For attending international conferences and seminars." },
    { name: "e-Student Visa (1 Year Multi-Entry)", purpose: "Higher Education (e-Student)", description: "For full-time academic degrees in Indian institutions." },
    { name: "e-Entry / Miscellaneous Visa", purpose: "PIO / Family of Indian Citizen (e-Entry)", description: "For Persons of Indian Origin and family of Indian citizens." },
    { name: "e-Transit Visa (Direct Airport Transit)", purpose: "Transit", description: "For direct transit through international airports in India." },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLookupQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = visaCategories.filter(
      (v) =>
        v.name.toLowerCase().includes(val.toLowerCase()) ||
        v.purpose.toLowerCase().includes(val.toLowerCase()) ||
        v.description.toLowerCase().includes(val.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <footer className="site-footer-rich">
      <div className="page-wrap">
        <div className="footer-top-grid">
          {/* Column 1: Visa lookup */}
          <div className="footer-lookup">
            <h2>Visa lookup</h2>
            <div className="footer-search-wrap">
              <input
                type="text"
                placeholder="Search 9 e-visa categories..."
                value={lookupQuery}
                onChange={handleSearch}
                aria-label="Visa lookup"
              />
              <Search size={18} />
            </div>

            {searchResults.length > 0 && (
              <div className="footer-search-results">
                {searchResults.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="footer-search-item"
                    onClick={() => {
                      setLookupQuery("");
                      setSearchResults([]);
                      onSelectVisa(item.purpose);
                    }}
                  >
                    <strong>{item.name}</strong>
                    <span style={{ display: "block", fontSize: "10.5px", color: "#a5b8b0", marginTop: "2px" }}>
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Find and compare visas */}
          <div>
            <div className="footer-col-title">Find and compare visas</div>
            <div className="footer-links-list">
              <button type="button" onClick={() => onSelectVisa("Tourism")}>Visit (e-Tourist)</button>
              <button type="button" onClick={() => onSelectVisa("Business")}>Work &amp; Business (e-Business)</button>
              <button type="button" onClick={() => onSelectVisa("Medical treatment")}>Medical &amp; Clinical Care</button>
              <button type="button" onClick={() => onSelectVisa("Ayurveda / Yoga (e-Ayush)")}>Ayush (Yoga &amp; Ayurveda)</button>
              <button type="button" onClick={() => onSelectVisa("Conference")}>Conference &amp; Seminars</button>
              <button type="button" onClick={() => onSelectVisa("Higher Education (e-Student)")}>Student &amp; Higher Education</button>
              <button type="button" onClick={() => onSelectVisa("PIO / Family of Indian Citizen (e-Entry)")}>PIO &amp; Indian Spouses (e-Entry)</button>
              <button type="button" onClick={() => onSelectVisa("Transit")}>Transit through India</button>
            </div>
          </div>

          {/* Column 3: Official Government Utilities */}
          <div>
            <div className="footer-col-title">Government Action Hubs</div>
            <div className="footer-links-list">
              <button type="button" onClick={onTrack}>Check Visa / ETA Status</button>
              <button type="button" onClick={onOpenPaymentVerify}>Verify Payment / Pay Fee</button>
              <button type="button" onClick={onOpenReupload}>Re-upload Flagged Documents</button>
              <button type="button" onClick={onOpenArrivalCard}>Su-Swagatam e-Arrival Card</button>
              <button type="button" onClick={onOpenFeeCalculator}>e-Visa Fee Calculator</button>
              <button type="button" onClick={onOpenPortsDirectory}>Authorized Checkposts (Air/Sea/Land)</button>
              <button type="button" onClick={onOpenSampleForm}>Sample Application Specimen</button>
              <button type="button" onClick={onHelp}>24/7 International Helpdesk</button>
            </div>
          </div>
        </div>

        {/* Middle Brand Bar */}
        <div className="footer-mid-brand">
          <div className="footer-emblem-cluster">
            <Image
              src="/ashoka-emblem.png"
              alt="State Emblem of India - Lion Capital of Ashoka"
              width={38}
              height={56}
              className="footer-emblem-img"
              priority
            />
            <div className="footer-ministry-text">
              <span>BUREAU OF IMMIGRATION</span>
              <span>MINISTRY OF HOME AFFAIRS</span>
              <small>GOVERNMENT OF INDIA</small>
            </div>
          </div>

          <div className="footer-gov-text">
            <strong>Government of India</strong>
            <span>भारत सरकार · National Portal</span>
          </div>
        </div>

        {/* Bottom Legal / Policy Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-links">
            <button type="button" onClick={onHelp}>Glossary</button>
            <button type="button" onClick={onHelp}>Accessibility</button>
            <button type="button" onClick={onHelp}>Privacy Policy</button>
            <button type="button" onClick={onHelp}>Terms of Use</button>
            <button type="button" onClick={onHelp}>Copyright</button>
            <button type="button" onClick={onHelp}>Cookie Preferences</button>
          </div>
          <div>Government of India &copy; 2026 · All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}

function Shell({
  children,
  onHome,
  onTrack,
  onHowItWorks,
  onHelp,
  onAccount,
  onSelectVisa,
  onOpenFeeCalculator,
  onOpenPortsDirectory,
  onOpenSampleForm,
  onOpenPaymentVerify,
  onOpenReupload,
  onOpenArrivalCard,
  isLoggedIn,
  userName,
}: {
  children: ReactNode;
  onHome: () => void;
  onTrack: () => void;
  onHowItWorks: () => void;
  onHelp: () => void;
  onAccount: () => void;
  onSelectVisa: (purpose: string) => void;
  onOpenFeeCalculator: () => void;
  onOpenPortsDirectory: () => void;
  onOpenSampleForm: () => void;
  onOpenPaymentVerify: () => void;
  onOpenReupload: () => void;
  onOpenArrivalCard: () => void;
  isLoggedIn: boolean;
  userName?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app-shell">
      <div className="demo-ribbon">
        DEMO MODE <span>•</span> accounts, payments and decisions are simulated · Indian Visa Online Portal
      </div>
      <header className="site-header">
        <button className="brand" onClick={onHome} aria-label="Go to India e-Visa home">
          <span className="brand-mark">
            <Image
              src="/emblem.png"
              alt="Emblem of India"
              width={24}
              height={40}
              className="brand-emblem"
              priority
            />
          </span>
          <span><strong>India</strong> / e-visa</span>
        </button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <button
            onClick={() => {
              setMenuOpen(false);
              onHowItWorks();
            }}
          >
            How it works
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenFeeCalculator();
            }}
          >
            Fee Calculator
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenPortsDirectory();
            }}
          >
            Ports Directory
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              onTrack();
            }}
          >
            Track Application
          </button>
          <button
            className="nav-help"
            onClick={() => {
              setMenuOpen(false);
              onHelp();
            }}
          >
            <CircleHelp size={16} /> Help
          </button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <button className="header-signin" onClick={onAccount}>
          <UserRound size={16} /> {isLoggedIn ? (userName || "Demo profile") : "Sign in"}
        </button>
      </header>
      {children}
      <SiteFooter
        onSelectVisa={onSelectVisa}
        onTrack={onTrack}
        onHelp={onHelp}
        onOpenFeeCalculator={onOpenFeeCalculator}
        onOpenPortsDirectory={onOpenPortsDirectory}
        onOpenSampleForm={onOpenSampleForm}
        onOpenPaymentVerify={onOpenPaymentVerify}
        onOpenReupload={onOpenReupload}
        onOpenArrivalCard={onOpenArrivalCard}
      />
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) { return <div className="kicker"><span className="kicker-line" />{children}</div>; }
function PrimaryButton({ children, onClick, icon = <ArrowRight size={18} />, type = "button", disabled = false }: { children: ReactNode; onClick?: () => void; icon?: ReactNode; type?: "button" | "submit"; disabled?: boolean }) { return <button type={type} disabled={disabled} className="button button-primary" onClick={onClick}>{children}<span className="button-icon">{icon}</span></button>; }

function Landing({
  onStart,
  onTrack,
  userName,
  onOpenReupload,
  onOpenPaymentVerify,
  onOpenPrintApplication,
  onOpenSampleForm,
  onOpenArrivalCard,
  onOpenPortsDirectory,
  onOpenFeeCalculator
}: {
  onStart: () => void;
  onTrack: () => void;
  userName?: string;
  onOpenReupload: () => void;
  onOpenPaymentVerify: () => void;
  onOpenPrintApplication: () => void;
  onOpenSampleForm: () => void;
  onOpenArrivalCard: () => void;
  onOpenPortsDirectory: () => void;
  onOpenFeeCalculator: () => void;
}) {
  const firstName = userName?.trim() ? userName.trim().split(" ")[0] : "Alex";
  const journeyLabel = `${firstName}'s journey`;

  return <main className="home-page">
    <section className="hero-section page-wrap"><div className="hero-copy fade-up"><Kicker>Your India journey, simplified</Kicker><h1>Your India visa,<br /><em>without the paperwork headache.</em></h1><p className="hero-lede">Answer a few questions. We&apos;ll guide you to the right application and show you exactly what you need.</p><div className="hero-actions"><PrimaryButton onClick={onStart}>Check my visa eligibility</PrimaryButton><button className="text-button" onClick={onTrack}>Already applied? <span>Track an application</span> <MoveRight size={16} /></button></div><div className="hero-proof"><span><Clock3 size={15} /> About 5 minutes</span><span><ShieldCheck size={15} /> Guided & secure</span><span><CloudUpload size={15} /> Save and resume</span></div></div>
      <div className="hero-art fade-up delay-2" aria-label="Illustration of an India visa journey"><div className="sun-disc" /><div className="art-caption"><span>01</span><strong>London → New Delhi</strong><small>{journeyLabel}</small></div><div className="route-dot dot-start" /><div className="route-dot dot-end" /><svg className="route-svg" viewBox="0 0 500 470" fill="none" aria-hidden="true"><path d="M70 340C145 240 184 292 237 231C294 166 334 226 440 102" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" /></svg><div className="plane-icon"><Plane size={27} /></div><div className="art-card passport-card"><span className="passport-sun"><Globe2 size={15} /></span><span>e-TOURIST<br /><small>30 DAYS</small></span><strong>INDIA</strong></div><div className="art-card note-card"><Compass size={18} /><span><strong>A clear next step</strong><small>at every stage</small></span></div><div className="art-stamp"><Check size={16} /><span>READY<br />TO GO</span></div></div>
    </section>

    {/* Government 7 Core Action Hubs */}
    <GovernmentServicesHub
      onOpenApply={onStart}
      onOpenStatus={onTrack}
      onOpenReupload={onOpenReupload}
      onOpenPaymentVerify={onOpenPaymentVerify}
      onOpenPrintApplication={onOpenPrintApplication}
      onOpenSampleForm={onOpenSampleForm}
      onOpenArrivalCard={onOpenArrivalCard}
      onOpenPortsDirectory={onOpenPortsDirectory}
      onOpenFeeCalculator={onOpenFeeCalculator}
    />

    <section id="how-it-works" className="strip-section"><div className="page-wrap strip-inner"><span className="strip-label">A better way to apply</span><div className="strip-steps"><span><b>01</b> Know what you need</span><MoveRight size={17} /><span><b>02</b> Fill only what matters</span><MoveRight size={17} /><span><b>03</b> Track every stage</span></div></div></section>

    <section className="content-section page-wrap home-content"><div className="section-heading"><Kicker>Everything in one place</Kicker><h2>A calmer route to the <em>right answer.</em></h2><p>No giant category list. No guessing which documents matter. Just a short, guided journey that keeps you moving.</p></div><div className="feature-grid"><article className="feature-card"><span className="feature-number">01</span><div className="feature-icon"><Globe2 size={22} /></div><h3>Eligibility,<br /><em>before</em> application</h3><p>Find out if your visa route fits your trip before you create an account.</p><button onClick={onStart}>Start with 4 questions <ArrowRight size={16} /></button></article><article className="feature-card"><span className="feature-number">02</span><div className="feature-icon saffron"><ScanFace size={22} /></div><h3>Documents that<br /><em>look ready</em></h3><p>Get plain-English feedback on your passport and photo while there&apos;s still time to fix them.</p><div className="mini-check"><CheckCircle2 size={15} /> AI-assisted document check</div></article><article className="feature-card"><span className="feature-number">03</span><div className="feature-icon blue"><TicketCheck size={22} /></div><h3>Never wonder<br /><em>what&apos;s next</em></h3><p>See a live, human-readable status instead of waiting for a mystery email.</p><div className="mini-check"><CheckCircle2 size={15} /> Submitted → Decision</div></article></div></section>
    <section className="prep-section"><div className="page-wrap prep-grid"><div><Kicker>Before you begin</Kicker><h2>Have these nearby.<br /><em>We&apos;ll do the rest.</em></h2></div><div className="prep-list"><div><span>01</span><FileText size={20} /><p><strong>Passport bio page</strong><small>Ordinary passport, valid for your trip</small></p></div><div><span>02</span><ScanFace size={20} /><p><strong>Recent photograph</strong><small>Front-facing, clear, plain background</small></p></div><div><span>03</span><MapPin size={20} /><p><strong>One trip detail</strong><small>Where you&apos;ll stay in India</small></p></div></div></div></section>
    <section className="track-prompt page-wrap"><div className="track-prompt-icon"><Bell size={23} /></div><div><Kicker>Already started?</Kicker><h3>Pick up where you left off.</h3></div><button onClick={onTrack}>Track your application <ArrowRight size={17} /></button></section><Disclosure />
  </main>;
}
function Disclosure() { return <div className="disclosure page-wrap"><Info size={16} /><p><strong>Independent prototype.</strong> This demo is not affiliated with the Government of India. All accounts, payments, applications and visa decisions shown here are simulated.</p></div>; }
function Progress({ current, total, label }: { current: number; total: number; label: string }) { return <div className="progress-wrap"><div className="progress-meta"><span>{label}</span><span>{current} of {total}</span></div><div className="progress-track"><span style={{ width: `${(current / total) * 100}%` }} /></div></div>; }

function Eligibility({ data, setData, step, setStep, onBack, onResult }: { data: EligibilityData; setData: (data: EligibilityData) => void; step: EligibilityStep; setStep: (step: EligibilityStep) => void; onBack: () => void; onResult: () => void }) {
  const steps: EligibilityStep[] = ["passport", "purpose", "arrival", "duration"];
  const current = steps.indexOf(step) + 1;
  const next = () => current === steps.length ? onResult() : setStep(steps[current]);
  const back = () => current === 1 ? onBack() : setStep(steps[current - 2]);
  const valid = step === "passport" ? Boolean(data.passport) : step === "purpose" ? Boolean(data.purpose) : step === "arrival" ? Boolean(data.arrival) : Boolean(data.duration);

  const purposeList = [
    { name: "Tourism", icon: <Plane size={18} /> },
    { name: "Business", icon: <FileText size={18} /> },
    { name: "Medical treatment", icon: <BadgeCheck size={18} /> },
    { name: "Ayurveda / Yoga (e-Ayush)", icon: <HeartPulse size={18} /> },
    { name: "Conference", icon: <Building2 size={18} /> },
    { name: "Higher Education (e-Student)", icon: <GraduationCap size={18} /> },
    { name: "PIO / Family of Indian Citizen (e-Entry)", icon: <UserRound size={18} /> },
    { name: "Transit", icon: <MoveRight size={18} /> },
  ];

  return (
    <main className="flow-page">
      <div className="page-wrap flow-wrap">
        <div className="flow-top">
          <button className="back-link" onClick={back}><ArrowLeft size={16} /> Back</button>
          <span className="save-label"><LockKeyhole size={13} /> Your answers are private</span>
        </div>
        <Progress current={current} total={4} label="Eligibility check" />
        <div className="question-layout">
          <div className="question-copy fade-up">
            <span className="question-number">0{current}</span>
            <h1>
              {step === "passport" && <>Which country issued<br />your <em>passport?</em></>}
              {step === "purpose" && <>What brings you<br />to <em>India?</em></>}
              {step === "arrival" && <>When will you<br /><em>arrive?</em></>}
              {step === "duration" && <>How long will<br />you <em>stay?</em></>}
            </h1>
            <p>
              {step === "passport" && "We use your nationality to check whether this visa route is available to you across all 174 eligible countries."}
              {step === "purpose" && "This helps us show you the exact e-Visa category (Tourism, Business, Ayush, Conference, Student, Entry) that matches your plans."}
              {step === "arrival" && "A rough date is fine. You can fine-tune it in your application."}
              {step === "duration" && "This helps us choose between short-term 30-day, 1-year multi-entry, and extended multi-entry routes."}
            </p>
            <div className="why-ask"><CircleHelp size={15} /> Why we ask this</div>
          </div>
          <div className="question-control fade-up delay-1">
            {step === "passport" && (
              <div className="select-stack">
                <label htmlFor="country">Passport country (174 eligible nationalities)</label>
                <div className="select-wrap">
                  <Globe2 size={18} />
                  <select id="country" value={data.passport} onChange={(event) => setData({ ...data, passport: event.target.value })}>
                    {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                  </select>
                  <ChevronDown size={17} />
                </div>
                <span className="field-note">We&apos;ll only use this to check the demo visa route.</span>
              </div>
            )}
            {step === "purpose" && (
              <div className="choice-grid expanded-purposes">
                {purposeList.map((p) => (
                  <button
                    key={p.name}
                    className={data.purpose === p.name ? "choice-card selected" : "choice-card"}
                    onClick={() => setData({ ...data, purpose: p.name })}
                  >
                    <span className="choice-icon">{p.icon}</span>
                    <span>{p.name}</span>
                    {data.purpose === p.name && <CheckCircle2 className="choice-check" size={19} />}
                  </button>
                ))}
              </div>
            )}
            {step === "arrival" && (
              <div className="date-stack">
                <label htmlFor="arrival">Your arrival date</label>
                <div className="date-wrap">
                  <CalendarDays size={19} />
                  <input id="arrival" type="date" value={data.arrival} onChange={(event) => setData({ ...data, arrival: event.target.value })} />
                </div>
                <div className="info-callout">
                  <Info size={17} />
                  <p><strong>Official Guideline · 2026</strong><br />Apply at least 4 days in advance of your expected arrival date.</p>
                </div>
              </div>
            )}
            {step === "duration" && (
              <div className="choice-list">
                {["12 days", "20 days", "30 days", "More than 30 days (1 Year)", "5 Years Multi-Entry"].map((duration) => (
                  <button
                    key={duration}
                    className={data.duration === duration ? "list-choice selected" : "list-choice"}
                    onClick={() => setData({ ...data, duration })}
                  >
                    <span>{duration}</span>
                    {data.duration === duration ? <CheckCircle2 size={20} /> : <span className="empty-circle" />}
                  </button>
                ))}
              </div>
            )}
            <div className="control-footer">
              <PrimaryButton onClick={next} disabled={!valid}>Continue</PrimaryButton>
              <span>Press Enter ↵</span>
            </div>
          </div>
        </div>
      </div>
      <Disclosure />
    </main>
  );
}

function Result({ data, onStart, onBack }: { data: EligibilityData; onStart: () => void; onBack: () => void }) {
  const visa = getVisaDetails(data.purpose, data.duration, data.passport);
  return <main className="result-page"><div className="page-wrap"><button className="back-link result-back" onClick={onBack}><ArrowLeft size={16} /> Change my answers</button><div className="result-hero"><div className="result-check"><Check size={27} /></div><Kicker>Based on your answers</Kicker><h1>{visa.name} <em>fits your trip.</em></h1><p className="result-lede">For a {data.duration} visit ({data.purpose}) from a {data.passport} passport holder, this is the recommended demo path.</p></div><div className="result-grid"><div className="result-main"><div className="result-card checklist-card"><div className="card-heading"><div><span className="eyebrow">YOUR PERSONAL CHECKLIST</span><h2>What you&apos;ll need</h2></div><span className="checklist-count">3 items</span></div><ChecklistItem icon={<FileText size={20} />} title="Passport bio page" detail="A clear scan or photo of the photo page" /><ChecklistItem icon={<ScanFace size={20} />} title="Recent photograph" detail="Front-facing, clear, with a plain background" /><ChecklistItem icon={<MapPin size={20} />} title="Where you&apos;ll stay" detail="Hotel, address or host details in India" /></div><div className="result-card next-card"><span className="eyebrow">WHAT HAPPENS NEXT</span><div className="next-flow"><div><span>01</span><strong>Demo sign in</strong><small>Use a mock account</small></div><ArrowRight size={18} /><div><span>02</span><strong>Guided questions</strong><small>One at a time</small></div><ArrowRight size={18} /><div><span>03</span><strong>Mock decision</strong><small>Track every stage</small></div></div></div></div><aside className="result-side"><div className="fee-card"><span className="eyebrow">DEMO ESTIMATE</span><div className="fee-number">{visa.formattedFee}</div><p>Single simulated application fee for {visa.name}. No extra gateway or bank charges shown.</p><div className="fee-rule" /><div className="fee-detail"><Clock3 size={17} /><span><strong>About 5 minutes</strong><small>to complete the demo</small></span></div><PrimaryButton onClick={onStart}>Start application</PrimaryButton></div><div className="side-note"><ShieldCheck size={17} /><p><strong>We&apos;ll check your documents as you go.</strong> You&apos;ll get useful feedback before you reach review.</p></div></aside></div><Disclosure /></div></main>;
}
function ChecklistItem({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) { return <div className="checklist-item"><span className="item-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><CheckCircle2 size={19} /></div>; }

function Login({ onContinue, onBack, profile, onLogin }: { onContinue: (email?: string) => void; onBack: () => void; profile?: UserProfile; onLogin?: (email: string) => void }) {
  const [email, setEmail] = useState(profile?.email || "alex.morgan@example.com");
  const submit = (event: React.FormEvent) => { event.preventDefault(); onLogin?.(email); onContinue(email); };
  return <main className="login-page"><div className="page-wrap login-wrap"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back</button><div className="login-panel"><Kicker>Save your progress</Kicker><h1>Sign in or start<br /><em>your demo session.</em></h1><p>We use your email only to simulate autosave and status tracking.</p><div className="demo-note"><Info size={14} /> Demo access: alex.morgan@example.com · no password required</div><form onSubmit={submit} className="login-form"><label htmlFor="email">Your email address</label><div className="input-wrap"><Mail size={18} /><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><PrimaryButton type="submit">Continue to application</PrimaryButton></form><div className="login-foot"><LockKeyhole size={14} /><span>Your details are stored only in your local session.</span></div></div></div></main>;
}

function DocumentUpload({
  kind,
  document,
  onUpload,
  onDemo,
  onRemove,
}: {
  kind: DocumentKind;
  document?: DocumentState;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onDemo: () => void;
  onRemove?: () => void;
}) {
  const isPassport = kind === "passport";
  return (
    <div className={`upload-card ${document?.ready ? "ready" : ""}`}>
      {document?.ready ? (
        <>
          <div className="upload-header">
            <div>
              <span className="file-chip">
                <CheckCircle2 size={13} /> Uploaded
              </span>
              <h3>{document.name}</h3>
            </div>
            <span className="ai-badge">
              <ShieldCheck size={14} /> AI checked
            </span>
          </div>
          <div className="doc-preview">
            <div className="preview-inner">
              {isPassport ? (
                <div className="mock-passport">
                  <span className="passport-globe">
                    <Globe2 size={16} />
                  </span>
                  <span>PASSPORT</span>
                  <small>•••• 17843</small>
                </div>
              ) : (
                <div className="mock-photo">
                  <ScanFace size={38} />
                </div>
              )}
            </div>
          </div>
          <div className="feedback-list">
            {(document.feedback || [
              "Well centered with clear borders",
              "Lighting is balanced with no glare",
              "Text and details are fully readable",
            ]).map((item, index) => (
              <span key={index} className="feedback-item">
                <Check size={14} /> {item}
              </span>
            ))}
          </div>
          <div className="upload-action-row">
            <label className="replace-button">
              <Upload size={14} /> Replace file
              <input
                type="file"
                accept={isPassport ? "image/jpeg,image/png,application/pdf" : "image/jpeg,image/png"}
                onChange={onUpload}
                className="sr-only"
              />
            </label>
            {onRemove && (
              <button
                type="button"
                className="remove-button"
                onClick={onRemove}
                title="Remove file"
              >
                <X size={14} /> Remove
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="upload-icon">
            <CloudUpload size={23} />
          </div>
          <h3>Drop your {isPassport ? "passport bio page" : "photo"} here</h3>
          <p>or choose a file from your device</p>
          <label className="file-button">
            <Upload size={16} /> Choose file
            <input
              type="file"
              accept={isPassport ? "image/jpeg,image/png,application/pdf" : "image/jpeg,image/png"}
              onChange={onUpload}
            />
          </label>
          <button type="button" className="demo-file-button" onClick={onDemo}>
            Use a demo file instead
          </button>
          <small className="file-spec">
            {isPassport ? "JPG, PNG or PDF · up to 10 MB" : "JPG or PNG · plain background recommended"}
          </small>
          {document?.feedback?.[0] && (
            <div className="checking-banner" role="alert">
              <Info size={16} /> <span>{document.feedback[0]}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Wizard({ form, setForm, docs, setDocs, step, setStep, onBack, onReview, eligibility, profile, isLoggedIn }: { form: FormData; setForm: (form: FormData) => void; docs: Partial<Record<DocumentKind, DocumentState>>; setDocs: Dispatch<SetStateAction<Partial<Record<DocumentKind, DocumentState>>>>; step: number; setStep: (step: number) => void; onBack: () => void; onReview: () => void; eligibility: EligibilityData; profile: UserProfile; isLoggedIn: boolean }) {
  const visa = getVisaDetails(eligibility.purpose, eligibility.duration, eligibility.passport);
  const [checking, setChecking] = useState(false); const [saved, setSaved] = useState(false); const current = wizardSteps[step];
  useEffect(() => { const start = window.setTimeout(() => setSaved(true), 0); const timeout = window.setTimeout(() => setSaved(false), 1600); return () => { window.clearTimeout(start); window.clearTimeout(timeout); }; }, [form, docs, step]);
  const handleDoc = async (kind: DocumentKind, name: string, demo = false, imageData?: string) => {
    setChecking(true);
    setDocs((previous) => ({ ...previous, [kind]: { name, kind, ready: false, demo } }));
    try {
      const response = await fetch("/api/document-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fileName: name, demo, imageData }),
      });
      const result = await response.json().catch(() => ({})) as { feedback?: string[]; score?: number; error?: string };
      if (!response.ok) {
        setDocs((previous) => ({ ...previous, [kind]: { name, kind, ready: false, demo, feedback: [result.error || "We could not check this file. Please choose a smaller file and try again."] } }));
        return;
      }
      setDocs((previous) => ({ ...previous, [kind]: { name, kind, ready: true, demo, feedback: result.feedback, score: result.score } }));
    } catch {
      setDocs((previous) => ({ ...previous, [kind]: { name, kind, ready: true, demo, feedback: ["File type looks right", "Readable at a glance", "Ready for your review"] } }));
    } finally {
      setChecking(false);
    }
  };
  const upload = (kind: DocumentKind) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 4_500_000) {
      setDocs((previous) => ({ ...previous, [kind]: { name: file.name, kind, ready: false, demo: false, feedback: ["Please choose a file smaller than 4.5 MB for this demo."] } }));
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      void handleDoc(kind, file.name, false, typeof reader.result === "string" ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  const next = () => step === wizardSteps.length - 1 ? onReview() : setStep(step + 1); const back = () => step === 0 ? onBack() : setStep(step - 1);
  const canContinue = step === 0 ? Boolean(form.fullName && form.passportNumber && form.gender && form.dob) : step === 1 ? Boolean(docs.passport?.ready) : step === 2 ? Boolean(docs.photo?.ready) : step === 3 ? Boolean(form.stay) : Boolean(form.email && form.phone);
  return <main className="wizard-page"><div className="wizard-topbar"><button className="back-link" onClick={back}><ArrowLeft size={16} /> Back</button><div className="wizard-title"><span className="mini-brand">India / e-visa</span><span>{visa.name} · {visa.validity}</span></div><span className="save-state">{saved ? <><CloudUpload size={14} /> Saved just now</> : <><Check size={14} /> Saved</>}</span></div><div className="wizard-progress"><div className="page-wrap"><Progress current={step + 1} total={wizardSteps.length} label="Your application" /><div className="step-labels">{wizardSteps.map((item, index) => <span key={item.label} className={index <= step ? "active" : ""}><b>{item.eyebrow}</b>{item.label}</span>)}</div></div></div><div className="page-wrap wizard-body"><div className="wizard-question fade-up"><span className="question-number">{current.eyebrow}</span><h1>{step === 0 && <>Let&apos;s start with<br /><em>the basics.</em></>}{step === 1 && <>Show us your<br /><em>passport page.</em></>}{step === 2 && <>Add a photo that<br /><em>looks like you.</em></>}{step === 3 && <>Where will you<br /><em>stay in India?</em></>}{step === 4 && <>How can we<br /><em>reach you?</em></>}</h1><p>{step === 0 && "We'll use these details to make the rest of the application feel like it was made for you."}{step === 1 && "Upload the page with your photo and passport details. Our document check runs in seconds."}{step === 2 && "A clear, front-facing photo helps avoid delays. We'll point out anything worth fixing."}{step === 3 && "A hotel, host or first address is enough for this demo."}{step === 4 && "We'll use this to send your simulated application updates."}</p><div className="why-ask"><CircleHelp size={15} /> Why we ask this</div></div><div className="wizard-control fade-up delay-1">{step === 0 && <div className="form-fields">{isLoggedIn && <div className="autofill-pill"><UserCheck size={15} /> Auto-fetched from profile ({profile.fullName})<button type="button" style={{ border: 0, background: "transparent", color: "var(--indigo)", textDecoration: "underline", cursor: "pointer", marginLeft: "6px", fontSize: "10px", fontWeight: 700 }} onClick={() => setForm({ ...form, fullName: profile.fullName, gender: profile.gender, dob: profile.dob, passportNumber: profile.passportNumber, stay: profile.stay, email: profile.email, phone: profile.phone })}>Reset to profile values</button></div>}<div className="field-group"><label htmlFor="fullName">Full name, as on passport</label><div className="input-wrap"><UserRound size={18} /><input id="fullName" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} /></div></div><div className="field-group"><label htmlFor="passportNumber">Passport number</label><div className="input-wrap"><FileText size={18} /><input id="passportNumber" value={form.passportNumber} onChange={(event) => setForm({ ...form, passportNumber: event.target.value })} /></div></div><div className="field-group"><label>Gender</label><div className="gender-chips">{["Female", "Male", "Other"].map((g) => <button key={g} type="button" className={form.gender === g ? "gender-chip selected" : "gender-chip"} onClick={() => setForm({ ...form, gender: g })}>{g}</button>)}</div></div><div className="field-group"><label htmlFor="dob">Date of birth</label><div className="input-wrap"><CalendarDays size={18} /><input id="dob" type="date" value={form.dob} onChange={(event) => setForm({ ...form, dob: event.target.value })} /></div></div></div>}{step === 1 && <><DocumentUpload kind="passport" document={docs.passport} onUpload={upload("passport")} onDemo={() => void handleDoc("passport", "alex-morgan-passport.jpg", true)} onRemove={() => setDocs((previous) => ({ ...previous, passport: undefined }))} />{checking && <div className="checking-banner"><ScanLine size={16} /><span>AI is checking the document…</span><span className="loading-dots">•••</span></div>}</>}{step === 2 && <><DocumentUpload kind="photo" document={docs.photo} onUpload={upload("photo")} onDemo={() => void handleDoc("photo", "alex-morgan-photo.jpg", true)} onRemove={() => setDocs((previous) => ({ ...previous, photo: undefined }))} />{checking && <div className="checking-banner"><ScanLine size={16} /><span>AI is checking the photo…</span><span className="loading-dots">•••</span></div>}</>}{step === 3 && <div className="form-fields"><div className="field-group"><label htmlFor="stay">First place you&apos;ll stay</label><div className="input-wrap"><MapPin size={18} /><input id="stay" value={form.stay} onChange={(event) => setForm({ ...form, stay: event.target.value })} /></div><span className="field-note">You can use a hotel name, address or host.</span></div><div className="stay-suggestion"><House size={17} /><span><strong>Example</strong><small>The Park, New Delhi</small></span></div></div>}{step === 4 && <div className="form-fields"><div className="field-group"><label htmlFor="email">Email address</label><div className="input-wrap"><Mail size={18} /><input id="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div></div><div className="field-group"><label htmlFor="phone">Mobile number</label><div className="input-wrap"><MessageCircle size={18} /><input id="phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div></div></div>}<div className="wizard-footer"><PrimaryButton onClick={next} disabled={!canContinue || checking}>{step === wizardSteps.length - 1 ? "Review application" : "Continue"}</PrimaryButton><span><LockKeyhole size={13} /> Autosaved in this browser</span></div></div></div></main>;
}

function Review({ eligibility, form, docs, onBack, onPay }: { eligibility: EligibilityData; form: FormData; docs: Partial<Record<DocumentKind, DocumentState>>; onBack: () => void; onPay: () => void }) {
  const visa = getVisaDetails(eligibility.purpose, eligibility.duration, eligibility.passport);
  return <main className="review-page"><div className="page-wrap review-wrap"><div className="flow-top"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to application</button><span className="save-label"><Check size={14} /> Everything saved</span></div><div className="review-heading"><Kicker>One last look</Kicker><h1>Review your <em>application.</em></h1><p>Check the details below before the simulated payment step.</p></div><div className="review-layout"><div className="review-sections"><ReviewSection title="Your details" onEdit={onBack}><ReviewRow label="Full name" value={form.fullName} /><ReviewRow label="Gender" value={form.gender} /><ReviewRow label="Date of birth" value={formatDate(form.dob)} /><ReviewRow label="Passport number" value={`•••• ${form.passportNumber.slice(-4)}`} /><ReviewRow label="Nationality" value={eligibility.passport} /></ReviewSection><ReviewSection title="Your trip" onEdit={onBack}><ReviewRow label="Purpose" value={eligibility.purpose} /><ReviewRow label="Visa route" value={visa.name} /><ReviewRow label="Arrival" value={formatDate(eligibility.arrival)} /><ReviewRow label="Stay" value={form.stay} /></ReviewSection><ReviewSection title="Documents" onEdit={onBack}><ReviewRow label="Passport bio page" value={docs.passport?.name || "Demo passport file"} status="Checked" /><ReviewRow label="Recent photograph" value={docs.photo?.name || "Demo photo file"} status="Checked" /></ReviewSection></div><aside className="review-total"><span className="eyebrow">SIMULATED TOTAL</span><div className="total-number">{visa.formattedFee}</div><p>One clear demo fee for {visa.name}. No extra charges are added on the next screen.</p><div className="total-line" /><div className="secure-line"><ShieldCheck size={16} /> Secure demo checkout</div><PrimaryButton onClick={onPay}>Continue to payment</PrimaryButton><small>By continuing, you understand this is a prototype with no real submission.</small></aside></div></div></main>;
}
function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) { return <section className="review-section"><div className="review-section-head"><h2>{title}</h2><button onClick={onEdit}>Edit <ArrowRight size={14} /></button></div>{children}</section>; }
function ReviewRow({ label, value, status }: { label: string; value: string; status?: string }) { return <div className="review-row"><span>{label}</span><strong>{value}</strong>{status && <span className="row-status"><Check size={13} /> {status}</span>}</div>; }

function Payment({ onBack, onPay, eligibility }: { onBack: () => void; onPay: () => void; eligibility: EligibilityData }) {
  const visa = getVisaDetails(eligibility.purpose, eligibility.duration, eligibility.passport);
  const [paying, setPaying] = useState(false); const makePayment = async () => { setPaying(true); await fetch("/api/mock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "submitted", fee: visa.fee }) }).catch(() => undefined); window.setTimeout(onPay, 700); };
  return <main className="payment-page"><div className="page-wrap payment-wrap"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to review</button><div className="payment-grid"><div><Kicker>Demo checkout</Kicker><h1>One number.<br /><em>No surprises.</em></h1><p className="payment-lede">This is a simulated payment. No card details are collected and no money moves.</p><div className="mock-payment"><div className="mock-payment-head"><span><LockKeyhole size={15} /> DEMO PAYMENT</span><span className="mock-visa">VISA</span></div><label>Card number<div className="fake-input">4242 4242 4242 4242</div></label><div className="fake-fields"><label>Expiry<div className="fake-input">12 / 29</div></label><label>Security code<div className="fake-input">•••</div></label></div><div className="mock-name"><label>Name on card<div className="fake-input">ALEX MORGAN</div></label></div><div className="payment-button"><span>Amount due</span><strong>{visa.formattedFee}</strong></div></div></div><aside className="payment-side"><span className="eyebrow">YOUR DEMO TOTAL</span><div className="payment-total">{visa.formattedFee}</div><div className="payment-breakdown"><div><span>{visa.name} application</span><strong>{visa.formattedFee}</strong></div><div><span>Gateway surcharge</span><strong>₹0</strong></div></div><div className="total-line" /><p><ShieldCheck size={17} /> You&apos;re in a simulated, secure checkout.</p><PrimaryButton onClick={makePayment} disabled={paying} icon={paying ? <span className="spinner" /> : <Check size={18} />}>{paying ? "Processing demo payment…" : `Pay ${visa.formattedFee} (demo)`}</PrimaryButton></aside></div></div></main>;
}

function Tracking({
  onHome,
  form,
  eligibility,
  onPrintForm
}: {
  onHome: () => void;
  form?: FormData;
  eligibility?: EligibilityData;
  onPrintForm: () => void;
}) {
  const visa = getVisaDetails(eligibility?.purpose, eligibility?.duration, eligibility?.passport);
  const [approved, setApproved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const downloadEta = () => {
    setGenerating(true);
    try {
      generateEtaPdf({
        applicationId: "ETV-2026-10482",
        fullName: form?.fullName || "Alex Morgan",
        passportNumber: form?.passportNumber || "542617843",
        nationality: eligibility?.passport || "United Kingdom",
        gender: form?.gender || "Female",
        dob: form?.dob ? formatDate(form.dob) : "14 May 1992",
        stay: form?.stay || "The Park, New Delhi",
        visaType: visa.subType,
        applicationType: visa.appType,
        issueDate: "26 Aug 2026",
        expiryDate: visa.expiryDate,
        entries: visa.entries,
        status: "GRANTED / APPROVED",
      });
    } catch (e) {
      console.error("Failed to generate ETA PDF", e);
    } finally {
      window.setTimeout(() => setGenerating(false), 600);
    }
  };

  return <main className="tracking-page"><div className="page-wrap tracking-wrap"><div className="tracking-head"><div><Kicker>Your application</Kicker><h1>Know what&apos;s <em>happening.</em></h1></div><span className="application-id"><span>DEMO APPLICATION ID</span><strong>ETV-2026-10482</strong><button onClick={() => navigator.clipboard?.writeText("ETV-2026-10482")}>Copy</button></span></div><div className="status-hero"><div className="status-hero-copy"><span className="live-pill"><span className="live-dot" /> Live demo status</span><h2>{approved ? "Your visa decision is ready." : "Your application is under review."}</h2><p>{approved ? "Your mock ETA is ready to download. Remember: this is simulated data for the prototype." : "We're checking your application and documents. We'll show a demo decision here shortly."}</p></div><div className="status-orb"><span>{approved ? <CheckCircle2 size={38} /> : <Clock3 size={38} />}</span><small>{approved ? "Decision ready" : "In review"}</small></div></div><div className="tracker-card"><div className="tracker-card-head"><div><span className="eyebrow">APPLICATION TIMELINE</span><h2>Three stages, clearly shown</h2></div><span className="eta-chip"><Clock3 size={15} /> Demo ETA · 1–2 days</span></div><div className="timeline"><TimelineItem number="01" title="Submitted" detail="26 August 2026 · 10:42 IST" state="done" /><TimelineItem number="02" title="Under review" detail={approved ? "Completed · 26 August 2026" : "Usually takes 1–2 demo days"} state={approved ? "done" : "current"} /><TimelineItem number="03" title="Decision" detail={approved ? "Approved · 26 August 2026" : "We'll show your decision here"} state={approved ? "done" : "future"} /></div>{!approved ? <div className="demo-decision"><BadgeCheck size={17} /><div><strong>Want to see the full demo?</strong><p>Advance the simulated review to reveal an ETA.</p></div><button onClick={() => setApproved(true)}>Show mock approval <ArrowRight size={16} /></button></div> : <div className="approved-banner"><div><CheckCircle2 size={21} /><span><strong>Approved — simulated</strong><small>Your demo ETA is ready.</small></span></div><div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}><button onClick={downloadEta} disabled={generating}><FileText size={16} /> {generating ? "Generating ETA PDF…" : "Download demo ETA PDF"}</button><button type="button" onClick={onPrintForm} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0 14px", height: "42px", borderRadius: "3px", fontSize: "12px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "7px", cursor: "pointer" }}><Printer size={15} /> Print Application Form</button></div></div>}</div><div className="tracking-bottom"><div><MessageCircle size={19} /><span><strong>We&apos;ll keep you posted</strong><small>Demo updates appear here, not only in email.</small></span></div><button onClick={onHome}>Return to home <ArrowRight size={16} /></button></div><Disclosure /></div></main>;
}
function TimelineItem({ number, title, detail, state }: { number: string; title: string; detail: string; state: "done" | "current" | "future" }) { return <div className={`timeline-item ${state}`}><div className="timeline-marker">{state === "done" ? <Check size={17} /> : number}</div><div className="timeline-copy"><strong>{title}</strong><small>{detail}</small></div>{state === "current" && <span className="timeline-badge">Happening now</span>}</div>; }

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginReturnScreen, setLoginReturnScreen] = useState<"home" | "result">("result");
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const [eligibility, setEligibility] = useState<EligibilityData>(initialEligibility);
  const [eligibilityStep, setEligibilityStep] = useState<EligibilityStep>("passport");
  const [form, setForm] = useState<FormData>(initialForm);
  const [docs, setDocs] = useState<Partial<Record<DocumentKind, DocumentState>>>({});
  const [wizardStep, setWizardStep] = useState(0);

  // New Services Modals
  const [isPortsOpen, setIsPortsOpen] = useState(false);
  const [isFeeCalcOpen, setIsFeeCalcOpen] = useState(false);
  const [isReuploadOpen, setIsReuploadOpen] = useState(false);
  const [isPaymentVerifyOpen, setIsPaymentVerifyOpen] = useState(false);
  const [isSampleFormOpen, setIsSampleFormOpen] = useState(false);
  const [isArrivalCardOpen, setIsArrivalCardOpen] = useState(false);

  useEffect(() => {
    const restore = () => {
      try {
        const saved = window.sessionStorage.getItem("india-visa-demo");
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, unknown>;
          if (typeof parsed.isLoggedIn === "boolean") setIsLoggedIn(parsed.isLoggedIn);
          if (parsed.profile) setProfile(parsed.profile as UserProfile);
          if (parsed.eligibility) setEligibility(parsed.eligibility as EligibilityData);
          if (parsed.form) setForm(parsed.form as FormData);
          if (parsed.docs) setDocs(parsed.docs as Partial<Record<DocumentKind, DocumentState>>);
        }
      } catch {
        // A stale or unavailable session should never prevent the demo from loading.
      }
      setMounted(true);
    };
    const restoreTimer = window.setTimeout(restore, 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.sessionStorage.setItem("india-visa-demo", JSON.stringify({ isLoggedIn, profile, eligibility, form, docs }));
    } catch {
      // Session persistence is best-effort only.
    }
  }, [mounted, isLoggedIn, profile, eligibility, form, docs]);

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    setEligibility((prev) => ({ ...prev, passport: updated.nationality }));
    setForm((prev) => ({
      ...prev,
      fullName: updated.fullName,
      gender: updated.gender,
      dob: updated.dob,
      passportNumber: updated.passportNumber,
      email: updated.email,
      phone: updated.phone,
      stay: updated.stay,
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileOpen(false);
  };

  const handleLogin = (userEmail: string) => {
    setIsLoggedIn(true);
    setProfile((prev) => ({ ...prev, email: userEmail || prev.email }));
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setProfileOpen(true);
    } else {
      setLoginReturnScreen("home");
      setScreen("login");
    }
  };

  const startEligibility = () => {
    setEligibilityStep("passport");
    setScreen("eligibility");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startApplication = () => {
    setWizardStep(0);
    if (isLoggedIn) {
      setForm((prev) => ({
        ...prev,
        fullName: profile.fullName || prev.fullName,
        gender: profile.gender || prev.gender,
        dob: profile.dob || prev.dob,
        passportNumber: profile.passportNumber || prev.passportNumber,
        stay: profile.stay || prev.stay,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
      }));
      setScreen("wizard");
    } else {
      setLoginReturnScreen("result");
      setScreen("login");
    }
  };

  const openTrack = () => {
    setScreen("tracking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shellHome = () => {
    setScreen("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHowItWorks = () => {
    if (screen !== "home") {
      setScreen("home");
      window.setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrintApplicationSummary = () => {
    const visa = getVisaDetails(eligibility.purpose, eligibility.duration, eligibility.passport);
    generateApplicationSummaryPdf({
      applicationId: "ETV-2026-10482",
      temporaryId: "TEMP-IND-749102",
      fullName: form.fullName || profile.fullName,
      gender: form.gender || profile.gender,
      dob: form.dob ? formatDate(form.dob) : "14 May 1992",
      passportNumber: form.passportNumber || profile.passportNumber,
      nationality: eligibility.passport || profile.nationality,
      email: form.email || profile.email,
      phone: form.phone || profile.phone,
      stay: form.stay || profile.stay,
      visaType: visa.subType,
      submissionDate: "29 Aug 2026",
      portOfArrival: "Delhi Airport (DEL)"
    });
  };

  const handleApplyFromCalculator = (country: string, categoryId: string) => {
    let purpose = "Tourism";
    let duration = "12 days";
    if (categoryId.startsWith("tourist-1y")) {
      purpose = "Tourism";
      duration = "More than 30 days (1 Year)";
    } else if (categoryId.startsWith("tourist-5y")) {
      purpose = "Tourism";
      duration = "5 Years Multi-Entry";
    } else if (categoryId === "business") {
      purpose = "Business";
    } else if (categoryId === "medical") {
      purpose = "Medical treatment";
    } else if (categoryId === "ayush") {
      purpose = "Ayurveda / Yoga (e-Ayush)";
    } else if (categoryId === "conference") {
      purpose = "Conference";
    } else if (categoryId === "student") {
      purpose = "Higher Education (e-Student)";
    } else if (categoryId === "transit") {
      purpose = "Transit";
    } else if (categoryId === "entry-misc") {
      purpose = "PIO / Family of Indian Citizen (e-Entry)";
    }

    setEligibility({
      passport: country,
      purpose,
      arrival: "2026-10-15",
      duration
    });
    setEligibilityStep("arrival");
    setScreen("eligibility");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const content = (() => {
    if (screen === "home") {
      return (
        <Landing
          onStart={startEligibility}
          onTrack={openTrack}
          userName={profile.fullName}
          onOpenReupload={() => setIsReuploadOpen(true)}
          onOpenPaymentVerify={() => setIsPaymentVerifyOpen(true)}
          onOpenPrintApplication={handlePrintApplicationSummary}
          onOpenSampleForm={() => setIsSampleFormOpen(true)}
          onOpenArrivalCard={() => setIsArrivalCardOpen(true)}
          onOpenPortsDirectory={() => setIsPortsOpen(true)}
          onOpenFeeCalculator={() => setIsFeeCalcOpen(true)}
        />
      );
    }
    if (screen === "eligibility") return <Eligibility data={eligibility} setData={setEligibility} step={eligibilityStep} setStep={setEligibilityStep} onBack={shellHome} onResult={() => setScreen("result")} />;
    if (screen === "result") return <Result data={eligibility} onStart={startApplication} onBack={() => setScreen("eligibility")} />;
    if (screen === "login") {
      return (
        <Login
          profile={profile}
          onLogin={handleLogin}
          onContinue={(userEmail) => {
            setIsLoggedIn(true);
            setForm((prev) => ({
              ...prev,
              fullName: profile.fullName,
              gender: profile.gender,
              dob: profile.dob,
              passportNumber: profile.passportNumber,
              stay: profile.stay,
              email: userEmail || profile.email,
              phone: profile.phone,
            }));
            setScreen("wizard");
          }}
          onBack={() => setScreen(loginReturnScreen)}
        />
      );
    }
    if (screen === "wizard") {
      return (
        <Wizard
          form={form}
          setForm={setForm}
          docs={docs}
          setDocs={setDocs}
          step={wizardStep}
          setStep={setWizardStep}
          onBack={() => setScreen("login")}
          onReview={() => setScreen("review")}
          eligibility={eligibility}
          profile={profile}
          isLoggedIn={isLoggedIn}
        />
      );
    }
    if (screen === "review") return <Review eligibility={eligibility} form={form} docs={docs} onBack={() => { setWizardStep(4); setScreen("wizard"); }} onPay={() => setScreen("payment")} />;
    if (screen === "payment") return <Payment onBack={() => setScreen("review")} onPay={() => setScreen("tracking")} eligibility={eligibility} />;
    return <Tracking onHome={shellHome} form={form} eligibility={eligibility} onPrintForm={handlePrintApplicationSummary} />;
  })();

  const handleSelectVisaFromFooter = (purpose: string) => {
    setEligibility((prev) => ({ ...prev, purpose }));
    setEligibilityStep("passport");
    setScreen("eligibility");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {screen === "home" ? (
        <Shell
          onHome={shellHome}
          onTrack={openTrack}
          onHowItWorks={scrollToHowItWorks}
          onHelp={() => setHelpOpen(true)}
          onAccount={handleAccountClick}
          onSelectVisa={handleSelectVisaFromFooter}
          onOpenFeeCalculator={() => setIsFeeCalcOpen(true)}
          onOpenPortsDirectory={() => setIsPortsOpen(true)}
          onOpenSampleForm={() => setIsSampleFormOpen(true)}
          onOpenPaymentVerify={() => setIsPaymentVerifyOpen(true)}
          onOpenReupload={() => setIsReuploadOpen(true)}
          onOpenArrivalCard={() => setIsArrivalCardOpen(true)}
          isLoggedIn={isLoggedIn}
          userName={profile.fullName}
        >
          {content}
        </Shell>
      ) : (
        content
      )}

      {/* Drawers and Modals */}
      <HelpDrawer open={helpOpen} onClose={() => setHelpOpen(false)} onOpenPorts={() => setIsPortsOpen(true)} />
      {profileOpen && (
        <ProfileDrawer
          open
          onClose={() => setProfileOpen(false)}
          profile={profile}
        onSaveProfile={handleSaveProfile}
        onLogout={handleLogout}
        onTrack={() => {
          setProfileOpen(false);
          openTrack();
        }}
        />
      )}

      <PortsDirectoryModal isOpen={isPortsOpen} onClose={() => setIsPortsOpen(false)} />
      <FeeCalculatorModal
        isOpen={isFeeCalcOpen}
        onClose={() => setIsFeeCalcOpen(false)}
        onApplyNow={handleApplyFromCalculator}
      />
      <DocumentReuploadModal isOpen={isReuploadOpen} onClose={() => setIsReuploadOpen(false)} />
      <PaymentVerifyModal isOpen={isPaymentVerifyOpen} onClose={() => setIsPaymentVerifyOpen(false)} />
      <SampleFormModal isOpen={isSampleFormOpen} onClose={() => setIsSampleFormOpen(false)} />
      {isArrivalCardOpen && (
        <ArrivalCardModal
          isOpen
          onClose={() => setIsArrivalCardOpen(false)}
          defaultName={profile.fullName}
          defaultPassport={profile.passportNumber}
        />
      )}
    </>
  );
}
