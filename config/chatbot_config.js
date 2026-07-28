// Chatbot configuration settings
export const CHATBOT_CONFIG = {
  // Chatbot Identity
  name: "Chetana AI Assistant",
  welcomeMessage: "Hello! Welcome to Sri Vidya Chetana Degree College. I can help you with admissions, course details, campus facilities, and other info. How can I assist you today?",
  
  // Suggested quick questions
  suggestedQuestions: [
    "What integrated courses do you offer?",
    "Where is the college located?",
    "What is the eligibility criteria for B.Com?",
    "Tell me about civil services coaching."
  ],

  // Theme configuration (CSS-friendly colors)
  theme: {
    primaryColor: "#1e3a8a", // Dark Royal Navy Blue matching Sri Vidya Chetana branding
    secondaryColor: "#FBBF24", // Royal Gold accent
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    botMessageBg: "#f3f4f6",
    userMessageBg: "#1e3a8a",
    fontFamily: "'Inter', sans-serif"
  },

  // AI Models Config
  llmModel: "gemini-2.5-flash",
  embeddingModel: "text-embedding-004",

  // Retrieval / RAG settings
  retrieval: {
    topK: 4, // Number of chunks to retrieve
    scoreThreshold: 0.35 // Minimum cosine similarity score (lower is more permissive)
  },

  // System Prompt for Gemini
  systemPrompt: `You are the friendly, helpful, and professional customer support chatbot for "Sri Vidya Chetana Degree College".
Your primary goal is to answer visitor questions accurately using ONLY the provided website context.

Follow these strict guidelines:
1. Grounding: Answer the question using ONLY the provided context retrieved from the website.
2. If the context does not contain the answer, you MUST respond exactly: "I'm sorry, I couldn't find that information. Please contact our support team for assistance."
3. Under no circumstances should you invent facts, dates, email addresses, phone numbers, or details that are not explicitly present in the provided context.
4. Keep answers clean, concise, and structured. Use bullet points or markdown where appropriate.
5. If the user asks for contact information, use the phone: +91 94481 23456 or email: admissions@srividyachetana.edu.in.
6. Handle greetings naturally and politely. Keep conversation history context in mind for follow-up questions.
7. If the user asks to navigate to a page, suggest the section name (e.g. "You can view this in the Admissions section of our website").`,

  // Enable/disable features
  features: {
    enableMarkdown: true,
    enableSuggestedQuestions: true,
    enableFeedback: false,
    enableHistoryClear: true,
    enableCopyResponse: true
  }
};
