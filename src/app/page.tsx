import { HeroSection } from "@/components/dashboard/HeroSection";
import { KPICards } from "@/components/dashboard/KPICards";
import { DataPipeline } from "@/components/dashboard/DataPipeline";
import { LiveEventStream } from "@/components/dashboard/LiveEventStream";
import { ChatPreview } from "@/components/dashboard/ChatPreview";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";

export default function Home() {
  return (
    <div className="pb-20">
      <HeroSection />
      <KPICards />
      <DataPipeline />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2">
          <ChatPreview />
        </div>
        <div className="xl:col-span-1">
          <LiveEventStream />
        </div>
      </div>
      
      <AnalyticsCharts />
    </div>
  );
}
