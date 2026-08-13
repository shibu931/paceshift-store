"use client";

import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  quantity: number;
}

export function AddToCartButton({
  productId,
  variantId,
  quantity,
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    console.log({
      productId,
      variantId,
      quantity,
    });

    // Cart implementation comes later.
  };

  return (
<button
  type="button"
  onClick={handleAddToCart}
  className="flex h-12 w-1/2 flex-1 items-center justify-center gap-2 bg-black px-6 text-sm font-semibold text-[#ec0116] transition-colors duration-300 hover:bg-[#ec0116] border border-[#ec0116] hover:text-white"
>
  <ShoppingBag className="h-4 w-4" />
  Add to Cart
</button>
  );
}