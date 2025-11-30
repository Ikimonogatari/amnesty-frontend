import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import { podcastsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function PodcastDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [podcast, setPodcast] = useState(null);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single podcast
        const podcastData = await podcastsService.getPodcastById(id);
        setPodcast(podcastData);

        // Fetch related podcasts
        const relatedData = await podcastsService.getPodcasts({
          pageSize: 6,
        });
        setRelatedPodcasts(
          relatedData?.data?.filter((item) => item.id !== parseInt(id)) || []
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <FullScreenLoader />
      </Layout>
    );
  }

  // Error state
  if (error || !podcast) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠫᠣᠳᠻᠠᠰᠲ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠫᠣᠳᠻᠠᠰᠲ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/podcasts")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠫᠣᠳᠺᠠᠰᠲ ᠨᠢᠭᠤᠷ ᠳ᠋ᠤ ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const coverImage =
    getImageUrl(podcast.thumbnail || podcast.cover || podcast.image) ||
    "/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile StaticHeader */}
        <StaticHeader
          image={coverImage}
          alt={podcast.title || "ᠫᠣᠳᠻᠠᠰᠲ"}
          title={podcast.title || "ᠫᠣᠳᠻᠠᠰᠲ"}
          width="100%"
        />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Audio Player */}
          {podcast.audio_url && (
            <div>
              <h2 className="text-xl font-bold mb-4">ᠠᠦᠳᠢᠶᠣ</h2>
              <audio controls className="w-full">
                <source src={podcast.audio_url} type="audio/mpeg" />
                ᠲᠠᠨ ᠤ᠋ ᠪᠷᠠᠤᠵᠸᠷ ᠠᠦᠳᠢᠶᠣ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᠬᠦ ᠦᠭᠡᠢ᠃
              </audio>
            </div>
          )}

          {/* Mobile Description */}
          {podcast.description && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠲᠠᠢᠯᠪᠤᠷᠢ
              </h2>
              <div
                className="text-base text-gray-800"
                style={{
                  writingMode: "vertical-lr",
                }}
                dangerouslySetInnerHTML={{
                  __html: podcast.description,
                }}
              />
            </div>
          )}

          {/* Mobile Duration */}
          {podcast.duration && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠤᠷᠲᠤ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {podcast.duration}
              </p>
            </div>
          )}

          {/* Mobile External Links - Spotify & Apple */}
          {(podcast.url_spotify_podcasts || podcast.url_apple_podcasts) && (
            <div className="flex flex-row items-start gap-4">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠴᠠᠬᠢᠮ ᠳᠤ ᠰᠣᠨᠣᠰᠬᠤ
              </h3>
              <div className="flex gap-2">
                {podcast.url_spotify_podcasts && (
                  <a
                    href={podcast.url_spotify_podcasts}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black px-3 py-2 text-[#1ed760] hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/icons/spotify.png"
                      className="w-[20px]"
                      alt="Spotify"
                    />
                    <span className="text-[16px]">Spotify</span>
                  </a>
                )}
                {podcast.url_apple_podcasts && (
                  <a
                    href={podcast.url_apple_podcasts}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 rounded-lg border-2 border-black bg-black px-3 py-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src="/icons/applePodcasts.png"
                      className="w-[20px]"
                      alt="Apple Podcasts"
                    />
                    <span className="text-[16px] text-white">Apple</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Mobile Host */}
          {podcast.host && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠠᠴᠢᠶᠠᠯᠠᠭᠴᠢ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {podcast.host}
              </p>
            </div>
          )}

          {/* Mobile Related Podcasts */}
          {relatedPodcasts && relatedPodcasts.length > 0 && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠫᠣᠳᠻᠠᠰᠲ
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedPodcasts.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push(`/podcasts/${item.id}`)}
                  >
                    <h3
                      className="text-sm font-medium line-clamp-3 mb-2"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      {item.title?.length > 40
                        ? `${item.title.substring(0, 40)}...`
                        : item.title}
                    </h3>
                    <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                      <Image
                        src={
                          getImageUrl(item.thumbnail || item.cover) ||
                          "/images/news1.png"
                        }
                        alt={item.title || "Podcast image"}
                        fill
                        className="object-cover rounded"
                      />
                      <Button
                        text="ᠫᠣᠳᠻᠠᠰᠲ"
                        type="primary"
                        className="absolute -top-1 -right-1 text-black text-xs px-1 py-0.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Podcast Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Podcast Page Header"
          width="90rem"
          title={podcast.title}
        />

        {/* Audio Player Section */}
        {podcast.audio_url && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠠᠦᠳᠢᠶᠣ
            </h2>
            <div className="flex items-center">
              <audio controls className="w-[600px]">
                <source src={podcast.audio_url} type="audio/mpeg" />
                ᠲᠠᠨ ᠤ᠋ ᠪᠷᠠᠤᠵᠸᠷ ᠠᠦᠳᠢᠶᠣ ᠶ᠋ᠢ ᠳᠡᠮᠵᠢᠬᠦ ᠦᠭᠡᠢ᠃
              </audio>
            </div>
          </div>
        )}

        {/* Podcast Description */}
        {podcast.description && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠲᠠᠢᠯᠪᠤᠷᠢ
            </h2>
            <div
              className="text-lg text-gray-800 max-w-[600px]"
              style={{
                writingMode: "vertical-lr",
              }}
              dangerouslySetInnerHTML={{
                __html: podcast.description,
              }}
            />
          </div>
        )}

        {/* Duration Section */}
        {podcast.duration && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠤᠷᠲᠤ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {podcast.duration}
            </div>
          </div>
        )}

        {/* Host Section */}
        {podcast.host && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠠᠴᠢᠶᠠᠯᠠᠭᠴᠢ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {podcast.host}
            </div>
          </div>
        )}

        {/* Desktop External Links - Spotify & Apple */}
        {(podcast.url_spotify_podcasts || podcast.url_apple_podcasts) && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠴᠠᠬᠢᠮ ᠳᠤ ᠰᠣᠨᠣᠰᠬᠤ
            </h2>
            <div className="flex flex-col gap-4 items-start">
              {podcast.url_spotify_podcasts && (
                <a
                  href={podcast.url_spotify_podcasts}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[120px] flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-4 py-3 text-[#1ed760] hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/spotify.png"
                    className="w-[24px]"
                    alt="Spotify"
                  />
                  <span className="text-[18px] font-medium">Spotify</span>
                </a>
              )}
              {podcast.url_apple_podcasts && (
                <a
                  href={podcast.url_apple_podcasts}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[120px] flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-4 py-3 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/applePodcasts.png"
                    className="w-[24px]"
                    alt="Apple Podcasts"
                  />
                  <span className="text-[18px] font-medium text-white">
                    Apple
                  </span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
