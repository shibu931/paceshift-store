"use client";

import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";

interface ProductVariantSelectorProps {
  variants: ProductDetailDTO["variants"];
  selectedVariantId: string;
  onVariantChange: (id: string) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariantId,
  onVariantChange,
}: ProductVariantSelectorProps) {
  const attributes = Array.from(
    new Set(
      variants.flatMap((variant) =>
        variant.attributes.map(
          (attribute) => attribute.name
        )
      )
    )
  );
  return (
    <div className="space-y-5">
      {attributes.map((attributeName) => {
        const values = Array.from(
          new Set(
            variants.flatMap((variant) =>
              variant.attributes
                .filter(
                  (attribute) =>
                    attribute.name ===
                    attributeName
                )
                .map(
                  (attribute) =>
                    attribute.value
                )
            )
          )
        );

        return (
          <div key={attributeName}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">
                {attributeName}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const variant = variants.find(
                  (variant) =>
                    variant.attributes.some(
                      (attribute) =>
                        attribute.name ===
                          attributeName &&
                        attribute.value === value
                    )
                );

                if (!variant) return null;

                const selected =
                  variant.id ===
                  selectedVariantId;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      onVariantChange(
                        variant.id
                      )
                    }
                    className={`
                      min-w-20
                      border
                      px-3
                      py-2
                      text-sm
                      rounded
                      transition
                      ${
                        selected
                          ? "border-[#ec0116]/80 bg-neutral-900 text-white"
                          : "border-neutral-300 hover:border-[#ec0116] hover:cursor-pointer"
                      }
                    `}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}