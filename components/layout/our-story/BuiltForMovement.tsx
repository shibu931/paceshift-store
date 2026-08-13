import Image from "next/image";

export function BuiltForMovement() {
  return (
    <section className="relative border-t border-white/10 min-h-[450px] overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-full lg:w-[75%]">
        <Image
          src="/images/story_movement.png"
          alt="PaceShift performance"
          fill
          priority
          className="object-cover object-right opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex min-h-[450px] items-end">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            Built For Movement
          </p>

          <h2 className="mt-5 max-w-4xl font-heading text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
            Run.
            <br />
            Train.
            <br />
            Move.
            <br />
            Repeat.
          </h2>
        </div>
      </div>
    </section>
  );
}
