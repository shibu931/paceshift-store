"use client";

import { useCartStore } from "@/features/cart/cart.store";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  variantSku?: string;
  quantity: number;
  disabled?: boolean;
}

export function AddToCartButton({
  productId,
  variantSku,
  quantity,
  disabled = false,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!variantSku) {
      return;
    }

    addItem(productId, variantSku, quantity);

    setAdded(true);

    window.setTimeout(() => setAdded(false), 1500);
  };

  const isDisabled = disabled || !variantSku;

  return (
    <button
      type="button"
      onClick={()=>{handleAddToCart()}}
      className="flex h-12 w-1/2 flex-1 items-center justify-center gap-2 bg-black px-6 text-sm font-semibold text-[#ec0116] transition-colors duration-300 hover:bg-[#ec0116] border border-[#ec0116] hover:text-white"
    >
      <ShoppingBag className="h-4 w-4" />
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
