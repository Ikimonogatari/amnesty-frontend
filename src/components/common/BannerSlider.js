import Button from "@/components/common/Button";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import FullScreenLoader from "./FullScreenLoader";

export default function BannerSlider({
  images,
  width = "100%",
  useDynamic = false,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredNewsData, setFeaturedNewsData] = useState([]);
  const [featuredNewsLoading, setFeaturedNewsLoading] = useState(false);
  const [featuredNewsError, setFeaturedNewsError] = useState(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch featured news posts for homepage slider (like old web)
  useEffect(() => {
    if (useDynamic) {
      const fetchFeaturedNews = async () => {
        setFeaturedNewsLoading(true);
        setFeaturedNewsError(null);

        try {
          // For consistency between environments, always use latest posts
          // This ensures production and local show the same number of items
          const response = await apiService.posts.getPostsList({
            pageSize: 2, // Use same format as homepage news section
            sort: "publishedAt:desc",
          });

          // Handle the response structure - getPostsList returns { data: [...], meta: {...} }
          const newsData = response?.data || [];

          // Debug logging to check image URLs
          if (newsData.length > 0) {
            console.log(
              "Banner Debug - First post cover data:",
              newsData[0]?.cover
            );
            console.log(
              "Banner Debug - Image URL:",
              getImageUrl(newsData[0]?.cover)
            );
          }

          setFeaturedNewsData(newsData);
        } catch (error) {
          setFeaturedNewsError(error);
        } finally {
          setFeaturedNewsLoading(false);
        }
      };

      fetchFeaturedNews();
    }
  }, [useDynamic]);

  // Convert featured news data to banner format (like old web)
  const dynamicImages = featuredNewsData
    ? featuredNewsData.map((newsPost) => {
      // Now always using posts data (flattened format) for consistency
      const post = newsPost;

      return {
        id: post.id,
        src: getImageUrl(post.cover) || "/mng/images/news1.png",
        alt: post.title || `News ${post.id}`,
        caption: {
          title: post.short_description || post.title || "ᠮᠡᠳᠡᢉᠡ",
          description: post.short_description || post.description || "",
        },
        // Add link to news detail page (like old web)
        link: `/news/${post.id}`,
      };
    })
    : [];

  // Use dynamic images if available and useDynamic is true, otherwise use static images
  const displayImages =
    useDynamic && dynamicImages.length > 0 ? dynamicImages : images;

  const nextSlide = useCallback(() => {
    if (displayImages && displayImages.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [displayImages]);

  const prevSlide = useCallback(() => {
    if (displayImages && displayImages.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
      );
    }
  }, [displayImages]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying && displayImages && displayImages.length > 1) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, displayImages, nextSlide]);

  // Show loading state for dynamic content
  if (useDynamic && featuredNewsLoading) {
    return <FullScreenLoader />;
  }

  // Show error state for dynamic content
  if (useDynamic && featuredNewsError) {
    // Fall back to static images if provided
    if (!images || images.length === 0) {
      return (
        <div className={`sm:p-4 ${className}`}>
          <div
            className="relative overflow-hidden h-full flex items-center justify-center bg-gray-100"
            style={{ width: width }}
          >
            <p
              className="text-red-600 text-sm"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </p>
          </div>
        </div>
      );
    }
  }

  // If no images to display, show placeholder
  if (!displayImages || displayImages.length === 0) {
    return (
      <div className={`sm:p-4 ${className}`}>
        <div
          className="relative overflow-hidden h-full flex items-center justify-center bg-gray-100"
          style={{ width: width }}
        >
          <p
            className="text-gray-500 text-sm"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠵᠢᠷᠤᠭ ᠦᠭᠡᠢ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`sm:p-4 ${className}`}>
      <div
        className="relative overflow-hidden h-full"
        style={{ width: width }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Images */}
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {displayImages.map((image, index) => (
            <div
              key={image.id || index}
              className="h-full relative flex-shrink-0"
              style={{ width: "100%" }}
            >
              {/* Use background-image approach like old web for better compatibility */}
              {/* For CSS backgroundImage, we need to manually add basePath since Next.js doesn't auto-apply it */}
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat md:rounded-xl"
                style={{
                  backgroundImage: image.src
                    ? image.src.startsWith('http') || image.src.startsWith('/mng')
                      ? `url(${image.src})`
                      : `url(/mng${image.src.startsWith('/') ? '' : '/'}${image.src})`
                    : `url(/mng/images/news1.png)`,
                }}
              />
              {/* Fallback image element to handle loading errors */}
              <div className="hidden relative w-0 h-0">
                <Image
                  src={image.src || "/mng/images/news1.png"}
                  alt=""
                  fill
                  onError={(e) => {
                    // If image fails to load, update the parent div's background
                    const parentDiv = e.target.closest('.relative')?.parentElement;
                    if (parentDiv) {
                      parentDiv.style.backgroundImage = `url(${"/mng/images/news1.png"})`;
                    }
                  }}
                />
              </div>
              {image.caption && (
                <>
                  {/* Desktop Caption */}
                  <div 
                    className="hidden md:flex absolute h-full top-0 left-0 bg-black/50 backdrop-blur-lg text-white rounded-xl p-10 max-w-min overflow-hidden"
                    style={{
                      transform: "translateZ(0)",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      WebkitBackdropFilter: "blur(16px)", // safari specific
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-3 mr-8 max-w-min"
                      style={{
                        writingMode: "vertical-rl",
                      }}
                    >
                      {image.caption.title}
                    </h3>
                    <p
                      className="text-gray-200 mr-8"
                      style={{
                        writingMode: "vertical-rl",
                      }}
                    >
                      {image.caption.description}
                    </p>
                    {image.link ? (
                      <Link href={image.link}>
                        <Button
                          text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                          type="primary"
                          className="text-black h-40"
                        />
                      </Link>
                    ) : (
                      <Button
                        text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                        type="primary"
                        className="text-black h-40"
                      />
                    )}
                  </div>

                  {/* Mobile Caption - Same layout as desktop but sized for mobile */}
                  <div 
                    className="md:hidden absolute h-full top-0 left-0 bg-black/50 backdrop-blur-lg text-white gap-0 p-4 pr-6 flex w-max max-w-[90%] overflow-hidden"
                    style={{
                      transform: "translateZ(0)",
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      WebkitBackdropFilter: "blur(16px)", // safari specific
                    }}
                  >
                    <h3
                      className="text-base font-bold mb-2 mr-3"
                      style={{
                        writingMode: "vertical-rl",
                      }}
                    >
                      {image.caption.title}
                    </h3>
                    <p
                      className="text-xs text-gray-200 mr-3"
                      style={{
                        writingMode: "vertical-rl",
                      }}
                    >
                      {image.caption.description}
                    </p>
                    {image.link ? (
                      <Link href={image.link} className="flex-shrink-0">
                        <Button
                          text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                          type="primary"
                          className="text-black h-32 text-xs"
                        />
                      </Link>
                    ) : (
                      <Button
                        text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                        type="primary"
                        className="text-black h-32 text-xs"
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {displayImages.length > 1 && (
          <div className="absolute right-5 bottom-5 md:right-10 md:bottom-10 flex justify-center gap-2 md:gap-3 z-10">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
