import fs from 'fs';
import path from 'path';
import { INITIAL_CMS_DATA } from '../src/data.js';

function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

function generateSearchIndex() {
  const qas = [];
  const d = INITIAL_CMS_DATA;

  // Helper to add QA
  function addQA(category, keywords, question, answer) {
    qas.push({
      category,
      keywords: keywords.map(k => k.toLowerCase().trim()),
      question,
      answer: cleanText(answer)
    });
  }

  // 1. Branding & General Contact Information
  if (d.branding) {
    const b = d.branding;
    addQA(
      'contact',
      ['where is the college located', 'address', 'location', 'where is it', 'chintamani', 'chikkaballapura'],
      'Where is the college located?',
      `The college is located in **Chintamani, Chikkaballapura, Karnataka, India**. You can find the complete address on the Contact page.`
    );
    addQA(
      'contact',
      ['phone', 'number', 'mobile', 'call', 'contact number', 'phone number', 'telephone'],
      'What is the college contact number?',
      `You can contact our admissions desk at **${b.phone}**.`
    );
    addQA(
      'contact',
      ['email', 'mail', 'write to us', 'email address', 'admissions email'],
      'What is the college email address?',
      `You can email us at **${b.email}** for admissions and general queries.`
    );
    addQA(
      'branding',
      ['college name', 'full name', 'tagline', 'short intro', 'about the college', 'what is the college name'],
      'What is the full name and tagline of the college?',
      `The full name is **${b.collegeName}**. Our tagline is *"${b.tagline}"*.\n\n${b.shortIntro}`
    );
    addQA(
      'contact',
      ['social', 'facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'social media'],
      'What are the social media handles of the college?',
      `Connect with us on our social media handles:\n` +
      `- Facebook: [Facebook](${b.socials.facebook})\n` +
      `- Twitter: [Twitter](${b.socials.twitter})\n` +
      `- LinkedIn: [LinkedIn](${b.socials.linkedin})\n` +
      `- Instagram: [Instagram](${b.socials.instagram})\n` +
      `- YouTube: [YouTube](${b.socials.youtube})`
    );
  }

  // 2. About - History, Vision, Mission, Values, Principal
  if (d.about) {
    const ab = d.about;
    addQA(
      'about',
      ['history', 'established', 'about us', 'overview', 'who manages', 'trust', 'affiliated', 'university'],
      'What is the history and affiliation of the college?',
      ab.history
    );
    addQA(
      'about',
      ['vision', 'college vision'],
      'What is the vision of the college?',
      `**Our Vision:**\n${ab.vision}`
    );
    addQA(
      'about',
      ['mission', 'college mission', 'aims'],
      'What is the mission of the college?',
      `**Our Mission:**\n` + ab.mission.map((m, idx) => `${idx + 1}. ${m}`).join('\n')
    );
    addQA(
      'about',
      ['core values', 'values', 'principles'],
      'What are the core values of the college?',
      `**Core Values:**\n` + ab.coreValues.map(v => `* **${v.title}**: ${v.desc}`).join('\n')
    );
    if (ab.principal) {
      addQA(
        'about',
        ['principal', 'director', 'who is the principal', 'head of college', 'chandrashekar', 'message'],
        'Who is the Principal, and what is his message?',
        `The Principal & Academic Director is **${ab.principal.name}**.\n\n**Principal's Message:**\n${ab.principal.message}`
      );
    }
  }

  // 3. Featured Courses
  if (d.courses && Array.isArray(d.courses)) {
    // General course list
    const degreeNames = d.courses.filter(c => c.category === 'Degree Programs').map(c => c.name);
    const coachingNames = d.courses.filter(c => c.category === 'Competitive Academy').map(c => c.name);
    addQA(
      'courses',
      ['courses', 'programs', 'what courses', 'degrees offered', 'what programs', 'course list', 'undergraduate'],
      'What courses and programs are offered by the college?',
      `Sri Vidya Chetana Degree College offers the following integrated programs:\n\n` +
      `**Undergraduate Degree Programs:**\n` + degreeNames.map(name => `* ${name}`).join('\n') +
      `\n\n**Competitive Academy Batches:**\n` + coachingNames.map(name => `* ${name}`).join('\n') +
      `\n\nAll degree courses are integrated with structured coaching for UPSC IAS/IPS, KPSC KAS, Banking, SSC, Railways, or Chartered Accountancy (CA).`
    );

    d.courses.forEach(c => {
      const slug = c.name.toLowerCase();
      const shortName = c.name.split('(')[0].replace('Bachelor of', '').trim().toLowerCase(); // e.g. "arts", "commerce"

      // Course Info
      addQA(
        'courses',
        [
          `about ${slug}`, `details of ${slug}`, `tell me about ${slug}`,
          `about ${shortName}`, `details of ${shortName}`, `tell me about ${shortName}`,
          `duration of ${slug}`, `duration of ${shortName}`, `intake of ${slug}`, `intake of ${shortName}`
        ],
        `Tell me about the ${c.name} course.`,
        `### ${c.name}\n` +
        `* **Duration:** ${c.duration}\n` +
        `* **Eligibility:** ${c.eligibility}\n` +
        `* **Affiliation:** ${c.atAGlance.affiliation}\n` +
        `* **Intake Capacity:** ${c.atAGlance.intake} seats\n` +
        `* **College Code:** ${c.atAGlance.collegeCode}\n` +
        `* **Medium of Instruction:** ${c.atAGlance.mediumOfInstruction}\n\n` +
        `**Description:** ${c.description}\n\n` +
        `**Overview:** ${c.aboutText}`
      );

      // Eligibility & Admission
      addQA(
        'courses',
        [
          `eligibility for ${slug}`, `eligibility criteria for ${slug}`,
          `who can apply for ${slug}`, `qualify for ${slug}`,
          `eligibility for ${shortName}`, `eligibility criteria for ${shortName}`,
          `who can apply for ${shortName}`
        ],
        `What is the eligibility criteria for ${c.name}?`,
        `To be eligible for **${c.name}**, candidates must fulfill:\n\n**Eligibility:** ${c.eligibility}`
      );

      // Why Choose & Benefits
      addQA(
        'courses',
        [
          `why choose ${slug}`, `benefits of ${slug}`, `advantages of ${slug}`,
          `why choose ${shortName}`, `benefits of ${shortName}`, `advantages of ${shortName}`
        ],
        `Why choose ${c.name} at Sri Vidya Chetana?`,
        `**Key features and benefits of ${c.name}:**\n\n` +
        c.whyChoose.map(w => `* ${w}`).join('\n') + `\n\n` +
        `**Key Benefits:**\n` +
        c.keyBenefits.map(b => `* ${b}`).join('\n')
      );

      // Career Opportunities
      if (c.careerOpportunities) {
        let careerStr = `Graduates of **${c.name}** have diverse career options:\n\n`;
        for (const [sect, roles] of Object.entries(c.careerOpportunities)) {
          careerStr += `**${sect}:**\n` + roles.map(r => `* ${r}`).join('\n') + `\n\n`;
        }
        addQA(
          'courses',
          [
            `career opportunities for ${slug}`, `jobs after ${slug}`, `placements for ${slug}`,
            `career opportunities for ${shortName}`, `jobs after ${shortName}`, `placements for ${shortName}`,
            `scope of ${slug}`, `scope of ${shortName}`
          ],
          `What are the career opportunities and placements after completing ${c.name}?`,
          careerStr.trim()
        );
      }

      // TRISHUL Model
      if (c.trishulModel) {
        addQA(
          'courses',
          [
            `trishul model for ${slug}`, `trishul for ${slug}`, `syllabus of ${slug}`, `subjects in ${slug}`,
            `trishul model for ${shortName}`, `trishul for ${shortName}`, `syllabus of ${shortName}`, `subjects in ${shortName}`,
            `trishul learning model`
          ],
          `What is the TRISHUL Learning Model for ${c.name}?`,
          `The **TRISHUL Learning Model** for **${c.name}** comprises three core pillars:\n\n` +
          `**1. Academic Modules:**\n` + c.trishulModel.academic.map(a => `* ${a}`).join(', ') + `\n\n` +
          `**2. Competitive Exam Preparation:**\n` + c.trishulModel.competitive.map(co => `* ${co}`).join(', ') + `\n\n` +
          `**3. Employability & Workplace Skills:**\n` + c.trishulModel.skills.map(s => `* ${s}`).join(', ') + `\n\n` +
          `*${c.closingStatement || ''}*`
        );
      }
    });
  }

  // 4. Departments
  if (d.departments && Array.isArray(d.departments)) {
    const list = d.departments.map(dept => `* **${dept.name}** - Led by **${dept.hod}**`).join('\n');
    addQA(
      'departments',
      ['departments', 'hod', 'faculty', 'heads', 'who leads the department', 'department list'],
      'What departments and HODs are there at the college?',
      `Sri Vidya Chetana Degree College has the following departments:\n\n${list}\n\nSelect a specific department to learn more about its focus and HOD details.`
    );

    d.departments.forEach(dept => {
      const slug = dept.name.toLowerCase();
      addQA(
        'departments',
        [`about ${slug}`, `details of ${slug}`, `hod of ${slug}`, `who is the hod of ${slug}`, `commerce department`, `science department`, `humanities department`, `coaching academy`],
        `Tell me about the ${dept.name}.`,
        `### ${dept.name}\n` +
        `* **Head of Department (HOD):** ${dept.hod}\n\n` +
        `**Description:** ${dept.description}`
      );
    });
  }

  // 5. Why Choose
  if (d.whyChoose && Array.isArray(d.whyChoose)) {
    const whyList = d.whyChoose.map(item => `* **${item.title}**: ${item.desc}`).join('\n');
    addQA(
      'whychoose',
      ['why choose this college', 'why sri vidya chetana', 'features', 'highlights', 'facilities', 'library', 'mock exam', 'scholarships', 'classrooms'],
      'Why should I choose Sri Vidya Chetana Degree College?',
      `Here are the key reasons to choose Sri Vidya Chetana:\n\n${whyList}`
    );
  }

  // 6. News & Announcements
  if (d.newsAndAnnouncements) {
    const na = d.newsAndAnnouncements;
    addQA(
      'news',
      ['latest news', 'news', 'seminar', 'what happened recently', 'events', 'auditors', 'career seminar'],
      'What is the latest news from the college?',
      `**Latest News:**\n\n` +
      na.news.map(n => `* **${n.date}**: ${n.title}\n  *${n.desc}*`).join('\n\n')
    );

    addQA(
      'news',
      ['announcements', 'notifications', 'admissions open', 'entrance test', 'diagnostic test'],
      'Are there any new announcements?',
      `**Recent Announcements:**\n\n` +
      na.announcements.map(a => `* **${a.date}**: ${a.title} ${a.urgent ? '**(URGENT)**' : ''}`).join('\n')
    );

    addQA(
      'news',
      ['upcoming events', 'events calendar', 'toppers mentorship', 'masterclass', 'contract laws'],
      'What are the upcoming events at the college?',
      `**Upcoming Events:**\n\n` +
      na.events.map(e => `* **${e.date} at ${e.time}**: ${e.title}\n  *Venue:* ${e.venue}`).join('\n\n')
    );

    addQA(
      'news',
      ['notices', 'timetable', 'current affairs sheets', 'exam timetable'],
      'What are the recent notice board updates?',
      `**Notice Board:**\n\n` +
      na.notices.map(n => `* **${n.date}**: ${n.title}`).join('\n')
    );
  }

  // 7. Admissions
  if (d.admissions) {
    const adm = d.admissions;
    const stepsStr = adm.steps.map(s => `**Step ${s.num}: ${s.title}**\n${s.desc}`).join('\n\n');
    addQA(
      'admissions',
      ['admissions', 'admission open', 'how to apply', 'how to enroll', 'admission steps', 'enrollment procedure', 'apply now'],
      'How does the admission process work?',
      `### ${adm.status}\n` +
      `*${adm.tagline}*\n\n` +
      `**Steps to get Admission:**\n\n${stepsStr}\n\n` +
      `**Admissions Eligibility:** ${adm.eligibility}`
    );
    addQA(
      'admissions',
      ['admissions open', 'admission status', 'enroll now', 'enrollment open'],
      'Are admissions open for this academic year?',
      `Yes! **${adm.status}**.\n\n*${adm.tagline}*\n\nEligibility: ${adm.eligibility}`
    );
  }

  // 8. Testimonials
  if (d.testimonials && Array.isArray(d.testimonials)) {
    const testList = d.testimonials.map(t => `* **${t.name}** (${t.role} - placed at *${t.company}*):\n  "${t.text}"`).join('\n\n');
    addQA(
      'testimonials',
      ['testimonials', 'reviews', 'student stories', 'alumni placements', 'success stories', 'what students say'],
      'What do alumni and students say about the college?',
      `Here is some feedback from our past students and CA scholars:\n\n${testList}`
    );
  }

  // 9. Gallery
  if (d.gallery && Array.isArray(d.gallery)) {
    const galList = d.gallery.map(g => `* **[${g.category}]** ${g.title}`).join('\n');
    addQA(
      'gallery',
      ['gallery', 'photos', 'campus view', 'building', 'sports meet', 'festivities', 'annual arts day', 'library reading room'],
      'What highlights are in the campus gallery?',
      `Our campus gallery includes pictures from:\n\n${galList}\n\nYou can view all of these photos in the Gallery section of the website.`
    );
  }

  return qas;
}

// Generate the search index
const searchIndex = generateSearchIndex();

const dirPath = path.resolve(process.cwd(), 'src/knowledge');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const outputPath = path.join(dirPath, 'search_index.json');
fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2), 'utf-8');

console.log(`SUCCESS: Generated search index with ${searchIndex.length} QA pairs at ${outputPath}`);
