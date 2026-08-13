import { ProductSpecificationDTO } from "@/features/products/dto/product-specification.dto";

interface ProductSpecificationsProps {
  specifications: ProductSpecificationDTO[];
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  if (!specifications?.length) {
    return null;
  }
  return (
      <div className="mt-8">
        <div className="flex items-end justify-between pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec0116]">
              Technical Details
            </p>

            <h3 className="mt-1 text-lg font-semibold text-white">
              Specifications
            </h3>
          </div>
        </div>

        <div className="border-t border-neutral-800">
          {specifications.map((specification) => (
            <div
              key={specification.label}
              className="
              grid
              grid-cols-[minmax(120px,0.7fr)_1fr]
              gap-6
              border-b
              border-neutral-800
              py-4
            "
            >
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {specification.label}
              </span>

              <span className="text-sm leading-6 text-neutral-200">
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      </div>
  );
}
