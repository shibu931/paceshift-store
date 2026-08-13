import Editorial from "@/components/layout/homepage/Editorial";
import Fabric from "@/components/layout/homepage/Fabric";
import Hero from "@/components/layout/homepage/Hero";
import Marquee from "@/components/layout/homepage/Marquee";
import SocksSection from "@/components/layout/homepage/SocksSection";
import Story from "@/components/layout/homepage/Story";
import Waitlist from "@/components/layout/homepage/Waitlist";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Marquee/>
      <Story/>
      <SocksSection/>
      <Fabric/>
      <Editorial/>
      <Waitlist/>
    </main>
  );
}
