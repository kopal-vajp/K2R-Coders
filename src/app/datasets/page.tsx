"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Table as TableIcon, FileJson, Activity, Search, Filter, HardDriveDownload, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const datasets = [
  { id: "conversion", name: "conversion_ready.csv", rows: "25,000", columns: 12, size: "4.2 MB", status: "Clean", type: "Processed" },
  { id: "fatigue", name: "fatigue_ready.csv", rows: "1,000", columns: 5, size: "156 KB", status: "Clean", type: "Processed" },
  { id: "segmentation", name: "segmentation_ready.csv", rows: "10,000", columns: 8, size: "1.1 MB", status: "Clean", type: "Processed" },
  { id: "raw-ecommerce", name: "ecommerce_main.csv", rows: "75,000", columns: 24, size: "18.5 MB", status: "Raw", type: "Raw" },
  { id: "raw-clickstream", name: "clickstream.csv", rows: "142,000", columns: 6, size: "32.1 MB", status: "Raw", type: "Raw" },
  { id: "raw-rfm", name: "customer_rfm.csv", rows: "10,000", columns: 9, size: "1.4 MB", status: "Raw", type: "Raw" },
];

const mockRows = [
  { id: "User_4921", cartValue: "$142.50", repeatUser: "True", checkoutAttempts: 1, sessionDuration: "12m", category: "Apparel", timeOfDay: "Afternoon", purchased: "1" },
  { id: "User_8122", cartValue: "$45.00", repeatUser: "False", checkoutAttempts: 0, sessionDuration: "4m", category: "Electronics", timeOfDay: "Morning", purchased: "0" },
  { id: "User_1034", cartValue: "$310.00", repeatUser: "True", checkoutAttempts: 2, sessionDuration: "25m", category: "Home", timeOfDay: "Evening", purchased: "1" },
  { id: "User_7721", cartValue: "$12.99", repeatUser: "False", checkoutAttempts: 0, sessionDuration: "1m", category: "Apparel", timeOfDay: "Night", purchased: "0" },
  { id: "User_9011", cartValue: "$89.99", repeatUser: "True", checkoutAttempts: 1, sessionDuration: "8m", category: "Beauty", timeOfDay: "Afternoon", purchased: "1" },
];

export default function DatasetExplorerPage() {
  const [activeTab, setActiveTab] = useState<"Processed" | "Raw">("Processed");
  const [selectedDataset, setSelectedDataset] = useState(datasets[0]);

  const filteredDatasets = datasets.filter(d => d.type === activeTab);

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dataset Explorer</h1>
          <p className="text-sm text-zinc-400">Inspect raw event streams and processed ML-ready feature sets.</p>
        </div>
        <div className="flex items-center justify-center h-10 px-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
          <Sparkles className="h-4 w-4 mr-2" />
          Data Pipeline Active
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 w-full max-w-[1600px] mx-auto">
          
          {/* Left Column: Dataset Selection */}
          <div className="col-span-12 xl:col-span-3 flex flex-col gap-4">
            
            {/* Tabs */}
            <div className="flex p-1 bg-black/40 rounded-lg border border-white/5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("Processed")}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === "Processed" ? "bg-white/10 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Processed
              </button>
              <button
                onClick={() => setActiveTab("Raw")}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === "Raw" ? "bg-white/10 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Raw Streams
              </button>
            </div>

            {/* List */}
            <div className="glass-panel rounded-xl border border-white/5 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-white/5 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search datasets..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredDatasets.map(dataset => (
                  <button
                    key={dataset.id}
                    onClick={() => setSelectedDataset(dataset)}
                    className={cn(
                      "w-full text-left px-4 py-3 flex flex-col gap-1 border-b border-white/5 transition-all",
                      selectedDataset.id === dataset.id 
                        ? "bg-blue-500/10 border-l-4 border-l-blue-500" 
                        : "hover:bg-white/5 border-l-4 border-l-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white truncate">{dataset.name}</span>
                      {dataset.status === 'Clean' ? (
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>{dataset.rows} rows</span>
                      <span>•</span>
                      <span>{dataset.size}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dataset Details */}
          <div className="col-span-12 xl:col-span-9 flex flex-col gap-6">
            
            {/* Top Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-zinc-400 text-sm font-medium mb-1 relative z-10">Row Count</h3>
                <div className="text-3xl font-bold text-white relative z-10">{selectedDataset.rows}</div>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-zinc-400 text-sm font-medium mb-1 relative z-10">Feature Columns</h3>
                <div className="text-3xl font-bold text-white relative z-10">{selectedDataset.columns}</div>
              </div>
              <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-zinc-400 text-sm font-medium mb-1 relative z-10">Missing Values</h3>
                <div className="text-3xl font-bold text-emerald-400 relative z-10">0.00%</div>
              </div>
            </div>

            {/* Table View */}
            <div className="glass-panel rounded-xl border border-white/5 flex flex-col overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <TableIcon className="h-4 w-4 text-blue-400" />
                  <h2 className="text-sm font-semibold text-white">Data Preview: {selectedDataset.name}</h2>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors">
                    <Filter className="h-3 w-3" /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                    <HardDriveDownload className="h-3 w-3" /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-white/5 text-zinc-400 bg-black/20">
                      <th className="px-5 py-3 font-medium">Customer_ID</th>
                      <th className="px-5 py-3 font-medium">Cart_Value</th>
                      <th className="px-5 py-3 font-medium">Repeat_User</th>
                      <th className="px-5 py-3 font-medium">Attempts</th>
                      <th className="px-5 py-3 font-medium">Duration</th>
                      <th className="px-5 py-3 font-medium">Category</th>
                      <th className="px-5 py-3 font-medium">Purchased</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockRows.map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-2.5 text-zinc-300 font-mono text-xs">{row.id}</td>
                        <td className="px-5 py-2.5 text-white">{row.cartValue}</td>
                        <td className="px-5 py-2.5 text-zinc-400">{row.repeatUser}</td>
                        <td className="px-5 py-2.5 text-zinc-400">{row.checkoutAttempts}</td>
                        <td className="px-5 py-2.5 text-zinc-400">{row.sessionDuration}</td>
                        <td className="px-5 py-2.5 text-zinc-400">{row.category}</td>
                        <td className="px-5 py-2.5">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                            row.purchased === "1" ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"
                          )}>
                            {row.purchased}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schema & Heatmap Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="h-4 w-4 text-purple-400" />
                  <h2 className="text-sm font-semibold text-white">Schema Alignment</h2>
                </div>
                <div className="space-y-3">
                  {["cart_value (float64)", "repeat_user (int64)", "checkout_attempts (int64)"].map((schema, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5">
                      <span className="text-xs font-mono text-zinc-300">{schema}</span>
                      <AlertCircle className="h-3 w-3 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-rose-400" />
                  <h2 className="text-sm font-semibold text-white">Null Value Heatmap</h2>
                </div>
                <div className="h-32 rounded-lg bg-black/40 border border-white/5 relative overflow-hidden flex items-end">
                  {/* Mock Heatmap visual */}
                  <div className="absolute inset-0 flex">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="flex-1 bg-emerald-500/20 border-r border-black/50" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-xs font-medium text-emerald-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                      100% Data Density
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
