"use client";

import { useRouter } from "next/navigation";

import { useCartStore } from "@/features/cart/cart.store";

interface BuyNowButtonProps {
  productId: string;
  variantSku: string;
  quantity: number;
}

export function BuyNowButton({
  productId,
  variantSku,
  quantity,
}: BuyNowButtonProps) {
  const router = useRouter();

  const buyNow = useCartStore(
    (state) => state.buyNow
  );

  const handleBuyNow = () => {
    if (!productId || !variantSku) {
      return;
    }

    if (quantity < 1) {
      return;
    }

    buyNow(
      productId,
      variantSku,
      quantity
    );

    router.push("/checkout");
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={
        !productId ||
        !variantSku ||
        quantity < 1
      }
      className="h-12 w-1/2 border border-white/20 bg-white px-6 text-sm font-semibold text-black transition-colors duration-300 hover:border-[#ec0116] hover:bg-[#ec0116] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      Buy Now
    </button>
  );
}