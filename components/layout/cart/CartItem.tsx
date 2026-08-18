"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItemDisplay } from "@/features/cart/cart.types";
import { useCartStore } from "@/features/cart/cart.store";



interface CartItemProps {
  item: CartItemDisplay;
}

export function CartItem({
  item,
}: CartItemProps) {
  const updateQuantity =
    useCartStore(
      (state) => state.updateQuantity
    );

  const removeItem =
    useCartStore(
      (state) => state.removeItem
    );

  const maxQuantity = Math.min(
    10,
    item.availableQuantity
  );

  const isOutOfStock =
    item.availableQuantity <= 0;

  return (
    <div className="flex gap-4 py-5">
      {/* IMAGE */}
      <Link
        href={`/products/${item.slug}`}
        className="
          relative
          h-24
          w-20
          shrink-0
          overflow-hidden
          bg-neutral-900
        "
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="
            object-cover
            transition-transform
            duration-300
            hover:scale-105
          "
        />
      </Link>

      {/* DETAILS */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              className="
                line-clamp-2
                text-sm
                font-medium
                text-white
                transition
                hover:text-neutral-300
              "
            >
              {item.name}
            </Link>

            {/* VARIANT */}
            {item.variantLabel && (
              <p
                className="
                  mt-1
                  text-xs
                  text-neutral-500
                "
              >
                {item.variantLabel}
              </p>
            )}
          </div>

          {/* REMOVE */}
          <button
            type="button"
            onClick={() =>
              removeItem(
                item.productId,
                item.variantSku
              )
            }
            className="
              shrink-0
              text-neutral-600
              transition
              hover:text-red-500
            "
            aria-label={`Remove ${item.name}`}
          >
            <Trash2
              size={15}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* STOCK WARNING */}
        {isOutOfStock ? (
          <p className="mt-2 text-xs text-red-500">
            Out of stock
          </p>
        ) : !item.isAvailable ? (
          <p className="mt-2 text-xs text-red-500">
            Only {item.availableQuantity}{" "}
            available
          </p>
        ) : null}

        {/* BOTTOM */}
        <div className="mt-4 flex items-center justify-between">
          {/* QUANTITY */}
          <div
            className="
              flex
              h-8
              items-center
              border
              border-neutral-800
            "
          >
            <button
              type="button"
              disabled={
                item.quantity <= 1
              }
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.variantSku,
                  item.quantity - 1
                )
              }
              className="
                flex
                h-full
                w-8
                items-center
                justify-center
                text-neutral-400
                transition
                hover:bg-neutral-900
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span
              className="
                flex
                h-full
                w-8
                items-center
                justify-center
                border-x
                border-neutral-800
                text-xs
                text-white
              "
            >
              {item.quantity}
            </span>

            <button
              type="button"
              disabled={
                isOutOfStock ||
                item.quantity >=
                  maxQuantity
              }
              onClick={() =>
                updateQuantity(
                  item.productId,
                  item.variantSku,
                  item.quantity + 1
                )
              }
              className="
                flex
                h-full
                w-8
                items-center
                justify-center
                text-neutral-400
                transition
                hover:bg-neutral-900
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* PRICE */}
          <div className="text-right">
            <p className="text-sm font-medium text-white">
              ₹
              {item.lineTotal.toLocaleString(
                "en-IN"
              )}
            </p>

            {item.comparePrice !== null &&
              item.comparePrice >
                item.price && (
                <p
                  className="
                    text-xs
                    text-neutral-600
                    line-through
                  "
                >
                  ₹
                  {(
                    item.comparePrice *
                    item.quantity
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}