import React, { useState } from "react";
import { BookOpen, Calendar, Award, CheckCircle, ArrowRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Courses({ courses }) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const tabs = ["All", "Engineering", "Management", "Degree"];

  const filteredCourses = activeTab === "All"
    ? courses
    : courses.filter(c => c.category === activeTab);

  const handleApplyScroll = () => {
    setSelectedCourse(null);
    const element = document.querySelector("#admissions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Static curriculum additions for high-fidelity presentation inside modal
  const getExtendedCurriculum = (courseName) => {
    if (courseName.includes("Computer Science")) {
      return {
        credits: "160 Credits",
        careers: ["AI Research Scientist", "Senior Full-Stack Architect", "ML Ops Engineer", "Cybersecurity Lead"],
        subjects: ["Artificial Neural Networks", "Distributed Cloud Architecture", "Data Structures & Advanced Algorithmic Complexity", "Natural Language Processing"]
      };
    } else if (courseName.includes("MBA")) {
      return {
        credits: "84 Credits",
        careers: ["FinTech Product Lead", "Quantitative Market Analyst", "Blockchain Strategy Consultant", "Business Operations Lead"],
        subjects: ["Digital Banking Frameworks & Blockchain", "Predictive Business Modeling", "Strategic Corporate Finance", "Big Data Analytics in FinTech"]
      };
    } else if (courseName.includes("Robotics")) {
      return {
        credits: "162 Credits",
        careers: ["Mechatronics R&D Engineer", "Industrial Automation Architect", "Autonomous Vehicle Coder", "Embedded Systems Lead"],
        subjects: ["Kinematics & Spatial Robotics Dynamics", "Embedded Microcontrollers", "Computer Vision & Visual Odometry", "Pneumatic Control Systems"]
      };
    } else {
      return {
        credits: "120 Credits",
        careers: ["Data Science Modeler", "Statistical Investigator", "Risk Analytics Lead", "Database Administrator"],
        subjects: ["High-Dimensional Matrix Calculations", "R & Python Scientific Ecosystems", "Applied Probability & Stochastic Processes", "SQL/NoSQL Warehousing Databases"]
      };
    }
  };

  return (
    <section id="courses" className="py-12 sm:py-20 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
              ACADEMIC OPPORTUNITIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
              OUR FEATURED PROGRAMS
            </h2>
            <div className="w-12 h-0.5 bg-blue-600 mt-4 rounded-full" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex overflow-x-auto scrollbar-none items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200 max-w-full shrink-0 -mx-4 px-4 sm:mx-0 sm:px-1.5">
            {tabs.map((tab) => (
              <button
                id={`tab-${tab.toLowerCase()}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === tab
                    ? "bg-blue-700 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                id={`course-card-${course.id}`}
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full"
              >
                {/* Course Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <img
                    src={course.image}
                    alt={course.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-blue-700/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                    {course.category}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 mb-3 leading-snug font-display min-h-[48px]">
                    {course.name}
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
                    {course.description}
                  </p>

                  {/* Course Details Pills */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 text-slate-600 text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Award size={13} className="text-blue-600 mt-0.5 shrink-0" />
                      <span className="leading-tight">{course.eligibility}</span>
                    </div>
                  </div>

                  {/* Action Buttons inside Card */}
                  <div className="mt-6 pt-4 flex gap-2">
                    <button
                      id={`learn-more-${course.id}`}
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-2.5 px-3 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      Curriculum
                    </button>
                    <button
                      id={`apply-course-${course.id}`}
                      onClick={handleApplyScroll}
                      className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Apply</span>
                      <ArrowRight size={12} />
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
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] flex flex-col relative z-10"
              >
                {/* Modal Header banner */}
                <div className="relative h-44 sm:h-52 bg-blue-950 flex items-end p-6 text-white shrink-0">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <button
                    id="close-course-modal"
                    onClick={() => setSelectedCourse(null)}
                    className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-950 p-2 rounded-full border border-white/20 text-white cursor-pointer"
                    aria-label="Close Modal"
                  >
                    <X size={16} />
                  </button>
                  <div className="relative z-10">
                    <span className="text-[10px] tracking-widest font-bold uppercase bg-blue-600 px-2.5 py-1 rounded-md mb-2 inline-block">
                      {selectedCourse.category} Programs
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">
                      {selectedCourse.name}
                    </h3>
                  </div>
                </div>

                {/* Modal Body Info */}
                <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-grow">
                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{selectedCourse.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Type</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">Full-Time Degree</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Structure</p>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{getExtendedCurriculum(selectedCourse.name).credits}</p>
                    </div>
                  </div>

                  {/* Core Description */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-blue-900 uppercase mb-2">Program Overview</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      This specialized curriculum is developed alongside academic scholars and active industry consultants to foster highly customized skill blocks and problem-solving capacities.
                    </p>
                  </div>

                  {/* Core Syllabus Subjects */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-blue-900 uppercase mb-3 flex items-center gap-1">
                      <Sparkles size={14} className="text-amber-500 animate-pulse" />
                      <span>Core Subjects & Core Credits</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getExtendedCurriculum(selectedCourse.name).subjects.map((subj, index) => (
                        <div key={index} className="flex items-start gap-2 bg-slate-50 px-3.5 py-2.5 rounded-lg border border-slate-100">
                          <CheckCircle size={14} className="text-blue-600 mt-0.5 shrink-0" />
                          <span className="text-xs text-slate-700 font-medium leading-snug">{subj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Careers */}
                  <div>
                    <h4 className="text-xs font-bold tracking-widest text-blue-900 uppercase mb-2">Career Horizons</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {getExtendedCurriculum(selectedCourse.name).careers.map((career, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-md border border-blue-100/50">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      id="course-modal-cancel"
                      onClick={() => setSelectedCourse(null)}
                      className="px-4 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Go Back
                    </button>
                    <button
                      id="course-modal-apply"
                      onClick={handleApplyScroll}
                      className="px-6 py-2.5 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white shadow-md transition-colors cursor-pointer"
                    >
                      Apply Now for {selectedCourse.category}
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
