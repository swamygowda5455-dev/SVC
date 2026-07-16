import React, { useState } from "react";
import { Eye, Target, Award, BookOpen, GraduationCap, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function About({ about, branding }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-12 sm:py-20 bg-slate-50 relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            ABOUT OUR INSTITUTION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            NURTURING MINDS, POWERING INNOVATIONS
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2-Column Core Info & Vision/Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Vision, Mission & Core Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-[#1E3A8A] mb-4 font-display flex items-center gap-2">
                <GraduationCap className="text-blue-600 shrink-0" />
                <span>Our Educational Legacy</span>
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {about.history}
              </p>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 space-y-4 pt-4 border-t border-slate-100"
                  >
                    <p className="text-slate-600 text-sm leading-relaxed">
                      At {branding.collegeName}, we believe that higher education should transcend traditional textbook frameworks. Over the past decades, we have invested heavily in establishing multi-million dollar research nodes, industry incubator pods, and state-of-the-art libraries that operate 24/7.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our academic ecosystem bridges the gap between pure research and commercial applications. Through corporate projects and joint research guidelines with foreign universities, our students gain global exposures that instantly attract industry partners.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                id="about-read-more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer focus:outline-none uppercase tracking-wider"
              >
                <span>{isExpanded ? "Read Less" : "Read More Legacy Details"}</span>
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vision Card */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                  <Eye size={22} />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-800 mb-2">Our Vision</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {about.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-5">
                  <Target size={22} />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-800 mb-2">Our Mission</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {about.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Principal's Message with Frame Photo */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-slate-200 relative">
              {/* Decorative accent element */}
              <div className="absolute top-0 right-1/4 w-12 h-0.5 bg-blue-600 rounded-b-full" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                {/* Principal Photo in Elegant Frame */}
                <div className="relative shrink-0">
                  <img
                    src={about.principal.photo}
                    alt={about.principal.name}
                    referrerPolicy="no-referrer"
                    className="relative w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl border border-slate-200"
                  />
                  <span className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
                    <Award size={14} />
                  </span>
                </div>

                {/* Name & Title */}
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-slate-800 font-display">
                    {about.principal.name}
                  </h4>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                    {about.principal.designation}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PhD in Systems Design, MIT
                  </p>
                </div>
              </div>

              {/* Message Quote */}
              <div className="relative">
                <span className="absolute -top-6 -left-3 text-7xl text-slate-100 font-serif select-none pointer-events-none">
                  “
                </span>
                <p className="relative text-slate-600 text-xs sm:text-sm leading-relaxed italic z-10">
                  {about.principal.message}
                </p>
              </div>

              {/* Signature Accent */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>OFFICE OF THE VICE-CHANCELLOR</span>
                <span className="font-serif italic font-semibold text-slate-600">Evelyn Vance</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
