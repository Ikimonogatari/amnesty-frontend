import Image from "next/image";
import Button from "@/components/common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useGetPostsQuery } from "@/redux/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import StaticHeader from "../common/StaticHeader";
import FullScreenLoader from "../common/FullScreenLoader";


export default function NewsMobile() {
  const router = useRouter();
  const { type } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(type || "news");
  const itemsPerPage = 6; // Fewer items per page on mobile

  // Update active category when URL parameter changes
  useEffect(() => {
    setActiveCategory(type || "news");
    setCurrentPage(1); // Reset to first page when category changes
  }, [type]);

  // Build RTK Query parameters based on active category (SAME AS DESKTOP)
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

  // Use RTK Query hook (SAME AS DESKTOP)
  const {
    data: postsData,
    error,
    isLoading,
    isFetching,
  } = useGetPostsQuery(queryParams, {
    skip: !router.isReady, // Skip query until router is ready
  });

  // Process the RTK Query data (SAME AS DESKTOP)
  const newsItems = useMemo(() => {
    if (!postsData?.data) return [];

    return postsData.data.map((item) => ({
      id: item.id,
      title: item.title,
      short_description: item.short_description,
      image:
        item.cover?.formats?.medium?.url ||
        item.cover?.formats?.large?.url ||
        "/mng/images/news1.png",
      publishedAt: item.publishedAt,
      post_categories: item.post_categories || [],
    }));
  }, [postsData]);

  const totalPages = useMemo(() => {
    if (!postsData?.meta?.pagination?.pageCount) return 1;
    return postsData.meta.pagination.pageCount;
  }, [postsData]);

  console.log(
    `📱 Mobile RTK Query - currentPage: ${currentPage}, totalPages: ${totalPages}, items: ${newsItems.length}`
  );

  // Convert Arabic numerals to Mongolian Bichig numerals
  const toMongolianNumeral = (num) => {
    const mongolianDigits = ["᠐", "᠑", "᠒", "᠓", "᠔", "᠕", "᠖", "᠗", "᠘", "᠙"];
    return num
      .toString()
      .split("")
      .map((digit) => mongolianDigits[parseInt(digit)])
      .join("");
  };

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

  // Get static header image and title based on active category
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

  // Loading state
  if (isLoading && newsItems.length === 0) {
    return <FullScreenLoader />;
  }

  // Error state
  if (error) {
    return (
      <div className="block sm:hidden h-full overflow-y-auto flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-sm" style={{ writingMode: "vertical-lr" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block sm:hidden h-full overflow-y-auto overflow-x-hidden">
      <StaticHeader
        image={headerData.image}
        alt="News Page Header"
        width="100%"
        title={headerData.title}
      />
      <div className="p-4 flex gap-5">
        {/* Category Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleCategoryChange("news")}
            className={`px-4 py-2 text-xs font-bold rounded transition-colors cursor-pointer ${
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
            className={`px-4 py-2 text-xs font-bold rounded transition-colors cursor-pointer ${
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
            className={`px-4 py-2 text-xs font-bold rounded transition-colors cursor-pointer ${
              activeCategory === "good_news"
                ? "text-white bg-[#2D2D2D] border border-[#2D2D2D]"
                : "text-black bg-white border border-[#E3E3E3] hover:bg-gray-50"
            }`}
            style={{ writingMode: "vertical-lr" }}
          >
            ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ
          </button>
        </div>

        {/* News Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            {isLoading || isFetching ? (
              // Loading placeholders
              Array.from({ length: 6 }).map((_, index) => (
                <div key={`loading-${index}`} className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 animate-pulse rounded"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))
            ) : newsItems.length > 0 ? (
              newsItems.map((item) => (
                <div key={item.id} className="flex gap-4 max-h-[150px]">
                  <h3
                    className="text-sm font-medium line-clamp-3 mb-2"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {item.title?.length > 40
                      ? `${item.title.substring(0, 40)}...`
                      : item.title || "ᠮᠡᠳᠡᢉᠡ"}
                  </h3>
                  <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title || "News image"}
                      fill
                      className="object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/mng/images/news1.png"; // fallback image
                        }}
                    />
                    <Button
                      text={
                        activeCategory === "statements" ? "ᠮᠡᠳᠡᠭᠳᠡᠯ" : "ᠮᠡᠳᠡᢉᠡ"
                      }
                      type="primary"
                      className="absolute -top-1 -right-1 text-black text-xs px-1 py-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleNewsClick(item.id)}
                    />
                  </div>

                  <Button
                    text={"ᠤᠩᠰᠢᠬᠤ"}
                    type="secondary"
                    className="text-black text-xs px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleNewsClick(item.id)}
                  />
                </div>
              ))
            ) : (
              // No data available
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {activeCategory === "good_news"
                      ? "ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"
                      : activeCategory === "statements"
                      ? "ᠮᠡᠳᠡᠭᠳᠡᠯ ᠦᠭᠡᠢ"
                      : "ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                text={<ChevronLeft />}
                type="chevron"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isLoading || isFetching}
              />
              <div className="text-sm flex flex-row items-center justify-center gap-0">
                <span>{toMongolianNumeral(currentPage)}</span>
                <span className="text-xs">/</span>
                <span>{toMongolianNumeral(totalPages)}</span>
              </div>
              <Button
                text={<ChevronRight />}
                type="chevron"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoading || isFetching}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
