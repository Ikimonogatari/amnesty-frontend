import Link from "next/link";
import Image from "next/image";

export default function FooterMobile() {
  return (
    <div className="w-full bg-[#2D2D2D] text-white py-8 px-4 overflow-hidden flex flex-col items-start gap-y-6 mt-auto">
      <div className="flex items-start gap-x-3">
        <div className="flex items-start gap-x-2">
          <Link
            href="/about"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠪᠢᠳᠨᠢ ᠲᠤᠬᠠᠢ
          </Link>
          <Link
            href="/about"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠨᠢᠭᠤᠴᠠᠯᠠᠯ ᠤ᠋ᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ
          </Link>
          <Link
            href="/contact"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
          </Link>
          <Link
            href="/faq"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ
          </Link>
          <Link
            href="/about"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠲᠡᢉᠰᠢ ᠪᠢᠰᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠤ᠋ᠨ ᠡᠰᠡᠷᢉᠦ
          </Link>
          <Link
            href="/about"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠲᠠᠶᠢᠯᠤᠨ
          </Link>
          <Link
            href="/about"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠮᠡᠢ ᠲᠡᠦᢈᠡᠨ ᠲᠣᠪᠴᠢᠶ᠎ᠠ
          </Link>
          <Link
            href="/about"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ
          </Link>
        </div>
        <div className="flex items-start gap-x-2">
          <Link
            href="/right"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭ᠎ᠠ
          </Link>
          <Link
            href="/right"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ
          </Link>
          <Link
            href="/campaign"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
          </Link>
        </div>
      </div>
      <div className="flex items-start gap-x-3">
        <div className="flex items-start gap-x-2">
          <Link
            href="#"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠤᠲᠠᠰᠤ
          </Link>
          {new Array(8).fill(0).map((_, index) => (
            <Link
              key={index}
              href="#"
              className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠤᠲᠠᠰᠤ
            </Link>
          ))}
        </div>
        <div className="flex items-start gap-x-2">
          <Link
            href="#"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠤᠲᠠᠰᠤ
          </Link>
          {new Array(2).fill(0).map((_, index) => (
            <Link
              key={index}
              href="#"
              className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
              style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
            >
              ᠬᠣᠯᠪᠣᠭᠳᠠᠬᠤ ᠤᠲᠠᠰᠤ
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const footerSections = [
  {
    id: "about",
    title: "ᠪᠢᠳᠡᠨ ᠦ᠋ ᠲᠤᠬᠠᠢ",
    links: [
      { text: "ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ", href: "#" },
      { text: "ᠮᠡᠢ ᠲᠡᠦᢈᠡᠨ ᠲᠣᠪᠴᠢᠶ᠎ᠠ", href: "#" },
      { text: "ᠲᠠᠶᠢᠯᠤᠨ", href: "#" },
      { text: "ᠲᠡᢉᠰᠢ ᠪᠢᠰᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠤ᠋ᠨ ᠡᠰᠡᠷᢉᠦ", href: "#" },
      { text: "ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ", href: "#" },
      { text: "ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ", href: "#" },
      { text: "ᠦᠶᠢᠯᠡᠴᠢᠯᠡᢉᠡᠨ ᠦ᠋ ᠨᠥᢈᠦᠴᠡᠯ", href: "#" },
      { text: "ᠨᠢᠭᠤᠴᠠᠯᠠᠯ ᠤ᠋ᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ", href: "#" },
    ],
  },
  {
    id: "participation",
    title: "ᠲᠠᠨ ᠤ᠋ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ",
    links: [
      { text: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ", href: "#" },
      { text: "ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠣᠯᠤᠨ ᠳᠠᠳᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ", href: "#" },
      { text: "ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ", href: "#" },
      { text: "ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ", href: "#" },
    ],
  },
  {
    id: "rights",
    title: "ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎",
    links: [
      { text: "ᠰᠠᠶᠢᠨ ᠮᠡᠳᠡᢉᠡ", href: "#" },
      { text: "ᠮᠡᠳᠡᢉᠳᠡᠯ ᠪᠠᠶᠢᠷᠢ ᠰᠠᠭᠤᠷᠢ", href: "#" },
      { text: "ᠮᠡᠳᠡᢉᠡ", href: "#" },
      { text: "ᠫᠣᠳ᠋ᠻᠠᠰᠲ", href: "#" },
      { text: "ᠸᠢᠳᠧᠣ᠋", href: "#" },
      { text: "ᠴᠠᢈᠢᠮ ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠩ", href: "#" },
      { text: "ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ", href: "#" },
      { text: "ᠰᠤᠷᠭᠠᠯᠲᠠ", href: "#" },
    ],
  },
  {
    id: "donate",
    title: "ᠬᠠᠨᠳᠢᠪ",
    links: [
      { text: "ᠲᠠᠨ ᠤ᠋ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ-ᠳ", href: "#" },
      { text: "ᠦᠵᠡᢉᠦᠯᠵᠦ ᠪᠤᠢ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠨᠢ ᠪᠢᠳᠡᠨ", href: "#" },
      { text: "ᠦ᠋ ᠰᠤᠳᠤᠯᠭ᠎ᠠ᠂ ᠢᠳᠡᠪᢈᠢᠵᠢᠯ᠂ ᠡᠪ", href: "#" },
      { text: "ᠰᠠᠨᠠᠭᠠᠨ ᠤ᠋ ᠨᠢᢉᠡᠳᠦᠯ ᠢ᠋ ᠥᠨᠦ ᠦᠶ᠎ᠡ", href: "#" },
      { text: "ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ", href: "#" },
      { text: "ᢈᠦᠷᢈᠡᢈᠦ ᠳ᠋ᠦ ᠮᠠᠰᠢ ᠴᠢᠬᠤᠯᠠ ᠶᠤᠮ᠃", href: "#" },
    ],
  },
];
