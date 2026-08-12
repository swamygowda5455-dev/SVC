import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  Users, 
  CheckCircle, 
  FileText, 
  DollarSign, 
  HelpCircle, 
  ArrowRight, 
  Briefcase, 
  BookOpenCheck, 
  ChevronRight, 
  Check, 
  Share2, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import Admissions from "./Admissions.jsx";

export default function CourseDetails({ courses, branding, admissions }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);

  const course = courses.find(c => c.slug === slug || c.id === slug);

  // Dynamic OpenGraph and HTML Meta Tag update for SEO & Social Sharing
  useEffect(() => {
    if (course) {
      document.title = `${course.name} - Sri Vidya Chetana Degree College`;
      
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = course.description;
    }

    return () => {
      document.title = "Sri Vidya Chetana Degree College";
    };
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">Course Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The course program you are looking for does not exist or has been relocated.</p>
        <Link to="/courses" className="mt-6 inline-flex items-center gap-2 bg-[#1E3A8A] text-amber-300 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">
          <ArrowLeft size={16} />
          <span>Explore All Programs</span>
        </Link>
      </div>
    );
  }

  const relatedCourses = courses.filter(c => c.slug !== course.slug).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#1E3A8A]">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <Link to="/courses" className="hover:text-[#1E3A8A]">Courses</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-[#1E3A8A] font-bold">{course.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:text-[#1E3A8A] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Share2 size={14} className="text-amber-500" />
            <span>{copiedLink ? "Link Copied!" : "Share Course"}</span>
          </button>
        </div>

        {/* Hero Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1E3A8A] text-white shadow-xl">
          <img
            src={course.image}
            alt={course.name}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A]/90 to-transparent" />

          <div className="relative p-6 sm:p-12 z-10 max-w-3xl space-y-6">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <GraduationCap size={14} className="text-amber-400" />
              <span>{course.category}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white">
              {course.name}
            </h1>

            <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-medium">
              {course.description}
            </p>

            {/* Quick Highlights Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Duration</span>
                <span className="font-bold text-white mt-1 block">{course.duration}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Intake</span>
                <span className="font-bold text-white mt-1 block">{course.atAGlance?.intake || "100 Seats"}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Affiliation</span>
                <span className="font-bold text-white mt-1 block">BNU</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Coaching</span>
                <span className="font-bold text-white mt-1 block">TRISHUL Model</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("apply-form-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Apply for Admissions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Body (8/12) */}
          <div className="lg:col-span-8 space-y-10">

            {/* 1. COURSE AT A GLANCE */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                <GraduationCap className="text-amber-500" size={22} />
                <span>Course at a Glance</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Programme</span>
                  <span className="font-bold text-[#1E3A8A]">{course.atAGlance?.programme || course.name}</span>
                </div>
                {course.atAGlance?.subjectCombination && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Subject Combination</span>
                    <span className="font-bold text-slate-800">{course.atAGlance.subjectCombination}</span>
                  </div>
                )}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Intake</span>
                  <span className="font-bold text-slate-800">{course.atAGlance?.intake || "100"}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Duration</span>
                  <span className="font-bold text-slate-800">{course.duration}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Affiliated To</span>
                  <span className="font-bold text-[#1E3A8A]">Bengaluru North University</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">College Code</span>
                  <span className="font-bold text-slate-800">P19GHR0326</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">AISHE Code</span>
                  <span className="font-bold text-slate-800">{course.atAGlance?.aisheCode || "(To be updated once allotted)"}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Mode of Study</span>
                  <span className="font-bold text-slate-800">Full-Time</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Medium of Instruction</span>
                  <span className="font-bold text-slate-800">{course.atAGlance?.mediumOfInstruction || "English / Kannada (as per University norms)"}</span>
                </div>
              </div>
            </div>

            {/* 2. ABOUT THE COURSE */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpenCheck className="text-amber-500" size={22} />
                <span>About the Course</span>
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {course.aboutText || course.description}
              </p>
            </div>

            {/* 3. WHY CHOOSE...? */}
            {course.whyChoose && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Award className="text-amber-500" size={22} />
                  <span>Why Choose {course.name} at Sri Vidya Chetana Degree College?</span>
                </h3>
                <ul className="space-y-3">
                  {course.whyChoose.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. KEY BENEFITS */}
            {course.keyBenefits && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles className="text-amber-500" size={22} />
                  <span>Key Benefits of the Programme</span>
                </h3>
                <ul className="space-y-3">
                  {course.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <Check size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. CAREER OPPORTUNITIES */}
            {course.careerOpportunities && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Briefcase className="text-amber-500" size={22} />
                  <span>Career Opportunities</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(course.careerOpportunities).map(([cat, roles]) => (
                    <div key={cat} className="space-y-2">
                      <h4 className="text-xs font-extrabold text-[#1E3A8A] uppercase tracking-wider">{cat}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {roles.map((role, rIdx) => (
                          <span key={rIdx} className="bg-amber-50 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-lg border border-amber-200/60">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TRISHUL LEARNING MODEL */}
            {course.trishulModel && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={22} />
                    <span>TRISHUL Learning Model – Degree + Competitive Examination Preparation + Industry Skills</span>
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    At Sri Vidya Chetana Degree College, every student benefits from our TRISHUL Learning Model, which integrates Academic Excellence, Competitive Examination Preparation, and Industry &amp; Employability Skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Academic */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1E3A8A] border-b border-slate-200 pb-2">
                      Academic Excellence
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.academic.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check size={12} className="text-amber-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Competitive */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1E3A8A] border-b border-slate-200 pb-2">
                      Competitive Examination Prep
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.competitive.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check size={12} className="text-amber-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1E3A8A] border-b border-slate-200 pb-2">
                      Industry &amp; Employability Skills
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.skills.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check size={12} className="text-amber-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 7. CLOSING STATEMENT */}
            {course.closingStatement && (
              <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-900 text-amber-300 p-6 sm:p-8 rounded-3xl shadow-lg border border-amber-400/30 font-bold text-sm sm:text-base leading-relaxed text-center">
                {course.closingStatement}
              </div>
            )}

            {/* Embedded Application Form Section */}
            <div id="apply-form-section" className="scroll-mt-10">
              <Admissions admissions={admissions} branding={branding} courses={courses} defaultCourse={course.name} />
            </div>

          </div>

          {/* Right Sidebar (4/12) - Fixed/Sticky on Scroll throughout the page */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 lg:self-start z-30">

            {/* At a Glance Widget */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#1E3A8A] uppercase tracking-wider border-b border-slate-100 pb-3">
                Course Summary
              </h3>

              <div className="space-y-3 text-xs text-slate-600 font-medium">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-bold text-slate-800">{course.duration}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Eligibility:</span>
                  <span className="font-bold text-slate-800 text-right max-w-[180px]">{course.eligibility}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Intake:</span>
                  <span className="font-bold text-slate-800">{course.atAGlance?.intake || "100 Seats"}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-400">Affiliation:</span>
                  <span className="font-bold text-[#1E3A8A]">Bengaluru North University</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("apply-form-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-extrabold text-xs py-3.5 rounded-xl shadow-md border border-amber-400/30 transition-all cursor-pointer text-center"
              >
                Apply for {course.name.split(" ")[0]}
              </button>
            </div>

            {/* Related Courses Carousel/Grid */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#1E3A8A] uppercase tracking-wider border-b border-slate-100 pb-3">
                Recommended Programs
              </h3>

              <div className="space-y-3">
                {relatedCourses.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/courses/${rel.slug || rel.id}`}
                    className="block p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 transition-colors group"
                  >
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#1E3A8A]">{rel.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{rel.duration}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
