"use client";

import { useCartStore } from "@/features/cart/cart.store";
import { ShoppingCart } from "lucide-react";


export function CartTrigger() {
  const openCart = useCartStore(
    (state) => state.openCart
  );

  const itemCount = useCartStore(
    (state) => state.getItemCount()
  );

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative flex h-10 w-10 items-center justify-center text-neutral-300 transition hover:text-white"
      aria-label={`Open cart with ${itemCount} items`}
    >
      <ShoppingCart
        className="h-[18px] w-[18px]"
        strokeWidth={1.5}
      />

      {itemCount > 0 && (
        <span
          className="
            absolute
            right-0
            top-0
            flex
            h-4
            min-w-4
            items-center
            justify-center
            rounded-full
            bg-red-600
            px-1
            text-[9px]
            font-bold
            text-white
          "
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}