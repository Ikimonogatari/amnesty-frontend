import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import GridLayout from "@/components/common/GridLayout";
import PageIntroduction from "@/components/common/PageIntroduction";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Fetcher, { getImageUrl, buildFetcherUrl } from "@/utils/fetcher";
import Layout from "@/components/layout/Layout";

export default function PodcastsIndex() {
  const router = useRouter();
  const [podcasts, setPodcasts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 9; // Match news page items per page

  // Fetch podcasts data
  useEffect(() => {
    fetchPodcasts(currentPage);
  }, [currentPage]);

  const fetchPodcasts = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher(
        buildFetcherUrl("/podcasts", {
          populate: "deep",
          "sort[publishedAt]": "desc",
        })
      );

      if (response?.data && Array.isArray(response.data)) {
        // Client-side pagination to match old web behavior
        const allPodcasts = response.data;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedPodcasts = allPodcasts.slice(startIndex, endIndex);

        setPodcasts(paginatedPodcasts);
        setTotalPages(Math.ceil(allPodcasts.length / pageSize));
      } else {
        setPodcasts([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err);
      setPodcasts([]);
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
  if (isLoading && podcasts.length === 0) {
    return <LoadingSpinner size="sm" />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr", textOrientation: "upright" }}>
            ᠫᠣᠳᠺᠠᠰᠲ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
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
            title="ᠫᠣᠳᠺᠠᠰᠲ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ"
            image="/images/podcasts/header-img.jpg"
          />

          {/* Desktop Introduction Section */}
          <PageIntroduction
            variant="desktop"
            title="ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
          />

          {/* Desktop Grid Layout */}
          <div className="flex-1 p-8 overflow-y-auto">
            <GridLayout
              items={podcasts}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/podcasts"
              categoryButtonText="ᠫᠣᠳᠺᠠᠰᠲ"
              emptyStateText="ᠫᠣᠳᠺᠠᠰᠲ ᠦᠭᠡᠢ"
              getImageUrl={getPodcastImageUrl}
              getTitle={getPodcastTitle}
              itemType="podcast"
              renderAdditionalContent={renderPodcastLinks}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <StaticHeader
            title="ᠫᠣᠳᠺᠠᠰᠲ"
            description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ"
            image="/images/podcasts/header-img.jpg"
          />

          <div className="p-4">
            {/* Mobile Introduction Section */}
            <PageIntroduction
              variant="mobile"
              title="ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ"
              description="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠫᠣᠳᠺᠠᠰᠲ ᠳᠠᠪᠲᠠᠨ ᠤᠷᠤᠨ"
            />

            {/* Mobile Grid Layout */}
            <GridLayout
              items={podcasts}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              basePath="/podcasts"
              categoryButtonText="ᠫᠣᠳᠺᠠᠰᠲ"
              emptyStateText="ᠫᠣᠳᠺᠠᠰᠲ ᠦᠭᠡᠢ"
              getImageUrl={getPodcastImageUrl}
              getTitle={getPodcastTitle}
              itemType="podcast"
              renderAdditionalContent={renderPodcastLinks}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper functions for GridLayout component
const getPodcastImageUrl = (podcast) => {
  return (
    getImageUrl(podcast.attributes?.thumbnail || podcast.attributes?.cover) ||
    "/images/news1.png"
  );
};

const getPodcastTitle = (podcast) => {
  return podcast.attributes?.title || podcast.title || "ᠫᠣᠳᠺᠠᠰᠲ";
};

const renderPodcastLinks = (podcast) => {
  const podcastAttrs = podcast.attributes || podcast;
  return (
    <div className="flex flex-row flex-wrap items-center gap-1">
      {podcastAttrs.url_spotify_podcasts && (
        <a
          href={podcastAttrs.url_spotify_podcasts}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black px-1 py-1 text-[#1ed760] hover:opacity-80 w-full transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/icons/spotify.png"
            alt="Spotify"
            width={20}
            height={20}
          />
          <div>
            <p className="text-[16px]">Spotify</p>
          </div>
        </a>
      )}
      {podcastAttrs.url_apple_podcasts && (
        <a
          href={podcastAttrs.url_apple_podcasts}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black px-1 py-1 hover:opacity-80 w-full transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/icons/applePodcasts.png"
            alt="Apple Podcasts"
            width={20}
            height={20}
          />
          <p className="text-[16px] text-white">Apple</p>
        </a>
      )}
    </div>
  );
};
