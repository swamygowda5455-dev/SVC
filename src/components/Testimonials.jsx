import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Testimonials({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-white relative scroll-mt-10 overflow-hidden">
      {/* Decorative quotes background graphic */}
      <div className="absolute top-20 right-1/4 text-slate-100 select-none pointer-events-none">
        <Quote size={200} className="transform rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            ALUMNI SUCCESS LOGS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            WHAT OUR SCHOLARS SAY
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            Hear from our graduates and current students about their academic journeys and career transitions.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Slider Board */}
        <div className="max-w-4xl mx-auto relative px-4">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 rounded-2xl p-6 sm:p-12 border border-slate-200 text-center md:text-left flex flex-col md:flex-row gap-6 sm:gap-8 items-center shadow-sm"
            >
              {/* Alumni Avatar & Corporate Badge */}
              <div className="relative shrink-0 text-center">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  referrerPolicy="no-referrer"
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-white shadow-sm mx-auto"
                />
                
                <div className="mt-4 bg-white text-blue-900 border border-slate-200 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  <Landmark size={12} className="text-blue-600" />
                  <span>{testimonials[activeIndex].company.split(" ")[testimonials[activeIndex].company.split(" ").length - 1]} Placement</span>
                </div>
              </div>

              {/* Quotes Content */}
              <div className="flex-grow space-y-4 text-center md:text-left">
                <Quote size={32} className="text-blue-100 mx-auto md:mx-0" />
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-base font-bold font-display text-slate-800">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Currently: {testimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              id="test-prev-btn"
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors shadow-sm cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot Index indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  id={`test-dot-${index}`}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === index ? "bg-blue-600 scale-125 w-5" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              id="test-next-btn"
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors shadow-sm cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
