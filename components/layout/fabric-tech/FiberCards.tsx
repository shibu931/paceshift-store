const fibers = [
  {
    number: "01",
    percentage: "70%",
    name: "Bamboo Viscose",
    title: "The Foundation.",
    image: "/images/bamboo.webp",
    description:
      "Naturally soft, breathable, and comfortable against the skin. The foundation of the blend.",
    points: [
      "Soft hand feel",
      "Breathable",
      "Moisture management",
    ],
  },
  {
    number: "02",
    percentage: "20%",
    name: "Nylon",
    title: "The Structure.",
    image: "/images/nylon.webp",
    description:
      "Adds structure and durability, helping the sock maintain its shape through repeated wear.",
    points: [
      "Shape retention",
      "Durability",
      "Repeated-use performance",
    ],
  },
  {
    number: "03",
    percentage: "10%",
    name: "Spandex",
    title: "The Stretch.",
    image: "/images/spandex.webp",
    description:
      "Provides elasticity for a secure fit that moves with you.",
    points: [
      "Elasticity",
      "Flexible fit",
      "Recovery",
    ],
  },
];

export function FiberCards() {
  return (
    <section className="py-24">
      <div className="container-screen">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
            The Three Fibers
          </p>

          <h2 className="mt-4 font-heading text-4xl font-bold uppercase sm:text-5xl">
            Built For Performance
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {fibers.map((fiber) => (
            <FiberCard
              key={fiber.name}
              fiber={fiber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
interface Fiber {
  number: string;
  percentage: string;
  name: string;
  title: string;
  image: string;
  description: string;
  points: string[];
}

function FiberCard({ fiber }: { fiber: Fiber }) {
  return (
    <article className="group relative min-h-135 overflow-hidden border border-white/10 bg-neutral-950">
      {/* Image */}
      <img
        src={fiber.image}
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-40
          transition
          duration-700
          group-hover:scale-105
          group-hover:opacity-55
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

      {/* Content */}
      <div className="relative flex h-full flex-col p-7">
        <div className="text-xs font-bold tracking-[0.2em] text-red-500">
          {fiber.number}
        </div>

        <div className="mt-auto">
          <div className="font-heading text-5xl font-bold text-red-500">
            {fiber.percentage}
          </div>

          <h3 className="mt-2 text-sm font-bold uppercase tracking-wider">
            {fiber.name}
          </h3>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-white">
            {fiber.title}
          </p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-400">
            {fiber.description}
          </p>

          <ul className="mt-5 space-y-2">
            {fiber.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs text-neutral-400"
              >
                <span className="h-1 w-1 rounded-full bg-red-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}