

import connectToDB from "@/lib/DB/DBConnect";
import type {
  CartItem,
  CartItemDisplay,
  HydratedCart,
} from "./cart.types";
import Product from "@/lib/DB/models/Product";

const invalidItems: CartItem[] = [];

export class CartService {
  async hydrateCart(
    items: CartItem[]
  ): Promise<HydratedCart> {
    if (items.length === 0) {
      return {
        items: [],
         invalidItems: [],
        summary: {
          subtotal: 0,
          itemCount: 0,
        },
      };
    }
    await connectToDB();

    const productIds = [
      ...new Set(
        items.map(
          (item) => item.productId
        )
      ),
    ];

    const products =
      await Product.find({
        _id: {
          $in: productIds,
        },

        status: "active",
      }).lean();

    const productMap = new Map(
      products.map((product) => [
        product._id.toString(),
        product,
      ])
    );

    const hydratedItems: CartItemDisplay[] =
      [];

    for (const item of items) {
      const product =
        productMap.get(
          item.productId
        );

      // Product no longer exists
      // or isn't active.
      if (!product) {
        invalidItems.push(item);
        continue;
      }

      const variant =
        product.variants?.find(
          (variant: any) =>
            variant.sku ===
            item.variantSku
        );

      // Variant no longer exists.
      if (!variant) {
        invalidItems.push(item);
        continue;
      }

      const price =
        variant.price;

      const availableQuantity =
        Math.max(
          0,
          variant.stock ?? 0
        );

      const lineTotal =
        price * item.quantity;

      hydratedItems.push({
        productId:
          product._id.toString(),

        variantSku:
          variant.sku,

        name:
          product.name,

        slug:
          product.slug,

        image:
          this.getVariantImage(
            variant
          ) ??
          this.getProductImage(
            product
          ),

        variantLabel:
          this.getVariantLabel(
            variant
          ),

        price,

        comparePrice:
          variant.comparePrice,

        quantity:
          item.quantity,

        lineTotal,

        availableQuantity,

        isAvailable:
          availableQuantity >=
          item.quantity,
      });
    }

    const subtotal =
      hydratedItems.reduce(
        (total, item) =>
          total + item.lineTotal,
        0
      );

    const itemCount =
      hydratedItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );


    return {
      items: hydratedItems,
      invalidItems,
      summary: {
        subtotal,

        itemCount,
      },
    };
  }

  private getVariantImage(
    variant: any
  ): string | null {
    if (
      !variant.images?.length
    ) {
      return null;
    }

    const image =
      [...variant.images]
        .sort(
          (a, b) =>
            (a.order ?? 0) -
            (b.order ?? 0)
        )
        .find(
          (image) =>
            image.type === "image"
        );

    return image?.url ?? null;
  }

  private getProductImage(
    product: any
  ): string {
    if (
      !product.media?.length
    ) {
      return "/images/placeholder.webp";
    }

    const image =
      [...product.media]
        .sort(
          (a, b) =>
            (a.order ?? 0) -
            (b.order ?? 0)
        )
        .find(
          (media) =>
            media.type === "image"
        );

    return (
      image?.url ??
      "/images/placeholder.webp"
    );
  }

  private getVariantLabel(
    variant: any
  ): string {
    if (
      !variant.attributes?.length
    ) {
      return "";
    }

    return variant.attributes
      .map(
        (attribute: {
          name: string;
          value: string;
        }) =>
          `${attribute.name}: ${attribute.value}`
      )
      .join(" / ");
  }
}