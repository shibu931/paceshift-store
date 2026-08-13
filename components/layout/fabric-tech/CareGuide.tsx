import {
  Ban,
  Wind,
  WashingMachine,
  X,
} from "lucide-react";

const careItems = [
  {
    icon: WashingMachine,
    title: "Machine Wash Cold",
    description: "Wash with similar colors.",
  },
  {
    icon: Ban,
    title: "Do Not Bleach",
    description: "Avoid harsh chemicals.",
  },
  {
    icon: Wind,
    title: "Air Dry",
    description: "Let it dry naturally.",
  },
  {
    icon: X,
    title: "Do Not Iron",
    description: "Avoid high heat.",
  },
];

export function CareGuide() {
  return (
    <section className="py-24">
      <div className="container-screen">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
              Care Guide
            </p>

            <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-[1] sm:text-5xl">
              Take Care.
              <br />
              Perform Longer.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {careItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    border
                    border-white/10
                    px-5
                    py-7
                    text-center
                    transition-colors
                    hover:border-red-500/50
                  "
                >
                  <Icon
                    className="mx-auto h-8 w-8 text-neutral-300"
                    strokeWidth={1}
                  />

                  <h3 className="mt-5 text-xs font-bold uppercase tracking-wide">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}