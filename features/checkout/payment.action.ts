"use server";

import { checkoutService } from "./checkout.service";


interface VerifyPaymentInput {
  orderNumber: string;

  razorpayPaymentId: string;

  razorpayOrderId: string;

  razorpaySignature: string;
}

export async function verifyPaymentAction(
  input: VerifyPaymentInput
) {
  try {
    const result =
      await checkoutService.verifyPayment(
        input
      );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(
      "Payment verification failed:",
      error
    );

    return {
      success: false,

      error:
        error instanceof Error
          ? error.message
          : "Payment verification failed",
    };
  }
}