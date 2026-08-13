import Image from "next/image";

export function StoryHero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden border-b border-white/10">
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.12]
          [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="absolute right-0 top-0 h-full w-full lg:w-[65%]">
        <Image
          src="/images/story_hero.webp"
          alt="PaceShift performance"
          fill
          priority
          className="object-cover object-right opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] max-w-[1400px] items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            Our Story
          </p>

          <h1 className="mt-6 font-heading text-5xl font-bold uppercase leading-[0.92] tracking-wide sm:text-6xl lg:text-7xl">
            We Didn't Start
            <br />
            With A Product.
          </h1>

          <div className="mt-8 h-px w-20 bg-red-500" />

          <p className="mt-8 max-w-xl text-base leading-7 text-neutral-300 sm:text-lg">
            We started with a question — what if performance
            sportswear could be engineered with the same
            obsession we bring to performance itself?
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">
        Scroll to explore
      </div>
    </section>
  );
}