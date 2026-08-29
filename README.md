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

**[Watch Demo Video](#-interactive-demo-video) • [Official Generated ETA Pass (PDF)](#-official-generated-eta-visa-pass) • [Visual Walkthrough Grid](#-application-walkthrough--screenshot-grid) • [Architecture](#-architecture--how-gpt-56-luna--gpt-56-terra-built-this)**

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

## 🎥 Interactive Demo Video

Watch the complete end-to-end applicant journey in action:

https://github.com/satiricalguru/India-eVisa/raw/main/india-visa-demo.mp4

<div align="center">
  <video src="https://github.com/satiricalguru/India-eVisa/raw/main/india-visa-demo.mp4" controls width="100%" style="max-width: 860px; border-radius: 12px; box-shadow: 0 12px 36px rgba(0,0,0,0.18);">
    <p>Your browser does not support embedded videos. <a href="https://github.com/satiricalguru/India-eVisa/raw/main/india-visa-demo.mp4"><strong>Click here to play / download india-visa-demo.mp4</strong></a>.</p>
  </video>
  <br /><br />
  <a href="india-visa-demo.mp4"><img src="https://img.shields.io/badge/Download_Demo_Video-MP4_(2.0_MB)-FF9933?style=for-the-badge&logo=quicktime&logoColor=white" alt="Download Demo Video" /></a>
  &nbsp;&nbsp;
  <a href="India-eVisa-ETA-ETV-2026-98312.pdf"><img src="https://img.shields.io/badge/Download_Sample-ETA_Certificate_(PDF)-10A37F?style=for-the-badge&logo=adobeacrobatreader&logoColor=white" alt="Download Sample PDF" /></a>
</div>

---

## 📄 Official Generated ETA Visa Pass

When an application is approved, the portal automatically generates a print-ready, high-fidelity **Electronic Travel Authorization (ETA)** document with security features, Ashoka emblem seal, QR verification code, and barcode.

<div align="center">
  <a href="India-eVisa-ETA-ETV-2026-98312.pdf">
    <img src="public/screenshots/sample-eta-pdf-preview.png" alt="Official Sample ETA Visa Document Generated by India eVisa 2.0" width="620" style="border-radius: 8px; box-shadow: 0 14px 40px rgba(0,0,0,0.18); border: 1px solid #e2e8f0;" />
  </a>
  <br /><br />
  <p><em>Official Electronic Travel Authorization (ETA) Certificate generated by the platform.</em></p>
  <a href="India-eVisa-ETA-ETV-2026-98312.pdf">
    <strong>📥 Click here to open / download India-eVisa-ETA-ETV-2026-98312.pdf</strong>
  </a>
</div>

---

## 📸 Application Walkthrough & Screenshot Grid

<table width="100%">
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/01-landing-hero.png">
        <img src="public/screenshots/01-landing-hero.png" alt="01. Modern Landing Page" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>01. Modern Landing Page</strong><br /><em>Hero section with live route mapping & compliance banner</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/02-eligibility-checker.png">
        <img src="public/screenshots/02-eligibility-checker.png" alt="02. Upfront Eligibility Checker" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>02. Upfront Eligibility Checker</strong><br /><em>4-question instant category & duration verification</em></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/03-eligibility-result.png">
        <img src="public/screenshots/03-eligibility-result.png" alt="03. Personal Checklist & Fee Estimate" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>03. Personal Checklist & Fee Estimate</strong><br /><em>Tailored 3-item checklist & upfront transparent estimate</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/04-demo-login.png">
        <img src="public/screenshots/04-demo-login.png" alt="04. Demo Sign-in (Mock OTP)" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>04. Demo Sign-in (Mock OTP)</strong><br /><em>One-click mock login with session autosave recovery</em></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/06-wizard-document-ai.png">
        <img src="public/screenshots/06-wizard-document-ai.png" alt="05. AI Passport Pre-Flight Check" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>05. AI Passport Pre-Flight Check</strong><br /><em>GPT-5.6 Terra real-time MRZ & 6-month validity verification</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/07-wizard-photo-check.png">
        <img src="public/screenshots/07-wizard-photo-check.png" alt="06. AI Photo Quality Inspection" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>06. AI Photo Quality Inspection</strong><br /><em>Background color, glare & facial framing validation</em></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/08-review-summary.png">
        <img src="public/screenshots/08-review-summary.png" alt="07. Application Summary Review" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>07. Application Summary Review</strong><br /><em>Comprehensive review with inline instant edit triggers</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/09-transparent-payment.png">
        <img src="public/screenshots/09-transparent-payment.png" alt="08. Unified Transparent Checkout" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>08. Unified Transparent Checkout</strong><br /><em>Single fee (₹2,399) with ₹0 gateway plumbing surcharges</em></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/10-live-tracking-under-review.png">
        <img src="public/screenshots/10-live-tracking-under-review.png" alt="09. Live Status Tracker (Under Review)" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>09. Live Status Tracker (Under Review)</strong><br /><em>Visual milestone timeline & Judge Fast-Forward button</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/11-live-tracking-approved.png">
        <img src="public/screenshots/11-live-tracking-approved.png" alt="10. Simulated Instant Approval" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>10. Simulated Instant Approval</strong><br /><em>Decision-ready status with 1-click PDF pass download</em></p>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/05-wizard-personal.png">
        <img src="public/screenshots/05-wizard-personal.png" alt="11. One-Question Wizard" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>11. One-Question-Per-Screen Wizard</strong><br /><em>Mobile-first progressive disclosure with continuous autosave</em></p>
    </td>
    <td width="50%" align="center" valign="top">
      <a href="public/screenshots/12-fee-calculator-modal.png">
        <img src="public/screenshots/12-fee-calculator-modal.png" alt="12. Dynamic Fee Calculator Modal" width="100%" style="border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
      </a>
      <p><strong>12. Dynamic Fee Calculator Modal</strong><br /><em>Multi-country reciprocity directory with zero-hidden cost logic</em></p>
    </td>
  </tr>
</table>

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

<br />

<div align="center">
  <a href="https://openai.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/openai-logo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="public/openai-logo-light.png">
      <img src="public/openai-logo-light.png" alt="OpenAI Logo" width="240" />
    </picture>
  </a>
  <br /><br />
  <p><em>Built with OpenAI Codex, GPT-5.6 Luna & GPT-5.6 Terra for Build What Moves India</em></p>
</div>
