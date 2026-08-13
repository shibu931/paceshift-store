import { ProductCareDTO } from "@/features/products/dto/product-care.dto";
import {
  Droplets,
  Flame,
  Wind,
  WashingMachine,
} from "lucide-react";


interface ProductCareProps {
  care: ProductCareDTO[];
}

const iconMap = {
  wash: WashingMachine,
  bleach: Droplets,
  dry: Wind,
  iron: Flame,
};

export function ProductCare({
  care,
}: ProductCareProps) {
  if (!care?.length) {
    return null;
  }
  return (
    <div className="mt-8">
      <div className="mb-6 flex items-end justify-between border-b border-neutral-800 pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec0116]">
            Maintenance
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            Care Instructions
          </h3>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {care.map((item) => {
          const Icon =
            iconMap[
              item.icon as keyof typeof iconMap
            ] ?? Droplets;

          return (
            <div
              key={item.title}
              className="
                border
                border-neutral-800
                bg-neutral-950/40
                p-5
                transition-colors
                hover:border-neutral-700
              "
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800">
                <Icon
                  className="h-4 w-4 text-red-500"
                  strokeWidth={1.5}
                />
              </div>

              <h4 className="mt-4 text-sm font-semibold text-white">
                {item.title}
              </h4>

              <p className="mt-2 text-xs leading-5 text-neutral-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ProductCare
