import React, { useState, useMemo } from "react";
import { Megaphone, Search, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RecentNews({ newsAndAnnouncements }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const announcements = newsAndAnnouncements?.announcements || [];

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(ann => 
      ann.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.date.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [announcements, searchQuery]);

  const totalPages = Math.ceil(filteredAnnouncements.length / pageSize) || 1;

  const paginatedAnnouncements = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAnnouncements.slice(start, start + pageSize);
  }, [filteredAnnouncements, currentPage]);

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            OFFICIAL NOTICE BOARD
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
            Recent News & Announcements
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Stay informed with official circulars, university exam timetables, academic masterclasses, and college announcements.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search announcements, circulars, or timetables..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Main Announcements Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#1E3A8A] to-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Megaphone size={22} className="text-amber-400" />
              <h2 className="text-lg font-bold">Official College Announcements</h2>
            </div>
            <span className="text-xs bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full font-bold border border-amber-400/30">
              {filteredAnnouncements.length} Total
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {paginatedAnnouncements.map((ann) => (
                <motion.div
                  key={ann.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 sm:p-6 hover:bg-amber-50/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                      <Calendar size={14} className="text-amber-500" />
                      <span>{ann.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-snug">
                      {ann.details}
                    </p>
                  </div>

                  {ann.link && (
                    <a
                      href={ann.link}
                      target={ann.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3A8A] hover:text-blue-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all shrink-0 self-start sm:self-center"
                    >
                      <span>View Details</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>Showing Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
