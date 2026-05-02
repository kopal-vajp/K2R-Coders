"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Persona } from "./mockPersonas";
import { MessageCircle, MessageSquare, Camera as Instagram, Mail, ChevronDown, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

function ExplainabilityDrawer({ persona }: { persona: Persona }) {
  const [isOpen, setIsOpen] = useState(false);

  const factors = [
    { label: "Purchase History", detail: "High frequency buyer (+22% conviction)", type: "positive" },
    { label: "Fatigue State", detail: `Currently at ${persona.ai.fatigueRisk}% capacity limit`, type: persona.ai.fatigueRisk < 50 ? "positive" : "negative" },
    { label: "Consent Available", detail: `Prefers ${persona.preferredChannel}`, type: "neutral" },
  ];

  return (
    <div className="glass-panel border border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">Why this decision?</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-2 space-y-3 border-t border-white/5">
              {factors.map((f, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]",
                      f.type === 'positive' && "bg-emerald-400 shadow-emerald-400",
                      f.type === 'negative' && "bg-rose-400 shadow-rose-400",
                      f.type === 'neutral' && "bg-blue-400 shadow-blue-400"
                    )} />
                    <span className="text-xs font-bold text-white">{f.label}</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 pl-3.5">{f.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect } from "react";

export function MessageWorkspace({ persona }: { persona: Persona }) {
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setSendStatus("idle");
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?personaId=${persona.id}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Failed to fetch messages");
        setMessages([]);
      }
    };
    fetchMessages();
  }, [persona.id]);

  const handleSend = async () => {
    setSendStatus("sending");
    try {
      await fetch('/api/messages/send', { method: 'POST', body: JSON.stringify({ personaId: persona.id }) });
      setSendStatus("sent");
    } catch (error) {
      console.error("Failed to send message");
      setSendStatus("idle");
    }
  };
  const tabs = [
    { id: "WhatsApp", icon: MessageCircle, color: "text-green-400", bg: "bg-[#075E54]/40" },
    { id: "SMS", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/20" },
    { id: "Instagram", icon: Instagram, color: "text-pink-400", bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20" },
    { id: "Email", icon: Mail, color: "text-zinc-400", bg: "bg-zinc-500/20" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="glass-panel border border-white/5 flex flex-col overflow-hidden h-[450px]">

        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-black/20">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={cn(
                "flex-1 py-3 flex items-center justify-center gap-2 text-xs font-semibold cursor-default transition-colors",
                persona.output.platform === tab.id ? "bg-white/10 text-white shadow-inner border-b-2 border-blue-500" : "text-zinc-500 opacity-50"
              )}
            >
              <tab.icon className={cn("w-3.5 h-3.5", persona.output.platform === tab.id && tab.color)} />
              <span className="hidden xl:inline">{tab.id}</span>
            </div>
          ))}
        </div>

        {/* Message Preview Area */}
        <div className="flex-1 bg-black/60 relative p-4 flex flex-col justify-end gap-3 custom-scrollbar overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-10 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={persona.id + "-msg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-10 flex flex-col gap-3 w-full"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id || i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className={cn(
                    "max-w-[85%] backdrop-blur-md p-3 text-sm text-white shadow-lg",
                    msg.sender === "user" ? "self-start bg-white/10 rounded-2xl rounded-tl-sm border border-white/5" : "self-end rounded-2xl rounded-tr-sm",
                    msg.sender !== "user" && persona.output?.platform === "WhatsApp" && "bg-green-600/90",
                    msg.sender !== "user" && persona.output?.platform === "SMS" && "bg-blue-600/90",
                    msg.sender !== "user" && persona.output?.platform === "Instagram" && "bg-zinc-800/90 border border-white/10",
                    msg.sender !== "user" && persona.output?.platform === "Email" && "bg-zinc-100 text-black w-full"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Bar */}
        <div className="p-3 bg-black border-t border-white/5 flex gap-2 w-full justify-between items-center z-20">
          <div className="text-xs font-semibold text-zinc-400 uppercase">
            Est. Reply Rate: <span className="text-blue-400">{persona.output?.replyRate || 0}%</span>
          </div>
          <button
            onClick={handleSend}
            disabled={sendStatus !== "idle"}
            className={cn(
              "text-xs font-bold px-4 py-2 rounded shadow-lg transition-all duration-300 transform",
              sendStatus === "idle" ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer hover:bg-zinc-200" :
                sendStatus === "sending" ? "bg-zinc-800 text-zinc-400 cursor-wait border border-white/10" :
                  "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            )}
          >
            {sendStatus === "idle" ? "Approve & Send" : sendStatus === "sending" ? "Orchestrating..." : "Message Deployed ✓"}
          </button>
        </div>
      </div>

      <ExplainabilityDrawer persona={persona} />

      {/* Impact Panel */}
      <motion.div
        key={persona.id + "-impact"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-panel border-emerald-500/30 p-5 mt-auto flex flex-col justify-center bg-emerald-950/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Projected Output ROI</h3>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-emerald-400">+{persona.ai.expectedUplift}%</span>
            <span className="text-[10px] uppercase font-semibold text-zinc-400 line-through decoration-rose-500/50">Suppression Mode OFF</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white mb-0.5">Retained User</div>
            <div className="text-[10px] text-zinc-400">vs Control Group</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
