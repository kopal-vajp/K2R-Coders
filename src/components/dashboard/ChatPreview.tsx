"use client";

import { motion } from "framer-motion";
import { MessageCircle, MessageSquare, Camera as Instagram, CheckCheck } from "lucide-react";

export function ChatPreview() {
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
          <div className="flex-1 p-3 flex flex-col justify-end gap-3 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover bg-center bg-blend-overlay bg-black/80">
            <div className="self-start max-w-[85%] bg-white/10 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-sm p-2.5 text-xs text-white">
              Hi, I tried checking out but the promo code 'SUMMER24' didn't work.
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="self-end max-w-[85%] bg-green-600/90 backdrop-blur-md rounded-2xl rounded-tr-sm p-2.5 text-xs text-white shadow-lg"
            >
              Apologies for that! 'SUMMER24' expired yesterday, but I've just activated 'VIP24' for 20% off your cart. It's ready to use now!
              <div className="flex justify-end mt-1">
                <CheckCheck className="w-3 h-3 text-blue-300" />
              </div>
            </motion.div>
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
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="self-start max-w-[85%] bg-blue-600/90 backdrop-blur-md rounded-2xl rounded-bl-sm p-2.5 text-xs text-white shadow-lg relative"
            >
              Hi Sarah, your Sneaker X order has shipped! Track it here: link.io/trk. How did you find the checkout process?
            </motion.div>
            
            <div className="self-end px-3 py-1.5 bg-white/10 rounded-full flex gap-1 items-center">
              <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
              <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
              <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
            </div>
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
            <div className="self-start max-w-[85%] bg-white/10 backdrop-blur-md rounded-2xl p-2.5 text-xs text-white border border-white/5">
              Are these sustainable? I don't buy fast fashion.
            </div>
            
            <div className="self-end max-w-[85%] bg-zinc-800/90 backdrop-blur-md rounded-2xl p-2.5 text-xs text-white border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
              <span className="text-rose-400 text-[10px] uppercase font-bold block mb-1">Human Handoff</span>
              Hi there! Yes, all our materials are 100% recycled...
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
