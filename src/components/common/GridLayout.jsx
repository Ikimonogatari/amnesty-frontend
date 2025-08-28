import Image from "next/image";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toMongolianNumbers } from "@/utils/fetcher";

/**
 * Reusable Grid Layout Component matching News page layout exactly
 * @param {Array} items - Array of items to display
 * @param {boolean} isLoading - Loading state
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total pages
 * @param {function} onPageChange - Page change handler
 * @param {string} basePath - Base path for navigation (e.g., "/lessons")
 * @param {string} categoryButtonText - Text for the category button
 * @param {string} emptyStateText - Text to show when no items
 * @param {function} getImageUrl - Function to extract image URL from item
 * @param {function} getTitle - Function to extract title from item
 */
export default function GridLayout({
  items = [],
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  basePath = "",
  categoryButtonText = "ᠤᠩᠰᠢᠬᠤ",
  emptyStateText = "ᠮᠡᠳᠡᢉᠡ ᠦᠭᠡᠢ",
  getImageUrl,
  getTitle,
  itemType = "item", // for different styling (e.g., "video" for play button)
}) {
  const router = useRouter();

  const handleItemClick = (item) => {
    router.push(`${basePath}/${item.id}`);
  };

  return (
    <>
      {/* Desktop Layout - EXACT NEWS STRUCTURE */}
      <div className="hidden sm:block h-full">
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
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-full h-full flex items-end space-x-4 gap-2"
                >
                  {/* Title - Fixed width with proper line clamping */}
                  <h3
                    className="min-w-16 line-clamp-3 h-full text-sm cursor-pointer hover:text-blue-600 transition-colors"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    title={getTitle ? getTitle(item) : item.title}
                    onClick={() => handleItemClick(item)}
                  >
                    {(() => {
                      const title = getTitle ? getTitle(item) : item.title;
                      return title && title.length > 50
                        ? `${title.substring(0, 50)}...`
                        : title;
                    })()}
                  </h3>

                  {/* Main Image with proper aspect ratio */}
                  <div className="relative w-full h-full max-h-[400px]">
                    <Image
                      src={
                        getImageUrl ? getImageUrl(item) : "/images/news1.png"
                      }
                      alt={
                        getTitle ? getTitle(item) : item.title || "Item image"
                      }
                      height={400}
                      width={400}
                      className="object-cover shadow-md rounded-xl aspect-square w-[400px] h-[400px]"
                      onError={(e) => {
                        e.target.src = "/images/news1.png"; // fallback image
                      }}
                    />

                    {/* Video Play Button Overlay */}
                    {itemType === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                        <div className="bg-white bg-opacity-80 rounded-full p-3 hover:bg-opacity-100 transition-all">
                          <svg
                            className="w-8 h-8 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8 5v10l7-5z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Category Button on Image */}
                    <Button
                      text={categoryButtonText}
                      type="primary"
                      className="absolute top-0 right-0 text-black cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleItemClick(item)}
                    />
                  </div>

                  {/* Right Action Button */}
                  <Button
                    text={"ᠤᠩᠰᠢᠬᠤ"}
                    type="secondary"
                    className="text-black h-48 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                    onClick={() => handleItemClick(item)}
                  />
                </div>
              ))
            ) : (
              // No data available
              <div className="col-span-full flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <p
                    className="text-gray-500 text-lg"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {emptyStateText}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Pagination - EXACT NEWS STYLE */}
          <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2 flex-shrink-0">
            <Button
              text={<ChevronUp />}
              type="chevron"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            />
            <p className="text-sm">
              {toMongolianNumbers(currentPage)}/{toMongolianNumbers(totalPages)}
            </p>
            <Button
              text={<ChevronDown />}
              type="chevron"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            // Loading placeholders to maintain layout
            Array.from({ length: 6 }).map((_, index) => (
              <div key={`loading-${index}`} className="flex gap-4">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 animate-pulse rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id || index}
                className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={getImageUrl ? getImageUrl(item) : "/images/news1.png"}
                    alt={getTitle ? getTitle(item) : item.title || "Item image"}
                    fill
                    className="object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/images/news1.png";
                    }}
                  />

                  {/* Mobile Video Play Button */}
                  {itemType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
                      <div className="bg-white bg-opacity-80 rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 5v10l7-5z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="text-sm font-medium line-clamp-2 mb-2"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {getTitle ? getTitle(item) : item.title}
                  </h3>

                  {/* Additional mobile metadata can be added here based on item type */}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p
                className="text-gray-500 text-center"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {emptyStateText}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Pagination - EXACT NEWS STYLE */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            text={<ChevronLeft />}
            type="chevron"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          />
          <p className="text-sm">
            {toMongolianNumbers(currentPage)}/{toMongolianNumbers(totalPages)}
          </p>
          <Button
            text={<ChevronRight />}
            type="chevron"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          />
        </div>
      </div>
    </>
  );
}
