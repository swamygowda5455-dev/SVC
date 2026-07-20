import React, { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, ShieldAlert, GraduationCap, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Header({ branding }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Departments", href: "#departments" },
    { label: "Why Us", href: "#why-choose" },
    { label: "News & Events", href: "#news-events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Admissions", href: "#admissions" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section
      const scrollPos = window.scrollY;
      let current = "home";

      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            current = item.href.slice(1);
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-md" 
        : "bg-white border-b border-slate-100"
    }`}>
      
      {/* Top Utility Bar */}
      <div className="bg-[#0f172a] text-slate-300 text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex justify-between items-center">
          
          {/* Quick Contact Info */}
          <div className="flex items-center gap-4">
            <a href={`tel:${branding.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} className="text-blue-500" />
              <span>{branding.phone}</span>
            </a>
            <a href={`mailto:${branding.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} className="text-blue-500" />
              <span>{branding.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "h-16" : "h-20"
      }`}>
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => handleNavClick("#home")}>
          <img
            src={logo}
            alt="Sri Vidya Chetana Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-xl bg-white p-0.5 border border-slate-200/60 shrink-0 shadow-sm transition-transform hover:scale-105 duration-300"
          />
          <div>
            <h1 className="text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#1E3A8A] leading-tight font-display">
              {branding.collegeName.toUpperCase()}
            </h1>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
              {branding.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navItems.map((item) => (
            <button
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`relative py-1 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                activeSection === item.href.slice(1) ? "text-blue-700 font-bold" : "text-slate-600 hover:text-blue-600"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.href.slice(1) && (
                <motion.span
                  layoutId="activeNavUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
          <button
            id="apply-now-header-btn"
            onClick={() => handleNavClick("#admissions")}
            className="bg-blue-700 text-white px-6 py-2.5 rounded-full hover:bg-blue-800 shadow-lg shadow-blue-100 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Apply Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="apply-now-header-mobile"
            onClick={() => handleNavClick("#admissions")}
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-3 py-2 rounded-lg shadow-sm cursor-pointer"
          >
            Apply
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-blue-900 hover:bg-slate-50 rounded-lg transition-colors"
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
              {navItems.map((item) => (
                <button
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left font-semibold text-sm py-2 px-3 rounded-lg transition-colors duration-200 ${
                    activeSection === item.href.slice(1) ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-slate-100 hover:text-blue-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
