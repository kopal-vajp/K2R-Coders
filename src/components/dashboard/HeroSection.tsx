"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2, X, Wand2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DEPLOY_STEPS = [
  "Connecting data...",
  "Mapping identities...",
  "Applying privacy rules...",
  "Starting optimization..."
];

export function HeroSection() {
  const router = useRouter();
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [deployStepIndex, setDeployStepIndex] = useState(-1);
  const [isDeploySuccess, setIsDeploySuccess] = useState(false);
  const [engineRunning, setEngineRunning] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const startDeployment = () => {
    if (engineRunning) return; // Prevent re-deployment if already running
    setIsDeployModalOpen(true);
    setDeployStepIndex(0);
    setIsDeploySuccess(false);
  };

  useEffect(() => {
    if (isDeployModalOpen && !isDeploySuccess) {
      if (deployStepIndex < DEPLOY_STEPS.length) {
        const timer = setTimeout(() => {
          setDeployStepIndex(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsDeploySuccess(true);
          setEngineRunning(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [isDeployModalOpen, deployStepIndex, isDeploySuccess]);

  const handleCloseModal = () => {
    setIsDeployModalOpen(false);
    if (isDeploySuccess && !engineRunning) {
      // should already be true, but just in case
      setEngineRunning(true);
    }
    if (isDeploySuccess) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const handleStartSimulation = () => {
    handleCloseModal();
    router.push('/chat-simulator');
  };

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

        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="text-gradient">Real-Time Identity</span>
          <br className="hidden md:block" />
          <span className="text-white"> & Growth Engine</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          A dynamic system that goes beyond analytics bringing together user signals, mapping identities across channels, and driving growth through real-time personalization and continuous optimization.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button 
            onClick={startDeployment}
            whileHover={{ scale: engineRunning ? 1 : 1.05 }}
            whileTap={{ scale: engineRunning ? 1 : 0.95 }}
            className={cn(
              "w-full sm:w-auto px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors",
              engineRunning 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default" 
                : "bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
            )}
          >
            {engineRunning ? (
              <>
                <div className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                Engine Running...
              </>
            ) : (
              <>
                Deploy AI Engine
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
          
          <Link href="/analytics" className="w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 rounded-full glass-panel-glow border border-white/10 text-white font-semibold flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              View Trust & Growth
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Deploy Modal */}
      <AnimatePresence>
        {isDeployModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              {!isDeploySuccess ? (
                <div className="flex flex-col items-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-t-2 border-l-2 border-indigo-500 mb-6"
                  />
                  <h3 className="text-xl font-bold text-white mb-6">🚀 Initializing AI Engine</h3>
                  
                  <div className="w-full space-y-3">
                    {DEPLOY_STEPS.map((step, idx) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center border transition-colors shrink-0",
                          deployStepIndex > idx ? "bg-emerald-500 border-emerald-500" :
                          deployStepIndex === idx ? "border-indigo-500" : "border-zinc-700"
                        )}>
                          {deployStepIndex > idx && <CheckCircle2 className="w-3 h-3 text-black" />}
                          {deployStepIndex === idx && <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                        </div>
                        <span className={cn(
                          "text-sm transition-colors",
                          deployStepIndex >= idx ? "text-white" : "text-zinc-600"
                        )}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">✅ AI Engine Deployed</h3>
                  <p className="text-zinc-400 text-sm mb-8">Your continuous optimization engine is now live and routing decisions.</p>
                  
                  <div className="flex flex-col gap-3 w-full">
                    <button 
                      onClick={handleStartSimulation}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg"
                    >
                      Start Simulation
                    </button>
                    <button 
                      onClick={handleCloseModal}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[60] bg-[#0a0a0a]/95 backdrop-blur-xl border border-emerald-500/20 shadow-2xl rounded-xl p-4 flex items-center gap-3"
          >
            <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Engine Activated</p>
              <p className="text-xs text-zinc-400">System is now monitoring traffic</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-4 text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
