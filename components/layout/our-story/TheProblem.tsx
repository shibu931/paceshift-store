export function TheProblem() {
  return (
    <section className="border-y border-white/10">
      <div className="container-screen px-0! grid lg:grid-cols-2">
        <div className="flex items-center px-5 py-24 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
              01 / The Problem
            </p>

            <h2 className="mt-5 font-heading text-4xl font-bold uppercase leading-none sm:text-6xl">
              Sportswear
              <br />
              Shouldn't Just
              <br />
              Look The Part.
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-7 text-neutral-500">
              Too often, performance becomes a marketing
              word rather than a design principle.
            </p>

            <p className="mt-5 max-w-lg text-sm leading-7 text-neutral-400">
              We wanted to approach sportswear differently:
              start with the athlete, understand the movement,
              then engineer the product around it.
            </p>
          </div>
        </div>

        <div className="relative min-h-[500px] border-l border-white/10">
          <img
            src="/images/story_problem.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}