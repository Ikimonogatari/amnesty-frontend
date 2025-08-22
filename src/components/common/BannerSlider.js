import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function BannerSlider({
  images,
  width = "100%",
  useDynamic = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredNewsData, setFeaturedNewsData] = useState([]);
  const [featuredNewsLoading, setFeaturedNewsLoading] = useState(false);
  const [featuredNewsError, setFeaturedNewsError] = useState(null);
  const timeoutRef = useRef(null);

  // Fetch featured news posts for homepage slider (like old web)
  useEffect(() => {
    if (useDynamic) {
      const fetchFeaturedNews = async () => {
        setFeaturedNewsLoading(true);
        setFeaturedNewsError(null);

        try {
          // Fetch regular news posts for homepage slider
          const response = await apiService.posts.getPostsList({
            page: 1,
            pageSize: 6, // Limit to 6 posts for homepage
            sort: "publishedAt:desc",
          });

          // Handle the response structure - getPostsList returns { data: [...], meta: {...} }
          const newsData = response?.data || [];

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
        // getPostsList returns flattened data, no .attributes needed
        const post = newsPost;

        // Get cover image URL - handle the cover structure from getPostsList
        let coverImageUrl = null;
        if (post.cover) {
          // Cover might be a string URL or an object
          if (typeof post.cover === "string") {
            coverImageUrl = post.cover;
          } else if (post.cover.url) {
            coverImageUrl = post.cover.url;
          } else if (post.cover.formats) {
            // Try different formats in order of preference
            coverImageUrl =
              post.cover.formats.large?.url ||
              post.cover.formats.medium?.url ||
              post.cover.formats.small?.url ||
              post.cover.formats.thumbnail?.url ||
              post.cover.url;
          }
        }

        return {
          id: post.id,
          src: coverImageUrl
            ? `${process.env.NEXT_PUBLIC_MEDIA_URL || 'http://152.42.244.47:1337'}${coverImageUrl}`
            : "/images/news1.png",
          alt: post.title || `News ${post.id}`,
          caption: {
            title: post.title || "ᠮᠡᠳᠡᢉᠡ",
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
    return (
      <div className="p-4">
        <div
          className="relative overflow-hidden h-full flex items-center justify-center bg-gray-100"
          style={{ width: width }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
            <p
              className="mt-4 text-gray-600 text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state for dynamic content
  if (useDynamic && featuredNewsError) {
    // Fall back to static images if provided
    if (!images || images.length === 0) {
      return (
        <div className="p-4">
          <div
            className="relative overflow-hidden h-full flex items-center justify-center bg-gray-100"
            style={{ width: width }}
          >
            <p
              className="text-red-600 text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
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
      <div className="p-4">
        <div
          className="relative overflow-hidden h-full flex items-center justify-center bg-gray-100"
          style={{ width: width }}
        >
          <p
            className="text-gray-500 text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠵᠢᠷᠤᠭ ᠦᠭᠡᠢ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="relative overflow-hidden h-full" style={{ width: width }}>
        {/* Banner Images */}
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "100%",
          }}
        >
          {displayImages.map((image, index) => (
            <div
              key={image.id || index}
              className="h-full relative flex-shrink-0"
              style={{ width: "100%" }}
            >
              <Image
                src={image.src}
                alt={image.alt || `Banner image ${index + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="md:rounded-xl"
                priority={index === 0}
                onError={(e) => {
                  e.target.src = "/images/news1.png"; // fallback image
                }}
              />
              {image.caption && (
                <div className="hidden md:flex absolute h-full top-0 left-0 bg-black/50 backdrop-blur-lg text-white max-w-xs rounded-xl gap-8 p-16">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                  >
                    {image.caption.title}
                  </h3>
                  <p
                    className="text-gray-200"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "upright",
                    }}
                  >
                    {image.caption.description}
                  </p>
                  {image.link ? (
                    <a href={image.link}>
                      <Button
                        text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                        type="primary"
                        className="text-black h-40"
                      />
                    </a>
                  ) : (
                    <Button
                      text={"ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ"}
                      type="primary"
                      className="text-black h-40"
                    />
                  )}
                </div>
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
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
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
