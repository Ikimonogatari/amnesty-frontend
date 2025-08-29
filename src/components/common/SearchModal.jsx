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
    if (!term || term.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const searchOption = searchOptions.find((opt) => opt.id === type);
      let searchResults = [];

      if (searchOption) {
        switch (searchOption.service) {
          case "posts":
            // Use posts list with search query (if available)
            const postsResponse = await postsService.getPostsList({
              pageSize: 10,
              filters: {
                "filters[title][$contains]": term,
              },
            });
            searchResults = postsResponse?.data || [];
            break;

          case "lessons":
            const lessonsResponse = await lessonsService.getLessons({
              pageSize: 10,
              filters: {
                "filters[$or][0][title][$contains]": term,
                "filters[$or][1][description][$contains]": term,
              },
            });
            searchResults = lessonsResponse?.data || [];
            break;

          case "onlineLessons":
            const onlineLessonsResponse =
              await onlineLessonsService.getOnlineLessons({
                pageSize: 10,
                filters: {
                  "filters[$or][0][title][$contains]": term,
                  "filters[$or][1][description][$contains]": term,
                },
              });
            searchResults = onlineLessonsResponse?.data || [];
            break;

          case "libraries":
            const librariesResponse = await librariesService.getLibraries({
              pageSize: 10,
              filters: {
                "filters[$or][0][title][$contains]": term,
                "filters[$or][1][description][$contains]": term,
              },
            });
            searchResults = librariesResponse?.data || [];
            break;

          case "events":
            const eventsResponse = await eventsService.getEvents({
              pageSize: 10,
              filters: {
                "filters[$or][0][title][$contains]": term,
                "filters[$or][1][body][$contains]": term,
              },
            });
            searchResults = eventsResponse?.data || [];
            break;
        }
      }

      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
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
    if (value.length >= 2) {
      const timeoutId = setTimeout(() => {
        performSearch(value, searchType);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else if (value.length === 0) {
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
    if (result?.cover?.data?.attributes?.url) {
      return getImageUrl(result.cover);
    }
    if (result?.images?.data?.[0]?.attributes?.url) {
      return getImageUrl(result.images.data[0]);
    }
    return "/images/news1.png";
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
              textOrientation: "upright",
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
                    textOrientation: "upright",
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
                      textOrientation: "upright",
                    }}
                  >
                    <div
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
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
                            textOrientation: "upright",
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
                    textOrientation: "upright",
                  }}
                >
                  ᠬᠠᠢᠯᠲᠠ ᠶᠢᠨ ᠦᠭᠡ
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="ᠬᠠᠢᠯᠲᠠ..."
                  className="w-full max-h-[200px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                  }}
                />
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
                    textOrientation: "upright",
                  }}
                >
                  ᠬᠠᠢᠵᠤ ᠪᠠᠢᠨ᠎ᠠ...
                </span>
              </div>
            )}

            {!isLoading && hasSearched && results.length === 0 && (
              <div className="text-center py-8">
                <p
                  className="text-gray-500"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠬᠠᠢᠯᠲᠠ ᠶᠢᠨ ᠦᠷ᠎ᠡ ᠳᠦᠩ ᠣᠯᠣᠭᠰᠠᠨ ᠦᠭᠡᠢ᠃
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
                          textOrientation: "upright",
                        }}
                      >
                        {result.title}
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
                            e.target.src = "/images/news1.png";
                          }}
                        />
                      </div>

                      {/* Description */}
                      {(result.short_description ||
                        result.description ||
                        result.body) && (
                        <p
                          className="flex-1 text-xs text-gray-600 line-clamp-10 overflow-x-auto"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          {result.short_description ||
                            result.description ||
                            result.body}
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
                    textOrientation: "upright",
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
