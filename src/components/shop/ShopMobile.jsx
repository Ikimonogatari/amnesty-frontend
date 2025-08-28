import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import MerchItem from "./MerchItem";
import StaticHeader from "../common/StaticHeader";

export default function ShopMobile({ merchandise = [] }) {
  return (
    <div className="h-full flex flex-col sm:hidden gap-7">
      <StaticHeader
        image="/images/merch/header-img-amnestyshop.jpg"
        alt="Shop Page Header"
        width="100%"
        title="ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ"
      />
      <div className="h-full p-4">
        <div className="h-full flex flex-col gap-7">
          <div className="flex gap-2 max-h-[200px] overflow-x-auto">
            <h1
              className="text-xs font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ
            </h1>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠ ᠡᠮᠨᠧᠰᠲᠢ ᠰᠣᠫᠢᠨ ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ ᠡᠴᠡ ᠬᠤᠳᠠᠯᠳᠠᠨ ᠠᠪᠤᠵᠤ᠂ ᠬᠦᠮᠦᠨ ᠦ
              ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠶᠢᠨ ᠦᠢᠯᠡᠳᠡᠳ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠡᠭᠡᠨ ᠣᠷᠣᠭᠤᠯᠠᠷᠠᠢ᠃
            </p>
            <p
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠲᠠᠨ ᠤ ᠬᠢᠶᠠᠭᠰᠠᠨ ᠬᠤᠳᠠᠯᠳᠠᠨ ᠠᠪᠤᠯᠭ᠎ᠠ ᠶᠢᠨ ᠣᠷᠠᠯᠢᠭᠣ ᠨᠢ ᠡᠮᠨᠧᠰᠲᠢ
              ᠢᠨᠲᠧᠷᠨᠠᠰᠢᠣᠨᠠᠯ ᠤᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠥᠭᠡ ᠶᠢᠨ ᠺᠠᠮᠫᠠᠨᠢᠲ ᠠᠵᠢᠯ᠂ ᠬᠦᠮᠦᠨ
              ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠠᠬᠤ ᠲᠥᠰᠥᠯ ᠬᠥᠲᠥᠯᠪᠦᠷᠢ ᠶᠢ ᠬᠡᠷᠡᠭᠵᠢᠭᠦᠯᠬᠦ ᠳᠦ
              ᠵᠠᠷᠴᠢᠭᠤᠯᠠᠭᠳᠠᠭ᠃
            </p>
            <div
              className="text-[10px] font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              {merchandise.length} ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ
            </div>
          </div>

          {/* Products Section */}
          <div className="flex gap-4 overflow-x-auto">
            {merchandise.length > 0 ? (
              merchandise.map((merchItem) => (
                <div key={merchItem.id} className="flex-shrink-0">
                  <MerchItem merchItem={merchItem} />
                </div>
              ))
            ) : (
              <div
                className="text-xs text-gray-500 flex items-center justify-center min-w-[150px]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
                  minHeight: "60px",
                }}
              >
                ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠡᠭᠡᠳᠬᠦᠦᠨ ᠣᠯᠣᠭᠰᠠᠨ ᠦᠭᠡᠢ᠃
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
