import React from "react";
import { PRIVACY_POLICY_DATA } from "../privacypolicy.js";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy({ isModal = false, onClose = null }) {
  const data = PRIVACY_POLICY_DATA;

  return (
    <div className={`${isModal ? "p-4 sm:p-6 text-slate-800" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-slate-800"}`}>
      
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6 mb-8 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-300/80 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <ShieldCheck size={14} className="text-blue-600" />
          Official Privacy Policy
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

      {/* Policy Sections (1 to 30) */}
      <div className="space-y-6">
        {data.sections.map((section) => (
          <div
            key={section.id}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3 hover:border-blue-400/60 transition-colors"
          >
            <h2 className="text-base sm:text-lg font-extrabold text-[#1E3A8A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
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

            {/* Subsections if any (e.g. section 2) */}
            {section.subsections && (
              <div className="space-y-4 pt-2">
                {section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E3A8A]">
                      {sub.heading}
                    </h3>
                    {sub.description && (
                      <p className="text-xs sm:text-sm text-slate-600">{sub.description}</p>
                    )}
                    {sub.bullets && (
                      <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-slate-700 leading-relaxed marker:text-blue-500">
                        {sub.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {sub.note && (
                      <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-200 mt-2">
                        {sub.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.bullets && (
              <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-slate-700 leading-relaxed marker:text-blue-500">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}

            {section.footer && (
              <p className="text-xs sm:text-sm text-slate-600 italic bg-blue-50/50 p-3 rounded-xl border-l-2 border-blue-500">
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
