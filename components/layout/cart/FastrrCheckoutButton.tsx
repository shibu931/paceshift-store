// features/checkout/components/fastrr-checkout-button.tsx

"use client";

import { createCheckoutAction } from "@/features/checkout/checkout.action";
import Script from "next/script";

declare global {
  interface Window {
    HeadlessCheckout: {
      addToCart: (
        event: Event,
        token: string,
        options: {
          fallbackUrl: string;
        }
      ) => void;
    };
  }
}

type Props = {
  items: {
    variantId: number;
    quantity: number;
  }[];
};

export function FastrrCheckoutButton({ items }: Props) {
  async function handleCheckout(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const { token } = await createCheckoutAction(items);

    window.HeadlessCheckout.addToCart(event.nativeEvent, token, {
      fallbackUrl: `${window.location.origin}/checkout`,
    });
  }

  return (
    <>
      <Script
        src="https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js"
        strategy="afterInteractive"
      />

      <link
        rel="stylesheet"
        href="https://checkout-ui.shiprocket.com/assets/styles/shopify.css"
      />

      <button onClick={handleCheckout}
      className="          mt-5
          flex
          h-12
          w-full
          items-center
          justify-center
          bg-red-600
          text-xs
          font-bold
          uppercase
          tracking-[0.15em]
          text-white
          transition
          hover:bg-red-500
          aria-disabled:cursor-not-allowed
          aria-disabled:bg-neutral-800
          aria-disabled:text-neutral-500"
      >
        Checkout
      </button>
    </>
  );
}