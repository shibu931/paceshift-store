import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";

import ProductCare from "./ProductCare";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecifications } from "./ProductSpecifications";
import { ProductTrustInfo } from "./components/ProductTrustInfo";

interface ProductDetailsProps {
  product: ProductDetailDTO;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <main className="mt-20 border-t border-white/10 pt-10">
      <section className="mx-auto grid max-w-310 grid-cols-[0.9fr_1.1fr]  gap-16 px-8 max-[900px]:grid-cols-1 max-[500px]:px-5 relative">
        <ProductGallery media={product.media} />

        <div className="space-y-6">
          <ProductInfo product={product} />
          <ProductSpecifications specifications={product.specifications} />
          <ProductCare care={product.careInstructions} />
          <ProductTrustInfo />
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
