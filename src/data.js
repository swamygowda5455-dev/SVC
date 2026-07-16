// Initial CMS-editable content for Sri Vidya Chetana Degree College Prototype

export const INITIAL_CMS_DATA = {
  // 1. General Branding and Contact Information
  branding: {
    collegeName: "Sri Vidya Chetana Degree College",
    tagline: "Excellence in Academics & Competitive Coaching Success",
    shortIntro: "A premier educational institution in Karnataka, pioneering the integration of standard B.Com, B.Sc, and B.A degree courses with result-oriented training for UPSC IAS, KPSC KAS, Banking, SSC, Railway, and Chartered Accountancy (CA) aspirants.",
    phone: "+91 94481 23456",
    email: "admissions@srividyachetana.edu.in",
    address: "Vidya Nagar, NH-206, Bhadravathi, Karnataka, India - 577301",
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      youtube: "https://youtube.com",
      instagram: "https://instagram.com"
    }
  },

  // 2. Hero Section (Auto-sliding Banners)
  hero: {
    title: "Sri Vidya Chetana Degree College",
    tagline: "Bridging Academic Degrees with Career Milestones",
    shortIntro: "Karnataka's leading college for integrated education. We run high-quality B.Com, B.Sc, and B.A degree courses alongside elite tutoring for IAS, KAS, Banking, SSC, Railway, and CA exams.",
    banners: [
      {
        id: "hero-1",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
        title: "Integrated Degree Programs",
        subtitle: "Earn your B.Com, B.Sc, or B.A degree with top academic rigor and highly experienced university mentors."
      },
      {
        id: "hero-2",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
        title: "Civil Services Academy (IAS & KAS)",
        subtitle: "Dedicated daily coaching, study resources, and mock interviews led by seasoned administrative officers."
      },
      {
        id: "hero-3",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
        title: "Elite Competitive & Commerce Coaching",
        subtitle: "High-speed tricks for Banking/SSC, intensive syllabus training for Railway exams, and professional CA Foundation tutoring."
      }
    ]
  },

  // 3. About Section
  about: {
    history: "Founded with a mission to unlock semi-urban academic potential, Sri Vidya Chetana Degree College stands as a hallmark of career-aligned education. We pioneered the practice of embedding competitive exam preparation within the daily university schedule, ensuring our graduates are instantly workplace and exam-ready.",
    vision: "To cultivate highly competent, ethical, and public-spirited professionals who excel in university academics and lead the nation through civil services and financial expertise.",
    mission: "To deliver premier quality higher education across Commerce, Science, and Arts streams, supplemented by high-caliber, affordable training modules for UPSC, KPSC, banking boards, SSC, railways, and professional accounting councils.",
    principal: {
      name: "Prof. S. M. Chandrashekar, M.Sc, M.Phil",
      designation: "Principal & Academic Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      message: "At Sri Vidya Chetana, our purpose goes far beyond standard rote-learning. We prepare you to conquer competitive national and state boards—whether it is IAS, KAS, banking exams, SSC, or CA—simultaneously with your graduation. We align your degrees with your highest aspirations."
    }
  },

  // 4. Featured Courses
  courses: [
    {
      id: "course-1",
      category: "Degree Programs",
      name: "B.Com (Bachelor of Commerce)",
      duration: "3 Years (Full-Time)",
      eligibility: "Completion of 10+2 or Pre-University Course (PUC) from any recognized board.",
      description: "Rigorous commerce curriculum covering corporate accounting, corporate law, business taxation, and audit principles, coupled with professional career guidance.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-2",
      category: "Degree Programs",
      name: "B.Sc (Bachelor of Science)",
      duration: "3 Years (Full-Time)",
      eligibility: "Completion of 10+2 / PUC with Science stream subjects (PCM/CBZ/PMCS).",
      description: "Fosters intensive inquiry and scientific skillsets across Mathematics, Physics, Chemistry, and Computer Science, with advanced integrated labs.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-3",
      category: "Degree Programs",
      name: "B.A (Bachelor of Arts)",
      duration: "3 Years (Full-Time)",
      eligibility: "Completion of 10+2 / PUC in Arts, Commerce, or Science streams.",
      description: "Comprehensive study of humanities—focusing on History, Economics, Political Science, and Literature. Perfect foundational choice for civil services.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-4",
      category: "Competitive Academy",
      name: "IAS & KAS Integrated Preparation",
      duration: "Integrated with Degree (UPSC / KPSC)",
      eligibility: "Exclusively open to students enrolled in B.Com, B.Sc, or B.A.",
      description: "Comprehensive coaching covering general studies, CSAT, descriptive writing, and state-specific syllabus for Karnataka Administrative Services.",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-5",
      category: "Competitive Academy",
      name: "Banking, SSC & Railway Coachings",
      duration: "Regular Morning & Evening Batches",
      eligibility: "Available to all currently enrolled collegiate candidates.",
      description: "High-intensity training targeting IBPS PO/Clerk, SBI, SSC CGL/CHSL, and RRB. Includes rapid speed shortcuts, logical reasoning, and computer-based mock exams.",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "course-6",
      category: "Competitive Academy",
      name: "CA Foundation & Intermediate Coaching",
      duration: "Integrated Course (Concurrent)",
      eligibility: "Open to Commerce stream and B.Com scholars.",
      description: "Expert tuition delivered by practicing CAs. Thorough syllabus drills, practice tests, and revision schedules ensuring successful foundation and intermediate attempts.",
      image: "https://images.unsplash.com/photo-1448697517562-baf5ee14f8ce?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // 5. Departments
  departments: [
    {
      id: "dept-1",
      name: "Department of Commerce & Management",
      hod: "Prof. S. R. Nagaraj, M.Com, MBA",
      description: "A dynamic hub of accounting education and strategic leadership development. Equips B.Com candidates with robust financial analytical skills.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dept-2",
      name: "Department of Science & Computing",
      hod: "Dr. K. G. Vishwanatha, Ph.D.",
      description: "Focusing on logic, empirical proof, and computational models. Host to modern laboratories in Physics, Mathematics, and Computer Science.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dept-3",
      name: "Department of Humanities & Social Sciences",
      hod: "Prof. Girija Bai, M.A.",
      description: "Cultivating critical socio-political thinking. Coordinates History, Political Science, and Economics curricula to align perfectly with civil service goals.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "dept-4",
      name: "Integrated Coaching Academy",
      hod: "Director Raghavan Iyer, Retired Civil Servant",
      description: "A powerhouse division focused exclusively on aptitude tricks, daily current affairs analysis, answer writing mentorship, and mock testing.",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // 6. Why Choose Our College
  whyChoose: [
    { icon: "Users", title: "Veteran Administrators & CAs", desc: "Our coaching features professional mentorship by active and former civil servants, practicing CAs, and banking subject-matter experts." },
    { icon: "BookOpen", title: "Dedicated Competitive Library", desc: "A special quiet reading wing stocked with over 5,000 reference resources for UPSC, KPSC, banking, SSC, and CA." },
    { icon: "Cpu", title: "CBT Mock Exam Lab", desc: "Equipped with dedicated test terminals simulating the real online examination patterns of Banking, SSC, and Railway boards." },
    { icon: "TrendingUp", title: "Unrivaled Competitive Results", desc: "Leading selection rates in central banking cadres, Karnataka state administrative officers, and corporate placements." },
    { icon: "Award", title: "Daily Aptitude & Current Affairs", desc: "Every academic morning kicks off with mandatory current affairs updates, quantitative shortcut drills, and daily reading reviews." },
    { icon: "DollarSign", title: "Integrated Merit Scholarships", desc: "Up to 100% concession on standard integrated competitive coaching tuition for high-scoring and deserving applicants." },
    { icon: "Briefcase", title: "Strong Corporate Connect", desc: "Regular campus recruitment drives and structured articleship assistance for CA scholars in top-tier accounting firms." },
    { icon: "Tv", title: "Interactive Smart Classrooms", desc: "Equipped with live video feed capability, guest speaker screens, and digital boards for deep concept visualization." }
  ],

  // 7. Latest News & Announcements (Divided into News, Announcements, Events, Notices)
  newsAndAnnouncements: {
    news: [
      { id: "news-1", date: "July 12, 2026", title: "Sri Vidya Chetana hosts District-Level Commerce and CA Career Seminar", desc: "Over 500 students participated in career mapping sessions led by leading corporate auditors and administrative consultants." },
      { id: "news-2", date: "June 28, 2026", title: "Eight scholars clear Banking and Railway examinations in the latest cycle", desc: "Our specialized evening tutoring classes celebrated high recruitment success in regional banking and railway boards." }
    ],
    announcements: [
      { id: "ann-1", date: "July 14, 2026", title: "Applications open for civil services integrated B.A & B.Com morning batches", urgent: true },
      { id: "ann-2", date: "July 08, 2026", title: "Pre-Coaching entrance diagnostic test scheduled for July 25th in College Hall-A" }
    ],
    events: [
      { id: "evt-1", date: "July 28, 2026", time: "10:30 AM", title: "UPSC & KPSC State Toppers Mentorship & Interactive Q&A Session", venue: "Centenary Auditorium" },
      { id: "evt-2", date: "August 02, 2026", time: "02:00 PM", title: "CA Foundation Revision Masterclass on Mercantile and Contract Laws", venue: "Seminar Room 2" }
    ],
    notices: [
      { id: "not-1", date: "July 15, 2026", title: "University degree semester exam timetable published for B.Com, B.Sc, and B.A streams" },
      { id: "not-2", date: "June 30, 2026", title: "Daily current affairs syllabus and study sheets for July month updated in the digital repository" }
    ]
  },

  // 8. Campus Gallery
  gallery: [
    {
      id: "gal-1",
      category: "Campus",
      title: "Sri Vidya Chetana Degree Main Building",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-2",
      category: "Laboratories",
      title: "Computer and Online CBT Mock Testing Terminal",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-3",
      category: "Cultural Activities",
      title: "Taranga - Annual Arts and College Day Festivities",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-4",
      category: "Sports",
      title: "Annual Sports Meet & Inter-Collegiate Tournaments",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-5",
      category: "Campus",
      title: "Main Library Reading Room & Competitive Examination Desk",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal-6",
      category: "Events",
      title: "KAS Officers guest lecture on State Governance and Economics",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // 9. Admissions Section
  admissions: {
    status: "Admissions Open for Academic Year 2026-27",
    tagline: "Your Gateway to Integrated Degrees & Distinguished Careers",
    steps: [
      { num: "01", title: "Choose Academic Degree", desc: "Select your undergraduate degree (B.Com, B.Sc, or B.A) based on your core academic strengths." },
      { num: "02", title: "Select Integrated Coaching", desc: "Opt-in for competitive coaching programs (IAS/KAS, Banking/SSC/Railway, or CA) alongside your degree." },
      { num: "03", title: "Admission Allotment & Onboarding", desc: "Complete basic document check-ups, and receive your integrated program schedule." }
    ],
    eligibility: "Degree programs require PUC / 10+2 passing marks from any recognized state or national board. Integrated competitive coaching batches are allocated concurrently on a first-come, first-served basis.",
    btnText: "Enroll Now"
  },

  // 10. Testimonials
  testimonials: [
    {
      id: "test-1",
      name: "Lokesh Gowda, B.Com",
      role: "Alumni (B.Com Integrated Batch)",
      company: "Probationary Officer at State Bank of India (SBI)",
      text: "Sri Vidya Chetana's B.Com integrated with Banking coaching was stellar. The speed-math quantitative aptitude shortcuts and simulated online tests let me crack the bank recruitment exam in my first attempt right out of graduation!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-2",
      name: "Sneha Hegde, B.A",
      role: "Alumni (B.A Civil Services Batch)",
      company: "Assistant Commissioner - Govt. of Karnataka (KPSC)",
      text: "The B.A. curriculum gave me the ideal historical and economic background, and the integrated IAS/KAS coaching kept my focus tight with daily descriptive answers. I got selected in my state civil services with high ranks!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "test-3",
      name: "Manoj Kumar, B.Sc",
      role: "CA Intermediate Scholar",
      company: "Articleship Trainee at Deloitte India",
      text: "Balancing standard classes with CA prep is highly challenging, but our mentors aligned the B.Com and CA modules incredibly well. Clearing CA Foundation and Intermediate in my very first attempt was a direct result of this focus.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  ]
};
