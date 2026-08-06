import React from "react";
import { Eye, Target, CheckCircle2, Award, Shield, Users, Compass, Lightbulb, Sparkles, Globe, Heart, Flag } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const introParagraphs = [
    "Sri Vidya Chetana Degree College, established in 2026, is a career-oriented institution committed to providing quality higher education that empowers students with knowledge, skills, values, and confidence. Managed by the Sri Vidya Chetana Educational & Charitable Trust (R.) and affiliated with Bengaluru North University, the college offers undergraduate programmes in B.A., B.Com., B.Sc., BBA, and BCA.",
    "The college's unique Integrated Degree Programme combines university education with structured coaching for UPSC Civil Services (IAS/IPS/IFS), KPSC (KAS), Banking, SSC, Railways, and Chartered Accountancy (CA). This enables students to earn a university degree while preparing for competitive examinations and rewarding careers.",
    "At Sri Vidya Chetana Degree College, we believe education goes beyond academics. We focus on developing leadership, communication, critical thinking, digital literacy, personality, and employability skills, while nurturing ethical values and social responsibility.",
    "Our mission is to empower students from both rural and urban communities through accessible, affordable, and career-focused education. With experienced faculty, continuous mentoring, and a student-centric learning environment, we prepare graduates to excel in higher education, public service, industry, entrepreneurship, and lifelong learning.",
    "At Sri Vidya Chetana Degree College, we don't just educate students—we prepare future leaders to serve society and contribute to the nation's progress."
  ];

  const missionList = [
    "To provide quality, affordable, and student-centric higher education that fosters academic excellence and holistic development.",
    "To integrate university education with structured coaching for UPSC Civil Services, KPSC (KAS), Banking, SSC, Railways, and Chartered Accountancy (CA).",
    "To develop leadership, communication, analytical, digital, and employability skills that prepare students for higher education, careers, and entrepreneurship.",
    "To empower students from rural and urban communities through inclusive, accessible, and career-oriented education.",
    "To promote women's education, leadership, and equal opportunities for personal and professional growth.",
    "To nurture ethical values, discipline, innovation, lifelong learning, and social responsibility.",
    "To prepare competent graduates who contribute meaningfully to society, the nation, and the global community."
  ];

  const coreValues = [
    { title: "Academic Excellence", desc: "Striving for the highest standards in teaching, learning, and student achievement.", icon: Award },
    { title: "Integrity & Ethics", desc: "Upholding honesty, transparency, accountability, and ethical conduct in all our actions.", icon: Shield },
    { title: "Student-Centric Learning", desc: "Creating an inclusive learning environment that supports the growth and success of every student.", icon: Users },
    { title: "Leadership", desc: "Inspiring students to lead with vision, confidence, responsibility, and service.", icon: Compass },
    { title: "Innovation", desc: "Encouraging creativity, critical thinking, and continuous improvement in learning and problem-solving.", icon: Lightbulb },
    { title: "Skill Development", desc: "Equipping students with communication, digital, analytical, and employability skills for future success.", icon: Sparkles },
    { title: "Inclusivity & Equal Opportunity", desc: "Respecting diversity and ensuring equal opportunities for students from all backgrounds.", icon: Globe },
    { title: "Women's Empowerment", desc: "Promoting education, leadership, confidence, and equal participation for women.", icon: Heart },
    { title: "Respect & Discipline", desc: "Fostering mutual respect, self-discipline, and professionalism within the campus community.", icon: CheckCircle2 },
    { title: "Social Responsibility", desc: "Encouraging compassion, environmental awareness, community engagement, and responsible citizenship.", icon: Users },
    { title: "Nation Building", desc: "Preparing responsible graduates who contribute to the progress and development of India.", icon: Flag }
  ];

  return (
    <div id="about" className="py-16 sm:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4.5 py-1.5 rounded-full shadow-xs">
            ABOUT US
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] tracking-tight font-display">
            About Sri Vidya Chetana Degree College
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Empowering students with academic excellence, competitive coaching, and values for lifelong success.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full mt-3" />
        </div>

        {/* 1. Main Institution Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="academic-card p-8 sm:p-12 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed"
        >
          {introParagraphs.map((para, idx) => (
            <p key={idx} className={idx === introParagraphs.length - 1 ? "font-bold text-[#1E3A8A] text-base sm:text-lg pt-2 border-t border-slate-100" : ""}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* 2. Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="academic-card p-8 sm:p-10 space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display">
                  Our Vision
                </h2>
              </div>
              <p className="text-slate-700 text-base leading-relaxed font-medium pt-2">
                To be a centre of excellence in higher education, empowering students with knowledge, skills, values, and leadership to become competent professionals, responsible citizens, and future leaders who contribute to nation-building.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-amber-600 font-extrabold tracking-wider uppercase">
              Academic Excellence • Leadership • Nation Building
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="academic-card p-8 sm:p-10 space-y-6"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display">
                Our Mission
              </h2>
            </div>

            <ul className="space-y-3.5 pt-1">
              {missionList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm font-medium">
                  <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 3. Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] font-display">
              Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              The foundational principles guiding our educational excellence and student development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="academic-card p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shadow-xs">
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-base font-bold text-[#1E3A8A] font-display">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
