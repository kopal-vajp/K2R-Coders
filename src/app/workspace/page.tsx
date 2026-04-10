"use client";

import { useState } from "react";
import { personas } from "@/components/workspace/mockPersonas";
import { CustomerContextLab } from "@/components/workspace/CustomerContextLab";
import { AIPredictionCore } from "@/components/workspace/AIPredictionCore";
import { MessageWorkspace } from "@/components/workspace/MessageWorkspace";
import { LiveEventStream } from "@/components/dashboard/LiveEventStream";

export default function WorkspacePage() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  return (
    <div className="pb-20 min-h-full flex flex-col">
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Decision Workspace</h1>
          <p className="text-sm text-zinc-400">Omnichannel resolution logic & explainability console</p>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
        
        {/* Column 1: Customer Context Lab */}
        <section className="lg:sticky lg:top-24 flex flex-col gap-4">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">I. Context Intake</h2>
          <CustomerContextLab 
            selectedPersona={selectedPersona} 
            onSelectPersona={setSelectedPersona} 
          />
        </section>

        {/* Column 2: AI Prediction Core */}
        <section className="flex flex-col gap-4 h-full">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">II. Logic Engine</h2>
          <AIPredictionCore persona={selectedPersona} />
        </section>

        {/* Column 3: Message Output & Explainability */}
        <section className="lg:sticky lg:top-24 flex flex-col gap-4">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">III. Resolution</h2>
          <MessageWorkspace persona={selectedPersona} />
        </section>

      </div>

      {/* Real-time signals moved down here */}
      <div className="mt-8">
        <LiveEventStream />
      </div>
    </div>
  );
}
