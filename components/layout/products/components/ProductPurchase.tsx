"use client";

import { useState } from "react";


import { ProductVariantSelector } from "./ProductVariantSelector";
import { ProductQuantity } from "./ProductQuantity";
import { AddToCartButton } from "./AddToCartButton";
import { BuyNowButton } from "./BuyNowButton";
import { ProductWishlistButton } from "./ProductWishlistButton";
import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";

interface ProductPurchaseProps {
  product: ProductDetailDTO;
}

export function ProductPurchase({
  product,
}: ProductPurchaseProps) {
  const defaultVariant = product.variants[0];

  const [selectedVariantSku, setSelectedVariantSku] =
    useState(defaultVariant?.sku ?? "");

  const [quantity, setQuantity] = useState(1);

  const selectedVariant =
    product.variants.find(
      (variant) =>
        variant.sku === selectedVariantSku
    ) ?? defaultVariant;
    console.log(selectedVariant)
  if (!selectedVariant) {
    return null;
  }

  return (
    <div>
      <ProductVariantSelector
        variants={product.variants}
        selectedVariantSku={selectedVariantSku}
        onVariantChange={setSelectedVariantSku}
      />

      <div className="mt-6">
        <ProductQuantity
          quantity={quantity}
          max={selectedVariant.stock}
          onChange={setQuantity}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <BuyNowButton
          productId={product.id}
          variantSku={selectedVariant.sku}
          quantity={quantity}
        />
          {/* <AddToCartButton
          productId={product.id}
          variantSku={selectedVariant.sku}
          quantity={quantity}
        />         */}
      </div>
    </div>
  );
}