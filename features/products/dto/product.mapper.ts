import type { ProductCardDTO } from "./product-card.dto";
import type { ProductDetailDTO } from "./product-detail.dto";

export function toProductCardDTO(
  product: any
): ProductCardDTO {
  const variant = product.variants?.[0];

  return {
    id: product._id.toString(),

    name: product.name,

    slug: product.slug,

    price: variant?.price ?? 0,

    comparePrice: variant?.comparePrice ?? null,

    image: product.media?.[0]?.url ?? "",
  };
}

export function toProductDetailDTO(
  product: any
): ProductDetailDTO {
  return {
    id: product._id.toString(),
    productId: product.productId,
    name: product.name,

    slug: product.slug,

    shortDescription:
      product.shortDescription ?? "",

    description:
      product.description ?? "",

    media: product.media ?? [],

    variants: (product.variants ?? []).map(
      (variant: any) => ({

        variantId: variant.variantId,

        sku: variant.sku,

        price: variant.price,

        comparePrice:
          variant.comparePrice ?? null,

        stock: variant.stock,

        attributes:
          variant.attributes ?? [],

        images:
          variant.images ?? [],
      })
    ),

    specifications:
      product.specifications ?? [],

    features:
      product.features ?? [],

    careInstructions:
      product.careInstructions ?? [],

    brand: {
      id: product.brand._id.toString(),
      name: product.brand.name,
      slug: product.brand.slug,
    },

    categories: (product.categories ?? []).map(
      (category: any) => ({
        id: category._id.toString(),
        name: category.name,
        slug: category.slug,
      })
    ),

    seo: {
      title:
        product.seo?.title ?? "",

      description:
        product.seo?.description ?? "",

      keywords:
        product.seo?.keywords ?? [],
    },
    rating: {
      average: product.rating?.average ?? 0,
      count: product.rating?.count ?? 0,
    },
  };
}