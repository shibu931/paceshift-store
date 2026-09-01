import pkg from "mongoose";

const { Schema, model, models } = pkg;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    /*
     Coupon category, regular = promotional coupon, influencer = influencer marketing code
     */
    category: {
      type: String,
      enum: ["regular", "influencer"],
      default: "regular",
    },

    /*
     * Optional influencer name., Useful for admin tracking.
     */
    influencerName: {
      type: String,
      default: "",
      trim: true,
    },

    /*
     * Discount type
     */
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    /*
     * Discount value
     *
     * percentage:
     * 10 = 10%
     *
     * fixed:
     * 200 = ₹200
     */
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    /*
     * Maximum discount.
     *
     * Useful for percentage discounts.
     *
     * Example:
     * 20% off up to ₹500
     */
    maxDiscount: {
      type: Number,
      default: null,
    },

    /*
     * Minimum cart value
     */
    minOrderValue: {
      type: Number,
      default: 0,
    },

    /*
     * Maximum total usage.
     *
     * null = unlimited
     */
    usageLimit: {
      type: Number,
      default: null,
    },

    /*
     * Number of successful uses
     */
    usedCount: {
      type: Number,
      default: 0,
    },

    /*
     * Validity period
     */
    startsAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    /*
     * Enable / Disable coupon
     */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

CouponSchema.index({ code: 1 });
CouponSchema.index({ status: 1 });
CouponSchema.index({ category: 1 });

const Coupon =
  models.Coupon ||
  model("Coupon", CouponSchema);

export default Coupon;