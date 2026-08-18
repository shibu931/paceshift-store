"use client";

import Link from "next/link";
import { FastrrCheckoutButton } from "./FastrrCheckoutButton";
import { useCart } from "@/hooks/useCart";

interface CartSummaryProps {
  subtotal: number;
  hasUnavailableItems: boolean;
}

export function CartSummary({
  subtotal,
  hasUnavailableItems,
}: CartSummaryProps) {
  const {cart} = useCart()
  const items = [{variantId:200000001,quantity:1}]
  return (
    <div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-neutral-500">
          <span>Subtotal</span>

          <span className="text-white">
            ₹
            {subtotal.toLocaleString(
              "en-IN"
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-neutral-500">
          <span>Shipping</span>

          <span className="text-xs text-neutral-500">
            Calculated at checkout
          </span>
        </div>
      </div>

      <div className="my-4 h-px bg-neutral-800" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-wide text-white">
          Total
        </span>

        <span className="text-lg font-semibold text-white">
          ₹
          {subtotal.toLocaleString(
            "en-IN"
          )}
        </span>
      </div>

      {hasUnavailableItems && (
        <p className="mt-4 text-xs leading-5 text-red-500">
          Please update your cart before
          proceeding to checkout.
        </p>
      )}
      <FastrrCheckoutButton items={items}/>
      {/* <Link
        href={
          hasUnavailableItems
            ? "#"
            : "/checkout"
        }
        aria-disabled={
          hasUnavailableItems
        }
        onClick={(event) => {
          if (hasUnavailableItems) {
            event.preventDefault();
          }
        }}
        className="
          mt-5
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
          aria-disabled:text-neutral-500
        "
      >
        Checkout
      </Link> */}
    </div>
  );
}


