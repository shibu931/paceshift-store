import { ProductRating } from "./components/ProductRating";
import { ProductPrice } from "./components/ProductPrice";
import { ProductPurchase } from "./components/ProductPurchase";
import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";
import ProductFeatures from "./ProductFeatures";

interface ProductInfoProps {
  product: ProductDetailDTO;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="w-full text-white">
      <h1 className="mt-3 font-display text-4xl font-semibold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl">
        <span className="text-[#ec0116]">{product.brand.name}</span>{" "}
        {product.name}
      </h1>

      {/* Description */}
      {product.shortDescription && (
        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
          {product.shortDescription}
        </p>
      )}

      {/* Price */}
      <div className="mt-4">
        <ProductPrice variants={product.variants} />
      </div>

      {/* Purchase */}
      <div className="mt-5">
        <ProductPurchase product={product} />
      </div>

      {/* Rating */}
      {product.rating && (
        <div className="mt-4">
          <ProductRating rating={product.rating} />
        </div>
      )}

      {/* Features */}
      {product.features?.length > 0 && (
        <div className="mt-8">
          <ProductFeatures features={product.features} />
        </div>
      )}

    </div>
  );
}
