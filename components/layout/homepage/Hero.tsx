import Image from "next/image";

import Button from "@/components/common/Button";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      {/* Background */}

      <Image
        src="/images/runner.jpg"
        alt="Athlete racing in PaceShift performance gear"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_22%] animate-[heroZoom_20s_ease-out_forwards]"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.55)_0%,rgba(10,10,11,.35)_35%,rgba(10,10,11,.88)_82%,rgba(10,10,11,1)_100%)]" />

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-8 pb-[110px] max-[500px]:px-5 max-[500px]:pb-20">
        <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-[#ec0116] before:h-px before:w-6 before:bg-[#ec0116] after:h-px after:w-6 after:bg-[#ec0116]">
          Introducing PaceShift
        </p>

        <h1 className="mb-5.5 font-display text-white text-[clamp(2.6rem,6.6vw,5.2rem)] font-semibold uppercase leading-[1.05] tracking-[0.01em]">
          BUILT FOR THE HEAT.
          <br />
          <span className="text-[#ec0116]">
            ENGINEERED TO WIN.
          </span>
        </h1>

        <p className="mb-[34px] max-w-[540px] text-[17px] text-[#d6d6d4]">
          A performance gear house for athletes who don't
          compromise. Meet the launch collection —
          bamboo-viscose socks and a graphene-infused race
          jersey, engineered for India's toughest training
          conditions.
        </p>

        <div className="flex flex-wrap gap-4 max-[500px]:flex-col">
          <Button href="#socks">
            View The Collection
          </Button>

          <Button
            href="#waitlist"
            variant="outline"
          >
            Join Waitlist
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}

      <div className="absolute bottom-[34px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8a8a90]">
        <span>Scroll</span>

        <div className="h-[30px] w-px animate-[scrollLine_1.8s_ease_infinite] bg-gradient-to-b from-[#ec0116] to-transparent" />
      </div>
    </section>
  );
}