import Link from "next/link";

export function StoryCTA() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden border border-white/10 bg-neutral-950 px-6 py-20 text-center sm:px-12">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              The Story Continues
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl font-heading text-5xl font-bold uppercase leading-[0.9] sm:text-7xl">
              The Story Is
              <br />
              Still Being Written.
            </h2>

            <p className="mx-auto mt-7 max-w-lg text-sm leading-6 text-neutral-500">
              We're building products for people who refuse
              to stand still.
            </p>

            <Link
              href="/products/paceshift-performance-crew-socks"
              className="mt-9 inline-flex bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-red-500"
            >
              View The Socks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}