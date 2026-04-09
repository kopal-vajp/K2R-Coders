"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Smartphone, Send, Settings, Check, CheckCheck, MoreVertical, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "WhatsApp" | "SMS" | "Instagram";

export default function ChatSimulatorPage() {
  const [channel, setChannel] = useState<Channel>("WhatsApp");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: "system", text: "Today 10:41 AM" },
    { id: 2, sender: "brand", text: "Hi Elena! We noticed you left the HyperKnit Soles in your cart. Still interested?", time: "10:41 AM", status: "read" },
    { id: 3, sender: "user", text: "Yes, but I was wondering about the shipping time to NY?", time: "10:45 AM" },
    { id: 4, sender: "brand", text: "Standard shipping to New York takes 2-3 business days. If you order in the next hour, we'll upgrade you to overnight shipping for free!", time: "10:46 AM", status: "delivered", cta: "Claim Free Overnight Shipping" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), sender: "user", text: inputValue, time: "Just now" };
    setMessages([...messages, newMsg]);
    setInputValue("");

    // Simulate AI typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "brand", text: "Thanks! Let me connect you with a live agent to finalize your expedited order.", time: "Just now", status: "sent" }
      ]);
    }, 2000);
  };

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Omnichannel Simulator</h1>
          <p className="text-sm text-zinc-400">Test and preview AI-generated dialogues across native device interfaces.</p>
        </div>

        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
          {(["WhatsApp", "SMS", "Instagram"] as Channel[]).map((c) => (
            <button
              key={c}
              onClick={() => setChannel(c)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                channel === c
                  ? "bg-white/10 text-white shadow-md"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl items-start">

          {/* Left Panel: Configuration */}
          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-xl border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-400" />
                Simulation Parameters
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Target Persona</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500/50">
                    <option>Elena Markush (Hesitant Buyer)</option>
                    <option>Chloe Vance (Platinum VIP)</option>
                    <option>Samuel T. (Discount Seeker)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Escalation Threshold</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="0" max="100" defaultValue="85" className="flex-1 accent-indigo-500" />
                    <span className="text-sm font-mono text-indigo-400">85%</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">AI hands off to human agent if frustration detected over 85%.</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Dynamic Variables Passed</label>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">cart_abandon_time: 2h</span>
                    <span className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">location: NY</span>
                    <span className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">loyalty_tier: Silver</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Phone Frame Mockup */}
          <div className="flex justify-center">
            <div className="relative w-[340px] h-[700px] bg-black rounded-[40px] border-[8px] border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">

              {/* Fake Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20" />

              {/* App Header (WhatsApp styling for demo) */}
              <div className={cn(
                "pt-10 pb-3 px-4 flex items-center justify-between z-10 shrink-0",
                channel === "WhatsApp" ? "bg-[#075E54] text-white" :
                  channel === "SMS" ? "bg-zinc-900 text-white border-b border-white/10" :
                    "bg-black text-white border-b border-white/10"
              )}>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    {channel === "Instagram" ? <img src="https://i.pravatar.cc/100?u=brand" alt="Brand" className="w-full h-full object-cover" /> : "NI"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Nike Store</span>
                    {channel === "WhatsApp" && <span className="text-[10px] text-white/70">Online</span>}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <Video className="h-5 w-5" />
                  <Phone className="h-4 w-4" />
                  <MoreVertical className="h-5 w-5" />
                </div>
              </div>

              {/* Chat Body */}
              <div className={cn(
                "flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative",
                channel === "WhatsApp" ? "bg-[#E5DDD5]" : "bg-black"
              )}>
                {/* Background Pattern for WA */}
                {channel === "WhatsApp" && (
                  <div className="absolute inset-0 opacity-10 bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-repeat" />
                )}

                <AnimatePresence>
                  {messages.map((msg, idx) => {
                    if (msg.type === "system") {
                      return (
                        <div key={idx} className="flex justify-center my-2 relative z-10">
                          <span className="bg-black/20 text-white/70 text-[10px] px-3 py-1 rounded-lg backdrop-blur-sm">
                            {msg.text}
                          </span>
                        </div>
                      );
                    }

                    const isBrand = msg.sender === "brand";
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={cn(
                          "relative z-10 max-w-[80%] flex flex-col",
                          isBrand ? "self-start" : "self-end"
                        )}
                      >
                        <div className={cn(
                          "px-3 py-2 rounded-xl text-[13px] shadow-sm relative",
                          isBrand
                            ? channel === "WhatsApp" ? "bg-white text-black rounded-tl-sm" : channel === "SMS" ? "bg-zinc-800 text-white" : "bg-zinc-900 border border-white/10 text-white"
                            : channel === "WhatsApp" ? "bg-[#DCF8C6] text-black rounded-tr-sm" : channel === "SMS" ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
                        )}>
                          {msg.text}

                          <div className={cn(
                            "flex items-center justify-end gap-1 mt-1",
                            isBrand && channel === "WhatsApp" ? "text-zinc-400" : "text-white/60"
                          )}>
                            <span className="text-[9px]">{msg.time}</span>
                            {isBrand && msg.status && (
                              msg.status === "read" ? <CheckCheck className="h-3 w-3 text-blue-500" /> :
                                msg.status === "delivered" ? <CheckCheck className="h-3 w-3" /> :
                                  <Check className="h-3 w-3" />
                            )}
                          </div>
                        </div>

                        {/* CTA Mockup */}
                        {msg.cta && (
                          <div className="mt-1 w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xs font-semibold py-2 text-center rounded-lg shadow transition-colors z-20 relative">
                            {msg.cta}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="self-start bg-zinc-800 rounded-full px-4 py-2 mt-2"
                    >
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Input Area */}
              <div className="shrink-0 bg-zinc-900 p-3 pt-2">
                <div className="flex items-center gap-2 bg-black rounded-full px-4 py-2 border border-white/10">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSend}
                    className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 hover:bg-blue-600 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

      </div>
    </div>
  );
}
