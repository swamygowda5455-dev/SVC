import React from "react";
import { GraduationCap, ArrowUp, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer({ branding, courses, departments }) {

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-50 text-slate-500 text-xs border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">

          {/* Column 1 (4/12): Brand, Tagline, Socials */}
          <div className="sm:col-span-6 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-sm border border-blue-800">
                <GraduationCap size={22} />
              </div>
              <h4 className="text-slate-800 text-base font-extrabold tracking-tight">
                {branding.collegeName.toUpperCase()}
              </h4>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              {branding.shortIntro}
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-3">
              <a href={branding.socials.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                <Facebook size={16} />
              </a>
              <a href={branding.socials.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-400 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                <Twitter size={16} />
              </a>
              <a href={branding.socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-700 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                <Linkedin size={16} />
              </a>
              <a href={branding.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white hover:bg-pink-50 text-slate-500 hover:text-pink-600 border border-slate-200 flex items-center justify-center transition-colors shadow-sm">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 (2/12): Quick Links */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <h5 className="text-slate-800 text-[10px] font-bold uppercase tracking-[0.15em]">Quick Links</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleScrollTo("#home")} className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Home Portal</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("#about")} className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">About Legacy</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("#why-choose")} className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">The SVC Edge</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("#gallery")} className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Campus Gallery</button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("#admissions")} className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Enrollments</button>
              </li>
            </ul>
          </div>

          {/* Column 3 (3/12): Top Programs */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h5 className="text-slate-800 text-[10px] font-bold uppercase tracking-[0.15em]">Top Programs</h5>
            <ul className="space-y-2.5 text-xs">
              {courses.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <button onClick={() => handleScrollTo("#courses")} className="text-slate-500 hover:text-blue-600 cursor-pointer text-left transition-colors truncate max-w-[240px]">
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3/12): Departments */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h5 className="text-slate-800 text-[10px] font-bold uppercase tracking-[0.15em]">Our Contact Details</h5>
            <ul className="space-y-3.5 text-xs text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-blue-600 mt-0.5 shrink-0" />
                <span>{branding.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-blue-600 shrink-0" />
                <span>{branding.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-blue-600 shrink-0" />
                <a href={`mailto:${branding.email}`} className="hover:text-blue-600 transition-colors">{branding.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} {branding.collegeName} Prototype Portal. All Rights Reserved.</p>
            <p className="mt-1 text-[10px] text-slate-400">Built as a premium interactive UI/UX frontend demonstration template.</p>
          </div>

          {/* Scroll to Top */}
          <button
            id="footer-scroll-top-btn"
            onClick={handleScrollToTop}
            className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer transition-all duration-300 shadow-sm"
            aria-label="Scroll to top of the page"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
