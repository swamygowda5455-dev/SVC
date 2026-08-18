import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Sparkles, 
  Check, 
  Users, 
  BookOpenCheck, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Courses({ courses }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalTab, setModalTab] = useState("overview"); // 'overview', 'trishul', 'careers'
  const navigate = useNavigate();

  const tabs = ["All", "Degree Programs", "Competitive Academy"];

  const filteredCourses = activeTab === "All"
    ? courses
    : courses.filter(c => c.category === activeTab);

  const handleApplyScroll = () => {
    setSelectedCourse(null);
    navigate("/admissions");
  };


  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setModalTab("overview");
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white scroll-mt-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
              ACADEMIC OFFERINGS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mt-5 tracking-tight font-display">
              Our Integrated Programs
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mt-5 rounded-full" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex overflow-x-auto scrollbar-none items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/85 max-w-full shrink-0 -mx-4 px-4 sm:mx-0 sm:px-2 shadow-inner relative">
            {tabs.map((tab) => (
              <button
                id={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 z-10 ${
                  activeTab === tab
                    ? "text-[#1E3A8A]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/40"
                }`}
              >
                <span className="relative z-10">{tab === "All" ? "ALL COURSES" : tab.toUpperCase()}</span>
                {activeTab === tab && (
                  <motion.span
                    layoutId="activeCourseTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl shadow-md z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                id={`course-card-${course.id}`}
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/courses/${course.slug || course.id}`)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
              >
                {/* Course Thumbnail Image */}
                <div className="relative h-52 w-full overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    alt={course.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-[#1E3A8A] text-amber-300 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-sm border border-amber-400/30">
                    {course.category}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1E3A8A] transition-colors duration-200 mb-3 leading-snug font-display min-h-[56px] flex items-center">
                    {course.name}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>

                  {/* Course Details Pills */}
                  <div className="space-y-3 pt-5 border-t border-slate-100 text-slate-600 text-xs sm:text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-amber-500 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award size={14} className="text-[#1E3A8A] mt-0.5 shrink-0" />
                      <span className="leading-tight text-slate-500">{course.eligibility}</span>
                    </div>
                  </div>

                  {/* Action Buttons inside Card */}
                  <div className="mt-8 pt-4 border-t border-slate-50 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      id={`learn-more-${course.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/courses/${course.slug || course.id}`);
                      }}
                      className="flex-1 bg-slate-50 hover:bg-amber-50/50 text-slate-700 hover:text-[#1E3A8A] font-extrabold text-xs py-3 px-4 rounded-xl border border-slate-200/60 hover:border-amber-300 transition-all cursor-pointer font-display text-center"
                    >
                      View Details
                    </button>
                    <button
                      id={`apply-course-${course.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/courses/${course.slug || course.id}#apply-form-section`);
                      }}
                      className="flex-1 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-900/10 cursor-pointer font-display border border-amber-400/20"
                    >
                      <span>Apply</span>
                      <ArrowRight size={14} className="text-amber-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed Curriculum Modal Lightbox */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backing Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-4xl w-full max-h-[92vh] flex flex-col relative z-10 overflow-hidden"
              >
                {/* Modal Header banner */}
                <div className="relative h-44 sm:h-56 bg-blue-950 flex items-end p-6 sm:p-8 text-white shrink-0">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/65 to-transparent" />
                  <button
                    id="close-course-modal"
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-950 p-2.5 rounded-full border border-white/20 text-white cursor-pointer transition-colors z-20"
                    aria-label="Close Modal"
                  >
                    <X size={18} />
                  </button>
                  <div className="relative z-10 max-w-2xl">
                    <span className="text-[10px] tracking-widest font-bold uppercase bg-blue-600 px-3 py-1 rounded-lg mb-2 inline-block shadow-sm">
                      {selectedCourse.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold font-display leading-tight">
                      {selectedCourse.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Subnavigation Tabs */}
                <div className="bg-slate-50 px-6 sm:px-8 border-b border-slate-100 flex gap-4 shrink-0 overflow-x-auto scrollbar-none relative">
                  {[
                    { id: "overview", label: "Overview & Benefits" },
                    { id: "trishul", label: "TRISHUL Learning Model" },
                    { id: "careers", label: "Career Opportunities" }
                  ].map((tab) => (
                    <button
                      id={`modal-tab-${tab.id}`}
                      key={tab.id}
                      onClick={() => setModalTab(tab.id)}
                      className={`relative py-4 text-xs sm:text-sm font-bold cursor-pointer transition-all whitespace-nowrap ${
                        modalTab === tab.id
                          ? "text-blue-600 font-extrabold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <span className="relative z-10">{tab.label}</span>
                      {modalTab === tab.id && (
                        <motion.span
                          layoutId="activeModalTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Modal Body Info */}
                <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow bg-slate-50/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={modalTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                  
                  {/* TAB 1: OVERVIEW & BENEFITS */}
                  {modalTab === "overview" && (
                    <div className="space-y-8 animate-fadeIn">

                      {/* About section */}
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
                        <h4 className="text-base font-bold text-slate-800 font-display mb-3">About the Course</h4>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                          {selectedCourse.aboutText || selectedCourse.description}
                        </p>
                      </div>

                      {/* Why choose */}
                      {selectedCourse.whyChoose && (
                        <div>
                          <h4 className="text-base font-bold text-slate-800 font-display mb-4">
                            Why Choose {selectedCourse.name} at Sri Vidya Chetana?
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {selectedCourse.whyChoose.map((point, idx) => (
                              <div key={idx} className="flex gap-2.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                                <span className="text-emerald-500 shrink-0 mt-0.5">
                                  <CheckCircle size={16} />
                                </span>
                                <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}


                    </div>
                  )}

                  {/* TAB 2: TRISHUL MODEL */}
                  {modalTab === "trishul" && selectedCourse.trishulModel && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs text-center max-w-3xl mx-auto">
                        <h4 className="text-lg font-bold text-[#1E3A8A] font-display">TRISHUL Learning Model</h4>
                        <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                          At Sri Vidya Chetana Degree College, every student benefits from our flagship TRISHUL Learning Model, which integrates Academic Excellence, Competitive Examination Preparation, and Industry & Employability Skills.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        {/* 1. Academic Excellence */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
                          <div className="bg-blue-600 p-4 text-white flex items-center gap-2.5">
                            <GraduationCap size={20} />
                            <h5 className="font-bold text-sm tracking-wide uppercase">Academic Excellence</h5>
                          </div>
                          <div className="p-5 max-h-80 overflow-y-auto">
                            <ul className="space-y-2.5">
                              {selectedCourse.trishulModel.academic.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                  <Check size={14} className="text-blue-500 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 2. Competitive Prep */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
                          <div className="bg-violet-600 p-4 text-white flex items-center gap-2.5">
                            <BookOpenCheck size={20} />
                            <h5 className="font-bold text-sm tracking-wide uppercase">Competitive Prep</h5>
                          </div>
                          <div className="p-5 max-h-80 overflow-y-auto">
                            <ul className="space-y-2.5">
                              {selectedCourse.trishulModel.competitive.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                  <Check size={14} className="text-violet-500 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 3. Industry Skills */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
                          <div className="bg-amber-600 p-4 text-white flex items-center gap-2.5">
                            <Users size={20} />
                            <h5 className="font-bold text-sm tracking-wide uppercase">Employability Skills</h5>
                          </div>
                          <div className="p-5 max-h-80 overflow-y-auto">
                            <ul className="space-y-2.5">
                              {selectedCourse.trishulModel.skills.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                  <Check size={14} className="text-amber-500 mt-0.5 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CAREERS */}
                  {modalTab === "careers" && selectedCourse.careerOpportunities && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(selectedCourse.careerOpportunities).map(([categoryName, roles]) => (
                          <div key={categoryName} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
                            <h5 className="text-sm font-bold text-[#1E3A8A] font-display flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                              <Briefcase size={16} className="text-blue-600" />
                              <span>{categoryName}</span>
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {roles.map((role, rIdx) => (
                                <span 
                                  key={rIdx} 
                                  className="bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200/50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors duration-200"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Closing Statement */}
                  {selectedCourse.closingStatement && (
                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50 text-center">
                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                        {selectedCourse.closingStatement}
                      </p>
                    </div>
                  )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Modal Action Buttons Footer */}
                <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  <button
                    id="course-modal-cancel"
                    onClick={() => setSelectedCourse(null)}
                    className="px-5 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Go Back
                  </button>
                  <button
                    id="course-modal-apply"
                    onClick={handleApplyScroll}
                    className="px-6 py-3 rounded-xl text-xs font-bold bg-[#1E3A8A] hover:bg-blue-800 text-white shadow-md shadow-blue-900/10 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Apply Now for {selectedCourse.name.split(" ")[0]}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
