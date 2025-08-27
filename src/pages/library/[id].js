import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import { librariesService } from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function LibraryDetail() {
  const router = useRouter();
  const { id } = router.query;

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
        // Fetch single library item
        const libraryData = await librariesService.getLibraryById(id);
        setLibrary(libraryData);

        // Fetch related library items
        const relatedData = await librariesService.getLibraries({
          pageSize: 6,
        });
        setRelatedLibraries(
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
      library.thumbnail ||
        library.cover ||
        library.image ||
        library.featured_image
    ) || "/images/news1.png";

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

          {/* Mobile File Download */}
          {library.file_url && (
            <div className="flex flex-row gap-2">
              <h3
                className="text-lg font-semibold"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                }}
              >
                ᠹᠠᠢᠯ
              </h3>
              <a
                href={library.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                ᠲᠠᠲᠠᠬᠤ
              </a>
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
                    onClick={() => router.push(`/right/libraries/${item.id}`)}
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

      {/* Desktop Layout */}
      <div className="h-full p-4 hidden sm:flex gap-7 overflow-x-auto w-auto flex-shrink-0 max-h-screen min-w-screen">
        {/* Library Title Header */}
        <StaticHeader
          image={coverImage}
          alt="Library Page Header"
          width="90rem"
          title={library.title || library.name}
        />

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

        {/* File Download Section */}
        {library.file_url && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠹᠠᠢᠯ ᠲᠠᠲᠠᠬᠤ
            </h2>
            <div className="flex items-center">
              <a
                href={library.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg"
              >
                ᠹᠠᠢᠯ ᠲᠠᠲᠠᠬᠤ
              </a>
            </div>
          </div>
        )}

        {/* Related Libraries Section */}
        {relatedLibraries && relatedLibraries.length > 0 && (
          <div className="flex gap-4">
            <h2
              className="text-2xl font-bold"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭ᠎ᠠᠯᠠᠯᠲᠠᠢ ᠨᠣᠮ
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-3 gap-4 max-w-[900px] min-h-[900px]">
              {relatedLibraries.slice(0, 9).map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-full h-full flex items-end space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => router.push(`/right/libraries/${item.id}`)}
                >
                  <h3
                    className="max-w-16 line-clamp-3 h-full text-sm"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    title={item.title || item.name}
                  >
                    {(item.title || item.name)?.length > 50
                      ? `${(item.title || item.name).substring(0, 50)}...`
                      : item.title || item.name}
                  </h3>
                  <div className="relative h-[300px] w-[300px] aspect-square shadow-md">
                    <Image
                      src={
                        getImageUrl(
                          item.thumbnail || item.cover || item.image
                        ) || "/images/news1.png"
                      }
                      alt={item.title || item.name || "Library image"}
                      fill
                      className="object-cover rounded-xl w-full h-full"
                    />
                    <Button
                      text="ᠨᠣᠮ"
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
