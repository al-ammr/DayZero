import { GoogleGenAI } from '@google/genai';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Loader2, 
  Sparkles, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Compass, 
  Zap, 
  ChevronDown,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Phase } from '../constants';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiPathAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activePhase?: Phase;
  activeTrack?: 'fullstack' | 'video' | 'marketing' | null;
  completedTasksCount?: number;
  totalTasksCount?: number;
  onNavigatePhase?: (phaseId: string) => void;
}

export default function AiPathAssistant({
  isOpen,
  onClose,
  activePhase,
  activeTrack,
  completedTasksCount = 0,
  totalTasksCount = 0,
  onNavigatePhase
}: AiPathAssistantProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('dayzero_assistant_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Save chat to localStorage
  useEffect(() => {
    localStorage.setItem('dayzero_assistant_chat', JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem('dayzero_assistant_chat');
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    try {
      const trackName = activeTrack === 'video' 
        ? 'AI Video Animation' 
        : activeTrack === 'marketing' 
        ? 'Digital Marketing' 
        : 'Full-Stack AI Developer';

      const phasePayload = activePhase ? {
        track: trackName,
        number: activePhase.number,
        title: activePhase.title,
        objective: activePhase.objective,
        totalTasks: activePhase.tasks.length,
        completedCount: completedTasksCount
      } : {
        track: trackName,
        title: 'General Overview / Dashboard',
        completedCount: completedTasksCount
      };

      // 1. First attempt: call full-stack server-side endpoint /api/chat
      let responseText = '';
      let fetchSuccess = false;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            phaseInfo: phasePayload,
            history: messages.slice(-6).map(m => ({ role: m.role, text: m.text }))
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            responseText = data.text;
            fetchSuccess = true;
          } else if (data.error) {
            throw new Error(data.error);
          }
        } else {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with status ${res.status}`);
        }
      } catch (serverErr: any) {
        console.warn('Server-side chat failed, falling back to client-side:', serverErr);
        
        // 2. Second attempt: Client-side fallback if server is unreachable (e.g. static hosting)
        try {
          // @ts-ignore
          const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
          if (!apiKey) {
             throw new Error('API Key missing. Server is unreachable and no client key is available.');
          }

          const ai = new GoogleGenAI({ apiKey });
          
          let systemInstruction = `You are the expert AI Path Assistant for TechOptyx (The Builder Operating System for AI, Video Animation, and Digital Marketing).
Your mission is to guide builders with concrete, battle-tested, actionable advice on building, launching, and monetizing projects.
Tone: Direct, encouraging, technical yet approachable, focused on execution, real revenue, and shipped deliverables. No fluff or repetitive pleasantries. Format answers cleanly with markdown headings, bullet points, and code/prompt blocks where appropriate.`;

          if (activePhase) {
            systemInstruction += `\n\nCURRENT USER CONTEXT:
- Track: ${trackName}
- Current Phase/Module: Phase/Module ${activePhase.number}: ${activePhase.title}
- Objective: ${activePhase.objective || "Not specified"}
- Total Tasks in Phase: ${activePhase.tasks.length || 0}
- Overall Progress: ${completedTasksCount} tasks completed`;
          }

          const prompt = `${systemInstruction}

${messages.length > 0 
  ? "PREVIOUS CONVERSATION:\n" + messages.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join("\n\n") + "\n\n"
  : ""}
User Query: ${textToSend}

Actionable Assistant Response:`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });

          if (response.text) {
             responseText = response.text;
             fetchSuccess = true;
          } else {
             throw new Error('Empty response from model.');
          }
        } catch (clientErr: any) {
           throw new Error(clientErr?.message || serverErr?.message || 'Unable to communicate with the assistant.');
        }
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        text: `⚠️ **Unable to connect to the AI model.**\n\n${error.message || 'Please check your internet connection or verify your API key configuration.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick suggestion prompts based on current context
  const quickPrompts = [
    {
      label: '💰 How do I monetize this phase?',
      prompt: `In Phase ${activePhase?.number || ''} (${activePhase?.title || 'current phase'}), what are the top 3 concrete ways to monetize these deliverables with clients or SaaS?`
    },
    {
      label: '⚡ Break down next actionable steps',
      prompt: `Given my current phase: ${activePhase?.title || 'my current milestone'}, give me a step-by-step 24-hour sprint plan to execute the key deliverable.`
    },
    {
      label: '🛠️ Recommended tools & architecture',
      prompt: `What are the best modern AI tools, libraries, and frameworks to build the projects required in Phase ${activePhase?.number || ''}?`
    },
    {
      label: '📝 Production prompt templates',
      prompt: `Provide 2 battle-tested, highly effective prompt templates I can use directly for the deliverables in ${activePhase?.title || 'this track'}.`
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ai-assistant-modal"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={cn(
            // Responsive mobile bottom-sheet & desktop floating window
            "fixed z-50 flex flex-col overflow-hidden bg-surface-container/95 backdrop-blur-2xl border border-outline-variant/30 shadow-2xl transition-all duration-300",
            // Mobile styling (< 640px): Safe bottom dock filling width cleanly
            "inset-x-3 bottom-3 top-14 rounded-3xl sm:top-auto sm:inset-auto sm:bottom-24 sm:right-6",
            // Desktop dimensions: Standard vs Expanded
            isExpanded
              ? "sm:w-[680px] sm:h-[720px] sm:rounded-3xl"
              : "sm:w-[460px] sm:h-[620px] sm:rounded-3xl"
          )}
        >
          {/* Header */}
          <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-outline-variant/20 bg-surface-container-high/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0 w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px] shadow-sm">
                <div className="w-full h-full rounded-[11px] bg-surface flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-surface animate-pulse" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-on-surface tracking-tight truncate">
                    AI Path Assistant
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-primary/10 text-primary border border-primary/20">
                    Gemini 3.8
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant/80 truncate font-mono">
                  {activePhase ? `Phase ${activePhase.number}: ${activePhase.title}` : 'DayZero Builder OS'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse to default" : "Expand window"}
                className="hidden sm:flex p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                title="Close assistant"
                className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors ml-1"
              >
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          {activePhase && (
            <div className="px-4 py-2 sm:px-5 bg-primary-container/10 border-b border-outline-variant/10 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 truncate text-xs">
                <Compass className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-on-surface-variant truncate">
                  Context locked to <strong className="text-on-surface font-semibold">PH {activePhase.number}</strong> ({activePhase.tasks.length} tasks)
                </span>
              </div>
              <span className="text-[10px] font-mono text-primary font-medium px-2 py-0.5 rounded bg-primary/10 border border-primary/20 shrink-0">
                Active
              </span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar text-sm">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-6 px-2 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-surface-container-highest/80 border border-outline-variant/20 flex items-center justify-center text-primary shadow-sm">
                  <Sparkles className="w-7 h-7" />
                </div>
                
                <div className="max-w-sm space-y-1.5">
                  <h4 className="font-bold text-base text-on-surface">
                    How can I assist your build today?
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    I have full context on your curriculum, tasks, code patterns, and monetization goals.
                  </p>
                </div>

                {/* Quick Prompts */}
                <div className="w-full max-w-md space-y-2 pt-2 text-left">
                  <span className="text-[11px] font-mono font-medium text-on-surface-variant uppercase tracking-wider block px-1">
                    Quick Execution Prompts
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {quickPrompts.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.prompt)}
                        className="w-full text-left p-2.5 sm:p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-outline-variant/15 text-xs text-on-surface hover:text-primary transition-all flex items-center justify-between group shadow-sm"
                      >
                        <span className="font-medium truncate mr-2">{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col group",
                    msg.role === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-on-surface-variant/70">
                      {msg.role === 'user' ? 'You' : 'DayZero AI'}
                    </span>
                    <span className="text-[9px] font-mono text-on-surface-variant/40">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "relative rounded-2xl px-4 py-3 max-w-[92%] sm:max-w-[85%] leading-relaxed break-words shadow-sm",
                      msg.role === 'user'
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-surface-container-highest/90 text-on-surface rounded-tl-none border border-outline-variant/15"
                    )}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-invert prose-sm max-w-none space-y-2 text-xs sm:text-sm">
                        <Markdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 text-on-surface leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1 text-on-surface">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1 text-on-surface">{children}</ol>,
                            li: ({ children }) => <li className="text-on-surface-variant">{children}</li>,
                            strong: ({ children }) => <strong className="font-bold text-on-surface">{children}</strong>,
                            h3: ({ children }) => <h3 className="font-bold text-sm text-primary mt-3 mb-1">{children}</h3>,
                            h4: ({ children }) => <h4 className="font-bold text-xs text-secondary mt-2 mb-1">{children}</h4>,
                            code: ({ inline, children, ...props }: any) => {
                              if (inline) {
                                return (
                                  <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-secondary border border-outline-variant/20" {...props}>
                                    {children}
                                  </code>
                                );
                              }
                              return (
                                <div className="my-2 rounded-xl bg-surface border border-outline-variant/20 p-3 overflow-x-auto font-mono text-[11px] text-on-surface">
                                  <code>{children}</code>
                                </div>
                              );
                            }
                          }}
                        >
                          {msg.text}
                        </Markdown>

                        {/* Copy button for assistant responses */}
                        <div className="pt-2 mt-2 border-t border-outline-variant/10 flex items-center justify-end">
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-on-surface-variant hover:text-primary transition-colors py-0.5 px-2 rounded hover:bg-surface-container"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-secondary" />
                                <span className="text-secondary">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[10px] font-mono text-on-surface-variant/70 px-1">
                  DayZero AI
                </span>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-surface-container-highest border border-outline-variant/15 flex items-center gap-2.5 text-on-surface-variant">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-xs font-mono">Synthesizing execution plan...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 sm:p-4 border-t border-outline-variant/20 bg-surface-container-high/60 shrink-0">
            {/* Quick action chips when conversation is active */}
            {messages.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 custom-scrollbar text-[11px]">
                <button
                  onClick={() => handleSendMessage(`What are the key pitfalls to avoid in Phase ${activePhase?.number || ''}?`)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant hover:text-on-surface transition-colors truncate"
                >
                  ⚠️ Common Pitfalls
                </button>
                <button
                  onClick={() => handleSendMessage(`Give me a client pitch script for the output of Phase ${activePhase?.number || ''}`)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-highest border border-outline-variant/15 text-on-surface-variant hover:text-on-surface transition-colors truncate"
                >
                  💼 Client Pitch Script
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <textarea
                ref={inputRef as any}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={activePhase ? `Ask about Phase ${activePhase.number} or monetization...` : "Ask any question..."}
                className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-2xl py-3 pl-4 pr-12 text-xs sm:text-sm focus:outline-none focus:border-primary/60 transition-all text-on-surface placeholder:text-on-surface-variant/60 resize-none max-h-28"
              />
              <button
                type="submit"
                disabled={isTyping || !inputMessage.trim()}
                title="Send question"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 transition-all shadow-sm"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant/50 pt-1.5 px-1">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span className="hidden sm:inline">Powered by Gemini 3.8</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
