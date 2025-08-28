import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import SectionTitle from "@/components/common/SectionTitle";
import StructureDiagramMobile from "./StructureDiagramMobile";
import StaticHeader from "@/components/common/StaticHeader";

export default function StructureMobile() {
  return (
    <div className="w-full block sm:hidden">
      <div className="relative w-full h-[40hv]">
        <StaticHeader
          image="/images/aboutSub1/header-img.png"
          alt="Structure Page Header"
          width="100%"
          title="ᠪᠠᠶᠢᠭᠤᠯᠤᠯ ᠤᠨ ᠪᠦᠲᠦᠴᠡ"
        />
      </div>
      <div className="flex flex-col gap-12 p-4 h-full">
        <div className="flex gap-2 max-h-[200px]">
          <h2
            className="text-[10px] font-bold"
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
            className="text-[10px] text-[#848382]"
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
        <div className="flex gap-2">
          <SectionTitle
            title={
              "ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨ ᠦ᠋ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ"
            }
            containerClassName={"bg-[#FFFF00] text-[10px]"}
          />
          <StructureDiagramMobile />
        </div>
        <div className="flex gap-2 max-h-[200px]">
          <p
            className="text-[10px] font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠱᠢᠨᠯ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠳᠦᠷᠢᠮ
          </p>

          {/* PDF Viewer */}
          <iframe
            src="/documents/dummy.pdf"
            width="100%"
            height="200"
            style={{ border: "none" }}
            title="Amnesty International Structure Document"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
