import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import RelatedItems from "@/components/common/RelatedItems";
import { lessonsService } from "@/services/apiService";
import { getImageUrl, toMongolianNumbers } from "@/utils/fetcher";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function LessonDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Helper function to convert numbers within text to Mongolian numerals
  const convertTextNumbers = (text) => {
    if (!text) return text;
    return String(text).replace(/\d/g, (digit) => toMongolianNumbers(digit));
  };

  const [lesson, setLesson] = useState(null);
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
        // Fetch single lesson
        const lessonData = await lessonsService.getLessonById(id);
        setLesson(lessonData);

        // Fetch related lessons - match old web approach
        const relatedData = await lessonsService.getLessons();
        console.log("ALL lessons data:", relatedData);
        const allLessons = relatedData?.data || relatedData || [];
        const filteredData = Array.isArray(allLessons)
          ? allLessons.filter((item) => item.id !== parseInt(id))
          : [];
        console.log("Filtered lessons:", filteredData);
        setRelatedLessons(filteredData);
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
    return <FullScreenLoader />;
  }

  // Error state
  if (error || !lesson) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl font-bold text-red-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠰᠤᠷᠭᠠᠯ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p
              className="text-gray-600 mb-4"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠰᠤᠷᠭᠠᠯ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/lessons")}
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
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
    getImageUrl(lesson.thumbnail || lesson.cover || lesson.image) ||
    "/images/news1.png";

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        <StaticHeader
          image={coverImage}
          alt="Lesson Page Header"
          width="90rem"
          title={lesson.title}
        />

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Course Info Section */}
          <div className="flex flex-col items-center gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            {/* Course Image */}
            <Image
              src={coverImage}
              alt={lesson.title || "Lesson cover"}
              height={120}
              width={200}
              className="w-[200px] h-[120px] object-contain"
            />

            {/* Course Title */}
            <div className="flex justify-center mb-2">
              <h2
                className="text-lg font-bold text-gray-900 max-h-[300px]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {lesson.title || "ᠰᠤᠷᠭᠠᠯ"}
              </h2>
            </div>

            {/* Course Metadata */}
            <div className="flex flex-row gap-4 justify-center">
              <div
                className="text-gray-600 text-sm"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ID: {toMongolianNumbers(lesson.id)}
              </div>
              {lesson.lesson_length && (
                <div
                  className="text-gray-600 text-sm"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠤᠭᠠᠴᠠᠭ᠎ᠠ: {convertTextNumbers(lesson.lesson_length)}
                </div>
              )}
              {lesson.seats && (
                <div
                  className="text-gray-600 text-sm"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠬᠦᠮᠦᠨ ᠦ ᠲᠣᠭ᠎ᠠ: {toMongolianNumbers(lesson.seats)}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Tabs Section */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            {/* Mobile Tab Buttons */}
            <div className="flex flex-row justify-center gap-4 mb-4 border-b border-gray-200 pb-2">
              <button
                className={`px-2 py-1 text-xs font-medium border-b-2 transition-colors ${
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
                className={`px-2 py-1 text-xs font-medium border-b-2 transition-colors ${
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
                className={`px-2 py-1 text-xs font-medium border-b-2 transition-colors ${
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

            {/* Mobile Tab Content */}
            <div className="min-h-[150px] max-h-[300px] overflow-hidden flex justify-center">
              {activeTab === "introduction" && (
                <div className="flex flex-col gap-4 items-center w-full h-full">
                  {lesson.description && (
                    <div className="flex-1 overflow-x-auto overflow-y-hidden max-w-[280px] w-full">
                      <div
                        className="text-sm text-gray-700 break-words h-[200px]"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: lesson.description,
                        }}
                      />
                    </div>
                  )}

                  {/* Mobile Registration Link - Always Visible */}
                  {lesson.external_link && (
                    <div className="flex-shrink-0 mt-2">
                      <Button
                        onClick={() => {
                          window.open(
                            lesson.external_link.startsWith("http")
                              ? lesson.external_link
                              : `https://${lesson.external_link}`,
                            "_blank"
                          );
                        }}
                        text="ᠬᠢᠴᠡᠡᠯᠳ ᠪᠦᠷᠲᠦᠭᠦᠯᠬᠦ"
                        type="primary"
                        className="whitespace-nowrap rounded min-h-max transition-colors text-xs px-2 py-1"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === "content" && (
                <div className="flex justify-center">
                  {lesson.content ? (
                    <div
                      className="text-sm text-gray-700 break-words"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: lesson.content,
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
                <div className="flex justify-center">
                  {lesson.extra_details ? (
                    <div
                      className="text-sm text-gray-700 break-words"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: lesson.extra_details,
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

          {/* Mobile Related Lessons */}
          {relatedLessons && relatedLessons.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-center mb-4">
                <h2
                  className="text-lg font-bold text-gray-900"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠰᠤᠷᠭᠠᠯ
                </h2>
              </div>
              <div className="space-y-3">
                {relatedLessons.slice(0, 4).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => router.push(`/lessons/${item.id}`)}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={
                          getImageUrl(item.thumbnail || item.cover) ||
                          "/images/news1.png"
                        }
                        alt={item.title || "Lesson image"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-medium text-gray-900 line-clamp-2"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        title={item.title}
                      >
                        {item.title?.length > 25
                          ? `${item.title.substring(0, 25)}...`
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
                          {convertTextNumbers(item.lesson_length)}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        text="ᠦᠵᠡᠬᠦ"
                        type="primary"
                        className="text-xs px-1 py-0.5"
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
        {/* Lesson Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Lesson Page Header"
          width="90rem"
          title={lesson.title}
        />

        {/* Content Section */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Main Content */}
          <div className="flex flex-row items-center gap-6 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Course Image */}
              <Image
                src={coverImage}
                alt={lesson.title || "Lesson cover"}
                height={240}
                width={120}
                className="w-[240px] h-[140px] object-contain"
              />

              {/* Course Title */}
              <div className="flex justify-center gap-4 mb-4">
                <h2
                  className="text-lg font-bold text-gray-900"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  {lesson.title || "ᠰᠤᠷᠭᠠᠯ"}
                </h2>
                {/* Course Metadata - Matching Old Web */}
                <div className="flex gap-2 justify-center">
                  <div className="flex flex-row gap-2 text-sm">
                    <div
                      className="text-gray-600"
                      style={{
                        writingMode: "vertical-lr",
                      }}
                    >
                      ID: {toMongolianNumbers(lesson.id)}
                    </div>

                    {lesson.lesson_length && (
                      <div
                        className="text-gray-600"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        ᠬᠤᠭᠠᠴᠠᠭ᠎ᠠ: {convertTextNumbers(lesson.lesson_length)}
                      </div>
                    )}
                    {lesson.seats && (
                      <div
                        className="text-gray-600"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        ᠬᠦᠮᠦᠨ ᠦ ᠲᠣᠭ᠎ᠠ: {toMongolianNumbers(lesson.seats)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="gap-6 h-full flex justify-center items-center">
              {/* Tab Buttons */}
              <div className="flex flex-col justify-start gap-2 border-r border-gray-200 pr-4">
                <button
                  className={`px-4 py-2 text-sm font-medium border-r-2 transition-colors ${
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
                  className={`px-4 py-2 text-sm font-medium border-r-2 transition-colors ${
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
                  className={`px-4 py-2 text-sm font-medium border-r-2 transition-colors ${
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
              <div className="flex justify-center items-center h-[500px]">
                {activeTab === "introduction" && (
                  <div className="flex flex-row gap-4 items-center max-h-[calc(100vh-120px)]">
                    {lesson.description && (
                      <div
                        className="text-sm text-gray-700 break-words"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: lesson.description,
                        }}
                      />
                    )}

                    {/* Registration Link */}
                    {lesson.external_link && (
                      <Button
                        onClick={() => {
                          window.open(
                            lesson.external_link.startsWith("http")
                              ? lesson.external_link
                              : `https://${lesson.external_link}`,
                            "_blank"
                          );
                        }}
                        text="ᠬᠢᠴᠡᠡᠯᠳ ᠪᠦᠷᠲᠦᠭᠦᠯᠬᠦ"
                        type="primary"
                        className="whitespace-nowrap rounded transition-colors"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      />
                    )}
                  </div>
                )}

                {activeTab === "content" && (
                  <div className="flex flex-col gap-4 items-center">
                    {lesson.content ? (
                      <div
                        className="text-sm text-gray-700 max-w-[250px] break-words"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: lesson.content,
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
                    {lesson.extra_details ? (
                      <div
                        className="text-sm text-gray-700 break-words"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: lesson.extra_details,
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
          {/* Related Lessons Section */}
          <RelatedItems
            items={relatedLessons}
            sectionTitle="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠰᠤᠷᠭᠠᠯ"
            primaryButtonText="ᠬᠢᠴᠡᠡᠯ"
            itemType="lessons"
            maxItems={3}
          />
        </div>
      </div>
    </Layout>
  );
}
