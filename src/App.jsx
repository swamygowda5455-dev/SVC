import React, { useState } from "react";
import { INITIAL_CMS_DATA } from "./data.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Courses from "./components/Courses.jsx";
import Departments from "./components/Departments.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import NewsEvents from "./components/NewsEvents.jsx";
import Gallery from "./components/Gallery.jsx";
import Admissions from "./components/Admissions.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { Sparkles, Edit, Layers, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Main reactive CMS state of the app
  const [cmsData, setCmsData] = useState(INITIAL_CMS_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Reverts edits to original pristine academic mock seed data
  const handleResetToDefault = () => {
    setCmsData(INITIAL_CMS_DATA);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-blue-600 selection:text-white">

      {/* Floating Widget to alert users about CMS capabilities */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3 }}
          className="bg-blue-900 text-white p-4 rounded-2xl shadow-xl border border-blue-800 flex items-center gap-3.5 max-w-sm backdrop-blur-md bg-opacity-95"
        >
          {/* <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-[#0f172a] font-extrabold shrink-0 shadow-lg">
            <Edit size={18} />
          </div> */}
          {/* <div>
            <h4 className="text-xs font-extrabold font-display text-white">Interactive CMS Mode</h4>
            <p className="text-[10px] text-slate-300 mt-1 leading-snug">
              Click the <strong className="text-amber-400">"Live CMS Panel"</strong> button in the header top bar to customize banners, courses, and dates instantly.
            </p>
          </div> */}
        </motion.div>
      </div>

      {/* Real-time Toast confirmation on database reset */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5"
          >
            <CheckCircle size={16} className="text-emerald-400" />
            <span className="text-xs font-mono text-slate-200">Database restored to pristine seed defaults successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Header */}
      <Header
        branding={cmsData.branding}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
      />

      {/* Main Website Sections */}
      <main className="flex-grow">

        {/* Hero Banner with Auto-sliding & Quick CTAs */}
        <Hero
          hero={cmsData.hero}
          branding={cmsData.branding}
        />

        {/* About College, Vision, Mission & VC Address */}
        <About
          about={cmsData.about}
          branding={cmsData.branding}
        />

        {/* Featured Programs Navigator with Interactive Modals */}
        <Courses
          courses={cmsData.courses}
        />

        {/* Department Directory Panel */}
        <Departments
          departments={cmsData.departments}
        />

        {/* Why Choose Our College Features Grid */}
        <WhyChoose
          whyChoose={cmsData.whyChoose}
        />

        {/* Notifications and Press Hub */}
        <NewsEvents
          newsAndAnnouncements={cmsData.newsAndAnnouncements}
        />

        {/* Campus Gallery with Lightbox Previews */}
        <Gallery
          gallery={cmsData.gallery}
        />

        {/* Admission section with mock Application wizard */}
        <Admissions
          admissions={cmsData.admissions}
          branding={cmsData.branding}
          courses={cmsData.courses}
        />

        {/* Testimonials Swiper Carousel */}
        <Testimonials
          testimonials={cmsData.testimonials}
        />

        {/* Contact details, google maps, and email forms */}
        <Contact
          branding={cmsData.branding}
        />

      </main>

      {/* Footer Sitemap */}
      <Footer
        branding={cmsData.branding}
        courses={cmsData.courses}
        departments={cmsData.departments}
      />

      {/* Live CMS Drawer Panel */}
      <AdminPanel
        cmsData={cmsData}
        setCmsData={setCmsData}
        resetToDefault={handleResetToDefault}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
