import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { getImageUrl } from "@/utils/fetcher";

import {
  postsService,
  lessonsService,
  onlineLessonsService,
  librariesService,
  eventsService,
} from "@/services/apiService";
import { Search } from "lucide-react";

// Search options matching old web
const searchOptions = [
  {
    id: "post",
    label: "ᠮᠡᠳᠡᠭᠡ",
    service: "posts",
  },
  {
    id: "lesson",
    label: "ᠰᠤᠷᠭᠠᠯᠲᠠ",
    service: "lessons",
  },
  {
    id: "online-lesson",
    label: "ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ",
    service: "onlineLessons",
  },
  {
    id: "library",
    label: "ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠨ",
    service: "libraries",
  },
  {
    id: "event",
    label: "ᠠᠷᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶ᠎ᠡ",
    service: "events",
  },
];

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("post");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to highlight search terms in text
  const highlightText = (text, searchTerm) => {
    if (!text || !searchTerm || typeof text !== "string") return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const performSearch = async (term, type) => {
    if (!term || term.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    // Clean and normalize search term
    const cleanTerm = term.trim();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const searchOption = searchOptions.find((opt) => opt.id === type);
      let searchResults = [];

      console.log(`Searching for "${cleanTerm}" in ${type}...`);

      if (searchOption) {
        switch (searchOption.service) {
          case "posts":
            try {
              // Use posts list with search query - posts service has different structure
              const postsResponse = await postsService.getPostsList({
                pageSize: 10,
                filters: {
                  "filters[title][$contains]": cleanTerm,
                },
              });
              searchResults = postsResponse?.data || [];
              console.log(
                `Posts API returned ${searchResults.length} results for title search`
              );

              // Debug first result's image structure
              if (searchResults.length > 0) {
                console.log(
                  "First post result cover structure:",
                  JSON.stringify(searchResults[0]?.cover, null, 2)
                );
              }

              // Also try searching in short_description if no results or few results
              if (!searchResults || searchResults.length < 3) {
                const bodySearchResponse = await postsService.getPostsList({
                  pageSize: 10,
                  filters: {
                    "filters[$or][0][title][$contains]": cleanTerm,
                    "filters[$or][1][short_description][$contains]": cleanTerm,
                  },
                });
                const bodyResults = bodySearchResponse?.data || [];
                console.log(
                  `Posts API returned ${bodyResults.length} additional results for description search`
                );

                // Combine and deduplicate results
                const combinedResults = [...searchResults];
                bodyResults.forEach((newResult) => {
                  if (
                    !combinedResults.find(
                      (existing) => existing.id === newResult.id
                    )
                  ) {
                    combinedResults.push(newResult);
                  }
                });
                searchResults = combinedResults.slice(0, 10); // Limit to 10 results
              }
            } catch (error) {
              console.error("Posts search error:", error);
              searchResults = [];
            }
            console.log(`Posts search results:`, searchResults);
            break;

          case "lessons":
            try {
              // Try OR filter first
              const lessonsResponse = await lessonsService.getLessons({
                pageSize: 10,
                filters: {
                  "filters[$or][0][title][$contains]": cleanTerm,
                  "filters[$or][1][description][$contains]": cleanTerm,
                },
              });
              searchResults = Array.isArray(lessonsResponse?.data)
                ? lessonsResponse.data
                : lessonsResponse || [];
              console.log(
                `Lessons API returned ${searchResults.length} results for OR filter search`
              );

              // If no results, try simple title search
              if (!searchResults || searchResults.length === 0) {
                const fallbackResponse = await lessonsService.getLessons({
                  pageSize: 10,
                  filters: {
                    "filters[title][$contains]": cleanTerm,
                  },
                });
                searchResults = Array.isArray(fallbackResponse?.data)
                  ? fallbackResponse.data
                  : fallbackResponse || [];
                console.log(
                  `Lessons fallback API returned ${searchResults.length} results for title search`
                );
              }
            } catch (error) {
              console.error("Lessons search error:", error);
              // Try simple search as fallback - only if we really have no results
              try {
                const fallbackResponse = await lessonsService.getLessons({
                  pageSize: 50, // Get more for client-side filtering
                });
                const allLessons = Array.isArray(fallbackResponse?.data)
                  ? fallbackResponse.data
                  : fallbackResponse || [];

                // Filter client-side with stricter matching
                searchResults = allLessons
                  .filter((item) => {
                    const title = (item?.title || "").toLowerCase();
                    const description = (item?.description || "").toLowerCase();
                    const searchLower = cleanTerm.toLowerCase();

                    return (
                      title.includes(searchLower) ||
                      description.includes(searchLower)
                    );
                  })
                  .slice(0, 10); // Limit to 10 results

                console.log(
                  `Lessons client-side filter: ${searchResults.length} results from ${allLessons.length} total`
                );
              } catch (fallbackError) {
                console.error("Lessons fallback search error:", fallbackError);
                searchResults = [];
              }
            }
            console.log(`Lessons search results:`, searchResults);
            break;

          case "onlineLessons":
            try {
              const onlineLessonsResponse =
                await onlineLessonsService.getOnlineLessons({
                  pageSize: 10,
                  filters: {
                    "filters[$or][0][title][$contains]": cleanTerm,
                    "filters[$or][1][description][$contains]": cleanTerm,
                  },
                });
              searchResults = Array.isArray(onlineLessonsResponse?.data)
                ? onlineLessonsResponse.data
                : onlineLessonsResponse || [];
              console.log(
                `Online Lessons API returned ${searchResults.length} results for OR filter search`
              );

              // Fallback to simple title search
              if (!searchResults || searchResults.length === 0) {
                const fallbackResponse =
                  await onlineLessonsService.getOnlineLessons({
                    pageSize: 10,
                    filters: {
                      "filters[title][$contains]": cleanTerm,
                    },
                  });
                searchResults = Array.isArray(fallbackResponse?.data)
                  ? fallbackResponse.data
                  : fallbackResponse || [];
              }
            } catch (error) {
              console.error("Online lessons search error:", error);
              searchResults = [];
            }
            console.log(`Online lessons search results:`, searchResults);
            break;

          case "libraries":
            try {
              const librariesResponse = await librariesService.getLibraries({
                pageSize: 10,
                filters: {
                  "filters[$or][0][title][$contains]": cleanTerm,
                  "filters[$or][1][description][$contains]": cleanTerm,
                },
              });
              searchResults = Array.isArray(librariesResponse?.data)
                ? librariesResponse.data
                : librariesResponse || [];
              console.log(
                `Libraries API returned ${searchResults.length} results for OR filter search`
              );

              // Fallback to simple title search
              if (!searchResults || searchResults.length === 0) {
                const fallbackResponse = await librariesService.getLibraries({
                  pageSize: 10,
                  filters: {
                    "filters[title][$contains]": cleanTerm,
                  },
                });
                searchResults = Array.isArray(fallbackResponse?.data)
                  ? fallbackResponse.data
                  : fallbackResponse || [];
              }
            } catch (error) {
              console.error("Libraries search error:", error);
              searchResults = [];
            }
            console.log(`Libraries search results:`, searchResults);
            break;

          case "events":
            try {
              const eventsResponse = await eventsService.getEvents({
                pageSize: 10,
                filters: {
                  "filters[$or][0][title][$contains]": cleanTerm,
                  "filters[$or][1][body][$contains]": cleanTerm,
                },
              });
              searchResults = Array.isArray(eventsResponse?.data)
                ? eventsResponse.data
                : eventsResponse || [];
              console.log(
                `Events API returned ${searchResults.length} results for OR filter search`
              );

              // Fallback to simple title search
              if (!searchResults || searchResults.length === 0) {
                const fallbackResponse = await eventsService.getEvents({
                  pageSize: 10,
                  filters: {
                    "filters[title][$contains]": cleanTerm,
                  },
                });
                searchResults = Array.isArray(fallbackResponse?.data)
                  ? fallbackResponse.data
                  : fallbackResponse || [];
              }
            } catch (error) {
              console.error("Events search error:", error);
              searchResults = [];
            }
            console.log(`Events search results:`, searchResults);
            break;
        }
      }

      // Final client-side filtering to ensure only matching results
      const finalResults = searchResults.filter((item) => {
        const title = (item?.title || "").toLowerCase();
        const description = (
          item?.description ||
          item?.short_description ||
          item?.body ||
          item?.content ||
          ""
        ).toLowerCase();
        const searchLower = cleanTerm.toLowerCase();

        const hasMatch =
          title.includes(searchLower) || description.includes(searchLower);

        if (!hasMatch) {
          console.log(`Filtering out non-matching result:`, item?.title);
        }

        return hasMatch;
      });

      console.log(
        `Final search results for ${type} (${finalResults.length}/${searchResults.length}):`,
        finalResults
      );
      setResults(finalResults);
    } catch (error) {
      console.error(`Search error for ${type}:`, error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    performSearch(searchTerm, searchType);
  };

  const handleInputChange = (value) => {
    setSearchTerm(value);
    // Debounced search
    const cleanValue = value.trim();
    if (cleanValue.length >= 2) {
      const timeoutId = setTimeout(() => {
        performSearch(cleanValue, searchType);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else if (cleanValue.length === 0) {
      setResults([]);
      setHasSearched(false);
    }
  };

  const getResultLink = (result) => {
    switch (searchType) {
      case "post":
        return `/news/${result.id}`;
      case "lesson":
        return `/lessons/${result.id}`;
      case "online-lesson":
        return `/online-lessons/${result.id}`;
      case "library":
        return `/library/${result.id}`;
      case "event":
        return `/participation/events/${result.id}`;
      default:
        return "#";
    }
  };

  const getResultImage = (result) => {
    console.log(`Getting image for result:`, result);

    // Try to use the cover field with getImageUrl utility (handles all formats)
    if (result?.cover) {
      const imageUrl = getImageUrl(result.cover);
      if (imageUrl) {
        console.log("Using getImageUrl for cover:", imageUrl);
        return imageUrl;
      }
    }

    // Try images array with getImageUrl utility
    if (result?.images?.data?.[0]) {
      const imageUrl = getImageUrl(result.images.data[0]);
      if (imageUrl) {
        console.log("Using getImageUrl for images[0]:", imageUrl);
        return imageUrl;
      }
    }

    // Try direct images array
    if (result?.images?.[0]) {
      const imageUrl = getImageUrl(result.images[0]);
      if (imageUrl) {
        console.log("Using getImageUrl for direct images[0]:", imageUrl);
        return imageUrl;
      }
    }

    // Try image field (single)
    if (result?.image) {
      const imageUrl = getImageUrl(result.image);
      if (imageUrl) {
        console.log("Using getImageUrl for image:", imageUrl);
        return imageUrl;
      }
    }

    // Try thumbnail field
    if (result?.thumbnail) {
      const imageUrl = getImageUrl(result.thumbnail);
      if (imageUrl) {
        console.log("Using getImageUrl for thumbnail:", imageUrl);
        return imageUrl;
      }
    }

    console.log(
      "No image found, using fallback. Result structure:",
      JSON.stringify(result, null, 2)
    );
    return "/mng/images/news1.png";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] overflow-auto md:overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2
            className="text-lg font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠬᠠᠢᠯᠲᠠ
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Icon icon="mdi:close" fontSize={24} className="text-gray-600" />
          </button>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Search Controls - Left Side on Desktop, Top on Mobile (Vertical Layout) */}
          <div className="w-full md:w-20 p-4 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-200">
            <form
              onSubmit={handleSearch}
              className="flex flex-row md:flex-col gap-4"
            >
              {/* Search Type Dropdown - Vertical */}
              <div className="flex flex-row md:flex-col gap-2">
                <label
                  className="text-sm font-medium md:text-center"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠠᠩᠭᠢ
                </label>
                <div className="relative dropdown-container">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="border border-gray-300 rounded-md p-2 w-12 text-xs bg-white flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors min-h-[80px]"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    <div
                      style={{
                        writingMode: "vertical-lr",
                      }}
                      className="flex items-center justify-center flex-1"
                    >
                      {
                        searchOptions.find((opt) => opt.id === searchType)
                          ?.label
                      }
                    </div>
                    <div
                      className="flex items-center justify-center"
                      style={{ writingMode: "horizontal-tb" }}
                    >
                      {isDropdownOpen ? "◀" : "▶"}
                    </div>
                  </button>

                  {/* Horizontal Dropdown Menu - Same as Contact Page */}
                  {isDropdownOpen && (
                    <div className="absolute top-0 left-24 bg-white border border-gray-300 rounded-md shadow-lg z-20 flex">
                      {searchOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="w-20 p-2 max-h-[300px] text-xs hover:bg-gray-100 border-r border-gray-200 last:border-r-0 h-full flex items-center justify-center min-h-[80px]"
                          style={{
                            writingMode: "vertical-lr",
                          }}
                          onClick={() => {
                            setSearchType(option.id);
                            setIsDropdownOpen(false);
                            if (searchTerm.length >= 2) {
                              performSearch(searchTerm, option.id);
                            }
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Input - Normal Input */}
              <div className="flex flex-row md:flex-col gap-2">
                <label
                  className="text-sm font-medium md:text-center"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠠᠢᠯᠲᠠ ᠶᠢᠨ ᠦᠭᠡ
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="ᠬᠠᠢᠯᠲᠠ..."
                  className={`w-full max-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                    searchTerm.length > 0 && searchTerm.length < 2
                      ? "border-yellow-300 focus:ring-yellow-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                  }}
                />
                {searchTerm.length > 0 && searchTerm.length < 2 && (
                  <p
                    className="text-xs text-yellow-600 mt-1"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᠪᠠᠭ᠎ᠠ ᠪᠠᠷᠠᠭᠤᠨ ᠳᠤ ᠬᠣᠶᠠᠷ ᠦᠰᠦᠭ
                  </p>
                )}
              </div>

              {/* Search Button - Vertical */}
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center w-12 h-12 gap-2 bg-[#FFFF00] rounded ml-auto md:ml-0"
              >
                <Search className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>

          {/* Results Section - Right Side on Desktop, Bottom on Mobile */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Icon
                  icon="mdi:loading"
                  className="animate-spin text-2xl text-gray-600"
                />
                <span
                  className="ml-2 text-gray-600"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠠᠢᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
                </span>
              </div>
            )}

            {!isLoading && hasSearched && results.length === 0 && (
              <div className="text-center py-8">
                <div className="mb-4">
                  <Icon
                    icon="lucide:search-x"
                    className="text-4xl text-gray-300 mx-auto mb-2"
                  />
                </div>
                <p
                  className="text-gray-500 mb-2"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠠᠢᠯᠲᠠ ᠶᠢᠨ ᠦᠷ᠎ᠡ ᠳᠦᠩ ᠣᠯᠣᠭᠰᠠᠨ ᠦᠭᠡᠢ᠃
                </p>
                <p
                  className="text-sm text-gray-400"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  "{searchTerm}" -{" "}
                  {searchOptions.find((opt) => opt.id === searchType)?.label}
                </p>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={getResultLink(result)}
                    onClick={onClose}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-4 max-h-[200px] md:max-h-[400px] overflow-x-auto">
                      {/* Title */}
                      <h3
                        className="text-sm font-medium line-clamp-3 min-w-12 flex-shrink-0"
                        style={{
                          writingMode: "vertical-lr",
                        }}
                      >
                        {highlightText(result.title, searchTerm)}
                      </h3>

                      {/* Image */}
                      <div className="w-48 h-48 md:w-96 md:h-96 flex-shrink-0">
                        <Image
                          src={getResultImage(result)}
                          alt={result.title || "Search result"}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/mng/images/news1.png";
                          }}
                        />
                      </div>

                      {/* Description */}
                      {(result.short_description ||
                        result.description ||
                        result.body ||
                        result.content) && (
                        <p
                          className="flex-1 text-xs text-gray-600 line-clamp-10 overflow-x-auto"
                          style={{
                            writingMode: "vertical-lr",
                          }}
                        >
                          {highlightText(
                            result.short_description ||
                              result.description ||
                              result.body ||
                              result.content,
                            searchTerm
                          )}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!hasSearched && (
              <div className="text-center py-8">
                <Icon
                  icon="lucide:search"
                  className="text-4xl text-gray-300 mx-auto mb-4"
                />
                <p
                  className="text-gray-500"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠠᠢᠯᠲᠠ ᠶᠢᠨ ᠦᠭᠡ ᠪᠢᠴᠢᠭᠡᠷᠡᠢ᠃
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
