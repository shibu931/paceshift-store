import Image from "next/image";

export default function Editorial() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      {/* Background Image */}

      <Image
        src="/images/cyclist_racing.jpeg"
        alt="Cyclist racing in PaceShift kit at the Himalayan Cycling Challenge"
        fill
        className="object-cover object-[center_28%]"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,11,.94)_0%,rgba(10,10,11,.3)_48%,rgba(10,10,11,.05)_100%)]" />

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-310 px-8 pb-16 max-[500px]:px-5">

        <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-[#ec0116] before:h-px before:w-6 before:bg-[#ec0116] after:h-px after:w-6 after:bg-[#ec0116]">
          Built To Perform
        </p>

        <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold uppercase leading-[1.05]">
          FROM THE PLAINS
          <br />
          TO THE <span className="text-[#ec0116]">PASSES.</span>
        </h2>

      </div>
    </section>
  );
}