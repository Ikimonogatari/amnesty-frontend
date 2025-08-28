import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import PageIntroduction from "@/components/common/PageIntroduction";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Fetcher, { getImageUrl } from "@/utils/fetcher";
import Layout from "@/components/layout/Layout";

export default function VideosIndex() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9; // Match news page items per page

  // Fetch videos data
  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const fetchVideos = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher(
        "/videos?populate=deep&sort[publishedAt]=desc"
      );

      if (response?.data && Array.isArray(response.data)) {
        // Client-side pagination to match old web behavior
        const allVideos = response.data;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedVideos = allVideos.slice(startIndex, endIndex);

        setVideos(paginatedVideos);
        setTotalPages(Math.ceil(allVideos.length / pageSize));
      } else {
        setVideos([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err);
      setVideos([]);
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
  if (isLoading && videos.length === 0) {
    return <LoadingSpinner size="sm" />;
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
    <Layout>
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden sm:flex h-screen overflow-hidden">
          <StaticHeader
            title="ᠸᠢᠳᠧᠣ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ"
            image="/images/videos/header-img-video.jpg"
          />

          {/* Desktop Introduction Section */}
          <PageIntroduction
            variant="desktop"
            title="ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
          />

          {/* Desktop Grid Layout */}
          <div className="flex-1 p-8 overflow-y-auto">
            <GridLayout
              items={videos}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/videos"
              categoryButtonText="ᠸᠢᠳᠧᠣ"
              emptyStateText="ᠸᠢᠳᠧᠣ ᠦᠭᠡᠢ"
              getImageUrl={getVideoImageUrl}
              getTitle={getVideoTitle}
              itemType="video"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <StaticHeader
            title="ᠸᠢᠳᠧᠣ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ"
            image="/images/videos/header-img-video.jpg"
          />

          <div className="p-4">
            {/* Mobile Introduction Section */}
            <PageIntroduction
              variant="mobile"
              title="ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ"
              description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
            />

            {/* Mobile Grid Layout */}
            <GridLayout
              items={videos}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/videos"
              categoryButtonText="ᠸᠢᠳᠧᠣ"
              emptyStateText="ᠸᠢᠳᠧᠣ ᠦᠭᠡᠢ"
              getImageUrl={getVideoImageUrl}
              getTitle={getVideoTitle}
              itemType="video"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper functions for GridLayout component
const getVideoImageUrl = (video) => {
  return (
    getImageUrl(video.attributes?.thumbnail || video.attributes?.cover) ||
    "/images/news1.png"
  );
};

const getVideoTitle = (video) => {
  return video.attributes?.title || video.title || "ᠸᠢᠳᠧᠣ";
};
