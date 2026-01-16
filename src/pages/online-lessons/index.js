import { useState, useEffect } from "react";
import StaticHeader from "@/components/common/StaticHeader";
import RightSwiper from "@/components/right/RightSwiper";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Fetcher, { buildFetcherUrl } from "@/utils/fetcher";
import Layout from "@/components/layout/Layout";

export default function OnlineLessonsIndex() {
  const [onlineLessons, setOnlineLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch online lessons data
  useEffect(() => {
    fetchOnlineLessons();
  }, []);

  const fetchOnlineLessons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await Fetcher(
        buildFetcherUrl("/online-lessons", { populate: "deep" })
      );

      if (response?.data && Array.isArray(response.data)) {
        setOnlineLessons(response.data);
      } else {
        setOnlineLessons([]);
      }
    } catch (err) {
      setError(err);
      setOnlineLessons([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading && onlineLessons.length === 0) {
    return <LoadingSpinner size="sm" />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p style={{ writingMode: "vertical-lr" }}>
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
            title="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ"
            description="ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠨ ᠳᠠᠪᠲᠠᠨ"
            image="/mng/images/online-lessons/header-img-online-lessons.jpg"
          />

          <div className="flex-shrink-0 bg-gray-50 p-8 flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                wordBreak: "keep-all",
                lineHeight: "1.2",
              }}
            >
              ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭ᠎ᠠ:
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              style={{
                writingMode: "vertical-lr",
                wordBreak: "keep-all",
                lineHeight: "1.2",
              }}
            >
              ᠮᠣᠩᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᢈᠡᠯᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ
              ᠶ᠋ᠢᠨ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨ᠎ᠡ
              ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠠ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠲᠠᠢ᠃ᠴᠠᢈᠢᠮ
              ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠦᠷᢉᠦᠯᠵᠢᠯᠡᢈᠦ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠠ᠋ᠴᠠ ᠬᠠᠮᠢᠶᠠᠷᠴᠤ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠣᠯᠭᠤᠨ᠎ᠠ᠃
            </p>
            <h4
              className="text-lg font-bold"
              style={{
                writingMode: "vertical-lr",
                wordBreak: "keep-all",
              }}
            >
              ᠶᠠᠭ ᠣᠳᠤ ᠦᠨ᠎ᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠳ᠋ᠤ ᠬᠠᠮᠤᠷᠤᠭᠳᠠᠵᠤ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᢉᠡᠷᠡᠢ᠃
            </h4>
          </div>

          {/* Desktop Swiper Layout */}
          <div className="flex-1 p-8 overflow-x-auto">
            <RightSwiper
              title="ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ:"
              description="ᠮᠣᠩᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᢈᠡᠯᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨ᠎ᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠠ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠲᠠᠢ᠃ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠦᠷᢉᠦᠯᠵᠢᠯᠡᢈᠦ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠠ᠋ᠴᠠ ᠬᠠᠮᠢᠶᠠᠷᠴᠤ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠣᠯᠭᠤᠨ᠎ᠠ᠃"
              sectionTitle="ᠣᠨᠴᠠᠯᠠᠬᠤ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ"
              data={onlineLessons}
              needSubSection={false}
              needReadButton={false}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <StaticHeader
            title="ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠤ"
            description="ᠤᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠤ ᠦᠨ ᠳᠠᠪᠲᠠᠨ"
            image="/mng/images/online-lessons/header-img-online-lessons.jpg"
          />

          <div className="flex-shrink-0 bg-gray-50 p-4 flex gap-4">
            <h2
              className="text-lg font-bold"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭ᠎ᠠ:
            </h2>
            <p
              className="text-gray-700 leading-relaxed max-h-[400px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠮᠣᠩᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᢈᠡᠯᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ
              ᠶ᠋ᠢᠨ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨ᠎ᠡ
              ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠠ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠲᠠᠢ᠃ᠴᠠᢈᠢᠮ
              ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠦᠷᢉᠦᠯᠵᠢᠯᠡᢈᠦ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠠ᠋ᠴᠠ ᠬᠠᠮᠢᠶᠠᠷᠴᠤ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠣᠯᠭᠤᠨ᠎ᠠ᠃
            </p>
            <h4
              className="text-base font-bold max-h-[400px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠶᠠᠭ ᠣᠳᠤ ᠦᠨ᠎ᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠳ᠋ᠤ ᠬᠠᠮᠤᠷᠤᠭᠳᠠᠵᠤ᠂ ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᢉᠡᠷᠡᠢ᠃
            </h4>
          </div>

          <div className="p-4 overflow-x-auto">
            {/* Mobile Swiper Layout */}
            <RightSwiper
              title="ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠲᠠᠨᠢᠯᠴᠠᠭᠤᠯᠭ᠎ᠠ:"
              description="ᠮᠣᠩᠭᠣᠯ ᠪᠣᠯᠤᠨ ᠪᠤᠰᠤᠳ ᠒᠐ ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᢈᠡᠯᠡ ᠳᠡᢉᠡᠷ᠎ᠡ ᠰᠤᠳᠤᠯᠬᠤ ᠪᠣᠯᠤᠮᠵᠢᠲᠠᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠰᠠᠨᠠᠯ ᠪᠣᠯᠭᠠᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ᠤᠭ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠨᠢ ᠦᠨ᠎ᠡ ᠲᠥᠯᠦᠪᠦᠷᠢ ᠦᢉᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠠ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠲ ᠲᠦ ᠬᠣᠯᠪᠤᠭᠳᠠᠭᠰᠠᠨ ᠪᠠᠶᠢᠬᠤ ᠳ᠋ᠤ ᠯᠠ ᠬᠠᠩᠭᠠᠯᠲᠠᠲᠠᠢ᠃ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠦᠷᢉᠦᠯᠵᠢᠯᠡᢈᠦ ᠬᠤᠭᠤᠴᠠᠭᠠᠨ ᠠ᠋ᠴᠠ ᠬᠠᠮᠢᠶᠠᠷᠴᠤ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠣᠯᠭᠤᠨ᠎ᠠ᠃"
              sectionTitle="ᠣᠨᠴᠠᠯᠠᠬᠤ ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ"
              data={onlineLessons}
              needSubSection={false}
              needReadButton={false}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
