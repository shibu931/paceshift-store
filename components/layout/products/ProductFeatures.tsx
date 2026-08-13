import { Droplets, Leaf, ShieldCheck, Triangle, Waves } from "lucide-react";

interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

interface ProductFeaturesProps {
  features: ProductFeature[];
}

const iconMap = {
  FEATURE_LEAF: Leaf,
  FEATURE_DROPLETS: Droplets,
  FEATURE_SHIELD: ShieldCheck,
  FEATURE_TRIANGLE: Triangle,
  FEATURE_WAVES: Waves,
};

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec0116]">
            Technical Details
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">FEATURES</h3>
        </div>
      </div>
      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon =
            iconMap[feature.icon as keyof typeof iconMap] ?? ShieldCheck;

          return (
            <div key={`${feature.title}-${index}`} className="flex gap-4">
              {/* Icon */}
              <div
                className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-full
                border border-neutral-800
                bg-transparent
              "
              >
                <Icon className="h-5 w-5 text-red-500" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="min-w-0 pt-0.5">
                <h3 className="text-sm font-semibold text-white sm:text-[15px]">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-neutral-500 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
