import BannerSlider from "@/components/common/BannerSlider";
import StaticHeader from "@/components/common/StaticHeader";
import { bannerImages } from "@/constants/bannerImages";
import { toMongolianNumbers } from "@/utils/fetcher";

// Sample data for top 5 provinces - this should come from API in real implementation
const top5Provinces = [
  { provinceName: "ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ", count: 25, percent: 25.0 },
  { provinceName: "ᠲᠦᠪ", count: 18, percent: 18.0 },
  { provinceName: "ᠣᠷᠬᠣᠨ", count: 16, percent: 16.0 },
  { provinceName: "ᠳᠠᠷᠬᠠᠨ ᠤᠤᠯ", count: 14, percent: 14.0 },
];

// Arch visualization data - all yellow dots (mobile version with fewer graduses)
const archGraduses = [
  { gradus: 10 },
  { gradus: 25 },
  { gradus: 40 },
  { gradus: 55 },
  { gradus: 70 },
  { gradus: 85 },
  { gradus: 100 },
  { gradus: 115 },
  { gradus: 130 },
  { gradus: 145 },
  { gradus: 160 },
  { gradus: 175 },
];

export default function EyeMobile() {
  const totalNews = 0; // This should come from API
  const archInfo = {
    count: totalNews,
    percent: "᠑᠐᠐",
    title: "ᠨᠡᠶᠢᠲᠡ ᠢᠷᠡᢉᠰᠡᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠲᠣᠭ᠎ᠠ",
  };

  return (
    <div className="h-full w-full sm:hidden p-4 flex flex-col gap-4">
      <StaticHeader
        image="/images/participation/humanrighteye/header-img.png"
        alt="Youth Page Header"
        width="100%"
        title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠦᠳᠦ"
      />
      <div className="h-full w-full flex flex-col gap-4">
        <div className="flex gap-4 max-h-[150px] w-full">
          <p
            className="text-[10px]"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠩᠬᠠᠷᠤᠯ ᠲᠠᠲᠠᠭᠰᠠᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠤ᠋ᠳ ᠢ᠋ ᠡᠷᠢᠯᢈᠢᠯᠡᢈᠦ᠂
            ᠰᠢᠢᠳᠪᠦᠷᠢᠯᠡᢈᠦ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠢ᠋ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠬᠤ ᠳ᠋ᠤ ᠢᠷᢉᠡᠳ ᠦ᠋ᠨ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᠶ᠋ᠢ
            ᠳᠡᠮᠵᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠤᠢ “ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ” ᠦᠨᠳᠦᠰᠦᠨ
            ᠦ᠋ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠮᠠᠷᠠᠹᠤᠨ᠃
          </p>
          <h2
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠶᠠᠭᠠᢈᠢᠭᠰᠠᠨ ᠬᠠᠷᠠᠩᠬᠤᠢ ᠶᠤᠮ ᠪᠤᠢ ᢉᠡᠵᠦ ᠬᠠᠰᢈᠢᠷᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ ᠶᠠᠳᠠᠵᠤ ᠨᠢᢉᠡ ᠴᠤ
            ᢉᠡᠰᠡᠨ ᠯᠠ ᠲᠠ ᠥᠪᠡᠷ ᠢ᠋ᠶᠡᠨ ᠠᠰᠠᠭ᠎ᠠ᠃ ᠃ ᠃
          </h2>
        </div>
        <div className="h-full max-h-[150px] flex justify-center items-center gap-4">
          <p
            className="text-xs font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ
          </p>
          <img src="/images/mgl-map.png" alt="" className="max-h-[150px]" />
        </div>

        {/* Yellow Arch Visualization */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-[280px] h-[160px] flex items-center justify-end flex-col gap-2">
            <div
              className="text-xl flex flex-col items-center pb-2 pl-2 border-b border-black"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {toMongolianNumbers(archInfo.percent)}
            </div>
            <div
              className="text-[8px] h-[30px] text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {archInfo.title}
            </div>
            <div
              className="text-xl leading-none pl-2"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {toMongolianNumbers(archInfo.count)}
            </div>
            <div className="w-0 h-0 relative">
              {archGraduses.map((item, index) => (
                <div
                  key={index}
                  className="w-[130px] h-[25px] absolute right-0 bottom-2 flex items-center space-x-1"
                  style={{
                    transform: `rotate(${item.gradus}deg)`,
                    transformOrigin: "right",
                    clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-[10px] h-[10px] rounded-full"
                      style={{
                        backgroundColor: "#fcff29",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Top Provinces Section */}
          <div className="flex flex-col w-full max-w-[300px]">
            <div
              className="w-full h-[60px] flex items-center justify-center border border-black text-sm font-bold p-2"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭᠢᠨ ᠢ᠋ᠢᠬ ᠮᠡᠳᠡᠡᠡᠯ ᠢᠷᠰᠡᠨ ᠠ᠋ᠢᠮᠠᠭ᠂ ᠳ᠋ᠦᠦᠷᠡᠭ
            </div>
            <div className="flex w-full h-[50px] pl-[5px] my-[10px]">
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠠ᠋ᠢᠮᠠᠭ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  ᠨᠢᠢᠢᠲ
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-[10px]"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "upright",
                  }}
                >
                  %
                </span>
              </div>
            </div>
            {top5Provinces.map((item, index) => (
              <div
                key={index}
                className="flex w-full h-[50px] pl-[5px] mb-[10px] border-l border-black"
              >
                <div
                  className={`flex-1 flex items-center justify-center border border-black text-[10px] ${
                    index === 0 ? "border-none" : ""
                  }`}
                  style={{
                    backgroundColor: index === 0 ? "#fcff29" : "transparent",
                  }}
                >
                  <span
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                    className="max-h-[40px] overflow-x-auto"
                  >
                    {item.provinceName}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className="text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.count}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span
                    className="text-[10px]"
                    style={{
                      writingMode: "vertical-lr",
                      textOrientation: "upright",
                    }}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ:</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠪᠠᠲᠤᠯᠠᠭᠠᠵᠢᠭᠤᠯᠬᠤ ᠻᠣᠳ*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠪᠠᠶᠢᠷᠢᠰᠢᠯ*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠭᠠᠷᠴᠠᠭ*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠻᠣᠸᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠤᠬᠤ*</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">
              ᠶᠠᠮᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ*
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[10px]">ᠮᠧᠰᠰᠧᠵᠢ</p>
            <textarea
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const volunteerItems = [
  {
    id: 1,
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 2,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 3,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
  {
    id: 4,
    title: "᠑᠐᠐ ᠴᠠᠭ ᠤ᠋ᠨ ᠰᠧᠷᠲ᠋ᠢᠹᠢᠻᠠᠲ ᠲᠠᠢ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᢈᠥᠲᠦᠯᠪᠦᠷᠢ",
    description:
      "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠲᠦ ᢈᠦᠴᠦ ᠨᠡᠮᠡᠵᠦ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᢈᠦᠴᠦᠷᢈᠡᢉ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠰ ᠦᢉᠡᠢ ᠪᠡᠷ ᠡᠨᠡ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ ᠠᠮᠵᠢᠯᠲᠠ ᠭᠠᠷᠭᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃  ᠪᠢᠳᠡ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠦᠢᠯᠡᠰ ᠢ᠋ ᠲᠥᠯᠦᠪᠰᠢᢉᠦᠯᠵᠦ᠂ ᠤᠳᠤᠷᠢᠳᠴᠤ᠂ ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᠳᠡᢉ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠢᠨ ᠲᠠᠢ ᠠᠩᠬᠠᠨ ᠱᠠᠲᠤᠨ ᠤ᠋ ᢉᠡᠰᠢᢉᠦᠨᠴᠢᠯᠡᠯ ᠦ᠋ᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠤᠮ᠃ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠑᠐ ᠰᠠᠶ᠋ᠢ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠑᠐᠐᠐᠐ ᠭᠠᠷᠤᠢ ᠨᠢ ᠮᠣᠩᠭᠣᠯ ᠳ᠋ᠤ ᠪᠠᠶᠢᠳᠠᠭ᠃  ᠲᠡᠳᠡ ᠵᠠᢈᠢᠳᠠᠯ ᠤᠷᠢᠶᠠᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠴᠤᠭᠯᠠᠭᠤᠯᠬᠤ ᠠ᠋ᠴᠠ ᠡᢈᠢᠯᠡᢉᠡᠳ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠵᠦ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ ᠳ᠋ᠤ ᠪᠤᠰᠤᠳ ᠢ᠋ ᠤᠷᠢᠶᠠᠯᠠᠵᠤ᠂ ᠮᠡᠳᠡᠯᢉᠡ ᠲᠦᢉᠡᢉᠡᠵᠦ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠥᠷᠨᠢᢉᠦᠯᠦᢉᠰᠡᢉᠡᠷ ᠪᠠᠶᠢᠨ᠎ᠠ᠃  ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠡᠪᠯᠡᠯᠳᠦᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠡᠳᠡᢉᠡᠷ ᢈᠦᠮᠦᠰ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠶ᠋ᠢᠨ ᠬᠠᠮᠤᠭ ᠤ᠋ᠨ ᠲᠣᠮᠤ ᢈᠦᠴᠦ ᠶᠤᠮ᠃  ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯᠲᠠᠨ ᠪᠣᠯᠤᠭᠰᠠᠨ ᠢ᠋ᠶᠠᠷ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠡᠵᠡᠮᠰᠢᠵᠦ᠂ ᠰᠢᠨ᠎ᠡ ᢈᠦᠮᠦᠰ ᠲᠡᠢ ᠲᠠᠨᠢᠯᠴᠠᠬᠤ - ᠥᠨᠦᠳᠦᠷ ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ ᢈᠢᠵᠦ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠳᠠᠶᠠᠭᠠᠷ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠳᠣᠯᠤᠭ᠎ᠠ ᠬᠣᠨᠤᠭ ᠲᠤ ᢈᠡᠳᠦᠨ ᠮᠢᠨᠦ᠋ᠲ ᠴᠤ ᠪᠠᠢ᠂ ᢈᠡᠳᠦᠨ ᠴᠠᠭ ᠴᠤ ᠪᠠᠢ ᠲᠠ ᠮᠠᠨ ᠤ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡᢈᠦ ᠠᠵᠢᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡ ᢈᠡᠰᠡᢉ ᠪᠣᠯᠵᠤ ᠴᠢᠳᠠᠨ᠎ᠠ᠃",
  },
];
