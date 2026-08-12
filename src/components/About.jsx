import React from "react";
import { Eye, Target, CheckCircle2, Award, Shield, Users, Compass, Lightbulb, Sparkles, Globe, Heart, Flag, Quote } from "lucide-react";
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

  const visionPillars = [
    { title: "Academic Excellence", desc: "Setting benchmarks in higher education through quality curriculum, innovative teaching, and continuous assessment." },
    { title: "Holistic Development", desc: "Integrating degree education with competitive examination prep and industry skill development." },
    { title: "Ethical & Values-Driven Leadership", desc: "Instilling discipline, moral integrity, empathy, and responsible leadership in every graduate." },
    { title: "Nation Building & Social Empowerment", desc: "Nurturing socially conscious citizens equipped to serve the nation in public, corporate, and social sectors." }
  ];

  return (
    <div id="about" className="py-16 sm:py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-center">
          <span className="text-[#1E3A8A] text-xs font-extrabold tracking-[0.2em] uppercase bg-amber-50 border border-amber-300/80 px-4.5 py-1.5 rounded-full shadow-xs">
            ABOUT US
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E3A8A] tracking-tight font-display text-center w-full">
            About Sri Vidya Chetana Degree College
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center w-full mx-auto">
            Empowering students with academic excellence, competitive coaching, and values for lifelong success.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1E3A8A] via-amber-400 to-amber-500 mx-auto rounded-full mt-3" />
        </div>

        {/* 1. About the College Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="academic-card p-8 sm:p-12 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed"
        >
          <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display mb-2">
            About the College
          </h2>
          {introParagraphs.map((para, idx) => (
            <p key={idx} className={idx === introParagraphs.length - 1 ? "font-bold text-[#1E3A8A] text-base sm:text-lg pt-2 border-t border-slate-100" : ""}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* 2. Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="academic-card p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-amber-400 transition-colors h-full"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Eye size={24} />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">Institutional Roadmap</span>
                  <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display">
                    Vision
                  </h2>
                </div>
              </div>

              {/* Main Vision Statement Highlight Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-300/60 text-slate-800 font-semibold text-sm sm:text-base leading-relaxed italic border-l-4 border-l-amber-500">
                "To be a centre of excellence in higher education by empowering students with knowledge, skills, values, and leadership to become competent professionals, responsible citizens, and future leaders who contribute to nation-building."
              </div>

              {/* Vision Pillars */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold text-[#1E3A8A] uppercase tracking-wider">Strategic Pillars</h3>
                <div className="space-y-3">
                  {visionPillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm">
                      <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold text-slate-900">{pillar.title}: </strong>
                        <span className="text-slate-600 leading-relaxed">{pillar.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-amber-600 font-extrabold tracking-wider uppercase">
              Academic Excellence • Leadership • Nation Building
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="academic-card p-8 sm:p-10 flex flex-col justify-between space-y-6 hover:border-amber-400 transition-colors h-full"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1E3A8A] border border-blue-200 flex items-center justify-center shrink-0 shadow-xs">
                  <Target size={24} />
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#1E3A8A] tracking-wider">Core Commitments</span>
                  <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display">
                    Mission
                  </h2>
                </div>
              </div>

              {/* Mission Intro Highlight Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-slate-800 font-semibold text-sm sm:text-base leading-relaxed border-l-4 border-l-[#1E3A8A]">
                Our core commitments to nurture student success, empower diverse communities, and deliver career-focused educational excellence.
              </div>

              {/* Mission Items */}
              <ul className="space-y-3 pt-1">
                {missionList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm font-medium">
                    <CheckCircle2 size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-[#1E3A8A] font-extrabold tracking-wider uppercase">
              Affordability • Integrated Learning • Inclusivity
            </div>
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

        {/* 4. Principal's Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="academic-card p-8 sm:p-12 space-y-6"
        >
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 shadow-xs">
              <Quote size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] font-display">
                Principal's Message
              </h2>
              <p className="text-xs text-amber-600 font-extrabold uppercase tracking-wider">
                Leadership Desk
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p className="font-extrabold text-[#1E3A8A] text-base sm:text-lg">
              Dear Students, Parents, and Well-Wishers,
            </p>
            <p className="font-bold text-slate-800">
              Welcome to Sri Vidya Chetana Degree College.
            </p>
            <p>
              Education is not merely about earning a degree; it is about developing knowledge, character, skills, and the confidence to face future challenges. At Sri Vidya Chetana Degree College, we are committed to providing a student-centric learning environment that promotes academic excellence, critical thinking, ethical values, and holistic development.
            </p>
            <p>
              Our unique Integrated Degree Programme combines university education with structured coaching for UPSC Civil Services (IAS/IPS/IFS), KPSC (KAS), Banking, SSC, Railways, and Chartered Accountancy (CA). This approach enables students to build a strong academic foundation while preparing for competitive examinations and diverse career opportunities.
            </p>
            <p>
              With the guidance of our dedicated faculty and mentors, students are encouraged to develop leadership, communication, digital, and employability skills that will help them succeed in higher education, professional careers, entrepreneurship, and public service.
            </p>
            <p>
              I encourage every student to make the most of the opportunities available, pursue excellence with determination, uphold integrity in all actions, and strive to become responsible citizens who contribute positively to society and the nation.
            </p>
            <p>
              I wish you a rewarding, successful, and inspiring academic journey at Sri Vidya Chetana Degree College.
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col items-start gap-0.5 font-display">
              <p className="font-extrabold text-base text-[#1E3A8A]">Principal</p>
              <p className="text-amber-600 font-extrabold text-xs tracking-wider uppercase">Sri Vidya Chetana Degree College</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

