import Link from "next/link";

import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <main className="container-screen py-6 lg:10 mt-6 lg:mt-16">
        <div className="mb-12">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-[#f20a18]">
            PaceShift / Checkout
          </p>

          <h1 className="text-3xl font-black uppercase tracking-[-0.02em] sm:text-4xl">
            Complete Your Order
          </h1>

          <div className="mt-5 h-px w-full bg-white/10" />
        </div>

        <CheckoutClient />
    </main>
  );
}