import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import StaticHeader from "@/components/common/StaticHeader";
import Image from "next/image";
import { podcastsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function PodcastsPage() {
  const router = useRouter();
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await podcastsService.getPodcasts({
          pageSize: 12,
        });
        setPodcasts(response?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  // Loading state
  if (isLoading) {
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
              ᠫᠣᠳᠺᠠᠰᠲ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p className="text-gray-600 mb-4">
              ᠫᠣᠳᠺᠠᠰᠲ ᠤᠳ ᠢ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
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
          image="/images/podcasts/header-img.jpg"
          alt="Podcasts Header"
          width="100%"
          title="ᠫᠣᠳᠺᠠᠰᠲ"
        />
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {podcasts.map((podcast, index) => (
              <PodcastCard key={podcast.id || index} podcast={podcast} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0">
        <StaticHeader
          image="/images/podcasts/header-img.jpg"
          alt="Podcasts Header"
          width="90rem"
          title="ᠫᠣᠳᠺᠠᠰᠲ"
        />
        <div className="flex gap-4">
          <h1
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠫᠣᠳᠺᠠᠰᠲ ᠨᠤᠭᠤᠳ
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px]">
            {podcasts.map((podcast, index) => (
              <PodcastCard key={podcast.id || index} podcast={podcast} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Podcast Card Component matching old web design
function PodcastCard({ podcast }) {
  const router = useRouter();
  const podcastAttrs = podcast.attributes || podcast;

  const coverImage = getImageUrl(podcastAttrs.cover) || "/images/news1.png";

  const navigateToDetail = () => {
    router.push(`/podcasts/${podcast.id}`);
  };

  return (
    <div className="mx-auto">
      <div className="p-4 sm:py-5 cursor-pointer" onClick={navigateToDetail}>
        <div
          className="bg-no-repeat aspect-square w-full rounded bg-gray-200 bg-cover hover:opacity-80 transition-opacity"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <p className="mx-auto w-[188px] pt-28 text-center text-[24px] text-white">
            {/* Optional overlay text */}
          </p>
        </div>

        {/* External Links - Spotify & Apple */}
        <div className="mt-3 grid w-full grid-cols-2 gap-1">
          {podcastAttrs.url_spotify_podcasts && (
            <a
              href={podcastAttrs.url_spotify_podcasts}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black px-1 py-1 text-[#1ed760] hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/icons/spotify.png"
                className="w-[20px]"
                alt="Spotify"
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
              className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/icons/applePodcasts.png"
                className="w-[20px]"
                alt="Apple Podcasts"
              />
              <div className="flex h-[32px] flex-col justify-center">
                <p className="text-[16px] text-white">Apple</p>
              </div>
            </a>
          )}
        </div>

        {/* Podcast Title */}
        <div className="h-[50px] overflow-hidden pt-3">
          <p
            className="text-sm font-medium line-clamp-2"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            {podcastAttrs.title || "ᠫᠣᠳᠺᠠᠰᠲ"}
          </p>
        </div>
      </div>
    </div>
  );
}
