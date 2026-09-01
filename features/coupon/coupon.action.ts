"use server";

import Product from "@/lib/DB/models/Product";
import couponService from "./coupon.service";

interface CouponItem {
  variantSku: string;
  quantity: number;
}

export async function validateCouponAction(
  code: string,
  items: CouponItem[]
) {
  try {
    if (!code.trim()) {
      return {
        success: false,
        discount: 0,
        message:
          "Enter a coupon code",
      };
    }

    if (!items.length) {
      return {
        success: false,
        discount: 0,
        message:
          "Cart is empty",
      };
    }

    /*
     * Calculate subtotal from DB.
     *
     * Never trust frontend prices.
     */
    let subtotal = 0;

    for (const item of items) {
      const product =
        await Product.findOne({
          status: "active",
          "variants.sku": item.variantSku,
        });

      if (!product) {
        return {
          success: false,
          discount: 0,
          message:
            "One or more products are unavailable",
        };
      }

      subtotal +=
        product.price *
        item.quantity;
    }

    const result =
      await couponService.validateCoupon(
        code,
        subtotal
      );

    return {
      success: result.valid,
      subtotal,
      ...result,
    };
  } catch (error) {
    console.error(
      "Coupon validation failed:",
      error
    );

    return {
      success: false,
      discount: 0,
      message:
        "Unable to validate coupon",
    };
  }
}