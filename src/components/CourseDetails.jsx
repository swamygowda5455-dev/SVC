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
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const course = courses.find(c => c.slug === slug || c.id === slug);

  // Dynamic OpenGraph and HTML Meta Tag update for SEO & Social Sharing
  useEffect(() => {
    if (course) {
      document.title = `${course.name} - Sri Vidya Chetana Degree College`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = course.description;

      // Update OG Meta Tags
      const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = `${course.name} | Sri Vidya Chetana Degree College`;
      document.head.appendChild(ogTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      ogDesc.content = course.description;
      document.head.appendChild(ogDesc);

      const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = course.image;
      document.head.appendChild(ogImage);
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
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Seat Intake</span>
                <span className="font-bold text-white mt-1 block">{course.atAGlance?.intake || "60 Seats"}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Affiliation</span>
                <span className="font-bold text-white mt-1 block">{course.atAGlance?.affiliation || "BNU"}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span className="text-amber-300 text-[10px] font-extrabold uppercase tracking-wider block">Coaching</span>
                <span className="font-bold text-white mt-1 block">Integrated TRISHUL</span>
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

            {/* Overview & About */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpenCheck className="text-amber-500" size={22} />
                <span>Course Overview</span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {course.aboutText || course.description}
              </p>
            </div>

            {/* Fee Structure Table */}
            {course.feeStructure && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <DollarSign className="text-amber-500" size={22} />
                  <span>Fee Structure & Investment</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                    <thead className="bg-slate-100 text-[#1E3A8A] font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
                      <tr>
                        <th className="p-3 rounded-l-xl">Academic Year</th>
                        <th className="p-3">University Tuition Fee</th>
                        <th className="p-3">Integrated Coaching Fee</th>
                        <th className="p-3 rounded-r-xl">Total Payable</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {course.feeStructure.map((fee, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-3 font-bold text-slate-800">{fee.year}</td>
                          <td className="p-3 text-slate-600">{fee.tuitionFee}</td>
                          <td className="p-3 text-slate-600">{fee.coachingFee}</td>
                          <td className="p-3 font-extrabold text-[#1E3A8A]">{fee.totalFee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  * Note: Fee concessions and merit scholarships available based on 10+2 / PUC score marks.
                </p>
              </div>
            )}

            {/* TRISHUL Learning Model */}
            {course.trishulModel && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={22} />
                    <span>TRISHUL 3-in-1 Integrated Learning Model</span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Combines regular university degree syllabus with competitive exam preparation and employability skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Academic */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#1E3A8A] border-b border-slate-200 pb-2">
                      1. Academic Excellence
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.academic.slice(0, 6).map((item, idx) => (
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
                      2. Competitive Prep
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.competitive.slice(0, 6).map((item, idx) => (
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
                      3. Employability Skills
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {course.trishulModel.skills.slice(0, 6).map((item, idx) => (
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

            {/* Required Documents */}
            {course.requiredDocuments && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="text-amber-500" size={22} />
                  <span>Required Documents for Admissions</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium">
                      <CheckCircle size={16} className="text-amber-500 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Opportunities */}
            {course.careerOpportunities && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Briefcase className="text-amber-500" size={22} />
                  <span>Career Opportunities & Scope</span>
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

            {/* Course FAQs */}
            {course.faqs && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-display text-[#1E3A8A] flex items-center gap-2 border-b border-slate-100 pb-3">
                  <HelpCircle className="text-amber-500" size={22} />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {course.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">{faq.question}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Embedded Application Form Section */}
            <div id="apply-form-section" className="scroll-mt-10">
              <Admissions admissions={admissions} branding={branding} courses={courses} defaultCourse={course.name} />
            </div>

          </div>

          {/* Right Sidebar (4/12) */}
          <div className="lg:col-span-4 space-y-6">

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
                  <span className="font-bold text-slate-800">{course.atAGlance?.intake || "60 Seats"}</span>
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
                    className="flex gap-3 p-2.5 rounded-xl hover:bg-amber-50/40 border border-slate-100 hover:border-amber-300 transition-all group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#1E3A8A] line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">{rel.duration}</p>
                    </div>
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
