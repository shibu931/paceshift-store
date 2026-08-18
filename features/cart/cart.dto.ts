import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z
    .string()
    .min(1),

  variantSku: z
    .string()
    .trim()
    .min(1)
    .max(100),

  quantity: z
    .number()
    .int()
    .min(1)
    .max(10),
});

export const cartItemsSchema =
  z.object({
    items: z
      .array(cartItemSchema)
      .max(50),
  });

export type CartItemDTO =
  z.infer<typeof cartItemSchema>;

export type CartItemsDTO =
  z.infer<typeof cartItemsSchema>;