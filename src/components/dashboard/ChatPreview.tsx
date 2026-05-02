"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MessageSquare, Camera as Instagram, CheckCheck } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
}

interface MessagesState {
  whatsapp: Message[];
  sms: Message[];
  instagram: Message[];
}

export function ChatPreview() {
  const [messages, setMessages] = useState<MessagesState>({ whatsapp: [], sms: [], instagram: [] });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages");
      }
    };
    fetchMessages();
  }, []);
  return (
    <div className="glass-panel border border-white/5 rounded-2xl p-6 h-[400px] flex flex-col mb-8 lg:mb-0">
      <h3 className="text-lg font-bold text-white mb-6">Omnichannel Simulator</h3>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* WhatsApp Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(34,197,94,0.3)" }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/50 flex flex-col overflow-hidden relative group"
        >
          <div className="h-10 bg-[#075E54]/40 flex items-center px-3 border-b border-white/5 shrink-0">
            <MessageCircle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-xs font-medium text-white">WhatsApp</span>
            <div className="ml-auto flex items-center gap-1 bg-green-500/20 px-1.5 py-0.5 rounded text-[9px] text-green-400 font-bold border border-green-500/30">
              98% CONF
            </div>
          </div>
          <div className="flex-1 p-3 flex flex-col justify-end gap-3 bg-gradient-to-b from-[#075E54]/10 to-black/80">
            {messages.whatsapp.map((msg, i) => (
              <motion.div
                key={msg.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.5 }}
                className={`max-w-[85%] backdrop-blur-md p-2.5 text-xs text-white shadow-lg ${
                  msg.sender === "user" 
                    ? "self-start bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm" 
                    : "self-end bg-green-600/90 rounded-2xl rounded-tr-sm"
                }`}
              >
                {msg.text}
                {msg.sender === "agent" && (
                  <div className="flex justify-end mt-1">
                    <CheckCheck className="w-3 h-3 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SMS Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(59,130,246,0.3)" }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/50 flex flex-col overflow-hidden relative group"
        >
          <div className="h-10 bg-blue-500/20 flex items-center px-3 border-b border-white/5 shrink-0">
            <MessageSquare className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-xs font-medium text-white">SMS</span>
            <div className="ml-auto flex items-center gap-1 bg-blue-500/20 px-1.5 py-0.5 rounded text-[9px] text-blue-400 font-bold border border-blue-500/30">
              95% CONF
            </div>
          </div>
          <div className="flex-1 p-3 flex flex-col justify-end gap-3 bg-black/40">
            {messages.sms.map((msg, i) => (
              <motion.div
                key={msg.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.5 }}
                className={`max-w-[85%] backdrop-blur-md p-2.5 text-xs text-white shadow-lg relative ${
                  msg.sender === "user"
                    ? "self-end bg-white/10 rounded-2xl rounded-br-sm"
                    : "self-start bg-blue-600/90 rounded-2xl rounded-bl-sm"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instagram Card */}
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(236,72,153,0.3)" }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/50 flex flex-col overflow-hidden relative group"
        >
          <div className="h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center px-3 border-b border-white/5 shrink-0">
            <Instagram className="w-4 h-4 text-pink-400 mr-2" />
            <span className="text-xs font-medium text-white">IG Direct</span>
            <div className="ml-auto flex flex-col items-end">
              <div className="flex items-center gap-1 bg-pink-500/20 px-1.5 py-0.5 rounded text-[9px] text-pink-400 font-bold border border-pink-500/30">
                AI PAUSED
              </div>
            </div>
          </div>
          <div className="flex-1 p-3 flex flex-col justify-end gap-3 bg-black/40">
            {messages.instagram.map((msg, i) => (
              <motion.div
                key={msg.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.5 }}
                className={`max-w-[85%] backdrop-blur-md p-2.5 text-xs text-white ${
                  msg.sender === "user"
                    ? "self-start bg-white/10 rounded-2xl border border-white/5"
                    : "self-end bg-zinc-800/90 rounded-2xl border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                }`}
              >
                {msg.sender === "agent" && (
                  <span className="text-rose-400 text-[10px] uppercase font-bold block mb-1">Human Handoff</span>
                )}
                {msg.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
