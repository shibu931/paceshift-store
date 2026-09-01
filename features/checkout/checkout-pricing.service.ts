import Product from "@/lib/DB/models/Product";
import couponService from "@/features/coupon/coupon.service";

interface PricingItem {
    variantSku: string;
    quantity: number;
}

interface CalculatePricingInput {
    items: PricingItem[];
    couponCode?: string;
}

class CheckoutPricingService {
    async calculate(
        input: CalculatePricingInput
    ) {
        if (!input.items.length) {
            throw new Error("Your cart is empty");
        }

        const items = [];

        let subtotal = 0;

        /*
         * Resolve products and variants
         * from database.
         */
        for (const item of input.items) {
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
             * Stock validation
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

            const itemTotal =
                variant.price *
                item.quantity;

            subtotal += itemTotal;

            /*
             * Prefer variant image,
             * fallback to product image.
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

            items.push({
                productId:
                    product._id.toString(),

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
         * Coupon validation
         */
        let discount = 0;

        let coupon: {
            code: string | null;
            category: "regular" | "influencer" | null;
            influencerName: string | null;
            discount: number;
        } = {
            code: null,
            category: null,
            influencerName: null,
            discount: 0,
        };

        if (input.couponCode?.trim()) {
            const couponResult =
                await couponService.validateCoupon(
                    input.couponCode.trim(),
                    subtotal
                );

            if (!couponResult.valid) {
                throw new Error(
                    couponResult.message ||
                    "Invalid coupon code"
                );
            }

            discount =
                couponResult.discount;

            coupon = {
                code:
                    input.couponCode
                        .trim()
                        .toUpperCase(),

                category:
                    couponResult.coupon?.category ?? "regular",

                influencerName:
                    couponResult.coupon?.influencerName ?? null,

                discount,
            };
        }

        const shipping = 0;

        const total =
            subtotal +
            shipping -
            discount;

        if (total <= 0) {
            throw new Error(
                "Invalid order amount"
            );
        }

        return {
            items,

            subtotal,

            shipping,

            discount,

            total,

            coupon,
        };
    }
}

const checkoutPricingService =
    new CheckoutPricingService();

export default checkoutPricingService;