"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, ShoppingCart, Target, ShieldCheck, ChevronDown, Check, Globe, RefreshCcw } from "lucide-react";
import { Persona, personas } from "./mockPersonas";

export function CustomerContextLab({
  selectedPersona,
  onSelectPersona
}: {
  selectedPersona: Persona,
  onSelectPersona: (p: Persona) => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Persona Selector */}
      <div className="relative z-[100]">
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="glass-panel px-4 py-3 flex items-center justify-between cursor-pointer border-white/10 hover:border-blue-500/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <img src={selectedPersona.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full border border-white/20" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-white">{selectedPersona.name}</span>
              <span className="text-[10px] text-zinc-400 font-mono">{selectedPersona.id}</span>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isDropdownOpen ? "rotate-180 text-blue-400" : ""}`} />
        </div>

        {/* Dropdown menu mock */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 bg-[#030712]/95 backdrop-blur-2xl border border-white/10 ring-1 ring-blue-500/30 rounded-xl p-2 z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.15)]"
            >
              {personas.map((p) => {
                const isSelected = selectedPersona.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPersona(p);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-3 py-2.5 mb-1 last:mb-0 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200 border-l-[3px] 
                      ${isSelected 
                        ? "bg-blue-500/15 border-blue-400 pl-3 shadow-inner" 
                        : "border-transparent hover:bg-blue-500/10 hover:border-blue-400 hover:pl-3"
                      }`}
                  >
                    <img src={p.avatarUrl} alt="avatar" className="w-7 h-7 rounded-full border border-white/20" />
                    <span className={`text-sm flex-1 ${isSelected ? "text-white font-semibold" : "text-zinc-300"}`}>{p.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Customer Profile */}
      <motion.div layout className="glass-panel p-5 border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-2 mb-4">
          <UserCircle className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[10px] uppercase">Tier</span>
            <span className="font-semibold text-blue-300">{selectedPersona.loyaltyTier}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[10px] uppercase">Region</span>
            <div className="flex items-center gap-1 font-medium text-white">
              <Globe className="w-3 h-3 text-zinc-400" />
              {selectedPersona.region}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[10px] uppercase">Pref Channel</span>
            <span className="font-medium text-white">{selectedPersona.preferredChannel}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-zinc-500 text-[10px] uppercase">Status</span>
            {selectedPersona.isRepeatBuyer ? (
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded w-fit">
                <RefreshCcw className="w-3 h-3" /> Repeat
              </div>
            ) : (
              <span className="text-zinc-400">First-time</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Cart & Session */}
      <motion.div layout className="glass-panel p-5 border border-white/5 relative group overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Session Context</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-0.5">
              <span className="text-zinc-500 text-[10px] uppercase">Cart Value</span>
              <span className="text-2xl font-bold text-white">${selectedPersona.session.cartValue.toFixed(2)}</span>
            </div>
            <div className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded font-medium">
              {selectedPersona.session.items} items &bull; {selectedPersona.session.durationMins}m
            </div>
          </div>

          <div className="space-y-2 text-sm pt-2 border-t border-white/5">
            <div className="flex justify-between">
              <span className="text-zinc-400">Category</span>
              <span className="text-white font-medium">{selectedPersona.session.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Checkout Attempts</span>
              <span className="text-white font-medium">{selectedPersona.session.checkoutAttempts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Coupon</span>
              {selectedPersona.session.couponApplied ? (
                <span className="text-emerald-400 text-xs font-bold px-1.5 py-0.5 bg-emerald-500/10 rounded">APPLIED</span>
              ) : (
                <span className="text-zinc-500 text-xs font-bold px-1.5 py-0.5 bg-white/5 rounded">NONE</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Intent Snapshot */}
      <motion.div layout className="glass-panel p-5 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-rose-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Intent Signals</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Shipping Concern", value: selectedPersona.intent.shippingConcern, color: "bg-blue-500" },
            { label: "Coupon Issue", value: selectedPersona.intent.couponIssue, color: "bg-amber-500" },
            { label: "Return Hesitation", value: selectedPersona.intent.returnHesitation, color: "bg-purple-500" },
            { label: "Delivery Urgency", value: selectedPersona.intent.urgency, color: "bg-rose-500" },
          ].map(signal => (
            <div key={signal.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">{signal.label}</span>
                <span className="font-mono text-white">{signal.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${signal.value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${signal.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Consent Controls */}
      <motion.div layout className="glass-panel p-5 border border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Policy & Consent</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {['WhatsApp', 'SMS', 'Promo'].map(key => {
            const isOptIn = selectedPersona.consent[key.toLowerCase() as keyof typeof selectedPersona.consent];
            return (
              <div key={key} className={`flex-1 text-center py-2 rounded border text-xs font-semibold transition-colors ${isOptIn ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                {key}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
          <span className="text-zinc-400">Freq Cap Delta</span>
          <div className="flex gap-1 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`w-6 h-2 rounded-full ${i < selectedPersona.consent.frequencyCapDeltas ? 'bg-blue-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
