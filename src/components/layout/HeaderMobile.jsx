import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuTransitioning, setMenuTransitioning] = useState(false);

  const toggleMenu = () => {
    setMenuTransitioning(true);
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Same menu items as desktop
  const menuItems = [
    { text: "ᠪᠢᠳᠨᠢ ᠲᠤᠬᠠᠢ", hasDropdown: true },
    { text: "ᠬᠠᠮᠫᠠᠨᠢᠲ ᠠᠵᠢᠯ", link: "/campaign" },
    { text: "ᠲᠠᠨᠢ ᠣᠷᠣᠯᠴᠣᠭ", link: "/participation" },
    { text: "ᠮᠡᠳᠡᢉᠡ ᠮᠡᠳᠡᢉᠡᠯᠡᠯ", link: "/news" },
    { text: "ᠡᠷᠬᠡᢉᠡ ᠮᠡᠳᠢᠶᠡ", link: "/right" },
    { text: "ᠭᠢᠰᠦᠦᠨᠴᠢᠯᠡᠯ", link: "/member" },
    { text: "ᠬᠠᠨᠳᠢᠪ", link: "/donation" },
    { text: "ᠬᠣᠯᠪᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ", link: "/contact" },
  ];

  useEffect(() => {
    // Add overflow hidden to body when menu is open
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      setShowDropdown(false);
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
    <div className="relative h-[50px] w-full bg-white flex items-start justify-between z-10">
      <div
        className={`flex items-center gap-[10px] ${
          showMenu ? "opacity-50" : ""
        } transition-opacity duration-300`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="object-contain border border-[#E3E3E3]"
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
        <button className="w-10 h-10 rounded-md transition-colors">
          <Icon icon={"lucide:search"} fontSize={25} />
        </button>
        <button className="w-10 h-10 bg-[#FFFF00] rounded-md flex items-center justify-center">
          <Image src="/icons/bag.svg" alt="bag" width={25} height={25} />
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-[100px] h-screen bg-white z-20 flex flex-col items-center transform transition-transform duration-300 border-r border-[#E3E3E3] ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="w-full p-2"
        />

        <div className="mt-4 px-4">
          {/* 2x4 Grid Layout for Mobile */}
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasDropdown ? (
                  <div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors text-center"
                      onClick={toggleDropdown}
                    >
                      <p
                        className="text-black font-bold text-xs"
                        style={{
                          writingMode: "vertical-lr",
                          textOrientation: "upright",
                        }}
                      >
                        {item.text}
                      </p>
                    </div>
                    {showDropdown && (
                      <div className="absolute left-[105px] top-[-30px] bg-white rounded-xl p-4 w-auto z-30 border border-[#E3E3E3] shadow-lg">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-4">
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡ ᢈᠡᠨ ᠪᠤᠢ?
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡ ᠶᠠᠭᠤ ᢈᠢᠳᠡᢉ ᠪᠤᠢ?
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡᠨ ᠦ᠋ ᠲᠡᠦᢈᠡ
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠪᠢᠳᠡᠨ ᠦ᠋ ᠠᠵᠢᠯ
                              </p>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer group">
                              <p
                                className="text-black font-bold group-hover:text-[#444] transition-colors text-xs"
                                style={{
                                  writingMode: "vertical-lr",
                                  textOrientation: "upright",
                                }}
                              >
                                ᠬᠣᠯᠪᠣᠭ᠎ᠠ ᠪᠠᠷᠢᠬᠤ
                              </p>
                            </div>
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
                          textOrientation: "upright",
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

      {(showMenu || menuTransitioning) && (
        <div
          className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ${
            showMenu ? "opacity-50" : "opacity-0"
          }`}
          style={{ top: "50px" }}
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}
