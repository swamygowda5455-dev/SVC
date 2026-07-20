import React, { useState } from "react";
import { CheckCircle, ClipboardList, Sparkles, BookOpen, Clock, FileText, ArrowRight, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Admissions({ admissions, branding, courses = [] }) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    stream: courses[0]?.name || "B.Com (Bachelor of Commerce)",
    grades: "",
    statement: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in your Name, Email, and Phone Number.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setReceipt({
        id: "SVC-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        ...formData
      });
    }, 1500);
  };

  const handleClose = () => {
    setShowApplyModal(false);
    setReceipt(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      stream: "Computer Science & AI",
      grades: "",
      statement: ""
    });
  };

  return (
    <section id="admissions" className="py-12 sm:py-20 bg-slate-50 text-slate-800 scroll-mt-10 relative overflow-hidden">
      {/* Decorative light trails */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            ENROLLMENT PORTAL
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            JOIN THE SVC COHORT
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            {admissions.tagline}
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Admissions Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column (5/12): Core Stats & Eligibility */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600 font-bold shrink-0" />
                <h3 className="text-lg font-bold text-slate-800 font-display">Admissions Open</h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Enrollment Cycle</p>
                <p className="text-base sm:text-lg font-bold text-blue-700">{admissions.status}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Eligibility Criteria</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {admissions.eligibility}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <Clock size={16} className="text-blue-500 shrink-0" />
                <span className="text-xs text-slate-500">Regular Admissions close in 14 days</span>
              </div>
            </div>

            {/* Quick Apply Button */}
            <button
              id="admissions-apply-now-btn"
              onClick={() => setShowApplyModal(true)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-blue-500/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{admissions.btnText.toUpperCase()} FOR ACADEMIC YEAR</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column (7/12): Step-by-Step Admissions Process */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-bold font-display text-slate-800 mb-6 flex items-center gap-2">
              <ClipboardList className="text-blue-600 shrink-0" />
              <span>3-Step Simple Admission Process</span>
            </h3>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              className="space-y-6"
            >
              {admissions.steps.map((step, index) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  id={`step-card-${index}`}
                  key={index}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex items-start gap-5 hover:bg-slate-50 transition-colors duration-300 shadow-sm"
                >
                  {/* Step Number Circle */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-bold text-base flex items-center justify-center shrink-0">
                    {step.num}
                  </div>

                  {/* Step Description */}
                  <div>
                    <h4 className="text-base font-bold text-slate-800 font-display leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Interactive Apply Now Mock Application Modal */}
        <AnimatePresence>
          {showApplyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">

              {/* Overlay dismissal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              {/* Form Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col relative z-10 text-slate-800"
              >

                {/* Modal Header */}
                <div className="bg-blue-700 p-6 flex justify-between items-center border-b border-blue-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-white" />
                    <div>
                      <h3 className="text-lg font-bold font-display leading-none text-white">SVC Enrollment Form</h3>
                      <p className="text-[10px] text-blue-100 mt-1 uppercase tracking-widest font-bold">2026-27 Stream Application</p>
                    </div>
                  </div>
                  <button
                    id="close-apply-modal"
                    onClick={handleClose}
                    className="p-1.5 bg-black/10 hover:bg-black/20 text-white rounded-full cursor-pointer transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Form Content / Receipt Output */}
                <div className="p-5 sm:p-6 overflow-y-auto flex-grow">
                  <AnimatePresence mode="wait">
                    {!receipt ? (
                      <motion.form
                        key="apply-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            id="apply-fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. Alexander Mercer"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
                            required
                          />
                        </div>

                        {/* Contact details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                              Email *
                            </label>
                            <input
                              id="apply-email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="alexander@example.com"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                              Phone *
                            </label>
                            <input
                              id="apply-phone"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 012-3456"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
                              required
                            />
                          </div>
                        </div>

                        {/* Streams Select Dropdown */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Academic Program of Interest
                          </label>
                          <select
                            id="apply-stream"
                            name="stream"
                            value={formData.stream}
                            onChange={handleInputChange}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                          >
                            {courses.map(course => (
                              <option key={course.id} value={course.name}>{course.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Highschool Grades */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Highschool GPA or Exam Score Percentage (%)
                          </label>
                          <input
                            id="apply-grades"
                            type="text"
                            name="grades"
                            value={formData.grades}
                            onChange={handleInputChange}
                            placeholder="e.g. 92% or 3.85 GPA"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
                          />
                        </div>

                        {/* Brief Statement */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Statement of Purpose (Brief)
                          </label>
                          <textarea
                            id="apply-statement"
                            name="statement"
                            value={formData.statement}
                            onChange={handleInputChange}
                            placeholder="Tell us about your career motivation and interests."
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400 resize-none"
                          />
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                          <button
                            id="apply-cancel-form"
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            id="apply-submit-form"
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2.5 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 disabled:bg-blue-800 text-white shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            {submitting ? "Processing Application..." : "Submit Application"}
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="apply-receipt"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6 space-y-6"
                      >
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
                          <CheckCircle size={36} />
                        </div>

                        <div>
                          <h4 className="text-xl font-bold font-display text-emerald-600">Application Submitted!</h4>
                          <p className="text-slate-500 text-xs mt-1.5">
                            Your mock application has been successfully logged into our memory store.
                          </p>
                        </div>

                        {/* Receipt Box */}
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-left space-y-3.5 text-xs font-mono max-w-sm mx-auto text-slate-800">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                            <span className="text-slate-400 font-bold">MOCK RECEIPT</span>
                            <span className="text-blue-600 font-bold">{receipt.id}</span>
                          </div>

                          <div className="space-y-1.5 text-slate-700">
                            <p className="text-slate-600">
                              <span className="text-slate-400 font-medium">Applicant:</span> {receipt.fullName}
                            </p>
                            <p className="text-slate-600">
                              <span className="text-slate-400 font-medium">Program:</span> {receipt.stream}
                            </p>
                            <p className="text-slate-600">
                              <span className="text-slate-400 font-medium">Phone:</span> {receipt.phone}
                            </p>
                            <p className="text-slate-600">
                              <span className="text-slate-400 font-medium">Timestamp:</span> {receipt.date}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-slate-400 text-[10px]">
                            <AlertCircle size={12} className="text-blue-500 shrink-0" />
                            <span>Copy this mock ID to search inside your Admin Portal later.</span>
                          </div>
                        </div>

                        {/* Finish button */}
                        <div className="pt-4 flex justify-center">
                          <button
                            id="apply-receipt-done"
                            onClick={handleClose}
                            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                          >
                            Finish & Exit
                          </button>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
