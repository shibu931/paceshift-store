import { ProductRatingDTO } from "@/features/products/dto/product-rating.dto";
import { Star, StarHalf } from "lucide-react";

interface ProductRatingProps {
  rating: ProductRatingDTO;
}

export function ProductRating({ rating }: ProductRatingProps) {
  const { average, count } = rating;
  const roundedAverage = Math.round(average * 2) / 2;
  // No reviews yet
  if (count === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 text-neutral-300"
              strokeWidth={1.5}
            />
          ))}
        </div>

        <span className="text-sm text-neutral-500">No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        aria-label={`${average} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = roundedAverage >= star;
          const isHalf = roundedAverage >= star - 0.5 && roundedAverage < star;

          if (isHalf) {
            return (
              <StarHalf
                key={star}
                className="h-4 w-4 fill-yellow-500 text-yellow-500"
                strokeWidth={1.5}
              />
            );
          }

          return (
            <Star
              key={star}
              className={`h-4 w-4 ${
                isFull ? "fill-yellow-500 text-yellow-500" : "text-neutral-300"
              }`}
              strokeWidth={1.5}
            />
          );
        })}
      </div>

      <span className="text-sm font-medium">{average.toFixed(1)}</span>

      <span className="text-sm text-neutral-500">
        (
        <a
          href="#reviews"
          className="hover:text-[#ec0116] hover:underline"
        >
          {count} reviews
        </a>
        )
      </span>
    </div>
  );
}
