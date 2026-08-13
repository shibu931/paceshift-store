import {BambooIcon} from "@/components/icons/index.tsx";
import {NylonIcon} from "@/components/icons/index.tsx";
import {SpandexIcon} from "@/components/icons/index.tsx";

export default function Fabric() {
  return (
    <section id="fabric" className="py-36 max-[900px]:py-24">
      <div className="container-screen">
        <div className="mb-14 max-w-160">
          <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-[#ec0116] before:h-px before:w-6 before:bg-[#ec0116] after:h-px after:w-6 after:bg-[#ec0116]">
            The Science
          </p>

          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold uppercase leading-[1.05]">
            THREE FIBERS.
            <br />
            ONE PURPOSE.
          </h2>

          <p className="max-w-120 text-base text-ink-light">
            Every PaceShift sock is built from a precision blend —
            each fiber earning its percentage.
          </p>
        </div>

        {/* Composition Bar */}

        <div className="mb-16">
          <div
            id="compBar"
            className="flex h-3.5 overflow-hidden rounded-full bg-[#1a1a1e]"
          >
            <div
              id="segBamboo"
              className="h-full w-0 bg-[#ec0116] transition-all duration-[1400ms]"
            />

            <div
              id="segNylon"
              className="h-full w-0 bg-[#7e7e7e] transition-all duration-[1400ms]"
            />

            <div
              id="segSpandex"
              className="h-full w-0 bg-[#525254] transition-all duration-[1400ms]"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-8">
            <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.05em] text-[#d6d6d4]">
              <span className="h-[9px] w-[9px] rounded-full bg-[#ec0116]" />
              Bamboo Viscose — 70%
            </span>

            <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.05em] text-[#d6d6d4]">
              <span className="h-[9px] w-[9px] rounded-full bg-[#7e7e7e]" />
              Nylon — 20%
            </span>

            <span className="flex items-center gap-2 text-[13px] uppercase tracking-[0.05em] text-[#d6d6d4]">
              <span className="h-[9px] w-[9px] rounded-full bg-[#525254]" />
              Spandex — 10%
            </span>
          </div>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">

          <div className="border border-white/10 bg-[#1a1a1e] p-10 transition hover:-translate-y-1.5 hover:border-[#ec0116]">
            <div className="mb-5 text-[#ec0116]">
              <BambooIcon className="h-[30px] w-[30px]" />
            </div>

            <div className="mb-1 font-display text-[40px] font-bold text-[#ec0116]">
              70%
            </div>

            <h3 className="mb-3 font-display text-lg uppercase">
              Bamboo Viscose
            </h3>

            <p className="text-sm leading-6 text-[#8a8a90]">
              The foundation. Naturally moisture-wicking,
              breathable, and soft against skin, with natural
              odor resistance — built for long days and longer
              runs in the heat.
            </p>
          </div>

          <div className="border border-white/10 bg-[#1a1a1e] p-10 transition hover:-translate-y-1.5 hover:border-[#ec0116]">
            <div className="mb-5 text-[#ec0116]">
              <NylonIcon className="h-[30px] w-[30px]" />
            </div>

            <div className="mb-1 font-display text-[40px] font-bold text-[#ec0116]">
              20%
            </div>

            <h3 className="mb-3 font-display text-lg uppercase">
              Nylon
            </h3>

            <p className="text-sm leading-6 text-[#8a8a90]">
              The structure. Adds durability and shape retention,
              so your socks hold their form wash after wash,
              run after run.
            </p>
          </div>

          <div className="border border-white/10 bg-[#1a1a1e] p-10 transition hover:-translate-y-1.5 hover:border-[#ec0116]">
            <div className="mb-5 text-[#ec0116]">
              <SpandexIcon className="h-[30px] w-[30px]" />
            </div>

            <div className="mb-1 font-display text-[40px] font-bold text-[#ec0116]">
              10%
            </div>

            <h3 className="mb-3 font-display text-lg uppercase">
              Spandex
            </h3>

            <p className="text-sm leading-6 text-[#8a8a90]">
              The stretch. Four-way flexibility for a locked-in,
              compression fit that supports your arch through
              every stride.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}