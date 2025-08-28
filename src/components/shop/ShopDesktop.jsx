import StaticHeader from "@/components/common/StaticHeader";
import MerchItem from "./MerchItem";
import SectionTitle from "../common/SectionTitle";

export default function ShopDesktop({ merchandise = [] }) {
  return (
    <div className="h-full hidden sm:flex gap-10 flex-shrink-0 p-4">
      <StaticHeader
        image="/images/merch/header-img-amnestyshop.jpg"
        alt="Shop Page Header"
        width="90rem"
        title="ᠡᠮᠨᠧᠰᠲᠢ ᠳᠡᠯᠭᠦᠦᠷ"
      />
      <div className="h-full p-4">
        <div className="h-full flex gap-10">
          <div className="flex gap-7">
            <h2
              className="text-sm font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠣᠷᠤᠭᠤᠯᠤᠭᠠᠷᠠᠢ᠃ ᠲᠠ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠱᠣᠫ ᠤ᠋ᠨ ᠪᠠᠷᠠᠭ᠎ᠠ ᠪᠦᠲᠦᢉᠡᢉᠳᠡᢈᠦᠨ ᠡᠴᠡ
              ᠬᠤᠳᠠᠯᠳᠤᠨ ᠠᠪᠴᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡᠰ ᠲᠦ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ
              ᠪᠡᠨ
            </h2>
            <p
              className="text-sm text-[#848382]"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠶ᠋ᠢᠨ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠯ ᠣᠯᠭᠤᠬᠤ ᠲᠥᠰᠦᠯ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ ᠨᠦ᠋ᢉᠦᠳ ᠢ᠋ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᢈᠦ ᠳ᠋ᠦ
              ᠵᠠᠷᠤᠴᠠᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃ ᠲᠠᠨ ᠤ᠋ ᢈᠢᢉᠰᠡᠨ ᠬᠤᠳᠠᠯᠳᠤᠨ ᠠᠪᠤᠯᠲᠠ ᠶ᠋ᠢᠨ ᠣᠷᠤᠯᠭ᠎ᠠ ᠨᠢ
              ᠡᠮᠨᠧᠰᠲ ᠢᠨ᠋ᠲᠧᠷᠨᠡᠰᠢᠨᠯ ᠤ᠋ᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠻᠠᠮᠫᠠᠨᠢᠲᠤ
              ᠠᠵᠢᠯ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ
            </p>
          </div>
          <SectionTitle title={`${merchandise.length} ᠪᠦᠲᠦᢉᠡᢉᠳᠡᢈᠦᠨ`} />

          {/* Products Section */}
          <div className="grid grid-rows-3 grid-flow-col gap-6 overflow-x-auto">
            {merchandise.length > 0 ? (
              merchandise.map((merchItem) => (
                <div key={merchItem.id} className="flex-shrink-0">
                  <MerchItem merchItem={merchItem} />
                </div>
              ))
            ) : (
              <div
                className="text-sm text-gray-500 flex items-center justify-center min-w-[200px]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "upright",
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
