import React, { useState } from "react";
import { X, Save, RefreshCw, Settings, Sparkles, AlertCircle, Edit, Server, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function AdminPanel({ cmsData, setCmsData, resetToDefault, isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState("branding");

  const categories = [
    { id: "branding", label: "Branding & Contacts" },
    { id: "hero", label: "Hero Banners" },
    { id: "principal", label: "Principal's Message" },
    { id: "courses", label: "Featured Courses" },
    { id: "departments", label: "Departments" },
    { id: "news", label: "News & Events" }
  ];

  // Helper to handle nested branding changes
  const handleBrandingChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value
      }
    }));
  };

  // Helper to handle Principal's Message edits
  const handlePrincipalChange = (field, value) => {
    setCmsData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        principal: {
          ...prev.about.principal,
          [field]: value
        }
      }
    }));
  };

  // Helper to edit individual banner slide
  const handleBannerChange = (index, field, value) => {
    setCmsData(prev => {
      const updatedBanners = [...prev.hero.banners];
      updatedBanners[index] = {
        ...updatedBanners[index],
        [field]: value
      };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          banners: updatedBanners
        }
      };
    });
  };

  // Helper to edit individual course
  const handleCourseChange = (index, field, value) => {
    setCmsData(prev => {
      const updatedCourses = [...prev.courses];
      updatedCourses[index] = {
        ...updatedCourses[index],
        [field]: value
      };
      return {
        ...prev,
        courses: updatedCourses
      };
    });
  };

  // Helper to edit individual department
  const handleDeptChange = (index, field, value) => {
    setCmsData(prev => {
      const updatedDepts = [...prev.departments];
      updatedDepts[index] = {
        ...updatedDepts[index],
        [field]: value
      };
      return {
        ...prev,
        departments: updatedDepts
      };
    });
  };

  // Helper to edit News, Announcements, and Events
  const handleNewsAndNotices = (subCategory, index, field, value) => {
    setCmsData(prev => {
      const updatedList = [...prev.newsAndAnnouncements[subCategory]];
      updatedList[index] = {
        ...updatedList[index],
        [field]: value
      };
      return {
        ...prev,
        newsAndAnnouncements: {
          ...prev.newsAndAnnouncements,
          [subCategory]: updatedList
        }
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={onClose} />

      {/* Slide-out Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-lg bg-[#0f172a] text-slate-100 shadow-2xl flex flex-col h-full border-l border-slate-800 z-10"
      >
        
        {/* Panel Header */}
        <div className="p-6 bg-[#090d16] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-[#090d16] flex items-center justify-center font-bold">
              <Settings size={18} className="animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display leading-tight flex items-center gap-1.5">
                <span>Interactive CMS Editor</span>
                <span className="bg-amber-400/20 text-amber-400 text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded">
                  Live Preview
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Edit content dynamically in the frontend</p>
            </div>
          </div>
          <button
            id="admin-close-btn"
            onClick={onClose}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sync Indicator */}
        <div className="px-6 py-2.5 bg-emerald-950/50 border-b border-emerald-900/30 text-[10px] font-mono text-emerald-400 flex justify-between items-center shrink-0 select-none">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            <span>STATUS: DATABASE CMS ONLINE (MEM_STORE)</span>
          </span>
          <button
            id="admin-reset-btn"
            onClick={resetToDefault}
            className="flex items-center gap-1 hover:text-white hover:underline uppercase font-bold text-[9px] cursor-pointer"
          >
            <RefreshCw size={10} />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Content Navigation Columns (Double Columns inside panel) */}
        <div className="flex flex-col sm:flex-row flex-grow overflow-hidden">
          
          {/* Side Tabs Column (Left Column inside Panel) */}
          <div className="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-800/80 bg-[#0c1222] shrink-0 overflow-x-auto sm:overflow-x-visible overflow-y-hidden sm:overflow-y-auto flex sm:flex-col scrollbar-none">
            {categories.map((cat) => (
              <button
                id={`cms-tab-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-auto sm:w-full text-center sm:text-left p-3.5 sm:p-4 text-[10px] sm:text-xs font-bold transition-all border-b-2 sm:border-b-0 sm:border-l-2 focus:outline-none cursor-pointer flex flex-col gap-0.5 whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-[#0f172a] text-amber-400 border-amber-500 font-extrabold"
                    : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50"
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Form Scroll Area (Right Column inside Panel) */}
          <div className="w-full sm:w-2/3 p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow">
            
            {/* 1. BRANDING & CONTACT CATEGORY */}
            {activeCategory === "branding" && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-1.5">
                  <Server size={14} className="text-amber-500" />
                  <span>Branding Info</span>
                </h4>
                
                {/* College Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">College Name</label>
                  <input
                    id="edit-collegeName"
                    type="text"
                    value={cmsData.branding.collegeName}
                    onChange={(e) => handleBrandingChange("collegeName", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Tagline */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Tagline</label>
                  <input
                    id="edit-tagline"
                    type="text"
                    value={cmsData.branding.tagline}
                    onChange={(e) => handleBrandingChange("tagline", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Quick Info Intro */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Short Intro (Footer)</label>
                  <textarea
                    id="edit-shortIntro"
                    value={cmsData.branding.shortIntro}
                    onChange={(e) => handleBrandingChange("shortIntro", e.target.value)}
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 pt-4">Contact Details</h4>

                {/* Telephone */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telephone</label>
                  <input
                    id="edit-phone"
                    type="text"
                    value={cmsData.branding.phone}
                    onChange={(e) => handleBrandingChange("phone", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    id="edit-email"
                    type="email"
                    value={cmsData.branding.email}
                    onChange={(e) => handleBrandingChange("email", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Campus Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Physical Address</label>
                  <input
                    id="edit-address"
                    type="text"
                    value={cmsData.branding.address}
                    onChange={(e) => handleBrandingChange("address", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

              </div>
            )}

            {/* 2. HERO BANNERS */}
            {activeCategory === "hero" && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Hero Carousel Banners</h4>

                {cmsData.hero.banners.map((banner, index) => (
                  <div key={banner.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-[10px] font-extrabold text-amber-500 uppercase">Slide Banner #{index + 1}</p>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Banner Main Title</label>
                      <input
                        id={`edit-banner-title-${index}`}
                        type="text"
                        value={banner.title}
                        onChange={(e) => handleBannerChange(index, "title", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Banner Subtitle text</label>
                      <input
                        id={`edit-banner-subtitle-${index}`}
                        type="text"
                        value={banner.subtitle}
                        onChange={(e) => handleBannerChange(index, "subtitle", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Image Source (Unsplash/Picsum CDN URL)</label>
                      <input
                        id={`edit-banner-image-${index}`}
                        type="text"
                        value={banner.image}
                        onChange={(e) => handleBannerChange(index, "image", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-[10px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. PRINCIPAL MESSAGE */}
            {activeCategory === "principal" && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Vice-Chancellor's Address</h4>

                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Principal's Name</label>
                  <input
                    id="edit-principal-name"
                    type="text"
                    value={cmsData.about.principal.name}
                    onChange={(e) => handlePrincipalChange("name", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Principal Designation</label>
                  <input
                    id="edit-principal-designation"
                    type="text"
                    value={cmsData.about.principal.designation}
                    onChange={(e) => handlePrincipalChange("designation", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Message address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Welcome Address message</label>
                  <textarea
                    id="edit-principal-message"
                    value={cmsData.about.principal.message}
                    onChange={(e) => handlePrincipalChange("message", e.target.value)}
                    rows={6}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Principal Photo */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Photo URL</label>
                  <input
                    id="edit-principal-photo"
                    type="text"
                    value={cmsData.about.principal.photo}
                    onChange={(e) => handlePrincipalChange("photo", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-[10px]"
                  />
                </div>
              </div>
            )}

            {/* 4. FEATURED COURSES */}
            {activeCategory === "courses" && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Academic Programs List</h4>

                {cmsData.courses.map((course, index) => (
                  <div key={course.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-[10px] font-extrabold text-amber-500 uppercase">{course.category} - Course #{index + 1}</p>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Course Name</label>
                      <input
                        id={`edit-course-name-${index}`}
                        type="text"
                        value={course.name}
                        onChange={(e) => handleCourseChange(index, "name", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Duration</label>
                      <input
                        id={`edit-course-duration-${index}`}
                        type="text"
                        value={course.duration}
                        onChange={(e) => handleCourseChange(index, "duration", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Eligibility Criteria</label>
                      <input
                        id={`edit-course-eligibility-${index}`}
                        type="text"
                        value={course.eligibility}
                        onChange={(e) => handleCourseChange(index, "eligibility", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Short Description</label>
                      <textarea
                        id={`edit-course-description-${index}`}
                        value={course.description}
                        onChange={(e) => handleCourseChange(index, "description", e.target.value)}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. DEPARTMENTS */}
            {activeCategory === "departments" && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">Academic Departments</h4>

                {cmsData.departments.map((dept, index) => (
                  <div key={dept.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-[10px] font-extrabold text-amber-500 uppercase">Department #{index + 1}</p>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Department Name</label>
                      <input
                        id={`edit-dept-name-${index}`}
                        type="text"
                        value={dept.name}
                        onChange={(e) => handleDeptChange(index, "name", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">HOD / Chair Name</label>
                      <input
                        id={`edit-dept-hod-${index}`}
                        type="text"
                        value={dept.hod}
                        onChange={(e) => handleDeptChange(index, "hod", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-400">Description</label>
                      <textarea
                        id={`edit-dept-description-${index}`}
                        value={dept.description}
                        onChange={(e) => handleDeptChange(index, "description", e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. NEWS AND EVENTS */}
            {activeCategory === "news" && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">News Broadcast and notice board</h4>

                {/* News Press edit */}
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold text-blue-400 uppercase">Press Articles</p>
                  {cmsData.newsAndAnnouncements.news.map((item, index) => (
                    <div key={item.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                      <input
                        id={`edit-news-title-${index}`}
                        type="text"
                        value={item.title}
                        onChange={(e) => handleNewsAndNotices("news", index, "title", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="News Title"
                      />
                      <input
                        id={`edit-news-desc-${index}`}
                        type="text"
                        value={item.desc}
                        onChange={(e) => handleNewsAndNotices("news", index, "desc", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                        placeholder="News Brief"
                      />
                    </div>
                  ))}
                </div>

                {/* Notices announcements edit */}
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold text-blue-400 uppercase">Notices & Announcements</p>
                  {cmsData.newsAndAnnouncements.announcements.map((ann, index) => (
                    <div key={ann.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                      <input
                        id={`edit-ann-title-${index}`}
                        type="text"
                        value={ann.title}
                        onChange={(e) => handleNewsAndNotices("announcements", index, "title", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="Announcement text"
                      />
                    </div>
                  ))}
                </div>

                {/* Notices events edit */}
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold text-blue-400 uppercase">Upcoming Calendar Events</p>
                  {cmsData.newsAndAnnouncements.events.map((evt, index) => (
                    <div key={evt.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                      <input
                        id={`edit-event-title-${index}`}
                        type="text"
                        value={evt.title}
                        onChange={(e) => handleNewsAndNotices("events", index, "title", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none"
                        placeholder="Event Title"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          id={`edit-event-date-${index}`}
                          type="text"
                          value={evt.date}
                          onChange={(e) => handleNewsAndNotices("events", index, "date", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] text-slate-300 focus:outline-none"
                          placeholder="Date"
                        />
                        <input
                          id={`edit-event-venue-${index}`}
                          type="text"
                          value={evt.venue}
                          onChange={(e) => handleNewsAndNotices("events", index, "venue", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] text-slate-300 focus:outline-none"
                          placeholder="Venue"
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Panel Footer Action Area */}
        <div className="p-6 bg-[#090d16] border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Prototype Sandbox Secure</span>
          </div>
          <button
            id="admin-apply-changes-btn"
            onClick={onClose}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-[#090d16] font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-md shadow-amber-500/10"
          >
            <span>Close & Apply</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
