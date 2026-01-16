import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import RelatedItems from "@/components/common/RelatedItems";
import { videosService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import { formatDate } from "@/utils/locale";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function VideoDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single video
        const videoData = await videosService.getVideoById(id);
        setVideo(videoData);

        // Fetch related videos - match old web approach
        const relatedData = await videosService.getVideos();
        console.log("ALL videos data:", relatedData);
        const allVideos = relatedData?.data || relatedData || [];
        const filteredData = Array.isArray(allVideos)
          ? allVideos.filter((item) => item.id !== parseInt(id))
          : [];
        console.log("Filtered videos:", filteredData);
        setRelatedVideos(filteredData);
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
  if (error || !video) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠪᠢᠳᠢᠶᠣ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠪᠢᠳᠢᠶᠣ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/videos")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠪᠢᠳᠢᠶᠣ ᠨᠢᠭᠤᠷ ᠳ᠋ᠤ ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Cover image for fallbacks if needed
  const coverImage =
    getImageUrl(video.thumbnail || video.cover || video.image) ||
    "/mng/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile StaticHeader */}
        <StaticHeader
          image={coverImage}
          alt={video.title || "ᠪᠢᠳᠢᠶᠣ"}
          title={video.title || "ᠪᠢᠳᠢᠶᠣ"}
          width="100%"
        />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Video Player */}
          {video.youtube_video_id || video.video_url ? (
            <div className="w-full aspect-video relative shadow-md rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={
                  video.youtube_video_id
                    ? `https://www.youtube.com/embed/${video.youtube_video_id}`
                    : video.video_url
                }
                title={video.title || "Video Player"}
                className="border-0 w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ) : (
            <div className="w-full aspect-video relative bg-gray-200 shadow-md rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={coverImage}
                alt={video.title || "Video cover"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-2 opacity-75"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-sm">ᠪᠢᠳᠢᠶᠣ ᠦᠭᠡᠢ</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Description */}
          {video.description && (
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
                className="text-base text-gray-800 max-h-[200px]"
                style={{
                  writingMode: "vertical-lr",
                }}
                dangerouslySetInnerHTML={{
                  __html: video.description,
                }}
              />
            </div>
          )}

          {/* Mobile Publication Date */}
          {/* {(video.createdAt || video.publishedAt) && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠣᠭᠨᠣᠭ᠎ᠠ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                {formatDate(video.createdAt || video.publishedAt)}
              </p>
            </div>
          )} */}

          {/* Mobile Duration */}
          {video.duration && (
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
                {video.duration}
              </p>
            </div>
          )}

          {/* Mobile Related Videos */}
          {relatedVideos && relatedVideos.length > 0 && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠪᠢᠳᠢᠶᠣ
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedVideos.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push(`/videos/${item.id}`)}
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
                          "/mng/images/news1.png"
                        }
                        alt={item.title || "Video image"}
                        fill
                        className="object-cover rounded"
                      />
                      <Button
                        text="ᠪᠢᠳᠢᠶᠣ"
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
        {/* Main Video Player Section */}
        <div className="flex gap-8">
          <div className="flex gap-4 items-center">
            <h1
              className="text-xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
              title={video.title}
            >
              {video.title || "ᠪᠢᠳᠢᠶᠣ"}
            </h1>
          </div>
          {video.youtube_video_id || video.video_url ? (
            <div className="w-[800px] h-[450px] relative shadow-lg rounded-lg overflow-hidden">
              <iframe
                width="800"
                height="450"
                src={
                  video.youtube_video_id
                    ? `https://www.youtube.com/embed/${video.youtube_video_id}`
                    : video.video_url
                }
                title={video.title || "Video Player"}
                className="border-0 w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          ) : (
            <div className="w-[800px] h-[450px] relative bg-gray-200 shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={coverImage}
                alt={video.title || "Video cover"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 opacity-75"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-lg">ᠪᠢᠳᠢᠶᠣ ᠦᠭᠡᠢ</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Description */}
        {video.description && (
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
                __html: video.description,
              }}
            />
          </div>
        )}

        {/* Publication Date Section */}
        {/* {(video.createdAt || video.publishedAt) && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠭᠨᠣᠭ᠎ᠠ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              {formatDate(video.createdAt || video.publishedAt)}
            </div>
          </div>
        )} */}

        {/* Duration Section */}
        {video.duration && (
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
              {video.duration}
            </div>
          </div>
        )}

        {/* Related Videos Section */}
        <RelatedItems
          items={relatedVideos}
          sectionTitle="ᠲᠤᠰ ᠮᠡᠳᠡᠵᠦ ᠦᠵᠡᠬᠦ"
          primaryButtonText="ᠪᠢᠳᠢᠶᠣ"
          itemType="videos"
          maxItems={3}
        />
      </div>
    </Layout>
  );
}
