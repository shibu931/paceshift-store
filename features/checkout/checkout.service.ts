import connectToDB from "@/lib/DB/DBConnect";
import Product from "@/lib/DB/models/Product";
import Order from "@/lib/DB/models/Order";
import crypto from "node:crypto";
import {
  checkoutDto,
  type CheckoutDto,
} from "./checkout.dto";
import razorpayService from "../payments/razorpay.service";


export class CheckoutService {
  async createOrder(
    input: CheckoutDto
  ) {
    /*
     * ----------------------------------
     * 1. Validate input
     * ----------------------------------
     */

    const validated =
      checkoutDto.parse(input);

    await connectToDB();

    /*
     * ----------------------------------
     * 2. Resolve cart items
     * ----------------------------------
     */

    const items = [];

    let subtotal = 0;

    for (
      const item of validated.items
    ) {
      const product =
        await Product.findOne({
          status: "active",
          "variants.sku":
            item.variantSku,
        }).lean();

      if (!product) {
        throw new Error(
          `Product for variant "${item.variantSku}" was not found`
        );
      }

      const variant =
        product.variants.find(
          (variant: any) =>
            variant.sku ===
            item.variantSku
        );

      if (!variant) {
        throw new Error(
          `Variant "${item.variantSku}" was not found`
        );
      }

      /*
       * --------------------------------
       * Stock validation
       * --------------------------------
       */

      if (variant.stock <= 0) {
        throw new Error(
          `${product.name} is out of stock`
        );
      }

      if (
        variant.stock <
        item.quantity
      ) {
        throw new Error(
          `Only ${variant.stock} units of ${product.name} are available`
        );
      }

      /*
       * --------------------------------
       * Calculate item total
       * --------------------------------
       */

      const itemTotal =
        variant.price *
        item.quantity;

      subtotal += itemTotal;

      /*
       * --------------------------------
       * Get image
       * --------------------------------
       */

      const image =
        variant.images?.find(
          (media: any) =>
            media.type === "image"
        ) ??
        product.media?.find(
          (media: any) =>
            media.type === "image"
        );

      /*
       * --------------------------------
       * Add order item
       * --------------------------------
       */

      items.push({
        productId:
          product._id,

        variantSku:
          variant.sku,

        productName:
          product.name,

        variantAttributes:
          variant.attributes ?? [],

        image:
          image?.url ?? "",

        quantity:
          item.quantity,

        price:
          variant.price,

        total:
          itemTotal,
      });
    }

    /*
     * ----------------------------------
     * 3. Calculate pricing
     * ----------------------------------
     */

    const shipping = 0;

    const discount = 0;

    const total =
      subtotal +
      shipping -
      discount;

    if (total <= 0) {
      throw new Error(
        "Invalid order amount"
      );
    }

    /*
     * ----------------------------------
     * 4. Generate order number
     * ----------------------------------
     */

    const orderNumber =
      `PS-${Date.now()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    /*
     * ----------------------------------
     * 5. Create MongoDB order
     * ----------------------------------
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

        items,

        pricing: {
          subtotal,

          shipping,

          discount,

          total,
        },

        razorpay: {},
      });

    try {
      /*
       * --------------------------------
       * 6. Create Razorpay Order
       * --------------------------------
       */

      const razorpayOrder =
        await razorpayService.createOrder(
          {
            amount: total,

            receipt:
              orderNumber,
          }
        );

      /*
       * --------------------------------
       * 7. Store Razorpay Order ID
       * --------------------------------
       */

      order.razorpay = {
        orderId:
          razorpayOrder.id,

        paymentId: null,

        signature: null,
      };

      await order.save();

      /*
       * --------------------------------
       * 8. Return checkout data
       * --------------------------------
       */

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
          subtotal,

          shipping,

          discount,

          total,
        },
      };
    } catch (error) {
      /*
       * Razorpay order creation failed.
       *
       * Don't leave our order as an
       * active/pending checkout.
       */

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
  }) {
    await connectToDB();

    if (!input.items.length) {
      throw new Error("Your cart is empty");
    }

    const orderItems = [];

    let subtotal = 0;

    for (const item of input.items) {
      /*
       * Find product containing
       * this variant SKU.
       */
      const product =
        await Product.findOne({
          status: "active",
          "variants.sku": item.variantSku,
        });

      if (!product) {
        throw new Error(
          `Product not found for SKU: ${item.variantSku}`
        );
      }

      const variant =
        product.variants.find(
          (variant: any) =>
            variant.sku === item.variantSku
        );

      if (!variant) {
        throw new Error(
          `Variant not found: ${item.variantSku}`
        );
      }

      if (variant.stock < item.quantity) {
        throw new Error(
          `${product.name} does not have enough stock`
        );
      }

      const total =
        variant.price * item.quantity;

      subtotal += total;

      orderItems.push({
        /*
         * Match Order schema exactly
         */
        productId: product._id.toString(),

        productName: product.name,

        variantSku: variant.sku,

        quantity: item.quantity,

        price: variant.price,

        total,

        image:
          variant.images?.[0]?.url ||
          product.media?.[0]?.url ||
          "",
      });
    }

    const shipping = 0;

    const total = subtotal + shipping;

    const orderNumber =
      `PS-${Date.now()
        .toString()
        .slice(-8)}`;

    const order = await Order.create({
      orderNumber,

      /*
       * Customer information
       */
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        phone: input.customer.phone,
      },

      /*
       * Your schema requires name
       * and phone here too.
       */
      shippingAddress: {
        name: input.customer.name,

        phone: input.customer.phone,

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

      items: orderItems,

      /*
       * Required nested pricing object
       */
      pricing: {
        subtotal,
        shipping,
        total,
      },

      /*
       * Match enum exactly
       */
      paymentMethod: "cod",

      paymentStatus: "pending",

      orderStatus: "pending",
    });

    return {
      orderId:
        order._id.toString(),

      orderNumber:
        order.orderNumber,
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