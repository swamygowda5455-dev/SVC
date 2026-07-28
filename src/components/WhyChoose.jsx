import React from "react";
import * as Icons from "lucide-react";
import { motion } from "motion/react";

export default function WhyChoose({ whyChoose }) {

  // Dynamic icon resolver from Lucide
  const resolveIcon = (iconName) => {
    switch (iconName) {
      case "Users": return <Icons.Users size={24} />;
      case "Cpu": return <Icons.Cpu size={24} />;
      case "BookOpen": return <Icons.BookOpen size={24} />;
      case "TrendingUp": return <Icons.TrendingUp size={24} />;
      case "Award": return <Icons.Award size={24} />;
      case "DollarSign": return <Icons.DollarSign size={24} />;
      case "Briefcase": return <Icons.Briefcase size={24} />;
      case "Tv": return <Icons.Tv size={24} />;
      default: return <Icons.HelpCircle size={24} />;
    }
  };

  return (
    <section id="why-choose" className="py-20 bg-white scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#1E3A8A] text-[10px] font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4 py-1.5 rounded-full shadow-xs">
            THE SVC EDGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] mt-4 tracking-tight">
            WHY CHOOSE OUR COLLEGE?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-4">
            We provide a world-class infrastructure combined with elite academic pedagogy designed to make you industry-ready.
          </p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#1E3A8A] to-amber-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {whyChoose.map((item, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              id={`why-card-${index}`}
              key={index}
              className="group bg-white hover:bg-amber-50/20 p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-amber-400/80 hover:shadow-lg transition-all duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#1E3A8A] group-hover:text-amber-400 group-hover:border-[#1E3A8A]">
                {resolveIcon(item.icon)}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold font-display text-slate-800 group-hover:text-[#1E3A8A] transition-colors duration-300 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed transition-colors duration-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
