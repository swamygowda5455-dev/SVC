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
    { label: "Admissions", shortLabel: "Admissions", icon: GraduationCap, path: "/admissions" },
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
      {/* 1. TOP UTILITY BAR (Contact & Announcements - Desktop/Tablet)             */}
      {/* ========================================================================= */}
      <div className="bg-[#0B192C] text-slate-300 border-b border-amber-500/20 text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Side: Direct Contact Details */}
          <div className="flex items-center gap-6 font-medium">
            <a 
              href={`tel:${branding?.phone || "+919448123456"}`}
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <Phone size={13} className="text-amber-400" />
              <span>{branding?.phone || "+91 94481 23456"}</span>
            </a>
            <a 
              href={`mailto:${branding?.email || "admissions@srividyachetana.edu.in"}`}
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <Mail size={13} className="text-amber-400" />
              <span className="truncate max-w-[220px]">{branding?.email || "admissions@srividyachetana.edu.in"}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400 hidden lg:flex">
              <MapPin size={13} className="text-amber-400" />
              <span>{branding?.address || "Chintamani, Chikkaballapura, KA"}</span>
            </div>
          </div>

          {/* Right Side: University Badge & Admissions Highlight */}
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
              <Sparkles size={12} className="animate-pulse text-amber-400" />
              Admissions Open 2026-27
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline-block">
              Affiliated to <strong className="text-slate-200">Bengaluru North University</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN TOP NAVIGATION NAVBAR                                              */}
      {/* ========================================================================= */}
      <nav 
        className={`w-full bg-[#1E3A8A] text-white border-b border-amber-400/20 transition-all duration-300 ${
          isScrolled ? "shadow-2xl bg-[#1E3A8A]/95 backdrop-blur-md py-2.5" : "shadow-lg py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & College Title */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src={logo}
              alt={branding?.collegeName || "Sri Vidya Chetana Degree College"}
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-xl bg-white p-1 border-2 border-amber-400/40 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div>
              <h1 className="text-sm sm:text-base lg:text-lg font-extrabold text-white tracking-tight leading-tight font-display uppercase group-hover:text-amber-300 transition-colors">
                {branding?.collegeName || "Sri Vidya Chetana"}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 font-extrabold">
                  Degree College
                </span>
                <span className="hidden sm:inline-block text-[10px] text-slate-300 font-medium border-l border-white/20 pl-2">
                  Integrated Competitive IAS / KAS / CA
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Top Menu Items */}
          <div className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const hasDropdown = Boolean(item.dropdown);
              const isOpen = activeDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-extrabold"
                        : "text-slate-100 hover:bg-white/10 hover:text-amber-300"
                    }`}
                  >
                    <span>{item.shortLabel || item.label}</span>
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
                          className="absolute top-full left-0 mt-1 w-64 bg-[#0B192C] border border-amber-400/30 rounded-2xl shadow-2xl py-2.5 z-50 backdrop-blur-xl"
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

          {/* Desktop CTA Apply Button & Mobile Drawer Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/admissions"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-lg hover:shadow-amber-400/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider shrink-0"
            >
              <GraduationCap size={18} className="shrink-0" />
              <span>Apply Now</span>
            </Link>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 text-slate-200 hover:text-amber-300 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. RESPONSIVE MOBILE / TABLET MENU DRAWER (< xl)                           */}
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
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs xl:hidden z-40"
            />

            {/* Top Slide-Down Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 max-h-[90vh] bg-[#0B192C] text-white shadow-2xl border-b border-amber-400/30 z-50 overflow-y-auto xl:hidden flex flex-col"
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

