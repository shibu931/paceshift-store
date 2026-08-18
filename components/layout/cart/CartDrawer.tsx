"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";


import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCartStore } from "@/features/cart/cart.store";
import { useCart } from "@/hooks/useCart";
import CartLoading from "./CartLoading";
import CartError from "./CartError";
import EmptyCart from "./EmptyCart";

export function CartDrawer() {
  const isCartOpen = useCartStore(
    (state) => state.isCartOpen
  );

  const setCartOpen = useCartStore(
    (state) => state.setCartOpen
  );

  const {
    cart,
    isLoading,
    error,
  } = useCart();

  const hasItems =
    cart.items.length > 0;

  const hasUnavailableItems =
    cart.items.some(
      (item) => !item.isAvailable
    );

  return (
    <Drawer
      open={isCartOpen}
      onOpenChange={setCartOpen}
    >
      <DrawerContent
        className="
          left-auto
          right-0
          top-0
          mt-0
          h-screen
          w-full
          max-w-md
          rounded-none
          border-l
          border-neutral-800
          bg-[#0b0b0c]
        "
      >
        {/* HEADER */}
        <DrawerHeader
          className="
            border-b
            border-neutral-800
            px-5
            py-5
            text-left
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle
                className="
                  font-heading
                  text-xl
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                Your Cart
              </DrawerTitle>

              <DrawerDescription
                className="
                  mt-1
                  text-xs
                  text-neutral-500
                "
              >
                {cart.summary.itemCount}{" "}
                {cart.summary.itemCount === 1
                  ? "item"
                  : "items"}
              </DrawerDescription>
            </div>

            <DrawerClose
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-neutral-800
                text-xl
                text-neutral-400
                transition
                hover:border-neutral-600
                hover:text-white
              "
              aria-label="Close cart"
            >
              ×
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* CONTENT */}
        <div className="flex min-h-0 flex-1 flex-col">
          {isLoading ? (
            <CartLoading />
          ) : error ? (
            <CartError error={error} />
          ) : !hasItems ? (
            <EmptyCart />
          ) : (
            <>
              {/* ITEMS */}
              <div
                className="
                  flex-1
                  overflow-y-auto
                  px-5
                "
              >
                <div className="divide-y divide-neutral-800">
                  {cart.items.map(
                    (item) => (
                      <CartItem
                        key={`${item.productId}-${item.variantSku}`}
                        item={item}
                      />
                    )
                  )}
                </div>
              </div>

              {/* SUMMARY */}
              <DrawerFooter
                className="
                  border-t
                  border-neutral-800
                  bg-[#0b0b0c]
                  px-5
                  py-5
                "
              >
                <CartSummary
                  subtotal={
                    cart.summary.subtotal
                  }
                  hasUnavailableItems={
                    hasUnavailableItems
                  }
                />
              </DrawerFooter>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}