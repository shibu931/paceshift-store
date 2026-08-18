// features/checkout/checkout.action.ts

"use server";

import { createFastrrCheckout } from "./fastrr/fastrr.client";

export async function createCheckoutAction(
  items: {
    variantId: number;
    quantity: number;
  }[]
) {
  if (!items.length) {
    throw new Error("Cart is empty");
  }

  const payload = {
    cart_data: {
      items: items.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
      })),
      mobile_app: false,
    },

    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,

    timestamp: new Date().toISOString(),
  };

  const result = await createFastrrCheckout(payload);

  return {
    token: result.token,
    orderId: result.data.order_id,
  };
}