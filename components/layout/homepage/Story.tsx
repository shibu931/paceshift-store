import Image from "next/image";

import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";

const STATS = [
  {
    value: "70%",
    label: "Bamboo Viscose",
  },
  {
    value: "Graphene",
    label: "Infused Jersey",
  },
  {
    value: "India",
    label: "Built For The Heat",
  },
];

export default function Story() {
  return (
    <section
      id="story"
      className="relative py-36"
    >
      {/* Watermark */}

      <Image
        src="/images/paceshift_logo.png"
        alt=""
        aria-hidden
        width={420}
        height={420}
        className="absolute right-26 top-1/2 hidden -translate-y-1/2 opacity-[0.75] lg:block"
      />

      <div className="mx-auto max-w-[1240px] px-8 max-[500px]:px-5">

        <Reveal>

          <div className="max-w-[640px]">

            <SectionHeading
              eyebrow="The Brand"
              title={
                <>
                  PERFORMANCE.
                  <br />
                  NOT NOISE.
                </>
              }
            />

            <div className="space-y-5 text-[#d6d6d4]">

              <p>
                PaceShift is built on a simple idea:
                gear should earn its place in your
                kit. Not another crowded activewear
                label — a focused performance house
                building premium performance wear
                for athletes who train hard and
                expect their gear to keep up.
              </p>

              <p>
                We're launching narrow, on purpose.
                Two pieces, each engineered from
                the fabric up — because if the
                foundation isn't right, nothing
                built on top of it matters.
                Compression tees are next, with
                base layers and shorts to follow
                once they meet the same bar.
              </p>

            </div>

            {/* Stats */}

            <div className="mt-11 flex flex-wrap gap-11">

              {STATS.map((item) => (

                <div key={item.label}>

                  <span className="block font-display text-[26px] font-bold text-brand">
                    {item.value}
                  </span>

                  <span className="text-xs uppercase tracking-[0.1em] text-muted">
                    {item.label}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </Reveal>

      </div>

    </section>
  );
}