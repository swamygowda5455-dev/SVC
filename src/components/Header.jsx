import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Header({ branding }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Departments", path: "/departments" },
    { label: "Why Us", path: "/why-us" },
    { label: "News & Events", path: "/news-events" },
    { label: "Gallery", path: "/gallery" },
    { label: "Admissions", path: "/admissions" },
    { label: "Contact", path: "/contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md" 
        : "bg-white border-b border-slate-100"
    }`}>
      
      {/* Top Utility Bar - Deep Royal Navy */}
      <div className="bg-[#1E3A8A] text-slate-200 text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center">
          
          {/* Quick Contact Info with Royal Gold Icons */}
          <div className="flex items-center gap-4">
            <a href={`tel:${branding.phone}`} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Phone size={12} className="text-amber-400" />
              <span>{branding.phone}</span>
            </a>
            <a href={`mailto:${branding.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Mail size={12} className="text-amber-400" />
              <span>{branding.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px]">
              NAAC A++ Accredited
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "h-16" : "h-20"
      }`}>
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3.5 cursor-pointer">
          <img
            src={logo}
            alt="Sri Vidya Chetana Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl bg-white p-0.5 border border-amber-400/40 shrink-0 shadow-sm transition-transform hover:scale-105 duration-300"
          />
          <div>
            <h1 className="text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#1E3A8A] leading-tight font-display">
              {branding.collegeName.toUpperCase()}
            </h1>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-amber-600 font-extrabold">
              {branding.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                key={item.label}
                to={item.path}
                className={`relative py-1 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-[#1E3A8A] font-extrabold" : "text-slate-600 hover:text-[#1E3A8A]"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            id="apply-now-header-btn"
            to="/admissions"
            className="bg-[#1E3A8A] hover:bg-blue-900 text-amber-300 font-bold px-6 py-2.5 rounded-full shadow-md shadow-blue-900/10 border border-amber-400/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            <span>Apply Now</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            id="apply-now-header-mobile"
            to="/admissions"
            className="bg-[#1E3A8A] text-amber-400 font-extrabold text-xs px-3 py-2 rounded-lg shadow-sm cursor-pointer border border-amber-400/30"
          >
            Apply
          </Link>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#1E3A8A] hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-50 border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    key={item.label}
                    to={item.path}
                    className={`block w-full text-left font-semibold text-sm py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive ? "bg-amber-50 text-[#1E3A8A] font-bold border-l-4 border-amber-400" : "text-slate-700 hover:bg-slate-100 hover:text-[#1E3A8A]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


