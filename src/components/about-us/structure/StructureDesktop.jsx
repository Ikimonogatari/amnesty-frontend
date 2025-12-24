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
        image="/mng/images/aboutSub1/organization_cover.jpg"
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
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠵᠥᠷᠢᠴᠡᠯ ᠢ᠋ ᠲᠡᢉᠦᠰᢈᠡᠯ ᠪᠣᠯᠭᠠᠬᠤ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ ᠠᠵᠢᠯ ᠥᠷᠨᠢᢉᠦᠯᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠑᠕᠐ 
            ᠭᠠᠷᠤᠢ ᠣᠷᠤᠨ ᠤ᠋ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠢ᠋ ᠡᠩᠨᠡᢉᠡᠨ ᠳ᠋ᠦ ᠪᠡᠨ ᠨᠢᢉᠡᠳᢈᠡᢉᠰᠡᠨ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠦ᠋ 
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠳ᠋ᠠᢈᠢ ᠰᠠᠯᠪᠤᠷᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠧᠰᠢᠨᠯ ᠶᠤᠮ᠃
          </h2>
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠥᠨᠦᠳᠦᠷ ᠒᠕ ᠪᠦᠯᠦᢉ ᠑᠐᠂᠐᠐᠐ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠡᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃
            ᠪᠢᠳᠡ ᠠᠷᠠᠳᠴᠢᠯᠠᠭᠰᠠᠨ ᠵᠠᠰᠠᠭᠯᠠᠯ ᠲᠠᠢ᠂ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠪᠦᢈᠦᠢ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠱᠢᠨ᠋ᠯ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ᠂ 
            ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠴᠢᢉᠯᠡᠯ ᠢ᠋ ᠒ ᠵᠢᠯ ᠲᠤᠲᠤᠮ ᠳ᠋ᠤ ᠪᠣᠯᠳᠠᠭ ᠶᠡᠷᠦᠩᢈᠡᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ ᠢ᠋ᠶᠠᠷ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠵᠤ᠂ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠡᠴᠡ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢ 
            ᠲᠥᠯᠦᢉᠡᠯᠡᠨ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ᠂ ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠯᠡᠯ ᠢ᠋ ᠰᠣᠩᠭᠤᠳᠠᠭ᠃
            ᠶᠡᠷᠦᠩᢈᠡᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ ᠠ᠋ᠴᠠ ᠳᠠᠷᠠᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠶᠡᠷᠦᠩᢈᠡᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ ᠤ᠋ ᠬᠣᠭᠤᠷᠤᠨᠳᠤ ᠲᠤᠰ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ ᠠ᠋ᠴᠠ 
            ᠰᠣᠩᠭᠤᠭᠳᠠᠭᠰᠠᠨ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨ᠋ᠧᠰᠢᠯ ᠤ᠋ᠨ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ ᠡᠷᢈᠢᠯᠡᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ ᠪᠥᢉᠡᠳ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠡᠳᠦᠷ 
            ᠲᠤᠲᠤᠮ ᠤ᠋ᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠶ᠋ᠢ ᢉᠦᠢᠴᠡᠳᢈᠡᢈᠦ ᠲᠣᠪᠴᠢᠶ᠎ᠠ ᠡᠷᢈᠢᠯᠡᠨ ᠶᠠᠪᠤᠭᠤᠯᠳᠠᠭ᠃
          </p>
        </div>
        <SectionTitle
          title={"ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠦ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ"}
          containerClassName={"bg-[#FFFF00] text-2xl"}
        />
        <div className="flex-shrink-0 min-w-[800px] min-h-[600px]">
          <StructureDiagram />
        </div>
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
