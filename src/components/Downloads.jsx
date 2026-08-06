import React from "react";
import { Download } from "lucide-react";

export default function Downloads() {
  return (
    <div className="py-16 sm:py-24 bg-slate-50 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-[#1E3A8A] border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
          <Download size={32} className="text-[#1E3A8A]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] font-display">
          Downloads
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          No downloadable documents available at the moment.
        </p>
      </div>
    </div>
  );
}
