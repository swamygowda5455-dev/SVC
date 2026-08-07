import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Info, 
  BookOpen, 
  Target, 
  GraduationCap, 
  Megaphone, 
  Briefcase, 
  Download, 
  Image, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Header({ branding }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", shortLabel: "Home", icon: Home, path: "/" },
    { label: "About Us", shortLabel: "About", icon: Info, path: "/about" },
    { 
      label: "Courses", 
      shortLabel: "Courses",
      icon: BookOpen, 
      path: "/courses",
      dropdown: [
        { label: "All Programs Overview", path: "/courses" },
        { label: "Bachelor of Arts (B.A.)", path: "/courses/ba" },
        { label: "Bachelor of Commerce (B.Com.)", path: "/courses/bcom" },
        { label: "Bachelor of Science (B.Sc.)", path: "/courses/bsc" },
        { label: "Bachelor of Business Admin (BBA)", path: "/courses/bba" },
        { label: "Bachelor of Computer App (BCA)", path: "/courses/bca" },
        { label: "Abyasa NCERT Batch (1-Year)", path: "/courses/abyasa-ncert" },
        { label: "Gurukul Sankalpa (3-Year)", path: "/courses/gurukul-sankalpa" }
      ]
    },
    { 
      label: "Competitive Exams", 
      shortLabel: "Exams",
      icon: Target, 
      path: "/competitive-exams",
      dropdown: [
        { label: "All Coaching Streams", path: "/competitive-exams" },
        { label: "UPSC & KPSC Civil Services", path: "/competitive-exams" },
        { label: "Banking & SSC Recruitment", path: "/competitive-exams" },
        { label: "Railway Recruitment Board", path: "/competitive-exams" },
        { label: "Chartered Accountancy (CA)", path: "/competitive-exams" },
        { label: "Abyasa 1-Yr NCERT Batch", path: "/courses/abyasa-ncert" },
        { label: "Gurukul Sankalpa 3-Yr Batch", path: "/courses/gurukul-sankalpa" }
      ]
    },
    { label: "Admission Open – Apply Now", shortLabel: "Apply", icon: GraduationCap, path: "/admissions", isCTA: true },
    { 
      label: "Recent News", 
      shortLabel: "News",
      icon: Megaphone, 
      path: "/recent-news" 
    },
    { 
      label: "Job Updates", 
      shortLabel: "Jobs",
      icon: Briefcase, 
      path: "/job-updates" 
    },
    { label: "Downloads", shortLabel: "Downloads", icon: Download, path: "/downloads" },
    { label: "Gallery", shortLabel: "Gallery", icon: Image, path: "/gallery" },
    { label: "Contact Us", shortLabel: "Contact", icon: PhoneCall, path: "/contact" }
  ];

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSubmenu(null);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  // Track scroll position for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isNavActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    if (item.path === "/courses") return location.pathname.startsWith("/courses");
    return location.pathname === item.path;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ========================================================================= */}
      {/* 1. MAIN BRAND HEADER BAR                                                  */}
      {/* ========================================================================= */}
      <div className="bg-[#1E3A8A] text-white border-b border-amber-400/20 py-3 sm:py-3.5 px-3 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo & College Title + Affiliation Info */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <img
              src={logo}
              alt={branding?.collegeName || "Sri Vidya Chetana Degree College"}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-xl bg-white p-0.5 sm:p-1 border-2 border-amber-400/40 shadow-lg transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <div>
              <h1 className="text-xs sm:text-base md:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight font-display uppercase group-hover:text-amber-300 transition-colors">
                {branding?.collegeName || "Sri Vidya Chetana Degree College"}
              </h1>
            </div>
          </Link>

          {/* Right Header Controls: Vertical Contact Info, Register/Login Buttons & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Desktop Quick Contact Links (Stacked Vertically) */}
            <div className="hidden lg:flex flex-col justify-center gap-0.5 text-[11px] font-semibold pr-3 border-r border-white/20">
              <a 
                href={`mailto:${branding?.email || "admissions@srividyachetana.edu.in"}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Mail size={12} className="text-amber-400 shrink-0" />
                <span className="max-w-[210px] truncate">{branding?.email || "admissions@srividyachetana.edu.in"}</span>
              </a>
              <a 
                href={`tel:${branding?.phone || "+919448123456"}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              >
                <Phone size={12} className="text-amber-400 shrink-0" />
                <span>{branding?.phone || "+91 94481 23456"}</span>
              </a>
            </div>

            {/* Register & Login Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/admissions"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-lg shadow-sm transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Register
              </Link>
              <Link
                to="/admissions"
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-3.5 py-1.5 rounded-lg border border-white/30 transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Login
              </Link>
            </div>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-3 py-2 text-slate-950 font-extrabold rounded-xl bg-amber-400 hover:bg-amber-300 border border-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              <span className="text-xs uppercase font-extrabold tracking-wider">
                {mobileMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. STICKY DESKTOP NAVIGATION MENU BAR                                     */}
      {/* ========================================================================= */}
      <nav 
        className={`hidden lg:block w-full bg-[#0B192C] text-white border-b border-amber-400/20 sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "shadow-2xl bg-[#0B192C]/95 backdrop-blur-md py-1.5" : "shadow-lg py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Main Horizontal Navigation Links */}
          <div className="flex items-center justify-between w-full space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const hasDropdown = Boolean(item.dropdown);
              const isOpen = activeDropdown === item.label;

              if (item.isCTA) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs xl:text-sm font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-md shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 border border-amber-300"
                  >
                    <GraduationCap size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-extrabold"
                        : "text-slate-100 hover:bg-white/10 hover:text-amber-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-400" : "opacity-70"}`}
                      />
                    )}
                  </Link>

                  {/* Floating Desktop Submenu Dropdown */}
                  {hasDropdown && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-1 w-64 bg-[#070F1B] border border-amber-400/30 rounded-2xl shadow-2xl py-2.5 z-50 backdrop-blur-xl"
                        >
                          <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                            <p className="text-[10px] uppercase font-extrabold tracking-wider text-amber-400">
                              {item.label} Options
                            </p>
                          </div>
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-amber-300 hover:bg-white/10 rounded-xl mx-1 transition-colors"
                            >
                              <span>{sub.label}</span>
                              <ArrowRight size={12} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-amber-400" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. RESPONSIVE MOBILE / TABLET MENU DRAWER (< lg)                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs lg:hidden z-40"
            />

            {/* Slide-Down Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 max-h-[90vh] bg-[#0B192C] text-white shadow-2xl border-b border-amber-400/30 z-50 overflow-y-auto lg:hidden flex flex-col"
            >
              {/* Drawer Top Bar */}
              <div className="p-4 border-b border-amber-400/20 flex items-center justify-between sticky top-0 bg-[#0B192C] z-10">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl bg-white p-1 border border-amber-400/40" />
                  <div>
                    <h2 className="text-xs font-extrabold uppercase text-white leading-tight">
                      {branding?.collegeName || "Sri Vidya Chetana"}
                    </h2>
                    <p className="text-[9px] text-amber-300 font-extrabold uppercase tracking-widest">
                      Degree College
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5"
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-4 space-y-2 flex-1">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const active = isNavActive(item);
                  const hasDropdown = Boolean(item.dropdown);
                  const isSubOpen = expandedSubmenu === item.label;

                  if (item.isCTA) {
                    return (
                      <div key={item.label} className="rounded-xl overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
                        <Link
                          to={item.path}
                          className="flex items-center gap-2.5 p-3 text-xs font-extrabold text-slate-950 uppercase tracking-wide"
                        >
                          <IconComp size={18} className="text-slate-950" />
                          <span>{item.label}</span>
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div key={item.label} className="rounded-xl overflow-hidden bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 flex-1 p-3 text-xs font-bold transition-all ${
                            active
                              ? "bg-amber-400 text-slate-950 font-extrabold"
                              : "text-slate-200 hover:bg-white/10"
                          }`}
                        >
                          <IconComp size={18} className={active ? "text-slate-950" : "text-amber-400"} />
                          <span>{item.label}</span>
                        </Link>

                        {hasDropdown && (
                          <button
                            onClick={() => setExpandedSubmenu(isSubOpen ? null : item.label)}
                            className="p-3 text-slate-300 hover:text-amber-300"
                            aria-label={`Toggle ${item.label} Submenu`}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${isSubOpen ? "rotate-180 text-amber-400" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Accordion Submenu Links */}
                      {hasDropdown && isSubOpen && (
                        <div className="pl-9 pr-3 py-2 space-y-1 bg-black/20 border-t border-white/5">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              className="block py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Bottom Quick Action & Info */}
              <div className="p-4 border-t border-amber-400/20 bg-[#070F1B] space-y-3">
                <Link
                  to="/admissions"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold p-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg"
                >
                  <GraduationCap size={18} />
                  <span>Apply for Admissions</span>
                </Link>

                <div className="flex items-center justify-around pt-2 text-[11px] text-slate-400">
                  <a href={`tel:${branding?.phone || "+919448123456"}`} className="flex items-center gap-1.5 hover:text-amber-300">
                    <Phone size={13} className="text-amber-400" />
                    <span>Call Us</span>
                  </a>
                  <span className="text-slate-600">|</span>
                  <a href={`mailto:${branding?.email || "admissions@srividyachetana.edu.in"}`} className="flex items-center gap-1.5 hover:text-amber-300">
                    <Mail size={13} className="text-amber-400" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

