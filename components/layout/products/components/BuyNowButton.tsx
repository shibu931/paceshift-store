"use client";

interface BuyNowButtonProps {
  productId: string;
  variantId: string;
  quantity: number;
}

export function BuyNowButton({
  productId,
  variantId,
  quantity,
}: BuyNowButtonProps) {
  const handleBuyNow = () => {
    console.log({
      productId,
      variantId,
      quantity,
    });

    // Razorpay / checkout flow later.
  };

  return (
<button
  type="button"
  onClick={handleBuyNow}
  className="h-12 w-1/2 border bg-white px-6 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#ec0116] hover:border-[#ec0116] hover:text-white"
>
  Buy Now
</button>
  );
}