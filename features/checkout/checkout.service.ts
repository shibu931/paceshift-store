import connectToDB from "@/lib/DB/DBConnect";
import Product from "@/lib/DB/models/Product";
import Order from "@/lib/DB/models/Order";
import crypto from "node:crypto";
import {
  checkoutDto,
  type CheckoutDto,
} from "./checkout.dto";
import razorpayService from "../payments/razorpay.service";
import checkoutPricingService from "./checkout-pricing.service";


export class CheckoutService {
async createOrder(
  input: CheckoutDto
) {
  /*
   * 1. Validate input
   */
  const validated =
    checkoutDto.parse(input);

  await connectToDB();

  /*
   * 2. Calculate everything server-side
   *
   * Products
   * Stock
   * Subtotal
   * Coupon
   * Discount
   * Final total
   */
  const pricing =
    await checkoutPricingService.calculate({
      items: validated.items,

      couponCode:
        validated.couponCode,
    });

  /*
   * 3. Generate order number
   */
  const orderNumber =
    `PS-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

  /*
   * 4. Create MongoDB order
   */
  const order =
    await Order.create({
      orderNumber,

      status: "pending",

      paymentStatus:
        "pending",

      paymentMethod:
        "razorpay",

      customer:
        validated.customer,

      shippingAddress: {
        ...validated.shippingAddress,

        name:
          validated.customer.name,

        phone:
          validated.customer.phone,
      },

      items:
        pricing.items,

      pricing: {
        subtotal:
          pricing.subtotal,

        shipping:
          pricing.shipping,

        discount:
          pricing.discount,

        total:
          pricing.total,
      },

      coupon: pricing.coupon,

      razorpay: {},
    });

  try {
    /*
     * 5. Create Razorpay order
     *
     * IMPORTANT:
     * pricing.total already includes
     * the coupon discount.
     */
    const razorpayOrder =
      await razorpayService.createOrder({
        amount:
          pricing.total,

        receipt:
          orderNumber,
      });

    /*
     * 6. Store Razorpay order ID
     */
    order.razorpay = {
      orderId:
        razorpayOrder.id,

      paymentId: null,

      signature: null,
    };

    await order.save();

    return {
      orderId:
        order._id.toString(),

      orderNumber,

      razorpay: {
        keyId:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        orderId:
          razorpayOrder.id,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,
      },

      pricing: {
        subtotal:
          pricing.subtotal,

        shipping:
          pricing.shipping,

        discount:
          pricing.discount,

        total:
          pricing.total,
      },
    };
  } catch (error) {
    order.status =
      "cancelled";

    order.paymentStatus =
      "failed";

    await order.save();

    throw error;
  }
}
async createCodOrder(input: {
  customer: {
    name: string;
    email?: string;
    phone: string;
  };

  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  items: {
    variantSku: string;
    quantity: number;
  }[];

  couponCode?: string;
}) {
  await connectToDB();

  /*
   * Resolve products and calculate
   * all pricing server-side.
   */
  const pricing =
    await checkoutPricingService.calculate({
      items: input.items,

      couponCode:
        input.couponCode,
    });

  /*
   * Generate order number
   */
  const orderNumber =
    `PS-${Date.now()
      .toString()
      .slice(-8)}`;

  /*
   * Create COD order
   */
  const order =
    await Order.create({
      orderNumber,

      customer: {
        name:
          input.customer.name,

        email:
          input.customer.email,

        phone:
          input.customer.phone,
      },

      shippingAddress: {
        name:
          input.customer.name,

        phone:
          input.customer.phone,

        addressLine1:
          input.shippingAddress.addressLine1,

        addressLine2:
          input.shippingAddress.addressLine2 || "",

        city:
          input.shippingAddress.city,

        state:
          input.shippingAddress.state,

        postalCode:
          input.shippingAddress.postalCode,

        country:
          input.shippingAddress.country,
      },

      items:
        pricing.items,

      pricing: {
        subtotal:
          pricing.subtotal,

        shipping:
          pricing.shipping,

        discount:
          pricing.discount,

        total:
          pricing.total,
      },

      coupon: pricing.coupon,

      paymentMethod:
        "cod",

      paymentStatus:
        "pending",

      orderStatus:
        "pending",
    });

  return {
    orderId:
      order._id.toString(),

    orderNumber:
      order.orderNumber,

    pricing: {
      subtotal:
        pricing.subtotal,

      shipping:
        pricing.shipping,

      discount:
        pricing.discount,

      total:
        pricing.total,
    },
  };
}
  async verifyPayment(input: {
    orderNumber: string;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
  }) {
    await connectToDB();

    const order = await Order.findOne({
      orderNumber: input.orderNumber,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    /*
     * Idempotency:
     *
     * If Razorpay/browser sends the
     * verification request twice, don't
     * deduct stock twice.
     */
    if (order.paymentStatus === "paid") {
      return {
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
      };
    }

    /*
     * Get the Razorpay order ID from
     * our database.
     */
    const razorpayOrderId =
      order.razorpay?.orderId;

    if (!razorpayOrderId) {
      throw new Error(
        "Razorpay order not found"
      );
    }

    /*
     * Never trust the Razorpay order ID
     * coming from the browser.
     */
    if (
      input.razorpayOrderId !==
      razorpayOrderId
    ) {
      throw new Error(
        "Invalid Razorpay order"
      );
    }

    /*
     * Verify Razorpay signature.
     */
    const secret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      throw new Error(
        "RAZORPAY_KEY_SECRET is not configured"
      );
    }

    const body =
      `${razorpayOrderId}|${input.razorpayPaymentId}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(body)
        .digest("hex");

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "hex"
      );

    const receivedBuffer =
      Buffer.from(
        input.razorpaySignature,
        "hex"
      );

    if (
      expectedBuffer.length !==
      receivedBuffer.length
    ) {
      throw new Error(
        "Invalid payment signature"
      );
    }

    const signatureValid =
      crypto.timingSafeEqual(
        expectedBuffer,
        receivedBuffer
      );

    if (!signatureValid) {
      order.paymentStatus =
        "failed";

      await order.save();

      throw new Error(
        "Invalid payment signature"
      );
    }

    /*
     * ----------------------------------
     * Payment is verified.
     * ----------------------------------
     *
     * Now deduct stock atomically.
     */
    const updatedItems: {
      productId: string;
      variantSku: string;
      quantity: number;
    }[] = [];

    try {
      for (const item of order.items) {
        const result =
          await Product.updateOne(
            {
              _id: item.productId,

              variants: {
                $elemMatch: {
                  sku: item.variantSku,
                  stock: {
                    $gte: item.quantity,
                  },
                },
              },
            },
            {
              $inc: {
                "variants.$[variant].stock":
                  -item.quantity,
              },
            },
            {
              arrayFilters: [
                {
                  "variant.sku":
                    item.variantSku,
                },
              ],
            }
          );

        /*
         * No matching document means:
         *
         * - product doesn't exist
         * - variant doesn't exist
         * - insufficient stock
         */
        if (result.modifiedCount !== 1) {
          throw new Error(
            `${item.productName} is no longer available in the requested quantity`
          );
        }

        updatedItems.push({
          productId:
            item.productId.toString(),

          variantSku:
            item.variantSku,

          quantity:
            item.quantity,
        });
      }

      /*
       * ----------------------------------
       * Everything succeeded.
       * ----------------------------------
       */

      order.paymentStatus =
        "paid";

      order.status =
        "confirmed";

      order.razorpay.paymentId =
        input.razorpayPaymentId;

      order.razorpay.signature =
        input.razorpaySignature;

      await order.save();

      return {
        orderNumber:
          order.orderNumber,

        status:
          order.status,

        paymentStatus:
          order.paymentStatus,
      };
    } catch (error) {
      /*
       * Roll back any stock updates that
       * happened before the failure.
       */
      for (const item of updatedItems) {
        await Product.updateOne(
          {
            _id:
              item.productId,
          },
          {
            $inc: {
              "variants.$[variant].stock":
                item.quantity,
            },
          },
          {
            arrayFilters: [
              {
                "variant.sku":
                  item.variantSku,
              },
            ],
          }
        );
      }

      throw error;
    }
  }
}

export const checkoutService =
  new CheckoutService();