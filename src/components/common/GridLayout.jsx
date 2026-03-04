import Button from "@/components/common/Button";
import { toMongolianNumbers } from "@/utils/fetcher";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

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
 * @param {function} renderAdditionalContent - Optional function to render additional content below image
 * @param {boolean} hideCategoryButton - Whether to hide the category/read button
 * @param {number} columns - Number of columns in desktop grid (default: 3)
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
  renderAdditionalContent, // Optional function to render additional content
  hideCategoryButton = false, // Hide the category/read button
  columns = 3, // Number of columns in desktop grid
}) {
  const router = useRouter();

  // Debug logging
  console.log("🔧 GridLayout props:", {
    itemsLength: items?.length || 0,
    isLoading,
    currentPage,
    totalPages,
    basePath,
    itemType,
    hasAdditionalContent: !!renderAdditionalContent,
    hideCategoryButton,
  });

  if (items?.length > 0) {
    console.log("📋 First item structure:", items[0]);
  }

  const handleItemClick = (item) => {
    // Handle merchandise items differently - open their shop link
    if (itemType === "merchandise") {
      if (item.shop_link) {
        window.open(item.shop_link, "_blank", "noopener,noreferrer");
      }
      return;
    }
    router.push(`${basePath}/${item.id}`);
  };

  return (
    <>
      {/* Desktop Layout - EXACT NEWS STRUCTURE */}
      <div className="hidden sm:block h-full">
        <div className="h-full flex gap-4 overflow-hidden">
          <div
            className={`grid grid-flow-col gap-4 sm:gap-6 min-w-0 ${columns === 2
              ? "grid-cols-2 grid-rows-2"
              : "grid-cols-3 grid-rows-3"
              }`}
          >
            {isLoading || !items ? (
              // Loading placeholders to maintain layout - consistent between server and client
              Array.from({ length: columns * columns }).map((_, index) => (
                <div
                  key={`loading-desktop-${index}`}
                  className="w-full h-full flex items-end space-x-4"
                  suppressHydrationWarning={false}
                >
                  <div className="w-11 max-w-11 h-full bg-gray-200 animate-pulse rounded"></div>
                  <div className="relative h-[300px] w-[300px] aspect-square shadow-md bg-gray-200 animate-pulse rounded-xl"></div>
                  <div className="w-12 h-48 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ))
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-full h-full flex items-end gap-4"
                >
                  {/* Title - Fixed width with proper line clamping */}
                  <h3
                    className="w-11 max-w-11 h-full text-xs transition-colors cursor-pointer hover:text-blue-600 overflow-hidden text-center"
                    style={{
                      writingMode: "vertical-lr",
                      // wordBreak: "break-all",
                      // overflowWrap: "break-word",
                    }}
                    title={getTitle ? getTitle(item) : item.title}
                    onClick={() => handleItemClick(item)}
                  >
                    {(() => {
                      const title = getTitle ? getTitle(item) : item.title;
                      return title && title.length > 40
                        ? `${title.substring(0, 40)}...`
                        : title;
                    })()}
                  </h3>

                  {/* Main Image with proper aspect ratio */}
                  <div
                    className="relative cursor-pointer m-auto"
                    onClick={() => handleItemClick(item)}
                  >
                    <Image
                      src={
                        getImageUrl
                          ? getImageUrl(item)
                          : "/mng/images/news1.png"
                      }
                      alt={
                        getTitle ? getTitle(item) : item.title || "Item image"
                      }
                      className="object-cover shadow-md rounded-xl aspect-square hover:opacity-80 transition-opacity h-1/3"
                      width={200}
                      height={200}
                      onError={(e) => {
                        e.target.src = "/mng/images/news1.png"; // fallback image
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

                    {/* Category Button on Image - conditionally rendered */}
                    {!hideCategoryButton && (
                      <Button
                        text={categoryButtonText}
                        type="primary"
                        className="absolute top-0 right-0 text-black transition-opacity cursor-pointer hover:opacity-80"
                        onClick={() => handleItemClick(item)}
                      />
                    )}
                  </div>
                  <div
                    className={`flex flex-col h-full ${renderAdditionalContent
                      ? "justify-between"
                      : "justify-end"
                      }`}
                  >
                    {/* Additional Content (e.g., podcast links) */}
                    {renderAdditionalContent && renderAdditionalContent(item)}

                    {/* Right Action Button - conditionally rendered */}
                  </div>
                </div>
              ))
            ) : (
              // No data available
              <div className="col-span-full flex items-center justify-center">
                <div className="text-center">
                  <p
                    className="text-gray-500 text-lg"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    {emptyStateText}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Pagination - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2 flex-shrink-0">
              <Button
                text={<ChevronUp />}
                type="chevron"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              />
              <div className="text-sm flex flex-row sm:flex-col items-center justify-center gap-0">
                <span>{toMongolianNumbers(currentPage)}</span>
                <span className="text-xs">/</span>
                <span>{toMongolianNumbers(totalPages)}</span>
              </div>
              <Button
                text={<ChevronDown />}
                type="chevron"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 gap-4">
          {isLoading || !items ? (
            // Loading placeholders to maintain layout - consistent between server and client
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`loading-mobile-${index}`}
                className="flex gap-4"
                suppressHydrationWarning={false}
              >
                <div className="relative w-[100px] h-[100px] flex-shrink-0 bg-gray-200 animate-pulse rounded"></div>
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
                className="flex gap-4 p-2 rounded transition-colors cursor-pointer hover:bg-gray-50"
                onClick={() => handleItemClick(item)}
              >
                <h3
                  className="text-sm font-medium line-clamp-3 w-12 max-h-[200px] overflow-x-auto flex-shrink-0"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {getTitle ? getTitle(item) : item.title}
                </h3>

                <div className="flex-1 flex gap-4">
                  <div className="relative w-[200px] h-[200px] flex-shrink-0">
                    <Image
                      src={
                        getImageUrl
                          ? getImageUrl(item)
                          : "/mng/images/news1.png"
                      }
                      alt={
                        getTitle ? getTitle(item) : item.title || "Item image"
                      }
                      height={200}
                      width={200}
                      className="object-cover rounded-lg w-full h-full shadow-md"
                      onError={(e) => {
                        e.target.src = "/mng/images/news1.png";
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

                  {/* Additional Content for Mobile (e.g., price, shop link) */}
                  {renderAdditionalContent && (
                    <div className="flex-shrink-0">
                      {renderAdditionalContent(item)}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p
                className="text-gray-500 text-center"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {emptyStateText}
              </p>
            </div>
          )}
        </div>

        {/* Mobile Pagination - Only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              text={<ChevronLeft />}
              type="chevron"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            />
            <div className="text-sm flex flex-row items-center justify-center gap-0">
              <span>{toMongolianNumbers(currentPage)}</span>
              <span className="text-xs">/</span>
              <span>{toMongolianNumbers(totalPages)}</span>
            </div>
            <Button
              text={<ChevronRight />}
              type="chevron"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            />
          </div>
        )}
      </div>
    </>
  );
}
