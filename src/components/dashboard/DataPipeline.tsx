"use client";

import { motion } from "framer-motion";
import { Database, Cpu, BrainCircuit, Split, Smartphone, BarChart3, Wand2 } from "lucide-react";

import { useEffect, useState } from "react";

const defaultNodes = [
  { id: "events", label: "Events", icon: Database, color: "text-blue-400", bg: "bg-blue-500/20", glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]", counter: "12.4k/s" },
  { id: "features", label: "Feature Engine", icon: Cpu, color: "text-indigo-400", bg: "bg-indigo-500/20", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]", counter: "12.4k/s" },
  { id: "brain", label: "Design Engine", icon: Wand2, color: "text-rose-400", bg: "bg-rose-500/20", glow: "shadow-[0_0_25px_rgba(244,63,94,0.8)]", counter: "99.8% conf" },
  { id: "decision", label: "Decision", icon: Split, color: "text-pink-400", bg: "bg-pink-500/20", glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]", counter: "10ms lat" },
  { id: "channels", label: "Channels", icon: Smartphone, color: "text-rose-400", bg: "bg-rose-500/20", glow: "shadow-[0_0_15px_rgba(244,63,94,0.5)]", counter: "3 active" },
  { id: "analytics", label: "Learning Loop", icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/20", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]", counter: "Syncing" },
];

export function DataPipeline() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("simulatorData");
      if (data) {
        const simData = JSON.parse(data);
        if (!simData.privacyRestricted) {
           setIsActive(true);
           setNodes([
             { id: "events", label: "Customer Signal", icon: Database, color: "text-blue-400", bg: "bg-blue-500/20", glow: "shadow-[0_0_25px_rgba(59,130,246,0.8)]", counter: "Session Context" },
             { id: "features", label: "Feature Engine", icon: Cpu, color: "text-indigo-400", bg: "bg-indigo-500/20", glow: "shadow-[0_0_15px_rgba(99,102,241,0.5)]", counter: `${simData.intent}` },
             { id: "brain", label: "Design Engine", icon: Wand2, color: "text-rose-400", bg: "bg-rose-500/20", glow: "shadow-[0_0_25px_rgba(244,63,94,0.8)]", counter: "Upsell Path" },
             { id: "decision", label: "Campaign", icon: Split, color: "text-pink-400", bg: "bg-pink-500/20", glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]", counter: "Personalized" },
             { id: "channels", label: "Response", icon: Smartphone, color: "text-rose-400", bg: "bg-rose-500/20", glow: "shadow-[0_0_25px_rgba(244,63,94,0.8)]", counter: simData.channel },
             { id: "analytics", label: "Learning Loop", icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/20", glow: "shadow-[0_0_30px_rgba(16,185,129,1)]", counter: `Eng: ${simData.engagement}%` },
           ]);
        }
      }
    } catch(e) {}
  }, []);
  return (
    <div className="glass-panel border border-white/5 rounded-2xl p-6 mb-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Omnichannel Intelligence Pipeline</h2>
          <p className="text-sm text-zinc-400">Real-time throughput and AI decision engine status</p>
        </div>
        <div className="flex justify-center items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
          <span className="text-xs font-semibold text-white">{isActive ? 'Learning Loop Active' : 'System Nominal'}</span>
        </div>
      </div>

      <div className="relative py-10 overflow-x-auto hide-scrollbar">
        <div className="min-w-[800px] flex justify-between items-center relative px-8">
          
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-16 right-16 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          {/* Animated pulsing lines */}
          <div className="absolute top-1/2 left-16 right-16 h-0.5 -translate-y-1/2 z-0 overflow-hidden">
            <motion.div 
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>

          {nodes.map((node, i) => (
            <div key={node.id} className="relative z-10 flex flex-col items-center group cursor-pointer">
              
              <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${node.bg} backdrop-blur-md border border-white/20 transition-all duration-300 ${node.glow}`}
              >
                <node.icon className={`w-8 h-8 ${node.color}`} />
              </motion.div>
              
              {/* Tooltip & Labels */}
              <div className="mt-4 text-center">
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{node.label}</div>
                <div className="text-xs font-mono text-zinc-500 mt-1">{node.counter}</div>
              </div>

              {/* Data Particles emitting from node */}
              <motion.div 
                className="absolute top-8 left-16 w-3 h-3 rounded-full bg-white/80 filter blur-[1px]"
                animate={{ x: 100, opacity: [0, 1, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  delay: i * 0.2,
                  ease: "easeInOut" 
                }}
                style={{ display: i === nodes.length - 1 ? 'none' : 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
