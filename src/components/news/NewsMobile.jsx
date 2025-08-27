import Image from "next/image";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import StaticHeader from "../common/StaticHeader";

export default function NewsMobile() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("news");
  const itemsPerPage = 6; // Fewer items per page on mobile

  // State for API data
  const [postsData, setPostsData] = useState([]);
  const [statementsData, setStatementsData] = useState([]);
  const [goodNewsData, setGoodNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data based on active category
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        switch (activeCategory) {
          case "news":
            // Regular news posts
            const posts = await apiService.posts.getPostsList({
              page: currentPage,
              pageSize: itemsPerPage,
            });
            setPostsData(posts.data || []);
            break;

          case "statements":
            // Statements/position papers
            const statements = await apiService.statements.getStatements({
              page: currentPage,
              pageSize: itemsPerPage,
            });
            setStatementsData(statements.data || []);
            break;

          case "good_news":
            // Good news/special posts - using posts API with category filter
            const goodNews = await apiService.posts.getPostsList({
              page: currentPage,
              pageSize: itemsPerPage,
              post_category: "good_news",
            });
            setGoodNewsData(goodNews.data || []);
            break;
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeCategory, currentPage]);

  // Determine current data based on active category
  let currentData = [];

  switch (activeCategory) {
    case "news":
      currentData = postsData;
      break;
    case "statements":
      currentData = statementsData;
      break;
    case "good_news":
      currentData = goodNewsData;
      break;
    default:
      currentData = [];
  }

  // Convert data to unified format
  const newsItems = currentData.map((item, index) => {
    let title, image, description;

    switch (activeCategory) {
      case "news":
      case "good_news":
        title =
          item.attributes?.short_description ||
          item.short_description ||
          item.attributes?.title ||
          item.title ||
          `ᠭᠠᠷᠴᠢᠭ ${index + 1}`;
        image =
          getImageUrl(item.attributes?.cover || item.cover) ||
          "/images/news1.png";
        description =
          item.attributes?.short_description || item.short_description || "";
        break;
      case "statements":
        // Handle both flattened (formatStrapiResponse) and nested (raw) formats
        title = item.title || item.attributes?.title || `ᠮᠡᠳᠡᠭᠳᠡᠯ ${index + 1}`;

        // For statements, the data is already flattened by formatStrapiResponse
        // So item.cover should be the cover data directly
        const coverData = item.cover || item.attributes?.cover;
        image = getImageUrl(coverData) || "/images/news1.png";
        description = item.description || item.attributes?.description || "";
        break;
      default:
        title = `ᠭᠠᠷᠴᠢᠭ ${index + 1}`;
        image = "/images/news1.png";
        description = "";
    }

    return {
      id: item.id,
      title,
      image,
      description,
      category: activeCategory,
    };
  });

  // Calculate pagination - for now we'll use the current page size
  // In a real implementation, you'd get total count from the API response
  const totalPages = Math.max(1, Math.ceil(currentData.length / itemsPerPage));

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
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleNewsClick = (newsId) => {
    if (activeCategory === "statements") {
      router.push(`/news/statement/${newsId}`);
    } else {
      router.push(`/news/${newsId}`);
    }
  };

  // Loading state
  if (isLoading && currentData.length === 0) {
    return (
      <div className="block sm:hidden h-full overflow-y-auto flex items-center justify-center min-h-screen">
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
    );
  }

  // Error state
  if (error) {
    return (
      <div className="block sm:hidden h-full overflow-y-auto flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p
            className="text-sm"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="block sm:hidden h-full overflow-y-auto overflow-x-hidden">
      <BannerSlider width="90rem" useDynamic={true} />
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
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
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
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
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
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ
          </button>
        </div>

        {/* News Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
              // Loading placeholders to maintain layout
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
              newsItems.slice(0, 6).map((item) => (
                <div key={item.id} className="flex gap-4 max-h-[150px]">
                  <h3
                    className="text-sm font-medium line-clamp-3 mb-2"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.title.length > 40
                      ? `${item.title.substring(0, 40)}...`
                      : item.title}
                  </h3>
                  <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/images/news1.png"; // fallback image
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
              // No data available - show message
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
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
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              text={<ChevronLeft />}
              type="chevron"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
            <p className="text-sm">
              {toMongolianNumeral(currentPage)}/{toMongolianNumeral(totalPages)}
            </p>
            <Button
              text={<ChevronRight />}
              type="chevron"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
