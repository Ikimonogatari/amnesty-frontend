import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import Fetcher, { getImageUrl } from "@/utils/fetcher";

export default function OnlineLessonsIndex() {
  const router = useRouter();
  const [onlineLessons, setOnlineLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9; // Match news page items per page

  // Fetch online lessons data
  useEffect(() => {
    fetchOnlineLessons(currentPage);
  }, [currentPage]);

  const fetchOnlineLessons = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher("/online-lessons?populate=deep");

      if (response?.data && Array.isArray(response.data)) {
        // Client-side pagination to match old web behavior
        const allOnlineLessons = response.data;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedLessons = allOnlineLessons.slice(startIndex, endIndex);

        setOnlineLessons(paginatedLessons);
        setTotalPages(Math.ceil(allOnlineLessons.length / pageSize));
      } else {
        setOnlineLessons([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err);
      setOnlineLessons([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isLoading) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  // Loading state
  if (isLoading && onlineLessons.length === 0) {
    return (
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
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠮᠡᠳᠡᢉᠡ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden sm:flex h-screen overflow-hidden">
        <StaticHeader
          title="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ"
          description="ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠨ ᠳᠠᠪᠲᠠᠨ"
          backgroundImage="/images/news1.png"
        />

        {/* Desktop Introduction Section */}
        <div className="flex-shrink-0 w-96 bg-gray-50 p-8 overflow-y-auto">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ
          </h2>
          <p
            className="text-gray-700 leading-relaxed"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="flex-1 p-8 overflow-y-auto">
          <GridLayout
            items={onlineLessons}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            basePath="/online-lessons"
            categoryButtonText="ᠰᠤᠷᠭᠠᠯᠲᠤ"
            emptyStateText="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ"
            getImageUrl={getOnlineLessonImageUrl}
            getTitle={getOnlineLessonTitle}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <StaticHeader
          title="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ"
          description="ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠨ ᠳᠠᠪᠲᠠᠨ"
          backgroundImage="/images/news1.png"
        />

        <div className="p-4">
          {/* Mobile Introduction Section */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h2
              className="text-lg font-bold mb-3"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ
            </h2>
            <p
              className="text-gray-700 text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ
            </p>
          </div>

          {/* Mobile Grid Layout */}
          <GridLayout
            items={onlineLessons}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            basePath="/online-lessons"
            categoryButtonText="ᠰᠤᠷᠭᠠᠯᠲᠤ"
            emptyStateText="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ"
            getImageUrl={getOnlineLessonImageUrl}
            getTitle={getOnlineLessonTitle}
          />
        </div>
      </div>
    </div>
  );
}

// Helper functions for GridLayout component
const getOnlineLessonImageUrl = (lesson) => {
  return (
    getImageUrl(lesson.attributes?.thumbnail || lesson.attributes?.cover) ||
    "/images/news1.png"
  );
};

const getOnlineLessonTitle = (lesson) => {
  return lesson.attributes?.title || lesson.title || "ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ";
};
