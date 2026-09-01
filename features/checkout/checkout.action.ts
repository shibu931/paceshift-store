"use server";

import {
  type CheckoutDto,
} from "./checkout.dto";

import {
  checkoutService,
} from "./checkout.service";

export async function createCheckoutAction(
  input: CheckoutDto
) {
  try {
    const result =
      await checkoutService.createOrder(
        input
      );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(
      "Checkout failed:",
      error
    );

    return {
      success: false,

      error:
        error instanceof Error
          ? error.message
          : "Unable to create checkout",
    };
  }
}

export async function createCodOrderAction(
  input: {
    customer: {
      name: string;
      email?: string;
      phone: string;
    };

    shippingAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };

    items: {
      variantSku: string;
      quantity: number;
    }[];
    couponCode?: string;
  }
) {
  try {
    const order =
      await checkoutService.createCodOrder(
        input
      );

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    console.error(
      "Create COD order failed:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to create COD order",
    };
  }
}