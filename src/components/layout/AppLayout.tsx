"use client";

import { Sidebar } from "./Sidebar";
import { CommandBar } from "./CommandBar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {pathname === '/' && <CommandBar />}
        
        {/* Floating Background Particles Simulation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-30">
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse-glow" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[60%] left-[80%] w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-[80%] left-[30%] w-80 h-80 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full max-w-[1600px] mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
