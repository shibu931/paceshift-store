"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState } from "./cart.types";


const MAX_CART_QUANTITY = 10;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      isCartOpen: false,

      addItem: (
        productId,
        variantSku,
        quantity = 1
      ) => {
        set((state) => {
          const existingItemIndex =
            state.items.findIndex(
              (item) =>
                item.productId === productId &&
                item.variantSku === variantSku
            );

          if (existingItemIndex !== -1) {
            const items = [...state.items];

            const existingItem =
              items[existingItemIndex];

            items[existingItemIndex] = {
              ...existingItem,

              quantity: Math.min(
                existingItem.quantity + quantity,
                MAX_CART_QUANTITY
              ),
            };

            return {
              items,
              isCartOpen: true,
            };
          }

          return {
            items: [
              ...state.items,

              {
                productId,
                variantSku,
                quantity: Math.min(
                  quantity,
                  MAX_CART_QUANTITY
                ),
              },
            ],

            isCartOpen: true,
          };
        });
      },

      buyNow: (
        productId,
        variantSku,
        quantity = 1
      ) => {
        const safeQuantity = Math.max(
          1,
          Math.min(
            quantity,
            MAX_CART_QUANTITY
          )
        );

        set({
          items: [
            {
              productId,
              variantSku,
              quantity: safeQuantity,
            },
          ],

          isCartOpen: false,
        });
      },

      updateQuantity: (
        productId,
        variantSku,
        quantity
      ) => {
        if (quantity <= 0) {
          get().removeItem(
            productId,
            variantSku
          );

          return;
        }

        set((state) => ({
          items: state.items.map(
            (item) =>
              item.productId === productId &&
                item.variantSku === variantSku
                ? {
                  ...item,

                  quantity: Math.min(
                    quantity,
                    MAX_CART_QUANTITY
                  ),
                }
                : item
          ),
        }));
      },

      removeItem: (
        productId,
        variantSku
      ) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.variantSku === variantSku
              )
          ),
        }));
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      getItemQuantity: (
        productId,
        variantSku
      ) => {
        const item = get().items.find(
          (item) =>
            item.productId === productId &&
            item.variantSku === variantSku
        );

        return item?.quantity ?? 0;
      },

      getItemCount: () => {
        return get().items.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );
      },

      removeInvalidItems: (invalidItems) => {
        if (!invalidItems.length) {
          return;
        }

        set((state) => ({
          items: state.items.filter(
            (cartItem) =>
              !invalidItems.some(
                (invalidItem) =>
                  invalidItem.productId ===
                  cartItem.productId &&
                  invalidItem.variantSku ===
                  cartItem.variantSku
              )
          ),
        }));
      },

      openCart: () => {
        set({
          isCartOpen: true,
        });
      },

      closeCart: () => {
        set({
          isCartOpen: false,
        });
      },

      setCartOpen: (open) => {
        set({
          isCartOpen: open,
        });
      },
    }),

    {
      name: "paceshift-cart",

      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);