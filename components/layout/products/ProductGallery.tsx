"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductDetailDTO } from "@/features/products/dto/product-detail.dto";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

type ProductMedia = ProductDetailDTO["media"][number];

interface ProductGalleryProps {
  media: ProductMedia[];
}

export function ProductGallery({ media }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalImages = media.length;

  const activeMedia = media[activeIndex];

  /*
   * --------------------------------------------------
   * Navigation
   * --------------------------------------------------
   */

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? totalImages - 1 : current - 1,
    );
  }, [totalImages]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) =>
      current === totalImages - 1 ? 0 : current + 1,
    );
  }, [totalImages]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalImages) return;

      setActiveIndex(index);
    },
    [totalImages],
  );

  /*
   * --------------------------------------------------
   * Lightbox
   * --------------------------------------------------
   */

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  /*
   * Lock body scroll while lightbox is open
   */

  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen]);

  /*
   * --------------------------------------------------
   * Keyboard navigation
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          closeLightbox();
          break;

        case "ArrowLeft":
          goToPrevious();
          break;

        case "ArrowRight":
          goToNext();
          break;

        case "Home":
          goToIndex(0);
          break;

        case "End":
          goToIndex(totalImages - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isLightboxOpen,
    closeLightbox,
    goToPrevious,
    goToNext,
    goToIndex,
    totalImages,
  ]);

  /*
   * --------------------------------------------------
   * Mobile swipe
   * --------------------------------------------------
   */

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;

    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    /*
     * Ignore mostly vertical gestures.
     */
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    /*
     * Minimum swipe distance.
     */
    const SWIPE_THRESHOLD = 50;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  /*
   * --------------------------------------------------
   * Empty state
   * --------------------------------------------------
   */

  if (!media || media.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-neutral-100">
        <span className="text-sm text-neutral-500">
          No product images available
        </span>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * Render
   * --------------------------------------------------
   */

  return (
    <>
      <div className="w-full">
        <div className="flex sticky top-14 self-start flex-col gap-4 justify-center">
          {/* ==========================================
              MAIN IMAGE
          ========================================== */}

          <div
            className="relative min-w-0 flex-1"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-square rounded w-full overflow-hidden bg-transparent">
              {/* Main media */}
              <DottedGlowBackground
                className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-35 dark:opacity-100"
                opacity={1}
                gap={10}
                radius={1.6}
                colorLightVar="--color-neutral-500"
                glowColorLightVar="--color-neutral-600"
                colorDarkVar="--color-neutral-500"
                glowColorDarkVar="--color-sky-800"
                backgroundOpacity={0}
                speedMin={0.3}
                speedMax={1.6}
                speedScale={1}
              />
              <button
                type="button"
                onClick={openLightbox}
                aria-label="Open product gallery"
                className="group absolute inset-0 z-10 cursor-zoom-in"
              >
                {activeMedia.type === "video" ? (
                  <video
                    key={activeMedia.url}
                    src={activeMedia.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    key={activeMedia.url}
                    src={activeMedia.url}
                    alt={activeMedia.alt}
                    fill
                    priority={activeIndex === 0}
                    sizes="
                      (max-width: 767px) 100vw,
                      (max-width: 1023px) 70vw,
                      50vw
                    "
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}

                {/* Desktop zoom button */}

                <span
                  className="
                    absolute
                    right-4
                    top-4
                    hidden
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/20
                    text-black
                    opacity-0
                    shadow-sm
                    transition
                    group-hover:opacity-100
                    lg:flex
                  "
                >
                  <Maximize2 className="h-4 w-4" strokeWidth={1.7} />
                </span>
              </button>

              {/* ========================================
                  DESKTOP PREVIOUS
              ======================================== */}

              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                    className="
                      absolute
                      left-4
                      top-1/2
                      z-20
                      hidden
                      h-10
                      w-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      text-white
                      shadow-sm
                      transition
                      hover:bg-white/20
                      lg:flex
                    "
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>

                  {/* ========================================
                      DESKTOP NEXT
                  ======================================== */}

                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next image"
                    className="
                      absolute
                      right-4
                      top-1/2
                      z-20
                      hidden
                      h-10
                      w-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      text-white
                      shadow-sm
                      transition
                      hover:bg-white/20
                      lg:flex
                    "
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={2} />
                  </button>
                </>
              )}

              {/* ========================================
                  MOBILE IMAGE COUNTER
              ======================================== */}

              {totalImages > 1 && (
                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    z-20
                    rounded-full
                    bg-black/75
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    tracking-wide
                    text-white
                    lg:hidden
                  "
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(totalImages).padStart(2, "0")}
                </div>
              )}
            </div>

            {/* ==========================================
                MOBILE DOT INDICATOR
            ========================================== */}

            {totalImages > 1 && (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  lg:hidden
                "
              >
                {media.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className={`
                        block
                        h-1.5
                        rounded-full
                        transition-all
                        ${
                          index === activeIndex
                            ? "w-5 bg-black"
                            : "w-1.5 bg-neutral-300"
                        }
                      `}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* ==========================================
              DESKTOP THUMBNAILS
          ========================================== */}

          <div className="hidden h-20 shrink-0 flex-row gap-3 mx-auto lg:flex">
            {media.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => goToIndex(index)}
                  aria-label={`View ${item.alt || `product image ${index + 1}`}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`
                    relative aspect-square
                    overflow-hidden
                    border
                    bg-neutral-50/10
                    transition
                    hover:scale-105
                    rounded
                    ${
                      isActive
                        ? "border-neutral-300"
                        : "border-transparent hover:border-neutral-300"
                    }
                  `}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.url}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.alt}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================
          FULLSCREEN LIGHTBOX
      ================================================ */}

      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product image gallery"
          className="
            fixed
            inset-0
            z-200
            flex
            items-center
            justify-center
            bg-black/75
            backdrop-blur-sm
          "
        >
          {/* ============================================
              CLOSE
          ============================================ */}

          <button
            type="button"
            onClick={() => closeLightbox()}
            aria-label="Close gallery"
            className="
              absolute
              right-5
              top-5
              z-30
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/20
              hover:cursor-pointer
            "
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* ============================================
              COUNTER
          ============================================ */}

          <div
            className="
              absolute
              left-1/2
              top-6
              z-30
              -translate-x-1/2
              text-xs
              tracking-widest
              text-white/70
            "
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalImages).padStart(2, "0")}
          </div>

          {/* ============================================
              LIGHTBOX CONTENT
          ============================================ */}

          <div
            className="
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              px-14
              py-20
              md:px-24
            "
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeMedia.type === "video" ? (
              <video
                key={activeMedia.url}
                src={activeMedia.url}
                controls
                autoPlay
                playsInline
                className="
                  max-h-full
                  max-w-full
                  object-contain
                "
              />
            ) : (
              <Image
                key={activeMedia.url}
                src={activeMedia.url}
                alt={activeMedia.alt}
                fill
                sizes="100vw"
                className="
                  object-contain
                  p-6
                  md:p-12
                "
                priority
              />
            )}
          </div>

          {/* ============================================
              LIGHTBOX PREVIOUS
          ============================================ */}

          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous image"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/20
                  md:left-6
                "
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
              </button>

              {/* ==========================================
                  LIGHTBOX NEXT
              ========================================== */}

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next image"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/20
                  md:right-6
                "
              >
                <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* ============================================
              MOBILE SWIPE HINT / DOTS
          ============================================ */}

          {totalImages > 1 && (
            <div
              className="
                absolute
                bottom-6
                left-1/2
                z-30
                flex
                -translate-x-1/2
                items-center
                gap-1.5
              "
            >
              {media.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className="
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                  "
                >
                  <span
                    className={`
                      block
                      h-1.5
                      rounded-full
                      transition-all
                      ${
                        index === activeIndex
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/40"
                      }
                    `}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
