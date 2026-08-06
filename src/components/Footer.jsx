import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Award, ArrowUp } from "lucide-react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Footer({ branding, courses }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B192C] text-slate-300 text-xs border-t border-amber-400/20 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Main Footer Sitemap Grid (Oxford 4-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">

          {/* Column 1 (4/12): Brand & Institutional Intro */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src={logo}
                alt="Sri Vidya Chetana Logo"
                className="w-14 h-14 object-contain rounded-2xl bg-white p-1 border border-amber-400/40 shadow-md shrink-0 transition-transform hover:scale-105 duration-300"
              />
              <div>
                <h4 className="text-white text-base sm:text-lg font-extrabold tracking-tight font-display uppercase">
                  {branding.collegeName}
                </h4>
                <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400 font-extrabold">
                  {branding.tagline}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {branding.shortIntro}
            </p>

            {/* Accreditation Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-amber-300 text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
              <Award size={14} className="text-amber-400 shrink-0" />
              <span>Affiliated to Bengaluru North University</span>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-3 pt-1">
              <a href={branding.socials.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all shadow-sm">
                <Facebook size={16} />
              </a>
              <a href={branding.socials.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all shadow-sm">
                <Twitter size={16} />
              </a>
              <a href={branding.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all shadow-sm">
                <Linkedin size={16} />
              </a>
              <a href={branding.socials.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 text-slate-300 hover:text-slate-950 border border-white/10 flex items-center justify-center transition-all shadow-sm">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 (2/12): Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-amber-400 text-xs font-extrabold uppercase tracking-[0.2em] font-display">Quick Links</h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-amber-300 transition-colors">Degree Courses</Link>
              </li>
              <li>
                <Link to="/competitive-exams" className="hover:text-amber-300 transition-colors">Competitive Exams</Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-amber-300 transition-colors">Admissions 2026-27</Link>
              </li>
              <li>
                <Link to="/recent-news" className="hover:text-amber-300 transition-colors">Recent News</Link>
              </li>
              <li>
                <Link to="/job-updates" className="hover:text-amber-300 transition-colors">Job Recruitment Alerts</Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-amber-300 transition-colors">Downloads</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors">Campus Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (3/12): Academic Programs */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-amber-400 text-xs font-extrabold uppercase tracking-[0.2em] font-display">Academic Offerings</h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              {courses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link to={`/courses/${c.slug || c.id}`} className="hover:text-amber-300 transition-colors truncate max-w-[240px] block">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3/12): Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-amber-400 text-xs font-extrabold uppercase tracking-[0.2em] font-display">Contact Us</h5>
            <ul className="space-y-3 text-xs text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{branding.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <a href={`tel:${branding.phone}`} className="hover:text-amber-300 transition-colors">{branding.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <a href={`mailto:${branding.email}`} className="hover:text-amber-300 transition-colors truncate">{branding.email}</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Copyright & Links */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] font-medium">
          <p>© {new Date().getFullYear()} {branding.collegeName}. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-amber-300 transition-colors">Rules & Regulations</Link>
            <Link to="/contact" className="hover:text-amber-300 transition-colors">Academic Help Desk</Link>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-white/10 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
