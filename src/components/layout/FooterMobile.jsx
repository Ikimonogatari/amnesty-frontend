import Link from "next/link";

export default function FooterMobile() {
  return (
    <div className="w-full bg-[#2D2D2D] text-white py-8 px-4 overflow-hidden flex flex-col items-start gap-y-6 mt-auto">
      {/* First row - About & Participation */}
      <div className="flex items-start gap-x-3">
        {/* Бидний тухай - About */}
        <div className="flex items-start gap-x-2">
          <Link
            href="/about"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠪᠢᠳᠡᠨ ᠦ ᠲᠤᠬᠠᠢ
          </Link>
          <Link
            href="/about/1"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭᠠ ᠶᠢᠨ ᠪᠦᠲᠦᠴᠡ
          </Link>
          <Link
            href="/about/2"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠮᠡᠢ ᠲᠦᠦᠬᠡᠨ ᠲᠣᠪᠴᠢᠶᠠ
          </Link>
          <Link
            href="/about/3"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠲᠠᠢᠯᠠᠨ
          </Link>
          <Link
            href="/about/4"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠲᠡᠭᠰᠢ ᠪᠢᠰᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠦᠨ ᠡᠰᠡᠷᠭᠦ
          </Link>
          <Link
            href="/faq"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ
          </Link>
          <Link
            href="/contact"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠬᠣᠯᠪᠤᠭᠠ ᠪᠠᠷᠢᠬᠤ
          </Link>
          <Link
            href="/terms"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠦᠢᠯᠡᠴᠢᠯᠡᠯᠳᠦ ᠶᠢᠨ ᠨᠥᠬᠥᠴᠦᠯ
          </Link>
          <Link
            href="/privacy"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠨᠢᠭᠤᠴᠠ ᠶᠢᠨ ᠪᠣᠳᠣᠯᠭᠠ
          </Link>
        </div>

        {/* Таны оролцоо - Your participation */}
        <div className="flex items-start gap-x-2">
          <Link
            href="/participation"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭᠠ
          </Link>
          <Link
            href="/participation/events"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶᠢᠨ ᠠᠷᠭᠠ ᠬᠡᠮᠵᠢᠶᠡ
          </Link>
          <Link
            href="/participation/youthhumanrights"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠦᠭᠡ ᠵᠠᠯᠠᠭᠴᠤᠳ
          </Link>
          <Link
            href="/participation/volunteer"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠰᠠᠢᠢᠨ ᠳᠤᠷᠠ ᠪᠣᠯᠣᠨ ᠳᠠᠳᠠᠯᠭᠠ ᠶᠢᠨ ᠠᠵᠢᠯ
          </Link>
          <Link
            href="/participation/humanrighteye"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠢᠳᠦ
          </Link>
        </div>
      </div>

      {/* Second row - News & Know Your Rights */}
      <div className="flex items-start gap-x-3">
        {/* Мэдээ мэдээлэл - News & Information */}
        <div className="flex items-start gap-x-2">
          <Link
            href="/news"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠮᠡᠳᠡᠭᠡ ᠮᠡᠳᠡᠯᠡᠯ
          </Link>
          <Link
            href="/news"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠮᠡᠳᠡᠭᠡ
          </Link>
          <Link
            href="/news?type=statements"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠮᠡᠳᠡᠭᠳᠡᠯ ᠪᠠᠶᠢᠷᠢ ᠰᠠᠭᠤᠷᠢ
          </Link>
          <Link
            href="/news?type=good_news"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠰᠠᠢᠢᠨ ᠮᠡᠳᠡᠭᠡ
          </Link>
        </div>

        {/* эрхээ мэдье - Know Your Rights */}
        <div className="flex items-start gap-x-2">
          <Link
            href="/lessons"
            className="text-white text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ
          </Link>
          <Link
            href="/lessons"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠰᠤᠷᠭᠠᠯᠲᠠ
          </Link>
          <Link
            href="/online-lessons"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ
          </Link>
          <Link
            href="/library"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ
          </Link>
          <Link
            href="/videos"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠸᠢᠳ᠋ᠧᠣ
          </Link>
          <Link
            href="/podcasts"
            className="text-[#9B9B9B] text-[10px] transition-colors font-bold"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠫᠣᠳᠻᠠᠰᠲ
          </Link>
        </div>
      </div>

      {/* Third row - Donation text */}
      <div className="flex items-start gap-x-3">
        <div className="flex items-start gap-x-1">
          <p
            className="text-white text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠬᠠᠨᠳᠢᠪ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠲᠠᠨ ᠤ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠡᠰᠢᠨᠯ ᠳ᠋ᠤ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠦᠵᠡᠳᠦᠯᠵᠦ ᠪᠤᠢ ᠳᠡᠮᠵᠢᠯᠭᠡ ᠨᠢ ᠪᠢᠳᠡᠨ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠦ ᠰᠤᠳᠤᠯᠭᠠ᠂ ᠢᠳᠡᠪᠬᠢᠵᠢᠯ᠂ ᠡᠪ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠰᠠᠨᠠᠭᠠᠨ ᠤ ᠨᠢᠪᠦᠳᠦᠯ ᠢ ᠥᠨᠦ ᠦᠶ᠎ᠡ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠶᠢᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠡᠮᠡᠴᠡᠯ ᠳᠦ
          </p>
          <p
            className="text-[#9B9B9B] text-[9px] opacity-80 font-light"
            style={{ writingMode: "vertical-lr" }}
          >
            ᠳᠡᠯᠬᠢ ᠳᠤ ᠮᠠᠰᠢ ᠴᠢᠬᠤᠯᠠ ᠶᠤᠮ
          </p>
        </div>
      </div>
    </div>
  );
}
