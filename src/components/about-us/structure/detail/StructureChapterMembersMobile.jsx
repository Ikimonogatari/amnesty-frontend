import Image from "next/image";
import Link from "next/link";
import BannerSlider from "@/components/common/BannerSlider";
import { bannerImages } from "@/constants/bannerImages";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import StaticHeader from "@/components/common/StaticHeader";

export default function StructureChapterMembersMobile() {
  const router = useRouter();

  const chapterGroups = [
    {
      id: 1,
      name: "ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ",
      image: "/images/aboutSub1/chapter/ZaluuchuudBulegFront.png",
      link: "/participation/youth",
    },
    {
      id: 2,
      name: "ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠦ᠋ᠨ ᠪᠦᠯᠦᢉ",
      image: "/images/aboutSub1/chapter/mergejilten.png",
    },
    {
      id: 3,
      name: "ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ",
      image: "/images/aboutSub1/chapter/gazriinremovebg-preview.png",
      link: "#oronnutag",
    },
  ];

  return (
    <div className="w-full block sm:hidden">
      <div className="relative w-full h-[40vh]">
        <StaticHeader
          title="ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠳ"
          description="ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ (ᠮᠡᠶᠢ) ᠨᠢ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠭᠰᠠᠨ ᠴᠠᠭ ᠠ᠋ᠴᠠ
            ᠪᠠᠨ ᠡᢈᠢᠯᠡᠨ ᠥᠨᠦ ᠶ᠋ᠢ ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠣᠷᠤᠨ ᠳᠠᠶᠠᠭᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ
            ᠑᠐'᠐᠐᠐ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠣᠯᠤᠭᠰᠠᠨ᠃"
          width="100%"
        />
      </div>
      <div className="flex flex-col items-center gap-10 p-4 h-full w-full max-w-full">
        {/* Header Section */}
        <div className="flex gap-2 max-h-[150px]">
          <h2
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠳ
          </h2>
          <p
            className="text-[10px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ (ᠮᠡᠶᠢ) ᠨᠢ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠭᠰᠠᠨ ᠴᠠᠭ ᠠ᠋ᠴᠠ
            ᠪᠠᠨ ᠡᢈᠢᠯᠡᠨ ᠥᠨᠦ ᠶ᠋ᠢ ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠣᠷᠤᠨ ᠳᠠᠶᠠᠭᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ
            ᠑᠐'᠐᠐᠐ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠣᠯᠤᠭᠰᠠᠨ᠃
          </p>
        </div>

        {/* Chapter Groups Section */}
        <div className="flex flex-col gap-6 w-full max-w-min">
          {chapterGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-row justify-center items-center border-[1px] rounded-lg max-h-[180px]"
            >
              <Image
                src={group.image}
                alt={group.name}
                width={180}
                height={180}
                className="object-cover rounded-l-lg max-w-[180px] max-h-[180px] min-w-[180px] min-h-[180px]"
              />
              {group.link ? (
                <Link
                  href={group.link}
                  className="text-xs p-4 h-full border-l text-center"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {group.name}
                </Link>
              ) : (
                <p
                  className="text-xs p-4 h-full border-l text-center"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {group.name}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Local Chapters Map Section */}
        <div className="flex flex-row items-center gap-4" id="oronnutag">
          <h3
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ
          </h3>
          <div className="relative w-full">
            <Image
              src="/images/aboutSub1/chapter/gazriinremovebg-preview.png"
              alt="ᠮᠣᠩᠭᠣᠯ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠭᠠᠵᠠᠷ ᠤ᠋ᠨ ᠵᠢᠷᠤᠭ"
              width={640}
              height={314}
              className="object-cover aspect-[640/314] w-full"
            />
          </div>
        </div>

        {/* Membership Types Section */}
        <div className="flex flex-row gap-7 w-full">
          <h4
            className="text-sm font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᠳᠡᠮᠵᠢᢉᠴᠢ ᠪᠣᠯᠤᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋
            ᠶ᠋ᠢᠨ ᠢᠯᠭᠠᠭ᠎ᠠ ᠨᠢ ᠶᠠᠭᠤ ᠪᠤᠢ?
          </h4>

          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-row items-start gap-2 border-b border-dashed border-gray-300 pb-6 w-full">
              <h4
                className="text-sm font-bold"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠳᠡᠮᠵᠢᢉᠴᠢ
              </h4>
              <div className="flex-1 min-w-0 overflow-x-auto max-h-[200px]">
                <p
                  className="text-[10px] leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᠳᠡᠮᠵᠢᢉᠴᠢ ᠨᠢ ᠰᠠᠩᢈᠦᠦ ᠶ᠋ᠢᠨ ᠬᠤᠪᠢ ᠳ᠋ᠤ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠵᠤ
                  ᠪᠠᠶᠢᠭ᠎ᠠ ᠡᠰᠡᠪᠡᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠠᠪᠴᠤ
                  ᠪᠠᠶᠢᠭ᠎ᠠ ᢈᠦᠮᠦᠰ᠃ ᠡᠨᠡ ᠨᠢ ᠰᠠᠷ᠎ᠠ ᠪᠦᠷᠢ ᠬᠠᠨᠳᠢᠪᠯᠠᠭᠴᠢ ᠠ᠋ᠴᠠ ᠠᠪᠬᠤᠭᠤᠯᠤᠭᠠᠳ
                  ᠣᠨ᠋ᠯᠠᠶᠢᠨ᠋ ᠡᠷᢉᠦᠳᠡᠯ ᠳ᠋ᠦ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠵᠢᠷᠤᠭᠰᠠᠨ ᢈᠦᠮᠦᠨ ᢈᠦᠷᠲᠡᠯ᠎ᠡ
                  ᠪᠠᠶᠢᠵᠤ ᠪᠣᠯᠤᠨ᠎ᠠ᠃ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠬᠣᠷᠢᠶᠠᠳ ᠲᠤ ᠡᠯᠰᠡᢈᠦ᠂ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠡᢉᠦᠷᢉᠡ
                  ᢉᠦᠢᠴᠡᠳᢈᠡᢈᠦ ᠵᠡᠷᢉᠡ ᠪᠢᠳᠡᠨ ᠦ᠋ ᢈᠢᠳᠡᢉ ᠶᠡᢈᠡᠩᢈᠢ ᠵᠦᠢᠯ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠵᠤ
                  ᠪᠣᠯᠬᠤ ᠴᠤ ᠵᠠᠷᠯᠠᠭᠳᠠᠭᠰᠠᠨ ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯ ᠳ᠋ᠤ ᠨᠡᠷ᠎ᠡ ᠳᠡᠪᠰᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ
                  ᠦᢉᠡᠢ᠃ ᠮᠥᠨ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠪᠦᠰᠡ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ᠂ ᠵᠢᠯ ᠦ᠋ᠨ ᠪᠣᠯᠤᠨ ᠡᢉᠡᠯᠵᠢᠲᠦ
                  ᠪᠤᠰᠤ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠬᠤᠷᠠᠯ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠦᢉᠡᠢ ᠣᠷᠤᠯᠴᠠᠬᠤ
                  ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠲᠡᠳᠡ ᠪᠦᠰᠡ ᠶ᠋ᠢᠨ ᠰᠢᠢᠳᠪᠦᠷᠢ᠂ ᠵᠠᢈᠢᠷᠤᠯ᠂ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ
                  ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢ ᠶ᠋ᠢᠨ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃
                </p>
              </div>
            </div>

            <div className="flex flex-row items-start gap-4 w-full">
              <div className="flex-shrink-0">
                <div className="flex flex-row items-start justify-center gap-2 mt-2">
                  <h4
                    className="text-sm font-bold"
                    style={{
                      writingMode: "vertical-lr",
                    }}
                  >
                    ᢉᠡᠰᠢᢉᠦᠨ
                  </h4>
                </div>
              </div>
              <div className="flex-1 min-w-0 overflow-x-auto max-h-[200px]">
                <p
                  className="text-[10px] leading-relaxed"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  ᢉᠡᠰᠢᢉᠦᠨ ᠵᠠᠰᠠᠭᠯᠠᠯ ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭᠠᠲᠠᠢ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠪᠦᠷᠢᠨ
                  ᠣᠷᠤᠯᠴᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠵᠢᠯ ᠦ᠋ᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠬᠤᠷᠠᠯ ᠪᠣᠯᠤᠨ ᠡᢉᠡᠯᠵᠢᠲᠦ
                  ᠪᠤᠰᠤ ᠬᠤᠷᠠᠯ ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠵᠥᠪᢈᠡᠨ ᢉᠡᠰᠢᢉᠦᠳ ᠲᠦ ᠮᠡᠳᠡᢉᠳᠡᠳᠡᢉ ᠪᠥᢉᠡᠳ
                  ᠲᠡᠳᠡᢉᠡᠷ ᠬᠤᠷᠠᠯᠳᠤᠭᠠᠨ ᠳ᠋ᠤ ᠵᠥᠪᢈᠡᠨ ᢉᠡᠰᠢᢉᠦᠳ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠡᠷᢈᠡ ᠲᠡᠢ᠃
                  ᢉᠡᠰᠢᢉᠦᠳ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯ ᠳ᠋ᠤ ᠨᠡᠷ᠎ᠡ ᠳᠡᠪᠰᠢᢈᠦ
                  ᠡᠰᠡᠪᠡᠯ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠴᠢᠭᠤᠯᠭ᠎ᠠ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ ᠳ᠋ᠤ ᠣᠷᠤᠯᠴᠠᠬᠤ
                  ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢᠳ ᠦ᠋ᠨ ᠪᠦᠷᠢᠯᠳᠦᢈᠦᠨ ᠳ᠋ᠦ ᠣᠷᠤᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᠪᠥᢉᠡᠳ
                  ᠲᠡᠳᠡᢉᠡᠷ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ
                  ᠥᠪᠡᠷᠰᠡᠳ ᠦ᠋ᠨ ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠨ ᠵᠠᠰᠠᠭᠯᠠᠯ ᠲᠠᠢ
                  ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠲᠠᠢ ᠲᠣᠳᠤᠷᠬᠠᠢ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠪᠤᠰᠤᠳ ᢉᠡᠰᠢᢉᠦᠳ ᠲᠡᠢ
                  ᠬᠤᠪᠢᠶᠠᠯᠴᠠᠬᠤ ᠶ᠋ᠢ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᢈᠦ ᠶᠣᠰᠤᠲᠠᠢ᠃
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-xs max-h-[150px]"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᢈᠡᠷᠪᠡ ᠲᠠᠨ ᠳ᠋ᠤ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠪᠠᠶᠢᠪᠠᠯ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠦᠢᠯᠡᠴᠢᠯᠡᢉᠡ ᠤᠷᠤᠭᠤ ᠢᠮᠡᠶᠢᠯ
          ᠢᠯᠡᢉᠡᠨ᠎ᠡ ᠦᠦ: members@amnesty.mn
        </div>
      </div>
    </div>
  );
}
