import React, { useState, useMemo } from "react";
import { Briefcase, Search, Calendar, ExternalLink, ChevronLeft, ChevronRight, Building2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function JobUpdates({ newsAndAnnouncements }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const jobUpdates = newsAndAnnouncements?.jobUpdates || [];

  const filteredJobs = useMemo(() => {
    return jobUpdates.filter(job => 
      job.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.endDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [jobUpdates, searchQuery]);

  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage]);

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            CAREER & RECRUITMENT DESK
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
            Job Updates & Recruitment Notifications
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Latest alerts for KPSC, UPSC, Banking PO/Clerk, Railways, Karnataka State Police, and corporate campus drives.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search job notifications, government boards, or vacancies..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Job Updates Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#1E3A8A] to-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase size={22} className="text-amber-400" />
              <h2 className="text-lg font-bold">Latest Recruitment Notifications</h2>
            </div>
            <span className="text-xs bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full font-bold border border-amber-400/30">
              {filteredJobs.length} Active Posts
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Sl. No.</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Start Date</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">End Date</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Link</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {paginatedJobs.map((job) => {
                    // Extract department dynamically
                    let dept = "Government";
                    if (job.details.includes("KPSC")) dept = "KPSC";
                    else if (job.details.includes("SBI")) dept = "SBI";
                    else if (job.details.includes("UPSC")) dept = "UPSC";
                    else if (job.details.includes("RRB") || job.details.includes("Railway")) dept = "RRB / Railways";
                    else if (job.details.includes("SSC")) dept = "SSC";
                    else if (job.details.includes("LIC")) dept = "LIC";
                    else if (job.details.includes("IBPS")) dept = "IBPS";
                    else if (job.details.includes("Police")) dept = "Karnataka Police";
                    else {
                      const firstWord = job.details.trim().split(" ")[0];
                      if (firstWord && firstWord.length > 2) dept = firstWord;
                    }

                    return (
                      <motion.tr
                        key={job.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-amber-50/20 transition-colors"
                      >
                        {/* Sl. No. */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-slate-500">
                          {job.slNo}
                        </td>

                        {/* Department */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-block text-xs font-extrabold text-[#1E3A8A] bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-lg">
                            {dept}
                          </span>
                        </td>

                        {/* Start Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-slate-700 font-semibold">
                          {job.startDate}
                        </td>

                        {/* End Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-emerald-600 font-bold">
                          {job.endDate}
                        </td>

                        {/* Description */}
                        <td className="px-6 py-4 text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {job.details}
                        </td>

                        {/* Link */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {job.link ? (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#1E3A8A] hover:bg-blue-900 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow shrink-0 cursor-pointer"
                            >
                              <span>Apply</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="inline-block text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                              Notice Board
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
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

        {/* Corporate & Placement Assistance Banner */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-300">
              Campus Placement & Articleship Guidance Cell
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Our placement desk coordinates directly with top-tier accounting firms, corporate recruiters, and administrative exam training circles for student recruitment.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-5 py-3 rounded-2xl text-xs font-bold shrink-0">
            <CheckCircle2 size={18} className="text-amber-400" />
            <span>Dedicated Placement Assistance</span>
          </div>
        </div>

      </div>
    </div>
  );
}
