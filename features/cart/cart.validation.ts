import { Types } from "mongoose";
import { cartItemsSchema } from "./cart.dto";


export function validateCartItems(
  data: unknown
) {
  const result =
    cartItemsSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      "Invalid cart data."
    );
  }

  for (const item of result.data.items) {
    if (
      !Types.ObjectId.isValid(
        item.productId
      )
    ) {
      throw new Error(
        "Invalid product ID."
      );
    }
  }

  return result.data;
}