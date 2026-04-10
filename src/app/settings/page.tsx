"use client";

import { Settings, Sliders, BellOff, MessageCircle, Clock, Workflow, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [fatigueSensitivity, setFatigueSensitivity] = useState<"Strict"|"Normal"|"Relaxed">("Strict");
  const [delayWindow, setDelayWindow] = useState("2 Hours (Default)");
  const [quietHourStart, setQuietHourStart] = useState("22:00");
  const [quietHourEnd, setQuietHourEnd] = useState("08:00");
  const [showToast, setShowToast] = useState(false);
  
  const [delayDropdownOpen, setDelayDropdownOpen] = useState(false);
  const delayDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (delayDropdownRef.current && !delayDropdownRef.current.contains(event.target as Node)) {
        setDelayDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("messageMindConfig");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        if (config.confidenceThreshold) setConfidenceThreshold(config.confidenceThreshold);
        if (config.fatigueSensitivity) setFatigueSensitivity(config.fatigueSensitivity);
        if (config.delayWindow) setDelayWindow(config.delayWindow);
        if (config.quietHourStart) setQuietHourStart(config.quietHourStart);
        if (config.quietHourEnd) setQuietHourEnd(config.quietHourEnd);
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    const config = { confidenceThreshold, fatigueSensitivity, delayWindow, quietHourStart, quietHourEnd };
    localStorage.setItem("messageMindConfig", JSON.stringify(config));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    setConfidenceThreshold(85);
    setFatigueSensitivity("Strict");
    setDelayWindow("2 Hours (Default)");
    setQuietHourStart("22:00");
    setQuietHourEnd("08:00");
  };

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform Variables</h1>
          <p className="text-sm text-zinc-400">Global constraints guiding AI decision generation.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 w-full max-w-4xl mx-auto">
          
          {/* Section: Core Model Thresholds */}
          <section className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4 flex items-center gap-2">
              <Sliders className="h-5 w-5 text-blue-400" />
              <h2 className="font-semibold text-white">AI Confidence Thresholds</h2>
            </div>
            <div className="p-6">
              <label className="flex items-center justify-between text-sm mb-4">
                <span className="font-medium text-zinc-300">Minimum Omnichannel Confidence</span>
                <span className="text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">{confidenceThreshold}%</span>
              </label>
              <input 
                type="range" 
                min="50" max="99" 
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full accent-blue-500 mb-2"
              />
              <p className="text-xs text-zinc-500">The master AI engine will default to 'Hold' if the aggregate confidence (Conversion vs Fatigue) falls below this threshold.</p>
            </div>
          </section>

          {/* Section: Fatigue Suppression limits */}
          <section className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4 flex items-center gap-2">
              <BellOff className="h-5 w-5 text-rose-400" />
              <h2 className="font-semibold text-white">Fatigue Suppression Sensitivity</h2>
            </div>
            <div className="p-6">
               <div className="grid grid-cols-3 gap-4">
                {["Strict", "Normal", "Relaxed"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFatigueSensitivity(mode as any)}
                    className={cn(
                      "p-4 rounded-xl border transition-all text-left flex flex-col gap-1",
                      fatigueSensitivity === mode 
                        ? "bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                        : "bg-black/20 border-white/5 hover:bg-white/5"
                    )}
                  >
                    <span className={cn("font-semibold text-sm", fatigueSensitivity === mode ? "text-white" : "text-zinc-400")}>{mode}</span>
                    <span className="text-xs text-zinc-500">
                      {mode === "Strict" ? "High cutoff (>55 score blocks messages)" : 
                       mode === "Normal" ? "Default cutoff (>85 score blocks messages)" : 
                       "Overrides blocks unless >95 score"}
                    </span>
                  </button>
                ))}
               </div>
            </div>
          </section>

          {/* Section: Channel Order */}
          <section className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <h2 className="font-semibold text-white">Fallback Priority Logic</h2>
            </div>
            <div className="p-6">
              <p className="text-xs text-zinc-400 mb-4">If preferred channel is unreachable or lacks consent, AI cascades down this list.</p>
              <div className="flex flex-col gap-2">
                {[
                  { rank: 1, name: "WhatsApp" },
                  { rank: 2, name: "SMS" },
                  { rank: 3, name: "Email" },
                  { rank: 4, name: "Instagram DM" }
                ].map(c => (
                  <div key={c.rank} className="flex items-center gap-4 bg-black/40 border border-white/5 p-3 rounded-lg">
                    <span className="text-xs font-mono text-zinc-500 w-4">{c.rank}.</span>
                    <span className="text-sm font-medium text-white">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Timing Settings */}
          <section className="glass-panel rounded-2xl border border-white/5 relative z-30">
            <div className="border-b border-white/5 bg-white/[0.02] rounded-t-2xl px-6 py-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <h2 className="font-semibold text-white">Timing Optimization</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="relative" ref={delayDropdownRef}>
                <label className="text-xs font-medium text-zinc-300 mb-2 block">Standard Delay Window</label>
                <div 
                  onClick={() => setDelayDropdownOpen(!delayDropdownOpen)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white cursor-pointer hover:border-indigo-500/50 transition-colors flex justify-between items-center shadow-inner"
                >
                  <span className="font-medium">{delayWindow}</span>
                  <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", delayDropdownOpen && "rotate-180")} />
                </div>
                <AnimatePresence>
                  {delayDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                      className="absolute w-full mt-2 bg-zinc-950 border border-white/10 rounded-xl overflow-hidden z-20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                    >
                      {["2 Hours (Default)", "1 Hour", "4 Hours", "Next Business Day"].map(opt => (
                        <div 
                          key={opt} 
                          onClick={() => { setDelayWindow(opt); setDelayDropdownOpen(false); }}
                          className={cn(
                            "px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-white/5",
                            delayWindow === opt ? "bg-indigo-500/10 text-indigo-400" : "text-white"
                          )}
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                 <label className="text-xs font-medium text-zinc-300 mb-2 block">Quiet Hours</label>
                 <div className="flex items-center gap-2">
                   <input type="time" value={quietHourStart} onChange={e => setQuietHourStart(e.target.value)} className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white flex-1 focus:outline-none focus:border-indigo-500/50" />
                   <span className="text-zinc-500 text-xs">TO</span>
                   <input type="time" value={quietHourEnd} onChange={e => setQuietHourEnd(e.target.value)} className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white flex-1 focus:outline-none focus:border-indigo-500/50" />
                 </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-4 pb-12">
            <button onClick={handleReset} className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
              Reset Defaults
            </button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Save Configuration
            </button>
          </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border border-blue-500/20 shadow-2xl rounded-xl p-4 flex items-center gap-3"
          >
            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400">
               <Settings className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Configuration Saved</p>
              <p className="text-xs text-zinc-400">Global defaults have been updated</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
