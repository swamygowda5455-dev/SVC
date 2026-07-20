import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_CMS_DATA } from '../src/data.js';

// Load environment variables
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Helper to clean and format text
function cleanText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

function generateChunks() {
  const chunks = [];
  const data = INITIAL_CMS_DATA;

  // 1. Branding & General Info
  if (data.branding) {
    const b = data.branding;
    chunks.push({
      category: 'branding',
      title: 'Sri Vidya Chetana Degree College General Information',
      text: `College Name: ${b.collegeName}
Tagline: ${b.tagline}
Short Introduction: ${b.shortIntro}
Contact Phone: ${b.phone}
Contact Email: ${b.email}
Address: ${b.address}
Social Media Links: Facebook: ${b.socials.facebook}, Twitter: ${b.socials.twitter}, LinkedIn: ${b.socials.linkedin}, YouTube: ${b.socials.youtube}, Instagram: ${b.socials.instagram}`
    });
  }

  // 2. About - History & Overview
  if (data.about) {
    const ab = data.about;
    if (ab.history) {
      chunks.push({
        category: 'about_history',
        title: 'College History and Overview',
        text: `Sri Vidya Chetana Degree College History and Overview: ${ab.history}`
      });
    }
    if (ab.vision || ab.mission) {
      chunks.push({
        category: 'about_vision_mission',
        title: 'College Vision and Mission',
        text: `Vision: ${ab.vision}
Mission Statements:
${ab.mission.map((m, idx) => `${idx + 1}. ${m}`).join('\n')}`
      });
    }
    if (ab.coreValues) {
      chunks.push({
        category: 'about_core_values',
        title: 'College Core Values',
        text: `Core Values of Sri Vidya Chetana Degree College:
${ab.coreValues.map(v => `- ${v.title}: ${v.desc}`).join('\n')}`
      });
    }
    if (ab.principal) {
      chunks.push({
        category: 'about_principal',
        title: 'Principal Profile and Message',
        text: `Principal Name: ${ab.principal.name}
Designation: ${ab.principal.designation}
Principal's Message to Students and Parents:
${ab.principal.message}`
      });
    }
  }

  // 3. Featured Courses
  if (data.courses && Array.isArray(data.courses)) {
    data.courses.forEach(c => {
      let courseText = `Course Name: ${c.name}
Category: ${c.category}
Duration: ${c.duration}
Eligibility: ${c.eligibility}
Description: ${c.description}
About: ${c.aboutText}

At a Glance Details:
- Programme: ${c.atAGlance.programme || ''}
- Intake Capacity: ${c.atAGlance.intake || ''}
- Affiliation: ${c.atAGlance.affiliation || ''}
- College Code: ${c.atAGlance.collegeCode || ''}
- AISHE Code: ${c.atAGlance.aisheCode || ''}
- Mode of Study: ${c.atAGlance.modeOfStudy || ''}
- Medium of Instruction: ${c.atAGlance.mediumOfInstruction || ''}
${c.atAGlance.subjectCombination ? `- Subject Combination: ${c.atAGlance.subjectCombination}` : ''}
${c.atAGlance.specializations ? `- Specializations: ${c.atAGlance.specializations}` : ''}`;

      if (c.whyChoose && Array.isArray(c.whyChoose)) {
        courseText += `\n\nWhy choose ${c.name}:\n${c.whyChoose.map(w => `- ${w}`).join('\n')}`;
      }
      if (c.keyBenefits && Array.isArray(c.keyBenefits)) {
        courseText += `\n\nKey Benefits of ${c.name}:\n${c.keyBenefits.map(b => `- ${b}`).join('\n')}`;
      }
      if (c.closingStatement) {
        courseText += `\n\nClosing Statement: ${c.closingStatement}`;
      }

      chunks.push({
        category: 'course_details',
        title: `Course Details - ${c.name}`,
        text: courseText
      });

      // Add Trishul Model and Career Opportunities as a separate detailed chunk to keep size optimized
      let modelAndCareer = `Course: ${c.name}
Career Opportunities:
`;
      if (c.careerOpportunities) {
        for (const [sect, roles] of Object.entries(c.careerOpportunities)) {
          modelAndCareer += `- ${sect}: ${roles.join(', ')}\n`;
        }
      }
      if (c.trishulModel) {
        modelAndCareer += `\nTRISHUL Learning Model for ${c.name}:
- Academic Modules: ${c.trishulModel.academic?.join(', ') || 'N/A'}
- Competitive Exam Preparation Modules: ${c.trishulModel.competitive?.join(', ') || 'N/A'}
- Industry & Employability Skills: ${c.trishulModel.skills?.join(', ') || 'N/A'}`;
      }

      chunks.push({
        category: 'course_career_trishul',
        title: `Course Career & Trishul Model - ${c.name}`,
        text: modelAndCareer
      });
    });
  }

  // 4. Departments
  if (data.departments && Array.isArray(data.departments)) {
    data.departments.forEach(d => {
      chunks.push({
        category: 'department',
        title: `Department - ${d.name}`,
        text: `Department Name: ${d.name}
Head of Department (HOD): ${d.hod}
Description: ${d.description}`
      });
    });
  }

  // 5. Why Choose Sri Vidya Chetana Degree College
  if (data.whyChoose && Array.isArray(data.whyChoose)) {
    const list = data.whyChoose.map(item => `- ${item.title}: ${item.desc}`).join('\n');
    chunks.push({
      category: 'why_choose',
      title: 'Why Choose Sri Vidya Chetana Degree College',
      text: `Key highlights and reasons to choose Sri Vidya Chetana Degree College:\n${list}`
    });
  }

  // 6. News & Announcements
  if (data.newsAndAnnouncements) {
    const na = data.newsAndAnnouncements;
    let text = 'Sri Vidya Chetana College News, Announcements, Events, and Notices:\n\n';
    
    if (na.news && Array.isArray(na.news)) {
      text += 'Latest News:\n';
      na.news.forEach(n => {
        text += `- ${n.date}: ${n.title} - ${n.desc}\n`;
      });
    }
    if (na.announcements && Array.isArray(na.announcements)) {
      text += '\nAnnouncements:\n';
      na.announcements.forEach(a => {
        text += `- ${a.date}: ${a.title} ${a.urgent ? '(URGENT)' : ''}\n`;
      });
    }
    if (na.events && Array.isArray(na.events)) {
      text += '\nUpcoming Events:\n';
      na.events.forEach(e => {
        text += `- ${e.date} at ${e.time}: ${e.title} at venue ${e.venue}\n`;
      });
    }
    if (na.notices && Array.isArray(na.notices)) {
      text += '\nImportant Notices:\n';
      na.notices.forEach(n => {
        text += `- ${n.date}: ${n.title}\n`;
      });
    }

    chunks.push({
      category: 'news_events',
      title: 'News, Announcements, Events, and Notices',
      text: text.trim()
    });
  }

  // 7. Admissions details
  if (data.admissions) {
    const adm = data.admissions;
    let stepsText = '';
    if (adm.steps && Array.isArray(adm.steps)) {
      stepsText = adm.steps.map(s => `Step ${s.num} - ${s.title}: ${s.desc}`).join('\n');
    }
    chunks.push({
      category: 'admissions',
      title: 'Admissions details and procedure',
      text: `Admission Status: ${adm.status}
Admission Tagline: ${adm.tagline}
Admission Eligibility: ${adm.eligibility}
Steps to get admission:
${stepsText}`
    });
  }

  // 8. Testimonials
  if (data.testimonials && Array.isArray(data.testimonials)) {
    data.testimonials.forEach(t => {
      chunks.push({
        category: 'testimonial',
        title: `Testimonial by ${t.name}`,
        text: `Student / Alumnus Name: ${t.name}
Role: ${t.role}
Current Placement / Company: ${t.company}
Feedback/Review: "${t.text}"`
      });
    });
  }

  // 9. Gallery descriptions
  if (data.gallery && Array.isArray(data.gallery)) {
    let galText = 'Campus Gallery Descriptions:\n';
    data.gallery.forEach(g => {
      galText += `- Category: ${g.category} - Title: ${g.title}\n`;
    });
    chunks.push({
      category: 'gallery',
      title: 'Campus Gallery and Media Descriptions',
      text: galText.trim()
    });
  }

  return chunks;
}

async function run() {
  console.log("Generating website content chunks...");
  const chunks = generateChunks();
  console.log(`Generated ${chunks.length} chunks. Fetching embeddings from Gemini API...`);

  const indexedChunks = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[${i + 1}/${chunks.length}] Embedding chunk: "${chunk.title}"`);
    
    try {
      const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: chunk.text,
      });

      // Handle response formats
      const embeddingValues = response.embedding?.values;
      if (!embeddingValues) {
        throw new Error("Invalid embedding response structure: " + JSON.stringify(response));
      }

      indexedChunks.push({
        id: `chunk-${i}`,
        category: chunk.category,
        title: chunk.title,
        text: chunk.text,
        vector: embeddingValues
      });
    } catch (err) {
      console.error(`Failed to embed chunk ${i} (${chunk.title}):`, err.message);
      process.exit(1);
    }
  }

  // Ensure knowledge directory exists
  const dirPath = path.resolve(__dirname, '../knowledge');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const outputPath = path.join(dirPath, 'embeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(indexedChunks, null, 2), 'utf-8');
  console.log(`SUCCESS: Wrote ${indexedChunks.length} embedded chunks to ${outputPath}`);
}

run();
