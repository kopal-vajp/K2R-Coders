"use client";

import { Bell, Sparkles, Lock, BarChart, Zap, Bot, CheckCircle2, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const NOTIFICATIONS = [
  { id: 1, text: "Dataset uploaded successfully", time: "Just now", icon: Bot, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 2, text: "User consent required", time: "2 min ago", icon: Lock, color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: 3, text: "Privacy mode enabled", time: "15 min ago", icon: Lock, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { id: 4, text: "New interaction recorded", time: "1 hour ago", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10" },
  { id: 5, text: "Identity mapped across channels", time: "3 hours ago", icon: Bot, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 6, text: "Engagement score updated", time: "5 hours ago", icon: BarChart, color: "text-purple-400", bg: "bg-purple-400/10" },
];

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'How may I help you today?' }
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = () => {
    setHasUnread(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const newMsg = { id: Date.now(), role: 'user', text: aiInput };

    // Calculate user message count before the state updates
    const userMessageCount = messages.filter(m => m.role === 'user').length;

    setMessages(prev => [...prev, newMsg]);
    setAiInput("");

    setTimeout(() => {
      if (userMessageCount === 0) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: "I have recorded your query and someone will contact you soon to resolve it. Our team is available 24/7! Sorry for the trouble, we will connect you to a human agent soon. Until then, please keep exploring our site more! 🚀✨"
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          text: "I sincerely apologize for the delay. If you need immediate assistance, please email us directly at support@messagemind-dummy.com. Until then, keep exploring! 🙏✨"
        }]);
      }
    }, 1000);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-16 w-full glass-panel border-x-0 border-t-0 rounded-none flex items-center justify-between px-6">
        <div className="flex items-center gap-4 ml-auto pl-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mr-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></span>
            </div>
            Admin Online
          </div>

          {/* Notifications */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 rounded-full transition-colors ${isOpen ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
            >
              <Bell className="h-5 w-5" />
              {hasUnread && (
                <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-[#0a0a0a]"></span>
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-80 rounded-xl border border-white/10 glass-panel bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    {hasUnread && (
                      <button
                        onClick={handleMarkAsRead}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-[320px] overflow-y-auto">
                    {NOTIFICATIONS.map((notification, idx) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer ${idx !== NOTIFICATIONS.length - 1 ? 'border-b border-white/5' : ''}`}
                        >
                          <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${notification.bg} ${notification.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-zinc-200 leading-tight pr-2">{notification.text}</p>
                            <p className="text-xs text-zinc-500">{notification.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsAiOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-purple-400 group relative"
          >
            <Sparkles className="h-5 w-5" />
            <motion.div
              className="absolute inset-0 bg-purple-500 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity"
              initial={false}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isAiOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAiOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[400px] z-[100] bg-[#0a0a0a]/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">MessageMind AI</h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      Agent Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsAiOpen(false)} className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center border ${msg.role === 'user' ? 'bg-zinc-800 border-white/10' : 'bg-purple-500/20 border-purple-500/30'}`}>
                      {msg.role === 'user' ? <User className="h-4 w-4 text-zinc-300" /> : <Bot className="h-4 w-4 text-purple-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-zinc-800 text-zinc-200 rounded-tr-sm' : 'bg-purple-500/10 border border-purple-500/20 text-white rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/10 bg-black/60">
                <form onSubmit={handleAiSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask AI anything..."
                    className="w-full bg-zinc-900 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
                  />
                  <button type="submit" disabled={!aiInput.trim()} className="absolute right-1.5 p-1.5 bg-purple-500 hover:bg-purple-400 disabled:opacity-50 disabled:hover:bg-purple-500 text-white rounded-full transition-colors">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
