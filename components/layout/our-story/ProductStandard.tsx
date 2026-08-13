import Link from "next/link";

const standards = [
  {
    number: "01",
    title: "Material",
    description:
      "We start by selecting materials for what they contribute to the finished product.",
  },
  {
    number: "02",
    title: "Construction",
    description:
      "The way a product is built matters as much as what it is made from.",
  },
  {
    number: "03",
    title: "Testing",
    description:
      "Products should prove their purpose before they earn the PaceShift name.",
  },
];

export function ProductStandard() {
  return (
    <section className="py-28">
      <div className="container-screen">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              04 / Our Standard
            </p>

            <h2 className="mt-4 font-heading text-4xl font-bold uppercase sm:text-6xl">
              From Idea
              <br />
              To Product.
            </h2>
          </div>

          <Link
            href="/fabric-tech"
            className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 transition hover:text-white"
          >
            Explore Fabric Tech →
          </Link>
        </div>

        <div className="grid border-y border-white/10 lg:grid-cols-3">
          {standards.map((standard) => (
            <div
              key={standard.number}
              className="border-b border-white/10 p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="text-xs text-red-500">
                {standard.number}
              </span>

              <h3 className="mt-16 font-heading text-3xl font-bold uppercase">
                {standard.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-neutral-500">
                {standard.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}