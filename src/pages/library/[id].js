import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import RelatedItems from "@/components/common/RelatedItems";
import { librariesService } from "@/services/apiService";
import { getImageUrl, toMongolianNumbers } from "@/utils/fetcher";

export default function LibraryDetail() {
  const router = useRouter();
  const { id } = router.query;

  const convertTextNumbers = (text) => {
    if (!text) return text;
    return String(text).replace(/\d/g, (digit) => toMongolianNumbers(digit));
  };

  const [library, setLibrary] = useState(null);
  const [relatedLibraries, setRelatedLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const libraryData = await librariesService.getLibraryById(id);
        setLibrary(libraryData);

        // Fetch related libraries - match old web approach
        const relatedData = await librariesService.getLibraries();
        console.log("ALL libraries data:", relatedData);
        const allLibraries = relatedData?.data || relatedData || [];
        const filteredData = Array.isArray(allLibraries)
          ? allLibraries.filter((item) => item.id !== parseInt(id))
          : [];
        console.log("Filtered libraries:", filteredData);
        setRelatedLibraries(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (error || !library) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠨ ᠠᠴᠢᠶᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠠᠯᠳᠠᠭ᠎ᠠ ᠭᠠᠷᠪᠠ
            </h1>
            <p className="text-gray-600 mb-4">
              ᠲᠠᠯᠪᠢᠭᠰᠠᠨ ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠨ ᠤ᠋ᠯᠠᠭ᠎ᠠ ᠦᠵᠡᠭᠳᠡᠵᠤ ᠴᠢᠳᠠᠭᠰᠠᠨ ᠦᠭᠡᠢ
            </p>
            <button
              onClick={() => router.push("/library")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠨ ᠤᠨ ᠨᠢᠭᠤᠷ ᠳ᠋ᠤ ᠪᠤᠴᠠᠬᠤ
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const coverImage =
    getImageUrl(
      library.thumbnail ||
        library.cover ||
        library.image ||
        library.featured_image
    ) || "/images/news1.png";

  const pdfUrl =
    getImageUrl(library.pdf_file) || library.file_url || library.pdf_file;

  return (
    <Layout>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full">
        {/* Mobile Hero Section */}
        <div className="relative h-[200px] w-full flex-shrink-0">
          <Image
            src={coverImage}
            alt={library.title || library.name || "Library cover"}
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
              {library.title || library.name || "ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠨ"}
            </h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile PDF Viewer */}
          {pdfUrl && (
            <div>
              <h2 className="text-xl font-bold mb-4">PDF ᠨᠣᠮ</h2>
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-[400px] border rounded"
              >
                <div className="w-full h-[400px] bg-gray-100 border rounded flex items-center justify-center">
                  <Button
                    onClick={() => window.open(pdfUrl, "_blank")}
                    text="PDF ᠲᠠᠲᠠᠬᠤ"
                    type="primary"
                  />
                </div>
              </object>
            </div>
          )}

          {/* Mobile Description */}
          {(library.description || library.content || library.introduction) && (
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
                  __html:
                    library.description ||
                    library.content ||
                    library.introduction,
                }}
              />
            </div>
          )}

          {/* Mobile Author */}
          {library.author && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠵᠣᠬᠢᠶᠠᠭᠴᠢ
              </h3>
              <p
                className="text-base text-gray-600"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                {library.author}
              </p>
            </div>
          )}

          {/* Mobile Related Libraries */}
          {relatedLibraries && relatedLibraries.length > 0 && (
            <div className="flex flex-row gap-2">
              <h2
                className="text-xl font-bold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠨᠣᠮ
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {relatedLibraries.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex gap-4 max-h-[150px] cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => router.push(`/library/${item.id}`)}
                  >
                    <h3
                      className="text-sm font-medium line-clamp-3 mb-2"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {(item.title || item.name)?.length > 40
                        ? `${(item.title || item.name).substring(0, 40)}...`
                        : item.title || item.name}
                    </h3>
                    <div className="relative aspect-square w-[150px] h-[150px] flex-shrink-0">
                      <Image
                        src={
                          getImageUrl(
                            item.thumbnail || item.cover || item.image
                          ) || "/images/news1.png"
                        }
                        alt={item.title || item.name || "Library image"}
                        fill
                        className="object-cover rounded"
                      />
                      <Button
                        text="ᠨᠣᠮ"
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

      {/* Desktop Layout - Same as Podcast */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Library Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Library Page Header"
          width="90rem"
          title={library.title || library.name}
        />

        {/* PDF Viewer Section */}
        {pdfUrl && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              PDF ᠨᠣᠮ
            </h2>
            <div className="flex items-center">
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-[800px] h-[600px] shadow-lg rounded-lg"
              >
                <div className="w-[800px] h-[600px] bg-gray-100 shadow-lg rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-4">
                      PDF viewer not supported
                    </p>
                    <Button
                      onClick={() => window.open(pdfUrl, "_blank")}
                      text="PDF ᠲᠠᠲᠠᠬᠤ"
                      type="primary"
                    />
                  </div>
                </div>
              </object>
            </div>
          </div>
        )}

        {/* Library Description */}
        {(library.description || library.content || library.introduction) && (
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
                __html:
                  library.description ||
                  library.content ||
                  library.introduction,
              }}
            />
          </div>
        )}

        {/* Author Section */}
        {library.author && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠵᠣᠬᠢᠶᠠᠭᠴᠢ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {library.author}
            </div>
          </div>
        )}

        {/* Library Index */}
        {library.index && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠳᠤᠭᠠᠷ ᠨᠣᠮᠸᠷ
            </h2>
            <div
              className="text-xl text-gray-600"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {convertTextNumbers(library.index)}
            </div>
          </div>
        )}

        {/* Related Libraries Section */}
        <RelatedItems
          items={relatedLibraries}
          sectionTitle="ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠨᠣᠮ"
          primaryButtonText="ᠨᠣᠮ"
          itemType="library"
          maxItems={3}
        />
      </div>
    </Layout>
  );
}
