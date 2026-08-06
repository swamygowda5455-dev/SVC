import React, { useState, useEffect } from "react";
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
  PanelLeftClose, 
  PanelLeftOpen, 
  Sparkles, 
  Phone, 
  Mail, 
  ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function Header({ branding }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "About Us", icon: Info, path: "/about" },
    { 
      label: "Courses", 
      icon: BookOpen, 
      path: "/courses",
      dropdown: [
        { label: "All Programs", path: "/courses" },
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
    { label: "Admission", icon: GraduationCap, path: "/admissions" },
    { 
      label: "Recent News (Announcements)", 
      shortLabel: "Recent News",
      icon: Megaphone, 
      path: "/recent-news" 
    },
    { 
      label: "Job Updates (Latest Jobs & Recruitment Notifications)", 
      shortLabel: "Job Updates",
      icon: Briefcase, 
      path: "/job-updates" 
    },
    { label: "Downloads", icon: Download, path: "/downloads" },
    { label: "Gallery", icon: Image, path: "/gallery" },
    { label: "Contact Us", icon: PhoneCall, path: "/contact" }
  ];

  // Close submenus and mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedSubmenu(null);
  }, [location.pathname]);

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

  // Adjust root layout padding on desktop based on sidebar collapsed state
  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (mainEl) {
      if (window.innerWidth >= 1024) {
        mainEl.style.transition = "padding-left 0.3s ease";
        mainEl.style.paddingLeft = isCollapsed ? "5rem" : "16rem";
      } else {
        mainEl.style.paddingLeft = "0px";
      }
    }
    const handleResize = () => {
      const el = document.querySelector("main");
      if (el) {
        if (window.innerWidth >= 1024) {
          el.style.paddingLeft = isCollapsed ? "5rem" : "16rem";
        } else {
          el.style.paddingLeft = "0px";
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  const isNavActive = (item) => {
    if (item.path === "/") return location.pathname === "/";
    if (item.path === "/courses") return location.pathname.startsWith("/courses");
    return location.pathname === item.path;
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP / TABLET COLLAPSIBLE SIDEBAR (lg:flex)                        */}
      {/* ========================================================================= */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen z-50 bg-[#1E3A8A] text-white border-r border-amber-400/20 shadow-2xl transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Header & Brand Logo */}
        <div className="p-4 border-b border-amber-400/20 flex items-center justify-between min-h-[72px]">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 border border-amber-400/40 shrink-0"
            />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-xs font-extrabold tracking-tight text-white leading-tight font-display uppercase truncate max-w-[150px]">
                  {branding.collegeName}
                </h1>
                <p className="text-[8px] uppercase tracking-widest text-amber-300 font-extrabold truncate">
                  Degree College
                </p>
              </motion.div>
            )}
          </Link>

          {/* Minimize / Expand Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl text-amber-300 hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const active = isNavActive(item);
            const hasDropdown = Boolean(item.dropdown);
            const isSubOpen = expandedSubmenu === item.label;

            return (
              <div key={item.label} className="relative group">
                <div className="flex items-center">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 w-full p-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-extrabold"
                        : "text-slate-200 hover:bg-white/10 hover:text-amber-300"
                    }`}
                  >
                    <IconComp size={20} className={active ? "text-slate-950" : "text-amber-400 shrink-0"} />

                    {!isCollapsed && (
                      <span className="truncate flex-1">
                        {item.shortLabel || item.label}
                      </span>
                    )}
                  </Link>

                  {/* Dropdown Chevron toggle in Sidebar */}
                  {hasDropdown && !isCollapsed && (
                    <button
                      onClick={() => setExpandedSubmenu(isSubOpen ? null : item.label)}
                      className="p-2 text-slate-300 hover:text-amber-300 cursor-pointer"
                    >
                      <ChevronDown size={16} className={`transition-transform ${isSubOpen ? "rotate-180 text-amber-400" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Collapsed Tooltip on Hover */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl z-50 border border-amber-400/30 pointer-events-none">
                    {item.label}
                  </div>
                )}

                {/* Submenu Accordion (when expanded) */}
                {hasDropdown && isSubOpen && !isCollapsed && (
                  <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-amber-400/30 ml-4 mt-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.path}
                        className="block py-2 px-2.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
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

        {/* Sidebar Footer / Apply CTA Button */}
        <div className="p-3 border-t border-amber-400/20 bg-blue-950/60">
          <Link
            to="/admissions"
            className={`w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold p-3 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs ${
              isCollapsed ? "px-2" : "px-4"
            }`}
          >
            <GraduationCap size={18} className="shrink-0" />
            {!isCollapsed && <span>Apply Now</span>}
          </Link>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE TOP NAVBAR (< lg)                                               */}
      {/* ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#1E3A8A] text-white border-b border-amber-400/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 border border-amber-400/40 shrink-0"
            />
            <div>
              <h1 className="text-xs font-bold text-white tracking-tight uppercase leading-tight font-display">
                {branding.collegeName}
              </h1>
              <p className="text-[8px] uppercase tracking-widest text-amber-300 font-extrabold">
                {branding.tagline}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/admissions"
              className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-2 rounded-xl shadow-sm"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-amber-300 rounded-xl"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs lg:hidden z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#1E3A8A] text-white shadow-2xl z-50 overflow-y-auto flex flex-col justify-between"
            >
              <div className="p-5 space-y-6">
                <div className="flex items-center justify-between border-b border-amber-400/20 pb-4">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl bg-white p-0.5" />
                    <div>
                      <h2 className="text-xs font-bold uppercase">{branding.collegeName}</h2>
                      <p className="text-[9px] text-amber-300 font-extrabold uppercase">Degree College</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-300">
                    <X size={22} />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-1.5">
                  {navItems.map((item) => {
                    const IconComp = item.icon;
                    const active = isNavActive(item);
                    const hasDropdown = Boolean(item.dropdown);
                    const isSubOpen = expandedSubmenu === item.label;

                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 flex-1 p-3 rounded-2xl text-xs font-bold transition-all ${
                              active ? "bg-amber-400 text-slate-950 font-extrabold" : "text-slate-200 hover:bg-white/10"
                            }`}
                          >
                            <IconComp size={18} className={active ? "text-slate-950" : "text-amber-400"} />
                            <span>{item.label}</span>
                          </Link>

                          {hasDropdown && (
                            <button
                              onClick={() => setExpandedSubmenu(isSubOpen ? null : item.label)}
                              className="p-3 text-slate-300 hover:text-amber-300"
                            >
                              <ChevronDown size={18} className={`transition-transform ${isSubOpen ? "rotate-180 text-amber-400" : ""}`} />
                            </button>
                          )}
                        </div>

                        {hasDropdown && isSubOpen && (
                          <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-amber-400/30 ml-4">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.path}
                                className="block py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-amber-300"
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
              </div>

              <div className="p-5 border-t border-amber-400/20 bg-blue-950/60">
                <Link
                  to="/admissions"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg"
                >
                  <GraduationCap size={18} />
                  <span>Apply for Admissions</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
