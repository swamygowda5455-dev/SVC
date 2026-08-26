import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Admissions from "./Admissions.jsx";

export default function Contact({ branding, admissions, courses }) {
  // Admissions PDF form integrated below

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

          {/* Column Right (7/12): Admissions Enquiry Form */}
          <div className="lg:col-span-7">
            <Admissions 
              onlyForm={true} 
              branding={branding} 
              admissions={admissions} 
              courses={courses} 
              formId="Contact_Admissions_Form"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
