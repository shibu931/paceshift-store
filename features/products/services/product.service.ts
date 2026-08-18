import connectToDB from "@/lib/DB/DBConnect";
import '@/lib/DB/models/index';
import '@/lib/DB/models';
import Product from "@/lib/DB/models/Product";
import {
  toProductCardDTO,
  toProductDetailDTO,
} from "../dto/product.mapper";
import Category from "@/lib/DB/models/Category";

class ProductService {

  //Get all active products
  async getProducts() {
    await connectToDB();

    const products = await Product.find({
      status: "active",
    })
      .populate("brand")
      .populate("categories")
      .lean();

    return products.map(toProductCardDTO);
  }

  //Featured products
  async getFeaturedProducts() {
    await connectToDB();

    const products = await Product.find({
      status: "active",
      featured: true,
    })
      .populate("brand")
      .populate("categories")
      .lean();

    return products.map(toProductCardDTO);
  }

  //New Arrivals
  async getNewArrivals() {
    await connectToDB();

    const products = await Product.find({
      status: "active",
      newArrival: true,
    })
      .sort({ createdAt: -1 })
      .populate("brand")
      .populate("categories")
      .lean();

    return products.map(toProductCardDTO);
  }

  //Product By Slug
  async getProductBySlug(slug: string) {
    await connectToDB();

    const product = await Product.findOne({
      slug,
      status: "active",
    })
      .populate("brand")
      .populate("categories")
      .lean();
    return product ? toProductDetailDTO(product) : null;
  }

  //Product By Id
  async getProductById(id: string) {
    await connectToDB();

    const product = await Product.findById(id)
      .populate("brand")
      .populate("categories")
      .lean();

    return product ? toProductDetailDTO(product) : null;
  }

  //   Related Products
  async getRelatedProducts(productId: string, categoriesId: string) {
    await connectToDB();

    const products = await Product.find({
      _id: { $ne: productId },
      categories: categoriesId,
      status: "active",
    })
      .limit(4)
      .lean();

    return products.map(toProductCardDTO);
  }

  //   Search Products
  async searchProducts(query: string) {
    await connectToDB();

    const products = await Product.find({
      status: "active",
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          tags: {
            $in: [new RegExp(query, "i")],
          },
        },
      ],
    }).lean();
    return products.map(toProductCardDTO);
  }

  //   categories Products
  async getProductsBycategories(categoriesId: string) {
    await connectToDB();

    const products = await Product.find({
      categories: categoriesId,
      status: "active",
    }).lean();
    return products.map(toProductCardDTO);
  }

  // catalog products
async getCatalogProducts(
  page = 1,
  limit = 100,
  collectionId?: string
) {
  await connectToDB();

  const filter: any = {
    status: "active",
  };

  // Fastrr collection_id → MongoDB Category._id
  if (collectionId) {
    const category =
      await Category.findOne({
        fastrrId: Number(collectionId),
        status: "active",
      })
        .select("_id")
        .lean();

    // Collection doesn't exist
    if (!category) {
      return {
        total: 0,
        products: [],
      };
    }

    // Product.categories contains MongoDB ObjectIds
    filter.categories =
      category._id;
  }

  const skip =
    (page - 1) * limit;

  const [
    products,
    total,
  ] = await Promise.all([
    Product.find(filter)
      .populate("brand")
      .populate("categories")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean(),

    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
  };
}
}



const productService = new ProductService();

export default productService;