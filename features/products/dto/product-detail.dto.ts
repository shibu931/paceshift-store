import { ProductCareDTO } from "./product-care.dto";
import { ProductRatingDTO } from "./product-rating.dto";
import { ProductSpecificationDTO } from "./product-specification.dto";

export interface ProductDetailDTO {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;

  media: {
    url: string;
    alt: string;
    type: "image" | "video";
    order: number;
  }[];

  variants: {
    id: string;
    sku: string;
    price: number;
    comparePrice: number | null;
    stock: number;
    attributes: {
      name: string;
      value: string;
    }[];
    images: {
      url: string;
      alt: string;
      type: "image" | "video";
      order: number;
    }[];
  }[];

  specifications: ProductSpecificationDTO[];

  features: {
    icon: string;
    title: string;
    description: string;
  }[];

  careInstructions: ProductCareDTO[];

  brand: {
    id: string;
    name: string;
    slug: string;
  };

  categories: {
    id: string;
    name: string;
    slug: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  rating: ProductRatingDTO;
}