import Link from "next/link";

export function FabricTechCTA() {
  return (
    <section className="pb-20">
      <div className="container-screen">
        <div className="relative overflow-hidden border border-white/10 bg-neutral-950 px-7 py-12 sm:px-12 lg:px-16">
          <div className="absolute right-0 top-1/2 h-px w-1/2 bg-red-500/40 rotate-[-8deg]" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
              Purpose In Every Thread.
            </p>

            <h2 className="mt-4 font-heading text-4xl font-bold uppercase leading-[1] sm:text-5xl">
              That's The
              <br />
              PaceShift Standard.
            </h2>

            <p className="mt-5 max-w-md text-sm text-neutral-500">
              Experience the difference in every stride.
            </p>

            <Link
              href="/products/paceshift-performance-socks"
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                bg-red-600
                px-7
                py-4
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
                transition-colors
                hover:bg-red-500
              "
            >
              Shop Performance Socks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}