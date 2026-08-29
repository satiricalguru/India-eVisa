"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Info } from "lucide-react";

interface ArrivalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultName?: string;
  defaultPassport?: string;
}

export function ArrivalCardModal({ isOpen, onClose, defaultName = "Alex Morgan", defaultPassport = "542617843" }: ArrivalCardModalProps) {
  const [name, setName] = useState(defaultName);
  const [passport, setPassport] = useState(defaultPassport);
  const [flightNumber, setFlightNumber] = useState("AI-162");
  const [arrivalDate, setArrivalDate] = useState("2026-10-15");
  const [port, setPort] = useState("Delhi (DEL) - Indira Gandhi Intl");
  const [seatNumber, setSeatNumber] = useState("14A");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box medium-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Su-Swagatam Assistant
            </div>
            <h2>e-Arrival Disembarkation Card</h2>
            <p className="modal-subtitle">
              Foreign travelers and OCI holders can submit arrival info online within 72 hours of flight.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="arrival-form">
            <div className="calc-row">
              <div className="calc-field">
                <label htmlFor="arr-name">Full Name as in Passport</label>
                <input
                  id="arr-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="calc-field">
                <label htmlFor="arr-passport">Passport Number</label>
                <input
                  id="arr-passport"
                  type="text"
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="calc-row">
              <div className="calc-field">
                <label htmlFor="arr-flight">Flight / Vessel Number</label>
                <input
                  id="arr-flight"
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="e.g. AI-162, BA-143, EK-510"
                  required
                />
              </div>
              <div className="calc-field">
                <label htmlFor="arr-seat">Seat Number (Optional)</label>
                <input
                  id="arr-seat"
                  type="text"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  placeholder="e.g. 14A, 22C"
                />
              </div>
            </div>

            <div className="calc-row">
              <div className="calc-field">
                <label htmlFor="arr-date">Expected Arrival Date in India</label>
                <input
                  id="arr-date"
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  required
                />
              </div>
              <div className="calc-field">
                <label htmlFor="arr-port">Port of Arrival</label>
                <select id="arr-port" value={port} onChange={(e) => setPort(e.target.value)}>
                  <option>Delhi (DEL) - Indira Gandhi Intl</option>
                  <option>Mumbai (BOM) - Chhatrapati Shivaji</option>
                  <option>Bengaluru (BLR) - Kempegowda Intl</option>
                  <option>Chennai (MAA) - Chennai Intl</option>
                  <option>Goa (GOX) - Manohar Intl Airport</option>
                  <option>Cochin (COK) - Cochin Intl</option>
                </select>
              </div>
            </div>

            <div className="arrival-notice-box">
              <Info size={16} />
              <p>
                <strong>Note:</strong> The e-Arrival card is an immigration disembarkation document to facilitate swift biometric clearance at Indian airports. It does not replace your e-Visa / ETA.
              </p>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="button button-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Generate Digital e-Arrival Pass <ArrowRight size={16} />
              </button>
            </div>
          </form>
        ) : (
          <div className="arrival-success-view">
            <div className="digital-arrival-pass">
              <div className="pass-top">
                <div>
                  <span className="pass-kicker">GOVERNMENT OF INDIA · SU-SWAGATAM</span>
                  <h3>Digital Arrival QR Pass</h3>
                </div>
                <div className="pass-status-pill">
                  <CheckCircle2 size={13} /> READY FOR AIRPORT
                </div>
              </div>

              <div className="pass-details-grid">
                <div>
                  <span>Passenger Name</span>
                  <strong>{name}</strong>
                </div>
                <div>
                  <span>Passport Number</span>
                  <strong>{passport}</strong>
                </div>
                <div>
                  <span>Flight & Seat</span>
                  <strong>{flightNumber} · Seat {seatNumber}</strong>
                </div>
                <div>
                  <span>Arrival Port & Date</span>
                  <strong>{port} · {arrivalDate}</strong>
                </div>
              </div>

              <div className="pass-qr-sim">
                <div className="qr-box-inner">
                  <ShieldCheck size={28} />
                  <span>ARR-QR-2026-99124</span>
                </div>
                <p>Present at the dedicated Su-Swagatam fast-track e-Visa lanes upon arrival.</p>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button className="button button-primary" onClick={onClose}>
                Done & Save to Phone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
