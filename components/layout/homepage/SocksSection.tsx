import Image from "next/image";
import Button from "@/components/common/Button";

import {ComfortIcon} from "@/components/icons/index.tsx";
import {MoistureIcon} from "@/components/icons/index.tsx";
import {CushionIcon} from "@/components/icons/index.tsx";
import {ArchSupportIcon} from "@/components/icons/index.tsx";
import {DurabilityIcon} from "@/components/icons/index.tsx";

export default function SocksSection() {
  return (
    <section id="socks" className="bg-[#121214] py-36 max-[900px]:py-24">
      <div className="container-screen grid grid-cols-[0.9fr_1.1fr] items-center gap-16 px-8 max-[900px]:grid-cols-1 max-[500px]:px-5">
        
        {/* Product Image */}

        <div className="relative overflow-hidden rounded bg-[linear-gradient(145deg,#f2f2ef,#e4e4e0)] p-11">
          <span className="absolute top-[26px] right-[-52px] rotate-45 bg-[#ec0116] px-[58px] py-[6px] font-display text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg">
            Launch Offer
          </span>

          <Image
            src="/images/socks.jpeg"
            alt="PaceShift performance socks in black with red logo detailing"
            width={700}
            height={700}
            className="w-full h-auto"
          />
        </div>

        {/* Content */}

        <div>

          <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-[#ec0116] before:h-px before:w-6 before:bg-[#ec0116] after:h-px after:w-6 after:bg-[#ec0116]">
            Drop 01
          </p>

          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold uppercase leading-[1.05]">
            <span className="text-[#ec0116]">PACE</span>
            <span className="bg-gradient-to-b from-[#a8a8aa] to-[#525254] bg-clip-text text-transparent">
              SHIFT
            </span>
            <br />
            PERFORMANCE SOCKS
          </h2>

          <p className="max-w-[480px] text-base text-[#d6d6d4]">
            Engineered from the ground up for heat, distance, and everything
            your training throws at you.
          </p>

          {/* Features */}

          <div className="my-8 flex flex-col gap-[22px]">

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#ec0116]">
                <ComfortIcon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-semibold">
                  Bamboo Viscose Comfort
                </h3>
                <p className="text-sm text-[#8a8a90]">
                  Naturally soft, breathable, and temperature-regulating against skin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#ec0116]">
                <MoistureIcon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-semibold">
                  Moisture-Wicking
                </h3>
                <p className="text-sm text-[#8a8a90]">
                  Stays dry through long runs and heavy sweat sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#ec0116]">
                <CushionIcon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-semibold">
                  Cushioned Heel & Toe
                </h3>
                <p className="text-sm text-[#8a8a90]">
                  Impact protection exactly where you need it most.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#ec0116]">
                <ArchSupportIcon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-semibold">
                  Targeted Arch Support
                </h3>
                <p className="text-sm text-[#8a8a90]">
                  Compression banding for a locked-in, stable fit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#ec0116]">
                <DurabilityIcon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-semibold">
                  Reinforced Durability
                </h3>
                <p className="text-sm text-[#8a8a90]">
                  Built to outlast a full training block, wash after wash.
                </p>
              </div>
            </div>

          </div>

          {/* Material Composition */}

          <div className="my-7 flex flex-wrap gap-5 border-y border-white/10 py-[18px] font-display text-sm tracking-[0.05em]">
            <div>
              <b className="text-[#ec0116]">70%</b> Bamboo Viscose
            </div>
            <div>
              <b className="text-[#ec0116]">20%</b> Nylon
            </div>
            <div>
              <b className="text-[#ec0116]">10%</b> Spandex
            </div>
          </div>

          {/* Price */}

          <div className="mb-2 mt-8 flex flex-wrap items-baseline gap-[14px]">
            <span className="font-display text-lg text-[#8a8a90] line-through">
              ₹899
            </span>

            <span className="font-display text-4xl font-bold">
              ₹699
            </span>

            <span className="bg-[#ec0116] px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.06em] text-white">
              22% OFF
            </span>
          </div>

          <p className="mb-7 text-xs text-[#8a8a90]">
            Launch pricing · MRP inclusive of all taxes
          </p>

          <Button href="/products/paceshift-performance-crew-socks">
            View Details
          </Button>

        </div>
      </div>
    </section>
  );
}