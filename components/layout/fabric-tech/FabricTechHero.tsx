import Image from "next/image";

export function FabricTechHero() {
  return (
    <section className="relative min-h-180 overflow-hidden border-b border-white/10">
      {/* Background grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.12]
          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* Red ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-600/10
          blur-[140px]
        "
      />

      <div className="relative mx-auto grid min-h-[720px] container-screen items-center px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* Content */}
        <div className="relative z-10 pt-24 lg:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">
            Fabric Tech
          </p>

          <h1
            className="
              mt-5
              max-w-3xl
              font-heading
              text-5xl
              font-bold
              uppercase
              leading-[0.95]
              tracking-wide
              sm:text-6xl
              lg:text-7xl
            "
          >
            Engineered
            <br />
            From The Fiber Up.
          </h1>

          <p className="mt-7 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
            Every PaceShift sock is built with purpose.
            Three premium fibers. One performance system.
          </p>

          {/* Composition numbers */}
          <div className="mt-10 flex max-w-lg">
            <CompositionStat
              percentage="70%"
              name="Bamboo Viscose"
              active
            />

            <CompositionStat
              percentage="20%"
              name="Nylon"
            />

            <CompositionStat
              percentage="10%"
              name="Spandex"
            />
          </div>

          <div className="mt-12 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700">
              ↓
            </span>

            Scroll to explore
          </div>
        </div>

        {/* Product visual */}
        <div className="relative hidden h-full lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/hero_sock.webp"
              alt="PaceShift performance sock"
              width={600}
              height={600}
              priority
              className="relative z-10 object-contain"
            />
          </div>

          {/* Decorative lines */}
          <div className="absolute inset-0">
            <div className="absolute right-0 top-[45%] h-px w-[70%] bg-red-500/30 rotate-[-18deg]" />
            <div className="absolute right-[-10%] top-[52%] h-px w-[75%] bg-red-500/20 rotate-[-18deg]" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface CompositionStatProps {
  percentage: string;
  name: string;
  active?: boolean;
}

function CompositionStat({
  percentage,
  name,
  active = false,
}: CompositionStatProps) {
  return (
    <div className="flex-1 border-r border-white/10 px-5 first:pl-0 last:border-r-0">
      <div
        className={`text-3xl font-bold ${
          active ? "text-red-500" : "text-white"
        }`}
      >
        {percentage}
      </div>

      <div className="mt-2 max-w-25 text-[10px] font-semibold uppercase leading-4 tracking-wider text-neutral-300">
        {name}
      </div>
    </div>
  );
}