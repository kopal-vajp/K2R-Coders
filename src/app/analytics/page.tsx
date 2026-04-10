"use client";

import { LineChart as LineChartIcon, Activity, ArrowUpRight, DollarSign, Users, ShieldAlert } from "lucide-react";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Growth Operations</h1>
          <p className="text-sm text-zinc-400">Global suppression savings, revenue lift impact, and model confidence trends.</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8 w-full max-w-7xl mx-auto">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 text-zinc-400 mb-4 relative z-10">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-medium">Suppression Savings</h3>
              </div>
              <div className="text-3xl font-bold text-white relative z-10">$142,500</div>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-2 relative z-10">
                <ArrowUpRight className="h-3 w-3" /> +12.5% VS LAST MONTH
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 text-zinc-400 mb-4 relative z-10">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-sm font-medium">Revenue Lift</h3>
              </div>
              <div className="text-3xl font-bold text-white relative z-10">+4.2%</div>
              <div className="text-xs text-blue-400 font-medium flex items-center gap-1 mt-2 relative z-10">
                <ArrowUpRight className="h-3 w-3" /> ATTRIBUTED TO AI
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 text-zinc-400 mb-4 relative z-10">
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                </div>
                <h3 className="text-sm font-medium">Fatigue Prevented</h3>
              </div>
              <div className="text-3xl font-bold text-white relative z-10">8,401</div>
              <div className="text-xs text-zinc-500 font-medium mt-2 relative z-10">
                USERS SAVED FROM UNSUBSCRIBING
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 text-zinc-400 mb-4 relative z-10">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-sm font-medium">Segment Activation</h3>
              </div>
              <div className="text-3xl font-bold text-white relative z-10">1.2M</div>
              <div className="text-xs text-zinc-500 font-medium mt-2 relative z-10">
                TOTAL REACHED THIS QUARTER
              </div>
            </div>
          </div>

          {/* Continuous Optimization Engine */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
            <h3 className="text-white text-lg font-semibold mb-4">Continuous Optimization Engine</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm font-medium text-zinc-300">
              <div className="bg-white/5 py-2 px-3 rounded-lg text-center flex-1 w-full">Customer Signals</div>
              <span className="text-blue-500 hidden md:block">→</span>
              <span className="text-blue-500 block md:hidden">↓</span>
              <div className="bg-blue-500/10 border border-blue-500/20 py-2 px-3 rounded-lg text-blue-400 text-center flex-1 w-full">AI Decision</div>
              <span className="text-purple-500 hidden md:block">→</span>
              <span className="text-purple-500 block md:hidden">↓</span>
              <div className="bg-purple-500/10 border border-purple-500/20 py-2 px-3 rounded-lg text-purple-400 text-center flex-1 w-full">Campaign</div>
              <span className="text-emerald-500 hidden md:block">→</span>
              <span className="text-emerald-500 block md:hidden">↓</span>
              <div className="bg-emerald-500/10 border border-emerald-500/20 py-2 px-3 rounded-lg text-emerald-400 text-center flex-1 w-full">Response</div>
              <span className="text-amber-500 hidden md:block">→</span>
              <span className="text-amber-500 block md:hidden">↓</span>
              <div className="bg-amber-500/10 border border-amber-500/20 py-2 px-3 rounded-lg text-amber-400 text-center flex-1 w-full">Learning Loop</div>
            </div>
          </div>

          {/* Reused AnalyticsCharts Widget */}
          <AnalyticsCharts />

          {/* Model Confidence & Precision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl border border-white/5 p-6 min-h-[250px] flex flex-col">
              <h3 className="text-white text-lg font-semibold mb-1">Model Precision Map</h3>
              <p className="text-xs text-zinc-400 mb-6">Historical accuracy of AI targeting recommendations.</p>
              <div className="flex-1 flex flex-col justify-center gap-4">
                 <div className="space-y-4">
                  {[
                    { label: "Conversion XGBoost", score: "86.4% AUC", w: "86%" },
                    { label: "Fatigue Random Forest", score: "92.1% Recall", w: "92%" },
                    { label: "Segment KMeans", score: "0.82 Silhouette", w: "82%" },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-300 font-medium">{m.label}</span>
                        <span className="text-blue-400">{m.score}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: m.w }} />
                      </div>
                    </div>
                  ))}
                 </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 p-6 min-h-[250px] flex flex-col">
              <h3 className="text-white text-lg font-semibold mb-1">Suppression Matrix</h3>
              <p className="text-xs text-zinc-400 mb-6">Users protected by suppression rules.</p>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="flex flex-col items-center justify-center p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                  <span className="text-2xl font-bold text-rose-400">4,120</span>
                  <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider text-center">Over-Mailed<br/>Blocked</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                  <span className="text-2xl font-bold text-amber-400">2,891</span>
                  <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider text-center">Rage Click<br/>Cooldown</span>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
