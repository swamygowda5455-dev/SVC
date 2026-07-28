import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Footer({ branding, courses, departments }) {

  return (
    <footer className="bg-slate-50 text-slate-500 text-xs border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-200">

          {/* Column 1 (4/12): Brand, Tagline, Socials */}
          <div className="sm:col-span-6 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Sri Vidya Chetana Logo"
                className="w-20 h-20 object-contain rounded-2xl bg-white p-1 border border-slate-200 shadow-md shrink-0 transition-transform hover:scale-105 duration-300"
              />
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
                <Link to="/" className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Home Portal</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">About Legacy</Link>
              </li>
              <li>
                <Link to="/why-us" className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">The SVC Edge</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Campus Gallery</Link>
              </li>
              <li>
                <Link to="/admissions" className="text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">Enrollments</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (3/12): Top Programs */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h5 className="text-slate-800 text-[10px] font-bold uppercase tracking-[0.15em]">Top Programs</h5>
            <ul className="space-y-2.5 text-xs">
              {courses.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link to="/courses" className="text-slate-500 hover:text-blue-600 cursor-pointer text-left transition-colors truncate max-w-[240px] block">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3/12): Our Contact Details */}
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

        {/* Footer Base Info (Copyright) */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium tracking-wide">
          <p>© {new Date().getFullYear()} {branding.collegeName}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline">Affiliation & Rules</Link>
            <Link to="/about" className="hover:underline">Privacy Policy</Link>
            <Link to="/contact" className="hover:underline">Academic Help desk</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

