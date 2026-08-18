import { z } from "zod";

/* ---------------------------------- */
/* Checkout Item */
/* ---------------------------------- */

const CheckoutItemSchema = z.object({
  variantSku: z
    .string()
    .trim()
    .min(1, "Variant SKU is required"),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(20, "Maximum quantity is 20"),
});


/* ---------------------------------- */
/* Customer */
/* ---------------------------------- */

const CustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
});


/* ---------------------------------- */
/* Shipping Address */
/* ---------------------------------- */

const ShippingAddressSchema =
  z.object({
    addressLine1: z
      .string()
      .trim()
      .min(
        5,
        "Address is required"
      )
      .max(
        200,
        "Address is too long"
      ),

    addressLine2: z
      .string()
      .trim()
      .max(
        200,
        "Address is too long"
      )
      .optional()
      .default(""),

    city: z
      .string()
      .trim()
      .min(
        2,
        "City is required"
      )
      .max(100),

    state: z
      .string()
      .trim()
      .min(
        2,
        "State is required"
      )
      .max(100),

    postalCode: z
      .string()
      .trim()
      .regex(
        /^\d{6}$/,
        "Enter a valid 6-digit pincode"
      ),

    country: z
      .string()
      .trim()
      .default("India"),
  });


/* ---------------------------------- */
/* Checkout DTO */
/* ---------------------------------- */

export const checkoutDto =
  z.object({
    customer:
      CustomerSchema,

    shippingAddress:
      ShippingAddressSchema,

    items: z
      .array(
        CheckoutItemSchema
      )
      .min(
        1,
        "Cart cannot be empty"
      )
      .max(
        50,
        "Too many items"
      ),
  });


export type CheckoutDto =
  z.infer<
    typeof checkoutDto
  >;