import { toMongolianNumbers } from "@/utils/fetcher";

export default function ContactBanner({ isMobile = false }) {
  return (
    <div
      className={`w-full max-w-md m-4 rounded-lg bg-[#fcff29] ${
        isMobile ? "mx-0 p-6" : "p-8"
      }`}
    >
      <div className="max-h-[500px] md:max-h-max h-full flex justify-center md:items-center gap-4 sm:gap-16 w-full">
        {/* Phone Contact */}
        <div className="flex flex-col items-center gap-2">
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black font-bold text-base sm:text-lg"
          >
            ᠤᠳᠠᠭᠠ:
          </p>
          <p
            className="text-black text-sm sm:text-base mt-1"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {toMongolianNumbers("7000-5708")}
          </p>
          <p
            className="text-black text-sm sm:text-base"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {toMongolianNumbers("7000-5705")}
          </p>
        </div>

        {/* Office Address */}
        <div className="flex flex-col items-center gap-2 max-h-[350px] md:max-h-max">
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black font-bold text-lg"
          >
            ᠬᠠᠶᠢᠷ:
          </p>
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black text-sm sm:text-base"
          >
            ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ ᠬᠣᠲᠠ ᠪᠠᠶᠠᠩᠵᠦᠷᠬ ᠳᠦᠦᠷᠭᠡ ᠰᠦᠮ ᠡ ᠬᠡᠰᠡᠭ ᠨᠡᠷᠡᠨ ᠡ ᠪᠠᠢᠭᠤᠯᠠᠯ ᠲᠠᠢ
            ᠦᠭᠡᠢ
          </p>
        </div>

        {/* Email & Office Hours */}
        <div className="flex flex-col items-center gap-2 max-h-[350px] md:max-h-max">
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black font-bold text-lg"
          >
            ᠴᠠᠬᠢᠮ ᠱᠤᠳᠠᠨ:
          </p>
          <p
            className="text-black text-sm sm:text-base"
            style={{ writingMode: "vertical-lr" }}
          >
            info@amnesty.mn
          </p>
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black text-sm sm:text-base"
          >
            ᠳᠠᠪᠤᠯᠭᠠ ᠨᠠᠢᠢᠮᠠᠨ ᠨᠠᠢᠢᠮᠠᠨ ᠶᠢᠰᠦᠨ ᠴᠠᠭ 9:00-18:00
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="flex flex-col items-center gap-2 max-h-[350px] md:max-h-max">
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black font-bold text-base sm:text-lg"
          >
            ᠨᠢᠵᠢ ᠠᠮ:
          </p>
          <p
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            className="text-black text-sm sm:text-base"
          >
            ᠬᠦᠮᠦᠨ ᠤ ᠡᠷᠭᠡ ᠶᠢᠨ ᠵᠥᠪᠯᠡᠯ
          </p>
        </div>
      </div>
    </div>
  );
}
