"use client";

import React, { useState, useMemo } from "react";
import { checkposts, type CheckpostType } from "../data/checkposts";
import { Search, X, Plane, Ship, MapPin, Train, ShieldCheck, CheckCircle2, Info } from "lucide-react";

interface PortsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PortsDirectoryModal({ isOpen, onClose }: PortsDirectoryModalProps) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<CheckpostType | "All">("All");

  const filteredPorts = useMemo(() => {
    return checkposts.filter((p) => {
      const matchType = activeTab === "All" || p.type === activeTab;
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        (p.code && p.code.toLowerCase().includes(q));
      return matchType && matchQuery;
    });
  }, [query, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box wide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="kicker">
              <span className="kicker-line" /> Official Directory
            </div>
            <h2>Authorized Ports of Entry & Exit</h2>
            <p className="modal-subtitle">
              Foreign nationals holding a valid e-Visa / ETA can enter India via designated Airports & Seaports.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="ports-controls">
          <div className="search-input-wrap">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search by airport, seaport, city, or state (e.g. Delhi, Mumbai, Goa, CCU)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="clear-query-btn" onClick={() => setQuery("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="ports-tab-row">
            <button
              className={`ports-tab ${activeTab === "All" ? "active" : ""}`}
              onClick={() => setActiveTab("All")}
            >
              All Checkposts ({checkposts.length})
            </button>
            <button
              className={`ports-tab ${activeTab === "Airport" ? "active" : ""}`}
              onClick={() => setActiveTab("Airport")}
            >
              <Plane size={14} /> Airports (37)
            </button>
            <button
              className={`ports-tab ${activeTab === "Seaport" ? "active" : ""}`}
              onClick={() => setActiveTab("Seaport")}
            >
              <Ship size={14} /> Seaports (38)
            </button>
            <button
              className={`ports-tab ${activeTab === "Land ICP" ? "active" : ""}`}
              onClick={() => setActiveTab("Land ICP")}
            >
              <MapPin size={14} /> Land ICPs (16)
            </button>
            <button
              className={`ports-tab ${activeTab === "Rail Checkpost" ? "active" : ""}`}
              onClick={() => setActiveTab("Rail Checkpost")}
            >
              <Train size={14} /> Rail (5)
            </button>
          </div>
        </div>

        <div className="ports-results-wrap">
          <div className="ports-stats">
            <span>Showing {filteredPorts.length} designated locations</span>
            <span className="biometric-tag">
              <ShieldCheck size={13} /> Biometric e-Visa counters enabled
            </span>
          </div>

          <div className="ports-grid">
            {filteredPorts.map((port, idx) => (
              <div key={idx} className="port-card">
                <div className="port-icon-col">
                  {port.type === "Airport" && <Plane size={18} className="port-type-icon air" />}
                  {port.type === "Seaport" && <Ship size={18} className="port-type-icon sea" />}
                  {port.type === "Land ICP" && <MapPin size={18} className="port-type-icon land" />}
                  {port.type === "Rail Checkpost" && <Train size={18} className="port-type-icon rail" />}
                </div>
                <div className="port-info-col">
                  <h4>{port.name}</h4>
                  <p>{port.state}</p>
                  {port.notes && <small className="port-note">{port.notes}</small>}
                </div>
                <div className="port-badge-col">
                  <span className="status-pill ready">
                    <CheckCircle2 size={12} /> e-Visa Eligible
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredPorts.length === 0 && (
            <div className="empty-search-state">
              <Info size={24} />
              <p>No checkposts found matching &ldquo;{query}&rdquo;.</p>
              <button className="text-button" onClick={() => { setQuery(""); setActiveTab("All"); }}>
                Reset search filters
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer-notice">
          <Info size={15} />
          <p>
            <strong>Exit Advisory:</strong> Travelers can exit from ANY authorized Immigration Check Post (ICP) in India, including all 37 airports, 38 seaports, and authorized land/rail ICPs.
          </p>
        </div>
      </div>
    </div>
  );
}
