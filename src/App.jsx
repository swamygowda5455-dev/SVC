import React, { useState } from "react";
import {
  AlertTriangle,
  Server,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  ShieldAlert,
  Clock,
  Activity,
  CheckCircle2,
  HardDriveDownload,
  Radio,
  ArrowRight,
  Lock,
  UserCheck,
  Info,
  ExternalLink
} from "lucide-react";
import logo from "@/assets/Sri Vidhya Education logo final (quillbot.com).jpg";

export default function App() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryMessage, setRetryMessage] = useState("");

  const handleRetry = () => {
    setIsRetrying(true);
    setRetryMessage("");
    setTimeout(() => {
      setIsRetrying(false);
      setRetryMessage("Server is still under maintenance. Our technical team is working on it.");
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070F1B] via-[#0B192C] to-[#081325] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header Bar */}
      <header className="w-full bg-[#1E3A8A]/90 backdrop-blur-md border-b border-amber-400/20 py-3.5 px-4 sm:px-8 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & College Info */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Sri Vidya Chetana Degree College"
              className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-xl bg-white p-1 border border-amber-400/50 shadow-md"
            />
            <div>
              <h1 className="text-sm sm:text-lg md:text-xl font-black text-white uppercase tracking-tight font-display">
                Sri Vidya Chetana Degree College
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-300 font-semibold tracking-wide">
                Affiliated to Bengaluru North University | Chintamani, Chikkaballapura
              </p>
            </div>
          </div>

          {/* System Status Pill */}
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 text-red-300 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="hidden sm:inline">System Status:</span> Server Offline
          </div>
        </div>
      </header>

      {/* Main Server Down Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center items-center">
        
        {/* Central Alert Hero */}
        <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center mb-8">
          
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon with pulsing rings */}
          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-30" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-amber-600 to-amber-400 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-[#0B192C] rounded-[22px] flex items-center justify-center">
                <Server className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400" />
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-4">
            <ShieldAlert size={14} className="text-amber-400" />
            HTTP 503 • Server Unavailable
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-display">
            Server Down / Under Maintenance
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            The Sri Vidya Chetana Degree College web server and portal services are temporarily offline for scheduled system upgrades, database optimization, and infrastructure maintenance.
          </p>

          {/* Estimated Restoration Notice */}
          <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 max-w-lg mx-auto mb-6 flex items-center justify-center gap-3 text-slate-200 text-xs sm:text-sm">
            <Clock size={18} className="text-amber-400 shrink-0" />
            <span>
              Expected Resolution: <strong className="text-amber-300">Within 30 – 60 Minutes</strong>
            </span>
          </div>

          {/* Retry Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-75 cursor-pointer"
            >
              <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
              <span>{isRetrying ? "Checking Server Status..." : "Retry Connection"}</span>
            </button>

            <a
              href="tel:+919448123456"
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Phone size={16} className="text-amber-400" />
              <span>Call Emergency Desk</span>
            </a>
          </div>

          {/* Retry Status message */}
          {retryMessage && (
            <p className="mt-4 text-xs text-amber-300/90 font-medium animate-fade-in">
              {retryMessage}
            </p>
          )}

        </div>

        {/* Admin & Technical Support Section */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Admin Contact Box */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-3 text-amber-400">
              <UserCheck size={20} />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Admin & IT Desk
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              If you are a college administrator, faculty member, or staff needing urgent portal access, reach out directly to the IT administrative cell:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <span>Admin Email: <strong className="text-white">admin@srividyachetana.edu.in</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <span>Admin Helpline: <strong className="text-white">+91 94481 23456</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Radio size={14} className="text-amber-400 shrink-0" />
                <span>Server Cluster: <span className="font-mono text-amber-300">SVC-PROD-BLR-01</span></span>
              </div>
            </div>
          </div>

          {/* Student & Admissions Helpline */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:border-amber-400/40 transition-colors">
            <div className="flex items-center gap-2.5 mb-3 text-amber-400">
              <Info size={20} />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Admissions & Inquiries
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Admissions for B.A, B.Com, B.Sc, BBA, and BCA Integrated civil services coaching batches are currently ongoing offline at the campus.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <span>Admissions: <strong className="text-white">admissions@srividyachetana.edu.in</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                <span>Campus: <strong className="text-white">Chintamani, Chikkaballapura, Karnataka</strong></span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Notice */}
      <footer className="w-full bg-[#070F1B] border-t border-white/10 py-4 px-4 text-center text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Sri Vidya Chetana Educational &amp; Charitable Trust (R.) | Sri Vidya Chetana Degree College. All rights reserved.
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          Server incident reference: <span className="font-mono text-amber-300">INC-2026-SRV-503-DOWN</span>
        </p>
      </footer>
    </div>
  );
}

