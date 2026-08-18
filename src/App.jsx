import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { INITIAL_CMS_DATA } from "./data.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Courses from "./components/Courses.jsx";
import CompetitiveExams from "./components/CompetitiveExams.jsx";
import Departments from "./components/Departments.jsx";
import WhyChoose from "./components/WhyChoose.jsx";
import RecentNews from "./components/RecentNews.jsx";
import JobUpdates from "./components/JobUpdates.jsx";
import Downloads from "./components/Downloads.jsx";
import Gallery from "./components/Gallery.jsx";
import Admissions from "./components/Admissions.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";

// Lazy load CourseDetails for optimized routing performance
const CourseDetails = lazy(() => import("./components/CourseDetails.jsx"));

// ScrollToTop component to reset window scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// HomePage Component
function HomePage({ cmsData }) {
  return <Hero branding={cmsData.branding} whyChoose={cmsData.whyChoose} />;
}

export default function App() {
  // Main reactive CMS state of the app
  const [cmsData] = useState(INITIAL_CMS_DATA);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-blue-600 selection:text-white">

        {/* Website Header */}
        <Header branding={cmsData.branding} />

        {/* Main Website Sections via Router */}
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-amber-400 rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage cmsData={cmsData} />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses courses={cmsData.courses} />} />
              <Route path="/courses/:slug" element={<CourseDetails courses={cmsData.courses} branding={cmsData.branding} admissions={cmsData.admissions} />} />
              <Route path="/competitive-exams" element={<CompetitiveExams />} />
              <Route path="/departments" element={<Departments departments={cmsData.departments} />} />
              <Route path="/why-us" element={<WhyChoose whyChoose={cmsData.whyChoose} />} />
              <Route path="/recent-news" element={<RecentNews newsAndAnnouncements={cmsData.newsAndAnnouncements} />} />
              <Route path="/job-updates" element={<JobUpdates newsAndAnnouncements={cmsData.newsAndAnnouncements} />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/gallery" element={<Gallery gallery={cmsData.gallery} />} />
              <Route path="/admissions" element={<Admissions admissions={cmsData.admissions} branding={cmsData.branding} courses={cmsData.courses} />} />
              <Route path="/contact" element={<Contact branding={cmsData.branding} admissions={cmsData.admissions} courses={cmsData.courses} />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer Sitemap */}
        <Footer
          branding={cmsData.branding}
          courses={cmsData.courses}
          departments={cmsData.departments}
        />

        {/* Floating AI Help Assistant */}
        <Chatbot />

      </div>
    </BrowserRouter>
  );
}
