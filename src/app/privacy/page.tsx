"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ToggleRight, ToggleLeft, Lock, FileText, Activity, Server, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const auditLogs = [
  { id: "LOG-091", user: "User_4921", action: "Message Suppressed", reason: "Fatigue score exceeded threshold (88 > 85)", time: "10:42 AM Today", icon: ShieldCheck, color: "text-emerald-400" },
  { id: "LOG-090", user: "User_8122", action: "Consent Updated", reason: "User opted out of SMS marketing via reply", time: "09:15 AM Today", icon: Lock, color: "text-amber-400" },
  { id: "LOG-089", user: "System", action: "Data Retention Purge", reason: "Deleted 4,120 inactive profiles (> 365 days)", time: "01:00 AM Today", icon: Server, color: "text-red-400" },
  { id: "LOG-088", user: "User_1034", action: "Algorithm Override", reason: "VIP status triggered immediate WhatsApp alert", time: "Yesterday", icon: Activity, color: "text-blue-400" },
];

export default function PrivacyGovernancePage() {
  const [toggles, setToggles] = useState({
    gdpr: true,
    ccpa: true,
    fatigueLimit: true,
    autoPurge: false
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const handleDownloadCSV = () => {
    const headers = ["Log ID", "Entity", "Action", "Explainability / Reason", "Timestamp"];
    const csvRows = auditLogs.map(log => {
      const action = `"${log.action.replace(/"/g, '""')}"`;
      const reason = `"${log.reason.replace(/"/g, '""')}"`;
      return `${log.id},${log.user},${action},${reason},${log.time}`;
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `privacy_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Privacy Governance</h1>
          <p className="text-sm text-zinc-400">Global compliance, consent orchestration, and algorithmic auditing.</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 w-full max-w-7xl mx-auto items-start">

        {/* Top Row */}
        <div className="col-span-12 lg:col-span-4 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Platform Trust Score</h3>

          <div className="relative h-40 w-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="14" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200">95</span>
              <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Excellent</span>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-zinc-400 max-w-[200px]">
            Compliance algorithms operating globally without violations.
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/5 flex flex-col">
          <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-400" />
            Consent Center
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-white shadow-sm">Strict GDPR Enforcement</h4>
                <p className="text-xs text-zinc-500 mt-1">Blocks messages lacking explicit opt-in IPs.</p>
              </div>
              <button onClick={() => toggle("gdpr")}>
                {toggles.gdpr ? <ToggleRight className="h-8 w-8 text-emerald-500" /> : <ToggleLeft className="h-8 w-8 text-zinc-600" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-white shadow-sm">CCPA Opt-Out Processing</h4>
                <p className="text-xs text-zinc-500 mt-1">Syncs 'Do Not Sell' tracking blocklists.</p>
              </div>
              <button onClick={() => toggle("ccpa")}>
                {toggles.ccpa ? <ToggleRight className="h-8 w-8 text-emerald-500" /> : <ToggleLeft className="h-8 w-8 text-zinc-600" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-white shadow-sm">Global Fatigue Limits</h4>
                <p className="text-xs text-zinc-500 mt-1">Halts all channels if risk is 'High'.</p>
              </div>
              <button onClick={() => toggle("fatigueLimit")}>
                {toggles.fatigueLimit ? <ToggleRight className="h-8 w-8 text-blue-500" /> : <ToggleLeft className="h-8 w-8 text-zinc-600" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <div>
                <h4 className="text-sm font-medium text-white shadow-sm">Data Retention Purge</h4>
                <p className="text-xs text-zinc-500 mt-1">Auto-delete user states after 365 days.</p>
              </div>
              <button onClick={() => toggle("autoPurge")}>
                {toggles.autoPurge ? <ToggleRight className="h-8 w-8 text-rose-500" /> : <ToggleLeft className="h-8 w-8 text-zinc-600" />}
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Row - Audits */}
        <div className="col-span-12 glass-panel rounded-2xl border border-white/5 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <History className="h-5 w-5 text-indigo-400" />
                Decision Audit Trail
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Log of all algorithmic blocks, overrides, and consent shifts.</p>
            </div>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors"
            >
              <FileText className="h-4 w-4" /> Download CSV
            </button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-black/20 text-zinc-400 border-b border-white/5">
                  <th className="px-6 py-4 font-medium">Log ID</th>
                  <th className="px-6 py-4 font-medium">Entity</th>
                  <th className="px-6 py-4 font-medium">Action</th>
                  <th className="px-6 py-4 font-medium">Explainability / Reason</th>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{log.id}</td>
                    <td className="px-6 py-4 text-white font-medium">{log.user}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <log.icon className={cn("h-4 w-4", log.color)} />
                        <span className="text-zinc-300">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 max-w-[300px] truncate">{log.reason}</td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
