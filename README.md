<div align="center">

<img src="public/ashoka-emblem.png" alt="Lion Capital of Ashoka - National Emblem of India" width="130" height="auto" />

# 🇮🇳 India eVisa 2.0 (भारत ई-वीजा)
### *A Next-Generation, Mobile-First Public Service Portal for International Visitors*

[![Built for Build What Moves India](https://img.shields.io/badge/Hackathon-Build_What_Moves_India-FF9933?style=for-the-badge&logo=india&logoColor=white)](https://buildwhatmovesindia.com/)
[![Scaffolded with GPT-5.6 Luna](https://img.shields.io/badge/Build_Engine-GPT--5.6_Luna-10A37F?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Vision AI Powered by GPT-5.6 Terra](https://img.shields.io/badge/Vision_AI-GPT--5.6_Terra-8A2BE2?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Powered by OpenAI Codex](https://img.shields.io/badge/Powered_by-OpenAI_Codex-000000?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/)
[![Next.js 16 App Router](https://img.shields.io/badge/Next.js_16-Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br />

**[Live Interactive Walkthrough](#-visual-walkthrough--screenshots) • [Demo Video (MP4)](india-visa-demo.mp4) • [Generated Sample ETA (PDF)](India-eVisa-ETA-ETV-2026-98312.pdf) • [Architecture](#-architecture--how-gpt-56-luna--gpt-56-terra-built-this)**

---

</div>

> **Disclaimer**: This is an **independent hackathon prototype** built for the **[Build What Moves India](https://buildwhatmovesindia.com/)** national initiative. It is not affiliated with the Government of India or the Ministry of Home Affairs. All passport data, OTPs, payments, and visa decisions shown are 100% simulated mock data.

---

## 🎯 Executive Summary & The Problem

Over **5 million international tourists, researchers, and business visitors** apply for an Indian e-Visa each year via the legacy portal (`indianvisaonline.gov.in`). While operationally robust, the current digital experience presents friction at every turn:

1. **Subcategory Overload**: 9 ambiguous visa subcategories dumped on screen 1 without upfront cost or validity guidance.
2. **Silent Document Rejection**: Strict photo and passport specifications (10KB–300KB, exact 350x350 pixels, white background) buried in modal FAQs — applicants find out about rejection **72 hours later**.
3. **Monolithic Form Wall**: 40+ manual inputs across multi-page HTML tables with 15-minute aggressive timeouts and confusing temporary application IDs.
4. **Exposed Gateway Plumbing**: Exposing raw SBI ePay vs Axis Bank pipes, 2.5%–3.5% transaction surcharges, and cryptic 3D-Secure error states to foreign travelers.
5. **Opaque "Under Process" Tracking**: Complete silence between submission and email decision with zero visibility into immigration milestones.

---

## ✨ The Solution: What We Built

**India eVisa 2.0** borrows the best-in-class UX paradigms from the **UK ETA (Gov.uk)** and **New Zealand NZeTA**, blending them into an India-centric design system:

* **🧭 Upfront 4-Question Eligibility Checker**: Tells applicants in 30 seconds if the 30-day e-Tourist Visa fits their trip, what 3 documents they need, and the exact transparent fee (**₹2,399 / $25 USD**) before touching any form.
* **🔍 AI Pre-Flight Document Inspector**: Powered by **GPT-5.6 Terra**, uploaded passport bio-pages and photos are evaluated in real-time. It catches glare, non-white backgrounds, tight crops, and validity < 6 months **before submission**, eliminating the #1 driver of visa rejections.
* **📱 One-Question-Per-Screen Wizard**: Engineered with **GPT-5.6 Luna** for mobile-first progressive disclosure with continuous autosave to session state, estimated time indicators, and keyboard accessibility.
* **💳 Single-Number Transparent Checkout**: One all-inclusive fee breakdown with ₹0 hidden gateway charges and simulated 1-click payment processing.
* **📍 Live Multi-Stage Status Tracker**: Visual 3-stage milestone progression (`Submitted` → `Under Review` → `Decision`) with an interactive **"Judge Time-Travel Mode"** to test simulated approvals instantly.
* **📄 Official PDF ETA Pass Generator**: Instant client-side generation of high-fidelity Electronic Travel Authorization certificates with Ashoka watermarks, QR verification codes, and barcodes.

---

## 🎥 Demo Video & Generated Documents

### 1. Application Walkthrough Video
Watch the full end-to-end journey in action:
* 🎬 **Local Video File**: **[india-visa-demo.mp4](india-visa-demo.mp4)** *(2.0 MB)*

### 2. Generated Electronic Travel Authorization (ETA) PDF
Inspect the authentic, print-ready digital travel pass produced upon approval:
* 📄 **Official Sample ETA Pass**: **[India-eVisa-ETA-ETV-2026-98312.pdf](India-eVisa-ETA-ETV-2026-98312.pdf)** *(Includes QR code, Barcode, Govt seal, and security instructions)*

---

## 📸 Visual Walkthrough & Screenshots

### 1. Modern Government-Grade Landing Page
<div align="center">
  <img src="public/screenshots/01-landing-hero.png" alt="India eVisa Landing Hero" width="900" />
  <p><em>Hero section with live route mapping (London → New Delhi), clear CTAs, and hackathon compliance ribbons.</em></p>
</div>

<br />

### 2. Upfront Eligibility Checker (30-Second Route Match)
<div align="center">
  <img src="public/screenshots/02-eligibility-checker.png" alt="Eligibility Checker" width="900" />
  <p><em>Step-by-step guided questions determine visa eligibility prior to account creation.</em></p>
</div>

<br />

### 3. Personal Checklist & Transparent Fee Estimate
<div align="center">
  <img src="public/screenshots/03-eligibility-result.png" alt="Eligibility Result and Checklist" width="900" />
  <p><em>Tailored document checklist, 3-step timeline preview, and guaranteed upfront price estimate.</em></p>
</div>

<br />

### 4. Zero-Friction Demo Sign-In & OTP
<div align="center">
  <img src="public/screenshots/04-demo-login.png" alt="Demo OTP Login" width="900" />
  <p><em>One-click mock OTP login preserving session state across browser refreshes.</em></p>
</div>

<br />

### 5. AI Pre-Flight Document & Passport Verification
<div align="center">
  <img src="public/screenshots/06-wizard-document-ai.png" alt="AI Passport Bio-Page Verification" width="900" />
  <p><em>Real-time GPT-5.6 Terra Vision document verification flagging readability and MRZ parameters.</em></p>
</div>

<br />

### 6. AI Photo Quality Inspection
<div align="center">
  <img src="public/screenshots/07-wizard-photo-check.png" alt="AI Photo Quality Check" width="900" />
  <p><em>Instant background color, crop framing, and facial alignment validation powered by GPT-5.6 Terra.</em></p>
</div>

<br />

### 7. Application Review & Summary
<div align="center">
  <img src="public/screenshots/08-review-summary.png" alt="Review Summary Screen" width="900" />
  <p><em>Comprehensive one-page summary allowing direct inline edits without losing form progress.</em></p>
</div>

<br />

### 8. Unified Transparent Payment
<div align="center">
  <img src="public/screenshots/09-transparent-payment.png" alt="Transparent Payment Screen" width="900" />
  <p><em>One clear number (₹2,399) with ₹0 gateway surcharges and mock card processing.</em></p>
</div>

<br />

### 9. Live Application Status Tracker (Under Review)
<div align="center">
  <img src="public/screenshots/10-live-tracking-under-review.png" alt="Live Status Tracker Under Review" width="900" />
  <p><em>Transparent stage tracker with real-time milestone timestamps and Judge Fast-Forward action.</em></p>
</div>

<br />

### 10. Instant Simulated Approval & Downloadable ETA
<div align="center">
  <img src="public/screenshots/11-live-tracking-approved.png" alt="Approved Status and ETA Download" width="900" />
  <p><em>Simulated instant approval state with 1-click official PDF ETA download.</em></p>
</div>

<br />

### 11. Interactive Dynamic Fee Calculator Modal
<div align="center">
  <img src="public/screenshots/12-fee-calculator-modal.png" alt="Fee Calculator Modal" width="900" />
  <p><em>Comprehensive multi-country, multi-category reciprocity fee calculator with zero-hidden cost logic.</em></p>
</div>

---

## 🏗️ Architecture & How GPT-5.6 Luna + GPT-5.6 Terra Built This

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   INDIA eVISA 2.0 ARCHITECTURE                                  │
├───────────────────────────────┬─────────────────────────────────┬───────────────────────────────┤
│ Layer                         │ Technology / Service            │ Purpose                       │
├───────────────────────────────┼─────────────────────────────────┼───────────────────────────────┤
│ Frontend Framework            │ Next.js 16 (App Router)         │ High-performance SSR & SPA    │
│ Architecture & State Engine   │ GPT-5.6 Luna                    │ Wizard state machine & schemas│
│ In-Product Vision AI          │ GPT-5.6 Terra                   │ Real-time doc & photo checks  │
│ Tooling & Build Acceleration  │ OpenAI Codex                    │ Prompt-to-code pipelines      │
│ Styling & UI Design System    │ Vanilla CSS + Tailwind CSS 4    │ Custom Indian Gov Design Sys  │
│ Iconography & Micro-Motion    │ Lucide React + CSS Keyframes    │ Fluid interactive feedback    │
│ Document Rendering Engine     │ Custom Canvas / Vector PDF Gen  │ Official ETA & receipt PDFs   │
│ Client Persistence            │ Browser SessionStorage API      │ Resilient autosave & recovery │
└───────────────────────────────┴─────────────────────────────────┴───────────────────────────────┘
```

### 🧠 The Dual AI Engine: GPT-5.6 Luna & GPT-5.6 Terra

This project was built and powered by a specialized combination of cutting-edge models:

1. **🏛️ GPT-5.6 Luna (Systems Architecture & Flow Engine)**:
   - Scaffolded the resilient, multi-step application wizard and session autosave state machine.
   - Built the zero-friction data contracts, responsive modal interfaces, and the interactive **Judge Time-Travel Mode**.
   - Authored the client-side vector PDF generation engines (`generateEtaPdf.ts`, `generateApplicationSummaryPdf.ts`, `generatePaymentReceiptPdf.ts`).

2. **👁️ GPT-5.6 Terra (Multimodal Vision & Document Intelligence)**:
   - Powers the real-time `/api/document-check` pre-flight inspection pipeline.
   - Evaluates passport bio-data (MRZ sharpness, 6-month validity, corner visibility).
   - Validates applicant portrait lighting, neutral expression, and plain background compliance.

3. **⚡ OpenAI Codex (Build Acceleration)**:
   - Rapidly generated boilerplate structures, TypeScript types, and checkpost lookup databases for all 31 immigration airports and 5 seaports.

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.18+ or v20+ / v22+
* **npm**: v9+ or v10+

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/satiricalguru/India-eVisa.git
cd India-eVisa

# 2. Install dependencies
npm install

# 3. (Optional) Configure OpenAI API Key for live AI Document Checks
# If omitted, the application uses realistic mock AI pre-flight responses!
export OPENAI_API_KEY="your-openai-api-key"
export OPENAI_DOCUMENT_MODEL="gpt-5.6-terra"

# 4. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience the application.

---

## 🏆 Hackathon Credits & Acknowledgements

* **Hackathon**: [Build What Moves India](https://buildwhatmovesindia.com/)
* **Systems Architecture & Logic**: Built with **GPT-5.6 Luna**
* **Multimodal Document Vision**: Powered by **GPT-5.6 Terra**
* **Tooling & Build Acceleration**: Accelerated by **OpenAI Codex**
* **Inspiration**: Gov.uk Design System (UK ETA) & Immigration New Zealand (NZeTA)
* **Author**: Jatin Pandey ([@satiricalguru](https://github.com/satiricalguru))

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.
