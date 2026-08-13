import Image from "next/image";

const performancePoints = [
  {
    title: "Breathable Upper",
    description: "Designed for airflow and comfort.",
  },
  {
    title: "Cushioned Heel & Toe",
    description: "Reinforced for impact protection.",
  },
  {
    title: "Targeted Arch Support",
    description: "Compression banding for a secure fit.",
  },
  {
    title: "Moisture Management",
    description: "Designed to help manage moisture.",
  },
];

export function PerformanceSystem() {
  return (
    <section className="border-y border-white/10 py-24">
      <div className="container-screen">
        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          {/* Intro */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
              How It Works
            </p>

            <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-[1] sm:text-5xl">
              Three Fibers.
              <br />
              One Performance
              <br />
              System.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-500">
              Each fiber has a role. Together, they form the
              material foundation of a sock designed for
              real-world movement.
            </p>
          </div>

          {/* Diagram */}
          <div className="relative min-h-125">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/sock_diagram.webp"
                alt="PaceShift performance sock construction"
                width={450}
                height={600}
                className="h-[460px] w-auto object-contain"
              />
            </div>

            {/* Callouts */}
            <PerformanceCallout
              className="left-0 top-[20%]"
              title="Breathable Upper"
              description="Designed for airflow and comfort."
            />

            <PerformanceCallout
              className="left-[5%] bottom-[18%]"
              title="Cushioned Heel & Toe"
              description="Reinforced for impact protection."
            />

            <PerformanceCallout
              className="right-0 top-[28%]"
              title="Targeted Arch Support"
              description="Compression banding for a secure fit."
            />

            <PerformanceCallout
              className="right-0 bottom-[18%]"
              title="Moisture Management"
              description="Designed to help manage moisture."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface PerformanceCalloutProps {
  title: string;
  description: string;
  className?: string;
}

function PerformanceCallout({
  title,
  description,
  className = "",
}: PerformanceCalloutProps) {
  return (
    <div
      className={`absolute z-10 max-w-[190px] ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />

        <h3 className="text-xs font-bold uppercase tracking-wide text-white">
          {title}
        </h3>
      </div>

      <p className="mt-2 pl-5 text-xs leading-5 text-neutral-500">
        {description}
      </p>
    </div>
  );
}