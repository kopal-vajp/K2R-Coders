"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LineChart as LineChartIcon, 
  Activity, 
  ArrowUpRight, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  History, 
  FileText, 
  ToggleRight, 
  ToggleLeft,
  Server,
  Zap,
  Scale,
  Sparkles,
  CheckCircle2,
  Network
} from "lucide-react";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { cn } from "@/lib/utils";

const auditLogs = [
  { id: "LOG-091", user: "User_4921", action: "Message Suppressed", reason: "Fatigue score exceeded threshold (88 > 85)", time: "10:42 AM Today", icon: ShieldCheck, color: "text-emerald-400" },
  { id: "LOG-090", user: "User_8122", action: "Consent Updated", reason: "User opted out of SMS marketing via reply", time: "09:15 AM Today", icon: Lock, color: "text-amber-400" },
  { id: "LOG-089", user: "System", action: "Data Retention Purge", reason: "Deleted 4,120 inactive profiles (> 365 days)", time: "01:00 AM Today", icon: Server, color: "text-red-400" },
  { id: "LOG-088", user: "User_1034", action: "Algorithm Override", reason: "VIP status triggered immediate WhatsApp alert", time: "Yesterday", icon: Activity, color: "text-blue-400" },
];

export default function TrustGrowthPage() {
  const [toggles, setToggles] = useState({
    gdpr: true,
    ccpa: true,
    fatigueLimit: true,
    autoPurge: false
  });

  const [guardrailValue, setGuardrailValue] = useState(65); // 0 (Max Privacy) to 100 (Max Growth)
  const [simData, setSimData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("simulatorData");
    if (data) {
      try {
        setSimData(JSON.parse(data));
      } catch (e) {}
    }
  }, []);

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
    link.setAttribute("download", `trust_growth_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-20 min-h-full flex flex-col space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Scale className="h-8 w-8 text-blue-500" />
            Trust & Growth Intelligence
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Harmonizing algorithmic revenue lift with global privacy governance and consent orchestration.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Platform Trust Score</span>
            <span className="text-xl font-bold text-white leading-none">95%</span>
          </div>
          <div className="h-8 w-1 bg-blue-500/30 rounded-full" />
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Suppression Savings", value: "$142,500", trend: "+12.5%", icon: DollarSign, color: "emerald" },
          { label: "Revenue Lift", value: "+4.2%", trend: "AI Attributed", icon: Activity, color: "blue" },
          { label: "Fatigue Prevented", value: "8,401", trend: "Users Saved", icon: ShieldAlert, color: "rose" },
          { label: "Segment Activation", value: "1.2M", trend: "Total Reach", icon: Users, color: "indigo" },
        ].map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={kpi.label}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group hover:border-white/10 transition-all shadow-lg"
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", `from-${kpi.color}-500/5 to-transparent`)} />
            <div className="flex items-center gap-3 text-zinc-400 mb-4 relative z-10">
              <div className={cn("p-2 rounded-lg", `bg-${kpi.color}-500/10`)}>
                <kpi.icon className={cn("h-5 w-5", `text-${kpi.color}-400`)} />
              </div>
              <h3 className="text-sm font-medium">{kpi.label}</h3>
            </div>
            <div className="text-3xl font-bold text-white relative z-10">{kpi.value}</div>
            <div className={cn("text-[10px] font-bold mt-2 relative z-10", kpi.color === "emerald" ? "text-emerald-400" : "text-zinc-500")}>
              {kpi.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Analytics & Charts */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Stimulation Impact Alert (Dynamic) */}
          <AnimatePresence>
            {simData && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl",
                  simData.privacyRestricted 
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                    : "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30"
                )}
              >
                {!simData.privacyRestricted && (
                   <div className="absolute top-0 right-0 p-3">
                      <span className="flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                   </div>
                )}
                
                <div className="flex-shrink-0">
                  {simData.privacyRestricted ? (
                    <div className="h-14 w-14 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                      <Lock className="h-7 w-7 text-rose-400" />
                    </div>
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Zap className="h-7 w-7 text-blue-400 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                    {simData.privacyRestricted ? "Simulation Blocked by Privacy" : "Live Stimulation Detected"}
                    {!simData.privacyRestricted && <span className="text-[10px] px-2 py-0.5 bg-blue-500 text-white rounded-full uppercase tracking-tighter">New Insight</span>}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                    {simData.privacyRestricted 
                      ? "The recent stimulation was suppressed because consent was not granted. No growth data was captured for this session."
                      : `Simulation on ${simData.channel} for ${simData.intent} yielded a ${simData.engagement}% engagement score. Recommended action: Personalize tomorrow's campaign.`}
                  </p>
                </div>

                {!simData.privacyRestricted && (
                  <div className="flex flex-col items-center justify-center px-6 py-2 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Impact</span>
                    <span className="text-2xl font-bold text-emerald-400">+{simData.engagement > 90 ? "12.4" : "8.1"}%</span>
                    <span className="text-[10px] text-zinc-500">Growth Lift</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-400" />
                Growth Analytics & Trends
              </h3>
            </div>
            <AnalyticsCharts />
          </div>

          {/* Important Feature: Responsible Growth Guardrails */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 relative overflow-hidden group">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700" />
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-700" />
             
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 shadow-inner">
                      <Sparkles className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Responsible Growth Guardrails</h3>
                      <p className="text-sm text-zinc-400 mt-1">Calibrate AI intensity to balance revenue lift against privacy-first suppression.</p>
                    </div>
                  </div>
                  
                  <a 
                    href="/chat-simulator"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 group/btn shadow-xl backdrop-blur-md"
                  >
                    <Zap className="h-4 w-4 text-amber-400 group-hover/btn:animate-pulse" />
                    Launch Simulation
                  </a>
                </div>

                <div className="space-y-10 mt-12 bg-black/20 p-8 rounded-3xl border border-white/5 shadow-inner">
                  <div className="relative pt-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                      <span className={cn("transition-all duration-500", guardrailValue < 40 ? "text-emerald-400 scale-110" : "text-zinc-600")}>Privacy-First</span>
                      <span className={cn("transition-all duration-500", guardrailValue > 70 ? "text-blue-400 scale-110" : "text-zinc-600")}>Growth-First</span>
                    </div>
                    
                    <div className="relative h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${guardrailValue}%` }}
                      />
                    </div>
                    
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={guardrailValue}
                      onChange={(e) => setGuardrailValue(parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    
                    <motion.div 
                      className="absolute top-0 flex flex-col items-center pointer-events-none z-10"
                      animate={{ left: `${guardrailValue}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <div className="px-4 py-1.5 bg-white text-black text-xs font-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-3">
                        {guardrailValue}%
                      </div>
                      <div className="w-1 h-8 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/5 shadow-sm group/card">
                      <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <DollarSign className="h-3 w-3" /> Projected Annual Outcome
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white group-hover/card:text-blue-400 transition-colors">${(142000 * (1 + (guardrailValue - 50) / 100)).toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-400 font-black uppercase">Revenue Lift</span>
                      </div>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl border border-white/5 shadow-sm group/card">
                      <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3" /> Privacy Safety Margin
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white group-hover/card:text-emerald-400 transition-colors">{100 - guardrailValue}%</span>
                        <span className="text-[10px] text-blue-400 font-black uppercase">Suppression Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Trust & Governance */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Trust Center Toggles */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-400" />
              Consent Orchestration
            </h3>
            <div className="space-y-3">
              {[
                { id: "gdpr", label: "Strict GDPR", desc: "Blocks non-consented IPs", color: "emerald", active: toggles.gdpr },
                { id: "ccpa", label: "CCPA Opt-Out", desc: "Syncs blocklists", color: "emerald", active: toggles.ccpa },
                { id: "fatigueLimit", label: "Fatigue Limits", desc: "Halts on 'High' risk", color: "blue", active: toggles.fatigueLimit },
                { id: "autoPurge", label: "Auto-Purge", desc: "Delete > 365 days", color: "rose", active: toggles.autoPurge },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.label}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toggle(item.id as any)}
                    className="transition-transform active:scale-95"
                  >
                    {item.active 
                      ? <ToggleRight className={cn("h-7 w-7", item.color === "emerald" ? "text-emerald-500" : item.color === "blue" ? "text-blue-500" : "text-rose-500")} /> 
                      : <ToggleLeft className="h-7 w-7 text-zinc-600" />
                    }
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Model Precision Map */}
          <div className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col">
            <h3 className="text-white text-lg font-semibold mb-1">Model Precision</h3>
            <p className="text-xs text-zinc-400 mb-6">Historical accuracy of AI targeting.</p>
            <div className="space-y-5">
              {[
                { label: "Conversion XGBoost", score: "86.4% AUC", w: "86%", color: "bg-blue-500" },
                { label: "Fatigue Random Forest", score: "92.1% Recall", w: "92%", color: "bg-emerald-500" },
                { label: "Segment KMeans", score: "0.82 Silhouette", w: "82%", color: "bg-indigo-500" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-zinc-300 font-medium">{m.label}</span>
                    <span className="text-zinc-500 font-mono">{m.score}</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: m.w }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={cn("h-full rounded-full", m.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Optimization Engine */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 opacity-60">Engine Workflow</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Customer Signals", color: "zinc" },
                { label: "AI Decision", color: "blue" },
                { label: "Campaign", color: "purple" },
                { label: "Response", color: "emerald" },
                { label: "Learning Loop", color: "amber" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 group">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border shrink-0 transition-all",
                    step.color === "blue" ? "bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" :
                    step.color === "purple" ? "bg-purple-500/10 border-purple-500/30 text-purple-400 group-hover:bg-purple-500 group-hover:text-white" :
                    step.color === "emerald" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white" :
                    step.color === "amber" ? "bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-white" :
                    "bg-white/5 border-white/10 text-zinc-500 group-hover:bg-white/10 group-hover:text-white"
                  )}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Platform DNA: Trust, Privacy & AI Accuracy - Simplified Overview */}
      <div className="pt-8 border-t border-white/5">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">Platform DNA: Trust, Privacy & Ethics</h2>
          <p className="text-sm text-zinc-500 mt-2">Our commitment to responsible growth, explained simply.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Privacy Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-emerald-500/5 to-transparent flex flex-col h-full"
          >
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Privacy Made Simple</h3>
            <ul className="space-y-3 flex-1 text-xs text-zinc-400 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Messages sent only with explicit permission.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Instant opt-out processing across all channels.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Automatic data deletion after 365 days of inactivity.
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Built-in frequency caps to prevent user fatigue.
              </li>
            </ul>
          </motion.div>

          {/* Orchestration Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent flex flex-col h-full"
          >
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/20">
              <Network className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Smart Orchestration</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed italic">Think of it as an automated smart controller that:</p>
            <ul className="space-y-3 flex-1 text-xs text-zinc-400 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                Automatically validates user consent status.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                Selects the highest-performing channel (WhatsApp, SMS, etc.).
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                Synchronizes messaging to avoid redundant contact.
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">→</span>
                Deploys messages only when impact is maximized.
              </li>
            </ul>
          </motion.div>

          {/* AI Accuracy Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-purple-500/5 to-transparent flex flex-col h-full"
          >
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/20">
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">AI Reliability</h3>
            <div className="space-y-5 flex-1">
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1.5">
                  <span>Conversion Accuracy</span>
                  <span className="text-white">86.4% AUC</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[86.4%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1.5">
                  <span>Fatigue Detection</span>
                  <span className="text-white">92.1% Recall</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[92.1%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 tracking-widest mb-1.5">
                  <span>Segmentation Score</span>
                  <span className="text-white">0.82 Silhouette</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[82%]" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 leading-tight">Models are trained on real behavioral data and continuously self-improve.</p>
          </motion.div>

          {/* Responsible Growth Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-transparent flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-6 border border-blue-500/20">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Responsible Result</h3>
            <ul className="space-y-4 flex-1 mt-2">
              {[
                "Higher engagement without spamming",
                "Full GDPR & CCPA Compliance",
                "Trust-first customer experience"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-zinc-300 font-medium">
                  <div className="h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-blue-400 text-center">
              Growth powered by AI.<br/>Protected by Privacy.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decision Audit Trail - Bottom Wide */}
      <div className="glass-panel rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-xl mt-4">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-400" />
              Unified Decision Audit Trail
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Cross-functional log of all privacy overrides and growth activations.</p>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="h-4 w-4" /> Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-black/40 text-zinc-400 border-b border-white/5">
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Log ID</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Entity</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Action</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Explainability / Reason</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-[10px]">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-4 font-mono text-zinc-500 text-xs">{log.id}</td>
                  <td className="px-6 py-4 text-white font-medium">{log.user}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <log.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", log.color)} />
                      <span className="text-zinc-300">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 max-w-[350px] truncate group-hover:text-zinc-300 transition-colors">{log.reason}</td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
