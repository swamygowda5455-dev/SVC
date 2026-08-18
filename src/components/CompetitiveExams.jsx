import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Award, 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  GraduationCap, 
  Clock, 
  Users, 
  Target, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CompetitiveExams() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Coaching Streams" },
    { id: "civil-services", name: "UPSC & KPSC (IAS / KAS)" },
    { id: "banking-ssc", name: "Banking & SSC" },
    { id: "railways", name: "Railway Recruitment" },
    { id: "ca-foundation", name: "CA Foundation" },
    { id: "integrated-batches", name: "Integrated Batches" }
  ];

  const examStreams = [
    {
      id: "civil-services",
      title: "UPSC & KPSC Civil Services Academy",
      subTitle: "IAS, IPS, IFS & KAS Administrative Services",
      description: "Comprehensive foundation and advanced coaching for Civil Services examinations integrated into daily undergraduate college schedules.",
      badge: "Flagship Program",
      icon: Target,
      features: [
        "Daily NCERT syllabus coverage & conceptual clarity sessions",
        "Answer writing drills evaluated by retired IAS/KAS officers",
        "Current Affairs analysis with daily newspaper reading sessions",
        "Dedicated competitive exam library with 5,000+ reference volumes",
        "Mock interview boards panelled by senior administrative leaders"
      ],
      targetExams: ["UPSC CSE (IAS/IPS/IFS)", "KPSC KAS (Gazetted Probationers)", "FDA / SDA / PSI Exams"],
      duration: "3-Year Integrated / 1-Year Foundation"
    },
    {
      id: "banking-ssc",
      title: "Banking & Staff Selection Commission (SSC)",
      subTitle: "SBI PO/Clerk, IBPS, SSC CGL & CHSL",
      description: "High-speed quantitative aptitude, reasoning shortcuts, English proficiency, and computer-based mock testing to crack banking and central government posts.",
      badge: "High Placement Rate",
      icon: Award,
      features: [
        "Shortcut speed-math drills & quantitative problem solving",
        "Daily computer-based test (CBT) simulations in dedicated labs",
        "Banking awareness & financial sector current updates",
        "Regular sectional mock tests with detailed analytics",
        "Specialized interview preparation for Probationary Officer cadres"
      ],
      targetExams: ["SBI PO & Clerk", "IBPS PO & RRB", "SSC CGL / CHSL", "RBI Assistant & Grade B"],
      duration: "Integrated with B.Com / B.Sc / BBA"
    },
    {
      id: "railways",
      title: "Railway Recruitment Board (RRB) Training",
      subTitle: "RRB NTPC, Group D & Assistant Station Master",
      description: "Structured syllabus training covering general science, mathematics, reasoning, and general awareness for Indian Railway technical and non-technical exams.",
      badge: "Popular Stream",
      icon: ShieldCheck,
      features: [
        "Focused study sheets on General Science and Applied Physics",
        "Exam-oriented objective mock test series",
        "Previous 10-year RRB question paper analysis",
        "Time-management strategies for Online CBT I & II"
      ],
      targetExams: ["RRB NTPC (Graduate Posts)", "RRB Junior Engineer", "RRB Assistant Loco Pilot"],
      duration: "Integrated Coaching"
    },
    {
      id: "ca-foundation",
      title: "Chartered Accountancy (CA Foundation)",
      subTitle: "ICAI Professional Course Tutoring",
      description: "Dedicated morning and evening tutoring for commerce scholars aiming to clear CA Foundation in their first attempt along with B.Com degree studies.",
      badge: "Professional Track",
      icon: GraduationCap,
      features: [
        "Principles and Practice of Accounting intensive lectures",
        "Mercantile & Corporate Laws exam-focused coaching",
        "Quantitative Aptitude, Logical Reasoning & Statistics drills",
        "Articleship placement support with accredited audit firms"
      ],
      targetExams: ["ICAI CA Foundation", "CA Intermediate Foundation Prep", "CMA Foundation"],
      duration: "1-Year Batch (Parallel with B.Com Year 1)"
    },
    {
      id: "integrated-batches",
      title: "Abyasa & Gurukul Sankalpa Special Batches",
      subTitle: "Exclusive NCERT & Integrated Degree Coaching",
      description: "Our landmark multi-year programs designed to build unbeatable competitive fundamentals from day one of collegiate education.",
      badge: "Recommended",
      icon: Sparkles,
      features: [
        "Abyasa 1-Year NCERT Class 6th-12th baseline coaching",
        "Gurukul Sankalpa 3-Year complete Civil Services roadmap",
        "Trishul Learning Model: Degree + Competitive Prep + Career Skills",
        "Merit scholarships up to 100% tuition concession"
      ],
      targetExams: ["All UPSC, KPSC, Banking & SSC Competitive Frameworks"],
      duration: "1 Year & 3 Year Options"
    }
  ];

  const filteredStreams = activeCategory === "all"
    ? examStreams
    : examStreams.filter(s => s.id === activeCategory);

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            CAREER INTEGRATION ACADEMY
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] mt-5 tracking-tight font-display">
            Competitive Examination Coaching
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            At Sri Vidya Chetana Degree College, university undergraduate education is integrated with result-oriented competitive examination coaching, empowering students to graduate with both a degree and career readiness.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex justify-start md:justify-center overflow-x-auto py-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 max-w-full shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#1E3A8A] text-amber-300 shadow-md border border-amber-400/30"
                    : "text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStreams.map((stream) => {
              const IconComp = stream.icon;
              return (
                <motion.div
                  key={stream.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-[#1E3A8A] border border-amber-400/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <IconComp size={24} className="text-[#1E3A8A]" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-amber-100 text-[#1E3A8A] border border-amber-300 rounded-full">
                        {stream.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1E3A8A] group-hover:text-blue-700 transition-colors">
                        {stream.title}
                      </h3>
                      <p className="text-xs font-semibold text-amber-600 mt-1">
                        {stream.subTitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        {stream.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 border-t border-slate-100 pt-4">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Highlights:</p>
                      {stream.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Target Exams */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A]">
                        <Clock size={14} className="text-amber-500" />
                        <span>Duration: {stream.duration}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Target Exams: </span>
                        {stream.targetExams.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to="/admissions"
                      className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-xs"
                    >
                      <span>Enroll for Coaching</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Why Competitive Coaching Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              TRISHUL Learning Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              University Degree + Competitive Exam Prep + Employability Skills
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Don't wait until graduation to start your competitive exam preparation. Save 2-3 crucial post-college years by training concurrently during your degree years.
            </p>
          </div>
          <Link
            to="/admissions"
            className="bg-amber-400 hover:bg-amber-500 text-[#1E3A8A] font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 shrink-0 text-sm flex items-center gap-2"
          >
            <span>Apply Now for Integrated Batch</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
