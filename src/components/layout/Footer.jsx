import Link from "next/link";

export default function Footer() {
  return (
    <div
      className="inline-flex ml-auto justify-between h-full py-5 px-10 text-white/70 bg-[#2D2D2D] shadow-[-4px_0_10px_rgba(0,0,0,0.2)] z-10"
      style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
    >
      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠪᠢᠳᠨᠢ ᠲᠤᠬᠠᠢ</h4>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠨᠢᠭᠤᠴᠠᠯᠠᠯ ᠤ᠋ᠨ ᠪᠣᠳᠤᠯᠭ᠎ᠠ
        </Link>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠦᠶᠢᠯᠡᠴᠢᠯᠡᢉᠡᠨ ᠦ᠋ ᠨᠥᢈᠦᠴᠡᠯ
        </Link>
        <Link
          href="/contact"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠬᠣᠯᠪᠤᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
        </Link>
        <Link
          href="/faq"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠦᢉᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ
        </Link>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠡᢉᠰᠢ ᠪᠢᠰᠢ ᠪᠠᠶᠢᠳᠠᠯ ᠤ᠋ᠨ ᠡᠰᠡᠷᢉᠦ
        </Link>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠲᠠᠶᠢᠯᠤᠨ
        </Link>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠢ ᠲᠡᠦᢈᠡᠨ ᠲᠣᠪᠴᠢᠶ᠎ᠠ
        </Link>
        <Link
          href="/about"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠦᠲᠦᠴᠡ
        </Link>
      </div>

      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭ᠎ᠠ</h4>
        <Link
          href="/right"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠨᠢᠳᠦ
        </Link>
        <Link
          href="/campaign"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠠᠶᠢᠨ ᠳᠤᠷ᠎ᠠ ᠶ᠋ᠢᠨ ᠪᠣᠯᠤᠨ ᠳᠠᠳᠤᠯᠭ᠎ᠠ ᠶ᠋ᠢᠨ ᠠᠵᠢᠯ
        </Link>
        <Link
          href="/right"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠥᠯᠦᢉᠡ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ
        </Link>
        <Link
          href="/campaign"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠣᠯᠠᠨ ᠨᠡᠶᠢᠲᠡ ᠶ᠋ᠢᠨ ᠠᠷᠭ᠎ᠠ ᢈᠡᠮᠵᠢᠶ᠎ᠡ
        </Link>
      </div>

      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠡᠷᢈᠡ ᠪᠡᠨ ᠮᠡᠳᠡᠶ᠎</h4>
        <Link
          href="/news"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠠᠶᠢᠨ ᠮᠡᠳᠡᢉᠡ
        </Link>
        <Link
          href="/news?type=statements"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠳᠡᢉᠳᠡᠯ ᠪᠠᠶᠢᠷᠢ ᠰᠠᠭᠤᠷᠢ
        </Link>
        <Link
          href="/news?type=good_news"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠮᠡᠳᠡᢉᠡ
        </Link>
        <h4 className="text-white text-lg mb-2">ᠲᠠᠨ ᠤ᠋ ᠣᠷᠤᠯᠴᠠᠭ᠎ᠠ</h4>
        <Link
          href="/podcasts"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠫᠣᠳ᠋ᠻᠠᠰᠲ
        </Link>
        <Link
          href="/videos"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠸᠢᠳᠧᠣ᠋
        </Link>
        <Link
          href="/campaign"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠴᠠᢈᠢᠮ ᠨᠣᠮ ᠤ᠋ᠨ ᠰᠠᠩ
        </Link>
        <Link
          href="/campaign"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠴᠠᢈᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ
        </Link>
        <Link
          href="/participation"
          className="hover:text-white transition-colors cursor-pointer"
        >
          ᠰᠤᠷᠭᠠᠯᠲᠠ
        </Link>
      </div>

      <div className="flex flex-col-reverse items-start gap-5 font-bold">
        <h4 className="text-white text-lg mb-2">ᠬᠠᠨᠳᠢᠪ</h4>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᢈᠦᠷᢈᠡᢈᠦ ᠳ᠋ᠦ ᠮᠠᠰᠢ ᠴᠢᠬᠤᠯᠠ ᠶᠤᠮ᠃
        </p>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᠶ᠋ᠢᠨ ᢈᠦᠮᠦᠨ ᠦ᠋ ᠡᠷᢈᠡ ᠶ᠋ᠢᠨ ᠲᠡᠮᠡᠴᠡᠯ ᠳ᠋ᠦ{" "}
        </p>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᠰᠠᠨᠠᠭᠠᠨ ᠤ᠋ ᠨᠢᢉᠡᠳᠦᠯ ᠢ᠋ ᠥᠨᠦ ᠦᠶ᠎ᠡ{" "}
        </p>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᠦ᠋ ᠰᠤᠳᠤᠯᠭ᠎ᠠ᠂ ᠢᠳᠡᠪᢈᠢᠵᠢᠯ᠂ ᠡᠪ
        </p>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᠦᠵᠡᢉᠦᠯᠵᠦ ᠪᠤᠢ ᠳᠡᠮᠵᠢᠯᢉᠡ ᠨᠢ ᠪᠢᠳᠡᠨ
        </p>
        <p className="hover:text-white transition-colors cursor-pointer">
          ᠲᠠᠨ ᠤ᠋ ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠢᠨᠲ᠋ᠧᠷᠨᠡᠰᠢᠨᠯ-ᠳ
        </p>
      </div>
    </div>
  );
}
