import React, { useState } from "react";
import { 
  Eye, 
  Target, 
  Award, 
  BookOpen, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Users, 
  Lightbulb, 
  Compass, 
  Sparkles, 
  Heart, 
  Globe, 
  Flag, 
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function About({ about, branding }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to map core values to icons
  const getValueIcon = (title) => {
    switch (title) {
      case "Academic Excellence":
        return <GraduationCap className="text-blue-600 w-6 h-6" />;
      case "Integrity & Ethics":
        return <Shield className="text-emerald-600 w-6 h-6" />;
      case "Student-Centric Learning":
        return <Users className="text-indigo-600 w-6 h-6" />;
      case "Leadership":
        return <Compass className="text-amber-600 w-6 h-6" />;
      case "Innovation":
        return <Lightbulb className="text-purple-600 w-6 h-6" />;
      case "Skill Development":
        return <Sparkles className="text-pink-600 w-6 h-6" />;
      case "Inclusivity & Equal Opportunity":
        return <Globe className="text-teal-600 w-6 h-6" />;
      case "Women's Empowerment":
        return <Heart className="text-rose-600 w-6 h-6" />;
      case "Respect & Discipline":
        return <CheckCircle2 className="text-violet-600 w-6 h-6" />;
      case "Social Responsibility":
        return <Users className="text-sky-600 w-6 h-6" />;
      case "Nation Building":
        return <Flag className="text-red-600 w-6 h-6" />;
      default:
        return <Award className="text-blue-600 w-6 h-6" />;
    }
  };

  // Helper to color borders or backgrounds of value cards based on their icon theme
  const getValueColorClass = (title) => {
    switch (title) {
      case "Academic Excellence": return "hover:border-blue-300 hover:bg-blue-50/30";
      case "Integrity & Ethics": return "hover:border-emerald-300 hover:bg-emerald-50/30";
      case "Student-Centric Learning": return "hover:border-indigo-300 hover:bg-indigo-50/30";
      case "Leadership": return "hover:border-amber-300 hover:bg-amber-50/30";
      case "Innovation": return "hover:border-purple-300 hover:bg-purple-50/30";
      case "Skill Development": return "hover:border-pink-300 hover:bg-pink-50/30";
      case "Inclusivity & Equal Opportunity": return "hover:border-teal-300 hover:bg-teal-50/30";
      case "Women's Empowerment": return "hover:border-rose-300 hover:bg-rose-50/30";
      case "Respect & Discipline": return "hover:border-violet-300 hover:bg-violet-50/30";
      case "Social Responsibility": return "hover:border-sky-300 hover:bg-sky-50/30";
      case "Nation Building": return "hover:border-red-300 hover:bg-red-50/30";
      default: return "hover:border-blue-300 hover:bg-blue-50/30";
    }
  };

  // Safe splits for formatted paragraphs
  const historyParagraphs = about.history ? about.history.split("\n\n") : [];
  const principalParagraphs = about.principal?.message ? about.principal.message.split("\n\n") : [];

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 relative scroll-mt-10 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            Discover Our Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mt-5 tracking-tight font-display">
            About Sri Vidya Chetana
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto mt-5 rounded-full" />
        </div>

        {/* 1. Profile & Principal's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-28">
          
          {/* Left Column: History / About details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100/80 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A8A] rounded-l-3xl" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-6 flex items-center gap-3">
                <GraduationCap className="text-amber-500 w-7 h-7" />
                <span>Nurturing Leaders of Tomorrow</span>
              </h3>
              
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {/* Always render first paragraph */}
                {historyParagraphs.slice(0, 1).map((p, idx) => (
                  <p key={idx} className="font-medium text-slate-700">{p}</p>
                ))}

                {/* Show second paragraph */}
                {historyParagraphs.slice(1, 2).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {/* Expandable paragraphs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden space-y-4 pt-4 border-t border-slate-100"
                    >
                      {historyParagraphs.slice(2).map((p, idx) => (
                        <p key={idx} className="text-slate-600 text-sm sm:text-base leading-relaxed">{p}</p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                id="about-read-more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-8 flex items-center gap-2 text-sm font-extrabold text-[#1E3A8A] hover:text-amber-600 transition-colors duration-200 cursor-pointer focus:outline-none uppercase tracking-wider"
              >
                <span>{isExpanded ? "Show Less" : "Read Full Profile"}</span>
                {isExpanded ? <ChevronUp size={16} className="text-amber-500" /> : <ChevronDown size={16} className="text-amber-500" />}
              </button>
            </div>
            
            {/* Integrated Coaching Quick Fact Banner */}
            <div className="bg-gradient-to-r from-[#1E3A8A] to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-amber-400/30 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-8 translate-y-8">
                <BookOpen size={200} />
              </div>
              <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-amber-300">
                <Sparkles size={18} className="text-amber-400" />
                <span>Integrated Coaching Advantage</span>
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                Our curriculum aligns regular university degree programs (B.A., B.Com., B.Sc., BBA, BCA) with professional training for UPSC, KPSC, Banking, SSC, Railways, and CA. Earn your degree while securing your future.
              </p>
            </div>
          </div>

          {/* Right Column: Principal's Message */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100/80 relative">
              <div className="absolute top-0 right-10 w-16 h-1 bg-gradient-to-r from-amber-400 to-[#1E3A8A] rounded-b-full" />
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8">
                {/* Principal Photo */}
                <div className="relative shrink-0">
                  <img
                    src={about.principal.photo}
                    alt={about.principal.name}
                    referrerPolicy="no-referrer"
                    className="relative w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-amber-400/40 shadow-sm"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-[#1E3A8A] text-amber-400 p-2 rounded-xl shadow-md border border-amber-400/30">
                    <Award size={16} />
                  </span>
                </div>

                {/* Name & Title */}
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-800 font-display">
                    {about.principal.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#1E3A8A] uppercase tracking-widest mt-1">
                    {about.principal.designation}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Sri Vidya Chetana Degree College
                  </p>
                </div>
              </div>

              {/* Message Quote */}
              <div className="relative">
                <span className="absolute -top-8 -left-2 text-7xl text-amber-100 font-serif select-none pointer-events-none">
                  “
                </span>
                <div className="relative space-y-3 z-10">
                  {principalParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Signature Accent */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-semibold">
                <span>OFFICE OF THE PRINCIPAL</span>
                <span className="font-serif italic font-bold text-[#1E3A8A]">S. M. Chandrashekar</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 sm:mb-28">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-br from-white to-amber-50/20 p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-amber-600 mb-6 shadow-xs">
                <Eye size={26} />
              </div>
              <h3 className="text-2xl font-bold font-display text-[#1E3A8A] mb-4">Our Vision</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                "{about.vision}"
              </p>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-[#1E3A8A] to-amber-400 rounded-full mt-8" />
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100/80 hover:shadow-md transition-all duration-300"
          >
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-[#1E3A8A] mb-6 shadow-xs">
              <Target size={26} />
            </div>
            <h3 className="text-2xl font-bold font-display text-[#1E3A8A] mb-6">Our Mission</h3>
            <ul className="space-y-4">
              {Array.isArray(about.mission) ? (
                about.mission.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="mt-1 shrink-0 text-amber-500 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle2 size={16} />
                    </span>
                    <span className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-slate-600 text-sm sm:text-base leading-relaxed">{about.mission}</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* 3. Core Values Grid */}
        {about.coreValues && about.coreValues.length > 0 && (
          <div className="space-y-10 sm:space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] font-display">
                Our Core Values
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-3">
                The guiding principles that steer our commitment to academic excellence, integrity, and student development.
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {about.coreValues.map((value, idx) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  key={idx}
                  className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group cursor-default ${getValueColorClass(value.title)}`}
                >
                  <div className="mb-4 p-2 bg-slate-50 rounded-xl w-fit group-hover:bg-white transition-colors duration-200">
                    {getValueIcon(value.title)}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2 font-display">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
