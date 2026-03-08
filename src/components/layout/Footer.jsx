import Link from "next/link";

export default function Footer() {
  return (
    <div
      className="inline-flex ml-auto justify-between h-full py-5 px-10 text-white/70 bg-[#2D2D2D] shadow-[-4px_0_10px_rgba(0,0,0,0.2)] z-10"
      style={{ 
        writingMode: "vertical-rl",
        WebkitWritingMode: "vertical-rl"
      }}
    >
      {/* Бидний тухай - About */}
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠪᠢᠳᠡᠨ ᠦ ᠲᠤᠬᠠᠢ</h4>
        <Link
          href="/privacy"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠨᠢᠭᠤᠴᠠ ᠶᠢᠨ ᠪᠣᠳᠣᠯᠭᠠ
        </Link>
        <Link
          href="/terms"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠦᠢᠯᠡᠴᠢᠯᠡᠯᠳᠦ ᠶᠢᠨ ᠨᠥᠬᠥᠴᠦᠯ
        </Link>
        <Link
          href="/contact"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠬᠣᠯᠪᠤᠭᠠ ᠪᠠᠷᠢᠬᠤ
        </Link>
        <Link
          href="/faq"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ
        </Link>
        <Link
          href="/about/4"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠡᠭᠰᠢ ᠪᠢᠰᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠦᠨ ᠡᠰᠡᠷᠭᠦ
        </Link>
        <Link
          href="/about/3"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠠᠢᠯᠠᠨ
        </Link>
        <Link
          href="/about/2"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠢ ᠲᠦᠦᠬᠡᠨ ᠲᠣᠪᠴᠢᠶᠠ
        </Link>
        <Link
          href="/about/1"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭᠠ ᠶᠢᠨ ᠪᠦᠲᠦᠴᠡ
        </Link>
      </div>

      {/* Таны оролцоо - Your participation */}
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭᠠ</h4>
        <Link
          href="/participation/humanrighteye"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠢᠳᠦ
        </Link>
        <Link
          href="/participation/volunteer"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠠᠢᠢᠨ ᠳᠤᠷᠠ ᠪᠣᠯᠣᠨ ᠳᠠᠳᠠᠯᠭᠠ ᠶᠢᠨ ᠠᠵᠢᠯ
        </Link>
        <Link
          href="/participation/youthhumanrights"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠥᠯᠦᠭᠡ ᠵᠠᠯᠠᠭᠴᠤᠳ
        </Link>
        <Link
          href="/participation/events"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶᠢᠨ ᠠᠷᠭᠠ ᠬᠡᠮᠵᠢᠶᠡ
        </Link>
      </div>

      {/* Мэдээ мэдээлэл - News & Information */}
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠮᠡᠳᠡᠭᠡ ᠮᠡᠳᠡᠯᠡᠯ</h4>
        <Link
          href="/news?type=good_news"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠠᠢᠢᠨ ᠮᠡᠳᠡᠭᠡ
        </Link>
        <Link
          href="/news?type=statements"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠳᠡᠭᠳᠡᠯ ᠪᠠᠶᠢᠷᠢ ᠰᠠᠭᠤᠷᠢ
        </Link>
        <Link
          href="/news"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠳᠡᠭᠡ
        </Link>
      </div>

      {/* эрхээ мэдье - Know Your Rights */}
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠡᠷᠬᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶᠡ</h4>
        <Link
          href="/podcasts"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠫᠣᠳᠻᠠᠰᠲ
        </Link>
        <Link
          href="/videos"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠸᠢᠳ᠋ᠧᠣ
        </Link>
        <Link
          href="/library"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠩ
        </Link>
        <Link
          href="/online-lessons"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ
        </Link>
        <Link
          href="/lessons"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠤᠷᠭᠠᠯᠲᠠ
        </Link>
      </div>

      {/* Хандив - Donate section (content from old web) */}
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠬᠠᠨᠳᠢᠪ</h4>
        <p className="text-sm opacity-80">ᠳᠡᠯᠬᠢ ᠳᠤ ᠮᠠᠰᠢ ᠴᠢᠬᠤᠯᠠ ᠶᠤᠮ</p>
        <p className="text-sm opacity-80">ᠶᠢᠨ ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠡᠮᠡᠴᠡᠯ ᠳᠦ</p>
        <p className="text-sm opacity-80">ᠰᠠᠨᠠᠭᠠᠨ ᠤ ᠨᠢᠪᠦᠳᠦᠯ ᠢ ᠥᠨᠦ ᠦᠶ᠎ᠡ</p>
        <p className="text-sm opacity-80">ᠦ ᠰᠤᠳᠤᠯᠭᠠ᠂ ᠢᠳᠡᠪᠬᠢᠵᠢᠯ᠂ ᠡᠪ</p>
        <p className="text-sm opacity-80">ᠦᠵᠡᠳᠦᠯᠵᠦ ᠪᠤᠢ ᠳᠡᠮᠵᠢᠯᠭᠡ ᠨᠢ ᠪᠢᠳᠡᠨ</p>
        <p className="text-sm opacity-80">ᠲᠠᠨ ᠤ ᠡᠮᠨᠧᠰᠲᠢ ᠢᠨᠲᠧᠷᠨᠡᠰᠢᠨᠯ ᠳ᠋ᠤ</p>
      </div>
    </div>
  );
}
