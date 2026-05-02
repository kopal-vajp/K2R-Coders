"use client";

import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  PieChart, Pie
} from "recharts";

const upliftData = [
  { name: 'Mon', revenue: 4000, baseline: 2400 },
  { name: 'Tue', revenue: 3000, baseline: 1398 },
  { name: 'Wed', revenue: 5000, baseline: 4800 },
  { name: 'Thu', revenue: 8780, baseline: 3908 },
  { name: 'Fri', revenue: 6890, baseline: 4800 },
  { name: 'Sat', revenue: 12390, baseline: 3800 },
  { name: 'Sun', revenue: 10490, baseline: 4300 },
];

const channelData = [
  { name: 'WhatsApp', value: 85, color: '#22c55e' },
  { name: 'SMS', value: 45, color: '#3b82f6' },
  { name: 'Email', value: 30, color: '#8b5cf6' },
  { name: 'IG DM', value: 65, color: '#ec4899' },
];

const segmentData = [
  { name: 'High Intent', value: 400, color: '#3b82f6' },
  { name: 'Hesitant', value: 300, color: '#8b5cf6' },
  { name: 'Discount Seekers', value: 300, color: '#ec4899' },
  { name: 'Loyal', value: 200, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 border border-white/10 rounded-lg shadow-xl text-xs">
        <p className="font-bold text-white mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-zinc-400">{entry.name}:</span>
            <span className="font-mono text-white">${entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

import { useEffect, useState } from "react";

export function AnalyticsCharts() {
  const [simData, setSimData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCharts = () => {
      try {
        const data = localStorage.getItem("simulatorData");
        if (data) {
          setSimData(JSON.parse(data));
        }
      } catch(e) {}
    };

    updateCharts();
    window.addEventListener('storage', updateCharts);
    return () => window.removeEventListener('storage', updateCharts);
  }, []);

  if (!mounted) return <div className="h-[250px] w-full" />;

  // Dynamically calculate impacts based on sim data
  let predictedLift = 0;
  if (simData && !simData.privacyRestricted) {
    if (simData.intent && (simData.intent.includes("Travel") || simData.intent.includes("Food") || simData.intent.includes("Fitness"))) {
       predictedLift = simData.engagement > 90 ? 12.4 : 8.1;
    } else {
       predictedLift = 4.2;
    }
  }

  return (
    <div className="flex flex-col gap-6 mb-8">
      
      {/* Dynamic Session Module */}
      {simData && simData.privacyRestricted && (
        <div className="glass-panel border border-rose-500/20 bg-rose-500/10 rounded-2xl p-6 text-center text-rose-400">
          <h3 className="font-bold mb-2 text-lg">Execution Halted</h3>
          <p className="text-sm font-medium">No analytics generated due to user privacy selection. Compliance requirements satisfied.</p>
        </div>
      )}

      {simData && !simData.privacyRestricted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel border border-emerald-500/30 bg-emerald-500/10 rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Impact from Current Session
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 block mb-1">Predicted Revenue Lift</span>
              <span className="text-2xl font-bold text-emerald-400">+{predictedLift}%</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 block mb-1">Engagement Score</span>
              <span className="text-2xl font-bold text-blue-400">{simData.engagement}%</span>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
              <span className="text-xs text-zinc-400 block mb-1">Recommended Execution Channel</span>
              <span className="text-xl font-bold text-white">{simData.channel}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      
      {/* Uplift Trend Line Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel border border-white/5 rounded-2xl p-6 col-span-1 lg:col-span-2 xl:col-span-2 group hover:border-blue-500/30 transition-colors"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Revenue Lift</h3>
            <p className="text-sm text-zinc-400">Performance Impact vs Baseline</p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> AI Revenue</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-zinc-600"></div> Baseline</div>
          </div>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
            <AreaChart data={upliftData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="baseline" stroke="#52525b" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Channel Success Bar Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel border border-white/5 rounded-2xl p-6 group hover:border-purple-500/30 transition-colors flex flex-col"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white">Channel Efficiency</h3>
          <p className="text-sm text-zinc-400">Conversion by platform</p>
        </div>
        <div className="h-[250px] w-full flex-1">
          <ResponsiveContainer width="100%" height="100%" minHeight={0} minWidth={0}>
            <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#ffffff80" fontSize={12} tickLine={false} axisLine={false} width={70} />
              <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
