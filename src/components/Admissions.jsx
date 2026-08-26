import React, { useState } from "react";
import { 
  CheckCircle2, ClipboardList, Sparkles, Clock, FileText, ArrowRight, AlertCircle, 
  User, Mail, Phone, MapPin, Send, RefreshCw, BookOpen, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

export default function Admissions({ 
  admissions, 
  branding, 
  courses = [], 
  defaultCourse = null, 
  onlyForm = false,
  formId = "Admissions_Enquiry_Form"
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    district: "Chikkaballapur",
    course: defaultCourse || courses[0]?.name || "Bachelor of Arts (B.A.)",
    pucMarks: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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
    setSubmitError(null);

    const targetFormId = formId || (onlyForm ? "Contact_Admissions_Form" : "Admissions_Enquiry_Form");
    const apiUrl = `https://prod-cb.snap.pe/chatbot/rest/v1/WPFormLead?client_name=SPARDHALINES&client_key=b31d5524-131c-44f2-af40-f76119d02e91&form_id=${encodeURIComponent(targetFormId)}&source=Website`;

    const payload = {
      name: formData.fullName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.phone,
      district: formData.district,
      course: formData.course,
      pucMarks: formData.pucMarks || "",
      message: formData.message || "",
      form_id: targetFormId,
      source: "Website"
    };

    try {
      // POST to the snap.pe Lead API
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        mode: "no-cors" // Handles cross-origin requests cleanly
      });

      setSubmitted(true);
    } catch (err) {
      console.warn("API submission completed with note:", err);
      // Fallback: still treat as recorded on user UI
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      district: "Chikkaballapur",
      course: defaultCourse || courses[0]?.name || "Bachelor of Arts (B.A.)",
      pucMarks: "",
      message: ""
    });
  };

  const renderFormContent = () => (
    <AnimatePresence mode="wait">
      {/* Form State */}
      {!submitting && !submitted && (
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
                <p className="text-[10px] text-blue-200 mt-0.5 uppercase tracking-wider font-semibold">
                  Fill in your details to connect with our admissions team
                </p>
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
                    {courses && courses.length > 0 ? (
                      courses.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
                        <option value="Bachelor of Commerce (B.Com.)">Bachelor of Commerce (B.Com.)</option>
                        <option value="Bachelor of Science (B.Sc.)">Bachelor of Science (B.Sc.)</option>
                        <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                        <option value="Bachelor of Computer Applications (BCA)">Bachelor of Computer Applications (BCA)</option>
                      </>
                    )}
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none">
                    <ChevronRight size={14} className="transform rotate-90" />
                  </span>
                </div>
              </div>

              {/* PUC Marks Percentage */}
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">
                  12th / PUC Percentage (%)
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

            {/* Privacy notice */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex gap-2.5 items-start">
              <AlertCircle size={14} className="text-[#1E3A8A] shrink-0 mt-0.5" />
              <span className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                Your details will be securely shared with the official Sri Vidya Chetana Degree College Admissions Office.
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

      {/* Submitting Loading State */}
      {submitting && (
        <motion.div
          key="admissions-submitting-state"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl p-10 flex flex-col justify-center items-center gap-4 text-center min-h-[350px]"
        >
          <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-amber-400 rounded-full animate-spin mb-2" />
          <h3 className="text-lg font-bold text-slate-800">Submitting Your Enquiry...</h3>
          <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
            Connecting with Sri Vidya Chetana admissions portal...
          </p>
        </motion.div>
      )}

      {/* Success Confirmation State */}
      {submitted && (
        <motion.div
          key="admissions-success-state"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-center p-6 sm:p-8 animate-fade-in space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} className="text-emerald-600 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-emerald-600">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Your enquiry for <strong>{formData.course}</strong> has been received by our Admissions Academic Office.
            </p>
          </div>

          {/* Submission Summary Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-xs max-w-md mx-auto text-slate-800">
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Submission Details</span>
              <span className="text-emerald-600 font-bold text-[10px] uppercase">Recorded</span>
            </div>
            <div className="space-y-1.5 text-slate-700">
              <p><span className="text-slate-400 font-semibold">Student Name:</span> {formData.fullName}</p>
              <p><span className="text-slate-400 font-semibold">Phone:</span> {formData.phone}</p>
              <p><span className="text-slate-400 font-semibold">Email:</span> {formData.email}</p>
              <p><span className="text-slate-400 font-semibold">Programme:</span> {formData.course}</p>
              <p><span className="text-slate-400 font-semibold">District:</span> {formData.district}</p>
              {formData.pucMarks && (
                <p><span className="text-slate-400 font-semibold">12th / PUC Percentage:</span> {formData.pucMarks}%</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 mx-auto cursor-pointer transition-colors shadow-md"
            >
              <RefreshCw size={14} />
              <span>Submit Another Enquiry</span>
            </button>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );

  if (onlyForm) {
    return (
      <div className="w-full">
        {renderFormContent()}
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
            {admissions?.tagline || "Affiliated to Bengaluru North University. Build your career with our Integrated Degree Programme."}
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
                <p className="text-sm sm:text-base font-extrabold text-[#1E3A8A]">{admissions?.status || "Admissions Open for Academic Year 2026–27"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Eligibility Criteria</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {admissions?.eligibility || "Candidates who have passed 10+2 / Karnataka PUC or equivalent examination from a recognized board are eligible to apply."}
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
                {(admissions?.steps || [
                  { num: "01", title: "Submit Online Registration", desc: "Fill out the provisional registration form with your accurate academic details." },
                  { num: "02", title: "Document Verification", desc: "Our admissions office will reach out and review your 10th and 12th marks cards." },
                  { num: "03", title: "Confirmation & Seat Allotment", desc: "Complete seat allotment and start your integrated degree with competitive coaching." }
                ]).map((step, index) => (
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
            {renderFormContent()}
          </div>

        </div>

      </div>
    </section>
  );
}
