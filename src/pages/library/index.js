import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import PageIntroduction from "@/components/common/PageIntroduction";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Fetcher, { getImageUrl } from "@/utils/fetcher";
import Layout from "@/components/layout/Layout";

export default function LibraryIndex() {
  const router = useRouter();
  const [libraries, setLibraries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9; // Match news page items per page

  // Fetch libraries data
  useEffect(() => {
    fetchLibraries(currentPage);
  }, [currentPage]);

  const fetchLibraries = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher("/libraries?populate=deep&sort[id]=desc");

      if (response?.data && Array.isArray(response.data)) {
        // Client-side pagination to match old web behavior
        const allLibraries = response.data;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedLibraries = allLibraries.slice(startIndex, endIndex);

        setLibraries(paginatedLibraries);
        setTotalPages(Math.ceil(allLibraries.length / pageSize));
      } else {
        setLibraries([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err);
      setLibraries([]);
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
  if (isLoading && libraries.length === 0) {
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
            title="ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
            image="/images/libraries/header-img-library.jpg"
          />

          {/* Desktop Introduction Section */}
          <PageIntroduction
            variant="desktop"
            title="ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ ᠪᠣᠯᠣᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ"
          />

          {/* Desktop Grid Layout */}
          <div className="flex-1 p-8 overflow-y-auto">
            <GridLayout
              items={libraries}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/library"
              categoryButtonText="ᠨᠣᠮ"
              emptyStateText="ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ ᠦᠭᠡᠢ"
              getImageUrl={getLibraryImageUrl}
              getTitle={getLibraryTitle}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <StaticHeader
            title="ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
            image="/images/libraries/header-img-library.jpg"
          />

          <div className="p-4">
            {/* Mobile Introduction Section */}
            <PageIntroduction
              variant="mobile"
              title="ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
              description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ ᠪᠣᠯᠣᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡ"
            />

            {/* Mobile Grid Layout */}
            <GridLayout
              items={libraries}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/library"
              categoryButtonText="ᠨᠣᠮ"
              emptyStateText="ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ ᠦᠭᠡᠢ"
              getImageUrl={getLibraryImageUrl}
              getTitle={getLibraryTitle}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper functions for GridLayout component
const getLibraryImageUrl = (library) => {
  return (
    getImageUrl(
      library.attributes?.thumbnail ||
        library.attributes?.cover ||
        library.attributes?.image
    ) || "/images/news1.png"
  );
};

const getLibraryTitle = (library) => {
  return (
    library.attributes?.title ||
    library.attributes?.name ||
    library.title ||
    library.name ||
    "ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ"
  );
};
