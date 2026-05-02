"use client";

import { motion } from "framer-motion";
import { Persona } from "./mockPersonas";
import { BrainCircuit, Zap, Target, TrendingDown, Wand2 } from "lucide-react";

function RadialGauge({ value, label, color, icon: Icon }: { value: number, label: string, color: string, icon: any }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-4 h-4 mb-0.5 ${color}`} />
          <span className="text-sm font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-[10px] uppercase text-zinc-400 mt-2 font-semibold tracking-wider">{label}</span>
    </div>
  );
}

function DecisionLogicTree({ persona }: { persona: Persona }) {
  return (
    <div className="py-6 relative flex flex-col items-center">

      {/* Nodes container rendered cleanly */}
      <div className="w-full flex flex-col gap-6">
        {[
          { step: "Evaluate Context", result: `Cart: $${persona.session.cartValue} (High Intent)` },
          { step: "Fatigue Check", result: `${persona.ai.fatigueRisk}% Risk (Clear to send)` },
          { step: "Channel Selection", result: `Selected: ${persona.output.platform}` },
          { step: "Timing Optimizer", result: persona.ai.bestTiming }
        ].map((node, i) => (
          <div key={i} className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.4, duration: 0.5 }}
              className="glass-panel px-4 py-2 flex flex-col items-center w-64 border border-white/10 group hover:border-blue-500/50 transition-colors shadow-2xl bg-zinc-950 backdrop-blur-xl"
            >
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">{node.step}</span>
              <span className="text-xs text-white font-medium text-center">{node.result}</span>
              <motion.div
                className="absolute -inset-px rounded-xl border border-blue-500 opacity-0 group-hover:opacity-50 pointer-events-none"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIPredictionCore({ persona }: { persona: Persona }) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <motion.div
        key={persona.id + "-meters"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel p-5 border border-white/5 flex flex-col items-center"
      >
        <div className="flex items-center gap-2 mb-6 w-full justify-center">
          <Wand2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Design Engine</h2>
        </div>

        <div className="flex justify-around w-full">
          <RadialGauge value={persona.ai.conversionProb} label="Conversion Prob" color="text-emerald-400" icon={Target} />
          <RadialGauge value={persona.ai.fatigueRisk} label="Fatigue Risk" color="text-rose-400" icon={TrendingDown} />
        </div>
      </motion.div>

      <div className="flex-1 glass-panel px-5 py-2 border border-white/5 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 py-3 border-b border-white/5 w-full justify-center mb-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Logic Tree</span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <DecisionLogicTree persona={persona} />
        </div>
      </div>

      <motion.div
        key={persona.id + "-recommendation"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="glass-panel p-6 border border-blue-500/30 relative overflow-hidden bg-blue-950/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Consensus Recommendation</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">Deploy Channel</span>
            <div className="text-lg font-bold text-white tracking-tight">{persona.ai.bestChannel}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">Send Timing</span>
            <div className="text-sm font-bold text-white">{persona.ai.bestTiming}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">Message Tone</span>
            <div className="text-sm border border-white/10 px-2 py-1 rounded bg-white/5 text-white w-fit">{persona.ai.tone}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold">Confidence</span>
            <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {persona.ai.confidence}%
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
