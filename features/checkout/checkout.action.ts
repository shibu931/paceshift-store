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