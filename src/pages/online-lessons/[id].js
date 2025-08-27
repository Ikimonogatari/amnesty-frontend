import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import { onlineLessonsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function OnlineLessonDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [onlineLesson, setOnlineLesson] = useState(null);
  const [relatedLessons, setRelatedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single online lesson
        const lessonData = await onlineLessonsService.getOnlineLessonById(id);
        setOnlineLesson(lessonData);

        // Fetch related online lessons
        const relatedData = await onlineLessonsService.getOnlineLessons({
          pageSize: 6,
        });
        setRelatedLessons(
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
  if (error || !onlineLesson) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p className="text-gray-600 mb-4">
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/right")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ᠡᠷᠬᠡ ᠮᠡᠳᠡᠬᠦ ᠨᠢᠭᠤᠷ ᠳ᠋ᠤ ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const coverImage =
    getImageUrl(
      onlineLesson.thumbnail || onlineLesson.cover || onlineLesson.image
    ) || "/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile Hero Section */}
        <div className="relative h-[200px] w-full flex-shrink-0">
          <Image
            src={coverImage}
            alt={onlineLesson.title || "Online lesson cover"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="p-4 text-white text-lg font-bold text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {onlineLesson.title || "ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ"}
            </h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Video/Content */}
          {onlineLesson.video_url && (
            <div>
              <h2 className="text-xl font-bold mb-4">ᠰᠤᠷᠭᠠᠯ</h2>
              <div className="w-full aspect-video relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={onlineLesson.video_url}
                  title="Online Lesson"
                  className="border-0 rounded"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Mobile Description */}
          {onlineLesson.description && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold mb-4"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠲᠠᠢᠯᠪᠤᠷᠢ
              </h2>
              <div
                className="text-base text-gray-800"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
                dangerouslySetInnerHTML={{
                  __html: onlineLesson.description,
                }}
              />
            </div>
          )}

          {/* Mobile Duration */}
          {onlineLesson.lesson_length && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠤᠷᠲᠤ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {onlineLesson.lesson_length}
              </p>
            </div>
          )}

          {/* Mobile Level */}
          {onlineLesson.level && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠲᠦᠪᠰᠢᠨ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {onlineLesson.level}
              </p>
            </div>
          )}

          {/* Mobile Related Lessons */}
          {relatedLessons && relatedLessons.length > 0 && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠰᠤᠷᠭᠠᠯ
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedLessons.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() =>
                      router.push(`/right/online-lessons/${item.id}`)
                    }
                  >
                    <h3
                      className="text-sm font-medium line-clamp-3 mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
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
                        alt={item.title || "Online lesson image"}
                        fill
                        className="object-cover rounded"
                      />
                      <Button
                        text="ᠰᠤᠷᠭᠠᠯ"
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
        {/* Online Lesson Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Online Lesson Page Header"
          width="90rem"
          title={onlineLesson.title}
        />

        {/* Video/Content Section */}
        {onlineLesson.video_url && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠰᠤᠷᠭᠠᠯ
            </h2>
            <div className="w-[600px] h-[315px] relative">
              <iframe
                width="600"
                height="315"
                src={onlineLesson.video_url}
                title="Online Lesson"
                className="border-0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Lesson Description */}
        {onlineLesson.description && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠲᠠᠢᠯᠪᠤᠷᠢ
            </h2>
            <div
              className="text-lg text-gray-800 max-w-[600px]"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
              dangerouslySetInnerHTML={{
                __html: onlineLesson.description,
              }}
            />
          </div>
        )}

        {/* Duration Section */}
        {onlineLesson.lesson_length && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠤᠷᠲᠤ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {onlineLesson.lesson_length}
            </div>
          </div>
        )}

        {/* Level Section */}
        {onlineLesson.level && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠲᠦᠪᠰᠢᠨ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {onlineLesson.level}
            </div>
          </div>
        )}

        {/* Related Lessons Section */}
        {relatedLessons && relatedLessons.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠰᠤᠷᠭᠠᠯ
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-3 gap-4 max-w-[900px] min-h-[900px]">
              {relatedLessons.slice(0, 9).map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-full h-full flex items-end space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() =>
                    router.push(`/right/online-lessons/${item.id}`)
                  }
                >
                  <h3
                    className="max-w-16 line-clamp-3 h-full text-sm"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    title={item.title}
                  >
                    {item.title?.length > 50
                      ? `${item.title.substring(0, 50)}...`
                      : item.title}
                  </h3>
                  <div className="relative h-[300px] w-[300px] aspect-square shadow-md">
                    <Image
                      src={
                        getImageUrl(item.thumbnail || item.cover) ||
                        "/images/news1.png"
                      }
                      alt={item.title || "Online lesson image"}
                      fill
                      className="object-cover rounded-xl w-full h-full"
                    />
                    <Button
                      text="ᠰᠤᠷᠭᠠᠯ"
                      type="primary"
                      className="absolute top-0 right-0 text-black"
                    />
                  </div>
                  <Button
                    text="ᠤᠩᠰᠢᠬᠤ"
                    type="secondary"
                    className="text-black h-48"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
