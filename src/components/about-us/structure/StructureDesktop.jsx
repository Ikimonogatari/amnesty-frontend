import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import SectionTitle from "@/components/common/SectionTitle";
import StructureDiagram from "./StructureDiagram";
import { useState, useEffect } from "react";
import apiService from "@/services/apiService";
import { getImageUrl } from "@/utils/fetcher";

export default function StructureDesktop() {
  // State for API data
  const [librariesData, setLibrariesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch libraries data on component mount (matching old web functionality)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const libraries = await apiService.libraries.getLibraries({
          page: 1,
          pageSize: 20,
          sort: "publishedAt:desc",
        });

        const librariesArray = Array.isArray(libraries)
          ? libraries
          : libraries?.data || [];
        setLibrariesData(librariesArray);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-full hidden sm:flex gap-20 w-auto flex-shrink-0 min-w-screen">
      <StaticHeader
        image="/images/aboutSub1/organization_cover.jpg"
        alt="Structure Page Header"
        width="90rem"
        title="ᠪᠠᠶᠢᠭᠤᠯᠤᠯ ᠤᠨ ᠪᠦᠲᠦᠴᠡ"
      />

      <div className="flex gap-12 p-4 h-full">
        <div className="flex gap-10">
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠪᠣᠯ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠠᠯᠠᠭᠠᠷᢈᠢ ᠳᠠᠭᠤ
            ᠬᠣᠭᠤᠯᠠᠢ ᠶᠤᠮ᠃ ᠪᠢᠳᠡ ᠖᠐ ᠭᠠᠷᠤᠢ ᠵᠢᠯ ᠦ᠋ᠨ ᠲᠤᠷᠰᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ᠂
            ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠬᠠᠤᠯᠢ ᠲᠣᠭᠲᠠᠭᠠᠮᠵᠢ᠂ ᠰᠲ᠋ᠠᠨ᠋ᠳᠠᠷᠲ ᠤ᠋ᠨ
            ᠲᠠᠯᠠᠭᠠᠷ ᠨᠠᠶᠢᠳᠠᠪᠤᠷᠢᠲᠠᠢ᠂ ᠦᠨᠡᠨ ᠵᠥᠪ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠷ ᠳᠡᠯᠡᢈᠡᠢ ᠨᠡᠶᠢᠲᠡ
            ᢈᠦᠷᢉᠡᠰ ᠢ᠋ᠶᠡᠷ ᠢᠷᠡᢉᠰᠡᠨ᠃
          </h2>
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠷᢈᠡ ᠪᠠᠷᠢᠭᠴᠢᠳ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠵᠦᠢ᠂ ᢈᠡᠮ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠶ᠋ᠢ ᢈᠦᠨᠳᠦᠳᢈᠡᠳᠡᢉ᠂
            ᠬᠠᠷᠢᠭᠤᠴᠠᠯᠭ᠎ᠠ ᠪᠠᠨ ᢈᠦᠯᠢᠶᠡᠳᠡᢉ᠂ ᠠᠮᠠᠯᠠᠯᠲᠠ ᠳ᠋ᠤ ᠪᠠᠨ ᢈᠦᠷᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ
            ᠶ᠋ᠢ ᠪᠤᠢ ᠪᠣᠯᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠪᠢᠳᠡ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ᠃ ᠪᠢᠳᠡ ᠠᠯᠢᠪᠠ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ
            ᠭᠠᠵᠠᠷ᠂ ᠤᠯᠤᠰ ᠲᠥᠷᠦ ᠶ᠋ᠢᠨ ᠦᠵᠡᠯ ᠰᠤᠷᠲᠠᠯ᠂ ᠡᠳ᠋ ᠦ᠋ᠨ ᠵᠠᠰᠠᠭ ᠤ᠋ᠨ ᠠᠰᠢᠭ ᠰᠣᠨᠢᠷᠬᠠᠯ᠂
            ᠱᠠᠰᠢᠨ ᠰᠢᠲᠦᠯᢉᠡ ᠡᠴᠡ ᠠᠩᢉᠢ ᠳ᠋ᠤ ᠪᠡᠶ᠎ᠡ ᠳᠠᠭᠠᠭᠠᠭᠰᠠᠨ᠂ ᠬᠠᠷᠠᠭᠠᠲᠤ ᠪᠤᠰᠤ ᠪᠥᢉᠡᠳ
            ᢉᠡᠰᠢᢉᠦᠳ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠦ᠋ᠨ ᠢ᠋ᠶᠡᠨ ᠬᠠᠨᠳᠢᠪ ᠲᠤᠰᠠᠯᠠᠮᠵᠢ ᠪᠠᠷ ᠰᠠᠩᢈᠦᠵᠢᠳᠡᢉ᠃ ᢈᠦᠮᠦᠰ
            ᠡᠪ ᠰᠠᠨᠠᠭᠠᠨ ᠤ᠋ ᠨᠢᢉᠡᠳᠦᠯ ᠲᠡᠢ᠂ ᢈᠦᠮᠦᠨᠯᠢᢉ ᠡᠨᠡᠷᠢᠩᢉᠦᠢ ᠪᠠᠶᠢᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠢᠯᠡᢉᠦᠦ
            ᠰᠠᠶᠢᠬᠠᠨ ᠨᠡᠶᠢᢉᠡᠮ ᠢ᠋ ᠪᠤᠢ ᠪᠣᠯᠭᠠᠵᠤ᠂ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠵᠦ ᠴᠢᠳᠠᠨ᠎ᠠ ᢉᠡᠳᠡᢉ ᠲᠦ ᠪᠢᠳᠡ
            ᠢᠲᠡᢉᠡᠳᠡᢉ᠃ ᠮᠠᠨ ᠤ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠦᠴᠦ ᠪᠣᠯ ᢈᠦᠮᠦᠰ᠃ ᠣᠯᠠᠨ ᢈᠦᠮᠦᠰ
            ᠰᠢᠳᠤᠷᠭᠤ ᠶᠣᠰᠤᠨ ᠤ᠋ ᠲᠥᠯᠦᢉᠡ ᠳᠤᠤᠭᠠᠷᠳᠠᠭ ᠤᠴᠢᠷ ᠠ᠋ᠴᠠ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ
            ᠭᠠᠶᠢᠬᠠᠯᠲᠠᠢ ᠠᠮᠵᠢᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋ ᠭᠠᠷᠭᠠᠭᠰᠠᠭᠠᠷ ᠢᠷᠡᢉᠰᠡᠨ᠃
          </p>
        </div>
        <SectionTitle
          title={"ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠦ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ"}
          containerClassName={"bg-[#FFFF00] text-2xl"}
        />
        <StructureDiagram />
        <SectionTitle
          title={"ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠱᠢᠨᠯ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠳᠦᠷᠢᠮ"}
        />

        {/* PDF Showcase Section - matching old web functionality */}
        <div className="flex items-center justify-center gap-6 min-w-[1000px]">
          <div className="min-h-[700px] w-full flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <object
              data="https://amnesty-cdn.sgp1.cdn.digitaloceanspaces.com/static/73425868-1dc8-4656-87b4-cf7775db28e0.pdf"
              type="application/pdf"
              width="100%"
              height="700px"
              className="border-none"
              title="Mongolia's Amnesty International Organization Bylaws"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <p
                  className="text-gray-600 mb-4"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  PDF ᠬᠠᠷᠠᠭᠤᠯᠠᠬᠤ ᠵᠢᠨ ᠠᠷᠭ᠎ᠠ ᠦᠭᠡᠢ
                </p>
                <Button
                  href="https://amnesty-cdn.sgp1.cdn.digitaloceanspaces.com/static/73425868-1dc8-4656-87b4-cf7775db28e0.pdf"
                  target="_blank"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded"
                >
                  ᠳᠠᠤᠨᠯᠣᠭᠳ ᠢᠯᠠᠭᠠᠬᠤ
                </Button>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
