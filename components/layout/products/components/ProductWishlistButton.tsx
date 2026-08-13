"use client";

import { Heart } from "lucide-react";

interface ProductWishlistButtonProps {
  productId: string;
}

export function ProductWishlistButton({
  productId,
}: ProductWishlistButtonProps) {
  const handleWishlist = () => {
    console.log("Wishlist:", productId);
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      aria-label="Add to wishlist"
      className="flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-300 transition hover:border-black"
    >
      <Heart
        className="h-5 w-5"
        strokeWidth={1.5}
      />
    </button>
  );
}