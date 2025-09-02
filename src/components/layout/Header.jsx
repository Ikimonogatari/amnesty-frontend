import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchModal from "@/components/common/SearchModal";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const handleMouseEnter = (index) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Menu items for the 2x3 grid - exact old web order
  const menuItems = [
    {
      text: "ᠪᠢᠳᠨᠢ ᠲᠤᠬᠠᠢ",
      link: "/about",
      hasDropdown: true,
      dropdownItems: [
        { text: "ᠪᠠᠶᠢᠭᠤᠯᠤᠯᠭ᠎ᠠ ᠶᠢᠨ ᠪᠦᠲᠦᠬ", link: "/about/1" },
        { text: "ᠮᠦᠢ ᠲᠦᠦᠬᠡᠨ ᠲᠣᠪᠴᠢᠶ᠎ᠠ", link: "/about/2" },
        { text: "ᠲᠠᠢᠯᠠᠨ", link: "/about/3" },
        { text: "ᠶᠡᠷᠦᠨᠬᠢᠶ ᠴᠤᠤᠯᠭᠠᠨ", link: "/about/5" },
        { text: "ᠲᠦᠭᠡᠮᠡᠯ ᠠᠰᠠᠭᠤᠯᠲᠠ ᠬᠠᠷᠢᠭᠤᠯᠲᠠ", link: "/faq" },
        { text: "ᠬᠣᠯᠪᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ", link: "/contact" },
      ],
    },
    { text: "ᠬᠠᠮᠫᠠᠨᠢᠲ ᠠᠵᠢᠯ", link: "/campaign" },
    {
      text: "ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭ᠎ᠠ",
      link: "/participation",
      hasDropdown: true,
      dropdownItems: [
        {
          text: "ᠣᠯᠠᠨ ᠨᠢᠶᠲᠡ ᠶᠢᠨ ᠠᠷᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶ᠎ᠡ",
          link: "/participation/events",
        },
        {
          text: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠵᠠᠯᠠᠭᠤᠴᠤᠳ",
          link: "/participation/youthhumanrights",
        },
        {
          text: "ᠰᠠᠢᠨ ᠳᠤᠷᠤᠨ ᠪᠣᠯᠣᠨ ᠳᠠᠳᠯᠠᠭ᠎ᠠ ᠶᠢᠨ ᠠᠵᠢᠯ",
          link: "/participation/volunteer",
        },
        {
          text: "ᠬᠦᠮᠦᠨ ᠦ ᠡᠷᠬᠡ ᠶᠢᠨ ᠨᠢᠳᠦᠨ",
          link: "/participation/humanrighteye",
        },
        {
          text: "ᠡᠷᠬᠡ ᠶᠢᠨ ᠲᠦᠯᠦᠭᠡ ᠪᠢᠴᠢᠴᠡᠭᠡᠶ᠎ᠡ",
          link: "/campaign/writeforrights",
        },
      ],
    },
    {
      text: "ᠮᠡᠳᠡᠭᠡ ᠮᠡᠳᠡᠭᠡᠯᠡᠯ",
      link: "/news",
      hasDropdown: true,
      dropdownItems: [
        { text: "ᠮᠡᠳᠡᠭᠡ", link: "/news" },
        { text: "ᠮᠡᠳᠡᠭᠳᠡᠯ ᠪᠠᠶᠢᠷ ᠰᠤᠤᠷᠢ", link: "/news?type=statements" },
        { text: "ᠰᠠᠢᠨ ᠮᠡᠳᠡᠭᠡ", link: "/news?type=good_news" },
      ],
    },
    {
      text: "ᠡᠷᠬᠡᠭᠡ ᠮᠡᠳᠢᠶᠡ",
      link: "/knowrights",
      hasDropdown: true,
      dropdownItems: [
        { text: "ᠰᠤᠷᠭᠠᠯᠲᠠ", link: "/lessons" },
        { text: "ᠴᠠᠬᠢᠮ ᠰᠤᠷᠭᠠᠯᠲᠠ", link: "/online-lessons" },
        { text: "ᠴᠠᠬᠢᠮ ᠨᠣᠮ ᠤᠨ ᠰᠠᠨ", link: "/library" },
        { text: "ᠺᠢᠳᠧᠣ", link: "/videos" },
        { text: "ᠫᠣᠳᠺᠠᠰᠲ", link: "/podcasts" },
      ],
    },
    { text: "ᠭᠢᠰᠦᠨ ᠴᠢᠯᠡᠯ", link: "/member" },
  ];

  return (
    <div className="h-full min-w-[100px] inline-flex flex-col justify-between bg-white border-r border-[#E3E3E3] z-20">
      <div className="flex flex-col items-center">
        <Link href="/" className="py-4 px-2">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </Link>
        <div className="mt-4 px-2">
          {/* 2x3 Grid Layout - spans top to bottom, then continues in col 2 */}
          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={item.link || "#"}>
                      <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                        <p
                          className="text-black font-bold text-sm"
                          style={{
                            writingMode: "vertical-lr",
                            textOrientation: "upright",
                          }}
                        >
                          {item.text}
                        </p>
                      </div>
                    </Link>
                    {activeDropdown === index && (
                      <div className="absolute left-[38px] top-[-30px] bg-white rounded-xl p-6 z-30 border border-[#E3E3E3] shadow-lg">
                        <div className="flex justify-between items-center">
                          <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-8">
                            {item.dropdownItems.map(
                              (dropdownItem, dropdownIndex) => (
                                <Link
                                  key={dropdownIndex}
                                  href={dropdownItem.link}
                                >
                                  <div
                                    className={`flex flex-col items-center cursor-pointer group py-3 px-2 rounded-md hover:bg-gray-50 transition-all duration-200 ${
                                      dropdownIndex <
                                      item.dropdownItems.length - 1
                                        ? "border-b border-gray-200"
                                        : ""
                                    }`}
                                  >
                                    <p
                                      className="text-black font-bold group-hover:text-[#444] transition-colors text-sm"
                                      style={{
                                        writingMode: "vertical-lr",
                                        textOrientation: "upright",
                                      }}
                                    >
                                      {dropdownItem.text}
                                    </p>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : item.link ? (
                  <Link href={item.link}>
                    <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                      <p
                        className="text-black font-bold text-sm"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-3 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                    <p
                      className="text-black font-bold text-sm"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "upright",
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-5 gap-5">
        <button className="text-base text-black px-3 py-2 rounded border border-[#E3E3E3] hover:bg-gray-50 transition-colors">
          MNG
        </button>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#432C2C] to-transparent via-50%" />
        <button
          className="p-4 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => setIsSearchOpen(true)}
        >
          <Icon icon={"lucide:search"} fontSize={25} />
        </button>
        <Button
          text={"ᠡᠮᠨᠧᠰᠲ᠋ᠢ ᠳᠡᠯᢉᠡᢉᠦᠷ"}
          onClick={() => {
            router.push("/shop");
          }}
          type="primary"
        />
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
