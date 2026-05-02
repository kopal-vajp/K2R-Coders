"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Smartphone, Send, Settings, Check, CheckCheck, MoreVertical, Phone, Video, Globe, Database, User, ChevronDown, Search, Sparkles, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Channel = "WhatsApp" | "SMS" | "Instagram";

type Message = { id: number, type?: "system", sender?: "user" | "brand", text: string, time?: string, status?: string, cta?: string };

const demoConversations: Record<string, { name: string; userId: string; category: string; topic: string; channel: Channel; messages: Message[] }> = {
  "Elena Markush": {
    name: "Elena Markush",
    userId: "USR-8192",
    category: "Fitness",
    topic: "Fitness",
    channel: "WhatsApp",
    messages: [
      { id: 1, type: "system", text: "Today 8:00 AM" },
      { id: 2, sender: "brand", text: "Ready to crush your goals this week? 💪 Your personalized workout plan is ready.", time: "8:00 AM", status: "read" },
      { id: 3, sender: "user", text: "Yes! But my knee is a bit sore today.", time: "8:05 AM" },
      { id: 4, sender: "brand", text: "Got it. I've adjusted your plan to feature an upper-body focus and active recovery.", time: "8:06 AM", status: "delivered", cta: "View Updated Plan" }
    ]
  },
  "Chloe Vance": {
    name: "Chloe Vance",
    userId: "USR-4021",
    category: "Food Order",
    topic: "Food Order",
    channel: "SMS",
    messages: [
      { id: 1, type: "system", text: "Yesterday 7:15 PM" },
      { id: 2, sender: "user", text: "I want to reorder my usual Friday night sushi, but add spicy mayo this time.", time: "7:15 PM" },
      { id: 3, sender: "brand", text: "Done! I've added spicy mayo to your Sakura Sushi cart. The total is $28.50. Shall I place the order?", time: "7:16 PM", status: "delivered", cta: "Confirm Order" }
    ]
  },
  "Samuel T.": {
    name: "Samuel T.",
    userId: "USR-9934",
    category: "Travel",
    topic: "Travel",
    channel: "Instagram",
    messages: [
      { id: 1, type: "system", text: "Today 9:10 AM" },
      { id: 2, sender: "user", text: "I'm looking for a weekend getaway from NYC. Somewhere outdoors but close.", time: "9:10 AM" },
      { id: 3, sender: "brand", text: "Check out these cabins in the Catskills! Just a 2-hour drive, hiking trails nearby, and currently 15% off for this weekend.", time: "9:11 AM", status: "delivered", cta: "View Cabins" }
    ]
  }
};

export default function ChatSimulatorPage() {
  const [selectedProfile, setSelectedProfile] = useState("Elena Markush");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (deliveryDropdownRef.current && !deliveryDropdownRef.current.contains(event.target as Node)) {
        setDeliveryDropdownOpen(false);
      }
      if (complianceDropdownRef.current && !complianceDropdownRef.current.contains(event.target as Node)) {
        setComplianceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProfiles = Object.keys(demoConversations).filter(key => {
    const term = userSearchTerm.toLowerCase();
    return key.toLowerCase().includes(term) || demoConversations[key].userId.toLowerCase().includes(term);
  });

  const channel = demoConversations[selectedProfile]?.channel || "WhatsApp";
  // Pre-Chat Setup Hook
  const [escalation, setEscalation] = useState<number | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Playback state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Privacy Logic Hooks
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Post-Simulation Analysis Hooks
  const [simulationEnded, setSimulationEnded] = useState(false);
  const [privacyChoice, setPrivacyChoice] = useState<boolean | null>(null);
  const [storedData, setStoredData] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Restart playback when profile changes
  useEffect(() => {
    setMessages([]);
    setIsTyping(false);
    setInputValue("");
    setSimulationEnded(false);
    setPrivacyChoice(null);
    setStoredData(null);
  }, [selectedProfile]);

  // Initialize messages instantly without playback loop for simplicity to support privacy logic mapping
  useEffect(() => {
    const convo = demoConversations[selectedProfile]?.messages || [];
    setMessages([...convo]);
  }, [selectedProfile]);

  const handleSend = () => {
    if (!inputValue.trim() || escalation === null) return;
    setPendingMessage(inputValue);
    setShowPrivacyModal(true);
    setInputValue("");
  };

  const handlePrivacyDecision = (consentGiven: boolean) => {
    if (!pendingMessage) return;

    const userText = pendingMessage;
    // Add user message
    const newMsg: Message = { id: Date.now(), sender: "user", text: userText, time: "Just now" };

    // We update local snap for analytics logging synchronously
    const snapshotVars = [...messages, newMsg];

    setMessages(prev => [...prev, newMsg]);
    setShowPrivacyModal(false);
    setPendingMessage(null);

    // Record Choice
    setPrivacyChoice(consentGiven);

    // Simulate AI response based on Privacy Context
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      const responseText = consentGiven
        ? "Got it! Your preferences have been saved. We will personalize future recommendations based on your input."
        : "Your message will remain private and will not be used for personalization.";

      const finalAI: Message = { id: Date.now() + 1, sender: "brand", text: responseText, time: "Just now", status: "sent" };

      setMessages(prev => [...prev, finalAI]);

      setSimulationEnded(true);

      if (consentGiven) {
        const payload = {
          fullConversation: [...snapshotVars, finalAI],
          channel: channel,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          intent: demoConversations[selectedProfile].category,
          engagement: Math.floor(Math.random() * 15 + 85), // Random 85-99%
          privacyRestricted: false
        };
        setStoredData(payload);
        localStorage.setItem("simulatorData", JSON.stringify(payload));

        // Trigger recommendation popup after 3 seconds
        setTimeout(() => setShowRecommendation(true), 3000);
      } else {
        localStorage.setItem("simulatorData", JSON.stringify({ privacyRestricted: true }));
      }

    }, 1500);
  };

  // Real-time states for Global intelligence layer features
  const [multiLanguage, setMultiLanguage] = useState(true);
  const [deliveryTiming, setDeliveryTiming] = useState("Timezone-Optimized");
  const [deliveryDropdownOpen, setDeliveryDropdownOpen] = useState(false);
  const deliveryDropdownRef = useRef<HTMLDivElement>(null);

  const [complianceMode, setComplianceMode] = useState("Auto-Enforce (GDPR)");
  const [complianceDropdownOpen, setComplianceDropdownOpen] = useState(false);
  const complianceDropdownRef = useRef<HTMLDivElement>(null);

  const [toneLocalization, setToneLocalization] = useState(true);
  const [isAutoPilot, setIsAutoPilot] = useState(false);

  // Auto-Pilot Logic
  useEffect(() => {
    let timer: any;
    if (isAutoPilot && !isTyping && !showPrivacyModal && !simulationEnded) {
       // Simulate user typing a response after a delay
       timer = setTimeout(() => {
         const autoResponses = [
           "Tell me more about the features.",
           "Yes, I'm interested! Send me the link.",
           "How much does it cost with the discount?",
           "Can I use this on multiple devices?",
           "What's the return policy for this?"
         ];
         const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
         setPendingMessage(randomResponse);
         setShowPrivacyModal(true);
       }, 3000);
    } else if (isAutoPilot && showPrivacyModal) {
       // Automatically make a privacy decision
       timer = setTimeout(() => {
         handlePrivacyDecision(Math.random() > 0.3); // 70% chance of consent
       }, 2000);
    } else if (isAutoPilot && simulationEnded) {
       // Switch to a new profile after a while to keep the loop going
       timer = setTimeout(() => {
         const profiles = Object.keys(demoConversations);
         const nextIndex = (profiles.indexOf(selectedProfile) + 1) % profiles.length;
         setSelectedProfile(profiles[nextIndex]);
       }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPilot, isTyping, showPrivacyModal, simulationEnded, selectedProfile]);

  const toggleMultiLanguage = () => setMultiLanguage(!multiLanguage);
  const toggleTone = () => setToneLocalization(!toneLocalization);

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Cross-Channel Identity Orchestration</h1>
          <p className="text-sm text-zinc-400">Test and preview AI-generated dialogues across native device interfaces with persistent identity.</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAutoPilot(!isAutoPilot)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border shadow-xl backdrop-blur-md",
              isAutoPilot 
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" 
                : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
            )}
          >
            <Zap className={cn("h-4 w-4", isAutoPilot ? "fill-emerald-400 animate-pulse" : "")} />
            {isAutoPilot ? "Auto-Pilot Active" : "Enable Auto-Pilot"}
          </button>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            {Object.keys(demoConversations).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedProfile(c)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  selectedProfile === c
                    ? "bg-white/10 text-white shadow-md"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                {demoConversations[c].channel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl items-start">

        {/* Left Panel: Configuration */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-xl border border-white/5 p-6 relative z-30">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-indigo-400" />
              Simulation Parameters
            </h2>
            <div className="space-y-5">
              <div className="relative" ref={profileDropdownRef}>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Identity Profile Channel</label>
                <div
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 px-3 text-sm text-white cursor-pointer hover:border-indigo-500/50 transition-colors flex justify-between items-center shadow-inner"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium">{selectedProfile}</span>
                    <span className="text-zinc-500 text-xs ml-1">• {demoConversations[selectedProfile]?.channel}</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", profileDropdownOpen && "rotate-180")} />
                </div>
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                      className="absolute w-full mt-2 bg-zinc-950 border border-white/10 rounded-xl overflow-hidden z-20 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                    >
                      <div className="p-2 border-b border-white/10 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Search name or ID..."
                          value={userSearchTerm}
                          onChange={(e) => setUserSearchTerm(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredProfiles.length > 0 ? (
                          filteredProfiles.map(key => (
                            <div
                              key={key}
                              onClick={() => { setSelectedProfile(key); setProfileDropdownOpen(false); setUserSearchTerm(""); }}
                              className={cn(
                                "px-3 py-3 flex flex-col cursor-pointer transition-colors hover:bg-white/5",
                                selectedProfile === key ? "bg-indigo-500/10 border-l-2 border-indigo-500" : "border-l-2 border-transparent"
                              )}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-white">{key}</span>
                                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-500/20">{demoConversations[key].channel}</span>
                              </div>
                              <span className="text-xs text-zinc-400 mt-1 line-clamp-1">
                                {demoConversations[key].topic} Flow <span className="text-zinc-600 ml-1 font-mono">{demoConversations[key].userId}</span>
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-sm text-zinc-500">
                            No matching users found
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Escalation Threshold {!escalation && <span className="text-rose-400 ml-1">(Required to Chat)</span>}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range" min="0" max="100"
                    value={escalation ?? 0}
                    onChange={(e) => setEscalation(parseInt(e.target.value))}
                    className="flex-1 accent-indigo-500"
                  />
                  <span className="text-sm font-mono text-indigo-400">{escalation !== null ? escalation + '%' : 'N/A'}</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">Chat simulator will be disabled until an escalation limit is explicitly defined for the flow.</p>
              </div>
            </div>
          </div>

          {/* Global Intelligence Layer */}
          <div className="glass-panel rounded-xl border border-white/5 p-6 mt-2">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              Global Intelligence Layer
            </h2>
            <div className="space-y-4">
              <div onClick={toggleMultiLanguage} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 cursor-pointer">
                <span className="text-xs text-white font-medium">Multi-Language Messaging</span>
                <div className={cn("h-4 w-8 rounded-full flex items-center px-1 transition-colors", multiLanguage ? "bg-emerald-500 justify-end" : "bg-zinc-600 justify-start")}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              {/* Timing Operations Dropdown */}
              <div className="relative" ref={deliveryDropdownRef}>
                <div
                  onClick={() => {
                    setDeliveryDropdownOpen(!deliveryDropdownOpen);
                    setComplianceDropdownOpen(false);
                  }}
                  className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-white font-medium">Delivery Timing Ops</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20">{deliveryTiming}</span>
                    <ChevronDown className={cn("h-3 w-3 text-zinc-400 transition-transform", deliveryDropdownOpen && "rotate-180")} />
                  </div>
                </div>
                <AnimatePresence>
                  {deliveryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                      className="absolute w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-40 shadow-2xl"
                    >
                      {["Timezone-Optimized", "Immediate Bypass", "Batched Off-Peak"].map(opt => (
                        <div
                          key={opt}
                          onClick={() => { setDeliveryTiming(opt); setDeliveryDropdownOpen(false); }}
                          className="px-3 py-2.5 text-xs text-white hover:bg-emerald-500/10 hover:text-emerald-400 cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regional Compliance Dropdown */}
              <div className="relative" ref={complianceDropdownRef}>
                <div
                  onClick={() => {
                    setComplianceDropdownOpen(!complianceDropdownOpen);
                    setDeliveryDropdownOpen(false);
                  }}
                  className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-3 rounded-lg border border-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xs text-white font-medium">Regional Compliance</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider bg-blue-400/10 px-2 py-0.5 rounded border border-blue-500/20">{complianceMode}</span>
                    <ChevronDown className={cn("h-3 w-3 text-zinc-400 transition-transform", complianceDropdownOpen && "rotate-180")} />
                  </div>
                </div>
                <AnimatePresence>
                  {complianceDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
                      className="absolute w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-30 shadow-2xl"
                    >
                      {["Auto-Enforce (GDPR)", "Auto-Enforce (CCPA)", "Manual Review", "Unrestricted"].map(opt => (
                        <div
                          key={opt}
                          onClick={() => { setComplianceMode(opt); setComplianceDropdownOpen(false); }}
                          className="px-3 py-2.5 text-xs text-white hover:bg-blue-500/10 hover:text-blue-400 cursor-pointer transition-colors"
                        >
                          {opt}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div onClick={toggleTone} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 cursor-pointer">
                <span className="text-xs text-white font-medium">Tone Localization</span>
                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", toneLocalization ? "text-emerald-400 bg-emerald-500/10" : "text-zinc-400 bg-zinc-600/20")}>
                  {toneLocalization ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel: Phone Frame Mockup */}
        <div className="flex justify-center">
          <div className="relative w-[340px] h-[700px] bg-black rounded-[40px] border-[8px] border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">

            {/* Fake Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20" />

            {/* App Header */}
            <div className={cn(
              "pt-10 pb-3 px-4 flex items-center justify-between z-10 shrink-0 border-b",
              channel === "WhatsApp" ? "bg-[#075E54] text-white border-[#075E54]" :
                channel === "SMS" ? "bg-[#1C1C1E] text-white border-white/10" :
                  "bg-black text-white border-white/10"
            )}>
              {channel === "WhatsApp" && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <img src="https://i.pravatar.cc/100?u=brand" alt="Brand" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">AI Assistant</span>
                      <span className="text-[10px] text-white/70">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <Video className="h-5 w-5" />
                    <Phone className="h-4 w-4" />
                    <MoreVertical className="h-5 w-5" />
                  </div>
                </>
              )}
              {channel === "SMS" && (
                <div className="flex w-full items-center justify-between pt-2">
                  <div className="text-blue-500 flex items-center gap-1">
                    <span className="pr-1 text-2xl -mt-1 leading-none shadow-none text-blue-500 rounded-none bg-transparent">‹</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="h-6 w-6 rounded-full bg-zinc-600 flex items-center justify-center text-[10px] text-white font-semibold">AI</div>
                    <span className="text-xs font-semibold mt-1">Assistant </span>
                  </div>
                  <div className="text-sm text-blue-500">&nbsp;</div> {/* Spacer */}
                </div>
              )}
              {channel === "Instagram" && (
                <>
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="text-white text-xl">‹</div>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[1.5px]">
                        <div className="h-full w-full bg-black rounded-full overflow-hidden border border-black">
                          <img src="https://i.pravatar.cc/100?u=brand" alt="Brand" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[13px] font-bold">brand_ai</span>
                        <span className="text-[10px] text-white/60">Official</span>
                      </div>
                    </div>
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                </>
              )}
            </div>

            {/* Chat Body */}
            <div className={cn(
              "flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative",
              channel === "WhatsApp" ? "bg-[#E5DDD5]" : "bg-black"
            )}>
              {/* Background Pattern for WA */}
              {channel === "WhatsApp" && (
                <div className="absolute inset-0 opacity-10 bg-[url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')] bg-repeat" />
              )}

              <AnimatePresence>
                {messages.map((msg, idx) => {
                  if (msg.type === "system") {
                    return (
                      <div key={`msg-` + idx} className="flex justify-center my-2 relative z-10 w-full shrink-0">
                        <span className="bg-zinc-800/90 text-white/90 text-[10px] font-medium px-3 py-1 rounded-lg backdrop-blur-md shadow-sm border border-white/10">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isBrand = msg.sender === "brand";
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      key={`msg-` + idx}
                      className={cn(
                        "relative z-10 max-w-[80%] flex flex-col shrink-0",
                        isBrand ? "self-start" : "self-end"
                      )}
                    >
                      <div className={cn(
                        "px-3 py-2 text-[13px] relative w-auto max-w-full shadow-lg",
                        channel === "WhatsApp" ? "rounded-xl shadow-sm" : channel === "SMS" ? "rounded-2xl" : "rounded-3xl px-4 py-2.5",
                        isBrand
                          ? channel === "WhatsApp" ? "bg-white text-black rounded-tl-sm" : channel === "SMS" ? "bg-[#262628] text-white" : "bg-[#262626] text-white"
                          : channel === "WhatsApp" ? "bg-[#DCF8C6] text-black rounded-tr-sm" : channel === "SMS" ? "bg-[#0A84FF] text-white" : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                      )}>
                        <span>{msg.text}</span>

                        {channel === "WhatsApp" && (
                          <div className={cn(
                            "flex items-center justify-end gap-1 mt-1",
                            isBrand ? "text-zinc-400" : "text-emerald-700/60"
                          )}>
                            <span className="text-[9px]">{msg.time}</span>
                            {isBrand && msg.status && (
                              msg.status === "read" ? <CheckCheck className="h-3 w-3 text-blue-500" /> :
                                msg.status === "delivered" ? <CheckCheck className="h-3 w-3" /> :
                                  <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>

                      {channel === "SMS" && (
                        <div className={cn("text-[9px] text-zinc-500 mt-1", isBrand ? "ml-2" : "mr-2 text-right")}>{msg.time}</div>
                      )}

                      {channel === "Instagram" && idx === messages.length - 1 && (
                        <div className={cn("text-[9px] text-zinc-500 mt-1", isBrand ? "ml-2" : "mr-2 text-right")}>Seen {msg.time}</div>
                      )}

                      {/* CTA Mockup */}
                      {msg.cta && (
                        <div className="mt-1 w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-xs font-semibold py-2 text-center rounded-lg shadow transition-colors z-20 relative">
                          {msg.cta}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="self-start bg-zinc-800 rounded-full px-4 py-2 mt-2 shrink-0 shadow-lg relative z-10"
                  >
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} className="shrink-0 h-1 w-full" />
            </div>

            {/* Input Area */}
            <div className={cn(
              "shrink-0 p-3 pt-2 border-t z-20 transition-all",
              escalation === null ? "opacity-50 pointer-events-none grayscale" : "opacity-100",
              channel === "WhatsApp" ? "bg-[#1e2428] border-white/5" :
                channel === "SMS" ? "bg-[#1C1C1E] border-white/10" :
                  "bg-black border-white/10"
            )}>
              <div className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 border",
                channel === "WhatsApp" ? "bg-[#2A2F32] border-transparent" :
                  channel === "SMS" ? "bg-black border-zinc-700" :
                    "bg-zinc-900 border-zinc-800"
              )}>
                {channel === "Instagram" && (
                  <div className="bg-blue-500 rounded-full h-7 w-7 text-white flex items-center justify-center text-lg shrink-0">+</div>
                )}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={channel === "Instagram" ? "Message..." : channel === "SMS" ? "iMessage" : "Type a message"}
                  className="flex-1 bg-transparent text-[13px] text-white placeholder-zinc-500 focus:outline-none placeholder:text-zinc-500/80"
                />
                {inputValue.trim() ? (
                  <button
                    onClick={handleSend}
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-white shrink-0 transition-colors",
                      channel === "WhatsApp" ? "bg-[#00A884]" : channel === "SMS" ? "bg-[#0A84FF]" : "bg-gradient-to-tr from-purple-500 to-indigo-500"
                    )}
                  >
                    {channel === "SMS" ? <span className="transform -rotate-90 text-[10px]">&uarr;</span> : <Send className="h-3 w-3 -ml-[1px]" />}
                  </button>
                ) : null}
              </div>
            </div>

            <AnimatePresence>
              {showPrivacyModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 z-[60] backdrop-blur-sm flex items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl w-full"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 mx-auto">
                      <Settings className="w-6 h-6" />
                    </div>
                    <h3 className="text-white text-base font-semibold text-center mb-2">Consent Requested</h3>
                    <p className="text-sm text-zinc-400 text-center mb-6">
                      Do you allow us to securely analyze this conversation to provide personalized recommendations?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handlePrivacyDecision(true)}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors shadow-lg"
                      >
                        YES (Use Data)
                      </button>
                      <button
                        onClick={() => handlePrivacyDecision(false)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors"
                      >
                        NO (Keep Private)
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-20 left-4 right-4 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border border-indigo-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-2xl p-4 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  <div className="flex gap-3 items-start relative mt-1">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-bold flex justify-between items-center">
                        AI Recommendation
                        <button onClick={() => setShowRecommendation(false)} className="text-zinc-500 hover:text-white transition-colors"><X className="h-4 w-4" /></button>
                      </h4>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                        Based on your interest in <strong>{demoConversations[selectedProfile]?.topic || "this topic"}</strong>, we've unlocked a personalized offer for you.
                      </p>
                      <button className="w-full mt-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors">
                        View Offer Spotlight
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {simulationEnded && privacyChoice === true && (
        <div className="w-full max-w-5xl mx-auto mt-12 glass-panel rounded-xl border border-white/5 p-8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400" />
            Post-Simulation Analysis Pipeline
          </h2>

          <div className="flex flex-col gap-8">
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
              <CheckCheck className="h-5 w-5" />
              Conversation Stored Successfully. Full Conversation Captured. Consent Explicit.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conversation Log */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-6 shadow-inner h-[400px] overflow-y-auto custom-scrollbar">
                <h3 className="text-white text-sm font-bold tracking-wide uppercase mb-4 opacity-80 sticky top-0 bg-black/80 backdrop-blur-md pb-2 z-10">Structured Extraction Log</h3>
                <div className="space-y-3 text-sm font-mono mt-2">
                  <div className="flex justify-between items-center"><span className="text-zinc-500">Pipeline Origin:</span><span className="text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{storedData?.channel}</span></div>
                  <div className="flex justify-between items-center"><span className="text-zinc-500">Sync Timestamp:</span><span className="text-zinc-300">{storedData?.timestamp}</span></div>
                  <div className="flex justify-between items-center"><span className="text-zinc-500">Classified Intent:</span><span className="text-blue-400">{storedData?.intent}</span></div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="text-zinc-500 block mb-4 text-xs font-bold uppercase tracking-widest">Full Conversation Captured:</span>

                    <div className="space-y-4">
                      {storedData?.fullConversation.map((msg: Message, idx: number) => {
                        if (msg.type === "system" || !msg.sender) return null;
                        return (
                          <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider mb-1 block", msg.sender === "user" ? "text-blue-400" : "text-emerald-400")}>
                              {msg.sender === "user" ? "USER" : "SYSTEM"}
                            </span>
                            <div className="text-zinc-300 text-xs leading-relaxed">"{msg.text}"</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Panel */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-6 shadow-inner space-y-6">
                <h3 className="text-white text-sm font-bold tracking-wide uppercase mb-4 opacity-80">Engagement Insight Array</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5"><span className="text-zinc-400">Predicted Lifecycle Engagement</span><span className="text-emerald-400">{storedData?.engagement}%</span></div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${storedData?.engagement}%` }} transition={{ duration: 1, ease: "easeOut" }} className="bg-emerald-500 h-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5"><span className="text-zinc-400">Upsell Conversion Likelihood</span><span className="text-blue-400">High</span></div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className="bg-blue-500 h-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Automated Next Best Action</h4>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 text-xs text-zinc-300 leading-relaxed relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500" />
                    Based on the full conversation context matched against behavioral intent modeling, Action Queued: Dispatch personalized retention campaign to user via <strong className="text-white font-semibold">{storedData?.channel}</strong> tomorrow morning.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
