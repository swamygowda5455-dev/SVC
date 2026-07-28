import React, { useState, useMemo } from "react";
import { 
  Briefcase, 
  Megaphone, 
  ExternalLink, 
  Search, 
  Calendar, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsEvents({ newsAndAnnouncements }) {
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" | "announcements"
  const [jobSearch, setJobSearch] = useState("");
  const [annSearch, setAnnSearch] = useState("");
  
  const [jobPage, setJobPage] = useState(1);
  const [annPage, setAnnPage] = useState(1);
  const pageSize = 5;

  const jobUpdates = newsAndAnnouncements?.jobUpdates || [];
  const announcements = newsAndAnnouncements?.announcements || [];

  // Filtered Job Updates
  const filteredJobs = useMemo(() => {
    return jobUpdates.filter(job => 
      job.details.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.startDate.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.endDate.toLowerCase().includes(jobSearch.toLowerCase())
    );
  }, [jobUpdates, jobSearch]);

  // Filtered Announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(ann => 
      ann.details.toLowerCase().includes(annSearch.toLowerCase()) ||
      ann.date.toLowerCase().includes(annSearch.toLowerCase())
    );
  }, [announcements, annSearch]);

  // Paginated data
  const paginatedJobs = useMemo(() => {
    const start = (jobPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, jobPage]);

  const paginatedAnnouncements = useMemo(() => {
    const start = (annPage - 1) * pageSize;
    return filteredAnnouncements.slice(start, start + pageSize);
  }, [filteredAnnouncements, annPage]);

  const totalJobPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const totalAnnPages = Math.ceil(filteredAnnouncements.length / pageSize) || 1;

  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Main Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#1E3A8A] text-[10px] font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            OFFICIAL DESK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            NOTIFICATIONS & UPDATES
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3">
            Switch tabs below to view Job Recruitment Alerts or Official College Announcements without vertical page scrolling.
          </p>
          <div className="w-12 h-0.5 bg-[#1E3A8A] mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Navigation Switcher Bar */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 max-w-md w-full">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "jobs"
                  ? "bg-[#1E3A8A] text-amber-300 shadow-md border border-amber-400/30"
                  : "text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50"
              }`}
            >
              <Briefcase size={16} className={activeTab === "jobs" ? "text-amber-400" : "text-slate-500"} />
              <span>Job Updates ({jobUpdates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("announcements")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "announcements"
                  ? "bg-[#1E3A8A] text-amber-300 shadow-md border border-amber-400/30"
                  : "text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50"
              }`}
            >
              <Megaphone size={16} className={activeTab === "announcements" ? "text-amber-400" : "text-slate-500"} />
              <span>Announcements ({announcements.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panels */}
        <AnimatePresence mode="wait">
          {activeTab === "jobs" ? (
            <motion.div
              key="jobs-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
            >
              {/* Header & Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-200/80 shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1E3A8A] font-display">Job Updates & Recruitment Notifications</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Government, Banking, Civil Services & Corporate Recruitment Alerts</p>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search job updates..."
                    value={jobSearch}
                    onChange={(e) => { setJobSearch(e.target.value); setJobPage(1); }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Mobile Responsive Cards View (< md) */}
              <div className="block md:hidden space-y-4">
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job, idx) => (
                    <div
                      key={job.id || idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                    >
                      {/* Top Header Row: Sl No & Dates */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <span className="bg-blue-50 text-[#1E3A8A] font-extrabold text-xs px-2.5 py-1 rounded-lg border border-blue-100">
                          #{job.slNo || (jobPage - 1) * pageSize + idx + 1}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                            <Calendar size={11} className="text-amber-500 shrink-0" />
                            <span>{job.startDate}</span>
                          </span>
                          <span className="text-slate-400">to</span>
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200/60">
                            <Calendar size={11} className="text-amber-600 shrink-0" />
                            <span>{job.endDate}</span>
                          </span>
                        </div>
                      </div>

                      {/* Job Details Text */}
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {job.details}
                      </p>

                      {/* Action Button */}
                      {job.link && (
                        <div className="pt-2 border-t border-slate-50">
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-extrabold text-xs py-2.5 min-h-[44px] rounded-xl shadow-xs transition-all border border-amber-400/30 text-center"
                          >
                            <span>Open Recruitment Link</span>
                            <ExternalLink size={14} className="text-amber-400" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 text-center text-slate-400 text-xs rounded-2xl border border-slate-200">
                    No job updates matching your search criteria.
                  </div>
                )}
              </div>

              {/* Desktop / Tablet Structured Table View (>= md) */}
              <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-[#1E3A8A] text-amber-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-4 sm:px-6 w-16 text-center whitespace-nowrap">Sl. No.</th>
                      <th className="py-4 px-4 w-32 sm:w-36 whitespace-nowrap">Start Date</th>
                      <th className="py-4 px-4 w-32 sm:w-36 whitespace-nowrap">End Date</th>
                      <th className="py-4 px-4 sm:px-6">Details</th>
                      <th className="py-4 px-4 sm:px-6 w-32 text-center whitespace-nowrap">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {paginatedJobs.length > 0 ? (
                      paginatedJobs.map((job, idx) => (
                        <tr 
                          key={job.id || idx} 
                          className="hover:bg-amber-50/20 transition-colors duration-150"
                        >
                          <td className="py-4 px-4 sm:px-6 text-center font-bold text-slate-500 whitespace-nowrap">
                            {job.slNo || (jobPage - 1) * pageSize + idx + 1}
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs">
                              <Calendar size={12} className="text-amber-500 shrink-0" />
                              <span>{job.startDate}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs border border-amber-200/60">
                              <Calendar size={12} className="text-amber-600 shrink-0" />
                              <span>{job.endDate}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 font-semibold text-slate-800 leading-relaxed">
                            {job.details}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                            {job.link ? (
                              <a
                                href={job.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-extrabold text-[11px] px-3.5 py-2 min-h-[36px] rounded-lg shadow-xs transition-all border border-amber-400/30"
                              >
                                <span>Open Link</span>
                                <ExternalLink size={12} className="text-amber-400" />
                              </a>
                            ) : (
                              <span className="text-slate-400 font-semibold">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                          No job updates matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Job Table Pagination */}
              {totalJobPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                  <span>Showing Page {jobPage} of {totalJobPages}</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={jobPage === 1}
                      onClick={() => setJobPage(p => p - 1)}
                      className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer flex items-center justify-center"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      disabled={jobPage === totalJobPages}
                      onClick={() => setJobPage(p => p + 1)}
                      className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer flex items-center justify-center"
                      aria-label="Next Page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="announcements-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
            >
              {/* Header & Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-[#1E3A8A] rounded-2xl border border-blue-100 shrink-0">
                    <Megaphone size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1E3A8A] font-display">College Announcements & Circulars</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Academic Schedules, Examination Circulars & Campus Notices</p>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={annSearch}
                    onChange={(e) => { setAnnSearch(e.target.value); setAnnPage(1); }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A] placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Mobile Responsive Cards View (< md) */}
              <div className="block md:hidden space-y-4">
                {paginatedAnnouncements.length > 0 ? (
                  paginatedAnnouncements.map((ann, idx) => (
                    <div
                      key={ann.id || idx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                    >
                      {/* Top Header Row: Sl No & Date */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <span className="bg-blue-50 text-[#1E3A8A] font-extrabold text-xs px-2.5 py-1 rounded-lg border border-blue-100">
                          #{ann.slNo || (annPage - 1) * pageSize + idx + 1}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <Calendar size={12} className="text-amber-500 shrink-0" />
                          <span>{ann.date}</span>
                        </span>
                      </div>

                      {/* Announcement Details Text */}
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {ann.details}
                      </p>

                      {/* Action Button */}
                      {ann.link && (
                        <div className="pt-2 border-t border-slate-50">
                          <a
                            href={ann.link}
                            target={ann.link.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-[#1E3A8A] hover:text-amber-600 border border-amber-300 hover:border-amber-400 font-bold text-xs py-2.5 min-h-[44px] rounded-xl shadow-xs transition-all text-center"
                          >
                            <span>View Announcement Link</span>
                            <ExternalLink size={14} className="text-amber-500" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-8 text-center text-slate-400 text-xs rounded-2xl border border-slate-200">
                    No announcements matching your search criteria.
                  </div>
                )}
              </div>

              {/* Desktop / Tablet Structured Table View (>= md) */}
              <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm text-slate-600">
                  <thead className="bg-[#1E3A8A] text-amber-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-4 sm:px-6 w-16 text-center whitespace-nowrap">Sl. No.</th>
                      <th className="py-4 px-4 w-32 sm:w-40 whitespace-nowrap">Date</th>
                      <th className="py-4 px-4 sm:px-6">Details</th>
                      <th className="py-4 px-4 sm:px-6 w-32 text-center whitespace-nowrap">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {paginatedAnnouncements.length > 0 ? (
                      paginatedAnnouncements.map((ann, idx) => (
                        <tr 
                          key={ann.id || idx} 
                          className="hover:bg-amber-50/20 transition-colors duration-150"
                        >
                          <td className="py-4 px-4 sm:px-6 text-center font-bold text-slate-500 whitespace-nowrap">
                            {ann.slNo || (annPage - 1) * pageSize + idx + 1}
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs">
                              <Calendar size={12} className="text-amber-500 shrink-0" />
                              <span>{ann.date}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 font-semibold text-slate-800 leading-relaxed">
                            {ann.details}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                            {ann.link ? (
                              <a
                                href={ann.link}
                                target={ann.link.startsWith("http") ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-white text-[#1E3A8A] hover:text-amber-600 border border-amber-300 hover:border-amber-400 font-bold text-[11px] px-3.5 py-2 min-h-[36px] rounded-lg shadow-xs transition-all"
                              >
                                <span>View Link</span>
                                <ExternalLink size={12} className="text-amber-500" />
                              </a>
                            ) : (
                              <span className="text-slate-400 font-semibold">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                          No announcements matching your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Announcements Table Pagination */}
              {totalAnnPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                  <span>Showing Page {annPage} of {totalAnnPages}</span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={annPage === 1}
                      onClick={() => setAnnPage(p => p - 1)}
                      className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer flex items-center justify-center"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      disabled={annPage === totalAnnPages}
                      onClick={() => setAnnPage(p => p + 1)}
                      className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-100 cursor-pointer flex items-center justify-center"
                      aria-label="Next Page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
