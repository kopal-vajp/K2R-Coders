"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingCart, Package, CreditCard, Gift, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const eventTypes = [
  { type: "Cart Abandoned", icon: ShoppingCart, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  { type: "Shipping Query", icon: Package, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { type: "Checkout Retry", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  { type: "Promo Suppression", icon: Gift, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
  { type: "WhatsApp Delivery", icon: MessageCircle, color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/20" },
];

const mockUsers = ["u_1094x", "u_8821a", "u_4402b", "u_9114c", "u_0029f"];

type Event = {
  id: string;
  typeData: typeof eventTypes[0];
  user: string;
  timestamp: string;
};

export function LiveEventStream() {
  const [events, setEvents] = useState<Event[]>([
    { id: "1", typeData: eventTypes[0], user: mockUsers[0], timestamp: "Just now" },
    { id: "2", typeData: eventTypes[1], user: mockUsers[1], timestamp: "2s ago" },
    { id: "3", typeData: eventTypes[2], user: mockUsers[2], timestamp: "5s ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: Event = {
        id: Math.random().toString(36).substr(2, 9),
        typeData: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        timestamp: "Just now",
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel border border-white/5 rounded-2xl p-6 h-[400px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        Live Event Stream
      </h3>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
        
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                  "p-3 rounded-xl border bg-white/[0.02] backdrop-blur-sm flex items-start gap-4",
                  event.typeData.border,
                  "hover:bg-white/[0.04] transition-colors"
                )}
              >
                <div className={cn("p-2 rounded-lg shrink-0", event.typeData.bg)}>
                  <event.typeData.icon className={cn("w-4 h-4", event.typeData.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-white truncate">{event.typeData.type}</span>
                    <span className="text-[10px] text-zinc-500 whitespace-nowrap">{event.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-400 border border-white/10">
                      {event.user}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
