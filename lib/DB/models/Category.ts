import pkg from "mongoose";

const { Schema, model, models } = pkg;

const CategorySchema = new Schema(
  {
    // Category Name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // URL Slug
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Category Banner / Thumbnail
    image: {
      type: String,
      default: "",
    },

    // Parent Category
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    // Navigation Order
    sortOrder: {
      type: Number,
      default: 0,
    },

    // Show in Navbar/Menu
    showInMenu: {
      type: Boolean,
      default: true,
    },

    // Homepage Featured Category
    featured: {
      type: Boolean,
      default: false,
    },

    // SEO
    seo: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      keywords: [
        {
          type: String,
        },
      ],
    },

    // Active / Hidden
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Fastrr / Shiprocket Collection ID
    //
    // Keep this separate from MongoDB _id.
    // This is the ID exposed to Fastrr.
    fastrrId: {
      type: Number,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CategorySchema.index({ parent: 1 });
CategorySchema.index({ status: 1 });
CategorySchema.index({ featured: 1 });
CategorySchema.index({ showInMenu: 1 });

const Category =
  models.Category ||
  model("Category", CategorySchema);

export default Category;