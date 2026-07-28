import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Trash2, Copy, Check, CornerDownRight } from "lucide-react";
import { CHATBOT_CONFIG } from "../../config/chatbot_config.js";
import searchIndex from "../knowledge/search_index.json";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [previousCategory, setPreviousCategory] = useState(null);

  const messagesEndRef = useRef(null);

  // Initialize with welcome message and suggested questions
  useEffect(() => {
    const savedMessages = localStorage.getItem("svc_chatbot_history");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: "msg-welcome",
          sender: "bot",
          text: CHATBOT_CONFIG.welcomeMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: CHATBOT_CONFIG.suggestedQuestions
        }
      ]);
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("svc_chatbot_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle suggested question click
  const handleSuggestionClick = (question) => {
    handleSendMessage(question);
  };

  // Normalizes a string by stripping punctuation, dots, spaces, etc.
  const normalize = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  // Stop words to ignore during token overlap scoring to prevent generic matches
  const STOP_WORDS = new Set([
    "does", "the", "college", "what", "is", "a", "of", "in", "to", "for", "and", 
    "or", "on", "at", "about", "offer", "you", "me", "how", "tell", "any", "are", 
    "there", "do", "have", "with", "their", "its", "they", "it", "who", "your"
  ]);

  // RAG Search Matching Algorithm
  const retrieveAnswer = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    const cleanQuery = lowerQuery.replace(/[?.!,;:]/g, "");
    const normalizedQuery = normalize(query);
    
    let bestQA = null;
    let maxScore = 0;

    // Detect if this is likely a follow-up query using pronouns
    const followUpPronouns = ["duration", "eligibility", "fees", "intake", "syllabus", "opportunities", "careers", "hod", "who leads"];
    const isFollowUp = previousCategory && followUpPronouns.some(p => lowerQuery.includes(p));

    // Tokenize query
    const tokens = cleanQuery.split(/\s+/)
      .map(t => t.trim())
      .filter(t => t.length >= 2 && !STOP_WORDS.has(t));

    searchIndex.forEach(qa => {
      let score = 0;

      // 1. Exact matches on normalized question
      const normalizedQAQuestion = normalize(qa.question);
      if (normalizedQuery === normalizedQAQuestion) {
        score += 250;
      } else if (normalizedQAQuestion.includes(normalizedQuery) || normalizedQuery.includes(normalizedQAQuestion)) {
        score += 80;
      }

      // 2. Keyword matching
      qa.keywords.forEach(keyword => {
        const normKeyword = normalize(keyword);
        if (normalizedQuery === normKeyword) {
          score += 150;
        } else if (normalizedQuery.includes(normKeyword)) {
          score += 50;
        }
      });

      // 3. Token-based matching (only if we have tokens left after stop words filtering)
      if (tokens.length > 0) {
        let tokenMatches = 0;
        tokens.forEach(token => {
          const normToken = normalize(token);
          if (!normToken) return;

          // Check keywords
          let keywordMatch = false;
          qa.keywords.forEach(k => {
            if (normalize(k).includes(normToken)) {
              score += 25;
              keywordMatch = true;
            }
          });

          // Check question text
          if (normalize(qa.question).includes(normToken)) {
            score += 15;
            keywordMatch = true;
          }

          // Check answer text (lower weight)
          if (normalize(qa.answer).includes(normToken)) {
            score += 3;
            keywordMatch = true;
          }

          if (keywordMatch) {
            tokenMatches++;
          }
        });

        // Boost if multiple non-stopwords match
        if (tokenMatches > 1) {
          score += tokenMatches * 15;
        }
      }

      // 4. Follow-up context boost (only applied if we already have some match, to avoid false hijack)
      if (isFollowUp && qa.category === previousCategory && score > 0) {
        score += 40;
      }

      if (score > maxScore) {
        maxScore = score;
        bestQA = qa;
      }
    });

    // Threshold check (higher threshold to ensure quality matches)
    const scoreThreshold = 45; 
    if (bestQA && maxScore >= scoreThreshold) {
      setPreviousCategory(bestQA.category);
      return {
        answer: bestQA.answer,
        category: bestQA.category
      };
    }

    return {
      answer: "I'm sorry, I couldn't find that information. Please contact our support team for assistance.",
      category: null
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    if (!textToSend) {
      setInput("");
    }

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking/typing animation
    setTimeout(() => {
      const result = retrieveAnswer(text);
      
      // Determine suggested follow-ups based on the answered category
      let suggestions = [];
      if (result.category === 'courses' || result.category === 'admissions') {
        suggestions = ["How does the admission process work?", "What courses are offered?", "Contact admissions office"];
      } else if (result.category === 'contact' || result.category === 'branding') {
        suggestions = ["Where is the college located?", "What departments do you have?", "Why choose Sri Vidya Chetana?"];
      } else {
        suggestions = CHATBOT_CONFIG.suggestedQuestions.filter(q => q !== text);
      }

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: suggestions.slice(0, 3)
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const clearHistory = () => {
    localStorage.removeItem("svc_chatbot_history");
    setMessages([
      {
        id: "msg-welcome",
        sender: "bot",
        text: CHATBOT_CONFIG.welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: CHATBOT_CONFIG.suggestedQuestions
      }
    ]);
    setPreviousCategory(null);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to parse simple markdown bold and lists
  const formatMessageText = (text) => {
    return text.split('\n').map((line, idx) => {
      let content = line;
      
      // Handle bold texts
      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      
      // Simple parse list item
      const isListItem = content.startsWith('* ') || content.startsWith('- ');
      if (isListItem) {
        content = content.substring(2);
      }

      // Parse markdown links [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      
      const formatSpans = (txt) => {
        let parts = [];
        let lastIndex = 0;
        let match;

        // Reset regex indices
        linkRegex.lastIndex = 0;
        
        // Find links first
        const linkMatches = [];
        while ((match = linkRegex.exec(txt)) !== null) {
          linkMatches.push({
            start: match.index,
            end: linkRegex.lastIndex,
            text: match[1],
            url: match[2]
          });
        }

        if (linkMatches.length === 0) {
          return txt.split('**').map((part, i) => {
            if (i % 2 === 1) {
              return <strong key={i} className="font-semibold text-blue-900">{part}</strong>;
            }
            return part.split('*').map((sp, j) => {
              if (j % 2 === 1) return <em key={j} className="italic">{sp}</em>;
              return sp;
            });
          });
        }

        // Reconstruct with links
        linkMatches.forEach((lm, index) => {
          if (lm.start > lastIndex) {
            parts.push(txt.substring(lastIndex, lm.start));
          }
          parts.push(
            <a 
              key={`link-${index}`} 
              href={lm.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline font-medium hover:text-blue-800 transition-colors"
            >
              {lm.text}
            </a>
          );
          lastIndex = lm.end;
        });

        if (lastIndex < txt.length) {
          parts.push(txt.substring(lastIndex));
        }

        return parts;
      };

      if (isListItem) {
        return (
          <li key={idx} className="ml-4 list-disc mb-1 text-slate-700">
            {formatSpans(content)}
          </li>
        );
      }

      if (content.trim().startsWith('###')) {
        return (
          <h4 key={idx} className="font-bold text-slate-800 mt-2 mb-1 text-base">
            {formatSpans(content.replace('###', ''))}
          </h4>
        );
      }

      return (
        <p key={idx} className="mb-2 leading-relaxed text-slate-700">
          {formatSpans(content)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer text-amber-300 relative focus:outline-none focus:ring-4 focus:ring-amber-300/50 border-2 border-amber-400/40"
        style={{ backgroundColor: CHATBOT_CONFIG.theme.primaryColor }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Chat Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 bg-amber-400 rounded-full border-2 border-[#1E3A8A] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-18 right-0 w-[420px] max-w-[calc(100vw-2rem)] h-[580px] rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col backdrop-blur-xl bg-white/95"
            style={{ fontFamily: CHATBOT_CONFIG.theme.fontFamily }}
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center justify-between text-white relative shadow-md"
              style={{ backgroundColor: CHATBOT_CONFIG.theme.primaryColor }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                  SVC
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-tight">{CHATBOT_CONFIG.name}</h3>
                  <span className="text-xs text-blue-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Online Support
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {CHATBOT_CONFIG.features.enableHistoryClear && (
                  <button
                    onClick={clearHistory}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Clear Conversation"
                    aria-label="Clear Conversation"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-2">
                  <div className={`flex items-start gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm mt-0.5">
                        AI
                      </div>
                    )}
                    <div 
                      className={`p-3 max-w-[80%] rounded-2xl text-sm relative group shadow-sm ${
                        msg.sender === "user" 
                          ? "rounded-tr-none text-white" 
                          : "rounded-tl-none bg-white border border-slate-100"
                      }`}
                      style={{ 
                        backgroundColor: msg.sender === "user" ? CHATBOT_CONFIG.theme.secondaryColor : undefined,
                        color: msg.sender === "user" ? "#ffffff" : CHATBOT_CONFIG.theme.textColor
                      }}
                    >
                      <div>
                        {msg.sender === "bot" ? formatMessageText(msg.text) : msg.text}
                      </div>

                      {/* Msg Actions */}
                      {msg.sender === "bot" && CHATBOT_CONFIG.features.enableCopyResponse && (
                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="absolute -right-7 top-1 p-1 hover:bg-slate-200/80 rounded opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      
                      <div className={`text-[10px] mt-1 text-right ${msg.sender === "user" ? "text-blue-100" : "text-slate-400"}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Predefined / Suggested questions */}
                  {msg.sender === "bot" && msg.suggestions && msg.suggestions.length > 0 && CHATBOT_CONFIG.features.enableSuggestedQuestions && (
                    <div className="pl-10 pr-4 flex flex-wrap gap-2 pt-1">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSuggestionClick(sug)}
                          className="text-xs px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-100 text-blue-700 hover:text-blue-800 rounded-full transition-all text-left shadow-sm cursor-pointer hover:shadow flex items-center gap-1"
                        >
                          <CornerDownRight className="w-3 h-3 text-blue-400 shrink-0" />
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                    AI
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3.5 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask something about Sri Vidya Chetana..."
                className="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl cursor-pointer text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md focus:outline-none"
                style={{ backgroundColor: input.trim() ? CHATBOT_CONFIG.theme.primaryColor : undefined }}
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
