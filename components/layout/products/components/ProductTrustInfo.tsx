import {
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export function ProductTrustInfo() {
  return (
    <div className="divide-y divide-neutral-800 border-y border-neutral-800">
      <div className="flex items-center gap-3 py-4">
        <Truck className="h-5 w-5" strokeWidth={1.5} />

        <div>
          <p className="text-sm font-medium">
            Fast & Reliable Delivery
          </p>

          <p className="mt-0.5 text-xs text-neutral-500">
            Delivered across India.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4">
        <RotateCcw
          className="h-5 w-5"
          strokeWidth={1.5}
        />

        <div>
          <p className="text-sm font-medium">
            Easy Returns
          </p>

          <p className="mt-0.5 text-xs text-neutral-500">
            Hassle-free returns on eligible products.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 py-4">
        <ShieldCheck
          className="h-5 w-5"
          strokeWidth={1.5}
        />

        <div>
          <p className="text-sm font-medium">
            Secure Checkout
          </p>

          <p className="mt-0.5 text-xs text-neutral-500">
            Your payment information is protected.
          </p>
        </div>
      </div>
    </div>
  );
}