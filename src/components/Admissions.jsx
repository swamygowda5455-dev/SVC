import React, { useState } from "react";
import { 
  CheckCircle2, ClipboardList, Sparkles, Clock, FileText, ArrowRight, AlertCircle, 
  User, Mail, Phone, MapPin, Send, FileDown, RefreshCw, BookOpen, ChevronRight, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

// Standard list of Karnataka's 31 districts for the dropdown selection
const KARNATAKA_DISTRICTS = [
  "Bagalkot",
  "Ballari (Bellary)",
  "Belagavi (Belgaum)",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura (Bijapur)",
  "Vijayanagara",
  "Yadgir"
];

// Helper function to load image asynchronously as HTMLImageElement
const loadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn("Failed to load logo image, fallback will be used.");
      resolve(null);
    };
  });
};

// Helper to generate a professional PDF receipt
const generatePDF = (data, branding, logoImgElement) => {
  const doc = new jsPDF();
  const collegeName = branding?.collegeName || "Sri Vidya Chetana Degree College";
  const email = branding?.email || "admissions@srividyachetana.edu.in";
  const phone = branding?.phone || "+91 94481 23456";
  const address = branding?.address || "Chintamani, Chikkaballapura, Karnataka, India";
  const tagline = branding?.tagline || "Excellence in Academics & Competitive Coaching Success";

  const startX = 15;
  const endX = 195;
  
  // 1. Draw page border
  doc.setDrawColor(30, 58, 138); // Dark blue border (#1E3A8A)
  doc.setLineWidth(0.5);
  doc.rect(5, 5, 200, 287);

  // 2. Logo drawing (Using imported image with fallback)
  let logoDrawn = false;
  if (logoImgElement) {
    try {
      doc.addImage(logoImgElement, 'JPEG', 14, 9, 23, 23);
      logoDrawn = true;
    } catch (err) {
      console.error("Failed to add image to PDF:", err);
    }
  }

  // Draw fallback vector crest logo ONLY if image load fails
  if (!logoDrawn) {
    // Outer circle (Dark Blue)
    doc.setFillColor(30, 58, 138);
    doc.circle(25, 22, 12, 'F');
    
    // Inner circle (White)
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 22, 10.5, 'F');
    
    // Gold accent circle
    doc.setFillColor(245, 158, 11); // Gold (#F59E0B)
    doc.circle(25, 22, 9.5, 'F');
    
    // Center circle (Dark Blue)
    doc.setFillColor(30, 58, 138);
    doc.circle(25, 22, 8.5, 'F');
    
    // Logo letters in Serif Font
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(9);
    doc.text("SVC", 25, 25, { align: "center" });
  }

  // 3. College Name & Header Info
  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(collegeName.toUpperCase(), 41, 18);
  
  doc.setTextColor(146, 64, 14); // Gold/Brown accent
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(tagline.toUpperCase(), 41, 23);
  
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`${address} | Email: ${email} | Tel: ${phone}`, 41, 28);

  // 4. Double divider lines
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.8);
  doc.line(12, 35, 198, 35);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.3);
  doc.line(12, 37, 198, 37);

  // 5. Document title
  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("ADMISSION ENQUIRY & PROVISIONAL REGISTRATION RECEIPT", 105, 48, { align: "center" });

  // 6. Application Details Reference
  const appId = "SVC-2026-" + Math.floor(100000 + Math.random() * 900000);
  const dateStr = new Date().toLocaleString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Reference No: ${appId}`, 15, 58);
  doc.text(`Date & Time: ${dateStr}`, 195, 58, { align: "right" });

  // 7. Form details table
  let y = 64;
  const rowHeight = 11;
  const midX = 65;

  const fields = [
    { label: "Full Name", value: data.fullName },
    { label: "Email Address", value: data.email },
    { label: "Phone Number", value: data.phone },
    { label: "District of Residence", value: data.district },
    { label: "Course Interested", value: data.course },
    { label: "Additional Message", value: data.message || "No additional message provided." }
  ];

  // Draw table header
  doc.setFillColor(30, 58, 138);
  doc.rect(startX, y, endX - startX, rowHeight, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Enquiry Details Key", startX + 4, y + 7.5);
  doc.text("Applicant Responses", midX + 4, y + 7.5);

  y += rowHeight;

  // Draw table rows
  doc.setFont("helvetica", "normal");
  
  fields.forEach((field, i) => {
    const isMessage = field.label === "Additional Message";
    const wrappedText = doc.splitTextToSize(String(field.value), endX - midX - 8);
    const thisRowHeight = isMessage ? Math.max(rowHeight, (wrappedText.length * 5) + 6) : rowHeight;

    // Alternating background colors
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(startX, y, endX - startX, thisRowHeight, 'F');
    }

    // Grid lines
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(startX, y, startX, y + thisRowHeight);
    doc.line(midX, y, midX, y + thisRowHeight);
    doc.line(endX, y, endX, y + thisRowHeight);
    doc.line(startX, y + thisRowHeight, endX, y + thisRowHeight);

    // Label column
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.text(field.label, startX + 4, y + 7);

    // Value column
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    
    if (isMessage) {
      wrappedText.forEach((line, lineIndex) => {
        doc.text(line, midX + 4, y + 7 + (lineIndex * 5));
      });
    } else {
      doc.text(String(field.value), midX + 4, y + 7);
    }

    y += thisRowHeight;
  });

  // 8. Guidelines info box
  y += 10;
  doc.setFillColor(254, 251, 236); // Amber background
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.4);
  doc.rect(startX, y, endX - startX, 26, 'FD');

  doc.setTextColor(180, 83, 9);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("IMPORTANT NEXT STEPS FOR ADMISSION PROCESS:", startX + 4, y + 6);

  doc.setTextColor(67, 76, 94);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("1. Verification Documents: Bring Original and 3 Attested Photocopies of 10th / SSLC Marks Card and PUC / 12th Marks Card.", startX + 4, y + 11);
  doc.text("2. Admission Office: Present a copy of this PDF to the SVC Admission Office within 7 business days to secure your seat.", startX + 4, y + 16);
  doc.text("3. Integrated Classes: Integrated Coaching (IAS, KAS, Banking, CA) starts concurrently with B.Com, B.Sc, and B.A courses.", startX + 4, y + 21);

  // 9. Signature lines
  y += 42;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(startX + 10, y - 5, startX + 55, y - 5);
  doc.line(endX - 55, y - 5, endX - 10, y - 5);

  doc.setTextColor(30, 58, 138);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Applicant Signature", startX + 18, y);
  doc.text("Authorized Counselor", endX - 48, y);

  // 10. Seal Stamp block
  y += 12;
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.2);
  doc.rect(startX + 80, y - 2, 30, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("OFFICIAL STAMP", startX + 95, y + 8, { align: "center" });

  // 11. Footer
  doc.setTextColor(148, 163, 184);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.text("This receipt is a computerized record generated on official request. It acts as a provisional registration card.", 105, 280, { align: "center" });
  doc.text("Sri Vidya Chetana Degree College, Chintamani, Chikkaballapura © 2026. All rights reserved.", 105, 284, { align: "center" });

  return { doc, appId };
};

export default function Admissions({ admissions, branding, courses = [], defaultCourse = null, onlyForm = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    district: "Chikkaballapur",
    course: defaultCourse || courses[0]?.name || "Bachelor of Arts (B.A.)",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.district || !formData.course) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      // Load the logo image dynamically from imports
      const logoImgElement = await loadImage(logo);

      // Generate local PDF using the loaded image
      const { doc, appId } = generatePDF(formData, branding, logoImgElement);
      
      // Delay for visual realism & UX pacing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Download file to student machine
      doc.save(`SVC_Admission_Enquiry_${formData.fullName.replace(/\s+/g, "_")}.pdf`);
      
      setSuccessData({
        appId,
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
      });

    } catch (err) {
      console.error(err);
      setSuccessData({
        appId: "SVC-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      district: "Chikkaballapur",
      course: defaultCourse || courses[0]?.name || "Bachelor of Arts (B.A.)",
      message: ""
    });
  };

  const getMailtoLink = () => {
    if (!successData) return "#";
    const toEmail = branding?.email || "admissions@srividyachetana.edu.in";
    const subject = encodeURIComponent(`Provisional Admission Enquiry - ${formData.fullName} (Ref: ${successData.appId})`);
    
    const bodyText = `Dear Admissions Office,

I am writing to submit my provisional admission enquiry details. Please find the summary below:

- Reference ID: ${successData.appId}
- Student Name: ${formData.fullName}
- Email Address: ${formData.email}
- Phone Number: ${formData.phone}
- District: ${formData.district}
- Course Interested: ${formData.course}

Additional Message:
${formData.message || 'No additional message.'}

I have attached the downloaded PDF receipt (SVC_Admission_Enquiry_${formData.fullName.replace(/\s+/g, '_')}.pdf) to this email as requested.

Sincerely,
${formData.fullName}`;

    return `mailto:${toEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  if (onlyForm) {
    return (
      <div className="w-full">
        <AnimatePresence mode="wait">
          
          {/* Form State */}
          {!submitting && !successData && (
            <motion.div
              key="admissions-form-box"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="bg-[#1E3A8A] p-5 sm:p-6 text-white border-b border-blue-900 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <FileText size={20} className="text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-display leading-tight">Provisional Registration</h3>
                    <p className="text-[10px] text-blue-200 mt-0.5 uppercase tracking-wider font-semibold">Fill details, download receipt, and email office</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                
                {/* Two Column Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <User size={14} />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Mail size={14} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ramesh@gmail.com"
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <Phone size={14} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 9845012345"
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Districts Dropdown */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      District (Karnataka) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <MapPin size={14} />
                      </span>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white appearance-none cursor-pointer"
                        required
                      >
                        {KARNATAKA_DISTRICTS.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none">
                        <ChevronRight size={14} className="transform rotate-90" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Select Course */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      Programme Choice *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <BookOpen size={14} />
                      </span>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white appearance-none cursor-pointer"
                        required
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none">
                        <ChevronRight size={14} className="transform rotate-90" />
                      </span>
                    </div>
                  </div>

                  {/* PUC Marks Percentage */}
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                      12th / PUC Percentage (%) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                        <ClipboardList size={14} />
                      </span>
                      <input
                        type="number"
                        name="pucMarks"
                        value={formData.pucMarks}
                        onChange={handleInputChange}
                        placeholder="e.g. 84.5"
                        step="0.01"
                        min="35"
                        max="100"
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Queries Msg */}
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                    Additional Queries / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter details on credit transfers, fees, hostel rooms, etc. (Optional)"
                    rows={3}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                {/* Warning notice info */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex gap-2.5 items-start">
                  <AlertCircle size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                  <span className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                    Submission generates a professional PDF receipt in compliance with Bangalore North University. Ensure details match matriculation certificates.
                  </span>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 hover:text-amber-200 font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-lg border border-amber-400/30 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    <span>SUBMIT ADMISSION REQUEST</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

              </form>
            </motion.div>
          )}

          {/* Submitting Loading screen state */}
          {submitting && (
            <motion.div
              key="admissions-submitting-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-10 flex flex-col justify-center items-center gap-4 text-center min-h-[350px]"
            >
              <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-amber-400 rounded-full animate-spin mb-2" />
              <h3 className="text-lg font-bold text-slate-800">Processing Provisional Registration...</h3>
              <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                Applying algorithms, verifying PUC grade metrics, generating PDF document streams...
              </p>
            </motion.div>
          )}

          {/* Success Screen state */}
          {successData && (
            <motion.div
              key="admissions-success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-8 animate-fade-in"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner mb-6">
                <CheckCircle2 size={36} className="text-emerald-600 animate-bounce" />
              </div>

              <h3 className="text-xl font-bold font-display text-emerald-600">Application Submitted!</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Your provisional registration is recorded. The professional admission receipt has been downloaded to your local device.
              </p>

              {/* Visual Receipt Ticket */}
              <div className="my-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3.5 text-xs font-mono max-w-md mx-auto text-slate-800 shadow-inner relative overflow-hidden">
                {/* Ticket side cutouts */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-r border-slate-200 rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-l border-slate-200 rounded-l-full" />
                
                <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                  <span className="text-slate-400 font-bold">REGISTRATION RECEIPT</span>
                  <span className="text-blue-600 font-bold">{successData.appId}</span>
                </div>

                <div className="space-y-1.5 text-slate-700 pl-2 pr-2">
                  <p className="truncate">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Student:</span> {formData.fullName}
                  </p>
                  <p className="truncate">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">District:</span> {formData.district}
                  </p>
                  <p className="truncate">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Interested In:</span> {formData.course}
                  </p>
                  <p className="truncate">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Timestamp:</span> {successData.date}
                  </p>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-300 flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <AlertCircle size={12} className="text-blue-500 shrink-0" />
                  <span>Use this Reference ID for subsequent seat allotment checks.</span>
                </div>
              </div>

              {/* Mail Instruction Callout Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-[11px] text-blue-800 max-w-md mx-auto text-left leading-relaxed mb-6 space-y-1">
                <div className="font-bold text-[#1E3A8A] flex items-center gap-1">
                  <Mail size={13} className="text-[#1E3A8A]" />
                  <span>Next Step: Email your PDF to the College</span>
                </div>
                <p className="text-slate-600">
                  Click the button below to compose an email to <strong>{branding?.email || "admissions@srividyachetana.edu.in"}</strong>. 
                  <span className="font-semibold text-slate-700"> Please remember to attach the downloaded PDF receipt to your email before sending.</span>
                </p>
              </div>

              {/* Actions buttons */}
              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <a
                  href={getMailtoLink()}
                  className="px-5 py-3.5 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 hover:text-amber-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Mail size={15} />
                  <span>EMAIL PDF TO COLLEGE OFFICE</span>
                </a>
                
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    onClick={() => {
                      const { doc } = generatePDF(formData, branding);
                      doc.save(`SVC_Admission_Enquiry_${formData.fullName.replace(/\s+/g, "_")}.pdf`);
                    }}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <FileDown size={13} />
                    <span>Redownload PDF</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 border border-[#1E3A8A]/20 hover:bg-blue-50/50 text-[#1E3A8A] text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RefreshCw size={12} />
                    <span>New Enquiry</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section id="admissions" className="py-12 sm:py-20 bg-slate-50 text-slate-800 scroll-mt-10 relative overflow-hidden">
      {/* Decorative glass design bubbles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#1E3A8A] text-[10px] font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            ENROLLMENT PORTAL
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            PROVISIONAL ADMISSION REGISTRATION
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {admissions.tagline}
          </p>
          <div className="w-12 h-0.5 bg-[#1E3A8A] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dual Column Layout: Left (Info & Process) | Right (Dynamic Form Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (5/12) - Key Enrollment Details & Timeline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Admissions Open Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-amber-500 shrink-0" />
                <h3 className="text-lg font-bold text-slate-800 font-display">Admissions Information</h3>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Enrollment Cycle</p>
                <p className="text-sm sm:text-base font-extrabold text-[#1E3A8A]">{admissions.status}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Eligibility Criteria</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {admissions.eligibility}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <Clock size={16} className="text-amber-500 shrink-0" />
                <span className="text-xs text-slate-500">Admissions closing shortly for current batch</span>
              </div>
            </motion.div>

            {/* Step by Step Timeline Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-lg font-bold font-display text-slate-800 mb-6 flex items-center gap-2">
                <ClipboardList className="text-blue-600 shrink-0" />
                <span>3-Step Simple Process</span>
              </h3>

              <div className="space-y-6">
                {admissions.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs flex items-center justify-center shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{step.title}</h4>
                      <p className="text-slate-500 text-[11px] sm:text-xs mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column (7/12) - Interactive Form Box */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              
              {/* Form State */}
              {!submitting && !successData && (
                <motion.div
                  key="admissions-form-box"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
                >
                  <div className="bg-[#1E3A8A] p-5 sm:p-6 text-white border-b border-blue-900 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <FileText size={20} className="text-amber-300" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-display leading-tight">Provisional Registration</h3>
                        <p className="text-[10px] text-blue-200 mt-0.5 uppercase tracking-wider font-semibold">Fill details, download receipt, and email office</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                    
                    {/* Two Column Grid Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <User size={14} />
                          </span>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <Mail size={14} />
                          </span>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="ramesh@gmail.com"
                            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <Phone size={14} />
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 9845012345"
                            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white"
                            required
                          />
                        </div>
                      </div>

                      {/* Districts Dropdown */}
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                          District (Karnataka) *
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                            <MapPin size={14} />
                          </span>
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white appearance-none cursor-pointer"
                            required
                          >
                            {KARNATAKA_DISTRICTS.map((district) => (
                              <option key={district} value={district}>{district}</option>
                            ))}
                          </select>
                          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 pointer-events-none font-bold">
                            ▾
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course Interested Dropdown */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                        Academic Course Interested *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                          <BookOpen size={14} />
                        </span>
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl pl-9 pr-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white appearance-none cursor-pointer"
                          required
                        >
                          {courses.map((course) => (
                            <option key={course.id} value={course.name}>{course.name}</option>
                          ))}
                          <option value="General Integrated Course Inquiry">Other Integrated Degree / Coaching Inquiry</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 pointer-events-none font-bold">
                          ▾
                        </span>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                        Your Message / Remarks (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write down any additional questions, hostel inquiries, or coaching preferences..."
                        rows={4}
                        className="w-full bg-slate-50 hover:bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus:border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-slate-800 transition-all focus:outline-none focus:bg-white resize-none"
                      />
                    </div>

                    {/* Alert Info Banner */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800 text-[11px] leading-relaxed">
                      <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Clicking the button generates a professional admissions receipt PDF on your device. Ensure your email and phone are active so counselors can reach you.
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 hover:text-amber-200 font-extrabold text-xs py-4 rounded-xl shadow-lg shadow-blue-900/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border border-amber-400/20"
                      >
                        <span>REGISTER DETAILS & GET PDF</span>
                        <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-400" />
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {/* Submitting State Loader */}
              {submitting && (
                <motion.div
                  key="admissions-submitting-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[480px]"
                >
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-100 border-t-[#1E3A8A] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <RefreshCw size={18} className="text-blue-700 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 font-display">Generating Registration Receipt</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm leading-relaxed">
                    Compiling details and preparing your professional PDF document for download...
                  </p>
                </motion.div>
              )}

              {/* Submission Completed Success State */}
              {!submitting && successData && (
                <motion.div
                  key="admissions-success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-8 animate-fade-in"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner mb-6">
                    <CheckCircle2 size={36} className="text-emerald-600 animate-bounce" />
                  </div>

                  <h3 className="text-xl font-bold font-display text-emerald-600">Application Submitted!</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                    Your provisional registration is recorded. The professional admission receipt has been downloaded to your local device.
                  </p>

                  {/* Visual Receipt Ticket */}
                  <div className="my-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3.5 text-xs font-mono max-w-md mx-auto text-slate-800 shadow-inner relative overflow-hidden">
                    {/* Ticket side cutouts */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-r border-slate-200 rounded-r-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white border-l border-slate-200 rounded-l-full" />
                    
                    <div className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2">
                      <span className="text-slate-400 font-bold">REGISTRATION RECEIPT</span>
                      <span className="text-blue-600 font-bold">{successData.appId}</span>
                    </div>

                    <div className="space-y-1.5 text-slate-700 pl-2 pr-2">
                      <p className="truncate">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Student:</span> {formData.fullName}
                      </p>
                      <p className="truncate">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">District:</span> {formData.district}
                      </p>
                      <p className="truncate">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Interested In:</span> {formData.course}
                      </p>
                      <p className="truncate">
                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Timestamp:</span> {successData.date}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-dashed border-slate-300 flex items-center gap-1.5 text-slate-400 text-[10px]">
                      <AlertCircle size={12} className="text-blue-500 shrink-0" />
                      <span>Use this Reference ID for subsequent seat allotment checks.</span>
                    </div>
                  </div>

                  {/* Mail Instruction Callout Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-[11px] text-blue-800 max-w-md mx-auto text-left leading-relaxed mb-6 space-y-1">
                    <div className="font-bold text-[#1E3A8A] flex items-center gap-1">
                      <Mail size={13} className="text-[#1E3A8A]" />
                      <span>Next Step: Email your PDF to the College</span>
                    </div>
                    <p className="text-slate-600">
                      Click the button below to compose an email to <strong>{branding?.email || "admissions@srividyachetana.edu.in"}</strong>. 
                      <span className="font-semibold text-slate-700"> Please remember to attach the downloaded PDF receipt to your email before sending.</span>
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col gap-3 max-w-sm mx-auto">
                    <a
                      href={getMailtoLink()}
                      className="px-5 py-3.5 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 hover:text-amber-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                    >
                      <Mail size={15} />
                      <span>EMAIL PDF TO COLLEGE OFFICE</span>
                    </a>
                    
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <button
                        onClick={() => {
                          const { doc } = generatePDF(formData, branding);
                          doc.save(`SVC_Admission_Enquiry_${formData.fullName.replace(/\s+/g, "_")}.pdf`);
                        }}
                        className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FileDown size={13} />
                        <span>Redownload PDF</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2.5 border border-[#1E3A8A]/20 hover:bg-blue-50/50 text-[#1E3A8A] text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <RefreshCw size={12} />
                        <span>New Enquiry</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
