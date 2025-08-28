import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import InteractiveMap from "@/components/participation/InteractiveMap";
import StaticHeader from "@/components/common/StaticHeader";
import { toMongolianNumbers } from "@/utils/fetcher";

// Sample data for top 5 provinces - this should come from API in real implementation
const top5Provinces = [
  { provinceName: "ᠤᠯᠠᠭᠠᠨᠪᠠᠭᠠᠲᠤᠷ", count: 25, percent: 25.0 },
  { provinceName: "ᠲᠦᠪ", count: 18, percent: 18.0 },
  { provinceName: "ᠣᠷᠬᠣᠨ", count: 16, percent: 16.0 },
  { provinceName: "ᠳᠠᠷᠬᠠᠨ ᠤᠤᠯ", count: 14, percent: 14.0 },
];

// Arch visualization data - all yellow dots
const archGraduses = [
  { gradus: 4 },
  { gradus: 13 },
  { gradus: 22 },
  { gradus: 31 },
  { gradus: 40 },
  { gradus: 49 },
  { gradus: 58 },
  { gradus: 67 },
  { gradus: 76 },
  { gradus: 85 },
  { gradus: 94 },
  { gradus: 103 },
  { gradus: 112 },
  { gradus: 121 },
  { gradus: 130 },
  { gradus: 139 },
  { gradus: 148 },
  { gradus: 157 },
  { gradus: 166 },
  { gradus: 175 },
];

export default function EyeDesktop() {
  const totalNews = 0; // This should come from API
  const archInfo = {
    count: totalNews,
    percent: "᠑᠐᠐",
    title: "ᠨᠡᠶᠢᠲᠡ ᠢᠷᠡᢉᠰᠡᠨ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠲᠣᠭ᠎ᠠ",
  };

  return (
    <div className="h-full hidden sm:flex gap-10 w-auto flex-shrink-0">
      <StaticHeader
        image="/images/participation/humanrighteye/header-img.png"
        alt="Youth Page Header"
        width="90rem"
        title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠦᠳᠦ"
      />
      <div className="h-full p-4 flex gap-20">
        <div className="flex gap-10">
          <p
            className="text-sm"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠩᠬᠠᠷᠤᠯ ᠲᠠᠲᠠᠭᠰᠠᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠤ᠋ᠳ ᠢ᠋ ᠡᠷᠢᠯᢈᠢᠯᠡᢈᠦ᠂
            ᠰᠢᠢᠳᠪᠦᠷᠢᠯᠡᢈᠦ ᠠᠷᠭ᠎ᠠ ᠵᠠᠮ ᠢ᠋ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠬᠤ ᠳ᠋ᠤ ᠢᠷᢉᠡᠳ ᠦ᠋ᠨ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᠶ᠋ᠢ
            ᠳᠡᠮᠵᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠤᠢ "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ" ᠦᠨᠳᠦᠰᠦᠨ
            ᠦ᠋ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠦ᠋ᠨ ᠮᠠᠷᠠᠹᠤᠨ᠃
          </p>
          <h2
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠶᠠᠭᠠᢈᠢᠭᠰᠠᠨ ᠬᠠᠷᠠᠩᠬᠤᠢ ᠶᠤᠮ ᠪᠤᠢ ᢉᠡᠵᠦ ᠬᠠᠰᢈᠢᠷᠤᠭᠰᠠᠨ ᠠ᠋ᠴᠠ ᠶᠠᠳᠠᠵᠤ ᠨᠢᢉᠡ ᠴᠤ
            ᢉᠡᠰᠡᠨ ᠯᠠ ᠲᠠ ᠥᠪᠡᠷ ᠢ᠋ᠶᠡᠨ ᠠᠰᠠᠭ᠎ᠠ᠃ ᠃ ᠃
          </h2>
        </div>
        <div className="h-full flex justify-center items-center gap-16">
          <p
            className="text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
              textOrientation: "upright",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ
          </p>
          <div className="h-1/2">
            <InteractiveMap />
          </div>
        </div>

        {/* Yellow Arch Visualization */}
        <div className="flex flex-col items-center">
          <div className="w-[546px] h-[311px] flex items-center justify-end flex-col gap-2">
            <div
              className="text-3xl flex flex-col items-center pb-2 pl-3 border-b-[2px] border-black"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {toMongolianNumbers(archInfo.percent)}
            </div>
            <div
              className="text-[10px] h-[50px] text-center"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              {archInfo.title}
            </div>
            <div
              className="text-3xl leading-none pl-3"
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
                  className="w-[260px] h-[45px] absolute right-0 bottom-4 flex items-center space-x-1.5"
                  style={{
                    transform: `rotate(${item.gradus}deg)`,
                    transformOrigin: "right",
                    clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                  }}
                >
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <div
                      key={dot}
                      className="w-[17px] h-[17px] rounded-full"
                      style={{
                        backgroundColor: "#fcff29",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Хамгийн их мэдээлэл ирсэн аймаг, дүүрэг section */}
          <div className="flex flex-col">
            <div
              className="w-[507px] h-[100px] flex items-center justify-center border border-black text-xl font-bold p-4"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "upright",
              }}
            >
              ᠬᠠᠮᠠᠭᠢᠨ ᠢ᠋ᠢᠬ ᠮᠡᠳᠡᠡᠡᠯ ᠢᠷᠰᠡᠨ ᠠ᠋ᠢᠮᠠᠭ᠂ ᠳ᠋ᠦᠦᠷᠡᠭ
            </div>
            <div className="flex w-[507px] h-[80px] pl-[10px] my-[20px]">
              <div className="flex-1 flex items-center justify-center">
                <span
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
                className="flex w-[507px] h-[80px] pl-[10px] mb-[20px] border-l-2 border-black"
              >
                <div
                  className={`flex-1 flex items-center justify-center border border-black ${
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
                    className="max-h-[70px] overflow-x-auto"
                  >
                    {item.provinceName}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span
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

        <div className="flex gap-7 p-20" id="fill-info">
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠤᠲᠠᠰᠤᠨ ᠤ᠋ ᠳ᠋ᠤᠭᠠᠷ:
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠪᠠᠲᠤᠯᠠᠭᠠᠵᠢᠭᠤᠯᠬᠤ ᠻᠣᠳ*
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠪᠠᠶᠢᠷᠢᠰᠢᠯ*
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠭᠠᠷᠴᠠᠭ
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠻᠣᠸᠧᠷ ᠵᠢᠷᠤᠭ ᠰᠣᠩᠭᠤᠬᠤ*
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠶᠠᠮᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠠᠰᠠᠭᠤᠳᠠᠯ ᠢ᠋ᠶᠠᠷ*
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-20"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
          <div className="flex gap-2">
            <p
              className="text-sm"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠮᠧᠰᠰᠧᠵᠢ
            </p>
            <textarea
              type="text"
              className="border border-gray-300 rounded-md p-2 w-60"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
