"use server";

import { CartService } from "./cart.service";

import {
  validateCartItems,
} from "./cart.validation";

export async function hydrateCartAction(
  input: unknown
) {
  const validated =
    validateCartItems(input);

  const cartService =
    new CartService();

  return cartService.hydrateCart(
    validated.items
  );
}