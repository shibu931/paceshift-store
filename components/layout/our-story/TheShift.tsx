export function TheShift() {
  return (
    <section className="relative py-32 sm:py-44">
      <div className="container-screen">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              02 / The Shift
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-600">
              From
            </p>

            <h2 className="mt-3 font-heading text-5xl font-bold uppercase text-neutral-700 sm:text-7xl">
              Good Enough.
            </h2>

            <div className="my-8 h-px bg-white/10" />

            <p className="text-sm uppercase tracking-[0.2em] text-red-500">
              To
            </p>

            <h2 className="mt-3 font-heading text-5xl font-bold uppercase sm:text-7xl">
              Engineered
              <br />
              With Purpose.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}