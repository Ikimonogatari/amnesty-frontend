import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import PageIntroduction from "@/components/common/PageIntroduction";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Fetcher, { getImageUrl } from "@/utils/fetcher";
import Layout from "@/components/layout/Layout";

export default function LessonsIndex() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9; // Match news page items per page

  // Fetch lessons data
  useEffect(() => {
    fetchLessons(currentPage);
  }, [currentPage]);

  const fetchLessons = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher(
        "/lessons?populate=deep&sort[publishedAt]=desc"
      );

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
      setError(err);
      setLessons([]);
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
  if (isLoading && lessons.length === 0) {
    return <LoadingSpinner size="sm" />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠰᠤᠷᠭᠠᠯᠲᠤ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden sm:flex h-screen overflow-hidden">
          <StaticHeader
            title="ᠰᠤᠷᠭᠠᠯᠲᠤ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ"
            backgroundImage="/images/news1.png"
          />

          {/* Desktop Introduction Section */}
          <PageIntroduction
            variant="desktop"
            title="ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
          />

          {/* Desktop Grid Layout */}
          <div className="flex-1 p-8 overflow-y-auto">
            <GridLayout
              items={lessons}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/lessons"
              categoryButtonText="ᠰᠤᠷᠭᠠᠯᠲᠤ"
              emptyStateText="ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ"
              getImageUrl={getLessonImageUrl}
              getTitle={getLessonTitle}
              itemType="lesson"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <StaticHeader
            title="ᠰᠤᠷᠭᠠᠯᠲᠤ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ"
            backgroundImage="/images/news1.png"
          />

          <div className="p-4">
            {/* Mobile Introduction Section */}
            <PageIntroduction
              variant="mobile"
              title="ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ"
              description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
            />

            {/* Mobile Grid Layout */}
            <GridLayout
              items={lessons}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/lessons"
              categoryButtonText="ᠰᠤᠷᠭᠠᠯᠲᠤ"
              emptyStateText="ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠭᠡᠢ"
              getImageUrl={getLessonImageUrl}
              getTitle={getLessonTitle}
              itemType="lesson"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper functions for GridLayout component
const getLessonImageUrl = (lesson) => {
  return (
    getImageUrl(lesson.attributes?.thumbnail || lesson.attributes?.cover) ||
    "/images/news1.png"
  );
};

const getLessonTitle = (lesson) => {
  return lesson.attributes?.title || lesson.title || "ᠰᠤᠷᠭᠠᠯᠲᠤ";
};
