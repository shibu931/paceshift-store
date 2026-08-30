"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CheckoutForm from "@/components/layout/checkout/CheckoutForm";
import CheckoutSummary from "@/components/layout/checkout/CheckoutSummary";

export default function CheckoutClient() {
  const { cart, isLoading, error } = useCart({
    hydrateOnMount: true,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-5 w-5 animate-spin rounded-full border border-white/20 border-t-[#f20a18]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Loading order
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500/20 bg-red-500/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
          Checkout Error
        </p>
        <p className="mt-2 text-sm text-white/60">{error}</p>
      </div>
    );
  }

  if (!cart.items.length) {
    return (
      <div className="border border-white/10 bg-[#0d0d0e] px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          Your cart is empty
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 bg-[#f20a18] px-7 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#ff1725]"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] xl:gap-20">
        {/* Left Column: Navigation + Step-wise Form */}
        <section>
          <div className="mb-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 transition hover:text-white"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-1"
              />
              Continue Shopping
            </Link>
          </div>

          <CheckoutForm
            items={cart.items.map((item) => ({
              variantSku: item.variantSku,
              quantity: item.quantity,
            }))}
          />
        </section>

        {/* Right Column: Sticky Summary */}
        <CheckoutSummary
          items={cart.items}
          subtotal={cart.summary.subtotal}
        />
      </div>
    </main>
  );
}