import React, { useState } from "react";
import { User, BookOpen, GraduationCap, ChevronRight, Mail, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Departments({ departments }) {
  const [selectedHod, setSelectedHod] = useState(null);

  // Expanded contact info for HODs to provide high-fidelity micro interactions
  const getHodContact = (hodName) => {
    return {
      email: `${hodName.toLowerCase().replace(/[^a-z]/g, "")}@svc.edu`,
      phone: "+1 (800) 555-0102 ext " + Math.floor(Math.random() * 900 + 100),
      office: "Engineering Block C, Suite 40" + Math.floor(Math.random() * 9 + 1),
      publications: Math.floor(Math.random() * 40 + 15) + "+ Peer-Reviewed Papers",
      experience: Math.floor(Math.random() * 10 + 12) + " Years Academic Experience"
    };
  };

  return (
    <section id="departments" className="py-12 sm:py-20 bg-slate-50/50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            FACULTIES & DIVISIONS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            ACADEMIC DEPARTMENTS
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Departments Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {departments.map((dept) => (
            <div
              id={`dept-card-${dept.id}`}
              key={dept.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* Department Image Header */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <img
                  src={dept.image}
                  alt={dept.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>

              {/* Department Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-800 font-display mb-2 min-h-[48px] leading-snug">
                  {dept.name}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                  {dept.description}
                </p>

                {/* HOD Details block with click-to-view interactions */}
                <div
                  onClick={() => setSelectedHod(dept)}
                  className="mt-auto p-4 bg-blue-50/50 rounded-xl border border-blue-100/40 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-600 font-bold tracking-wider uppercase leading-none">HOD / Chair</p>
                      <h4 className="text-sm font-bold text-slate-800 font-display mt-1.5 leading-none">{dept.hod}</h4>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-blue-100/50 flex justify-between items-center text-[10px] text-blue-600 font-bold">
                    <span>VIEW PROFILE & CONTACT</span>
                    <ChevronRight size={12} className="text-blue-500" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* HOD Details Lightbox Modal */}
        <AnimatePresence>
          {selectedHod && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedHod(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full relative z-10 overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
              >
                {/* Header Strip */}
                <div className="bg-blue-700 p-6 text-white text-center shrink-0">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <GraduationCap size={32} />
                  </div>
                  <p className="text-xs font-semibold text-blue-100 uppercase tracking-widest">Department Chair Profile</p>
                  <h3 className="text-xl font-bold font-display mt-1">{selectedHod.hod}</h3>
                  <p className="text-xs text-blue-200 mt-1">{selectedHod.name}</p>
                </div>

                {/* Info List */}
                <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-grow">
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                      <BookOpen size={16} className="text-blue-600 shrink-0" />
                      <span>{getHodContact(selectedHod.hod).publications}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap size={16} className="text-blue-600 shrink-0" />
                      <span>{getHodContact(selectedHod.hod).experience}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-blue-600 shrink-0" />
                      <a href={`mailto:${getHodContact(selectedHod.hod).email}`} className="text-blue-600 hover:underline">
                        {getHodContact(selectedHod.hod).email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneCall size={16} className="text-blue-600 shrink-0" />
                      <span>{getHodContact(selectedHod.hod).phone}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-500 text-center">
                    <span>Office Hours: Mon - Fri (02:00 PM - 04:00 PM) at {getHodContact(selectedHod.hod).office}</span>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      id="close-hod-modal"
                      onClick={() => setSelectedHod(null)}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
