import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Gallery({ gallery }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = ["All", "Campus", "Laboratories", "Cultural Activities", "Sports", "Events"];

  const filteredGallery = selectedFilter === "All"
    ? gallery
    : gallery.filter(item => item.category === selectedFilter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-12 sm:py-20 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-[#1E3A8A] text-[10px] font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
              EXPLORE OUR CAMPUS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
              OUR CAMPUS GALLERY
            </h2>
            <div className="w-12 h-0.5 bg-[#1E3A8A] mt-4 rounded-full" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex overflow-x-auto scrollbar-none items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 max-w-full shrink-0 -mx-4 px-4 sm:mx-0 sm:px-1.5">
            {filters.map((filter) => (
              <button
                id={`gallery-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedFilter === filter
                    ? "bg-[#1E3A8A] text-amber-300 shadow-sm border border-amber-400/30"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                id={`gallery-item-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Background Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Glass Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Info Text slide-up on Hover */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-display mt-1 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <Eye size={14} />
                    <span>View Lightbox Preview</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal Carousel */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 select-none">
              
              {/* Overlay dismissal */}
              <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />

              {/* Close Button */}
              <button
                id="close-gallery-lightbox"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-colors cursor-pointer z-10"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Left Arrow */}
              <button
                id="gallery-lightbox-prev"
                onClick={handlePrev}
                className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/15 cursor-pointer z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Container with motion transition */}
              <div className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center z-10 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center w-full"
                  >
                    <img
                      src={filteredGallery[lightboxIndex].image}
                      alt={filteredGallery[lightboxIndex].title}
                      referrerPolicy="no-referrer"
                      className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                    />

                    {/* Metadata Overlay Caption */}
                    <div className="mt-4 text-center">
                      <span className="text-[10px] tracking-widest font-extrabold text-blue-400 uppercase">
                        {filteredGallery[lightboxIndex].category}
                      </span>
                      <h4 className="text-white text-base sm:text-lg font-bold font-display mt-1">
                        {filteredGallery[lightboxIndex].title}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1 font-mono">
                        Image {lightboxIndex + 1} of {filteredGallery.length}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <button
                id="gallery-lightbox-next"
                onClick={handleNext}
                className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/15 cursor-pointer z-10"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>

            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
