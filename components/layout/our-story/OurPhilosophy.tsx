const principles = [
  {
    number: "01",
    title: "Purpose",
    description:
      "Every detail should earn its place in the product.",
  },
  {
    number: "02",
    title: "Function",
    description:
      "Performance comes before decoration.",
  },
  {
    number: "03",
    title: "Progress",
    description:
      "Every product is an opportunity to improve.",
  },
  {
    number: "04",
    title: "Restraint",
    description:
      "We don't add features simply to make a specification sheet longer.",
  },
];

export function OurPhilosophy() {
  return (
    <section className="border-y border-white/10 py-24">
      <div className="container-screen">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">
              03 / Our Philosophy
            </p>

            <h2 className="mt-5 font-heading text-4xl font-bold uppercase leading-none sm:text-6xl">
              The Rules
              <br />
              We Build By.
            </h2>
          </div>

          <div>
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="grid grid-cols-[50px_1fr] gap-5 border-b border-white/10 py-7 first:border-t"
              >
                <span className="text-xs text-red-500">
                  {principle.number}
                </span>

                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase">
                    {principle.title}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}