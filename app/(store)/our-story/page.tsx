import { BrandManifesto } from "@/components/layout/our-story/BrandManifesto";
import { BrandValues } from "@/components/layout/our-story/BrandValues";
import { BuiltForMovement } from "@/components/layout/our-story/BuiltForMovement";
import { OurPhilosophy } from "@/components/layout/our-story/OurPhilosophy";
import { ProductStandard } from "@/components/layout/our-story/ProductStandard";
import { StoryCTA } from "@/components/layout/our-story/StoryCTA";
import { StoryHero } from "@/components/layout/our-story/StoryHero";
import { TheProblem } from "@/components/layout/our-story/TheProblem";
import { TheShift } from "@/components/layout/our-story/TheShift";

export default function StoryPage() {
  return (
    <main className="overflow-hidden bg-[#0b0b0c] text-white">
      <StoryHero />

      <BrandManifesto />

      <TheProblem />

      <TheShift />

      <OurPhilosophy />

      <ProductStandard />

      <BuiltForMovement />

      <BrandValues />

      <StoryCTA />
    </main>
  );
}