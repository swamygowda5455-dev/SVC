import React, { useState } from "react";
import { Newspaper, Bell, ArrowRight, Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsEvents({ newsAndAnnouncements }) {
  const [activeBoardTab, setActiveBoardTab] = useState("announcements"); // 'announcements', 'events', 'notices'

  return (
    <section id="news-events" className="py-12 sm:py-20 bg-white scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-50 border border-blue-100/60 px-4 py-1.5 rounded-full">
            UPDATES & HUB
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            NEWS & ANNOUNCEMENTS
          </h2>
          <div className="w-12 h-0.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column Left (7/12): Press and News Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="text-blue-600" size={18} />
              <h3 className="text-base font-bold text-slate-800 font-display uppercase tracking-wider">University Press & News</h3>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12
                  }
                }
              }}
              className="space-y-4"
            >
              {newsAndAnnouncements.news.map((item) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  id={`news-item-${item.id}`}
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 group"
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
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Column Right (5/12): Interactive Notice Board with Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[520px]"
          >
            {/* Notice Board Header & Category Tabs */}
            <div className="border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="text-blue-600" size={18} />
                <h3 className="text-base font-bold text-slate-800 font-display uppercase tracking-wider">Live Notice Board</h3>
              </div>

              {/* Board Menu Tab Controls */}
              <div className="flex gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200 relative">
                {[
                  { id: "announcements", label: "NOTICES" },
                  { id: "events", label: "EVENTS" },
                  { id: "notices", label: "CIRCULARS" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    id={`tab-notices-${tab.id}`}
                    onClick={() => setActiveBoardTab(tab.id)}
                    className={`relative flex-1 text-center py-2 text-[10px] min-[360px]:text-xs font-bold rounded-lg transition-colors cursor-pointer z-10 ${
                      activeBoardTab === tab.id ? "text-white" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {activeBoardTab === tab.id && (
                      <motion.span
                        layoutId="activeNoticeTab"
                        className="absolute inset-0 bg-blue-700 rounded-lg shadow-sm z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* List entries scroll container */}
            <div className="flex-grow overflow-y-auto py-3 space-y-4 scrollbar-thin">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBoardTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Announcements Notices List */}
                  {activeBoardTab === "announcements" && newsAndAnnouncements.announcements.map((ann) => (
                    <div key={ann.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 hover:bg-slate-100/60 transition-colors">
                      {ann.urgent ? (
                        <span className="shrink-0 p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                          <AlertTriangle size={15} />
                        </span>
                      ) : (
                        <span className="shrink-0 p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                          <Bell size={15} />
                        </span>
                      )}
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ann.date}</span>
                        <h4 className="text-xs font-semibold text-slate-700 leading-snug mt-1">{ann.title}</h4>
                        {ann.urgent && (
                          <span className="inline-block mt-1.5 bg-red-50 text-red-700 text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded border border-red-100">
                            Urgent Action
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Calendar Events List */}
                  {activeBoardTab === "events" && newsAndAnnouncements.events.map((evt) => (
                    <div key={evt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2 hover:bg-slate-100/60 transition-colors">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                        <span>{evt.date}</span>
                        <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100 font-mono">
                          <Clock size={10} />
                          {evt.time}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 font-display leading-snug">{evt.title}</h4>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin size={12} className="text-blue-600" />
                        <span>{evt.venue}</span>
                      </p>
                    </div>
                  ))}

                  {/* PDF Circular Notices List */}
                  {activeBoardTab === "notices" && newsAndAnnouncements.notices.map((not) => (
                    <div
                      key={not.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-start gap-1"
                    >
                      <span className="text-[9px] text-slate-400 font-bold block">{not.date}</span>
                      <h4 className="text-xs font-semibold text-slate-700 leading-snug mt-1">{not.title}</h4>
                      <button 
                        onClick={() => alert(`Prototype Document: Circular papers will download on the live CMS server.`)}
                        className="text-[10px] text-blue-600 hover:underline mt-2 font-bold cursor-pointer uppercase tracking-wider"
                      >
                        Download PDF Circular
                      </button>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
