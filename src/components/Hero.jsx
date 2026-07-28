import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, GraduationCap, ArrowRight, Award, Users, MapPin, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Hero({ hero, branding }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hero.banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hero.banners.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + hero.banners.length) % hero.banners.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % hero.banners.length);
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#0a0f1d]">
      {/* Auto-sliding Image Container */}
      <div className="relative h-[550px] sm:h-[650px] lg:h-[700px] w-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <img
              src={hero.banners[currentSlide].image}
              alt={hero.banners[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Academic Dark Overlay with Blue gradient Tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-blue-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container (Constrained & Centered) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white select-none">
          <div className="max-w-3xl">
            {/* Dynamic Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-300 text-xs font-extrabold w-fit mb-6 shadow-sm"
            >
              <GraduationCap size={16} className="text-amber-400" />
              <span className="tracking-widest uppercase text-[10px] sm:text-xs">{branding.tagline}</span>
            </motion.div>

            {/* Slider Title (Dynamic) */}
            <motion.h2
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-display"
            >
              <span className="block">{hero.banners[currentSlide].title}</span>
            </motion.h2>

            {/* Slider Subtitle (Dynamic) */}
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed mb-8 max-w-2xl"
            >
              {hero.banners[currentSlide].subtitle}
            </motion.p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button
                id="hero-apply-btn"
                onClick={() => navigate("/admissions")}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
              >
                <span>Apply for Admissions</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-slate-950" />
              </button>
              
              <button
                id="hero-courses-btn"
                onClick={() => navigate("/courses")}
                className="border border-white/30 hover:border-amber-400/60 backdrop-blur-sm text-white hover:text-amber-300 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                Explore Programs
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Navigation */}
        <button
          id="hero-prev-btn"
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/50 border border-amber-400/20 hover:bg-slate-950 text-amber-400 hover:border-amber-400 transition-all z-20 cursor-pointer hidden sm:flex"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          id="hero-next-btn"
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/50 border border-amber-400/20 hover:bg-slate-950 text-amber-400 hover:border-amber-400 transition-all z-20 cursor-pointer hidden sm:flex"
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {hero.banners.map((_, index) => (
            <button
              id={`hero-dot-${index}`}
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index ? "bg-amber-400 scale-125 w-6" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Accreditations Highlights Bar */}
      <div className="bg-white border-y border-slate-200 py-6 px-4 sm:px-8 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-4 last:border-0 sm:border-b-0 sm:pb-0 sm:pr-4 lg:border-r lg:last:border-0 lg:pr-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-200/60 shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A8A]">NAAC A++</h4>
              <p className="text-[11px] text-slate-500 font-medium">Highest Accredited Rank</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-4 last:border-0 sm:border-b-0 sm:pb-0 sm:pr-4 lg:border-r lg:last:border-0 lg:pr-4">
            <div className="p-3 bg-blue-50 rounded-xl text-[#1E3A8A] border border-blue-100 shrink-0">
              <Users size={24} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A8A]">15,000+</h4>
              <p className="text-[11px] text-slate-500 font-medium">Active Campus Scholars</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-4 last:border-0 sm:border-b-0 sm:pb-0 sm:pr-4 lg:border-r lg:last:border-0 lg:pr-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-200/60 shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A8A]">120 Acres</h4>
              <p className="text-[11px] text-slate-500 font-medium">Eco-Friendly Mega Campus</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 last:border-0">
            <div className="p-3 bg-blue-50 rounded-xl text-[#1E3A8A] border border-blue-100 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-[#1E3A8A]">96%</h4>
              <p className="text-[11px] text-slate-500 font-medium">In-Campus Placements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
