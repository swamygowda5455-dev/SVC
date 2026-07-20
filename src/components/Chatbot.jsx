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

  // RAG Search Matching Algorithm
  const retrieveAnswer = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    let bestQA = null;
    let maxScore = -1;

    // Detect if this is likely a follow-up query
    const followUpPronouns = ["phone", "email", "address", "number", "duration", "eligibility", "its", "their", "them", "who is", "what is the"];
    const isFollowUp = previousCategory && followUpPronouns.some(p => lowerQuery.includes(p));

    searchIndex.forEach(qa => {
      let score = 0;

      // 1. Exact matches on keywords
      qa.keywords.forEach(keyword => {
        if (lowerQuery === keyword) {
          score += 150;
        } else if (lowerQuery.includes(keyword)) {
          score += 40;
        }
      });

      // 2. Exact match on question text
      if (lowerQuery === qa.question.toLowerCase().trim()) {
        score += 200;
      } else if (qa.question.toLowerCase().includes(lowerQuery)) {
        score += 80;
      }

      // 3. Token overlap
      const tokens = lowerQuery.split(/\s+/).filter(t => t.length > 2);
      tokens.forEach(token => {
        // Boost for matching keywords
        qa.keywords.forEach(k => {
          if (k.includes(token)) score += 15;
        });
        // Boost for question text match
        if (qa.question.toLowerCase().includes(token)) {
          score += 8;
        }
        // Small boost for answer text match
        if (qa.answer.toLowerCase().includes(token)) {
          score += 2;
        }
      });

      // 4. Follow-up context boost (Category focus)
      if (isFollowUp && qa.category === previousCategory) {
        score += 35;
      }

      if (score > maxScore) {
        maxScore = score;
        bestQA = qa;
      }
    });

    const scoreThreshold = CHATBOT_CONFIG.retrieval.scoreThreshold * 100;
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
        className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer text-white relative focus:outline-none focus:ring-4 focus:ring-blue-300"
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
              <X className="w-6 h-6" />
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
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3.w-3 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
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
