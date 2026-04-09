"use client";

import { Settings, Sliders, BellOff, MessageCircle, Clock, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SettingsPage() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [fatigueSensitivity, setFatigueSensitivity] = useState<"Strict"|"Normal"|"Relaxed">("Strict");

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
          <section className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <h2 className="font-semibold text-white">Timing Optimization</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-zinc-300 mb-2 block">Standard Delay Window</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-indigo-500/50">
                  <option>2 Hours (Default)</option>
                  <option>1 Hour</option>
                  <option>4 Hours</option>
                  <option>Next Business Day</option>
                </select>
              </div>
              <div>
                 <label className="text-xs font-medium text-zinc-300 mb-2 block">Quiet Hours</label>
                 <div className="flex items-center gap-2">
                   <input type="time" defaultValue="22:00" className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white flex-1" />
                   <span className="text-zinc-500 text-xs">TO</span>
                   <input type="time" defaultValue="08:00" className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white flex-1" />
                 </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-4 pb-12">
            <button className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
              Reset Defaults
            </button>
            <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Save Configuration
            </button>
          </div>

      </div>
    </div>
  );
}
