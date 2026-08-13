import {notFound} from 'next/navigation';
import productService from '@/features/products/services/product.service';
import ProductDetails from '@/components/layout/products/ProductDetails';

const page = async ({  params,}: {  params: Promise<{ slug: string }>}) => {
  const { slug } = await params;
  if (!slug || slug !== 'paceshift-performance-crew-socks') {
    notFound();
  }
  const product = await productService.getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <ProductDetails product={product} />
  )
}

export default page