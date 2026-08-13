const brandValues = [
  {
    number: "01",
    title: "Purpose",
    description:
      "Every detail earns its place. We build with intention, not simply to add another feature.",
  },
  {
    number: "02",
    title: "Performance",
    description:
      "Function comes before decoration. Every product starts with what it needs to do.",
  },
  {
    number: "03",
    title: "Progress",
    description:
      "There is always another level. We continuously refine our products, our process, and our thinking.",
  },
  {
    number: "04",
    title: "Discipline",
    description:
      "Progress is built through consistency. Show up, put in the work, and keep moving.",
  },
];

export function BrandValues() {
  return (
    <section className="border-y border-white/10 py-24 sm:py-32">
      <div className="container-screen">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              05 / Brand Values
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl font-heading text-4xl font-bold uppercase leading-[0.95] lg:text-6xl">
              The Principles
              <br />
              Behind The Pace.
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              The products may change. The standard doesn't.
              These are the principles that guide how we
              approach everything we build.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16 grid border-l border-t border-white/10 sm:grid-cols-2">
          {brandValues.map((value) => (
            <BrandValueCard
              key={value.number}
              {...value}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BrandValueCardProps {
  number: string;
  title: string;
  description: string;
}

function BrandValueCard({
  number,
  title,
  description,
}: BrandValueCardProps) {
  return (
    <article
      className="
        group
        relative
        min-h-[330px]
        border-b
        border-r
        border-white/10
        p-7
        transition-colors
        duration-500
        hover:bg-white/[0.025]
        sm:p-9
        lg:p-12
      "
    >
      {/* Number */}
      <span className="text-xs font-medium tracking-[0.2em] text-red-500">
        {number}
      </span>

      {/* Decorative line */}
      <div className="mt-8 h-px w-8 bg-red-500 transition-all duration-500 group-hover:w-16" />

      {/* Content */}
      <div className="mt-16">
        <h3 className="font-heading text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          {title}
        </h3>

        <p className="mt-5 max-w-md text-sm leading-7 text-neutral-500">
          {description}
        </p>
      </div>

      {/* Corner arrow */}
      <span
        className="
          absolute
          bottom-8
          right-8
          text-xl
          text-neutral-700
          transition-all
          duration-500
          group-hover:translate-x-1
          group-hover:-translate-y-1
          group-hover:text-red-500
        "
      >
        ↗
      </span>
    </article>
  );
}