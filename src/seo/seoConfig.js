// SEO Configuration and Structured Data Generators for Sri Vidya Chetana Degree College
// Domain: https://srividyachetana.in/

export const SITE_DOMAIN = "https://srividyachetana.in";
export const SITE_NAME = "Sri Vidya Chetana Degree College";
export const DEFAULT_OG_IMAGE = `${SITE_DOMAIN}/og-image.jpg`;
export const COLLEGE_LOGO = `${SITE_DOMAIN}/logo.jpg`;

export const BASE_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  "@id": `${SITE_DOMAIN}/#organization`,
  "name": "Sri Vidya Chetana Degree College",
  "alternateName": ["SVCDC", "Sri Vidya Chetana College", "Sri Vidya Chetana Degree College Chintamani"],
  "url": SITE_DOMAIN,
  "logo": COLLEGE_LOGO,
  "image": DEFAULT_OG_IMAGE,
  "description": "A premier educational institution in Karnataka, affiliated with Bengaluru North University. Offering B.A., B.Com, B.Sc., BBA, and BCA degree programs with integrated coaching for UPSC IAS, KPSC KAS, Banking, SSC, Railways, and CA.",
  "telephone": "+91-94481-23456",
  "email": "admissions@srividyachetana.edu.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chintamani",
    "addressLocality": "Chintamani",
    "addressRegion": "Karnataka",
    "postalCode": "563125",
    "addressCountry": "IN"
  },
  "foundingDate": "2026",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "name": "Sri Vidya Chetana Educational & Charitable Trust (R.)"
  },
  "sameAs": [
    "https://facebook.com",
    "https://twitter.com",
    "https://linkedin.com",
    "https://youtube.com",
    "https://instagram.com"
  ]
};

export const BASE_WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_DOMAIN}/#website`,
  "url": SITE_DOMAIN,
  "name": SITE_NAME,
  "inLanguage": "en-IN",
  "description": "Official portal of Sri Vidya Chetana Degree College, Chintamani, Karnataka. Integrated Degrees with Competitive Coaching.",
  "publisher": {
    "@id": `${SITE_DOMAIN}/#organization`
  }
};

export const SEO_PAGE_METADATA = {
  "/": {
    title: "Sri Vidya Chetana Degree College | Integrated Degree & Competitive Exam Coaching",
    description: "Sri Vidya Chetana Degree College in Chintamani, Karnataka. Affiliated to Bengaluru North University. Offering B.A, B.Com, B.Sc, BBA, and BCA integrated with UPSC IAS, KPSC KAS, Banking, SSC, Railways & CA coaching.",
    keywords: "Sri Vidya Chetana Degree College, SVCDC, degree college in Chintamani, degree college with IAS coaching, B.Com with CA Foundation Karnataka, BNU affiliated college Chikkaballapura, integrated degree programs Karnataka, Trishul learning model",
    canonical: `${SITE_DOMAIN}/`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` }
    ]
  },
  "/about": {
    title: "About Us | Sri Vidya Chetana Degree College - History, Vision & Mission",
    description: "Discover Sri Vidya Chetana Degree College, managed by Sri Vidya Chetana Educational & Charitable Trust (R.) and affiliated with Bengaluru North University. Learn about our vision, mission, and Trishul Learning Model.",
    keywords: "About Sri Vidya Chetana, Sri Vidya Chetana Educational Trust, Bengaluru North University affiliated college, degree college Chintamani, college vision and mission, principal message",
    canonical: `${SITE_DOMAIN}/about`,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "About Us", url: `${SITE_DOMAIN}/about` }
    ]
  },
  "/courses": {
    title: "Undergraduate Degree Courses & Programs | Sri Vidya Chetana Degree College",
    description: "Explore undergraduate programs at Sri Vidya Chetana Degree College: B.A., B.Com., B.Sc. PMCs, BBA, BCA, Abyasa NCERT, and Gurukul Sankalpa integrated with competitive exam coaching.",
    keywords: "degree courses Karnataka, BA, BCom, BSc PMCs, BBA, BCA, Abyasa NCERT batch, Gurukul Sankalpa, Sri Vidya Chetana courses, Bengaluru North University degree",
    canonical: `${SITE_DOMAIN}/courses`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Courses", url: `${SITE_DOMAIN}/courses` }
    ]
  },
  "/competitive-exams": {
    title: "Competitive Examination Coaching (UPSC, KPSC, Banking, SSC, Railways, CA) | Sri Vidya Chetana",
    description: "Integrated coaching academy at Sri Vidya Chetana Degree College for UPSC IAS/IPS, KPSC KAS, Banking PO/Clerk, SSC CGL/CHSL, RRB Railways, and CA Foundation alongside degree studies.",
    keywords: "UPSC coaching college Karnataka, KPSC KAS coaching Chintamani, banking exam coaching college, SSC CGL coaching, CA Foundation coaching, competitive exams academy, civil services preparation",
    canonical: `${SITE_DOMAIN}/competitive-exams`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Competitive Exams", url: `${SITE_DOMAIN}/competitive-exams` }
    ]
  },
  "/departments": {
    title: "Academic Departments & Faculty | Sri Vidya Chetana Degree College",
    description: "Explore our academic departments: Commerce & Management, Science & Computing, Humanities & Social Sciences, and the Integrated Coaching Academy at Sri Vidya Chetana Degree College.",
    keywords: "academic departments, faculty Sri Vidya Chetana, commerce department, science department, humanities department, coaching academy, Bengaluru North University faculty",
    canonical: `${SITE_DOMAIN}/departments`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Departments", url: `${SITE_DOMAIN}/departments` }
    ]
  },
  "/why-us": {
    title: "Why Choose Sri Vidya Chetana Degree College | Unique Features & Trishul Model",
    description: "Discover why Sri Vidya Chetana Degree College is Karnataka's leading institution: Veteran administrator mentors, CBT mock exam lab, competitive library, and Trishul Learning Model.",
    keywords: "why choose Sri Vidya Chetana, best degree college Karnataka, Trishul learning model, CBT exam lab, competitive exam library, college features, smart classrooms",
    canonical: `${SITE_DOMAIN}/why-us`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Why Choose Us", url: `${SITE_DOMAIN}/why-us` }
    ]
  },
  "/recent-news": {
    title: "Recent News, Circulars & Announcements | Sri Vidya Chetana Degree College",
    description: "Official notice board of Sri Vidya Chetana Degree College. Bengaluru North University exam timetables, academic circulars, seminar notifications, and campus events.",
    keywords: "college circulars, BNU exam timetables, Sri Vidya Chetana news, college announcements, academic notices, notice board Chintamani",
    canonical: `${SITE_DOMAIN}/recent-news`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Recent News", url: `${SITE_DOMAIN}/recent-news` }
    ]
  },
  "/job-updates": {
    title: "Job Updates & Recruitment Notifications | Sri Vidya Chetana Degree College",
    description: "Latest government and corporate job vacancy alerts for KPSC, UPSC, Banking (SBI/IBPS), Railways (RRB), Karnataka State Police (KSP), and corporate campus drives.",
    keywords: "KPSC recruitment 2026, SBI PO recruitment, UPSC notifications, Railway job updates, Karnataka government jobs, campus recruitment, job alerts",
    canonical: `${SITE_DOMAIN}/job-updates`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Job Updates", url: `${SITE_DOMAIN}/job-updates` }
    ]
  },
  "/downloads": {
    title: "Downloads & Student Resources | Sri Vidya Chetana Degree College",
    description: "Access official forms, brochures, syllabi, and student resources for Sri Vidya Chetana Degree College, Chintamani.",
    keywords: "college downloads, admission forms, syllabus download, student resources, Sri Vidya Chetana prospectus",
    canonical: `${SITE_DOMAIN}/downloads`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Downloads", url: `${SITE_DOMAIN}/downloads` }
    ]
  },
  "/gallery": {
    title: "Campus Photo Gallery | Sri Vidya Chetana Degree College",
    description: "View photos of our campus, smart classrooms, CBT computer lab, science laboratories, library, cultural events, and sports meets at Sri Vidya Chetana Degree College.",
    keywords: "Sri Vidya Chetana campus photos, college gallery, computer lab, college library, Taranga cultural fest, sports facilities, campus infrastructure",
    canonical: `${SITE_DOMAIN}/gallery`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Gallery", url: `${SITE_DOMAIN}/gallery` }
    ]
  },
  "/admissions": {
    title: "Admissions 2026-27 | Apply Online | Sri Vidya Chetana Degree College",
    description: "Admissions open for Academic Year 2026–27 at Sri Vidya Chetana Degree College for B.A., B.Com., B.Sc., BBA, and BCA with integrated competitive exam coaching.",
    keywords: "admissions 2026-27, degree admission Karnataka, apply online BCom BA BSc, college admission Chintamani, provisional registration, admission fee structure",
    canonical: `${SITE_DOMAIN}/admissions`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Admissions", url: `${SITE_DOMAIN}/admissions` }
    ]
  },
  "/contact": {
    title: "Contact Us & Campus Location | Sri Vidya Chetana Degree College",
    description: "Contact Sri Vidya Chetana Degree College in Chintamani, Chikkaballapura, Karnataka. Call +91 94481 23456 or email admissions@srividyachetana.edu.in for admission enquiries.",
    keywords: "contact Sri Vidya Chetana, college address Chintamani, admissions contact number, college phone number, Chikkaballapura college location, email address",
    canonical: `${SITE_DOMAIN}/contact`,
    ogType: "website",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Contact Us", url: `${SITE_DOMAIN}/contact` }
    ]
  },
  "/refund-policy": {
    title: "Fee Refund Policy | Sri Vidya Chetana Degree College",
    description: "Official Fee Refund Policy of Sri Vidya Chetana Degree College managed by Sri Vidya Chetana Educational & Charitable Trust (R.), Chintamani, Karnataka.",
    keywords: "fee refund policy, college refund guidelines, admission cancellation rules, Sri Vidya Chetana refund terms",
    canonical: `${SITE_DOMAIN}/refund-policy`,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Fee Refund Policy", url: `${SITE_DOMAIN}/refund-policy` }
    ]
  },
  "/privacy-policy": {
    title: "Privacy Policy | Sri Vidya Chetana Degree College",
    description: "Official Privacy Policy of Sri Vidya Chetana Degree College. Read how we protect student and visitor personal data and ensure information security.",
    keywords: "privacy policy, student data privacy, Sri Vidya Chetana terms, website privacy",
    canonical: `${SITE_DOMAIN}/privacy-policy`,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Privacy Policy", url: `${SITE_DOMAIN}/privacy-policy` }
    ]
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Sri Vidya Chetana Degree College",
    description: "Official Terms and Conditions governing website usage, academic programs, and services at Sri Vidya Chetana Degree College, Chintamani.",
    keywords: "terms and conditions, website terms of use, college rules and regulations, Sri Vidya Chetana terms",
    canonical: `${SITE_DOMAIN}/terms-and-conditions`,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Terms & Conditions", url: `${SITE_DOMAIN}/terms-and-conditions` }
    ]
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Sri Vidya Chetana Degree College",
    description: "Official Terms and Conditions governing website usage, academic programs, and services at Sri Vidya Chetana Degree College, Chintamani.",
    keywords: "terms and conditions, website terms of use, college rules and regulations, Sri Vidya Chetana terms",
    canonical: `${SITE_DOMAIN}/terms-and-conditions`,
    ogType: "article",
    breadcrumbs: [
      { name: "Home", url: `${SITE_DOMAIN}/` },
      { name: "Terms & Conditions", url: `${SITE_DOMAIN}/terms-and-conditions` }
    ]
  }
};

// Helper function to generate breadcrumb schema
export function generateBreadcrumbsSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Helper function to generate Course Schema
export function generateCourseSchema(course) {
  if (!course) return null;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description || course.aboutText,
    "provider": {
      "@type": "CollegeOrUniversity",
      "name": "Sri Vidya Chetana Degree College",
      "url": SITE_DOMAIN
    },
    "url": `${SITE_DOMAIN}/courses/${course.slug || course.id}`,
    "timeRequired": course.duration,
    "courseCode": course.atAGlance?.collegeCode || "P19GHR0326",
    "educationalCredentialAwarded": course.atAGlance?.programme || course.name,
    "occupationalCategory": "Higher Education"
  };

  if (course.feeStructure && course.feeStructure.length > 0) {
    schema.offers = course.feeStructure.map((fee) => ({
      "@type": "Offer",
      "name": fee.year,
      "priceCurrency": "INR",
      "price": fee.totalFee ? fee.totalFee.replace(/[^0-9]/g, "") : undefined,
      "category": "Tuition"
    }));
  }

  return schema;
}

// Helper function to generate FAQ schema
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
