import { NextRequest, NextResponse } from "next/server";

import productService from "@/features/products/services/product.service";
import Category from "@/lib/DB/models/Category";
export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const page = Math.max(
      1,
      Number(
        searchParams.get("page") || "1"
      )
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number(
          searchParams.get("limit") || "100"
        )
      )
    );

    const collectionId =
      searchParams.get(
        "collection_id"
      );

    const result =
      await productService.getCatalogProducts(
        page,
        limit,
        collectionId || undefined
      );

    const products =
      result.products.map(
        (product) => {
          const variants =
            product.variants.map(
              (variant:any) => ({
                id: variant.variantId,

                title:
                  variant.attributes
                    ?.map(
                      (attribute:any) =>
                        attribute.value
                    )
                    .join(" / ") ||
                  variant.sku,

                price:
                  String(
                    variant.price
                  ),

                compare_at_price:
                  variant.comparePrice !==
                  null
                    ? String(
                        variant.comparePrice
                      )
                    : null,

                sku:
                  variant.sku,

                quantity:
                  variant.stock,

                taxable: true,

                option_values:
                  Object.fromEntries(
                    variant.attributes?.map(
                      (attribute:any) => [
                        attribute.name,
                        attribute.value,
                      ]
                    ) || []
                  ),

                grams:
                  variant.weight
                    ? Math.round(
                        variant.weight *
                          1000
                      )
                    : 0,

                weight:
                  variant.weight,

                weight_unit:
                  "kg",

                image:
                  variant.images?.[0]
                    ? {
                        src:
                          variant.images[0]
                            .url,
                      }
                    : null,

                created_at:
                  product.createdAt.toISOString(),

                updated_at:
                  product.updatedAt.toISOString(),
              })
            );

          const image =
            product.media?.find(
              (media:any) =>
                media.type ===
                "image"
            );

          return {
            id: product.productId,

            title:
              product.name,

            body_html:
              product.description,

            vendor:
              product.brand?.name ||
              "PaceShift",

            product_type:
              product.categories?.[0]
                ?.name ||
              "Sportswear",

            created_at:
              product.createdAt.toISOString(),

            handle:
              product.slug,

            updated_at:
              product.updatedAt.toISOString(),

            tags:
              product.tags?.join(", ") ||
              "",

            status:
              "active",

            variants,

            image: image
              ? {
                  src: image.url,
                }
              : null,

            options:
              buildProductOptions(
                product.variants
              ),
          };
        }
      );

    return NextResponse.json({
      data: {
        total: result.total,
        products,
      },
    });
  } catch (error) {
    console.error(
      "Shiprocket products API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}

function buildProductOptions(
  variants: any[]
) {
  const optionMap =
    new Map<
      string,
      Set<string>
    >();

  for (const variant of variants) {
    for (const attribute of
      variant.attributes || []) {
      if (
        !optionMap.has(
          attribute.name
        )
      ) {
        optionMap.set(
          attribute.name,
          new Set()
        );
      }

      optionMap
        .get(attribute.name)!
        .add(
          attribute.value
        );
    }
  }

  return Array.from(
    optionMap.entries()
  ).map(
    ([name, values]) => ({
      name,

      values:
        Array.from(values),
    })
  );
}