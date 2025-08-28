import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
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
    <Layout>
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden sm:flex h-screen overflow-hidden">
          <StaticHeader
            title="ᠸᠢᠳᠧᠣ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ"
            backgroundImage="/images/news1.png"
          />

          {/* Desktop Introduction Section */}
          <div className="flex-shrink-0 bg-gray-50 p-8">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ
            </p>
          </div>

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
            backgroundImage="/images/news1.png"
          />

          <div className="p-4">
            {/* Mobile Introduction Section */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ
              </h2>
              <p
                className="text-gray-700 text-sm"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠸᠢᠳᠧᠣ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ
              </p>
            </div>

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
