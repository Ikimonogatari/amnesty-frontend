import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import StaticHeader from "@/components/common/StaticHeader";
import Image from "next/image";
import Button from "@/components/common/Button";
import Fetcher, { toMongolianNumbers } from "@/utils/fetcher";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { getImageUrl } from "@/utils/fetcher";

export default function LessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    fetchLessons(currentPage);
  }, [currentPage]);

  const fetchLessons = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching ALL lessons from old web API format...");

            const response = await Fetcher("/lessons?populate=deep&sort[id]=desc");
      
      if (response?.data && Array.isArray(response.data)) {
        // Client-side pagination to match old web behavior
        const allLessons = response.data;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedLessons = allLessons.slice(startIndex, endIndex);
        
        setLessons(paginatedLessons);
        setTotalPages(Math.ceil(allLessons.length / pageSize));
      } else {
        setLessons([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("🚨 Lessons API Error:", err);
      setError(err);
      setLessons([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading state
  if (isLoading && currentPage === 1) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
            <p
              className="mt-4 text-gray-600"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠠᠴᠢᠶᠠᠯᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ᠰᠤᠷᠭᠠᠯᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p className="text-gray-600 mb-4">
              ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        <StaticHeader
          image="/images/lessons/header-img.jpg"
          alt="Lessons Header"
          width="100%"
          title="ᠰᠤᠷᠭᠠᠯᠲᠤ"
        />

        {/* Mobile Introduction */}
        <div className="p-4">
          <div className="mb-8">
            <h2
              className="text-lg font-bold mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠣᠭᠤᠳ ᠤ᠋ᠨ ᠲᠠᠨᠢᠯᠴᠤᠭᠤᠯᠭ᠎ᠠ:
            </h2>
            <p
              className="text-sm text-gray-700 leading-relaxed"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠪᠢᠳ ᠠᠩᠭᠢ᠂ ᠬᠠᠮᠲᠤ ᠣᠯᠠᠨ ᠳᠤ ᠵᠣᠷᠢᠯᠠᠭᠰᠠᠨ ᠳᠠᠷᠠᠬᠠᠢ ᠬᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠬᠡ ᠶᠢᠨ
              ᠲᠠᠨᠬᠢᠮ ᠤ᠋ᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠮᠠᠨ᠎ᠠᠢ ᠰᠤᠷᠭᠠᠯᠲᠤ
              ᠨᠤᠭᠤᠳ ᠢ ᠲᠤᠷᠰᠢᠯᠠᠭᠠᠲᠠᠢ᠂ ᠪᠡᠯᠲᠡᠭᠡᠭᠳᠡᠭᠰᠡᠨ ᠰᠤᠷᠭᠠᠭᠴᠢ ᠪᠠᠭᠰᠢ ᠨᠠᠷ ᠤᠳᠢᠷᠳᠠᠨ
              ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠃
            </p>
          </div>

          {/* Mobile Lessons Grid - NEWS LAYOUT */}
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
            ) : lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <div
                  key={lesson.id || index}
                  className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => router.push(`/lessons/${lesson.id}`)}
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={
                        getImageUrl(
                          lesson.attributes?.thumbnail ||
                            lesson.attributes?.cover
                        ) || "/images/news1.png"
                      }
                      alt={
                        lesson.attributes?.title ||
                        lesson.title ||
                        "Lesson image"
                      }
                      fill
                      className="object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/images/news1.png";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-sm font-medium line-clamp-2 mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {lesson.attributes?.title || lesson.title || "ᠰᠤᠷᠭᠠᠯᠲᠤ"}
                    </h3>
                    {lesson.attributes?.lesson_length && (
                      <p
                        className="text-xs text-gray-500"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {lesson.attributes.lesson_length}
                      </p>
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
                    textOrientation: "upright",
                  }}
                >
                  ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ
                </p>
              </div>
            )}
          </div>

          {/* Mobile Pagination - EXACT NEWS STYLE */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              text={<ChevronLeft />}
              type="chevron"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
            />
            <p className="text-sm">
              {toMongolianNumbers(currentPage)}/
              {toMongolianNumbers(totalPages)}
            </p>
            <Button
              text={<ChevronRight />}
              type="chevron"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0">
        <StaticHeader
          image="/images/lessons/header-img.jpg"
          alt="Lessons Header"
          width="90rem"
          title="ᠰᠤᠷᠭᠠᠯᠲᠤ"
        />

        <div className="flex gap-4 min-w-0 flex-1">
          {/* Desktop Title and Introduction */}
          <div className="flex gap-4">
            <h1
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ
            </h1>
            <div className="flex flex-col gap-4">
              <h2
                className="text-lg font-bold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠣᠭᠤᠳ ᠤ᠋ᠨ ᠲᠠᠨᠢᠯᠴᠤᠭᠤᠯᠭ᠎ᠠ:
              </h2>
              <p
                className="text-sm text-gray-700 leading-relaxed max-w-xs"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠪᠢᠳ ᠠᠩᠭᠢ᠂ ᠬᠠᠮᠲᠤ ᠣᠯᠠᠨ ᠳᠤ ᠵᠣᠷᠢᠯᠠᠭᠰᠠᠨ ᠳᠠᠷᠠᠬᠠᠢ ᠬᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᠬᠡ ᠶᠢᠨ
                ᠲᠠᠨᠬᠢᠮ ᠤ᠋ᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠮᠠᠨ᠎ᠠᠢ
                ᠰᠤᠷᠭᠠᠯᠲᠤ ᠨᠤᠭᠤᠳ ᠢ ᠲᠤᠷᠰᠢᠯᠠᠭᠠᠲᠠᠢ᠂ ᠪᠡᠯᠲᠡᠭᠡᠭᠳᠡᠭᠰᠡᠨ ᠰᠤᠷᠭᠠᠭᠴᠢ ᠪᠠᠭᠰᠢ ᠨᠠᠷ
                ᠤᠳᠢᠷᠳᠠᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠃
              </p>
            </div>
          </div>

          {/* Desktop Lessons Grid - EXACT NEWS LAYOUT */}
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
              ) : lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <div
                    key={lesson.id || index}
                    className="w-full h-full flex items-end space-x-4"
                  >
                    <h3
                      className="max-w-16 line-clamp-3 h-full text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                      title={lesson.attributes?.title || lesson.title}
                    >
                      {(lesson.attributes?.title || lesson.title || "").length >
                      50
                        ? `${(
                            lesson.attributes?.title ||
                            lesson.title ||
                            ""
                          ).substring(0, 50)}...`
                        : lesson.attributes?.title || lesson.title}
                    </h3>
                    <div className="relative h-[300px] w-[300px] aspect-square shadow-md">
                      <Image
                        src={
                          getImageUrl(
                            lesson.attributes?.thumbnail ||
                              lesson.attributes?.cover
                          ) || "/images/news1.png"
                        }
                        alt={
                          lesson.attributes?.title ||
                          lesson.title ||
                          "Lesson image"
                        }
                        fill
                        className="object-cover rounded-xl w-full h-full"
                        onError={(e) => {
                          e.target.src = "/images/news1.png"; // fallback image
                        }}
                      />
                      <Button
                        text="ᠰᠤᠷᠭᠠᠯᠲᠤ"
                        type="primary"
                        className="absolute top-0 right-0 text-black cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => router.push(`/lessons/${lesson.id}`)}
                      />
                    </div>
                    <Button
                      text={"ᠤᠩᠰᠢᠬᠤ"}
                      type="secondary"
                      className="text-black h-48 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => router.push(`/lessons/${lesson.id}`)}
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
                      ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Pagination - EXACT NEWS STYLE */}
            <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center gap-2">
              <Button
                text={<ChevronUp />}
                type="chevron"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
              />
              <p className="text-sm">
                {toMongolianNumbers(currentPage)}/
                {toMongolianNumbers(totalPages)}
              </p>
              <Button
                text={<ChevronDown />}
                type="chevron"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper function to convert to Mongolian numerals
const toMongolianNumeral = toMongolianNumbers;
