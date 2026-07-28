import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact({ branding }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Admissions Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "General Admissions Inquiry", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-slate-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#1E3A8A] text-[10px] font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            CONNECT WITH US
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            CONTACT ACADEMIC OFFICE
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            Have questions about credits, campus tours, or enrollment procedures? Reach out directly.
          </p>
          <div className="w-12 h-0.5 bg-[#1E3A8A] mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Column Left (5/12): Contact Info & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold font-display text-[#1E3A8A]">Campus Headquarters</h3>

              <div className="space-y-4">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <span className="p-2.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-200/80 shrink-0 mt-1">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-[#1E3A8A] uppercase tracking-wider">Address</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed mt-1">{branding.address}</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <span className="p-2.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-200/80 shrink-0 mt-1">
                    <Phone size={18} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-[#1E3A8A] uppercase tracking-wider">Admissions Telephone</h4>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">{branding.phone}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mon - Sat (09:00 AM - 05:00 PM)</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-4">
                  <span className="p-2.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-200/80 shrink-0 mt-1">
                    <Mail size={18} />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-extrabold text-[#1E3A8A] uppercase tracking-wider">Email Correspondence</h4>
                    <a href={`mailto:${branding.email}`} className="text-[#1E3A8A] hover:text-amber-600 text-xs sm:text-sm font-semibold mt-1 block transition-colors">
                      {branding.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="h-60 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
              <iframe
                title="SVC University Campus Map"
                src="https://maps.google.com/maps?q=Chintamani,%20Chikkaballapura,%20Karnataka,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Column Right (7/12): Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold font-display text-[#1E3A8A] pb-3 border-b border-slate-200 flex items-center gap-2">
                    <Send size={18} className="text-amber-500" />
                    <span>Quick Admissions & Help Request</span>
                  </h3>

                  {/* Name and Email input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Liam Sterling"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] placeholder-slate-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. liam@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Subject Matter
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                    >
                      <option value="General Admissions Inquiry">General Admissions Inquiry</option>
                      <option value="Hostel Allotment & Boarding">Hostel Allotment & Boarding</option>
                      <option value="Fee Structures & Scholarships">Fee Structures & Scholarships</option>
                      <option value="Academic Curriculum & Credits">Academic Curriculum & Credits</option>
                    </select>
                  </div>

                  {/* Message box */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Message details *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your academic query details here..."
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] placeholder-slate-400 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-extrabold text-xs px-7 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md shadow-blue-900/10 border border-amber-400/30"
                    >
                      <span>{isSubmitting ? "Sending Query..." : "Dispatch Message"}</span>
                      <Send size={16} className="text-amber-400" />
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6 flex flex-col justify-center items-center h-full"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle size={32} />
                  </div>

                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-bold font-display text-emerald-600">Message Dispatched!</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      Thank you for contacting the admissions and help desk of Sri Vidya Chetana Degree College. Our counselors will reach back to your email within 24 business hours.
                    </p>
                  </div>

                  <button
                    id="contact-reset-success"
                    onClick={() => setIsSuccess(false)}
                    className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
