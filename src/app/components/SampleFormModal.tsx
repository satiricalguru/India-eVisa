"use client";

import React, { useState } from "react";
import { X, FileText, CheckCircle2, XCircle, ShieldCheck, Download } from "lucide-react";
import { generateApplicationSummaryPdf } from "../utils/generateApplicationSummaryPdf";

interface SampleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SampleFormModal({ isOpen, onClose }: SampleFormModalProps) {
  const [activeTab, setActiveTab] = useState<"specimen" | "photoGuide" | "passportGuide">("specimen");

  const handleDownloadSample = () => {
    generateApplicationSummaryPdf({
      applicationId: "SAMPLE-SPECIMEN-2026",
      temporaryId: "SAMPLE-TEMP-001928",
      fullName: "JOHNATHAN EDWARD DOE",
      gender: "Male",
      dob: "15 Aug 1990",
      passportNumber: "P98765432",
      nationality: "United Kingdom",
      email: "sample.applicant@domain.com",
      phone: "+44 7911 123456",
      stay: "The Imperial, Janpath, New Delhi",
      visaType: "e-Tourist Visa (30 Days / Double Entry)",
      submissionDate: "29 Aug 2026",
      portOfArrival: "Delhi Airport (DEL)"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box wide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Official Specimen & Guide
            </div>
            <h2>Sample Application Form & Document Guidelines</h2>
            <p className="modal-subtitle">
              Review all required questions and photo/passport compliance standards before starting.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="sample-tab-row">
          <button
            className={`sample-tab ${activeTab === "specimen" ? "active" : ""}`}
            onClick={() => setActiveTab("specimen")}
          >
            <FileText size={15} /> Application Structure
          </button>
          <button
            className={`sample-tab ${activeTab === "photoGuide" ? "active" : ""}`}
            onClick={() => setActiveTab("photoGuide")}
          >
            <CheckCircle2 size={15} /> Photo Specifications
          </button>
          <button
            className={`sample-tab ${activeTab === "passportGuide" ? "active" : ""}`}
            onClick={() => setActiveTab("passportGuide")}
          >
            <ShieldCheck size={15} /> Passport Bio Requirements
          </button>
        </div>

        <div className="sample-content-area">
          {activeTab === "specimen" && (
            <div className="specimen-view">
              <div className="specimen-sections-list">
                <div className="specimen-section-card">
                  <h4>1. Applicant & Personal Particulars</h4>
                  <p>Surname, Given Name, Gender, Date of Birth, Town/City of Birth, Country of Birth, Citizenship/National ID Number, Religion, Visible Identification Marks, Educational Qualification.</p>
                </div>
                <div className="specimen-section-card">
                  <h4>2. Passport Details</h4>
                  <p>Passport Number, Place of Issue, Date of Issue, Date of Expiry, Any other valid passport/identity certificate held.</p>
                </div>
                <div className="specimen-section-card">
                  <h4>3. Applicant&apos;s Address & Family Details</h4>
                  <p>Present Address, Permanent Address, Father&apos;s Name & Nationality, Mother&apos;s Name & Nationality, Spouse Particulars (if married), Grandparents&apos; Origin.</p>
                </div>
                <div className="specimen-section-card">
                  <h4>4. Visa Details & Previous Travel</h4>
                  <p>Places likely to be visited, Expected Port of Exit, Previous India visit history, Countries visited in the last 10 years, Reference in India, Reference in Home Country.</p>
                </div>
              </div>

              <div className="specimen-download-banner">
                <div>
                  <strong>Download Printable Blank Specimen PDF</strong>
                  <p>A reference sample format containing all fields and statutory declarations.</p>
                </div>
                <button className="button button-primary" onClick={handleDownloadSample}>
                  <Download size={15} /> Download Specimen (PDF)
                </button>
              </div>
            </div>
          )}

          {activeTab === "photoGuide" && (
            <div className="photo-guide-view">
              <div className="rules-grid">
                <div className="rule-card correct">
                  <div className="rule-header">
                    <CheckCircle2 size={18} />
                    <strong>ACCEPTED PHOTO CRITERIA</strong>
                  </div>
                  <ul>
                    <li>Equal height and width (square format, minimum 350 × 350 pixels).</li>
                    <li>Pure plain white or off-white light background.</li>
                    <li>Full face front view with open eyes and neutral expression.</li>
                    <li>Even lighting without shadows on face or backdrop.</li>
                  </ul>
                </div>
                <div className="rule-card incorrect">
                  <div className="rule-header">
                    <XCircle size={18} />
                    <strong>COMMON REASONS FOR REJECTION</strong>
                  </div>
                  <ul>
                    <li>Tinted, patterned, or colored background.</li>
                    <li>Spectacles with glare or heavy frames obscuring the eyes.</li>
                    <li>Cropped selfies, tilted heads, or side profile views.</li>
                    <li>Blurry, low-resolution, or over-filtered photos.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "passportGuide" && (
            <div className="passport-guide-view">
              <div className="guidance-box">
                <div className="guidance-title">
                  <ShieldCheck size={16} />
                  <strong>Passport Bio Page Clear Scan Guide</strong>
                </div>
                <ul>
                  <li>Scanned page must contain full particulars (Name, Photo, Date of Birth, Passport Number, Expiry).</li>
                  <li>The bottom two Machine Readable Zone (MRZ) barcode lines must be 100% visible and uncropped.</li>
                  <li>Must have at least 6 months validity remaining on the date of entry into India.</li>
                  <li>Must have at least 2 blank pages for stamping by immigration officers upon arrival.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer-actions">
          <button className="button button-primary" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
