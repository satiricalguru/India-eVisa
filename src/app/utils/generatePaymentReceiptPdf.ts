import { jsPDF } from "jspdf";
import { EMBLEM_BASE64 } from "./emblemBase64";

export interface PaymentReceiptData {
  transactionId?: string;
  applicationId?: string;
  applicantName?: string;
  passportNumber?: string;
  visaCategory?: string;
  amountInr?: number;
  paymentMode?: string;
  gateway?: string;
  paymentDate?: string;
  status?: string;
}

export function generatePaymentReceiptPdf(data: PaymentReceiptData = {}) {
  const {
    transactionId = "TXN-2026-98124509",
    applicationId = "IND-2026-88914",
    applicantName = "Alex Morgan",
    passportNumber = "542617843",
    visaCategory = "e-Tourist Visa (30 Days)",
    amountInr = 2100,
    paymentMode = "SBI ePay / International Card (Visa/Mastercard)",
    gateway = "SBIePay-GovGateway",
    paymentDate = "29 Aug 2026, 10:30 AM IST",
    status = "SUCCESS / CONFIRMED"
  } = data;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Outer Border
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
  doc.text("MINISTRY OF HOME AFFAIRS · e-VISA PAYMENT RECEIPT", pageWidth / 2, y, { align: "center" });

  y += 8;

  // Receipt Badge Box
  doc.setFillColor(242, 248, 244);
  doc.setDrawColor(40, 130, 75);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin + 4, y, contentWidth - 8, 16, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(25, 100, 55);
  doc.text("PAYMENT STATUS: " + status, margin + 8, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(60, 80, 70);
  doc.text(`Transaction Reference: ${transactionId} · Date: ${paymentDate}`, margin + 8, y + 12);

  y += 22;

  // Receipt Particulars Table
  const drawReceiptRow = (label: string, value: string, currentTop: number) => {
    doc.setDrawColor(230, 235, 232);
    doc.setLineWidth(0.2);
    doc.line(margin + 4, currentTop + 7, margin + contentWidth - 4, currentTop + 7);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(90, 105, 100);
    doc.text(label, margin + 8, currentTop + 5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(25, 38, 35);
    doc.text(value, margin + 70, currentTop + 5);
  };

  drawReceiptRow("Application ID", applicationId, y);
  y += 8;
  drawReceiptRow("Primary Applicant Name", applicantName, y);
  y += 8;
  drawReceiptRow("Passport Number", passportNumber, y);
  y += 8;
  drawReceiptRow("Visa Category Applied", visaCategory, y);
  y += 8;
  drawReceiptRow("Payment Gateway", gateway, y);
  y += 8;
  drawReceiptRow("Payment Channel", paymentMode, y);
  y += 8;
  drawReceiptRow("Government Application Fee", `INR ${amountInr.toLocaleString("en-IN")}.00`, y);
  y += 8;
  drawReceiptRow("Bank Processing / Surcharge", "INR 0.00 (Zero Surcharge)", y);
  y += 8;
  drawReceiptRow("Total Amount Paid", `INR ${amountInr.toLocaleString("en-IN")}.00`, y);
  y += 12;

  // Advisory Box
  doc.setFillColor(252, 253, 250);
  doc.setDrawColor(215, 225, 220);
  doc.roundedRect(margin + 4, y, contentWidth - 8, 28, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(28, 62, 72);
  doc.text("IMPORTANT PAYMENT ADVISORY", margin + 8, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(90, 105, 100);
  doc.text("• e-Visa fee once submitted is non-refundable as it covers verification and scrutiny costs.", margin + 8, y + 11);
  doc.text("• Processing timeline begins immediately upon successful payment confirmation.", margin + 8, y + 16);
  doc.text("• The Electronic Travel Authorization (ETA) status will be updated online within 24 to 72 hours.", margin + 8, y + 21);

  // Bottom Notice
  const bottomY = pageHeight - margin - 5;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(140, 150, 145);
  doc.text("Indian Visa Online · Bureau of Immigration (indianvisaonline.gov.in)", pageWidth / 2, bottomY, { align: "center" });

  doc.save(`India_e-Visa_Receipt_${applicationId}.pdf`);
}
