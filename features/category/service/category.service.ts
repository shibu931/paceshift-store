import connectToDB from "@/lib/DB/DBConnect";
import Category from "@/lib/DB/models/Category";

import {
  toCategoryDTO,
} from "../dto/category.mapper";

class CategoryService {
  // Get all active categories
  async getCategories() {
    await connectToDB();

    const categories =
      await Category.find({
        status: "active",
      })
        .populate(
          "parent",
          "name slug"
        )
        .sort({
          sortOrder: 1,
          name: 1,
        })
        .lean();

    return categories.map(
      toCategoryDTO
    );
  }

  // Get category by slug
  async getCategoryBySlug(
    slug: string
  ) {
    await connectToDB();

    const category =
      await Category.findOne({
        slug,
        status: "active",
      })
        .populate(
          "parent",
          "name slug"
        )
        .lean();

    return category
      ? toCategoryDTO(category)
      : null;
  }

  // Get featured categories
  async getFeaturedCategories() {
    await connectToDB();

    const categories =
      await Category.find({
        status: "active",
        featured: true,
      })
        .sort({
          sortOrder: 1,
        })
        .lean();

    return categories.map(
      toCategoryDTO
    );
  }

  // Get categories shown in menu
  async getMenuCategories() {
    await connectToDB();

    const categories =
      await Category.find({
        status: "active",
        showInMenu: true,
      })
        .sort({
          sortOrder: 1,
          name: 1,
        })
        .lean();

    return categories.map(
      toCategoryDTO
    );
  }

  // Fastrr / Shiprocket collections
  async getFastrrCollections(
    page = 1,
    limit = 100
  ) {
    await connectToDB();

    const skip =
      (page - 1) * limit;

    const filter = {
      status: "active",
      fastrrId: {
        $exists: true,
      },
    };

    const [
      categories,
      total,
    ] = await Promise.all([
      Category.find(filter)
        .sort({
          sortOrder: 1,
          name: 1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Category.countDocuments(
        filter
      ),
    ]);

    return {
      total,

      categories,
    };
  }
}

const categoryService =
  new CategoryService();

export default categoryService;