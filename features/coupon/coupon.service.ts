import connectToDB from "@/lib/DB/DBConnect";
import Coupon from "@/lib/DB/models/Coupons";

export interface CouponValidationResult {
  valid: boolean;

  message?: string;

  coupon?: {
    id: string;

    code: string;

    category:
      | "regular"
      | "influencer";

    influencerName?: string;

    discountType:
      | "percentage"
      | "fixed";

    discountValue: number;

    maxDiscount?: number | null;
  };

  discount: number;
}

class CouponService {
  async validateCoupon(
    code: string,
    subtotal: number
  ): Promise<CouponValidationResult> {
    await connectToDB();

    const normalizedCode =
      code.trim().toUpperCase();

    const coupon =
      await Coupon.findOne({
        code: normalizedCode,
        status: "active",
      }).lean();

    if (!coupon) {
      return {
        valid: false,
        message: "Invalid coupon code",
        discount: 0,
      };
    }

    const now = new Date();

    /*
     * Coupon hasn't started yet
     */
    if (
      coupon.startsAt &&
      coupon.startsAt > now
    ) {
      return {
        valid: false,
        message:
          "This coupon is not active yet",
        discount: 0,
      };
    }

    /*
     * Coupon expired
     */
    if (
      coupon.expiresAt &&
      coupon.expiresAt < now
    ) {
      return {
        valid: false,
        message:
          "This coupon has expired",
        discount: 0,
      };
    }

    /*
     * Minimum order value
     */
    if (
      subtotal <
      coupon.minOrderValue
    ) {
      return {
        valid: false,
        message: `Minimum order value is ₹${coupon.minOrderValue}`,
        discount: 0,
      };
    }

    /*
     * Usage limit
     */
    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {
      return {
        valid: false,
        message:
          "Coupon usage limit reached",
        discount: 0,
      };
    }

    /*
     * Calculate discount
     */
    let discount = 0;

    if (
      coupon.discountType ===
      "percentage"
    ) {
      discount =
        (subtotal *
          coupon.discountValue) /
        100;

      if (
        coupon.maxDiscount !== null
      ) {
        discount = Math.min(
          discount,
          coupon.maxDiscount
        );
      }
    }

    if (
      coupon.discountType ===
      "fixed"
    ) {
      discount =
        coupon.discountValue;
    }

    /*
     * Discount cannot exceed subtotal
     */
    discount = Math.min(
      discount,
      subtotal
    );

    return {
      valid: true,

      message: "Coupon applied",

      discount,

      coupon: {
        id:
          coupon._id.toString(),

        code: coupon.code,

        category: coupon.category,

        influencerName:
          coupon.influencerName,

        discountType:
          coupon.discountType,

        discountValue:
          coupon.discountValue,

        maxDiscount:
          coupon.maxDiscount,
      },
    };
  }

  /*
   * Increase usage after
   * successful order.
   */
  async incrementUsage(
    couponId: string
  ) {
    await connectToDB();

    await Coupon.findByIdAndUpdate(
      couponId,
      {
        $inc: {
          usedCount: 1,
        },
      }
    );
  }
}

const couponService =
  new CouponService();

export default couponService;