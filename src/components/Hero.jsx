import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import trishulModelImg from "@/assets/trishul model.png";
import Contact from "./Contact.jsx";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Quote,
  ChevronLeft,
  ChevronRight,
  Eye,
  Target,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Laptop,
  Zap,
  TrendingUp,
  Briefcase,
  Building2,
  HeartHandshake
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Hero({ branding, admissions, courses }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const collegeImages = [
    {
      id: "bg-1",
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
      title: "Sri Vidya Chetana Degree College Campus"
    },
    {
      id: "bg-2",
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
      title: "Academic Excellence & Library Wing"
    },
    {
      id: "bg-3",
      url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
      title: "Modern University Architecture & Infrastructure"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % collegeImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [collegeImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + collegeImages.length) % collegeImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % collegeImages.length);
  };

  return (
    <div id="home" className="w-full bg-slate-50">

      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                           */}
      {/* ========================================================================= */}
      <section id="hero-welcome-parent" className="w-full relative">
        <div className="relative overflow-hidden bg-[#1E3A8A] text-white py-16 sm:py-24 lg:py-28 min-h-[560px] flex items-center">

        {/* Background Image Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={collegeImages[currentSlide].url}
              alt={collegeImages[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark Overlay for Visibility */}
            <div className="absolute inset-0 bg-slate-950/50" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center w-full">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Top Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-extrabold shadow-sm"
            >
              <Sparkles size={16} className="text-amber-400 shrink-0" />
              <span>Shape Your Future with Purpose. Lead with Excellence.</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-display leading-tight"
            >
              Welcome to Sri Vidya Chetana Degree College
            </motion.h1>

            {/* Affiliation Subtitle */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-amber-300 font-extrabold text-xs sm:text-sm md:text-base tracking-wide uppercase text-center max-w-3xl mx-auto"
            >
              <GraduationCap size={20} className="text-amber-400 shrink-0 hidden sm:inline-block" />
              <span>Affiliated to Bengaluru North University | Degree Integrated with Civil Service Exam Preparation &amp; Skill Development</span>
            </motion.div> */}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto pt-2"
            >
              At Sri Vidya Chetana Degree College, education goes beyond earning a degree. We empower students with academic excellence, competitive examination preparation, and career-oriented skill development through our unique Trishul Model, helping them excel in higher education, government services, and the corporate world.
            </motion.p>

            {/* Admissions Open Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <span className="inline-block bg-amber-400 text-slate-950 px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-400/20 border border-amber-300">
                Admissions Open for Academic Year 2026–27
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <button
                id="hero-explore-courses-btn"
                onClick={() => navigate("/courses")}
                className="bg-white hover:bg-slate-100 text-[#1E3A8A] font-extrabold text-sm px-8 py-3.5 min-h-[44px] rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight size={16} />
              </button>

              <button
                id="hero-apply-now-btn"
                onClick={() => navigate("/admissions")}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-sm px-8 py-3.5 min-h-[44px] rounded-full shadow-xl shadow-amber-500/20 transition-all duration-300 hover:scale-105 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 border border-amber-300"
              >
                <span>Apply Now</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>

          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/50 hover:bg-slate-950 text-amber-400 border border-amber-400/30 transition-all z-20 cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Previous Background Image"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/50 hover:bg-slate-950 text-amber-400 border border-amber-400/30 transition-all z-20 cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Next Background Image"
        >
          <ChevronRight size={22} />
        </button>

        {/* Carousel Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {collegeImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="p-1 cursor-pointer"
              aria-label={`Switch to slide ${index + 1}`}
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-amber-400 w-6" : "bg-white/40 hover:bg-white/70 w-2"
                }`} />
            </button>
          ))}
        </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. WELCOME TO SRI VIDYA CHETANA DEGREE COLLEGE                            */}
        {/* ========================================================================= */}
        <div className="py-16 sm:py-24 bg-slate-50/50 relative border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-slate-200 shadow-sm p-6 sm:p-12 rounded-3xl space-y-8 text-center">

            {/* Header */}
            <div className="space-y-3 flex flex-col items-center justify-center text-center w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight font-display text-center w-full">
                Welcome to Sri Vidya Chetana Degree College
              </h2>
              <p className="!text-center text-amber-600 text-sm sm:text-base font-extrabold tracking-wide w-full mx-auto" style={{ textAlign: "center" }}>
                Empowering Students. Inspiring Excellence. Building Futures.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full mt-3" />
            </div>

            {/* Content (same background) */}
            <div className="text-left space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Established in 2026, Sri Vidya Chetana Degree College is a premier institution committed to delivering quality higher education with a strong focus on academic excellence, career readiness, and holistic student development. Managed by the Sri Vidya Chetana Educational &amp; Charitable Trust (R.) and affiliated with Bengaluru North University, the college offers undergraduate programmes in B.A., B.Com., B.Sc., BBA, and BCA.
              </p>

              <p>
                At Sri Vidya Chetana Degree College, education goes beyond the classroom. Through our unique Trishul Model, we integrate Academic Excellence, Competitive Examination Preparation, and Industry Skill Development, enabling students to pursue their university degree while preparing for careers in government services, higher education, entrepreneurship, and the corporate sector.
              </p>

              <p>
                With experienced faculty, personalized mentoring, modern teaching methodologies, and a student-centric learning environment, we nurture confident, competent, and socially responsible graduates who are prepared to lead and contribute meaningfully to society.
              </p>
            </div>

            {/* Slogan (styled as text on the same white background with horizontal lines) */}
            <div className="py-5 border-y border-slate-100 flex items-center justify-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1E3A8A] tracking-tight text-center">
                “One Degree. Three Advantages. Unlimited Opportunities.”
              </h3>
            </div>

            {/* Read More Link */}
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <span>👉 Read More About Us</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. WHY CHOOSE SRI VIDYA CHETANA DEGREE COLLEGE?                           */}
        {/* ========================================================================= */}
        <div className="py-16 sm:py-24 bg-white relative border-t border-slate-200 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full">
                WHY US
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] font-display">
                Why Choose Sri Vidya Chetana Degree College?
              </h2>
              <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  title: "Academic Excellence",
                  desc: "Quality education with experienced faculty and student-focused learning.",
                  icon: BookOpen
                },
                {
                  title: "Integrated Competitive Exam Preparation",
                  desc: "Prepare for IAS, KAS, Banking, SSC, CA and other Government examinations while completing your degree.",
                  icon: Target
                },
                {
                  title: "Industry Skill Development",
                  desc: "Enhance employability through effective communication, English language proficiency, leadership development, digital literacy, aptitude training, and essential workplace skills.",
                  icon: Zap
                },
                {
                  title: "Personal Mentorship",
                  desc: "Individual guidance for academics, career planning, and competitive examinations.",
                  icon: Users
                },
                {
                  title: "Modern Learning Environment",
                  desc: "Smart classrooms, digital resources, and technology-enabled learning.",
                  icon: Laptop
                },
                {
                  title: "Career Guidance & Placement Support",
                  desc: "Internships, placement assistance, higher education guidance, and entrepreneurship support.",
                  icon: TrendingUp
                },
                {
                  title: "Scholarships & Financial Assistance",
                  desc: "Merit-based scholarships and flexible fee payment options.",
                  icon: Award
                },
                {
                  title: "Holistic Student Development",
                  desc: "Sports, cultural activities, leadership programmes, NSS, NCC, and community engagement.",
                  icon: HeartHandshake
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-3 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#1E3A8A] flex items-center justify-center font-bold">
                        <IconComponent size={24} className="text-[#1E3A8A]" />
                      </div>
                      <h3 className="text-base font-extrabold text-[#1E3A8A] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OUR COURSES                                                            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full">
              ACADEMIC OFFERINGS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] font-display">
              Our Courses
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We offer undergraduate programmes designed to prepare students for academic excellence and successful careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Course 1 */}
            <div
              onClick={() => navigate("/courses/ba")}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="inline-block bg-blue-100 text-[#1E3A8A] text-xs font-extrabold px-3 py-1 rounded-full">
                Undergraduate Degree
              </span>
              <h3 className="text-lg font-extrabold text-[#1E3A8A] group-hover:text-amber-600 transition-colors">Bachelor of Arts (B.A.)</h3>
              <div className="pt-2 border-t border-slate-100 text-slate-700 text-sm font-semibold space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase">Specializations</p>
                <p>Economics • Political Science • Journalism &amp; Mass Communication</p>
              </div>
            </div>

            {/* Course 2 */}
            <div
              onClick={() => navigate("/courses/bcom")}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="inline-block bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">
                Commerce &amp; Finance
              </span>
              <h3 className="text-lg font-extrabold text-[#1E3A8A] group-hover:text-amber-600 transition-colors">Bachelor of Commerce (B.Com.)</h3>
              <div className="pt-2 border-t border-slate-100 text-slate-700 text-sm font-semibold space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase">Specializations</p>
                <p>Accounting • Finance • Taxation • Business Studies</p>
              </div>
            </div>

            {/* Course 3 */}
            <div
              onClick={() => navigate("/courses/bsc")}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="inline-block bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full">
                Science Stream
              </span>
              <h3 className="text-lg font-extrabold text-[#1E3A8A] group-hover:text-amber-600 transition-colors">Bachelor of Science (B.Sc.)</h3>
              <div className="pt-2 border-t border-slate-100 text-slate-700 text-sm font-semibold space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase">Specializations</p>
                <p>Physics • Mathematics • Computer Science</p>
              </div>
            </div>

            {/* Course 4 */}
            <div
              onClick={() => navigate("/courses/bba")}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <span className="inline-block bg-purple-100 text-purple-900 text-xs font-extrabold px-3 py-1 rounded-full">
                Business &amp; Leadership
              </span>
              <h3 className="text-lg font-extrabold text-[#1E3A8A] group-hover:text-amber-600 transition-colors">Bachelor of Business Administration (BBA)</h3>
              <div className="pt-2 border-t border-slate-100 text-slate-700 text-sm font-semibold space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase">Specializations</p>
                <p>Business Management • Marketing • Entrepreneurship</p>
              </div>
            </div>

            {/* Course 5 */}
            <div
              onClick={() => navigate("/courses/bca")}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all md:col-span-2 lg:col-span-1 cursor-pointer group"
            >
              <span className="inline-block bg-indigo-100 text-indigo-900 text-xs font-extrabold px-3 py-1 rounded-full">
                Computer Technology
              </span>
              <h3 className="text-lg font-extrabold text-[#1E3A8A] group-hover:text-amber-600 transition-colors">Bachelor of Computer Applications (BCA)</h3>
              <div className="pt-2 border-t border-slate-100 text-slate-700 text-sm font-semibold space-y-1">
                <p className="text-slate-500 text-xs font-bold uppercase">Specializations</p>
                <p>Programming • Artificial Intelligence • Data Science</p>
              </div>
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/courses")}
              className="bg-[#1E3A8A] hover:bg-[#152a65] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3 rounded-full shadow-lg transition-all cursor-pointer"
            >
              View All Course Details
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. RECENT INITIATIVES                                                     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase">
            <Zap size={14} className="text-amber-400" />
            <span>Future-Ready Education</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
            Recent Initiatives
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Our latest initiatives are designed to provide students with an educational experience that extends far beyond the classroom.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-amber-400/20 space-y-3">
              <Building2 size={28} className="text-amber-400" />
              <h3 className="text-base font-bold text-white">IAS &amp; KAS Coaching Wing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Daily syllabus guidance, NCERT foundational modules, and mock exams for UPSC &amp; KPSC civil service aspirants.
              </p>
            </div>
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-amber-400/20 space-y-3">
              <Laptop size={28} className="text-amber-400" />
              <h3 className="text-base font-bold text-white">Digital Skill Development</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hands-on training in computer applications, communication proficiency, and modern workplace technology tools.
              </p>
            </div>
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-amber-400/20 space-y-3">
              <Users size={28} className="text-amber-400" />
              <h3 className="text-base font-bold text-white">Personal Mentorship Cell</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                One-on-one academic counseling, career path mapping, and competitive test guidance for every enrolled student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTEGRATED DEGREE PROGRAMME                                            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
              INTEGRATED DEGREE PROGRAMME
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
              Integrated Degree Programme
            </h2>
            <p className="text-slate-700 font-bold text-base sm:text-lg">
              Study Your Degree. Build Your Career. Achieve Your Dream.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our Integrated Degree Programme enables students to pursue their university degree while simultaneously preparing for competitive examinations and developing industry-relevant skills.
            </p>
          </div>


          {/* Trishul Model Graphic Image (Directly pasted as requested) */}
          <div className="w-full flex items-center justify-center pt-8">
            <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-white p-2 sm:p-4">
              <img
                src={trishulModelImg}
                alt="Trishul Model - Academic Excellence, Competitive Exam Preparation, Career & Skill Development"
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>





      {/* ========================================================================= */}
      {/* 9. TESTIMONIALS                                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">

          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-amber-400 text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
              What Our Students Say
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

            <div className="bg-slate-800/90 p-8 rounded-3xl border border-amber-400/20 space-y-4 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition-colors">
              <div className="space-y-3">
                <Quote size={32} className="text-amber-400 opacity-60" />
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "The integrated learning approach helped me balance my degree studies while preparing for competitive examinations. The mentorship and guidance have been invaluable."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-amber-300 font-extrabold text-sm">— Rajesh Gowda</h4>
                <p className="text-xs text-slate-400 font-medium">B.Com. (Civil Services KAS Aspirant)</p>
              </div>
            </div>

            <div className="bg-slate-800/90 p-8 rounded-3xl border border-amber-400/20 space-y-4 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition-colors">
              <div className="space-y-3">
                <Quote size={32} className="text-amber-400 opacity-60" />
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "The Trishul Model has given me confidence in academics, competitive preparation, and career development. I feel prepared for multiple career opportunities."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-amber-300 font-extrabold text-sm">— Ananya Sharma</h4>
                <p className="text-xs text-slate-400 font-medium">B.Sc. (Banking &amp; SSC Batch)</p>
              </div>
            </div>

            <div className="bg-slate-800/90 p-8 rounded-3xl border border-amber-400/20 space-y-4 shadow-lg flex flex-col justify-between hover:border-amber-400/50 transition-colors">
              <div className="space-y-3">
                <Quote size={32} className="text-amber-400 opacity-60" />
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  "The faculty members are supportive, the learning environment is inspiring, and the college truly focuses on every student's growth."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-amber-300 font-extrabold text-sm">— Vijay Kumar</h4>
                <p className="text-xs text-slate-400 font-medium">BBA (CA Foundation Scholar)</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CONTACT US & ADMISSIONS FORM                                          */}
      {/* ========================================================================= */}
      <Contact branding={branding} admissions={admissions} courses={courses} />

    </div>
  );
}

