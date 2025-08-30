import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import apiService from "@/services/apiService";
import { getImageUrl, formatMongolianDate } from "@/utils/fetcher";
import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import { Share2, Facebook, Download } from "lucide-react";
import FullScreenLoader from "@/components/common/FullScreenLoader";

export default function SingleStatement() {
  const router = useRouter();
  const { id } = router.query;

  const [statement, setStatement] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch single statement
        const statementData = await apiService.statements.getStatementById(id);
        setStatement(statementData);

        // Fetch recommended statements
        const recommendedData = await apiService.statements.getStatements({
          "pagination[limit]": 6,
          populate: "deep",
          "sort[id]": "desc",
          "filters[id][$ne]": id, // Exclude current statement
        });
        setRecommended(
          Array.isArray(recommendedData)
            ? recommendedData
            : recommendedData?.data || []
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleShare = (platform) => {
    const url = `${window.location.origin}/news/statement/${id}`;
    const title =
      statement?.title || statement?.attributes?.title || "ᠮᠡᠳᠡᠭᠳᠡᠯ";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "general":
        if (navigator.share) {
          navigator.share({
            title,
            url,
          });
        } else {
          navigator.clipboard.writeText(url);
          alert("ᠯᠢᠩᠺ ᠬᠤᠪᠢᠶᠠᠯᠠᠪᠠ");
        }
        break;
    }
  };

  const handleDownload = () => {
    const pdfUrl =
      statement?.pdf_file?.url ||
      statement?.attributes?.pdf_file?.data?.attributes?.url;
    if (pdfUrl) {
      const fullUrl = pdfUrl.startsWith("http") ? pdfUrl : `https://${pdfUrl}`;
      window.open(fullUrl, "_blank");
    }
  };

  // Loading state
  if (isLoading) {
    return <FullScreenLoader />;
  }

  // Error state
  if (error || !statement) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600">
            <p
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠮᠡᠳᠡᠭᠳᠡᠯ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </p>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const publishedAt = formatMongolianDate(
    statement.publishedAt || statement.attributes?.publishedAt
  );
  const coverImage =
    getImageUrl(statement.cover || statement.attributes?.cover) ||
    "/images/news1.png";
  const title = statement.title || statement.attributes?.title || "";
  const description =
    statement.description || statement.attributes?.description || "";
  const author = statement.author || statement.attributes?.author || "";
  const hasPdf = !!(statement.pdf_file || statement.attributes?.pdf_file);

  return (
    <Layout>
      <div className="sm:h-screen flex flex-col overflow-hidden flex-1">
        {/* Hero Section */}
        <div className="relative h-[200px] sm:h-[300px] w-full flex-shrink-0">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="p-4 text-white text-[10px] sm:text-lg md:text-xl lg:text-2xl font-bold text-start max-h-[150px] sm:max-h-[250px] w-full flex justify-center items-center overflow-x-auto"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Content and Sidebar Container */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 overflow-hidden">
          {/* Content Section */}
          <div className="sm:flex-1 p-4">
            <div className="flex flex-row gap-2 sm:gap-10">
              {/* Info Header */}
              <div className="flex flex-row items-start justify-between gap-4 flex-shrink-0">
                <div className="flex flex-col items-start gap-4">
                  <div
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-sm"
                  >
                    ᠮᠡᠳᠡᠭᠳᠡᠯ
                  </div>
                  <button
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-2 bg-[#385898] text-white px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold hover:bg-[#2d4373] transition-colors"
                  >
                    <Facebook size={16} />
                    ᠬᠤᠪᠢᠶᠠᠯᠴᠠᠬᠤ
                  </button>
                  <button
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    onClick={() => handleShare("general")}
                    className="flex items-center gap-2 bg-gray-600 text-white px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold hover:bg-gray-700 transition-colors"
                  >
                    <Share2 size={16} />
                    ᠬᠤᠪᠢᠶᠠᠯᠠᠬᠤ
                  </button>
                  {hasPdf && (
                    <button
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-green-600 text-white px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Download size={16} />
                      ᠳᠠᠭᠠᠭᠤᠯᠬᠤ
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="text-xs sm:text-lg font-semibold"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {publishedAt}
                  </div>
                  {author && (
                    <div
                      className="text-xs sm:text-sm text-gray-600"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {author}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-1 overflow-x-auto max-h-[300px] sm:max-h-max">
                {/* Main Content */}
                <div
                  className="prose prose-lg max-w-none text-xs sm:text-base"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </div>
          </div>

          {/* Recommended Sidebar */}
          <div className="w-full sm:w-20">
            {recommended.length > 0 && (
              <div className="bg-gray-100 w-full h-full p-4 flex flex-row sm:flex-col items-start sm:items-center gap-4">
                <h3
                  className="text-xs sm:text-xl font-semibold"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠰᠠᠨᠠᠭᠤᠯᠬᠤ ᠮᠡᠳᠡᠭᠳᠡᠯ
                </h3>
                <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible">
                  {recommended.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 cursor-pointer hover:bg-gray-50 transition-colors max-w-10 flex-shrink-0"
                      onClick={() => router.push(`/news/statement/${item.id}`)}
                    >
                      <p
                        className="text-[10px] sm:text-sm font-medium"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {(item.title || item.attributes?.title)?.length > 60
                          ? `${(item.title || item.attributes?.title).substring(
                              0,
                              60
                            )}...`
                          : item.title || item.attributes?.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
