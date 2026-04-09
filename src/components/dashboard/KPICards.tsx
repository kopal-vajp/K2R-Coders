"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Target, BellOff, ShieldAlert, Users, Network } from "lucide-react";
import { useEffect, useState } from "react";

const kpis = [
  { id: 1, title: "Revenue Recovery", value: 34.2, suffix: "%", trend: "+4.1%", isPositive: true, icon: DollarSign, color: "from-emerald-400 to-emerald-600" },
  { id: 2, title: "AI Conv. Confidence", value: 92.8, suffix: "%", trend: "+1.2%", isPositive: true, icon: Target, color: "from-blue-400 to-indigo-600" },
  { id: 3, title: "Fatigue Alerts", value: 142, suffix: "", trend: "-12", isPositive: true, icon: BellOff, color: "from-amber-400 to-orange-600" },
  { id: 4, title: "Suppressed Msgs", value: 45.1, suffix: "k", trend: "+2.4k", isPositive: false, icon: ShieldAlert, color: "from-rose-400 to-red-600" },
  { id: 5, title: "Active Users", value: 1.24, suffix: "M", trend: "+8.4%", isPositive: true, icon: Users, color: "from-cyan-400 to-blue-500" },
  { id: 6, title: "Cross-channel Success", value: 88.5, suffix: "%", trend: "+5.1%", isPositive: true, icon: Network, color: "from-purple-400 to-pink-600" },
];

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / 30));
    
    const timer = setInterval(() => {
      start += (value / 30);
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);

  const formatted = displayValue % 1 !== 0 && displayValue < 100 
    ? displayValue.toFixed(1) 
    : Math.floor(displayValue).toString();

  return <span>{formatted}{suffix}</span>;
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.02, 
            rotateX: 2, 
            rotateY: -2,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
          }}
          className="relative group perspective-1000"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl ${kpi.color}" style={{ backgroundImage: `var(--tw-gradient-stops)` }}></div>
          
          <div className="glass-panel-glow p-6 rounded-2xl relative z-10 h-full bg-gradient-to-b from-white/[0.05] to-transparent overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color} bg-opacity-10 shadow-inner`}>
                <kpi.icon className="h-5 w-5 text-white drop-shadow-md" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {kpi.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {kpi.trend}
              </div>
            </div>
            
            <h3 className="text-zinc-400 text-sm font-medium mb-1">{kpi.title}</h3>
            <div className="text-3xl font-bold text-white tracking-tight">
              <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
