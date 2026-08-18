"use client";

import { hydrateCartAction } from "@/features/cart/cart.action";
import { useCartStore } from "@/features/cart/cart.store";
import {
  CartItem,
  HydratedCart,
} from "@/features/cart/cart.types";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const EMPTY_CART: HydratedCart = {
  items: [],
  invalidItems: [],
  summary: {
    subtotal: 0,
    itemCount: 0,
  },
};

interface UseCartOptions {
  hydrateOnMount?: boolean;
}

export function useCart(
  options: UseCartOptions = {}
) {
  const {
    hydrateOnMount = false,
  } = options;

  const items = useCartStore(
    (state) => state.items
  );

  const isCartOpen = useCartStore(
    (state) => state.isCartOpen
  );

  const [cart, setCart] =
    useState<HydratedCart>(
      EMPTY_CART
    );

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const isHydrating =
    useRef(false);

  const hydrateCart = useCallback(
    async (cartItems: CartItem[]) => {
      if (!cartItems.length) {
        setCart(EMPTY_CART);
        return;
      }

      if (isHydrating.current) {
        return;
      }

      try {
        isHydrating.current = true;

        setIsLoading(true);
        setError(null);

        const result =
          await hydrateCartAction({
            items: cartItems,
          });

        if (
          result.invalidItems.length
        ) {
          useCartStore
            .getState()
            .removeInvalidItems(
              result.invalidItems
            );

          /*
           * Don't leave stale hydrated
           * data after invalid items
           * have been removed.
           */
          setCart(EMPTY_CART);

          return;
        }

        setCart(result);
      } catch (error) {
        console.error(
          "Failed to hydrate cart:",
          error
        );

        setError(
          "Unable to load your cart."
        );
      } finally {
        isHydrating.current = false;
        setIsLoading(false);
      }
    },
    []
  );

  /*
   * ----------------------------------
   * Cart drawer hydration
   * ----------------------------------
   *
   * Existing behavior remains intact.
   */
  useEffect(() => {
    if (
      !hydrateOnMount &&
      !isCartOpen
    ) {
      return;
    }

    hydrateCart(items);
  }, [
    isCartOpen,
    hydrateOnMount,
    hydrateCart,
  ]);

  /*
   * ----------------------------------
   * Local quantity synchronization
   * ----------------------------------
   *
   * Quantity changes do NOT cause
   * another server hydration.
   */
  useEffect(() => {
    setCart((currentCart) => {
      if (!currentCart.items.length) {
        return currentCart;
      }

      const updatedItems =
        currentCart.items.map(
          (cartItem) => {
            const storeItem =
              items.find(
                (item) =>
                  item.productId ===
                    cartItem.productId &&
                  item.variantSku ===
                    cartItem.variantSku
              );

            if (!storeItem) {
              return cartItem;
            }

            return {
              ...cartItem,

              quantity:
                storeItem.quantity,

              lineTotal:
                cartItem.price *
                storeItem.quantity,
            };
          }
        );

      const subtotal =
        updatedItems.reduce(
          (total, item) =>
            total + item.lineTotal,
          0
        );

      const itemCount =
        updatedItems.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );

      return {
        ...currentCart,

        items: updatedItems,

        summary: {
          subtotal,
          itemCount,
        },
      };
    });
  }, [items]);

  return {
    cart,
    isLoading,
    error,

    refreshCart: () =>
      hydrateCart(items),
  };
}