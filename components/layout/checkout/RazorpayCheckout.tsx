"use client";

import Script from "next/script";
import { useState } from "react";
import Razorpay from "razorpay";
import { createCheckoutAction } from "@/features/checkout/checkout.action";
import { verifyPaymentAction } from "@/features/checkout/payment.action";

interface RazorpayCheckoutProps {
  checkoutData: {
    customer: {
      name: string;
      email: string;
      phone: string;
    };

    shippingAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state: string;
      postalCode: string;
      country?: string;
    };

    items: {
      variantSku: string;
      quantity: number;
    }[];
  };
}

export default function RazorpayCheckout({
  checkoutData,
}: RazorpayCheckoutProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handlePayment() {
    try {
      setLoading(true);
      setError(null);

      /*
       * --------------------------------
       * 1. Create our order + Razorpay
       * order on the server
       * --------------------------------
       */

      const normalizedCheckoutData = {
        ...checkoutData,
        shippingAddress: {
          ...checkoutData.shippingAddress,
          addressLine2:
            checkoutData.shippingAddress.addressLine2 ?? "",
          country:
            checkoutData.shippingAddress.country ?? "IN",
        },
      };

      const result =
        await createCheckoutAction(
          normalizedCheckoutData
        );

      if (
        !result.success ||
        !result.data
      ) {
        throw new Error(
          result.error ??
            "Unable to create checkout"
        );
      }

      const {
        razorpay,
        orderNumber,
      } = result.data;

      /*
       * --------------------------------
       * 2. Make sure Razorpay script
       * is loaded
       * --------------------------------
       */

      if (
        typeof window ===
        "undefined" ||
        !window.Razorpay
      ) {
        throw new Error(
          "Razorpay Checkout is not loaded"
        );
      }

      /*
       * --------------------------------
       * 3. Open Razorpay
       * --------------------------------
       */

      const options = {
        key: razorpay.keyId ?? "",

        amount:
          Number(razorpay.amount),

        currency:
          razorpay.currency,

        name: "PaceShift",

        description:
          `Order ${orderNumber}`,

        order_id:
          razorpay.orderId,

        prefill: {
          name:
            checkoutData.customer.name,

          email:
            checkoutData.customer.email,

          contact:
            `+91${checkoutData.customer.phone}`,
        },

        theme: {
          color: "#000000",
        },

        handler:
          async function (
            response: {
              razorpay_payment_id: string;
              razorpay_order_id: string;
              razorpay_signature: string;
            }
          ) {
            /*
             * --------------------------------
             * 4. Send Razorpay response
             * to our server
             * --------------------------------
             */

            const verification =
              await verifyPaymentAction({
                orderNumber,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpayOrderId:
                  response.razorpay_order_id,

                razorpaySignature:
                  response.razorpay_signature,
              });

            if (
              !verification.success
            ) {
              setError(
                verification.error ??
                  "Payment verification failed"
              );

              return;
            }

            /*
             * --------------------------------
             * 5. Payment verified
             * --------------------------------
             */

            window.location.href =
              `/checkout/success?order=${encodeURIComponent(
                orderNumber
              )}`;
          },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpayCheckout =
        new window.Razorpay(
          options
        );

      razorpayCheckout.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response.error
          );

          setError(
            response.error?.description ??
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpayCheckout.open();
    } catch (error) {
      console.error(
        "Payment initialization failed:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to start payment"
      );

      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

    {error && (
      <div className="mb-4 border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400">
        {error}
      </div>
    )}

    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="group relative flex h-14 w-full items-center justify-center overflow-hidden bg-[#f20a18] text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1725] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>
        {loading
          ? "Processing..."
          : "Pay Securely"}
      </span>

      {!loading && (
        <span className="absolute right-5 text-lg transition-transform group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
    </>
  );
}