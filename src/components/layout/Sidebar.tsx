"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  BrainCircuit,
  MessageSquare,
  ShieldCheck,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Dataset Explorer", icon: Database, href: "/datasets" },
  { name: "AI Design Engine", icon: Wand2, href: "/workspace" },
  { name: "Chat Simulator", icon: MessageSquare, href: "/chat-simulator" },
  { name: "Privacy Governance", icon: ShieldCheck, href: "/privacy" },
  { name: "Growth Operations", icon: LineChart, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full glass-panel border-r border-y-0 border-l-0 rounded-none z-20 sticky top-0 flex flex-col"
    >
      <div className={cn("flex h-16 shrink-0 items-center border-b border-white/5", isCollapsed ? "justify-center" : "justify-between px-4")}>
        {!isCollapsed ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient tracking-tight">MessageMind</span>
            </motion.div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 hover:from-blue-500 hover:to-purple-600 transition-all cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10 hover:border-transparent"
          >
            <BrainCircuit className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "text-white bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                />
              )}

              <div className="flex items-center justify-center w-6 mr-3 relative">
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isActive ? "text-blue-400" : "group-hover:scale-110"
                )} />
                {isActive && (
                  <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 rounded-full" />
                )}
              </div>

              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {item.name}
                </motion.span>
              )}
            </a>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "flex items-center gap-3 rounded-xl p-3 glass-panel-glow",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shrink-0 flex items-center justify-center overflow-hidden border border-white/20">
            <img src={"https://i.pravatar.cc/150?u=admin"} alt="Admin Profile" className="h-full w-full object-cover mix-blend-overlay" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-white">Alex Mercer</span>
              <span className="text-xs text-zinc-500">Enterprise Admin</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
