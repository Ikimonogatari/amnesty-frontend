import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import StaticHeader from "@/components/common/StaticHeader";
import Image from "next/image";
import { videosService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import Button from "@/components/common/Button";

export default function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await videosService.getVideos({
          pageSize: 12,
        });
        setVideos(response?.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
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
              ᠪᠢᠳᠢᠶᠣ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p className="text-gray-600 mb-4">
              ᠪᠢᠳᠢᠶᠣ ᠨᠤᠭᠤᠳ ᠢ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
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
          image="/images/videos/header-img.jpg"
          alt="Videos Header"
          width="100%"
          title="ᠪᠢᠳᠢᠶᠣ"
        />
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <VideoCard key={video.id || index} video={video} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0">
        <StaticHeader
          image="/images/videos/header-img.jpg"
          alt="Videos Header"
          width="90rem"
          title="ᠪᠢᠳᠢᠶᠣ"
        />
        <div className="flex gap-4">
          <h1
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠪᠢᠳᠢᠶᠣ ᠨᠤᠭᠤᠳ
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1200px]">
            {videos.map((video, index) => (
              <VideoCard key={video.id || index} video={video} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Video Card Component matching old web design
function VideoCard({ video }) {
  const router = useRouter();
  const videoAttrs = video.attributes || video;
  
  const coverImage = getImageUrl(videoAttrs.cover || videoAttrs.thumbnail) || "/images/news1.png";

  const navigateToDetail = () => {
    router.push(`/videos/${video.id}`);
  };

  return (
    <div className="mx-auto">
      <div className="p-4 sm:py-5 cursor-pointer group" onClick={navigateToDetail}>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 hover:opacity-80 transition-opacity">
          <Image
            src={coverImage}
            alt={videoAttrs.title || "Video thumbnail"}
            fill
            className="object-cover"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all">
            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg 
                className="w-6 h-6 text-black ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          {/* Video Duration Badge */}
          {videoAttrs.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {videoAttrs.duration}
            </div>
          )}
        </div>

        {/* Video Title and Info */}
        <div className="pt-3">
          <h3
            className="text-sm font-medium line-clamp-2 mb-2"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
            title={videoAttrs.title}
          >
            {videoAttrs.title || "ᠪᠢᠳᠢᠶᠣ"}
          </h3>
          
          {/* Video Creation Date */}
          {(videoAttrs.createdAt || videoAttrs.publishedAt) && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(videoAttrs.createdAt || videoAttrs.publishedAt).toLocaleDateString('mn-MN')}
            </p>
          )}
        </div>
        
        {/* Action Button */}
        <div className="mt-3">
          <Button 
            text="ᠦᠵᠡᠬᠦ" 
            type="primary" 
            className="text-xs px-3 py-1"
          />
        </div>
      </div>
    </div>
  );
}
