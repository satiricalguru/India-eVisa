import { jsPDF } from "jspdf";
import { EMBLEM_BASE64 } from "./emblemBase64";

export interface ApplicationPdfData {
  applicationId?: string;
  temporaryId?: string;
  fullName?: string;
  gender?: string;
  dob?: string;
  passportNumber?: string;
  nationality?: string;
  email?: string;
  phone?: string;
  stay?: string;
  visaType?: string;
  submissionDate?: string;
  portOfArrival?: string;
}

export function generateApplicationSummaryPdf(data: ApplicationPdfData = {}) {
  const {
    applicationId = "IND-2026-88914",
    temporaryId = "TEMP-IND-749102",
    fullName = "Alex Morgan",
    gender = "Female",
    dob = "14 May 1992",
    passportNumber = "542617843",
    nationality = "United Kingdom",
    email = "alex.morgan@example.com",
    phone = "+44 7700 900 123",
    stay = "The Park, New Delhi",
    visaType = "e-Tourist Visa (30 Days)",
    submissionDate = "29 Aug 2026",
    portOfArrival = "Indira Gandhi International Airport, New Delhi (DEL)"
  } = data;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Outer & Inner Security Borders
  doc.setDrawColor(210, 218, 212);
  doc.setLineWidth(0.3);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);

  doc.setDrawColor(28, 62, 72);
  doc.setLineWidth(0.7);
  doc.rect(margin + 1.5, margin + 1.5, contentWidth - 3, pageHeight - margin * 2 - 3);

  // Top Tricolor Accent Line
  const tricolorY = margin + 2;
  const segW = (contentWidth - 3) / 3;
  doc.setFillColor(233, 165, 56);
  doc.rect(margin + 1.5, tricolorY, segW, 1.8, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(margin + 1.5 + segW, tricolorY, segW, 1.8, "F");
  doc.setFillColor(40, 130, 75);
  doc.rect(margin + 1.5 + segW * 2, tricolorY, segW, 1.8, "F");

  // Watermark
  doc.saveGraphicsState();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(245, 246, 244);
  doc.text("OFFICIAL COPY · PROTOTYPE", pageWidth / 2, 135, { align: "center", angle: 45 });
  doc.restoreGraphicsState();

  // Emblem Header
  const emblemW = 14;
  const emblemH = 23;
  const emblemY = margin + 6;
  try {
    doc.addImage(EMBLEM_BASE64, "PNG", pageWidth / 2 - emblemW / 2, emblemY, emblemW, emblemH);
  } catch {
    // fallback
  }

  let y = emblemY + emblemH + 6;
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 34, 32);
  doc.text("GOVERNMENT OF INDIA", pageWidth / 2, y, { align: "center" });

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(28, 62, 72);
  doc.text("MINISTRY OF HOME AFFAIRS · BUREAU OF IMMIGRATION", pageWidth / 2, y, { align: "center" });

  y += 4.5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(233, 165, 56);
  doc.text("OFFICIAL e-VISA APPLICATION SUMMARY RECORD", pageWidth / 2, y, { align: "center" });

  y += 7;
  // Application Barcode Banner Box
  doc.setFillColor(247, 249, 247);
  doc.setDrawColor(215, 225, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 4, y, contentWidth - 8, 14, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 115, 110);
  doc.text("APPLICATION ID:", margin + 8, y + 6);
  doc.setFontSize(10);
  doc.setTextColor(20, 34, 32);
  doc.text(applicationId, margin + 37, y + 6);

  doc.setFontSize(8.5);
  doc.setTextColor(100, 115, 110);
  doc.text("TEMP REF NO:", margin + 98, y + 6);
  doc.setFontSize(9.5);
  doc.setTextColor(20, 34, 32);
  doc.text(temporaryId, margin + 125, y + 6);

  doc.setFontSize(7.5);
  doc.setTextColor(120, 135, 130);
  doc.text(`Submitted on: ${submissionDate} · Status: Form Scrutiny / Active Record`, margin + 8, y + 11);

  y += 18;

  // Helper function to draw section title
  const drawSectionTitle = (title: string, top: number) => {
    doc.setFillColor(28, 62, 72);
    doc.rect(margin + 4, top, contentWidth - 8, 5.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 7, top + 4);
  };

  // Helper function to draw key-value table
  const drawRow = (leftKey: string, leftVal: string, rightKey: string, rightVal: string, top: number) => {
    doc.setDrawColor(230, 235, 232);
    doc.setLineWidth(0.2);
    doc.line(margin + 4, top + 6, margin + contentWidth - 4, top + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(110, 125, 120);
    doc.text(leftKey, margin + 6, top + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 38, 35);
    doc.text(leftVal, margin + 45, top + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(110, 125, 120);
    doc.text(rightKey, margin + 95, top + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 38, 35);
    doc.text(rightVal, margin + 135, top + 4.5);
  };

  // Section 1: Applicant Particulars
  drawSectionTitle("1. APPLICANT PARTICULARS", y);
  y += 7;
  drawRow("Full Name:", fullName, "Gender:", gender, y);
  y += 6.5;
  drawRow("Date of Birth:", dob, "Nationality:", nationality, y);
  y += 6.5;
  drawRow("Email Address:", email, "Phone / Mobile:", phone, y);
  y += 9;

  // Section 2: Passport Information
  drawSectionTitle("2. PASSPORT & TRAVEL PARTICULARS", y);
  y += 7;
  drawRow("Passport Number:", passportNumber, "Country of Issue:", nationality, y);
  y += 6.5;
  drawRow("Visa Applied For:", visaType, "Designated Entry:", "Air / Authorized Sea Ports", y);
  y += 6.5;
  drawRow("Expected Port of Entry:", portOfArrival.substring(0, 24), "Stay Address:", stay.substring(0, 24), y);
  y += 9;

  // Section 3: Verification & Security Declarations
  drawSectionTitle("3. DECLARATION & STATUTORY NOTICES", y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(70, 85, 80);
  const declarationText =
    "I hereby declare that all information furnished by me in this application is true and complete. I understand that granting of e-Visa / ETA is subject to verification by the immigration authorities upon arrival in India. Biometric capture is mandatory at immigration check posts.";
  const splitDec = doc.splitTextToSize(declarationText, contentWidth - 14);
  doc.text(splitDec, margin + 6, y + 3.5);

  y += 18;

  // Sign & Stamp Box
  doc.setFillColor(252, 253, 250);
  doc.setDrawColor(215, 225, 220);
  doc.roundedRect(margin + 4, y, contentWidth - 8, 26, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(28, 62, 72);
  doc.text("OFFICIAL RECORD SEAL", margin + 8, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(110, 125, 120);
  doc.text("Government of India e-Visa Portal Verification System", margin + 8, y + 11);
  doc.text("Electronic Signature verified · No physical signature required on submission", margin + 8, y + 15);
  doc.text("Carry this printout along with your original valid passport during your journey.", margin + 8, y + 20);

  // Bottom Notice
  const bottomY = pageHeight - margin - 5;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(140, 150, 145);
  doc.text("Simulated Official Record · Indian Visa Online Portal (indianvisaonline.gov.in)", pageWidth / 2, bottomY, { align: "center" });

  doc.save(`India_Visa_Application_${applicationId}.pdf`);
}
