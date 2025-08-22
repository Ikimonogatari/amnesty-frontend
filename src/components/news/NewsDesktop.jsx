import Image from "next/image";
import Button from "@/components/common/Button";
import BannerSlider from "@/components/common/BannerSlider";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function NewsDesktop() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("news");
  const itemsPerPage = 9;

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
        title = item.attributes?.title || item.title || `ᠭᠠᠷᠴᠢᠭ ${index + 1}`;
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
      <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p
            className="mt-4 text-gray-600"
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
      <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0 items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
          <p className="mt-2 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0">
      <BannerSlider width="90rem" useDynamic={true} />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          <div className="h-full flex flex-col items-center gap-4">
            <button
              onClick={() => handleCategoryChange("news")}
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
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
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
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
              className={`w-full h-full flex justify-center items-center text-center text-2xl font-bold rounded-xl p-8 transition-colors cursor-pointer ${
                activeCategory === "good_news"
                  ? "text-white bg-[#2D2D2D] border border-[#2D2D2D]"
                  : "text-black bg-white border border-[#E3E3E3] hover:bg-gray-50"
              }`}
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠣᠨᠴᠤᠯᠠᠬᠤ ᠮᠡᠳᠡᢉᠡ
            </button>
          </div>
          <div className="h-full flex gap-4">
            <div className="grid grid-cols-3 grid-rows-3 grid-flow-col gap-4">
              {isLoading ? (
                // Loading placeholders to maintain layout
                Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={`loading-${index}`}
                    className="w-full h-full flex items-end space-x-4"
                  >
                    <div className="max-w-16 h-full bg-gray-200 animate-pulse rounded"></div>
                    <div className="relative h-[300px] w-[300px] aspect-square shadow-md bg-gray-200 animate-pulse rounded-xl"></div>
                    <div className="w-12 h-48 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ))
              ) : newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-full h-full flex items-end space-x-4"
                  >
                    <h3
                      className="max-w-16 line-clamp-3 h-full text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                      title={item.title}
                    >
                      {item.title.length > 50
                        ? `${item.title.substring(0, 50)}...`
                        : item.title}
                    </h3>
                    <div className="relative h-[300px] w-[300px] aspect-square shadow-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-xl w-full h-full"
                        onError={(e) => {
                          e.target.src = "/images/news1.png"; // fallback image
                        }}
                      />
                      <Button
                        text={
                          activeCategory === "statements"
                            ? "ᠮᠡᠳᠡᠭᠳᠡᠯ"
                            : "ᠮᠡᠳᠡᢉᠡ"
                        }
                        type="primary"
                        className="absolute top-0 right-0 text-black cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleNewsClick(item.id)}
                      />
                    </div>
                    <Button
                      text={"ᠤᠩᠰᠢᠬᠤ"}
                      type="secondary"
                      className="text-black h-48 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleNewsClick(item.id)}
                    />
                  </div>
                ))
              ) : (
                // No data available - show message instead of empty placeholders
                <div className="col-span-full flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <p
                      className="text-gray-500 text-lg"
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
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2">
              <Button
                text={isMobile ? <ChevronLeft /> : <ChevronUp />}
                type="chevron"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              <p className="text-sm">
                {toMongolianNumeral(currentPage)}/
                {toMongolianNumeral(totalPages)}
              </p>
              <Button
                text={isMobile ? <ChevronRight /> : <ChevronDown />}
                type="chevron"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
