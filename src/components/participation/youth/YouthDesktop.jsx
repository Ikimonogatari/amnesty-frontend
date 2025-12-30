import Image from "next/image";
import Button from "@/components/common/Button";
import StaticHeader from "@/components/common/StaticHeader";
import SectionTitle from "@/components/common/SectionTitle";
import { Download } from "lucide-react";


export default function YouthDesktop() {
  return (
    <div className="h-full hidden sm:flex gap-10 overflow-x-auto w-auto flex-shrink-0">
      <StaticHeader
        image="/mng/images/participation/youthhumanrights/zaluuchuudbulegfull1.png"
        alt="Youth Page Header"
        width="90rem"
        title="ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠵᠠᠯᠤᠴᠢᠳ"
      />

      <div className="h-full p-4 flex gap-20">
        <p
          className="text-sm"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          The Youth᠂ᠹ᠂ Power᠂ᠹ᠂ Action!ᠤᠹ ᠲᠥ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᢈᠡᠦᢈᠡᠳ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ
          ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ (᠒᠐᠒᠒-᠒᠐᠒᠕) ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠢ ᠶ᠋ᠢᠨ ᢈᠡᠦᢈᠡᠳ᠂ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ
          ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠲᠠᠢ ᠯ ᠪᠦᢈᠦᠢ ᠯᠠ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠴᠢᢉᠯᠡᠯ ᠢ᠋
          ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠳᠠᠭ᠃ ᠡᠨᠡ ᢈᠦ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠶ᠋ᠢᠨ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᢈᠦᠷᢈᠦ ᠶ᠋ᠢᠨ ᠲᠤᠯᠠᠳᠠ
          ᠳᠠᠩ ᠭᠠᠭᠴᠠ ᢈᠡᠦᢈᠡᠳ᠂ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᢉᠡᠯᠲᠡ ᠦᢉᠡᠢ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠴᠤ
          ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠮᠠᠩᠯᠠᠶᠢᠯᠠᠬᠤ ᠡᢉᠦᠷᢉᠡ ᠶ᠋ᠢ ᢉᠦᠢᠴᠡᠳᢈᠡᠨ᠎ᠡ᠃ ᠵᠠᠯᠠᠭᠤᠰ ᠤ᠋ᠨ ᠡᠷᠴᠢ ᢈᠦᠴᠦ᠂
          ᠪᠦᠲᠦᢉᠡᠯᠴᠢ ᠪᠠᠶᠢᠳᠠᠯ᠂ ᠤᠷ᠎ᠠ ᠴᠢᠳᠠᠪᠤᠷᠢ ᠳ᠋ᠤ ᠲᠤᠯᠭᠠᠭᠤᠷᠢᠯᠠᠨ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ
          ᠶ᠋ᠢ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠪᠠᠨ ᠪᠦᢈᠦᠢ ᠯᠠ ᠲᠦᠪᠰᠢᠨ ᠳ᠋ᠦ ᠢᠳᠡᠪᢈᠢᠵᠢᢉᠦᠯᠵᠦ ᠡᠮᠨᠧᠰᠲ ᠢ᠋
          ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠠᠯᠤᠰ ᠤ᠋ᠨ ᠬᠠᠷᠠᠭ᠎ᠠ᠂ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠶ᠋ᠢᠨ ᠵᠣᠷᠢᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠢ᠋
          ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᢈᠦ ᠲᠤᠯᠠ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠤ᠋ᠨ ᠡᢉᠦᠷᢉᠡ᠂ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ
          ᠡᠶᠡᠷᢉᠦ ᠥᢉᠡᠷᠡᠴᠢᠯᠡᠯᠲᠡ᠂ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠨᠡᠩ ᠴᠢᠬᠤᠯᠠ ᢈᠡᠰᠡᢉ ᠶᠤᠮ᠃
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠡᠯ ᠨᠢ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠢ᠋ ᠬᠤᠪᠢ ᢈᠦᠮᠦᠨ ᠂ ᠡᠷᢈᠡ ᠡᠳ᠋ᠯᠡᢉᠡᠴᠢ
          ᢈᠡᠮᠡᠨ ᢈᠦᠯᠢᠶᠡᠨ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᢈᠦ ᠶ᠋ᠢᠨ ᠰᠠᠴᠠᠭᠤ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᢈᠡᠮᠡᠨ
          ᢈᠦᠯᠢᠶᠡᠨ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᠳᠡᢉ᠃ “The Youth᠂ᠹ᠂ Power᠂ᠹ᠂ Action” ᢈᠡᠮᠡᢈᠦ ᠦᠨᠡᠲᠦ
          ᠵᠦᠶᠢᠯ ᠳᠣᠣᠷ᠎ᠠ ᠲᠡᠳᠡᠨ ᠢ᠋ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠶᠢᠯᠡ ᢈᠡᠷᠡᢉ ᠲᠦ ᠲᠠᠲᠠᠨ
          ᠣᠷᠤᠯᠴᠠᠭᠤᠯᠳᠠᠭ᠃ ᢈᠡᠦᢈᠡᠳ᠂ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠪᠣᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠢ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ
          ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠦ᠋ ᠭᠣᠣᠯ ᢈᠦᠴᠦ ᠲᠤᠯᠠ ᠲᠡᠳᠡᠨ ᠢ᠋ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ
          ᠪᠠᠨ ᠲᠠᠲᠠᠨ ᠣᠷᠤᠯᠴᠠᠭᠤᠯᠬᠤ᠂ ᠰᠠᠨᠠᠯ᠂ ᠰᠠᠨᠠᠭᠠᠴᠢᠯᠭ᠎ᠠ ᠶ᠋ᠢ ᠨᠢ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ
          ᠲᠥᠯᠦᢉᠡᢈᠦ ᠦᠢᠯᠡ ᢈᠡᠷᠡᢉ ᠦ᠋ᠨ ᠲᠡᠷᠢᢉᠦᠨ ᠡᠩᠨᠡᢉᠡᠨ ᠲᠠᠯᠪᠢᠬᠤ ᠨᠢ ᠪᠢᠳᠡᠨ ᠦ᠋ ᠦᠶᠢᠯᠡ
          ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠤ᠋ ᠭᠣᠣᠯ ᠴᠥᠮᠦ ᠪᠠᠶᠢᠭᠰᠠᠭᠠᠷ ᠢᠷᠡᢉᠰᠡᠨ᠃ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠡᠯ ᠨᠢ
          ᠑᠔-᠒᠔ ᠨᠠᠰᠤᠨ ᠤ᠋ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠢ᠋ ᠵᠠᠯᠠᠭᠤ ᢈᠡᠮᠡᠨ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠵᠤ ᠡᠮᠨᠧᠰᠲ᠋ᠢᠭ ᠤ᠋ᠨ
          ᠥᠰᠦᠯᠲᠡ᠂ ᠦᠷ᠎ᠡ ᠨᠥᠯᠦᢉᠡᠨ ᠳ᠋ᠦ ᠲᠡᠳᠡᠨ ᠦ᠋ ᠢᠳᠡᠪᢈᠢᠲᠡᠢ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ᠂ ᠰᠠᠨᠠᠭᠠᠴᠢᠯᠭ᠎ᠠ᠂
          ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠶ᠋ᠢ ᠨᠡᠮᠡᢉᠳᠡᢉᠦᠯᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠲᠠᠢ ᠡᠢ-ᠡᠶᠢᠨ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ
          ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠶ᠋ᠢ ᠠᠩᠬ᠎ᠠ ᠒᠐ ᠭᠠᠷᠤᠢ ᠵᠢᠯ ᠦ᠋ᠨ ᠡᠮᠦᠨ᠎ᠡ ᠪᠠᠲᠤᠯᠠᠭᠰᠠᠨ᠃
          ᠲᠡᠷᠡ ᠴᠠᠭ ᠠ᠋ᠴᠠ ᠬᠣᠶᠢᠰᠢ ᠲᠠᠰᠤᠷᠠᠯᠲᠠ ᠦᢉᠡᠢ ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ
          ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ᠂ ᢈᠦᠮᠦᠨ ᠪᠦᠷᠢ ᠡᠷᢈᠡ ᠪᠡᠨ ᠡᠳ᠋ᠯᠡᠳᠡᢉ ᠳᠡᠯᠡᢈᠡᠢ ᠶᠢᠷᠲᠢᠨᠴᠦ ᠶ᠋ᠢ ᠪᠦᠲᠦᢉᠡᢈᠦ
          ᠲᠡᠷᠢᢉᠦᠨ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠲᠥᠪ ᠲᠦ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠤ᠋ᠨ ᠤᠳᠬ᠎ᠠ ᠤᠴᠢᠷᠲᠠᠢ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ᠂
          ᠢᠳᠡᠪᢈᠢ᠂ ᠰᠠᠨᠠᠭᠠᠴᠢᠯᠭ᠎ᠠ ᠶ᠋ᠢ ᠲᠤᠰᠬᠠᠭᠰᠠᠭᠠᠷ ᠢᠷᠡᢉᠰᠡᠨ᠃ ᠒᠐᠒᠓ ᠣᠨ ᠤ᠋ ᠪᠠᠶᠢᠳᠠᠯ ᠢ᠋ᠶᠠᠷ
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠕᠐ ᠬᠤᠪᠢ ᠶ᠋ᠢ[᠑]᠂ ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ
          ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠖᠐ ᠭᠠᠷᠤᠢ ᠬᠤᠪᠢ ᠶ᠋ᠢ ᠑᠔-᠒᠕
          ᠨᠠᠰᠤᠨ ᠤ᠋ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠪᠦᠷᠢᠳᠦᢉᠦᠯᠵᠦ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠧᠰᠢᠨ᠋ᠯ ᠨᠢ
          ᢈᠡᠦᢈᠡᠳ ᠦ᠋ᠳ ᠢ᠋ ᠴᠤ ᠮᠥᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᢈᠡᠮᠡᠨ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠳᠠᠭ ᠪᠠ
          ᢈᠡᠦᢈᠡᠳ ᠦ᠋ᠨ ᠡᠷᢈᠡ ᠶ᠋ᠢ ᠬᠠᠮᠠᠭᠠᠯᠠᠬᠤ᠂ᢈᠡᠦᢈᠡᠳ ᠦ᠋ᠨ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ ᠨᠠᠷ ᠤ᠋ᠨ
          ᠦᠶᠢᠯᠡ ᢈᠡᠷᠡᢉ ᠢ᠋ ᠳᠡᠮᠵᠢᢈᠦ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠒᠐᠒᠒ ᠣᠨ ᠳ᠋ᠤ ᢈᠡᠦᢈᠡᠳ᠂ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ
          ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠶ᠋ᠢ ᠪᠠᠲᠤᠯᠠᠭᠰᠠᠨ᠃
        </p>
        <div className="h-full flex flex-col gap-4">
          <div className="relative min-w-[283px] min-h-[400px] max-w-[283px] max-h-[400px]">
            <Image
              src={"/mng/images/youthpoweraction.png"}
              alt="Youth power action"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-12">
            <p
              className="font-bold text-lg"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              «ᠪᠢᠳᠡ ᠬᠠᠮᠲᠤ ᠳ᠋ᠤ ᠪᠠᠨ ᠤᠳᠬ᠎ᠠ ᠤᠴᠢᠷᠲᠠᠢ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ ᠶ᠋ᠢ <br /> ᠪᠦᠲᠦᢉᠡᠵᠦ
              ᠴᠢᠳᠠᠨ᠎ᠠ᠃
            </p>
            <p
              className="font-bold text-lg"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠸᠢᠪᠾᠠ ᠸᠧᠨᠻᠠᠲ᠋ᠧᠱᠢ᠂ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ ᠬᠠᠮᠲᠤ ᠶ᠋ᠢᠨ <br />
              ᠨᠡᠶᠢᢉᠡᠮᠯᠢᢉ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ
            </p>
          </div>
        </div>
        <div className="px-24 py-10 bg-[#F1F1F1] flex gap-7">
          <p
            style={{
              writingMode: "vertical-lr",
            }}
          >
            “YOUTH POWER FOR YOUTH RIGHTS” ᠭᠠᠷ ᠤ᠋ᠨ ᠠᠪᠤᠯᠭ᠎ᠠ ᠲᠠᠲᠠᠵᠤ ᠠᠪᠬᠤ ᠡᠮᠨᠧᠰᠲ᠋ᠢ
            ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ “YOUTH POWER FOR YOUTH RIGHTS” ᠡᠨᠡ ᢈᠦ ᠭᠠᠷ ᠤ᠋ᠨ
            ᠠᠪᠤᠯᠭ᠎ᠠ ᠳ᠋ᠤ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ ᠤ᠋ᠨ ᠦᠨᠳᠦᠰᠦᠨ ᠦ᠋ ᠰᠲ᠋ᠷᠠᠲ᠋ᠧᢉᠢ ᠪᠣᠯᠪᠠᠰᠤᠷᠠᠭᠤᠯᠬᠤ᠂
            ᢈᠡᠷᠡᢉᠵᠢᢉᠦᠯᢈᠦ ᠦᠶᠢᠯᠡ ᠶᠠᠪᠤᠴᠠ ᠶ᠋ᠢ ᠲᠣᠳᠤᠷᠬᠠᠶᠢᠯᠠᠭᠰᠠᠨ
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.amnesty.org/ar/wp-content/uploads/2021/08/act760032006en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-[10px] w-[50px] py-3 flex items-center justify-center hover:brightness-105 transition-all border border-gray-300"
            >
              <p
                style={{
                  writingMode: "vertical-lr",
                }}
                className="text-black font-bold"
              >
                ᠠᠩᢉᠯᠢ
              </p>
            </a>
            <a
              href="https://www.amnesty.org/ar/wp-content/uploads/2021/08/act760032006en.pdf"
              download="youth-activism-engagement-participation-guide.pdf"
              className="bg-[#FFFF00] rounded-[10px] w-[50px] py-3 flex flex-col gap-2 items-center justify-center hover:brightness-105 transition-all"
            >
              <Download width={20} height={20} />
              <p
                style={{
                  writingMode: "vertical-lr",
                }}
                className=""
              >
                ᠲᠠᠲᠠᠬᠤ
              </p>
            </a>
          </div>
        </div>
        <div className="flex gap-8">
          <h2
            className="font-bold text-2xl"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠪᠢᠳᠡ ᢈᠡᠷᢈᠢᠨ ᠠᠵᠢᠯᠯᠠᠳᠠᠭ ᠪᠤᠢ?
          </h2>
          <div className="relative z-0 w-full h-full">
            <Image
              src={"/mng/images/participation/youthhumanrights/youthcollective_new.jpg"}
              alt="Youth collective"
              fill
              className="object-contain z-0"
            />
            <div className="w-full h-full flex justify-center items-center gap-5 absolute top-0 left-0 bg-black/20 backdrop-blur-sm">
              <h2
                className="text-white text-2xl font-bold z-10"
                style={{
                  writingMode: "vertical-lr",
                }}
              >
                ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ ᠨᠢᢉᠡᠳᠦᠯ
              </h2>

              <Button
                text="ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ ᢈᠥᠳᠡᠯᢉᠡᢉᠡᠨ ᠳ᠋ᠦ ᠨᠢᢉᠡᠳᢈᠦ"
                type="banner"
                href="https://www.amnesty.org/en/about-us/our-leadership/#tab-youth"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <SectionTitle
            title="ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᠳᠡᠮᠵᠢᢉᠴᠢ ᠪᠣᠯᠤᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋ ᠶ᠋ᠢᠨ ᠢᠯᠭᠠᠭ᠎ᠠ ᠨᠢ ᠶᠠᠭᠤ ᠪᠤᠢ?"
            className="text-xl font-bold"
          />
          <div className="flex flex-col gap-4">
            {youthItems.map((item) => (
              <div key={item.id} className="flex gap-7 max-h-[400px]">
                <h3
                  className="text-2xl font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm font-bold"
                  style={{
                    writingMode: "vertical-lr",
                  }}
                >
                  {item.description}
                </p>
                <Button
                  text={item.id === 1 ? "ᠠᠻᠲ᠋ᠢᠸᠢᠰᠮ ᠳ᠋ᠤ ᠣᠷᠤᠯᠴᠠᠬᠤ" : "ᢉᠡᠰᠢᢉᠦᠨ ᠪᠣᠯᠬᠤ"}
                  type="primary"
                  className="w-12 whitespace-nowrap"
                  href={item.id === 1 ? "/mng/participation" : "https://forms.office.com/pages/responsepage.aspx?id=Kfjbwo03wUS0ehwEOSTd82OOUTGBqCBLh99jR3DTwohUNlJYR041VjdWSTVMQTEyNEozWkY1RU8wNS4u&route=shorturl"}
                  target={item.id === 2 ? "_blank" : undefined}
                  rel={item.id === 2 ? "noopener noreferrer" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const youthItems = [
  {
    id: 1,
    title: "ᠳᠡᠮᠵᠢᢉᠴᠢ",
    description:
      "ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠰᠠᠩᢈᠦᠦ ᠶ᠋ᠢᠨ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠦᠵᠡᢉᠦᠯᠳᠡᢉ᠂ ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠪᠣᠯᠤᠨ ᠴᠠᢈᠢᠮ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠢ᠋ ᠳᠡᠮᠵᠢᢉᠴᠢ ᢉᠡᠨ᠎ᠡ᠃ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ᠂ ᠪᠦᠰᠡ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠣᠯᠤᠨ ᠬᠣᠶᠠᠷ ᠵᠢᠯ ᠳ᠋ᠦ ᠨᠢᢉᠡ ᠤᠳᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ ᠮᠡᠢ-ᠡᠶᠢᠨ ᠶᠡᠷᠦᠩᢈᠡᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ᠂ ᠡᢉᠡᠯᠵᠢᠲᠦ ᠪᠤᠰᠤ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠬᠤᠷᠠᠯ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠦᢉᠡᠢ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃  ᠲᠡᠳᠡ ᠪᠦᠰᠡ ᠶ᠋ᠢᠨ ᠰᠢᠢᠳᠪᠦᠷᠢ᠂ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ᠂ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢ ᠶ᠋ᠢᠨ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃",
  },
  {
    id: 2,
    title: "ᢉᠡᠰᠢᢉᠦᠨ",
    description:
      "ᢉᠡᠰᠢᢉᠦᠨ ᢉᠡᠵᠦ ᠡᠮᠨᠧᠰᠲ᠋ᠢᢉ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠢ᠋ᠶᠡᠷ ᠪᠦᠷᠢᠳᢈᠡᢉᠦᠯᠦᢉᠰᠡᠨ᠂ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋ ᠲᠠᠲᠠᠪᠤᠷᠢ ᠲᠥᠯᠦᢉᠰᠡᠨ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠦᠢᠯᠡ ᠠᠶᠤᠯᠠᠯᠭᠠᠨ ᠳ᠋ᠤ ᠢᠳᠡᠪᢈᠢ᠂ ᠰᠠᠨᠠᠭᠠᠴᠢᠯᠠᠭᠠᠲᠠᠢ᠂ ᠲᠤᠭᠤᠰᠢᠲᠠᠢ ᠣᠷᠤᠯᠴᠠᠳᠠᠭ ᢈᠦᠮᠦᠰ ᠢ᠋ ᢈᠡᠯᠡᠨ᠎ᠡ᠃  ᠮᠡᢉᠡ ᢉᠡᠰᠢᢉᠦᠨ ᠨᠢ ᠬᠣᠶᠠᠷ ᠵᠢᠯ ᠳ᠋ᠦ ᠨᠢᢉᠡ ᠤᠳᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ ᠶᠡᠷᠦᠩᢈᠡᠢ ᠴᠢᠭᠤᠯᠭᠠᠨ ᠪᠣᠯᠤᠨ ᠡᢉᠡᠯᠵᠢᠲᠦ ᠪᠤᠰᠤ ᠬᠤᠷᠠᠯ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠲᠡᠢ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢ ᠪᠡᠷ ᠣᠷᠤᠯᠴᠠᠬᠤ᠂ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠰᠤᠷᠭᠠᠭᠠᠴᠢ ᠪᠠᠭᠰᠢ ᠶ᠋ᠢᠨ ᠰᠤᠷᠭᠠᠯᠲᠠ ᠳ᠋ᠤ ᠰᠠᠭᠤᠵᠤ᠂ ᠰᠤᠷᠭᠠᠭᠴᠢ ᠪᠠᠭᠰᠢ ᠪᠣᠯᠬᠤ᠂ ᢉᠡᠰᠢᢉᠦᠳ ᠵᠣᠷᠢᠭᠤᠯᠤᠭᠰᠠᠨ ᠪᠤᠰᠤᠳ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶᠡᠨ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠡᠷᢈᠡ ᠲᠡᠢ᠃  ᠲᠡᢉᠦᠨᠴᠢᠯᠡᠨ ᠮᠡᠢ-ᠡᠶᠢᠨ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ ᠦ᠋ᠨ ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯ ᠳ᠋ᠤ ᠨᠡᠷ᠎ᠡ ᠳᠡᠪᠰᠢᢈᠦ ᠪᠣᠯᠤᠨ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠴᠢᠭᠤᠯᠭ᠎ᠠ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ ᠨᠤᠭᠤᠳ ᠲᠤ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢᠳ ᠦ᠋ᠨ ᠪᠦᠷᠢᠯᠳᠦᢈᠦᠨ ᠳ᠋ᠦ ᠰᠣᠩᠭᠤᠭᠳᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᢉᠡᠷ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃",
  },
];
