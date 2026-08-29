"use client";

import React from "react";
import {
  Search,
  Upload,
  CreditCard,
  Printer,
  FileSpreadsheet,
  Plane,
  Calculator,
  Compass,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

interface GovernmentServicesHubProps {
  onOpenStatus: () => void;
  onOpenReupload: () => void;
  onOpenPaymentVerify: () => void;
  onOpenPrintApplication: () => void;
  onOpenSampleForm: () => void;
  onOpenArrivalCard: () => void;
  onOpenPortsDirectory: () => void;
  onOpenFeeCalculator: () => void;
  onOpenApply: () => void;
}

export function GovernmentServicesHub({
  onOpenStatus,
  onOpenReupload,
  onOpenPaymentVerify,
  onOpenPrintApplication,
  onOpenSampleForm,
  onOpenArrivalCard,
  onOpenPortsDirectory,
  onOpenFeeCalculator,
  onOpenApply
}: GovernmentServicesHubProps) {
  const services = [
    {
      id: "apply",
      number: "01",
      icon: <FileCheck2 size={22} className="svc-icon-apply" />,
      badge: "Fast 5-Min Process",
      title: "Apply Online for e-Visa",
      desc: "Complete your official application, upload your passport & photo, and submit for government scrutiny.",
      actionText: "Start Application",
      onClick: onOpenApply,
      highlight: true
    },
    {
      id: "status",
      number: "02",
      icon: <Search size={22} className="svc-icon-status" />,
      badge: "Real-time ETA Lookup",
      title: "Check Visa / ETA Status",
      desc: "Track the live scrutiny stage of your application and download your official approved ETA PDF with QR seal.",
      actionText: "Track Status",
      onClick: onOpenStatus
    },
    {
      id: "reupload",
      number: "03",
      icon: <Upload size={22} className="svc-icon-reupload" />,
      badge: "Self-Service Fixer",
      title: "Re-upload Documents",
      desc: "Fix and re-upload rejected photo or passport bio page with instant AI quality compliance feedback.",
      actionText: "Fix Documents",
      onClick: onOpenReupload
    },
    {
      id: "payment",
      number: "04",
      icon: <CreditCard size={22} className="svc-icon-payment" />,
      badge: "Zero Surcharge Gateway",
      title: "Verify Payment / Pay Fee",
      desc: "Confirm gateway deduction status, check interbank settlements, or download an official payment receipt.",
      actionText: "Verify Payment",
      onClick: onOpenPaymentVerify
    },
    {
      id: "print",
      number: "05",
      icon: <Printer size={22} className="svc-icon-print" />,
      badge: "Official Record PDF",
      title: "Print Submitted Form",
      desc: "Reprint your completed visa application form summary with barcode and biometric registration details.",
      actionText: "Print Form",
      onClick: onOpenPrintApplication
    },
    {
      id: "specimen",
      number: "06",
      icon: <FileSpreadsheet size={22} className="svc-icon-specimen" />,
      badge: "Interactive Checklist",
      title: "Sample Form & Guidelines",
      desc: "Review official field specifications, document checklists, and side-by-side photo acceptance criteria.",
      actionText: "View Specimen",
      onClick: onOpenSampleForm
    },
    {
      id: "arrival",
      number: "07",
      icon: <Plane size={22} className="svc-icon-arrival" />,
      badge: "Pre-Flight 72h Assistant",
      title: "Su-Swagatam e-Arrival Card",
      desc: "Submit digital arrival information within 72 hours before boarding for expedited airport biometric clearance.",
      actionText: "Fill Arrival Card",
      onClick: onOpenArrivalCard
    },
    {
      id: "calculator",
      number: "08",
      icon: <Calculator size={22} className="svc-icon-calc" />,
      badge: "174 Countries Matrix",
      title: "Visa Fee & Validity Calculator",
      desc: "Instant breakdown of government fees, reciprocal waivers, entry rules, and maximum continuous stay limits.",
      actionText: "Calculate Fee",
      onClick: onOpenFeeCalculator
    },
    {
      id: "ports",
      number: "09",
      icon: <Compass size={22} className="svc-icon-ports" />,
      badge: "37 Airports · 38 Seaports",
      title: "Authorized Ports Directory",
      desc: "Searchable directory of all authorized international airports, cruise seaports, and land checkposts in India.",
      actionText: "Explore Ports",
      onClick: onOpenPortsDirectory
    }
  ];

  return (
    <section className="gov-services-section page-wrap">
      <div className="gov-services-header">
        <div className="kicker">
          <span className="kicker-line" /> Official Services Portal
        </div>
        <h2>
          All Government of India e-Visa Services. <em>In one unified hub.</em>
        </h2>
        <p>
          Everything you need for your India journey — from initial eligibility check and document validation to live ETA tracking, payment verification, and arrival disembarkation.
        </p>
      </div>

      <div className="gov-services-grid">
        {services.map((svc) => (
          <article
            key={svc.id}
            className={`gov-service-card ${svc.highlight ? "highlighted-card" : ""}`}
            onClick={svc.onClick}
          >
            <div className="service-card-top">
              <div className="service-icon-box">{svc.icon}</div>
              <span className="service-badge-pill">{svc.badge}</span>
              <span className="service-num">{svc.number}</span>
            </div>

            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>

            <button className="service-action-btn" type="button">
              {svc.actionText} <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
