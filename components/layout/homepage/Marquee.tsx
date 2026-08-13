const MARQUEE_ITEMS = [
  "Bamboo Viscose",
  "Graphene-Infused Fabric",
  "Moisture-Wicking",
  "Engineered For Indian Conditions",
  "Premium Performance Gear",
];

export default function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Highlights"
      className="overflow-hidden bg-brand pt-[34px] pb-4 [clip-path:polygon(0_32px,100%_0,100%_100%,0_100%)]"
    >
      <div className="inline-flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-5 px-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-black"
          >
            ✦ {item}
          </span>
        ))}
      </div>
    </section>
  );
}