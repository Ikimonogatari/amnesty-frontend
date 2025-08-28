import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Button from "@/components/common/Button";
import { onlineLessonsService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";
import StaticHeader from "@/components/common/StaticHeader";

export default function OnlineLessonDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [onlineLesson, setOnlineLesson] = useState(null);
  const [relatedLessons, setRelatedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("introduction");

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
              onClick={() => router.push("/online-lessons")}
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
        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Title */}
          <div className="text-center py-4">
            <h1
              className="text-lg font-bold mb-2"
              style={{
                writingMode: "horizontal-tb",
                textOrientation: "mixed",
              }}
            >
              {onlineLesson.title || "ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ"}
            </h1>
            <p
              className="text-sm text-gray-600"
              style={{
                writingMode: "horizontal-tb",
                textOrientation: "mixed",
              }}
            >
              ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ
            </p>
          </div>

          {/* Mobile Video/Content */}
          {onlineLesson.video_url && (
            <div className="w-full">
              <h3 className="text-lg font-bold mb-3">ᠰᠤᠷᠭᠠᠯ</h3>
              <div className="w-full aspect-video relative shadow-md rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={onlineLesson.video_url}
                  title={onlineLesson.title || "Online Lesson"}
                  className="border-0 w-full h-full"
                  allowFullScreen
                  frameBorder="0"
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

          {/* Mobile Academy Link */}
          {onlineLesson.amnesty_academy_url && (
            <div className="w-full">
              <h3 className="text-lg font-bold mb-3">ᠬᠢᠴᠡᠡᠯ ᠦᠵᠡᠬᠦ</h3>
              <a
                href={
                  onlineLesson.amnesty_academy_url.startsWith("http")
                    ? onlineLesson.amnesty_academy_url
                    : `https://${onlineLesson.amnesty_academy_url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                </svg>
                ᠬᠢᠴᠡᠡᠯ ᠦᠵᠡᠬᠦ
              </a>
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
                    onClick={() => router.push(`/online-lessons/${item.id}`)}
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
      <div className="max-h-screen overflow-y-hidden hidden sm:block">
        <div className="flex gap-6 p-4">
          <StaticHeader image={coverImage} title={onlineLesson.title} />

          {/* Right Content Section */}
          <div className="flex-1 flex gap-6">
            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Course Image */}
              <div className="relative w-full h-[200px] mb-4 rounded-lg overflow-hidden">
                <Image
                  src={coverImage}
                  alt={onlineLesson.title || "Online lesson cover"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Title */}
              <div className="flex justify-center mb-4">
                <h2
                  className="text-lg font-bold text-gray-900"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {onlineLesson.title || "ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ"}
                </h2>
              </div>

              {/* Course Metadata */}
              <div className="flex gap-4 mb-6 justify-center">
                <div className="flex flex-col gap-2 text-sm">
                  <div
                    className="text-gray-600"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    ID:
                  </div>
                  {onlineLesson.lesson_length && (
                    <div
                      className="text-gray-600"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠤᠷᠲᠤ:
                    </div>
                  )}
                  {onlineLesson.level && (
                    <div
                      className="text-gray-600"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠲᠦᠪᠰᠢᠨ:
                    </div>
                  )}
                  {onlineLesson.price !== undefined &&
                    onlineLesson.price !== null && (
                      <div
                        className="text-gray-600"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        ᠦᠨᠡ:
                      </div>
                    )}
                  {onlineLesson.age_rating && (
                    <div
                      className="text-gray-600"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠨᠠᠰᠤᠨ ᠤ ᠦᠦᠷᠭᠡᠭ:
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div
                    className="font-medium"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {onlineLesson.id}
                  </div>
                  {onlineLesson.lesson_length && (
                    <div
                      className="font-medium"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {onlineLesson.lesson_length}
                    </div>
                  )}
                  {onlineLesson.level && (
                    <div
                      className="font-medium"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {onlineLesson.level}
                    </div>
                  )}
                  {onlineLesson.price !== undefined &&
                    onlineLesson.price !== null && (
                      <div
                        className="font-medium"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {onlineLesson.price === 0
                          ? "ᠦᠨᠡᠭᠦᠢ"
                          : `${onlineLesson.price.toLocaleString()} ₮`}
                      </div>
                    )}
                  {onlineLesson.age_rating && (
                    <div
                      className="font-medium"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {onlineLesson.age_rating}
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-center gap-4 border-b border-gray-200 mb-4">
                  <button
                    className={`px-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "introduction"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    onClick={() => setActiveTab("introduction")}
                  >
                    ᠲᠠᠨᠢᠯᠴᠤᠭᠤᠯᠭ᠎ᠠ
                  </button>
                  <button
                    className={`px-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "content"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    onClick={() => setActiveTab("content")}
                  >
                    ᠠᠭᠤᠯᠭ᠎ᠠ
                  </button>
                  <button
                    className={`px-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "additional"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    onClick={() => setActiveTab("additional")}
                  >
                    ᠨᠡᠮᠡᠯᠲᠡ ᠮᠡᠳᠡᠭᠡ ᠮᠡᠳᠡᠯᠡᠯ
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px] flex justify-center">
                  {activeTab === "introduction" && (
                    <div className="flex flex-col gap-4 items-center">
                      {onlineLesson.description && (
                        <div
                          className="text-sm text-gray-700 max-w-[300px]"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          {onlineLesson.description}
                        </div>
                      )}

                      {/* Academy Link */}
                      {onlineLesson.amnesty_academy_url && (
                        <div className="flex justify-center">
                          <a
                            href={
                              onlineLesson.amnesty_academy_url.startsWith(
                                "http"
                              )
                                ? onlineLesson.amnesty_academy_url
                                : `https://${onlineLesson.amnesty_academy_url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded transition-colors"
                            style={{
                              writingMode: "vertical-lr",
                              textOrientation: "upright",
                            }}
                          >
                            ᠬᠢᠴᠡᠡᠯ ᠦᠵᠡᠬᠦ
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "content" && (
                    <div className="flex flex-col gap-4 items-center">
                      {onlineLesson.introduction ? (
                        <div
                          className="text-sm text-gray-700 max-w-[300px]"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: onlineLesson.introduction,
                          }}
                        />
                      ) : (
                        <p
                          className="text-sm text-gray-500"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          ᠠᠭᠤᠯᠭ᠎ᠠ ᠪᠠᠶᠢᠬᠤᠭᠦᠢ ᠪᠠᠶᠢᠨ᠎ᠠ᠃
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "additional" && (
                    <div className="flex flex-col gap-4 items-center">
                      {onlineLesson.extra_details ? (
                        <div
                          className="text-sm text-gray-700 max-w-[300px]"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: onlineLesson.extra_details,
                          }}
                        />
                      ) : (
                        <p
                          className="text-sm text-gray-500"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          ᠨᠡᠮᠡᠯᠲᠡ ᠮᠡᠳᠡᠭᠡ ᠮᠡᠳᠡᠯᠡᠯ ᠪᠠᠶᠢᠬᠤᠭᠦᠢ ᠪᠠᠶᠢᠨ᠎ᠠ᠃
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="flex-shrink-0 w-[300px] space-y-4">
              {/* Related Online Lessons Section */}
              {relatedLessons && relatedLessons.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-center mb-4">
                    <h2
                      className="text-lg font-bold text-gray-900"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠣᠨᠯᠠᠢᠨ ᠰᠤᠷᠭᠠᠯ
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {relatedLessons.slice(0, 4).map((item, index) => (
                      <div
                        key={item.id || index}
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        onClick={() =>
                          router.push(`/online-lessons/${item.id}`)
                        }
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={
                              getImageUrl(item.thumbnail || item.cover) ||
                              "/images/news1.png"
                            }
                            alt={item.title || "Online lesson image"}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-sm font-medium text-gray-900 line-clamp-3"
                            style={{
                              writingMode: "vertical-lr",
                              textOrientation: "upright",
                            }}
                            title={item.title}
                          >
                            {item.title?.length > 30
                              ? `${item.title.substring(0, 30)}...`
                              : item.title}
                          </h3>
                          {item.lesson_length && (
                            <p
                              className="text-xs text-gray-500 mt-1"
                              style={{
                                writingMode: "vertical-lr",
                                textOrientation: "upright",
                              }}
                            >
                              {item.lesson_length}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            text="ᠦᠵᠡᠬᠦ"
                            type="primary"
                            className="text-xs px-2 py-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
