import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: Props) {
  return (
    <div className={cn("max-w-[640px]", className)}>
      <p className="mb-5 inline-flex items-center gap-3 font-display text-[13px] font-semibold uppercase tracking-[0.28em] text-brand before:h-px before:w-6 before:bg-brand after:h-px after:w-6 after:bg-brand">
        {eyebrow}
      </p>

      <h2 className="mb-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-semibold uppercase leading-[1.05]">
        {title}
      </h2>

      {description && (
        <p className="max-w-[480px] text-base text-[#d6d6d4]">
          {description}
        </p>
      )}
    </div>
  );
}