import pkg from "mongoose";

const { Schema, model, models } = pkg;

/* ---------------------------------- */
/* Order Item */
/* ---------------------------------- */

const OrderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variantSku: {
      type: String,
      required: true,
      trim: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    variantAttributes: [
      {
        name: {
          type: String,
          required: true,
        },

        value: {
          type: String,
          required: true,
        },
      },
    ],

    image: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);


/* ---------------------------------- */
/* Customer */
/* ---------------------------------- */

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);


/* ---------------------------------- */
/* Shipping Address */
/* ---------------------------------- */

const ShippingAddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  { _id: false }
);


/* ---------------------------------- */
/* Pricing */
/* ---------------------------------- */

const PricingSchema = new Schema(
  {
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);


/* ---------------------------------- */
/* Razorpay */
/* ---------------------------------- */

const RazorpaySchema = new Schema(
  {
    orderId: {
      type: String,
      default: null,
    },

    paymentId: {
      type: String,
      default: null,
    },

    signature: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);


/* ---------------------------------- */
/* Order */
/* ---------------------------------- */

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay"],
      default: "razorpay",
    },

    customer: {
      type: CustomerSchema,
      required: true,
    },

    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (
          items: unknown[]
        ) => items.length > 0,

        message:
          "Order must contain at least one item",
      },
    },

    pricing: {
      type: PricingSchema,
      required: true,
    },

    razorpay: {
      type: RazorpaySchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);


OrderSchema.index({
  "customer.email": 1,
});

OrderSchema.index({
  "customer.phone": 1,
});

OrderSchema.index({
  status: 1,
});

OrderSchema.index({
  paymentStatus: 1,
});

OrderSchema.index({
  createdAt: -1,
});


const Order =
  models.Order ||
  model("Order", OrderSchema);

export default Order;