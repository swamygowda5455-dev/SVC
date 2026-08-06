import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, GraduationCap, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Hero({ branding }) {
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
      
      {/* 1. HERO BANNER SECTION WITH BACKGROUND IMAGE SLIDER */}
      <section className="relative overflow-hidden bg-[#1E3A8A] text-white py-16 sm:py-24 lg:py-28 min-h-[550px] flex items-center">
        
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
            {/* Subtle Dark Overlay for Image Visibility & Text Contrast */}
            <div className="absolute inset-0 bg-slate-950/45" />
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-amber-300 font-extrabold text-sm sm:text-base tracking-wide uppercase"
            >
              <GraduationCap size={20} className="text-amber-400 shrink-0" />
              <span>Affiliated to Bengaluru North University</span>
            </motion.div>

            {/* Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto pt-2"
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
              <span className={`block h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-amber-400 w-6" : "bg-white/40 hover:bg-white/70 w-2"
              }`} />
            </button>
          ))}
        </div>

      </section>

      {/* 2. WELCOME & OVERVIEW SECTION */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          
          <div className="space-y-3">
            <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
              ABOUT OUR INSTITUTION
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
              Welcome to Sri Vidya Chetana Degree College
            </h2>
            <p className="text-amber-600 text-sm sm:text-base font-extrabold tracking-wide">
              Empowering Students. Inspiring Excellence. Building Futures.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full mt-3" />
          </div>

          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm text-left space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
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

          {/* Slogan Banner */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-900 text-amber-300 p-6 sm:p-8 rounded-2xl shadow-xl border border-amber-400/30">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              One Degree. Three Advantages. Unlimited Opportunities.
            </h3>
          </div>

        </div>
      </section>

      {/* 3. PRINCIPAL'S MESSAGE SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
              LEADERSHIP DESK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight font-display flex items-center justify-center gap-2">
              <Quote className="text-amber-500 hidden sm:inline-block" size={32} />
              <span>Principal's Message</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full mt-3" />
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="font-extrabold text-[#1E3A8A] text-base sm:text-lg">
              Dear Students, Parents, and Well-Wishers,
            </p>
            <p className="font-bold text-slate-800">
              Welcome to Sri Vidya Chetana Degree College.
            </p>
            <p>
              Education is not merely about earning a degree; it is about developing knowledge, character, skills, and the confidence to face future challenges. At Sri Vidya Chetana Degree College, we are committed to providing a student-centric learning environment that promotes academic excellence, critical thinking, ethical values, and holistic development.
            </p>
            <p>
              Our unique Integrated Degree Programme combines university education with structured coaching for UPSC Civil Services (IAS/IPS/IFS), KPSC (KAS), Banking, SSC, Railways, and Chartered Accountancy (CA). This approach enables students to build a strong academic foundation while preparing for competitive examinations and diverse career opportunities.
            </p>
            <p>
              With the guidance of our dedicated faculty and mentors, students are encouraged to develop leadership, communication, digital, and employability skills that will help them succeed in higher education, professional careers, entrepreneurship, and public service.
            </p>
            <p>
              I encourage every student to make the most of the opportunities available, pursue excellence with determination, uphold integrity in all actions, and strive to become responsible citizens who contribute positively to society and the nation.
            </p>
            <p>
              I wish you a rewarding, successful, and inspiring academic journey at Sri Vidya Chetana Degree College.
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col items-start gap-0.5 font-display">
              <p className="font-extrabold text-base text-[#1E3A8A]">Principal</p>
              <p className="text-amber-600 font-extrabold text-xs tracking-wider uppercase">Sri Vidya Chetana Degree College</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
