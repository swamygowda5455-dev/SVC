import React, { useState } from "react";
import { Newspaper, Bell, Calendar, HelpCircle, ArrowRight, MapPin, Clock, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsEvents({ newsAndAnnouncements }) {
  const [activeBoardTab, setActiveBoardTab] = useState("announcements");

  return (
    <section id="news-events" className="py-12 sm:py-20 bg-slate-50 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            CAMPUS PULSE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            NEWS & NOTIFICATIONS
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            Stay updated with the latest academic publications, important circulars, and major events.
          </p>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column Left (7/12): Latest News (Press Cards) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="text-blue-600" size={18} />
              <h3 className="text-base font-bold text-slate-800 font-display uppercase tracking-wider">University Press & News</h3>
            </div>

            {newsAndAnnouncements.news.map((item) => (
              <div
                id={`news-item-${item.id}`}
                key={item.id}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5"
              >
                {/* News Icon/Date Accent Box */}
                <div className="w-full sm:w-32 shrink-0 bg-slate-50 text-slate-800 rounded-xl p-3 sm:p-4 flex flex-row sm:flex-col justify-between sm:justify-center items-center text-left sm:text-center border border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none">Published</span>
                  <span className="text-xs font-bold text-slate-700 sm:mt-2 leading-tight">
                    {item.date}
                  </span>
                </div>

                {/* News Details */}
                <div className="flex-grow">
                  <h4 className="text-base font-bold text-[#1E3A8A] font-display hover:text-blue-700 transition-colors duration-200 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <button 
                    onClick={() => alert(`Prototype Information: Full article for "${item.title}" will open on the live production CMS server.`)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer uppercase tracking-wider"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Column Right (5/12): Interactive Notice Board with Tabs */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[520px]">
            {/* Notice Board Header & Category Tabs */}
            <div className="border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="text-blue-600" size={18} />
                <h3 className="text-base font-bold text-slate-800 font-display uppercase tracking-wider">Live Notice Board</h3>
              </div>

              {/* Board Menu Tab Controls */}
              <div className="flex gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <button
                  id="tab-notices-announcements"
                  onClick={() => setActiveBoardTab("announcements")}
                  className={`flex-1 text-center py-2 text-[10px] min-[360px]:text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeBoardTab === "announcements" ? "bg-blue-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  NOTICES
                </button>
                <button
                  id="tab-notices-events"
                  onClick={() => setActiveBoardTab("events")}
                  className={`flex-1 text-center py-2 text-[10px] min-[360px]:text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeBoardTab === "events" ? "bg-blue-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  EVENTS
                </button>
                <button
                  id="tab-notices-notices"
                  onClick={() => setActiveBoardTab("notices")}
                  className={`flex-1 text-center py-2 text-[10px] min-[360px]:text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeBoardTab === "notices" ? "bg-blue-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  CIRCULARS
                </button>
              </div>
            </div>

            {/* Notifications Feed Viewport */}
            <div className="flex-grow overflow-y-auto mt-6 pr-2 space-y-4">
              <AnimatePresence mode="wait">
                {activeBoardTab === "announcements" && (
                  <motion.div
                    key="announcements"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {newsAndAnnouncements.announcements.map((ann) => (
                      <div id={`ann-card-${ann.id}`} key={ann.id} className="p-4 bg-slate-50/50 rounded-r-xl border border-slate-200 border-l-4 border-l-blue-600 flex items-start gap-3">
                        {ann.urgent ? (
                          <span className="shrink-0 p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                            <AlertTriangle size={13} />
                          </span>
                        ) : (
                          <span className="shrink-0 p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                            <Bell size={13} />
                          </span>
                        )}
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold">{ann.date}</p>
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-snug">{ann.title}</h4>
                          {ann.urgent && (
                            <span className="inline-block mt-1.5 bg-red-50 text-red-700 text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded border border-red-100">
                              Urgent Action
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeBoardTab === "events" && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {newsAndAnnouncements.events.map((evt) => (
                      <div id={`evt-card-${evt.id}`} key={evt.id} className="p-4 bg-slate-50/50 rounded-r-xl border border-slate-200 border-l-4 border-l-indigo-500 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                          <span>{evt.date}</span>
                          <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 font-mono">
                            <Clock size={10} />
                            {evt.time}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-display leading-snug">{evt.title}</h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin size={12} className="text-blue-600" />
                          <span>{evt.venue}</span>
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeBoardTab === "notices" && (
                  <motion.div
                    key="notices"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {newsAndAnnouncements.notices.map((not) => (
                      <div id={`not-card-${not.id}`} key={not.id} className="p-4 bg-slate-50/50 rounded-r-xl border border-slate-200 border-l-4 border-l-emerald-500">
                        <span className="text-[10px] text-slate-400 font-bold block">{not.date}</span>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 leading-snug">{not.title}</h4>
                        <button 
                          onClick={() => alert(`Prototype Document: Circular and exam desk papers will download on the live CMS server.`)}
                          className="text-[10px] text-blue-600 hover:underline mt-2 font-bold cursor-pointer uppercase tracking-wider"
                        >
                          Download PDF Circular
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
