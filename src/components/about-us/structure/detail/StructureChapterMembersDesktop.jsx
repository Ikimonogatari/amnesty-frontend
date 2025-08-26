import Image from "next/image";
import Link from "next/link";
import StaticHeader from "@/components/common/StaticHeader";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
export default function StructureChapterMembersDesktop() {
  const router = useRouter();
  return (
    <div className="h-full hidden sm:flex gap-20 overflow-x-auto w-auto flex-shrink-0 max-h-screen sm:overflow-y-hidden min-w-screen">
      <StaticHeader
        image="/images/news1.png"
        alt="Chapter Members Page Header"
        width="90rem"
        title="ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ ᢉᠡᠰᠢᢉᠦᠳ"
      />
      <div className="flex gap-20 p-4 h-full">
        <div className="flex gap-10">
          <h2
            className="text-[10px] sm:text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠯ ᠦ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠳ
          </h2>
          <p
            className="text-[8px] sm:text-sm"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠤᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ (ᠮᠡᠶᠢ) ᠨᠢ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠭᠰᠠᠨ ᠴᠠᠭ ᠠ᠋ᠴᠠ
            ᠪᠠᠨ ᠡᢈᠢᠯᠡᠨ ᠥᠨᠦ ᠶ᠋ᠢ ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠣᠷᠤᠨ ᠳᠠᠶᠠᠭᠠᠷ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠬᠠᠮᠠᠭᠠᠯᠠᠭᠴᠢ
            ᠑᠐'᠐᠐᠐ ᠭᠠᠷᠤᠢ ᢉᠡᠰᠢᢉᠦᠳ᠂ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠲᠡᠢ ᠪᠣᠯᠤᠭᠰᠠᠨ᠃ ᢉᠡᠰᠢᢉᠦᠳ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ
            ᠪᠦᠯᠦᢉ ᠲᠦ ᠬᠤᠪᠢᠶᠠᠭᠳᠠᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠣᠷᠤᠯᠴᠠᠳᠠᠭ᠃ ᠪᠦᠯᠦᢉ ᠲᠤᠰ ᠪᠦᠷᠢ
            ᠬᠠᠷᠢᠭᠤᠴᠠᠭᠰᠠᠨ ᠠᠬᠠᠯᠠᠭᠴᠢ ᠲᠠᠢ ᠪᠥᢉᠡᠳ ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ ᠬᠤᠷᠠᠯ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ ᠲᠣᠭᠲᠠᠮᠠᠯ
            ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠵᠤ ᢉᠡᠰᠢᢉᠦᠳ ᠢ᠋ᠶᠡᠨ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠲᠠᠲᠠᠨ
            ᠣᠷᠤᠯᠴᠠᠭᠤᠯᠳᠠᠭ᠃ ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠠᠭᠤᠯᠵᠠᠯᠲᠠ ᠶ᠋ᠢ ᠵᠢᠯ ᠳ᠋ᠦ ᠔-ᠨ ᠤᠳᠠᠭ᠎ᠠ
            ᠪᠥᢉᠡᠳ ᠤᠯᠠᠷᠢᠯ ᠳ᠋ᠤ ᠨᠢᢉᠡ ᠤᠳᠠᠭ᠎ᠠ ᠵᠣᢈᠢᠶᠠᠨ ᠪᠠᠶᠢᠭᠤᠯᠤᠭᠳᠠᠳᠠᠭ᠃ ᠣᠳᠤ ᠪᠠᠷ ᠒᠕-ᠨ
            ᠪᠦᠯᠦᢉ ᠲᠡᠢ ᠪᠡᠷ ᠦᠶᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭ᠎ᠠ ᠪᠠᠨ ᠶᠠᠪᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠨ᠎ᠠ᠃ ᠮᠥᠨ ᠲᠡᢉᠦᠨᠴᠢᠯᠡᠨ
            ᢈᠥᠳᠡᢉᠡ ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠲᠤ᠂ ᠶᠧᠪᠰ᠂ ᠶᠡᢈᠡ ᠳᠡᢉᠡᠳᠦ ᠰᠤᠷᠭᠠᠭᠤᠯᠢ ᠳᠡᢉᠡᠷ᠎ᠡ ᠪᠦᠯᠦᢉ᠂
            ᠻᠯᠦ᠋ᠪ ᠪᠠᠶᠢᠭᠤᠯᠤᠨ ᠠᠵᠢᠯᠯᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <div className="flex flex-row rounded-lg border border-solid border-[#CCCCCC]">
            <Image
              src="/images/aboutSub1/chapter/ZaluuchuudBulegFront.png"
              alt="Залуучуудын бүлэг"
              width={330}
              height={271}
              className="rounded-l-[8px] max-w-[330px] max-h-[271px] aspect-[330/271]"
            />
            <Link
              href="/participation/youth"
              className="mx-auto flex justify-center p-4 border-l-[1px] border-[#CCCCCC] text-[10px] sm:text-lg"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠵᠠᠯᠠᠭᠤᠴᠤᠤᠯ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ
            </Link>
          </div>

          <div className="flex flex-row rounded-lg border border-solid border-[#CCCCCC]">
            <Image
              src="/images/aboutSub1/chapter/mergejilten.png"
              alt="Мэргэжилтнүүдийн бүлэг"
              width={330}
              height={271}
              className="rounded-l-[8px] max-w-[330px] max-h-[271px] aspect-[330/271]"
            />
            <div
              className="mx-auto flex justify-center p-4 border-l-[1px] border-[#CCCCCC] text-[10px] sm:text-lg"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠮᠡᠷᢉᠡᠵᠢᠯᠲᠡᠨ ᠨᠦ᠋ᢉᠦᠳ ᠦ᠋ᠨ ᠪᠦᠯᠦᢉ ᠦ᠋ᠨ
            </div>
          </div>

          <div className="flex flex-row rounded-lg border border-solid border-[#CCCCCC]">
            <Image
              src="/images/aboutSub1/chapter/gazriinremovebg-preview.png"
              alt="Орон нутгийн бүлэг"
              width={330}
              height={271}
              className="rounded-l-[8px] max-w-[330px] max-h-[271px] aspect-[330/271]"
            />
            <Link
              href="#oronnutag"
              className="mx-auto flex justify-center p-4 border-l-[1px] border-[#CCCCCC] text-[10px] sm:text-lg"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-5" id="oronnutag">
          <h3
            className="text-xs sm:text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠣᠷᠤᠨ ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ ᠪᠦᠯᠦᢉ
          </h3>
          <Image
            src="/images/aboutSub1/chapter/gazriinremovebg-preview.png"
            alt="Монгол улсын газрын зураг"
            width={640}
            height={314}
            className="aspect-[640/314] min-w-[640px] min-h-[314px] max-w-[640px] max-h-[314px]"
          />
        </div>

        <div>
          <h4
            className="text-xs sm:text-2xl font-bold"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠮᠣᠩᠭᠣᠯ ᠤ᠋ᠨ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨ᠋ᠲ᠋ᠧᠷᠨᠡᠰᠢᠩᠯᠡ ᠶ᠋ᠢᠨ ᠳᠡᠮᠵᠢᢉᠴᠢ ᠪᠣᠯᠤᠨ ᢉᠡᠰᠢᢉᠦᠨ ᠦ᠋
            ᠶ᠋ᠢᠨ ᠢᠯᠭᠠᠭ᠎ᠠ ᠨᠢ ᠶᠠᠭᠤ ᠪᠤᠢ?
          </h4>
        </div>

        <div className="flex flex-col items-center justify-center gap-20">
          <div className="relative flex flex-row gap-2 justify-center max-h-[250px]">
            <h4
              className="text-[10px] sm:text-2xl"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠮᠵᠢᢉᠴᠢ
            </h4>
            <p
              className="text-[8px] sm:text-base"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠮᠵᠢᢉᠴᠢ ᠨᠢ ᠰᠠᠩᢈᠦᠦ ᠶ᠋ᠢᠨ ᠬᠤᠪᠢ ᠳ᠋ᠤ ᠬᠤᠪᠢ ᠨᠡᠮᠡᠷᠢ ᠪᠡᠨ ᠣᠷᠤᠭᠤᠯᠵᠤ ᠪᠠᠶᠢᠭ᠎ᠠ
              ᠡᠰᠡᠪᠡᠯ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ ᠦ᠋ᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ ᠠᠪᠴᠤ ᠪᠠᠶᠢᠭ᠎ᠠ
              ᢈᠦᠮᠦᠰ᠃ ᠡᠨᠡ ᠨᠢ ᠰᠠᠷ᠎ᠠ ᠪᠦᠷᠢ ᠬᠠᠨᠳᠢᠪᠯᠠᠭᠴᠢ ᠠ᠋ᠴᠠ ᠠᠪᠬᠤᠭᠤᠯᠤᠭᠠᠳ ᠣᠨ᠋ᠯᠠᠶᠢᠨ᠋
              ᠡᠷᢉᠦᠳᠡᠯ ᠳ᠋ᠦ ᠭᠠᠷ ᠤ᠋ᠨ ᠦᠰᠦᢉ ᠵᠢᠷᠤᠭᠰᠠᠨ ᢈᠦᠮᠦᠨ ᢈᠦᠷᠲᠡᠯ᠎ᠡ ᠪᠠᠶᠢᠵᠤ ᠪᠣᠯᠤᠨ᠎ᠠ᠃
              ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠬᠣᠷᠢᠶᠠᠳ ᠲᠤ ᠡᠯᠰᠡᢈᠦ᠂ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠡᢉᠦᠷᢉᠡ ᢉᠦᠢᠴᠡᠳᢈᠡᢈᠦ ᠵᠡᠷᢉᠡ
              ᠪᠢᠳᠡᠨ ᠦ᠋ ᢈᠢᠳᠡᢉ ᠶᠡᢈᠡᠩᢈᠢ ᠵᠦᠢᠯ ᠳ᠋ᠦ ᠣᠷᠤᠯᠴᠠᠵᠤ ᠪᠣᠯᠬᠤ ᠴᠤ ᠵᠠᠷᠯᠠᠭᠳᠠᠭᠰᠠᠨ
              ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯ ᠳ᠋ᠤ ᠨᠡᠷ᠎ᠡ ᠳᠡᠪᠰᠢᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃ ᠮᠥᠨ ᠳᠡᠮᠵᠢᢉᠴᠢᠳ ᠪᠦᠰᠡ
              ᠨᠤᠲᠤᠭ ᠤ᠋ᠨ᠂ ᠵᠢᠯ ᠦ᠋ᠨ ᠪᠣᠯᠤᠨ ᠡᢉᠡᠯᠵᠢᠲᠦ ᠪᠤᠰᠤ ᢉᠡᠰᠢᢉᠦᠳ ᠦ᠋ᠨ ᠬᠤᠷᠠᠯ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ
              ᠤ᠋ᠨ ᠡᠷᢈᠡ ᠦᢉᠡᠢ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠲᠡᠳᠡ ᠪᠦᠰᠡ ᠶ᠋ᠢᠨ ᠰᠢᠢᠳᠪᠦᠷᠢ᠂
              ᠵᠠᢈᠢᠷᠤᠯ᠂ ᠣᠯᠠᠨ ᠤᠯᠤᠰ ᠤ᠋ᠨ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢ ᠶ᠋ᠢᠨ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ
              ᠪᠣᠯᠤᠮᠵᠢ ᠦᢉᠡᠢ᠃
            </p>
            <Button
              text={"ᠠᠻᠲ᠋ᠢᠸᠢᠰᠮ ᠳ᠋ᠤ ᠣᠷᠤᠯᠴᠠᠬᠤ"}
              onClick={() => router.push("/participation")}
            />
          </div>
          <div className="border-t-[1px] w-full h-[1px] border-dashed border-gray-400"></div>
          <div className="relative flex flex-row gap-2 justify-center max-h-[250px]">
            <h4
              className="text-[10px] sm:text-2xl"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᢉᠡᠰᠢᢉᠦᠨ
            </h4>
            <p
              className="text-[8px] sm:text-base"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᢉᠡᠰᠢᢉᠦᠨ ᠵᠠᠰᠠᠭᠯᠠᠯ ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭᠠᠲᠠᠢ ᠦᠢᠯᠡ ᠠᠵᠢᠯᠯᠠᠭᠠᠨ ᠳ᠋ᠤ ᠪᠦᠷᠢᠨ ᠣᠷᠤᠯᠴᠠᠬᠤ
              ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃ ᠵᠢᠯ ᠦ᠋ᠨ ᠨᠢᢉᠡᠳᠦᢉᠰᠡᠨ ᠬᠤᠷᠠᠯ ᠪᠣᠯᠤᠨ ᠡᢉᠡᠯᠵᠢᠲᠦ ᠪᠤᠰᠤ ᠬᠤᠷᠠᠯ
              ᠤ᠋ᠨ ᠲᠠᠯᠠᠭᠠᠷ ᠵᠥᠪᢈᠡᠨ ᢉᠡᠰᠢᢉᠦᠳ ᠲᠦ ᠮᠡᠳᠡᢉᠳᠡᠳᠡᢉ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᢉᠡᠷ ᠬᠤᠷᠠᠯᠳᠤᠭᠠᠨ
              ᠳ᠋ᠤ ᠵᠥᠪᢈᠡᠨ ᢉᠡᠰᠢᢉᠦᠳ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠡᠷᢈᠡ ᠲᠡᠢ᠃ ᢉᠡᠰᠢᢉᠦᠳ ᠤᠳᠤᠷᠢᠳᠬᠤ ᠵᠥᠪᠯᠡᠯ
              ᠦ᠋ᠨ ᠠᠯᠪᠠᠨ ᠲᠤᠰᠢᠶᠠᠯ ᠳ᠋ᠤ ᠨᠡᠷ᠎ᠡ ᠳᠡᠪᠰᠢᢈᠦ ᠡᠰᠡᠪᠡᠯ ᠳᠡᠯᠡᢈᠡᠢ ᠶ᠋ᠢᠨ ᠴᠢᠭᠤᠯᠭ᠎ᠠ
              ᠠᠭᠤᠯᠵᠠᠯᠲᠠ ᠳ᠋ᠤ ᠣᠷᠤᠯᠴᠠᠬᠤ ᠲᠥᠯᠦᢉᠡᠯᠡᢉᠴᠢᠳ ᠦ᠋ᠨ ᠪᠦᠷᠢᠯᠳᠦᢈᠦᠨ ᠳ᠋ᠦ ᠣᠷᠤᠬᠤ
              ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ ᠪᠥᢉᠡᠳ ᠲᠡᠳᠡᢉᠡᠷ ᠰᠣᠩᠭᠤᠭᠤᠯᠢ ᠳ᠋ᠤ ᠰᠠᠨᠠᠯ ᠥᢉᢈᠦ ᠪᠣᠯᠤᠮᠵᠢ ᠲᠠᠢ᠃
              ᠪᠦᢈᠦ ᢉᠡᠰᠢᢉᠦᠳ ᠥᠪᠡᠷᠰᠡᠳ ᠦ᠋ᠨ ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ ᠢ᠋ᠶᠡᠨ ᠵᠠᠰᠠᠭᠯᠠᠯ
              ᠲᠠᠢ ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠲᠠᠢ ᠲᠣᠳᠤᠷᠬᠠᠢ ᠵᠣᠷᠢᠯᠭ᠎ᠠ ᠪᠠᠷ ᠪᠤᠰᠤᠳ ᢉᠡᠰᠢᢉᠦᠳ ᠲᠡᠢ
              ᠬᠤᠪᠢᠶᠠᠯᠴᠠᠬᠤ ᠶ᠋ᠢ ᠵᠥᠪᠰᠢᠶᠡᠷᠡᢈᠦ ᠶᠣᠰᠤᠲᠠᠢ᠃
            </p>
            <Button
              text={"ᢉᠡᠰᠢᢉᠦᠨ ᠪᠣᠯᠬᠤ"}
              onClick={() => router.push("/member")}
            />
          </div>
        </div>
        <div
          className="text-xs sm:text-2xl text-center"
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
