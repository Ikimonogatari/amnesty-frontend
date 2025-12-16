import Image from "next/image";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import GridLayout from "@/components/common/GridLayout";
import RelatedItems from "@/components/common/RelatedItems";
import StaticHeader from "@/components/common/StaticHeader";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useGetPostsQuery } from "@/redux/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function NewsDesktop() {
  const router = useRouter();
  const { type } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(type || "news");
  const itemsPerPage = 9;

  // Update active category when URL parameter changes
  useEffect(() => {
    setActiveCategory(type || "news");
    setCurrentPage(1); // Reset to first page when category changes
  }, [type]);

  // Build RTK Query parameters based on active category
  const queryParams = useMemo(() => {
    const params = {
      "pagination[pageSize]": itemsPerPage,
      "pagination[page]": currentPage,
    };

    // Add category filter if not showing all news
    if (activeCategory === "statements") {
      params.post_category = "statements";
    } else if (activeCategory === "good_news") {
      params.post_category = "good_news";
    }
    // For "news", show all posts without category filter

    return params;
  }, [currentPage, itemsPerPage, activeCategory]);

  // Use RTK Query hook
  const {
    data: postsData,
    error,
    isLoading,
    isFetching,
  } = useGetPostsQuery(queryParams, {
    skip: !router.isReady, // Skip query until router is ready
  });

  // Related items query - fetch all news items for related content
  const relatedQueryParams = useMemo(
    () => ({
      "pagination[pageSize]": 10, // Fetch more items for related content
      sort: "publishedAt:desc",
      populate: "*",
    }),
    []
  );

  const { data: relatedPostsData } = useGetPostsQuery(relatedQueryParams, {
    skip: !router.isReady,
  });

  // Process the RTK Query data
  const newsItems = useMemo(() => {
    if (!postsData?.data) return [];

    return postsData.data.map((item) => ({
      id: item.id,
      title: item.title,
      short_description: item.short_description,
      image:
        item.cover?.formats?.medium?.url ||
        item.cover?.formats?.large?.url ||
        "",
      publishedAt: item.publishedAt,
      post_categories: item.post_categories || [],
    }));
  }, [postsData]);

  const totalPages = useMemo(() => {
    if (!postsData?.meta?.pagination?.pageCount) return 1;
    return postsData.meta.pagination.pageCount;
  }, [postsData]);

  // Process related items - filter out current items
  const relatedItems = useMemo(() => {
    if (!relatedPostsData?.data || !newsItems.length) return [];

    const currentIds = new Set(newsItems.map((item) => item.id));
    return relatedPostsData.data
      .filter((item) => !currentIds.has(item.id))
      .slice(0, 6) // Show max 6 related items
      .map((item) => ({
        id: item.id,
        title: item.title,
        short_description: item.short_description,
        image:
          item.cover?.formats?.medium?.url ||
          item.cover?.formats?.large?.url ||
          "",
        publishedAt: item.publishedAt,
        post_categories: item.post_categories || [],
      }));
  }, [relatedPostsData, newsItems]);

  // Convert Arabic numerals to Mongolian Bichig numerals
  const toMongolianNumeral = (num) => {
    const mongolianDigits = ["᠐", "᠑", "᠒", "᠓", "᠔", "᠕", "᠖", "᠗", "᠘", "᠙"];
    return num
      .toString()
      .split("")
      .map((digit) => mongolianDigits[parseInt(digit)])
      .join("");
  };

  // Check if mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);

    // Update URL to reflect category change
    const url = category === "news" ? "/news" : `/news?type=${category}`;
    router.push(url, undefined, { shallow: true });
  };

  const handleNewsClick = (newsId) => {
    if (activeCategory === "statements") {
      router.push(`/news/statement/${newsId}`);
    } else {
      router.push(`/news/${newsId}`);
    }
  };

  // Get static header image and title based on active category (matching old web exactly)
  const getHeaderData = () => {
    switch (activeCategory) {
      case "statements":
        return {
          image: "/mng/images/news/header-img-statements.jpg",
          title: "ᠮᠡᠳᠡᠭᠳᠡᠯ ᠪᠠᠢᠷ ᠰᠤᠤᠷᠢ",
        };
      case "good_news":
        return {
          image: "/mng/images/news/header-img-good-news.jpg",
          title: "ᠣᠨᠴᠠᠯᠠᠬᠤ ᠮᠡᠳᠡᠭᠡ",
        };
      default:
        return {
          image: "/mng/images/news/image-news-header.jpg",
          title: "ᠮᠡᠳᠡᠭᠡ",
        };
    }
  };

  const headerData = getHeaderData();

  return (
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0">
      <StaticHeader
        image={headerData.image}
        alt="News Page Header"
        width="90rem"
        title={headerData.title}
      />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          {/* Category Navigation Buttons */}
          <div className="h-full flex flex-col items-center gap-4">
            <button
              onClick={() => handleCategoryChange("news")}
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
                activeCategory === "news"
                  ? "text-white bg-[#2D2D2D] border border-[#2D2D2D]"
                  : "text-black bg-white border border-[#E3E3E3] hover:bg-gray-50"
              }`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠡᠳᠡᢉᠡ
            </button>
            <button
              onClick={() => handleCategoryChange("statements")}
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
                activeCategory === "statements"
                  ? "text-white bg-[#2D2D2D] border border-[#2D2D2D]"
                  : "text-black bg-white border border-[#E3E3E3] hover:bg-gray-50"
              }`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠮᠡᠳᠡᠭᠳᠡᠯ ᠪᠠᠶᠢᠷ ᠰᠤᠤᠷᠢ
            </button>
            <button
              onClick={() => handleCategoryChange("good_news")}
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
                activeCategory === "good_news"
                  ? "text-white bg-[#2D2D2D] border border-[#2D2D2D]"
                  : "text-black bg-white border border-[#E3E3E3] hover:bg-gray-50"
              }`}
              style={{ writingMode: "vertical-lr" }}
            >
              ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ
            </button>
          </div>

          {/* Main Content Area with GridLayout */}
          <div className="flex-1">
            {/* Error State */}
            {error && (
              <div className="p-8 text-center">
                <p
                  className="text-red-600 mb-4"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠠᠯᠳᠠᠭᠠ:{" "}
                  {error?.message || error?.data?.message || "Unknown error"}
                </p>
              </div>
            )}

            {!error && (
              <GridLayout
                items={newsItems}
                basePath="/news"
                categoryButtonText={
                  activeCategory === "statements"
                    ? "ᠮᠡᠳᠡᠭᠳᠡᠯ"
                    : activeCategory === "good_news"
                    ? "ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ"
                    : "ᠮᠡᠳᠡᢉᠡ"
                }
                getImageUrl={(item) => item.image}
                getTitle={(item) => item.title}
                itemType="news"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isLoading={isLoading || isFetching}
                emptyStateText={
                  activeCategory === "good_news"
                    ? "ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
                    : activeCategory === "statements"
                    ? "ᠮᠡᠳᠡᠭᠳᠡᠯ ᠦᠭᠡᠢ"
                    : "ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
                }
              />
            )}
          </div>

          {/* Related News Section */}
          {relatedItems && relatedItems.length > 0 && (
            <RelatedItems
              items={relatedItems}
              sectionTitle="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠮᠡᠳᠡᠭᠡ"
              primaryButtonText="ᠤᠩᠰᠢᠬᠤ"
              itemType="news"
              maxItems={6}
            />
          )}
        </div>
      </div>
    </div>
  );
}
