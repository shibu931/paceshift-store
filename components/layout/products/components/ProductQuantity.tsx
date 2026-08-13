"use client";

import { Minus, Plus } from "lucide-react";

interface ProductQuantityProps {
  quantity: number;
  max: number;
  onChange: (quantity: number) => void;
}

export function ProductQuantity({
  quantity,
  max,
  onChange,
}: ProductQuantityProps) {
  const decrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div>
      <p className="mb-3 text-sm font-medium">
        Quantity
      </p>

      <div className="flex h-11 w-fit items-center border border-neutral-300 rounded">
        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex h-full w-11 items-center justify-center disabled:opacity-30"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="flex h-full w-10 items-center justify-center text-sm">
          {quantity}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          className="flex h-full w-11 items-center justify-center disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {max > 0 && max <= 5 && (
        <p className="mt-2 text-xs text-orange-600">
          Only {max} left in stock
        </p>
      )}
    </div>
  );
}