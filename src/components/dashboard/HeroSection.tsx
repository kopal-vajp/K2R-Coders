"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full py-12 lg:py-20 flex flex-col items-center justify-center overflow-hidden rounded-2xl glass-panel border border-white/5 mb-8">
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Floating Background Particles Simulation */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-30">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[20%] right-[-10%] w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[30%] w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          <span>Real-Time AI Decision Engine</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">Real-Time Identity</span>
          <br className="hidden md:block" />
          <span className="text-white"> & Growth Engine</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          More than an analytics dashboard—a unified ML orchestration system. Transform scattered signals into <span className="text-emerald-400 font-medium">measurable business growth</span> by powering personalization, cross-channel identity mapping, and continuous optimization at enterprise scale.
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
          
          <Link href="/chat-simulator" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 rounded-full glass-panel-glow border-white/10 text-white font-semibold flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              View Real-time Simulation
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
