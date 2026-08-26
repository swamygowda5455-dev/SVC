import React from "react";
import { REFUND_POLICY_DATA } from "../refundpolicy.js";
import { ShieldCheck } from "lucide-react";

export default function RefundPolicy({ isModal = false, onClose = null }) {
  const data = REFUND_POLICY_DATA;

  return (
    <div className={`${isModal ? "p-4 sm:p-6 text-slate-800" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-slate-800"}`}>
      
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6 mb-8 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-300/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <ShieldCheck size={14} className="text-amber-600" />
          Official Institutional Policy
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
          {data.title}
        </h1>
        <div className="text-slate-600 text-sm font-semibold space-y-1">
          <p className="text-base font-bold text-[#1E3A8A]">{data.collegeName}</p>
          <p>{data.trustName}</p>
          <p>{data.location}</p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/90 mb-8 space-y-3">
        {data.intro.map((p, idx) => (
          <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {/* Policy Sections (1 to 37) */}
      <div className="space-y-6">
        {data.sections.map((section) => (
          <div
            key={section.id}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:border-amber-400/60 transition-colors"
          >
            <h2 className="text-base sm:text-lg font-extrabold text-[#1E3A8A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>{section.title}</span>
            </h2>

            {section.content && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {section.content}
              </p>
            )}

            {section.paragraphs && section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-700 leading-relaxed marker:text-amber-500">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}

            {section.footer && (
              <p className="text-xs sm:text-sm text-slate-600 italic bg-amber-50/50 p-3 rounded-xl border-l-2 border-amber-400">
                {section.footer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 font-semibold space-y-1">
        <p>© Sri Vidya Chetana Educational &amp; Charitable Trust (R.) | All Rights Reserved</p>
        <p>Sri Vidya Chetana Degree College</p>
        <p>Chintamani, Karnataka, India</p>
      </div>

    </div>
  );
}
