"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Table as TableIcon, FileJson, Activity, Search, Filter, HardDriveDownload, Sparkles, AlertCircle, Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const datasets = [
  { id: "conversion", name: "conversion_ready.csv", rows: "25,000", columns: 12, size: "4.2 MB", status: "Clean", type: "Processed" },
  { id: "fatigue", name: "fatigue_ready.csv", rows: "1,000", columns: 5, size: "156 KB", status: "Clean", type: "Processed" },
  { id: "segmentation", name: "segmentation_ready.csv", rows: "10,000", columns: 8, size: "1.1 MB", status: "Clean", type: "Processed" },
  { id: "raw-ecommerce", name: "ecommerce_main.csv", rows: "75,000", columns: 24, size: "18.5 MB", status: "Raw", type: "Raw" },
  { id: "raw-clickstream", name: "clickstream.csv", rows: "142,000", columns: 6, size: "32.1 MB", status: "Raw", type: "Raw" },
  { id: "raw-rfm", name: "customer_rfm.csv", rows: "10,000", columns: 9, size: "1.4 MB", status: "Raw", type: "Raw" },
];

const datasetStore: Record<string, { schema: string[], headers: string[], rows: Record<string, string>[] }> = {
  "conversion": {
    schema: ["cart_value (float64)", "repeat_user (int64)", "checkout_attempts (int64)"],
    headers: ["Customer_ID", "Cart_Value", "Repeat", "Attempts", "Duration", "Category", "Purchased"],
    rows: [
      { Customer_ID: "User_4921", Cart_Value: "$142.50", Repeat: "True", Attempts: "1", Duration: "12m", Category: "Apparel", Purchased: "1" },
      { Customer_ID: "User_8122", Cart_Value: "$45.00", Repeat: "False", Attempts: "0", Duration: "4m", Category: "Electronics", Purchased: "0" },
      { Customer_ID: "User_1034", Cart_Value: "$310.00", Repeat: "True", Attempts: "2", Duration: "25m", Category: "Home", Purchased: "1" },
      { Customer_ID: "User_7721", Cart_Value: "$12.99", Repeat: "False", Attempts: "0", Duration: "1m", Category: "Apparel", Purchased: "0" },
      { Customer_ID: "User_9011", Cart_Value: "$89.99", Repeat: "True", Attempts: "1", Duration: "8m", Category: "Beauty", Purchased: "1" }
    ]
  },
  "fatigue": {
    schema: ["message_count (int64)", "last_open_days (float64)", "opt_out_risk (float64)"],
    headers: ["Customer_ID", "Message_Count", "Last_Open", "Risk_Score", "Segment"],
    rows: [
      { Customer_ID: "User_9021", Message_Count: "12", Last_Open: "14 days", Risk_Score: "0.85", Segment: "High_Risk" },
      { Customer_ID: "User_1142", Message_Count: "2", Last_Open: "1 day", Risk_Score: "0.12", Segment: "Low_Risk" },
      { Customer_ID: "User_8841", Message_Count: "8", Last_Open: "5 days", Risk_Score: "0.55", Segment: "Medium_Risk" },
      { Customer_ID: "User_3311", Message_Count: "1", Last_Open: "0 days", Risk_Score: "0.02", Segment: "Low_Risk" },
    ]
  },
  "segmentation": {
    schema: ["ltv (float64)", "aov (float64)", "loyalty_score (float64)"],
    headers: ["Customer_ID", "LTV", "AOV", "Tier", "Churn_Prob"],
    rows: [
      { Customer_ID: "User_4421", LTV: "$1,450", AOV: "$120", Tier: "Gold", Churn_Prob: "0.05" },
      { Customer_ID: "User_8871", LTV: "$250", AOV: "$45", Tier: "Silver", Churn_Prob: "0.45" },
      { Customer_ID: "User_9912", LTV: "$8,900", AOV: "$450", Tier: "Platinum", Churn_Prob: "0.01" },
      { Customer_ID: "User_1120", LTV: "$12", AOV: "$12", Tier: "Bronze", Churn_Prob: "0.89" },
    ]
  },
  "raw-ecommerce": {
    schema: ["event_id (string)", "raw_price (string)", "geo_ip (string)"],
    headers: ["Event_ID", "Timestamp", "Action", "Raw_Price", "Geo_IP", "User_Agent"],
    rows: [
      { Event_ID: "evt_9912", Timestamp: "14:22:11", Action: "add_to_cart", Raw_Price: "142.50", Geo_IP: "192.168.1.1", User_Agent: "Mozilla/5.0" },
      { Event_ID: "evt_9913", Timestamp: "14:23:01", Action: "page_view", Raw_Price: "null", Geo_IP: "10.0.0.1", User_Agent: "Safari/604.1" },
      { Event_ID: "evt_9914", Timestamp: "14:25:44", Action: "checkout", Raw_Price: "142.50", Geo_IP: "192.168.1.1", User_Agent: "Mozilla/5.0" },
    ]
  },
  "raw-clickstream": {
    schema: ["click_id (string)", "url (string)", "referrer (string)"],
    headers: ["Click_ID", "Timestamp", "URL", "Time_On_Page", "Referrer"],
    rows: [
      { Click_ID: "clk_001", Timestamp: "10:14:01", URL: "/product/shoes", Time_On_Page: "45s", Referrer: "google.com" },
      { Click_ID: "clk_002", Timestamp: "10:15:21", URL: "/checkout", Time_On_Page: "12s", Referrer: "/product/shoes" },
      { Click_ID: "clk_003", Timestamp: "10:16:00", URL: "/thank-you", Time_On_Page: "5s", Referrer: "/checkout" },
    ]
  },
  "raw-rfm": {
    schema: ["recency (int64)", "frequency (int64)", "monetary (float64)"],
    headers: ["Customer_ID", "Recency_Days", "Freq_Count", "Monetary_Total", "RFM_Score"],
    rows: [
      { Customer_ID: "User_11", Recency_Days: "5", Freq_Count: "12", Monetary_Total: "$890.00", RFM_Score: "555" },
      { Customer_ID: "User_12", Recency_Days: "120", Freq_Count: "1", Monetary_Total: "$12.00", RFM_Score: "111" },
      { Customer_ID: "User_13", Recency_Days: "14", Freq_Count: "5", Monetary_Total: "$150.00", RFM_Score: "433" },
    ]
  }
};

export default function DatasetExplorerPage() {
  const [localDatasets, setLocalDatasets] = useState(datasets);
  const [localStore, setLocalStore] = useState(datasetStore);
  
  const [activeTab, setActiveTab] = useState<"Processed" | "Raw">("Processed");
  const [selectedDataset, setSelectedDataset] = useState(localDatasets[0]);
  const [filterQuery, setFilterQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleDatasetSwitch = (dataset: any) => {
    setSelectedDataset(dataset);
    setFilterQuery("");
    setShowFilter(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let generatedSchema: string[] = [];
        let generatedHeaders: string[] = [];
        let generatedRows: Record<string, string>[] = [];
        
        if (file.name.endsWith(".json")) {
           const parsed = JSON.parse(content);
           const arr = Array.isArray(parsed) ? parsed : [parsed];
           if (arr.length > 0) {
             generatedHeaders = Object.keys(arr[0]).slice(0, 50); // limit cols for safety
             generatedSchema = generatedHeaders.map(h => `${h} (string)`);
             generatedRows = arr.map(obj => {
               const row: any = {};
               generatedHeaders.forEach(h => row[h] = String(obj[h] || ""));
               return row;
             })
           }
        } else if (file.name.endsWith(".csv")) {
           const lines = content.split('\n').filter(l => l.trim().length > 0);
           if (lines.length > 0) {
             // Basic CSV parse (simple split, assumes no complex internal commas)
             generatedHeaders = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '')).slice(0, 50);
             generatedSchema = generatedHeaders.map(h => `${h} (string)`);
             generatedRows = lines.slice(1).map(line => {
               const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
               const row: any = {};
               generatedHeaders.forEach((h, i) => row[h] = values[i] || "");
               return row;
             });
           }
        } else {
           alert("Unsupported file format. Please upload CSV or JSON.");
           return;
        }

        if (generatedRows.length === 0) {
          alert("Could not parse rows from file.");
          return;
        }

        const newId = `upload-${Date.now()}`;
        const newDataset = {
          id: newId, 
          name: file.name, 
          rows: String(generatedRows.length), 
          columns: generatedHeaders.length, 
          size: `${(file.size / 1024).toFixed(1)} KB`, 
          status: "Clean", 
          type: activeTab
        };

        setLocalStore(prev => ({
          ...prev,
          [newId]: { schema: generatedSchema, headers: generatedHeaders, rows: generatedRows }
        }));
        
        setLocalDatasets(prev => [newDataset, ...prev]);
        setSelectedDataset(newDataset);
        alert("Dataset uploaded successfully");
      } catch (err) {
        alert("Error parsing file");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // clear input
  };

  const handleRemoveDataset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalDatasets(prev => prev.filter(d => d.id !== id));
    if (selectedDataset.id === id) {
      const remaining = localDatasets.filter(d => d.id !== id && d.type === activeTab);
      setSelectedDataset(remaining[0] || datasets[0]);
    }
  };

  const filteredDatasets = localDatasets.filter(d => d.type === activeTab);
  const activeData = localStore[selectedDataset.id] || localStore["conversion"];

  const filteredRows = activeData.rows.filter(row => {
    if (!filterQuery) return true;
    return Object.values(row).some(val => val.toLowerCase().includes(filterQuery.toLowerCase()));
  });

  const handleExport = () => {
    const headerRow = activeData.headers.join(",");
    const csvRows = filteredRows.map(row => 
      activeData.headers.map(h => `"${row[h] || ""}"`).join(",")
    );
    const csvContent = [headerRow, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDataset.name}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalCells = activeData.rows.length * activeData.headers.length;
  const nonNullCells = activeData.rows.reduce((acc, row) => {
    return acc + activeData.headers.reduce((hAcc, h) => {
      const val = row[h];
      return hAcc + (val && val !== "null" && val !== "" ? 1 : 0);
    }, 0);
  }, 0);
  const completeness = totalCells > 0 ? (nonNullCells / totalCells) * 100 : 100;

  const totalUniqueRatios = activeData.headers.reduce((acc, h) => {
    const uniques = new Set(activeData.rows.map(row => row[h]));
    return acc + (activeData.rows.length > 0 ? (uniques.size / activeData.rows.length) : 1);
  }, 0);
  const uniqueDensity = activeData.headers.length > 0 ? (totalUniqueRatios / activeData.headers.length) * 100 : 100;

  const consistency = 100;
  const overallScore = (completeness + uniqueDensity + consistency) / 3;

  const getMetricColor = (val: number) => {
    if (val >= 80) return "bg-emerald-500";
    if (val >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

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
            <div className="flex p-1 bg-black/40 rounded-lg border border-white/5 backdrop-blur-md mb-1">
              <button
                onClick={() => { setActiveTab("Processed"); setSelectedDataset(localDatasets.find(d => d.type === "Processed") || datasets[0]); }}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === "Processed" ? "bg-white/10 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Processed
              </button>
              <button
                onClick={() => { setActiveTab("Raw"); setSelectedDataset(localDatasets.find(d => d.type === "Raw") || datasets[3]); }}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-all",
                  activeTab === "Raw" ? "bg-white/10 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Raw Streams
              </button>
            </div>

            <label className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/5 hover:border-white/40 transition-colors text-sm font-medium text-zinc-300 cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload Dataset
              <input type="file" accept=".csv,.json" onChange={handleFileUpload} className="hidden" />
            </label>

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
                    onClick={() => handleDatasetSwitch(dataset)}
                    className={cn(
                      "w-full text-left px-4 py-3 flex flex-col gap-1 border-b border-white/5 transition-all text-left group",
                      selectedDataset.id === dataset.id 
                        ? "bg-blue-500/10 border-l-4 border-l-blue-500" 
                        : "hover:bg-white/5 border-l-4 border-l-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white truncate max-w-[150px]">{dataset.name}</span>
                      <div className="flex items-center gap-3">
                        <div onClick={(e) => handleRemoveDataset(dataset.id, e)} className="p-1 bg-white/5 hover:bg-rose-500/20 rounded-md text-rose-500 hover:text-rose-400 transition-all shadow-sm border border-white/5">
                          <Trash2 className="h-3 w-3" />
                        </div>
                        {dataset.status === 'Clean' ? (
                          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        )}
                      </div>
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
            {/* Continuous Optimization Engine */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 mb-6">
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
                  <AnimatePresence>
                    {showFilter && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "200px" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          autoFocus
                          type="text"
                          value={filterQuery}
                          onChange={(e) => setFilterQuery(e.target.value)}
                          placeholder="Search Geo_IP, Price, etc..."
                          className="w-full h-full bg-black/40 border border-white/10 rounded-lg px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button 
                    onClick={() => setShowFilter(!showFilter)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium text-white transition-colors",
                      showFilter || filterQuery ? "bg-white/10 border-white/20" : "bg-white/5 hover:bg-white/10 border-white/10"
                    )}
                  >
                    <Filter className="h-3 w-3" /> Filter
                  </button>
                  <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors">
                    <HardDriveDownload className="h-3 w-3" /> Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-white/5 text-zinc-400 bg-black/20">
                      {activeData.headers.map((header, i) => (
                         <th key={i} className="px-5 py-3 font-medium">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRows.length === 0 ? (
                      <tr>
                        <td colSpan={activeData.headers.length} className="px-5 py-8 text-center text-zinc-500 text-xs">
                          No records match your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredRows.map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          {activeData.headers.map((header, j) => (
                            <td key={j} className={cn(
                              "px-5 py-2.5",
                              j === 0 ? "text-zinc-300 font-mono text-xs" : "text-zinc-400",
                              row[header] === "1" || row[header] === "High_Risk" ? "text-rose-400" : ""
                            )}>
                               {row[header] === "1" ? (
                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">1</span>
                               ) : row[header] === "0" ? (
                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400">0</span>
                               ) : (
                                 row[header]
                               )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schema & Heatmap Cards */}
            <div className="grid grid-cols-2 gap-6 mt-2">
              <div className="glass-panel rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileJson className="h-4 w-4 text-purple-400" />
                  <h2 className="text-sm font-semibold text-white">Schema Alignment</h2>
                </div>
                <div className="space-y-3">
                  {activeData.schema.map((schema, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5">
                      <span className="text-xs font-mono text-zinc-300">{schema}</span>
                      <AlertCircle className="h-3 w-3 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel rounded-xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold text-white">Data Quality Score</h2>
                </div>
                <div className="space-y-4 mb-5">
                  {[
                    { label: "Completeness", value: completeness },
                    { label: "Unique Density", value: uniqueDensity },
                    { label: "Consistency", value: consistency },
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-24 text-xs font-medium text-zinc-400">{metric.label}</div>
                      <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          className={`h-full ${getMetricColor(metric.value)}`}
                        />
                      </div>
                      <div className="w-12 text-right text-xs font-mono text-zinc-300">
                        {metric.value.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cn(
                  "flex items-center justify-between px-3 py-2 border rounded-lg",
                  overallScore >= 80 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : 
                  overallScore >= 50 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : 
                  "bg-rose-500/10 text-rose-400 border-rose-500/20"
                )}>
                  <span className="text-sm font-semibold">Overall Quality Score</span>
                  <span className="text-lg font-bold">{overallScore.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
