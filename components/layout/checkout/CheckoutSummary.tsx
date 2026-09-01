"use client";

import { Check, RotateCcw, ShieldCheck, Truck } from "lucide-react";

interface CheckoutSummaryItem {
  variantSku: string;
  quantity: number;
  name: string;
  price: number;
  image?: string;
}

interface AppliedCoupon {
  code: string;
  discount: number;
  subtotal: number;
}

interface CheckoutSummaryProps {
  items: CheckoutSummaryItem[];
  subtotal: number;
  appliedCoupon: AppliedCoupon | null;
}

export default function CheckoutSummary({
  items,
  subtotal,
  appliedCoupon,
}: CheckoutSummaryProps) {
  const discount = appliedCoupon?.discount ?? 0;

  const total = Math.max(0, subtotal - discount);
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="border border-white/10 bg-[#0d0d0e]">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Order Summary
            </h2>

            <span className="font-mono text-[10px] text-white/30">
              {items.length.toString().padStart(2, "0")} ITEMS
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="divide-y divide-white/10 px-6">
          {items.map((item) => (
            <div key={item.variantSku} className="flex gap-4 py-5">
              <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden border border-white/10 bg-[#151516]">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}

                <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center bg-[#f20a18] px-1 text-[9px] font-bold text-white">
                  {item.quantity}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold uppercase tracking-[0.04em] text-white">
                  {item.name}
                </h3>

                <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-wider text-white/30">
                  {item.variantSku}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-white/40">
                    QTY {item.quantity}
                  </span>

                  <span className="text-sm font-bold text-white">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="border-t border-white/10 px-6 py-5">
          <div className="space-y-3">
            <PriceRow label="Subtotal" value={subtotal} />

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Shipping</span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f20a18]">
                Free
              </span>
            </div>
            {/* Coupon Discount */}
            {appliedCoupon && (
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-emerald-400">Discount</span>

                  <span className="ml-2 font-mono text-[10px] text-emerald-400/60">
                    ({appliedCoupon.code})
                  </span>
                </div>

                <span className="font-medium text-emerald-400">
                  − ₹{discount.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                Total
              </p>

              <p className="mt-1 text-[10px] text-white/30">
                Inclusive of all taxes
              </p>
            </div>

            <span className="text-2xl font-black tracking-tight text-white">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Trust */}
        <div className="border-t border-white/10 bg-[#101011] px-6 py-2">
          <TrustRow
            icon={<ShieldCheck size={16} />}
            title="Secure Checkout"
            description="Your payment is protected"
          />

          <TrustRow
            icon={<Truck size={16} />}
            title="Fast Delivery"
            description="Reliable delivery across India"
          />

          <TrustRow
            icon={<RotateCcw size={16} />}
            title="Easy Returns"
            description="Hassle-free returns"
          />
        </div>

        {/* Payment methods */}
        <div className="border-t border-white/10 px-6 py-5">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
            Payment Methods
          </p>

          <div className="flex flex-wrap gap-2">
            {["UPI", "VISA", "MASTERCARD", "RUPAY", "NETBANKING"].map(
              (method) => (
                <span
                  key={method}
                  className="border border-white/10 bg-[#151516] px-2.5 py-1.5 font-mono text-[8px] text-white/40"
                >
                  {method}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.14em] text-white/20">
        <Check size={12} />
        Secure payment powered by Razorpay
      </div>
    </aside>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/40">{label}</span>

      <span className="text-xs font-medium text-white/80">
        ₹{value.toLocaleString("en-IN")}
      </span>
    </div>
  );
}

function TrustRow({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 border-b border-white/5 py-4 last:border-0">
      <div className="mt-0.5 text-[#f20a18]">{icon}</div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/80">
          {title}
        </p>

        <p className="mt-1 text-[9px] text-white/30">{description}</p>
      </div>
    </div>
  );
}
