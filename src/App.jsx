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
import Chatbot from "./components/Chatbot.jsx";

export default function App() {
  // Main reactive CMS state of the app
  const [cmsData] = useState(INITIAL_CMS_DATA);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-blue-600 selection:text-white">

      {/* Website Header */}
      <Header
        branding={cmsData.branding}
      />

      {/* Main Website Sections */}
      <main className="flex-grow">

        {/* Hero Banner */}
        <Hero
          hero={cmsData.hero}
          branding={cmsData.branding}
        />

        {/* About College */}
        <About
          about={cmsData.about}
          branding={cmsData.branding}
        />

        {/* Featured Programs */}
        <Courses
          courses={cmsData.courses}
        />

        {/* Department Directory Panel */}
        <Departments
          departments={cmsData.departments}
        />

        {/* Why Choose Our College */}
        <WhyChoose
          whyChoose={cmsData.whyChoose}
        />

        {/* Notifications and Press Hub */}
        <NewsEvents
          newsAndAnnouncements={cmsData.newsAndAnnouncements}
        />

        {/* Campus Gallery */}
        <Gallery
          gallery={cmsData.gallery}
        />

        {/* Admissions */}
        <Admissions
          admissions={cmsData.admissions}
          branding={cmsData.branding}
          courses={cmsData.courses}
        />

        {/* Testimonials */}
        <Testimonials
          testimonials={cmsData.testimonials}
        />

        {/* Contact details */}
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

      {/* Floating AI Help Assistant */}
      <Chatbot />

    </div>
  );
}
