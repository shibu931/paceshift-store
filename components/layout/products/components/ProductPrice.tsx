import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";

interface ProductPriceProps {
  variants: ProductDetailDTO["variants"];
}

export function ProductPrice({
  variants,
}: ProductPriceProps) {
  const variant =
    variants.find(
      (variant) =>
        "isDefault" in variant &&
        variant.isDefault
    ) ?? variants[0];

  if (!variant) return null;

  const hasDiscount =
    variant.comparePrice !== null &&
    variant.comparePrice > variant.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((variant.comparePrice! - variant.price) /
          variant.comparePrice!) *
          100
      )
    : 0;

  return (
    <div className="flex flex-wrap items-end gap-3">
      {hasDiscount && (
        <>
          <span className="font-display text-lg text-muted line-through">
            ₹
            {variant.comparePrice!.toLocaleString(
              "en-IN"
            )}
          </span>
        </>
      )}

      <span className="font-display text-4xl font-bold -mb-0.5">
        ₹{variant.price.toLocaleString("en-IN")}
      </span>

      {hasDiscount && (
        <>
          <span className="bg-[#ec0116] px-3 py-1 font-display text-xs font-bold uppercase tracking-[0.06em] text-white">
            {discountPercentage}% OFF
          </span>
        </>
      )}
    </div>
  );
}