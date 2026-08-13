const composition = [
  {
    percentage: 70,
    name: "Bamboo Viscose",
    role: "Comfort & Moisture Management",
  },
  {
    percentage: 20,
    name: "Nylon",
    role: "Structure & Durability",
  },
  {
    percentage: 10,
    name: "Spandex",
    role: "Stretch & Recovery",
  },
];

export function FabricComposition() {
  return (
    <section className="border-b border-white/10 py-24">
      <div className="container-screen">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
              The Precision Blend
            </p>

            <h2 className="mt-4 max-w-xl font-heading text-4xl font-bold uppercase leading-[1] sm:text-5xl">
              Not Every Fiber
              <br />
              Has The Same Job.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
              We don't use a blend simply because it looks
              good on a specification sheet. Each fiber is
              selected for what it contributes to the finished
              sock.
            </p>
          </div>

          <div>
            <div className="flex h-4 overflow-hidden rounded-full bg-neutral-900">
              <div
                className="bg-red-500"
                style={{ width: "70%" }}
              />

              <div
                className="bg-neutral-500"
                style={{ width: "20%" }}
              />

              <div
                className="bg-neutral-700"
                style={{ width: "10%" }}
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {composition.map((item) => (
                <div key={item.name}>
                  <div className="text-2xl font-bold text-white">
                    {item.percentage}%
                  </div>

                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    {item.name}
                  </div>

                  <div className="mt-3 text-xs leading-5 text-neutral-600">
                    {item.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}