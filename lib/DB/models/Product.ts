import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const MediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    alt: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const VariantAttributeSchema = new Schema(
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
  { _id: false }
);

const VariantSchema = new Schema(
  {
    variantId: {
      type: Number,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    attributes: [VariantAttributeSchema],

    price: {
      type: Number,
      required: true,
    },

    comparePrice: {
      type: Number,
      default: null,
    },

    costPrice: {
      type: Number,
      default: null,
    },

    stock: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: null,
    },

    barcode: {
      type: String,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    images: [MediaSchema],
  },
  { _id: false }
);

const SpecificationSchema = new Schema(
  {
    label: String,
    value: String,
  },
  { _id: false }
);
const FeaturesSchema = new Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const RatingSchema = new Schema(
  {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    }
  },
  { _id: false }
);

const CareInstructionsSchema = new Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    
    productId: {
      type: Number,
      required: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      default: null,
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    rating: RatingSchema,

    media: [MediaSchema],

    variants: [VariantSchema],

    specifications: [SpecificationSchema],

    careInstructions: [CareInstructionsSchema],

    shipping: {
      weight: Number,
      length: Number,
      width: Number,
      height: Number,
    },

    seo: {
      title: String,
      description: String,
      keywords: [String],
    },

    features: [FeaturesSchema],

    newArrival: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ status: 1 });
ProductSchema.index({ categories: 1 });

const Product = models.Product || model("Product", ProductSchema);

export default Product;