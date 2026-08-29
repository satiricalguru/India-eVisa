"use client";

import React, { useState } from "react";
import { X, Search, CheckCircle2, Download, AlertCircle, RefreshCw } from "lucide-react";
import { generatePaymentReceiptPdf } from "../utils/generatePaymentReceiptPdf";

interface PaymentVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAppId?: string;
}

export function PaymentVerifyModal({ isOpen, onClose, defaultAppId = "ETV-2026-10482" }: PaymentVerifyModalProps) {
  const [appId, setAppId] = useState(defaultAppId);
  const [dob, setDob] = useState("1992-05-14");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  const handleDownloadReceipt = () => {
    generatePaymentReceiptPdf({
      applicationId: appId || "ETV-2026-10482",
      transactionId: "TXN-2026-8849102",
      applicantName: "Alex Morgan",
      passportNumber: "542617843",
      visaCategory: "e-Tourist Visa (30 Days)",
      amountInr: 2100,
      paymentDate: "29 Aug 2026, 10:45 AM IST",
      status: "PAID / VERIFIED"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box medium-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Financial Verification
            </div>
            <h2>Verify Payment / Pay Visa Fee</h2>
            <p className="modal-subtitle">
              Check gateway transaction status, verify deduction records, or download an official payment receipt.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleVerify} className="verify-form">
          <div className="calc-row">
            <div className="calc-field">
              <label htmlFor="verify-app-id">Application Reference ID</label>
              <input
                id="verify-app-id"
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="e.g. ETV-2026-10482"
                required
              />
            </div>
            <div className="calc-field">
              <label htmlFor="verify-dob">Applicant Date of Birth</label>
              <input
                id="verify-dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="button button-primary search-submit-btn" disabled={isSearching}>
            {isSearching ? (
              <>
                <RefreshCw size={15} className="spin-icon" /> Checking Gateway...
              </>
            ) : (
              <>
                <Search size={15} /> Verify Payment Status
              </>
            )}
          </button>
        </form>

        {hasSearched && (
          <div className="payment-result-card">
            <div className="payment-result-header">
              <div className="status-badge-paid">
                <CheckCircle2 size={16} /> PAYMENT SUCCESSFUL
              </div>
              <span className="txn-date">29 Aug 2026 · 10:45 AM</span>
            </div>

            <div className="payment-grid-info">
              <div>
                <span>Transaction Ref:</span>
                <strong>TXN-2026-8849102</strong>
              </div>
              <div>
                <span>Channel:</span>
                <strong>SBI ePay / International Card</strong>
              </div>
              <div>
                <span>Application Fee:</span>
                <strong>₹2,100.00</strong>
              </div>
              <div>
                <span>Gateway Surcharge:</span>
                <strong>₹0.00</strong>
              </div>
            </div>

            <div className="receipt-action-row">
              <button className="button button-primary" onClick={handleDownloadReceipt}>
                <Download size={16} /> Download Official Payment Receipt (PDF)
              </button>
            </div>
          </div>
        )}

        <div className="payment-advisory-box">
          <AlertCircle size={16} />
          <p>
            <strong>2-Hour Gateway Rule:</strong> If money was debited from your bank account but status shows pending, please allow up to 2 hours for automated interbank reconciliation before attempting a repayment.
          </p>
        </div>
      </div>
    </div>
  );
}
