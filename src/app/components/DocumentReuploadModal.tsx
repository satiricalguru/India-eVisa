"use client";

import React, { useState, type ChangeEvent } from "react";
import { X, Upload, CheckCircle2, AlertCircle, FileText, ScanFace, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

interface DocumentReuploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAppId?: string;
}

export function DocumentReuploadModal({ isOpen, onClose, defaultAppId = "ETV-2026-10482" }: DocumentReuploadModalProps) {
  const [appId, setAppId] = useState(defaultAppId);
  const [docType, setDocType] = useState<"passport" | "photo">("photo");
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setIsUploaded(true);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 1200);
  };

  const handleFinalSubmit = () => {
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsUploaded(false);
    setFileName("");
    setIsSuccess(false);
    setIsVerifying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box medium-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Self-Service Correction
            </div>
            <h2>Re-upload Document / Quality Fixer</h2>
            <p className="modal-subtitle">
              If you received an advisory email regarding unclear photo or passport bio page, re-upload it here without restarting.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {!isSuccess ? (
          <div className="reupload-body">
            <div className="reupload-app-banner">
              <div className="app-field-wrap">
                <label htmlFor="reupload-app-id">Application Reference ID</label>
                <input
                  id="reupload-app-id"
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="e.g. ETV-2026-10482"
                />
              </div>
              <div className="app-field-wrap">
                <label>Document Flagged for Quality</label>
                <div className="doc-type-toggle">
                  <button
                    className={`toggle-btn ${docType === "photo" ? "active" : ""}`}
                    onClick={() => { setDocType("photo"); handleReset(); }}
                  >
                    <ScanFace size={15} /> Applicant Photo
                  </button>
                  <button
                    className={`toggle-btn ${docType === "passport" ? "active" : ""}`}
                    onClick={() => { setDocType("passport"); handleReset(); }}
                  >
                    <FileText size={15} /> Passport Bio Page
                  </button>
                </div>
              </div>
            </div>

            {docType === "photo" ? (
              <div className="guidance-box">
                <div className="guidance-title">
                  <AlertCircle size={16} className="warning-icon" />
                  <strong>Photo Specification Requirements</strong>
                </div>
                <ul>
                  <li>Plain white background with equal height and width (square format).</li>
                  <li>No shadows, glare, or reflections on spectacles (recommended to remove glasses).</li>
                  <li>Front-facing with full head from hair to chin visible.</li>
                </ul>
              </div>
            ) : (
              <div className="guidance-box">
                <div className="guidance-title">
                  <AlertCircle size={16} className="warning-icon" />
                  <strong>Passport Bio Scan Requirements</strong>
                </div>
                <ul>
                  <li>Must be in PDF or clear JPEG format (10 KB to 300 KB).</li>
                  <li>MRZ bottom barcode lines and photo must be completely sharp and legible.</li>
                  <li>Valid for at least 6 months with minimum two blank visa pages.</li>
                </ul>
              </div>
            )}

            <div className="reupload-dropzone">
              {!isUploaded ? (
                <label className="dropzone-label">
                  <input
                    type="file"
                    accept={docType === "passport" ? ".pdf,image/*" : "image/*"}
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <Upload size={28} className="upload-icon" />
                  <strong>Click or drop replacement {docType === "photo" ? "photograph" : "passport scan"}</strong>
                  <span>Supports JPEG, PNG, PDF up to 10MB</span>
                </label>
              ) : (
                <div className="uploaded-preview-state">
                  <div className="uploaded-file-row">
                    <div className="file-icon-wrap">
                      {docType === "photo" ? <ScanFace size={22} /> : <FileText size={22} />}
                    </div>
                    <div className="file-name-info">
                      <strong>{fileName}</strong>
                      <span>Ready for submission</span>
                    </div>
                    <button className="replace-btn" onClick={handleReset}>
                      <RefreshCw size={14} /> Change
                    </button>
                  </div>

                  {isVerifying ? (
                    <div className="verifying-bar">
                      <ShieldCheck size={16} className="spin-icon" />
                      <span>Checking compliance, aspect ratio, and lighting...</span>
                    </div>
                  ) : (
                    <div className="compliance-passed">
                      <CheckCircle2 size={16} />
                      <span>Quality check passed · Document is compliant for processing</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer-actions">
              <button className="button button-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="button button-primary"
                disabled={!isUploaded || isVerifying}
                onClick={handleFinalSubmit}
              >
                Submit Updated Document <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="reupload-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} />
            </div>
            <h3>Document Re-uploaded Successfully!</h3>
            <p>
              Your replacement {docType === "photo" ? "photograph" : "passport bio page"} has been linked to Application{" "}
              <strong>{appId}</strong>. Scrutiny will resume automatically within 2 to 4 hours.
            </p>
            <div className="success-actions">
              <button className="button button-primary" onClick={onClose}>
                Return to Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
