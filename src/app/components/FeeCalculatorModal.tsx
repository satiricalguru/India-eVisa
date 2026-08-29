"use client";

import React, { useState, useMemo } from "react";
import { eligibleCountriesList, getCountryFeeConfig, zeroFeeCountries } from "../data/countriesFeeData";
import { visaCategories, getVisaCategoryById } from "../data/visaCategories";
import { X, Calculator, Globe2, CheckCircle2, Info, ArrowRight, ChevronDown } from "lucide-react";

interface FeeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyNow?: (country: string, categoryId: string) => void;
}

export function FeeCalculatorModal({ isOpen, onClose, onApplyNow }: FeeCalculatorModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [selectedCategory, setSelectedCategory] = useState("tourist-30d");

  const countryConfig = useMemo(() => {
    return getCountryFeeConfig(selectedCountry);
  }, [selectedCountry]);

  const categoryConfig = useMemo(() => {
    return getVisaCategoryById(selectedCategory);
  }, [selectedCategory]);

  const calculatedFee = useMemo(() => {
    if (countryConfig.tier === "Gratis (Zero Fee)") return 0;
    if (selectedCategory === "tourist-30d") return countryConfig.tourist30D;
    if (selectedCategory === "tourist-1y") return countryConfig.tourist1Y;
    if (selectedCategory === "tourist-5y") return countryConfig.tourist5Y;
    if (selectedCategory === "business") return countryConfig.business;
    if (selectedCategory === "medical" || selectedCategory === "ayush") return countryConfig.medical;
    if (selectedCategory === "conference") return countryConfig.conference;
    return categoryConfig.feeInr;
  }, [countryConfig, selectedCategory, categoryConfig]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box medium-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Fee &amp; Validity Matrix
            </div>
            <h2>e-Visa Fee Calculator</h2>
            <p className="modal-subtitle">
              Calculate government visa processing fees across all 174 eligible nationalities.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="calculator-body">
          <div className="calc-row">
            <div className="calc-field">
              <label htmlFor="calc-country">Select Nationality / Passport Country</label>
              <div className="select-wrap">
                <Globe2 size={17} />
                <select
                  id="calc-country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {eligibleCountriesList.map((country) => (
                    <option key={country} value={country}>
                      {country} {zeroFeeCountries.includes(country) ? "· (Gratis / Zero Fee)" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="select-chevron" />
              </div>
            </div>

            <div className="calc-field">
              <label htmlFor="calc-category">e-Visa Subcategory</label>
              <div className="select-wrap">
                <Calculator size={17} />
                <select
                  id="calc-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {visaCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.entries})
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="select-chevron" />
              </div>
            </div>
          </div>

          <div className="calc-result-card">
            <div className="calc-result-top">
              <div className="calc-badge">{categoryConfig.badge}</div>
              <div className="calc-price">
                <small>Government Fee</small>
                <strong>{calculatedFee === 0 ? "GRATIS (₹0)" : `₹${calculatedFee.toLocaleString("en-IN")}`}</strong>
              </div>
            </div>

            <div className="calc-details-grid">
              <div className="calc-detail-item">
                <span>Validity</span>
                <strong>{categoryConfig.validity}</strong>
              </div>
              <div className="calc-detail-item">
                <span>Entry Allowance</span>
                <strong>{categoryConfig.entries}</strong>
              </div>
              <div className="calc-detail-item">
                <span>Max Stay Duration</span>
                <strong>{categoryConfig.stayDuration}</strong>
              </div>
              <div className="calc-detail-item">
                <span>Bank Surcharge</span>
                <strong>0% (Demo Gateway)</strong>
              </div>
            </div>

            <div className="calc-notice">
              <Info size={16} />
              <p>{countryConfig.notes || categoryConfig.eligibilityNotes}</p>
            </div>
          </div>

          <div className="calc-documents-preview">
            <h4>Mandatory Documents Required</h4>
            <div className="calc-doc-tags">
              {categoryConfig.requiredDocuments.map((doc, idx) => (
                <span key={idx} className="calc-doc-tag">
                  <CheckCircle2 size={13} /> {doc}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer-actions">
          <button className="button button-secondary" onClick={onClose}>
            Close
          </button>
          {onApplyNow && (
            <button
              className="button button-primary"
              onClick={() => {
                onClose();
                onApplyNow(selectedCountry, selectedCategory);
              }}
            >
              Start this application <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
