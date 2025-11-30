import Button from "@/components/common/Button";
import Link from "next/link";

export default function StructureDiagramMobile() {
  return (
    <div className="relative">
      <img src="/images/structure-diagram.png" alt="" className="h-full z-0" />
      <div className="z-10 flex gap-[51px] absolute top-[68px] w-full h-full">
        <div className="flex flex-col gap-[106px] ml-[78px]">
          <Link
            href="/about/1/control-managers"
            className="border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
          >
            <p
              className="text-black text-[5px] pl-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
            </p>
          </Link>
          <Link
            href="/about/1/managers"
            className="border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
          >
            <p
              className="text-black text-[5px] pl-1"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
            </p>
          </Link>
        </div>
        <Link
          href="/about/1/chapter-members"
          className="mt-[67px] border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
        >
          <p
            className="text-black text-[5px] pl-[2px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>
        <Link
          href="/about/1/chapter-members"
          className="mt-[68px] border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
        >
          <p
            className="text-black text-[5px] pl-[2px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
          </p>
        </Link>
        <div className="flex flex-col gap-[100px]">
          <Link
            href="/about/1/chapter-members"
            className="border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
          >
            <p
              className="text-black text-[5px] pl-[2px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
            </p>
          </Link>
          <Link
            href="/about/1/chapter-members"
            className="border border-solid border-[#E3E3E3] bg-white rounded-[3px] max-h-12 whitespace-nowrap py-2 flex items-center justify-center hover:brightness-105 transition-all"
          >
            <p
              className="text-black text-[5px] pl-[2px]"
              style={{
                writingMode: "vertical-lr",
              }}
            >
              ᠳᠡᠯᢉᠡᠷᠡᠩᢉᠦᠢ
            </p>
          </Link>
        </div>
      </div>
      <div className="z-0 flex absolute top-[48px] w-full h-full whitespace-nowrap font-bold text-[4px]">
        <p
          className="text-black mt-[92px] ml-[25px]"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᠴᠢᠭᠤᠯᠭᠠᠨ
        </p>
        <div className="flex flex-col ml-[30px]">
          <p
            className="text-black"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="text-black mt-[110px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
        </div>
        <p
          className="text-black ml-[58px] mt-[75px]"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
        </p>
        <p
          className="text-black ml-[55px] mt-[75px]"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
        </p>
        <div className="flex flex-col ml-[58px]">
          <p
            className="text-black"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
          <p
            className="text-black mt-[110px]"
            style={{
              writingMode: "vertical-lr",
            }}
          >
            ᢈᠢᠨᠠᠯᠲᠠ ᠶ᠋ᠢᠨ ᠵᠥᠪᠡᠯᢉᠡᢉᠡ
          </p>
        </div>
      </div>
    </div>
  );
}
