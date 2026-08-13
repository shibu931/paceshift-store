import { CareGuide } from "@/components/layout/fabric-tech/CareGuide";
import { FabricComposition } from "@/components/layout/fabric-tech/FabricComposition";
import { FabricTechCTA } from "@/components/layout/fabric-tech/FabricTechCTA";
import { FabricTechFAQ } from "@/components/layout/fabric-tech/FabricTechFaq";
import { FabricTechHero } from "@/components/layout/fabric-tech/FabricTechHero";
import { FiberCards } from "@/components/layout/fabric-tech/FiberCards";
import { PerformanceSystem } from "@/components/layout/fabric-tech/PerformanceSystem";


export default function FabricTechPage() {
  return (
    <main className="overflow-hidden mt-10 bg-[#0b0b0c] text-white">
      <FabricTechHero />

      <FabricComposition />

      <FiberCards />

      <PerformanceSystem />

      <CareGuide />

      <FabricTechFAQ/>

      <FabricTechCTA />
    </main>
  );
}