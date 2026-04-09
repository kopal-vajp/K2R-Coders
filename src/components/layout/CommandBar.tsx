"use client";

import { Search, Bell, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CommandBar() {
  return (
    <header className="sticky top-0 z-10 h-16 w-full glass-panel border-x-0 border-t-0 rounded-none flex items-center justify-between px-6">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400 group-focus-within:text-blue-400 transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input 
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-inner"
            placeholder="Search events, datasets, or commands (Cmd + K)"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
              <kbd>⌘</kbd><kbd>K</kbd>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto pl-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mr-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></span>
          </div>
          AI Core Online
        </div>

        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-[#0a0a0a]"></span>
        </button>

        <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-purple-400 group relative">
          <Sparkles className="h-5 w-5" />
          <motion.div
            className="absolute inset-0 bg-purple-500 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity"
            initial={false}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
    </header>
  );
}
