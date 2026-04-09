"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full py-12 lg:py-20 flex flex-col items-center justify-center overflow-hidden rounded-2xl glass-panel border border-white/5 mb-8">
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6">
          <Zap className="h-4 w-4 text-blue-400" />
          <span className="text-blue-100">Introducing MessageMind v2.0</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">Predict &bull; Decide</span>
          <br className="hidden md:block" />
          <span className="text-white"> Personalize &bull; Explain</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          The omnichannel AI messaging intelligence platform that eliminates decision fatigue. Automatically route, tailor, and time your customer interactions with enterprise-grade confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Deploy AI Engine
            <ArrowRight className="h-4 w-4" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel-glow border-white/10 text-white font-semibold flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            View Real-time Simulation
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
