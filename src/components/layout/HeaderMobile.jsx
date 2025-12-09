import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchModal from "../common/SearchModal";

export default function HeaderMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuTransitioning, setMenuTransitioning] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuTransitioning(true);
    setShowMenu(!showMenu);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Same menu items as desktop - exact old web order
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
          link: "/writeforrights",
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

  useEffect(() => {
    // Add overflow hidden to body when menu is open
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      setActiveDropdown(null);
      document.body.style.overflow = "";
    }

    // Clear transition state after animation completes
    const timer = setTimeout(() => {
      setMenuTransitioning(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  return (
    <div className="relative h-[60px] w-full bg-white flex items-start p-2 justify-between z-10">
      <div
        className={`flex items-center gap-[10px] ${
          showMenu ? "opacity-50" : ""
        } transition-opacity duration-300`}
      >
        <Image
          src="/images/amnesty-wide-logo.png"
          alt="logo"
          width={100}
          height={40}
          className=""
        />
        <Icon
          onClick={toggleMenu}
          icon="tabler:menu-deep"
          fontSize={35}
          style={{ transform: "scaleX(-1)" }}
          className="text-[#33363F] cursor-pointer"
        />
      </div>
      <div className={`h-full flex items-center gap-[10px] mr-[10px]`}>
        <button
          className="w-10 h-10 rounded-md transition-colors hover:bg-gray-100"
          onClick={() => setIsSearchOpen(true)}
        >
          <Icon icon={"lucide:search"} fontSize={25} />
        </button>
        <button
          className="w-10 h-10 bg-[#FFFF00] rounded-md flex items-center justify-center"
          onClick={() => {
            router.push("/shop");
          }}
        >
          <Image src="/icons/bag.svg" alt="bag" width={25} height={25} />
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-[100px] h-screen bg-white z-20 flex flex-col items-center transform transition-transform duration-300 border-r border-[#E3E3E3] ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex justify-between items-center p-2">
          <Image
            src="/images/amnesty-wide-logo.png"
            alt="logo"
            width={100}
            height={40}
            className=""
          />
        </div>

        <div className="mt-4 px-4">
          {/* 2x3 Grid Layout for Mobile - spans top to bottom, then continues in col 2 */}
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div>
                    <div className="flex flex-col items-center">
                      <Link href={item.link || "#"}>
                        <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                          <p
                            className="text-black font-bold text-xs"
                            style={{
                              writingMode: "vertical-lr",
                            }}
                          >
                            {item.text}
                          </p>
                        </div>
                      </Link>
                      <button
                        className="mt-1 p-1 cursor-pointer hover:bg-gray-100 rounded transition-colors"
                        onClick={() => toggleDropdown(index)}
                      >
                        <Icon
                          icon={
                            activeDropdown === index
                              ? "mdi:chevron-up"
                              : "mdi:chevron-down"
                          }
                          className="text-gray-600 text-sm"
                        />
                      </button>
                    </div>
                    {activeDropdown === index && (
                      <div className="absolute left-[105px] top-[-30px] bg-white rounded-xl p-4 z-30 border border-[#E3E3E3] shadow-lg">
                        <div className="flex justify-center items-center">
                          <div className="grid grid-cols-3 grid-rows-2 gap-6">
                            {item.dropdownItems.map(
                              (dropdownItem, dropdownIndex) => (
                                <Link
                                  className="col-span-1"
                                  key={dropdownIndex}
                                  href={dropdownItem.link}
                                >
                                  <div
                                    className={`flex flex-col items-center cursor-pointer group rounded-md hover:bg-gray-50 transition-all duration-200 ${
                                      dropdownIndex <
                                      item.dropdownItems.length - 1
                                        ? "border-b border-gray-200"
                                        : ""
                                    }`}
                                  >
                                    <p
                                      className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                      style={{
                                        writingMode: "vertical-lr",
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
                    <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                      <p
                        className="text-black font-bold text-xs"
                        style={{
                          writingMode: "vertical-lr",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center">
                    <p
                      className="text-black font-bold text-xs"
                      style={{
                        writingMode: "vertical-lr",
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

      {(showMenu || menuTransitioning) && (
        <div
          className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ${
            showMenu ? "opacity-50" : "opacity-0"
          }`}
          onClick={toggleMenu}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
